import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "gan-fundamentals": [
    {
      id: "q-gan-kp1-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The original GAN minimax objective is min_G max_D V(D,G). At the global optimum, the generator loss equals ___.",
      options: ["0", "−log 2", "−2 log 2", "log 2"],
      correctAnswer: 2,
      explanation:
        "At Nash equilibrium p_g = p_r, so D*(x) = 1/2 everywhere. Substituting into V gives V(D*,G) = −log 4 + 2·JS(p_r||p_g). Minimising over G is therefore equivalent to minimising the symmetric Jensen-Shannon divergence.",
      hints: [
        "At equilibrium D*(x) = p_r(x)/(p_r(x)+p_g(x)) = 1/2. Substitute into V(D,G) = E[log D(x)] + E[log(1−D(G(z)))] and simplify.",
        "The global optimum of the GAN is related to the Jensen-Shannon divergence between p_r and p_g.",
      ],
    },
    {
      id: "q-gan-kp1-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The optimal discriminator for a GAN with real distribution p_r and generator distribution p_g is D*(x) = ___.",
      options: [
        "p_r(x)",
        "p_g(x) / (p_r(x) + p_g(x))",
        "p_r(x) / (p_r(x) + p_g(x))",
        "1 / (1 + p_g(x))",
      ],
      correctAnswer: 2,
      explanation:
        "Taking the functional derivative of E_{x~p_r}[log D(x)] + E_{x~p_g}[log(1−D(x))] with respect to D(x) and setting to zero yields D*(x) = p_r(x) / (p_r(x) + p_g(x)).",
      hints: [
        "Maximise f(y) = a log y + b log(1−y) with respect to y at each x. The maximum is at y = a/(a+b).",
        "Here a = p_r(x) and b = p_g(x).",
      ],
    },
    {
      id: "q-gan-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The GAN training objective is equivalent to minimising which divergence between p_r and p_g when the discriminator is optimal?",
      options: [
        "KL(p_r || p_g)",
        "KL(p_g || p_r)",
        "Jensen-Shannon divergence JS(p_r || p_g)",
        "Total variation distance TV(p_r, p_g)",
      ],
      correctAnswer: 2,
      explanation:
        "Substituting D*(x) = p_r/(p_r+p_g) into the value function V(D*,G) gives V = −log 4 + 2·JS(p_r||p_g). Minimising over G is therefore equivalent to minimising the symmetric Jensen-Shannon divergence.",
      hints: [
        "The JS divergence is JS(p||q) = (1/2)KL(p||m) + (1/2)KL(q||m) where m = (p+q)/2, and it is symmetric.",
        "KL divergence is asymmetric; JS is symmetric and bounded in [0, log 2].",
      ],
    },
  ],

  "gan-training": [
    {
      id: "q-gan-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The original GAN generator loss log(1 − D(G(z))) saturates early in training. The non-saturating alternative that Goodfellow (2014) recommends is ___.",
      options: [
        "Minimise log D(G(z))",
        "Minimise −log D(G(z))",
        "Maximise log(1 − D(G(z)))",
        "Maximise E[D(G(z))]",
      ],
      correctAnswer: 1,
      explanation:
        "When D(G(z)) ≈ 0 (generator is weak), log(1−D(G(z))) saturates near log(1) ≈ 0 giving a near-zero gradient. −log D(G(z)) is large in the same regime, providing a strong gradient signal. The practical generator objective is therefore to minimise −log D(G(z)).",
      hints: [
        "Plot log(1−x) and −log(x) for x near 0 to see which has larger magnitude.",
        "Early in training D(G(z)) is very small — the saturating form gives almost no gradient to train the generator.",
      ],
    },
    {
      id: "q-gan-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Mode collapse in GANs refers to which of the following phenomena?",
      options: [
        "The discriminator loss reaching zero and never recovering",
        "The generator learning to produce only a narrow subset of the real data distribution",
        "Gradient vanishing caused by using ReLU activations in the generator",
        "The training loss oscillating without converging",
      ],
      correctAnswer: 1,
      explanation:
        "Mode collapse occurs when the generator finds a single output (or small set of outputs) that reliably fools the discriminator, ignoring the diversity of the true data distribution. The generator essentially maps many noise inputs to the same output.",
      hints: [
        'Think about what happens when the generator finds one "safe" output that always deceives the discriminator.',
        '"Mode" refers to a peak in the probability distribution — collapse means only one or a few modes are covered.',
      ],
    },
    {
      id: "q-gan-kp2-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "When the supports of p_r and p_g lie on disjoint low-dimensional manifolds in high-dimensional space, the JS divergence between them is always log 2, giving zero gradient to the generator.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Arjovsky & Bottou (2017) showed that when p_r and p_g are supported on disjoint manifolds (which is almost certain in high dimensions when p_g is parameterised by a low-dimensional noise), JS(p_r||p_g) = log 2 — a constant — producing zero gradient for the generator regardless of how far apart the distributions are.",
      hints: [
        "The penalty targets the gradient norm at interpolated points — not at real or fake points alone.",
        "The factor (||∇D||₂ − 1)² pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
      ],
    },
  ],

  dcgan: [
    {
      id: "q-gan-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the DCGAN generator (Radford et al. 2015), a G_block with 4×4 kernel, stride 2, padding 1, applied to a 16×16 feature map produces an output of size ___.",
      options: ["8×8", "16×16", "32×32", "64×64"],
      correctAnswer: 2,
      explanation:
        "The transposed convolution output size formula is: n_out = (n_in − 1)·stride − 2·padding + kernel = (16−1)·2 − 2·1 + 4 = 30 + 4 − 2 = 32. Each G_block doubles spatial dimensions. Starting from 4×4, four G_blocks produce 4→8→16→32→64.",
      hints: [
        "Transposed convolution (also called fractionally-strided convolution) upsamples. Formula: n_out = (n_in−1)·s − 2p + k.",
        "DCGAN uses stride=2, padding=1, kernel=4 in each G_block, so each block doubles the spatial size.",
      ],
    },
    {
      id: "q-gan-kp3-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "DCGAN uses Batch Normalization in both the generator and the discriminator output layer.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "DCGAN applies Batch Normalization in most layers but explicitly omits it from the generator output layer (which uses Tanh to produce pixel values) and the discriminator input layer (to preserve raw signal statistics).",
      hints: [
        "Normalizing the final output of the generator would distort the tanh-scaled pixel value range.",
        "The original DCGAN paper specifies which layers should not use BatchNorm.",
      ],
    },
    {
      id: "q-gan-kp3-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In DCGAN, the discriminator uses Leaky ReLU with α = 0.2. For a negative pre-activation x = −3, the Leaky ReLU output is ___.",
      options: ["0", "−0.6", "3", "−3"],
      correctAnswer: 1,
      explanation:
        "Leaky ReLU(x) = x if x > 0, else α·x. For x = −3 and α = 0.2: output = 0.2 × (−3) = −0.6. This non-zero output for negative inputs prevents dead neurons and allows gradient flow through the discriminator even for negative activations.",
      hints: [
        "Standard ReLU would output 0 for x = −3. Leaky ReLU multiplies by the small slope α instead.",
        "α = 0.2 means negative activations leak through at 20% of their magnitude.",
      ],
    },
  ],

  "conditional-gan": [
    {
      id: "q-gan-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What additional input does a Conditional GAN (cGAN) provide to both the generator and discriminator?",
      options: [
        "A random noise vector z",
        "A conditioning variable y (e.g., class label)",
        "A reconstruction loss gradient",
        "The full training dataset statistics",
      ],
      correctAnswer: 1,
      explanation:
        "cGAN conditions generation on auxiliary information y, allowing the model to produce samples of a specific class or with desired attributes by feeding y to both networks.",
      hints: [
        'The "conditional" in cGAN means the generation process depends on some extra information.',
        'Think about how you would tell the generator "produce an image of a cat" specifically.',
      ],
    },
    {
      id: "q-gan-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a cGAN, the discriminator only needs to determine whether a sample is real or fake, not whether it matches the conditioning label.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "The discriminator in a cGAN must verify both realism and label consistency — a real image paired with the wrong label should also be classified as fake.",
      hints: [
        "If the discriminator ignored the label, could the generator simply output any real-looking image regardless of the condition?",
        "Conditioning the discriminator ensures the generator actually respects the label y.",
      ],
    },
    {
      id: "q-gan-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Projection conditioning in cGAN discriminators (Miyato & Koyama, 2018) improves over naive label concatenation primarily because:",
      options: [
        "It doubles the number of discriminator parameters",
        "It computes an inner product between the embedded label and the penultimate feature, respecting the conditional distribution structure",
        "It applies dropout proportional to the class count",
        "It replaces batch normalization with layer normalization",
      ],
      correctAnswer: 1,
      explanation:
        "Projection conditioning is theoretically motivated by the density ratio formulation of the discriminator, producing a more principled and expressive conditioning mechanism than simple concatenation.",
      hints: [
        "The method derives its design from the log-likelihood ratio the discriminator is implicitly estimating.",
        "Think about bilinear products between vectors as a way to measure compatibility.",
      ],
    },
  ],

  "wasserstein-gan": [
    {
      id: "q-gan-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Wasserstein-1 (Earth Mover\'s) distance W(p_r, p_g) is defined via the Kantorovich-Rubinstein dual as W(p_r, p_g) = ___.",
      options: [
        "sup_{||f||_L ≤ 1} E_{x~p_r}[f(x)] − E_{x~p_g}[f(x)]",
        "inf_{γ ∈ Π(p_r,p_g)} E_{(x,y)~γ}[||x−y||]",
        "KL(p_r || p_g) + KL(p_g || p_r)",
        "E_{x~p_r}[log p_r(x)/p_g(x)]",
      ],
      correctAnswer: 0,
      explanation:
        "By the Kantorovich-Rubinstein duality, W(p_r,p_g) = sup over all 1-Lipschitz functions f of E_{p_r}[f(x)] − E_{p_g}[f(x)]. WGAN trains a critic f_w to approximate this supremum, making the loss directly the Wasserstein distance.",
      hints: [
        "The penalty targets the gradient norm at interpolated points — not at real or fake points alone.",
        "The factor (||∇D||₂ − 1)² pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
      ],
    },
    {
      id: "q-gan-kp5-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "WGAN enforces the 1-Lipschitz constraint on its critic via weight clipping to [−c, c]. The paper itself calls this approach ___.",
      options: [
        "The best known method for enforcing Lipschitz continuity",
        '"a clearly terrible way to enforce a Lipschitz constraint"',
        "The theoretically optimal Lipschitz penalty",
        "Equivalent to spectral normalisation",
      ],
      correctAnswer: 1,
      explanation:
        'Arjovsky et al. (2017) explicitly stated in the WGAN paper that "Weight clipping is a clearly terrible way to enforce a Lipschitz constraint." It can lead to either vanishing or exploding gradients depending on the clipping threshold, motivating WGAN-GP\'s gradient penalty improvement.',
      hints: [
        "The penalty targets the gradient norm at interpolated points — not at real or fake points alone.",
        "The factor (||∇D||₂ − 1)² pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
      ],
    },
    {
      id: "q-gan-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "WGAN-GP (Gulrajani et al. 2017) replaces weight clipping with a gradient penalty. The penalty term is ___.",
      options: [
        "λ · E_{x̂}[(||∇D(x̂)||₂ − 1)²] where x̂ is sampled along lines between real and fake data",
        "λ · E_{x}[||∇D(x)||₂²] at real data points only",
        "λ · ||W||_F² on all critic weights (Frobenius norm penalty)",
        "λ · E_{z}[||∇_z D(G(z))||₂²]",
      ],
      correctAnswer: 0,
      explanation:
        "WGAN-GP samples interpolated points x̂ = ε·x_real + (1−ε)·x_fake with ε~U[0,1] and adds λ·E[(||∇D(x̂)||₂ − 1)²] to the critic loss, directly penalising deviation of gradient norms from 1 along the optimal transport path.",
      hints: [
        "The penalty targets the gradient norm at interpolated points — not at real or fake points alone.",
        "The factor (||∇D||₂ − 1)² pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
      ],
    },
  ],

  "progressive-growing": [
    {
      id: "q-gan-kp6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key training strategy introduced by Progressive Growing of GANs (ProGAN)?",
      options: [
        "Training on low-resolution images only, then fine-tuning on high-resolution",
        "Incrementally adding higher-resolution layers to both networks during training",
        "Using a curriculum of increasingly difficult discriminators",
        "Pre-training the generator as a VAE before adversarial training",
      ],
      correctAnswer: 1,
      explanation:
        "ProGAN starts both networks at 4×4 resolution and smoothly fades in new layers that double the resolution, allowing stable training at resolutions up to 1024×1024.",
      hints: [
        'The method is called "progressive" — think about growing the network incrementally.',
        "Training at low resolution first lets the model learn coarse structure before tackling fine details.",
      ],
    },
    {
      id: "q-gan-kp6-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In ProGAN, new layers are added abruptly (all at once) without any transition period.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "ProGAN uses a smooth fade-in: new layers are blended in via a linearly increasing α weight, preventing training instability that would result from sudden architectural changes.",
      hints: [
        "Abrupt changes would create a discontinuity in the network that could destabilize training.",
        "Think of α as a mixing coefficient that starts at 0 and gradually increases to 1.",
      ],
    },
    {
      id: "q-gan-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ProGAN introduces minibatch standard deviation as a feature. Its purpose is to:",
      options: [
        "Normalize activations across the minibatch for stable gradients",
        "Append a feature map summarizing within-batch diversity to the discriminator, discouraging mode collapse",
        "Replace batch normalization in the generator",
        "Compute sample weights for importance resampling",
      ],
      correctAnswer: 1,
      explanation:
        "Minibatch standard deviation computes the average standard deviation of features across the batch and appends it as an extra channel to the discriminator, giving it a signal about diversity and penalizing mode collapse.",
      hints: [
        "The discriminator needs a way to detect when all generated samples look the same.",
        "Standard deviation measures spread; low spread across a batch suggests lack of diversity.",
      ],
    },
  ],

  stylegan: [
    {
      id: "q-gan-kp7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In StyleGAN, the mapping network f converts the latent code z into an intermediate latent code w. What is the primary benefit of this mapping?",
      options: [
        "It reduces the dimensionality of the latent space to save memory",
        "It disentangles style factors by transforming the typically entangled Gaussian prior into a less constrained learned space W",
        "It enforces a uniform distribution over generated images",
        "It replaces the discriminator during early training",
      ],
      correctAnswer: 1,
      explanation:
        "The mapping network allows W to have a different, potentially more disentangled geometry than Z, making it easier for individual dimensions of w to control independent visual attributes.",
      hints: [
        "A Gaussian prior in Z forces all styles to coexist in a ball; W has more freedom to organize independently.",
        "Disentanglement means changing one dimension affects only one visual property.",
      ],
    },
    {
      id: "q-gan-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "StyleGAN\'s AdaIN (Adaptive Instance Normalization) layers inject style information by modulating per-channel mean and variance of feature maps.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AdaIN normalizes feature maps to zero mean and unit variance, then re-scales and re-shifts them using style parameters (γ, β) derived from w, effectively injecting style at each resolution.",
      hints: [
        'Instance Normalization removes the mean and variance; "Adaptive" means those statistics are replaced with learned values.',
        "The style parameters γ and β are affine-transformed from w.",
      ],
    },
    {
      id: "q-gan-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'StyleGAN\'s "truncation trick" trades diversity for quality by:',
      options: [
        "Clipping pixel values in generated images to a valid range",
        "Interpolating w toward the mean of W with a truncation factor ψ < 1",
        "Discarding generated samples whose discriminator score falls below a threshold",
        "Reducing the number of style layers during inference",
      ],
      correctAnswer: 1,
      explanation:
        "Truncating w = w̄ + ψ(w − w̄) pulls samples toward the center of the W space, which corresponds to more average, higher-fidelity faces at the cost of less variety.",
      hints: [
        "Points near the mean of a distribution tend to be more typical (higher likelihood) samples.",
        "ψ = 1 means no truncation; ψ → 0 collapses everything to the mean style.",
      ],
    },
  ],

  cyclegan: [
    {
      id: "q-gan-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "CycleGAN enables image-to-image translation without paired training examples. How does it enforce content consistency?",
      options: [
        "By minimizing pixel-wise L2 loss between input and output",
        "Through a cycle-consistency loss that requires G(F(x)) ≈ x and F(G(y)) ≈ y",
        "By sharing weights between the two generators",
        "By applying the discriminator to the concatenation of input and output",
      ],
      correctAnswer: 1,
      explanation:
        "Cycle-consistency loss penalizes deviations from round-trip reconstruction: translating from domain X to Y and back should recover the original image, preventing arbitrary mappings.",
      hints: [
        'Think about what "cycle" implies: going from X→Y→X should return to the start.',
        "Without this constraint, the generators could produce any valid-looking image in the target domain, ignoring input content.",
      ],
    },
    {
      id: "q-gan-kp8-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "CycleGAN requires paired images (e.g., a photo of a horse paired with its zebra counterpart) for training.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "CycleGAN is specifically designed for unpaired translation; it only requires two separate collections of images from each domain, not matched pairs.",
      hints: [
        "The key motivation for CycleGAN was that paired datasets are expensive and often impossible to collect.",
        'Think about what "unpaired" means in the context of domain translation.',
      ],
    },
    {
      id: "q-gan-kp8-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CycleGAN typically also includes an identity loss. What does it encourage?",
      options: [
        "The generator to produce the same output for every input",
        "The generator to leave images already in the target domain largely unchanged",
        "The discriminator to assign equal scores to real and fake samples",
        "The latent codes of both domains to be identical",
      ],
      correctAnswer: 1,
      explanation:
        "The identity loss (||G(y) − y||) encourages G (X→Y translator) to act as an approximate identity when given a sample already in domain Y, helping preserve color and content fidelity.",
      hints: [
        "Without this loss, the generator might unnecessarily alter images that already look like the target domain.",
        "It is applied by feeding real target-domain images through the generator that maps to that same domain.",
      ],
    },
  ],

  pix2pix: [
    {
      id: "q-gan-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What distinguishes Pix2Pix from CycleGAN in terms of training data requirements?",
      options: [
        "Pix2Pix requires unpaired images; CycleGAN requires paired images",
        "Pix2Pix requires paired images; CycleGAN requires unpaired images",
        "Both require paired images",
        "Both can work without any image pairs",
      ],
      correctAnswer: 1,
      explanation:
        "Pix2Pix is a supervised image-to-image translation framework that uses paired training examples (input image + ground truth output), while CycleGAN relaxes this to unpaired data.",
      hints: [
        "Think about the supervision signal: does Pix2Pix have a ground-truth target to compare against?",
        "The original Pix2Pix paper demonstrates tasks like facades↔photo, edges→shoes, where pairs exist.",
      ],
    },
    {
      id: "q-gan-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Pix2Pix discriminator is a PatchGAN that classifies individual image patches as real or fake rather than the whole image.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "PatchGAN classifies N×N patches independently, encouraging local texture realism while being more parameter-efficient than a full-image discriminator.",
      hints: [
        "A patch-based discriminator penalizes high-frequency artifacts at the local level.",
        "Think about how a convolutional network with limited receptive field perceives images.",
      ],
    },
    {
      id: "q-gan-kp9-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Pix2Pix combines GAN loss with an L1 reconstruction loss. What role does the L1 loss play?",
      options: [
        "It replaces the GAN loss during the first few epochs to warm-start training",
        "It provides low-frequency correctness (overall structure and color) while the GAN loss handles high-frequency details",
        "It penalizes the discriminator for assigning high scores to fake images",
        "It enforces cycle consistency between forward and inverse mappings",
      ],
      correctAnswer: 1,
      explanation:
        "L1 loss encourages the generator to produce outputs close to the ground-truth globally (blurry but correctly structured), while the adversarial loss sharpens textures and high-frequency details.",
      hints: [
        "L1/L2 losses tend to produce blurry results because they average over possible outputs.",
        "The adversarial loss is what forces crisp, realistic textures that the discriminator cannot distinguish from real.",
      ],
    },
  ],

  biggan: [
    {
      id: "q-gan-kp10-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "BigGAN achieves high-fidelity class-conditional generation primarily through which combination of techniques?",
      options: [
        "Progressive growing and cycle-consistency loss",
        "Large batch sizes, self-attention, truncation trick, and class-conditional BatchNorm",
        "Weight clipping, spectral normalization, and VAE pre-training",
        "Pixel-shuffle upsampling and PatchGAN discriminator",
      ],
      correctAnswer: 1,
      explanation:
        "BigGAN scales batch size (up to 2048), uses class-conditional batch normalization, self-attention layers, spectral normalization, and the truncation trick to achieve state-of-the-art IS and FID on ImageNet.",
      hints: [
        "BigGAN is about scaling: larger batches and larger models tend to improve GAN quality.",
        "Class conditioning is injected via batch normalization parameters derived from the label embedding.",
      ],
    },
    {
      id: "q-gan-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "BigGAN concatenates the class embedding directly to the noise vector z at the generator\'s input, with no further injection into intermediate layers.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        'BigGAN uses "class-conditional BatchNorm" to inject class information at every residual block via affine parameters (γ, β) derived from the class embedding, not just at the input.',
      hints: [
        "Injecting conditioning only at the input limits its influence on deeper feature maps.",
        "Residual block conditioning lets the class label guide synthesis at every scale.",
      ],
    },
    {
      id: "q-gan-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'BigGAN training is known to suffer from "training collapse" at large scales. This collapse is characterized by:',
      options: [
        "The generator loss rising suddenly to infinity",
        "A sudden drop in discriminator and generator performance after initially stable training",
        "The class embeddings converging to identical vectors",
        "The truncation trick producing mode-collapsed outputs",
      ],
      correctAnswer: 1,
      explanation:
        "BigGAN collapse manifests as a catastrophic degradation in sample quality after a period of stable training, believed to be related to the singular values of weight matrices becoming too large.",
      hints: [
        "This is a stability problem unique to very large-scale GAN training.",
        "Spectral normalization was introduced partly to control weight matrix singular values.",
      ],
    },
  ],

  "vae-gan": [
    {
      id: "q-gan-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a VAE-GAN, the VAE encoder and GAN generator (decoder) are trained jointly. The reconstruction loss is computed in which space?",
      options: [
        "Pixel space using L2 loss",
        "The discriminator\'s learned feature space (perceptual loss)",
        "The latent z space using KL divergence only",
        "Class probability space using cross-entropy",
      ],
      correctAnswer: 1,
      explanation:
        "VAE-GAN replaces pixel-wise reconstruction loss with a learned perceptual similarity measured in the discriminator\'s feature space, producing sharper and more perceptually realistic reconstructions.",
      hints: [
        "Pixel-level loss tends to produce blurry outputs; using a learned feature space captures perceptual similarity better.",
        "The discriminator\'s intermediate layers encode semantic and textural information useful for measuring image similarity.",
      ],
    },
    {
      id: "q-gan-kp11-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "VAE-GAN models have both an encoder and a decoder/generator network.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "VAE-GAN combines the VAE encoder (which maps images to a latent distribution) with a GAN generator (decoder), enabling both reconstruction of existing images and synthesis from sampled latents.",
      hints: [
        "VAE requires an encoder to compress images; GAN requires a generator to synthesize them.",
        "The hybrid inherits the inference capability of VAEs and the sharpness of GANs.",
      ],
    },
    {
      id: "q-gan-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The VAE-GAN objective balances three loss terms. Which set is correct?",
      options: [
        "Adversarial loss + pixel reconstruction loss + classification loss",
        "KL divergence + adversarial loss + perceptual (feature-matching) reconstruction loss",
        "Cycle-consistency loss + adversarial loss + identity loss",
        "WGAN critic loss + gradient penalty + mode-seeking loss",
      ],
      correctAnswer: 1,
      explanation:
        "VAE-GAN combines the VAE KL regularization term, a GAN adversarial loss for realism, and a feature-level reconstruction loss computed using discriminator internals.",
      hints: [
        "The VAE contributes the KL term; the GAN contributes the adversarial term; the hybrid needs a reconstruction term too.",
        "Feature-level reconstruction is what distinguishes VAE-GAN from a plain VAE + GAN ensemble.",
      ],
    },
  ],

  "gan-evaluation": [
    {
      id: "q-gan-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Fréchet Inception Distance (FID) measures the quality of generated images by:",
      options: [
        "Counting the number of distinct classes present in generated samples",
        "Computing the Fréchet distance between Gaussian fits to Inception features of real and generated images",
        "Asking human annotators to rate image quality on a Likert scale",
        "Measuring the pixel-level L2 distance between real and generated images",
      ],
      correctAnswer: 1,
      explanation:
        "FID fits multivariate Gaussians to Inception-v3 features of real and generated sets, then computes the Fréchet (2-Wasserstein) distance between them — lower FID indicates higher quality and diversity.",
      hints: [
        "FID uses a pre-trained classifier\'s feature space, not raw pixels.",
        "The metric captures both quality (close mean) and diversity (similar covariance).",
      ],
    },
    {
      id: "q-gan-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A GAN that memorizes the training set would achieve a perfect (zero) FID score.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "If generated images are identical to real training images, the Inception feature distributions match perfectly, giving FID = 0; FID alone cannot detect overfitting or memorization.",
      hints: [
        "FID measures distributional similarity — it does not check whether generated images are novel.",
        "This is one reason why precision-recall metrics are used alongside FID.",
      ],
    },
    {
      id: "q-gan-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Precision and Recall for generative models (Kynkäänniemi et al.) measure what two aspects of generation quality?",
      options: [
        "Precision = how many generated samples fall within the real data manifold; Recall = how much of the real manifold is covered by generated samples",
        "Precision = diversity of generated samples; Recall = quality of individual samples",
        "Precision = FID score improvement; Recall = IS score improvement",
        "Precision = discriminator accuracy on real samples; Recall = discriminator accuracy on fake samples",
      ],
      correctAnswer: 0,
      explanation:
        "Precision captures fidelity (fraction of generated samples that are realistic), while Recall captures diversity (fraction of real modes that are represented in generated samples), disentangling quality from coverage.",
      hints: [
        "Think of standard classification precision/recall: precision = what fraction of positives are true positives; recall = what fraction of true positives are found.",
        "High precision + low recall = sharp but mode-collapsed; low precision + high recall = diverse but blurry.",
      ],
    },
  ],

  "gan-loss-functions": [
    {
      id: "q-gan-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The original GAN generator loss (−log D(G(z))) is preferred over the saturating loss (log(1 − D(G(z)))) because:",
      options: [
        "It has lower computational complexity",
        "It provides larger gradients when G(z) is easily classified as fake (early training)",
        "It converges to a global optimum in polynomial time",
        "It eliminates the need for the discriminator",
      ],
      correctAnswer: 1,
      explanation:
        'When D(G(z)) ≈ 0 (generator is easily detected), log(1−D(G(z))) saturates near log(1) ≈ 0 giving vanishing gradients; −log D(G(z)) is large there, providing stronger signal. This is the "non-saturating" generator heuristic from Goodfellow et al. 2014.',
      hints: [
        "Plot log(1−x) and −log(x) for x near 0 to see which has larger magnitude.",
        "Early in training the generator produces terrible images — what gradient does each loss give?",
      ],
    },
    {
      id: "q-gan-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The hinge loss for GANs requires the discriminator to output a probability in (0, 1) via a sigmoid activation.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Hinge loss treats the discriminator as an unconstrained critic (no sigmoid), using max(0, 1−D(x)) for real samples and max(0, 1+D(G(z))) for fake samples, encouraging real scores above +1 and fake scores below −1.",
      hints: [
        "The hinge loss is borrowed from SVMs, which do not use probabilities.",
        'Removing the sigmoid turns the discriminator into a "critic" that outputs unbounded real values.',
      ],
    },
    {
      id: "q-gan-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Least Squares GAN (LSGAN) replaces the cross-entropy discriminator loss with (D(x)−1)² + (D(G(z)))². Which divergence does this minimise at the generator optimum?",
      options: [
        "Jensen-Shannon divergence",
        "Pearson χ² divergence",
        "KL divergence",
        "Total variation distance",
      ],
      correctAnswer: 1,
      explanation:
        "Mao et al. (2017) showed that optimising the LSGAN objective is equivalent to minimising the Pearson χ² divergence between the mixture distribution (p_r + p_g)/2 and p_g. This provides non-saturating gradients for generated samples far from the decision boundary.",
      hints: [
        "Unlike cross-entropy (which corresponds to JS divergence), the squared loss corresponds to a different f-divergence.",
        "The Pearson χ² divergence penalises generated samples proportionally to how far they are from the real-data region.",
      ],
    },
  ],

  "gan-regularization": [
    {
      id: "q-gan-kp14-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Spectral normalization constrains each weight matrix in the discriminator by:",
      options: [
        "Clipping all weights to [−1, 1]",
        "Dividing the weight matrix by its largest singular value (spectral norm)",
        "Adding an L2 penalty on the Frobenius norm of weights",
        "Applying dropout at rate 0.5 after every layer",
      ],
      correctAnswer: 1,
      explanation:
        "Spectral normalization divides W by σ(W) (its spectral norm = largest singular value), making each layer Lipschitz-1 and ensuring stable discriminator gradients.",
      hints: [
        "The spectral norm of a matrix is the operator norm induced by the L2 vector norm.",
        "Lipschitz continuity of the discriminator is the key constraint needed for stable GAN training.",
      ],
    },
    {
      id: "q-gan-kp14-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Gradient penalty (WGAN-GP) is applied to interpolated points between real and generated samples, not to the real or fake samples alone.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "WGAN-GP samples x̂ = εx + (1−ε)G(z) with ε ~ Uniform(0,1) and penalizes (||∇D(x̂)||₂ − 1)², enforcing the Lipschitz constraint along the path between real and fake data.",
      hints: [
        "The theoretical motivation is that the Wasserstein gradient constraint only needs to hold on the optimal transport path.",
        "Sampling between real and fake ensures the penalty is applied where the discriminator is most active.",
      ],
    },
    {
      id: "q-gan-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "R1 gradient penalty regularizes GAN training by penalizing:",
      options: [
        "Gradient norms of the discriminator evaluated at generated samples",
        "Gradient norms of the discriminator evaluated at real samples only",
        "Second-order derivatives of the generator loss",
        "The discriminator\'s output variance across a minibatch",
      ],
      correctAnswer: 1,
      explanation:
        "R1 regularization adds (γ/2)||∇D(x)||² evaluated only at real data points, shown theoretically and empirically to stabilize training without requiring interpolated samples.",
      hints: [
        "R1 and R2 penalties differ only in whether they are applied at real or fake samples.",
        "Penalizing gradients at real data prevents the discriminator from becoming arbitrarily sharp near real samples.",
      ],
    },
  ],

  infogan: [
    {
      id: "q-gan-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "InfoGAN decomposes the generator input into z (noise) and c (latent code). What is the training objective that relates to c?",
      options: [
        "Minimizing the KL divergence between c and a Gaussian prior",
        "Maximizing the mutual information I(c; G(z, c)) between the latent code and the generated image",
        "Enforcing cycle-consistency between c and its reconstruction",
        "Maximizing the discriminator\'s accuracy on samples conditioned on c",
      ],
      correctAnswer: 1,
      explanation:
        "InfoGAN adds a mutual information maximization term I(c; G(z,c)) to the GAN objective, encouraging interpretable latent codes c that are recoverable from generated images without supervision.",
      hints: [
        "Mutual information I(X;Y) measures how much knowing Y reduces uncertainty about X.",
        "If c controls a semantic attribute of G(z,c), knowing G(z,c) should tell you about c.",
      ],
    },
    {
      id: "q-gan-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "InfoGAN requires explicit supervision (labels) to learn disentangled representations.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "InfoGAN is fully unsupervised; it learns disentangled representations purely by maximizing mutual information between latent codes and generated outputs, without any label annotations.",
      hints: [
        "The key selling point of InfoGAN is that it discovers semantic structure without being told what to look for.",
        "Compare to cGAN, which does require label supervision.",
      ],
    },
    {
      id: "q-gan-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Computing mutual information I(c; G(z,c)) exactly is intractable. InfoGAN addresses this by:",
      options: [
        "Using Monte Carlo sampling with a fixed reference distribution",
        "Maximizing a variational lower bound using an auxiliary recognition network Q(c|x)",
        "Approximating mutual information with pixel-level cosine similarity",
        "Training a separate energy-based model to estimate the joint distribution",
      ],
      correctAnswer: 1,
      explanation:
        "InfoGAN uses the variational lower bound LI = E[log Q(c|x)] − H(c), where Q is an auxiliary network that approximates the posterior P(c|G(z,c)), making the objective tractable.",
      hints: [
        "Variational lower bounds are a common trick for making intractable quantities optimizable.",
        "The auxiliary network Q plays a role analogous to the encoder in a VAE.",
      ],
    },
  ],

  srgan: [
    {
      id: "q-gan-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Super-Resolution GAN (SRGAN) improves upon bicubic upsampling primarily by:",
      options: [
        "Using a deeper bicubic interpolation kernel",
        "Adding a perceptual loss (VGG feature loss) and adversarial loss to recover fine-grained textures",
        "Training exclusively on synthetic low-resolution images",
        "Replacing transposed convolutions with pixel-shuffle only at the final layer",
      ],
      correctAnswer: 1,
      explanation:
        "SRGAN combines a pixel-level loss, a perceptual loss computed in VGG feature space, and an adversarial loss, allowing it to hallucinate realistic high-frequency textures that PSNR-optimized methods cannot recover.",
      hints: [
        "MSE-optimized SR produces blurry results because it averages plausible outputs; the adversarial term forces sharpness.",
        "VGG features capture perceptual similarity better than pixel-level metrics.",
      ],
    },
    {
      id: "q-gan-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SRGAN-generated images always achieve higher PSNR than bicubic upsampling.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "SRGAN typically has lower PSNR than MSE-optimized methods like bicubic because it sacrifices pixel-exact accuracy to produce perceptually sharper textures; PSNR and perceptual quality are often in tension.",
      hints: [
        "PSNR is a pixel-level metric — sharp but slightly wrong textures can lower PSNR.",
        "Perceptual quality and PSNR are known to have an inverse trade-off in SR literature.",
      ],
    },
    {
      id: "q-gan-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ESRGAN improves upon SRGAN by replacing the discriminator with a Relativistic discriminator. What does the relativistic discriminator estimate?",
      options: [
        "The absolute probability that an image is real",
        "The probability that a real image is more realistic than a randomly chosen fake image",
        "The gradient norm of the generator at each training step",
        "The perceptual distance between two images in VGG feature space",
      ],
      correctAnswer: 1,
      explanation:
        "The Relativistic GAN discriminator estimates P(x_real is more realistic than x_fake), allowing the generator to receive gradients even from real data samples, improving training stability and quality.",
      hints: [
        "Standard discriminators only consider one sample at a time; relativistic ones compare two samples.",
        "This means both real and fake samples contribute gradients to every update.",
      ],
    },
  ],

  "video-generation-gan": [
    {
      id: "q-gan-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Video GAN architectures typically separate generation into two components. What are they?",
      options: [
        "A spatial encoder and a temporal decoder",
        "A foreground (motion) generator and a background (static scene) generator",
        "A frame discriminator and a video discriminator",
        "A pixel-level GAN and a feature-level GAN",
      ],
      correctAnswer: 1,
      explanation:
        "VGAN and similar methods decompose video generation into a static background stream and a dynamic foreground stream, making it easier to model independently varying components.",
      hints: [
        "In most natural videos, the background changes slowly while foreground objects move.",
        "Decomposing the problem reduces the complexity of what each sub-network must learn.",
      ],
    },
    {
      id: "q-gan-kp17-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "MoCoGAN (Motion and Content GAN) uses separate latent codes for content and motion to enable temporally consistent video generation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "MoCoGAN disentangles content (appearance, fixed per video) from motion (varying per frame) using separate latent spaces, allowing independent control over what appears and how it moves.",
      hints: [
        "Content = identity of the subject; motion = how it changes over time.",
        "Keeping content fixed while varying motion produces temporally coherent videos.",
      ],
    },
    {
      id: "q-gan-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Video GANs often use a temporal discriminator in addition to a spatial (per-frame) discriminator. What does the temporal discriminator detect?",
      options: [
        "Whether individual frames are photorealistic",
        "Whether the sequence of frames is temporally coherent and plausible as a video",
        "Whether the video exceeds a maximum frame rate",
        "Whether the background is static across frames",
      ],
      correctAnswer: 1,
      explanation:
        "A per-frame discriminator only evaluates individual frames; a temporal discriminator evaluates the joint distribution over time, penalizing flickering, unnatural motion, or incoherent dynamics.",
      hints: [
        "A GAN that only uses a spatial discriminator could produce sharp frames that flicker incoherently.",
        "The temporal discriminator takes a sequence of frames as input, not a single frame.",
      ],
    },
  ],

  "3d-gan": [
    {
      id: "q-gan-kp18-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "3D-GAN generates 3D objects represented as:",
      options: [
        "Triangle meshes with texture maps",
        "Volumetric voxel grids",
        "Point clouds with color attributes",
        "Implicit neural radiance fields",
      ],
      correctAnswer: 1,
      explanation:
        "The original 3D-GAN (Wu et al., 2016) generates shapes as 64×64×64 binary voxel grids, enabling 3D convolutional discriminators that evaluate volumetric realism.",
      hints: [
        "Voxels are 3D analogues of pixels — discrete cubic volume elements.",
        "The original 3D-GAN paper predates NeRF-based implicit representations.",
      ],
    },
    {
      id: "q-gan-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Voxel-based 3D GANs scale efficiently to very high resolutions (e.g., 512³) because memory grows linearly with resolution.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Voxel memory grows cubically (O(n³)) with resolution; a 512³ grid requires 512× more memory than a 128³ grid, making high-resolution voxel generation impractical without specialized representations.",
      hints: [
        "Images are 2D (n² pixels); voxel grids are 3D (n³ voxels). How does cubic scaling compare to linear?",
        "This memory bottleneck motivates alternatives like octrees, point clouds, and implicit representations.",
      ],
    },
    {
      id: "q-gan-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "EG3D (Chan et al., 2022) represents 3D scenes using which hybrid representation for efficient high-resolution 3D-aware image synthesis?",
      options: [
        "Voxel grids combined with surface normals",
        "Tri-plane features projected onto three axis-aligned planes, decoded via NeRF",
        "Mesh-based representation with learned texture atlases",
        "Sparse octree voxels with learned occupancy",
      ],
      correctAnswer: 1,
      explanation:
        "EG3D uses three axis-aligned feature planes (XY, XZ, YZ), projects 3D points onto all three planes and concatenates features, then decodes with a lightweight MLP, combining NeRF\'s 3D consistency with 2D convolutional efficiency.",
      hints: [
        "Tri-plane is a way to approximate a full 3D feature volume with three 2D planes.",
        "NeRF-style rendering ensures multi-view consistency in the generated images.",
      ],
    },
  ],

  "text-to-image-gan": [
    {
      id: "q-gan-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "StackGAN generates high-resolution images from text descriptions using a two-stage approach. What does Stage-I produce?",
      options: [
        "A 256×256 photorealistic image",
        "A low-resolution (64×64) image capturing rough shape and colors from the text",
        "A text embedding refined by the image context",
        "A segmentation mask for subsequent rendering",
      ],
      correctAnswer: 1,
      explanation:
        "Stage-I of StackGAN generates a coarse 64×64 image capturing the high-level semantics of the text; Stage-II takes this and the text to produce a refined 256×256 image with fine details.",
      hints: [
        '"Stack" implies building one thing on top of another — coarse-to-fine generation.',
        "The first stage handles global layout; the second stage adds fine-grained textures.",
      ],
    },
    {
      id: "q-gan-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AttnGAN uses attention mechanisms to align specific words in the text description with specific spatial regions of the generated image.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AttnGAN computes word-level attention over the text embeddings to guide each spatial location of the generator, enabling fine-grained correspondence between text words and image regions.",
      hints: [
        'Attention maps show which words the model "looks at" when generating each part of the image.',
        "Word-level attention is more precise than using a single global sentence embedding.",
      ],
    },
    {
      id: "q-gan-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DAMSM (Deep Attentional Multimodal Similarity Model) in AttnGAN provides which additional training signal?",
      options: [
        "A pixel-level reconstruction loss between text and image",
        "A fine-grained image-text matching loss that maximizes similarity between word features and corresponding image sub-regions",
        "A contrastive loss between paired and unpaired text-image samples using a fixed CLIP model",
        "A cycle-consistency loss between text encodings and image encodings",
      ],
      correctAnswer: 1,
      explanation:
        "DAMSM computes a cross-modal attention-weighted similarity between image sub-regions and words, and adds this as an auxiliary loss to enforce that generated regions match their corresponding text descriptions.",
      hints: [
        "DAMSM trains an image encoder and text encoder jointly to align local regions with words.",
        'The loss is "attentional" because it weights word-region pairs by their attention scores.',
      ],
    },
  ],

  "face-synthesis": [
    {
      id: "q-gan-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which GAN architecture is most commonly used as the foundation for high-fidelity face synthesis and deepfakes?",
      options: ["DCGAN", "StyleGAN / StyleGAN2", "CycleGAN", "BigGAN"],
      correctAnswer: 1,
      explanation:
        "StyleGAN and StyleGAN2 are the standard architectures for photorealistic face synthesis due to their disentangled style control, progressive training heritage, and state-of-the-art FID on FFHQ.",
      hints: [
        "The FFHQ (Flickr-Faces-HQ) dataset was released alongside this architecture.",
        "Deepfake tools like FaceSwap and many commercial face generators are built on this model family.",
      ],
    },
    {
      id: "q-gan-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deepfake detection methods that rely on detecting GAN-specific spectral artifacts remain fully robust against all modern deepfake generators.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Spectral artifact-based detectors can be defeated by post-processing (resizing, compression) or newer GAN architectures that do not exhibit the same artifacts, making this an ongoing arms race.",
      hints: [
        "Detectors trained on one GAN architecture often fail to generalize to others.",
        "Simple JPEG compression can remove many frequency-domain artifacts used for detection.",
      ],
    },
    {
      id: "q-gan-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Face reenactment GANs (e.g., First Order Motion Model) transfer motion from a driving video to a source face without 3D modeling. They represent motion using:",
      options: [
        "Dense optical flow fields estimated by a pre-trained FlowNet",
        "Sparse keypoints and local affine transformations around each keypoint",
        "3D face mesh deformations parameterized by Basel Face Model coefficients",
        "Per-pixel displacement maps produced by a U-Net",
      ],
      correctAnswer: 1,
      explanation:
        "FOMM learns sparse keypoints and per-keypoint local affine transformations in a self-supervised manner, using them to warp the source image to match the driving pose without any 3D supervision.",
      hints: [
        '"First Order" refers to first-order Taylor approximation of motion around keypoints.',
        "The method discovers keypoints automatically without being told what facial landmarks to use.",
      ],
    },
  ],

  "medical-gan": [
    {
      id: "q-gan-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "GANs are used in medical image synthesis primarily to address which challenge?",
      options: [
        "Reducing the computation time of MRI scanners",
        "Augmenting scarce labeled medical datasets to improve downstream model performance",
        "Replacing radiologist annotation entirely",
        "Compressing DICOM files for storage efficiency",
      ],
      correctAnswer: 1,
      explanation:
        "Medical datasets are often small and expensive to annotate; GAN-synthesized images can augment training data for segmentation, classification, and detection models, improving performance on limited real data.",
      hints: [
        "Think about the main bottleneck in medical AI: data scarcity vs. model capacity.",
        "Synthetic data can fill in rare pathology classes or balance class distributions.",
      ],
    },
    {
      id: "q-gan-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GAN-synthesized medical images can be used in clinical diagnosis without any validation against real patient outcomes.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "GAN-synthesized images must be rigorously validated for clinical use — they can contain hallucinated pathologies or miss real ones; regulatory frameworks require evidence of safety and efficacy before clinical deployment.",
      hints: [
        "A GAN optimizes for realism, not diagnostic accuracy — it may generate convincing but incorrect pathology.",
        "Think about the consequences of a false negative in cancer screening.",
      ],
    },
    {
      id: "q-gan-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MRI-to-CT synthesis using GANs (cross-modal synthesis) is valuable because:",
      options: [
        "CT scans are always cheaper and faster to acquire than MRI",
        "It enables generation of CT-like images from MRI for patients who cannot receive radiation, enabling CT-based radiotherapy planning without actual CT acquisition",
        "MRI machines cannot image bone structures at all",
        "Synthetic CT is more accurate than real CT for surgical planning",
      ],
      correctAnswer: 1,
      explanation:
        "Synthetic CT from MRI allows MRI-only radiotherapy workflows, sparing patients (especially children) from ionizing radiation while still enabling dose planning that requires CT-like Hounsfield unit maps.",
      hints: [
        "Radiotherapy planning software requires CT Hounsfield units; MRI does not directly provide these.",
        "Think about patients for whom CT radiation exposure is contraindicated.",
      ],
    },
  ],

  "data-augmentation-gan": [
    {
      id: "q-gan-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When using GAN-generated images for data augmentation, the primary goal is to:",
      options: [
        "Replace the original training set entirely with synthetic images",
        "Increase effective training set size and diversity to reduce overfitting in downstream classifiers",
        "Evaluate the quality of the GAN using downstream task performance as a proxy metric",
        "Generate hard negative examples for contrastive learning only",
      ],
      correctAnswer: 1,
      explanation:
        "GAN augmentation supplements real data with diverse synthetic examples, helping classifiers generalize better especially when labeled real data is scarce.",
      hints: [
        "Data augmentation is a regularization technique — what problem does it solve?",
        "More diverse training examples reduce the chance that a model overfits to the training set distribution.",
      ],
    },
    {
      id: "q-gan-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Training a GAN on a small dataset (e.g., fewer than 1000 images) without any regularization typically results in the discriminator overfitting to the training set.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "With limited data, the discriminator memorizes real samples and provides uninformative gradients to the generator; techniques like ADA (Adaptive Discriminator Augmentation) or DiffAugment are needed to stabilize training.",
      hints: [
        "Overfitting affects discriminators too — it can memorize real images and detect fakes via memorization rather than learned features.",
        "ADA and DiffAugment apply stochastic augmentations to both real and fake images to mitigate this.",
      ],
    },
    {
      id: "q-gan-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Adaptive Discriminator Augmentation (ADA, Karras et al. 2020) adjusts augmentation strength based on:",
      options: [
        "The generator\'s FID score on a validation set",
        "The discriminator\'s overfitting signal, measured as the difference between its accuracy on real training vs. validation images",
        "The norm of the discriminator\'s gradient",
        "The generator loss relative to a fixed target value",
      ],
      correctAnswer: 1,
      explanation:
        "ADA tracks discriminator overfitting by comparing real training accuracy to real validation accuracy; when the gap grows, augmentation probability p is increased, preventing the discriminator from memorizing training images.",
      hints: [
        "This is a stability problem unique to very large-scale GAN training.",
        "Spectral normalization was introduced partly to control weight matrix singular values.",
      ],
    },
  ],

  "anomaly-detection-gan": [
    {
      id: "q-gan-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "AnoGAN detects anomalies at test time by:",
      options: [
        "Training a separate binary classifier to distinguish normal from anomalous samples",
        "Searching for a latent code z that allows the generator to reconstruct the test image; high reconstruction error signals an anomaly",
        "Computing the gradient of the discriminator output with respect to pixel values",
        "Using K-nearest neighbors in the GAN latent space",
      ],
      correctAnswer: 1,
      explanation:
        "AnoGAN finds the closest latent code z* such that G(z*) ≈ x_test via optimization; anomalies cannot be well-reconstructed since the generator was trained only on normal data, resulting in high residual error.",
      hints: [
        "The GAN is trained exclusively on normal data, so its latent space only covers the normal distribution.",
        "If a test image is anomalous, no z in the normal latent space can generate it faithfully.",
      ],
    },
    {
      id: "q-gan-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GANomaly speeds up anomaly detection compared to AnoGAN by using an encoder to directly predict the latent code without iterative optimization.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "GANomaly adds an encoder network to invert the generator in a single forward pass, eliminating the expensive per-sample optimization loop that makes AnoGAN slow at test time.",
      hints: [
        "AnoGAN requires many gradient steps to find z* for each test image.",
        "An encoder amortizes this inference, trading one-time training cost for fast test-time prediction.",
      ],
    },
    {
      id: "q-gan-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "f-AnoGAN improves anomaly scoring by combining reconstruction error in pixel space with:",
      options: [
        "A class-conditional probability score from the generator",
        "Reconstruction error in the discriminator\'s feature space (feature matching)",
        "The KL divergence between the test image encoding and the prior",
        "The L1 distance between consecutive video frames",
      ],
      correctAnswer: 1,
      explanation:
        "f-AnoGAN adds a feature-space residual (||f(x) − f(G(E(x)))||) using discriminator features, capturing perceptual anomalies that pixel-level error might miss.",
      hints: [
        "Discriminator features encode semantic and textural information beyond raw pixels.",
        "Anomalies that are pixel-level subtle but semantically different are better caught in feature space.",
      ],
    },
  ],

  "domain-adaptation-gan": [
    {
      id: "q-gan-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "GAN-based domain adaptation typically adapts a model from source to target domain by:",
      options: [
        "Fine-tuning only the final classification layer on target data",
        "Using a GAN to transform source images into the style of the target domain, then training on these stylized images",
        "Replacing the target domain data with GAN-generated source-domain images",
        "Training the GAN and classifier in completely separate phases with no shared parameters",
      ],
      correctAnswer: 1,
      explanation:
        "Pixel-level domain adaptation uses a GAN (often CycleGAN-style) to map source images into the target domain\'s visual style, reducing the domain gap before training the task model.",
      hints: [
        'The goal is to make source images "look like" target images so that the classifier trained on them generalizes.',
        "CycleGAN is commonly used here because it does not require paired source-target images.",
      ],
    },
    {
      id: "q-gan-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DANN (Domain-Adversarial Neural Networks) uses a GAN to generate target-domain images for training.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "DANN uses a gradient reversal layer to adversarially align feature distributions between source and target domains; it does not generate images — it operates purely in feature space.",
      hints: [
        "DANN adapts at the feature level, not the pixel level.",
        'The "adversarial" in DANN refers to a domain classifier, not a GAN image generator.',
      ],
    },
    {
      id: "q-gan-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CyCADA (Cycle-Consistent Adversarial Domain Adaptation) extends CycleGAN for domain adaptation by additionally enforcing:",
      options: [
        "Maximum mean discrepancy minimization in the feature space",
        "Semantic (task) consistency: the translated image must produce the same predictions as the original",
        "Spectral normalization of the adaptation network",
        "A multi-scale discriminator operating at three resolutions",
      ],
      correctAnswer: 1,
      explanation:
        "CyCADA adds a semantic consistency loss that ensures the task model (e.g., segmenter) gives the same output for the original and translated image, preventing the GAN from changing task-relevant content.",
      hints: [
        "Cycle-consistency ensures appearance round-trips; semantic consistency ensures the label does not change.",
        "Without this, a GAN could make stylistic changes that accidentally alter the semantic content relevant to the task.",
      ],
    },
  ],

  "federated-gan": [
    {
      id: "q-gan-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Federated GANs address which privacy concern in distributed GAN training?",
      options: [
        "The generator memorizing individual training examples",
        "Raw private data never leaving local clients — only model updates (gradients or parameters) are shared",
        "The discriminator accessing test data from other clients",
        "Centralized storage of model weights on a public server",
      ],
      correctAnswer: 1,
      explanation:
        "In federated learning, clients train locally and share only model updates with a central aggregator, keeping sensitive data (e.g., medical records) on-device and never exposing raw samples.",
      hints: [
        "Federated learning\'s key promise is that raw data stays local — only derived information is communicated.",
        "The privacy concern is about data exposure, not model exposure.",
      ],
    },
    {
      id: "q-gan-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Sharing gradient updates in federated GAN training is completely safe from privacy attacks.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Gradient inversion attacks (e.g., Zhu et al.) can reconstruct private training images from shared gradients; differential privacy mechanisms must be added to provide formal privacy guarantees.",
      hints: [
        "Gradients carry information about the data used to compute them — this can be exploited.",
        "Differential privacy adds calibrated noise to gradients to limit information leakage.",
      ],
    },
    {
      id: "q-gan-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MD-GAN (Multi-Discriminator GAN for federated learning) assigns one discriminator per client and aggregates only the generator. What is the key advantage?",
      options: [
        "It eliminates the need for a central server entirely",
        "Each discriminator trains on local data, and the generator must fool all of them, naturally aggregating diverse local distributions without sharing data",
        "It reduces communication cost by sharing only discriminator gradients",
        "It allows clients to train on different GAN architectures simultaneously",
      ],
      correctAnswer: 1,
      explanation:
        "By keeping discriminators local and only sharing/aggregating the generator, MD-GAN forces the generator to produce samples realistic across all local data distributions, effectively learning a global distribution from siloed private data.",
      hints: [
        "The generator is the shared model; discriminators are local validators.",
        "A generator that fools multiple independent discriminators must model a diverse global distribution.",
      ],
    },
  ],

  "energy-based-gan": [
    {
      id: "q-gan-kp26-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In an Energy-Based GAN (EBGAN), the discriminator is reinterpreted as an energy function. Low energy corresponds to:",
      options: [
        "High reconstruction error (unusual, fake-like regions)",
        "Realistic-looking samples (real data manifold)",
        "High gradient magnitude of the generator",
        "Low temperature in the Boltzmann distribution",
      ],
      correctAnswer: 1,
      explanation:
        "EBGAN trains the discriminator as an autoencoder whose reconstruction error serves as energy; real images are reconstructed well (low energy) and fake images have high reconstruction error (high energy).",
      hints: [
        "Energy-based models assign low energy to data points and high energy to non-data regions.",
        "An autoencoder reconstruction error naturally gives low values to in-distribution samples.",
      ],
    },
    {
      id: "q-gan-kp26-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "EBGAN uses an autoencoder as the discriminator, where reconstruction error acts as the energy.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The EBGAN discriminator is an autoencoder; it assigns low energy (low reconstruction loss) to real images and high energy to generated images, and the generator is trained to produce low-energy samples.",
      hints: [
        "Autoencoders learn to compress and reconstruct training data; they naturally generalize poorly to out-of-distribution inputs.",
        'High reconstruction error = high energy = "this sample looks fake".',
      ],
    },
    {
      id: "q-gan-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BEGAN (Boundary Equilibrium GAN) introduces an equilibrium mechanism controlled by hyperparameter γ. What does γ control?",
      options: [
        "The learning rate ratio between generator and discriminator",
        "The balance between image diversity and visual quality (γ = E[L(G(z))] / E[L(x)])",
        "The weight of the gradient penalty term",
        "The number of discriminator updates per generator update",
      ],
      correctAnswer: 1,
      explanation:
        "BEGAN\'s γ is a diversity ratio: high γ encourages diverse outputs at some quality cost; low γ produces sharper images with less variety. The training dynamically adjusts to maintain this ratio.",
      hints: [
        "γ = 1 means the discriminator puts equal effort into reconstructing real and fake images.",
        "Lowering γ makes the discriminator focus more on real images, improving quality at the cost of diversity.",
      ],
    },
  ],

  "diffusion-vs-gan": [
    {
      id: "q-gan-kp27-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DDPM (Ho et al. 2020) trains a noise prediction network ε_θ. The simplified training objective (after dropping the weighting term) is ___.",
      options: [
        "E[||x₀ − x_θ(x_t, t)||²]  [predict the original image]",
        "E[||ε − ε_θ(√ᾱ_t·x₀ + √(1−ᾱ_t)·ε, t)||²]  [predict the added noise]",
        "E[KL(q(x_{t-1}|x_t,x₀) || p_θ(x_{t-1}|x_t))]  [KL between forward and reverse]",
        "E[log p_θ(x₀)]  [maximum likelihood]",
      ],
      correctAnswer: 1,
      explanation:
        "Ho et al. (2020) showed empirically that the simplified objective L_simple = E_{t,x₀,ε}[||ε − ε_θ(x_t, t)||²] works better than the full ELBO. Here x_t = √ᾱ_t·x₀ + √(1−ᾱ_t)·ε via the reparameterisation (ᾱ_t = Π_{s=1}^t (1−β_s)), and ε ~ N(0,I).",
      hints: [
        "The key insight is to reparameterise: given x₀ and t, x_t can be sampled in closed form as √ᾱ_t·x₀ + √(1−ᾱ_t)·ε.",
        "Training the network to predict the noise ε (rather than the mean of the reverse process) empirically gives better sample quality.",
      ],
    },
    {
      id: "q-gan-kp27-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DDPM uses a variance schedule {β_t}. Ho et al. (2020) used a linear schedule from β₁ = 10⁻⁴ to β_T = 0.02 with T = 1000. A key property of this schedule is that ___.",
      options: [
        "x_T is perfectly Gaussian N(0,I) at any finite T",
        "x_T ≈ N(0,I) because ᾱ_T = Π(1−β_t) ≈ 0 for large T with the linear schedule",
        "β_t must be learned; fixed schedules are theoretically suboptimal",
        "The schedule guarantees mode collapse does not occur",
      ],
      correctAnswer: 1,
      explanation:
        "With T=1000 and β_t linearly increasing, ᾱ_T = Π_{t=1}^T (1−β_t) → 0, so x_T ≈ √ᾱ_T·x₀ + √(1−ᾱ_T)·ε ≈ ε ~ N(0,I). The forward process completely destroys the signal by T, which is what allows us to learn the reverse process from pure Gaussian noise.",
      hints: [
        "ᾱ_t is the cumulative product of (1−β_s) for s=1 to t. As t→T, this product approaches 0.",
        "When ᾱ_T ≈ 0, x_T ≈ √1·ε = ε ~ N(0,I), making the terminal distribution approximately standard Gaussian.",
      ],
    },
    {
      id: "q-gan-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DDIM (Song et al. 2020) accelerates sampling from DDPMs by using a non-Markovian reverse process. Setting η = 0 in DDIM makes the sampling ___.",
      options: [
        "Equivalent to the original DDPM stochastic sampling",
        "Fully deterministic: the same latent x_T always produces the same image x₀",
        "Faster but stochastic due to injected noise",
        "Equivalent to score-based generation with Langevin dynamics",
      ],
      correctAnswer: 1,
      explanation:
        "In DDIM, the reverse step is x_{t-1} = √ᾱ_{t-1}·x̂₀ + √(1−ᾱ_{t-1}−σ_t²)·ε_θ(x_t,t) + σ_t·ε. When η=0, σ_t=0 for all t, eliminating all stochastic noise and making sampling deterministic. This means x_T uniquely determines x₀, enabling semantic interpolation in latent space.",
      hints: [
        "η controls the amount of stochastic noise injected at each reverse step. η=0 means σ_t=0 everywhere.",
        "Deterministic mapping means you can interpolate between two x_T noise codes and smoothly interpolate the generated images.",
      ],
    },
  ],

  "gan-disentanglement": [
    {
      id: "q-gan-kp28-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A disentangled latent representation in GANs means that:",
      options: [
        "The latent space has fewer dimensions than the image space",
        "Each latent dimension independently controls a single semantic factor of variation",
        "The generator and discriminator share latent codes",
        "The latent code is regularized to be sparse",
      ],
      correctAnswer: 1,
      explanation:
        "Disentanglement means individual latent dimensions correspond to interpretable, independent attributes (e.g., pose, lighting, hair color), enabling precise, isolated control over image attributes.",
      hints: [
        "A disentangled code is one where you can change one factor without affecting others.",
        "StyleGAN\'s W space is more disentangled than Z; InfoGAN\'s c codes are designed for disentanglement.",
      ],
    },
    {
      id: "q-gan-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "InterFaceGAN achieves controllable face attribute editing by finding linear decision boundaries in the StyleGAN latent space.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "InterFaceGAN trains binary SVMs on attribute labels in StyleGAN\'s W space, discovering that attributes like age, smile, and pose correspond to linear hyperplanes in the latent space.",
      hints: [
        "Linear separability in latent space is a signature of disentangled representations.",
        "Moving along the normal direction of an SVM hyperplane changes the corresponding attribute.",
      ],
    },
    {
      id: "q-gan-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Perceptual Path Length (PPL) metric measures GAN disentanglement by:",
      options: [
        "Computing the FID between interpolated and real images",
        "Measuring the average perceptual change per unit step along interpolation paths in the latent space",
        "Counting the number of distinct modes in the generated distribution",
        "Evaluating the reconstruction error of an encoder trained on generated images",
      ],
      correctAnswer: 1,
      explanation:
        "PPL computes the expected VGG perceptual distance between images generated by slightly perturbed latent codes; a smooth, disentangled space produces small, consistent perceptual changes per unit step.",
      hints: [
        "A well-disentangled space should change images smoothly and predictably — no sudden jumps.",
        "Low PPL indicates that equal steps in latent space produce equal-sized perceptual changes.",
      ],
    },
  ],

  "clip-guided-gan": [
    {
      id: "q-gan-kp29-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CLIP-guided GAN generation steers the generator toward a text prompt by:",
      options: [
        "Fine-tuning the generator on CLIP-generated captions of training images",
        "Computing the CLIP similarity between the generated image and the text prompt and backpropagating through the generator",
        "Using CLIP as a discriminator that classifies real vs. fake images",
        "Encoding the text prompt as a conditioning vector fed into the generator input",
      ],
      correctAnswer: 1,
      explanation:
        "At inference time, CLIP-guided methods optimize the latent code (or generator weights) by maximizing the cosine similarity between the CLIP image embedding of G(z) and the CLIP text embedding of the prompt.",
      hints: [
        "No additional training is needed — CLIP provides a differentiable loss signal at test time.",
        "Gradients from CLIP flow back through the frozen generator to update z.",
      ],
    },
    {
      id: "q-gan-kp29-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "CLIP-guided GAN generation (e.g., BigSleep, DALL-E-like approaches) requires retraining the GAN for each new text prompt.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "CLIP guidance uses the pre-trained GAN as a frozen generator and optimizes only the latent code z using CLIP similarity as the loss, requiring no retraining of the GAN for new prompts.",
      hints: [
        "The GAN weights are fixed; only z (or a small adapter) is optimized at inference.",
        "This is the key advantage of CLIP guidance: prompt-following without retraining.",
      ],
    },
    {
      id: "q-gan-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "StyleCLIP\'s \"Global Direction\" method finds a text-driven latent direction in StyleGAN\'s W+ space by:",
      options: [
        "Training a separate encoder on CLIP-labeled StyleGAN images",
        "Computing the CLIP text-image direction (Δt) and mapping it to the W+ space via a learned mapper network or sensitivity-weighted projection",
        "Fine-tuning all StyleGAN generator weights using CLIP loss",
        "Solving a constrained optimization over the W+ space using CLIP as the objective function directly",
      ],
      correctAnswer: 1,
      explanation:
        "StyleCLIP\'s global direction Δw is computed by projecting the CLIP space direction Δt into W+ space, weighted by channel-wise sensitivity of CLIP features, enabling efficient single-direction attribute editing.",
      hints: [
        'A "global" direction applies the same Δw offset to any starting latent code.',
        "The projection uses the Jacobian of CLIP features with respect to StyleGAN style codes.",
      ],
    },
  ],

  "gan-training-dynamics": [
    {
      id: "q-gan-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the GAN minimax game, a Nash equilibrium is reached when:",
      options: [
        "The generator loss reaches zero and the discriminator loss reaches one",
        "Neither the generator nor the discriminator can unilaterally improve its objective by changing its strategy — p_g = p_r and D*(x) = 1/2",
        "The discriminator achieves 100% accuracy on real images",
        "The generator and discriminator have equal parameter counts",
      ],
      correctAnswer: 1,
      explanation:
        "At Nash equilibrium, the generator produces the true data distribution (p_g = p_r) so the discriminator cannot distinguish real from fake; it outputs 1/2 everywhere. Neither player benefits from a unilateral change — the game is in equilibrium.",
      hints: [
        "Nash equilibrium means no player can improve by changing strategy while the other holds fixed.",
        "When p_g = p_r, the best discriminator can do is guess randomly — D*(x) = 1/2.",
      ],
    },
    {
      id: "q-gan-kp31-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "GAN training is guaranteed to converge to the Nash equilibrium when both networks use gradient descent with a sufficiently small learning rate.",
      correctAnswer: "False",
      explanation:
        "Standard gradient descent on the minimax objective does not guarantee convergence to Nash equilibrium; the two-player game can exhibit oscillation, mode collapse, or divergence — convergence is an active research problem requiring careful tuning and stabilization techniques.",
      hints: [
        "Gradient descent finds local optima for single objectives; the minimax game has fundamentally different dynamics.",
        "Oscillating loss curves in GAN training are a common symptom of convergence failure.",
      ],
    },
    {
      id: "q-gan-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Training instability in GANs is often attributed to which mathematical property of the JS divergence when the support of p_r and p_g do not overlap?",
      options: [
        "JS divergence becomes negative when supports are disjoint",
        "JS divergence saturates at log 2 regardless of how far apart p_r and p_g are, providing zero gradient to the generator",
        "JS divergence is unbounded, causing exploding gradients in the discriminator",
        "JS divergence requires continuous distributions and fails for discrete latent codes",
      ],
      correctAnswer: 1,
      explanation:
        "When p_r and p_g have disjoint supports (common in high dimensions), the optimal discriminator is perfect and D*(x) is 0 or 1 everywhere; JS(p_r||p_g) = log 2 — a constant — providing no gradient signal to train the generator. This motivates Wasserstein GAN.",
      hints: [
        "If the discriminator perfectly separates real from fake, log(1 - D(G(z))) = log(0) and the gradient vanishes.",
        "The Wasserstein distance does not saturate even for disjoint distributions — this is why WGAN was proposed.",
      ],
    },
  ],

  "conditional-gan-advanced": [
    {
      id: "q-gan-kp32-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "AC-GAN (Auxiliary Classifier GAN) differs from a standard conditional GAN in that:",
      options: [
        "AC-GAN uses a separate classifier network instead of a discriminator",
        "The AC-GAN discriminator outputs both a real/fake probability and a class prediction, adding a classification loss to both generator and discriminator training",
        "AC-GAN conditions only the generator, not the discriminator, on the class label",
        "AC-GAN replaces class conditioning with attribute vectors",
      ],
      correctAnswer: 1,
      explanation:
        "AC-GAN augments the discriminator with an auxiliary classifier head that predicts the class label of each input; the combined loss (adversarial + classification) encourages the generator to produce class-consistent images and the discriminator to recognize classes.",
      hints: [
        "The 'AC' stands for Auxiliary Classifier — the discriminator has an extra head.",
        "Adding classification loss provides richer gradient signal for class-conditional generation.",
      ],
    },
    {
      id: "q-gan-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The projection discriminator (Miyato & Koyama, 2018) conditions the discriminator on the class label by computing the inner product between the final feature vector and the class embedding, rather than concatenating the label.",
      correctAnswer: "True",
      explanation:
        "The projection discriminator computes D(x, y) = v^T phi(x) + psi(phi(x)), where v is the class embedding vector and phi(x) is the feature vector; this multiplicative interaction is theoretically motivated by the optimal conditional discriminator form.",
      hints: [
        "Inner product (projection) conditioning is multiplicative — the class embedding gates the feature representation.",
        "Concatenation of labels is simpler but projection is more principled for class-conditional discrimination.",
      ],
    },
    {
      id: "q-gan-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Class-conditional Batch Normalization (cBN) in conditional GANs injects class information by:",
      options: [
        "Concatenating the one-hot class vector to the batch before normalization",
        "Learning class-specific affine parameters (gamma, beta) for each batch norm layer, derived from the class embedding",
        "Applying a different learning rate for each class during training",
        "Using a separate batch normalization layer for each class and routing activations accordingly",
      ],
      correctAnswer: 1,
      explanation:
        "cBN replaces fixed (gamma, beta) batch norm parameters with class-conditional affine parameters predicted by a small network from the class embedding; this allows the normalization statistics to adapt to each class, controlling the style of synthesized images.",
      hints: [
        "Standard BN has fixed learned (gamma, beta); cBN makes these class-dependent.",
        "This is the same mechanism used in AdaIN for style transfer — the scale and shift encode style (here: class).",
      ],
    },
  ],

  "image-to-image-gan": [
    {
      id: "q-gan-kp33-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The pix2pix framework uses a combined loss function for image-to-image translation. What are the two components?",
      options: [
        "Perceptual loss (VGG features) and cycle-consistency loss",
        "Adversarial loss (cGAN) and L1 pixel reconstruction loss",
        "Wasserstein loss and gradient penalty",
        "Classification loss and identity loss",
      ],
      correctAnswer: 1,
      explanation:
        "Pix2pix combines a conditional adversarial loss (the discriminator evaluates (input, output) pairs) with an L1 reconstruction loss that encourages outputs to be close to ground truth, preventing the GAN from ignoring the input condition.",
      hints: [
        "The L1 term prevents hallucination by anchoring the output close to the target image.",
        "The adversarial term encourages photorealism beyond what L1 alone achieves.",
      ],
    },
    {
      id: "q-gan-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CycleGAN's identity loss term penalizes the generator when it changes an image that already belongs to the target domain, helping preserve color and style.",
      correctAnswer: "True",
      explanation:
        "The identity loss L_identity = ||G_AB(b) - b|| encourages G_AB to act as an identity mapping when given images already in domain B, preventing the generator from unnecessarily altering color distributions of target-domain inputs.",
      hints: [
        "Without identity loss, a photo-to-painting generator might change the color of a painting fed as input.",
        "Identity loss acts as a regularizer for the generator's behavior on target-domain images.",
      ],
    },
    {
      id: "q-gan-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SPADE (Spatially-Adaptive Denormalization, Park et al. 2019) improves semantic image synthesis over pix2pix by:",
      options: [
        "Replacing U-Net with a fully convolutional network for faster inference",
        "Using the semantic segmentation map to modulate the normalization parameters (gamma, beta) spatially at each layer, preserving semantic information that would be washed out by standard normalization",
        "Adding a perceptual loss computed in SPADE feature space instead of VGG space",
        "Using a multi-scale discriminator that operates at three image resolutions simultaneously",
      ],
      correctAnswer: 1,
      explanation:
        "Standard normalization destroys semantic information encoded in activations; SPADE conditions gamma and beta on the spatially-varying segmentation map, allowing the network to respect the semantic layout at every resolution of the generator.",
      hints: [
        "Instance normalization normalizes channel statistics — this destroys spatial semantic information from the layout.",
        "SPADE's spatially-varying scale and shift lets each semantic region have its own normalization.",
      ],
    },
  ],

  "text-to-image-advanced": [
    {
      id: "q-gan-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DALL-E 1 (OpenAI, 2021) is not a GAN but uses a two-stage approach. What is the first stage?",
      options: [
        "A diffusion model that generates low-resolution images from text",
        "A discrete VAE (dVAE) that compresses images into discrete visual tokens",
        "A GAN that generates image patches for text-conditioned assembly",
        "A CLIP model that directly generates image embeddings from text",
      ],
      correctAnswer: 1,
      explanation:
        "DALL-E 1 first trains a discrete VAE (dVAE) to encode images into a grid of discrete tokens (8192-way codebook); then it trains a Transformer autoregressive model on text tokens followed by image tokens, enabling text-to-image generation by sampling image token sequences.",
      hints: [
        "dVAE is the VQ-VAE-like component that converts images to discrete codes — a 'visual vocabulary'.",
        "Stage 2 is a Transformer that predicts image tokens given text tokens — like language modeling over image codes.",
      ],
    },
    {
      id: "q-gan-kp34-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "AttnGAN generates images from text descriptions by computing word-level attention to align specific words with specific spatial regions of the generated image at multiple resolutions.",
      correctAnswer: "True",
      explanation:
        "AttnGAN uses a multi-stage generator where each stage applies word-level cross-attention, allowing the model to focus on specific words when generating corresponding image regions — e.g., 'red beak' guides the beak region specifically.",
      hints: [
        "Word-level attention is finer-grained than using a single sentence vector for the entire image.",
        "The multi-stage architecture generates progressively higher-resolution images with increasingly refined word alignment.",
      ],
    },
    {
      id: "q-gan-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "StackGAN++ extends StackGAN by:",
      options: [
        "Adding a third stage to generate 512x512 images from 256x256",
        "Using a tree-structured multi-stage architecture with multiple generators and discriminators at different scales, with color consistency regularization across scales",
        "Replacing the text encoder with a pre-trained CLIP model",
        "Adding a cycle-consistency loss between the generated image and the input text",
      ],
      correctAnswer: 1,
      explanation:
        "StackGAN++ uses a tree-like architecture where multiple generators at different scales are conditioned jointly, adding color consistency regularization that penalizes color distribution differences between scales, improving visual coherence.",
      hints: [
        "StackGAN++ is 'tree-structured' rather than just linear stage-1 to stage-2.",
        "Color consistency ensures that early (small) and late (large) stages produce consistent color distributions.",
      ],
    },
  ],

  "3d-generation-advanced": [
    {
      id: "q-gan-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "PointGAN and related GAN architectures for 3D point cloud generation address which challenge compared to voxel-based 3D GANs?",
      options: [
        "Point clouds cannot represent smooth surfaces, so PointGAN adds mesh smoothing post-processing",
        "Point clouds are unordered sets, requiring permutation-invariant architectures (e.g., PointNet-based discriminators) instead of convolutional ones",
        "Point clouds require color information at each point, which voxels cannot represent",
        "Point clouds are too sparse to train discriminators without extensive data augmentation",
      ],
      correctAnswer: 1,
      explanation:
        "Unlike voxels or images, point clouds are unordered sets of 3D coordinates; discriminators must be permutation-invariant. PointNet-based discriminators process point sets using shared MLPs and symmetric aggregation functions (max pooling) to handle this unordered nature.",
      hints: [
        "The order of points in a point cloud is arbitrary — the same shape can be represented with points in any order.",
        "Convolutional networks assume spatial regularity (grids), which point clouds don't have.",
      ],
    },
    {
      id: "q-gan-kp35-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Implicit surface GANs (e.g., using implicit neural representations or occupancy networks) can generate arbitrarily high-resolution 3D shapes without the cubic memory cost of voxel grids.",
      correctAnswer: "True",
      explanation:
        "Implicit representations define shape as a continuous function f(x, y, z) -> occupancy or SDF; resolution is determined at query time rather than fixed by a grid, eliminating the O(n^3) memory bottleneck of voxels and enabling high-fidelity shape generation.",
      hints: [
        "An implicit function can be evaluated at any 3D point at query time — there is no discretization.",
        "Voxel resolution is fixed at training; implicit representations can be queried at any resolution.",
      ],
    },
    {
      id: "q-gan-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "pi-GAN (Periodic Implicit Generative Adversarial Networks) uses which representation for 3D-aware image synthesis?",
      options: [
        "Voxel grids decoded by a 3D U-Net",
        "A SIREN (sinusoidal activation) MLP as the NeRF-like scene representation, conditioned on a latent code to enable GAN-based 3D generation",
        "Tri-plane features projected onto three orthogonal 2D planes",
        "Point clouds rendered via differentiable point rasterization",
      ],
      correctAnswer: 1,
      explanation:
        "pi-GAN represents each generated scene as a SIREN-based implicit neural radiance field conditioned on a style code from a mapping network; the GAN trains a distribution over such NeRFs, enabling multi-view consistent 3D generation from a single 2D discriminator.",
      hints: [
        "SIREN uses sine activation functions that are well-suited for representing smooth 3D shapes and radiance fields.",
        "pi-GAN's key contribution is learning a distribution of NeRF scenes, not just a single scene.",
      ],
    },
  ],

  "video-gan-advanced": [
    {
      id: "q-gan-kp36-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DVD-GAN (Dual Video Discriminator GAN) uses two separate discriminators for video generation. What do they evaluate?",
      options: [
        "One discriminator evaluates color fidelity; the other evaluates spatial resolution",
        "One discriminator evaluates single-frame spatial quality; the other evaluates temporal coherence across sampled frames",
        "One discriminator handles the foreground; the other handles the background",
        "One discriminator operates in pixel space; the other in frequency (Fourier) space",
      ],
      correctAnswer: 1,
      explanation:
        "DVD-GAN's spatial discriminator (D_S) evaluates individual frames for photorealism while the temporal discriminator (D_T) evaluates a sparse subset of frames jointly for motion consistency, disentangling spatial quality from temporal coherence during training.",
      hints: [
        "Spatial quality and temporal consistency are different properties — DVD-GAN uses specialized discriminators for each.",
        "The temporal discriminator receives multiple frames simultaneously to assess inter-frame coherence.",
      ],
    },
    {
      id: "q-gan-kp36-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Temporal coherence in video GANs can be enforced by adding a loss that penalizes optical flow inconsistencies between consecutive generated frames.",
      correctAnswer: "True",
      explanation:
        "Warp-based temporal consistency losses compute optical flow between adjacent frames and penalize the difference between the warped previous frame and the current frame, directly encouraging smooth, physically plausible motion in generated videos.",
      hints: [
        "Optical flow estimates how pixels move between frames — inconsistency in flow means flickering or unnatural motion.",
        "This loss can be applied without a temporal discriminator as an additional regularizer.",
      ],
    },
    {
      id: "q-gan-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TGAN (Temporal GAN) decomposes video generation into temporal and spatial components. How does it handle temporal modeling?",
      options: [
        "It generates all frames simultaneously with a 3D convolutional generator",
        "It uses a temporal generator that samples a sequence of latent codes from a recurrent network, then an image generator that independently renders each frame from its latent code",
        "It generates only keyframes and interpolates intermediate frames using optical flow",
        "It uses a Transformer that attends over all frame positions jointly",
      ],
      correctAnswer: 1,
      explanation:
        "TGAN separates concerns: a recurrent temporal generator produces a sequence of latent codes encoding motion dynamics, then an image generator (shared across time steps) renders each code into a frame independently, enabling disentangled control of content and motion.",
      hints: [
        "Separation of temporal (motion) and spatial (appearance) generation is a common design pattern in video GANs.",
        "The shared image generator ensures consistent appearance across frames given consistent latent codes.",
      ],
    },
  ],

  "gan-inversion-advanced": [
    {
      id: "q-gan-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In-domain GAN inversion (In-Domain GAN, Zhu et al. 2020) addresses which limitation of standard encoder-based inversion?",
      options: [
        "Standard encoders are too slow for real-time editing applications",
        "Standard encoders map images to latent codes outside the generator's learned manifold, reducing editability; in-domain inversion constrains codes to remain on the manifold via an additional domain-regularized training objective",
        "Standard encoders cannot handle high-resolution images above 256x256",
        "Standard encoders require class labels that are unavailable for real images",
      ],
      correctAnswer: 1,
      explanation:
        "Encoder-based inversion can find z values that reconstruct the image but lie off the latent space manifold, making editing with semantic directions unreliable. In-domain inversion adds a discriminator-based regularizer to keep inverted codes within the generator's learned distribution.",
      hints: [
        "The latent space has a 'valid' region where the generator produces meaningful images; out-of-distribution codes behave unpredictably.",
        "Domain regularization penalizes codes that the discriminator identifies as atypical for the learned latent distribution.",
      ],
    },
    {
      id: "q-gan-kp37-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "GAN encoders trained with a perceptual loss (VGG feature matching) in addition to pixel reconstruction loss tend to produce higher-quality inversions than those trained with pixel loss alone.",
      correctAnswer: "True",
      explanation:
        "Perceptual loss measures similarity in VGG feature space, capturing semantic and textural similarity that pixel-level L2 loss misses; this leads to inversions that better preserve perceptually important attributes like texture and structure.",
      hints: [
        "Pixel loss treats all pixels equally; perceptual loss weights semantically important regions more.",
        "VGG features encode both low-level textures and high-level semantic content.",
      ],
    },
    {
      id: "q-gan-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The editability-distortion tradeoff in StyleGAN inversion refers to the observation that:",
      options: [
        "Higher-resolution inversions have worse editability due to overfitting",
        "Latent codes that achieve lower reconstruction distortion (closer to the original image) tend to lie further from the editable W space, reducing the effectiveness of semantic editing directions",
        "Increasing the number of optimization steps always improves both distortion and editability",
        "The W+ space provides better editability than W but worse distortion than pixel optimization",
      ],
      correctAnswer: 1,
      explanation:
        "Optimization-based inversion can minimize reconstruction error to near zero by using codes outside the learned W space, but such codes are 'out-of-distribution' and semantic editing directions (trained on W) do not transfer well — fidelity and editability are in tension.",
      hints: [
        "Low distortion means the reconstructed image closely matches the original.",
        "High editability means that applying a semantic direction (e.g., +age) produces the expected change.",
      ],
    },
  ],

  "diffusion-gan-comparison": [
    {
      id: "q-gan-kp38-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Diffusion models (e.g., DDPM) achieve better mode coverage than GANs primarily because:",
      options: [
        "Diffusion models use a larger generator network with more parameters",
        "Diffusion models are trained with a likelihood-based objective (ELBO) that penalizes missing modes, whereas GAN generators can collapse to a subset of modes without explicit penalty",
        "Diffusion models do not require a discriminator, eliminating mode collapse",
        "Diffusion models use classifier-free guidance which prevents mode collapse by definition",
      ],
      correctAnswer: 1,
      explanation:
        "Likelihood-based objectives penalize probability zero on real data — the model must assign positive density everywhere. GANs optimize an adversarial objective that has no such guarantee; a generator can collapse to a few modes that fool the discriminator without covering all real data modes.",
      hints: [
        "Likelihood-based training requires the model to explain every training example with non-zero probability.",
        "Mode collapse in GANs occurs because the adversarial loss does not explicitly penalize ignoring modes.",
      ],
    },
    {
      id: "q-gan-kp38-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "GANs generally generate samples faster than diffusion models because GANs require only a single forward pass through the generator, while diffusion models require hundreds of sequential denoising steps.",
      correctAnswer: "True",
      explanation:
        "GAN generation is a single forward pass through G(z) — milliseconds per sample. DDPM requires T=1000 sequential denoising steps; even with accelerated samplers (DDIM, DPM-Solver, ~10-50 steps), diffusion sampling remains significantly slower than a single GAN forward pass.",
      hints: [
        "GAN generation: z -> G(z) is one step. DDPM: x_T -> x_{T-1} -> ... -> x_0 is T steps.",
        "This sampling speed advantage is a practical reason GANs are still preferred for real-time applications.",
      ],
    },
    {
      id: "q-gan-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Denoising Diffusion GAN (Xiao et al. 2022) combines GANs and diffusion to address sampling speed. Its key idea is:",
      options: [
        "Using a GAN discriminator to replace the DDPM noise prediction network",
        "Modeling each reverse diffusion step as a multimodal distribution estimated by a conditional GAN, enabling accurate large denoising steps and reducing the required number of steps to ~4",
        "Training a GAN to distill a pre-trained DDPM into a single-step generator",
        "Using GAN-generated samples as data augmentation for diffusion model training",
      ],
      correctAnswer: 1,
      explanation:
        "Standard DDPM assumes each reverse step is Gaussian; Denoising Diffusion GAN uses a conditional GAN to model the complex multimodal reverse distribution at each step, allowing much larger steps (fewer total steps) without sacrificing accuracy.",
      hints: [
        "The key insight: if each denoising step can be accurately modeled with a GAN, fewer steps are needed.",
        "The bottleneck in DDPM is that each step must be Gaussian-small to stay accurate — a GAN removes this constraint.",
      ],
    },
  ],

  "gan-applications-advanced": [
    {
      id: "q-gan-kp39-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "GAN-based data augmentation for rare medical imaging classes (e.g., rare tumor subtypes) aims to:",
      options: [
        "Replace the rare-class images with generated samples to balance class frequencies for training downstream classifiers",
        "Supplement real rare-class images with synthetic ones to mitigate class imbalance and improve downstream classifier sensitivity on the rare class",
        "Generate new patient records that can be used in clinical trials instead of recruiting rare patients",
        "Reduce the annotation burden by auto-labeling generated images with a separate classifier",
      ],
      correctAnswer: 1,
      explanation:
        "GAN augmentation for rare classes supplements (not replaces) real data; the goal is to reduce class imbalance and improve classifier performance on underrepresented classes, but generated samples must be validated to ensure they are realistic and correctly labeled.",
      hints: [
        "Class imbalance causes classifiers to underperform on rare classes — augmentation directly addresses this.",
        "Supplementing real data with synthetic data is preferable to replacing it, since real data quality is verified.",
      ],
    },
    {
      id: "q-gan-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CTGAN (Conditional Tabular GAN) is specifically designed to generate synthetic tabular data by modeling the complex non-Gaussian, multi-modal distributions of continuous and discrete columns jointly.",
      correctAnswer: "True",
      explanation:
        "CTGAN uses mode-specific normalization (Variational Gaussian Mixture Model per column) to handle non-Gaussian continuous distributions and conditional generation to handle class imbalance in discrete columns, making it the standard approach for synthetic tabular data generation.",
      hints: [
        "Tabular data has mixed types (numeric, categorical) and complex distributions — standard GANs assume continuous unimodal data.",
        "CTGAN's mode normalization explicitly models multi-modal distributions that standard batch normalization would distort.",
      ],
    },
    {
      id: "q-gan-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In face reenactment using GANs (e.g., Face2Face, Deep Video Portraits), which component is typically NOT generated by the GAN?",
      options: [
        "The facial texture synthesis",
        "The source identity features that are preserved from the target image",
        "The 3D morphable model (3DMM) fitting that estimates head pose and expression from the driving video",
        "The blending mask used to composite the synthesized face onto the background",
      ],
      correctAnswer: 2,
      explanation:
        "3DMM fitting (using model-based computer vision) extracts pose and expression parameters from the driving video; the GAN synthesizes the face texture/appearance conditioned on these parameters. The 3D fitting is typically a classical optimization step, not a GAN component.",
      hints: [
        "Face reenactment pipelines combine classical 3D face fitting with neural rendering — not everything is a GAN.",
        "The 3DMM provides the geometric scaffold; the GAN provides the photorealistic appearance.",
      ],
    },
  ],

  "gan-evaluation-advanced": [
    {
      id: "q-gan-kp40-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Kernel Inception Distance (KID) differs from FID in that:",
      options: [
        "KID uses a different pre-trained network (VGG instead of Inception)",
        "KID computes an unbiased estimate using the Maximum Mean Discrepancy (MMD) between feature distributions, avoiding the Gaussian assumption of FID and being unbiased for any sample size",
        "KID requires human raters to evaluate image quality while FID is fully automated",
        "KID measures temporal coherence in video, while FID measures spatial quality in images",
      ],
      correctAnswer: 1,
      explanation:
        "FID fits Gaussians to feature distributions (introducing approximation error) and has a finite-sample bias. KID uses polynomial MMD directly on features, is unbiased even with small sample sizes, and does not assume Gaussian feature distributions.",
      hints: [
        "FID's Gaussian assumption can introduce errors when feature distributions are non-Gaussian.",
        "MMD is a kernel-based test of distributional equality that avoids parametric assumptions.",
      ],
    },
    {
      id: "q-gan-kp40-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Inception Score (IS) measures both sample quality and diversity by evaluating the entropy of the marginal label distribution and the conditional label distribution over generated images.",
      correctAnswer: "True",
      explanation:
        "IS = exp(E[KL(p(y|x) || p(y))]): high quality means p(y|x) is sharp (low entropy — one clear class); high diversity means p(y) is flat (high entropy — many classes generated). IS is high when each image looks like a clear object AND many different classes are generated.",
      hints: [
        "For a sharp image, the classifier is confident about its class — p(y|x) has low entropy.",
        "For diverse outputs, the marginal p(y) should be uniform — all classes generated equally.",
      ],
    },
    {
      id: "q-gan-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The diversity-fidelity tradeoff in GAN generation, as measured by precision and recall, implies that:",
      options: [
        "High FID always means both low precision and low recall",
        "A GAN can achieve high precision (sharp, realistic samples) at the cost of low recall (missing real data modes), and vice versa — these objectives are in tension and must be balanced",
        "Truncation trick simultaneously improves both precision and recall for any truncation threshold",
        "Precision and recall can both be maximized by training with more discriminator steps per generator step",
      ],
      correctAnswer: 1,
      explanation:
        "Precision (fidelity) and recall (diversity) are in tension: truncating the latent distribution improves sample quality (precision) but reduces coverage of real data modes (recall). This tradeoff is fundamental to generative modeling and motivates reporting both metrics alongside FID.",
      hints: [
        "The truncation trick in StyleGAN shows this tradeoff: truncating z improves image quality but reduces diversity.",
        "A model that generates only high-quality but repetitive images has high precision and low recall.",
      ],
    },
  ],

  "gan-inversion": [
    {
      id: "q-gan-kp30-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "GAN inversion refers to the process of:",
      options: [
        "Training a GAN in reverse, from images to latent codes",
        "Finding a latent code z such that G(z) closely approximates a given real image x",
        "Inverting the discriminator to act as a generator",
        "Applying the inverse of the GAN loss to fine-tune a pre-trained model",
      ],
      correctAnswer: 1,
      explanation:
        "GAN inversion maps a real image back into the generator\'s latent space, enabling downstream editing by manipulating the found z (or w) and regenerating with G.",
      hints: [
        'Inversion is the "encoder" direction: image → latent, the reverse of generation (latent → image).',
        "Once inverted, you can edit the image by moving in the latent space and re-generating.",
      ],
    },
    {
      id: "q-gan-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Optimization-based GAN inversion (iteratively minimizing ||G(z) − x||) always achieves a more faithful reconstruction than encoder-based inversion.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Optimization-based inversion can minimize reconstruction error to near zero by over-fitting z to the specific image, whereas encoder-based inversion sacrifices reconstruction fidelity for speed and editability.",
      hints: [
        "Iterative optimization has more degrees of freedom to reduce reconstruction error.",
        'The tradeoff is that over-fitted z values may lie outside the "editable" region of the latent space.',
      ],
    },
    {
      id: "q-gan-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "e4e (Encoder for Editing) prioritizes editability over reconstruction quality in StyleGAN inversion by:",
      options: [
        "Using a larger encoder with more parameters to achieve both goals simultaneously",
        "Constraining predicted W+ codes to remain close to the W space (using a single w repeated across layers) where semantic directions are more consistent",
        "Applying L2 loss in CLIP feature space rather than pixel space",
        "Inverting into the Z space rather than W+ to preserve disentanglement",
      ],
      correctAnswer: 1,
      explanation:
        "e4e penalizes deviations from using a single style code across all layers (the W subspace), trading reconstruction fidelity for codes that remain in the well-behaved, semantically editable region of W.",
      hints: [
        "W+ allows different styles per layer (more expressive) but the extra degrees of freedom reduce editability.",
        "Codes close to W behave more predictably under semantic directions found by tools like InterFaceGAN.",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
