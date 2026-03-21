import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "forward-diffusion-process": [
    {
      id: "q-dm-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In DDPM (Denoising Diffusion Probabilistic Models), the forward diffusion process q(x_t | x_{t-1}) adds Gaussian noise at each step. The key property that makes this process tractable is:",
      options: [
        "The forward process can be reversed analytically without any learned model",
        "The marginal q(x_t | x_0) can be computed in closed form as a single Gaussian: x_t = √(ᾱ_t)·x_0 + √(1-ᾱ_t)·ε, where ε ~ N(0,I)",
        "The forward process preserves the energy of the input signal across all timesteps",
        "The forward process is deterministic, making it invertible by construction",
      ],
      correctAnswer: 1,
      explanation:
        "The reparameterization trick for DDPM: using the fact that a sum of Gaussians is Gaussian, the marginal at timestep t is q(x_t|x_0) = N(x_t; √ᾱ_t·x_0, (1-ᾱ_t)·I), where ᾱ_t = ∏_{s=1}^t α_s and α_s = 1-β_s. This means we can directly sample x_t from x_0 at any timestep without iterating through all intermediate steps — a crucial efficiency for training.",
      hints: [
        "The closed-form marginal means training doesn't require running the full forward chain for each batch.",
        "ᾱ_t approaches 0 as t → T, so x_T is approximately pure Gaussian noise.",
      ],
    },
    {
      id: "q-dm-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A linear noise schedule β_1 < β_2 < ... < β_T is used in DDPM. What is the effect of increasing β_t?",
      options: [
        "More structure from x_0 is preserved at step t",
        "More noise is injected at step t, destroying signal faster; larger β_t means more corruption of the signal at that step",
        "The denoising network must predict larger noise magnitudes at step t",
        "The number of denoising steps required for good samples increases",
      ],
      correctAnswer: 1,
      explanation:
        "β_t controls the amount of noise added at step t: q(x_t|x_{t-1}) = N(x_t; √(1-β_t)·x_{t-1}, β_t·I). Larger β_t means more noise is added (less signal retained). The schedule is usually increasing (β_1 ≈ 10^{-4} to β_T ≈ 0.02 in DDPM), gradually destroying structure. The cosine schedule (Nichol & Dhariwal) was introduced to give a more uniform information decay rate.",
      hints: [
        "At β_t = 0, no noise is added (x_t = x_{t-1}); at β_t = 1, x_t is pure noise.",
        "The signal-to-noise ratio decreases monotonically with t as β_t increases.",
      ],
    },
    {
      id: "q-dm-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The forward process posterior q(x_{t-1} | x_t, x_0) — used in deriving the DDPM training objective — is a Gaussian with mean:",
      options: [
        "μ̃_t = x_0",
        "μ̃_t = (1/√α_t)·(x_t - β_t/√(1-ᾱ_t)·ε_t)",
        "μ̃_t = (√ᾱ_{t-1}·β_t)/(1-ᾱ_t)·x_0 + (√α_t·(1-ᾱ_{t-1}))/(1-ᾱ_t)·x_t",
        "μ̃_t = (x_t - √(1-ᾱ_t)·ε) / √ᾱ_t",
      ],
      correctAnswer: 2,
      explanation:
        "By Bayes' rule applied to Gaussians, q(x_{t-1}|x_t,x_0) = N(x_{t-1}; μ̃_t(x_t,x_0), β̃_t·I) where μ̃_t = (√ᾱ_{t-1}·β_t/(1-ᾱ_t))·x_0 + (√α_t·(1-ᾱ_{t-1})/(1-ᾱ_t))·x_t and β̃_t = (1-ᾱ_{t-1})·β_t/(1-ᾱ_t). This is the 'posterior' mean combining the noisy observation x_t and the original x_0. The DDPM reverse process p_θ(x_{t-1}|x_t) learns to approximate this posterior.",
      hints: [
        "This derivation uses the Gaussian conditioning formula and the product of two Gaussian likelihoods.",
        "The two terms weight x_0 and x_t by how much each contributes at timestep t.",
      ],
    },
  ],

  ddpm: [
    {
      id: "q-dm-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Ho et al. (2020) showed that the DDPM training objective is equivalent to predicting the noise ε added at each step. The simplified loss is:",
      options: [
        "L = E[||x_0 - x̂_0(x_t, t)||²] — reconstruct x_0 from x_t",
        "L = E[||ε - ε_θ(√ᾱ_t·x_0 + √(1-ᾱ_t)·ε, t)||²] — predict the noise ε from the noisy image",
        "L = E[KL(q(x_{t-1}|x_t,x_0) || p_θ(x_{t-1}|x_t))] — minimize the full ELBO",
        "L = E[||∇_x log p(x_t) - s_θ(x_t, t)||²] — predict the score function",
      ],
      correctAnswer: 1,
      explanation:
        "Ho et al. found that a simplified loss — predicting the noise ε ~ N(0,I) added to produce x_t from x_0 — works better empirically than the full ELBO or x_0-prediction. The model ε_θ(x_t, t) takes the noisy image x_t and timestep t as inputs and outputs an estimated noise. This is equivalent to estimating the score ∇_{x_t} log q(x_t) up to a scaling factor.",
      hints: [
        "The noise-prediction and score-matching objectives are equivalent up to a scaling by 1/√(1-ᾱ_t).",
        "The U-Net architecture is typically used for ε_θ with timestep t embedded via sinusoidal encodings.",
      ],
    },
    {
      id: "q-dm-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DDPM sampling requires exactly T forward steps (one per timestep, from T to 0) to generate a high-quality sample.",
      correctAnswer: "True",
      explanation:
        "DDPM's reverse process is Markovian: to generate x_{t-1} from x_t, you run ε_θ(x_t, t) and sample from p_θ(x_{t-1}|x_t). This requires T sequential steps (T = 1000 in the original paper), making generation slow. DDIM and other accelerated samplers break the Markovian structure to skip steps, reducing generation to 10-50 steps while maintaining quality. This is DDPM's main practical limitation.",
      hints: [
        "1000 sequential neural network forward passes is computationally expensive at inference time.",
        "DDIM shows that the same trained noise-prediction network can be sampled more efficiently with a non-Markovian process.",
      ],
    },
    {
      id: "q-dm-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The DDPM ELBO training objective is a sum of KL divergences: L = L_T + Σ L_{t-1} + L_0. What does the L_T term represent and why is it typically ignored during training?",
      options: [
        "L_T = KL(q(x_T|x_0) || p(x_T)) measures how close the final noisy distribution is to N(0,I); it is ignored because with a well-designed noise schedule, q(x_T|x_0) ≈ N(0,I) making L_T ≈ 0",
        "L_T measures the reconstruction quality of x_0 from x_T; ignored because T is so large reconstruction is impossible",
        "L_T is the log-likelihood of x_0 under the model prior; ignored because the prior is uniform",
        "L_T measures the variance of the gradient estimates; ignored because it has no closed form",
      ],
      correctAnswer: 0,
      explanation:
        "L_T = KL(q(x_T|x_0) || p_θ(x_T)) compares the noisy endpoint distribution to the prior p(x_T) = N(0,I). With a properly designed noise schedule (ᾱ_T ≈ 0), q(x_T|x_0) ≈ N(0,I) ≈ p(x_T), so L_T ≈ 0 and contributes negligibly to the total loss. Since there are no learnable parameters in p(x_T), even if L_T were nonzero it could not be optimized. It is therefore dropped from training.",
      hints: [
        "The prior p(x_T) = N(0,I) has no parameters, so backpropagating through L_T would not update ε_θ.",
        "L_T being small is exactly why T is chosen large enough: we need x_T to be approximately pure Gaussian.",
      ],
    },
  ],

  "score-matching": [
    {
      id: "q-dm-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Score matching (Hyvärinen, 2005) learns a neural network s_θ(x) to approximate the score function ∇_x log p(x). Why is the score function useful for generative modeling?",
      options: [
        "The score function directly gives the density p(x), enabling likelihood computation",
        "Knowing the score allows Langevin dynamics sampling: x_{t+1} = x_t + (ε/2)·∇_x log p(x_t) + √ε·z, which converges to samples from p(x)",
        "The score function minimizes the KL divergence between q(x) and p(x) analytically",
        "The score function removes the need for any noise schedule in diffusion models",
      ],
      correctAnswer: 1,
      explanation:
        "The score ∇_x log p(x) points in the direction of increasing probability, enabling gradient-based sampling via Langevin dynamics. Starting from noise, iterative Langevin updates converge to the data distribution p(x). Score-based models (Song & Ermon, 2019) learn this score directly and use annealed Langevin dynamics at multiple noise levels to handle multi-modal distributions. This connects score matching to diffusion models.",
      hints: [
        "Langevin dynamics is like gradient ascent on log p(x) with added noise to avoid getting stuck in local modes.",
        "The score doesn't require knowing the partition function Z — unlike the energy-based model E(x) = -log p(x) + log Z.",
      ],
    },
    {
      id: "q-dm-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Denoising Score Matching (Vincent, 2011) replaces the intractable vanilla score matching objective with:",
      options: [
        "Learning the score at x directly by automatic differentiation of a density estimator",
        "Learning to predict the score of a corrupted distribution q_σ(x̃|x) from the clean data score, using the identity ∇_{x̃} log q_σ(x̃) = (x - x̃)/σ²",
        "Minimizing the Fisher divergence between the learned score and the data score",
        "Learning the reverse-time SDE coefficients via maximum likelihood on clean data",
      ],
      correctAnswer: 1,
      explanation:
        "Denoising score matching exploits the fact that for Gaussian noise corruption x̃ = x + σ·ε, the score of the noisy distribution is ∇_{x̃} log q_σ(x̃) = (x-x̃)/σ² = -ε/σ. The training objective becomes E[||s_θ(x̃) - (x-x̃)/σ²||²], which is tractable (no density or partition function needed). This is exactly the connection to DDPM: noise prediction ε_θ is proportional to negative score estimation.",
      hints: [
        "The score of a Gaussian-corrupted distribution has the simple form pointing from the noisy x̃ back toward the clean x.",
        "DDPM's noise prediction and score matching are equivalent up to a scaling: s_θ(x_t,t) ≈ -ε_θ(x_t,t)/√(1-ᾱ_t).",
      ],
    },
    {
      id: "q-dm-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Song et al. (2021) unified score-based models and diffusion models under the framework of stochastic differential equations (SDEs). The key insight is that:",
      options: [
        "The forward diffusion process is equivalent to solving an ODE in the data space",
        "Any diffusion process (forward SDE) has a corresponding reverse SDE that depends on the score ∇_x log p_t(x); learning the score at all noise levels enables exact reversal of the forward process",
        "Score matching can only be applied to continuous-state Markov chains, not to continuous-time processes",
        "The score function is constant across all noise levels, allowing a single model to denoise at any level",
      ],
      correctAnswer: 1,
      explanation:
        "Song et al.'s SDE framework: any Itô SDE dx = f(x,t)dt + g(t)dw has a reverse SDE dx = [f(x,t) - g(t)²·∇_x log p_t(x)]dt + g(t)dw̄. Given a time-dependent score function s_θ(x,t) ≈ ∇_x log p_t(x), the reverse SDE can be simulated to generate samples from p_0 (data distribution). DDPM corresponds to one specific SDE (VP-SDE); SMLD corresponds to another (VE-SDE). This unification explains why score matching and DDPM are equivalent.",
      hints: [
        "Anderson (1982) first derived the reverse-time SDE; Song et al. showed this is the unifying principle of modern diffusion models.",
        "The probability flow ODE (a deterministic counterpart) enables exact likelihood computation and fast DDIM-like sampling.",
      ],
    },
  ],

  ddim: [
    {
      id: "q-dm-kp4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DDIM (Denoising Diffusion Implicit Models, Song et al. 2020) accelerates sampling by:",
      options: [
        "Training a smaller, faster neural network to replace the U-Net",
        "Defining a non-Markovian reverse process that allows skipping timesteps during sampling while using the same trained DDPM noise-prediction network",
        "Increasing the noise schedule's variance so fewer steps are needed to reach the data distribution",
        "Distilling the T-step DDPM into a single-step generator",
      ],
      correctAnswer: 1,
      explanation:
        "DDIM replaces DDPM's Markovian chain with a deterministic (or slightly stochastic) generalized process that is consistent with the same forward marginals q(x_t|x_0). Because the reverse process is non-Markovian, you can skip directly from x_t to x_{t'} for t' << t, using the same noise-prediction network ε_θ without retraining. This enables high-quality generation in 10-50 steps instead of 1000.",
      hints: [
        "DDIM uses the same ε_θ as DDPM — no retraining needed, just a different sampling algorithm.",
        "With η=0, DDIM is fully deterministic (ODE sampling); with η=1, it recovers DDPM stochastic sampling.",
      ],
    },
    {
      id: "q-dm-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DDIM with η=0 (fully deterministic sampling) enables exact image reconstruction from its latent representation x_T, making the generative process invertible.",
      correctAnswer: "True",
      explanation:
        "With η=0, DDIM uses a deterministic mapping from x_T (the initial noise) to x_0 (the generated image). Running the reverse DDIM in the forward direction (DDIM inversion) maps a real image x_0 to its corresponding x_T. This invertibility enables image editing in the diffusion latent space — real images can be inverted to x_T, edited by modifying the denoising trajectory, and re-generated. This is the basis for text-guided image editing methods like Prompt-to-Prompt.",
      hints: [
        "DDIM inversion is used extensively in image editing: SDEdit, Prompt-to-Prompt, Null-Text Inversion all use DDIM inversion.",
        "The deterministic forward-backward is only approximate due to discretization, but works well in practice.",
      ],
    },
    {
      id: "q-dm-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The DDIM update rule for a single sampling step from x_t to x_{t-1} can be written as x_{t-1} = √ᾱ_{t-1}·x̂_0(x_t) + direction pointing to x_t + noise. What is x̂_0(x_t)?",
      options: [
        "The output of the U-Net at timestep t",
        "The x_0 prediction computed from x_t and the predicted noise: x̂_0 = (x_t - √(1-ᾱ_t)·ε_θ(x_t,t)) / √ᾱ_t",
        "A random sample from the data distribution",
        "The exponential moving average of previous x_0 predictions",
      ],
      correctAnswer: 1,
      explanation:
        "DDIM expresses the update in terms of a predicted x_0: x̂_0(x_t) = (x_t - √(1-ᾱ_t)·ε_θ(x_t,t)) / √ᾱ_t. This is the x_0 prediction implied by the current noise estimate, obtained by inverting the forward process marginal. The full DDIM step then interpolates between this predicted x_0 and the direction toward x_t (the 'direction pointing to x_t' term), enabling a principled way to take larger steps.",
      hints: [
        "The x̂_0 prediction is a 'Tweedie denoising estimate' — the conditional expectation E[x_0 | x_t] in the Gaussian approximation.",
        "This x̂_0 reparameterization is also used in modern distillation methods (consistency models, progressive distillation).",
      ],
    },
  ],

  "classifier-free-guidance": [
    {
      id: "q-dm-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Classifier-Free Guidance (CFG, Ho & Salimans 2022) modifies the score estimate during sampling as: ε̃_θ(x_t, c) = (1+w)·ε_θ(x_t, c) - w·ε_θ(x_t, ∅). The guidance weight w controls:",
      options: [
        "The number of denoising steps used during sampling",
        "The trade-off between sample quality (adherence to conditioning signal c) and diversity — higher w increases adherence to the condition but reduces diversity and can cause saturation/artifacts",
        "The noise schedule β_t applied during sampling",
        "The weighting between the diffusion loss and the classifier loss",
      ],
      correctAnswer: 1,
      explanation:
        "CFG pushes the score estimate toward the conditional direction ε_θ(x_t,c) and away from the unconditional direction ε_θ(x_t,∅). With w=0, you get standard conditional sampling. With w>0, the conditioning signal c is amplified, improving adherence to the text prompt (better Fréchet Inception Distance for specific concepts) at the cost of diversity (worse recall). Typical values for DALL-E/Stable Diffusion are w=7-15.",
      hints: [
        "CFG = extrapolation in score space: go further in the conditional direction than the model alone would.",
        "Too high w → oversaturation, artifacts; too low w → ignores the text prompt.",
      ],
    },
    {
      id: "q-dm-kp5-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Classifier-Free Guidance requires training a separate classifier on noisy data to compute the class-conditional score.",
      correctAnswer: "False",
      explanation:
        "Classifier-Free Guidance is 'classifier-free' — it does not require a separate noise-conditioned classifier. Instead, the same diffusion model is jointly trained on conditional (with condition c) and unconditional (with c replaced by a null token ∅, dropped randomly during training ~10-20% of the time) objectives. At sampling time, two forward passes compute the conditional and unconditional score, and their difference amplifies the condition. This is simpler and avoids the distributional mismatch of classifier-based guidance.",
      hints: [
        "Classifier guidance (the earlier approach) required a separately trained noise-robust classifier.",
        "CFG trains one model with dropout of the conditioning signal, giving both conditional and unconditional scores from a single model.",
      ],
    },
    {
      id: "q-dm-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The modified score in CFG can be interpreted as: the model samples from a distribution proportional to p(x_t|c)^(1+w) / p(x_t)^w. When w > 0, this sharpens the conditional distribution. What is the theoretical connection to energy-based models?",
      options: [
        "CFG converts the diffusion model into an energy-based model by computing the energy as -log p(x_t|c)",
        "The guided score (1+w)·s(x,c) - w·s(x) is equivalent to the score of an unnormalized distribution p(x|c)·[p(x|c)/p(x)]^w — an 'energy tilt' toward regions where the conditioning increases likelihood",
        "CFG is equivalent to maximum likelihood estimation with temperature annealing",
        "The guidance weight w corresponds to the Lagrange multiplier in constrained optimization of the ELBO",
      ],
      correctAnswer: 1,
      explanation:
        "The guided score (1+w)·∇_x log p(x|c) - w·∇_x log p(x) = ∇_x log [p(x|c)·(p(x|c)/p(x))^w] = ∇_x log [p(x|c)^{1+w}/p(x)^w]. This corresponds to a distribution that exponentially upweights regions where p(x|c)/p(x) (the conditioning likelihood ratio) is large — i.e., regions strongly consistent with condition c relative to the unconditional distribution. This is an energy-based 'tilt' of the conditional distribution.",
      hints: [
        "The ratio p(x|c)/p(x) = p(c|x)/p(c) by Bayes' rule — CFG is implicitly amplifying the 'likelihood' of the condition.",
        "This connection explains why CFG produces more 'on-topic' but less diverse samples.",
      ],
    },
  ],

  "latent-diffusion-models": [
    {
      id: "q-dm-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Latent Diffusion Models (LDMs, Rombach et al. 2022) operate the diffusion process in the latent space of a pre-trained autoencoder instead of pixel space. The primary motivation is:",
      options: [
        "Latent space diffusion produces higher-quality images than pixel-space diffusion",
        "Computational efficiency: high-resolution images (e.g., 512×512×3 pixels) are compressed to a much smaller latent space (e.g., 64×64×4), reducing memory and compute costs dramatically while preserving perceptually important information",
        "Latent diffusion allows the use of non-Gaussian noise in the forward process",
        "The autoencoder encoder removes all noise from the data before diffusion begins",
      ],
      correctAnswer: 1,
      explanation:
        "Pixel-space diffusion on 512×512 images requires operating on 786,432-dimensional vectors. LDMs compress images by 4-8× in each spatial dimension using a VQ-VAE or KL-VAE, then run diffusion in the 64×64×4 (or similar) latent space. This reduces compute by ~8-64× while maintaining image quality because the autoencoder captures most perceptual information. The U-Net denoiser operates on the compact latent, making training and inference practical.",
      hints: [
        "Stable Diffusion is an LDM: it uses a VAE to compress to 64×64×4 latents and runs diffusion there.",
        "The autoencoder is pre-trained and frozen during diffusion model training — only the U-Net is trained.",
      ],
    },
    {
      id: "q-dm-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Stable Diffusion (an LDM), the text prompt is incorporated into the denoising U-Net via cross-attention, where the text embedding acts as the key and value.",
      correctAnswer: "True",
      explanation:
        "Stable Diffusion uses CLIP text embeddings as conditioning. The U-Net's intermediate feature maps (spatial queries) attend to the text token embeddings (keys and values) via cross-attention layers at multiple resolutions. This allows fine-grained spatial conditioning — different spatial regions of the latent can attend to different text tokens. The cross-attention formulation: Q = W_Q·φ(z_t), K = W_K·τ_θ(y), V = W_V·τ_θ(y), where y is the text prompt and τ_θ is the CLIP text encoder.",
      hints: [
        "Cross-attention is what links spatial image features to text semantics in the diffusion U-Net.",
        "Self-attention operates within the spatial feature map; cross-attention brings in external conditioning.",
      ],
    },
    {
      id: "q-dm-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The VAE used in LDMs (Stable Diffusion) employs a 'KL-regularized' latent space rather than a standard VAE. What is the role of the KL regularization coefficient in this context?",
      options: [
        "The KL term forces the latent distribution to match N(0,I) exactly, enabling clean Gaussian noise initialization for diffusion",
        "A small KL penalty (e.g., weight ~10^{-6}) keeps the latent space approximately Gaussian and prevents posterior collapse, while being small enough to allow a high-capacity encoder to preserve fine image details; without it, the decoder could exploit non-Gaussian structure that diffusion cannot model",
        "The KL term regularizes the cross-attention weights to prevent focus on single tokens",
        "The KL penalty is set to zero in Stable Diffusion, using VQ-regularization instead",
      ],
      correctAnswer: 1,
      explanation:
        "The KL coefficient in the LDM VAE is crucial: too large → aggressive posterior collapse (latent loses information, poor reconstruction); too small → latent space is non-Gaussian, making diffusion's Gaussian noise assumption invalid. The small KL weight used in practice (~10^{-6}) keeps the latent approximately Gaussian for diffusion compatibility while preserving reconstruction quality. The final latent is also scaled to unit variance before diffusion. Stable Diffusion's VAE uses KL-reg with this balance.",
      hints: [
        "The diffusion model assumes z_0 lies in a space where Gaussian noise perturbation is sensible.",
        "VQ-VAEs use discrete codebook quantization instead of KL-regularization as the regularizer.",
      ],
    },
  ],

  "stable-diffusion-arch": [
    {
      id: "q-dm-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Stable Diffusion's U-Net denoising architecture includes which key components for handling the conditioning information?",
      options: [
        "Convolutional layers only, with the text embedding concatenated to the input",
        "Residual blocks, self-attention layers within spatial feature maps, and cross-attention layers attending to text embeddings — enabling both global and spatial conditioning",
        "A pure transformer architecture processing the latent as a sequence of patches",
        "A ResNet-50 backbone with text embeddings added to the final pooling layer",
      ],
      correctAnswer: 1,
      explanation:
        "Stable Diffusion's U-Net uses a combination of: (1) ResNet/Conv residual blocks for local feature processing; (2) Self-attention for long-range spatial dependencies within the feature map; (3) Cross-attention for text conditioning (spatial features attend to text tokens). This architecture is applied at multiple resolutions via the U-Net encoder-decoder with skip connections, enabling hierarchical feature extraction and conditioning at multiple scales.",
      hints: [
        "The timestep t is embedded (sinusoidal + MLP) and added to the residual block activations.",
        "Cross-attention at multiple U-Net resolutions allows text to influence both coarse and fine image details.",
      ],
    },
    {
      id: "q-dm-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Stable Diffusion's text conditioning, CLIP's text encoder is used as τ_θ(y). What is a known limitation of using CLIP for text-to-image conditioning?",
      options: [
        "CLIP cannot process text longer than 77 tokens (the CLIP sequence length limit), restricting prompt complexity",
        "CLIP was trained on image-text pairs with contrastive loss, not for fine-grained text understanding; it may miss rare words, counting, spatial relations, and attribute binding (e.g., 'a red cube on top of a blue sphere')",
        "CLIP embeddings do not capture color information, so colored objects cannot be generated",
        "CLIP requires GPU inference but the U-Net runs on CPU, creating a bottleneck",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP's contrastive training objective aligns global image-text representations but is not optimized for fine-grained compositional understanding. Known failure modes include: attribute binding failures (wrong color-object combinations), spatial relationship errors ('a dog to the left of a cat'), counting errors, and rare entity handling. SDXL and later models use T5 or combined CLIP+T5 encoders (e.g., FLUX uses T5-XXL) to improve these aspects. The 77-token limit (from CLIP's positional encoding) is also a practical constraint.",
      hints: [
        "CLIP was trained to match images and captions globally, not to understand fine-grained compositional descriptions.",
        "T5 and other language models have better compositional understanding for generation conditioning.",
      ],
    },
    {
      id: "q-dm-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Stable Diffusion's VAE decodes latents from 64×64×4 to 512×512×3 images. Why is it important that the VAE decoder is high-fidelity, and what happens if it is the bottleneck?",
      options: [
        "A poor VAE decoder wastes compute during training but does not affect final image quality",
        "If the VAE decoder is the bottleneck (reconstruction quality is limited), diffusion model improvements won't translate to perceptual image quality improvements — high-frequency details (text, fine textures) that cannot be reconstructed by the VAE cannot be learned by the diffusion model",
        "The VAE decoder affects only the image resolution, not semantic quality",
        "A poor VAE decoder causes gradient vanishing during diffusion model training",
      ],
      correctAnswer: 1,
      explanation:
        "The VAE decoder is the final step in generation; its reconstruction quality sets an upper bound on image quality. If the VAE cannot accurately decode fine details (e.g., text, hair strands, fabric textures), no amount of diffusion model improvement will recover them — they are lost in the encode-decode bottleneck. SDXL and later models use improved VAEs (e.g., SDXL's VAE with channel dimension 4 but better training), and SD3/FLUX use improved VAEs with 16 channels to better represent fine details.",
      hints: [
        "SDXL's improved VAE shows better text rendering and fine-detail reconstruction compared to SD1.5's VAE.",
        "This is why text-in-image remains challenging for diffusion models: text requires precise fine-grained spatial structure.",
      ],
    },
  ],

  controlnet: [
    {
      id: "q-dm-kp8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "ControlNet (Zhang et al. 2023) enables spatially-controlled image generation by:",
      options: [
        "Training a separate image-to-image diffusion model for each control signal type",
        "Adding trainable copies of the U-Net encoder blocks that process the conditioning signal (edge map, depth, pose, etc.) and inject it via addition into the locked original U-Net backbone — preserving the pretrained model while adding spatial control",
        "Fine-tuning the full Stable Diffusion U-Net on paired image-condition data",
        "Replacing the text cross-attention with spatial cross-attention to the condition image",
      ],
      correctAnswer: 1,
      explanation:
        "ControlNet creates a trainable copy of the U-Net encoder blocks. This trainable copy processes the conditioning image (edge map, depth, pose, segmentation, etc.) and its outputs are added (via zero-initialized convolutions) to the corresponding decoder blocks of the original frozen U-Net. The zero-initialization ensures that at the start of training, ControlNet's contribution is zero — the original U-Net's generation capability is preserved while the ControlNet gradually learns to inject spatial conditioning.",
      hints: [
        "The 'zero convolutions' are the key trick: they ensure ControlNet starts as an identity (no-op) and learns incrementally.",
        "This architecture allows training on relatively small condition-image datasets without catastrophic forgetting.",
      ],
    },
    {
      id: "q-dm-kp8-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ControlNet requires re-training the entire Stable Diffusion model from scratch when adding a new conditioning signal type.",
      correctAnswer: "False",
      explanation:
        "ControlNet fine-tunes only the trainable copy of the encoder blocks, with the original U-Net weights locked (frozen). This means: (1) the pre-trained generation capability is preserved; (2) training is parameter-efficient (roughly 50% additional parameters); (3) different ControlNet models can be swapped in for different conditioning signals without retraining the base model. Multiple ControlNets can even be combined additively.",
      hints: [
        "The frozen backbone preserves the original model's text-to-image quality and generalization.",
        "This is similar to adapter methods in NLP — parameter-efficient fine-tuning by adding trainable modules.",
      ],
    },
    {
      id: "q-dm-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ControlNet is often used with 'cfg_scale' for text conditioning AND a separate 'control_strength' weight for the control signal. What happens when control_strength is set very high (e.g., 2.0)?",
      options: [
        "The model ignores the text prompt entirely and generates only from the control signal",
        "The spatial structure from the condition (e.g., edge map) is over-imposed, leading to images that match the control geometry very precisely but may show artifacts, loss of detail, or deviation from the text prompt because the control signal overrides the generative prior",
        "The VAE decoder becomes the bottleneck and quality drops sharply",
        "High control strength enables higher-resolution generation by increasing the effective receptive field",
      ],
      correctAnswer: 1,
      explanation:
        "ControlNet strength scales the additive contribution of the control signal to the U-Net. Very high strength causes the generation to be dominated by the control geometry, sometimes at the cost of text adherence and realism (the generative prior is overwhelmed). Conversely, very low strength gives minimal control. The optimal balance (typically 0.5-1.2) achieves both text adherence and structural control. This is analogous to the guidance scale vs. diversity trade-off in CFG.",
      hints: [
        "Control strength is a practical hyperparameter; too high can cause 'ControlNet hallucinations' where the control map imposes unnatural structure.",
        "This trade-off is analogous to CFG guidance scale — both tune adherence vs. quality/diversity.",
      ],
    },
  ],

  "lora-diffusion": [
    {
      id: "q-dm-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "LoRA (Low-Rank Adaptation) is applied to Stable Diffusion by adding trainable low-rank matrices to:",
      options: [
        "The VAE encoder and decoder weight matrices",
        "The attention projection matrices (Q, K, V, Output) and/or linear layers in the U-Net, typically with rank r=4-64",
        "The noise schedule parameters β_t",
        "The CLIP text encoder's final linear projection layer only",
      ],
      correctAnswer: 1,
      explanation:
        "For diffusion models, LoRA typically targets the U-Net's attention weight matrices (W_Q, W_K, W_V, W_O in self-attention and cross-attention) and sometimes the feed-forward layers. Each weight matrix W is augmented with BA where B∈ℝ^{d×r} and A∈ℝ^{r×k} (r << min(d,k)). Only A and B are trained; W is frozen. This allows fine-tuning a Stable Diffusion model for a new style or concept with ~1-50MB of weights instead of the full 2-4GB model.",
      hints: [
        "LoRA for diffusion is conceptually identical to LoRA for LLMs — just applied to the diffusion U-Net's linear layers.",
        "Multiple LoRA adapters can be merged additively, enabling style mixing.",
      ],
    },
    {
      id: "q-dm-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DreamBooth fine-tuning for personalized image generation with a rare token identifier [V] requires a 'prior preservation loss'. What is the purpose of this loss?",
      options: [
        "To preserve the diffusion model's noise schedule during fine-tuning",
        "To prevent catastrophic forgetting of the general concept class (e.g., 'dog') by simultaneously fine-tuning on class-representative images generated by the original model, maintaining the model's ability to generate other dogs besides the specific subject",
        "To preserve the LoRA rank during fine-tuning and prevent rank collapse",
        "To ensure the CLIP text embeddings of [V] align with the original token embeddings",
      ],
      correctAnswer: 1,
      explanation:
        "DreamBooth fine-tunes on only 3-5 subject images (e.g., your dog), which causes catastrophic forgetting of the broader class ('dog'). The prior preservation loss adds a regularization term: generate ~100-200 images of the class using the original model, then include them in fine-tuning with class captions (e.g., 'a dog'). The model simultaneously learns [V] = your dog while maintaining general dog generation capability. Without it, 'dog' becomes synonymous with your specific dog.",
      hints: [
        "Prior preservation = using the original model to generate its own regularization data for the class.",
        "This is a form of 'rehearsal' (continual learning) to prevent forgetting the base concept.",
      ],
    },
    {
      id: "q-dm-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When merging multiple LoRA adapters for Stable Diffusion (e.g., a style LoRA + a character LoRA), the standard approach of linear interpolation W' = W + α₁B₁A₁ + α₂B₂A₂ can cause interference. What technique mitigates this?",
      options: [
        "Increasing the LoRA rank r to reduce the interference between adapters",
        "Using SVD-based LoRA merging: decompose each LoRA BA via SVD, truncate to a shared rank, then combine the principal components — or using TIES-merging (Task-Incremental Editing with Sparsity) to resolve sign conflicts",
        "Always training both LoRAs jointly from scratch to avoid interference",
        "Increasing the alpha (scaling) hyperparameter for both LoRAs to offset interference",
      ],
      correctAnswer: 1,
      explanation:
        "Direct linear addition of LoRA deltas can cause interference when the LoRA updates have conflicting directions (sign conflicts) or overlap in their effective subspaces. SVD-based merging identifies the principal update directions and combines them orthogonally where possible. TIES-merging (Yadav et al. 2023) resolves conflicts by keeping only parameters with consistent signs across models and trimming small magnitudes. For diffusion LoRAs, empirical tuning of α₁ and α₂ is also common.",
      hints: [
        "Model merging is an active research area; TIES, DARE, and task arithmetic are common approaches.",
        "Interference is more problematic when LoRAs are trained on very different data distributions or tasks.",
      ],
    },
  ],

  "inpainting-outpainting": [
    {
      id: "q-dm-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Diffusion-based image inpainting is performed by conditioning the denoising process on the known (unmasked) region. The standard approach during inference is:",
      options: [
        "Masking the unknown region in pixel space and letting the diffusion model generate independent of the known region",
        "At each denoising step, replacing the known (unmasked) regions of x_t with the correctly noised version of the original image x_0, while denoising the unknown (masked) region — ensuring consistency with the known pixels",
        "Running the full denoising process and then pasting the known region on top of the generated image",
        "Fine-tuning the diffusion model on masked image-completion pairs before inference",
      ],
      correctAnswer: 1,
      explanation:
        "The RePaint algorithm (Lugmayr et al., 2022) and most inpainting methods use a 'masked noising-renoising' approach: at each step t, the known region of x_t is replaced by q(x_t|x_0_known) (the correctly noised original pixels at noise level t), while the unknown region is denoised by p_θ(x_{t-1}|x_t). This ensures the generated content is consistent with the known region at all noise levels. Without this replacement, the model may ignore the known region.",
      hints: [
        "The key insight: known pixels should always be at the correct noise level for step t, not fully denoised or at a different noise level.",
        "Some inpainting models (e.g., Stable Diffusion Inpaint) add the mask as an extra input channel to the U-Net instead.",
      ],
    },
    {
      id: "q-dm-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Outpainting (extending an image beyond its boundaries) cannot be performed with a standard text-to-image diffusion model — it requires a model specifically trained for outpainting.",
      correctAnswer: "False",
      explanation:
        "Outpainting can be performed with a standard inpainting model by padding the image with a mask in the region to be extended, and running inpainting conditioned on the existing image content. The existing pixels guide the generation of the new region to maintain consistency. MultiDiffusion and tiling approaches enable outpainting at arbitrary aspect ratios by running overlapping denoising windows. No dedicated outpainting training is strictly required, though fine-tuned outpainting models (e.g., DALL-E's outpainting) can yield better results.",
      hints: [
        "Outpainting = inpainting where the 'hole' is at the boundary of the image.",
        "Tiling with overlapping patches allows extending to arbitrary canvas sizes.",
      ],
    },
    {
      id: "q-dm-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The main challenge in diffusion-based inpainting that leads to 'boundary artifacts' (visible seams at the mask boundary) is:",
      options: [
        "The VAE decoder upscales the inpainted region differently from the known region",
        "The diffusion model generates the inpainted region independently of the exact pixel values just outside the mask boundary at intermediate noise levels, causing inconsistency in fine-grained texture and lighting at the seam",
        "The classifier-free guidance scale is too high near the mask boundary",
        "The CLIP text embedding cannot capture local spatial context near the mask",
      ],
      correctAnswer: 1,
      explanation:
        "Boundary artifacts arise because: (1) the model must match fine-grained texture, lighting, and structure exactly at the mask boundary, but at intermediate noise levels the nearby pixels are noisy and not well-constrained; (2) the generated region and known region are from different 'random seeds' (different noise realizations), causing subtle lighting and texture discontinuities. Remedies include: using a feathered/soft mask, harmonic inpainting for blending, or overlap-and-stitch approaches that enforce consistency in overlapping regions.",
      hints: [
        "Even with perfect semantic coherence, color/lighting mismatches at the boundary are common.",
        "Poisson blending (gradient-domain compositing) is sometimes applied as a post-processing step.",
      ],
    },
  ],

  dit: [
    {
      id: "q-dm-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DiT (Diffusion Transformer, Peebles & Xie 2023) replaces the U-Net backbone with a Transformer. The latent image is processed as:",
      options: [
        "A sequence of 1D tokens representing pixel rows",
        "Non-overlapping patches of the spatial latent, treated as a sequence of visual tokens processed by standard Transformer blocks — similar to ViT",
        "A global image embedding passed as a CLS token to the Transformer",
        "A hierarchical set of wavelet coefficients at multiple resolutions",
      ],
      correctAnswer: 1,
      explanation:
        "DiT patchifies the latent (e.g., 32×32×4 latent into 2×2 patches → 256 tokens of dimension 16), processes them with standard Transformer blocks (multi-head self-attention + feed-forward), and reconstructs the denoised noise. Class labels and timestep are injected via adaptive layer normalization (adaLN-Zero). DiT shows that transformer scaling laws apply to diffusion — larger DiTs with more FLOPS consistently achieve lower FID, following a predictable power-law.",
      hints: [
        "DiT-XL/2 (largest DiT with patch size 2) achieves state-of-the-art class-conditional ImageNet generation.",
        "The key advantage of DiT over U-Net: global self-attention across all patches from the start, not just at bottleneck.",
      ],
    },
    {
      id: "q-dm-kp11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DiT uses 'adaLN-Zero' for conditioning on timestep t and class label c. What does 'Zero' refer to in this initialization?",
      options: [
        "The layer normalization weights are initialized to zero",
        "The scale and shift parameters γ and β in adaLN are predicted by linear layers initialized to output zero, ensuring that at initialization each DiT block is an identity function — enabling stable training",
        "The class embedding c is zero-padded to match the timestep embedding dimension",
        "Zero refers to the zero-noise initialization of the diffusion process at t=0",
      ],
      correctAnswer: 1,
      explanation:
        "AdaLN-Zero initializes the linear layers that predict γ (scale) and β (shift) conditioned on (t, c) to zero, so initially γ=1 and β=0 (standard LayerNorm). This is the 'zero initialization' trick — every DiT block starts as an identity residual connection, making early training stable. As training progresses, the adaLN layers learn meaningful conditioning. This is analogous to the zero-convolution trick in ControlNet.",
      hints: [
        "Zero initialization of residual branches is a standard practice in deep network training (ReZero, FixUp).",
        "Starting as an identity ensures the gradient flows well from the beginning of training.",
      ],
    },
    {
      id: "q-dm-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Scaling experiments in DiT showed that model performance (FID on ImageNet 256×256) follows a power law with compute (GFLOPS). This implies:",
      options: [
        "There is an optimal model size beyond which performance degrades",
        "Larger DiT models with more compute consistently achieve lower FID (better quality), and performance is predictable from compute budget without training to convergence — enabling rational model scaling",
        "Performance saturates quickly, making compute beyond a threshold wasteful",
        "The U-Net is provably optimal at all model sizes, and DiT only catches up at extreme scale",
      ],
      correctAnswer: 1,
      explanation:
        "DiT's scaling experiments showed a clear power-law relationship: FID ∝ GFLOPS^{-α} (approximately). This predictability — following the language model scaling laws of Kaplan et al. — means researchers can predict the FID of a larger DiT model from smaller experiments. This motivated subsequent work like SD3 and FLUX, which use DiT/MMDiT architectures at scale. The power-law scaling is a strong argument for the Transformer architecture in diffusion models.",
      hints: [
        "Scaling laws in diffusion were motivated by the success of scaling laws in LLMs (Chinchilla, GPT-4).",
        "This result shifts the paradigm from U-Net architecture search to simply scaling transformer depth/width.",
      ],
    },
  ],

  "flow-matching": [
    {
      id: "q-dm-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Flow Matching (Lipman et al. 2022; Liu et al. 2022) trains a vector field v_θ(x_t, t) by directly regressing the 'conditional vector field' that transports noise to data. The training objective is:",
      options: [
        "Minimizing the KL divergence between p_0 (noise) and p_1 (data) using the learned flow",
        "E_{t,x_0,ε}[||v_θ(x_t, t) - u_t(x_t|x_0)||²] where u_t(x_t|x_0) = (x_0 - x_t)/(1-t) is the conditional vector field for straight-line paths",
        "Maximizing the log-likelihood of x_0 under the flow-induced distribution",
        "Minimizing the score matching loss at each timestep t uniformly",
      ],
      correctAnswer: 1,
      explanation:
        "Flow Matching trains a neural ODE vector field by regressing against the conditional vector field for simple paths. For the linear interpolation path x_t = (1-t)·ε + t·x_0 (where ε~N(0,I)), the conditional vector field is u_t(x_t|x_0) = x_0 - ε = (x_0 - x_t)/(1-t). The unconditional vector field (the target for generation) is recovered by marginalizing over x_0. This avoids the complex SDE formulation of diffusion while being equivalent for Gaussian paths.",
      hints: [
        "Flow Matching regresses the velocity (direction + speed), not the score (gradient of log density).",
        "Linear (straight-line) paths are the key insight: they make the conditional vector field simple and constant.",
      ],
    },
    {
      id: "q-dm-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Flow Matching with straight-line (linear) interpolation paths allows generation with far fewer function evaluations (NFEs) than DDPM because the ODE paths are approximately straight.",
      correctAnswer: "True",
      explanation:
        "When the learned vector field is approximately constant along the trajectory (straight-line paths), a simple Euler ODE integrator with few steps (even 1-2) can accurately follow the path from noise to data. In contrast, DDPM's curved SDE paths require many steps (1000) or sophisticated solvers. FLUX and SD3 exploit this: they train with flow matching and generate high-quality images in 20-30 steps. The 'optimal transport' path (straightest paths in distribution space) minimizes path curvature.",
      hints: [
        "Euler integration error is proportional to path curvature — straight paths minimize error.",
        "FLUX uses rectified flow (a variant of flow matching with straight paths) and generates in ~20 steps.",
      ],
    },
    {
      id: "q-dm-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Rectified Flow (Liu et al. 2022) improves sample quality over standard Flow Matching through 'reflow'. What does reflow do?",
      options: [
        "It adds noise back to generated samples and retrains to improve stability",
        "It generates (x_0, x_T) pairs from the trained flow (by running the ODE forward from training data and storing the noise source), then trains a new flow to connect these pairs with straight lines — progressively straightening the flow trajectories",
        "It applies k-NN smoothing to the learned vector field to remove discontinuities",
        "It uses consistency distillation to reduce the flow to a single step",
      ],
      correctAnswer: 1,
      explanation:
        "Reflow (in Rectified Flow): (1) Train an initial flow model on random (x_0, ε) pairs; (2) Generate coupled (x_0_generated, ε) pairs by running the ODE and recording the source noise; (3) Train a new flow model on these coupled pairs. The coupled pairs have straighter trajectories (because they come from the same ODE path), so the new flow has more linear paths and can be solved more accurately with fewer steps. This can be applied repeatedly ('k-Rectified Flow').",
      hints: [
        "Reflow is essentially 'data augmentation for straighter paths' — using the trained model to generate better (x_0, ε) pairs.",
        "After reflow, a single-step ODE (one NFE) can achieve reasonable quality, motivating consistency distillation.",
      ],
    },
  ],

  "consistency-models": [
    {
      id: "q-dm-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Consistency Models (Song et al. 2023) are designed to enable single-step generation. The core property they enforce is:",
      options: [
        "The model generates the same image regardless of the noise schedule used",
        "The 'consistency property': f_θ(x_t, t) = f_θ(x_{t'}, t') for any two points x_t and x_{t'} on the same ODE trajectory — all points on the same trajectory map to the same clean image x_0",
        "The model maintains consistent attention weights across all timesteps",
        "The generated images are perceptually consistent with the text conditioning",
      ],
      correctAnswer: 1,
      explanation:
        "Consistency models learn a function f_θ that maps any point (x_t, t) on the diffusion ODE trajectory to the same endpoint x_0. This 'self-consistency' property means that once you have a noisy x_t at any t, a single forward pass of f_θ gives you x_0 without iterative denoising. Consistency distillation trains f_θ to satisfy f_θ(x_t, t) ≈ f_θ(x_{t-1-ε}, t-1-ε) for adjacent ODE steps, propagating the consistency property through training.",
      hints: [
        "Consistency models can also do multi-step refinement for better quality: apply ε-noise to x_0 and reapply f_θ.",
        "The boundary condition f_θ(x_0, 0) = x_0 ensures the model is the identity at t=0.",
      ],
    },
    {
      id: "q-dm-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Consistency Training (CT) and Consistency Distillation (CD) differ in that:",
      options: [
        "CT requires 10× more training steps than CD",
        "CD distills from a pretrained diffusion model (using it as a teacher to generate adjacent ODE-consistent pairs), while CT trains consistency from scratch using a self-consistency loss without a pretrained teacher",
        "CT only works for pixel-space models while CD works for latent diffusion",
        "CD produces higher quality single-step samples than CT in all settings",
      ],
      correctAnswer: 1,
      explanation:
        "Consistency Distillation (CD) uses a pretrained score/diffusion model to generate adjacent pairs (x_t, x_{t-ε}) and trains f_θ to map both to the same x_0. This leverages the teacher's knowledge. Consistency Training (CT) has no teacher — instead it uses exponential moving average (EMA) of f_θ as a pseudo-target and directly enforces self-consistency. CT is harder to train but independent of a pretrained model. CD generally achieves better sample quality with the same number of training steps.",
      hints: [
        "CD is analogous to knowledge distillation from a large teacher model.",
        "CT requires careful training (learning rate schedules, EMA decay) to avoid divergence without a teacher.",
      ],
    },
    {
      id: "q-dm-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Improved Consistency Training (iCT, Song & Dhariwal 2023) addresses training instability through 'pseudo-Huber loss' and a 'lognormal noise schedule'. What problem does the lognormal noise schedule solve?",
      options: [
        "It ensures the model focuses equally on all noise levels instead of only high noise",
        "It allocates training samples to noise levels proportional to the difficulty of predicting x_0 from x_t — oversampling the medium-noise regime where learning is most informative and most unstable, improving training efficiency and stability",
        "It replaces the linear interpolation path with an optimal transport path",
        "It prevents gradient explosion at low noise levels by capping the maximum step size",
      ],
      correctAnswer: 1,
      explanation:
        "The lognormal noise schedule in iCT samples timesteps from a lognormal distribution, oversampling the intermediate noise regime (where the ODE curvature is highest and learning signal is most informative) relative to very high noise (where all images look the same) and very low noise (where the model is nearly converged). This improves training efficiency by focusing compute on the hardest timesteps. Combined with pseudo-Huber loss (robust to outliers) and exponential moving average, iCT achieves much better stability.",
      hints: [
        "Uniform sampling of timesteps wastes compute on easy (very noisy or very clean) steps.",
        "The lognormal schedule is parameterized by mean μ and std σ, tunable hyperparameters.",
      ],
    },
  ],

  dreambooth: [
    {
      id: "q-dm-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "DreamBooth (Ruiz et al. 2022) personalizes a text-to-image diffusion model by:",
      options: [
        "Collecting 1000+ images of the subject and fine-tuning the full model",
        "Fine-tuning the diffusion model on 3-5 images of a subject, binding the subject to a unique identifier token [V] and a class noun (e.g., 'a [V] dog'), with prior preservation loss to prevent language drift",
        "Training a LoRA adapter on the subject images while freezing the U-Net",
        "Using CLIP to embed the subject image and conditioning generation on this embedding",
      ],
      correctAnswer: 1,
      explanation:
        "DreamBooth uses 3-5 subject images and fine-tunes the full diffusion model (text encoder + U-Net) to associate a rare token identifier like [V] with the specific subject. The training loss = reconstruction loss on subject images + prior preservation loss on class images. After training, prompts like 'a [V] dog in Paris' generate the specific dog in novel contexts. The key insights are: (1) rare token binding; (2) prior preservation prevents overfitting to just the 3-5 images.",
      hints: [
        "DreamBooth is often used for personalized portraits, product photography, and pet photos.",
        "The identifier [V] is a placeholder — in practice, rare tokens or special tokens (e.g., 'sks') are used.",
      ],
    },
    {
      id: "q-dm-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DreamBooth fine-tuning always requires fine-tuning both the U-Net and the text encoder to achieve high fidelity subject reconstruction.",
      correctAnswer: "False",
      explanation:
        "Original DreamBooth fine-tunes only the U-Net. Later work showed that fine-tuning the text encoder (CLIP encoder) can improve concept binding and fidelity. However, fine-tuning the text encoder risks 'language drift' — corrupting the encoding of other words. Extended DreamBooth techniques (like using LoRA for the text encoder) can improve results without full text encoder fine-tuning. Many practical implementations use U-Net-only fine-tuning for safety, or LoRA on both.",
      hints: [
        "Text encoder fine-tuning helps the token [V] develop richer semantics but risks corrupting other concepts.",
        "The trade-off is fidelity vs. compositionality — fine-tuning the text encoder can reduce the model's ability to generalize the subject to new contexts.",
      ],
    },
    {
      id: "q-dm-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A common failure mode of DreamBooth is 'overfitting' — the model memorizes the 3-5 training images and loses generalization. Which technique most directly addresses this?",
      options: [
        "Using a lower learning rate (1e-6 instead of 1e-5)",
        "The prior preservation loss using class-generated images, which regularizes the model to maintain the broader class distribution while also learning the specific subject — effectively preventing the model from collapsing to just the training images",
        "Training for fewer steps (100 instead of 800)",
        "Increasing the classifier-free guidance scale during training",
      ],
      correctAnswer: 1,
      explanation:
        "Prior preservation directly combats overfitting: by simultaneously training on ~100-200 class images (e.g., other dogs generated by the original model), the model is penalized for drifting too far from the general class distribution. Without prior preservation, the model quickly overfits to the 3-5 subject images and cannot generate the subject in novel contexts (e.g., 'a [V] dog swimming'). The number of steps before overfitting varies by subject — validation images are used to select the checkpoint.",
      hints: [
        "Overfitting in DreamBooth manifests as: model only generates the training poses/backgrounds, ignoring novel prompts.",
        "Prior preservation is the 'rehearsal' mechanism — analogous to replay in continual learning.",
      ],
    },
  ],

  "diffusion-eval": [
    {
      id: "q-dm-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Fréchet Inception Distance (FID) measures the quality of generated images by:",
      options: [
        "Computing the pixel-level MSE between generated and real images",
        "Comparing the distribution of Inception-v3 features between generated and real images using the Fréchet distance between two Gaussians fit to the features",
        "Computing the CLIP similarity between generated images and their text prompts",
        "Measuring the classification accuracy of a ResNet trained on real images evaluated on generated images",
      ],
      correctAnswer: 1,
      explanation:
        "FID compares the statistics of InceptionV3 pool3 features (2048-dim) between real and generated image sets. It fits a Gaussian to each set (mean μ and covariance Σ) and computes FID = ||μ_r - μ_g||² + Tr(Σ_r + Σ_g - 2(Σ_r·Σ_g)^{1/2}). Lower FID = more similar distributions. FID captures both quality and diversity — a generator that copies training images has low FID, but so does one that generates diverse, high-quality images matching the real distribution.",
      hints: [
        "FID = 0 means the generated distribution is identical to the real distribution (in feature space).",
        "FID is sample-size dependent — typically computed with 50k generated images for fair comparison.",
      ],
    },
    {
      id: "q-dm-kp15-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CLIP Score evaluates text-to-image alignment by computing the cosine similarity between CLIP image and text embeddings. A high CLIP Score indicates:",
      options: [
        "High photorealism of the generated image",
        "High semantic alignment between the generated image and the text prompt — the image content matches what the prompt describes",
        "High diversity of generated images across different prompts",
        "Low FID on the benchmark dataset",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP Score = CLIP_sim(image, text) measures whether the generated image matches the text prompt semantically. It is used to evaluate prompt following in text-to-image models. However, CLIP Score has known limitations: it correlates with CLIP's biases (e.g., it favors images that look like CLIP training data) and may not capture fine-grained compositional accuracy (attribute binding, counting). It is often used alongside FID to trade off quality vs. alignment.",
      hints: [
        "High CLIP Score + low FID = ideal: images are both high quality and match the text.",
        "CLIP Score can be gamed by models that generate 'CLIP-friendly' images that aren't visually realistic.",
      ],
    },
    {
      id: "q-dm-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Precision/Recall decomposition for generative models (Kynkäänniemi et al., 2019) separates FID into two components. What do they measure?",
      options: [
        "Precision = percentage of pixels matching real images; Recall = percentage of real images that can be reconstructed",
        "Precision = fraction of generated samples that fall within the real data manifold (fidelity/quality); Recall = fraction of real data manifold covered by generated samples (diversity/coverage)",
        "Precision = FID for high-quality images; Recall = FID for low-quality images",
        "Precision = CLIP Score; Recall = 1 - FID",
      ],
      correctAnswer: 1,
      explanation:
        "Precision measures quality: what fraction of generated samples are 'realistic' (fall near the real data distribution)? Recall measures diversity: what fraction of the real data distribution is 'covered' by the generated samples? FID conflates these two aspects. A model can have high precision but low recall (mode-dropping: generates only some modes) or low precision and high recall (mode-covering: generates everything including unrealistic samples). Guidance scale in CFG primarily trades recall for precision: higher guidance → higher precision, lower recall.",
      hints: [
        "A model that generates only one perfect cat image has precision=1 but recall≈0.",
        "A model that generates all kinds of images (including bad ones) has high recall but low precision.",
      ],
    },
  ],

  "molecular-generation": [
    {
      id: "q-dm-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Diffusion models for molecular generation operate on what representation of molecules?",
      options: [
        "SMILES strings processed as text sequences",
        "3D atomic coordinates and atom types as point clouds or graph structures, where the diffusion process perturbs atomic positions and optionally atom types",
        "Fingerprint vectors (Morgan/ECFP) as dense numerical inputs",
        "Adjacency matrices representing bond graphs",
      ],
      correctAnswer: 1,
      explanation:
        "Molecular diffusion models (e.g., DiffSBDD, DiffDock, EDM) operate on 3D molecular structures: each atom is represented by its 3D Cartesian coordinates and atom type. The forward process adds Gaussian noise to atomic positions (and possibly corrupts atom types), while the reverse process denoises to produce valid 3D conformations. Equivariant neural networks (e.g., EGNN, SE(3)-Transformers) are used to respect molecular symmetries (rotational, translational, and permutation invariance).",
      hints: [
        "3D structure matters for drug design: the shape and charge distribution determine protein binding.",
        "Equivariance ensures the model generates the same molecule regardless of its orientation in 3D space.",
      ],
    },
    {
      id: "q-dm-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Equivariance to the SE(3) group (3D rotations and translations) is essential for molecular diffusion models because molecules should be generated with the same validity regardless of their absolute orientation in space.",
      correctAnswer: "True",
      explanation:
        "A valid molecule should have the same structure whether it is rotated or translated in 3D space. If the generative model is not SE(3)-equivariant, it would need to learn separately that a benzene ring rotated by 45° is the same as the original — vastly increasing sample complexity. Equivariant models (EGNN, SE(3)-Transformer, SEGNN) encode this symmetry by construction: rotating the input rotates the output by the same amount, with the molecular validity score unchanged.",
      hints: [
        "SE(3) = Special Euclidean group in 3D = rotations (SO(3)) + translations.",
        "Permutation invariance (over atom ordering) is also needed — molecules have no canonical atom ordering.",
      ],
    },
    {
      id: "q-dm-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DiffDock (Corso et al. 2022) applies diffusion on the ligand pose space for protein-ligand docking. The key innovation is diffusing over:",
      options: [
        "The atomic coordinates of both the protein and ligand simultaneously",
        "A factored pose space: translation (position of ligand center), rotation (SO(3) orientation of the rigid ligand), and torsion angles (internal rotatable bonds) — using separate score networks for each component",
        "SMILES string edits that progressively modify the ligand chemical structure",
        "A combined embedding of protein pocket and ligand fingerprint",
      ],
      correctAnswer: 1,
      explanation:
        "DiffDock defines the ligand pose by (translation, rotation, torsion angles) and runs diffusion separately on each: translation diffusion (R³), rotation diffusion (SO(3)), and torsion angle diffusion (Tⁿ, the n-dimensional torus for n rotatable bonds). Each component has its own score network, and the reverse process denoises all components jointly. This structured representation allows efficient generalization across molecular sizes and avoids the curse of dimensionality of raw 3D coordinate diffusion for all atoms.",
      hints: [
        "Docking = finding the correct (translation, rotation, conformation) of a small molecule in a protein pocket.",
        "SO(3) diffusion uses the geodesic distance on the rotation manifold as the noise metric.",
      ],
    },
  ],

  "rlhf-diffusion": [
    {
      id: "q-dm-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "RLHF for diffusion models (e.g., DDPO, DPOK, Diffusion-DPO) aims to fine-tune a diffusion model to maximize a reward function r(x_0). The main challenge compared to RLHF for LLMs is:",
      options: [
        "There is no reward function available for image generation",
        "The diffusion generation process consists of T sequential denoising steps, making it a very long-horizon RL problem with sparse reward (only x_0 is evaluated) and extremely long credit assignment chains",
        "Diffusion models are not differentiable with respect to the generated output",
        "Human feedback cannot be collected for image generation tasks",
      ],
      correctAnswer: 1,
      explanation:
        "In LLM RLHF, sequences are typically <1000 tokens. In diffusion RLHF, the 'sequence' is T=1000 denoising steps, each a high-dimensional continuous action (the denoised image x_{t-1}). The reward r(x_0) is only observed at the end, creating a T-step credit assignment problem. PPO applied to diffusion (DDPO) treats each denoising step as an RL action and backpropagates the reward through the entire denoising chain (or uses importance weighting for efficiency).",
      hints: [
        "The denoising chain is analogous to a very long Markov chain in RL — reward shaping and truncated backprop are common tricks.",
        "DDPO formulates diffusion sampling as a POMDP and applies policy gradient methods.",
      ],
    },
    {
      id: "q-dm-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Diffusion-DPO directly optimizes a diffusion model using preference pairs (winning/losing images) without requiring an explicit reward model.",
      correctAnswer: "True",
      explanation:
        "Diffusion-DPO (Wallace et al. 2023) adapts Direct Preference Optimization (DPO) to diffusion models. Given paired images (x_w, x_l) with human preference x_w > x_l, it directly optimizes the diffusion model to increase the likelihood of generating x_w over x_l, without an intermediate reward model. The DPO objective for diffusion uses the ELBO (Evidence Lower Bound) to tractably compute the implicit reward. This is analogous to how DPO works in LLMs — bypassing the RM training step.",
      hints: [
        "Diffusion-DPO ≈ DPO applied to the DDPM ELBO instead of log-likelihoods of token sequences.",
        "The 'implicit reward' in DPO is log[π_θ(x)/π_ref(x)] — the log probability ratio of the model and reference.",
      ],
    },
    {
      id: "q-dm-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DDPO (Black et al. 2023) uses policy gradient (REINFORCE) to optimize a diffusion model with a reward. The key practical challenge they address is:",
      options: [
        "Computing the full gradient of the reward through all T denoising steps requires O(T) memory and time proportional to the U-Net cost",
        "Directly computing the policy gradient requires differentiating through the reward function, which may not be differentiable",
        "Storing and replaying T-step denoising trajectories is memory-intensive; DDPO addresses this using importance sampling to reuse samples from previous model iterations, updating the policy with a clipped ratio similar to PPO to prevent large policy updates",
        "Diffusion models use stochastic sampling, making policy gradient variance too high without baseline subtraction",
      ],
      correctAnswer: 2,
      explanation:
        "DDPO's key insight is adapting PPO's clipped surrogate objective to diffusion: instead of computing gradients through new T-step rollouts each iteration (expensive), it stores old trajectories and uses importance sampling weights π_θ(τ)/π_{θ_old}(τ) to correct for the policy change. The PPO clip ensures the update doesn't deviate too far from the old policy. This is crucial because generating new diffusion trajectories for every gradient step would be prohibitively expensive (T forward passes per sample).",
      hints: [
        "Reusing old trajectories via importance sampling is the PPO trick that makes on-policy RL tractable.",
        "The clipping prevents the importance weight ratio from growing too large, maintaining training stability.",
      ],
    },
  ],

  "distillation-diffusion": [
    {
      id: "q-dm-kp18-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Progressive Distillation (Salimans & Ho 2022) reduces the number of sampling steps by half at each distillation iteration. The student model is trained to:",
      options: [
        "Predict x_0 directly from x_T in a single forward pass",
        "Match the two-step teacher output in a single step: given x_t, the student's single-step prediction of x_{t-2} matches the teacher's two-step prediction (x_t → x_{t-1} → x_{t-2})",
        "Minimize the KL divergence between the student's and teacher's feature distributions",
        "Reproduce the noise prediction ε at every other timestep",
      ],
      correctAnswer: 1,
      explanation:
        "Progressive Distillation trains a student to replicate the output of two teacher steps in a single step: x̂_0^{student}(x_t, t) = x̂_0^{teacher,2step}(x_t, t) where the right side uses two DDIM steps. This halves the number of required steps. After distillation, the student becomes the new teacher, and the process repeats — from 1000 steps to 512, 256, ..., 8, 4 steps with 4 distillation rounds. Each round takes ~15-25% of the original training compute.",
      hints: [
        "The distillation target is always in x_0 space (the denoised image), making it parameterization-independent.",
        "After 3 rounds: 1000 → 500 → 250 → 125 steps. After ~7 rounds: 1000 → 8 steps.",
      ],
    },
    {
      id: "q-dm-kp18-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Latent Consistency Models (LCM, Luo et al. 2023) combine consistency distillation with the latent diffusion framework to achieve fast generation. A key trick LCM uses is 'skipping steps' in distillation. What does this mean?",
      options: [
        "The student model skips every other denoising step during inference",
        "Instead of distilling adjacent ODE steps (t → t-1), LCM distills over larger intervals (t → t-k for k > 1), making the consistency condition easier to satisfy and enabling fewer training steps to reach a good model",
        "LCM skips the prior preservation loss used in DreamBooth-style fine-tuning",
        "The latent VAE encoding step is skipped during distillation training",
      ],
      correctAnswer: 1,
      explanation:
        "LCM uses 'accelerated ODE solving' during distillation: instead of requiring f_θ(x_t, t) = f_θ(x_{t-1}, t-1) (adjacent timestep consistency), it requires f_θ(x_t, t) = f_θ(x_{t-k}, t-k) for larger k. This 'skipping' enforces consistency over longer ODE intervals, making the model more strongly self-consistent across multiple steps. Combined with using an existing LDM as the teacher (not training from scratch), LCM achieves 2-4 step generation on Stable Diffusion in ~32 A100 GPU hours.",
      hints: [
        "LCM can be applied to Stable Diffusion or SDXL via LoRA (LCM-LoRA) without full fine-tuning.",
        "The 'skip' schedule is a key hyperparameter — larger skips give faster but potentially lower-quality generation.",
      ],
    },
    {
      id: "q-dm-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Score Distillation Sampling (SDS, Poole et al. 2022) uses a diffusion model's score to optimize a NeRF or other differentiable rendering system for text-to-3D generation. The SDS gradient is:",
      options: [
        "The gradient of the diffusion model's ELBO with respect to the NeRF parameters",
        "∂L_SDS/∂θ = E_t,ε[ w(t)·(ε_φ(x_t, t, y) - ε)·∂x/∂θ ] — the score guidance (difference between predicted and actual noise) backpropagated through the rendering to update NeRF parameters",
        "The gradient of the rendered image's pixel values with respect to NeRF parameters",
        "The CLIP gradient of text-image similarity backpropagated through the renderer",
      ],
      correctAnswer: 1,
      explanation:
        "SDS (used in DreamFusion): render a 2D view x = g(θ) from the NeRF g with parameters θ, add noise x_t = √ᾱ_t·x + √(1-ᾱ_t)·ε, run the diffusion model to get ε_φ(x_t,t,y). The SDS gradient is w(t)·(ε_φ - ε)·∂x/∂θ — essentially using the diffusion model's score to tell the NeRF 'which direction in image space to move to be more consistent with text prompt y'. The U-Net Jacobian is dropped (CFG + diffusion U-Net used as a 'critic').",
      hints: [
        "SDS updates the NeRF parameters using the 2D diffusion model as a perceptual 'critic' for 3D content.",
        "Known artifacts of SDS: 'Janus problem' (multi-face issue) and over-saturation, addressed by VSD (Variational Score Distillation).",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
