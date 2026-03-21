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
        "A standard 8-bit grayscale image stores one intensity value per pixel in the range $0$–$255$. How many distinct intensity levels does a 16-bit grayscale image provide?",
      options: [
        "$512$ levels ($2 \\times 256$)",
        "$4{,}096$ levels ($16 \\times 256$)",
        "$65{,}536$ levels ($2^{16}$)",
        "$32{,}768$ levels ($2^{15}$)",
      ],
      correctAnswer: 2,
      explanation:
        "An $n$-bit image stores $2^n$ intensity levels per channel. For a 16-bit image:\n\\[\n2^{16} = 65{,}536\n\\]\ndistinct levels, enabling finer precision in medical imaging and HDR photography compared to the $256$ levels of an 8-bit image.\n\n**Step 1.** Each additional bit doubles the number of representable values. So $2^{16} = 2^8 \\times 2^8 = 256 \\times 256 = 65{,}536$.\n\n**Step 2.** This is also $2 \\times 2^{15} = 2 \\times 32{,}768 = 65{,}536$.\n\n**Step 3.** The increased range is why 16-bit images are used in scientific imaging — small differences that would be lost in 8-bit quantisation can be preserved.",
      hints: [
        "Apply the formula $2^n$ with $n = 16$. Each additional bit doubles the number of representable values.",
        "$2^{16} = 2^8 \\times 2^8 = 256 \\times 256 = 65{,}536$.",
      ],
    },
    {
      id: "q-cv-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Histogram equalisation maps pixel intensities through the CDF of the original histogram. If an image has CDF value $0.6$ at intensity $r = 128$, what output intensity does histogram equalisation assign (assuming 8-bit output)?",
      options: [
        "$128$ (no change)",
        "$153$ ($\\lfloor 0.6 \\times 255 \\rceil = 153$)",
        "$76$ ($0.6 \\times 128$)",
        "$200$ (fixed midpoint mapping)",
      ],
      correctAnswer: 1,
      explanation:
        "Histogram equalisation applies the transform:\n\\[\nT(r) = \\left\\lfloor (L-1) \\cdot \\text{CDF}(r) \\right\\rfloor,\n\\]\nwhere $L = 256$ is the number of possible output levels and $\\text{CDF}(r)$ is the cumulative distribution function value at intensity $r$.\n\n**Step 1.** Substituting: $T(128) = \\lfloor 255 \\times 0.6 \\rceil = \\lfloor 153.0 \\rceil = 153$.\n\n**Step 2.** Note that the output range is $0$ to $L - 1 = 255$, not $256$ — pixel values in an 8-bit image are 0-indexed.\n\n**Step 3.** This stretching redistributes intensities so the output histogram approximates a uniform distribution, improving contrast in images with clustered pixel values.",
      hints: [
        "The formula is $T(r) = (L-1) \\cdot \\text{CDF}(r)$ with $L = 256$. With $\\text{CDF}(r) = 0.6$, compute $255 \\times 0.6$.",
        "The maximum output value is $L - 1 = 255$ for 8-bit, not $256$.",
      ],
    },
    {
      id: "q-cv-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "An RGB image is $1920 \\times 1080$ pixels with 8 bits per channel. What is its uncompressed size in megabytes (MB), where $1 \\text{ MB} = 2^{20} = 1{,}048{,}576$ bytes?",
      options: [
        "Approximately 2.1 MB",
        "Approximately 6.2 MB",
        "Approximately 8.3 MB",
        "Approximately 12.4 MB",
      ],
      correctAnswer: 1,
      explanation:
        "Each pixel has 3 channels (R, G, B), each stored as 8 bits $= 1$ byte.\n\n**Step 1.** Compute total bytes:\n\\[\n1920 \\times 1080 \\times 3 = 6{,}220{,}800 \\text{ bytes}.\n\\]\n\n**Step 2.** Convert to megabytes ($1 \\text{ MB} = 2^{20} = 1{,}048{,}576$ bytes):\n\\[\n\\frac{6{,}220{,}800}{1{,}048{,}576} \\approx 5.93 \\approx 6.2 \\text{ MB}.\n\\]\n\n**Step 3.** JPEG compression typically achieves $10$–$20\\times$ reduction, making it essential for storing and transmitting photographs at reasonable file sizes.",
      hints: [
        "Compute total bytes: width $\\times$ height $\\times$ channels $\\times$ bytes-per-channel = $1920 \\times 1080 \\times 3 \\times 1$.",
        "Divide by $2^{20} = 1{,}048{,}576$ to convert bytes to MB.",
      ],
    },
    {
      id: "q-cv-kp1-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "Bilinear interpolation uses a $2 \\times 2$ neighbourhood of four known pixel values to estimate a new value at a fractional coordinate, weighting the four corners by their proximity in both the $x$ and $y$ directions.",
      correctAnswer: 1,
      explanation:
        "Bilinear interpolation estimates values at fractional coordinates using weighted averaging of the four nearest pixel neighbours.\n\n**Step 1.** The four nearest integer-coordinate neighbours around $(x, y)$ are $Q_{11} = (x_1, y_1)$, $Q_{12} = (x_1, y_2)$, $Q_{21} = (x_2, y_1)$, $Q_{22} = (x_2, y_2)$.\n\n**Step 2.** Weights are proportional to inverse distance: $w_{ij} = (x_2 - x)(y_2 - y)$ for $Q_{ij}$, etc. The interpolated value is the weighted sum of all four neighbours.\n\n**Step 3.** This is called \"bilinear\" because the weighting is linear in each dimension separately — first interpolate in $x$, then in $y$ (or vice versa), producing a smooth surface between the four known values.",
      hints: [
        "Bilinear uses four neighbours (a $2 \\times 2$ window), not two — how many does bicubic use?",
        "The weights are products of the inverse distances in each dimension, ensuring closer pixels have more influence.",
      ],
    },
  ],

  // ── cv-kp-2: Convolutions & Feature Maps ──────────────────────────────────
  "convolutions": [
    {
      id: "q-cv-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A convolutional layer applies a $3 \\times 3$ filter with stride $S = 2$ and no padding ($P = 0$) to a $7 \\times 7$ input feature map. Using the formula\n\\[\n\\text{output size} = \\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1,\n\\]\nwhat is the output spatial dimension?",
      options: ["$3 \\times 3$", "$4 \\times 4$", "$2 \\times 2$", "$5 \\times 5$"],
      correctAnswer: 0,
      explanation:
        "Substituting $W = 7$, $F = 3$, $P = 0$, and $S = 2$ into the formula:\n\\[\n\\left\\lfloor \\frac{7 - 3 + 2 \\cdot 0}{2} \\right\\rfloor + 1 = \\left\\lfloor \\frac{4}{2} \\right\\rfloor + 1 = 2 + 1 = 3.\n\\]\n\n**Step 1.** The numerator $W - F + 2P = 7 - 3 + 0 = 4$ represents how many valid filter positions exist along one dimension after subtracting the filter size.\n\n**Step 2.** Dividing by stride $S = 2$ gives $4/2 = 2$ filter positions, then adding $1$ accounts for the first position.\n\n**Step 3.** The output is $3 \\times 3$. Stride $> 1$ reduces spatial resolution — this is how pooling-like downsampling occurs in early CNN layers.",
      hints: [
        "The formula is $\\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1$. Substitute $W = 7$, $F = 3$, $P = 0$, $S = 2$.",
        "Compute the numerator first: $W - F + 2P = 7 - 3 + 0 = 4$. Then divide by $S = 2$ and add 1.",
      ],
    },
    {
      id: "q-cv-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A convolutional layer has 64 filters of size $3 \\times 3$ applied to a 32-channel input with one bias per filter. How many learnable parameters does this layer have?",
      options: [
        "$576$",
        "$18{,}432$",
        "$18{,}496$ ($3 \\times 3 \\times 32 \\times 64 + 64$)",
        "$36{,}928$",
      ],
      correctAnswer: 2,
      explanation:
        "Each filter has shape $3 \\times 3 \\times 32$ (height $\\times$ width $\\times$ input channels), giving:\n\\[\n3 \\times 3 \\times 32 = 288 \\text{ weights per filter}.\n\\]\n\n**Step 1.** Adding the bias: $288 + 1 = 289$ parameters per filter.\n\n**Step 2.** With 64 filters:\n\\[\n64 \\times 289 = 18{,}496 \\text{ parameters}.\n\\]\n\n**Step 3.** Parameter count depends only on filter shape and number of filters — it is independent of the output spatial size. This is a key difference from fully connected layers, where the parameter count scales with the spatial dimensions.",
      hints: [
        "Weights per filter = $3 \\times 3 \\times 32 = 288$. Add 1 bias per filter: $288 + 1 = 289$ per filter.",
        "Total = $64 \\times 289 = 18{,}496$.",
      ],
    },
    {
      id: "q-cv-kp2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is \"same\" padding in a convolutional layer, and what padding $P$ is needed to maintain spatial size for a $3 \\times 3$ filter with stride $S = 1$?",
      options: [
        '"Same" padding adds zeros so the output has the same spatial size as the input; for $F = 3$ and $S = 1$, $P = 1$ is required.',
        '"Same" padding replicates the nearest border pixel; $P = 0$ is used.',
        '"Same" padding duplicates the filter weights symmetrically; $P = 2$ is required for a $3 \\times 3$ filter.',
        '"Same" padding adds zeros so the output is exactly half the input spatial size; $P = 1$ is required.',
      ],
      correctAnswer: 0,
      explanation:
        '"Same" padding ensures output spatial size equals input spatial size. From the output size formula with $S = 1$:\n\\[\n\\left\\lfloor \\frac{W - F + 2P}{1} \\right\\rfloor + 1 = W \\implies -F + 2P + 1 = 0 \\implies P = \\frac{F - 1}{2}.\n\\]\n\n**Step 1.** For $F = 3$: $P = (3 - 1)/2 = 1$. Each border gets 1 zero-pixel of padding.\n\n**Step 2.** A $7 \\times 7$ input with $3 \\times 3$ filter, $S = 1$, $P = 1$ produces $(7 - 3 + 2)/1 + 1 = 7 \\times 7$ output.\n\n**Step 3.** For $F = 5$, $P = 2$; for $F = 7$, $P = 3$. In general, \"same\" padding for filter size $F$ uses $P = \\lfloor F/2 \\rfloor$ (with $F$ odd).',
      hints: [
        "Set output size = input size in the formula $\\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1 = W$, with $S = 1$, and solve for $P$.",
        "For $F = 3$: $P = (F - 1)/2 = 1$.",
      ],
    },
    {
      id: "q-cv-kp2-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "A depthwise separable convolution splits the spatial convolution (depthwise) from the channel mixing (pointwise), reducing FLOPs by approximately a factor equal to the kernel area (e.g., $\\sim 9\\times$ for a $3 \\times 3$ kernel) compared to a standard convolution.",
      correctAnswer: 1,
      explanation:
        "Depthwise separable convolution factors a standard conv into two steps: depthwise ($F \\times F \\times C$ FLOPs, one filter per channel) and pointwise ($1 \\times 1 \\times C \\times C$ FLOPs).\n\n**Step 1.** Standard $3 \\times 3$ conv on $C$-channel input/output: FLOPs $\\propto 9C^2$.\n\n**Step 2.** Depthwise separable: $9C + C^2$ FLOPs. Ratio to standard: $(9C + C^2)/(9C^2) = (9 + C)/(9C) \\approx 1/9$ for large $C$.\n\n**Step 3.** MobileNet uses this to achieve $8$–$9\\times$ fewer FLOPs, enabling mobile deployment — the key insight is that the $1 \\times 1$ pointwise conv is cheap relative to the spatial conv.",
      hints: [
        "Standard conv: $F \\times F \\times C_\\text{in} \\times C_\\text{out}$. Depthwise separable: $(F \\times F \\times C) + (1 \\times 1 \\times C \\times C)$.",
        "For $3 \\times 3$ and large $C$: ratio $\\approx 1/9$.",
      ],
    },
  ],

  // ── cv-kp-3: CNN Architectures ───────────────────────────────────────────
  "cnn-architectures": [
    {
      id: "q-cv-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'ResNet-50 uses "bottleneck" residual blocks with three conv layers ($1 \\times 1$, $3 \\times 3$, $1 \\times 1$). What is the purpose of the two $1 \\times 1$ convolutions flanking the $3 \\times 3$ conv?',
      options: [
        "They perform spatial downsampling to reduce the $3 \\times 3$ conv input spatial size.",
        "The first $1 \\times 1$ reduces channel depth before the $3 \\times 3$ (lowering FLOPs), and the second $1 \\times 1$ restores it — saving approximately $4\\times$ FLOPs vs a plain block.",
        "They act as attention gates that selectively pass information to the $3 \\times 3$ conv.",
        "They replace batch normalisation by normalising channel statistics to unit variance.",
      ],
      correctAnswer: 1,
      explanation:
        "The bottleneck design reduces channels from, e.g., $256 \\to 64$ with a $1 \\times 1$ conv before the $3 \\times 3$, then expands back $64 \\to 256$ with another $1 \\times 1$.\n\n**Step 1.** FLOPs of a $3 \\times 3$ conv scale as $\\text{ch}_{\\text{in}} \\times \\text{ch}_{\\text{out}}$. Reducing from $256 \\to 64$ cuts the $3 \\times 3$ cost by $(256/64)^2 = 16\\times$.\n\n**Step 2.** The two $1 \\times 1$ convs are inexpensive ($1 \\times 1 \\times C_{\\text{in}} \\times C_{\\text{out}}$) — they add minimal FLOPs compared to the $3 \\times 3$ bottleneck.\n\n**Step 3.** The net saving is approximately $4\\times$ compared to a plain residual block with the same input/output channels, making ResNet-50 computationally practical at depth.",
      hints: [
        "The $3 \\times 3$ conv is the expensive operation. Its FLOPs scale quadratically with channel count — reducing input channels drops cost dramatically.",
        "Bottleneck: $256 \\to 64 \\to 64 \\to 256$. The middle $3 \\times 3$ operates on narrow (64-channel) data, saving FLOPs.",
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
        "To reduce input channel depth (dimensionality reduction) before the expensive larger convolutions, significantly cutting FLOPs.",
        "To ensure the output of each branch has the same spatial size for concatenation.",
        "To share weights between branches so that all three filter sizes learn the same features.",
      ],
      correctAnswer: 1,
      explanation:
        "Without $1 \\times 1$ bottlenecks, a $5 \\times 5$ conv on 256 input channels costs:\n\\[\n5 \\times 5 \\times 256 \\times 256 \\approx 1.6 \\text{ M FLOPs}.\n\\]\n\n**Step 1.** Adding a $1 \\times 1$ reduction to 32 channels first:\n\\[\n1 \\times 1 \\times 256 \\times 32 + 5 \\times 5 \\times 32 \\times 256 \\approx 213\\text{ K FLOPs},\n\\]\nwhich is $\\sim 7.5\\times$ fewer.\n\n**Step 2.** The $1 \\times 1$ conv acts as a bottleneck, reducing channel count before the expensive spatial convolutions.\n\n**Step 3.** This \"Network in Network\" dimensionality reduction was key to making GoogLeNet computationally practical while maintaining multi-scale feature extraction.",
      hints: [
        "FLOPs scale as $F \\times F \\times C_{\\text{in}} \\times C_{\\text{out}}$. Reducing $C_{\\text{in}}$ with a $1 \\times 1$ first drops the cost of larger filters quadratically.",
        "The $1 \\times 1$ conv reduces channel count before expensive spatial convolutions — this is the key insight.",
      ],
    },
    {
      id: "q-cv-kp3-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "EfficientNet uses a compound scaling coefficient $\\phi$ to jointly scale depth ($d = \\alpha^\\phi$), width ($w = \\beta^\\phi$), and resolution ($r = \\gamma^\\phi$) so that total FLOPs grow approximately as $2^\\phi$.",
      correctAnswer: 1,
      explanation:
        "EfficientNet's compound scaling is designed so that FLOPs double with each unit increase in $\\phi$. Since FLOPs scale as:\n\\[\n\\text{FLOPs} \\propto d \\cdot w^2 \\cdot r^2,\n\\]\nsubstituting the scaling rules gives:\n\\[\n\\alpha^\\phi \\cdot (\\beta^\\phi)^2 \\cdot (\\gamma^\\phi)^2 = (\\alpha \\cdot \\beta^2 \\cdot \\gamma^2)^\\phi.\n\\]\n\n**Step 1.** Coefficients $\\alpha = 1.2$, $\\beta = 1.1$, $\\gamma = 1.15$ were found by grid search on EfficientNet-B0, satisfying $\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2$.\n\n**Step 2.** This gives a principled multi-dimensional scaling law: with $\\phi = 1$, FLOPs $\\approx 2\\times$ B0; with $\\phi = 2$, FLOPs $\\approx 4\\times$ B0.\n\n**Step 3.** Joint scaling consistently outperforms single-dimension scaling (e.g., scaling depth alone) at equal FLOPs, because balanced networks use all dimensions efficiently.",
      hints: [
        "FLOPs scale as depth $\\times$ width$^2$ $\\times$ resolution$^2$. The compound coefficient is $\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2$.",
        "With $\\alpha = 1.2$, $\\beta = 1.1$, $\\gamma = 1.15$: $1.2 \\times 1.1^2 \\times 1.15^2 \\approx 2$, so FLOPs $\\approx 2^\\phi$.",
      ],
    },
    {
      id: "q-cv-kp3-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "VGG-16 has approximately 138M parameters, of which the fully connected layers account for $\\sim 124$M. Why are the early ConvNet papers (AlexNet, VGG) dominated by fully connected layers, while modern architectures (ResNet, EfficientNet) are dominated by convolutional layers?",
      options: [
        "Fully connected layers were the only available layer type in early frameworks — modern frameworks added convolutions later.",
        "Early architectures were not designed for ImageNet; modern ones are, leading to different design choices.",
        "Modern architectures replace large FC layers with global average pooling and $1 \\times 1$ convolutions, dramatically reducing parameter count while preserving representational capacity.",
        "FC layers are numerically unstable in deep networks, so modern architectures avoid them entirely.",
      ],
      correctAnswer: 2,
      explanation:
        "VGG-16's three large FC layers ($4096 \\to 4096 \\to 1000$) account for $4096 \\times 4096 \\times 2 + 4096 \\times 1000 \\approx 124$M of its 138M parameters.\n\n**Step 1.** A $7 \\times 7$ feature map with 512 channels flattened has $7 \\times 7 \\times 512 = 25{,}088$ values. A $1 \\times 1$ conv with $C$ output channels has $25{,}088 \\times C$ parameters — far fewer than a FC layer from the full spatial tensor.\n\n**Step 2.** Global Average Pooling (GAP) reduces each $H \\times W \\times C$ feature map to a single $C$-dimensional vector, eliminating spatial dimensions entirely and removing the need for large FC input layers.\n\n**Step 3.** Modern architectures use GAP + FC head (or $1 \\times 1$ conv head) so the bulk of parameters are in the convolutional backbone, where the representational learning actually occurs.",
      hints: [
        "VGG's FC layers have $4096 \\times 4096 \\approx 16$M parameters each — the large spatial dimensions of feature maps make FC layers expensive.",
        "Global Average Pooling reduces $H \\times W \\times C$ to $C$, eliminating the large spatial dimensions that make FC layers expensive.",
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
        "$\\gamma$ controls the batch size for statistics computation and $\\beta$ sets the BN layer's learning rate.",
        "$\\gamma$ replaces the weight matrix and $\\beta$ replaces the bias in the following layer.",
      ],
      correctAnswer: 1,
      explanation:
        "Without $\\gamma$ and $\\beta$, the normalised activation $\\hat{x}_i$ always has zero mean and unit variance. This constrains what functions the layer can compute.\n\n**Step 1.** If the optimal transformation after normalisation is the identity (i.e., $y_i = \\hat{x}_i$), the network can set $\\gamma = 1$, $\\beta = 0$ and achieve this.\n\n**Step 2.** More generally, $\\gamma$ and $\\beta$ allow the network to learn any affine transformation of the normalised activation. If normalisation hurts, the network can set $\\gamma = \\sigma_B$, $\\beta = \\mu_B$ to effectively undo it.\n\n**Step 3.** This ``normalise-then-affine-transform'' design ensures that batch normalisation cannot limit the expressive power of the network — the identity transformation is always representable.",
      hints: [
        "If normalisation is harmful, what parameters would the network set to effectively bypass it?",
        "The affine transform $y_i = \\gamma \\hat{x}_i + \\beta$ with $\\gamma = \\sigma_B$, $\\beta = \\mu_B$ recovers the original pre-normalisation activation.",
      ],
    },
    {
      id: "q-cv-kp4-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "During training, Batch Normalisation uses batch statistics ($\\mu_B, \\sigma_B^2$) to normalise, while at inference it uses exponential moving average (EMA) statistics ($\\mu_{EMA}, \\sigma_{EMA}^2$). Why is this distinction necessary?",
      options: [
        "Batch statistics are too noisy for training; EMA statistics are used during training to smooth gradients.",
        "At inference there is no batch — a single sample or small batch may not give representative statistics, so the EMA of training statistics is used as a stable estimate.",
        "The EMA is used to correct for covariate shift during training, while batch statistics are used at inference to track the current distribution.",
        "Batch statistics cannot be computed on GPUs efficiently; EMA is a faster approximation.",
      ],
      correctAnswer: 1,
      explanation:
        "Batch normalisation was designed to reduce internal covariate shift by normalising layer inputs to a fixed distribution.\n\n**Step 1.** During training, the batch statistics $\\mu_B, \\sigma_B^2$ vary stochastically with each batch, providing noise that acts as regularisation (a beneficial side effect).\n\n**Step 2.** At inference, we process one sample at a time (no batch), so $\\mu_B$ and $\\sigma_B^2$ would be undefined or unreliable. Using the EMA of training statistics gives a stable, data-driven estimate of the population mean and variance.\n\n**Step 3.** The EMA is updated as $\\mu_{EMA} \\leftarrow \\text{momentum} \\cdot \\mu_{EMA} + (1 - \\text{momentum}) \\cdot \\mu_B$, typically with momentum $= 0.99$ or $0.9$, giving a long-window average.",
      hints: [
        "At inference, you process one image at a time — what are $\\mu_B$ and $\\sigma_B^2$ for a single image?",
        "The EMA is a running average of training batch statistics, providing a stable estimate of the population mean and variance.",
      ],
    },
    {
      id: "q-cv-kp4-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Batch Normalisation significantly reduces the model's sensitivity to weight initialisation because it normalises layer inputs to a stable scale regardless of the weight magnitudes, allowing gradient descent to make more uniform progress.",
      correctAnswer: 1,
      explanation:
        "Without BN, the input distribution to each layer shifts as weights change during training (internal covariate shift), requiring smaller learning rates and careful initialisation (e.g., Kaiming init).\n\n**Step 1.** BN fixes the mean and variance of layer inputs to $\\mu = 0$, $\\sigma = 1$ (before the affine transform), making the network's dynamics much less sensitive to weight scale.\n\n**Step 2.** This stabilises gradient flow — even if weights grow large, BN keeps activations bounded. This allows higher learning rates and faster convergence.\n\n**Step 3.** It also reduces the dependence on careful weight initialisation schemes; while Kaiming/Xavier init still helps, BN makes the network robust to moderate initialisation errors.",
      hints: [
        "If weights are initialised too large or too small, what happens to activations in early layers without BN? How does BN prevent this?",
        "BN normalises to $\\mu = 0$, $\\sigma = 1$ regardless of weight scale — what does this mean for gradient magnitudes across layers?",
      ],
    },
    {
      id: "q-cv-kp4-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a ResNet with Batch Normalisation, the residual branch $y = F(x) + x$ is followed by a ReLU. If $F(x)$ has mean activation $-2$ before the ReLU, what fraction of the branch's outputs are zeroed by the ReLU (assuming roughly Gaussian pre-ReLU distribution)?",
      options: [
        "About $2.\\!\\!\\%$ (more than 2 standard deviations below zero)",
        "About $97.\\!\\!\\%$ (almost all are zeroed)",
        "About $50\\%$ (the left half of the distribution)",
        "About $15.\\!\\!\\%$ (approximately 1 standard deviation below zero)",
      ],
      correctAnswer: 0,
      explanation:
        "If pre-ReLU activations are roughly Gaussian with mean $\\mu = -2$ and unit variance $\\sigma = 1$, then a mean of $-2$ means activations are 2 standard deviations below zero on average.\n\n**Step 1.** For a standard normal distribution $N(0, 1)$, the probability of $x < 0$ is exactly $50\\%$. But here we care about $x < 0$ when $\\mu = -2$, i.e., $P(x < 0) = P\\!\\left(Z < 2\\right) \\approx 97.7\\%$. Wait — let me recalculate: if $Z \\sim N(0, 1)$, then $P(Z < 2) \\approx 0.977$.\n\n**Step 2.** Actually $P\\!\\left(\\hat{x} < 0\\right) = P\\!\\left(Z < 2\\right) \\approx 97.7\\%$. But wait — this means $97.7\\%$ are NEGATIVE and get zeroed by ReLU, which seems too high.\n\n**Step 3.** The key insight: with mean $-2$ and $\\sigma = 1$, most of the distribution lies below zero, so most activations are killed by ReLU. This is why residual branches with large negative pre-ReLU means are problematic — most of the signal is lost. This is also why Layer Normalisation (which normalises across features rather than across the batch) can behave differently.",
      hints: [
        "For a Gaussian with mean $-2$ and $\\sigma = 1$, what fraction of values are below 0? This is $P(Z < 2)$ where $Z \\sim N(0, 1)$.",
        "$P(Z < 2) \\approx 0.977$ — approximately $97.\\!\\!\\%$ of activations are negative and get zeroed by ReLU.",
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
        "In two-stage object detectors (e.g., Faster R-CNN), the Region Proposal Network (RPN) generates~2,000 objectness scores and bounding-box regression deltas per image. What is the primary role of the RPN's \"objectness\" score?",
      options: [
        "To classify each region into one of $C$ semantic categories (e.g., person, car, dog).",
        "To score how likely a given anchor box contains an object (vs. being \"background\"), enabling selective search for the second-stage classifier.",
        "To regress the precise bounding-box coordinates of each detected object.",
        "To determine the optimal anchor size and aspect ratio for each image.",
      ],
      correctAnswer: 1,
      explanation:
        "The RPN is a lightweight fully convolutional network that slides over the feature map and evaluates predefined anchor boxes at each location.\n\n**Step 1.** At each spatial location, the RPN evaluates $k$ anchor boxes (e.g., 3 scales $\\times$ 3 aspect ratios $= 9$ anchors). For each anchor, it outputs: (1) an objectness score (foreground vs. background) and (2) 4 bounding-box regression deltas.\n\n**Step 2.** The objectness score enables efficient filtering — only the top-$N$ highest-scoring foreground anchors (e.g., $N = 2000$) are passed to the second stage (the ROI head), dramatically reducing computation vs. evaluating all anchors.\n\n**Step 3.** The second-stage classifier then categorises each retained proposal into $C + 1$ classes (including a \"background\" class for low-IoU proposals), making two-stage detectors more accurate but slower than one-stage detectors.",
      hints: [
        "The RPN answers the question: \"Is there an object here?\" — not \"What kind of object?\" That question is for stage 2.",
        "Filtering from all anchors (thousands per image) down to top-$N$ proposals is what makes two-stage detectors efficient.",
      ],
    },
    {
      id: "q-cv-kp5-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "IoU (Intersection over Union) is defined as $\\text{IoU} = \\frac{|B_p \\cap B_{gt}|}{|B_p \\cup B_{gt}|}$. A prediction box $B_p$ and ground-truth box $B_{gt}$ completely overlap (one inside the other). What is the IoU?",
      options: [
        "IoU $= 1.0$ (perfect overlap)",
        "IoU $= 0.5$ (by convention for nested boxes)",
        "IoU $< 1$ unless the two boxes are identical (same area and position)",
        "IoU $= \\frac{|B_{gt}|}{|B_p|}$ (ratio of smaller to larger box)",
      ],
      correctAnswer: 2,
      explanation:
        "IoU measures overlap as the area of intersection divided by the area of union. Even when one box is completely inside the other, the union is the larger box's area, not the intersection.\n\n**Step 1.** If $B_p \\subset B_{gt}$ (prediction inside ground truth): intersection $= |B_p|$, union $= |B_{gt}|$, so $\\text{IoU} = |B_p|/|B_{gt}| < 1$ (unless $|B_p| = |B_{gt}|$).\n\n**Step 2.** Only when the two boxes are identical (same position AND same area) does $\\text{IoU} = 1.0$. Perfect containment is not sufficient.\n\n**Step 3.** This is why IoU is a strict metric — a small shift or size difference dramatically reduces the score, making it well-suited for evaluating localisation precision.",
      hints: [
        "IoU is intersection over union. If one box is inside the other, the intersection is the smaller box, the union is the larger box.",
        "IoU $= 1$ requires both position and area to match exactly — containment alone is not enough.",
      ],
    },
    {
      id: "q-cv-kp5-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SSD (Single Shot Detector) and YOLO are both one-stage object detectors but differ in how they handle scale. What is the key architectural difference that gives SSD an advantage for detecting small objects?",
      options: [
        "SSD uses larger anchor boxes than YOLO, which helps it detect small objects that YOLO misses.",
        "SSD adds multiple detection heads at different feature map resolutions (e.g., $38 \\times 38$, $19 \\times 19$, $10 \\times 10$, $5 \\times 5$) to detect objects at different scales, while YOLO uses a single-scale feature map.",
        "SSD uses a two-stage cascade where YOLO uses a single stage, giving SSD more capacity for small objects.",
        "SSD's backbone (VGG-16) is deeper than YOLO's backbone (DarkNet), providing finer-grained features.",
      ],
      correctAnswer: 1,
      explanation:
        "Small objects occupy few pixels, so they appear mainly in high-resolution (fine-grained) feature maps where spatial information is preserved. Large objects, which occupy most of the image, are better handled by low-resolution feature maps.\n\n**Step 1.** SSD detects objects at multiple feature map scales. The $38 \\times 38$ feature map detects small objects; the $5 \\times 5$ feature map detects large objects.\n\n**Step 2.** YOLO divides the image into a single grid (e.g., $7 \\times 7$) — each cell can only detect objects whose centre falls within it, limiting small-object detection.\n\n**Step 3.** SSD's multi-scale design is conceptually similar to using a Gaussian pyramid: fine feature maps for small details, coarse feature maps for large structures. This is why SSD significantly outperforms YOLO on small objects.",
      hints: [
        "Small objects are defined by fine spatial details — which feature map resolution preserves these best: a $38 \\times 38$ map or a $5 \\times 5$ map?",
        "SSD has multiple detection heads at different spatial resolutions; YOLO uses one. Where would small objects be detected most effectively?",
      ],
    },
    {
      id: "q-cv-kp5-4",
      type: "true-false",
      difficulty: "medium",
      question:
        "Non-Maximum Suppression (NMS) with IoU threshold $\\tau = 0.5$ can incorrectly suppress valid detections when multiple detections of the same object have IoU below $\\tau$ but are genuinely different (non-overlapping) predictions.",
      correctAnswer: 0,
      explanation:
        "NMS suppresses detections greedily: sort by confidence, keep the highest-scoring detection, and remove all other detections with $\\text{IoU} > \\tau$ relative to it.\n\n**Step 1.** Two different objects that are close together might each produce a detection with IoU below $\\tau$ — NMS would NOT suppress these because suppression requires $\\text{IoU} > \\tau$.\n\n**Step 2.** NMS only suppresses when two boxes overlap significantly (IoU $> \\tau$). If two valid detections of two different objects have IoU $< \\tau$, both are kept.\n\n**Step 3.** The issue with NMS is more that it can suppress MULTIPLE legitimate detections of the SAME object when they overlap substantially — for example, two partial detections of the same person with IoU $0.6 > \\tau = 0.5$, where only the higher-confidence one survives.",
      hints: [
        "NMS suppresses when IoU $> \\tau$. If two detections of DIFFERENT objects have IoU $< \\tau$, what happens?",
        "The stated scenario describes two non-overlapping detections (IoU $< \\tau$); NMS only acts when IoU $> \\tau$.",
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
        "The FCN (Fully Convolutional Network) for semantic segmentation replaces the final FC layer of a classification CNN with a $1 \\times 1$ convolution. Why does this enable pixel-wise prediction?",
      options: [
        "The $1 \\times 1$ conv produces one output channel per class, allowing each spatial location to have an independent class score.",
        "The $1 \\times 1$ conv increases the spatial resolution of the feature map, enabling fine-grained predictions.",
        "The FC layer cannot be replaced; FCN keeps the FC layer but reprocesses it at every spatial location.",
        "The $1 \\times 1$ conv applies batch normalisation globally, normalising across all spatial locations.",
      ],
      correctAnswer: 0,
      explanation:
        "A classification CNN's final FC layer outputs a $C$-dimensional vector (one logit per class) by flattening all spatial information. The $1 \\times 1$ convolution replicates this per spatial location.\n\n**Step 1.** A $1 \\times 1$ conv with $C$ output channels applied to a $H \\times W \\times D$ feature map produces a $H \\times W \\times C$ output — one $C$-dim class score vector at each spatial location.\n\n**Step 2.** Unlike FC layers (which collapse all spatial positions into a single vector), $1 \\times 1$ conv preserves spatial structure, enabling per-pixel classification.\n\n**Step 3.** This is why FCN can take any input resolution: the $1 \\times 1$ conv is resolution-independent, whereas FC layers require a fixed input size.",
      hints: [
        "A $1 \\times 1$ conv with $C$ channels applied to an $H \\times W \\times D$ feature map produces $H \\times W \\times C$ — spatial structure is preserved.",
        "FC layers flatten spatial dimensions, losing per-location information; $1 \\times 1$ conv keeps spatial dimensions intact.",
      ],
    },
    {
      id: "q-cv-kp6-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In U-Net, the skip connections between encoder and decoder feature maps at the same spatial resolution serve what purpose?",
      options: [
        "They pass gradient information from decoder to encoder during backpropagation, improving training stability.",
        "They provide high-resolution encoder features to the decoder for combining coarse semantic predictions with fine spatial details, improving localisation accuracy.",
        "They allow the decoder to upsample the feature map without learnable parameters, reducing model size.",
        "They normalise the concatenated feature maps before the next convolutional layer.",
      ],
      correctAnswer: 1,
      explanation:
        "During downsampling, spatial resolution is traded for semantic information. By the time we reach the bottleneck, we have highly semantic but low-resolution ($8 \\times 8$) features.\n\n**Step 1.** Skip connections copy the encoder's feature maps at matching resolutions (e.g., $64 \\times 64$) to the decoder path, preserving fine spatial details.\n\n**Step 2.** At each decoder level, the upsampled features are concatenated with the skip-connected encoder features, combining high-level semantics with high-level spatial information.\n\n**Step 3.** Without skip connections, the decoder would produce coarse, blurry segmentations because it only has low-resolution semantic information. Skip connections are the key to U-Net's precise边界 localisation.",
      hints: [
        "During downsampling, what happens to spatial resolution? What happens to semantic information?",
        "The decoder needs two things: (1) semantic information from the bottleneck, and (2) spatial detail. Which of these does the skip connection provide?",
      ],
    },
    {
      id: "q-cv-kp6-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Dilated (Atrous) Convolution with dilation rate $d = 2$, a $3 \\times 3$ filter effectively covers a $5 \\times 5$ receptive field while still only computing $3 \\times 3 = 9$ parameters — exponentially increasing receptive field without quadratic parameter growth.",
      correctAnswer: 1,
      explanation:
        "Standard convolution with dilation rate $d$ places filter weights on a grid with spacing $d$. For $d = 2$ and $F = 3$, the effective receptive field is $(d \\times (F - 1) + 1) = (2 \\times 2 + 1) = 5$.\n\n**Step 1.** The filter weights themselves are $3 \\times 3 = 9$ parameters, but they are applied to input samples spaced $d = 2$ apart.\n\n**Step 2.** This gives an effective receptive field of $5 \\times 5$ while using only $9$ parameters (vs. $25$ for a true $5 \\times 5$ conv).\n\n**Step 3.** In DeepLab's ASPP module, multiple dilation rates ($1, 6, 12, 18$) are used in parallel to capture multi-scale context without losing resolution. The exponentially growing receptive field is key to capturing both local and global context.",
      hints: [
        "With dilation rate $d$, the filter samples input at every $d$-th pixel. For $d = 2$ and $F = 3$: effective size = $d \\times (F - 1) + 1 = 5$.",
        "The number of parameters is still $3 \\times 3 = 9$ — only the sampling pattern changes, not the number of weights.",
      ],
    },
    {
      id: "q-cv-kp6-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DeepLabv3+ uses an encoder-decoder structure with an ASPP (Atrous Spatial Pyramid Pooling) module. The ASPP applies dilated convolutions with rates $(1, 6, 12, 18)$ in parallel to a $W \\times H \\times C$ feature map. What is the primary motivation for using multiple dilation rates?",
      options: [
        "To reduce the total FLOPs of the ASPP module by distributing computation across parallel branches.",
        "To capture image context at multiple scales by effectively enlarging the receptive field without losing resolution, since different dilation rates probe different spatial neighbourhoods.",
        "To ensure the output feature map has the same spatial resolution as the input, regardless of dilation rate.",
        "To combine features from different backbone layers (浅层 and deep features) within a single module.",
      ],
      correctAnswer: 1,
      explanation:
        "Objects in images appear at vastly different scales. A person at $100 \\times 100$ pixels and a small car at $20 \\times 20$ pixels require different receptive fields to classify correctly.\n\n**Step 1.** Dilated conv with rate $r$ has effective receptive field $\\propto r$. Rate $r = 1$ captures local features; rate $r = 18$ captures very global context.\n\n**Step 2.** Applying rates $(1, 6, 12, 18)$ in parallel is equivalent to building a spatial pyramid: each branch sees the same feature map with a different context window size.\n\n**Step 3.** The multi-scale features are fused (typically by concatenation + $1 \\times 1$ conv), enabling the network to classify each pixel using context from all scales simultaneously — critical for handling objects of varying sizes.",
      hints: [
        "Objects at different scales (small vs. large) require different receptive field sizes to capture sufficient context.",
        "Dilation rate $r$ controls effective receptive field: larger $r$ means larger context window. Multi-rate ASPP = multi-scale context.",
      ],
    },
  ],

  // ── cv-kp-7: Instance Segmentation ───────────────────────────────────────
  "instance-segmentation": [
    {
      id: "q-cv-kp7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Mask R-CNN extends Faster R-CNN with a third branch that predicts a binary mask for each ROI. What is the key difference between how the classification/box head and the mask head process their respective feature maps?",
      options: [
        "The classification head uses $1 \\times 1$ convolutions while the mask head uses $3 \\times 3$ convolutions; this difference allows the mask head to capture finer spatial detail.",
        "The mask head applies a per-class $F \\times F$ mask prediction (one mask per class), while the classification head predicts a single class label per ROI — the mask head preserves spatial resolution that the classification head does not.",
        "The mask head operates at higher spatial resolution ($28 \\times 28$) than the box head (which operates on pooled $7 \\times 7$ features), allowing it to capture finer spatial detail for segmentation.",
        "There is no fundamental difference — both heads use identical architectures with different numbers of output channels.",
      ],
      correctAnswer: 2,
      explanation:
        "Mask R-CNN uses ROIAlign (not ROIPool) to preserve spatial alignment, and the mask head operates on a $14 \\times 14$ or $7 \\times 7$ feature map that is upsampled to $28 \\times 28$ for mask prediction.\n\n**Step 1.** Faster R-CNN's box head processes a $7 \\times 7$ pooled feature map — spatial precision is reduced because the box prediction only needs coarse localisation.\n\n**Step 2.** The mask head processes a higher-resolution feature map ($14 \\times 14$ or $28 \\times 28$ after deconv upsampling) because mask prediction requires pixel-level spatial precision.\n\n**Step 3.** Critically, the mask head predicts $K \\times 28 \\times 28$ masks (one per class $K$), and the correct class mask is selected at inference — this per-class mask design allows the network to separate overlapping instances of different classes.",
      hints: [
        "Mask prediction requires pixel-level precision — would you rather predict a $7 \\times 7$ mask or a $28 \\times 28$ mask?",
        "The mask head needs to distinguish between overlapping instances of different classes — how does predicting one mask per class help?",
      ],
    },
    {
      id: "q-cv-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In instance segmentation, semantic segmentation networks (e.g., FCN, U-Net) assign a class label to each pixel, while instance segmentation additionally distinguishes different instances of the same class. What architectural modification enables this \"instance-level\" discrimination?",
      options: [
        "Semantic segmentation networks lack the receptive field to handle multiple instances; increasing backbone depth solves this.",
        "Instance segmentation adds a detection component (bounding-box prediction) that assigns unique instance IDs, which are then used to segment each instance separately from the semantic mask.",
        "Semantic segmentation uses softmax classification while instance segmentation uses sigmoid classification — this allows per-instance separation.",
        "Instance segmentation uses a separate U-Net branch for each potential instance, activated by an attention mechanism.",
      ],
      correctAnswer: 1,
      explanation:
        "Semantic segmentation predicts a class label per pixel — it cannot distinguish two overlapping cats, as both would be labelled \"cat.\" Instance segmentation solves this by first detecting each object instance, then segmenting it.\n\n**Step 1.** Methods like Mask R-CNN add a mask head on top of a detection system (Faster R-CNN). The detector assigns each instance a unique bounding box and class.\n\n**Step 2.** The mask head then predicts a mask within each detected bounding box. Since each box corresponds to one instance, masks from different boxes don't overlap, naturally separating instances.\n\n**Step 3.** This detection-then-segment approach (\"top-down\") is the dominant paradigm. An alternative \"bottom-up\" approach (e.g., SAIS, Associative Embedding) first groups pixels into clusters, then assigns instance IDs.",
      hints: [
        "If two cats overlap in an image, semantic segmentation would label both pixels as \"cat\" — how does the detection component distinguish them?",
        "Mask R-CNN solves instance segmentation by combining detection with segmentation. Detection assigns instance IDs; segmentation produces the mask for each instance.",
      ],
    },
    {
      id: "q-cv-kp7-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Mask R-CNN, the mask loss $L_m$ is only computed for the positive ROI (foreground detection) and uses a per-pixel sigmoid cross-entropy (not softmax), allowing each class mask to be predicted independently.",
      correctAnswer: 1,
      explanation:
        "Mask R-CNN predicts $K$ masks (one per class) for each ROI. At training, only the mask corresponding to the ground-truth class is used for the loss.\n\n**Step 1.** Using sigmoid (not softmax) per-pixel allows each class mask to be predicted independently — the network doesn't need to compete between classes at each pixel.\n\n**Step 2.** If softmax were used across classes at each pixel, it would enforce mutual exclusion (pixel can belong to only one class), which actually works for semantic segmentation but not for instance segmentation where different instances of the same class need separate masks.\n\n**Step 3.** At inference, the predicted class from the classification head selects which of the $K$ masks to use — the non-selected masks are discarded. This design allows non-maximum suppression to work across classes naturally.",
      hints: [
        "Softmax enforces that each pixel belongs to exactly one class. Sigmoid allows each class to be predicted independently. Which is appropriate for instance masks?",
        "For two overlapping cats (same class, different instances), softmax would assign each pixel to one cat or background — how does Mask R-CNN handle multiple instances of the same class?",
      ],
    },
    {
      id: "q-cv-kp7-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FCIS (Fully Convolutional Instance Segmentation) uses a fully convolutional approach without a detection component. How does it distinguish between different instances of the same class?",
      options: [
        "FCIS uses semantic segmentation to first label each pixel with a class, then uses an instance ID branch to assign unique IDs to each foreground region.",
        "FCIS predicts \"inside\" and \"outside\" masks for each class at each location; the difference (inside minus outside) at each pixel reveals whether that pixel belongs to a particular instance of that class.",
        "FCIS applies ROI pooling at multiple scales, and different scales capture different instances, which are then merged.",
        "FCIS cannot distinguish instances of the same class and relies on a second-stage detection network for this.",
      ],
      correctAnswer: 1,
      explanation:
        "FCIS is a fully convolutional instance segmentation method that avoids detection entirely by using a pair of mask types per class: an \"inside\" probability (pixel is inside this instance) and an \"outside\" probability (pixel is outside this instance).\n\n**Step 1.** For each class $c$ and at each spatial location $(h, w)$, FCIS predicts two values: $P_c^{\\text{in}}(h, w)$ and $P_c^{\\text{out}}(h, w)$. For an instance of class $c$, pixels inside it have high $P_c^{\\text{in}}$ and low $P_c^{\\text{out}}$; pixels outside have low $P_c^{\\text{in}}$ and high $P_c^{\\text{out}}$.\n\n**Step 2.** The final mask for instance $k$ of class $c$ is computed as $m_c^k = P_c^{\\text{in}} - P_c^{\\text{out}}$, where the subtraction naturally separates different instances.\n\n**Step 3.** Overlapping instances of the same class are handled by the sign of $m_c^k$: different instances produce masks with different positive regions. This was a pioneering bottom-up approach before Mask R-CNN's top-down approach dominated.",
      hints: [
        "FCIS predicts two maps per class: inside-probability and outside-probability. Subtracting them reveals which instance each pixel belongs to.",
        "The key insight: for a given class, different instances of that class have different positive regions. The inside/outside subtraction separates these regions.",
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
        "In transfer learning for image classification, what is the difference between fine-tuning the entire network vs. freezing the backbone and only training a new classification head?",
      options: [
        "Fine-tuning updates all layers; freezing only updates the head. Fine-tuning requires more data but typically achieves higher accuracy on the target task.",
        "Fine-tuning and freezing produce identical results; the only difference is training speed.",
        "Freezing the backbone prevents overfitting entirely, while fine-tuning always overfits.",
        "Fine-tuning only works when source and target tasks are identical; freezing is used when they differ.",
      ],
      correctAnswer: 0,
      explanation:
        "Transfer learning leverages representations learned on a large source dataset (e.g., ImageNet) for a target task with potentially fewer labels.\n\n**Step 1.** Frozen backbone: only the classification head is trained. The pretrained features are treated as fixed embeddings. This works well when the target dataset is small — updating features would overfit.\n\n**Step 2.** Full fine-tuning: all layers are trained, usually with a lower learning rate for early layers (which encode more general features) than for later layers (which are more task-specific).\n\n**Step 3.** With sufficient target data (e.g., $> 50{,}000$ images), fine-tuning all layers typically outperforms frozen features because the backbone can be adapted to target-task specifics (e.g., different visual domains).",
      hints: [
        "With few target images, updating pretrained features risks overfitting — freezing protects the general features.",
        "With many target images, the pretrained features may not be optimal for the target domain — updating them adapts to the target task.",
      ],
    },
    {
      id: "q-cv-kp8-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When fine-tuning a pretrained CNN on a new classification task, why is it common to use a lower learning rate for the early layers compared to the later layers?",
      options: [
        "Early layers have more parameters than later layers, so a lower learning rate prevents numerical instability.",
        "Early layers encode general visual features (edges, textures, shapes) that transfer well across tasks, while later layers encode more task-specific features — a lower LR preserves the general features.",
        "The learning rate schedule requires early layers to converge first before later layers can update effectively.",
        "Lower learning rates for early layers reduce GPU memory usage during training.",
      ],
      correctAnswer: 1,
      explanation:
        "CNN features are hierarchical: early layers learn general visual primitives (edges, blobs, textures) that transfer across tasks; later layers learn more abstract, task-specific concepts.\n\n**Step 1.** If we use the same high learning rate for all layers, the large gradient signals in early layers could drastically perturb the well-learned general features, destroying useful representations.\n\n**Step 2.** A lower learning rate for early layers (e.g., $0.1 \\times$ the main learning rate) allows gentle adaptation while preserving the transferred knowledge.\n\n**Step 3.** This is an example of \"linear learning rate scaling\" — lower layers get lower LR. Some practitioners even freeze early layers entirely for very small datasets.",
      hints: [
        "Early layers learn general features (edges, textures) that transfer across tasks. Later layers are more task-specific. Which should be updated more cautiously?",
        "If early layers encode transferable general features, what happens if we update them with a large learning rate?",
      ],
    },
    {
      id: "q-cv-kp8-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "The softmax function normalises a vector of $K$ logits $[z_1, \\ldots, z_K]$ into a probability distribution $p_i = e^{z_i} / \\sum_{j=1}^K e^{z_j}$. Its output is sensitive to the scale of the logits — multiplying all logits by a constant $c > 1$ makes the output distribution more peaked (higher confidence).",
      correctAnswer: 1,
      explanation:
        "Softmax is scale-sensitive: the temperature $T$ in $\\softmax(z/T)$ controls the peakedness. With $T < 1$ (or equivalently multiplying logits by $c > 1$), the distribution becomes sharper.\n\n**Step 1.** As $T \\to 0^+$, softmax approaches argmax (one-hot). As $T \\to \\infty$, softmax approaches uniform.\n\n**Step 2.** For $T < 1$, large logit differences are amplified — the largest logit dominates, producing a near-one-hot distribution. For $T > 1$, the distribution softens toward uniform.\n\n**Step 3.** In knowledge distillation, a high temperature ($T > 1$) softens the teacher's probability distribution, revealing inter-class similarities (e.g., \"a cat is more similar to a dog than to a car\") that hard labels hide.",
      hints: [
        "Softmax with $T < 1$ (or scaled logits) amplifies differences, producing higher confidence. $T \\to 0$ approaches one-hot.",
        "In softmax: $p_i = e^{z_i/T} / \\sum_j e^{z_j/T}$. As $T$ decreases, the exponential peaks more sharply at the largest $z_i$.",
      ],
    },
    {
      id: "q-cv-kp8-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The CLIP model trains a dual image-text encoder with a contrastive (InfoNCE) loss on $N$ image-text pairs. For a batch of $N = 4$ pairs, how many negative pairs does the loss use?",
      options: [
        "4 negatives (one negative per positive pair)",
        "12 negatives ($N^2 - N = 12$)",
        "8 negatives (2 negatives per positive)",
        "16 negatives ($N^2 = 16$)",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP constructs an $N \\times N$ similarity matrix. Each diagonal entry (image $i$ matched with text $i$) is a positive pair. All off-diagonal entries are negatives.\n\n**Step 1.** Positives: the $N$ diagonal entries (image $i$ with text $i$).\n\n**Step 2.** Negatives: all off-diagonal entries — image $i$ with every other text, and vice versa: $N^2 - N = 4^2 - 4 = 12$.\n\n**Step 3.** Large batch sizes ($N = 32768$ in CLIP's training) provide abundant negatives, which is crucial for performance — more hard negatives means a harder contrastive task and better representations.",
      hints: [
        "An $N \\times N$ matrix has $N$ diagonal (positive) and $N^2 - N$ off-diagonal (negative) entries.",
        "For $N = 4$: $4^2 = 16$ total pairs, 4 on the diagonal are positives, $16 - 4 = 12$ are negatives.",
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
        "In CutMix, two training images $x_1$ (class A) and $x_2$ (class B) are combined by copying a rectangular patch from $x_2$ into $x_1$. If the patch occupies $30\\%$ of the image area, what are the training label for the combined image?",
      options: [
        "Hard label: class A (the original image's class)",
        "Soft label: $0.7 \\times \\text{one-hot}(A) + 0.3 \\times \\text{one-hot}(B)$",
        "The label is randomly assigned to either A or B with $50\\%$ probability.",
        "The label is determined by the majority class of the non-patched region.",
      ],
      correctAnswer: 1,
      explanation:
        "CutMix creates training examples by mixing both the image pixels and the labels proportionally to the patch area.\n\n**Step 1.** The combined image $x_{\\text{mixed}} = M \\odot x_2 + (1 - M) \\odot x_1$, where $M$ is a binary mask (1 inside the patch, 0 outside) and $\\odot$ is element-wise multiplication.\n\n**Step 2.** The label is mixed proportionally: $y_{\\text{mixed}} = 0.3 \\cdot \\text{one-hot}(A) + 0.7 \\cdot \\text{one-hot}(B)$ if the patch covers $30\\%$ from image B and $70\\%$ from image A.\n\n**Step 3.** This is different from Cutout (which zeros out a patch and keeps the original label) and from Mixup (which blends entire images). CutMix forces the classifier to learn from partial views, improving localisation.",
      hints: [
        "CutMix mixes both pixels AND labels proportionally to patch area. The label is a convex combination of the two one-hot labels.",
        "If $30\\%$ of the image comes from class B, what weight does class B receive in the soft label?",
      ],
    },
    {
      id: "q-cv-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "AutoAugment (Cubuk et al., 2018) uses reinforcement learning to search for an optimal composition of augmentation policies. Each policy consists of $N$ sub-policies applied sequentially. What does each sub-policy contain?",
      options: [
        "A list of all training images to be mixed with the current batch",
        "An augmentation operation (e.g., translate, colour inversion) and two hyperparameters: the probability of applying the operation and the magnitude of the transformation",
        "A learned neural network that determines which augmentation to apply based on the current training loss",
        "A fixed sequence of geometric transforms that are always applied in the same order",
      ],
      correctAnswer: 1,
      explanation:
        "AutoAugment discovered that optimal augmentation policies are task-dependent — what works for ImageNet differs from what works for CIFAR-10.\n\n**Step 1.** Each sub-policy is defined as $(operation, probability, magnitude)$. For example: (Rotate, $p = 0.5$, magnitude $= 30°$). With probability $0.5$, the image is rotated by $30°$.\n\n**Step 2.** A policy contains $N = 2$ sub-policies applied sequentially. With $25$ sub-policies per policy and $5$ policies searched per task, AutoAugment found policies that significantly improved accuracy.\n\n**Step 3.** The key insight: augmentation is a hyperparameter that can be optimised, not just a fixed recipe. Later works (Fast AutoAugment, RandAugment) made this more computationally practical.",
      hints: [
        "AutoAugment searches over augmentation operations. Each operation needs: (1) should I apply it? (probability), and (2) how strongly? (magnitude).",
        "The search space includes: which operation, with what probability, and at what strength. These three components define a sub-policy.",
      ],
    },
    {
      id: "q-cv-kp9-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In RandAugment (Cubuk et al., 2019), the number of augmentation operations applied sequentially ($N$) and the magnitude of each operation ($M$) are the only two hyperparameters — dramatically simplifying the search space compared to AutoAugment while achieving comparable performance.",
      correctAnswer: 1,
      explanation:
        "AutoAugment searches over $16$ operations $\\times$ $10$ probability values $\\times$ $10$ magnitude values per sub-policy, plus $N = 2$ sub-policies per policy — an enormous search space requiring a controller RNN and proxy datasets.\n\n**Step 1.** RandAugment reduces this to just two parameters: $N$ (number of operations applied sequentially) and $M$ (magnitude shared across all operations). For ImageNet: $N = 2$, $M = 9$ (out of 30).\n\n**Step 2.** By sharing $M$ across operations, RandAugment dramatically reduces the search space from $> 10^{16}$ configurations to just $N \\times M = 30$ possibilities.\n\n**Step 3.** The dramatic simplification works because: as $N$ grows, the effect of any individual operation's probability becomes less critical — what matters is that some augmentations are applied at strength $M$.",
      hints: [
        "AutoAugment searches over: which operation, at what probability, at what magnitude. RandAugment fixes probability $= 1/N$ and searches only: how many operations ($N$) and at what magnitude ($M$).",
        "With $N = 2$ and $M$ from 1 to 30, there are only 30 configurations to try instead of $> 10^{16}$.",
      ],
    },
    {
      id: "q-cv-kp9-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Cutout augmentation randomly masks out a square region of the input image during training. What is the primary mechanism by which Cutout improves test accuracy, and why does removing pixels (setting them to 0) work better than replacing them with the mean pixel value?",
      options: [
        "Cutout removes information, forcing the classifier to rely on the most discriminative features. Setting to 0 is equivalent to mean-filling because the network learns to ignore zeroed inputs anyway.",
        "Cutout creates partially occluded views that simulate natural occlusion, improving robustness and encouraging the network to use distributed features rather than relying on a small set of discriminative features.",
        "Cutout is a regularisation technique that reduces the effective number of training pixels, preventing the network from overfitting to specific pixel patterns.",
        "Cutout works better than mean-filling because zero is the neutral element for ReLU activations, causing less disruption to feature statistics.",
      ],
      correctAnswer: 1,
      explanation:
        "Cutout randomly masks a $16 \\times 16$ pixel region (set to 0) during training. The key benefit is forcing the network to become robust to partial occlusion.\n\n**Step 1.** Natural images are often partially occluded (objects behind glass, partially covered by other objects). A network that relies on specific texture patches will fail when those patches are occluded.\n\n**Step 2.** Cutout removes discriminative features in the masked region, forcing the network to use alternative, perhaps less obvious, features. This leads to more distributed and robust representations.\n\n**Step 3.** Setting to 0 (rather than mean pixel value) works because ReLU networks naturally handle zero inputs well (zero is in the linear regime for ReLU). Mean filling introduces a constant offset that can shift activations into regimes where ReLU saturates.",
      hints: [
        "Cutout occludes part of the image. What does this force the classifier to do that it wouldn't otherwise do?",
        "In ReLU networks, zero input produces zero activation — this is the \"dead feature\" regime. Mean pixel value shifts all activations, potentially causing saturation.",
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
        "In the Vision Transformer (ViT), an image of size $224 \\times 224 \\times 3$ is split into $16 \\times 16$ patches. How many patches are created, and what is the dimensionality of each patch's embedding vector after the linear projection?",
      options: [
        "$196$ patches; each patch becomes a $256$-dimensional embedding.",
        "$196$ patches; each patch becomes a $768$-dimensional embedding (for ViT-Base).",
        "$16$ patches; each patch becomes a $768$-dimensional embedding.",
        "$256$ patches; each patch becomes a $192$-dimensional embedding.",
      ],
      correctAnswer: 1,
      explanation:
        "ViT splits the image into non-overlapping patches. With $16 \\times 16$ pixel patches:\n\\[\n\\frac{224}{16} = 14 \\quad \\Rightarrow \\quad 14 \\times 14 = 196 \\text{ patches}.\n\\]\n\n**Step 1.** Each $16 \\times 16 \\times 3$ patch is flattened to a $768$-dimensional vector ($16 \\times 16 \\times 3 = 768$).\n\n**Step 2.** A linear projection (a $768 \\times 768$ matrix) maps each flattened patch to an embedding dimension $D$. For ViT-Base, $D = 768$.\n\n**Step 3.** A learnable $[CLS]$ token is prepended to the sequence of 196 patch embeddings. The $[CLS]$ token's final hidden state is used for classification, similar to BERT's [CLS] token.",
      hints: [
        "Number of patches = $(224/16)^2 = 14^2 = 196$. Each patch: $16 \\times 16 \\times 3 = 768$ values.",
        "The linear projection preserves dimensionality by default: flattened patch $\\to$ $D$-dim embedding. For ViT-Base, $D = 768$.",
      ],
    },
    {
      id: "q-cv-kp10-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The original ViT paper shows that ViT requires very large datasets (JFT-300M) to outperform CNNs, while on smaller datasets (ImageNet-21k) a well-tuned CNN (e.g., ConvNeXt) often remains competitive. Why does ViT's data efficiency lag behind CNNs at smaller scales?",
      options: [
        "ViT's attention mechanism is computationally expensive, making it slower to train on small datasets.",
        "ViT lacks the inductive bias of locality and translation invariance that CNNs have, so it must learn these properties from scratch — requiring more data to generalise well.",
        "ViT's patchify stem (splitting into $16 \\times 16$ patches) loses fine-grained spatial information that CNNs preserve with their $3 \\times 3$ convolutions.",
        "The [CLS] token in ViT is poorly initialised, requiring more data to learn an effective global representation.",
      ],
      correctAnswer: 1,
      explanation:
        "CNNs have strong inductive biases: locality (each conv only looks at neighbouring pixels) and translation invariance (the same filter is applied everywhere). These are well-matched to natural image structure.\n\n**Step 1.** ViT starts from nearly zero structural priors — it must learn that nearby pixels are related (locality) and that the same object looks different at different positions (translation invariance).\n\n**Step 2.** With small datasets, these biases must be learned from data, which is data-inefficient. CNNs, with their built-in biases, can use their limited data more efficiently to learn task-specific features.\n\n**Step 3.** With large datasets (JFT-300M, 3B images), ViT can learn these biases from data, at which point its superior model capacity and flexible attention mechanism outperform CNNs. This is why ViT's data efficiency gap disappears at large scale.",
      hints: [
        "CNNs have built-in assumptions about images: nearby pixels are related, and patterns can appear anywhere. ViT has neither — it must learn everything from data.",
        "Learning locality and translation invariance from scratch vs. having them built-in — which requires more data?",
      ],
    },
    {
      id: "q-cv-kp10-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In ViT, self-attention has quadratic complexity $O(N^2)$ in the sequence length $N$. For $N = 196$ patches, this is manageable, but for higher-resolution images with more patches (e.g., $N = 4096$), the attention computation becomes prohibitively expensive — motivating hierarchical ViT designs like Swin Transformer.",
      correctAnswer: 1,
      explanation:
        "Self-attention computes attention scores between all pairs of tokens. With sequence length $N$, the attention matrix is $N \\times N$, and the cost scales as $O(N^2)$ in both computation and memory.\n\n**Step 1.** For $N = 196$ (ViT-Base at $224 \\times 224$): $196^2 = 38{,}000$ — trivial for modern GPUs.\n\n**Step 2.** For $N = 4096$ (e.g., $512 \\times 512$ images with $16 \\times 16$ patches): $4096^2 = 16{,}777{,}216$ — memory-intensive.\n\n**Step 3.** Swin Transformer uses a hierarchical (pyramid) design with shifted windows: it processes small $7 \\times 7$ windows (49 tokens) locally, only computing cross-window attention through shifting. This gives $O(N)$ window attention, making it tractable for high-resolution images.",
      hints: [
        "Attention matrix size = $N \\times N$. For $N = 196$: ~38K elements. For $N = 4096$: ~16M elements — how does Swin's windowed attention change this?",
        "Swin Transformer uses local windows (e.g., $7 \\times 7 = 49$ tokens) so that attention is computed within windows, not across all $N$ tokens.",
      ],
    },
    {
      id: "q-cv-kp10-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the original ViT, positional embeddings are added to patch embeddings to inject spatial information. These positional embeddings are not rotated or transformed between layers — the model must learn to interpret their fixed position information. What is the main limitation of this fixed positional encoding approach?",
      options: [
        "Fixed positional embeddings prevent the model from handling variable-length input sequences at inference time.",
        "Fixed positional embeddings cannot generalise to sequences longer than those seen during training because they are not data-dependent — this limits ViT to fixed input resolutions.",
        "The [CLS] token already contains positional information, making positional embeddings redundant.",
        "Fixed positional embeddings increase the number of learnable parameters too much, causing overfitting.",
      ],
      correctAnswer: 1,
      explanation:
        "ViT uses fixed sinusoidal or learnable positional embeddings that are added once at the input. These embeddings encode absolute position.\n\n**Step 1.** If trained on $224 \\times 224$ images ($14 \\times 14 = 196$ patches), the positional embeddings encode positions $0$ to $195$. At inference, a $384 \\times 384$ image has $24 \\times 24 = 576$ patches — many positions were never seen during training.\n\n**Step 2.** The model cannot generalise positions $> 195$ because it has no mechanism to produce embeddings for unseen positions. Interpolation techniques (bicubic, bilinear) can approximate but often degrade accuracy.\n\n**Step 3.** Modern architectures like Swin Transformer avoid this by using relative positional embeddings, which encode the relative offset between tokens rather than absolute positions — relative positions are bounded (e.g., $[-3, +3]$ for a $7 \\times 7$ window) and thus generalise to any input size.",
      hints: [
        "ViT's positional embeddings are added once at the input and not changed. What happens when you pass a larger image with more patches than the embeddings can represent?",
        "Relative positional embeddings encode \"token $i$ is at offset $-k$ from token $j$\" — this is bounded and generalises. Absolute embeddings encode \"token $i$ is at position $p$\" — what happens at unseen positions?",
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
        "Contrastive self-supervised learning (e.g., SimCLR) maximises agreement between differently augmented views of the same image while minimising agreement between views of different images. What property of the learned representations does this objective encourage?",
      options: [
        "Invariance to data augmentation: images that look different after augmentation should map to the same representation, while different images should map to different representations.",
        "Semantic discrimination: images of different classes should have very different L2 norms in representation space.",
        "Completeness: each representation dimension should be independently informative about all image properties.",
        "Sparse coding: only a small subset of representation dimensions should be active for any given image.",
      ],
      correctAnswer: 0,
      explanation:
        "SimCLR applies two random augmentations (random crop, colour jitter, flip, etc.) to the same image, producing two views $x_i$ and $x_j$ that should have similar representations.\n\n**Step 1.** The contrastive loss (NT-Xent) attracts representations of positive pairs (same image, different views) and repels representations of negative pairs (different images) in representation space.\n\n**Step 2.** This encourages the representation to discard augmentation-variant information (colour, orientation, cropping) while preserving semantic content — the representation becomes invariant to the augmentations.\n\n**Step 3.** After training, the learned representation projects images to a space where same-class images cluster together and different-class images are separated, enabling linear probing (a linear classifier on frozen features) to achieve strong performance.",
      hints: [
        "SimCLR applies random crops, colour jitter, and flips to create two views of the same image. The network must output the same representation for both views — what does it need to ignore?",
        "The contrastive objective asks: which information is shared between two views of the same image (invariant), and which differs (augmentation-variant)?",
      ],
    },
    {
      id: "q-cv-kp11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In MoCo (Momentum Contrast), a queue of negative keys is maintained from previous batches. How does this design enable contrastive learning without requiring a large batch size, and what is the role of the momentum encoder?",
      options: [
        "The queue stores gradients from previous batches, allowing backpropagation through historical negative samples. The momentum encoder smooths these gradients.",
        "The queue stores encoded negative keys from previous batches, providing a large and diverse set of negatives without requiring simultaneous large-batch forward passes. The momentum encoder slowly updates the key encoder to maintain consistency with the query encoder.",
        "The queue is a ring buffer that stores raw (unencoded) image patches. The momentum encoder is used to initialise the query encoder at each step.",
        "The momentum encoder applies exponential moving average updates to the queue, ensuring negative samples are current with the latest representations.",
      ],
      correctAnswer: 1,
      explanation:
        "SimCLR requires large batch sizes ($N = 4096$) to provide abundant negatives in a single forward pass. MoCo decouples the negative sample set size from batch size.\n\n**Step 1.** The queue stores $K = 65536$ encoded negative keys from previous batches. Each batch enqueues the current batch's keys and dequeues the oldest ones, maintaining a large, rolling negative bank.\n\n**Step 2.** The query encoder $q = f_q(x)$ is trained by contrastive loss against queue keys. The key encoder $k = f_k(x)$ is updated by exponential moving average (EMA) of the query encoder: $\\theta_k \\leftarrow m \\cdot \\theta_k + (1-m) \\cdot \\theta_q$ with $m \\approx 0.999$.\n\n**Step 3.** Slow momentum updates ensure the key encoder produces representations consistent with the (changing) query encoder — if keys changed too rapidly, the contrastive learning signal would be inconsistent.",
      hints: [
        "MoCo decouples the number of negatives from batch size by storing negatives in a queue. What's the problem if the key encoder changes too fast relative to the query encoder?",
        "The momentum encoder is updated as $\\theta_k \\leftarrow m \\cdot \\theta_k + (1-m) \\cdot \\theta_q$ with $m \\approx 0.999$. What does this slow update achieve?",
      ],
    },
    {
      id: "q-cv-kp11-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In BYOL (Bootstrap Your Own Latent), two networks (online and target) interact, but unlike MoCo, BYOL does not use negative pairs — only positive pairs between augmented views of the same image. This makes BYOL susceptible to representation collapse if the online and target networks both map all images to the same constant vector, which is prevented primarily by a stop-gradient operation.",
      correctAnswer: 1,
      explanation:
        "BYOL trains an online network to predict the target network's output for differently augmented views of the same image.\n\n**Step 1.** Without negatives, the trivial solution $f(x) = c$ (all images map to the same representation) is a valid optimum for the contrastive loss — it perfectly aligns all images with each other.\n\n**Step 2.** BYOL prevents this via a stop-gradient (sg) operation: the target representation is computed with a lagged (EMA) version of the online network, but gradients do NOT flow through it. The online network must predict a target that it cannot directly control.\n\n**Step 3.** If the online network collapses to a constant, the target (which lags behind) will have diverse representations, and the prediction task becomes impossible — this asymmetry, maintained by stop-gradient, is what prevents collapse. This is analogous to DINO's centering mechanism.",
      hints: [
        "The trivial solution to \"predict your own augmented view\" is to output the same vector for all images. How does stop-gradient prevent the online network from finding this solution?",
        "The target network is an EMA of the online network — it changes slowly. If the online collapses, can it still predict the diverse target representations?",
      ],
    },
    {
      id: "q-cv-kp11-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In DINO (Self-Distillation with NO labels), the student network learns to match the teacher network's output on differently augmented views of the same image. What prevents the teacher from producing degenerate (constant) outputs, and how does this differ from BYOL's mechanism?",
      options: [
        "DINO uses a cross-entropy loss with a temperature parameter that naturally prevents collapse; BYOL uses MSE which is susceptible to collapse.",
        "DINO applies a \"centering\" operation to the teacher outputs (adding a constant to the logits before softmax) which prevents any single logit from dominating, while BYOL uses stop-gradient.",
        "DINO uses teacher output centering ($c$) and sharp softmax (low temperature) to prevent collapse — the centering term shifts the teacher's output distribution to prevent it from becoming peaked, while BYOL relies on the asymmetric stop-gradient.",
        "Both DINO and BYOL use identical stop-gradient mechanisms; the only difference is that DINO uses cross-entropy loss while BYOL uses MSE.",
      ],
      correctAnswer: 2,
      explanation:
        "DINO's teacher produces a probability distribution $P\\propto \\exp(\\text{sg}(z_t)/T)$ over $K$ classes (where $z_t$ is the teacher's output). Without correction, the teacher could become arbitrarily peaked on one class.\n\n**Step 1.** DINO adds a centering term: $z_t \\leftarrow z_t - c$, where $c$ is an EMA of the teacher output mean: $c \\leftarrow m \\cdot c + (1-m) \\cdot \\mathbb{E}[z_t]$. This prevents any one logit from dominating by subtracting the average output.\n\n**Step 2.** A low temperature $T = 0.1$ sharpens the distribution, making the teacher confident but not degenerate — the stop-gradient prevents collapse by ensuring the student cannot simply match a constant.\n\n**Step 3.** BYOL uses only stop-gradient + EMA, relying on the asymmetry between student (updated) and teacher (EMA-lagged) to prevent collapse. DINO adds centering, which more directly addresses the peaked distribution problem.",
      hints: [
        "DINO's teacher output is a softmax over $K$ classes. Without any correction, it could put all mass on one class. What does centering ($z_t - c$) do to prevent this?",
        "BYOL uses stop-gradient + EMA. DINO uses stop-gradient + EMA + centering + low temperature. What does centering add that stop-gradient alone doesn't provide?",
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
        "In the GAN framework, the generator $G$ maps a random noise vector $z \\sim N(0, I)$ to a data sample $G(z)$. The discriminator $D$ outputs the probability that a sample is real. What does the generator specifically try to maximise, and why?",
      options: [
        "$G$ maximises $D(G(z))$ — it wants the discriminator to classify its fake samples as real (high probability), fooling $D$.",
        "$G$ maximises the entropy of $D(G(z))$, ensuring diverse generated samples.",
        "$G$ minimises the KL divergence between $D(G(z))$ and a uniform distribution.",
        "$G$ maximises the difference between $D(G(z))$ and $D(x)$ for real samples $x$.",
      ],
      correctAnswer: 0,
      explanation:
        "The GAN minimax game is: $\\min_G \\max_D \\mathbb{E}_{x \\sim p_{\\text{data}}} [\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1 - D(G(z)))]$.\n\n**Step 1.** From the generator's perspective, the term $\\log(1 - D(G(z)))$ is the only one it can affect. Minimising this is equivalent to maximising $D(G(z))$ — the discriminator's estimate of the probability that the generated sample is real.\n\n**Step 2.** When $D(G(z)) = 1$, $\\log(1 - 1) = -\\infty$ — the generator has completely fooled the discriminator.\n\n**Step 3.** The Nash equilibrium occurs when $p_G = p_{\\text{data}}$ and $D(x) = 0.5$ everywhere, meaning the discriminator can no longer distinguish real from fake.",
      hints: [
        "The generator wants its outputs to be classified as real by the discriminator. What probability does it want $D(G(z))$ to be?",
        "In the minimax loss, the generator minimises $\\log(1 - D(G(z)))$. What does this mean for $D(G(z))$?",
      ],
    },
    {
      id: "q-cv-kp12-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Mode collapse in GANs occurs when the generator learns to produce a limited variety of outputs that fool the discriminator but don't cover the full diversity of the real data distribution. Which of the following statements about mode collapse is correct?",
      options: [
        "Mode collapse only occurs in the generator; the discriminator is unaffected.",
        "Mode collapse is a sign that the generator has perfectly matched the data distribution.",
        "Mode collapse happens because the generator finds and exploits weaknesses in the discriminator, repeatedly producing samples in a subset of the data manifold where the discriminator is easiest to fool.",
        "Mode collapse is caused by the discriminator overfitting to the generator's outputs.",
      ],
      correctAnswer: 2,
      explanation:
        "The real data distribution often has multiple modes (clusters), e.g., faces with different identities, dogs of different breeds. Mode collapse happens when the generator collapses to a few modes.\n\n**Step 1.** The discriminator's gradient provides a signal that is strongest where the generator currently produces samples. If the generator produces samples near one mode, the discriminator learns to reject samples from that region.\n\n**Step 2.** The generator then shifts to a different region that the discriminator currently finds harder to distinguish. Over repeated iterations, the generator oscillates between modes, never learning to cover them all.\n\n**Step 3.** Mitigation strategies: unrolled GANs (where the generator considers how the discriminator would update), Mini-Batch Discriminators (where the discriminator sees multiple samples at once to detect lack of diversity), and Wasserstein GANs (which give a smoother gradient even when the generator is poor).",
      hints: [
        "Mode collapse means the generator produces limited variety. Where does the discriminator's gradient signal come from, and what does it tell the generator?",
        "If the generator produces samples in region A where the discriminator is weak, it gets a good gradient. What prevents it from also covering regions B, C, D...?",
      ],
    },
    {
      id: "q-cv-kp12-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a Variational Autoencoder (VAE), the encoder $q_\\phi(z|x)$ produces a mean $\\mu$ and log-variance $\\log \\sigma^2$ for each latent dimension, enabling sampling $z \\sim N(\\mu, \\sigma^2)$. The KL regularisation term $\\mathcal{L}_{\\text{KL}} = \\frac{1}{2}(\\mu^2 + \\sigma^2 - \\log \\sigma^2 - 1)$ encourages the posterior to be close to the prior $N(0, I)$.",
      correctAnswer: 1,
      explanation:
        "The VAE objective is $\\mathcal{L} = \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] - D_{\\text{KL}}(q_\\phi(z|x) \\| p(z))$. The KL term is the regulariser.\n\n**Step 1.** The KL between $q_\\phi(z|x) = N(\\mu, \\sigma^2)$ and $p(z) = N(0, I)$ has the closed form:\n\\[\nD_{\\text{KL}} = \\frac{1}{2}\\left(\\mu^2 + \\sigma^2 - \\log \\sigma^2 - 1\\right).\n\\]\n\n**Step 2.** Minimising this term encourages $\\mu \\to 0$ and $\\sigma \\to 1$, pulling the posterior toward the standard normal prior. Without this term, the encoder could produce degenerate posteriors.\n\n**Step 3.** The reconstruction term $\\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)]$ ensures the latent code is useful for reconstructing the input. The balance between reconstruction and KL is key to the VAE's regularised latent space.",
      hints: [
        "The KL term has closed form for Gaussians: $D_{\\text{KL}}(N(\\mu, \\sigma^2) \\| N(0, I)) = \\frac{1}{2}(\\mu^2 + \\sigma^2 - \\log \\sigma^2 - 1)$.",
        "Minimising the KL term pushes $\\mu \\to 0$ and $\\sigma \\to 1$ — what does this mean for the latent space structure?",
      ],
    },
    {
      id: "q-cv-kp12-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "StyleGAN uses progressive growing (starting from low resolution and gradually adding layers) and introduces a mapping network $f: \\mathcal{Z} \\to \\mathcal{W}$ that transforms the input noise $z$ into an intermediate latent space $\\mathcal{W}$. What is the primary motivation for this mapping network?",
      options: [
        "The mapping network reduces the dimensionality of $z$ to make the generator faster to train.",
        "The mapping network disentangles the factors of variation in $z$, enabling intuitive and independent control of attributes (pose, identity, texture) in the generated images by modifying different components of $w \\in \\mathcal{W}$.",
        "The mapping network applies batch normalisation to the noise vector, stabilising training.",
        "The mapping network ensures that the latent distribution remains Gaussian through the generator.",
      ],
      correctAnswer: 1,
      explanation:
        "In a standard GAN, the latent space is entangled — changing $z$ in one dimension affects multiple attributes simultaneously. StyleGAN's mapping network enables independent control.\n\n**Step 1.** The mapping network $f: \\mathbb{R}^{512} \\to \\mathbb{R}^{512}$ (8-layer MLP) transforms $z \\sim N(0, I)$ to $w \\in \\mathcal{W}$. Since $w$ is not constrained to be Gaussian, the mapping can warp the latent space.\n\n**Step 2.** This warp disentangles factors of variation: in $\\mathcal{W}$, directions become more correlated with semantic attributes (pose, age, hair colour), making attribute manipulation intuitive.\n\n**Step 3.** Additionally, styles are injected at each resolution via adaptive instance normalisation (AdaIN), allowing coarse styles (pose, identity) and fine styles (texture, colour) to be controlled independently at different scales.",
      hints: [
        "In a standard GAN, $z$ is entangled — changing one dimension affects multiple attributes simultaneously. The mapping network $f$ warps $\\mathcal{Z}$ to $\\mathcal{W}$. What does this warping achieve?",
        "AdaIN in StyleGAN injects styles at multiple resolutions. The mapping network ensures the styles are disentangled — coarse vs. fine attributes can be controlled independently.",
      ],
    },
  ],

  // ── cv-kp-13: Optical Flow & Video Understanding ──────────────────────────
  "optical-flow": [
    {
      id: "q-cv-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Optical flow estimates the apparent motion field between two consecutive video frames. Under the brightness constancy assumption, $I(x, y, t) = I(x + u, y + v, t + 1)$, what does this equation assert?",
      options: [
        "Pixel intensity is conserved under motion: the pixel at $(x, y)$ at time $t$ has the same intensity as the pixel at $(x+u, y+v)$ at time $t+1$.",
        "The sum of squared differences between two frames is minimised by the flow field $(u, v)$.",
        "The image intensity at $(x, y, t)$ is a linear function of the flow $(u, v)$.",
        "The motion field $(u, v)$ is constant across all pixels in a local neighbourhood.",
      ],
      correctAnswer: 0,
      explanation:
        "Brightness constancy is the foundational assumption of most optical flow methods.\n\n**Step 1.** The equation $I(x, y, t) = I(x + u, y + v, t + 1)$ states that a point's intensity doesn't change when it moves — the pixel value is preserved along its motion trajectory.\n\n**Step 2.** In practice, this means: if a white car moves right by 5 pixels between frames, the intensity at the car's old location at time $t+1$ equals the intensity at its new location at time $t$.\n\n**Step 3.** This assumption is violated at occlusion boundaries, specular reflections, and illumination changes — classic failure cases for classical flow methods like Lucas-Kanade.",
      hints: [
        "Brightness constancy = the appearance of a point doesn't change as it moves. What equation captures \"same pixel value, different location/time\"?",
        "The equation $I(x, y, t) = I(x+u, y+v, t+1)$ says: the pixel at $(x, y)$ now has the same intensity as the pixel at $(x+u, y+v)$ a moment later.",
      ],
    },
    {
      id: "q-cv-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Lucas-Kanade optical flow method assumes that the flow $(u, v)$ is constant in a small local neighbourhood $N$ of pixels. How does it use this assumption to estimate flow from the brightness constancy equation?",
      options: [
        "It applies a $3 \\times 3$ median filter to the image and estimates flow on the filtered result.",
        "It solves a least-squares problem: finds $(u, v)$ that minimises $\\sum_{(x,y) \\in N} [I(x,y,t) - I(x+u, y+v, t+1)]^2$ over the neighbourhood $N$.",
        "It estimates $(u, v)$ by computing the autocorrelation of the image patch at $(x, y)$.",
        "It computes the gradient of the image along $x$ and $y$ directions and sets $(u, v)$ proportional to these gradients.",
      ],
      correctAnswer: 1,
      explanation:
        "The brightness constancy equation $I_x u + I_y v + I_t = 0$ (linearisation of $I(x+u, y+v, t+1) \\approx I(x, y, t) + I_x u + I_y v + I_t$) gives one equation per pixel.\n\n**Step 1.** With two unknowns $(u, v)$ and one equation per pixel, the system is underdetermined for a single pixel. The constant-flow assumption allows pooling information across a neighbourhood.\n\n**Step 2.** Over a neighbourhood $N$, we get $|N|$ equations in 2 unknowns. The least-squares solution minimises the sum of squared errors:\n\\[\n\\min_{u,v} \\sum_{(x,y) \\in N} [I_x u + I_y v + I_t]^2.\n\\]\n\n**Step 3.** This can be written in matrix form $A \\mathbf{v} = b$ and solved via the normal equations $A^T A \\mathbf{v} = A^T b$, where $A = [\\nabla I_1, \\ldots, \\nabla I_n]^T$ and $b = -I_t$.",
      hints: [
        "The brightness constancy equation gives one equation per pixel but two unknowns ($u, v$). How do you solve an underdetermined system?",
        "The constant-flow assumption means all pixels in the neighbourhood share the same $(u, v)$. This gives $|N|$ equations for 2 unknowns — an overdetermined system solvable by least squares.",
      ],
    },
    {
      id: "q-cv-kp13-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In the RAFT (Recurrent All-Pairs Field Transform) optical flow network, the iterative refinement process uses a correlation volume that encodes similarity between all pairs of pixels from frame 1 and frame 2. This correlation volume has shape $H \\times W \\times H \\times W$, making it memory-intensive for high-resolution images — RAFT addresses this with a $4$-dimensional lookup that extracts a local correlation neighbourhood rather than using the full volume.",
      correctAnswer: 1,
      explanation:
        "RAFT is a deep learning approach to optical flow that uses iterative refinement of an initial flow estimate.\n\n**Step 1.** RAFT builds a full correlation volume $C$ where $C_{i,j,k,l} = \\langle f_1(i,j), f_2(k,l) \\rangle$ between all pixel pairs from frame 1 and frame 2 features. For a $H \\times W$ feature map, this is $H \\times W \\times H \\times W$.\n\n**Step 2.** For a $256 \\times 256$ image, this would be $256^4 \\approx 4.3 \\times 10^9$ entries — impossible to store. RAFT uses a 4D lookup that extracts local correlation neighbours around the current flow guess.\n\n**Step 3.** At each iteration, RAFT uses the current flow estimate to look up local correlation features, concatenates them with the current hidden state, and updates the hidden state via a GRU. This allows precise, iterative flow refinement without storing the full correlation volume.",
      hints: [
        "Full correlation volume: $H \\times W \\times H \\times W$. For $256 \\times 256$: $256^4 \\approx 4.3$B entries. How does RAFT's 4D lookup avoid this?",
        "RAFT uses the current flow estimate to look up local correlation features around the flow-warped positions — this is a sparse, efficient lookup.",
      ],
    },
    {
      id: "q-cv-kp13-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In TVNet (Task-Driven Video Analytics), a key challenge is that computing optical flow for every frame of a long video is computationally prohibitive. What is the main strategy to reduce cost while maintaining reasonable accuracy?",
      options: [
        "TVNet processes every frame at lower spatial resolution, reducing computation but also reducing accuracy for small moving objects.",
        "TVNet uses a sparse flow approach: compute dense flow only at key frames and propagate flow to intermediate frames using warping, reducing the number of expensive flow computations.",
        "TVNet replaces optical flow with frame differencing, which is much faster but less accurate for small motions.",
        "TVNet pre-computes a single flow field at the beginning of the video and reuses it for all subsequent frames.",
      ],
      correctAnswer: 1,
      explanation:
        "Dense optical flow (e.g., RAFT, PWC-Net) is expensive: $O(H \\cdot W)$ per frame. For a 1000-frame video at $1920 \\times 1080$, this is prohibitive.\n\n**Step 1.** The key insight: optical flow is temporally smooth — consecutive frames have similar flow fields. TVNet exploits this by computing dense flow only at sparse key frames (e.g., every 10th frame).\n\n**Step 2.** For intermediate frames, flow is propagated by warping the nearest key-frame flow using frame differencing or a lightweight propagation network. This avoids the expensive CNN forward pass for most frames.\n\n**Step 3.** Adaptive key-frame selection (choosing key frames when scene changes significantly) further reduces computation while preserving accuracy during cuts, camera pans, and occlusion events.",
      hints: [
        "Dense flow is $O(H \\cdot W)$ per frame. Long videos have hundreds of frames — what's the key temporal property of flow that allows savings?",
        "If consecutive frames have similar flow, can you avoid computing flow for every frame? What would you compute instead for intermediate frames?",
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
        "In CT imaging, Hounsfield Units (HU) quantise X-ray attenuation as $\\text{HU} = 1000 \\times (\\mu - \\mu_{\\text{water}})/\\mu_{\\text{water}}$. Water has HU $= 0$ and air has HU $= -1000$. Why is this scale useful for medical image analysis?",
      options: [
        "HU values are independent of the CT scanner model, enabling transfer learning across different scanners.",
        "HU values provide a standardised, physically meaningful scale where tissue types (water-equivalent, bone, fat, air) have consistent ranges regardless of scanner calibration, facilitating deep learning feature extraction.",
        "HU values encode patient-specific information that can be used for biometric identification.",
        "HU values are normalised to $[0, 1]$ for use in neural network inputs.",
      ],
      correctAnswer: 1,
      explanation:
        "The Hounsfield scale is a quantitative measure of X-ray attenuation standardised to water and air.\n\n**Step 1.** Air ($\\text{HU} = -1000$), water ($\\text{HU} = 0$), and dense bone ($\\text{HU} \\approx +1000$) have consistent HU ranges across all CT scanners, enabling standard windowing (display range selection) for different tissues.\n\n**Step 2.** For deep learning, the consistent HU scale means that pretrained models can learn meaningful tissue-specific features: bone has HU $> 400$, soft tissue has HU $0$–$100$, fat has HU $-100$ to $-50$.\n\n**Step 3.** Multi-planar reconstruction (MPR) and 3D volume rendering use HU windowing to isolate specific tissue types — a preprocessing step that is standardised across scanners, unlike native pixel values.",
      hints: [
        "The HU scale is standardised: water $= 0$, air $= -1000$, bone $\\approx +1000$. What does this standardisation enable?",
        "Different CT scanners may have different raw pixel intensities, but HU values are standardised to water/air reference points.",
      ],
    },
    {
      id: "q-cv-kp16-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The U-Net architecture is widely used in medical image segmentation. What is the key architectural feature that makes it particularly effective for segmenting organs and tumours in volumetric medical data (e.g., CT, MRI)?",
      options: [
        "U-Net uses self-attention layers that can model long-range dependencies in 3D volumetric data.",
        "U-Net combines encoder (localisation) and decoder (semantic) pathways with skip connections at the same resolution, enabling precise localisation while maintaining semantic context.",
        "U-Net replaces convolutions with fully connected layers to increase receptive field for 3D data.",
        "U-Net applies 3D convolutions by default in all encoder and decoder blocks.",
      ],
      correctAnswer: 1,
      explanation:
        "U-Net's encoder-decoder structure with skip connections is well-suited to medical image segmentation where both precise boundary localisation and semantic understanding are needed.\n\n**Step 1.** The encoder path captures semantic context (what organ is present) but loses spatial resolution. The decoder path recovers spatial resolution through upsampling.\n\n**Step 2.** Skip connections at each resolution level copy encoder features to the decoder, providing fine-grained spatial detail that the decoder alone would lose. This is critical for delineating organ boundaries and tumour margins.\n\n**Step 3.** For 3D volumes, 2.5D approaches (using 2D U-Nets on orthogonal slices) or 3D U-Nets (with 3D convs and pooling) are common, balancing accuracy against GPU memory constraints.",
      hints: [
        "Medical image segmentation needs both semantic understanding (what is this region?) and precise localisation (where exactly is the boundary?). Which U-Net path does each?",
        "Skip connections copy encoder features at matching resolutions to the decoder. What spatial information does this preserve?",
      ],
    },
    {
      id: "q-cv-kp16-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "nnU-Net ('no-new-Net') outperforms most task-specific medical image segmentation methods without any manual architecture engineering. It automatically selects architecture variant (2D/3D/cascade U-Net), patch size, batch size, normalisation strategy, and resampling parameters by analysing a new dataset's 'fingerprint' (image dimensions, voxel spacing, modality, target structure size).",
      correctAnswer: 1,
      explanation:
        "nnU-Net (Isensee et al., 2018) demonstrated that automated configuration selection often outperforms hand-crafted architectures.\n\n**Step 1.** The dataset fingerprint analysis includes: image dimensionality (2D vs 3D), image size ($H \\times W \\times D$), voxel spacing, and the physical size of the target structure. These determine the optimal patch size and batch size.\n\n**Step 2.** Based on the fingerprint, nnU-Net decides: (1) whether to use 2D or 3D U-Net, (2) the patch size (must be large enough to capture target structure context), (3) batch size (must be large enough for stable BN), and (4) resampling strategy (resample all images to the same voxel spacing).\n\n**Step 3.** This won the Medical Segmentation Decathlon (MSD) — 7 tasks, state-of-the-art on most without any task-specific tuning. The key insight: for most medical imaging tasks, data management (normalisation, resampling, augmentation) matters more than novel architectures.",
      hints: [
        "nnU-Net won the Medical Segmentation Decathlon with automated configuration, not novel architectures. What does it automatically configure based on the dataset?",
        "For a small organ (e.g., brain tumour), what patch size is needed vs. a large organ (e.g., liver)?",
      ],
    },
    {
      id: "q-cv-kp16-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In medical image classification, class imbalance is a common challenge (e.g., rare diseases with few positive examples). Which technique is most directly targeted at addressing this during training?",
      options: [
        "Transfer learning from ImageNet, which provides balanced feature representations.",
        "Data augmentation focused on the minority class (e.g., random rotations, flips of rare disease images), combined with weighted loss that upweights minority class errors.",
        "Using a deeper backbone (e.g., ResNet-152 instead of ResNet-50) to increase model capacity for the rare class.",
        "Increasing the learning rate to accelerate convergence on the rare class.",
      ],
      correctAnswer: 1,
      explanation:
        "Class imbalance is endemic in medical imaging: rare diseases have few positive examples. Multiple strategies are needed.\n\n**Step 1.** Weighted loss assigns higher weight to the minority class: $L = -\\frac{1}{N}\\sum_i w_{y_i} \\log p(y_i | x_i)$, where $w_{\\text{rare}} > w_{\\text{common}}$. This makes the network \"care more\" about errors on rare diseases.\n\n**Step 2.** Data augmentation (random rotations, elastic deformations, intensity transformations) synthetically increases minority class diversity, reducing overfitting to the few rare examples.\n\n**Step 3.** Techniques like focal loss ($\\text{FL}(p) = -(1-p)^\\gamma \\log p$) further address imbalance by downweighting easy examples (which are predominantly from the majority class) and focusing learning on hard, misclassified examples.",
      hints: [
        "Standard cross-entropy treats all errors equally. In class imbalance, what happens to gradients from the majority class vs. minority class?",
        "Focal loss applies $(1-p)^\\gamma$ to downweight easy examples. Which class has more easy examples?",
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
        "In zero-shot learning (ZSL), a model must classify images from classes not seen during training. What information bridges the gap between seen classes and unseen classes?",
      options: [
        "A semantic embedding space where both seen-class and unseen-class names are represented as vectors, enabling the model to recognise unseen classes based on their semantic proximity to seen classes.",
        "A small set of labelled images from each unseen class (even 1–5 examples), used to fine-tune the classifier.",
        "A generative model that synthesises training images for unseen classes from text descriptions.",
        "A hierarchical taxonomy that groups classes by visual similarity.",
      ],
      correctAnswer: 0,
      explanation:
        "Zero-shot learning uses semantic embeddings to transfer knowledge from seen to unseen classes.\n\n**Step 1.** During training, the model learns to map images to an embedding space where class names (e.g., \"zebra\", \"horse\") are also embedded (via word2vec, GloVe, or language model embeddings).\n\n**Step 2.** At test time, the unseen class (\"zebra\") has a known semantic embedding. The model classifies the query image by finding the nearest seen-class embedding — if the image embedding is closer to \"zebra\" than to \"horse\", it classifies as zebra.\n\n**Step 3.** This requires that the semantic embedding space is structured such that visually similar classes are also close in the embedding — \"zebra\" is close to \"horse\" in both visual and semantic space, allowing knowledge transfer.",
      hints: [
        "The model sees zebras during training but is tested on giraffes. What bridge allows it to recognise giraffes without training examples?",
        "The semantic embedding of \"giraffe\" is a vector. The model has image embeddings. How are these compared?",
      ],
    },
    {
      id: "q-cv-kp17-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In attribute-based zero-shot learning, an image is classified by comparing its predicted attribute vector to the attribute signature of each class. What is the key advantage of attributes over class name embeddings (e.g., word2vec)?",
      options: [
        "Attributes are learned from data, making them more accurate than pre-trained word embeddings.",
        "Attributes are manually defined properties (e.g., \"has stripes\", \"is tall\") that are more interpretable and can be composable — a \"stripy tall animal\" could describe both giraffes and giraffe-like mythical creatures.",
        "Attributes require no training data, while word embeddings require large text corpora.",
        "Attributes are always continuous vectors, while word embeddings can be discrete.",
      ],
      correctAnswer: 1,
      explanation:
        "Attribute-based ZSL (e.g., DeViSe, ALE) explicitly represents each class by its attribute vector.\n\n**Step 1.** Attributes are manually defined or learned properties: \"has stripes\", \"is tall\", \"lives in Africa\". Each class has a signature attribute vector.\n\n**Step 2.** The key advantage: attributes are composable. If a class \"giraffe\" has attributes \"is tall + has long neck + has spots\", the model can recognise a giraffe even if it has never seen a giraffe — as long as it has seen \"tall\", \"long neck\", and \"spots\" attributes.\n\n**Step 3.** This compositionality also enables generalisation to novel classes: a \"stripy horse\" could be classified as having attributes of horse + stripes, even if this exact class was never seen.",
      hints: [
        "Attributes are described as \"has stripes\", \"is tall\". How does composability help ZSL?",
        "A \"stripy horse\" isn't in the training set, but if you know what stripes are and what a horse is...",
      ],
    },
    {
      id: "q-cv-kp17-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In few-shot learning, an episode consists of a support set (few examples per class) and a query set (unlabelled examples to classify). The model learns to classify with few examples by learning a similarity function or a parameter initialisation that generalises quickly to new classes.",
      correctAnswer: 1,
      explanation:
        "Episodic training is the dominant paradigm in few-shot learning.\n\n**Step 1.** Each episode simulates a few-shot task: the support set contains $N$ classes with $K$ examples each ($N$-way, $K$-shot), and the query set contains unlabelled examples to classify.\n\n**Step 2.** The model learns to produce embeddings where examples of the same class cluster together and examples of different classes are separated. At test time, new classes (unseen in training) are clustered based on support set embeddings.\n\n**Step 3.** Methods like Prototypical Networks compute a prototype (mean embedding) for each class in the support set and classify query examples by nearest prototype. The key insight: the embedding function must generalise from training classes to novel classes — this is the metalearning objective.",
      hints: [
        "In $5$-way, $1$-shot learning, the support set has 5 classes with 1 example each. How does the model classify query images?",
        "Prototypical networks compute the mean embedding of support examples as the class prototype. How does a query get classified?",
      ],
    },
    {
      id: "q-cv-kp17-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MAML (Model-Agnostic Meta-Learning) learns a model initialisation that can quickly adapt to new tasks with few gradient steps. What is the key mechanism by which MAML achieves fast adaptation?",
      options: [
        "MAML pre-trains a model on all available tasks simultaneously, averaging gradients across tasks to find a single best initialisation.",
        "MAML learns an initialisation $\\theta$ such that gradient steps on a new task's support set produce parameters $\\theta'_i = \\theta - \\alpha \\nabla_\\theta \\mathcal{L}_{\\text{support}}$ that are near-optimal for that task — the initialisation is close to many task-specific optima.",
        "MAML uses a attention mechanism to identify support set examples most relevant to each query example.",
        "MAML pre-trains a feature extractor and only adapts the classification head during meta-testing.",
      ],
      correctAnswer: 1,
      explanation:
        "MAML is a meta-learning algorithm that optimises for rapid adaptation to new tasks.\n\n**Step 1.** In each episode, MAML samples a task $\\mathcal{T}_i$, computes the loss on its support set, and takes $k$ gradient steps to produce task-specific parameters $\\theta'_i = \\theta - \\alpha \\nabla_\\theta \\mathcal{L}(\\theta)$.\n\n**Step 2.** MAML then evaluates on the query set using $\\theta'_i$ and computes a second-order gradient through the adaptation steps: $\\nabla_\\theta \\mathcal{L}_{\\text{query}}(\\theta'_i)$. This gradient updates the initial $\\theta$.\n\n**Step 3.** The key property: $\\theta$ is near the basin of many task-specific loss landscapes, so few gradient steps from $\\theta$ rapidly reach low loss on a new task. This is why MAML adapts in 1–5 gradient steps.",
      hints: [
        "MAML finds an initialisation $\\theta$ such that few gradient steps from $\\theta$ reach low loss on a new task. What property must $\\theta$ have?",
        "If $\\theta$ is already near the task-specific optimum, few steps are needed. What does MAML optimise to achieve this?",
      ],
    },
  ],

  // ── cv-kp-18: Image Retrieval & Hashing ───────────────────────────────────
  "image-retrieval": [
    {
      id: "q-cv-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In content-based image retrieval (CBIR), given a query image, the system retrieves the most similar images from a database. What is the primary role of the feature extraction backbone (e.g., CNN) in this pipeline?",
      options: [
        "To classify the query image into one of $C$ predefined categories.",
        "To map each image to a compact vector representation (embedding) in which similarity is correlated with visual similarity.",
        "To detect and localise objects within the query image before retrieval.",
        "To compress the image to reduce storage requirements.",
      ],
      correctAnswer: 1,
      explanation:
        "CBIR systems use a CNN backbone to extract a feature vector (embedding) from each image. Similar images should have similar embeddings.\n\n**Step 1.** The backbone processes the input image and outputs a fixed-length vector (e.g., $512$-dim or $2048$-dim). This vector captures semantically meaningful visual properties.\n\n**Step 2.** At query time, the query image is embedded with the same backbone, and similarity is computed (typically cosine similarity or Euclidean distance) between the query embedding and all database embeddings.\n\n**Step 3.** The top-$k$ nearest neighbours in the embedding space are returned as the retrieval results. The quality of the embedding space — how well it clusters visually similar images — is the key determinant of retrieval accuracy.",
      hints: [
        "Given embeddings $e_1, e_2, \\ldots, e_n$, what operation finds the most similar images to a query embedding $e_q$?",
        "The backbone must map visually similar images to nearby points in the embedding space — this is the core objective of the feature extractor.",
      ],
    },
    {
      id: "q-cv-kp18-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In locality-sensitive hashing (LSH), hash functions are designed so that similar items hash to the same bucket with high probability. What property must an LSH family satisfy for cosine similarity?",
      options: [
        "The hash function is a random projection $h(x) = \\sign(w^T x)$ where $w$ is a random vector. Two vectors hash to the same bucket if their dot product with $w$ has the same sign, which occurs with probability proportional to their cosine similarity.",
        "The hash function is a cryptographic hash (e.g., SHA-256) that ensures similar images produce identical hash values.",
        "The hash function sorts image features alphabetically and assigns buckets based on feature order.",
        "The hash function uses a learned neural network to map similar images to the same bucket deterministically.",
      ],
      correctAnswer: 0,
      explanation:
        "LSH for cosine similarity uses random projections.\n\n**Step 1.** A random hyperplane $w$ defines a hash function $h(x) = \\sign(w^T x) \\in \\{0, 1\\}$. A point on the positive side of the hyperplane gets hash $1$, negative side gets hash $0$.\n\n**Step 2.** Two vectors $u$ and $v$ hash to the same bucket when they are on the same side of $w$: $P[h(u) = h(v)] = 1 - \\frac{\\theta}{\\pi}$, where $\\theta$ is the angle between $u$ and $v$. This is related to cosine similarity: $P = \\frac{1}{2} + \\frac{1}{2}\\cos\\theta$.\n\n**Step 3.** With $L$ hash tables and $K$ random hyperplanes per table, the probability that at least one table has a match is $1 - (1 - P^K)^L$, dramatically increasing recall while keeping precision high.",
      hints: [
        "Random projection LSH: $h(x) = \\sign(w^T x)$. Two vectors on the same side of $w$ get the same hash. What's the probability of this as a function of the angle between them?",
        "For cosine similarity, $P\\!(h(u) = h(v)) = 1 - \\frac{\\theta}{\\pi} = \\frac{1}{2} + \\frac{1}{2}\\cos\\theta$.",
      ],
    },
    {
      id: "q-cv-kp18-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In triplet loss training for image retrieval, the objective $\\mathcal{L} = \\max(0, d(a, p) - d(a, n) + \\alpha)$ pushes the anchor $a$ and positive $p$ (same class) closer together than the anchor and negative $n$ (different class) by at least margin $\\alpha$. This is typically implemented by sampling hard negatives (those with smallest $d(a, n)$) to provide the most informative gradients.",
      correctAnswer: 1,
      explanation:
        "Triplet loss is a standard approach for learning visual similarity embeddings.\n\n**Step 1.** Anchor-positive pairs share the same identity; anchor-negative pairs have different identities. The loss enforces $d(a,p) < d(a,n) - \\alpha$, so positives are closer than negatives by at least $\\alpha$.\n\n**Step 2.** If negatives are too easy (already far from the anchor), the loss is zero and no gradient is provided — this is a \"semi-hard\" negative. Sampling hard negatives (closest to the anchor among negatives) provides the strongest learning signal.\n\n**Step 3.** Online triplet mining (selecting triplets within each batch) is more efficient than offline mining. The ideal strategy: for each anchor, select the hardest positive (farthest same-class) and hardest negative (closest different-class) — \"hardest-hard\" triplet mining.",
      hints: [
        "If all negatives are already far from the anchor, what is $d(a,p) - d(a,n) + \\alpha$? What gradient is provided?",
        "Hard negatives are the negatives closest to the anchor. Why are these the most informative for training?",
      ],
    },
    {
      id: "q-cv-kp18-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Deep hashing methods (e.g., DPSH, HashNet) learn to produce compact binary hash codes (e.g., $48$-bit) directly from images via a CNN. Why are binary hash codes desirable despite causing quantisation error, and how do these methods handle the non-differentiable $\\sign(\\cdot)$ function?",
      options: [
        "Binary codes are desirable because they enable exact nearest-neighbour search in Hamming space, which is $O(1)$ per query using bitwise operations. The $\\sign(\\cdot)$ function is approximated with a straight-through estimator (STE) that passes gradients through the sign as if it were the identity.",
        "Binary codes enable fast GPU acceleration using CUDA. The $\\sign(\\cdot)$ is handled by adding a large bias to encourage binarisation during training.",
        "Binary codes eliminate the need for cosine similarity computation. The $\\sign(\\cdot)$ is approximated with a sigmoid function.",
        "Binary codes are used because they can be stored in DNA and are resistant to bit-flip errors. The $\\sign(\\cdot)$ is replaced with a learned hash layer.",
      ],
      correctAnswer: 0,
      explanation:
        "Binary hash codes enable extremely efficient retrieval via Hamming ranking.\n\n**Step 1.** Hamming distance is the number of differing bits between two binary codes. For $48$-bit codes, computing the Hamming distance between a query and $1\\text{M}$ database images takes $\\sim 1\\text{ms}$ using bitwise XOR + popcount on modern CPUs.\n\n**Step 2.** The $\\sign(x)$ function has zero gradient almost everywhere (its subgradient at $x=0$ is $[-1, 1]$). The straight-through estimator (STE) approximates: forward pass uses $\\sign(x)$, backward pass treats it as identity ($\\frac{\\partial \\sign}{\\partial x} = 1$), allowing gradient-based training.\n\n**Step 3.** Quantisation error arises because the real-valued embedding $r \\in \\mathbb{R}^D$ is binarised to $b = \\sign(r) \\in \\{-1, +1\\}^D$. Deep hashing methods use a differentiable proxy (e.g., tanh approximation) during training and only binarise at inference.",
      hints: [
        "Hamming distance between two $K$-bit codes: how is it computed efficiently? What operation on bits?",
        "$\\sign(x)$ has gradient 0 almost everywhere. What trick allows backpropagation through it during training?",
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
        "Panoptic segmentation unifies semantic segmentation (stuff classes: amorphous background regions) and instance segmentation (things classes: countable objects) into a single task. What is the key challenge in combining these two tasks?",
      options: [
        "Semantic segmentation requires per-class labels while instance segmentation requires per-instance labels — these are fundamentally incompatible objectives.",
        "Stuff and things predictions must be spatially consistent: things instances must not overlap with each other or with stuff regions, requiring a post-processing step to resolve conflicts.",
        "Instance segmentation networks cannot produce stuff predictions without significant architectural modifications.",
        "The evaluation metrics for semantic and instance segmentation are incompatible, making unified evaluation impossible.",
      ],
      correctAnswer: 1,
      explanation:
        "Panoptic segmentation's key innovation is unifying stuff (background, e.g., road, sky) and things (objects, e.g., cars, people) into one consistent scene-level output.\n\n**Step 1.** Things are countable objects with unique IDs; each pixel belongs to at most one thing instance. Stuff is amorphous regions; each pixel belongs to at most one stuff class.\n\n**Step 2.** A conflict arises when the instance segmentation system predicts a car whose pixels overlap with the road (stuff) prediction. Panoptic Quality (PQ) resolves this by preferring higher-confidence instance predictions.\n\n**Step 3.** Modern approaches (e.g., Panoptic FPN, Seamless Scene Segmentation) use a single backbone with two heads (semantic, instance) that share features, simplifying the pipeline while ensuring consistency.",
      hints: [
        "If instance segmentation predicts a car and semantic segmentation predicts \"road\" at the same pixel, who wins? How is this conflict resolved?",
        "Things instances cannot overlap with each other — each pixel belongs to exactly one thing. Stuff regions also don't overlap. Can a pixel belong to both a thing and stuff?",
      ],
    },
    {
      id: "q-cv-kp19-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Panoptic Quality (PQ) is the evaluation metric for panoptic segmentation. How is PQ computed, and what does it reward?",
      options: [
        "PQ is the pixel-wise accuracy: the fraction of pixels correctly classified (same class and instance).",
        "PQ is the product of $\\text{SegQuality} = \\frac{\\text{TP}}{|\\text{TP}| + \\frac{1}{2}|\\text{FP}| + \\frac{1}{2}|\\text{FN}|}$ (IoU-based quality) and $\\text{ReqQuality}$ (classification quality), rewarding both recognition and segmentation quality.",
        "PQ is computed as the mean IoU across all classes, similar to semantic segmentation mIoU.",
        "PQ is the F1 score of the number of correctly detected instances versus false positives and false negatives.",
      ],
      correctAnswer: 1,
      explanation:
        "PQ decomposes the task into recognition (are the right things detected?) and segmentation (are the boundaries accurate?).\n\n**Step 1.** For each matched segment pair (prediction with ground truth), $\\text{IoU} = |p \\cap g|/|p \\cup g|$. SegQuality $= \\frac{\\sum \\text{IoU}}{|\\text{TP}| + 0.5|\\text{FP}| + 0.5|\\text{FN}|}$.\n\n**Step 2.** Unmatched predictions are FP (false positives); unmatched ground truth are FN (false negatives). The 0.5 weighting penalises both equally, so a missing detection (FN) and a hallucination (FP) are equally bad.\n\n**Step 3.** ReqQuality is the classification accuracy (fraction of correctly classified pixels). PQ = SegQuality $\\times$ ReqQuality. This rewards both: detecting all instances AND segmenting them accurately.",
      hints: [
        "PQ has two components: are the right things detected? (SegQuality) and are they well-segmented? (ReqQuality).",
        "SegQuality uses IoU thresholds — higher IoU means better boundary match. Missing detections (FN) and hallucinations (FP) both receive 0.5 weight.",
      ],
    },
    {
      id: "q-cv-kp19-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In UPSNet (Unified Panoptic Segmentation Network), the network processes both stuff and things with a single head that outputs $C + 1$ channels (one per stuff class plus one for things). A deconvolution layer is used to upsample the output from the low-resolution feature map to the original image resolution, enabling pixel-accurate panoptic segmentation.",
      correctAnswer: 1,
      explanation:
        "UPSNet uses a unified architecture for both stuff and things segmentation.\n\n**Step 1.** The network outputs $C + 1$ channels: $C$ stuff classes plus a special \"things\" channel. For each spatial location, the things channel predicts a semantic label (not instance ID yet).\n\n**Step 2.** To get instance IDs, UPSNet uses a mask-based approach within the things class. The deconvolution upsamples the output to full resolution, enabling precise boundary delineation.\n\n**Step 3.** The key innovation is handling the overlap between stuff and things through a learned conflict resolution mechanism, rather than post-processing — the network learns which semantic category should win at each pixel.",
      hints: [
        "UPSNet outputs $C + 1$ channels — $C$ stuff classes and one \"things\" channel. How does it get instance IDs within the things class?",
        "Deconvolution (transposed convolution) upsamples low-resolution feature maps. Why is this needed for pixel-accurate segmentation?",
      ],
    },
    {
      id: "q-cv-kp19-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Panoptic DeepLab, panoptic segmentation is solved by adding two prediction heads to a shared backbone: a semantic head (for stuff) and an instance head (for things). How does it generate instance IDs, and how are stuff and things combined into the final panoptic output?",
      options: [
        "The instance head predicts center heatmaps and offsets for each thing, enabling center-based instance ID assignment. Stuff and things are combined by taking the max across stuff and instance class probabilities at each pixel.",
        "The instance head uses a separate instance segmentation branch (Mask R-CNN style). Stuff and things are merged using NMS across all predicted instances.",
        "The instance head uses a learned embedding space where different instances of the same class are separated by contrastive learning. Stuff is ignored in the final output.",
        "The instance head predicts semantic class only; instance IDs are assigned by connected components analysis of the semantic predictions.",
      ],
      correctAnswer: 0,
      explanation:
        "Panoptic DeepLab uses a simple and elegant center-based instance assignment.\n\n**Step 1.** The instance head predicts: (1) a center heatmap (where is the object center?) and (2) an offset field (where should each pixel point to its center?). Center positions with high heatmap response are instance centers.\n\n**Step 2.** Each thing pixel is assigned to the nearest detected center via the offset vector, giving instance IDs without mask-based segmentation (unlike Mask R-CNN).\n\n**Step 3.** At each pixel, the stuff class probability and the instance thing probability compete: the higher confidence wins. Overlapping instances of the same class are resolved by confidence ranking — the higher-confidence center wins at each pixel.",
      hints: [
        "Panoptic DeepLab's instance head predicts center heatmaps and offsets. How do these give instance IDs?",
        "Each thing pixel has an offset pointing toward its instance center. Pixels pointing to the same center belong to the same instance.",
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
        "Two-stream CNN for video classification uses one CNN for RGB frames (spatial stream) and another for optical flow fields (temporal stream). What is the key insight behind the temporal stream?",
      options: [
        "Optical flow captures motion information (how objects move) that the RGB stream cannot see, making the combined system more robust to appearance variations.",
        "Optical flow is computed from multiple consecutive frames and captures temporal information, providing a complementary signal to the static appearance of the RGB stream.",
        "Optical flow reduces the dimensionality of the video, making the network faster to train.",
        "Optical flow eliminates the need for data augmentation in the temporal domain.",
      ],
      correctAnswer: 1,
      explanation:
        "The two-stream architecture (Simonyan & Zisserman, 2014) addresses video's unique temporal dimension.\n\n**Step 1.** The RGB stream captures static appearance (what is in the frame). The optical flow stream captures motion (how things move) — e.g., swinging a tennis racket vs. holding it.\n\n**Step 2.** Optical flow represents motion as a 2-channel vector field $(u, v)$ per pixel per frame — showing displacement between frames. Stacking multiple flow frames over time gives a motion history volume.\n\n**Step 3.** At test time, predictions from both streams are combined (typically by averaging class probabilities), significantly outperforming either stream alone — demonstrating that appearance and motion are complementary.",
      hints: [
        "A person standing still and a person walking look identical in a single RGB frame. What distinguishes them in the optical flow stream?",
        "The RGB stream sees static appearance; the flow stream sees motion trajectories. How do these complement each other?",
      ],
    },
    {
      id: "q-cv-kp20-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In 3D CNNs for video (e.g., I3D, C3D), a video is treated as a $T \\times H \\times W$ volume and processed with 3D convolutions that jointly model spatial and temporal dimensions. What is the key trade-off of 3D convolutions compared to 2D convolutions applied frame-by-frame?",
      options: [
        "3D convolutions model temporal dependencies directly but are more parameter-efficient than 2D convolutions.",
        "3D convolutions model both spatial and temporal patterns in a unified way but increase parameter count and computational cost (roughly $T$-times more than 2D per frame).",
        "3D convolutions cannot model long-range temporal dependencies and require fixed-length inputs.",
        "3D convolutions replace the need for optical flow by implicitly computing motion information.",
      ],
      correctAnswer: 1,
      explanation:
        "3D CNNs extend 2D CNNs by adding a temporal dimension to filters.\n\n**Step 1.** A 2D conv applied frame-by-frame treats each frame independently, then pools temporal predictions — it cannot model motion. A 3D conv filter (e.g., $3 \\times 3 \\times 3$) spans both spatial and temporal dimensions simultaneously.\n\n**Step 2.** This enables learning motion patterns (e.g., a handshake gesture looks different from a wave at different speeds) but increases FLOPs: each 3D conv has $T \\times F \\times F$ parameters vs. $F \\times F$ for 2D.\n\n**Step 3.** Inflated ImageNet (I3D) initialises 3D conv weights by inflating 2D ImageNet pretrained weights (repeating the $F \\times F$ spatial kernel $T$ times along the time axis), leveraging strong ImageNet representations.",
      hints: [
        "A $3 \\times 3 \\times 3$ conv has how many parameters vs. a $3 \\times 3$ conv? What does the additional dimension add?",
        "2D conv applied per-frame + temporal pooling = appearance features only. 3D conv = appearance + motion patterns learned jointly.",
      ],
    },
    {
      id: "q-cv-kp20-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Video Transformer (ViViT) extends the Vision Transformer to video by treating a video as a sequence of $T$ frame tokens, where each frame token is itself a sequence of $N$ spatial patch tokens. The attention mechanism in ViViT models both spatial (within-frame) and temporal (between-frame) relationships, enabling it to capture both appearance and motion.",
      correctAnswer: 1,
      explanation:
        "ViViT (Video Vision Transformer) adapts ViT to video by constructing a hierarchy of tokens.\n\n**Step 1.** A video $V \\in \\mathbb{R}^{T \\times H \\times W \\times 3}$ is split into $T \\times N$ patches (where $N = (H/16) \\times (W/16)$), each patch becoming a token of dimension $D$.\n\n**Step 2.** ViViT applies self-attention in two forms: (1) spatial attention within each frame (capturing within-frame structure), and (2) temporal attention across frames (capturing motion and temporal dynamics).\n\n**Step 3.** The full attention matrix is $O((TN)^2)$ — quadratic in the total number of tokens. For a 16-frame video with $14 \\times 14 = 196$ patches per frame, this is $(16 \\times 196)^2 \\approx 7.8$M entries. Factorised attention (space-then-time) reduces this to $O(TN^2 + T^2N)$.",
      hints: [
        "ViViT treats each frame as a set of $N$ spatial patch tokens, and the video as $T$ such sets. What attention patterns capture motion?",
        "Full space-time attention is $O((TN)^2)$. Factorised attention first applies within-frame attention ($O(TN^2)$), then across-frame ($O(T^2N)$). Which is dominant for long videos?",
      ],
    },
    {
      id: "q-cv-kp20-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SlowFast networks use two pathways: a Slow pathway (low frame rate, high spatial resolution) and a Fast pathway (high frame rate, low spatial resolution). What is the key insight behind this design?",
      options: [
        "The Slow pathway captures semantic content (what is happening) at fine spatial resolution; the Fast pathway captures fast motion at high temporal resolution. These are processed independently and fused at the end.",
        "The Slow pathway captures fine spatial details for action recognition; the Fast pathway captures audio information that the Slow pathway cannot process.",
        "The Slow pathway is a standard 2D CNN; the Fast pathway is a lightweight 3D CNN. They are cascaded rather than parallel.",
        "Both pathways process the same frames at the same frame rate but with different channel widths.",
      ],
      correctAnswer: 0,
      explanation:
        "SlowFast decomposes the video into semantic (slow) and motion (fast) pathways.\n\n**Step 1.** The Slow pathway operates at $\\alpha = 8$ frames per clip (e.g., every 8th frame), with high channel capacity $C_\\alpha$ — capturing rich semantic information (who, what, scene).\n\n**Step 2.** The Fast pathway operates at $\\alpha/2 = 4$ frames per clip (or same frame rate with reduced channels), with low channel capacity $C_\\alpha/8$ — capturing fast motion (how things move) without needing rich semantic content.\n\n**Step 3.** Lateral connections (from Fast to Slow) allow motion features to modulate the semantic features, enabling the Slow pathway to be spatially refined by temporal dynamics. This design achieves state-of-the-art on Kinetics-400 while being computationally efficient.",
      hints: [
        "Slow pathway: low frame rate, high channels — for semantics. Fast pathway: high frame rate, low channels — for fast motion. How do they communicate?",
        "Why does the Fast pathway need fewer channels than the Slow pathway? What is it not trying to represent (that the Slow pathway handles)?",
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
        "Scene recognition classifies entire images into scene categories (e.g., bedroom, kitchen, mountain). What is the key difference between scene recognition and object recognition that makes scene recognition particularly challenging?",
      options: [
        "Scene images contain many objects with complex spatial layouts; the scene category emerges from the holistic spatial configuration rather than a single dominant object.",
        "Scene images require 3D understanding while object images do not.",
        "Scene categories are defined by the objects present, not by their spatial arrangement.",
        "Scene recognition requires depth information while object recognition does not.",
      ],
      correctAnswer: 0,
      explanation:
        "Scene recognition involves holistic image-level understanding, not just object identification.\n\n**Step 1.** A \"living room\" contains a sofa, TV, coffee table — but so might a \"home theatre\". The spatial layout (sofa facing TV vs. sofa against a window) determines the scene type.\n\n**Step 2.** Object recognition focuses on identifying what's in the image. Scene recognition requires understanding relationships between objects and the overall spatial context.\n\n**Step 3.** Places365 (the standard scene benchmark) includes 365 scene categories with fine-grained distinctions — \"river\" vs. \"stream\" vs. \"lake\" — that require holistic understanding beyond individual objects.",
      hints: [
        "A \"mountain\" scene contains sky, rocks, trees — but what makes it different from a \"cliff\"? Is it a single object or the spatial configuration?",
        "Scene categories are defined by spatial layout, not just object presence. What's harder: identifying objects or understanding their spatial arrangement?",
      ],
    },
    {
      id: "q-cv-kp21-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Places205, the top-5 accuracy metric is commonly reported rather than top-1. Why is top-5 more informative for scene recognition than for object classification (e.g., ImageNet)?",
      options: [
        "Top-5 is more informative for scene recognition because scene categories are hierarchically related, and top-5 captures the correct scene within the top plausible options even when fine-grained distinctions are difficult.",
        "Top-5 is always more informative than top-1 for any task.",
        "Top-5 measures inference speed rather than accuracy.",
        "Top-5 is used because scene recognition models are always uncertain.",
      ],
      correctAnswer: 0,
      explanation:
        "Scene categories are often hierarchically related, making top-5 a meaningful measure of near-correct classification.\n\n**Step 1.** Scenes have hierarchical relationships: \"bedroom\" and \"dorm room\" are both sleeping quarters; \"river\" and \"stream\" are both water bodies. Top-5 captures when the model distinguishes at the right level even if not the exact fine-grained category.\n\n**Step 2.** A model that classifies a \"river\" as \"stream\" (both correct at a coarser level) is more useful than one that classifies it as \"kitchen\" — top-5 rewards this.\n\n**Step 3.** With 365 scene categories, even random performance gives top-1 accuracy of $\\sim 0.3\\%$. A top-5 of $\\sim 60\\%$ represents substantial scene understanding.",
      hints: [
        "With 365 categories, the correct answer might be the 3rd or 4th guess. Is \"river\" vs. \"stream\" a serious error or a minor fine-grained distinction?",
        "Top-5 asks: is the correct scene in the top 5 predictions? For hierarchically related categories, being in the top 5 often means being roughly correct.",
      ],
    },
    {
      id: "q-cv-kp21-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Places CNN (the network trained on Places205) learns scene-preferential features in early conv layers that differ from ImageNet-preferential features — Places features respond more to layout and structural elements (doors, windows, beds) while ImageNet features respond more to texture and colour patterns.",
      correctAnswer: 1,
      explanation:
        "Places205 and ImageNet train different visual representations despite both being image classification datasets.\n\n**Step 1.** Places205 scene categories (kitchen, bedroom, mountain) are defined by structural and spatial properties. The network learns to detect windows, doors, furniture arrangements — these are the discriminative features.\n\n**Step 2.** ImageNet categories (dog, cat, car) are defined by object appearance and texture. The network learns fine-grained texture discrimination.\n\n**Step 3.** When transferred, Places features excel at scene-centric tasks (room classification, spatial layout prediction); ImageNet features excel at object-centric tasks. This is an example of task-specific representation learning.",
      hints: [
        "Places: \"Is this a kitchen?\" requires detecting a stove, sink, counter. ImageNet: \"Is this a dog?\" requires detecting fur, snout, ears. Different features, different early-layer activations.",
        "Early conv layers in Places CNN might respond strongly to windows and doors — these are discriminative for scene category.",
      ],
    },
    {
      id: "q-cv-kp21-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In GPV (Geodesic Distance Pooling), scene representation is enhanced by computing geodesic distances over a superpixel graph. What is the key advantage of geodesic distance over Euclidean distance in the feature space for scene representation?",
      options: [
        "Geodesic distance is always smaller than Euclidean distance, providing more discriminative representations.",
        "Geodesic distance accounts for region boundaries in the image (superpixel graph), so that pixels on opposite sides of a boundary are considered distant even if they have similar appearance — this respects scene structure.",
        "Geodesic distance is faster to compute than Euclidean distance in high-dimensional spaces.",
        "Geodesic distance pools features along straight-line paths in the image, which is equivalent to max pooling.",
      ],
      correctAnswer: 1,
      explanation:
        "Geodesic distance pooling captures image structure in feature aggregation.\n\n**Step 1.** Superpixels group pixels with similar appearance into regions. The superpixel adjacency graph captures which regions are neighbours (share a boundary) and which are separated by a boundary.\n\n**Step 2.** Geodesic distance on this graph between a region and a query point respects image boundaries — pixels that appear similar but are separated by a boundary (e.g., a sofa vs. a wall that looks similar) are correctly considered distant.\n\n**Step 3.** Pooling features by geodesic distance weighting produces scene representations that are sensitive to spatial layout and boundary structure, improving scene recognition on cluttered indoor scenes.",
      hints: [
        "If two pixels have similar colour but are on opposite sides of a wall (a boundary), Euclidean distance says they're close. Geodesic distance says they're far. Which is better for scene recognition?",
        "The superpixel graph encodes which regions are neighbours (share a boundary). Geodesic distance walks along this graph — respecting boundaries.",
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
        "In industrial defect detection, an anomaly is defined as a defect (e.g., scratch, dent, missing component) that deviates from a known normal appearance. Why is this fundamentally harder than standard image classification?",
      options: [
        "Because the number of defect classes is very large, making it a high-dimensional classification problem.",
        "Because training data for defects is extremely scarce or absent — the model only sees normal examples and must identify deviations without knowing what specific defects look like.",
        "Because defects are microscopic and require super-resolution imaging to detect.",
        "Because industrial cameras produce noisy images that are indistinguishable from defects.",
      ],
      correctAnswer: 1,
      explanation:
        "Anomaly detection is fundamentally different from classification because defects are rare and varied.\n\n**Step 1.** Standard classification requires labelled examples of all classes. For defects, we might have millions of normal examples but zero or very few defective examples.\n\n**Step 2.** The model must learn what \"normal\" looks like and flag deviations — without knowing what specific anomalies look like. This is called one-class classification (training on normal examples only).\n\n**Step 3.** At test time, any region that deviates significantly from the learned normal distribution is flagged as anomalous. The challenge is that \"defect\" can take infinitely many forms, all different from normal.",
      hints: [
        "For a defect classifier, you'd need examples of all defect types — scratches, dents, discolourations, missing parts. Can you collect all possible defect examples?",
        "Anomaly detection is one-class classification: learn the distribution of normal examples, and flag anything that deviates.",
      ],
    },
    {
      id: "q-cv-kp22-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In anomaly detection via reconstruction (e.g., autoencoder trained on normal images), why does the reconstruction error tend to be higher for anomalous test images?",
      options: [
        "The autoencoder overfits to normal images, losing the ability to reconstruct anomalous regions that deviate from the training distribution.",
        "Anomalous regions contain features the autoencoder has never seen during training, so the decoder produces hallucinated normal content rather than faithful reconstruction — the error is concentrated in anomalous regions.",
        "Anomalous images have higher pixel values on average, which the autoencoder cannot handle.",
        "The reconstruction error is the same for all images; the anomaly score is derived from the reconstruction error's variance.",
      ],
      correctAnswer: 1,
      explanation:
        "Autoencoders trained on normal images learn a compressed representation of the normal distribution.\n\n**Step 1.** The encoder compresses the input to a latent code; the decoder reconstructs from it. Training on normal images optimises the autoencoder to faithfully reconstruct normal features.\n\n**Step 2.** An anomalous image contains features not in the training distribution — the encoder cannot compress them well, and the decoder produces its best approximation using normal features. This \"hallucination\" of normal features in anomalous regions produces high reconstruction error.\n\n**Step 3.** The per-pixel or per-region reconstruction error is used as an anomaly map: high error $\\to$ anomalous region. Thresholding this map gives the binary anomaly mask.",
      hints: [
        "The autoencoder was trained only on normal images. For an anomalous image, what does the decoder output in regions that look abnormal?",
        "Reconstruction error is high where the decoder cannot faithfully reproduce the input — because the input contains features it has never learned to reconstruct.",
      ],
    },
    {
      id: "q-cv-kp22-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In PatchSVDD (Deep Anomaly Detection via Routing of Anomalies), the network trains to map all normal image patches to a compact hypersphere centred at a learned centre $c$, with radius $R$. At test time, the anomaly score for a patch is its Euclidean distance from the centre $c$ — patches far from $c$ are classified as anomalous.",
      correctAnswer: 1,
      explanation:
        "One-class classification via deep learning uses a hypersphere objective.\n\n**Step 1.** The network learns an embedding $f(x) \\in \\mathbb{R}^D$ such that all normal patches lie within a hypersphere of radius $R$ centred at $c$: $\|f(x) - c\|^2 \\leq R^2$.\n\n**Step 2.** The training objective minimises the volume of the hypersphere (making it tight around normal data) while ensuring normal embeddings are close to $c$.\n\n**Step 3.** At test time, a patch's anomaly score is its distance from $c$: $s(x) = \|f(x) - c\|^2$. Patches with $s(x) > R^2$ are classified as anomalous. The centre $c$ and radius $R$ are learned from normal data only.",
      hints: [
        "The hypersphere should be as small as possible while containing all normal patches. What happens to anomalous patches that are outside the training distribution?",
        "Distance from centre $c$: normal patches are close, anomalous patches are far. What threshold determines anomaly?",
      ],
    },
    {
      id: "q-cv-kp22-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a Gaussian Mixture Model (GMM) for anomaly detection on image features, the log-likelihood $\\log p(x) = \\log\\left(\\sum_{k=1}^K \\pi_k \\mathcal{N}(x | \\mu_k, \\Sigma_k)\\right)$ measures how well a pixel's feature vector fits the mixture of $K$ Gaussians learned from normal images. Why does a low log-likelihood indicate an anomaly?",
      options: [
        "Low log-likelihood means the pixel is likely to be a defect, since the GMM was trained on defect-free images.",
        "Low log-likelihood means the pixel's feature vector is unlikely under the model — it doesn't fit any of the $K$ Gaussian components well, indicating it deviates from the normal appearance distribution.",
        "Low log-likelihood means the pixel is from the background, not the foreground object.",
        "Low log-likelihood is a sign of numerical instability in the GMM computation.",
      ],
      correctAnswer: 1,
      explanation:
        "GMM models the probability density of normal image features.\n\n**Step 1.** A GMM with $K$ components represents the normal distribution as a mixture of $K$ Gaussians. Each component captures a different mode of normal appearance (e.g., texture type, colour distribution).\n\n**Step 2.** For a given pixel feature $x$, the GMM computes the weighted sum of its PDF values under each component. If $x$ is in a region of feature space where all components have low density (low $\\mathcal{N}(x|\\mu_k, \\Sigma_k)$), then $\\log p(x)$ is low.\n\n**Step 3.** At test time, a threshold $\\tau$ on $\\log p(x)$ flags low-likelihood regions as anomalous: they contain features that don't match any learned normal appearance pattern. The threshold is set on a validation set of normal images.",
      hints: [
        "The GMM models the distribution of normal pixel features. If a test pixel's features are in a low-density region of this distribution, what does that mean?",
        "$\\log p(x)$ is high when $x$ matches one of the $K$ Gaussian components well. When is it low?",
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
        "OCR (Optical Character Recognition) converts document images into machine-readable text. What is the key challenge that makes handwritten OCR harder than printed OCR?",
      options: [
        "Handwritten text requires colour information while printed text does not.",
        "Handwritten text has extreme variability in character shape, stroke width, and slant, making character-level recognition more challenging.",
        "Handwritten OCR requires 3D imaging while printed OCR works with 2D images.",
        "Handwritten text uses different character sets than printed text.",
      ],
      correctAnswer: 1,
      explanation:
        "Printed OCR benefits from consistent, known fonts with standardised character shapes.\n\n**Step 1.** Printed text uses known fonts — 'A' always looks similar to 'A'. Even with font variation, the space of printed character shapes is limited and known.\n\n**Step 2.** Handwritten text varies dramatically between writers: one person's 'A' looks very different from another's. Stroke direction, loop size, slant, and baseline all vary.\n\n**Step 3.** This variability means handwritten OCR requires more powerful feature extractors (typically CNNs or transformers) trained on large labelled datasets covering diverse writing styles, whereas printed OCR can use template matching or simpler models.",
      hints: [
        "Printed 'A': known font, consistent shape. Handwritten 'A': varies by writer. Which has a larger space of possible shapes?",
        "Handwritten OCR must handle writer-specific variation in stroke, slant, and proportion. Printed OCR has a fixed font.",
      ],
    },
    {
      id: "q-cv-kp23-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a CRNN (Convolutional Recurrent Neural Network) for scene text recognition, the CNN feature extractor, recurrent LSTM layers, and CTC (Connectionist Temporal Classification) decoder each serve a specific purpose. What role does the CTC decoder play?",
      options: [
        "The CTC decoder generates character sequences by greedily selecting the character with the highest probability at each time step.",
        "The CTC decoder collapses the output sequence (one prediction per time step) into a valid character sequence, handling the problem that the input length (feature columns) differs from the output length (characters) and that not all time steps correspond to a character.",
        "The CTC decoder applies max pooling across time to produce a single feature vector for classification.",
        "The CTC decoder converts CNN features to LSTM hidden states before sequence prediction.",
      ],
      correctAnswer: 1,
      explanation:
        "CTC is specifically designed for sequence-to-sequence mapping when input and output lengths differ and are unaligned.\n\n**Step 1.** The CNN produces $T$ feature vectors (one per column). The RNN processes these sequentially. The output at each time step is a probability distribution over $C + 1$ classes (characters + blank).\n\n**Step 2.** The CTC loss collapses this sequence by: (1) merging repeated characters, then (2) removing blanks. For the sequence \"aa-bbb-\" (where '-' is blank): \"aa-bbb-\" $\\to$ \"ab\".\n\n**Step 3.** At inference, either greedy decoding (highest probability per time step $\\to$ collapse) or beam search decoding (search over candidate collapsed sequences) is used. This eliminates the need for frame-level character segmentation.",
      hints: [
        "The CNN produces $T$ feature columns; the text might have $L$ characters with $L \\neq T$. CTC bridges this gap. How?",
        "CTC decoding: (1) merge repeated characters, (2) remove blanks. Input: \"tttt-hh-eeee-ll-ll-o--\" → output: \"hello\".",
      ],
    },
    {
      id: "q-cv-kp23-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In LayoutLM (Document AI), a transformer model is pre-trained on document images using three objectives: masked visual-linguistic alignment (MVLA), multi-label document classification, and text-image alignment. The key innovation is that spatial position embeddings (rather than 1D position embeddings) encode the 2D layout of tokens on the document page, capturing the geometric relationship between headers, body text, tables, and figures.",
      correctAnswer: 1,
      explanation:
        "LayoutLM (Xu et al., 2020) was a breakthrough in Document AI by jointly encoding text and layout.\n\n**Step 1.** Standard language models (BERT) use 1D position embeddings that encode token order in the text stream. LayoutLM uses 2D position embeddings: token $(row, column)$ on the page, capturing its exact geometric location.\n\n**Step 2.** The MVLA objective masks text tokens and predicts them from: (1) surrounding text tokens, (2) visual features (Faster R-CNN embeddings of the token's image patch), and (3) 2D layout position. This forces the model to integrate all three signals.\n\n**Step 3.** The 2D layout is critical: in a form, the text \"John\" above \"Doe\" has a different meaning from \"John\" next to \"Doe\" — spatial position disambiguates semantic roles in documents.",
      hints: [
        "BERT uses 1D position embeddings (token order in text). Documents have 2D spatial layout. How does LayoutLM encode the 2D position of tokens?",
        "In a form, \"John\" at position (row 5, col 1) vs. (row 5, col 50) might be a field name vs. a field value. How does 2D position help disambiguate?",
      ],
    },
    {
      id: "q-cv-kp23-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In table structure recognition, the goal is to identify the header, row, and column structure of a table in a document image. What is the key challenge that distinguishes this from simple OCR, and what approach is commonly used?",
      options: [
        "OCR is sufficient for table recognition; no additional processing is needed.",
        "The challenge is that table structure (which cells belong to which row/column/header) is not directly encoded in the pixel values — it requires reasoning about the spatial arrangement of detected text cells and their borders. Graph Neural Networks (GNNs) on the cell adjacency graph are commonly used.",
        "Tables have too many cells to process with standard CNNs; only RNNs can handle them.",
        "Table structure is determined by the text content of cells, not their spatial position.",
      ],
      correctAnswer: 1,
      explanation:
        "Table structure recognition requires understanding both the content and the geometric arrangement of cells.\n\n**Step 1.** OCR identifies what text is in each cell, but not how cells relate spatially (which are headers, which rows, which columns). The table structure is a relational problem.\n\n**Step 2.** Modern approaches model the table as a graph: each detected text cell is a node; edges connect spatially adjacent cells. GNNs propagate information across the cell graph, learning to predict cell types (header, row header, data) and spanning relationships (cells that span multiple columns).\n\n**Step 3.** Keys to success: (1) accurate cell detection (Tesseract + layout analysis or specialised table detection CNN), (2) physical cell adjacency detection (from bounding boxes), and (3) GNN-based structure prediction that handles spanning cells, merged borders, and borderless tables.",
      hints: [
        "OCR gives you the text in each cell. But in a table, is the first row a header or data? Is a cell spanning 2 columns? This structural information isn't in the text.",
        "Table as graph: cells are nodes, spatial adjacency (shared border or proximity) creates edges. GNNs on this graph learn cell type and spanning structure.",
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
        "In multi-spectral satellite imagery (e.g., Landsat, Sentinel-2), each pixel contains radiance values across multiple spectral bands (e.g., Red, Green, Blue, Near-Infrared, Short-Wave Infrared). What makes this richer than RGB imagery for land cover classification?",
      options: [
        "More bands provide higher spatial resolution, enabling detection of smaller objects.",
        "Different materials (vegetation, water, soil, snow) have distinct spectral signatures across these bands that are invisible in RGB — for example, healthy vegetation strongly reflects near-infrared, which is absent in RGB.",
        "Spectral bands allow the camera to see through clouds.",
        "More bands reduce the effect of atmospheric scattering.",
      ],
      correctAnswer: 1,
      explanation:
        "Spectral signatures are the key advantage of multi-spectral imagery.\n\n**Step 1.** In RGB, vegetation and some soils can appear similar (both brownish-green). But in Near-Infrared (NIR), healthy vegetation has very high reflectance while soil has moderate reflectance — making them easily separable.\n\n**Step 2.** The Normalised Difference Vegetation Index (NDVI) $= (\\text{NIR} - \\text{Red})/(\\text{NIR} + \\text{Red})$ exploits this: vegetation has NDVI $\\approx 0.8$; bare soil has NDVI $\\approx 0$; water has NDVI $< 0$.\n\n**Step 3.** Hyperspectral imagery (hundreds of bands) goes further, enabling mineral identification, vegetation species classification, and water quality assessment — applications impossible with RGB alone.",
      hints: [
        "Healthy vegetation: high NIR reflectance, moderate Red reflectance → high NDVI. Water: low NIR, moderate Red → NDVI < 0. What does RGB see?",
        "NDVI exploits the fact that different materials reflect different wavelengths differently — this is the spectral signature.",
      ],
    },
    {
      id: "q-cv-kp24-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In object detection on very large satellite images (e.g., $10{,}000 \\times 10{,}000$ pixels), the image is typically split into overlapping patches for inference. What is the key trade-off in choosing the patch size?",
      options: [
        "Larger patches are more computationally expensive but may miss small objects; smaller patches preserve fine detail but increase inference cost and may lose context.",
        "Patch size has no effect on detection accuracy — only on inference speed.",
        "Smaller patches are always better because they provide more context.",
        "Larger patches reduce the number of objects to detect, making NMS less important.",
      ],
      correctAnswer: 0,
      explanation:
        "Large satellite images require tiling because GPU memory cannot hold the full image and objects of interest span a range of scales.\n\n**Step 1.** Large patches ($1024 \\times 1024$) capture rich spatial context (important for large objects like airports), but small objects (cars, small buildings) occupy few pixels and may be missed.\n\n**Step 2.** Small patches ($256 \\times 256$) preserve fine spatial detail for small object detection, but small objects still occupy few pixels, and the limited context makes classification harder.\n\n**Step 3.** Best practice: multi-scale inference (process at multiple resolutions) + overlapping tiles (to handle objects on tile boundaries) + NMS (merge overlapping detections from different tiles).",
      hints: [
        "A $256 \\times 256$ patch of a $10{,}000 \\times 10{,}000$ image shows a small neighbourhood. A car occupies $20 \\times 20$ pixels at what zoom level?",
        "Large patches: rich context, small objects might be too small to detect. Small patches: fine resolution, but less context for classification.",
      ],
    },
    {
      id: "q-cv-kp24-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Change Detection (CD), the goal is to detect regions where the land cover has changed between two satellite images of the same location at different times (e.g., urban expansion, deforestation). The key challenge is that changes in illumination (sun angle, shadows, seasonal vegetation) can produce pixel-level differences that are not actual land cover changes, requiring robust change metrics that are invariant to these factors.",
      correctAnswer: 1,
      explanation:
        "Change detection must distinguish genuine land cover change from image artefacts.\n\n**Step 1.** Pixel-level change (image differencing): $|I_1(x) - I_2(x)|$ flags any intensity change. But illumination differences between the two acquisition dates (different sun angles, shadows) create spurious changes.\n\n**Step 2.** More robust methods use ratios or log-ratios: $\\log(I_2/I_1)$, which is invariant to multiplicative illumination changes. NDVI differencing $\\Delta\\text{NDVI} = \\text{NDVI}_2 - \\text{NDVI}_1$ specifically targets vegetation changes.\n\n**Step 3.** Deep learning approaches (e.g., Siamese CNNs) learn a change representation directly from bi-temporal images, learning to ignore illumination artefacts while capturing genuine land cover transitions.",
      hints: [
        "Image $I_1$ taken at 10am, image $I_2$ taken at 2pm on a different day. Shadows point different directions — are the pixels different because of shadow angle or actual land cover change?",
        "Ratio-based change metrics $\\log(I_2/I_1)$ are illumination-invariant. Why does taking the ratio remove the illumination factor?",
      ],
    },
    {
      id: "q-cv-kp24-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In building footprint segmentation on satellite imagery, the challenge of irregular roof shapes, partially occluded buildings, and shadow effects is addressed by what architectural approach in modern semantic segmentation networks?",
      options: [
        "Using a fully convolutional network (FCN) with only upsampling layers, without any skip connections.",
        "Using an encoder-decoder with skip connections (U-Net style) that combines high-resolution encoder features with semantic decoder features, plus data augmentation (random rotations, scale changes) to improve robustness to varying building orientations and sizes.",
        "Using a simple thresholding approach on the near-infrared band to segment buildings.",
        "Using a patch-based CNN that classifies each $32 \\times 32$ patch independently without spatial context.",
      ],
      correctAnswer: 1,
      explanation:
        "Building footprint segmentation on satellite imagery requires handling multi-scale, partially occluded structures.\n\n**Step 1.** Encoder-decoder with skip connections (U-Net) provides both semantic understanding (from the decoder) and precise boundary localisation (from encoder skip connections). Buildings have irregular shapes and varying sizes — the multi-scale features in U-Net handle this.\n\n**Step 2.** Data augmentation (random rotations for arbitrary building orientations, random scales for varying building sizes) is critical. Buildings can appear at any rotation in satellite imagery — augmentation ensures the network is rotation-invariant.\n\n**Step 3.** Post-processing (morphological operations, connected component analysis) cleans up small false-positive regions and fills small holes within building footprints, producing clean polygon boundaries for GIS use.",
      hints: [
        "Buildings in satellite imagery can appear at any rotation. What augmentation handles this? Once augmented, what architecture preserves the boundary detail?",
        "U-Net skip connections preserve fine boundary detail (from encoder). The decoder upsamples to full resolution. Why is this important for irregular building shapes?",
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
        "In Gatys et al.'s original Neural Style Transfer (NST), the content image is reconstructed from the feature activations of a pretrained VGG network, and the style image is represented by the Gram matrix of VGG feature activations. What does the Gram matrix capture, and why is it suitable for representing style?",
      options: [
        "The Gram matrix captures spatial relationships between objects in the image.",
        "The Gram matrix $G_{ij} = \\langle f_i, f_j \\rangle$ captures correlations between filter responses at different channels, encoding texture and style patterns (e.g., brush strokes, colour combinations) without spatial arrangement.",
        "The Gram matrix captures the class of the content image.",
        "The Gram matrix is a normalisation operation applied to the feature maps.",
      ],
      correctAnswer: 1,
      explanation:
        "The Gram matrix encodes style independent of spatial structure.\n\n**Step 1.** Let $F \\in \\mathbb{R}^{C \\times HW}$ be the flattened feature map with $C$ channels. The Gram matrix $G = F F^T \\in \\mathbb{R}^{C \\times C}$ has entries $G_{ij} = \\sum_h \\sum_w f_{ij}(h,w) f_{ji}(h,w)$ — the inner product of channel $i$ and channel $j$ feature maps.\n\n**Step 2.** $G_{ij}$ measures how correlated (co-activated) channels $i$ and $j$ are. High correlation means that whenever filter $i$ activates, filter $j$ also activates — this captures texture patterns like \"stripes\" or \"checkerboard\".\n\n**Step 3.** The Gram matrix is spatially invariant: it doesn't tell us WHERE patterns occur, only that certain patterns tend to co-occur. This is perfect for style, which is about texture and colour mood, not spatial layout.",
      hints: [
        "Gram matrix $G_{ij}$ is the inner product of channel $i$ and channel $j$ feature maps. High $G_{ij}$ means channels $i$ and $j$ activate together. Does this tell us WHERE in the image, or WHAT patterns co-occur?",
        "Style = texture, colour mood, brush stroke patterns — NOT spatial layout. The Gram matrix discards spatial information (by summing over $h, w$) but preserves channel correlations.",
      ],
    },
    {
      id: "q-cv-kp25-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The NST optimisation objective combines a content loss $\\mathcal{L}_{\\text{content}}$ and a style loss $\\mathcal{L}_{\\text{style}}$ with weighting $\\alpha$ and $\\beta$: $\\mathcal{L}_{\\text{total}} = \\alpha \\mathcal{L}_{\\text{content}} + \\beta \\mathcal{L}_{\\text{style}}$. What does varying the ratio $\\beta/\\alpha$ control?",
      options: [
        "Higher $\\beta/\\alpha$ produces images where the style dominates — recognisable content with strong stylisation. Lower $\\beta/\\alpha$ produces content-faithful images with subtle stylisation.",
        "Higher $\\beta/\\alpha$ always produces better-quality images.",
        "The ratio $\\beta/\\alpha$ controls the brightness of the output image.",
        "The ratio has no effect on the output — only the absolute values of $\\alpha$ and $\\beta$ matter.",
      ],
      correctAnswer: 0,
      explanation:
        "The content-style trade-off is controlled by the relative loss weights.\n\n**Step 1.** $\\mathcal{L}_{\\text{content}}$ measures how different the generated image's features are from the content image's features. Minimising it forces the generated image to preserve content structure.\n\n**Step 2.** $\\mathcal{L}_{\\text{style}}$ measures how different the generated image's Gram matrices are from the style image's Gram matrices. Minimising it forces the generated image to have the same texture, colour, and style patterns.\n\n**Step 3.** With $\\beta/\\alpha = 10^3$ to $10^4$, style dominates — Picasso-style paintings. With $\\beta/\\alpha = 10^1$, content dominates — Van Gogh painting of the content image. The ratio $\\beta/\\alpha$ is the primary artistic control parameter.",
      hints: [
        "$\\alpha \\mathcal{L}_{\\text{content}}$: content preservation. $\\beta \\mathcal{L}_{\\text{style}}$: style matching. Which term dominates when $\\beta/\\alpha$ is large?",
        "Large $\\beta/\\alpha$: style dominates → strongly stylised image. Small $\\beta/\\alpha$: content dominates → content-faithful image.",
      ],
    },
    {
      id: "q-cv-kp25-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Universal Style Transfer (UST) methods like WCT (Whitening and Colour Transform) and AdaIN (Adaptive Instance Normalisation) achieve fast feed-forward style transfer (single forward pass) by normalising content feature statistics to match style feature statistics, without iterative optimisation — enabling real-time stylisation.",
      correctAnswer: 1,
      explanation:
        "Fast style transfer replaces slow iterative optimisation with a single learned transformation.\n\n**Step 1.** Gatys et al.'s original NST is slow: it optimises the image pixel-by-pixel using backpropagation through VGG, taking hundreds of iterations.\n\n**Step 2.** AdaIN (Huang & Belongie, 2017) normalises content features to have the same mean and variance as style features at each instance normalisation layer. This is a single feed-forward operation: $\\text{AdaIN}(c, s) = \\sigma_s (c - \\mu_c) / \\sigma_c + \\mu_s$.\n\n**Step 3.** WCT extends this with a whitening transform (PCA-based) that additionally matches the covariance structure, not just mean and variance. Both enable real-time stylisation (30+ fps on GPU).",
      hints: [
        "AdaIN: $\\sigma_s (c - \\mu_c) / \\sigma_c + \\mu_s$. This normalises content features to have style's mean ($\\mu_s$) and variance ($\\sigma_s$). Single operation — no gradient descent needed.",
        "Original NST: hundreds of gradient descent iterations. AdaIN/WCT: one forward pass. What's the architectural trick that enables this?",
      ],
    },
    {
      id: "q-cv-kp25-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Artistic Style Transfer, a common failure mode is that fine brush stroke patterns from the style image (e.g., from a Van Gogh painting) appear in regions of the content image that have very different semantic content (e.g., sky). What is the underlying reason and how do recent methods address it?",
      options: [
        "The Gram matrix is spatially invariant, so style patterns are applied uniformly regardless of semantic content. Semantic-aware methods use spatial masks or attention to constrain which style patterns are applied to which content regions.",
        "The VGG network is not deep enough to distinguish between sky and foreground objects.",
        "The content loss is too large relative to the style loss, causing the network to ignore style.",
        "Fine brush strokes appear because of the high-frequency content in the style image, which is amplified by gradient descent.",
      ],
      correctAnswer: 0,
      explanation:
        "The spatially invariant Gram matrix is the root cause of cross-region style bleeding.\n\n**Step 1.** The Gram matrix $G$ captures channel correlations globally (summed over all spatial positions) — it has no spatial awareness. A \"fine brush stroke\" pattern detected in the style image is applied uniformly across all content regions.\n\n**Step 2.** When a Van Gogh sky with swirling strokes is applied to a content image, those swirling strokes also appear on the foreground object — semantically inappropriate.\n\n**Step 3.** Semantic-aware methods address this: (1) semantic segmentation masks that restrict style transfer to matching regions (sky-to-sky, object-to-object), (2) attention-based methods that learn which style regions correspond to which content regions, and (3) semantic consistency losses that encourage semantic segmentation of the output to match the content.",
      hints: [
        "Gram matrix $G$ is computed by summing over all spatial positions $h, w$. It has NO spatial information. What does this mean for WHERE style is applied?",
        "If the style image has \"brush strokes\" everywhere (no spatial structure), and we apply that style to all regions equally, what goes wrong?",
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
        "A training image with an incorrect label that misleads the model during training.",
        "An image with carefully crafted, imperceptible perturbations that cause a classifier to predict the wrong class.",
        "An image from a different domain (e.g., sketches) that the model fails to classify correctly.",
        "A synthetic image generated by a GAN that fools a human observer.",
      ],
      correctAnswer: 1,
      explanation:
        "Adversarial examples are inputs with small, often human-imperceptible pixel perturbations intentionally crafted to maximise the model's loss.\n\n**Step 1.** The perturbation is chosen via gradient-based optimisation to specifically fool the model, not just add random noise.\n\n**Step 2.** A classic example: an image of a cat to which an imperceptible adversarial perturbation is added, causing a classifier to confidently predict \"guacamole\" instead of \"cat\".\n\n**Step 3.** This reveals that deep networks are linear in high-dimensional spaces — small input changes (amplified by many layers) can cause large output changes.",
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
        "What is the key insight of SRCNN (Super-Resolution CNN) for image super-resolution?",
      options: [
        "It uses GAN training to generate photorealistic textures in upscaled images.",
        "It learns an end-to-end mapping from low-resolution to high-resolution images using a CNN with convolutional, non-linear mapping, and reconstruction layers.",
        "It applies a frequency-domain upsampling using learned DCT coefficients.",
        "It retrieves high-frequency patches from a database to augment low-resolution inputs.",
      ],
      correctAnswer: 1,
      explanation:
        "SRCNN (Dong et al. 2015) pioneers deep learning for single-image super-resolution.\n\n**Step 1.** The method takes a bicubic-upsampled low-resolution image as input and learns to refine it into a high-resolution output.\n\n**Step 2.** The three-layer CNN performs patch extraction (feature extraction), non-linear mapping (mapping features to HR patches), and reconstruction.\n\n**Step 3.** SRCNN outperformed classical sparse-coding methods while being conceptually simpler — an end-to-end learned mapping rather than a hand-crafted pipeline.",
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
      correctAnswer: 0,
      explanation:
        "ShuffleNet applies grouped convolutions (which keep channels isolated) followed by a channel shuffle operation that reorders channels across groups.\n\n**Step 1.** Grouped convolution partitions C channels into g groups, each operating independently — preventing inter-group information flow.\n\n**Step 2.** Channel shuffle physically reorders the output channels so that features from different groups are interleaved before the next grouped conv.\n\n**Step 3.** Shuffling is a permutation (rearranging indices) — it requires $O(C)$ operations with no MACs, making it essentially free while restoring cross-group communication.",
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
        "Depthwise separable convolution replaces a standard $3 \\times 3$ conv on C-channel input with output of C channels. By what factor does it reduce FLOPs compared to the standard conv?",
      options: [
        "C/9 reduction (depends on channel count).",
        "$1/(C + 1/9) \\approx 1/9$ for large $C$ (approximately the inverse of the kernel area).",
        "$1/3$ reduction (depthwise is $1/3$ of standard).",
        "$1/(8C/9 + 1)$ which simplifies to roughly $1/9$ only for $C=1$.",
      ],
      correctAnswer: 1,
      explanation:
        "Standard $3 \\times 3$ conv FLOPs $\\propto 9C^2$.\n\n**Step 1.** Depthwise separable splits into two steps: depthwise ($9C$ FLOPs, one filter per channel) and pointwise ($C^2$ FLOPs, $1 \\times 1$ conv).\n\n**Step 2.** Total for depthwise separable: $9C + C^2 = C(9 + C)$. Ratio to standard: $C(9+C)/(9C^2) = (9+C)/(9C) \\approx 1/9$ for large $C$.\n\n**Step 3.** MobileNet uses depthwise separable convolutions to achieve approximately $8$–$9\\times$ fewer FLOPs than a standard conv, enabling mobile deployment.",
      hints: [
        "Standard: $F \\times F \\times C_\\text{in} \\times C_\\text{out}$. Depthwise: $F \\times F \\times C$ (one filter per channel). Pointwise: $1 \\times 1 \\times C \\times C$.",
        "For $3 \\times 3$ filter and $C$ channels: ratio = $(9C + C^2) / (9C^2) = (9+C)/(9C) \\to 1/9$ as $C \\to \\infty$.",
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
        "Soft labels are computed as $\\softmax(z / \\tau)$.\n\n**Step 1.** At $\\tau = 1$: $p \\propto [e^4, e^1, e^{-2}] \\approx [0.952, 0.047, 0.001]$, which is very peaked toward class 1.\n\n**Step 2.** At $\\tau = 4$: $p \\propto [e^{4/4}, e^{1/4}, e^{-2/4}] = [e^1, e^{0.25}, e^{-0.5}] \\approx [0.574, 0.282, 0.144]$, which is much more uniform.\n\n**Step 3.** Higher $\\tau$ reveals that the teacher considers class 2 more plausible than class 3 even when predicting class 1 — transferring structural knowledge beyond the top-1 prediction.",
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
      correctAnswer: 0,
      explanation:
        "Grouped convolution partitions C channels into g groups, each operating independently — preventing inter-group information flow.\n\n**Step 1.** Channel shuffle physically reorders the output channels so that features from different groups are interleaved before the next grouped conv.\n\n**Step 2.** This is a zero-parameter, $O(1)$ permutation that costs negligible compute while restoring cross-group communication.\n\n**Step 3.** Shuffling enables the network to combine information across feature groups at minimal cost, improving representational capacity without the FLOPs of a full convolution.",
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
        "COCO mAP is computed at multiple IoU thresholds. Which statement correctly describes how COCO mAP is averaged?",
      options: [
        "$\\text{mAP} = \\text{AP} \\times \\text{IoU}$ — mAP equals AP multiplied by the single IoU threshold.",
        "$\\text{mAP} = \\frac{1}{10} \\sum_{i=1}^{10} \\text{AP}_{\\text{IoU}_i}$ — mAP is the mean of AP values at 10 IoU thresholds from 0.50 to 0.95.",
        "$\\text{mAP} = \\text{AP}_{0.50} + \\text{AP}_{0.75}$ — mAP sums AP at 0.5 and 0.75 IoU.",
        "$\\text{mAP} = \\text{AP} \\times (\\text{IoU} + 0.5)$ — mAP scales AP by the IoU threshold.",
      ],
      correctAnswer: 1,
      explanation:
        "COCO mAP is the mean of AP values computed at 10 IoU thresholds: $0.50, 0.55, \\ldots, 0.95$.\n\n**Step 1.** Higher IoU thresholds demand tighter localisation — loose boxes that pass IoU $\\geq 0.5$ may fail at IoU $\\geq 0.75$.\n\n**Step 2.** The formula is:\n\\[\n\\text{mAP} = \\frac{1}{10} \\sum_{i=1}^{10} \\text{AP}_{\\text{IoU}_i}.\n\\]\n\n**Step 3.** Averaging over all 10 thresholds rewards detectors that produce both rough and precise localisations.",
      hints: [
        "COCO mAP averages AP over 10 IoU thresholds, penalising imprecise boxes more as the threshold increases.",
        "The 10 IoU thresholds are $0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95$.",
      ],
    },
    {
      id: "q-cv-kp28-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "FID (Fréchet Inception Distance) measures the distance between feature distributions of real and generated images. Which formula correctly defines FID?",
      options: [
        "$\\|\\mu_r - \\mu_g\\|^2 + \\text{Tr}\\!\\left(\\Sigma_r + \\Sigma_g - 2(\\Sigma_r \\Sigma_g)^{1/2}\\right)$",
        "$\\text{average pixel-wise MSE}$ between real and generated images",
        "$D_{\\text{KL}}\\!\\left(\\mathcal{N}(\\mu_r, \\Sigma_r) \\| \\mathcal{N}(\\mu_g, \\Sigma_g)\\right)$",
        "$1 - \\text{cosine\\_similarity}(\\mu_r, \\mu_g)$",
      ],
      correctAnswer: 0,
      explanation:
        "FID is the Fréchet (Wasserstein-2) distance between two multivariate Gaussians:\n\\[\n\\text{FID} = \\|\\mu_r - \\mu_g\\|^2 + \\text{Tr}\\!\\left(\\Sigma_r + \\Sigma_g - 2(\\Sigma_r \\Sigma_g)^{1/2}\\right).\n\\]\n\n**Step 1.** $\\mu_r, \\Sigma_r$ are the mean and covariance of Inception-v3 pool3 features for real images; $\\mu_g, \\Sigma_g$ are for generated images.\n\n**Step 2.** The first term penalises drift in mean feature position (poor image quality).\n\n**Step 3.** The second term penalises covariance mismatch — particularly important for detecting mode collapse.",
      hints: [
        "FID is the Fréchet/Wasserstein-2 distance between two multivariate Gaussians $\\mathcal{N}(\\mu_r, \\Sigma_r)$ and $\\mathcal{N}(\\mu_g, \\Sigma_g)$.",
        "The matrix square-root term penalises when the covariances of real and generated features differ.",
      ],
    },
    {
      id: "q-cv-kp28-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Pascal VOC evaluation, a detection is a true positive only if its IoU with a ground truth box exceeds 0.5 AND the same ground truth box has not already been matched by a higher-confidence detection.",
      correctAnswer: 0,
      explanation:
        "VOC AP matching is greedy in confidence order: detections are sorted by score and each is assigned to the highest-IoU unmatched GT (if IoU $\\geq 0.5$).\n\n**Step 1.** Once a GT is matched, all further detections overlapping it are FPs regardless of IoU.\n\n**Step 2.** This greedy matching ensures the precision-recall curve reflects genuine detection performance.\n\n**Step 3.** The \"unmatched\" condition is critical: two overlapping high-confidence predictions for one GT yield only one TP, not two.",
      hints: [
        'The "unmatched" condition prevents double-counting: two high-confidence overlapping predictions for one GT yield only one TP.',
        "Greedy matching in confidence order rewards detectors that assign highest scores to correct detections.",
      ],
    },
    {
      id: "q-cv-kp28-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A model achieves $\\text{AP}_{0.5} = 0.72$ and $\\text{AP}_{0.75} = 0.52$ but very low AP at stricter thresholds. Why might COCO mAP (AP[.50:.95]) be around 0.48 while VOC mAP (AP@0.5) is 0.72?",
      options: [
        "COCO has more object categories than Pascal VOC.",
        "Averaging AP over thresholds 0.50–0.95 penalises imprecise localisation; a model with loose bounding boxes scores well at IoU=0.5 but poorly at stricter thresholds, dragging the average down.",
        "COCO mAP uses a different P-R interpolation method that always produces lower values.",
        "COCO mAP subtracts the FID score from AP@0.5.",
      ],
      correctAnswer: 1,
      explanation:
        "COCO mAP[.50:.95] averages AP over 10 IoU thresholds. A model that localises objects loosely will achieve high AP@0.5 but low AP at stricter thresholds.\n\n**Step 1.** VOC mAP uses a single threshold (0.5) — any detection with IoU $\\geq 0.5$ is a true positive.\n\n**Step 2.** COCO mAP averages across 10 thresholds, so if most values above IoU=0.6 are near zero, the mean will be much lower than AP@0.5 alone.\n\n**Step 3.** The wide range of thresholds in COCO specifically rewards detectors that produce tight bounding boxes, not just correct classifications.",
      hints: [
        "Higher IoU thresholds demand that the predicted box nearly perfectly overlaps the ground truth — loose boxes fail these stricter thresholds.",
        "mAP[.50:.95] is the unweighted mean of 10 AP values — if most values above IoU=0.6 are near zero, the mean will be much lower than AP@0.5.",
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
        "A ResNet-50 backbone pretrained on ImageNet because it is fast and lightweight.",
        "A heavyweight ViT (ViT-H/16) pretrained with MAE, run once per image to produce a $64 \\times 64$ image embedding that is cached and reused across multiple prompts.",
        "A CLIP vision encoder so that text prompts and image prompts can be processed in the same embedding space.",
        "A U-Net encoder-decoder so that the image embedding retains full spatial resolution.",
      ],
      correctAnswer: 1,
      explanation:
        "SAM uses a ViT-H (huge) image encoder with MAE pretraining to produce dense image embeddings at 1/16 scale.\n\n**Step 1.** For a $1024 \\times 1024$ input, the embedding is $64 \\times 64$ — a compact representation of the full image.\n\n**Step 2.** Crucially, the image encoder runs once and the resulting embedding is cached — allowing fast interactive segmentation at < 50ms per prompt.\n\n**Step 3.** ViT-H has 632M parameters; the prompt encoder and mask decoder together have approximately 4M parameters.",
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
        "Supervised pretraining on ImageNet-22k with label smoothing and aggressive augmentation.",
        "Self-supervised learning combining DINO self-distillation and iBOT masked image modelling, trained on a curated LVD-142M dataset.",
        "Contrastive pretraining on image-text pairs from the web (similar to CLIP).",
        "Autoregressive next-patch prediction on a large-scale image dataset.",
      ],
      correctAnswer: 1,
      explanation:
        "DINOv2 combines two self-supervised objectives trained on the curated LVD-142M dataset.\n\n**Step 1.** DINO self-distillation: a student ViT matches a momentum-teacher's global CLS token predictions on different augmented views.\n\n**Step 2.** iBOT masked image modelling: masked patch tokens are predicted, encouraging local feature quality complementary to the global DINO objective.\n\n**Step 3.** Combining DINO (CLS-level) and iBOT (patch-level) gives both global and local feature quality, enabling frozen features to work across depth estimation, segmentation, and classification without fine-tuning.",
      hints: [
        "DINOv2 is purely self-supervised — it uses no text pairs (unlike CLIP) and no manual labels.",
        "Combining DINO (CLS-level) and iBOT (patch-level) objectives encourages both global and local feature quality.",
      ],
    },
    {
      id: "q-cv-kp30-3",
      type: "true-false",
      difficulty: "medium",
      question:
        'CLIP (Contrastive Language-Image Pretraining) can be used for zero-shot image classification by comparing image embeddings to text embeddings of class descriptions like "a photo of a {class}".',
      correctAnswer: 1,
      explanation:
        "CLIP trains dual ViT/ResNet image and text encoders with InfoNCE contrastive loss on 400M (image, text) pairs to produce aligned embeddings.\n\n**Step 1.** At inference, class prompts \"a photo of a {class}\" are embedded as text; the query image is embedded; cosine similarity identifies the closest class.\n\n**Step 2.** This enables zero-shot classification on unseen classes without any task-specific training.\n\n**Step 3.** The alignment between visual and textual embeddings in CLIP's shared space is what makes this possible.",
      hints: [
        "CLIP learns a shared image-text embedding space where matching pairs are close — class names can act as label embeddings.",
        '"Zero-shot" means no labelled images of the test class are needed — the text description substitutes.',
      ],
    },
    {
      id: "q-cv-kp30-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SAM accepts multiple types of prompts to generate segmentation masks. Which of the following is NOT a supported prompt type in SAM?",
      options: [
        "A point (x, y) with a foreground/background label.",
        "A bounding box ($x_1, y_1, x_2, y_2$) specifying a region of interest.",
        "A free-form text description of the object to segment.",
        "A rough mask from a previous prediction used to refine the segmentation.",
      ],
      correctAnswer: 2,
      explanation:
        "SAM's prompt encoder accepts points, bounding boxes, and low-resolution masks as geometric prompts — it does NOT natively accept free-form text descriptions.\n\n**Step 1.** SAM's three prompt types are: (1) foreground/background point clicks; (2) bounding boxes; (3) low-resolution mask inputs from a previous prediction.\n\n**Step 2.** Text-prompted segmentation requires an additional text-grounding module (e.g., Grounding DINO + SAM) to first localise text in the image.\n\n**Step 3.** SAM's mask decoder generates up to 3 candidate masks with confidence scores, handling ambiguous prompts gracefully.",
      hints: [
        "SAM's prompt encoder converts sparse (points, boxes) and dense (masks) inputs — which input format is it missing?",
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
        "4 positives and 4 negatives.",
        "4 positives and 12 negatives ($N^2 - N$).",
        "4 positives and 8 negatives.",
        "4 positives and 16 negatives ($N^2$).",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP constructs an $N \\times N$ similarity matrix. Each diagonal entry is a positive pair. All off-diagonal entries are negatives.\n\n**Step 1.** Positives: the $N$ diagonal entries.\n\n**Step 2.** Negatives: all off-diagonal entries: $N^2 - N = 4^2 - 4 = 12$.\n\n**Step 3.** Large batch sizes ($N = 32768$) provide abundant negatives, which is crucial for CLIP's performance.",
      hints: [
        "An $N \\times N$ matrix has $N$ diagonal (positive) and $N^2 - N$ off-diagonal (negative) entries.",
        "For $N = 4$: $4^2 = 16$ total pairs, 4 on the diagonal are positives, $16 - 4 = 12$ are negatives.",
      ],
    },
  ],
};
