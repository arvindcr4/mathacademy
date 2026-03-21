import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'pinns': [
    {
      id: 'q-sciml-kp1-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The total PINN loss for a PDE of the form N[u](x,t) = 0 with boundary condition B[u] = g is L = L_data + λ_r·L_r + λ_b·L_b. L_r is the physics residual loss defined as ___.',
      options: [
        '(1/N_r) Σ |u_θ(x_i,t_i) − u_measured(x_i,t_i)|²',
        '(1/N_r) Σ |N[u_θ](x_i,t_i)|² summed over collocation points',
        'KL divergence between the predicted and true solution distributions',
        '(1/N_b) Σ |∂u_θ/∂x − ∂u/∂x|² at boundary points',
      ],
      correctAnswer: 1,
      explanation: 'The physics residual loss L_r = (1/N_r) Σ_{i=1}^{N_r} |N[u_θ](x_i,t_i)|² evaluates how much the neural network u_θ violates the governing PDE at collocation points sampled inside the domain. Automatic differentiation computes the required spatial and temporal derivatives of u_θ.',
      hints: [
        'N[u] is the PDE operator (e.g., ∂u/∂t − ν∂²u/∂x² for the heat equation). The residual is how far N[u_θ] is from zero.',
        'Collocation points are interior domain points where no labels are needed — only the PDE equation must be satisfied.',
      ],
    },
    {
      id: 'q-sciml-kp1-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'PINNs can solve both forward problems (simulating a known PDE) and inverse problems (inferring unknown parameters from observations) within the same framework.',
      correctAnswer: 'true',
      explanation: 'In the inverse setting, unknown PDE parameters (e.g., diffusivity ν in ∂u/∂t = ν∂²u/∂x²) are treated as additional trainable variables. The same PINN loss L_r + L_data is minimised jointly over network weights and unknown parameters, with observed data pinning the solution.',
      hints: [
        'Forward: given ν, find u. Inverse: given some measurements of u, find ν. Both fit naturally into the same loss function.',
        'Unknown parameters appear inside N[u_θ; ν] — they are simply extra learnable scalars in the optimisation.',
      ],
    },
    {
      id: 'q-sciml-kp1-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A well-known training difficulty with PINNs for stiff or multi-scale PDEs is gradient imbalance. Which weighting strategy is theoretically motivated by the Neural Tangent Kernel (NTK) analysis of PINNs?',
      options: [
        'Fixed equal weights λ_r = λ_b = 1 throughout training',
        'Adaptive weights that balance the NTK eigenvalues of each loss component, so learning speeds are equalised across boundary, residual, and data terms',
        'Randomly sampled weights from a uniform distribution each iteration',
        'Decaying weights that reduce all loss coefficients by 0.99 every epoch',
      ],
      correctAnswer: 1,
      explanation: 'Wang et al. (2021) showed via NTK analysis that gradient imbalance arises when different PINN loss terms have vastly different NTK eigenvalue magnitudes. Their adaptive weighting scheme sets λ_k ∝ max(NTK eigenvalues) / mean(NTK eigenvalues of loss k), equalising effective learning rates across loss terms.',
      hints: [
        'The NTK governs the convergence speed of each loss term. When one term dominates, others converge much more slowly.',
        'Adaptive weighting dynamically rescales each loss term so they all converge at similar rates.',
      ],
    },
  ],

  'neural-ode': [
    {
      id: 'q-sciml-kp2-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Neural ODEs define hidden state dynamics as dh/dt = f_θ(h(t), t). The hidden state at time t₁ is obtained by ___.',
      options: [
        'h(t₁) = h(t₀) + f_θ(h(t₀), t₀) · (t₁ − t₀)  [Euler step]',
        'h(t₁) = ODESolve(f_θ, h(t₀), t₀, t₁)  [numerical ODE integration]',
        'h(t₁) = sigmoid(W·h(t₀) + b)',
        'h(t₁) = h(t₀) * exp(f_θ(t₁))',
      ],
      correctAnswer: 1,
      explanation: 'The exact definition is h(t₁) = h(t₀) + ∫_{t₀}^{t₁} f_θ(h(t),t) dt, computed by a black-box ODE solver. This is equivalent to a ResNet with Euler steps in the limit of infinitely many layers, but Neural ODEs use adaptive step-size solvers for better accuracy.',
      hints: [
        'A ResNet layer computes h_{n+1} = h_n + f(h_n) — this is exactly one Euler step of the ODE dh/dt = f(h).',
        'Neural ODEs make this continuous: instead of discrete layers, the ODE solver integrates over a time interval.',
      ],
    },
    {
      id: 'q-sciml-kp2-2',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The adjoint sensitivity method for Neural ODEs computes gradients by solving a reverse-time ODE for the adjoint a(t) = dL/dh(t). The adjoint satisfies ___.',
      options: [
        'da/dt = a(t)ᵀ · ∂f_θ/∂h(t)  [forward ODE for a]',
        'da/dt = −a(t)ᵀ · ∂f_θ/∂h(t)  [backward ODE, run in reverse time]',
        'da/dt = −∂L/∂h(t)  [gradient of loss]',
        'da/dt = f_θ(h(t), t)  [same as state ODE]',
      ],
      correctAnswer: 1,
      explanation: 'The adjoint a(t) = dL/dh(t) satisfies da/dt = −a(t)ᵀ (∂f_θ/∂h), integrated backwards from t₁ to t₀ starting from a(t₁) = dL/dh(t₁). Gradients w.r.t. θ are then ∫_{t₀}^{t₁} a(t)ᵀ (∂f_θ/∂θ) dt, also computed in the same reverse pass. This gives O(1) memory cost.',
      hints: [
        'The adjoint ODE runs backward in time — the sign is negative. Compare to the state ODE dh/dt = +f_θ.',
        'The key benefit is that intermediate states are recomputed during the backward pass, avoiding storing them — O(1) memory vs O(N) for BPTT.',
      ],
    },
    {
      id: 'q-sciml-kp2-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Latent Neural ODEs are particularly well-suited for which type of real-world data?',
      options: [
        'Image datasets with fixed grid resolution',
        'Irregularly sampled time-series where observations occur at non-uniform time points',
        'Text corpora with fixed-length tokenization',
        'Point cloud data from 3D LiDAR sensors',
      ],
      correctAnswer: 1,
      explanation: 'Latent Neural ODEs encode observed values into a latent state via an RNN encoder, then evolve the latent state continuously with an ODE — naturally handling irregular observation times that break standard RNN assumptions of uniform time steps.',
      hints: [
        'Standard RNNs assume a fixed time step between inputs — what happens when patient measurements occur at irregular intervals?',
        'The ODE provides a principled way to model continuous time, so any observation time can be queried.',
      ],
    },
  ],

  'operator-learning': [
    {
      id: 'q-sciml-kp3-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The Fourier Neural Operator (FNO) layer applies a linear transform in Fourier space. Given input v, the FNO layer computes ___.',
      options: [
        'σ(W·v + b)  [standard linear layer with activation]',
        'σ(F⁻¹(R · F(v)) + W·v)  [Fourier-space global conv + local linear, then activation]',
        'σ(Conv2D(v, kernel))  [standard spatial convolution]',
        'σ(Attention(v, v, v))  [self-attention layer]',
      ],
      correctAnswer: 1,
      explanation: 'Each FNO layer computes σ(F⁻¹(R·Fₖ(v)) + W·v), where F is the Fourier transform, R is a learnable complex weight tensor in Fourier space (truncated to the k lowest modes), W is a local linear transform, and σ is an activation. The Fourier multiplication is equivalent to a global convolution in physical space.',
      hints: [
        'FNO truncates to k Fourier modes (the low-frequency part), which captures global structure while being resolution-independent.',
        'The local W·v term handles the high-frequency, local part of the transform that the truncated Fourier modes miss.',
      ],
    },
    {
      id: 'q-sciml-kp3-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The Fourier Neural Operator (FNO) achieves resolution invariance by performing convolution operations in Fourier space, allowing it to be evaluated at any spatial resolution at inference time.',
      correctAnswer: 'true',
      explanation: 'FNO applies linear transforms in Fourier space (equivalent to global convolutions in physical space), then truncates to a fixed number of modes. Because the Fourier transform is resolution-independent, FNO trained at 64×64 can be evaluated at 128×128 without retraining.',
      hints: [
        'Fourier modes capture global patterns and are not tied to any particular spatial grid resolution.',
        'The fixed number of truncated modes k is the only resolution-dependent parameter — evaluation at finer grids simply uses more physical-space points.',
      ],
    },
    {
      id: 'q-sciml-kp3-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'DeepONet (Deep Operator Network) achieves operator learning by using:',
      options: [
        'A single encoder-decoder network applied to discretized input functions',
        'A branch network encoding the input function and a trunk network encoding the query point, whose outputs are combined via dot product',
        'Attention mechanisms over Fourier coefficients of the input function',
        'Recursive application of standard ResNet blocks to 1D input sequences',
      ],
      correctAnswer: 1,
      explanation: 'DeepONet\'s branch net encodes the input function u at sensor points {u(x₁),...,u(xₘ)} → [b₁,...,bₚ]; its trunk net encodes the output query location y → [t₁,...,tₚ]; the operator output is G(u)(y) ≈ Σᵢ bᵢ·tᵢ + bias. This is grounded in the universal approximation theorem for operators.',
      hints: [
        'Branch: what does the input function look like? Trunk: where do we want the output? They are combined by a dot product.',
        'The inner product Σ bᵢtᵢ acts like a learned basis expansion of the output function.',
      ],
    },
  ],

  'data-driven-pde': [
    {
      id: 'q-sciml-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Sparse Identification of Nonlinear Dynamics (SINDy) method discovers governing equations from data by:',
      options: [
        'Training a deep neural network to predict the next time step',
        'Using sparse regression to find the fewest terms from a library of candidate functions that best explain the observed dynamics',
        'Applying Fourier analysis to identify dominant frequency modes in time-series data',
        'Fitting a Gaussian process to the observed trajectory data',
      ],
      correctAnswer: 1,
      explanation: 'SINDy constructs a library of candidate terms (polynomials, trig functions, etc.) and applies LASSO-type sparse regression to identify the minimal subset that explains dX/dt, yielding interpretable, parsimonious dynamical equations.',
      hints: [
        'SINDy stands for "Sparse Identification of Nonlinear Dynamics" — the word "sparse" is the key.',
        'Instead of black-box prediction, the goal is to recover the actual equation (e.g., dx/dt = ax + bx²) from data.',
      ],
    },
    {
      id: 'q-sciml-kp4-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Data-driven PDE solvers trained on simulation data from one physical regime can perfectly generalize to radically different parameter regimes without any additional training.',
      correctAnswer: 'false',
      explanation: 'Neural PDE solvers often exhibit poor generalization outside the training distribution — a model trained on low-Reynolds-number flows may fail at turbulent regimes. Active learning, meta-learning, and physics constraints help extend generalization.',
      hints: [
        'Think about extrapolation vs. interpolation — ML models generally interpolate within their training distribution but struggle to extrapolate far beyond it.',
        'Different physical regimes (e.g., laminar vs. turbulent flow) can have qualitatively different behaviors.',
      ],
    },
    {
      id: 'q-sciml-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "curse of dimensionality" motivates ML-based PDE solvers because traditional numerical methods (FEM, FDM) suffer from:',
      options: [
        'Inability to handle nonlinear PDEs',
        'Computational cost that grows exponentially with the number of spatial dimensions, making high-dimensional PDEs intractable',
        'Requirement for analytical solutions to verify accuracy',
        'Inability to solve time-dependent PDEs',
      ],
      correctAnswer: 1,
      explanation: 'Grid-based methods require discretizing each dimension; a 100-point grid in d dimensions has 100^d points — exponential in d. ML solvers (e.g., deep Galerkin, PINNs) scale polynomially in d by sampling, enabling solution of high-dimensional PDEs like Black-Scholes.',
      hints: [
        'For a 1D problem, a 100-point grid has 100 points. For a 10D problem, it has 100^10 — a number larger than atoms in the observable universe.',
        'Monte Carlo-type sampling in high dimensions avoids this exponential blowup.',
      ],
    },
  ],

  'turbulence-ml': [
    {
      id: 'q-sciml-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Large Eddy Simulation (LES) requires a subgrid-scale (SGS) model because:',
      options: [
        'The Navier-Stokes equations break down at small scales',
        'Eddies smaller than the computational grid cannot be directly resolved and their effect on larger scales must be modeled',
        'LES only simulates 2D flows and ignores the third dimension',
        'Turbulence is fundamentally a quantum mechanical phenomenon',
      ],
      correctAnswer: 1,
      explanation: 'LES resolves large energy-carrying eddies but filters out small scales; the SGS model accounts for energy transfer from resolved to subgrid scales — ML-learned SGS models aim to improve accuracy over classical Smagorinsky-type closures.',
      hints: [
        'The word "subgrid" tells you the model is needed for what happens below the grid resolution.',
        'Small eddies still affect large-scale flow; you need to model their aggregate effect without resolving them directly.',
      ],
    },
    {
      id: 'q-sciml-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'ML-based turbulence closure models that are trained on DNS data can guarantee physical realizability (e.g., non-negative turbulent kinetic energy) without explicit constraints.',
      correctAnswer: 'false',
      explanation: 'Pure data-driven closure models can produce unphysical predictions (negative TKE, violated Galilean invariance) without hard physical constraints; embedding symmetries and realizability conditions into the model architecture or loss function is essential.',
      hints: [
        'A neural network trained by minimizing MSE has no built-in knowledge of physics constraints.',
        'Physical realizability conditions (positive definiteness, invariance) must be explicitly enforced.',
      ],
    },
    {
      id: 'q-sciml-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the "a posteriori" testing challenge for ML turbulence models?',
      options: [
        'Testing the model on data from a different computer than the one used for training',
        'Evaluating the model embedded inside a full CFD simulation (coupled) rather than just in isolation on validation data (a priori), where errors can accumulate and cause instability',
        'Testing the model after the simulation has already converged to its final state',
        'Evaluating model performance on turbulent flows from a different fluid (water vs. air)',
      ],
      correctAnswer: 1,
      explanation: 'A priori testing evaluates the SGS model against DNS data independently; a posteriori testing deploys it inside a live LES solver. Error accumulation over time steps can cause divergence even when a priori errors are low — a critical gap many ML models fail to bridge.',
      hints: [
        '"A priori" means testing in isolation; "a posteriori" means testing in the full coupled simulation.',
        'Small errors per step can compound into large errors or instabilities over thousands of time steps.',
      ],
    },
  ],

  'molecular-dynamics-ml': [
    {
      id: 'q-sciml-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Machine Learning Potentials (MLPs) in molecular dynamics are designed to:',
      options: [
        'Replace molecular dynamics simulation with a purely statistical model',
        'Learn interatomic potential energy surfaces from quantum chemistry calculations, enabling fast MD simulations with near-DFT accuracy',
        'Predict 3D protein structures from amino acid sequences',
        'Generate new molecular structures de novo using generative models',
      ],
      correctAnswer: 1,
      explanation: 'MLPs (e.g., Behler-Parrinello networks, ANI, MACE) fit potential energy surfaces from DFT reference data, enabling force field computations 1000× faster than DFT while retaining quantum-level accuracy for dynamics simulations.',
      hints: [
        'Classical force fields are fast but inaccurate; DFT is accurate but slow — MLPs aim to be both fast and accurate.',
        'The ML model learns from quantum chemistry (DFT) calculations and then replaces those expensive calculations during simulation.',
      ],
    },
    {
      id: 'q-sciml-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Behler-Parrinello symmetry functions ensure that ML potentials are invariant to translation, rotation, and permutation of identical atoms.',
      correctAnswer: 'true',
      explanation: 'Behler-Parrinello atom-centered symmetry functions (radial and angular) encode local chemical environments in a way that is invariant to rigid-body transformations and atom index permutation — physical symmetries that any valid potential energy surface must satisfy.',
      hints: [
        'The potential energy of a molecule cannot change if you rotate or translate it in space.',
        'Swapping two identical atoms (e.g., two carbon atoms) must give the same energy.',
      ],
    },
    {
      id: 'q-sciml-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Active learning is commonly used in the development of ML potentials because:',
      options: [
        'DFT calculations are so cheap that random sampling is the preferred strategy',
        'The potential energy surface is high-dimensional and rare but important configurations (transition states, defects) are poorly sampled by simple MD trajectories alone',
        'Active learning eliminates the need for any reference quantum chemistry calculations',
        'ML potentials can only learn from data generated by force fields, not quantum chemistry',
      ],
      correctAnswer: 1,
      explanation: 'Query-by-committee and uncertainty-based active learning identify configurations where the ML potential is uncertain, triggering DFT calculations only for the most informative structures — efficiently covering chemical space without brute-force DFT sampling.',
      hints: [
        'Random sampling of MD trajectories may miss rare but chemically important configurations.',
        'Active learning focuses expensive DFT calculations on the configurations that are most informative for the model.',
      ],
    },
  ],

  'materials-discovery': [
    {
      id: 'q-sciml-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Materials Project and AFLOW databases are used in materials discovery ML primarily as:',
      options: [
        'Sources of experimental synthesis procedures for new materials',
        'Large repositories of DFT-computed material properties used as training data for property prediction models',
        'Databases of clinical trial results for biomaterials',
        'Collections of crystal structure images for computer vision models',
      ],
      correctAnswer: 1,
      explanation: 'Materials Project and AFLOW contain millions of DFT-computed properties (formation energy, bandgap, elastic constants) for known and hypothetical crystal structures, serving as foundational training datasets for ML materials property predictors.',
      hints: [
        'These databases contain computed (not experimental) material properties at scale, enabling data-driven ML.',
        'DFT calculations are expensive but automated; running them on thousands of structures creates a large labeled dataset.',
      ],
    },
    {
      id: 'q-sciml-kp7-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Google DeepMind\'s GNoME model discovered millions of new stable crystal structures by combining GNN-based property prediction with high-throughput DFT validation.',
      correctAnswer: 'true',
      explanation: 'GNoME (Graph Networks for Materials Exploration) used a GNN trained on existing crystal data to predict stable structures, then validated ~380,000 new stable materials with DFT — a 45-fold increase in known stable inorganic crystals.',
      hints: [
        'GNoME uses graph neural networks because crystal structures naturally map to graphs (atoms as nodes, bonds/proximity as edges).',
        'The ML model proposes candidates; DFT then validates which ones are truly stable.',
      ],
    },
    {
      id: 'q-sciml-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Inverse materials design with ML differs from forward property prediction in that it:',
      options: [
        'Predicts material properties given a known crystal structure',
        'Generates new crystal structures or compositions that are predicted to have a target set of desired properties',
        'Validates DFT calculations against experimental measurements',
        'Classifies materials into existing categories based on their electronic structure',
      ],
      correctAnswer: 1,
      explanation: 'Inverse design starts from desired properties (e.g., bandgap = 1.5 eV, thermodynamically stable) and searches or generates structures that satisfy these targets — the reverse of forward prediction — using generative models or Bayesian optimization.',
      hints: [
        'Forward: given a structure, predict properties. Inverse: given desired properties, find the structure.',
        'This is like asking "design a molecule that cures disease X" vs. "predict whether this molecule cures disease X."',
      ],
    },
  ],

  'scientific-foundation-models': [
    {
      id: 'q-sciml-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'ESM-2 (Evolutionary Scale Modeling) is a foundation model for which scientific domain?',
      options: [
        'Climate and weather prediction',
        'Protein sequences — it learns amino acid representations from hundreds of millions of protein sequences via masked language modeling',
        'Particle physics event classification',
        'Quantum circuit simulation',
      ],
      correctAnswer: 1,
      explanation: 'ESM-2 is Meta AI\'s protein language model, pre-trained on 250 million protein sequences; it learns rich residue-level representations capturing evolutionary, structural, and functional information without any 3D structure supervision.',
      hints: [
        'ESM stands for "Evolutionary Scale Modeling" — evolution and scale refer to evolutionary biology and the scale of protein sequence data.',
        'It uses the same masked language modeling objective as BERT, but applied to amino acid sequences.',
      ],
    },
    {
      id: 'q-sciml-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Scientific foundation models like ESM-2 demonstrate that self-supervised pre-training on large biological sequence databases can learn biologically meaningful representations without explicit structural or functional labels.',
      correctAnswer: 'true',
      explanation: 'ESM-2\'s representations encode secondary structure, contact maps, and functional sites even though training used only sequence prediction — evolutionary co-variation in sequences encodes 3D structural constraints implicitly captured by the language model.',
      hints: [
        'The model never sees protein 3D structures during pre-training, yet its representations correlate with structural features.',
        'Co-evolutionary signals in sequences (correlated mutations at spatially proximal positions) encode 3D contacts.',
      ],
    },
    {
      id: 'q-sciml-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The key challenge in building general scientific foundation models (across physics, chemistry, biology) compared to NLP foundation models is:',
      options: [
        'Scientific data is always tabular and cannot benefit from transformer architectures',
        'Scientific data spans diverse modalities, symmetries, and physical constraints that require domain-specific inductive biases not present in standard transformer architectures',
        'Scientific problems have solutions that are always known analytically',
        'Scientific datasets are too small to pre-train any model larger than 1 million parameters',
      ],
      correctAnswer: 1,
      explanation: 'Scientific foundation models must respect physical symmetries (rotational, permutation, gauge invariance), handle heterogeneous modalities (sequences, graphs, fields, spectra), and encode domain constraints — requiring bespoke architectures beyond standard text transformers.',
      hints: [
        'Text is discrete tokens with positional order; scientific data includes 3D geometries, spectra, graphs — each with domain-specific structure.',
        'A protein model must be rotation-invariant; a climate model must respect physical conservation laws — generic transformers do not.',
      ],
    },
  ],

  'uncertainty-quantification': [
    {
      id: 'q-sciml-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In scientific ML, the distinction between aleatoric and epistemic uncertainty is important because:',
      options: [
        'Aleatoric uncertainty can be reduced by collecting more data, while epistemic uncertainty cannot',
        'Epistemic uncertainty (model ignorance) can be reduced with more data, while aleatoric uncertainty (irreducible noise) cannot',
        'Both types of uncertainty can be eliminated by training a larger neural network',
        'Aleatoric uncertainty only applies to classification tasks, not regression',
      ],
      correctAnswer: 1,
      explanation: 'Epistemic uncertainty reflects model ignorance in regions of sparse training data — more data reduces it. Aleatoric uncertainty reflects inherent measurement noise or stochasticity — it is irreducible regardless of data volume.',
      hints: [
        'Think about measuring the length of an object with a ruler vs. the exact position of a quantum particle.',
        '"Epistemic" comes from the Greek for knowledge — it is about what we do not know yet, which can improve.',
      ],
    },
    {
      id: 'q-sciml-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Deep ensembles — training multiple neural networks with different random seeds — provide reliable estimates of predictive uncertainty without requiring Bayesian inference.',
      correctAnswer: 'true',
      explanation: 'Deep ensembles have been shown empirically to produce well-calibrated uncertainty estimates, outperforming many approximate Bayesian methods on out-of-distribution detection, despite being a simple, non-Bayesian approach.',
      hints: [
        'When multiple independently trained models disagree on a prediction, that disagreement signals high uncertainty.',
        'Ensembles are non-Bayesian but empirically produce better uncertainty estimates than many approximate Bayesian methods.',
      ],
    },
    {
      id: 'q-sciml-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Conformal prediction in scientific ML is valued because it provides:',
      options: [
        'Exact Bayesian posteriors over model parameters',
        'Distribution-free, finite-sample prediction intervals with guaranteed coverage probability without strong distributional assumptions',
        'A method to train models faster using conformal loss functions',
        'Exact solutions to PDEs from neural network predictions',
      ],
      correctAnswer: 1,
      explanation: 'Conformal prediction wraps any ML model to produce prediction intervals with guaranteed marginal coverage (e.g., 90% of true values fall inside) under only the mild assumption of exchangeable data — no parametric model assumptions required.',
      hints: [
        'Most uncertainty methods require distributional assumptions; conformal prediction does not.',
        'The coverage guarantee means that if you say 90% intervals, exactly 90% of intervals will contain the true value on average.',
      ],
    },
  ],

  'symbolic-regression': [
    {
      id: 'q-sciml-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The goal of symbolic regression is to:',
      options: [
        'Convert neural network weights into symbolic mathematical expressions',
        'Search for a mathematical expression (formula) from a predefined set of operators that best fits observed data',
        'Classify mathematical symbols in handwritten equations using computer vision',
        'Prove mathematical theorems automatically using formal verification',
      ],
      correctAnswer: 1,
      explanation: 'Symbolic regression discovers explicit mathematical formulas (e.g., F = ma, E = mc²) from data by searching over combinations of mathematical operators and constants — unlike neural networks, the output is an interpretable equation.',
      hints: [
        'The output is not a model with millions of weights — it is a human-readable mathematical equation.',
        'Think about Kepler discovering the ellipse equation for planetary orbits from data — symbolic regression automates this process.',
      ],
    },
    {
      id: 'q-sciml-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Genetic programming is a classical approach to symbolic regression that evolves mathematical expression trees through selection, crossover, and mutation operations.',
      correctAnswer: 'true',
      explanation: 'Genetic programming represents equations as tree structures (operators as internal nodes, variables/constants as leaves) and evolves populations of trees using evolutionary operators — DEAP and PySR use this paradigm, often with physics-informed constraints.',
      hints: [
        'Genetic algorithms use principles from biological evolution — selection of the fittest, crossover of two parents, random mutation.',
        'Mathematical expressions can be represented as trees: (+, x, y) represents x+y as a tree with + at the root.',
      ],
    },
    {
      id: 'q-sciml-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Transformer-based symbolic regression methods (e.g., NeSymReS, SNIP) differ from genetic programming by:',
      options: [
        'Generating only linear regression equations without nonlinear terms',
        'Using a pre-trained transformer that generates equation skeletons autoregressively, amortizing the search cost across many problems',
        'Requiring analytical gradients of the target equation to train',
        'Operating exclusively on integer-valued datasets',
      ],
      correctAnswer: 1,
      explanation: 'Transformer-based methods train a sequence model on a large corpus of (dataset, equation) pairs; at inference, the transformer generates an equation for a new dataset in one forward pass — amortized inference avoids the expensive per-problem evolutionary search.',
      hints: [
        'Genetic programming searches from scratch for each new dataset; transformers amortize this cost across training.',
        '"Amortized inference" means the expensive computation happens during training, making inference fast.',
      ],
    },
  ],

  'weather-forecasting-ml': [
    {
      id: 'q-sciml-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Pangu-Weather and GraphCast represent a new class of ML weather forecasting models that are notable for:',
      options: [
        'Generating weather forecasts from raw satellite imagery without any prior model output',
        'Matching or exceeding the accuracy of operational numerical weather prediction (NWP) models like ECMWF\'s IFS at a fraction of the inference time',
        'Forecasting weather only at a single geographic location without spatial modeling',
        'Replacing all physical parameterizations with reinforcement learning agents',
      ],
      correctAnswer: 1,
      explanation: 'Pangu-Weather (Huawei) and GraphCast (DeepMind) achieve competitive or superior 10-day forecast accuracy compared to ECMWF IFS, but run inference in seconds rather than hours on specialized hardware.',
      hints: [
        'The key value proposition is speed — ECMWF\'s ensemble forecasts take significant compute time; ML models run in seconds.',
        'These models are trained on ERA5 reanalysis data and evaluated against operational NWP benchmarks.',
      ],
    },
    {
      id: 'q-sciml-kp11-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'FourCastNet uses a Fourier-based vision transformer to model global atmospheric dynamics on a latitude-longitude grid.',
      correctAnswer: 'true',
      explanation: 'FourCastNet (NVIDIA) uses an Adaptive Fourier Neural Operator as its core layer, operating on the spherical grid of atmospheric variables (temperature, wind, humidity) at multiple pressure levels for short-to-medium range weather prediction.',
      hints: [
        'FourCastNet\'s name contains "Fourier" — its architecture uses Fourier-based operations for global spatial modeling.',
        'It processes gridded atmospheric data that naturally lives on a spherical (latitude-longitude) domain.',
      ],
    },
    {
      id: 'q-sciml-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key limitation of current ML weather forecasting models compared to physics-based NWP is their handling of:',
      options: [
        'Temperature prediction, which requires quantum mechanical calculations',
        'Rare extreme events (hurricanes, flash floods) where training data is sparse, and physical consistency across ensemble members',
        'Wind speed at standard pressure levels, which cannot be represented on a grid',
        'Data assimilation from new observational sources like GPS radio occultation',
      ],
      correctAnswer: 1,
      explanation: 'ML models trained primarily on common weather patterns may underperform on rare extremes (limited training examples), and unlike physics-based ensembles, they do not guarantee atmospheric energy conservation or physical consistency between ensemble members.',
      hints: [
        'Machine learning extrapolates poorly to rare events that appear infrequently in training data.',
        'Physical NWP models satisfy conservation laws by construction; ML models learn statistical patterns that may violate them at the extremes.',
      ],
    },
  ],

  'cosmology-ml': [
    {
      id: 'q-sciml-kp12-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Machine learning is used in gravitational wave astronomy (LIGO/Virgo) primarily to:',
      options: [
        'Build the interferometer hardware that detects gravitational waves',
        'Rapidly classify detector noise, identify signal candidates, and estimate source parameters faster than matched filtering alone',
        'Replace the general relativistic equations used to model binary mergers',
        'Generate gravitational wave training data using classical simulations',
      ],
      correctAnswer: 1,
      explanation: 'ML models (CNNs, Transformers) accelerate gravitational wave searches: classifying noise glitches, distinguishing real signals from artifacts, and performing rapid parameter estimation — complementing traditional matched-filter pipelines.',
      hints: [
        'LIGO data is dominated by noise; ML helps quickly classify whether a detected signal is astrophysical or instrumental.',
        'Bayesian parameter estimation (masses, spins, sky location) with MCMC takes days; ML surrogates run in seconds.',
      ],
    },
    {
      id: 'q-sciml-kp12-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Neural networks have been used to emulate cosmological N-body simulations, enabling rapid generation of large-scale structure realizations without running expensive particle simulations.',
      correctAnswer: 'true',
      explanation: 'Emulators like CAMELS and EuclidEmulator train neural networks on N-body simulation outputs; given cosmological parameters, they predict power spectra or density fields in milliseconds vs. hours for a full N-body run — enabling MCMC posterior sampling.',
      hints: [
        'N-body simulations of large-scale structure require supercomputers and hours; an emulator provides the same output almost instantly.',
        'The emulator learns the mapping from cosmological parameters to observable statistics.',
      ],
    },
    {
      id: 'q-sciml-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Simulation-based inference (SBI) / likelihood-free inference is used in cosmology because:',
      options: [
        'The likelihood function for cosmological observables can always be written in closed form',
        'The likelihood of observing data given cosmological parameters is often intractable, but forward simulations are possible — SBI methods learn the posterior directly from simulations',
        'MCMC methods cannot be applied to cosmological datasets of any size',
        'Physical cosmological models have no free parameters to infer',
      ],
      correctAnswer: 1,
      explanation: 'Cosmological likelihoods for complex statistics (e.g., higher-order statistics, galaxy morphologies) are analytically intractable; SBI methods (SNPE, SNLE, SNRE) train neural estimators on simulation pairs (θ, x) to approximate the posterior directly.',
      hints: [
        'Traditional Bayesian inference requires evaluating the likelihood — what if you cannot write it down?',
        'Forward simulations are feasible (you can simulate the universe given cosmological parameters), even if the inverse probability is not analytically tractable.',
      ],
    },
  ],

  'particle-physics-ml': [
    {
      id: 'q-sciml-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In LHC particle physics, jet tagging with ML refers to:',
      options: [
        'Annotating particle tracks in cloud chamber photographs',
        'Classifying jets (collimated sprays of hadrons) by their originating parton (quark flavor, gluon, W/Z/Higgs boson, top quark)',
        'Tracking jet airplane traffic near the CERN facility',
        'Tagging dataset files with metadata in the CERN data management system',
      ],
      correctAnswer: 1,
      explanation: 'Jet tagging classifies the origin of hadronic jets — whether they come from light quarks, gluons, b-quarks, or boosted bosons — enabling searches for new physics by distinguishing signal jets from QCD background with high purity.',
      hints: [
        'Jets are formed when quarks or gluons from proton collisions fragment into sprays of detectable particles.',
        'Tagging the "flavor" of a jet helps physicists identify whether a Higgs boson decayed into that jet.',
      ],
    },
    {
      id: 'q-sciml-kp13-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Graph Neural Networks are particularly well-suited for particle physics event reconstruction because collision events naturally form variable-size sets of particle tracks and calorimeter clusters with pairwise interaction structure.',
      correctAnswer: 'true',
      explanation: 'Collision events have variable numbers of particles with complex pairwise interactions (e.g., proximity in detector space, shared vertex) — GNNs operating on particle sets or k-NN graphs capture these interactions naturally, outperforming architectures that require fixed-size inputs.',
      hints: [
        'Each collision event produces a different number of particle tracks — a fixed-size input representation is awkward.',
        'Particles interact through proximity and shared production vertices, which are naturally modeled as edges in a graph.',
      ],
    },
    {
      id: 'q-sciml-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The optimal transport-based Earth Mover\'s Distance (EMD) is used as a jet distance metric in particle physics ML because:',
      options: [
        'It is computationally free to evaluate for large particle multiplicity',
        'It provides a physically meaningful, IRC-safe (infrared and collinear safe) measure of the geometric energy flow difference between jets',
        'It is the only metric that satisfies the triangle inequality for jet comparisons',
        'It is required by the LHC trigger system for real-time jet selection',
      ],
      correctAnswer: 1,
      explanation: 'EMD measures how much energy must be transported to morph one jet\'s energy flow pattern into another\'s, providing a natural physics-motivated metric that respects infrared/collinear safety — crucial for perturbative QCD validity and anomaly detection in jet space.',
      hints: [
        'Think of jets as distributions of energy in angle space — EMD measures the "cost" of morphing one distribution into another.',
        'IRC safety means the metric is unchanged by splitting one particle into two collinear ones or adding an infinitely soft particle.',
      ],
    },
  ],

  'quantum-chemistry-ml': [
    {
      id: 'q-sciml-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SchNet is a pioneering deep learning model for quantum chemistry that processes molecular structures using:',
      options: [
        'SMILES string tokenization with a recurrent neural network',
        'Continuous-filter convolutional layers on atom-centered 3D point clouds, with interactions based on interatomic distances',
        'Fourier transforms of molecular electron density grids',
        'Graph attention over molecular fingerprints',
      ],
      correctAnswer: 1,
      explanation: 'SchNet uses atom-centered representations and continuous-filter convolutions that depend on interatomic distances, making it invariant to translation and rotation while predicting energies, forces, and other quantum chemical properties from 3D atomic coordinates.',
      hints: [
        'SchNet processes 3D atomic coordinates — the key input is the position of each atom in space.',
        'The interactions in SchNet depend on the distance between atoms, encoding the physics of interatomic potentials.',
      ],
    },
    {
      id: 'q-sciml-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'DimeNet improves upon SchNet by incorporating directional information (bond angles) in addition to interatomic distances, enabling more accurate property prediction.',
      correctAnswer: 'true',
      explanation: 'DimeNet uses directional message passing that incorporates the angle between bonds — not just radial distances — capturing angular geometry of atomic environments, which is important for properties like molecular dipole moments and torsion barriers.',
      hints: [
        'SchNet only uses distances (radial); DimeNet adds angles (directional). More geometric information means better accuracy.',
        'Bond angles determine molecular geometry: water\'s 104.5° angle vs. CO₂\'s 180° linear structure have very different properties.',
      ],
    },
    {
      id: 'q-sciml-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Neural network approaches to solving the electronic Schrödinger equation (e.g., FermiNet, PauliNet) achieve high accuracy by:',
      options: [
        'Training on density functional theory (DFT) outputs and learning a correction function',
        'Using neural networks as variational ansätze for the many-electron wavefunction that explicitly encode fermionic antisymmetry (Pauli exclusion principle)',
        'Replacing Hamiltonians with random matrix models for computational efficiency',
        'Using graph neural networks on crystal unit cells to predict ground state energies',
      ],
      correctAnswer: 1,
      explanation: 'FermiNet and PauliNet parameterize the many-electron wavefunction as a neural network that is antisymmetric by construction (via determinants of learned orbitals), enabling variational Monte Carlo optimization that approaches chemical accuracy for small molecules.',
      hints: [
        'The Pauli exclusion principle requires the wavefunction to be antisymmetric under exchange of any two electrons.',
        'Building this antisymmetry into the neural network architecture (via a determinant) makes the variational ansatz physically valid.',
      ],
    },
  ],

  'fluid-simulation-ml': [
    {
      id: 'q-sciml-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In ML-accelerated CFD, surrogate models are used to:',
      options: [
        'Generate training data for turbulence models using random noise',
        'Replace or accelerate expensive high-fidelity CFD simulations with fast approximate predictions for design optimization or uncertainty quantification',
        'Visualize CFD results in augmented reality',
        'Automatically mesh complex geometries without human input',
      ],
      correctAnswer: 1,
      explanation: 'CFD surrogates (neural networks, Gaussian processes) learn the mapping from design parameters to quantities of interest (drag, lift, pressure distribution) from a training set of CFD runs, enabling rapid evaluation of thousands of design configurations during optimization.',
      hints: [
        'A single CFD simulation of an aircraft wing might take hours; a surrogate can predict the same output in milliseconds.',
        'Surrogates trade some accuracy for speed — acceptable for early-stage design exploration.',
      ],
    },
    {
      id: 'q-sciml-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Graph Network Simulators (GNS) can simulate fluid dynamics by treating fluid particles or mesh nodes as graph nodes and learning interaction rules via message passing.',
      correctAnswer: 'true',
      explanation: 'GNS (DeepMind) treats simulation particles as graph nodes connected by proximity edges; it learns position updates via message passing GNNs, enabling simulation of fluids, granular materials, and deformable bodies that generalize to unseen geometries.',
      hints: [
        'Fluid simulation involves many interacting particles — each affects its neighbors, which is exactly what graph message passing models.',
        'GNS was shown to generalize to simulation geometries not seen during training.',
      ],
    },
    {
      id: 'q-sciml-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Reynolds-Averaged Navier-Stokes (RANS) closure problem that ML aims to address involves:',
      options: [
        'The inability of Navier-Stokes equations to model compressible flows',
        'The unknown Reynolds stress tensor, which must be modeled as a function of mean flow quantities to close the time-averaged equations',
        'The nonlinearity of the pressure-velocity coupling in incompressible flows',
        'The computational cost of solving the continuity equation on unstructured meshes',
      ],
      correctAnswer: 1,
      explanation: 'Time-averaging the Navier-Stokes equations introduces the Reynolds stress tensor (from nonlinear velocity fluctuation correlations) that cannot be expressed in terms of mean flow quantities without an additional closure model — ML-based closures learn these mappings from DNS data.',
      hints: [
        'Time-averaging introduces extra unknowns (turbulent stress terms) that need additional equations to close the system.',
        'The Boussinesq hypothesis provides a simple closure; ML methods learn more complex, accurate closures from DNS data.',
      ],
    },
  ],

  'topology-optimization': [
    {
      id: 'q-sciml-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Topology optimization finds the optimal material distribution within a design domain by:',
      options: [
        'Manually testing different geometric shapes and selecting the best performing one',
        'Iteratively redistributing material to minimize an objective (e.g., structural compliance) subject to a volume fraction constraint using sensitivity analysis',
        'Applying Fourier analysis to decompose the structure into frequency components',
        'Using molecular dynamics to find the lowest-energy atomic configuration',
      ],
      correctAnswer: 1,
      explanation: 'Topology optimization (SIMP method) assigns a density variable to each finite element and iteratively updates densities using compliance sensitivities computed from FEM, producing organic-looking structures that maximize stiffness for minimum material use.',
      hints: [
        'Think about how aircraft brackets or bike frames are redesigned to look organic — that\'s topology optimization at work.',
        'The algorithm decides where material should and should not be placed to achieve maximum performance.',
      ],
    },
    {
      id: 'q-sciml-kp16-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Neural network-based topology optimization methods can amortize the FEM solve cost by learning to predict optimal material distributions directly from load/boundary conditions, enabling real-time design exploration.',
      correctAnswer: 'true',
      explanation: 'Approaches like TopNet and TopoGAN train neural networks on pairs of (boundary conditions, optimal topology) from classical TO runs; at inference, the network predicts near-optimal topologies without iterative FEM solves — enabling interactive design tools.',
      hints: [
        'Classical TO runs many FEM simulations iteratively; a trained neural network skips all of them at inference time.',
        'The training cost is a one-time investment; subsequent predictions are essentially free.',
      ],
    },
    {
      id: 'q-sciml-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Differentiable rendering combined with topology optimization allows:',
      options: [
        'Optimizing 3D printed structures based purely on visual appearance criteria',
        'End-to-end gradient-based optimization of structural geometry for objectives defined on rendered images or point clouds, bridging design and manufacturing',
        'Rendering photorealistic images of optimized structures for presentation purposes only',
        'Automatically converting CAD models to finite element meshes',
      ],
      correctAnswer: 1,
      explanation: 'Differentiable rendering enables gradients to flow from image-space losses (appearance, aerodynamic drag estimated from renders) back through the rendering process to 3D geometry parameters, enabling joint structural and aesthetic optimization via gradient descent.',
      hints: [
        'Differentiable rendering makes the rendering process differentiable — meaning you can backpropagate through it.',
        'If you can compute gradients through rendering, you can optimize 3D shapes for criteria defined in image space.',
      ],
    },
  ],

  'inverse-problems': [
    {
      id: 'q-sciml-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'An inverse problem in science involves:',
      options: [
        'Solving for the output of a physical model given known parameters (forward problem)',
        'Inferring unknown model parameters or source distributions from observed measurements',
        'Proving the mathematical uniqueness of a differential equation solution',
        'Reversing the order of operations in a computational pipeline',
      ],
      correctAnswer: 1,
      explanation: 'Inverse problems infer causes from effects: given measurements (e.g., seismic waves, MRI signals, detector counts), recover the source (subsurface structure, tissue properties, emission distribution) — inherently ill-posed and requiring regularization.',
      hints: [
        'The forward problem: given the underground structure, predict seismic wave patterns. The inverse: given seismic waves, recover the underground structure.',
        'Inverse problems are often ill-posed — many different parameter sets can produce similar observations.',
      ],
    },
    {
      id: 'q-sciml-kp17-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Score-based diffusion models have been applied to inverse problems by using the learned prior score to regularize the likelihood gradient, enabling posterior sampling without retraining for each new measurement operator.',
      correctAnswer: 'true',
      explanation: 'Methods like DPS and DDRM use the pre-trained diffusion score as an implicit prior; at inference, they combine the score with the measurement likelihood gradient to sample from the posterior p(x|y), enabling zero-shot adaptation to new inverse problems.',
      hints: [
        'The diffusion model provides a learned prior over natural images or signals; the measurement operator defines the likelihood.',
        '"Zero-shot" means the same pre-trained model can solve different inverse problems (deblurring, inpainting, CT) without retraining.',
      ],
    },
    {
      id: 'q-sciml-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In seismic full waveform inversion (FWI), deep learning-based approaches offer advantages because:',
      options: [
        'Neural networks can directly measure seismic wave propagation in real time',
        'They can learn physics-constrained priors over subsurface velocity models, reducing ill-posedness and improving convergence over purely data-driven regularization',
        'FWI requires no gradient computation, which neural networks provide automatically',
        'Neural networks can perfectly recover subsurface structures from a single seismic shot',
      ],
      correctAnswer: 1,
      explanation: 'Deep learning provides regularization through learned priors over geologically plausible velocity models; combining learned priors with physics-based wave propagation (differentiable forward modeling) constrains the ill-posed FWI optimization to physically realistic solutions.',
      hints: [
        'FWI is ill-posed: many subsurface models can produce similar seismic waveforms — regularization is essential.',
        'A learned prior from real geological models can constrain the search to plausible subsurface structures.',
      ],
    },
  ],

  'multi-scale-modeling': [
    {
      id: 'q-sciml-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The challenge of multi-scale modeling in science arises because:',
      options: [
        'Physical phenomena occur only at the atomic scale and cannot be modeled at larger scales',
        'Relevant physics spans many orders of magnitude in length and time scales, making direct simulation of all scales simultaneously computationally infeasible',
        'Different scales require different programming languages for their simulations',
        'Multi-scale models violate the laws of thermodynamics at the boundary between scales',
      ],
      correctAnswer: 1,
      explanation: 'Turbulent combustion, for example, spans from molecular (nm, fs) to engineering (m, s) scales — 9 orders of magnitude each — making full-scale direct simulation impossible. ML bridges scales by learning effective coarse-grained models from fine-scale simulations.',
      hints: [
        'Think about a material failure: atomic bond breaking determines macroscopic fracture, but simulating every atom in an aircraft wing is impossible.',
        'The challenge is bridging the gap: how do fine-scale processes (molecules) affect coarse-scale behavior (continuum mechanics)?',
      ],
    },
    {
      id: 'q-sciml-kp18-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Homogenization theory provides a mathematical foundation for deriving effective coarse-grained equations from fine-scale physics, and ML can learn these effective properties directly from micro-scale simulations.',
      correctAnswer: 'true',
      explanation: 'Computational homogenization uses micro-scale simulations (RVE analysis) to compute effective material properties (stiffness tensor, diffusivity); ML surrogates learn these property maps from fine-scale data, enabling rapid macro-scale simulations with micro-structure awareness.',
      hints: [
        'Homogenization replaces a heterogeneous microstructure with effective properties of a uniform material.',
        'ML can learn the mapping from microstructure description to effective properties much faster than running each RVE simulation.',
      ],
    },
    {
      id: 'q-sciml-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In concurrent multi-scale simulation (FE²), ML surrogates improve computational tractability by:',
      options: [
        'Replacing the macro-scale finite element solver with a neural network',
        'Learning the microscale constitutive response (stress-strain mapping from RVE simulations) to replace expensive online micro-scale RVE computations at each macro integration point',
        'Eliminating the need for any micro-scale simulation data',
        'Using reinforcement learning to adaptively refine the macro-scale mesh',
      ],
      correctAnswer: 1,
      explanation: 'FE² requires a micro-scale RVE solve at every macro integration point and time step — prohibitively expensive. ML constitutive models (trained on offline RVE data) replace these online micro-solves, achieving speedups of 10³-10⁶× while retaining micro-structure fidelity.',
      hints: [
        'FE² literally means two nested finite element solves — one at macro scale, one at micro scale for each integration point.',
        'The ML surrogate learns what the micro-scale RVE would output for any given strain state, without re-running the simulation.',
      ],
    },
  ],

  'active-learning-sci': [
    {
      id: 'q-sciml-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The core idea of active learning for scientific experiments is:',
      options: [
        'Running all possible experiments in parallel to maximize data collection speed',
        'Selecting the most informative experiments to run next based on current model uncertainty, minimizing the number of expensive experiments needed',
        'Automating experimental apparatus using robotic systems',
        'Training models on publicly available datasets instead of running new experiments',
      ],
      correctAnswer: 1,
      explanation: 'Active learning closes the loop between model and experiment: the model identifies which experiments would reduce uncertainty the most, guiding a scientist or robot to run those specific experiments next — maximizing information gain per experimental cost.',
      hints: [
        'The goal is to learn the most from the fewest experiments — experiment budgets are real constraints.',
        'Instead of random sampling, active learning asks "which experiment would teach the model the most?"',
      ],
    },
    {
      id: 'q-sciml-kp19-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Bayesian optimization is a form of active learning that models the objective function with a Gaussian process and uses an acquisition function to select the next query point.',
      correctAnswer: 'true',
      explanation: 'Bayesian optimization maintains a Gaussian process surrogate of the unknown objective; acquisition functions (Expected Improvement, UCB, Thompson sampling) balance exploration of uncertain regions and exploitation of known good regions to find the optimum efficiently.',
      hints: [
        'Bayesian optimization is the workhorse for hyperparameter tuning — the same method applies to scientific experimental optimization.',
        'The Gaussian process provides both a mean prediction and uncertainty estimate; the acquisition function uses both.',
      ],
    },
    {
      id: 'q-sciml-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Self-driving laboratories (SDLs) combine active learning with:',
      options: [
        'Human scientists manually selecting experiments based on model recommendations',
        'Robotic experimental platforms that autonomously execute ML-selected experiments, close the data loop, and update models without human intervention',
        'Pre-recorded experimental protocols replayed on robotic hardware',
        'Deep reinforcement learning agents that control laboratory equipment through trial and error',
      ],
      correctAnswer: 1,
      explanation: 'SDLs (e.g., A-Lab at Berkeley, Chemspeed, Emerald Cloud Lab) integrate ML-driven experiment selection with autonomous robotic execution and automated characterization, creating a closed-loop discovery platform that runs 24/7 without human bottlenecks.',
      hints: [
        'A self-driving laboratory is analogous to a self-driving car — both human and robot decisions are eliminated from the loop.',
        'The full loop is: ML proposes experiment → robot executes → instrument measures → data feeds back to ML → repeat.',
      ],
    },
  ],

  'causal-sci': [
    {
      id: 'q-sciml-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Causal discovery in science aims to:',
      options: [
        'Measure correlation coefficients between all pairs of variables in a dataset',
        'Infer directed causal relationships (a causal graph) from observational data or interventional experiments',
        'Build predictive models that maximize accuracy on held-out test sets',
        'Identify the most correlated features for use in a regression model',
      ],
      correctAnswer: 1,
      explanation: 'Causal discovery infers the directed acyclic graph (DAG) encoding causal mechanisms from data, distinguishing cause from effect — essential for scientific understanding and predicting outcomes of interventions (experiments).',
      hints: [
        'Correlation tells you two variables move together; causality tells you which one drives the other.',
        'A causal graph has arrows indicating direction: A → B means A causes B, not just that they are correlated.',
      ],
    },
    {
      id: 'q-sciml-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The PC algorithm for causal discovery is a constraint-based method that uses conditional independence tests to construct a causal graph skeleton and then orient edges using v-structure patterns.',
      correctAnswer: 'true',
      explanation: 'PC algorithm starts with a fully connected graph, removes edges where conditional independence is detected (ci-tests), then orients remaining edges by identifying v-structures (A → C ← B where A and B are not adjacent) and applying orientation rules.',
      hints: [
        'PC (named after Peter and Clark) tests conditional independence to determine which edges to remove from the complete graph.',
        'V-structures (colliders) can be identified from independence patterns and provide partial edge orientation.',
      ],
    },
    {
      id: 'q-sciml-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The challenge of causal identifiability from observational data refers to:',
      options: [
        'The inability of any algorithm to process datasets with more than 100 variables',
        'The fact that multiple causal graphs (a Markov equivalence class) can generate identical observational distributions, making the true causal structure underdetermined from data alone',
        'The computational cost of running conditional independence tests for large variable sets',
        'The requirement for equal sample sizes across all observational conditions',
      ],
      correctAnswer: 1,
      explanation: 'Markov equivalence classes (CPDAGs) contain all DAGs that encode the same conditional independencies — observational data alone cannot distinguish between them. Interventional data, functional causal model assumptions, or temporal ordering are needed to identify the true DAG.',
      hints: [
        'Different causal structures can produce the same observed correlations and independence patterns.',
        'Without interventions (experiments), you can only recover the causal graph up to its Markov equivalence class.',
      ],
    },
  ],

  'graph-ml-science': [
    {
      id: 'q-sciml-kp21-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'PaiNN (Polarizable Atom Interaction Neural Network) improves upon isotropic message-passing GNNs for molecular simulation by:',
      options: [
        'Using attention over molecular fingerprints instead of 3D coordinates',
        'Incorporating equivariant vector features (in addition to scalar features) to capture directional atomic interactions',
        'Replacing interatomic distances with molecular surface area as the interaction metric',
        'Processing entire protein sequences rather than local atomic environments',
      ],
      correctAnswer: 1,
      explanation: 'PaiNN extends scalar message passing with equivariant vector features that transform correctly under rotation, capturing directional effects like bond dipoles and anisotropic polarizability — important for accurate force prediction in ML potentials.',
      hints: [
        'Scalar features (distances) cannot distinguish the direction of an interaction; vector features can.',
        'Equivariant means the feature transforms in a predictable way when the molecule is rotated.',
      ],
    },
    {
      id: 'q-sciml-kp21-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'NequIP (Neural Equivariant Interatomic Potentials) achieves high data efficiency partly because its equivariant architecture does not need to learn rotational invariance from data — it is built into the model by construction.',
      correctAnswer: 'true',
      explanation: 'By encoding E(3)-equivariance into the architecture, NequIP never needs to learn that rotating a molecule does not change its energy from data — this prior reduces the effective learning problem, enabling accurate potentials from as few as hundreds of training structures.',
      hints: [
        'A non-equivariant model must see many rotated copies of each molecule to learn rotational invariance from data.',
        'Building invariance into the architecture effectively reduces the complexity of what needs to be learned.',
      ],
    },
    {
      id: 'q-sciml-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The expressivity limit of standard message-passing GNNs is related to their inability to distinguish certain non-isomorphic graphs. For molecular systems, this means:',
      options: [
        'GNNs cannot process molecules with more than 100 atoms',
        'Standard MPNNs are at most as expressive as the 1-Weisfeiler-Lehman (1-WL) graph isomorphism test, failing to distinguish certain molecular structures that differ only in 3D geometry',
        'GNNs cannot predict scalar properties like energy, only vector properties like forces',
        'Message passing cannot propagate information beyond first-neighbor atoms',
      ],
      correctAnswer: 1,
      explanation: 'The 1-WL limit means MPNNs cannot distinguish graphs with identical local connectivity patterns but different 3D geometries (e.g., enantiomers, certain cyclic structures); higher-order GNNs or incorporating geometric features (distances, angles) are needed.',
      hints: [
        'The Weisfeiler-Lehman test is a classical graph isomorphism heuristic — 1-WL equivalence defines a GNN\'s expressivity ceiling.',
        'Two molecules can have identical bonding topology but different 3D shapes — a topology-only GNN cannot tell them apart.',
      ],
    },
  ],

  'equivariant-networks': [
    {
      id: 'q-sciml-kp22-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'E(3)-equivariance in neural networks means that the network\'s output:',
      options: [
        'Remains unchanged (invariant) for all possible inputs',
        'Transforms in the same way as the output\'s physical quantity when the input 3D coordinates are rotated, reflected, or translated',
        'Can only process molecules with exactly 3 atoms',
        'Is equivariant to permutations of atomic indices but not to rotations',
      ],
      correctAnswer: 1,
      explanation: 'E(3)-equivariance means if you rotate the input molecule, the output (forces, dipole vector) rotates correspondingly; if you translate, energy remains the same (invariant). This embeds physical symmetries of 3D space directly into the model architecture.',
      hints: [
        'E(3) is the Euclidean group in 3D: rotations, reflections, and translations.',
        'An equivariant model transforms its output consistently with the transformation applied to the input.',
      ],
    },
    {
      id: 'q-sciml-kp22-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Invariant neural networks (like SchNet) and equivariant neural networks (like NequIP) are both useful in molecular simulation, but equivariant networks are generally needed when the output is a directional quantity like atomic forces.',
      correctAnswer: 'true',
      explanation: 'Forces are vectors (directional) — a rotation-invariant model cannot directly output rotated forces. Equivariant models output quantities that transform correctly, enabling direct force prediction without finite-difference derivatives of the energy.',
      hints: [
        'Energy is a scalar (invariant to rotation); force is a vector (must rotate with the molecule).',
        'If you want to directly predict forces (not derive them from energy), the model must be equivariant in its vector outputs.',
      ],
    },
    {
      id: 'q-sciml-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Tensor field networks and SE(3)-Transformers achieve equivariance by operating on:',
      options: [
        'Scalar features only, achieving equivariance through data augmentation during training',
        'Irreducible representations (irreps) of the rotation group SO(3), where features are spherical harmonic coefficients that transform predictably under rotation',
        'Fourier transforms of 3D point cloud density functions discretized on a voxel grid',
        'Graph Laplacian eigenvectors of the molecular contact graph',
      ],
      correctAnswer: 1,
      explanation: 'By decomposing features into irreps of SO(3) (type-0 scalars, type-1 vectors, type-2 tensors, etc.) and using Clebsch-Gordan tensor products for interactions, these networks guarantee equivariance by construction via representation theory.',
      hints: [
        'Irreducible representations (irreps) of SO(3) are the spherical harmonics — the "eigenfunctions" of rotation.',
        'Combining irreps via Clebsch-Gordan products ensures the output transforms correctly under rotation without any data augmentation.',
      ],
    },
  ],

  'differentiable-programming': [
    {
      id: 'q-sciml-kp23-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'JAX enables differentiable programming in scientific computing primarily through:',
      options: [
        'A just-in-time compiler for CUDA kernels only',
        'Composable function transformations including automatic differentiation (grad), JIT compilation (jit), vectorization (vmap), and parallelization (pmap)',
        'A Python library for symbolic mathematics and formula manipulation',
        'A replacement for NumPy that runs on TPUs but not GPUs',
      ],
      correctAnswer: 1,
      explanation: 'JAX\'s power comes from composable transforms: jit compiles to XLA for GPU/TPU, grad computes exact derivatives via reverse-mode AD, vmap batches any function automatically, and pmap parallelizes across devices — enabling high-performance scientific ML with minimal code change.',
      hints: [
        'JAX is often described as "NumPy on steroids" — familiar API with powerful transformations built on top.',
        'The four key transforms are: grad (differentiation), jit (compilation), vmap (vectorization), pmap (parallelism).',
      ],
    },
    {
      id: 'q-sciml-kp23-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Differentiable physics simulators enable end-to-end gradient-based optimization of physical system parameters by backpropagating loss gradients through the simulation itself.',
      correctAnswer: 'true',
      explanation: 'Differentiable simulators (e.g., Brax, DiffTaichi, Warp) compute derivatives of simulation outputs with respect to physical parameters (initial conditions, material properties) via AD, enabling gradient-based inverse design without finite-difference approximations.',
      hints: [
        'Traditional simulators are black boxes — you cannot differentiate through them. Differentiable simulators expose gradients.',
        'If you can differentiate through the physics simulation, you can use gradient descent to optimize any parameter of the simulation.',
      ],
    },
    {
      id: 'q-sciml-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The checkpointing technique in differentiable programming trades memory for computation by:',
      options: [
        'Saving model weights to disk at regular intervals during training',
        'Storing only a subset of intermediate activations during the forward pass and recomputing others during backpropagation',
        'Using lower-precision arithmetic to reduce memory consumption during the forward pass',
        'Distributing the computation graph across multiple GPUs',
      ],
      correctAnswer: 1,
      explanation: 'Gradient checkpointing stores only O(√N) activations from N layers (instead of O(N)); during backpropagation, it recomputes the unstored activations from the nearest checkpoint — reducing memory from O(N) to O(√N) at the cost of ~33% more FLOPs.',
      hints: [
        'Backpropagation needs the forward pass activations to compute gradients — normally all must be stored.',
        'Checkpointing saves only some activations and recomputes the rest during the backward pass when needed.',
      ],
    },
  ],

  'digital-twins': [
    {
      id: 'q-sciml-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A digital twin in engineering is best described as:',
      options: [
        'A backup copy of a CAD design file stored in the cloud',
        'A virtual, real-time synchronized computational replica of a physical system that enables monitoring, prediction, and optimization',
        'A duplicate physical prototype used for destructive testing',
        'A 3D visualization of a system for presentation purposes',
      ],
      correctAnswer: 1,
      explanation: 'Digital twins continuously ingest real-time sensor data from a physical asset, update their model state, and run simulations/predictions — enabling predictive maintenance, failure detection, and virtual what-if testing without risking the physical system.',
      hints: [
        'The key attributes are: virtual, synchronized with the physical system in real time, and used for simulation/prediction.',
        'Digital twins in manufacturing predict when a machine will fail before it actually does, enabling proactive maintenance.',
      ],
    },
    {
      id: 'q-sciml-kp24-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Neural surrogate models are used within digital twins to replace expensive physics-based simulations that cannot run at the speeds required for real-time decision making.',
      correctAnswer: 'true',
      explanation: 'High-fidelity FEM or CFD simulations can take hours, incompatible with real-time twin operation; neural surrogates trained on simulation data provide predictions in milliseconds, enabling real-time state estimation, anomaly detection, and optimization within the twin.',
      hints: [
        'A real-time system needs predictions in milliseconds; FEM simulations take hours — the gap requires a fast surrogate.',
        'The surrogate is trained offline on high-fidelity simulation data, then deployed for fast inference in the twin.',
      ],
    },
    {
      id: 'q-sciml-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Physics-constrained neural networks used as digital twin surrogates offer an advantage over pure data-driven surrogates because:',
      options: [
        'They require no training data and can be deployed immediately',
        'They extrapolate more reliably to unseen operating conditions by respecting physical conservation laws and governing equations',
        'They run 100× faster than unconstrained neural networks at inference time',
        'They automatically learn the optimal sensor placement for the physical system',
      ],
      correctAnswer: 1,
      explanation: 'Pure data-driven surrogates can produce physically inconsistent predictions outside the training regime (violating mass conservation, negative temperatures); physics constraints encoded via PINNs or architecture design enforce physical correctness and improve out-of-distribution reliability.',
      hints: [
        'Pure ML models extrapolate poorly — they might predict negative pressure in an unobserved regime.',
        'Physical constraints like conservation of mass or energy eliminate physically impossible predictions.',
      ],
    },
  ],

  'climate-science-ml': [
    {
      id: 'q-sciml-kp25-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In climate science, ML is being used to improve the parameterization of which processes that are too small to be resolved by general circulation models (GCMs)?',
      options: [
        'Continental drift and tectonic plate movement',
        'Sub-grid convection, cloud formation, and turbulent mixing, which occur at scales finer than GCM grid cells',
        'Ocean basin circulation at the thousand-kilometer scale',
        'Solar irradiance variability over the 11-year sunspot cycle',
      ],
      correctAnswer: 1,
      explanation: 'GCMs have grid cells of ~100 km; convective storms and cloud microphysics occur at meters to kilometers. ML-based parameterizations (e.g., NeurIP, ClimSim data) learn these sub-grid processes from high-resolution simulations to replace classical empirical parameterizations.',
      hints: [
        'GCMs have grid cells of ~100 km; convective storms and cloud microphysics occur at much smaller scales — they must be parameterized, not resolved.',
        'The bottleneck is the number of hypotheses that can be tested — AI dramatically expands this throughput virtually.',
      ],
    },
    {
      id: 'q-sciml-kp25-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'AlphaFold2\'s impact on structural biology is a concrete example of accelerated scientific discovery, having predicted the structures of over 200 million proteins and depositing them in a public database.',
      correctAnswer: 'true',
      explanation: 'DeepMind and EMBL-EBI released the AlphaFold Protein Structure Database with predicted structures for virtually all known proteins (~200M+), transforming structural biology by making structure prediction near-instantaneous rather than requiring months of X-ray crystallography.',
      hints: [
        'AlphaFold2\'s database provides free, instant access to predicted structures that previously required expensive, time-consuming experimental determination.',
        'X-ray crystallography can take months to years per structure; AlphaFold2 predicts in minutes.',
      ],
    },
    {
      id: 'q-sciml-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "AI Scientist" concept (autonomous scientific discovery agents) faces what fundamental challenge beyond just generating hypotheses?',
      options: [
        'Modern GPUs are insufficiently powerful to run scientific ML experiments',
        'Ensuring generated hypotheses are novel, experimentally testable, and that autonomous validation processes maintain rigorous scientific standards without human bias or hallucination',
        'Scientific papers are copyrighted, preventing AI access to the literature',
        'Autonomous agents cannot interface with laboratory equipment',
      ],
      correctAnswer: 1,
      explanation: 'Autonomous discovery agents must generate truly novel (not already known) hypotheses, design executable experiments, and validate results without hallucinating conclusions — requiring robust uncertainty quantification, grounding to physical reality, and rigorous falsifiability checks.',
      hints: [
        'LLMs can generate plausible-sounding but factually incorrect scientific claims — verification is the hard part.',
        'Scientific rigor requires that findings be reproducible and falsifiable — autonomy must not sacrifice these properties.',
      ],
    },
  ],

  'accelerated-discovery': [
    {
      id: 'q-sciml-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'AI-accelerated scientific discovery primarily compresses which part of the traditional research pipeline?',
      options: [
        'Peer review and journal publication timelines',
        'Hypothesis generation, candidate screening, and experimental design — reducing the time from hypothesis to validated discovery',
        'Laboratory equipment procurement and installation',
        'Regulatory approval processes for new scientific methods',
      ],
      correctAnswer: 1,
      explanation: 'AI compresses the "ideation-to-validation" cycle: generative models propose candidates, property predictors screen millions virtually, active learning prioritizes experiments — collapsing years of iterative experimentation into weeks of ML-guided search.',
      hints: [
        'The bottleneck is the number of hypotheses that can be tested — AI dramatically expands this throughput virtually.',
        'The goal is to learn the most from the fewest experiments — experiment budgets are real constraints.',
      ],
    },
    {
      id: 'q-sciml-kp26-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'AlphaFold2\'s impact on structural biology is a concrete example of accelerated scientific discovery, having predicted the structures of over 200 million proteins and depositing them in a public database.',
      correctAnswer: 'true',
      explanation: 'DeepMind and EMBL-EBI released the AlphaFold Protein Structure Database with predicted structures for virtually all known proteins (~200M+), transforming structural biology by making structure prediction near-instantaneous rather than requiring months of X-ray crystallography.',
      hints: [
        'AlphaFold2\'s database provides free, instant access to predicted structures that previously required expensive, time-consuming experimental determination.',
        'X-ray crystallography can take months to years per structure; AlphaFold2 predicts in minutes.',
      ],
    },
    {
      id: 'q-sciml-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "AI Scientist" concept (autonomous scientific discovery agents) faces what fundamental challenge beyond just generating hypotheses?',
      options: [
        'Modern GPUs are insufficiently powerful to run scientific ML experiments',
        'Ensuring generated hypotheses are novel, experimentally testable, and that autonomous validation processes maintain rigorous scientific standards without human bias or hallucination',
        'Scientific papers are copyrighted, preventing AI access to the literature',
        'Autonomous agents cannot interface with laboratory equipment',
      ],
      correctAnswer: 1,
      explanation: 'Autonomous discovery agents must generate truly novel (not already known) hypotheses, design executable experiments, and validate results without hallucinating conclusions — requiring robust uncertainty quantification, grounding to physical reality, and rigorous falsifiability checks.',
      hints: [
        'LLMs can generate plausible-sounding but factually incorrect scientific claims — verification is the hard part.',
        'Scientific rigor requires that findings be reproducible and falsifiable — autonomy must not sacrifice these properties.',
      ],
    },
  ],

  'reproducibility-sci': [
    {
      id: 'q-sciml-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The "reproducibility crisis" in ML research refers to:',
      options: [
        'The difficulty of reproducing physical experiments due to equipment variability',
        'The widespread inability to reproduce published ML results due to missing code, data, and non-standardized evaluation protocols',
        'The challenge of running the same ML model on different hardware and getting identical floating point results',
        'The difficulty of reproducing natural language model outputs due to sampling stochasticity',
      ],
      correctAnswer: 1,
      explanation: 'Many published ML results cannot be reproduced because code and data are not released, hyperparameter details are omitted, evaluation metrics differ, or results depend on undisclosed compute budgets — eroding scientific trust and impeding cumulative progress.',
      hints: [
        'If you cannot run someone else\'s experiment and get the same result, scientific progress is impeded.',
        'Missing code, undisclosed hyperparameters, and inconsistent benchmarks are concrete contributors to this crisis.',
      ],
    },
    {
      id: 'q-sciml-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The use of fixed random seeds and releasing complete training code and data is considered best practice for reproducible ML research in scientific domains.',
      correctAnswer: 'true',
      explanation: 'Reproducibility best practices include: fixed seeds for all stochastic operations, full code release (training, evaluation, preprocessing), data release or specification, hardware/software environment documentation (requirements.txt, Dockerfile), and reporting variance over multiple runs.',
      hints: [
        'Stochastic training can give different results each run if seeds are not fixed — making results difficult to reproduce.',
        'Full code and data release lets anyone re-run the exact experiment — the gold standard for reproducibility.',
      ],
    },
    {
      id: 'q-sciml-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The distinction between "replication" and "reproduction" in scientific ML is that:',
      options: [
        'Replication and reproduction are interchangeable terms with no meaningful difference',
        'Reproduction uses the same code/data to verify the result; replication independently re-implements the method from the paper description to test generalizability',
        'Replication refers to running experiments on a replica server, while reproduction refers to re-running on the original hardware',
        'Reproduction verifies statistical significance while replication tests for practical significance',
      ],
      correctAnswer: 1,
      explanation: 'Reproduction (same code, data, pipeline) verifies computational correctness; replication (independent implementation from description) tests whether the scientific finding is genuine and robust across different implementations — a stronger claim of scientific validity.',
      hints: [
        'Reproduction is a weaker check — it mainly confirms that the code runs correctly.',
        'Replication is the stronger test — an independent implementation succeeding means the idea itself is sound, not just the specific code.',
      ],
    },
  ],

  'sparse-sensing': [
    {
      id: 'q-sciml-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Compressed sensing (CS) theory guarantees exact recovery of a sparse signal from measurements far fewer than the Nyquist rate, provided two conditions are met. What are they?',
      options: [
        'The signal must be Gaussian and the measurement matrix must be orthogonal',
        'The signal must be sparse (or compressible) in some basis, and the measurement matrix must satisfy the Restricted Isometry Property (RIP)',
        'The measurement noise must be zero and the signal must be bandlimited',
        'The signal must be 1D and the measurements must be taken at random time points',
      ],
      correctAnswer: 1,
      explanation: 'CS theory (Candès, Romberg, Tao; Donoho) guarantees that an s-sparse signal in R^n can be exactly recovered from m = O(s·log(n/s)) measurements if the measurement matrix satisfies RIP, via L1-minimization (basis pursuit).',
      hints: [
        'Sparsity means the signal has only a few non-zero components in some representation basis.',
        'RIP (Restricted Isometry Property) ensures the measurement matrix does not distort the geometry of sparse vectors.',
      ],
    },
    {
      id: 'q-sciml-kp28-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Deep learning-based compressed sensing reconstruction methods (e.g., unrolled iterative algorithms) can outperform classical L1-minimization (basis pursuit) by learning problem-specific priors from data.',
      correctAnswer: 'true',
      explanation: 'Algorithm unrolling (LISTA, ISTA-Net) and end-to-end reconstruction networks (E2E-Var-Net) learn measurement-specific priors, achieving higher image quality at lower acceleration factors than classical CS for MRI and CT — at the cost of generalizability across protocols.',
      hints: [
        'L1-minimization uses a hand-designed sparsity prior; deep networks learn data-specific priors from training examples.',
        'A network trained on brain MRI data exploits the structure of brain images in ways that generic L1 minimization cannot.',
      ],
    },
    {
      id: 'q-sciml-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Sparse sensing for fluid dynamics using optimal sensor placement (e.g., SSPOC) selects sensor locations to:',
      options: [
        'Maximize the number of sensors deployed across the flow domain',
        'Identify a minimal set of physical measurement locations that allows accurate reconstruction of the full flow field from reduced basis representations',
        'Detect turbulent regions only, ignoring laminar parts of the flow',
        'Minimize the computational cost of the Navier-Stokes solver',
      ],
      correctAnswer: 1,
      explanation: 'SSPOC and similar methods combine POD/DMD reduced bases with compressed sensing to find sparse sensor locations that optimally reconstruct the full state — enabling real-time flow reconstruction from just a handful of pressure or velocity sensors in experimental settings.',
      hints: [
        'Think about placing a small number of flow sensors (pressure taps) to infer the entire flow field around an airfoil.',
        'The reconstruction uses a reduced basis (POD modes) to express the full field as a linear combination, recovered from sparse sensor observations.',
      ],
    },
  ],

  'scientific-benchmarks': [
    {
      id: 'q-sciml-kp29-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The MD17 dataset is a standard benchmark in scientific ML for evaluating:',
      options: [
        'Medical image segmentation across 17 organ types',
        'ML interatomic potentials on energy and force prediction for small organic molecules from MD trajectories',
        'Multi-document summarization of 17-sentence scientific abstracts',
        'Protein-ligand binding affinity prediction for drug discovery',
      ],
      correctAnswer: 1,
      explanation: 'MD17 contains molecular dynamics trajectories of 9 small organic molecules computed with DFT, providing energy and atomic force labels — the standard benchmark for evaluating accuracy and data efficiency of ML potentials (MAE in kcal/mol for energies, kcal/mol/Å for forces).',
      hints: [
        'MD stands for Molecular Dynamics — the dataset contains snapshots from DFT-level trajectories.',
        'The benchmark tests how well ML potentials predict energies and forces, which are required for running MD simulations.',
      ],
    },
    {
      id: 'q-sciml-kp29-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'WeatherBench is a standardized benchmark for evaluating ML-based weather forecasting models that provides baseline scores from numerical weather prediction (NWP) models for comparison.',
      correctAnswer: 'true',
      explanation: 'WeatherBench (and WeatherBench 2) provides ERA5-based evaluation protocols, standard metrics (RMSE, ACC at specific pressure levels), and operational NWP (IFS, GFS) baseline scores — enabling fair comparison of ML weather models on a common test set.',
      hints: [
        'Without a common benchmark, every ML weather paper would use different evaluation metrics and test periods.',
        'WeatherBench includes NWP baseline scores so ML models can directly compare against state-of-the-art operational forecasts.',
      ],
    },
    {
      id: 'q-sciml-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Open Catalyst Project (OCP) benchmark advances ML for scientific applications by:',
      options: [
        'Providing a dataset of catalytic reaction outcomes for pharmaceutical synthesis',
        'Releasing a large-scale DFT-computed dataset of catalyst-adsorbate systems with energy/force labels to develop ML potentials for electrocatalysis applications',
        'Benchmarking NLP models on scientific literature about catalysis',
        'Comparing the speed of different molecular dynamics software packages',
      ],
      correctAnswer: 1,
      explanation: 'OCP (Meta AI + CMU) provides >1 billion DFT energy/force calculations on catalyst surfaces with adsorbates, enabling ML potential development for applications like CO2 reduction and nitrogen fixation — critical for renewable energy and sustainable chemistry.',
      hints: [
        'OCP focuses on heterogeneous catalysis: molecules adsorbing onto material surfaces, relevant to electrochemical applications.',
        'The scale (1 billion+ DFT calculations) far exceeds what any individual group could compute — it is a community resource.',
      ],
    },
  ],

  'hybrid-ml-physics': [
    {
      id: 'q-sciml-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The key motivation for hybrid ML-physics models over purely data-driven ML models in science is:',
      options: [
        'Physics-based components make the model run faster on any hardware',
        'Physics constraints improve generalization, ensure physical consistency, and enable extrapolation to regimes not covered by training data',
        'Hybrid models require less training data than purely physics-based models',
        'Physics components automatically tune all model hyperparameters',
      ],
      correctAnswer: 1,
      explanation: 'Hybrid models leverage ML\'s flexibility for unknown or complex sub-processes while using physics equations as structural constraints — improving generalization beyond training data, guaranteeing conservation laws, and enabling interpretable decomposition of model components.',
      hints: [
        'Physics knowledge is a powerful inductive bias that reduces the space of possible models to physically plausible ones.',
        'In extrapolation, physics constraints prevent the model from making predictions that violate basic physical laws.',
      ],
    },
    {
      id: 'q-sciml-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The Universal Differential Equation (UDE) framework combines mechanistic ODE/PDE models with neural networks by replacing unknown or uncertain model terms with neural network components that are learned from data.',
      correctAnswer: 'true',
      explanation: 'UDEs (Rackauckas et al.) embed neural networks inside differential equations: known physics is written explicitly while unknown terms (reaction rates, constitutive relations) are replaced by neural networks, trained end-to-end using differentiable ODE solvers.',
      hints: [
        'If you know most of a physical model but not one specific term, you can replace just that term with a neural network.',
        'The neural network learns the missing physics from data, while the rest of the model remains interpretable.',
      ],
    },
    {
      id: 'q-sciml-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "gray-box" modeling approach in hybrid ML-physics differs from "black-box" ML in that:',
      options: [
        'Gray-box models are only applicable to linear physical systems',
        'Gray-box models incorporate known physical structure (conservation laws, reaction network topology) while using ML to learn unknown parameters or sub-models, preserving interpretability',
        'Gray-box models use gray-scale images as inputs rather than color images',
        'Gray-box models require no training data because physics fully specifies the model',
      ],
      correctAnswer: 1,
      explanation: 'Gray-box models sit between white-box (fully mechanistic, all parameters known) and black-box (pure ML): they impose known physical structure (e.g., network topology, conservation form) while learning unknown kinetic constants or closure terms from data.',
      hints: [
        'White box = fully known physics; black box = pure ML. Gray box = hybrid of both.',
        'In a reaction network, the topology (which species react with which) may be known while rate constants must be learned from data.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
