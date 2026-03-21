import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "forward-diffusion-process": [
    {
      id: "q-dm-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In DDPM (Denoising Diffusion Probabilistic Models), the forward diffusion process $q(x_t \\mid x_{t-1})$ adds Gaussian noise at each step. Which property makes this process computationally tractable for training?",
      options: [
        "The forward process can be reversed analytically without any learned model",
        "The marginal $q(x_t \\mid x_0)$ has a closed-form Gaussian expression: $x_t = \\sqrt{\\bar{\\alpha}_t}\\,x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon$, where $\\varepsilon \\sim \\mathcal{N}(0, I)$",
        "The forward process preserves the signal energy of the input across all timesteps",
        "The forward process is deterministic, making it invertible by construction",
      ],
      correctAnswer: 1,
      explanation:
        "The key insight is the reparameterization trick for Gaussians. Since each forward step adds Gaussian noise, the composition of $T$ Gaussian perturbations is itself Gaussian.\n\n**Step 1**\n\nDefine $\\alpha_t = 1 - \\beta_t$ and $\\bar{\\alpha}_t = \\prod_{s=1}^{t} \\alpha_s$. The marginal distribution at timestep $t$ is:\n\n\\[\nq(x_t \\mid x_0) = \\mathcal{N}\\!\\left(x_t; \\sqrt{\\bar{\\alpha}_t}\\,x_0,\\; \\left(1-\\bar{\\alpha}_t\\right)\\,I\\right).\n\\]\n\n**Step 2**\n\nEquivalently, we can write this in reparameterized form:\n\n\\[\nx_t = \\sqrt{\\bar{\\alpha}_t}\\,x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon, \\qquad \\varepsilon \\sim \\mathcal{N}(0, I).\n\\]\n\n**Step 3**\n\nThis means we can directly sample $x_t$ from $x_0$ at any timestep $t$ in a single step - no need to iterate through the full chain of $T$ steps. This direct sampling property is essential for training efficiency.",
      hints: [
        "When noise is added at each step, the cumulative effect after $T$ steps follows a specific pattern - think about what happens when you add Gaussians to Gaussians.",
        "As $\\bar{\\alpha}_t$ decreases toward zero, the scaling factor on $x_0$ shrinks while the noise scaling grows - what does this imply about the final distribution?",
      ],
    },
    {
      id: "q-dm-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DDPM uses an increasing noise schedule $\\beta_1 < \\beta_2 < \\cdots < \\beta_T$. What is the effect of increasing $\\beta_t$ at a given step $t$?",
      options: [
        "More structure from $x_0$ is preserved at step $t$",
        "More noise is injected at step $t$, destroying signal faster - the signal-to-noise ratio decreases at that step",
        "The denoising network must predict larger noise magnitudes at step $t$",
        "The total number of denoising steps $T$ required for good samples increases",
      ],
      correctAnswer: 1,
      explanation:
        "The noise schedule controls how much signal is retained at each step. The forward transition is:\n\n**Step 1**\n\n\\[\nq(x_t \\mid x_{t-1}) = \\mathcal{N}\\!\\left(x_t; \\sqrt{1-\\beta_t}\\,x_{t-1},\\; \\beta_t\\,I\\right).\n\\]\n\n**Step 2**\n\nWhen $\\beta_t$ increases:\n- The variance $\\beta_t$ of the added noise grows.\n- The scaling $\\sqrt{1-\\beta_t}$ of $x_{t-1}$ shrinks.\n- So more noise is added and less of the previous signal survives.\n\n**Step 3**\n\nIn the original DDPM paper, the schedule runs from $\\beta_1 \\approx 10^{-4}$ to $\\beta_T \\approx 0.02$, giving a gradual, nearly linear destruction of structure. The cosine schedule (Nichol & Dhariwal, 2021) was later introduced to spread information loss more uniformly across timesteps.",
      hints: [
        "Consider extreme cases: at $\\beta_t = 0$, no noise is added; at $\\beta_t = 1$, what happens to $x_t$?",
        "The signal-to-noise ratio measures how much original signal remains relative to added noise - does it increase or decrease as $\\beta_t$ grows?",
      ],
    },
    {
      id: "q-dm-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Applying Bayes' rule to the Gaussian forward process gives the posterior $q(x_{t-1} \\mid x_t, x_0)$. This posterior is a Gaussian whose mean $\\tilde{\\mu}_t$ equals:",
      options: [
        "$\\tilde{\\mu}_t = x_0$",
        "$\\tilde{\\mu}_t = \\dfrac{1}{\\sqrt{\\alpha_t}}\\left(x_t - \\dfrac{\\beta_t}{\\sqrt{1-\\bar{\\alpha}_t}}\\,\\varepsilon_t\\right)$",
        "$\\tilde{\\mu}_t = \\dfrac{\\sqrt{\\bar{\\alpha}_{t-1}\\,}\\beta_t}{1-\\bar{\\alpha}_t}\\,x_0 + \\dfrac{\\sqrt{\\alpha_t}\\,(1-\\bar{\\alpha}_{t-1})}{1-\\bar{\\alpha}_t}\\,x_t$",
        "$\\tilde{\\mu}_t = \\dfrac{x_t - \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon}{\\sqrt{\\bar{\\alpha}_t}}$",
      ],
      correctAnswer: 2,
      explanation:
        "We start from the two relevant forward conditionals:\n\n**Step 1**\n\n\\[\nq(x_t \\mid x_{t-1}) = \\mathcal{N}\\!\\left(x_t; \\sqrt{1-\\beta_t}\\,x_{t-1},\\; \\beta_t\\,I\\right), \\quad q(x_{t-1} \\mid x_0) = \\mathcal{N}\\!\\left(x_{t-1}; \\sqrt{\\bar{\\alpha}_{t-1}}\\,x_0,\\; \\left(1-\\bar{\\alpha}_{t-1}\\right)\\,I\\right).\n\\]\n\n**Step 2**\n\nApplying Bayes' rule and using the Gaussian product formula (product of two Gaussians yields another Gaussian):\n\n\\[\nq(x_{t-1} \\mid x_t, x_0) = \\mathcal{N}\\!\\left(x_{t-1}; \\tilde{\\mu}_t,\\; \\tilde{\\beta}_t\\,I\\right),\n\\]\n\nwhere the mean is a weighted combination of $x_0$ and $x_t$:\n\n\\[\n\\tilde{\\mu}_t = \\frac{\\sqrt{\\bar{\\alpha}_{t-1}\\,}\\beta_t}{1-\\bar{\\alpha}_t}\\,x_0 + \\frac{\\sqrt{\\alpha_t}\\,(1-\\bar{\\alpha}_{t-1})}{1-\\bar{\\alpha}_t}\\,x_t.\n\\]\n\n**Step 3**\n\nThe first term weights $x_0$ by how much signal remains at $t-1$; the second weights the noisy observation $x_t$. The reverse process $p_\\theta(x_{t-1} \\mid x_t)$ learns to approximate this posterior.",
      hints: [
        "When multiplying two Gaussians and normalizing, the result is another Gaussian - what are the mean and variance of this product?",
        "Think about what information each variable carries: $x_0$ has the original signal, while $x_t$ has been corrupted by noise - how should these be weighted in the posterior?",
      ],
    },
  ],

  ddpm: [
    {
      id: "q-dm-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Ho et al. (2020) discovered that the DDPM training objective can be simplified to noise prediction. Which expression correctly states the simplified loss?",
      options: [
        "$\\mathcal{L} = \\mathbb{E}\\big[\\|x_0 - \\hat{x}_0(x_t, t)\\|^2\\big]$ - reconstruct $x_0$ from $x_t$",
        "$\\mathcal{L} = \\mathbb{E}\\big[\\|\\varepsilon - \\varepsilon_\\theta(\\sqrt{\\bar{\\alpha}_t}\\,x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon,\\; t)\\|^2\\big]$ - predict the added noise $\\varepsilon$",
        "$\\mathcal{L} = \\mathbb{E}\\big[\\mathrm{KL}\\big(q(x_{t-1} \\mid x_t, x_0) \\;\\|\\; p_\\theta(x_{t-1} \\mid x_t)\\big)\\big]$ - minimize the full ELBO",
        "$\\mathcal{L} = \\mathbb{E}\\big[\\|\\nabla_{x_t} \\log p(x_t) - s_\\theta(x_t, t)\\|^2\\big]$ - predict the score function",
      ],
      correctAnswer: 1,
      explanation:
        "Ho et al. (2020) derived the DDPM objective from the ELBO and found that a simplified noise-prediction loss works better empirically.\n\n**Step 1**\n\nStarting from the reparameterization:\n\n\\[\nx_t = \\sqrt{\\bar{\\alpha}_t}\\,x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon, \\qquad \\varepsilon \\sim \\mathcal{N}(0, I).\n\\]\n\nThe model predicts $\\varepsilon_\\theta(x_t, t) \\approx \\varepsilon$.\n\n**Step 2**\n\nThe simplified loss is:\n\n\\[\n\\mathcal{L}_\\text{simple} = \\mathbb{E}_{t,\\,x_0,\\,\\varepsilon}\\big[\\|\\varepsilon - \\varepsilon_\\theta(x_t,\\; t)\\|^2\\big].\n\\]\n\n**Step 3**\n\nThis is equivalent to score matching up to the scaling factor $1/\\sqrt{1-\\bar{\\alpha}_t}$:\n\n\\[\n\\varepsilon_\\theta(x_t, t) = -\\sqrt{1-\\bar{\\alpha}_t}\\,\\nabla_{x_t} \\log q(x_t) \\approx -\\sqrt{1-\\bar{\\alpha}_t}\\,s_\\theta(x_t, t).\n\\]\n\nEmpirically, noise prediction outperformed both $x_0$-reconstruction and the full ELBO.",
      hints: [
        "The noise-prediction loss is related to score matching - can you derive the relationship between predicting noise $\\varepsilon$ and predicting the score $\\nabla \\log q(x_t)$?",
        "The U-Net takes two inputs: the noisy image $x_t$ and the timestep $t$. Think about how each of these influences the predicted noise.",
      ],
    },
    {
      id: "q-dm-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DDPM sampling requires exactly $T$ sequential denoising steps (one per timestep, from $T$ down to $0$) to generate a high-quality sample.",
      correctAnswer: "True",
      explanation:
        "DDPM's reverse process is Markovian: given $x_t$, the model predicts the noise $\\varepsilon_\\theta(x_t, t)$ and samples:\n\n**Step 1**\n\n\\[\nx_{t-1} \\sim p_\\theta(x_{t-1} \\mid x_t) = \\mathcal{N}\\!\\left(x_{t-1}; \\mu_\\theta(x_t, t),\\; \\sigma_t^2 I\\right).\n\\]\n\n**Step 2**\n\nEach step $t \\to t-1$ requires one forward pass of the neural network, so generating one sample requires $T$ sequential passes. In the original DDPM paper, $T = 1000$.\n\n**Step 3**\n\nThis is DDPM's primary practical limitation: 1000 sequential neural network evaluations make generation slow. DDIM (Song et al., 2020) and other accelerated samplers break the Markovian structure to skip steps, reducing generation to 10-50 steps while maintaining quality.",
      hints: [
        "Think about the computational cost: if each denoising step requires one network forward pass, how many passes are needed for $T$ steps?",
        "DDIM uses the same noise-prediction network but changes the sampling procedure - what property of the reverse process allows steps to be skipped?",
      ],
    },
    {
      id: "q-dm-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The DDPM ELBO decomposes as $\\mathcal{L} = \\mathcal{L}_T + \\sum_{t=1}^{T-1} \\mathcal{L}_t + \\mathcal{L}_0$. What does the $\\mathcal{L}_T$ term represent, and why is it dropped from training?",
      options: [
        "$\\mathcal{L}_T = \\mathrm{KL}\\big(q(x_T \\mid x_0) \\;\\|\\; p(x_T)\\big)$ measures how close the final noisy distribution is to $\\mathcal{N}(0, I)$; it is dropped because a well-designed schedule ensures $q(x_T \\mid x_0) \\approx \\mathcal{N}(0, I)$, making $\\mathcal{L}_T \\approx 0$",
        "$\\mathcal{L}_T$ measures the reconstruction quality of $x_0$ from $x_T$; it is dropped because $T$ is so large that reconstruction is impossible",
        "$\\mathcal{L}_T$ is the log-likelihood of $x_0$ under the model prior; it is dropped because the prior is uniform",
        "$\\mathcal{L}_T$ measures the variance of gradient estimates; it is dropped because it has no closed form",
      ],
      correctAnswer: 0,
      explanation:
        "The ELBO for DDPM decomposes across all timesteps.\n\n**Step 1**\n\n\\[\n\\mathcal{L} = \\mathcal{L}_T + \\sum_{t=1}^{T-1} \\mathcal{L}_t + \\mathcal{L}_0,\n\\]\n\nwhere each $\\mathcal{L}_t = \\mathrm{KL}\\big(q(x_t \\mid x_{t+1}, x_0) \\;\\|\\; p_\\theta(x_t \\mid x_{t+1})\\big)$.\n\n**Step 2**\n\nThe $\\mathcal{L}_T$ term measures the divergence between the final noisy distribution and the prior:\n\n\\[\n\\mathcal{L}_T = \\mathrm{KL}\\big(q(x_T \\mid x_0) \\;\\|\\; p(x_T)\\big), \\quad p(x_T) = \\mathcal{N}(0, I).\n\\]\n\n**Step 3**\n\nWith a well-designed schedule ($\\bar{\\alpha}_T \\approx 0$), we have $q(x_T \\mid x_0) \\approx \\mathcal{N}(0, I) = p(x_T)$, so $\\mathcal{L}_T \\approx 0$. Moreover, $p(x_T)$ has no learnable parameters - backpropagating through $\\mathcal{L}_T$ would not update $\\varepsilon_\\theta$. Hence it is safely dropped from training.",
      hints: [
        "The prior $p(x_T)$ is a standard Gaussian with fixed parameters - can gradients flow through it to update the model?",
        "As $T \\to \\infty$, what happens to $\\bar{\\alpha}_T$? What does $q(x_T \\mid x_0)$ approach in this limit?",
      ],
    },
  ],

  "score-matching": [
    {
      id: "q-dm-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Score matching (Hyvärinen, 2005) learns a neural network $s_\\theta(x) \\approx \\nabla_x \\log p(x)$ - the score function. Why is the score function useful for generative modeling?",
      options: [
        "The score function directly gives the probability density $p(x)$, enabling exact likelihood computation",
        "Knowing the score enables Langevin dynamics sampling: $x_{t+1} = x_t + \\frac{\\varepsilon}{2}\\,\\nabla_x \\log p(x_t) + \\sqrt{\\varepsilon}\\,z$, which iteratively produces samples from $p(x)$",
        "The score function minimizes the KL divergence between $q(x)$ and $p(x)$ analytically",
        "The score function removes the need for any noise schedule in diffusion models",
      ],
      correctAnswer: 1,
      explanation:
        "The score $\\nabla_x \\log p(x)$ points in the direction of steepest increase in log-probability.\n\n**Step 1**\n\nStarting from arbitrary initialization (e.g., pure noise), we can sample from $p(x)$ using Langevin dynamics:\n\n\\[\nx_{t+1} = x_t + \\frac{\\varepsilon}{2}\\,\\nabla_x \\log p(x_t) + \\sqrt{\\varepsilon}\\,z_t, \\qquad z_t \\sim \\mathcal{N}(0, I).\n\\]\n\n**Step 2**\n\nUnder mild conditions, as $\\varepsilon \\to 0$ and $t \\to \\infty$, the chain converges to samples from $p(x)$.\n\n**Step 3**\n\nScore-based models (Song & Ermon, 2019) learn $s_\\theta(x) \\approx \\nabla_x \\log p(x)$ and use annealed Langevin dynamics at multiple noise scales to handle multi-modal distributions. This directly connects score matching to diffusion models.",
      hints: [
        "Langevin dynamics combines gradient ascent with injected noise - what is the purpose of the noise term?",
        "The score is the gradient of log-probability - why might this be easier to learn than the probability itself?",
      ],
    },
    {
      id: "q-dm-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Denoising Score Matching (Vincent, 2011) replaces the intractable vanilla score matching objective with a tractable one. Which statement correctly describes it?",
      options: [
        "Learning the score at $x$ directly by automatic differentiation of a density estimator",
        "Learning to predict the score of a corrupted distribution $q_\\sigma(\\tilde{x} \\mid x)$ from clean data, using the identity $\\nabla_{\\tilde{x}} \\log q_\\sigma(\\tilde{x}) = (x - \\tilde{x})/\\sigma^2$ for Gaussian corruption",
        "Minimizing the Fisher divergence between the learned score and the data score",
        "Learning the reverse-time SDE coefficients via maximum likelihood on clean data",
      ],
      correctAnswer: 1,
      explanation:
        "Vanilla score matching requires differentiating through the log-density $\\nabla_x \\log p(x)$, which is intractable for implicit models. Denoising score matching avoids this by instead learning the score of a corrupted distribution.\n\n**Step 1**\n\nFor Gaussian noise corruption $\\tilde{x} = x + \\sigma\\,\\varepsilon$, the score of the noisy distribution has a simple closed form:\n\n\\[\n\\nabla_{\\tilde{x}} \\log q_\\sigma(\\tilde{x}) = -\\frac{\\varepsilon}{\\sigma} = \\frac{x - \\tilde{x}}{\\sigma^2}.\n\\]\n\n**Step 2**\n\nThe denoising score matching objective is:\n\n\\[\n\\mathbb{E}_{x,\\,\\tilde{x}}\\big[\\|s_\\theta(\\tilde{x}) - (x - \\tilde{x})/\\sigma^2\\|^2\\big],\n\\]\n\nwhich is tractable - no density or partition function needed.\n\n**Step 3**\n\nThis connects directly to DDPM: noise prediction $\\varepsilon_\\theta$ is proportional to the negative score estimation.",
      hints: [
        "For Gaussian noise, the score points from the noisy point back toward the clean point - can you see why from the formula $\\nabla \\log q_\\sigma = (x - \\tilde{x})/\\sigma^2$?",
        "If $\\varepsilon_\\theta$ is proportional to the score, what is the proportionality constant in terms of the noise schedule?",
      ],
    },
    {
      id: "q-dm-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Song et al. (2021) unified score-based models and diffusion models under stochastic differential equations (SDEs). What is the key insight of this framework?",
      options: [
        "The forward diffusion process is equivalent to solving an ODE in the data space",
        "Any forward SDE $dx = f(x,t)\\,dt + g(t)\\,dw$ has a corresponding reverse SDE that depends on the score $\\nabla_x \\log p_t(x)$; learning this score at all noise levels enables exact reversal of the forward process",
        "Score matching can only be applied to continuous-state Markov chains, not to continuous-time processes",
        "The score function is constant across all noise levels, allowing a single model to denoise at any level",
      ],
      correctAnswer: 1,
      explanation:
        "The SDE framework (Song et al., 2021) generalizes both the discrete DDPM and SMLD models.\n\n**Step 1**\n\nAny It\\^o SDE:\n\n\\[\ndx = f(x, t)\\,dt + g(t)\\,dw\n\\]\n\nhas a corresponding reverse-time SDE (Anderson, 1982):\n\n\\[\ndx = \\big[f(x, t) - g(t)^2 \\nabla_x \\log p_t(x)\\big]\\,dt + g(t)\\,d\\bar{w}.\n\\]\n\n**Step 2**\n\nGiven a learned time-dependent score function $s_\\theta(x, t) \\approx \\nabla_x \\log p_t(x)$, we can simulate this reverse SDE to generate samples from $p_0$ (the data distribution).\n\n**Step 3**\n\nDDPM corresponds to the variance-preserving (VP) SDE; SMLD corresponds to the variance-exploding (VE) SDE. This unification shows why score matching and DDPM are fundamentally equivalent.",
      hints: [
        "The reverse-time SDE depends on the score function - what does this tell us about what we need to learn to reverse the forward process?",
        "VP-SDE and VE-SDE differ in how they add noise - what are the implications for the corresponding reverse processes?",
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
        "Defining a non-Markovian reverse process that is consistent with the same forward marginals $q(x_t \\mid x_0)$, allowing timesteps to be skipped during sampling while using the same trained DDPM noise-prediction network $\\varepsilon_\\theta$",
        "Increasing the noise schedule's variance so fewer steps are needed to reach the data distribution",
        "Distilling the $T$-step DDPM into a single-step generator",
      ],
      correctAnswer: 1,
      explanation:
        "DDIM replaces DDPM's Markovian reverse chain with a generalized, non-Markovian process.\n\n**Step 1**\n\nThe key property is that the reverse process is designed to produce the same forward marginals $q(x_t \\mid x_0)$ - so the model still sees the correct noise levels during training.\n\n**Step 2**\n\nBecause the reverse process is non-Markovian, the transition from $x_t$ to $x_{t-1}$ depends on the entire trajectory, not just $x_t$. This allows skipping directly from $x_t$ to $x_{t'}$ for $t' \\ll t$.\n\n**Step 3**\n\nThis enables high-quality generation in 10-50 steps (instead of 1000) using the same trained noise-prediction network $\\varepsilon_\\theta$ without any retraining.",
      hints: [
        "What constraint ensures that DDIM's reverse process is consistent with DDPM's forward marginals? Think about what must be preserved.",
        "The parameter $\\eta$ controls the stochasticity of DDIM - at $\\eta = 0$ we get deterministic ODE-based sampling. What happens at $\\eta = 1$?",
      ],
    },
    {
      id: "q-dm-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DDIM with $\\eta = 0$ (fully deterministic sampling) enables exact image reconstruction from its latent representation $x_T$, making the generative process invertible.",
      correctAnswer: "True",
      explanation:
        "With $\\eta = 0$, DDIM uses a deterministic mapping from the initial noise $x_T$ to the generated image $x_0$.\n\n**Step 1**\n\nRunning the reverse DDIM in the forward direction - called DDIM inversion - maps a real image $x_0$ to its corresponding $x_T$.\n\n**Step 2**\n\nThis invertibility is the foundation of many image editing methods. A real image is inverted to $x_T$, the latent is edited by modifying the denoising trajectory, and then DDIM regeneration produces the edited image.\n\n**Step 3**\n\nMethods such as SDEdit, Prompt-to-Prompt, and Null-Text Inversion all rely on DDIM inversion to map real images into the latent space for editing.",
      hints: [
        "If DDIM is deterministic at $\\eta = 0$, running it forward from $x_0$ and backward from $x_T$ should give back the original images - why is this useful for editing?",
        "What would happen if DDIM were stochastic (non-zero $\\eta$)? Would inversion still work?",
      ],
    },
    {
      id: "q-dm-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The DDIM update from $x_t$ to $x_{t-1}$ can be written as:\n\n\\[x_{t-1} = \\sqrt{\\bar{\\alpha}_{t-1}}\\,\\hat{x}_0(x_t) + \\text{direction\\_term} + \\text{noise\\_term}.\\]\n\nWhat is $\\hat{x}_0(x_t)$ in this expression?",
      options: [
        "The raw output of the U-Net at timestep $t$",
        "The $x_0$ prediction derived from $x_t$ and the predicted noise: $\\hat{x}_0 = \\dfrac{x_t - \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon_\\theta(x_t, t)}{\\sqrt{\\bar{\\alpha}_t}}$",
        "A random sample drawn from the data distribution",
        "The exponential moving average of all previous $x_0$ predictions",
      ],
      correctAnswer: 1,
      explanation:
        "DDIM reparameterizes the reverse update in terms of a predicted clean image $\\hat{x}_0(x_t)$.\n\n**Step 1**\n\nThis is obtained by inverting the forward marginal relation:\n\n\\[\nx_t = \\sqrt{\\bar{\\alpha}_t}\\,x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon \\quad \\Longrightarrow \\quad\n\\hat{x}_0(x_t) = \\frac{x_t - \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon_\\theta(x_t, t)}{\\sqrt{\\bar{\\alpha}_t}}.\n\\]\n\n**Step 2**\n\nThis is the $x_0$ prediction implied by the current noise estimate - also known as the Tweedie denoising estimate.\n\n**Step 3**\n\nThe full DDIM step then interpolates between $\\hat{x}_0$ and the direction toward $x_t$, taking a larger step than DDPM would allow. This $\\hat{x}_0$ reparameterization is also used in modern distillation methods such as consistency models.",
      hints: [
        "If you know the noise $\\varepsilon$ and the noisy image $x_t$, can you solve for the estimated clean image $\\hat{x}_0$?",
        "The Tweedie estimate is the mean of the conditional distribution $p(x_0 \\mid x_t)$ - why might predicting the clean image be useful for sampling?",
      ],
    },
  ],

  "classifier-free-guidance": [
    {
      id: "q-dm-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Classifier-Free Guidance (CFG, Ho & Salimans 2022) modifies the score estimate during sampling as $\\tilde{\\varepsilon}_\\theta(x_t, c) = (1+w)\\,\\varepsilon_\\theta(x_t, c) - w\\,\\varepsilon_\\theta(x_t, \\emptyset)$. The guidance weight $w$ controls:",
      options: [
        "The number of denoising steps used during sampling",
        "The trade-off between sample quality (adherence to the conditioning signal $c$) and diversity - higher $w$ increases adherence to $c$ but reduces diversity and can cause saturation or artifacts",
        "The noise schedule $\\beta_t$ applied during sampling",
        "The weighting between the diffusion loss and the classifier loss",
      ],
      correctAnswer: 1,
      explanation:
        "CFG extrapolates in score space.\n\n**Step 1**\n\nThe guided estimate is:\n\n\\[\n\\tilde{\\varepsilon}_\\theta(x_t, c) = (1+w)\\,\\varepsilon_\\theta(x_t, c) - w\\,\\varepsilon_\\theta(x_t, \\emptyset).\n\\]\n\n**Step 2**\n\nWhen $w = 0$, we recover standard conditional sampling. When $w > 0$, the direction toward the conditioning signal $c$ is amplified relative to the unconditional estimate.\n\n**Step 3**\n\nThis improves prompt adherence but reduces diversity. Typical guidance weights for DALL-E/Stable Diffusion are $w = 7$-$15$.",
      hints: [
        "The CFG formula can be rewritten as $\\varepsilon_\\theta + w(\\varepsilon_\\theta(x_t, c) - \\varepsilon_\\theta(x_t, \\emptyset))$ - what does the term in parentheses represent?",
        "As $w$ increases, the guidance amplifies the conditional direction. What happens to diversity as $w$ gets very large?",
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
        "CFG is 'classifier-free' precisely because it does not require any separate classifier.\n\n**Step 1**\n\nInstead, the same diffusion model is jointly trained on two objectives:\n- Conditional: with a conditioning signal $c$ (e.g., a text prompt).\n- Unconditional: with $c$ replaced by a null token $\\emptyset$, which is randomly dropped during training (roughly 10-20\\% of the time).\n\n**Step 2**\n\nAt sampling time, two forward passes compute the conditional and unconditional noise estimates, and their difference is used for guidance.\n\n**Step 3**\n\nThis avoids the distributional mismatch of classifier-based guidance and requires only one model.",
      hints: [
        "Classifier guidance (the earlier approach) required a separately trained noise-robust classifier $p_\\phi(c \\mid x_t)$.",
        "CFG trains a single model with dropout of the conditioning signal to produce both conditional and unconditional scores from one forward pass.",
      ],
    },
    {
      id: "q-dm-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CFG's guided score can be written as $\\tilde{s} = (1+w)\\,\\nabla_x \\log p(x \\mid c) - w\\,\\nabla_x \\log p(x)$. This is equivalent to the score of an unnormalized distribution $p(x \\mid c)\\,[p(x \\mid c)/p(x)]^w$. What does this 'energy tilt' mean intuitively?",
      options: [
        "CFG converts the diffusion model into an energy-based model by computing the energy as $-\\log p(x \\mid c)$",
        "The guided score exponentially upweights regions where $p(x \\mid c) / p(x)$ is large - i.e., regions strongly consistent with the condition $c$ relative to the unconditional distribution - effectively sharpening the conditional distribution",
        "CFG is equivalent to maximum likelihood estimation with temperature annealing",
        "The guidance weight $w$ corresponds to the Lagrange multiplier in constrained optimization of the ELBO",
      ],
      correctAnswer: 1,
      explanation:
        "Rewriting the guided score:\n\n\\[\n(1+w)\\,\\nabla_x \\log p(x \\mid c) - w\\,\\nabla_x \\log p(x)\n= \\nabla_x \\log \\Big[p(x \\mid c)\\, \\big(p(x \\mid c) / p(x)\\big)^w\\Big]\n= \\nabla_x \\log \\Big[\\frac{p(x \\mid c)^{1+w}}{p(x)^w}\\Big].\n\\]\n\nThis corresponds to a distribution that exponentially upweights regions where the likelihood ratio $p(x \\mid c) / p(x)$ is large. By Bayes' rule, $\\frac{p(x \\mid c)}{p(x)} = \\frac{p(c \\mid x)}{p(c)}$, so regions strongly consistent with the condition $c$ (high $p(c \\mid x)$) receive much more probability mass. This is why CFG produces more 'on-topic' but less diverse samples - it is an energy-based tilt of the conditional distribution.",
      hints: [
        "The ratio $p(x \\mid c) / p(x) = p(c \\mid x) / p(c)$ by Bayes' rule - CFG is implicitly amplifying wherever the model believes the condition $c$ is most likely.",
        "This explains the diversity-quality trade-off: upweighting high-$p(c \\mid x)$ regions necessarily downweights regions the model finds plausible but unrelated to $c$.",
      ],
    },
  ],

  "latent-diffusion-models": [
    {
      id: "q-dm-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Latent Diffusion Models (LDMs, Rombach et al. 2022) run the diffusion process in the latent space of a pre-trained autoencoder rather than in pixel space. What is the primary motivation?",
      options: [
        "Latent space diffusion produces higher-quality images than pixel-space diffusion",
        "Computational efficiency: high-resolution images (e.g., $512 \\times 512 \\times 3$ pixels) are compressed to a much smaller latent (e.g., $64 \\times 64 \\times 4$), dramatically reducing memory and compute while preserving perceptually important information",
        "Latent diffusion allows the use of non-Gaussian noise in the forward process",
        "The autoencoder encoder removes all noise from the data before diffusion begins",
      ],
      correctAnswer: 1,
      explanation:
        "Pixel-space diffusion on $512 \\times 512 \\times 3$ images requires operating on $786{,}432$-dimensional vectors. LDMs compress images by $4$-$8\\times$ per spatial dimension using a VQ-VAE or KL-VAE encoder, then run diffusion in the compressed latent (e.g., $64 \\times 64 \\times 4$).\n\nThis reduces compute by roughly $8$-$64\\times$ while maintaining image quality, because the autoencoder is trained to preserve most perceptually important information. The U-Net denoiser operates on the compact latent, making both training and inference practical at high resolution.",
      hints: [
        "Stable Diffusion is an LDM: it uses a VAE to compress to $64 \\times 64 \\times 4$ latents and runs diffusion there.",
        "The autoencoder is pre-trained and frozen during diffusion model training - only the U-Net is trained.",
      ],
    },
    {
      id: "q-dm-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Stable Diffusion (an LDM), the text prompt is incorporated into the denoising U-Net via cross-attention layers, where the text embedding acts as the key and value, and the spatial feature map acts as the query.",
      correctAnswer: "True",
      explanation:
        "Stable Diffusion uses CLIP text embeddings as conditioning. The U-Net's spatial feature maps (queries) attend to the text token embeddings (keys and values) via cross-attention at multiple resolutions.\n\nThe cross-attention operation is:\n\n\\[\nQ = W_Q \\cdot \\phi(z_t), \\quad K = W_K \\cdot \\tau_\\theta(y), \\quad V = W_V \\cdot \\tau_\\theta(y),\n\\]\n\nwhere $z_t$ is the diffusion latent at step $t$ and $\\tau_\\theta$ is the CLIP text encoder. This allows different spatial regions of the latent to attend to different text tokens, enabling fine-grained spatial conditioning.",
      hints: [
        "Self-attention operates within the spatial feature map; cross-attention brings in external conditioning from the text embedding.",
        "The cross-attention formulation allows spatial regions to selectively attend to different parts of the text prompt.",
      ],
    },
    {
      id: "q-dm-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The VAE in LDMs (such as Stable Diffusion) uses a KL-regularized latent space rather than a standard VAE. What is the role of the KL regularization coefficient?",
      options: [
        "The KL term forces the latent distribution to exactly match $\\mathcal{N}(0, I)$, enabling clean Gaussian noise initialization for diffusion",
        "A small KL penalty (e.g., weight $\\approx 10^{-6}$) keeps the latent approximately Gaussian and prevents posterior collapse, while remaining small enough to allow the encoder to preserve fine image details - without it, the decoder could exploit non-Gaussian structure that diffusion cannot model",
        "The KL term regularizes the cross-attention weights to prevent the model from focusing on single tokens",
        "The KL penalty is set to zero in Stable Diffusion, using VQ-regularization instead",
      ],
      correctAnswer: 1,
      explanation:
        "The KL coefficient in the LDM VAE balances two competing objectives:\n- Too large: aggressive posterior collapse, where the latent loses information and reconstruction quality drops.\n- Too small: the latent space is non-Gaussian, violating the diffusion model's assumption of Gaussian noise perturbation.\n\nA small KL weight (approximately $10^{-6}$) keeps the latent approximately Gaussian while preserving reconstruction quality. The latent is also scaled to unit variance before diffusion. This balance is crucial: if the latent contains structure the diffusion model cannot represent as Gaussian noise, that information is unrecoverable in generation.",
      hints: [
        "The diffusion model assumes $z_0$ lies in a space where Gaussian noise perturbation is a sensible operation - too much KL destroys this property.",
        "VQ-VAEs use discrete codebook quantization instead of KL-regularization as the regularizer, avoiding the Gaussian assumption entirely.",
      ],
    },
  ],

  "stable-diffusion-arch": [
    {
      id: "q-dm-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Stable Diffusion's U-Net denoising architecture includes which key components for processing conditioning information?",
      options: [
        "Convolutional layers only, with the text embedding concatenated to the input",
        "Residual convolution blocks, self-attention layers within spatial feature maps, and cross-attention layers attending to text embeddings - enabling both local feature processing and global conditioning at multiple scales",
        "A pure transformer architecture processing the latent as a sequence of patches",
        "A ResNet-50 backbone with text embeddings added to the final pooling layer",
      ],
      correctAnswer: 1,
      explanation:
        "Stable Diffusion's U-Net combines three types of layers:\n1. ResNet/convolution blocks for local feature extraction.\n2. Self-attention within the spatial feature map for long-range spatial dependencies.\n3. Cross-attention for conditioning (text embeddings attend to spatial queries).\n\nThis architecture is applied at multiple resolutions via the encoder-decoder with skip connections. The timestep $t$ is embedded via sinusoidal positional encodings and an MLP, then added to the residual block activations. Cross-attention at multiple U-Net resolutions allows text to influence both coarse (global structure) and fine (local details) image features.",
      hints: [
        "The timestep $t$ is embedded via sinusoidal encodings + MLP and added to the residual block activations at each resolution.",
        "Cross-attention at multiple U-Net resolutions allows text to influence both the overall composition and fine details of the generated image.",
      ],
    },
    {
      id: "q-dm-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Stable Diffusion uses CLIP's text encoder $\\tau_\\theta(y)$ to encode the text prompt $y$. What is a known limitation of using CLIP for text-to-image conditioning?",
      options: [
        "CLIP cannot process prompts longer than 77 tokens, which restricts prompt complexity",
        "CLIP was trained on image-text pairs with a contrastive loss, not for fine-grained compositional understanding - it may miss rare words, spatial relations, counting, and attribute binding (e.g., 'a red cube on top of a blue sphere')",
        "CLIP embeddings do not capture color information, so colored objects cannot be generated",
        "CLIP requires GPU inference, creating a bottleneck at sampling time",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP's contrastive training objective aligns global image and text representations, but it is not optimized for fine-grained compositional reasoning. Known failure modes include:\n- Attribute binding errors (wrong color-object pairs).\n- Spatial relationship errors ('a dog to the left of a cat' may not preserve left-right orientation).\n- Counting errors.\n- Rare entity handling.\n\nSDXL and later models address these limitations by using T5 encoders (SDXL uses CLIP + T5-XXL), which have better compositional understanding due to their language modeling pre-training.",
      hints: [
        "CLIP was trained to match images and captions globally, not to understand fine-grained compositional descriptions like attribute binding or counting.",
        "T5 and other language model encoders (e.g., in FLUX) have better compositional understanding because they are pre-trained with next-token prediction objectives.",
      ],
    },
    {
      id: "q-dm-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Stable Diffusion's VAE decodes latents from $64 \\times 64 \\times 4$ to $512 \\times 512 \\times 3$. Why is it important that the VAE decoder is high-fidelity, and what happens if it is the bottleneck?",
      options: [
        "A poor VAE decoder wastes compute during training but does not affect final image quality",
        "If the VAE decoder is the bottleneck, diffusion model improvements do not translate to perceptual image quality - high-frequency details (text, fine textures) that cannot be reconstructed by the VAE cannot be learned by the diffusion model either, since they are already lost in the encode-decode cycle",
        "The VAE decoder affects only image resolution, not semantic quality",
        "A poor VAE decoder causes gradient vanishing during diffusion model training",
      ],
      correctAnswer: 1,
      explanation:
        "The VAE decoder is the final step in image generation - its reconstruction quality sets an upper bound on image quality. If the VAE cannot accurately decode fine details (e.g., small text, hair strands, fabric textures), no amount of improvement in the diffusion U-Net can recover them. They are lost in the encode-decode bottleneck.\n\nThis is why text rendering remains challenging in diffusion models: text requires precise high-frequency spatial structure that the VAE typically cannot faithfully reconstruct from a $64 \\times 64 \\times 4$ latent. SDXL and later models use improved VAEs (more channels, better training) to address this. SD3 and FLUX use VAEs with 16 latent channels for better fine-detail representation.",
      hints: [
        "SDXL's improved VAE shows noticeably better text rendering and fine-detail reconstruction compared to SD1.5's VAE.",
        "This bottleneck is why improving VAE quality is a primary research direction alongside improving diffusion models.",
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
        "Adding trainable copies of the U-Net encoder blocks whose outputs are added (via zero-initialized convolutions) to the frozen original U-Net decoder - preserving the pretrained model's capabilities while incrementally learning to inject spatial conditioning from edge maps, depth, pose, etc.",
        "Fine-tuning the full Stable Diffusion U-Net on paired image-condition data",
        "Replacing the text cross-attention with spatial cross-attention to the conditioning image",
      ],
      correctAnswer: 1,
      explanation:
        "ControlNet creates a trainable copy of the U-Net encoder blocks. The conditioning image (edge map, depth, pose, segmentation, etc.) is processed by this trainable copy, and its outputs are added to the corresponding decoder blocks of the original frozen U-Net via zero-initialized $1 \\times 1$ convolutions.\n\nThe zero-initialization is critical: at the start of training, ControlNet's contribution is exactly zero - the original U-Net's generation capability is fully preserved. The model then learns incrementally to inject spatial conditioning without catastrophic forgetting of the pre-trained weights.",
      hints: [
        "The 'zero convolutions' ensure ControlNet starts as a no-op (identity) and learns incrementally without disrupting the frozen backbone.",
        "This architecture allows training on relatively small conditioning datasets without losing the pre-trained generation capability.",
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
        "ControlNet fine-tunes only the trainable copy of the encoder blocks - the original U-Net weights remain frozen. This means:\n1. The pre-trained text-to-image capability is fully preserved.\n2. Training is parameter-efficient (roughly 50% additional parameters over the base model).\n3. Different ControlNet adapters can be swapped for different conditioning signals without retraining the base model.\n4. Multiple ControlNets can even be combined additively for multi-condition control.",
      hints: [
        "The frozen backbone preserves the original model's text-to-image quality and generalization - no catastrophic forgetting.",
        "This is conceptually similar to adapter methods in NLP: parameter-efficient fine-tuning by adding trainable modules to a frozen backbone.",
      ],
    },
    {
      id: "q-dm-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ControlNet uses a separate $\\text{control\\_strength}$ weight alongside CFG's $\\text{cfg\\_scale}$. What happens when $\\text{control\\_strength}$ is set very high (e.g., $2.0$)?",
      options: [
        "The model ignores the text prompt entirely and generates only from the control signal",
        "The spatial structure from the conditioning image is over-imposed - the output matches the control geometry precisely but may exhibit artifacts, loss of detail, or deviation from the text prompt, because the control signal overwhelms the generative prior",
        "The VAE decoder becomes the bottleneck and image quality drops sharply",
        "High control strength enables higher-resolution generation by increasing the effective receptive field",
      ],
      correctAnswer: 1,
      explanation:
        "ControlNet strength scales the additive contribution of the control signal to the U-Net decoder. When set very high, the generated image is dominated by the conditioning geometry - the text prompt and creative prior are overwhelmed.\n\nThis can cause 'ControlNet hallucinations': the control map imposes unnatural or over-precise structure, the generated image loses fine detail, and adherence to the text prompt weakens. Conversely, very low strength gives minimal control.\n\nThe optimal balance (typically $0.5$-$1.2$) achieves both structural fidelity to the conditioning image and text adherence. This is analogous to the guidance scale vs. diversity trade-off in CFG.",
      hints: [
        "Control strength is a practical hyperparameter - excessively high values can cause the control signal to override the generative prior, creating unnatural images.",
        "This trade-off is analogous to CFG guidance scale: both tune the balance between conditioning adherence and overall generation quality/diversity.",
      ],
    },
  ],

  "lora-diffusion": [
    {
      id: "q-dm-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "LoRA (Low-Rank Adaptation) is applied to Stable Diffusion by adding trainable low-rank matrices. Which layers are typically targeted?",
      options: [
        "The VAE encoder and decoder weight matrices",
        "The attention projection matrices ($W_Q$, $W_K$, $W_V$, $W_O$) in the U-Net's self-attention and cross-attention layers, and/or the feed-forward layers - with rank $r = 4$-$64$",
        "The noise schedule parameters $\\beta_t$",
        "The CLIP text encoder's final linear projection layer only",
      ],
      correctAnswer: 1,
      explanation:
        "For diffusion models, LoRA typically targets the U-Net's attention weight matrices and sometimes the feed-forward layers. Each weight matrix $W \\in \\mathbb{R}^{d \\times k}$ is augmented with $B A$ where $B \\in \\mathbb{R}^{d \\times r}$ and $A \\in \\mathbb{R}^{r \\times k}$ with $r \\ll \\min(d, k)$.\n\nOnly $A$ and $B$ are trained; $W$ remains frozen. This allows fine-tuning a Stable Diffusion model for a new style or concept with approximately $1$-$50$ MB of additional weights (vs. the full $2$-$4$ GB model). Multiple LoRA adapters can be merged additively, enabling style mixing.",
      hints: [
        "LoRA for diffusion is conceptually identical to LoRA for LLMs - just applied to the diffusion U-Net's linear layers instead of transformer layers.",
        "Multiple LoRA adapters can be merged additively before inference, allowing style and concept mixing in a single forward pass.",
      ],
    },
    {
      id: "q-dm-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DreamBooth fine-tuning for personalized image generation uses a rare token identifier $[V]$ and requires a 'prior preservation loss'. What is the purpose of this loss?",
      options: [
        "To preserve the diffusion model's noise schedule during fine-tuning",
        "To prevent catastrophic forgetting of the broader concept class (e.g., 'dog') by simultaneously fine-tuning on class-representative images generated by the original model - maintaining the model's ability to generate diverse instances of the class, not just the specific subject",
        "To preserve the LoRA rank during fine-tuning and prevent rank collapse",
        "To ensure the CLIP text embeddings of $[V]$ align with the original token embeddings",
      ],
      correctAnswer: 1,
      explanation:
        "DreamBooth fine-tunes on only 3-5 subject images (e.g., photos of your dog). Without regularization, the model quickly forgets what 'dog' means more broadly - after fine-tuning, 'dog' may refer only to your specific dog in those particular poses.\n\nThe prior preservation loss addresses this: the original model generates approximately $100$-$200$ class-representative images (e.g., diverse dogs). These are included in fine-tuning alongside subject images, with class captions (e.g., 'a dog'). The model simultaneously learns $[V] = \\text{your dog}$ while maintaining general dog-generation capability.",
      hints: [
        "Prior preservation = using the original model to generate its own regularization data for the class - a form of data augmentation for preventing forgetting.",
        "Without prior preservation, the model collapses to generating only the training subjects in training poses.",
      ],
    },
    {
      id: "q-dm-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When merging multiple LoRA adapters for Stable Diffusion (e.g., style LoRA + character LoRA), the naive interpolation $W' = W + \\alpha_1 B_1 A_1 + \\alpha_2 B_2 A_2$ can cause interference. What technique mitigates this?",
      options: [
        "Increasing the LoRA rank $r$ to reduce interference between adapters",
        "Using SVD-based merging: decompose each LoRA's $BA$ via SVD, truncate to a shared rank, then combine principal components - or using TIES-merging to resolve sign conflicts between adapters",
        "Always training both LoRAs jointly from scratch to avoid interference",
        "Increasing the alpha scaling hyperparameter for both LoRAs to offset interference",
      ],
      correctAnswer: 1,
      explanation:
        "Direct linear addition of LoRA deltas can cause interference when the updates have conflicting directions (sign conflicts) or overlapping subspaces. For example, if $B_1 A_1$ and $B_2 A_2$ push the same weight in opposite directions, they partially cancel.\n\nSVD-based merging addresses this by decomposing each $B_i A_i$ via SVD, identifying principal update directions, and combining them orthogonally. TIES-merging (Yadav et al., 2023) resolves sign conflicts by keeping only parameters with consistent signs across models and trimming small magnitudes. These methods produce better merged adapters than naive linear combination.",
      hints: [
        "Interference is more severe when LoRAs are trained on very different data distributions or tasks - they conflict in their effective subspaces.",
        "TIES, DARE, and task arithmetic are common approaches in the model merging literature for resolving interference.",
      ],
    },
  ],

  "inpainting-outpainting": [
    {
      id: "q-dm-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Diffusion-based image inpainting conditions the denoising process on the known (unmasked) region. During inference, the standard approach is:",
      options: [
        "Masking the unknown region in pixel space and letting the diffusion model generate independently of the known region",
        "At each denoising step, replacing the known (unmasked) regions of $x_t$ with the correctly noised version of the original pixels from $x_0$, while denoising the unknown (masked) region - ensuring consistency with the known pixels at every noise level",
        "Running the full denoising process and then pasting the known region on top of the generated image as a post-processing step",
        "Fine-tuning the diffusion model on masked image-completion pairs before inference",
      ],
      correctAnswer: 1,
      explanation:
        "The RePaint algorithm (Lugmayr et al., 2022) and most inpainting methods use a masked noising-renoising approach. At each denoising step $t$:\n1. The known region of $x_t$ is replaced by $q(x_t \\mid x_0^\\text{known})$ - the correctly noised version of the original known pixels at noise level $t$.\n2. The unknown region is denoised via $p_\\theta(x_{t-1} \\mid x_t)$.\n\nThis ensures the generated content is consistent with the known pixels at every noise level. Without this replacement, the model would denoise the entire image independently, ignoring the known region.",
      hints: [
        "The key insight: known pixels must always be at the correct noise level for step $t$, not at a different level or fully denoised.",
        "Some inpainting models (e.g., Stable Diffusion Inpaint) add the mask as an extra input channel to the U-Net instead of this replacement strategy.",
      ],
    },
    {
      id: "q-dm-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Outpainting (extending an image beyond its original boundaries) cannot be performed with a standard text-to-image diffusion model - it requires a model specifically trained for outpainting.",
      correctAnswer: "False",
      explanation:
        "Outpainting can be performed using a standard inpainting model by treating the outpainting region as a 'hole' at the image boundary. The existing pixels guide the generation of the new region to maintain consistency.\n\nMultiDiffusion and tiling approaches enable outpainting at arbitrary aspect ratios by running overlapping denoising windows that enforce consistency in overlapping regions. No dedicated outpainting training is strictly required, though models fine-tuned specifically for outpainting (e.g., DALL-E's outpainting) may yield better results.",
      hints: [
        "Outpainting = inpainting where the 'hole' is at the boundary of the image.",
        "Tiling with overlapping patches allows extending an image to arbitrary canvas sizes while maintaining global consistency.",
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
        "The CFG guidance scale is too high near the mask boundary",
        "The CLIP text embedding cannot capture local spatial context near the mask boundary",
      ],
      correctAnswer: 1,
      explanation:
        "Boundary artifacts arise because the model must match fine-grained texture, lighting, and color exactly at the mask edge. At intermediate noise levels, the pixels just outside the boundary are noisy and poorly constrained, so the generated region and the known region - which come from different noise realizations - often have subtle discontinuities in color or texture.\n\nRemedies include: using a feathered (soft) mask rather than a hard binary mask; harmonic inpainting for blending; overlap-and-stitch approaches that enforce consistency in overlapping regions; and Poisson blending as a post-processing step.",
      hints: [
        "Even with perfect semantic coherence, color and lighting mismatches at the boundary are common because the model has no direct pixel-level constraint at the seam.",
        "Poisson blending (gradient-domain compositing) is sometimes applied as a post-processing step to smooth boundary discontinuities.",
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
        "Non-overlapping patches of the spatial latent, treated as a sequence of visual tokens processed by standard Transformer blocks - analogous to how ViT processes images",
        "A global image embedding passed as a CLS token to the Transformer",
        "A hierarchical set of wavelet coefficients at multiple resolutions",
      ],
      correctAnswer: 1,
      explanation:
        "DiT patchifies the latent (e.g., $32 \\times 32 \\times 4$ latent divided into $2 \\times 2$ patches $\\rightarrow$ $256$ tokens of dimension $16$). These are processed by standard Transformer blocks with multi-head self-attention and feed-forward layers, analogous to ViT's handling of image patches.\n\nClass labels and timestep are injected via adaptive layer normalization (adaLN-Zero). DiT demonstrated that transformer scaling laws apply to diffusion: larger DiT models with more compute consistently achieve lower FID, following a predictable power-law - mirroring the scaling laws discovered in language models.",
      hints: [
        "DiT-XL/2 (the largest DiT with patch size 2) achieves state-of-the-art class-conditional ImageNet generation.",
        "The key advantage over U-Net: global self-attention across all patches from the first layer, not just at the bottleneck.",
      ],
    },
    {
      id: "q-dm-kp11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DiT uses 'adaLN-Zero' for conditioning on timestep $t$ and class label $c$. What does the 'Zero' refer to in adaLN-Zero?",
      options: [
        "The layer normalization weights are initialized to zero",
        "The scale and shift parameters $\\gamma$ and $\\beta$ in adaptive layer norm are predicted by linear layers initialized to output zero, so at initialization each DiT block acts as an identity function - enabling stable training",
        "The class embedding $c$ is zero-padded to match the timestep embedding dimension",
        "Zero refers to the zero-noise initialization of the diffusion process at $t = 0$",
      ],
      correctAnswer: 1,
      explanation:
        "AdaLN-Zero initializes the linear layers that predict the scale $\\gamma$ and shift $\\beta$ parameters (used in adaptive layer normalization) to output zero. At initialization, $\\gamma = 1$ and $\\beta = 0$, so each DiT block reduces to a standard layer norm - an identity residual connection.\n\nThis 'zero initialization' trick ensures stable early training: gradients flow well from the beginning since the network starts as identity. As training progresses, the adaLN layers gradually learn meaningful conditioning. This is analogous to the zero-convolution trick in ControlNet.",
      hints: [
        "Zero initialization of residual branches is a standard practice in deep network training (ReZero, FixUp initialization).",
        "Starting as an identity function ensures gradient flow is well-behaved from the very first training steps.",
      ],
    },
    {
      id: "q-dm-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Scaling experiments in DiT showed that model performance (FID on ImageNet $256 \\times 256$) follows a power law with compute (GFLOPS). What does this imply?",
      options: [
        "There is an optimal model size beyond which performance degrades",
        "Larger DiT models with more compute consistently achieve lower FID (better quality), and performance is predictable from the compute budget without training to convergence - enabling rational model scaling decisions",
        "Performance saturates quickly, making compute beyond a threshold wasteful",
        "The U-Net is provably optimal at all model sizes, and DiT only catches up at extreme scale",
      ],
      correctAnswer: 1,
      explanation:
        "DiT's scaling experiments revealed a clear power-law relationship between compute (GFLOPS) and FID:\n\n\\[\n\\text{FID} \\propto \\text{GFLOPS}^{-\\alpha} \\quad (\\text{approximately}).\n\\]\n\nThis predictability - following the scaling laws of Kaplan et al. for language models - means researchers can estimate the FID of a larger DiT model from smaller ablation experiments, without training to convergence. This motivated subsequent large-scale DiT-based models such as SD3 and FLUX, which use the DiT/MMDiT architecture at billions of parameters.",
      hints: [
        "Scaling laws in diffusion were motivated by the success of scaling laws in LLMs (Chinchilla, GPT-4).",
        "This result shifted the research paradigm from U-Net architecture search to simply scaling transformer depth and width.",
      ],
    },
  ],

  "flow-matching": [
    {
      id: "q-dm-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Flow Matching (Lipman et al. 2022; Liu et al. 2022) trains a vector field $v_\\theta(x_t, t)$ to transport noise to data. What is the training objective?",
      options: [
        "Minimizing the KL divergence between $p_0$ (noise) and $p_1$ (data) using the learned flow",
        "$\\mathbb{E}_{t,\\,x_0,\\,\\varepsilon}\\big[\\|v_\\theta(x_t, t) - u_t(x_t \\mid x_0)\\|^2\\big]$, where $u_t(x_t \\mid x_0) = (x_0 - x_t)/(1-t)$ is the conditional vector field for straight-line interpolation paths",
        "Maximizing the log-likelihood of $x_0$ under the flow-induced distribution",
        "Minimizing the score matching loss at each timestep $t$ uniformly",
      ],
      correctAnswer: 1,
      explanation:
        "Flow Matching avoids the complex SDE formulation of diffusion by directly regressing the vector field. For a straight-line interpolation path:\n\n\\[\nx_t = (1-t)\\,\\varepsilon + t\\,x_0, \\qquad \\varepsilon \\sim \\mathcal{N}(0, I),\n\\]\n\nthe conditional vector field is:\n\n\\[\nu_t(x_t \\mid x_0) = \\frac{x_0 - \\varepsilon}{1-t} = \\frac{x_0 - x_t}{1-t}.\n\\]\n\nThe training objective is:\n\n\\[\n\\mathcal{L} = \\mathbb{E}_{t,\\,x_0,\\,\\varepsilon}\\big[\\|v_\\theta(x_t, t) - u_t(x_t \\mid x_0)\\|^2\\big],\n\\]\n\nwhich is a simple regression that avoids both SDE simulation and partition functions. The unconditional target is obtained by marginalizing over $x_0$.",
      hints: [
        "Flow Matching regresses the velocity (direction and speed), not the score (gradient of log density).",
        "The straight-line path is what makes the conditional vector field simple and tractable.",
      ],
    },
    {
      id: "q-dm-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Flow Matching with straight-line (linear) interpolation paths enables generation with far fewer function evaluations (NFEs) than DDPM, because the learned ODE trajectories are approximately straight.",
      correctAnswer: "True",
      explanation:
        "When the learned vector field is approximately constant along the trajectory (straight-line paths), a simple Euler ODE integrator with very few steps (even $1$-$2$) can accurately follow the path from noise to data.\n\nIn contrast, DDPM's SDE paths are curved and require many steps ($1000$) for accurate simulation. FLUX and SD3 exploit this: they train with flow matching (specifically, rectified flow) and generate high-quality images in approximately $20$-$30$ steps. The 'optimal transport' property of straight-line paths minimizes trajectory curvature, which minimizes integration error per step.",
      hints: [
        "Euler integration error is proportional to path curvature - the straighter the path, the fewer steps needed for accurate integration.",
        "FLUX uses rectified flow (a variant of flow matching with straight paths) and generates in roughly 20 steps.",
      ],
    },
    {
      id: "q-dm-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Rectified Flow (Liu et al. 2022) improves sample quality over standard Flow Matching through 'reflow'. What does the reflow step do?",
      options: [
        "It adds noise back to generated samples and retrains to improve training stability",
        "It generates $(x_0^\\text{gen}, \\varepsilon)$ pairs from the trained flow (by running the ODE forward and recording the source noise), then trains a new flow to connect these pairs with straight lines - progressively straightening the flow trajectories",
        "It applies $k$-nearest-neighbors smoothing to the learned vector field to remove discontinuities",
        "It uses consistency distillation to reduce the flow to a single step",
      ],
      correctAnswer: 1,
      explanation:
        "Reflow (in Rectified Flow) proceeds in two stages:\n1. Train an initial flow model on random $(x_0, \\varepsilon)$ pairs.\n2. Generate coupled $(x_0^\\text{gen}, \\varepsilon)$ pairs by running the ODE forward from each $\\varepsilon$, recording both the noise source and the generated endpoint.\n3. Train a new flow model to connect each $\\varepsilon$ to its $x_0^\\text{gen}$ with a straight line.\n\nThe coupled pairs have straighter trajectories (they come from the same ODE path), so the new flow has more linear paths and can be solved more accurately with fewer steps. This can be applied repeatedly ('$k$-Rectified Flow'). After reflow, even a single-step ODE can achieve reasonable quality, motivating consistency distillation.",
      hints: [
        "Reflow is essentially 'data augmentation for straighter paths' - using the trained model to generate better $(x_0, \\varepsilon)$ pairs.",
        "After reflow, a single NFE can achieve reasonable quality, which motivates consistency distillation approaches.",
      ],
    },
  ],

  "consistency-models": [
    {
      id: "q-dm-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Consistency Models (Song et al. 2023) enable single-step generation. What core property do they enforce?",
      options: [
        "The model generates the same image regardless of the noise schedule used",
        "The 'consistency property': $f_\\theta(x_t, t) = f_\\theta(x_{t'}, t')$ for any two points $x_t$ and $x_{t'}$ on the same ODE trajectory - all points on the same trajectory map to the same clean image $x_0$",
        "The model maintains consistent attention weights across all timesteps",
        "The generated images are perceptually consistent with the text conditioning",
      ],
      correctAnswer: 1,
      explanation:
        "Consistency models learn a function $f_\\theta$ that maps any point $(x_t, t)$ on the diffusion ODE trajectory to the same endpoint $x_0$. This is the 'self-consistency' property: $f_\\theta(x_t, t) = f_\\theta(x_{t'}, t')$ whenever $x_t$ and $x_{t'}$ lie on the same trajectory.\n\nOnce $f_\\theta$ is learned, a single forward pass from any noisy $x_t$ yields $x_0$ directly - no iterative denoising required. The boundary condition $f_\\theta(x_0, 0) = x_0$ ensures the model is the identity at $t = 0$. Consistency distillation trains $f_\\theta$ to satisfy $f_\\theta(x_t, t) \\approx f_\\theta(x_{t-\\varepsilon}, t-\\varepsilon)$ for adjacent ODE steps.",
      hints: [
        "Consistency models can also do multi-step refinement for better quality: apply $\\varepsilon$-noise to $x_0$ and reapply $f_\\theta$ iteratively.",
        "The boundary condition $f_\\theta(x_0, 0) = x_0$ is enforced during training - it ensures the model is the identity at $t=0$.",
      ],
    },
    {
      id: "q-dm-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Consistency Training (CT) and Consistency Distillation (CD) differ in that:",
      options: [
        "CT requires $10\\times$ more training steps than CD",
        "CD distills from a pretrained diffusion model (using it as a teacher to generate adjacent ODE-consistent pairs), while CT trains consistency from scratch using a self-consistency loss and an exponential moving average (EMA) of $f_\\theta$ as a pseudo-target - without any pretrained teacher",
        "CT only works for pixel-space models while CD works for latent diffusion",
        "CD produces higher-quality single-step samples than CT in all settings",
      ],
      correctAnswer: 1,
      explanation:
        "Consistency Distillation (CD) uses a pretrained score/diffusion model as a teacher. It generates adjacent pairs $(x_t, x_{t-\\varepsilon})$ via the teacher's ODE and trains $f_\\theta$ to map both to the same $x_0$. This leverages the teacher's knowledge for faster convergence.\n\nConsistency Training (CT) has no teacher. It instead uses an exponential moving average (EMA) of $f_\\theta$ as a pseudo-target and enforces self-consistency directly: $f_\\theta(x_t, t) \\approx f_\\text{EMA}(x_t, t)$. CT is harder to train but does not depend on a pretrained model. CD generally achieves better sample quality per training step.",
      hints: [
        "CD is analogous to knowledge distillation: a large teacher model provides consistent training targets.",
        "CT requires careful training (learning rate schedules, EMA decay) to avoid divergence without a teacher model to guide it.",
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
        "It allocates training samples to noise levels proportional to the difficulty of predicting $x_0$ from $x_t$ - oversampling the medium-noise regime where learning is most informative and most unstable, which improves training efficiency and stability",
        "It replaces the linear interpolation path with an optimal transport path",
        "It prevents gradient explosion at low noise levels by capping the maximum step size",
      ],
      correctAnswer: 1,
      explanation:
        "Uniform timestep sampling wastes compute on easy steps: at very high noise (near $t=T$), all images look like random noise (the learning task is trivial); at very low noise (near $t=0$), the model is already nearly converged.\n\nThe lognormal noise schedule samples timesteps $t \\sim \\text{LogNormal}(\\mu, \\sigma)$, oversampling intermediate timesteps where the ODE curvature is highest and the learning signal is most informative. Combined with pseudo-Huber loss (which is more robust to outliers than MSE) and EMA, iCT achieves much better training stability and sample quality.",
      hints: [
        "The lognormal schedule concentrates training on the 'difficult middle' of the denoising process, where the model needs the most guidance.",
        "The lognormal schedule is parameterized by $\\mu$ and $\\sigma$ - tunable hyperparameters that control the concentration of training mass around intermediate noise levels.",
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
        "Collecting $1000+$ images of the subject and fine-tuning the full model",
        "Fine-tuning the diffusion model on $3$-$5$ images of a subject, binding the subject to a unique identifier token $[V]$ paired with a class noun (e.g., 'a $[V]$ dog'), with prior preservation loss to prevent language drift and maintain generation of diverse class instances",
        "Training a LoRA adapter on the subject images while freezing the U-Net",
        "Using CLIP to embed the subject image and conditioning generation on this embedding",
      ],
      correctAnswer: 1,
      explanation:
        "DreamBooth fine-tunes the full diffusion model (text encoder + U-Net) on $3$-$5$ subject images. A rare token identifier $[V]$ is bound to the specific subject via prompts like 'a $[V]$ dog'. The training loss has two components:\n1. Reconstruction loss on subject images with $[V]$ binding.\n2. Prior preservation loss on class images (e.g., 'a dog') generated by the original model.\n\nAfter fine-tuning, prompts like 'a $[V]$ dog in Paris' generate the specific dog in novel contexts. Prior preservation prevents 'language drift' - without it, the model would forget what 'dog' means beyond the training subjects.",
      hints: [
        "DreamBooth is commonly used for personalized portraits, product photography, and pet photos.",
        "The rare token $[V]$ is a placeholder - in practice, uncommon tokens or special tokens (e.g., 'sks') are used.",
      ],
    },
    {
      id: "q-dm-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DreamBooth fine-tuning always requires fine-tuning both the U-Net and the text encoder to achieve high-fidelity subject reconstruction.",
      correctAnswer: "False",
      explanation:
        "The original DreamBooth fine-tunes only the U-Net. Fine-tuning the text encoder (CLIP encoder) can improve concept binding and reconstruction fidelity, but it risks 'language drift' - corrupting the encoding of other words and reducing the model's ability to generalize the subject to new contexts.\n\nMany practical implementations use U-Net-only fine-tuning for safety, or LoRA on both the U-Net and text encoder to reduce the risk of language drift. Extended DreamBooth techniques use lighter fine-tuning (e.g., LoRA on the text encoder) for better results without full fine-tuning.",
      hints: [
        "Text encoder fine-tuning helps the token $[V]$ develop richer semantic associations but risks degrading other concepts the model knows.",
        "The trade-off is fidelity vs. compositionality - more aggressive fine-tuning improves subject reconstruction but reduces generalization.",
      ],
    },
    {
      id: "q-dm-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A common failure mode of DreamBooth is overfitting - the model memorizes the $3$-$5$ training images and loses generalization. Which technique most directly addresses this?",
      options: [
        "Using a lower learning rate ($10^{-6}$ instead of $10^{-5}$)",
        "The prior preservation loss using class-generated images, which regularizes the model to maintain the broader class distribution while learning the specific subject - preventing the model from collapsing to just the training images",
        "Training for fewer steps ($100$ instead of $800$)",
        "Increasing the CFG guidance scale during training",
      ],
      correctAnswer: 1,
      explanation:
        "Prior preservation directly combats overfitting. By simultaneously training on $100$-$200$ class-representative images generated by the original model, the model is penalized for drifting too far from the general class distribution. Without it, the model quickly overfits to the $3$-$5$ subject images and cannot generate the subject in novel contexts or poses.\n\nThe number of fine-tuning steps before overfitting varies by subject - validation images are used to select the best checkpoint. The failure mode manifests as: the model only generates the training poses, backgrounds, or viewpoints from the few training images.",
      hints: [
        "Overfitting in DreamBooth manifests as: the model only generates the specific poses and backgrounds from the training images, ignoring novel prompts.",
        "Prior preservation is a form of rehearsal - analogous to replay in continual learning - that prevents catastrophic forgetting of the base concept.",
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
        "Comparing the distribution of Inception-v3 pool-3 features between generated and real images using the Fréchet distance between two Gaussians fit to the features: $\\text{FID} = \\|\\mu_r - \\mu_g\\|^2 + \\mathrm{Tr}(\\Sigma_r + \\Sigma_g - 2\\sqrt{\\Sigma_r \\Sigma_g})$",
        "Computing the CLIP cosine similarity between generated images and their text prompts",
        "Measuring the classification accuracy of a ResNet trained on real images when evaluated on generated images",
      ],
      correctAnswer: 1,
      explanation:
        "FID compares the statistics of InceptionV3 pool-3 features ($2048$-dimensional) between real and generated image sets. It fits a Gaussian with mean $\\mu$ and covariance $\\Sigma$ to each set, then computes the Fréchet distance:\n\n\\[\n\\text{FID} = \\|\\mu_r - \\mu_g\\|^2 + \\mathrm{Tr}\\!\\left(\\Sigma_r + \\Sigma_g - 2\\sqrt{\\Sigma_r \\Sigma_g}\\right).\n\\]\n\nLower FID means more similar distributions. FID captures both quality and diversity: a generator that simply copies training images has low FID, and so does one that generates diverse, high-quality images matching the real distribution. FID is sample-size dependent - typically computed with $50{,}000$ generated images for fair comparison.",
      hints: [
        "FID $= 0$ means the generated distribution is identical to the real distribution in feature space - unlikely in practice.",
        "FID is sensitive to sample size - using different numbers of generated images makes comparisons unreliable.",
      ],
    },
    {
      id: "q-dm-kp15-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CLIP Score evaluates text-to-image alignment by computing cosine similarity between CLIP image and text embeddings. A high CLIP Score indicates:",
      options: [
        "High photorealism of the generated image",
        "High semantic alignment between the generated image and the text prompt - the image content matches what the prompt describes",
        "High diversity of generated images across different prompts",
        "Low FID on the benchmark dataset",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP Score $= \\text{CLIP}\\_\\text{sim}(image, text)$ measures whether the generated image semantically matches the text prompt. It is the standard metric for prompt following in text-to-image models.\n\nHowever, CLIP Score has known limitations: it correlates with CLIP's training biases and may be gamed by models that generate 'CLIP-friendly' images that are visually unrealistic. It also fails to capture fine-grained compositional accuracy such as attribute binding, counting, or spatial relations. CLIP Score is typically used alongside FID to trade off generation quality vs. prompt adherence.",
      hints: [
        "High CLIP Score + low FID is ideal: images are both high quality and match the text.",
        "CLIP Score can be inflated by generating images that look like CLIP training data rather than being genuinely high quality.",
      ],
    },
    {
      id: "q-dm-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Precision/Recall decomposition (Kynkäänniemi et al., 2019) separates the quality-diversity trade-off in generative models. What do Precision and Recall measure?",
      options: [
        "Precision measures the percentage of pixels matching real images; Recall measures the percentage of real images that can be reconstructed",
        "Precision measures the fraction of generated samples that fall within the real data manifold (quality/fidelity); Recall measures the fraction of the real data manifold covered by generated samples (diversity/coverage)",
        "Precision measures FID for high-quality images; Recall measures FID for low-quality images",
        "Precision measures CLIP Score; Recall measures $1 - \\text{FID}$",
      ],
      correctAnswer: 1,
      explanation:
        "FID conflates two distinct aspects of generation quality:\n- **Precision** (quality/fidelity): what fraction of generated samples are 'realistic' - i.e., fall near the real data manifold?\n- **Recall** (diversity/coverage): what fraction of the real data manifold is 'covered' by generated samples?\n\nA model that generates only one perfect cat image has precision $\\approx 1$ but recall $\\approx 0$ (mode collapse). A model that generates every possible image including unrealistic ones has recall $\\approx 1$ but low precision. CFG guidance scale primarily trades recall for precision: higher guidance $\\rightarrow$ higher precision, lower recall.",
      hints: [
        "A model with high precision but low recall generates few images but they are all high quality - mode collapse.",
        "A model with high recall but low precision generates many images but many are unrealistic - low fidelity.",
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
        "3D atomic coordinates and atom types, where the diffusion process perturbs atomic positions and optionally atom types, requiring equivariant neural networks to respect rotational and translational symmetry",
        "Fingerprint vectors (Morgan/ECFP) as dense numerical inputs",
        "Adjacency matrices representing bond graphs",
      ],
      correctAnswer: 1,
      explanation:
        "Molecular diffusion models (e.g., DiffSBDD, DiffDock, EDM) operate on 3D molecular structures. Each atom is represented by its 3D Cartesian coordinates and atom type. The forward process adds Gaussian noise to atomic positions (and may corrupt atom types); the reverse process denoises to produce valid 3D conformations.\n\nEquivariant neural networks (e.g., EGNN, SE(3)-Transformer) are essential because they guarantee the model generates the same molecule regardless of its absolute orientation or position in 3D space - a fundamental physical symmetry.",
      hints: [
        "3D structure matters for drug design: the shape and charge distribution of a molecule determine how it binds to proteins.",
        "Equivariance to SE(3) (3D rotations and translations) ensures the model does not need to learn separately that a molecule rotated by $45°$ is the same molecule.",
      ],
    },
    {
      id: "q-dm-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Equivariance to the SE(3) group (3D rotations and translations) is essential for molecular diffusion models, because valid molecules must be generated regardless of their absolute orientation in space.",
      correctAnswer: "True",
      explanation:
        "A valid molecule should have the same physical properties and binding behavior regardless of how it is oriented or positioned in space. If the generative model is not SE(3)-equivariant, it would need to learn separately that a benzene ring rotated by $45°$ is identical to the original - vastly increasing sample complexity and data requirements.\n\nEquivariant models (EGNN, SE(3)-Transformer, SEGNN) encode this symmetry by construction: rotating the input rotates the output by the same amount, and translating the input translates the output by the same amount. Permutation invariance (over atom ordering) is also required since molecules have no canonical atom ordering.",
      hints: [
        "SE(3) = Special Euclidean group in 3D = rotations (SO(3)) + translations.",
        "Permutation invariance is also necessary - molecules have no canonical atom ordering, so the model must produce the same output regardless of how atoms are indexed.",
      ],
    },
    {
      id: "q-dm-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DiffDock (Corso et al. 2022) applies diffusion to protein-ligand docking. Its key innovation is diffusing over:",
      options: [
        "The 3D atomic coordinates of both the protein and ligand simultaneously",
        "A factored pose space: translation ($\\mathbb{R}^3$), rotation (SO(3)), and torsion angles ($\\mathbb{T}^n$) - using separate score networks for each component, which allows efficient generalization across molecules of different sizes and avoids the curse of dimensionality of raw 3D coordinate diffusion",
        "SMILES string edits that progressively modify the ligand chemical structure",
        "A combined embedding of the protein pocket and ligand fingerprint",
      ],
      correctAnswer: 1,
      explanation:
        "DiffDock defines the ligand pose by three components:\n1. **Translation**: position of the ligand center in $\\mathbb{R}^3$.\n2. **Rotation**: orientation of the rigid ligand on SO(3).\n3. **Torsion angles**: internal conformations via $\\mathbb{T}^n$ (the $n$-dimensional torus for $n$ rotatable bonds).\n\nDiffusion runs separately on each component, with separate score networks, and the reverse process denoises all components jointly. This factored representation avoids the curse of dimensionality that would arise from diffusing over all atomic coordinates simultaneously, and generalizes efficiently across molecules of different sizes.",
      hints: [
        "Docking = finding the correct 3D pose (translation, rotation, conformation) of a small molecule bound to a protein.",
        "SO(3) diffusion uses the geodesic distance on the rotation manifold as the noise metric, which is distinct from Euclidean diffusion.",
      ],
    },
  ],

  "rlhf-diffusion": [
    {
      id: "q-dm-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "RLHF for diffusion models (e.g., DDPO, DPOK, Diffusion-DPO) aims to fine-tune a diffusion model to maximize a reward function $r(x_0)$. What is the main challenge compared to RLHF for LLMs?",
      options: [
        "There is no reward function available for image generation",
        "The diffusion generation process consists of $T$ sequential denoising steps, making it a very long-horizon RL problem with sparse reward (only $x_0$ is evaluated) and extremely long credit assignment chains - the LLM 'sequence' is $T = 1000$ denoising steps of high-dimensional continuous actions",
        "Diffusion models are not differentiable with respect to the generated output",
        "Human feedback cannot be collected for image generation tasks",
      ],
      correctAnswer: 1,
      explanation:
        "In LLM RLHF, sequences are typically $< 1000$ tokens. In diffusion RLHF, each 'step' of the denoising chain is a high-dimensional continuous action (the denoised image $x_{t-1}$), and there are $T = 1000$ such steps. The reward $r(x_0)$ is only observed at the end of the chain, creating a $T$-step credit assignment problem.\n\nDDPO (Black et al., 2023) adapts PPO to diffusion by treating each denoising step as an RL action and backpropagating through the entire denoising chain (using importance sampling for efficiency). The denoising chain is analogous to a very long Markov decision process.",
      hints: [
        "The denoising chain is analogous to a very long Markov chain in RL - reward shaping and truncated backpropagation are common practical tricks.",
        "DDPO formulates diffusion sampling as a POMDP and applies policy gradient methods adapted to the continuous, high-dimensional action space.",
      ],
    },
    {
      id: "q-dm-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Diffusion-DPO directly optimizes a diffusion model using preference pairs (winning/losing images) without requiring an explicit trained reward model.",
      correctAnswer: "True",
      explanation:
        "Diffusion-DPO (Wallace et al., 2023) adapts Direct Preference Optimization (DPO) to diffusion models. Given paired images $(x_w, x_l)$ where a human prefers $x_w$ over $x_l$, it directly optimizes the diffusion model to increase the likelihood of generating $x_w$ over $x_l$, without training a separate reward model.\n\nThe DPO objective for diffusion uses the ELBO to tractably compute the implicit reward difference. This is analogous to how DPO works in LLMs - bypassing the reward model training step entirely.",
      hints: [
        "Diffusion-DPO $\\approx$ DPO applied to the DDPM ELBO instead of log-likelihoods of token sequences.",
        "The 'implicit reward' in DPO is $\\log[\\pi_\\theta(x)/\\pi_\\text{ref}(x)]$ - the log-probability ratio of the current model and the reference model.",
      ],
    },
    {
      id: "q-dm-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DDPO (Black et al. 2023) uses policy gradient to optimize a diffusion model with a reward. A key practical challenge it addresses is:",
      options: [
        "Computing the full gradient of the reward through all $T$ denoising steps requires $O(T)$ memory and time proportional to the U-Net cost",
        "Directly computing the policy gradient requires differentiating through the reward function, which may not be differentiable",
        "Storing and replaying $T$-step denoising trajectories is memory-intensive; DDPO addresses this using importance sampling to reuse samples from previous model iterations, with a clipped ratio (similar to PPO) to prevent large policy updates",
        "Diffusion models use stochastic sampling, making policy gradient variance too high without baseline subtraction",
      ],
      correctAnswer: 2,
      explanation:
        "DDPO's key insight is adapting PPO's clipped surrogate objective to diffusion. Instead of generating new $T$-step trajectories for every gradient update (prohibitively expensive - each sample requires $T$ forward passes), DDPO stores old trajectories and uses importance sampling weights $\\pi_\\theta(\\tau)/\\pi_{\\theta_\\text{old}}(\\tau)$ to correct for the policy change.\n\nThe PPO clip prevents the importance weight ratio from growing too large, which maintains training stability and prevents the policy from changing too drastically in one update.",
      hints: [
        "Reusing old trajectories via importance sampling is the PPO trick that makes on-policy RL tractable - it avoids the cost of generating new trajectories at every gradient step.",
        "The clipping prevents large policy updates that could destabilize training - analogous to trust region methods.",
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
        "Predict $x_0$ directly from $x_T$ in a single forward pass",
        "Match the two-step teacher output in a single step: given $x_t$, the student's single-step prediction of $x_{t-2}$ matches the teacher's two-step prediction ($x_t \\to x_{t-1} \\to x_{t-2}$)",
        "Minimize the KL divergence between the student's and teacher's feature distributions",
        "Reproduce the noise prediction $\\varepsilon$ at every other timestep",
      ],
      correctAnswer: 1,
      explanation:
        "Progressive Distillation trains a student network to replicate two teacher steps in one. The student takes $x_t$ as input and predicts $x_{t-2}$, while the teacher produces the same quantity via two sequential steps:\n\n\\[\n\\hat{x}_0^\\text{student}(x_t, t) \\approx \\hat{x}_0^{\\text{teacher}, 2\\text{-step}}(x_t, t).\n\\]\n\nThis halves the number of required steps per iteration. After distillation, the student becomes the new teacher, and the process repeats. After approximately 7 rounds, $1000$ steps reduce to $8$ steps. Each round costs roughly $15$-$25\\%$ of the original training compute.",
      hints: [
        "The distillation target is always in $x_0$ space (the denoised image), making it parameterization-independent.",
        "After 3 rounds: $1000 \\to 500 \\to 250 \\to 125$ steps. After roughly 7 rounds: $1000 \\to 8$ steps.",
      ],
    },
    {
      id: "q-dm-kp18-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Latent Consistency Models (LCM, Luo et al. 2023) combine consistency distillation with latent diffusion to achieve fast generation. A key technique LCM uses is 'skipping steps' in distillation. What does this mean?",
      options: [
        "The student model skips every other denoising step during inference",
        "Instead of distilling adjacent ODE steps ($t \\to t-1$), LCM distills over larger intervals ($t \\to t-k$ for $k > 1$), making the consistency condition easier to satisfy and enabling fewer training steps to reach a good model",
        "LCM skips the prior preservation loss used in DreamBooth-style fine-tuning",
        "The latent VAE encoding step is skipped during distillation training",
      ],
      correctAnswer: 1,
      explanation:
        "LCM uses accelerated ODE solving during distillation: instead of requiring the consistency condition $f_\\theta(x_t, t) = f_\\theta(x_{t-1}, t-1)$ for adjacent timesteps, it enforces $f_\\theta(x_t, t) = f_\\theta(x_{t-k}, t-k)$ for a larger skip $k > 1$.\n\nThis 'skipping' enforces consistency over longer ODE intervals, making the model more strongly self-consistent across multiple steps. Combined with using an existing LDM as the teacher, LCM achieves $2$-$4$ step generation on Stable Diffusion in roughly $32$ A100 GPU hours. LCM can also be applied as a LoRA (LCM-LoRA) without full fine-tuning.",
      hints: [
        "LCM can be applied to Stable Diffusion or SDXL via LoRA (LCM-LoRA) without full fine-tuning of the base model.",
        "The skip schedule is a key hyperparameter - larger skips yield faster generation but potentially lower quality.",
      ],
    },
    {
      id: "q-dm-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Score Distillation Sampling (SDS, Poole et al. 2022) uses a diffusion model's score to optimize a NeRF or other differentiable renderer for text-to-3D generation. The SDS gradient with respect to the renderer parameters $\\theta$ is:",
      options: [
        "The gradient of the diffusion model's ELBO with respect to the NeRF parameters",
        "$\\nabla_\\theta \\mathcal{L}_\\text{SDS} = \\mathbb{E}_{t,\\,\\varepsilon}\\big[ w(t)\\,(\\varepsilon_\\phi(x_t, t, y) - \\varepsilon)\\,\\nabla_\\theta x \\big]$ - the score guidance (difference between predicted and actual noise) backpropagated through the renderer to update NeRF parameters",
        "The gradient of the rendered image's pixel values with respect to NeRF parameters",
        "The CLIP gradient of text-image similarity backpropagated through the renderer",
      ],
      correctAnswer: 1,
      explanation:
        "SDS (used in DreamFusion):\n1. Render a 2D view $x = g(\\theta)$ from the NeRF with parameters $\\theta$.\n2. Add noise: $x_t = \\sqrt{\\bar{\\alpha}_t}\\,x + \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon$.\n3. Run the diffusion model: predict $\\varepsilon_\\phi(x_t, t, y)$ conditioned on text $y$.\n\nThe SDS gradient is:\n\n\\[\n\\nabla_\\theta \\mathcal{L}_\\text{SDS} = \\mathbb{E}_{t,\\,\\varepsilon}\\big[ w(t)\\,(\\varepsilon_\\phi(x_t, t, y) - \\varepsilon)\\,\\nabla_\\theta x\\big].\n\\]\n\nThis tells the NeRF 'which direction in image space to move to be more consistent with the text prompt $y$'. The U-Net Jacobian is dropped (CFG + diffusion U-Net serves as a perceptual critic). Known artifacts include the 'Janus problem' (multi-face) and over-saturation, addressed by VSD (Variational Score Distillation).",
      hints: [
        "SDS updates the NeRF using the 2D diffusion model as a perceptual critic for 3D content - the diffusion model guides the NeRF without direct gradient from a 3D critic.",
        "The 'Janus problem' (multi-face artifact) arises because the SDS prior does not enforce 3D consistency across views.",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
