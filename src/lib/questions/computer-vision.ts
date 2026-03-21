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


  "video-understanding-advanced": [

      {
        id: "q-cv-kp31-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Temporal Segment Networks (TSN) segment a video into $K$ segments and extracts a snippet from each. What is the primary motivation for this segment-based sampling strategy?",
        options: [
          "To reduce the frames-per-second (FPS) of the video to a fixed low rate.",
          "To aggregate long-range temporal information across the entire video duration.",
          "To force the network to learn both short-range motion and long-range context simultaneously.",
          "To crop the video spatially to a fixed resolution of $224 \times 224$.",
        ],
        correctAnswer: 1,
        explanation:
          "A video may be several minutes long. Extracting only a single frame (or short clip) misses most of the temporal structure. TSN samples one snippet per segment uniformly from $K$ equally-spaced temporal blocks, so that the model sees the full video regardless of length.\n\n**Step 1.** TSN splits the video into $K$ (e.g. 8) equal-length segments along the temporal axis.\n\n**Step 2.** One short snippet is randomly sampled from each segment and passed through a shared spatial ConvNet.\n\n**Step 3.** The per-snippet predictions are fused (averaged) to produce a single video-level prediction, capturing the entire video's content.",
        hints: [
          "If you only sample one frame from a 10-minute video, what temporal information do you lose?",
          "TSN averages predictions across segments — why not just look at every frame?",
        ],
      },
      {
        id: "q-cv-kp31-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Factorised temporal attention in video models separates the computation of spatial and temporal attention. What problem does this solve compared to full 3D self-attention?",
        options: [
          "It allows gradients to flow more easily through very deep video networks.",
          "It avoids the quadratic memory explosion of full 3D attention by first computing spatial self-attention then temporal self-attention.",
          "It eliminates the need for optical flow pre-training in video classification.",
          "It prevents the model from overfitting to short-duration actions.",
        ],
        correctAnswer: 1,
        explanation:
          "Full 3D attention over all $(T \times H \times W)$ positions is $O(T^2 H^2 W^2)$, which is intractable for typical video resolutions and lengths.\n\n**Step 1.** Factorised attention applies self-attention spatially first: each frame attends to itself and other frames' spatial positions, producing per-frame features of size $(H W) \times d$.\n\n**Step 2.** Then temporal attention is applied across the $T$ frame-level representations, giving $O(T^2 \cdot d)$ complexity — far smaller than $O(T^2 H^2 W^2)$.\n\n**Step 3.** This factorisation captures the intuition that 'what' (spatial content) and 'when' (temporal ordering) are separable learning problems.",
        hints: [
          "3D attention treats all $(T, H, W)$ positions equally — what is the computational cost of attending to all pairwise positions?",
          "Factorising spatial and temporal attention means you first solve 'what appears in each frame' and then 'how frames relate over time' — what does this avoid computing?",
        ],
      },
      {
        id: "q-cv-kp31-3",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "TimeSformer uses a divide-and-conquer strategy called 'sparse sampling' where each frame attends only to a small number of nearby frames. Why is this necessary for practical training?",
        options: [
          "Because the video dataset only contains clips with at most 3 frames.",
          "Because storing the full $T \times T$ attention matrix for long clips exceeds GPU memory limits.",
          "Because remote sensing videos are pre-filtered to have exactly 8 frames.",
          "Because person re-identification requires spatial cropping before temporal reasoning.",
        ],
        correctAnswer: 1,
        explanation:
          "Even with factorised attention, a 96-frame clip still yields a $96 \times 96$ temporal attention matrix per head. For large batch sizes this dominates memory.\n\n**Step 1.** Standard TimeSformer samples $T = 8$ or $T = 32$ frames — the $T^2$ temporal attention cost is manageable at this scale.\n\n**Step 2.** Sparse sampling (e.g. each frame attends to \pm 1 neighbours in a strided manner) further reduces the effective temporal receptive field without quadratic cost.\n\n**Step 3.** The trade-off is that very long-range dependencies (e.g. across a 10-second action) may be under-represented if sampling is too sparse.",
        hints: [
          "What happens to the size of a $T \times T$ matrix as $T$ grows from 8 to 96?",
          "If each frame attends to all other frames, the attention matrix stores $T^2$ entries — how many entries is that for $T = 96$?",
        ],
      },
      {
        id: "q-cv-kp31-4",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "SlowFast networks use a two-pathway architecture: a Slow pathway (low FPS, high spatial resolution) and a Fast pathway (high FPS, low channels). What is the core intuition behind this design?",
        options: [
          "The Slow pathway captures semantic content (what) while the Fast pathway captures motion (how).",
          "The Fast pathway must have more layers than the Slow pathway to compensate for its lower frame rate.",
          "Both pathways must use identical channel counts so their features can be averaged directly.",
          "The Slow pathway operates at $\alpha \times$ the frame rate of the Fast pathway, where $\alpha$ is always 4.",
        ],
        correctAnswer: 0,
        explanation:
          "Biological visual systems have separate 'what' and 'how' pathways. SlowFast mirrors this by giving the Slow pathway many channels to recognise fine-grained visual details and the Fast pathway few channels but high temporal resolution to capture rapid motion.\n\n**Step 1.** The Slow pathway operates at $\frac{1}{\alpha}$ of the video frame rate (e.g. every 4th frame) with wide channels ($C$); it encodes the semantic identity of actors and objects.\n\n**Step 2.** The Fast pathway operates at the full frame rate with narrow channels ($\frac{C}{\alpha}$); it captures rapid motion cues (limb movement, object trajectories).\n\n**Step 3.** Lateral connections (from Fast to Slow) let high-frequency temporal features modulate the Slow pathway's semantic representations, improving accuracy.",
        hints: [
          "If you watch a video at 1 FPS you see 'what' is happening but not 'how' — what would you miss?",
          "The Slow pathway has many channels (semantic detail) while the Fast pathway has few channels but many frames — what does each pathway specialise in?",
        ],
      },
  ],

  "3d-object-detection": [

      {
        id: "q-cv-kp32-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Range images are dense 2D arrays where each pixel stores the depth (distance) measured by a LiDAR sensor. What is the key advantage of processing object detection directly on range images compared to processing raw 3D point clouds?",
        options: [
          "Range images preserve the full 3D coordinates of every LiDAR return without quantisation loss.",
          "Range images allow 2D convolutional architectures (designed for images) to be directly applied, avoiding irregular point access.",
          "Range images encode the reflectance intensity of each return, which is not available in raw point clouds.",
          "Range images require fewer LiDAR returns than the raw point cloud to achieve the same detection accuracy.",
        ],
        correctAnswer: 1,
        explanation:
          "Raw point clouds are unordered and irregularly distributed in 3D space, making standard convolutions inapplicable. A range image is a dense 2D matrix (range, angle) where each cell is a valid image pixel, so standard 2D CNNs can process it efficiently.\n\n**Step 1.** A spinning LiDAR produces a range image of shape $(H, W)$ where $H$ is the number of vertical beams and $W$ is the number of angular samples per rotation.\n\n**Step 2.** Each pixel stores $(\text{range}, \text{intensity}, \text{elongation})$ enabling a 2D CNN to extract 3D features using image-based priors.\n\n**Step 3.** Projecting detections back to 3D requires converting row/column indices back to $(x, y, z)$ via sensor calibration parameters.",
        hints: [
          "Standard 2D convolutions require regularly-spaced grid inputs — does a raw point cloud satisfy this constraint?",
          "A range image is essentially a polar coordinate representation of the same 3D points. What grid property does it restore?",
        ],
      },
      {
        id: "q-cv-kp32-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Bird's Eye View (BEV) representation projects 3D scene content onto a 2D top-down plane. What is the primary challenge when generating BEV features from perspective camera images?",
        options: [
          "BEV features cannot represent occluded objects because the top-down view has no occlusion cues.",
          "Perspective images lack depth information, so lifting 2D image features to 3D BEV space requires either depth estimation or a learned transformer.",
          "BEV representations are inherently limited to indoor scenes because outdoor scenes have no floor plane.",
          "BEV features require LiDAR point clouds to be computed — cameras are not sufficient.",
        ],
        correctAnswer: 1,
        explanation:
          "A camera image is a perspective projection: each pixel contains colour/intensity but not distance. To create a BEV map from cameras, the network must infer depth and then reproject to a top-down coordinate frame.\n\n**Step 1.** In lift-splat-shot (LSS), a depth distribution is predicted per pixel, then each pixel's features are 'splatted' into the BEV grid at the appropriate depth.\n\n**Step 2.** Alternatively, a transformer decoder (e.g. BEVFormer) uses deformable attention to query image features at BEV grid positions, implicitly learning the perspective-to-BEV mapping.\n\n**Step 3.** The advantage of BEV is that detection and tracking become simpler 2D problems in the top-down plane, where object sizes are scale-invariant.",
        hints: [
          "When you look at a photo you see width and height but not depth — what extra inference step is needed to go from 2D pixels to a 3D top-down grid?",
          "If objects get smaller in perspective images as they move further away, how does a BEV representation handle this scale ambiguity?",
        ],
      },
      {
        id: "q-cv-kp32-3",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "PointPillars replaces the traditional 3D voxel grid with 'pillars' — vertical columns of variable height — to encode point clouds. What computational advantage does this provide over full voxelisation?",
        options: [
          "Pillars allow max-pooling over the $z$-axis in one step, producing a 2D pseudo-image that avoids 3D convolutions entirely.",
          "Pillars require exactly one LiDAR return per pillar, reducing memory usage by a factor of the number of beams.",
          "Pillars eliminate the need for Non-Maximum Suppression (NMS) in the detection head.",
          "Pillars are encoded using a VAE so the encoding is learned end-to-end without a detection head.",
        ],
        correctAnswer: 0,
        explanation:
          "Voxelisation divides 3D space into a regular grid of small 3D voxels, requiring 3D convolutions (expensive) to process. PointPillars summarises each pillar (column) with a learned per-point network, then applies a 2D CNN on the resulting $(H, W, D)$ pseudo-image.\n\n**Step 1.** The point cloud is divided into a 2D grid in $x$- and $y$-dimensions; each cell is a 'pillar'. All points in a pillar are encoded with offsets relative to the pillar centre.\n\n**Step 2.** A PointNet-style encoder converts each pillar into a $D$-dimensional feature vector, producing a $(H, W, D)$ tensor — the 'pseudo-image'.\n\n**Step 3.** A standard 2D backbone processes the pseudo-image, followed by a detection head. This avoids 3D convolutions entirely, giving near-2D-RCNN speed.",
        hints: [
          "3D convolutions are much more expensive than 2D convolutions for the same number of parameters — what operation does PointPillars replace them with?",
          "If you pool all points in a vertical column into a single vector, what dimension of the original 3D space are you collapsing?",
        ],
      },
      {
        id: "q-cv-kp32-4",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "CenterPoint tracks objects in 3D by detecting their centre points in a BEV heatmap and regressing velocity vectors. How does it associate detections with track IDs across frames?",
        options: [
          "By using a Siamese network that matches appearance features between frames.",
          "By greedily matching detected centres to predicted centre locations based on Euclidean distance and velocity-adjusted positions.",
          "By running a separate re-identification classifier on the cropped 3D point cloud of each detection.",
          "By assigning each detected object a fixed track ID that persists for the entire video sequence.",
        ],
        correctAnswer: 1,
        explanation:
          "CenterPoint's tracking is simple and does not use appearance features: each object has a predicted centre and velocity $(v_x, v_y)$ from the detector. Between frames, predicted positions are updated with observed detections.\n\n**Step 1.** At frame $t$, each track's position is predicted forward using its learned velocity: $\hat{c}_{t+1} = c_t + v_t \cdot \Delta t$.\n\n**Step 2.** Detections at frame $t+1$ are matched to tracks by solving a bipartite assignment minimising the Euclidean distance between $\hat{c}_{t+1}$ and detected centres.\n\n**Step 3.** Matched detections update the track's centre and velocity; unmatched detections start new tracks; unmatched tracks are removed after a threshold.",
        hints: [
          "CenterPoint does not use appearance features for tracking — what two pieces of information does it use instead?",
          "If an object moves to the left between frames, what does its velocity vector tell you about where to search for it next frame?",
        ],
      },
  ],

  "medical-imaging-advanced": [

      {
        id: "q-cv-kp33-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "A 3D U-Net processes volumetric medical images (e.g. CT or MRI scans) using 3D convolutions. What is the primary motivation for using 3D rather than processing each 2D slice independently with a 2D U-Net?",
        options: [
          "3D convolutions are faster than 2D convolutions for the same number of parameters because they exploit temporal redundancy.",
          "3D convolutions capture rich spatial context across adjacent slices, improving segmentation of structures that span multiple slices.",
          "2D U-Nets cannot process anisotropic voxels (different spacing in-plane vs. through-plane), so 3D is always required.",
          "3D U-Nets require fewer training images than 2D U-Nets because each volume provides more slices.",
        ],
        correctAnswer: 1,
        explanation:
          "Medical volumes have isotropic or near-isotropic voxels in many modalities (e.g. MRI). Structures like vessels, organs, and lesions often extend across multiple slices — information that is lost when slices are processed independently.\n\n**Step 1.** A 2D U-Net applied slice-by-slice ignores inter-slice spatial relationships (e.g. a vessel curving through consecutive CT slices).\n\n**Step 2.** 3D U-Net applies 3D convolutions across $(H, W, D)$ volumes, so the encoder's receptive field grows in all three dimensions simultaneously.\n\n**Step 3.** The trade-off is significantly higher memory consumption (the entire $D$-depth volume must be held in GPU memory during backpropagation), limiting input size and batch size.",
        hints: [
          "If a tumour appears as a small blob in slice 10 but is larger in slice 11, can a 2D slice-by-slice network learn this 3D shape relationship?",
          "3D convolutions add a third dimension to the feature maps — what does this extra dimension represent in a CT/MRI volume?",
        ],
      },
      {
        id: "q-cv-kp33-2",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "In multi-task learning for medical image analysis, a shared encoder is used with separate decoder heads for each task (e.g. organ segmentation + disease classification). What is the main risk of this architecture?",
        options: [
          "The shared encoder may suffer from gradient starvation, where only the dominant task learns useful representations.",
          "The separate decoders will inevitably produce identical features, reducing model capacity.",
          "Multi-task models require at least 5 tasks to benefit from representation learning — with fewer tasks they underperform single-task models.",
          "Shared encoders cannot be initialised with ImageNet pretrained weights because medical images have different statistics.",
        ],
        correctAnswer: 0,
        explanation:
          "When tasks have conflicting gradients (e.g. segmentation needs fine-grained localisation while classification needs global semantic features), the shared encoder must compromise. Gradient starvation occurs when one task dominates the gradients, causing the other tasks' heads to underperform compared to single-task models.\n\n**Step 1.** The loss is typically a weighted sum: $\mathcal{L} = \lambda_1 \mathcal{L}_{\text{seg}} + \lambda_2 \mathcal{L}_{\text{cls}}$. If $\lambda_1 \gg \lambda_2$, classification gradients are ignored.\n\n**Step 2.** Solutions include: dynamic task weighting (e.g. uncertainty weighting), gradient projection methods, and expert gating networks.\n\n**Step 3.** Task affinity grouping (clustering tasks by gradient similarity) can identify which tasks benefit from sharing and which should have separate encoder branches.",
        hints: [
          "If two tasks want the encoder to emphasise different features (e.g. local textures vs. global shape), what happens to the shared encoder's gradients?",
          "What does 'gradient starvation' mean in the context of a shared representation — which task's features survive?",
        ],
      },
      {
        id: "q-cv-kp33-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Self-supervised pretraining for medical images (e.g. using contrastive learning or masked autoencoders) has been shown to outperform supervised ImageNet pretraining for many downstream tasks. What is the primary reason?",
        options: [
          "Medical images (CT, MRI, X-ray) have the same semantic categories as ImageNet, so the representations transfer perfectly.",
          "Medical images share low-level texture and edge statistics with natural images, making ImageNet features optimal for initialisation.",
          "Domain-specific pretraining captures medically-relevant feature hierarchies (tissue textures, anatomical structures) that ImageNet features do not model.",
          "Supervised ImageNet pretraining always overfits on small medical datasets, whereas self-supervised never does.",
        ],
        correctAnswer: 2,
        explanation:
          "ImageNet features encode natural image statistics (animals, objects, scenes) that are semantically mismatched with medical images (anatomy, pathology, tissue types). Domain-specific self-supervised pretraining produces features more aligned with downstream medical tasks.\n\n**Step 1.** Contrastive methods (SimCLR, MoCo) applied to medical volumes create views via random crops, flips, and intensity augmentations that preserve anatomical structure.\n\n**Step 2.** Masked autoencoder (MAE) pretraining forces the encoder to learn complete anatomical representations by reconstructing randomly masked 2D slices or 3D patches.\n\n**Step 3.** Studies on CT, MRI, X-ray show that domain-specific pretraining improves downstream performance by 2–5% in segmentation and classification tasks, especially with limited labelled data.",
        hints: [
          "What is the fundamental domain gap between ImageNet (natural photographs) and a CT scan of the human abdomen?",
          "If you train SimCLR on 100,000 unlabelled chest X-rays, what kind of features do the learned embeddings encode that ImageNet embeddings do not?",
        ],
      },
      {
        id: "q-cv-kp33-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Federated learning in medical imaging trains a shared model across multiple hospitals without exchanging raw patient data. What is the main remaining privacy concern even when only model gradients are communicated?",
        options: [
          "Model gradients are mathematically equivalent to the raw data, so gradient leakage attacks can reconstruct identifiable patient images.",
          "Hospitals may intentionally submit poisoned gradients to corrupt the shared model (this is the only real concern).",
          "Gradient communication bandwidth is too large for typical hospital network infrastructure.",
          "Federated learning is fully private; there are no remaining concerns.",
        ],
        correctAnswer: 0,
        explanation:
          "Research has shown that gradient inversion attacks can recover training data from gradients — particularly when gradients are computed over small batches or with high resolution.\n\n**Step 1.** Deep Leakage from Gradients (DLG) showed that given the model weights and gradients, one can optimise to reconstruct the original input sample that produced those gradients.\n\n**Step 2.** For medical images, even a partially-reconstructed image may contain identifiable anatomical features or pathology visible to the naked eye.\n\n**Step 3.** Mitigations include differential privacy (adding noise to gradients), secure aggregation (cryptographic protocols), and compression-based privacy.",
        hints: [
          "If you know the model weights and the gradients, can you work backwards to find the input that produced those gradients?",
          "Why might even a blurry reconstruction of a medical image be a serious privacy violation?",
        ],
      },
  ],

  "contrastive-vision-language": [

      {
        id: "q-cv-kp34-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "ALIGN trains a vision-language model on a noisy dataset of 1.8 billion image-text pairs collected from the web without any manual filtering. What key property of the CLIP contrastive loss makes this scale feasible?",
        options: [
          "The contrastive loss acts as a pseudo-label generator, converting noisy text into accurate semantic labels.",
          "The contrastive loss only compares each image to a single positive text caption and all other captions are negatives — the signal scales with batch size and does not require clean annotations.",
          "Noisy text is automatically corrected by the vision encoder before the contrastive loss is applied.",
          "ALIGN uses a supervised loss on ImageNet class labels, not a contrastive loss.",
        ],
        correctAnswer: 1,
        explanation:
          "CLIP/ALIGN's InfoNCE contrastive loss compares each image to ALL texts in the batch. A batch of $N$ pairs yields $N$ positives (diagonal) and $N(N-1)$ cross-modal negatives. With a batch size of 32,768, each image is compared to 32,767 hard negatives, which is sufficient to correct label noise statistically.\n\n**Step 1.** Noisy captions contain some correct words (e.g. 'dog', 'running') even if the full sentence is garbled — these partial matches provide useful gradients.\n\n**Step 2.** The large batch provides massive negative sampling, pushing the model to learn invariant visual features even with noisy text.\n\n**Step 3.** At scale, the noise averages out: the probability that a given image's most similar text is completely unrelated is negligible.",
        hints: [
          "If you have one correct caption and 32,767 random captions, what is the probability that the correct one is never among the top-$k$ matches?",
          "Contrastive learning with huge batches acts as its own noise filter — what mechanism allows this?",
        ],
      },
      {
        id: "q-cv-kp34-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "GRiT (Grounding Image Text) extends traditional image-text retrieval by also producing a text phrase-to-region bounding-box alignment. What architectural modification enables GRiT to perform phrase grounding?",
        options: [
          "GRiT adds a Faster R-CNN detection head on top of the CLIP image encoder, conditioned on the text query.",
          "GRiT replaces the contrastive loss with a masked language modelling loss applied to the concatenated image-text input.",
          "GRiT concatenates the CLIP image features with the BERT text features and passes them through a transformer decoder that outputs bounding-box coordinates for each phrase.",
          "GRiT uses a separate text-to-box attention layer after the contrastive retrieval stage to refine box predictions.",
        ],
        correctAnswer: 2,
        explanation:
          "GRiT's architecture encodes images with a ViT and texts with a BERT encoder, concatenates the multimodal features, and passes them through a transformer decoder that produces text phrases with their corresponding bounding boxes.\n\n**Step 1.** The encoder produces per-word text features and a global image feature vector.\n\n**Step 2.** The decoder attends to both image and text features and outputs, for each phrase, a bounding box.\n\n**Step 3.** GRiT combines phrase grounding with contrastive retrieval in a unified model, outperforming separate two-stage approaches.",
        hints: [
          "Phrase grounding requires connecting each word/phrase to a specific image region — what must the model learn beyond global image-text similarity?",
          "A transformer decoder can output arbitrary sequences — how might it output both a phrase string and a bounding box coordinate tuple?",
        ],
      },
      {
        id: "q-cv-kp34-3",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "BLIP-2 introduces a lightweight Q-Former bridge between a frozen image encoder and a frozen large language model. What problem does this architecture solve compared to earlier end-to-end vision-language models?",
        options: [
          "It eliminates the need for language model decoders by generating text directly from visual features.",
          "It enables vision-language training without requiring a massive dataset by using frozen components trained on modality-specific data.",
          "It replaces contrastive learning with generative masked token prediction, improving caption quality.",
          "It uses a variational autoencoder to compress visual features before passing them to the LLM.",
        ],
        correctAnswer: 1,
        explanation:
          "End-to-end V+L models require huge amounts of image-text data and compute to train from scratch. BLIP-2 exploits the fact that powerful frozen models already exist for each modality, so only a small bridging module needs to be trained.\n\n**Step 1.** The Q-Former is a lightweight encoder-decoder trained in two stages: (1) vision-language representation learning with a frozen CLIP image encoder; (2) generative grounding with a frozen LLM.\n\n**Step 2.** The Q-Former contains a set of learnable query tokens that extract relevant visual information from the frozen image encoder via cross-attention.\n\n**Step 3.** By keeping the large frozen models fixed, BLIP-2 achieves competitive V+L performance with only a fraction (around 1%) of the trainable parameters of equivalent end-to-end models.",
        hints: [
          "What are the two massive pretrained models that BLIP-2 keeps frozen, and what is the small module that connects them?",
          "If you could reuse a trained CLIP image encoder and a trained GPT-3, what would you still need to train to connect them?",
        ],
      },
      {
        id: "q-cv-kp34-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Retrieval-augmented vision-language models (e.g. REPLUG) treat the vision encoder as a 'retriever' over a codebook of image patches and combine it with an LLM decoder. How does the retrieval mechanism improve LLM predictions compared to a standard vision-language model?",
        options: [
          "Retrieval allows the LLM to access image patches at test time without any visual features being passed through the model.",
          "Retrieval introduces additional token-level noise that regularises the LLM's visual predictions.",
          "Retrieval augments the LLM's context window with relevant image patch embeddings at test time, providing richer grounding without updating the LLM weights.",
          "Retrieval is only used during training to create pseudo-labels for the vision encoder; at test time the retriever is disabled.",
        ],
        correctAnswer: 2,
        explanation:
          "Standard V+L models compress all visual information into a fixed number of tokens. Retrieval-augmented models keep a codebook of image patch embeddings; at test time the relevant patches are retrieved and concatenated to the LLM input.\n\n**Step 1.** During training, the retriever (vision encoder) is fixed and only the LLM is trained to attend to retrieved patch embeddings.\n\n**Step 2.** At inference, the query (text) retrieves the $k$ most relevant image patches from the codebook, which are prepended to the LLM's context.\n\n**Step 3.** This is especially valuable when the test image differs from training distribution — retrieval provides dynamic access to visual information the LLM has never seen.",
        hints: [
          "What is the key difference between 'compressing' an image into a fixed token sequence vs. 'retrieving' relevant image patches at test time?",
          "If the LLM has never seen a specific type of medical scan during training, how might retrieval help it answer a question about a new scan?",
        ],
      },
  ],

  "diffusion-models": [

      {
        id: "q-cv-kp35-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "In the forward diffusion process of a DDPM, Gaussian noise is iteratively added to an image over $T$ timesteps. As $t \to T$, what does the distribution $q(\mathbf{x}_t | \#mathbf{x}_0)$ converge to?",
        options: [
          "It converges to the data distribution, enabling direct sampling.",
          "It converges to an isotropic Gaussian distribution, which is independent of the original image.",
          "It converges to a distribution concentrated on the edges and corners of $\mathbf{x}_0$.",
          "It converges to a uniform distribution over all possible images of the same resolution.",
        ],
        correctAnswer: 1,
        explanation:
          "The forward process is a Markov chain where $\mathbf{x}_t = \sqrt{\bar{\alpha}_t} \mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}$ with $\bar{\alpha}_t = \prod_{i=1}^t \alpha_i$. As $t \to T$, $\bar{\alpha}_T \to 0$ so $\mathbf{x}_T \approx \boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$.\n\n**Step 1.** By the law of iterated expectations, $q(\mathbf{x}_t | \#mathbf{x}_0)$ is Gaussian with mean $\sqrt{\bar{\alpha}_t} \mathbf{x}_0$ and variance $1 - \bar{\alpha}_t$.\n\n**Step 2.** The variance $\beta_t$ is typically scheduled so that $\bar{\alpha}_T$ is essentially zero — meaning the final distribution is standard Gaussian noise.\n\n**Step 3.** This is crucial: the reverse process must learn to denoise from pure Gaussian noise back to a sample from the data distribution.",
        hints: [
          "If $\bar{\alpha}_t \to 0$, what happens to the contribution of $\mathbf{x}_0$ in the expression $\sqrt{\bar{\alpha}_t} \mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}$?",
          "The forward process destroys all structure by $t = T$ — what kind of simple distribution does it converge to?",
        ],
      },
      {
        id: "q-cv-kp35-2",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "In DDPM training, the model learns to predict the noise $\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)$ added at timestep $t$. The simplified training objective is $\mathcal{L} = \mathbb{E}_{t, \#mathbf{x}_0, \boldsymbol{\epsilon}} \left[ \| \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) - \boldsymbol{\epsilon} \|^2 \right]$. Why is this equivalent to optimising the variational lower bound on $\log p_\theta(\mathbf{x}_0)$?",
        options: [
          "The noise prediction objective is mathematically identical to maximising the likelihood of the data under a deterministic autoencoder.",
          "The noise prediction parameterisation arises from the reparameterisation trick applied to the posterior $q(\mathbf{x}_{t-1} | \mathbf{x}_t, \mathbf{x}_0)$, and the simplified loss is the result of marginalising out the intermediate timesteps.",
          "The simplified loss is a lower bound because it ignores the KL divergence between the true and predicted posteriors at all timesteps except $t = 1$.",
          "Predicting noise is equivalent to predicting the original image because $\mathbf{x}_0 = \frac{\mathbf{x}_t - \sqrt{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}}{\sqrt{\bar{\alpha}_t}}$.",
        ],
        correctAnswer: 1,
        explanation:
          "The full DDPM variational lower bound (VLB) is a sum of KL divergences between the true reverse process $q(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0)$ and the predicted reverse process $p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)$ at each timestep. Ho et al. (2020) showed that the VLB simplifies to a noise-prediction loss.\n\n**Step 1.** The key result is that the per-step KL divergence is minimised when the model predicts the added noise $\boldsymbol{\epsilon}$, using the reparameterisation $\mathbf{x}_t = \sqrt{\bar{\alpha}_t} \mathbf{x}_0 + \sqrt{1-\bar{\alpha}_t} \boldsymbol{\epsilon}$.\n\n**Step 2.** After reparameterisation and marginalising the latent variables, all terms in the VLB except the final reconstruction loss reduce to the noise-prediction objective.\n\n**Step 3.** Empirically, predicting $\boldsymbol{\epsilon}$ rather than $\mathbf{x}_0$ produces better samples and more stable training.",
        hints: [
          "The VLB sums KL divergences across $T$ reverse timesteps — what mathematical simplification allows all these terms to collapse into a single noise-prediction loss?",
          "The reparameterisation trick rewrites $\mathbf{x}_t$ in terms of $\mathbf{x}_0$ and $\boldsymbol{\epsilon}$ — what does predicting $\boldsymbol{\epsilon}$ tell us about $\mathbf{x}_0$?",
        ],
      },
      {
        id: "q-cv-kp35-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Classifier-free guidance (CFG) augments a conditional diffusion model by training it jointly on conditional ($\text{cond}$) and unconditional ($\text{uncond}$) inputs. At inference, the guided prediction is $\tilde{\boldsymbol{\epsilon}}_\theta = (1 + w) \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, c) - w \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, \emptyset)$, where $w$ is the guidance weight. What effect does increasing $w$ have?",
        options: [
          "Increasing $w$ increases the diversity of generated samples.",
          "Increasing $w$ trades off sample quality against prompt alignment — higher $w$ improves adherence to the conditioning $c$ but reduces diversity.",
          "Increasing $w$ reduces the impact of the classifier gradient on the diffusion process.",
          "Increasing $w$ has no effect on the generated samples because CFG uses the same model for both conditional and unconditional predictions.",
        ],
        correctAnswer: 1,
        explanation:
          "CFG is a way to guide diffusion models without a separate classifier. By interpolating between conditional and unconditional predictions, the guidance term amplifies directions in the score field that are consistent with the conditioning signal.\n\n**Step 1.** When $w = 0$, we recover the standard unconditional prediction (no guidance).\n\n**Step 2.** As $w$ increases, the model increasingly follows the conditioning direction — text-to-image alignment improves noticeably.\n\n**Step 3.** At very large $w$ (e.g. $w > 10$), samples become visually sharper but less diverse; mode-collapse-like behaviour appears.",
        hints: [
          "What does the term $\epsilon_\theta(\mathbf{x}_t, c) - \epsilon_\theta(\mathbf{x}_t, \emptyset)$ represent conceptually?",
          "If $w$ is very large, the unconditional prediction is almost subtracted away — what is the risk of relying too heavily on the conditional signal?",
        ],
      },
      {
        id: "q-cv-kp35-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Score-based generative models (e.g. Song et al., 2019) formulate generation as estimating the gradient of the data log-density (the 'score function') and performing Langevin dynamics. What is the key advantage of score-based models over DDPMs?",
        options: [
          "Score-based models do not require any neural network — they directly compute the score from the training data using kernel density estimation.",
          "Score-based models can generate samples in a fixed number of steps equal to the number of noise scales used during training.",
          "Score-based models allow continuous generation at arbitrary resolution because the score network is defined on the continuous noise scale, unlike DDPMs which require discrete timestep discretisation.",
          "Score-based models require significantly less training data than DDPMs.",
        ],
        correctAnswer: 2,
        explanation:
          "DDPMs require discretising the reverse process into a fixed number of timesteps $T$. Score-based models with noise scales parameterised by a continuous $\sigma$ can use arbitrary numbers of steps during inference.\n\n**Step 1.** Score matching minimises $\mathbb{E}_p \left[ \| \nabla_{\mathbf{x}} \log p_\theta(\mathbf{x}) - s_\theta(\mathbf{x}) \|^2 \right]$, where $s_\theta$ is the score network.\n\n**Step 2.** Training adds noise of varying scales $\sigma$: $\tilde{\mathbf{x}} = \mathbf{x} + \sigma \boldsymbol{\epsilon}$, enabling the model to learn scores at all noise levels simultaneously.\n\n**Step 3.** During inference, annealed Langevin dynamics starts from pure noise and progressively refines it — fewer steps are needed than DDPMs because the continuous-time reverse ODE can be discretised adaptively.",
        hints: [
          "DDPMs require a fixed discretisation of the reverse process — what would it mean to have a 'continuous' noise schedule instead?",
          "The score function $\nabla_{\mathbf{x}} \log p(\mathbf{x})$ tells you in which direction in \mathbf{x}-space the log-density increases most rapidly — why is this useful for sampling?",
        ],
      },
  ],

  "object-tracking": [

      {
        id: "q-cv-kp36-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "SiamFC (Fully-Convolutional Siamese Network) tracks an object by computing the similarity between a search region and a template image of the target. What does the 'fully-convolutional' property guarantee?",
        options: [
          "That the network can process input images of arbitrary spatial size without modification.",
          "That the network uses only $1 \times 1$ convolutions to keep computational cost constant.",
          "That the network is trained with a full-convolution loss function over all spatial locations simultaneously.",
          "That the network is invariant to translation and rotation of the target.",
        ],
        correctAnswer: 0,
        explanation:
          "A fully-convolutional network (FCN) contains no fully-connected or global pooling layers — only local convolutions. This means the output is a spatial feature map whose dimensions scale linearly with input size.\n\n**Step 1.** The Siamese network has two identical branches (template $z$ and search $x$) that share weights.\n\n**Step 2.** The cross-correlation layer produces a response map $f(z, x)$ where each spatial location $(u, v)$ represents the similarity between the template and the corresponding search region in $x$.\n\n**Step 3.** The fully-convolutional property ensures that if the search image is $2\times$ larger, the output response map is also $2\times$ larger — enabling efficient sliding-window search without re-running the network.",
        hints: [
          "What happens to the output of a network with fully-connected layers if you change the input image size?",
          "If the response map has spatial dimensions that depend on the input size, what can you infer about the network's architecture?",
        ],
      },
      {
        id: "q-cv-kp36-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "In the Kalman filter framework for visual tracking, the state vector typically includes position and velocity. What is the purpose of the process noise $\mathbf{q}_t \sim \mathcal{N}(\mathbf{0}, \mathbf{Q})$ in the motion model?",
        options: [
          "It models the uncertainty in the sensor measurements (bounding box detections) and prevents the filter from over-relying on noisy detections.",
          "It models the uncertainty in the motion model — the assumption that objects move with constant velocity is only approximate, so acceleration perturbations are added.",
          "It provides the initial covariance estimate for the filter's first measurement.",
          "It corrects for systematic bias in the bounding box annotations from the object detector.",
        ],
        correctAnswer: 1,
        explanation:
          "The Kalman filter's motion model assumes a linear state transition: $\mathbf{s}_t = \mathbf{F} \mathbf{s}_{t-1} + \mathbf{B} \mathbf{u}_{t-1} + \mathbf{q}_t$. The process noise $\mathbf{q}_t$ captures unmodelled dynamics — e.g. sudden direction changes, deceleration, size variations.\n\n**Step 1.** Without process noise, a perfectly tracked object would follow an exact linear trajectory even if the object sharply turns — the filter has no mechanism to deviate from the model.\n\n**Step 2.** $\mathbf{Q}$ (the covariance of $\mathbf{q}_t$) controls how much the filter trusts the motion model. A large $\mathbf{Q}$ allows large deviations but makes the filter sensitive to detection noise.\n\n**Step 3.** In practice, $\mathbf{Q}$ is often tuned empirically or adapted online based on tracking difficulty (e.g. increasing during occlusions).",
        hints: [
          "If process noise were zero, what would happen to the Kalman filter's prediction if the object suddenly changed direction?",
          "What does the covariance matrix $\mathbf{Q}$ represent about the motion model?",
        ],
      },
      {
        id: "q-cv-kp36-3",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "DeepSORT extends the simple distance-based association in SORT by incorporating appearance descriptors. What is the key advantage of appearance-based matching over IoU-only matching?",
        options: [
          "Appearance matching eliminates the need for a Kalman filter by providing geometric constraints.",
          "Appearance matching allows the tracker to re-identify objects that were temporarily occluded — they can be matched to the correct track ID when they reappear, not confused with other nearby objects.",
          "DeepSORT uses appearance features to estimate the object's 3D pose, improving depth accuracy.",
          "Appearance matching is faster than IoU computation because it avoids computing overlaps.",
        ],
        correctAnswer: 1,
        explanation:
          "SORT uses only bounding box overlap (IoU) for association. When objects occlude each other, IoU drops to zero and associations are lost, creating 'identity switches'. DeepSORT adds a CNN-based appearance descriptor and matches using both IoU and cosine distance on appearance.\n\n**Step 1.** When two tracks have similar IoU (e.g. overlapping pedestrians), appearance cosine distance can disambiguate them.\n\n**Step 2.** When an object is occluded and its bounding box disappears, DeepSORT retains its appearance descriptor in a memory queue. When it reappears, the appearance descriptor is matched even if the IoU is low.\n\n**Step 3.** DeepSORT's matching cascade prioritises age-old tracks (long-lived objects) over new ones, reducing identity switches in crowded scenes.",
        hints: [
          "If two pedestrians walk close to each other and their bounding boxes overlap, what property distinguishes them for the purpose of maintaining their track IDs?",
          "SORT loses track when IoU is near zero (e.g. during occlusion) — what additional signal does DeepSORT use to recover the correct association when the object reappears?",
        ],
      },
      {
        id: "q-cv-kp36-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Transformer-based trackers (e.g. TransT, OSTrack) use self-attention and cross-attention between the template and search regions. What advantage does cross-attention provide over the Siamese cross-correlation approach of SiamFC?",
        options: [
          "Cross-attention allows each location in the search region to attend to all locations in the template, capturing long-range dependency patterns without the constraint of local convolution kernels.",
          "Cross-attention requires fewer parameters than cross-correlation because it replaces learned convolutional filters with query-key-value projections.",
          "Cross-attention is limited to comparing objects only within the same spatial resolution, whereas Siamese networks support multi-scale matching.",
          "Cross-attention can only be applied to pairs of images with identical resolutions.",
        ],
        correctAnswer: 0,
        explanation:
          "SiamFC's cross-correlation produces a single response value per spatial location, limiting it to matching at the same spatial granularity. Cross-attention allows every search region location to attend to all template locations with content-dependent weighting.\n\n**Step 1.** In transformer tracking, the template features are used as keys/values and the search features are queries: attention scores determine which template regions are most relevant for tracking each search region location.\n\n**Step 2.** Cross-attention is content-dependent: if the template shows the left side of an object and the search region shows a different viewpoint, the attention mechanism can still relate corresponding parts.\n\n**Step 3.** The trade-off is that transformers are $O(N^2)$ in sequence length, requiring careful design (e.g. deformable attention) to keep tracking real-time.",
        hints: [
          "SiamFC computes a single similarity score per spatial location through cross-correlation — what does cross-attention compute that is more flexible?",
          "If the object changes appearance significantly between frames, how might cross-attention handle this differently than cross-correlation?",
        ],
      },
  ],

  "pose-estimation": [

      {
        id: "q-cv-kp37-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "In heatmap-based human pose estimation, the target heatmap for a keypoint is a 2D Gaussian centred at the ground-truth pixel location. At inference, the keypoint location is obtained by applying softmax over the heatmap and computing the expectation (weighted mean). This is equivalent to:",
        options: [
          "Taking the argmax of the heatmap (the location of the maximum response).",
          "Computing the spatial first moment of the heatmap distribution, which gives a sub-pixel accurate estimate by weighting nearby pixels.",
          "Applying a max-unpooling operation to upsample the heatmap to the original image resolution.",
          "Performing a $3 \times 3$ average pooling on the heatmap before argmax.",
        ],
        correctAnswer: 1,
        explanation:
          "The heatmap is a probability distribution over 2D space: $p_{i,j} = \frac{\exp(h_{i,j})}{\sum_{i',j'} \exp(h_{i',j'})}$. The spatial expectation $\hat{\mathbf{p}} = \sum_{i,j} p_{i,j} [i, j]^\top$ is a weighted average of all pixel locations, naturally producing sub-pixel accuracy.\n\n**Step 1.** Argmax gives integer coordinates (e.g. pixel 42 rather than 42.3), which is less accurate for precise pose estimation.\n\n**Step 2.** The softmax expectation pulls slightly toward high-probability neighbours, giving estimates like $(42.3, 17.8)$ — more accurate than argmax when the Gaussian peak covers multiple pixels.\n\n**Step 3.** This technique is known as 'soft-argmax' or 'differentiable argmax', and is used in recent end-to-end differentiable pose estimators.",
        hints: [
          "If the ground truth is at pixel (42.7, 17.3) but your heatmap peaks at (42, 17), what does argmax return vs. what does the softmax expectation return?",
          "The softmax is a probability distribution — what mathematical operation converts a heatmap into a probability distribution over pixel locations?",
        ],
      },
      {
        id: "q-cv-kp37-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "The Stacked Hourglass network uses repeated encoder-decoder (bottom-up + top-down) blocks with skip connections to capture multi-scale spatial features for pose estimation. What problem does the bottom-up processing specifically solve?",
        options: [
          "It generates heatmaps for each body joint at multiple output resolutions simultaneously.",
          "It captures fine-grained local features by progressively downsampling to a low resolution where the global context (relative positions of all joints) is easy to determine.",
          "It performs 3D convolutions over the depth dimension of the input video.",
          "It applies batch normalisation after each residual block to stabilise training.",
        ],
        correctAnswer: 1,
        explanation:
          "Human pose requires reasoning about both local anatomy (wrist bends, ankle angles) and global configuration (arms relative to torso). The hourglass's bottom-up path progressively downsamples to a low resolution where large spatial relationships are easy to model.\n\n**Step 1.** Each hourglass block downsamples via convolutions and pooling to a small feature map (e.g. $64 \times 64 \to 4 \times 4$).\n\n**Step 2.** At this resolution, each pixel has a very large receptive field covering the entire person, enabling the network to learn inter-joint relationships.\n\n**Step 3.** The subsequent top-down path upsamples with skip connections to recover spatial precision for the heatmap.",
        hints: [
          "What spatial information is lost as you downsample an image — and what is preserved at very low resolutions?",
          "If you only used local features (without downsampling), would you easily be able to determine whether a person's arms are raised or lowered relative to their body?",
        ],
      },
      {
        id: "q-cv-kp37-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "ViTPose uses a pure ViT encoder (no hourglass decoder) for 2D human pose estimation. What design choice makes it possible for a ViT — originally designed for classification — to produce spatially-precise keypoint heatmaps?",
        options: [
          "ViTPose uses a pre-trained ViT and adds a small CNN decoder head for heatmap generation.",
          "ViTPose processes each $16 \times 16$ patch as a spatial token and uses the final layer's output to predict heatmaps via a simple linear projection, without needing a decoder.",
          "ViTPose replaces self-attention with deformable convolutions to achieve spatial precision.",
          "ViTPose requires a 3D body model (SMPL) to lift 2D keypoints to 3D before producing heatmaps.",
        ],
        correctAnswer: 1,
        explanation:
          "A ViT's input is $N$ patches ($16 \times 16$ each). ViTPose drops the [CLS] token and uses all $N$ patch tokens. A linear head maps each token's $d$-dimensional output to a heatmap value at that patch's spatial location.\n\n**Step 1.** The ViT's self-attention layers maintain the spatial layout of patches — each patch token encodes information about its $16 \times 16$ image region.\n\n**Step 2.** The final linear projection converts each patch token's feature vector into a single heatmap value (for one joint). All joints share the same ViT encoder with separate linear heads.\n\n**Step 3.** ViTPose achieves state-of-the-art on COCO keypoint detection while being simpler than hourglass-based methods.",
        hints: [
          "In a ViT, each patch token already has a spatial identity — what does a linear projection of each token give you?",
          "What does the [CLS] token represent in standard ViT usage, and why might you drop it for a dense prediction task like pose estimation?",
        ],
      },
      {
        id: "q-cv-kp37-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "3D human pose estimation from a single image lifts 2D keypoints to 3D coordinates. A common approach is to use a simple two-stage pipeline: (1) 2D detector, (2) a learned 3D lifter. What is the fundamental ambiguity that makes this problem hard?",
        options: [
          "The 2D keypoint detector cannot distinguish between left and right limbs, causing confusion in the 3D lift.",
          "From a single 2D image, the depth dimension is unobservable — multiple 3D poses project to the same 2D pose (scale ambiguity and foreshortening ambiguity).",
          "Most 3D pose datasets contain only outdoor scenes, making indoor pose estimation unreliable.",
          "The SMPL body model requires at least 5 camera views to resolve ambiguities.",
        ],
        correctAnswer: 1,
        explanation:
          "From a single 2D image, the depth dimension is unobservable — multiple 3D poses project to the same 2D pose (scale ambiguity and foreshortening ambiguity). The only depth cues are monocular (e.g. relative limb sizes, perspective foreshortening, foot contact with the ground).\n\n**Step 1.** Scale ambiguity: a person near the camera has large 2D keypoint displacements; a distant person has small displacements — but the image could also be of a smaller person at the same distance.\n\n**Step 2.** Foreshortening: a limb pointing toward the camera appears shorter in 2D than the same limb pointing sideways.\n\n**Step 3.** The learned 3D lifter must use statistical priors about human body proportions to resolve these ambiguities. Multi-view systems avoid this entirely by triangulation.",
        hints: [
          "If you only see a 2D image, can you tell if a person is very tall close to the camera or shorter further away?",
          "What physical constraint about human bodies might help resolve the scale ambiguity in single-image 3D pose?",
        ],
      },
  ],

  "segmentation-advanced": [

      {
        id: "q-cv-kp38-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "CRNN (Convolutional Recurrent Neural Network) for scene text recognition combines a CNN feature extractor, an RNN sequence model, and a CTC decoder. What problem does the CTC (Connectionist Temporal Classification) layer solve?",
        options: [
          "CTC enables the RNN to recognise Chinese and Japanese characters that require a two-stage composition process.",
          "CTC enables training with sequences where the alignment between input frames and output characters is unknown — the model outputs a probability distribution over all possible character sequences.",
          "CTC is an attention mechanism that aligns each character prediction with a specific spatial location in the CNN feature map.",
          "CTC requires the input sequence length to be exactly twice the output sequence length.",
        ],
        correctAnswer: 1,
        explanation:
          "In text recognition, the number of CNN feature map columns (time steps) does not correspond to the number of characters in a predictable way. CTC solves this by adding a 'blank' token and allowing repeated characters.\n\n**Step 1.** The CNN produces a sequence of $T$ feature vectors (one per column). The RNN predicts, at each timestep, a probability distribution over characters + blank.\n\n**Step 2.** CTC loss marginalises over all possible alignments between the $T$ timesteps and the target sequence, only requiring that the final output string (after collapsing repeated characters and removing blanks) matches the target.\n\n**Step 3.** Example: for target 'cat', valid alignments include 'c-a-a-t', 'ccc-a-t', 'c-a-t', and '---cat' (where '-' is blank).",
        hints: [
          "If a CNN produces 50 timesteps for a 5-character word, what is the problem with naively aligning timestep 1 to character 1, timestep 10 to character 2, etc.?",
          "What does the 'blank' token in CTC represent and why is it necessary for handling variable-length alignments?",
        ],
      },
      {
        id: "q-cv-kp38-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "MaskFormer (Cheng et al., 2021) treats semantic segmentation and instance segmentation uniformly by framing both as mask classification: predict $K$ binary masks and $K$ corresponding class labels. What is the key advantage of this framing over traditional per-pixel classification?",
        options: [
          "MaskFormer automatically determines the optimal number of segments $K$ without any prior specification.",
          "MaskFormer handles both semantic segmentation (where 'stuff' classes like 'road' have no instances) and instance segmentation (where 'things' classes like 'car' have distinct instances) with the same architecture.",
          "MaskFormer requires no backbone network and uses only transformer decoders for mask generation.",
          "MaskFormer eliminates the need for Non-Maximum Suppression (NMS) by predicting a fixed ordering of masks.",
        ],
        correctAnswer: 1,
        explanation:
          "Traditional semantic segmentation uses per-pixel classification, which cannot handle things with multiple instances. Instance segmentation uses detection + mask heads (two-stage). MaskFormer's mask-classification framing is more general.\n\n**Step 1.** Each of the $K$ queries predicts a binary mask $\mathbf{M}_k \in [0, 1]^{H \times W}$ and a class probability vector $\mathbf{p}_k$.\n\n**Step 2.** The final per-pixel class is $\arg\max_k \mathbf{p}_k[c] \cdot \mathbf{M}_k$ for each class $c$. Instance segmentation is recovered by taking each 'things' mask separately.\n\n**Step 3.** OneFormer extends MaskFormer with a query-denoting module that conditions each query on the image's specific set of classes.",
        hints: [
          "In semantic segmentation, 'car' is one class and every pixel belonging to any car gets the same label — how does MaskFormer distinguish between two cars belonging to the same class?",
          "If MaskFormer predicts $K = 10$ queries and you have only 3 semantic classes, what determines whether a query predicts 'car' (things) or 'road' (stuff)?",
        ],
      },
      {
        id: "q-cv-kp38-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "OneFormer frames universal image segmentation as a task-conditioned semantic segmentation problem, where the training loss includes a 'task query' that specifies whether the model should perform semantic, instance, or panoptic segmentation at test time. What architectural change does OneFormer introduce to support this?",
        options: [
          "OneFormer adds a task-specific normalisation layer after each transformer block that modulates features based on the active task.",
          "OneFormer prepends a task token (semantic / instance / panoptic) to the sequence of input tokens at the transformer encoder, conditioning the entire processing on the task.",
          "OneFormer trains three completely separate transformer decoders — one per task — and selects the appropriate decoder at test time.",
          "OneFormer adds a small MLP that converts the task label into a feature cube that is broadcast and added to all spatial features.",
        ],
        correctAnswer: 1,
        explanation:
          "OneFormer prepends a learnable task token to the input sequence of the transformer decoder. This task token is the only part of the network that differs between tasks; all other parameters are shared.\n\n**Step 1.** During training, the task token is set to one of three embeddings (semantic / instance / panoptic). The loss includes all three tasks simultaneously.\n\n**Step 2.** At test time, the desired task token is set, and the model generates the corresponding output.\n\n**Step 3.** This is more parameter-efficient than training three separate models, while achieving comparable performance to task-specific state-of-the-art models.",
        hints: [
          "What is the simplest way to tell a shared network which of three tasks it should perform at a given time?",
          "OneFormer trains with all three tasks simultaneously — what does this require in terms of the loss function and ground-truth annotations?",
        ],
      },
      {
        id: "q-cv-kp38-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Zero-shot semantic segmentation uses pretrained vision-language models (e.g. CLIP) to segment categories not seen during training. The standard approach computes per-pixel CLIP features and classifies them using cosine similarity to class name embeddings. What is the main limitation of this approach?",
        options: [
          "CLIP's image encoder requires bounding box annotations for each class during training.",
          "CLIP's image encoder was trained on image-level labels, so pixel-level features may not be sufficiently local — the CLIP features capture global image context rather than per-pixel semantic content.",
          "CLIP cannot embed text descriptions longer than 77 tokens.",
          "Zero-shot segmentation requires at least 100 examples of the unseen class to achieve reasonable accuracy.",
        ],
        correctAnswer: 1,
        explanation:
          "CLIP's ViT image encoder is trained with a global average pooling over patch tokens before the projection to the contrastive space. For zero-shot segmentation, this global feature is used at every pixel — losing the spatial specificity needed for segmentation.\n\n**Step 1.** CLIP's image encoder produces a single [CLS] token or a mean-pooled patch token sequence for the entire image, optimised for image-level classification.\n\n**Step 2.** To use CLIP for segmentation, methods like LSeg use dense CLIP projection layers that produce per-patch embeddings, but these are not as discriminative as the global [CLS] embedding.\n\n**Step 3.** Recent methods (e.g. MaskCLIP, OpenSeg) address this by using patch-level CLIP features directly, but the fundamental domain gap between image-level pretraining and pixel-level dense prediction remains.",
        hints: [
          "When CLIP processes an image, which tokens carry the most discriminative information for classification — and are these the same tokens needed for segmentation?",
          "If you take the CLIP embedding of a whole image and apply it to every pixel, what aspect of the segmentation task are you ignoring?",
        ],
      },
  ],

  "visual-question-answering": [

      {
        id: "q-cv-kp39-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "The classical VQA architecture uses a CNN to encode the image and an RNN/LSTM to encode the question, then combines both modalities via element-wise multiplication or concatenation. What fundamental limitation does this 'early fusion' approach have?",
        options: [
          "It requires the image and question to be encoded at the same spatial resolution.",
          "It lacks the capacity to model fine-grained spatial alignment between specific question words and image regions — the fused vector is a global representation.",
          "It cannot process questions longer than 14 tokens because the RNN's hidden state overflows.",
          "It requires the CNN and RNN to share weights, making joint training unstable.",
        ],
        correctAnswer: 1,
        explanation:
          "Early fusion produces a single joint embedding that represents the entire image and the entire question. This cannot represent which image regions correspond to which question words.\n\n**Step 1.** Early fusion: $\mathbf{v} = \text{CNN}(\text{image})$ and $\mathbf{q} = \text{RNN}(\text{question})$, then $\mathbf{f} = [\mathbf{v}; \mathbf{q}]$ — a flat concatenation.\n\n**Step 2.** The fused vector $\mathbf{f}$ has no mechanism to attend to specific image sub-regions conditioned on specific question words.\n\n**Step 3.** Attention mechanisms (bottom-up top-down, stacking) were introduced to let the question query the image at a granular level.",
        hints: [
          "In 'Is the person wearing a red hat?', which specific image regions need to be examined?",
          "If you flatten the entire image into one vector and the entire question into another vector, how would the model know which question word relates to which image region?",
        ],
      },
      {
        id: "q-cv-kp39-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Bottom-Up Top-Down attention (Anderson et al., 2018) for VQA uses a pretrained bottom-up attention mechanism derived from:",
        options: [
          "A transformer self-attention layer applied to the image features before the question is processed.",
          "A Faster R-CNN object detector that proposes image regions (with class labels and attributes) and uses these as attention units, which are then modulated by a top-down (question-guided) attention.",
          "A CLIP vision encoder that encodes each $16 \times 16$ patch as a separate attention token.",
          "A U-Net segmentation network whose intermediate features are used as attention maps for the question encoder.",
        ],
        correctAnswer: 1,
        explanation:
          "Bottom-Up Top-Down (BUTD) uses Faster R-CNN to propose meaningful image regions (e.g. 'person', 'hat', 'sky') as attention 'bottom-up' proposals. A top-down LSTM, conditioned on the question, then attends to these semantic regions.\n\n**Step 1.** Faster R-CNN extracts $K$ region proposals (e.g. $K = 36$) with 2048-d features each — these are semantic, object-centric, and pre-trained on Visual Genome.\n\n**Step 2.** The question is encoded by an LSTM; its final hidden state $\mathbf{h}_Q$ is used as a top-down query to attend over the $K$ bottom-up region features.\n\n**Step 3.** This separation of semantic proposals from question-guided attention was a key advance — it replaced unstructured spatial grid features with meaningful object-level representations.",
        hints: [
          "Faster R-CNN was trained to detect objects — why is an object detector a better source of bottom-up features than a generic CNN backbone?",
          "What does 'top-down' mean in this context — what drives the attention toward specific regions?",
        ],
      },
      {
        id: "q-cv-kp39-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "VL-T5 frames VQA as a text generation problem rather than a classification problem. The model takes a text prompt prepend and generates the answer token-by-token. What advantage does this generative framing provide over classification-based VQA?",
        options: [
          "Generative framing is computationally cheaper because it avoids the large classification head used in classification-based VQA.",
          "Generative framing allows open-ended answers (free-form sentences) rather than being limited to a fixed vocabulary of candidate answers, and can generalise to unanswerable questions.",
          "Generative framing requires fewer training examples because the T5 decoder is pretrained on text-only tasks.",
          "Generative framing is identical to classification in terms of expressiveness — the only difference is the output interface.",
        ],
        correctAnswer: 1,
        explanation:
          "Classification-based VQA is limited to selecting from a fixed set of answer candidates. Generative VQA can produce arbitrary free-form text answers.\n\n**Step 1.** VL-T5 prepends 'Question: {q} Context: {image features} Answer:' to the input and generates the answer autoregressively using T5's encoder-decoder architecture.\n\n**Step 2.** The image is encoded by a frozen CNN/ViT and projected into the T5 token embedding space as a sequence of visual tokens.\n\n**Step 3.** This 'prompting' approach is similar to GPT-4V's approach: the same model handles VQA, captioning, and other tasks without task-specific heads.",
        hints: [
          "Classification VQA uses a softmax over a predefined answer vocabulary. What kind of answers can a generative model produce that a classifier cannot?",
          "If the question is 'How many dogs are in the image?' and the answer is 'three', what would a classifier need to have in its vocabulary vs. what would a generative model generate?",
        ],
      },
      {
        id: "q-cv-kp39-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "Neuro-symbolic VQA approaches (e.g. Neural Module Networks) compose hand-designed neural modules (Attention, Layout, etc.) based on a symbolic question parse. What is the primary motivation for this approach?",
        options: [
          "To reduce the GPU memory footprint by replacing transformers with sparse module computations.",
          "To improve interpretability — each module corresponds to a logical operation (e.g. 'find', 'compare', 'count') whose composition directly mirrors the question's semantic structure.",
          "To avoid end-to-end training entirely by using pre-compiled symbolic programs.",
          "To make VQA models faster at inference by using pre-defined module configurations.",
        ],
        correctAnswer: 1,
        explanation:
          "The classical VQA problem involves diverse question types (existence, counting, comparison, spatial reasoning) that are difficult for a single black-box network to handle robustly. Neural Module Networks (NMNs) parse the question into a layout of reusable modules.\n\n**Step 1.** A question parser maps 'How many red cubes are to the left of the blue sphere?' to a symbolic program: $\text{Filter}(\text{red}) \rightarrow \text{Filter}(\text{cube}) \rightarrow \text{Relate}(\text{left-of}(blue)) \rightarrow \text{Count}()$.\n\n**Step 2.** Each module is a small neural network with learned parameters (attention, filtering, etc.). The modules are composed dynamically based on the program.\n\n**Step 3.** This is interpretable: you can inspect the intermediate outputs of each module. It also handles compositional generalisation — novel questions can be answered by recombining known modules.",
        hints: [
          "What does 'compositional' mean in the context of VQA — can you give an example of two questions that share sub-structures?",
          "If you had modules for 'find objects', 'filter by colour', and 'count', how would you compose them to answer 'How many red objects?' vs. 'Are there any blue objects?'?",
        ],
      },
  ],

  "self-supervised-visual-learning": [

      {
        id: "q-cv-kp40-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "MAE (Masked Autoencoder) pretrains a ViT by masking a high fraction (e.g. 75%) of random patches and reconstructing the missing pixels in pixel space. What design choices make MAE computationally efficient during pretraining?",
        options: [
          "MAE only processes visible (unmasked) patches through the encoder, dramatically reducing the number of tokens processed — the decoder is small and only runs on masked positions.",
          "MAE uses a sparse convolution that automatically skips masked patches without requiring explicit masking.",
          "MAE shares weights between the encoder and decoder, so the decoder contributes no additional parameters.",
          "MAE processes all patches through the encoder but drops masked patches during loss computation.",
        ],
        correctAnswer: 0,
        explanation:
          "MAE's efficiency comes from encoding only the visible patches. For a 75% masking ratio, only 25% of patches enter the encoder — a $4\\times$ reduction in encoder computation.\n\n**Step 1.** Input: image to patch embedding to mask 75% of patches randomly. The encoder sees only the 25% visible patches.\n\n**Step 2.** The full sequence (visible patches + masked position embeddings) is passed through a lightweight decoder that predicts pixel values for the masked positions.\n\n**Step 3.** Only the encoder is used for downstream tasks — the decoder is discarded. The 75% masking makes the reconstruction task non-trivial.",
        hints: [
          "If 75% of patches are masked, what fraction of the encoder's computation is saved compared to processing all patches?",
          "The decoder reconstructs pixels for masked patches — what does the encoder not need to do for masked patches that it would otherwise need to do?",
        ],
      },
      {
        id: "q-cv-kp40-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "iBOT (image BERT Pre-Training with Online Tokenization) performs masked image modeling using a learned tokenizer (via a codebook) instead of raw patches. What does the learned tokenizer provide that raw patches do not?",
        options: [
          "The tokenizer provides a more compact discrete representation of images, reducing the vocabulary size.",
          "The tokenizer is trained alongside the ViT encoder, making the reconstruction target itself semantically meaningful rather than raw pixel values.",
          "The tokenizer eliminates the need for a decoder in masked image modeling.",
          "The tokenizer is pretrained on CLIP text embeddings to align visual tokens with language.",
        ],
        correctAnswer: 1,
        explanation:
          "Raw patch prediction is a low-level, pixel-level task. iBOT uses a vector-quantised VAE (VQ-VAE) tokenizer that maps $2 \times 2$ patches to one of $K$ learned visual tokens from a codebook.\n\n**Step 1.** The VQ-VAE encoder and codebook are trained on the same images, creating a semantically meaningful discrete vocabulary of visual concepts.\n\n**Step 2.** The MAE objective then predicts these discrete tokens instead of raw pixels — the model must learn to 'name' masked regions in terms of learned visual concepts.\n\n**Step 3.** This makes the pretraining transfer better to downstream semantic tasks because the model is already learning high-level visual patterns rather than pixel statistics.",
        hints: [
          "Predicting raw pixels is a 'low-level' task — what would it mean for the reconstruction target to be 'semantically meaningful'?",
          "In a VQ-VAE, the codebook vectors represent learned visual concepts — how does predicting these differ from predicting raw pixel values of a masked patch?",
        ],
      },
      {
        id: "q-cv-kp40-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "DINO (self-distillation with no labels) uses a teacher-student architecture where the teacher produces momentum-updated global views and the student is trained to match the teacher's output on local views. The stop-gradient operator on the teacher is crucial — it prevents:",
        options: [
          "The teacher's weights from becoming too large during training.",
          "The student from collapsing into a constant representation (mode collapse), because the teacher provides a moving target that the student must continuously adapt to.",
          "The training from diverging due to the large batch size used in DINO.",
          "The student from learning spatial information (since only global views are used for the teacher).",
        ],
        correctAnswer: 1,
        explanation:
          "In a standard self-distillation setup without stop-gradient, the teacher and student would be identical and would both collapse to the same trivial solution. The stop-gradient breaks this symmetry.\n\n**Step 1.** The teacher is an exponential moving average (EMA) of the student: $\theta_t \gets \lambda \theta_t + (1-\lambda) \theta_s$. The teacher is always one step behind.\n\n**Step 2.** The student receives two crops: a global view (fed to teacher) and a local view (also fed to student). The student matches its local-view output to the teacher's global-view output.\n\n**Step 3.** Because the teacher is EMA-updated, its representations are more stable and confident — the student chases a slowly moving target without the teacher chasing the student back, preventing collapse.",
        hints: [
          "What would happen if both teacher and student were updated by gradient descent simultaneously — would they converge to a meaningful representation or collapse?",
          "The EMA update makes the teacher 'slower' than the student — why is this asymmetry important for preventing collapse?",
        ],
      },
      {
        id: "q-cv-kp40-4",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "SwAV (Swapping Assignments between Views) performs online clustering of image features and enforces consistency between the cluster assignments of two augmented views of the same image. How does SwAV differ from contrastive methods like SimCLR?",
        options: [
          "SwAV does not use data augmentations — each image is processed as-is with no cropping or colour jitter.",
          "SwAV avoids the computational overhead of large negative batches by comparing cluster assignments (codes) rather than raw feature vectors, using a sinkhorn algorithm for assignment.",
          "SwAV uses a fixed k-means clustering at each epoch rather than an online updated prototype.",
          "SwAV requires a CLIP text encoder to compute the cluster assignments.",
        ],
        correctAnswer: 1,
        explanation:
          "Contrastive methods like SimCLR require comparing each sample to all negatives in the batch (requiring large batches or a memory bank). SwAV compares the cluster assignment codes $Q_1$ and $Q_2$ of two views of the same image — no negatives are needed.\n\n**Step 1.** Each image $x_1, x_2$ is encoded to features $z_1, z_2$. A linear prototype layer $W$ maps features to $K$ cluster centroids, producing assignment probabilities $Q_1 = \text{softmax}(W z_1 / T)$.\n\n**Step 2.** SwAV's loss is $\mathcal{L} = -\text{tr}(Q_1^\top Q_2) / N$ — it swaps the assignments and matches them. Only positive pairs are involved.\n\n**Step 3.** The Sinkhorn algorithm computes soft assignments efficiently, making SwAV computationally tractable without large batch sizes.",
        hints: [
          "SimCLR needs many negatives to prevent collapse — what does SwAV use instead of negatives to provide a training signal?",
          "SwAV's 'assignment' is which of $K$ clusters a feature belongs to — why is matching assignments between views more efficient than matching raw features?",
        ],
      },
  ],

  "vit-deep": [

      {
        id: "q-vit-deep-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "In the original ViT, a [CLS] token is prepended to the sequence of patch embeddings and used as the image representation for classification. How does the [CLS] token accumulate information from all patches?",
        options: [
          "The [CLS] token is initialised with the mean of all patch embeddings and never updated during training.",
          "Through self-attention layers, the [CLS] token attends to all patch tokens and its representation is progressively refined across transformer blocks, accumulating global information.",
          "The [CLS] token is only updated in the final transformer block through a direct residual connection from each patch token.",
          "The [CLS] token's representation is the sum of all patch token embeddings, making it a fixed linear combination.",
        ],
        correctAnswer: 1,
        explanation:
          "Unlike a CNN's global average pooling (which aggregates spatially at the end), ViT's [CLS] token acts as a 'learnable query' that gathers information from all patches through self-attention at every transformer layer.\n\n**Step 1.** At layer 1, the [CLS] token attends to all patch tokens and updates itself based on their features.\n\n**Step 2.** At each subsequent layer, the [CLS] token's attention patterns change — later layers tend to focus on semantically meaningful regions (objects, textures) identified during training.\n\n**Step 3.** By the final layer, the [CLS] token has been refined through 12 rounds of cross-patch attention, giving it a globally-informed representation for the classification head.",
        hints: [
          "In a transformer, how does self-attention allow any token to gather information from any other token?",
          "Unlike global average pooling which averages all patches equally, what does the [CLS] token's attention mechanism allow it to do?",
        ],
      },
      {
        id: "q-vit-deep-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "DeiT (Data-efficient Image Transformers) achieves competitive results with ImageNet training only by using a distillation token that learns from a teacher CNN (e.g. RegNet). What does the distillation token provide beyond what the [CLS] token already captures?",
        options: [
          "The distillation token learns to mimic the teacher's hard label (cross-entropy on ImageNet classes), providing an additional training signal that complements the [CLS] token's self-supervised learning.",
          "The distillation token is a duplicate of the [CLS] token that is forced to match the teacher's [CLS] output exactly.",
          "The distillation token allows the ViT to learn from the teacher's spatial attention maps.",
          "The distillation token eliminates the need for a classification head by using the teacher's predictions directly.",
        ],
        correctAnswer: 0,
        explanation:
          "DeiT adds a distillation token [DIST] alongside [CLS]. The [DIST] token attends to all patches and the [CLS] token, and is trained with a cross-entropy loss against the teacher's soft probability distribution over ImageNet classes.\n\n**Step 1.** The teacher provides a probability vector (soft labels) over 1000 classes — richer information than a single hard label.\n\n**Step 2.** Both [CLS] and [DIST] tokens are trained simultaneously: [CLS] against the true label, [DIST] against the teacher output.\n\n**Step 3.** The [DIST] token captures inductive biases from the CNN teacher (e.g. texture recognition) that complement the transformer's tendency toward global attention-based reasoning.",
        hints: [
          "Why might a CNN teacher's soft probability distribution be a better training target than a one-hot hard label?",
          "The [CLS] token learns from the ground truth label and the [DIST] token learns from the teacher — how might these two signals be complementary?",
        ],
      },
      {
        id: "q-vit-deep-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "CaiT (Class-Attention in Image Transformers) improves on standard ViT by separating the roles of the patch tokens and the [CLS] token: the [CLS] token is processed through dedicated 'class-attention' layers that do not update the patch tokens. What is the motivation for this separation?",
        options: [
          "To reduce the number of parameters by using fewer attention layers for patch processing.",
          "To allow the [CLS] token to focus solely on forming a good class-discriminative representation without being used as a query for patch-to-patch attention, which dilutes its discriminative power.",
          "To enable the patch tokens to train faster by decoupling their gradient updates from the [CLS] token.",
          "To make the ViT architecture compatible with standard ViT-v1 weights through a lightweight fine-tuning procedure.",
        ],
        correctAnswer: 1,
        explanation:
          "In standard ViT, the [CLS] token participates in self-attention with all patch tokens at every layer. This means the [CLS] representation is influenced by patch-to-patch attention patterns — which may not be optimal for classification. CaiT's class-attention layers keep patch tokens frozen and only update the [CLS] token.\n\n**Step 1.** After the standard ViT transformer blocks, CaiT adds dedicated class-attention layers.\n\n**Step 2.** In these layers, the patch tokens act as keys and values (providing information) but the [CLS] token is the sole query. The [CLS] token attends to all patches without updating them.\n\n**Step 3.** This 'class-attention' mechanism ensures the [CLS] token's representation is maximally discriminative.",
        hints: [
          "In standard ViT, the [CLS] token participates in patch-to-patch self-attention — what information does it gather that is NOT useful for classification?",
          "If the [CLS] token is the only query in class-attention layers, what is the role of the patch tokens?",
        ],
      },
  ],

  "threed-vision": [

      {
        id: "q-threed-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Multi-View Stereo (MVS) reconstructs a 3D scene from multiple images with known camera poses. The core principle is based on epipolar geometry: for a point $\mathbf{X}$ in 3D, its projections $\mathbf{x}_1$ and $\mathbf{x}_2$ in two views satisfy the epipolar constraint. What does this constraint describe geometrically?",
        options: [
          "That the two camera centres, the 3D point $\mathbf{X}$, and the two image points all lie on a common plane.",
          "That the depth of $\mathbf{X}$ can be computed as the ratio of the camera baseline to the disparity between $\mathbf{x}_1$ and $\mathbf{x}_2$.",
          "That the two camera centres and the 3D point $\mathbf{X}$ always form an equilateral triangle.",
          "That $\mathbf{x}_1$ and $\mathbf{x}_2$ must have identical pixel coordinates after uncalibrated rectification.",
        ],
        correctAnswer: 0,
        explanation:
          "The epipolar constraint states that for a point $\mathbf{X}$ observed in two views with camera centres $O_1, O_2$, the corresponding image points $\mathbf{x}_1, \mathbf{x}_2$ and the two camera centres are coplanar. This plane is the epipolar plane.\n\n**Step 1.** The fundamental matrix $\mathbf{F}$ encodes this constraint: $\mathbf{x}_2^\top \mathbf{F} \mathbf{x}_1 = 0$ for any matching pair.\n\n**Step 2.** For a point in image 1, its corresponding point in image 2 must lie on a line called the epipolar line.\n\n**Step 3.** The essential matrix $\mathbf{E} = [\mathbf{t}]_\times \mathbf{R}$ captures the relative rotation and translation between cameras, enabling 3D reconstruction via triangulation.",
        hints: [
          "If you see a point in image 1, where in image 2 does it have to lie if you know the camera positions?",
          "What does it mean for four points (two camera centres and two image points) to be 'coplanar'?",
        ],
      },
      {
        id: "q-threed-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "COLMAP implements Structure-from-Motion (SfM) to reconstruct 3D points and camera poses from unordered image collections. What is the key difference between incremental and global SfM?",
        options: [
          "Incremental SfM starts from a seed pair and incrementally adds images one by one with bundle adjustment. Global SfM registers all images simultaneously using the essential matrix between all pairs.",
          "Incremental SfM processes images in parallel while global SfM processes them sequentially.",
          "Global SfM does not require bundle adjustment while incremental SfM does.",
          "Incremental SfM uses only fundamental matrices while global SfM uses only essential matrices.",
        ],
        correctAnswer: 0,
        explanation:
          "Incremental SfM adds cameras one at a time, triangulating new points and running bundle adjustment frequently — accurate but slow and sensitive to the initial seed. Global SfM registers all camera pairs simultaneously using rotation averaging and translation averaging — faster but less accurate for large scenes.\n\n**Step 1.** Incremental: after selecting a good seed image pair, images are added one-by-one, triangulating new points and performing BA after each addition.\n\n**Step 2.** Global: all relative rotations are averaged to estimate absolute rotations; then all translations are estimated up to scale. BA is run only once at the end.\n\n**Step 3.** COLMAP's hybrid approach uses global rotation estimation followed by incremental translation estimation, combining speed and accuracy.",
        hints: [
          "Why might starting from a bad seed image pair cause problems in incremental SfM?",
          "What is bundle adjustment actually optimising — camera poses, 3D points, or both?",
        ],
      },
      {
        id: "q-threed-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "PointRCNN detects 3D objects in raw point clouds using a two-stage approach: (1) bottom-up proposal generation via point-wise segmentation, and (2) refinements in canonical coordinates. What does 'canonical coordinates' mean in this context?",
        options: [
          "Points are transformed to a world coordinate system with origin at $(0,0,0)$ and axes aligned with cardinal directions.",
          "For each 3D proposal box, the point cloud coordinates within the box are transformed into a local coordinate frame centred at the box centre with axes aligned to the box orientation.",
          "All 3D points are normalised to have zero mean and unit variance before the detection head.",
          "Canonical coordinates refer to the voxel grid coordinates used in the first-stage segmentation.",
        ],
        correctAnswer: 1,
        explanation:
          "A 3D bounding box has an arbitrary orientation in world coordinates. Canonical coordinate transformation aligns the box to the coordinate axes, so that the point cloud within the box always has a consistent orientation regardless of the box's tilt.\n\n**Step 1.** In stage 1, for each point, the foreground/background segmentation head predicts whether the point belongs to the foreground of an object.\n\n**Step 2.** Each proposal defines a 3D box. All points within the box are transformed into canonical coordinates: subtract the box centre, then rotate so the box axes align with the coordinate axes.\n\n**Step 3.** The refinement head operates on canonical-coordinated points, making the regression independent of the proposal's original orientation — significantly improving orientation prediction accuracy.",
        hints: [
          "If a car is angled at 45 degrees to the camera, its bounding box is also angled. What transformation would make the point cloud inside the box look as if the car were facing forward?",
          "Why might it be easier for a neural network to detect the car's orientation if the points are in canonical coordinates?",
        ],
      },
  ],

  "video-understanding-ext": [

      {
        id: "q-vid-ext-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Multi-scale feature aggregation in video models (e.g. SlowFast with lateral connections) allows the high-resolution Fast pathway to influence the low-resolution Slow pathway. What is the primary purpose of these lateral connections?",
        options: [
          "They allow the Fast pathway to backpropagate gradients into the Slow pathway's parameters during training.",
          "They transfer semantic context from the Slow pathway to the Fast pathway, enabling the Fast pathway to suppress background motion and focus on relevant moving regions.",
          "They normalise the activations of both pathways to have zero mean and unit variance.",
          "They are used only at test time to perform model compression via knowledge distillation.",
        ],
        correctAnswer: 1,
        explanation:
          "Without lateral connections, the Slow pathway and Fast pathway operate independently. Lateral connections from Slow to Fast let the Fast pathway use high-level semantic cues to selectively attend to motion-relevant regions.\n\n**Step 1.** The Slow pathway's feature map at time $t$ (at $1/\alpha$ FPS) is upsampled and concatenated with the Fast pathway's features at the same temporal resolution.\n\n**Step 2.** This allows semantic context (e.g. 'there is a person in this region') to modulate the Fast pathway's processing of motion in that region.\n\n**Step 3.** Empirically, this improves accuracy on fine-grained action recognition tasks where distinguishing between similar motions requires semantic context.",
        hints: [
          "If the Fast pathway sees only raw pixel differences between consecutive frames, what might it mistake for a relevant motion?",
          "How does knowing 'there is a person' help the Fast pathway decide which motion patterns to pay attention to?",
        ],
      },
      {
        id: "q-vid-ext-2",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "TimeSformer's factorised architecture processes video as a sequence of $T$ frames, applying spatial self-attention within each frame and temporal self-attention across frames. What computational complexity does this factorisation achieve compared to full 3D self-attention?",
        options: [
          "Full 3D attention is $O(T^2 H^2 W^2)$; factorised is $O(T^2 HW + THW^2)$, which is significantly smaller for typical video resolutions.",
          "Full 3D attention is $O(THW)$; factorised is $O(T^2 + H^2 + W^2)$.",
          "Full 3D and factorised attention have identical computational complexity.",
          "Factorised attention is $O(THW)$ while full 3D is $O(T^2 H^2 W^2)$.",
        ],
        correctAnswer: 0,
        explanation:
          "Full 3D self-attention computes attention between all $(T, H, W)$ positions: the attention matrix has $(THW)^2$ entries. Factorised attention separates this into spatial attention ($H^2 W^2$ per frame) followed by temporal attention ($T^2$ per spatial location).\n\n**Step 1.** Spatial attention: each of $T$ frames attends to itself. Complexity per frame: $O(H^2 W^2)$. Total: $O(T H^2 W^2)$.\n\n**Step 2.** Temporal attention: each of $HW$ spatial positions attends to $T$ timesteps. Complexity: $O(T^2 HW)$.\n\n**Step 3.** Combined: $O(T H^2 W^2 + T^2 HW)$, compared to $O(T^2 H^2 W^2)$ for full 3D. For $T=8, H=W=224$, this is a massive reduction.",
        hints: [
          "The full attention matrix has $(THW)^2$ entries — what does this simplify to numerically for $T=8, H=W=224$?",
          "If you first apply attention within each frame separately, and then across frames, what are the two separate complexity terms?",
        ],
      },
      {
        id: "q-vid-ext-3",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Audio-visual learning in video models exploits the natural correlation between visual motion and sound. What does the 'audio-visual consistency' loss enforce during training?",
        options: [
          "That the audio encoder and video encoder produce identical embeddings for the same video clip.",
          "That corresponding audio and video frames (from the same moment in time) have similar embeddings, while non-corresponding pairs have dissimilar embeddings.",
          "That the audio waveform and video frames are spatially aligned at the pixel level before encoding.",
          "That audio and video are encoded separately and combined only at the classification head, with no consistency loss between them.",
        ],
        correctAnswer: 1,
        explanation:
          "Audio-visual consistency enforces that the audio and video streams from the same moment are representations of the same event. The model learns to align them in a shared embedding space.\n\n**Step 1.** Positive pairs: audio segment and corresponding video frames from the same timestamp. Negative pairs: audio and video from different timestamps or different videos.\n\n**Step 2.** A contrastive loss (e.g. InfoNCE) pulls positive pairs together and pushes negative pairs apart in the joint audio-visual embedding space.\n\n**Step 3.** This is similar to CLIP but with audio instead of text — the audio encoder learns visual representations by pairing with video. It can also enable sound-source localisation.",
        hints: [
          "If a person is playing guitar in a video, what is the audio-visual correlation the model would learn?",
          "What are 'negative pairs' in audio-visual contrastive learning — why might the model need to push them apart?",
        ],
      },
  ],

  "cv-foundation-models-ext": [

      {
        id: "q-cv-found-ext-1",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "Grounding DINO combines a frozen DINO detector with a frozen BERT text encoder to perform open-vocabulary object detection. What modification enables it to localise arbitrary text-described objects without training on specific object categories?",
        options: [
          "Grounding DINO fine-tunes the DINO detector on the target dataset's object categories to adapt it to new classes.",
          "Grounding DINO replaces DINO's supervised objectness head with a language-guided contrastive loss that aligns box features with text embeddings, enabling detection of any class described in text.",
          "Grounding DINO uses a separate RCNN to propose regions which are then classified by CLIP.",
          "Grounding DINO requires at least 100 text descriptions per novel class to achieve good detection.",
        ],
        correctAnswer: 1,
        explanation:
          "DINO (DETR with iterative refinement) is a fully-supervised detector trained on fixed categories. Grounding DINO modifies the architecture to accept a text query and finds all image regions matching that description.\n\n**Step 1.** The key modification is the 'language-guided query selection' module: instead of using fixed learnable queries, it uses text features from BERT to select which image regions should be attended to.\n\n**Step 2.** The loss includes contrastive alignment between box-level visual features and text token features.\n\n**Step 3.** At test time, any text phrase can be provided — the model will output bounding boxes for all instances matching that phrase. This is 'open-vocabulary' detection.",
        hints: [
          "Standard object detectors output one of $N$ predefined classes. Grounding DINO outputs boxes for any text description — what must change in the detection head to support this?",
          "Contrastive learning aligns visual features with text features — how does this enable detecting novel categories?",
        ],
      },
      {
        id: "q-cv-found-ext-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "SEEM (Segment Everything Everywhere with Multi-modal LLM) extends the SAM prompt system to include semantic and referring modalities alongside geometric prompts. How does SEEM's architectural design support compositional generalisation across prompt types?",
        options: [
          "SEEM uses separate independent heads for each prompt type, selecting the appropriate head at test time based on the prompt modality.",
          "SEEM encodes all prompt types (points, boxes, text, casual masks) into a unified query representation space, where a single decoder operates on the joint prompt-image query set.",
          "SEEM requires all prompt types to be present simultaneously for each query, preventing compositional use of a single prompt type.",
          "SEEM's encoder is modality-specific: one CNN for points, another for text, another for boxes.",
        ],
        correctAnswer: 1,
        explanation:
          "SEEM encodes all prompt modalities (visual, semantic, and referring) into a shared semantic space of queries. The transformer decoder then performs cross-attention between image features and the joint query set.\n\n**Step 1.** Visual prompts (points, boxes, masks) are encoded with dedicated geometric encoders. Semantic prompts (text) use a language encoder. Referring prompts use a separate encoder.\n\n**Step 2.** All encoded prompts are projected into a $D$-dimensional query space and concatenated into a single query sequence.\n\n**Step 3.** The decoder cross-attends to image features using all queries simultaneously, producing masks that satisfy the combined constraints. This allows complex compositional queries.",
        hints: [
          "If you want to segment 'the person NOT wearing a hat', what different prompt modalities would you combine?",
          "What architectural choice allows SEEM to handle multiple prompt types simultaneously rather than one at a time?",
        ],
      },
      {
        id: "q-cv-found-ext-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "GSAM (Grounded SAM) combines SAM with Grounding DINO to achieve Referring Expression Segmentation (RES): segmenting the image region described by a free-form text expression. What does the pipeline architecture look like?",
        options: [
          "Grounding DINO is used first to detect all boxes matching the text expression, then SAM's box prompt encoder generates masks for each detected box.",
          "SAM generates all possible masks independently, and Grounding DINO filters them using text similarities.",
          "GSAM fine-tunes SAM's mask decoder on text-grounded mask annotations.",
          "GSAM concatenates the SAM and Grounding DINO embeddings and passes them through a single unified transformer.",
        ],
        correctAnswer: 0,
        explanation:
          "GSAM's pipeline has two stages: (1) Grounding DINO takes the image and text expression and outputs bounding boxes for all text-matched regions; (2) SAM takes those bounding boxes as prompt inputs and generates high-quality masks for each region.\n\n**Step 1.** Grounding DINO localises the text expression to one or more bounding boxes using its open-vocabulary detection capability.\n\n**Step 2.** Each bounding box is fed to SAM as a box prompt. SAM's mask decoder produces a segmentation mask within that box region.\n\n**Step 3.** GSAM leverages SAM's high-quality masks and Grounding DINO's text grounding. SAM needs geometric prompts; Grounding DINO provides the text-to-box grounding.",
        hints: [
          "SAM needs a geometric prompt (point, box, or mask) to generate masks. Grounding DINO can localise any text description to a box. How do these two capabilities complement each other?",
          "What would break if you swapped the order — using SAM first and then Grounding DINO to classify the masks by text?",
        ],
      },
  ],

  "nerf-and-depth": [

      {
        id: "q-nerf-1",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "NeRF represents a 3D scene as a continuous volumetric radiance field $F_\theta: (\mathbf{x}, \mathbf{d}) \to (\mathbf{c}, \sigma)$ where \mathbf{x} is a 3D position, \mathbf{d} is a viewing direction. What makes this representation 'continuous' compared to discrete 3D voxel grids?",
        options: [
          "NeRF uses infinitely many voxels to represent the scene, making it infinitely detailed.",
          "NeRF represents the scene as a neural network — a continuous function parameterised by network weights — rather than discretising space into a fixed-resolution voxel grid.",
          "NeRF processes a continuous stream of images without any discretisation.",
          "NeRF uses a continuous feedback loop that updates the scene representation as new images arrive.",
        ],
        correctAnswer: 1,
        explanation:
          "NeRF does not store the radiance field explicitly. Instead, a multilayer perceptron (MLP) learns to map any continuous 3D coordinate + viewing direction to colour and density.\n\n**Step 1.** The MLP is trained via differentiable volume rendering: rays are sampled at continuous 3D positions along the ray, fed through the MLP, and rendered to produce an image.\n\n**Step 2.** Since the MLP can be evaluated at any 3D coordinate, the scene representation is infinite in resolution — no voxel grid quantisation artefacts.\n\n**Step 3.** Novel views are synthesised by querying the MLP at camera rays not seen during training. The MLP has implicitly encoded the 3D structure.",
        hints: [
          "A voxel grid stores values at fixed grid points. What does a neural network $F_\theta(\mathbf{x})$ store implicitly at non-grid positions \mathbf{x}?",
          "If you double the resolution of a voxel grid, what must you also double? What doesn't need to change if you use an MLP instead?",
        ],
      },
      {
        id: "q-nerf-2",
        type: "multiple-choice",
        difficulty: "medium",
        question:
          "MegaDepth uses a learning-based approach to predict depth from single monocular images, trained on multi-view internet photos with known camera poses. What fundamental challenge does MegaDepth address compared to traditional Structure-from-Motion?",
        options: [
          "MegaDepth can process a single image without any camera pose information to predict its depth.",
          "MegaDepth uses a transformer to directly regress depth from pixel values without SfM preprocessing.",
          "MegaDepth creates 3D point cloud data from multi-view SfM reconstructions and trains a depth network to learn single-view depth prediction from these pseudo-ground-truth depths.",
          "MegaDepth requires a pre-scanned 3D model of the scene before depth prediction can begin.",
        ],
        correctAnswer: 2,
        explanation:
          "MegaDepth builds on SfM to create dense depth maps from thousands of internet photos of the same landmark. The SfM point cloud is used to compute per-image depth maps as supervision for a deep network.\n\n**Step 1.** Traditional SfM produces sparse point clouds and camera poses — not dense depth maps. MegaDepth uses multi-view stereo (MVS) to compute dense depth.\n\n**Step 2.** The dense depth maps are used as pseudo-ground-truth to train a CNN to predict depth from a single image.\n\n**Step 3.** After training, the CNN can predict depth for novel images of unseen scenes — generalising the concept of depth across scene types, unlike per-scene SfM.",
        hints: [
          "What does SfM give you (sparse points, camera poses) and what does MegaDepth additionally create to train the depth network?",
          "If the CNN learns from depth maps computed from multi-view photos, what does it learn that allows it to generalise to new scenes?",
        ],
      },
      {
        id: "q-nerf-3",
        type: "multiple-choice",
        difficulty: "hard",
        question:
          "3D Gaussian Splatting (3DGS) represents a scene as a set of millions of ellipsoidal Gaussians instead of an MLP or voxel grid. Rendering is performed via 'splatting' — projecting each 3D Gaussian onto the image plane and alpha-blending. What is the primary advantage of 3DGS over NeRF?",
        options: [
          "3DGS can represent scenes with higher geometric accuracy because Gaussians are non-linear basis functions.",
          "3DGS enables real-time rendering (30+ FPS) because rendering is simply a 2D rasterisation of projected Gaussians, which is highly parallelisable on GPU — unlike NeRF which requires many MLP evaluations per pixel.",
          "3DGS does not require camera poses for training, unlike NeRF.",
          "3DGS uses a continuous function representation, making it more memory-efficient than NeRF.",
        ],
        correctAnswer: 1,
        explanation:
          "NeRF requires hundreds of MLP evaluations per image pixel to accumulate colour along a ray (ray marching), making it slow to render. 3DGS represents the scene as explicit Gaussians — each Gaussian projects to a 2D ellipse and is rasterised with standard GPU rasterisation pipelines.\n\n**Step 1.** Each Gaussian $\mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})$ projects to an ellipse via the camera extrinsic and intrinsic matrices. The projected 2D Gaussian is splatted onto the image buffer.\n\n**Step 2.** Alpha-blending of all Gaussians covering a pixel gives the final colour. The entire process is differentiable.\n\n**Step 3.** The key advantage is speed: rendering is $O(N)$ in the number of Gaussians (efficiently parallelisable) rather than $O(N_{\text{rays}} \cdot N_{\text{samples}})$ MLP evaluations. 3DGS achieves real-time novel-view synthesis on consumer GPUs.",
        hints: [
          "NeRF needs to evaluate an MLP at many points along each camera ray to render one pixel. How does projecting and blending Gaussians differ in terms of per-pixel computation?",
          "What makes the 2D rasterisation of Gaussians amenable to GPU parallelisation in a way that MLP-based volume rendering is not?",
        ],
      },
  ],

};

registerQuestions(questions);
export default questions;
