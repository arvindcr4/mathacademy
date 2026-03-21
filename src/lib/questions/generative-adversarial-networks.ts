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
        "At Nash equilibrium p_g = p_r, so D*(x) = 1/2 everywhere. Substituting into V gives V(D*,G) = −log 4 + 2\\cdotJS(p_r||p_g). Minimising over G is therefore equivalent to minimising the symmetric Jensen-Shannon divergence.",
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
        "Substituting D*(x) = p_r/(p_r+p_g) into the value function V(D*,G) gives V = −log 4 + 2\\cdotJS(p_r||p_g). Minimising over G is therefore equivalent to minimising the symmetric Jensen-Shannon divergence.",
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
        "When D(G(z)) \\approx 0 (generator is weak), log(1−D(G(z))) saturates near log(1) \\approx 0 giving a near-zero gradient. −log D(G(z)) is large in the same regime, providing a strong gradient signal. The practical generator objective is therefore to minimise −log D(G(z)).",
      hints: [
        "Plot log(1−x) and −log(x) for x near 0 to see which has larger magnitude.",
        "Early in training D(G(z)) is very small - the saturating form gives almost no gradient to train the generator.",
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
        '"Mode" refers to a peak in the probability distribution - collapse means only one or a few modes are covered.',
      ],
    },
    {
      id: "q-gan-kp2-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "When the supports of p_r and p_g lie on disjoint low-dimensional manifolds in high-dimensional space, the JS divergence between them is always log 2, giving zero gradient to the generator.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Arjovsky & Bottou (2017) showed that when p_r and p_g are supported on disjoint manifolds (which is almost certain in high dimensions when p_g is parameterised by a low-dimensional noise), JS(p_r||p_g) = log 2 - a constant - producing zero gradient for the generator regardless of how far apart the distributions are.",
      hints: [
        "The penalty targets the gradient norm at interpolated points - not at real or fake points alone.",
        "The factor (||\\nablaD||\\_2 − 1)\\^2 pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
      ],
    },
  ],

  dcgan: [
    {
      id: "q-gan-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the DCGAN generator (Radford et al. 2015), a G_block with 4\\times4 kernel, stride 2, padding 1, applied to a 16\\times16 feature map produces an output of size ___.",
      options: ["8\\times8", "16\\times16", "32\\times32", "64\\times64"],
      correctAnswer: 2,
      explanation:
        "The transposed convolution output size formula is: n_out = (n_in − 1)\\cdotstride − 2\\cdotpadding + kernel = (16−1)\\cdot2 − 2\\cdot1 + 4 = 30 + 4 − 2 = 32. Each G_block doubles spatial dimensions. Starting from 4\\times4, four G_blocks produce 4\\to8\\to16\\to32\\to64.",
      hints: [
        "Transposed convolution (also called fractionally-strided convolution) upsamples. Formula: n_out = (n_in−1)\\cdots − 2p + k.",
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
      correctAnswer: 1,
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
        "In DCGAN, the discriminator uses Leaky ReLU with \\alpha = 0.2. For a negative pre-activation x = −3, the Leaky ReLU output is ___.",
      options: ["0", "−0.6", "3", "−3"],
      correctAnswer: 1,
      explanation:
        "Leaky ReLU(x) = x if x > 0, else \\alpha\\cdotx. For x = −3 and \\alpha = 0.2: output = 0.2 \\times (−3) = −0.6. This non-zero output for negative inputs prevents dead neurons and allows gradient flow through the discriminator even for negative activations.",
      hints: [
        "Standard ReLU would output 0 for x = −3. Leaky ReLU multiplies by the small slope \\alpha instead.",
        "\\alpha = 0.2 means negative activations leak through at 20% of their magnitude.",
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
      correctAnswer: 1,
      explanation:
        "The discriminator in a cGAN must verify both realism and label consistency - a real image paired with the wrong label should also be classified as fake.",
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
        "sup_{||f||_L \\leq 1} E_{x~p_r}[f(x)] − E_{x~p_g}[f(x)]",
        "inf_{\\gamma \\in \\Pi(p_r,p_g)} E_{(x,y)~\\gamma}[||x−y||]",
        "KL(p_r || p_g) + KL(p_g || p_r)",
        "E_{x~p_r}[log p_r(x)/p_g(x)]",
      ],
      correctAnswer: 0,
      explanation:
        "By the Kantorovich-Rubinstein duality, W(p_r,p_g) = sup over all 1-Lipschitz functions f of E_{p_r}[f(x)] − E_{p_g}[f(x)]. WGAN trains a critic f_w to approximate this supremum, making the loss directly the Wasserstein distance.",
      hints: [
        "The penalty targets the gradient norm at interpolated points - not at real or fake points alone.",
        "The factor (||\\nablaD||\\_2 − 1)\\^2 pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
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
        "The penalty targets the gradient norm at interpolated points - not at real or fake points alone.",
        "The factor (||\\nablaD||\\_2 − 1)\\^2 pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
      ],
    },
    {
      id: "q-gan-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "WGAN-GP (Gulrajani et al. 2017) replaces weight clipping with a gradient penalty. The penalty term is ___.",
      options: [
        "\\lambda \\cdot E_{x̂}[(||\\nablaD(x̂)||\\_2 − 1)\\^2] where x̂ is sampled along lines between real and fake data",
        "\\lambda \\cdot E_{x}[||\\nablaD(x)||\\_2\\^2] at real data points only",
        "\\lambda \\cdot ||W||_F\\^2 on all critic weights (Frobenius norm penalty)",
        "\\lambda \\cdot E_{z}[||\\nabla_z D(G(z))||\\_2\\^2]",
      ],
      correctAnswer: 0,
      explanation:
        "WGAN-GP samples interpolated points x̂ = \\epsilon\\cdotx_real + (1−\\epsilon)\\cdotx_fake with \\epsilon~U[0,1] and adds \\lambda\\cdotE[(||\\nablaD(x̂)||\\_2 − 1)\\^2] to the critic loss, directly penalising deviation of gradient norms from 1 along the optimal transport path.",
      hints: [
        "The penalty targets the gradient norm at interpolated points - not at real or fake points alone.",
        "The factor (||\\nablaD||\\_2 − 1)\\^2 pushes the norm toward 1, enforcing the 1-Lipschitz condition softly.",
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
        "ProGAN starts both networks at 4\\times4 resolution and smoothly fades in new layers that double the resolution, allowing stable training at resolutions up to 1024\\times1024.",
      hints: [
        'The method is called "progressive" - think about growing the network incrementally.',
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
      correctAnswer: 1,
      explanation:
        "ProGAN uses a smooth fade-in: new layers are blended in via a linearly increasing \\alpha weight, preventing training instability that would result from sudden architectural changes.",
      hints: [
        "Abrupt changes would create a discontinuity in the network that could destabilize training.",
        "Think of \\alpha as a mixing coefficient that starts at 0 and gradually increases to 1.",
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
      correctAnswer: 0,
      explanation:
        "AdaIN normalizes feature maps to zero mean and unit variance, then re-scales and re-shifts them using style parameters (\\gamma, \\beta) derived from w, effectively injecting style at each resolution.",
      hints: [
        'Instance Normalization removes the mean and variance; "Adaptive" means those statistics are replaced with learned values.',
        "The style parameters \\gamma and \\beta are affine-transformed from w.",
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
        "Interpolating w toward the mean of W with a truncation factor \\psi < 1",
        "Discarding generated samples whose discriminator score falls below a threshold",
        "Reducing the number of style layers during inference",
      ],
      correctAnswer: 1,
      explanation:
        "Truncating w = w̄ + \\psi(w − w̄) pulls samples toward the center of the W space, which corresponds to more average, higher-fidelity faces at the cost of less variety.",
      hints: [
        "Points near the mean of a distribution tend to be more typical (higher likelihood) samples.",
        "\\psi = 1 means no truncation; \\psi \\to 0 collapses everything to the mean style.",
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
        "Through a cycle-consistency loss that requires G(F(x)) \\approx x and F(G(y)) \\approx y",
        "By sharing weights between the two generators",
        "By applying the discriminator to the concatenation of input and output",
      ],
      correctAnswer: 1,
      explanation:
        "Cycle-consistency loss penalizes deviations from round-trip reconstruction: translating from domain X to Y and back should recover the original image, preventing arbitrary mappings.",
      hints: [
        'Think about what "cycle" implies: going from X\\toY\\toX should return to the start.',
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
      correctAnswer: 1,
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
        "The identity loss (||G(y) − y||) encourages G (X\\toY translator) to act as an approximate identity when given a sample already in domain Y, helping preserve color and content fidelity.",
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
        "The original Pix2Pix paper demonstrates tasks like facades\\leftrightarrowphoto, edges\\toshoes, where pairs exist.",
      ],
    },
    {
      id: "q-gan-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Pix2Pix discriminator is a PatchGAN that classifies individual image patches as real or fake rather than the whole image.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "PatchGAN classifies N\\timesN patches independently, encouraging local texture realism while being more parameter-efficient than a full-image discriminator.",
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
      correctAnswer: 1,
      explanation:
        'BigGAN uses "class-conditional BatchNorm" to inject class information at every residual block via affine parameters (\\gamma, \\beta) derived from the class embedding, not just at the input.',
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
      correctAnswer: 0,
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
        "FID fits multivariate Gaussians to Inception-v3 features of real and generated sets, then computes the Fréchet (2-Wasserstein) distance between them - lower FID indicates higher quality and diversity.",
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
      correctAnswer: 0,
      explanation:
        "If generated images are identical to real training images, the Inception feature distributions match perfectly, giving FID = 0; FID alone cannot detect overfitting or memorization.",
      hints: [
        "FID measures distributional similarity - it does not check whether generated images are novel.",
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
        'When D(G(z)) \\approx 0 (generator is easily detected), log(1−D(G(z))) saturates near log(1) \\approx 0 giving vanishing gradients; −log D(G(z)) is large there, providing stronger signal. This is the "non-saturating" generator heuristic from Goodfellow et al. 2014.',
      hints: [
        "Plot log(1−x) and −log(x) for x near 0 to see which has larger magnitude.",
        "Early in training the generator produces terrible images - what gradient does each loss give?",
      ],
    },
    {
      id: "q-gan-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The hinge loss for GANs requires the discriminator to output a probability in (0, 1) via a sigmoid activation.",
      options: ["True", "False"],
      correctAnswer: 1,
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
        "Least Squares GAN (LSGAN) replaces the cross-entropy discriminator loss with (D(x)−1)\\^2 + (D(G(z)))\\^2. Which divergence does this minimise at the generator optimum?",
      options: [
        "Jensen-Shannon divergence",
        "Pearson χ\\^2 divergence",
        "KL divergence",
        "Total variation distance",
      ],
      correctAnswer: 1,
      explanation:
        "Mao et al. (2017) showed that optimising the LSGAN objective is equivalent to minimising the Pearson χ\\^2 divergence between the mixture distribution (p_r + p_g)/2 and p_g. This provides non-saturating gradients for generated samples far from the decision boundary.",
      hints: [
        "Unlike cross-entropy (which corresponds to JS divergence), the squared loss corresponds to a different f-divergence.",
        "The Pearson χ\\^2 divergence penalises generated samples proportionally to how far they are from the real-data region.",
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
        "Spectral normalization divides W by \\sigma(W) (its spectral norm = largest singular value), making each layer Lipschitz-1 and ensuring stable discriminator gradients.",
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
      correctAnswer: 0,
      explanation:
        "WGAN-GP samples x̂ = \\epsilonx + (1−\\epsilon)G(z) with \\epsilon ~ Uniform(0,1) and penalizes (||\\nablaD(x̂)||\\_2 − 1)\\^2, enforcing the Lipschitz constraint along the path between real and fake data.",
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
        "R1 regularization adds (\\gamma/2)||\\nablaD(x)||\\^2 evaluated only at real data points, shown theoretically and empirically to stabilize training without requiring interpolated samples.",
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
      correctAnswer: 1,
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
      correctAnswer: 1,
      explanation:
        "SRGAN typically has lower PSNR than MSE-optimized methods like bicubic because it sacrifices pixel-exact accuracy to produce perceptually sharper textures; PSNR and perceptual quality are often in tension.",
      hints: [
        "PSNR is a pixel-level metric - sharp but slightly wrong textures can lower PSNR.",
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
      correctAnswer: 0,
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
        "The original 3D-GAN (Wu et al., 2016) generates shapes as 64\\times64\\times64 binary voxel grids, enabling 3D convolutional discriminators that evaluate volumetric realism.",
      hints: [
        "Voxels are 3D analogues of pixels - discrete cubic volume elements.",
        "The original 3D-GAN paper predates NeRF-based implicit representations.",
      ],
    },
    {
      id: "q-gan-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Voxel-based 3D GANs scale efficiently to very high resolutions (e.g., 512\\^3) because memory grows linearly with resolution.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "Voxel memory grows cubically (O(n\\^3)) with resolution; a 512\\^3 grid requires 512\\times more memory than a 128\\^3 grid, making high-resolution voxel generation impractical without specialized representations.",
      hints: [
        "Images are 2D (n\\^2 pixels); voxel grids are 3D (n\\^3 voxels). How does cubic scaling compare to linear?",
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
        "A 256\\times256 photorealistic image",
        "A low-resolution (64\\times64) image capturing rough shape and colors from the text",
        "A text embedding refined by the image context",
        "A segmentation mask for subsequent rendering",
      ],
      correctAnswer: 1,
      explanation:
        "Stage-I of StackGAN generates a coarse 64\\times64 image capturing the high-level semantics of the text; Stage-II takes this and the text to produce a refined 256\\times256 image with fine details.",
      hints: [
        '"Stack" implies building one thing on top of another - coarse-to-fine generation.',
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
      correctAnswer: 0,
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
      correctAnswer: 1,
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
      correctAnswer: 1,
      explanation:
        "GAN-synthesized images must be rigorously validated for clinical use - they can contain hallucinated pathologies or miss real ones; regulatory frameworks require evidence of safety and efficacy before clinical deployment.",
      hints: [
        "A GAN optimizes for realism, not diagnostic accuracy - it may generate convincing but incorrect pathology.",
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
        "Data augmentation is a regularization technique - what problem does it solve?",
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
      correctAnswer: 0,
      explanation:
        "With limited data, the discriminator memorizes real samples and provides uninformative gradients to the generator; techniques like ADA (Adaptive Discriminator Augmentation) or DiffAugment are needed to stabilize training.",
      hints: [
        "Overfitting affects discriminators too - it can memorize real images and detect fakes via memorization rather than learned features.",
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
        "AnoGAN finds the closest latent code z* such that G(z*) \\approx x_test via optimization; anomalies cannot be well-reconstructed since the generator was trained only on normal data, resulting in high residual error.",
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
      correctAnswer: 0,
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
      correctAnswer: 1,
      explanation:
        "DANN uses a gradient reversal layer to adversarially align feature distributions between source and target domains; it does not generate images - it operates purely in feature space.",
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
        "Raw private data never leaving local clients - only model updates (gradients or parameters) are shared",
        "The discriminator accessing test data from other clients",
        "Centralized storage of model weights on a public server",
      ],
      correctAnswer: 1,
      explanation:
        "In federated learning, clients train locally and share only model updates with a central aggregator, keeping sensitive data (e.g., medical records) on-device and never exposing raw samples.",
      hints: [
        "Federated learning\'s key promise is that raw data stays local - only derived information is communicated.",
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
      correctAnswer: 1,
      explanation:
        "Gradient inversion attacks (e.g., Zhu et al.) can reconstruct private training images from shared gradients; differential privacy mechanisms must be added to provide formal privacy guarantees.",
      hints: [
        "Gradients carry information about the data used to compute them - this can be exploited.",
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
      correctAnswer: 0,
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
        "BEGAN (Boundary Equilibrium GAN) introduces an equilibrium mechanism controlled by hyperparameter \\gamma. What does \\gamma control?",
      options: [
        "The learning rate ratio between generator and discriminator",
        "The balance between image diversity and visual quality (\\gamma = E[L(G(z))] / E[L(x)])",
        "The weight of the gradient penalty term",
        "The number of discriminator updates per generator update",
      ],
      correctAnswer: 1,
      explanation:
        "BEGAN\'s \\gamma is a diversity ratio: high \\gamma encourages diverse outputs at some quality cost; low \\gamma produces sharper images with less variety. The training dynamically adjusts to maintain this ratio.",
      hints: [
        "\\gamma = 1 means the discriminator puts equal effort into reconstructing real and fake images.",
        "Lowering \\gamma makes the discriminator focus more on real images, improving quality at the cost of diversity.",
      ],
    },
  ],

  "diffusion-vs-gan": [
    {
      id: "q-gan-kp27-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DDPM (Ho et al. 2020) trains a noise prediction network \\epsilon_\\theta. The simplified training objective (after dropping the weighting term) is ___.",
      options: [
        "E[||x\\_0 − x_\\theta(x_t, t)||\\^2]  [predict the original image]",
        "E[||\\epsilon − \\epsilon_\\theta(√ᾱ_t\\cdotx\\_0 + √(1−ᾱ_t)\\cdot\\epsilon, t)||\\^2]  [predict the added noise]",
        "E[KL(q(x_{t-1}|x_t,x\\_0) || p_\\theta(x_{t-1}|x_t))]  [KL between forward and reverse]",
        "E[log p_\\theta(x\\_0)]  [maximum likelihood]",
      ],
      correctAnswer: 1,
      explanation:
        "Ho et al. (2020) showed empirically that the simplified objective L_simple = E_{t,x\\_0,\\epsilon}[||\\epsilon − \\epsilon_\\theta(x_t, t)||\\^2] works better than the full ELBO. Here x_t = √ᾱ_t\\cdotx\\_0 + √(1−ᾱ_t)\\cdot\\epsilon via the reparameterisation (ᾱ_t = \\Pi_{s=1}^t (1−\\beta_s)), and \\epsilon ~ N(0,I).",
      hints: [
        "The key insight is to reparameterise: given x\\_0 and t, x_t can be sampled in closed form as √ᾱ_t\\cdotx\\_0 + √(1−ᾱ_t)\\cdot\\epsilon.",
        "Training the network to predict the noise \\epsilon (rather than the mean of the reverse process) empirically gives better sample quality.",
      ],
    },
    {
      id: "q-gan-kp27-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DDPM uses a variance schedule {\\beta_t}. Ho et al. (2020) used a linear schedule from \\beta\\_1 = 10\\^{-\\^4 to \\beta_T = 0.02 with T = 1000. A key property of this schedule is that ___.",
      options: [
        "x_T is perfectly Gaussian N(0,I) at any finite T",
        "x_T \\approx N(0,I) because ᾱ_T = \\Pi(1−\\beta_t) \\approx 0 for large T with the linear schedule",
        "\\beta_t must be learned; fixed schedules are theoretically suboptimal",
        "The schedule guarantees mode collapse does not occur",
      ],
      correctAnswer: 1,
      explanation:
        "With T=1000 and \\beta_t linearly increasing, ᾱ_T = \\Pi_{t=1}^T (1−\\beta_t) \\to 0, so x_T \\approx √ᾱ_T\\cdotx\\_0 + √(1−ᾱ_T)\\cdot\\epsilon \\approx \\epsilon ~ N(0,I). The forward process completely destroys the signal by T, which is what allows us to learn the reverse process from pure Gaussian noise.",
      hints: [
        "ᾱ_t is the cumulative product of (1−\\beta_s) for s=1 to t. As t\\toT, this product approaches 0.",
        "When ᾱ_T \\approx 0, x_T \\approx √1\\cdot\\epsilon = \\epsilon ~ N(0,I), making the terminal distribution approximately standard Gaussian.",
      ],
    },
    {
      id: "q-gan-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DDIM (Song et al. 2020) accelerates sampling from DDPMs by using a non-Markovian reverse process. Setting \\eta = 0 in DDIM makes the sampling ___.",
      options: [
        "Equivalent to the original DDPM stochastic sampling",
        "Fully deterministic: the same latent x_T always produces the same image x\\_0",
        "Faster but stochastic due to injected noise",
        "Equivalent to score-based generation with Langevin dynamics",
      ],
      correctAnswer: 1,
      explanation:
        "In DDIM, the reverse step is x_{t-1} = √ᾱ_{t-1}\\cdotx̂\\_0 + √(1−ᾱ_{t-1}−\\sigma_t\\^2)\\cdot\\epsilon_\\theta(x_t,t) + \\sigma_t\\cdot\\epsilon. When \\eta=0, \\sigma_t=0 for all t, eliminating all stochastic noise and making sampling deterministic. This means x_T uniquely determines x\\_0, enabling semantic interpolation in latent space.",
      hints: [
        "\\eta controls the amount of stochastic noise injected at each reverse step. \\eta=0 means \\sigma_t=0 everywhere.",
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
      correctAnswer: 0,
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
        "A well-disentangled space should change images smoothly and predictably - no sudden jumps.",
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
        "No additional training is needed - CLIP provides a differentiable loss signal at test time.",
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
      correctAnswer: 1,
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
        "Computing the CLIP text-image direction (\\Deltat) and mapping it to the W+ space via a learned mapper network or sensitivity-weighted projection",
        "Fine-tuning all StyleGAN generator weights using CLIP loss",
        "Solving a constrained optimization over the W+ space using CLIP as the objective function directly",
      ],
      correctAnswer: 1,
      explanation:
        "StyleCLIP\'s global direction \\Deltaw is computed by projecting the CLIP space direction \\Deltat into W+ space, weighted by channel-wise sensitivity of CLIP features, enabling efficient single-direction attribute editing.",
      hints: [
        'A "global" direction applies the same \\Deltaw offset to any starting latent code.',
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
        "Neither the generator nor the discriminator can unilaterally improve its objective by changing its strategy - p_g = p_r and D*(x) = 1/2",
        "The discriminator achieves 100% accuracy on real images",
        "The generator and discriminator have equal parameter counts",
      ],
      correctAnswer: 1,
      explanation:
        "At Nash equilibrium, the generator produces the true data distribution (p_g = p_r) so the discriminator cannot distinguish real from fake; it outputs 1/2 everywhere. Neither player benefits from a unilateral change - the game is in equilibrium.",
      hints: [
        "Nash equilibrium means no player can improve by changing strategy while the other holds fixed.",
        "When p_g = p_r, the best discriminator can do is guess randomly - D*(x) = 1/2.",
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
        "Standard gradient descent on the minimax objective does not guarantee convergence to Nash equilibrium; the two-player game can exhibit oscillation, mode collapse, or divergence - convergence is an active research problem requiring careful tuning and stabilization techniques.",
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
        "When p_r and p_g have disjoint supports (common in high dimensions), the optimal discriminator is perfect and D*(x) is 0 or 1 everywhere; JS(p_r||p_g) = log 2 - a constant - providing no gradient signal to train the generator. This motivates Wasserstein GAN.",
      hints: [
        "If the discriminator perfectly separates real from fake, log(1 - D(G(z))) = log(0) and the gradient vanishes.",
        "The Wasserstein distance does not saturate even for disjoint distributions - this is why WGAN was proposed.",
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
        "The 'AC' stands for Auxiliary Classifier - the discriminator has an extra head.",
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
        "Inner product (projection) conditioning is multiplicative - the class embedding gates the feature representation.",
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
        "This is the same mechanism used in AdaIN for style transfer - the scale and shift encode style (here: class).",
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
        "Instance normalization normalizes channel statistics - this destroys spatial semantic information from the layout.",
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
        "DALL-E 1 (OpenAI, 2021) uses a two-stage approach for text-to-image generation. Step 1: Images are high-dimensional pixel data - too large to process efficiently alongside text in a single Transformer. Step 2: The first stage compresses images into a compact discrete representation that a Transformer can handle efficiently. Step 3: The second stage learns to predict image tokens conditioned on text tokens autoregressively. What is the first stage?",
      options: [
        "A diffusion model that generates low-resolution images from text",
        "A discrete VAE (dVAE) that compresses images into discrete visual tokens",
        "A GAN that generates image patches for text-conditioned assembly",
        "A CLIP model that directly generates image embeddings from text",
      ],
      correctAnswer: 1,
      explanation:
        "DALL-E 1's first stage is a discrete VAE (dVAE, a VQ-VAE-like model) that encodes images into a grid of 8192-way discrete tokens. This creates a 'visual vocabulary' of 8192 token types per spatial position. The second stage is a Transformer that autoregressively predicts image token sequences given text tokens, enabling text-to-image generation by sampling token sequences and decoding with the dVAE decoder.",
      hints: [
        "dVAE is the VQ-VAE-like component that converts images to discrete codes - a 'visual vocabulary'.",
        "Stage 2 is a Transformer that predicts image tokens given text tokens - like language modeling over image codes.",
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
        "Step 1: Text descriptions contain multiple words describing different aspects of the desired image. Step 2: AttnGAN applies word-level cross-attention at each generation stage, computing attention weights between word tokens and spatial regions of the feature map. Step 3: This allows specific words like 'red beak' to guide the generation of the corresponding image region (the beak), rather than conditioning on a single sentence embedding for the whole image. Multiple stages progressively increase resolution with refined word alignment.",
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
        "Step 1: StackGAN Stage-1 produces a low-resolution image, Stage-2 refines it to higher resolution - a linear chain. Step 2: StackGAN++ replaces this linear chain with a tree structure where multiple generators at different scales are trained jointly, all conditioned on the same text embedding. Step 3: Color consistency regularization penalizes color distribution differences between scales, ensuring that early coarse images and later fine images have consistent color distributions, improving overall visual coherence.",
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
        "Step 1: Point clouds are represented as a set of N 3D coordinates {(x_i, y_i, z_i)} - the same shape can be represented with points listed in any arbitrary order. Step 2: Convolutional networks assume spatial regularity (grids), which point clouds lack, and they process points in a fixed order that is meaningless for point sets. Step 3: Discriminators must be permutation-invariant: identical point sets in different orders must produce identical real/fake decisions. PointNet-based discriminators achieve this using shared MLPs and symmetric aggregation (max pooling) over all points.",
      hints: [
        "The order of points in a point cloud is arbitrary - the same shape can be represented with points in any order.",
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
        "Step 1: Voxel grids discretize 3D space into a fixed N x N x N grid; memory usage is O(N^3), making high-resolution voxel grids prohibitively expensive. Step 2: Implicit neural representations define a shape as a continuous function f(x, y, z) -> occupancy (or SDF), where f is a neural network. Step 3: Resolution is determined at query time - the network can be evaluated at any 3D coordinate regardless of a pre-discretized grid, eliminating the cubic memory cost and enabling high-fidelity shapes.",
      hints: [
        "An implicit function can be evaluated at any 3D point at query time - there is no discretization.",
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
        "Step 1: pi-GAN combines implicit neural representations with GANs for 3D-aware image synthesis. Step 2: Each generated scene is represented as a SIREN (sinusoidal activation MLP) that maps a 3D coordinate (x, y, z) to a density and color (NeRF-like radiance field). Step 3: A mapping network produces a style code that conditions the SIREN, enabling the GAN to learn a distribution over scene representations. The 2D discriminator evaluates rendered images from random camera angles, and the GAN learns which SIREN parameters produce realistic 3D scenes.",
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
        "DVD-GAN (Dual Video Discriminator GAN) uses two separate discriminators for video generation. Step 1: Video has two quality dimensions - spatial (each frame photorealistic) and temporal (frames flow together smoothly). Step 2: A single discriminator cannot cleanly separate spatial from temporal failures. Step 3: DVD-GAN splits these concerns. What does each discriminator evaluate?",
      options: [
        "One discriminator evaluates color fidelity; the other evaluates spatial resolution",
        "One discriminator evaluates single-frame spatial quality; the other evaluates temporal coherence across sampled frames",
        "One discriminator handles the foreground; the other handles the background",
        "One discriminator operates in pixel space; the other in frequency (Fourier) space",
      ],
      correctAnswer: 1,
      explanation:
        "DVD-GAN's spatial discriminator (D_S) evaluates individual frames for photorealism while the temporal discriminator (D_T) evaluates a sparse set of frames jointly for motion consistency, disentangling spatial quality from temporal coherence during training.",
      hints: [
        "Spatial quality and temporal consistency are different properties - DVD-GAN uses specialized discriminators for each.",
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
        "Step 1: Optical flow estimates the apparent motion vector field between two consecutive frames - where each pixel moved. Step 2: Warp-based temporal consistency computes flow from frame t to frame t+1, warps frame t by that flow, and compares the warped result to frame t+1. Step 3: Penalizing the difference between the warped frame and the actual frame directly discourages flickering, ghosting, or unnatural motion, encouraging physically plausible smooth transitions between consecutive generated frames.",
      hints: [
        "Optical flow estimates how pixels move between frames - inconsistency in flow means flickering or unnatural motion.",
        "This loss can be applied without a temporal discriminator as an additional regularizer.",
      ],
    },
    {
      id: "q-gan-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TGAN (Temporal GAN) separates video generation into temporal and spatial components. Step 1: Motion and appearance are independent aspects of video. Step 2: A recurrent temporal generator produces latent codes z_1...z_T from a single noise seed. Step 3: A shared image generator independently renders each z_t into a frame. What is the key advantage of this separation?",
      options: [
        "It generates all frames simultaneously with a 3D convolutional generator",
        "It uses a temporal generator that samples a sequence of latent codes from a recurrent network, then an image generator that independently renders each frame from its latent code",
        "It generates only keyframes and interpolates intermediate frames using optical flow",
        "It uses a Transformer that attends over all frame positions jointly",
      ],
      correctAnswer: 1,
      explanation:
        "Since the image generator is shared across all timesteps, all frames have consistent appearance (same character, scene). The temporal generator independently controls motion dynamics via the sequence of z codes, enabling disentangled control of content and motion.",
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
        "In-domain GAN inversion (Zhu et al. 2020) addresses a key limitation of standard encoder-based inversion. Step 1: Standard encoders minimize reconstruction loss but can produce z values outside the learned latent manifold. Step 2: Off-manifold codes behave unpredictably under semantic editing directions. Step 3: In-domain GAN inversion adds a discriminator-based regularizer. What does this regularizer do?",
      options: [
        "Standard encoders are too slow for real-time editing applications",
        "Standard encoders map images to latent codes outside the generator's learned manifold, reducing editability; in-domain inversion constrains codes to remain on the manifold via an additional domain-regularized training objective",
        "Standard encoders cannot handle high-resolution images above 256x256",
        "Standard encoders require class labels that are unavailable for real images",
      ],
      correctAnswer: 1,
      explanation:
        "The discriminator-based regularizer penalizes inverted codes that the discriminator identifies as atypical of the learned latent distribution, keeping them on the manifold where editing directions remain effective.",
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
        "Step 1: Pixel-level L2 loss treats all pixels equally - a slight shift in texture or structure that is perceptually obvious may have low pixel error. Step 2: Perceptual loss (VGG feature matching) measures similarity in the VGG feature space, capturing semantic content and textural patterns that pixel metrics miss. Step 3: Encoders trained with both losses produce inversions that better preserve perceptually important attributes (texture, structure, identity) while still maintaining pixel-level fidelity.",
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
        "The editability-distortion tradeoff in StyleGAN inversion. Step 1: Lower distortion means G(z) more closely matches the original image. Step 2: Achieving lower distortion often requires extreme W+ codes that are far from the well-behaved W subspace where semantic directions are trained. Step 3: Semantic editing directions (like +age, +smile) were discovered in W space. What tradeoff does this create?",
      options: [
        "Higher-resolution inversions have worse editability due to overfitting",
        "Latent codes that achieve lower reconstruction distortion (closer to the original image) tend to lie further from the editable W space, reducing the effectiveness of semantic editing directions",
        "Increasing the number of optimization steps always improves both distortion and editability",
        "The W+ space provides better editability than W but worse distortion than pixel optimization",
      ],
      correctAnswer: 1,
      explanation:
        "As distortion decreases, editability typically decreases - a fundamental tradeoff. Low-distortion codes are off-manifold and semantic directions don't transfer predictably; high-distortion codes are on-manifold but look less like the original.",
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
        "Step 1: Likelihood-based objectives (ELBO for diffusion, log-likelihood for VAEs) penalize the model for assigning zero probability to any training example. To maximize likelihood, the model must assign positive density everywhere the data has mass - it cannot ignore modes. Step 2: GANs optimize an adversarial objective: the generator only needs to fool the current discriminator, not cover all modes. Mode collapse occurs when a few outputs reliably fool D, and there is no explicit penalty for ignoring other data modes. Step 3: This fundamental difference in training objectives gives diffusion models better mode coverage at the cost of computational efficiency.",
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
        "Step 1: GAN generation is a single forward pass: sample noise z, pass through G(z), produce an image - one step. Step 2: DDPM generation requires T sequential denoising steps: x_T (noise) -> x_{T-1} -> x_{T-2} -> ... -> x_0, where T is typically 1000. Step 3: Even accelerated samplers (DDIM, DPM-Solver, ~10-50 steps) are significantly slower than a single GAN forward pass. This speed gap makes GANs preferable for real-time applications like interactive editing or video streaming.",
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
        "Step 1: Standard DDPM assumes each reverse diffusion step p(x_{t-1} | x_t) is a Gaussian distribution. But the true reverse distribution for complex data (e.g., images) is multimodal (different plausible denoised outcomes). Step 2: Denoising Diffusion GAN replaces the Gaussian assumption with a conditional GAN that models the full multimodal distribution at each reverse step. Step 3: Because each conditional GAN can accurately model a large denoising step, only ~4 steps are needed instead of 1000, dramatically reducing sampling time while maintaining quality.",
      hints: [
        "The key insight: if each denoising step can be accurately modeled with a GAN, fewer steps are needed.",
        "The bottleneck in DDPM is that each step must be Gaussian-small to stay accurate - a GAN removes this constraint.",
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
        "Step 1: Medical imaging datasets are often heavily imbalanced - rare conditions have far fewer examples than common ones, causing classifiers to underperform on rare classes. Step 2: GAN augmentation generates synthetic images of rare classes to supplement (not replace) real training data, increasing the effective sample size of the rare class. Step 3: A classifier trained on augmented data should have better sensitivity on the rare class, though generated samples must be validated for realism and correct labeling.",
      hints: [
        "Class imbalance causes classifiers to underperform on rare classes - augmentation directly addresses this.",
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
        "Step 1: Tabular data contains mixed types: continuous columns (e.g., age, income) with non-Gaussian multi-modal distributions, and discrete columns (e.g., category, zip code) with class imbalance. Standard GANs assume continuous unimodal data. Step 2: CTGAN uses mode-specific normalization (fitting a Variational Gaussian Mixture Model per continuous column) to capture multi-modal distributions, and conditional generation for discrete columns to handle imbalance. Step 3: These innovations allow CTGAN to model the full joint distribution of complex tabular datasets, making it the standard approach for synthetic tabular data generation.",
      hints: [
        "Tabular data has mixed types (numeric, categorical) and complex distributions - standard GANs assume continuous unimodal data.",
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
        "Step 1: Face reenactment needs two ingredients: the geometric information (head pose, expression) from the driving video, and the identity appearance from the source image. Step 2: 3DMM fitting is a classical computer vision optimization that fits a parametric 3D face model (e.g., Flame, FaceWarehouse) to video frames, extracting pose (rotation, translation) and expression parameters. Step 3: The GAN (or neural renderer) takes the source identity features and the 3DMM parameters as conditioning and synthesizes the reenacted face. 3DMM fitting is a model-based CV method, not a GAN component.",
      hints: [
        "Face reenactment pipelines combine classical 3D face fitting with neural rendering - not everything is a GAN.",
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
        "Step 1: FID fits a multivariate Gaussian to Inception features of real and generated images, then computes the Frechet (Wasserstein-2) distance between the two Gaussians. This fitting step introduces approximation error if the true feature distributions are not Gaussian. Step 2: KID avoids this assumption by computing the Maximum Mean Discrepancy (MMD) directly on the feature distributions using a kernel function. Step 3: KID is unbiased with any sample size, whereas FID has a systematic downward bias with small sample sizes, making KID more reliable for limited data evaluation.",
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
        "Step 1: IS = exp(E[KL(p(y|x) || p(y))]). High quality requires p(y|x) to be sharp (low entropy) - each generated image looks like a clear, identifiable object. Step 2: High diversity requires p(y) to be uniform (high entropy) - the generated images span many classes. Step 3: Only when both conditions hold (sharp per-image predictions AND uniform marginal distribution) does IS become large, making IS a useful proxy for quality-diversity in the absence of reference real images.",
      hints: [
        "For a sharp image, the classifier is confident about its class - p(y|x) has low entropy.",
        "For diverse outputs, the marginal p(y) should be uniform - all classes generated equally.",
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
        "A GAN can achieve high precision (sharp, realistic samples) at the cost of low recall (missing real data modes), and vice versa - these objectives are in tension and must be balanced",
        "Truncation trick simultaneously improves both precision and recall for any truncation threshold",
        "Precision and recall can both be maximized by training with more discriminator steps per generator step",
      ],
      correctAnswer: 1,
      explanation:
        "Step 1: Precision measures how much of the generated distribution overlaps with the real distribution (fidelity/quality). Recall measures how much of the real distribution is covered by the generated distribution (diversity/coverage). Step 2: The truncation trick in StyleGAN shrinks z toward the mean, biasing generation toward high-density regions - this increases precision (better quality samples) but decreases recall (fewer modes covered). Step 3: These objectives are inherently in tension: optimizing for one degrades the other. Reporting both precision and recall alongside FID captures this tradeoff that FID alone cannot reveal.",
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
        'Inversion is the "encoder" direction: image \\to latent, the reverse of generation (latent \\to image).',
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
      correctAnswer: 0,
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

const extra: Record<string, Question[]> = {
  "conditional-gan-architectures": [
    {
      id: "q-gan-ex1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A conditional GAN (cGAN) differs from an unconditional GAN primarily in that:",
      options: [
        "The discriminator in a cGAN uses a different loss function than in a standard GAN",
        "Both the generator and discriminator receive an additional conditioning signal (e.g., class label or image), enabling controlled generation",
        "A cGAN trains the generator and discriminator simultaneously rather than alternately",
        "The cGAN generator only produces binary (black-and-white) outputs",
      ],
      correctAnswer: 1,
      explanation: "Step 1: In an unconditional GAN, both G and D receive only the noise z (or no input for D). Neither network has any control over the output. Step 2: In a cGAN (Mirza and Osindero, 2014), conditioning information y (class label, image, text) is fed to both G (as G(z, y)) and D (as D(x, y)). Step 3: This allows the generator to produce outputs matching the specified condition and the discriminator to evaluate whether the output is realistic for that condition, enabling controlled generation.",
      hints: [
        "The 'c' stands for conditional - both networks receive the condition as additional input.",
        "Without conditioning, the generator cannot control which class or attribute to produce.",
      ],
    },
    {
      id: "q-gan-ex1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Pix2pix (Isola et al., 2017) uses a PatchGAN discriminator instead of a standard image-level discriminator. What advantage does PatchGAN provide?",
      options: [
        "PatchGAN reduces training time by using only one discriminator update per generator update",
        "PatchGAN classifies local image patches as real or fake, capturing high-frequency texture realism while being applicable to images of arbitrary size",
        "PatchGAN removes the need for an L1 reconstruction loss by directly measuring patch-level pixel accuracy",
        "PatchGAN uses attention mechanisms to focus only on the most discriminative image regions",
      ],
      correctAnswer: 1,
      explanation: "Step 1: A standard image-level discriminator outputs a single real/fake probability for the entire image. Step 2: PatchGAN runs the discriminator as a fully convolutional network, producing a grid of independent real/fake decisions (one per NxN patch), then averaging them. Step 3: This focuses the discriminator on texture quality per local region rather than global composition, and because it is fully convolutional, it can process images of any size without a fixed-size input.",
      hints: [
        "A patch-level real/fake decision focuses on texture quality rather than global composition.",
        "Fully convolutional discriminators can handle variable image sizes - no fixed-size fully connected layer needed.",
      ],
    },
    {
      id: "q-gan-ex1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "CycleGAN's cycle-consistency loss enforces round-trip reconstruction between domains. Why is this constraint necessary in the absence of paired training data?",
      options: [
        "It prevents the discriminator from memorizing training images",
        "Without paired data there is no pixel-level supervision; cycle consistency is a self-supervisory constraint that prevents generators from mapping all inputs to the same output by requiring approximately invertible mappings",
        "It guarantees that translated images retain the original image's Fourier spectrum",
        "It prevents the discriminator from distinguishing translations from real target-domain images",
      ],
      correctAnswer: 1,
      explanation: "Step 1: With paired data, the ground truth (input, ground_truth_output) directly supervises the generator. Without pairs, there is no pixel-level target. Step 2: Without any such constraint, the generator could map every input to the same output that fools the discriminator (e.g., mapping every photo to the same painting). Step 3: Cycle consistency requires G_AB(G_BA(A)) approximates A and G_BA(G_AB(B)) approximates B. This forces each generator to be approximately invertible - mapping A to B then back gives A, not an arbitrary image - which constrains the solution to structure-preserving translations.",
      hints: [
        "If there is no paired ground truth, how do you prevent the generator from ignoring the content?",
        "Cycle consistency is analogous to requiring a translation model to be invertible - translate to French and back to English should give the original text.",
      ],
    },
    {
      id: "q-gan-ex1-4",
      type: "true-false",
      difficulty: "medium",
      question: "StarGAN allows multi-domain image translation using a single generator, unlike CycleGAN which requires a separate generator pair for each domain pair.",
      correctAnswer: "True",
      explanation: "Step 1: CycleGAN needs G_AB and G_BA for each domain pair A-B, so with N domains it needs N(N-1) generators. Step 2: StarGAN uses one generator G(x, c_target) where c_target is the target domain label vector. Step 3: With a single G, changing c_target changes the target domain - all domain pairs share the same generator. This reduces model count from quadratic to linear in the number of domains.",
      hints: [
        "CycleGAN: with 5 domains you need many generator pairs. StarGAN: always just 1.",
        "StarGAN injects the target domain as a condition - the same generator handles all domain pairs.",
      ],
    },
    {
      id: "q-gan-ex1-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "StarGAN v2 replaces a single domain label with a style code to enable which capability beyond StarGAN v1?",
      options: [
        "Training on more than 10 domains simultaneously without memory issues",
        "Generating diverse intra-domain styles (e.g., multiple reference styles within one domain), not just a single canonical domain translation",
        "Eliminating the need for a domain classifier by using a multi-discriminator setup",
        "Supporting video-to-video translation by adding a temporal consistency constraint",
      ],
      correctAnswer: 1,
      explanation: "Step 1: StarGAN v1 uses a single fixed domain label per translation - all 'happy' faces look similar. Step 2: StarGAN v2 introduces a mapping network (noise -> style code per domain) and a style encoder (reference image -> style code). Step 3: The style code provides a continuous, diverse representation of the target domain - with the same domain label you can generate many different styles. This enables reference-guided generation where a reference image's style is transferred to the input.",
      hints: [
        "StarGAN v1 maps everything in a domain to one style. StarGAN v2 generates a distribution of styles per domain.",
        "The style code is derived either from random noise (diverse generation) or a reference image (reference-guided generation).",
      ],
    },
  ],

  "stylegan-architecture": [
    {
      id: "q-gan-ex2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "StyleGAN's mapping network f transforms the latent code z to an intermediate latent code w. What is the primary motivation for this intermediate space?",
      options: [
        "The mapping network reduces dimensionality from 512D to 128D to save memory",
        "The W space is more disentangled than Z because the mapping network learned to untangle the factors of variation that are entangled by the fixed Gaussian prior in Z",
        "The W space allows the generator to operate without batch normalization layers",
        "The mapping network converts discrete one-hot class labels into continuous style vectors",
      ],
      correctAnswer: 1,
      explanation: "Step 1: The Z space is shaped by a fixed Gaussian prior - this prior does not know which factors of variation in natural images are semantically meaningful or how they are correlated in the data. Step 2: The mapping network (a learned MLP) applies a nonlinear transformation that reshapes Z into a W space better aligned with the true structure of visual factors. Step 3: W is more linearly disentangled - individual semantic directions in W (e.g., pose, age, hair color) tend to be more independent of each other, making semantic editing more predictable. Perceptual Path Length confirms W is less entangled than Z.",
      hints: [
        "A fixed Gaussian prior does not know which factors of variation are independent - the mapping network learns this.",
        "Perceptual Path Length (PPL) is lower in W than in Z, confirming W is more disentangled.",
      ],
    },
    {
      id: "q-gan-ex2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Style injection via Adaptive Instance Normalization (AdaIN) in StyleGAN works by:",
      options: [
        "Adding the style vector w to the pixel values of the feature map",
        "Using w to predict per-channel scale and shift parameters that modulate the normalized feature map at each layer",
        "Multiplying the feature map by a learned attention mask derived from w",
        "Replacing convolutional weights with style-dependent dynamic filters predicted from w",
      ],
      correctAnswer: 1,
      explanation: "Step 1: Each generator layer processes a feature map with many channels. Instance normalization normalizes each channel to zero mean and unit variance, removing style information from the feature statistics. Step 2: Learned affine transforms of w predict per-channel scale (gamma) and shift (beta) parameters. Step 3: AdaIN applies: AdaIN(x, w) = gamma * (x - mean(x)) / std(x) + beta. Since different layers correspond to different spatial scales (coarse to fine), w controls coarse features at early layers (structure, pose) and fine features at late layers (texture, color).",
      hints: [
        "AdaIN: normalize the feature map, then scale by gamma and shift by beta - both predicted from w.",
        "Different generator layers control different spatial scales of style: early layers for coarse features, late layers for fine texture.",
      ],
    },
    {
      id: "q-gan-ex2-3",
      type: "true-false",
      difficulty: "easy",
      question: "Stochastic variation in StyleGAN (adding per-pixel Gaussian noise before each AdaIN layer) allows the model to produce fine-grained random details like individual hair strands that vary independently of the overall style.",
      correctAnswer: "True",
      explanation: "Step 1: Deterministic generation with fixed z produces identical fine details every time - this over-regularizes high-frequency stochastic variation (skin pores, hair strands). Step 2: Per-pixel Gaussian noise is injected before each AdaIN layer; a learned per-channel scale factor controls how much noise affects each layer. Step 3: The noise is independent of w (style) and only affects high-frequency details at the layer where it is injected, allowing stochastic variation without disturbing coarse structure, pose, or identity.",
      hints: [
        "Stochastic details like exact hair strand positions should vary between samples even with the same w.",
        "Noise injection adds randomness at each layer; StyleGAN learns which scale of noise affects which spatial detail.",
      ],
    },
    {
      id: "q-gan-ex2-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The truncation trick in StyleGAN shrinks w toward the mean latent code using a psi coefficient. Setting psi < 1 achieves what effect on the precision/recall tradeoff?",
      options: [
        "It increases diversity at the cost of slightly lower image fidelity",
        "It increases image quality (precision) by biasing generation toward high-density regions of the learned distribution, at the cost of reducing diversity (recall)",
        "It eliminates stochastic variation from fine-grained noise injection",
        "It reduces the perceptual path length without affecting sample quality",
      ],
      correctAnswer: 1,
      explanation: "Step 1: Unusual faces (low-density regions of the latent space) are less well-trained and tend to look lower quality. Step 2: Truncation pulls w toward the mean w_mean = E_z[f(z)], biasing the generated images toward the high-density, well-learned regions of the latent distribution. Step 3: This improves average image quality (higher precision - samples are more likely to look realistic) but reduces diversity (lower recall - unusual faces are suppressed). The tradeoff is controlled by psi: psi=0 gives the mean face (highest quality, lowest diversity); psi=1 gives full diversity.",
      hints: [
        "The mean latent code generates the 'average' face - the most likely, most polished result.",
        "Truncating pushes samples toward the mean: less diversity (all faces look more similar) but higher average quality.",
      ],
    },
    {
      id: "q-gan-ex2-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "StyleGAN2's key architectural improvement over StyleGAN1 is removing progressive growing and replacing it with:",
      options: [
        "A multi-scale discriminator that evaluates images at 4x, 8x, and 16x downsampled resolutions simultaneously",
        "A skip-connection generator and residual discriminator trained at full resolution from the start, with weight demodulation replacing AdaIN to eliminate water-droplet artifacts",
        "A self-attention mechanism inserted between the mapping network and the synthesis network",
        "Replacing the Gaussian noise injection with learned stochastic depth dropout",
      ],
      correctAnswer: 1,
      explanation: "Step 1: StyleGAN1 used progressive growing (gradually adding layers) which was unstable and produced 'water-droplet' artifacts traced to AdaIN's normalization of feature map statistics. Step 2: StyleGAN2 replaces AdaIN with weight demodulation: instead of normalizing feature maps, it normalizes the convolutional weights before each layer, avoiding the blob artifacts. Step 3: StyleGAN2 also replaces progressive growing with training at full resolution from the start, using skip connections in the generator and residual connections in the discriminator - which provides the stable training signal without progressive complexity.",
      hints: [
        "Water-droplet artifacts in StyleGAN1 were traced to AdaIN's feature normalization - StyleGAN2 fixes this with weight demodulation.",
        "Progressive growing adds training complexity; StyleGAN2 achieves quality without it using skip/residual connections.",
      ],
    },
    {
      id: "q-gan-ex2-6",
      type: "true-false",
      difficulty: "medium",
      question: "StyleGAN's W+ space (using a different w for each layer) is strictly more expressive than the W space (same w for all layers) and always produces better reconstructions of real images.",
      correctAnswer: "True",
      explanation: "Step 1: W uses a single w for all 18 AdaIN layers, giving 512 degrees of freedom. W+ uses a different w per layer, giving 18 * 512 = 9216 degrees of freedom. Step 2: More degrees of freedom means W+ can represent a much larger set of images, enabling more faithful reconstruction of real images. Step 3: However, the extra degrees of freedom mean W+ codes can be correlated in complex ways that do not align with semantic editing directions, which were discovered in the W subspace. This is the reconstruction vs. editability tradeoff.",
      hints: [
        "More degrees of freedom always improves reconstruction capability - W+ has far more than W.",
        "The tradeoff: better reconstruction fidelity in W+ vs. more consistent semantic editing in W.",
      ],
    },
  ],

  "gan-training-advanced": [
    {
      id: "q-gan-ex3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Spectral normalization (Miyato et al., 2018) stabilizes GAN training by constraining the discriminator. What property does it enforce?",
      options: [
        "The discriminator's output is always in the range [0, 1] via sigmoid normalization",
        "The Lipschitz constant of the discriminator is bounded to 1 by normalizing each weight matrix by its spectral norm (largest singular value)",
        "All discriminator layers have zero mean activations via spectral batch normalization",
        "The spectral entropy of the discriminator's weight matrices is minimized during training",
      ],
      correctAnswer: 1,
      explanation: "Step 1: The Lipschitz constant of a function is the maximum ratio of change in output to change in input. For linear layers, this equals the spectral norm (largest singular value) of the weight matrix. Step 2: For deep networks, the Lipschitz constant is the product of spectral norms across all layers. Spectral normalization divides each layer's weights by their spectral norm, making each layer 1-Lipschitz. Step 3: The discriminator becomes 1-Lipschitz overall (product of 1s), which bounds gradients everywhere and prevents the discriminator from changing too rapidly, stabilizing the adversarial game without needing gradient penalty computation.",
      hints: [
        "The spectral norm of a matrix is its largest singular value - spectral normalization divides weights by this value.",
        "A 1-Lipschitz function has bounded gradients, preventing exploding discriminator gradients.",
      ],
    },
    {
      id: "q-gan-ex3-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "WGAN-GP (Gulrajani et al., 2017) adds a gradient penalty term to the WGAN objective. The penalty enforces the gradient norm of the discriminator at interpolated points to be close to 1. Why interpolated points specifically?",
      options: [
        "Interpolated points are easier to compute gradients for than real or generated data points",
        "Points along linear interpolations between real and generated data lie in the region where the optimal critic is active and constraint violations are most likely",
        "The original WGAN paper proved that interpolated points are the only locations where the gradient can exceed 1",
        "Penalizing only interpolated points reduces computational cost compared to sampling uniformly over all of R^n",
      ],
      correctAnswer: 1,
      explanation: "Step 1: The optimal WGAN critic has gradient norm 1 everywhere on the data manifold. Enforcing the Lipschitz constraint everywhere is intractable. Step 2: The most important region is between the real and generated distributions - this is where the critic transitions from real to fake and where constraint violations are most informative. Step 3: Interpolated points x_hat = epsilon * x_real + (1-epsilon) * x_fake sample this region. Penalizing gradient norms there efficiently approximates the full Lipschitz constraint with much less computation than sampling the entire space.",
      hints: [
        "The Lipschitz constraint must hold everywhere - but enforcing it everywhere is intractable.",
        "Interpolated points are a principled compromise: they sample the region between real and fake distributions.",
      ],
    },
    {
      id: "q-gan-ex3-3",
      type: "true-false",
      difficulty: "easy",
      question: "Mode collapse in GANs refers to the phenomenon where the generator produces only a few distinct outputs regardless of the input noise, failing to capture the full diversity of the training distribution.",
      correctAnswer: "True",
      explanation: "Step 1: The generator receives noise z and produces images G(z). With mode collapse, different z values produce nearly identical outputs. Step 2: The discriminator then learns to identify this collapsed mode, and the generator shifts to a different small set of outputs to fool D again. The cycle repeats indefinitely. Step 3: The generator never learns to cover the full training distribution - it only chases the discriminator's current weaknesses, cycling through a few modes rather than learning all modes.",
      hints: [
        "If you generate 1000 faces and they all look nearly identical, the generator has mode-collapsed.",
        "The generator exploits the discriminator's current weakness rather than learning the full distribution.",
      ],
    },
    {
      id: "q-gan-ex3-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Mini-batch discrimination is a technique proposed to combat mode collapse. It works by:",
      options: [
        "Training on smaller mini-batches to reduce gradient variance from diverse samples",
        "Allowing the discriminator to compare statistics across samples within a mini-batch, making it harder for the generator to produce identical outputs since identical outputs would be detectable as a mini-batch-level anomaly",
        "Running multiple discriminator updates per generator step to prevent mode collapse",
        "Randomly dropping generated samples from the mini-batch during discriminator training",
      ],
      correctAnswer: 1,
      explanation: "Step 1: Standard discriminators evaluate each sample independently, producing a real/fake score for each. If all samples in a batch are identical, this is invisible to the discriminator. Step 2: Mini-batch discrimination computes a similarity vector for each sample against all other samples in the batch and appends this to the sample's features. Step 3: If the generator produces identical outputs, the discriminator detects them as anomalous via the mini-batch similarity features and assigns lower scores, directly penalizing mode collapse at the batch level.",
      hints: [
        "If all generated samples in a batch are the same, a discriminator with cross-sample information can detect this.",
        "Standard discriminators evaluate each sample independently - they cannot detect batch-level repetition.",
      ],
    },
    {
      id: "q-gan-ex3-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Wasserstein distance (Earth Mover's Distance) between two distributions provides better gradients for GAN training than the JS divergence because:",
      options: [
        "Wasserstein distance is always smaller than JS divergence, giving smaller loss values that are easier to optimize",
        "Wasserstein distance is continuous and differentiable with respect to the distribution parameters even when p_r and p_g have disjoint supports, whereas JS saturates at log 2 for disjoint supports providing zero generator gradient",
        "Wasserstein distance is computed analytically without needing a discriminator, eliminating training instability",
        "Wasserstein distance penalizes mode collapse more strongly because it counts the number of missing modes",
      ],
      correctAnswer: 1,
      explanation: "Step 1: JS divergence = log 2 when p_r and p_g have disjoint supports - this is its maximum value, a constant. Step 2: A constant has zero gradient with respect to generator parameters, so the generator receives no signal about which direction to move. Step 3: Wasserstein distance W(p_r, p_g) scales proportionally with the distance between distributions even when they are disjoint. This provides a non-zero gradient telling the generator which way to shift to reduce the distance, enabling learning even in early training when distributions don't overlap.",
      hints: [
        "JS saturates at log 2 for disjoint distributions - a constant has zero gradient.",
        "Wasserstein measures how far the distributions are from each other even when they do not overlap.",
      ],
    },
    {
      id: "q-gan-ex3-6",
      type: "true-false",
      difficulty: "medium",
      question: "In GAN training, using a learning rate that is too high for the discriminator relative to the generator can cause the discriminator to overpower the generator early, leading to vanishing gradients for the generator.",
      correctAnswer: "True",
      explanation: "Step 1: If D converges faster than G, it can perfectly separate real from fake early in training (D(x) = 1 for real, D(G(z)) = 0 for fake). Step 2: The generator loss is -log(D(G(z))). When D(G(z)) = 0, log(0) approaches -infinity and the gradient vanishes. Step 3: Once D is perfect and G has vanishing gradients, G cannot improve. This is why GAN training requires balancing update rates (often D updates more than G) and stabilization techniques like spectral normalization.",
      hints: [
        "A perfect discriminator gives D(G(z)) near 0, so the log of that value approaches -infinity and the gradient is near zero.",
        "This is the same saturation problem that motivated the non-saturating generator loss.",
      ],
    },
  ],

  "diffusion-gan-tradeoffs": [
    {
      id: "q-gan-ex4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Classifier-Free Guidance (CFG) in diffusion models enables controllability comparable to conditional GANs. A key advantage of CFG over conditional GAN approaches for text-to-image generation is:",
      options: [
        "CFG is always faster than a conditional GAN because it requires fewer parameters",
        "CFG allows a single model to trade diversity for quality at inference time by adjusting the guidance scale, without training multiple generators",
        "CFG eliminates the need for text conditioning by computing guidance from image statistics",
        "CFG produces higher FID scores than any comparable conditional GAN",
      ],
      correctAnswer: 1,
      explanation: "Step 1: CFG trains a single diffusion model on both conditioned and unconditioned generation (by randomly dropping the conditioning signal). Step 2: At inference, the guidance scale psi scales the difference between the conditional and unconditional predictions: x_t_pred = x_t_uncond + psi * (x_t_cond - x_t_uncond). Step 3: psi controls the trade-off: higher psi gives stronger text adherence (quality) but lower diversity, all from one model with no retraining. Conditional GANs would need separate models for different trade-off levels.",
      hints: [
        "CFG lets you dial quality vs. diversity at inference time - conditional GANs do not have this flexibility without retraining.",
        "A guidance scale of 0 is unconditional; a guidance scale of 7.5 (a common value) is strongly conditioned on the prompt.",
      ],
    },
    {
      id: "q-gan-ex4-2",
      type: "true-false",
      difficulty: "easy",
      question: "For high-resolution image generation on large diverse datasets, diffusion models typically achieve lower FID scores than state-of-the-art GANs such as StyleGAN3.",
      correctAnswer: "True",
      explanation: "Step 1: FID measures both quality (sharpness) and diversity (coverage of real data distribution). GANs can suffer from mode collapse, missing real data modes. Step 2: Diffusion models' likelihood-based training explicitly penalizes missing modes - the model must assign positive probability to all training data. Step 3: On large diverse datasets (ImageNet, COCO), DALL-E 3, Stable Diffusion, and Imagen outperform GAN FID benchmarks due to better mode coverage. On narrow domains like faces (FFHQ), StyleGAN still competes strongly.",
      hints: [
        "FID measures both quality and diversity - diffusion models' better mode coverage helps FID.",
        "On FFHQ (faces), StyleGAN still competes well; but on diverse multi-category datasets, diffusion models tend to win.",
      ],
    },
    {
      id: "q-gan-ex4-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A significant practical advantage of GANs over diffusion models for real-time applications (e.g., video streaming, interactive editing) is:",
      options: [
        "GAN generators can be conditioned on text without any additional training",
        "GAN sampling requires a single forward pass through the generator, whereas diffusion models require T sequential denoising steps (typically T=20-1000), making GANs orders of magnitude faster at inference",
        "GANs can generate arbitrarily long video sequences while diffusion models are limited to fixed-length outputs",
        "GANs have smaller file sizes than equivalent diffusion model checkpoints",
      ],
      correctAnswer: 1,
      explanation: "Step 1: GAN generation: sample z, compute G(z) - one forward pass, ~20ms for 1024x1024 on GPU. Step 2: DDPM generation: start from x_T and run T sequential denoising steps x_T -> x_{T-1} -> ... -> x_0. With T=1000, this requires 1000 U-Net evaluations. Step 3: Even fast samplers (DDIM, DPM-Solver) with 10-50 steps are significantly slower. For interactive face editing, virtual try-on, or real-time video generation, this speed gap makes GANs the practical choice.",
      hints: [
        "A single forward pass vs. hundreds of sequential steps is a fundamental computational difference.",
        "Even fast diffusion samplers (DDIM, DPM-Solver) with 10-50 steps are slower than a GAN's single forward pass.",
      ],
    },
    {
      id: "q-gan-ex4-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Latent diffusion models (LDMs, e.g., Stable Diffusion) reduce diffusion's computational cost compared to pixel-space diffusion by:",
      options: [
        "Using a smaller U-Net denoiser with fewer parameters and skip connections",
        "Performing the diffusion process in the compressed latent space of a pre-trained VAE encoder, reducing spatial dimensions 8x and making denoising far cheaper in FLOPs",
        "Replacing Gaussian noise with structured block noise that is faster to denoise",
        "Running the denoising steps in parallel across multiple GPUs simultaneously",
      ],
      correctAnswer: 1,
      explanation: "Step 1: Pixel-space diffusion at 512x512 processes 262,144 spatial tokens per denoising step - extremely expensive. Step 2: A pre-trained VAE encoder compresses images 8x spatially: 512x512x3 -> 64x64x4 (a 64x reduction in spatial tokens). Step 3: The diffusion model operates in this compressed latent space, and only the VAE decoder runs at full pixel resolution for final output. LDMs achieve comparable quality to pixel-space diffusion at a fraction of the per-step compute cost.",
      hints: [
        "Diffusion in pixel space at 512x512 processes 262,144 pixels per step. In latent space (64x64), it is 4,096 tokens.",
        "The VAE encodes images into compact representations; the diffusion model learns to denoise these latent codes, not pixels.",
      ],
    },
    {
      id: "q-gan-ex4-5",
      type: "true-false",
      difficulty: "medium",
      question: "Diffusion models are generally less suitable than GANs for direct latent space editing of real images because diffusion's inversion process requires running approximate reverse steps that accumulate errors.",
      correctAnswer: "True",
      explanation: "Step 1: GAN inversion finds z such that G(z) approximates a real image x - a direct optimization in the generator's latent space, no intermediate steps. Step 2: Diffusion inversion (DDIM inversion) runs the forward diffusion process to find the noise corresponding to x, but this is approximate because the forward process uses the model itself. Step 3: The accumulated approximation error and the fact that guidance changes between inversion (where it may be absent) and generation (where it is applied) cause inconsistencies, making precise semantic editing harder than with GANs.",
      hints: [
        "GAN inversion finds a z such that G(z) approximates x - straightforward optimization in latent space.",
        "DDIM inversion reverses the deterministic DDIM sampler, but guidance changes during inversion vs. generation cause inconsistencies.",
      ],
    },
    {
      id: "q-gan-ex4-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Score-based diffusion models are related to GANs through which theoretical connection?",
      options: [
        "Both learn a density ratio p_r(x)/p_g(x) - the discriminator estimates this ratio directly, while the score network estimates the gradient of this log ratio",
        "The score function (gradient of log p with respect to x) is equivalent to the discriminator gradient at equilibrium, linking score-based generation to the GAN value function",
        "Diffusion model training is equivalent to adversarial training with an infinite number of discriminator update steps",
        "Score matching and the non-saturating GAN loss converge to the same global optimum under the same data distribution",
      ],
      correctAnswer: 1,
      explanation: "Step 1: At GAN equilibrium, the optimal discriminator D*(x) = p_r/(p_r + p_g), and its gradient relates to the score (log density gradient) of each distribution. Step 2: Score matching learns nabla_x log p(x) - the gradient of the log data density - without a discriminator. A diffusion model's denoiser implicitly computes this score. Step 3: Both approaches implicitly estimate the structure of the data distribution through different means: adversarial training through the discriminator's estimate of p_r/p_g, and score matching through direct density gradient estimation, revealing a deep mathematical equivalence at equilibrium.",
      hints: [
        "The optimal discriminator encodes information about both distributions - its gradient is related to the ratio of their scores.",
        "Score matching learns the gradient of the log data density - this is what a diffusion model's denoiser implicitly computes.",
      ],
    },
  ],

  "gan-nash-equilibria": [
    {
      id: "q-gan-ex5-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In the GAN two-player game, simultaneous gradient descent on the minimax objective can exhibit oscillatory behavior around the Nash equilibrium rather than converging. This is because:",
      options: [
        "The generator and discriminator have incompatible network architectures that prevent gradient alignment",
        "Simultaneous gradient descent follows each player's gradient of their individual objective, but these gradient fields can be rotational around the equilibrium rather than pointing toward it, causing cycles rather than convergence",
        "The Nash equilibrium is a saddle point that requires second-order optimization methods to find",
        "The minimax objective is non-differentiable at the Nash equilibrium due to the generator distribution collapsing",
      ],
      correctAnswer: 1,
      explanation: "Step 1: In single-objective optimization, gradient descent follows a conservative vector field (always pointing toward lower values) - it converges to local minima. Step 2: In a two-player minimax game, each player follows its own gradient. Near the Nash equilibrium, these gradient fields can be rotational - the combined vector field has a curl that causes cycling. Step 3: The generator and discriminator are in a tug-of-war where each update partially undoes the other's, causing orbits or oscillations rather than convergence. Techniques like consensus optimization (adding gradient alignment regularization) and extra-gradient methods address this.",
      hints: [
        "In standard gradient descent, you follow the gradient downhill toward a minimum - the field is conservative.",
        "In a minimax game, the two objectives pull in different directions; the combined vector field can rotate rather than converge.",
      ],
    },
    {
      id: "q-gan-ex5-2",
      type: "true-false",
      difficulty: "medium",
      question: "Progressive growing in ProGAN (Karras et al., 2018) trains the GAN by gradually adding new higher-resolution layers to both generator and discriminator, allowing stable training of high-resolution image generators.",
      correctAnswer: "True",
      explanation: "Step 1: Training a 1024x1024 GAN from scratch is unstable - the discriminator can easily overpower the generator when both must learn high-frequency details simultaneously. Step 2: ProGAN starts with a 4x4 GAN, and gradually fades in higher-resolution layers (8x8, 16x16, ... 1024x1024) using an alpha parameter that interpolates new layers in smoothly. Step 3: Each resolution level learns coarse structure (pose, layout) before adding high-frequency details (texture, fine features), providing a stable curriculum that dramatically improves training stability for high-resolution generation.",
      hints: [
        "Training a 1024x1024 GAN from scratch is unstable; starting from 4x4 and growing is much more tractable.",
        "Progressive growing is like a curriculum: learn the coarse structure first, then add fine details.",
      ],
    },
    {
      id: "q-gan-ex5-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The gradient penalty in WGAN-GP penalizes the squared difference between the discriminator's gradient norm and 1. Why target gradient norm of 1 rather than 0 (zero gradients)?",
      options: [
        "A gradient norm of 0 would prevent the discriminator from learning any features",
        "The 1-Lipschitz constraint requires that the function's gradient has magnitude at most 1 everywhere; the optimal critic achieves this bound with equality on the data support, making norm=1 the correct target for the penalty",
        "Targeting norm=1 is computationally cheaper than targeting norm=0 because it avoids division by zero in the penalty calculation",
        "Gradient norm=1 maximizes the signal-to-noise ratio for generator gradient updates",
      ],
      correctAnswer: 1,
      explanation: "Step 1: The 1-Lipschitz constraint for WGAN requires ||nabla_x D(x)|| <= 1 everywhere. This is an upper bound, not a zero gradient requirement. Step 2: The optimal WGAN critic achieves ||nabla_x D(x)|| = 1 almost everywhere on the data manifold - the constraint is active (tight) at data points. Step 3: Targeting norm=0 would suppress all gradients, preventing the discriminator from learning anything. Targeting norm=1 matches exactly what the optimal critic does - the gradient penalty steers D toward the theoretically optimal critic without over-penalizing.",
      hints: [
        "The Lipschitz constraint is an upper bound on gradient magnitude, not a requirement for zero gradients.",
        "The optimal critic saturates the constraint - its gradient norm equals exactly 1 on the data support.",
      ],
    },
    {
      id: "q-gan-ex5-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "BigGAN (Brock et al., 2019) achieves state-of-the-art class-conditional image generation at high resolution. Which training technique was critical to its success at the scale of 512x512 ImageNet generation?",
      options: [
        "Using a diffusion model as a pre-training stage before adversarial fine-tuning",
        "Aggressive scaling (4-8x more parameters and batch sizes of 256-2048), truncation trick at inference, and class-conditional batch normalization throughout the generator",
        "Replacing the standard discriminator with an energy-based model for improved mode coverage",
        "Using hierarchical latent codes where early layers control coarse structure and late layers control fine texture",
      ],
      correctAnswer: 1,
      explanation: "Step 1: BigGAN's central insight is that scale matters in GANs: larger models and dramatically larger batch sizes (256-2048 vs. the typical 32-64) provide better gradient estimates for the adversarial objective. Step 2: Class-conditional batch normalization (CBN) injects class information at every generator layer, ensuring class-specific features are generated. Step 3: The truncation trick at inference trades diversity for quality. This combination yielded FID 7.4 on ImageNet 256x256, a massive improvement over previous GANs at that scale.",
      hints: [
        "BigGAN's key insight: scale matters in GANs just as much as in language models.",
        "Larger batches provide better gradient estimates in the adversarial objective, stabilizing large-scale training.",
      ],
    },
    {
      id: "q-gan-ex5-5",
      type: "true-false",
      difficulty: "easy",
      question: "The FID (Frechet Inception Distance) metric for evaluating GANs uses feature representations from a pre-trained Inception network to compare the distribution of generated images to the distribution of real images.",
      correctAnswer: "True",
      explanation: "Step 1: Raw pixel comparison (MSE) misses semantic quality - two images with similar pixel values can be very different semantically. Step 2: FID extracts feature vectors from the penultimate layer of Inception-v3 (a network trained on ImageNet) for both real and generated images. These features capture semantic content better than pixels. Step 3: FID fits a multivariate Gaussian to each feature distribution and computes the Frechet (Wasserstein-2) distance between them. This captures both mean difference (quality) and covariance difference (diversity) in a single scalar.",
      hints: [
        "FID uses Inception network features because they capture semantic content better than raw pixels.",
        "The Frechet distance measures both the mean difference and the covariance difference between the two distributions.",
      ],
    },
    {
      id: "q-gan-ex5-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Self-Attention GAN (SAGAN, Zhang et al., 2019) adds self-attention layers to both the generator and discriminator to address which limitation of purely convolutional GANs?",
      options: [
        "Convolutional GANs cannot handle variable-resolution inputs at training time",
        "Convolutional GANs have limited receptive fields and struggle to model long-range spatial dependencies (e.g., ensuring consistent texture across an entire scene)",
        "Convolutional GANs always produce checkerboard artifacts due to transposed convolution upsampling",
        "Convolutional GANs cannot be conditioned on class labels without modifying every convolutional layer",
      ],
      correctAnswer: 1,
      explanation: "Step 1: A standard convolution has a limited receptive field - each output depends only on pixels within the kernel size. Even stacked convolutions have finite receptive fields. Step 2: Generating globally consistent structures requires dependencies between distant spatial locations (e.g., both sides of a face must match, the dog's four legs must all look consistent). Purely convolutional GANs struggle with this because distant regions never interact directly. Step 3: Self-attention computes attention weights between all pairs of spatial positions, allowing each location to condition on all other locations regardless of distance, enabling global consistency in texture, structure, and symmetry.",
      hints: [
        "A dog's fur texture should be consistent across the whole body - local convolutions cannot enforce this globally.",
        "Self-attention computes attention weights between all pairs of spatial positions - enabling truly global context.",
      ],
    },
    {
      id: "q-gan-ex5-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "R1 regularization (Mescheder et al., 2018) is an alternative to WGAN-GP that penalizes the gradient of the discriminator with respect to real data only. Its theoretical justification is:",
      options: [
        "Penalizing gradients on real data prevents the discriminator from overfitting to individual training examples",
        "Gradient penalties on real data are sufficient for local convergence in the GAN game; penalizing gradients on generated samples is unnecessary and can harm performance",
        "R1 regularization enforces the 1-Lipschitz constraint only near real data, which is where the discriminator is most active",
        "Penalizing only real data gradients reduces computational cost by half compared to WGAN-GP",
      ],
      correctAnswer: 1,
      explanation: "Step 1: WGAN-GP penalizes gradient norms at interpolated points between real and generated data, which is computationally expensive. Step 2: Mescheder et al. showed theoretically that penalizing gradients only on real data (R1 regularization) is sufficient for local Nash equilibrium convergence. Step 3: Intuitively, the gradient penalty on real data prevents the discriminator from being too confident on real examples (which would cause vanishing generator gradients), and this is sufficient - penalizing generated-data gradients provides no additional theoretical benefit and can interfere with generator gradients.",
      hints: [
        "R1 is simpler than WGAN-GP: no need to sample interpolated points or compute gradients on generated images.",
        "The theoretical result says: for local convergence, gradient penalties only at real data points are sufficient.",
      ],
    },
  ],
};

Object.assign(questions, extra);

registerQuestions(questions);
export default questions;
