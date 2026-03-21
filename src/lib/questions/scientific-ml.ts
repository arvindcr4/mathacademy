import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  pinns: [
    {
      id: "q-sciml-kp1-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The total PINN loss for a PDE of the form N[u](x,t) = 0 with boundary condition B[u] = g is L = L_data + \\lambda_r\\cdotL_r + \\lambda_b\\cdotL_b. L_r is the physics residual loss defined as ___.",
      options: [
        "(1/N_r) \\Sigma |u_\\theta(x_i,t_i) − u_measured(x_i,t_i)|\\^2",
        "(1/N_r) \\Sigma |N[u_\\theta](x_i,t_i)|\\^2 summed over collocation points",
        "KL divergence between the predicted and true solution distributions",
        "(1/N_b) \\Sigma |\\partialu_\\theta/\\partialx − \\partialu/\\partialx|\\^2 at boundary points",
      ],
      correctAnswer: 1,
      explanation:
        "The physics residual loss L_r = (1/N_r) \\Sigma_{i=1}^{N_r} |N[u_\\theta](x_i,t_i)|\\^2 evaluates how much the neural network u_\\theta violates the governing PDE at collocation points sampled inside the domain. Automatic differentiation computes the required spatial and temporal derivatives of u_\\theta.",
      hints: [
        "N[u] is the PDE operator (e.g., \\partialu/\\partialt − ν\\partial\\^2u/\\partialx\\^2 for the heat equation). The residual is how far N[u_\\theta] is from zero.",
        "Collocation points are interior domain points where no labels are needed — only the PDE equation must be satisfied.",
      ],
    },
    {
      id: "q-sciml-kp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PINNs can solve both forward problems (simulating a known PDE) and inverse problems (inferring unknown parameters from observations) within the same framework.",
      correctAnswer: "True",
      explanation:
        "In the inverse setting, unknown PDE parameters (e.g., diffusivity ν in \\partialu/\\partialt = ν\\partial\\^2u/\\partialx\\^2) are treated as additional trainable variables. The same PINN loss L_r + L_data is minimised jointly over network weights and unknown parameters, with observed data pinning the solution.",
      hints: [
        "Forward: given ν, find u. Inverse: given some measurements of u, find ν. Both fit naturally into the same loss function.",
        "Unknown parameters appear inside N[u_\\theta; ν] — they are simply extra learnable scalars in the optimisation.",
      ],
    },
    {
      id: "q-sciml-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A well-known training difficulty with PINNs for stiff or multi-scale PDEs is gradient imbalance. Which weighting strategy is theoretically motivated by the Neural Tangent Kernel (NTK) analysis of PINNs?",
      options: [
        "Fixed equal weights \\lambda_r = \\lambda_b = 1 throughout training",
        "Adaptive weights that balance the NTK eigenvalues of each loss component, so learning speeds are equalised across boundary, residual, and data terms",
        "Randomly sampled weights from a uniform distribution each iteration",
        "Decaying weights that reduce all loss coefficients by 0.99 every epoch",
      ],
      correctAnswer: 1,
      explanation:
        "Wang et al. (2021) showed via NTK analysis that gradient imbalance arises when different PINN loss terms have vastly different NTK eigenvalue magnitudes. Their adaptive weighting scheme sets \\lambda_k \\propto max(NTK eigenvalues) / mean(NTK eigenvalues of loss k), equalising effective learning rates across loss terms.",
      hints: [
        "The NTK governs the convergence speed of each loss term. When one term dominates, others converge much more slowly.",
        "Adaptive weighting dynamically rescales each loss term so they all converge at similar rates.",
      ],
    },
  ],

  "neural-ode": [
    {
      id: "q-sciml-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Neural ODEs define hidden state dynamics as dh/dt = f_\\theta(h(t), t). The hidden state at time t\\_1 is obtained by ___.",
      options: [
        "h(t\\_1) = h(t\\_0) + f_\\theta(h(t\\_0), t\\_0) \\cdot (t\\_1 − t\\_0)  [Euler step]",
        "h(t\\_1) = ODESolve(f_\\theta, h(t\\_0), t\\_0, t\\_1)  [numerical ODE integration]",
        "h(t\\_1) = sigmoid(W\\cdoth(t\\_0) + b)",
        "h(t\\_1) = h(t\\_0) * exp(f_\\theta(t\\_1))",
      ],
      correctAnswer: 1,
      explanation:
        "The exact definition is h(t\\_1) = h(t\\_0) + \\int_{t\\_0}^{t\\_1} f_\\theta(h(t),t) dt, computed by a black-box ODE solver. This is equivalent to a ResNet with Euler steps in the limit of infinitely many layers, but Neural ODEs use adaptive step-size solvers for better accuracy.",
      hints: [
        "A ResNet layer computes h_{n+1} = h_n + f(h_n) — this is exactly one Euler step of the ODE dh/dt = f(h).",
        "Neural ODEs make this continuous: instead of discrete layers, the ODE solver integrates over a time interval.",
      ],
    },
    {
      id: "q-sciml-kp2-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The adjoint sensitivity method for Neural ODEs computes gradients by solving a reverse-time ODE for the adjoint a(t) = dL/dh(t). The adjoint satisfies ___.",
      options: [
        "da/dt = a(t)\\^T \\cdot \\partialf_\\theta/\\partialh(t)  [forward ODE for a]",
        "da/dt = −a(t)\\^T \\cdot \\partialf_\\theta/\\partialh(t)  [backward ODE, run in reverse time]",
        "da/dt = −\\partialL/\\partialh(t)  [gradient of loss]",
        "da/dt = f_\\theta(h(t), t)  [same as state ODE]",
      ],
      correctAnswer: 1,
      explanation:
        "The adjoint a(t) = dL/dh(t) satisfies da/dt = −a(t)\\^T (\\partialf_\\theta/\\partialh), integrated backwards from t\\_1 to t\\_0 starting from a(t\\_1) = dL/dh(t\\_1). Gradients w.r.t. \\theta are then \\int_{t\\_0}^{t\\_1} a(t)\\^T (\\partialf_\\theta/\\partial\\theta) dt, also computed in the same reverse pass. This gives O(1) memory cost.",
      hints: [
        "The adjoint ODE runs backward in time — the sign is negative. Compare to the state ODE dh/dt = +f_\\theta.",
        "The key benefit is that intermediate states are recomputed during the backward pass, avoiding storing them — O(1) memory vs O(N) for BPTT.",
      ],
    },
    {
      id: "q-sciml-kp2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Latent Neural ODEs are particularly well-suited for which type of real-world data?",
      options: [
        "Image datasets with fixed grid resolution",
        "Irregularly sampled time-series where observations occur at non-uniform time points",
        "Text corpora with fixed-length tokenization",
        "Point cloud data from 3D LiDAR sensors",
      ],
      correctAnswer: 1,
      explanation:
        "Latent Neural ODEs encode observed values into a latent state via an RNN encoder, then evolve the latent state continuously with an ODE — naturally handling irregular observation times that break standard RNN assumptions of uniform time steps.",
      hints: [
        "Standard RNNs assume a fixed time step between inputs — what happens when patient measurements occur at irregular intervals?",
        "The ODE provides a principled way to model continuous time, so any observation time can be queried.",
      ],
    },
  ],

  "operator-learning": [
    {
      id: "q-sciml-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Fourier Neural Operator (FNO) layer applies a linear transform in Fourier space. Given input v, the FNO layer computes ___.",
      options: [
        "\\sigma(W\\cdotv + b)  [standard linear layer with activation]",
        "\\sigma(F\\^{-1}(R \\cdot F(v)) + W\\cdotv)  [Fourier-space global conv + local linear, then activation]",
        "\\sigma(Conv2D(v, kernel))  [standard spatial convolution]",
        "\\sigma(Attention(v, v, v))  [self-attention layer]",
      ],
      correctAnswer: 1,
      explanation:
        "Each FNO layer computes \\sigma(F\\^{-1}(R\\cdotF\\_k(v)) + W\\cdotv), where F is the Fourier transform, R is a learnable complex weight tensor in Fourier space (truncated to the k lowest modes), W is a local linear transform, and \\sigma is an activation. The Fourier multiplication is equivalent to a global convolution in physical space.",
      hints: [
        "FNO truncates to k Fourier modes (the low-frequency part), which captures global structure while being resolution-independent.",
        "The local W\\cdotv term handles the high-frequency, local part of the transform that the truncated Fourier modes miss.",
      ],
    },
    {
      id: "q-sciml-kp3-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The Fourier Neural Operator (FNO) achieves resolution invariance by performing convolution operations in Fourier space, allowing it to be evaluated at any spatial resolution at inference time.",
      correctAnswer: "True",
      explanation:
        "FNO applies linear transforms in Fourier space (equivalent to global convolutions in physical space), then truncates to a fixed number of modes. Because the Fourier transform is resolution-independent, FNO trained at 64\\times64 can be evaluated at 128\\times128 without retraining.",
      hints: [
        "Fourier modes capture global patterns and are not tied to any particular spatial grid resolution.",
        "The fixed number of truncated modes k is the only resolution-dependent parameter — evaluation at finer grids simply uses more physical-space points.",
      ],
    },
    {
      id: "q-sciml-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DeepONet (Deep Operator Network) achieves operator learning by using:",
      options: [
        "A single encoder-decoder network applied to discretized input functions",
        "A branch network encoding the input function and a trunk network encoding the query point, whose outputs are combined via dot product",
        "Attention mechanisms over Fourier coefficients of the input function",
        "Recursive application of standard ResNet blocks to 1D input sequences",
      ],
      correctAnswer: 1,
      explanation:
        "DeepONet\'s branch net encodes the input function u at sensor points {u(x\\_1),...,u(xₘ)} \\to [b\\_1,...,bₚ]; its trunk net encodes the output query location y \\to [t\\_1,...,tₚ]; the operator output is G(u)(y) \\approx \\Sigma\\_i b\\_i\\cdott\\_i + bias. This is grounded in the universal approximation theorem for operators.",
      hints: [
        "Branch: what does the input function look like? Trunk: where do we want the output? They are combined by a dot product.",
        "The inner product \\Sigma b\\_it\\_i acts like a learned basis expansion of the output function.",
      ],
    },
  ],

  "data-driven-pde": [
    {
      id: "q-sciml-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Sparse Identification of Nonlinear Dynamics (SINDy) method discovers governing equations from data by:",
      options: [
        "Training a deep neural network to predict the next time step",
        "Using sparse regression to find the fewest terms from a library of candidate functions that best explain the observed dynamics",
        "Applying Fourier analysis to identify dominant frequency modes in time-series data",
        "Fitting a Gaussian process to the observed trajectory data",
      ],
      correctAnswer: 1,
      explanation:
        "SINDy constructs a library of candidate terms (polynomials, trig functions, etc.) and applies LASSO-type sparse regression to identify the minimal subset that explains dX/dt, yielding interpretable, parsimonious dynamical equations.",
      hints: [
        'SINDy stands for "Sparse Identification of Nonlinear Dynamics" — the word "sparse" is the key.',
        "Instead of black-box prediction, the goal is to recover the actual equation (e.g., dx/dt = ax + bx\\^2) from data.",
      ],
    },
    {
      id: "q-sciml-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Data-driven PDE solvers trained on simulation data from one physical regime can perfectly generalize to radically different parameter regimes without any additional training.",
      correctAnswer: "False",
      explanation:
        "Neural PDE solvers often exhibit poor generalization outside the training distribution — a model trained on low-Reynolds-number flows may fail at turbulent regimes. Active learning, meta-learning, and physics constraints help extend generalization.",
      hints: [
        "Think about extrapolation vs. interpolation — ML models generally interpolate within their training distribution but struggle to extrapolate far beyond it.",
        "Different physical regimes (e.g., laminar vs. turbulent flow) can have qualitatively different behaviors.",
      ],
    },
    {
      id: "q-sciml-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "curse of dimensionality" motivates ML-based PDE solvers because traditional numerical methods (FEM, FDM) suffer from:',
      options: [
        "Inability to handle nonlinear PDEs",
        "Computational cost that grows exponentially with the number of spatial dimensions, making high-dimensional PDEs intractable",
        "Requirement for analytical solutions to verify accuracy",
        "Inability to solve time-dependent PDEs",
      ],
      correctAnswer: 1,
      explanation:
        "Grid-based methods require discretizing each dimension; a 100-point grid in d dimensions has 100^d points — exponential in d. ML solvers (e.g., deep Galerkin, PINNs) scale polynomially in d by sampling, enabling solution of high-dimensional PDEs like Black-Scholes.",
      hints: [
        "For a 1D problem, a 100-point grid has 100 points. For a 10D problem, it has 100^10 — a number larger than atoms in the observable universe.",
        "Monte Carlo-type sampling in high dimensions avoids this exponential blowup.",
      ],
    },
  ],

  "turbulence-ml": [
    {
      id: "q-sciml-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Large Eddy Simulation (LES) requires a subgrid-scale (SGS) model because:",
      options: [
        "The Navier-Stokes equations break down at small scales",
        "Eddies smaller than the computational grid cannot be directly resolved and their effect on larger scales must be modeled",
        "LES only simulates 2D flows and ignores the third dimension",
        "Turbulence is fundamentally a quantum mechanical phenomenon",
      ],
      correctAnswer: 1,
      explanation:
        "LES resolves large energy-carrying eddies but filters out small scales; the SGS model accounts for energy transfer from resolved to subgrid scales — ML-learned SGS models aim to improve accuracy over classical Smagorinsky-type closures.",
      hints: [
        'The word "subgrid" tells you the model is needed for what happens below the grid resolution.',
        "Small eddies still affect large-scale flow; you need to model their aggregate effect without resolving them directly.",
      ],
    },
    {
      id: "q-sciml-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ML-based turbulence closure models that are trained on DNS data can guarantee physical realizability (e.g., non-negative turbulent kinetic energy) without explicit constraints.",
      correctAnswer: "False",
      explanation:
        "Pure data-driven closure models can produce unphysical predictions (negative TKE, violated Galilean invariance) without hard physical constraints; embedding symmetries and realizability conditions into the model architecture or loss function is essential.",
      hints: [
        "A neural network trained by minimizing MSE has no built-in knowledge of physics constraints.",
        "Physical realizability conditions (positive definiteness, invariance) must be explicitly enforced.",
      ],
    },
    {
      id: "q-sciml-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the "a posteriori" testing challenge for ML turbulence models?',
      options: [
        "Testing the model on data from a different computer than the one used for training",
        "Evaluating the model embedded inside a full CFD simulation (coupled) rather than just in isolation on validation data (a priori), where errors can accumulate and cause instability",
        "Testing the model after the simulation has already converged to its final state",
        "Evaluating model performance on turbulent flows from a different fluid (water vs. air)",
      ],
      correctAnswer: 1,
      explanation:
        "A priori testing evaluates the SGS model against DNS data independently; a posteriori testing deploys it inside a live LES solver. Error accumulation over time steps can cause divergence even when a priori errors are low — a critical gap many ML models fail to bridge.",
      hints: [
        'The word "a posteriori" means testing in the full coupled simulation.',
        "Small errors per step can compound into large errors or instabilities over thousands of time steps.",
      ],
    },
  ],

  "molecular-dynamics-ml": [
    {
      id: "q-sciml-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Machine Learning Potentials (MLPs) in molecular dynamics are designed to:",
      options: [
        "Replace molecular dynamics simulation with a purely statistical model",
        "Learn interatomic potential energy surfaces from quantum chemistry calculations, enabling fast MD simulations with near-DFT accuracy",
        "Predict 3D protein structures from amino acid sequences",
        "Generate new molecular structures de novo using generative models",
      ],
      correctAnswer: 1,
      explanation:
        "MLPs (e.g., Behler-Parrinello networks, ANI, MACE) fit potential energy surfaces from DFT reference data, enabling force field computations 1000\\times faster than DFT while retaining quantum-level accuracy for dynamics simulations.",
      hints: [
        "Classical force fields are fast but inaccurate; DFT is accurate but slow — MLPs aim to be both fast and accurate.",
        "The ML model learns from quantum chemistry (DFT) calculations and then replaces those expensive calculations during simulation.",
      ],
    },
    {
      id: "q-sciml-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Behler-Parrinello symmetry functions ensure that ML potentials are invariant to translation, rotation, and permutation of identical atoms.",
      correctAnswer: "True",
      explanation:
        "Behler-Parrinello atom-centered symmetry functions (radial and angular) encode local chemical environments in a way that is invariant to rigid-body transformations and atom index permutation — physical symmetries that any valid potential energy surface must satisfy.",
      hints: [
        "The potential energy of a molecule cannot change if you rotate or translate it in space.",
        "Swapping two identical atoms (e.g., two carbon atoms) must give the same energy.",
      ],
    },
    {
      id: "q-sciml-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Active learning is commonly used in the development of ML potentials because:",
      options: [
        "DFT calculations are so cheap that random sampling is the preferred strategy",
        "The potential energy surface is high-dimensional and rare but important configurations (transition states, defects) are poorly sampled by simple MD trajectories alone",
        "Active learning eliminates the need for any reference quantum chemistry calculations",
        "ML potentials can only learn from data generated by force fields, not quantum chemistry",
      ],
      correctAnswer: 1,
      explanation:
        "Query-by-committee and uncertainty-based active learning identify configurations where the ML potential is uncertain, triggering DFT calculations only for the most informative structures — efficiently covering chemical space without brute-force DFT sampling.",
      hints: [
        "Random sampling of MD trajectories may miss rare but chemically important configurations.",
        "Active learning focuses expensive DFT calculations on the configurations that are most informative for the model.",
      ],
    },
  ],

  "materials-discovery": [
    {
      id: "q-sciml-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Materials Project and AFLOW databases are used in materials discovery ML primarily as:",
      options: [
        "Sources of experimental synthesis procedures for new materials",
        "Large repositories of DFT-computed material properties used as training data for property prediction models",
        "Databases of clinical trial results for biomaterials",
        "Collections of crystal structure images for computer vision models",
      ],
      correctAnswer: 1,
      explanation:
        "Materials Project and AFLOW contain millions of DFT-computed properties (formation energy, bandgap, elastic constants) for known and hypothetical crystal structures, serving as foundational training datasets for ML materials property predictors.",
      hints: [
        "These databases contain computed (not experimental) material properties at scale, enabling data-driven ML.",
        "DFT calculations are expensive but automated; running them on thousands of structures creates a large labeled dataset.",
      ],
    },
    {
      id: "q-sciml-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Google DeepMind\'s GNoME model discovered millions of new stable crystal structures by combining GNN-based property prediction with high-throughput DFT validation.",
      correctAnswer: "True",
      explanation:
        "GNoME (Graph Networks for Materials Exploration) used a GNN trained on existing crystal data to predict stable structures, then validated ~380,000 new stable materials with DFT — a 45-fold increase in known stable inorganic crystals.",
      hints: [
        "GNoME uses graph neural networks because crystal structures naturally map to graphs (atoms as nodes, bonds/proximity as edges).",
        "The ML model proposes candidates; DFT then validates which ones are truly stable.",
      ],
    },
    {
      id: "q-sciml-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Inverse materials design with ML differs from forward property prediction in that it:",
      options: [
        "Predicts material properties given a known crystal structure",
        "Generates new crystal structures or compositions that are predicted to have a target set of desired properties",
        "Validates DFT calculations against experimental measurements",
        "Classifies materials into existing categories based on their electronic structure",
      ],
      correctAnswer: 1,
      explanation:
        "Inverse design starts from desired properties (e.g., bandgap = 1.5 eV, thermodynamically stable) and searches or generates structures that satisfy these targets — the reverse of forward prediction — using generative models or Bayesian optimization.",
      hints: [
        "Forward: given a structure, predict properties. Inverse: given desired properties, find the structure.",
        'This is like asking "design a molecule that cures disease X" vs. "predict whether this molecule cures disease X."',
      ],
    },
  ],

  "scientific-foundation-models": [
    {
      id: "q-sciml-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "ESM-2 (Evolutionary Scale Modeling) is a foundation model for which scientific domain?",
      options: [
        "Climate and weather prediction",
        "Protein sequences — it learns amino acid representations from hundreds of millions of protein sequences via masked language modeling",
        "Particle physics event classification",
        "Quantum circuit simulation",
      ],
      correctAnswer: 1,
      explanation:
        "ESM-2 is Meta AI\'s protein language model, pre-trained on 250 million protein sequences; it learns rich residue-level representations capturing evolutionary, structural, and functional information without any 3D structure supervision.",
      hints: [
        'ESM stands for "Evolutionary Scale Modeling" — evolution and scale refer to evolutionary biology and the scale of protein sequence data.',
        "It uses the same masked language modeling objective as BERT, but applied to amino acid sequences.",
      ],
    },
    {
      id: "q-sciml-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Scientific foundation models like ESM-2 demonstrate that self-supervised pre-training on large biological sequence databases can learn biologically meaningful representations without explicit structural or functional labels.",
      correctAnswer: "True",
      explanation:
        "ESM-2's representations encode secondary structure, contact maps, and functional sites even though training used only sequence prediction — evolutionary co-variation in sequences encodes 3D structural constraints implicitly captured by the language model.",
      hints: [
        "The model never sees protein 3D structures during pre-training, yet its representations correlate with structural features.",
        "Co-evolutionary signals in sequences (correlated mutations at spatially proximal positions) encode 3D contacts.",
      ],
    },
    {
      id: "q-sciml-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The key challenge in building general scientific foundation models (across physics, chemistry, biology) compared to NLP foundation models is:",
      options: [
        "Scientific data is always tabular and cannot benefit from transformer architectures",
        "Scientific data spans diverse modalities, symmetries, and physical constraints that require domain-specific inductive biases not present in standard transformer architectures",
        "Scientific problems have solutions that are always known analytically",
        "Scientific datasets are too small to pre-train any model larger than 1 million parameters",
      ],
      correctAnswer: 1,
      explanation:
        "Scientific foundation models must respect physical symmetries (rotational, permutation, gauge invariance), handle heterogeneous modalities (sequences, graphs, fields, spectra), and encode domain constraints — requiring bespoke architectures beyond standard text transformers.",
      hints: [
        "Text is discrete tokens with positional order; scientific data includes 3D geometries, spectra, graphs — each with domain-specific structure.",
        "A protein model must be rotation-invariant; a climate model must respect physical conservation laws — generic transformers do not.",
      ],
    },
  ],

  "uncertainty-quantification": [
    {
      id: "q-sciml-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In scientific ML, the distinction between aleatoric and epistemic uncertainty is important because:",
      options: [
        "Aleatoric uncertainty can be reduced by collecting more data, while epistemic uncertainty cannot",
        "Epistemic uncertainty (model ignorance) can be reduced with more data, while aleatoric uncertainty (irreducible noise) cannot",
        "Both types of uncertainty can be eliminated by training a larger neural network",
        "Aleatoric uncertainty only applies to classification tasks, not regression",
      ],
      correctAnswer: 1,
      explanation:
        "Epistemic uncertainty reflects model ignorance in regions of sparse training data — more data reduces it. Aleatoric uncertainty reflects inherent measurement noise or stochasticity — it is irreducible regardless of data volume.",
      hints: [
        "Think about measuring the length of an object with a ruler vs. the exact position of a quantum particle.",
        '"Epistemic" comes from the Greek for knowledge — it is about what we do not know yet, which can improve.',
      ],
    },
    {
      id: "q-sciml-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deep ensembles — training multiple neural networks with different random seeds — provide reliable estimates of predictive uncertainty without requiring Bayesian inference.",
      correctAnswer: "True",
      explanation:
        "Deep ensembles have been shown empirically to produce well-calibrated uncertainty estimates, outperforming many approximate Bayesian methods on out-of-distribution detection, despite being a simple, non-Bayesian approach.",
      hints: [
        "When multiple independently trained models disagree on a prediction, that disagreement signals high uncertainty.",
        "Ensembles are non-Bayesian but empirically produce better uncertainty estimates than many approximate Bayesian methods.",
      ],
    },
    {
      id: "q-sciml-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Conformal prediction in scientific ML is valued because it provides:",
      options: [
        "Exact Bayesian posteriors over model parameters",
        "Distribution-free, finite-sample prediction intervals with guaranteed coverage probability without strong distributional assumptions",
        "A method to train models faster using conformal loss functions",
        "Exact solutions to PDEs from neural network predictions",
      ],
      correctAnswer: 1,
      explanation:
        "Conformal prediction wraps any ML model to produce prediction intervals with guaranteed marginal coverage (e.g., 90% of true values fall inside) under only the mild assumption of exchangeable data — no parametric model assumptions required.",
      hints: [
        "Most uncertainty methods require distributional assumptions; conformal prediction does not.",
        "The coverage guarantee means that if you say 90% intervals, exactly 90% of intervals will contain the true value on average.",
      ],
    },
  ],

  "symbolic-regression": [
    {
      id: "q-sciml-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The goal of symbolic regression is to:",
      options: [
        "Convert neural network weights into symbolic mathematical expressions",
        "Search for a mathematical expression (formula) from a predefined set of operators that best fits observed data",
        "Classify mathematical symbols in handwritten equations using computer vision",
        "Prove mathematical theorems automatically using formal verification",
      ],
      correctAnswer: 1,
      explanation:
        "Symbolic regression discovers explicit mathematical formulas (e.g., F = ma, E = mc\\^2) from data by searching over combinations of mathematical operators and constants — unlike neural networks, the output is an interpretable equation.",
      hints: [
        "The output is not a model with millions of weights — it is a human-readable mathematical equation.",
        "Think about Kepler discovering the ellipse equation for planetary orbits from data — symbolic regression automates this process.",
      ],
    },
    {
      id: "q-sciml-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Genetic programming is a classical approach to symbolic regression that evolves mathematical expression trees through selection, crossover, and mutation operations.",
      correctAnswer: "True",
      explanation:
        "Genetic programming represents equations as tree structures (operators as internal nodes, variables/constants as leaves) and evolves populations of trees using evolutionary operators — DEAP and PySR use this paradigm, often with physics-informed constraints.",
      hints: [
        "Genetic algorithms use principles from biological evolution — selection of the fittest, crossover of two parents, random mutation.",
        "Mathematical expressions can be represented as trees: (+, x, y) represents x+y as a tree with + at the root.",
      ],
    },
    {
      id: "q-sciml-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Transformer-based symbolic regression methods (e.g., NeSymReS, SNIP) differ from genetic programming by:",
      options: [
        "Generating only linear regression equations without nonlinear terms",
        "Using a pre-trained transformer that generates equation skeletons autoregressively, amortizing the search cost across many problems",
        "Requiring analytical gradients of the target equation to train",
        "Operating exclusively on integer-valued datasets",
      ],
      correctAnswer: 1,
      explanation:
        "Transformer-based methods train a sequence model on a large corpus of (dataset, equation) pairs; at inference, the transformer generates an equation for a new dataset in one forward pass — amortized inference avoids the expensive per-problem evolutionary search.",
      hints: [
        "Genetic programming searches from scratch for each new dataset; transformers amortize this cost across training.",
        '"Amortized inference" means the expensive computation happens during training, making inference fast.',
      ],
    },
  ],

  "weather-forecasting-ml": [
    {
      id: "q-sciml-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Pangu-Weather and GraphCast represent a new class of ML weather forecasting models that are notable for:",
      options: [
        "Generating weather forecasts from raw satellite imagery without any prior model output",
        "Matching or exceeding the accuracy of operational numerical weather prediction (NWP) models like ECMWF\'s IFS at a fraction of the inference time",
        "Forecasting weather only at a single geographic location without spatial modeling",
        "Replacing all physical parameterizations with reinforcement learning agents",
      ],
      correctAnswer: 1,
      explanation:
        "Pangu-Weather (Huawei) and GraphCast (DeepMind) achieve competitive or superior 10-day forecast accuracy compared to ECMWF IFS, but run inference in seconds rather than hours on specialized hardware.",
      hints: [
        "The key value proposition is speed — ECMWF\'s ensemble forecasts take significant compute time; ML models run in seconds.",
        "These models are trained on ERA5 reanalysis data and evaluated against operational NWP benchmarks.",
      ],
    },
    {
      id: "q-sciml-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "FourCastNet uses a Fourier-based vision transformer to model global atmospheric dynamics on a latitude-longitude grid.",
      correctAnswer: "True",
      explanation:
        "FourCastNet (NVIDIA) uses an Adaptive Fourier Neural Operator as its core layer, operating on the spherical grid of atmospheric variables (temperature, wind, humidity) at multiple pressure levels for short-to-medium range weather prediction.",
      hints: [
        'FourCastNet\'s name contains "Fourier" — its architecture uses Fourier-based operations for global spatial modeling.',
        "It processes gridded atmospheric data that naturally lives on a spherical (latitude-longitude) domain.",
      ],
    },
    {
      id: "q-sciml-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key limitation of current ML weather forecasting models compared to physics-based NWP is their handling of:",
      options: [
        "Temperature prediction, which requires quantum mechanical calculations",
        "Rare extreme events (hurricanes, flash floods) where training data is sparse, and physical consistency across ensemble members",
        "Wind speed at standard pressure levels, which cannot be represented on a grid",
        "Data assimilation from new observational sources like GPS radio occultation",
      ],
      correctAnswer: 1,
      explanation:
        "ML models trained primarily on common weather patterns may underperform on rare extremes (limited training examples), and unlike physics-based ensembles, they do not guarantee atmospheric energy conservation or physical consistency between ensemble members.",
      hints: [
        "Machine learning extrapolates poorly to rare events that appear infrequently in training data.",
        "Physical NWP models satisfy conservation laws by construction; ML models learn statistical patterns that may violate them at the extremes.",
      ],
    },
  ],

  "cosmology-ml": [
    {
      id: "q-sciml-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Machine learning is used in gravitational wave astronomy (LIGO/Virgo) primarily to:",
      options: [
        "Build the interferometer hardware that detects gravitational waves",
        "Rapidly classify detector noise, identify signal candidates, and estimate source parameters faster than matched filtering alone",
        "Replace the general relativistic equations used to model binary mergers",
        "Generate gravitational wave training data using classical simulations",
      ],
      correctAnswer: 1,
      explanation:
        "ML models (CNNs, Transformers) accelerate gravitational wave searches: classifying noise glitches, distinguishing real signals from artifacts, and performing rapid parameter estimation — complementing traditional matched-filter pipelines.",
      hints: [
        "LIGO data is dominated by noise; ML helps quickly classify whether a detected signal is astrophysical or instrumental.",
        "Bayesian parameter estimation (masses, spins, sky location) with MCMC takes days; ML surrogates run in seconds.",
      ],
    },
    {
      id: "q-sciml-kp12-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Neural networks have been used to emulate cosmological N-body simulations, enabling rapid generation of large-scale structure realizations without running expensive particle simulations.",
      correctAnswer: "True",
      explanation:
        "Emulators like CAMELS and EuclidEmulator train neural networks on N-body simulation outputs; given cosmological parameters, they predict power spectra or density fields in milliseconds vs. hours for a full N-body run — enabling MCMC posterior sampling.",
      hints: [
        "N-body simulations of large-scale structure require supercomputers and hours; an emulator provides the same output almost instantly.",
        "The emulator learns the mapping from cosmological parameters to observable statistics.",
      ],
    },
    {
      id: "q-sciml-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Simulation-based inference (SBI) / likelihood-free inference is used in cosmology because:",
      options: [
        "The likelihood function for cosmological observables can always be written in closed form",
        "The likelihood of observing data given cosmological parameters is often intractable, but forward simulations are possible — SBI methods learn the posterior directly from simulations",
        "MCMC methods cannot be applied to cosmological datasets of any size",
        "Physical cosmological models have no free parameters to infer",
      ],
      correctAnswer: 1,
      explanation:
        "Cosmological likelihoods for complex statistics (e.g., higher-order statistics, galaxy morphologies) are analytically intractable; SBI methods (SNPE, SNLE, SNRE) train neural estimators on simulation pairs (\\theta, x) to approximate the posterior directly.",
      hints: [
        "Traditional Bayesian inference requires evaluating the likelihood — what if you cannot write it down?",
        "Forward simulations are feasible (you can simulate the universe given cosmological parameters), even if the inverse probability is not analytically tractable.",
      ],
    },
  ],

  "particle-physics-ml": [
    {
      id: "q-sciml-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In LHC particle physics, jet tagging with ML refers to:",
      options: [
        "Annotating particle tracks in cloud chamber photographs",
        "Classifying jets (collimated sprays of hadrons) by their originating parton (quark flavor, gluon, W/Z/Higgs boson, top quark)",
        "Tracking jet airplane traffic near the CERN facility",
        "Tagging dataset files with metadata in the CERN data management system",
      ],
      correctAnswer: 1,
      explanation:
        "Jet tagging classifies the origin of hadronic jets — whether they come from light quarks, gluons, b-quarks, or boosted bosons — enabling searches for new physics by distinguishing signal jets from QCD background with high purity.",
      hints: [
        "Jets are formed when quarks or gluons from proton collisions fragment into sprays of detectable particles.",
        'Tagging the "flavor" of a jet helps physicists identify whether a Higgs boson decayed into that jet.',
      ],
    },
    {
      id: "q-sciml-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Graph Neural Networks are particularly well-suited for particle physics event reconstruction because collision events naturally form variable-size sets of particle tracks and calorimeter clusters with pairwise interaction structure.",
      correctAnswer: "True",
      explanation:
        "Collision events have variable numbers of particles with complex pairwise interactions (e.g., proximity in detector space, shared vertex) — GNNs operating on particle sets or k-NN graphs capture these interactions naturally, outperforming architectures that require fixed-size inputs.",
      hints: [
        "Each collision event produces a different number of particle tracks — a fixed-size input representation is awkward.",
        "Particles interact through proximity and shared production vertices, which are naturally modeled as edges in a graph.",
      ],
    },
    {
      id: "q-sciml-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The optimal transport-based Earth Mover\'s Distance (EMD) is used as a jet distance metric in particle physics ML because:",
      options: [
        "It is computationally free to evaluate for large particle multiplicity",
        "It provides a physically meaningful, IRC-safe (infrared and collinear safe) measure of the geometric energy flow difference between jets",
        "It is the only metric that satisfies the triangle inequality for jet comparisons",
        "It is required by the LHC trigger system for real-time jet selection",
      ],
      correctAnswer: 1,
      explanation:
        "The adjoint ODE satisfies da/dt = −a(t)\\^T (\\partialf_\\theta/\\partialh), integrated backwards from t\\_1 to t\\_0 starting from a(t\\_1) = dL/dh(t\\_1). Gradients w.r.t. \\theta are then \\int_{t\\_0}^{t\\_1} a(t)\\^T (\\partialf_\\theta/\\partial\\theta) dt, also computed in the same reverse pass. This gives O(1) memory cost.",
      hints: [
        "The adjoint ODE runs backward in time — the sign is negative. Compare to the state ODE dh/dt = +f_\\theta.",
        "The key benefit is that intermediate states are recomputed during the backward pass, avoiding storing them — O(1) memory vs O(N) for BPTT.",
      ],
    },
  ],

  "quantum-chemistry-ml": [
    {
      id: "q-sciml-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SchNet is a pioneering deep learning model for quantum chemistry that processes molecular structures using:",
      options: [
        "SMILES string tokenization with a recurrent neural network",
        "Continuous-filter convolutional layers on atom-centered 3D point clouds, with interactions based on interatomic distances",
        "Fourier transforms of molecular electron density grids",
        "Graph attention over molecular fingerprints",
      ],
      correctAnswer: 1,
      explanation:
        "SchNet uses atom-centered representations and continuous-filter convolutions that depend on interatomic distances, making it invariant to translation and rotation while predicting energies, forces, and other quantum chemical properties from 3D atomic coordinates.",
      hints: [
        "SchNet processes 3D atomic coordinates — the key input is the position of each atom in space.",
        "The interactions in SchNet depend on the distance between atoms, encoding the physics of interatomic potentials.",
      ],
    },
    {
      id: "q-sciml-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DimeNet improves upon SchNet by incorporating directional information (bond angles) in addition to interatomic distances, enabling more accurate property prediction.",
      correctAnswer: "True",
      explanation:
        "DimeNet uses directional message passing that incorporates the angle between bonds — not just radial distances — capturing angular geometry of atomic environments, which is important for properties like molecular dipole moments and torsion barriers.",
      hints: [
        "SchNet only uses distances (radial); DimeNet adds angles (directional). More geometric information means better accuracy.",
        "Bond angles determine molecular geometry: water\'s 104.5° angle vs. CO\\_2's 180° linear structure have very different properties.",
      ],
    },
    {
      id: "q-sciml-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Neural network approaches to solving the electronic Schrödinger equation (e.g., FermiNet, PauliNet) achieve high accuracy by:",
      options: [
        "Training on density functional theory (DFT) outputs and learning a correction function",
        "Using neural networks as variational ansätze for the many-electron wavefunction that explicitly encode fermionic antisymmetry (Pauli exclusion principle)",
        "Replacing Hamiltonians with random matrix models for computational efficiency",
        "Using graph neural networks on crystal unit cells to predict ground state energies",
      ],
      correctAnswer: 1,
      explanation:
        "FermiNet and PauliNet parameterize the many-electron wavefunction as a neural network that is antisymmetric by construction (via determinants of learned orbitals), enabling variational Monte Carlo optimization that approaches chemical accuracy for small molecules.",
      hints: [
        "The Pauli exclusion principle requires the wavefunction to be antisymmetric under exchange of any two electrons.",
        "Building this antisymmetry into the neural network architecture (via a determinant) makes the variational ansatz physically valid.",
      ],
    },
  ],

  "fluid-simulation-ml": [
    {
      id: "q-sciml-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In ML-accelerated CFD, surrogate models are used to:",
      options: [
        "Generate training data for turbulence models using random noise",
        "Replace or accelerate expensive high-fidelity CFD simulations with fast approximate predictions for design optimization or uncertainty quantification",
        "Visualize CFD results in augmented reality",
        "Automatically mesh complex geometries without human input",
      ],
      correctAnswer: 1,
      explanation:
        "CFD surrogates (neural networks, Gaussian processes) learn the mapping from design parameters to quantities of interest (drag, lift, pressure distribution) from a training set of CFD runs, enabling rapid evaluation of thousands of design configurations during optimization.",
      hints: [
        "A single CFD simulation of an aircraft wing might take hours; a surrogate can predict the same output in milliseconds.",
        "Surrogates trade some accuracy for speed — acceptable for early-stage design exploration.",
      ],
    },
    {
      id: "q-sciml-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Graph Network Simulators (GNS) can simulate fluid dynamics by treating fluid particles or mesh nodes as graph nodes and learning interaction rules via message passing.",
      correctAnswer: "True",
      explanation:
        "GNS (DeepMind) treats simulation particles as graph nodes connected by proximity edges; it learns position updates via message passing GNNs, enabling simulation of fluids, granular materials, and deformable bodies that generalize to unseen geometries.",
      hints: [
        "Fluid simulation involves many interacting particles — each affects its neighbors, which is exactly what graph message passing models.",
        "GNS was shown to generalize to simulation geometries not seen during training.",
      ],
    },
    {
      id: "q-sciml-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Reynolds-Averaged Navier-Stokes (RANS) closure problem that ML aims to address involves:",
      options: [
        "The inability of Navier-Stokes equations to model compressible flows",
        "The unknown Reynolds stress tensor, which must be modeled as a function of mean flow quantities to close the time-averaged equations",
        "The nonlinearity of the pressure-velocity coupling in incompressible flows",
        "The computational cost of solving the continuity equation on unstructured meshes",
      ],
      correctAnswer: 1,
      explanation:
        "Time-averaging the Navier-Stokes equations introduces the Reynolds stress tensor (from nonlinear velocity fluctuation correlations) that cannot be expressed in terms of mean flow quantities without an additional closure model — ML-based closures learn these mappings from DNS data.",
      hints: [
        "Time-averaging introduces extra unknowns (turbulent stress terms) that need additional equations to close the system.",
        "The Boussinesq hypothesis provides a simple closure; ML methods learn more complex, accurate closures from DNS data.",
      ],
    },
  ],

  "topology-optimization": [
    {
      id: "q-sciml-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Topology optimization finds the optimal material distribution within a design domain by:",
      options: [
        "Manually testing different geometric shapes and selecting the best performing one",
        "Iteratively redistributing material to minimize an objective (e.g., structural compliance) subject to a volume fraction constraint using sensitivity analysis",
        "Applying Fourier analysis to decompose the structure into frequency components",
        "Using molecular dynamics to find the lowest-energy atomic configuration",
      ],
      correctAnswer: 1,
      explanation:
        "Topology optimization (SIMP method) assigns a density variable to each finite element and iteratively updates densities using compliance sensitivities computed from FEM, producing organic-looking structures that maximize stiffness for minimum material use.",
      hints: [
        "Think about how aircraft brackets or bike frames are redesigned to look organic — that\'s topology optimization at work.",
        "The algorithm decides where material should and should not be placed to achieve maximum performance.",
      ],
    },
    {
      id: "q-sciml-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Neural network-based topology optimization methods can amortize the FEM solve cost by learning to predict optimal material distributions directly from load/boundary conditions, enabling real-time design exploration.",
      correctAnswer: "True",
      explanation:
        "Approaches like TopNet and TopoGAN train neural networks on pairs of (boundary conditions, optimal topology) from classical TO runs; at inference, the network predicts near-optimal topologies without iterative FEM solves — enabling interactive design tools.",
      hints: [
        "Classical TO runs many FEM simulations iteratively; a trained neural network skips all of them at inference time.",
        "The training cost is a one-time investment; subsequent predictions are essentially free.",
      ],
    },
    {
      id: "q-sciml-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Differentiable rendering combined with topology optimization allows:",
      options: [
        "Optimizing 3D printed structures based purely on visual appearance criteria",
        "End-to-end gradient-based optimization of structural geometry for objectives defined on rendered images or point clouds, bridging design and manufacturing",
        "Rendering photorealistic images of optimized structures for presentation purposes only",
        "Automatically converting CAD models to finite element meshes",
      ],
      correctAnswer: 1,
      explanation:
        "Differentiable rendering enables gradients to flow from image-space losses (appearance, aerodynamic drag estimated from renders) back through the rendering process to 3D geometry parameters, enabling joint structural and aesthetic optimization via gradient descent.",
      hints: [
        "Differentiable rendering makes the rendering process differentiable — meaning you can backpropagate through it.",
        "If you can compute gradients through rendering, you can optimize 3D shapes for criteria defined in image space.",
      ],
    },
  ],

  "inverse-problems": [
    {
      id: "q-sciml-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "An inverse problem in science involves:",
      options: [
        "Solving for the output of a physical model given known parameters (forward problem)",
        "Inferring unknown model parameters or source distributions from observed measurements",
        "Proving the mathematical uniqueness of a differential equation solution",
        "Reversing the order of operations in a computational pipeline",
      ],
      correctAnswer: 1,
      explanation:
        "Inverse problems infer causes from effects: given measurements (e.g., seismic waves, MRI signals, detector counts), recover the source (subsurface structure, tissue properties, emission distribution) — inherently ill-posed and requiring regularization.",
      hints: [
        "The forward problem: given the underground structure, predict seismic wave patterns. The inverse: given seismic waves, recover the underground structure.",
        "Inverse problems are often ill-posed — many different parameter sets can produce similar observations.",
      ],
    },
    {
      id: "q-sciml-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Score-based diffusion models have been applied to inverse problems by using the learned prior score to regularize the likelihood gradient, enabling posterior sampling without retraining for each new measurement operator.",
      correctAnswer: "True",
      explanation:
        "Methods like DPS and DDRM use the pre-trained diffusion score as an implicit prior; at inference, they combine the score with the measurement likelihood gradient to sample from the posterior p(x|y), enabling zero-shot adaptation to new inverse problems.",
      hints: [
        "The diffusion model provides a learned prior over natural images or signals; the measurement operator defines the likelihood.",
        '"Zero-shot" means the same pre-trained model can solve different inverse problems (deblurring, inpainting, CT) without retraining.',
      ],
    },
    {
      id: "q-sciml-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In seismic full waveform inversion (FWI), deep learning-based approaches offer advantages because:",
      options: [
        "Neural networks can directly measure seismic wave propagation in real time",
        "They can learn physics-constrained priors over subsurface velocity models, reducing ill-posedness and improving convergence over purely data-driven regularization",
        "FWI requires no gradient computation, which neural networks provide automatically",
        "Neural networks can perfectly recover subsurface structures from a single seismic shot",
      ],
      correctAnswer: 1,
      explanation:
        "Deep learning provides regularization through learned priors over geologically plausible velocity models; combining learned priors with physics-based wave propagation (differentiable forward modeling) constrains the ill-posed FWI optimization to physically realistic solutions.",
      hints: [
        "FWI is ill-posed: many subsurface models can produce similar seismic waveforms — regularization is essential.",
        "A learned prior from real geological models can constrain the search to plausible subsurface structures.",
      ],
    },
  ],

  "multi-scale-modeling": [
    {
      id: "q-sciml-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The challenge of multi-scale modeling in science arises because:",
      options: [
        "Physical phenomena occur only at the atomic scale and cannot be modeled at larger scales",
        "Relevant physics spans many orders of magnitude in length and time scales, making direct simulation of all scales simultaneously computationally infeasible",
        "Different scales require different programming languages for their simulations",
        "Turbulence is fundamentally a quantum mechanical phenomenon",
      ],
      correctAnswer: 1,
      explanation:
        "Turbulent combustion, for example, spans from molecular (nm, fs) to engineering (m, s) scales — 9 orders of magnitude each — making full-scale direct simulation impossible. ML bridges scales by learning effective coarse-grained models from fine-scale simulations.",
      hints: [
        "Think about placing a small number of flow sensors (pressure taps) to infer the entire flow field around an airfoil.",
        "The reconstruction uses a reduced basis (POD modes) to express the full field as a linear combination, recovered from sparse sensor observations.",
      ],
    },
    {
      id: "q-sciml-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Homogenization theory provides a mathematical foundation for deriving effective coarse-grained equations from fine-scale physics, and ML can learn these effective properties directly from micro-scale simulations.",
      correctAnswer: "True",
      explanation:
        "Computational homogenization uses micro-scale simulations (RVE analysis) to compute effective material properties (stiffness tensor, diffusivity); ML surrogates learn these property maps from fine-scale data, enabling rapid macro-scale simulations with micro-structure awareness.",
      hints: [
        "Homogenization replaces a heterogeneous microstructure with effective properties of a uniform material.",
        "ML can learn the mapping from microstructure description to effective properties much faster than running each RVE simulation.",
      ],
    },
    {
      id: "q-sciml-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In concurrent multi-scale simulation (FE\\^2), ML surrogates improve computational tractability by:",
      options: [
        "Replacing the macro-scale finite element solver with a neural network",
        "Learning the microscale constitutive response (stress-strain mapping from RVE simulations) to replace expensive online micro-scale RVE computations at each macro integration point",
        "Eliminating the need for any micro-scale simulation data",
        "Using reinforcement learning to adaptively refine the macro-scale mesh",
      ],
      correctAnswer: 1,
      explanation:
        "FE\\^2 requires a micro-scale RVE solve at every macro integration point and time step — prohibitively expensive. ML constitutive models (trained on offline RVE data) replace these online micro-solves, achieving speedups of 10\\^3-10⁶\\times while retaining micro-structure fidelity.",
      hints: [
        "FE\\^2 literally means two nested finite element solves — one at macro scale, one at micro scale for each integration point.",
        "The ML surrogate learns what the micro-scale RVE would output for any given strain state, without re-running the simulation.",
      ],
    },
  ],

  "active-learning-sci": [
    {
      id: "q-sciml-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The core idea of active learning for scientific experiments is:",
      options: [
        "Running all possible experiments in parallel to maximize data collection speed",
        "Selecting the most informative experiments to run next based on current model uncertainty, minimizing the number of expensive experiments needed",
        "Automating experimental apparatus using robotic systems",
        "Training models on publicly available datasets instead of running new experiments",
      ],
      correctAnswer: 1,
      explanation:
        "Active learning closes the loop between model and experiment: the model identifies which experiments would reduce uncertainty the most, guiding a scientist or robot to run those specific experiments next — maximizing information gain per experimental cost.",
      hints: [
        "The goal is to learn the most from the fewest experiments — experiment budgets are real constraints.",
        'Instead of random sampling, active learning asks "which experiment would teach the model the most?"',
      ],
    },
    {
      id: "q-sciml-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Bayesian optimization is a form of active learning that models the objective function with a Gaussian process and uses an acquisition function to select the next query point.",
      correctAnswer: "True",
      explanation:
        "Bayesian optimization maintains a Gaussian process surrogate of the unknown objective; acquisition functions (Expected Improvement, UCB, Thompson sampling) balance exploration of uncertain regions and exploitation of known good regions to find the optimum efficiently.",
      hints: [
        "Bayesian optimization is the workhorse for hyperparameter tuning — the same method applies to scientific experimental optimization.",
        "The Gaussian process provides both a mean prediction and uncertainty estimate; the acquisition function uses both.",
      ],
    },
    {
      id: "q-sciml-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Self-driving laboratories (SDLs) combine active learning with:",
      options: [
        "Human scientists manually selecting experiments based on model recommendations",
        "Robotic experimental platforms that autonomously execute ML-selected experiments, close the data loop, and update models without human intervention",
        "Pre-recorded experimental protocols replayed on robotic hardware",
        "Deep reinforcement learning agents that control laboratory equipment through trial and error",
      ],
      correctAnswer: 1,
      explanation:
        "SDLs (e.g., A-Lab at Berkeley, Chemspeed, Emerald Cloud Lab) integrate ML-driven experiment selection with autonomous robotic execution and automated characterization, creating a closed-loop discovery platform that runs 24/7 without human bottlenecks.",
      hints: [
        "A self-driving laboratory is analogous to a self-driving car — both human and robot decisions are eliminated from the loop.",
        "The full loop is: ML proposes experiment \\to robot executes \\to instrument measures \\to data feeds back to ML \\to repeat.",
      ],
    },
  ],

  "causal-sci": [
    {
      id: "q-sciml-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Causal discovery in science aims to:",
      options: [
        "Measure correlation coefficients between all pairs of variables in a dataset",
        "Infer directed causal relationships (a causal graph) from observational data or interventional experiments",
        "Build predictive models that maximize accuracy on held-out test sets",
        "Identify the most correlated features for use in a regression model",
      ],
      correctAnswer: 1,
      explanation:
        "Causal discovery infers the directed acyclic graph (DAG) encoding causal mechanisms from data, distinguishing cause from effect — essential for scientific understanding and predicting outcomes of interventions (experiments).",
      hints: [
        "Correlation tells you two variables move together; causality tells you which one drives the other.",
        "A causal graph has arrows indicating direction: A \\to B means A causes B, not just that they are correlated.",
      ],
    },
    {
      id: "q-sciml-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The PC algorithm for causal discovery is a constraint-based method that uses conditional independence tests to construct a causal graph skeleton and then orient edges using v-structure patterns.",
      correctAnswer: "True",
      explanation:
        "PC algorithm starts with a fully connected graph, removes edges where conditional independence is detected (ci-tests), then orients remaining edges by identifying v-structures (A \\to C \\leftarrow B where A and B are not adjacent) and applying orientation rules.",
      hints: [
        "PC (named after Peter and Clark) tests conditional independence to determine which edges to remove from the complete graph.",
        "V-structures (colliders) can be identified from independence patterns and provide partial edge orientation.",
      ],
    },
    {
      id: "q-sciml-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The challenge of causal identifiability from observational data refers to:",
      options: [
        "The inability of any algorithm to process datasets with more than 100 variables",
        "The fact that multiple causal graphs (a Markov equivalence class) can generate identical observational distributions, making the true causal structure underdetermined from data alone",
        "The computational cost of running conditional independence tests for large variable sets",
        "The requirement for equal sample sizes across all observational conditions",
      ],
      correctAnswer: 1,
      explanation:
        "Markov equivalence classes (CPDAGs) contain all DAGs that encode the same conditional independencies — observational data alone cannot distinguish between them. Interventional data, functional causal model assumptions, or temporal ordering are needed to identify the true DAG.",
      hints: [
        "Different causal structures can produce the same observed correlations and independence patterns.",
        "Without interventions (experiments), you can only recover the causal graph up to its Markov equivalence class.",
      ],
    },
  ],

  "graph-ml-science": [
    {
      id: "q-sciml-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "PaiNN (Polarizable Atom Interaction Neural Network) improves upon isotropic message-passing GNNs for molecular simulation by:",
      options: [
        "Using attention over molecular fingerprints instead of 3D coordinates",
        "Incorporating equivariant vector features (in addition to scalar features) to capture directional atomic interactions",
        "Replacing interatomic distances with molecular surface area as the interaction metric",
        "Processing entire protein sequences rather than local atomic environments",
      ],
      correctAnswer: 1,
      explanation:
        "PaiNN extends scalar message passing with equivariant vector features that transform correctly under rotation, capturing directional effects like bond dipoles and anisotropic polarizability — important for accurate force prediction in ML potentials.",
      hints: [
        "Scalar features (distances) cannot distinguish the direction of an interaction; vector features can.",
        "Equivariant means the feature transforms in a predictable way when the molecule is rotated.",
      ],
    },
    {
      id: "q-sciml-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "NequIP (Neural Equivariant Interatomic Potentials) achieves high data efficiency partly because its equivariant architecture does not need to learn rotational invariance from data — it is built into the model by construction.",
      correctAnswer: "True",
      explanation:
        "By encoding E(3)-equivariance into the architecture, NequIP never needs to learn that rotating a molecule does not change its energy from data — this prior reduces the effective learning problem, enabling accurate potentials from as few as hundreds of training structures.",
      hints: [
        "A non-equivariant model must see many rotated copies of each molecule to learn rotational invariance from data.",
        "Building invariance into the architecture effectively reduces the complexity of what needs to be learned.",
      ],
    },
    {
      id: "q-sciml-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The expressivity limit of standard message-passing GNNs is related to their inability to distinguish certain non-isomorphic graphs. For molecular systems, this means:",
      options: [
        "GNNs cannot process molecules with more than 100 atoms",
        "Standard MPNNs are at most as expressive as the 1-Weisfeiler-Lehman (1-WL) graph isomorphism test, failing to distinguish certain molecular structures that differ only in 3D geometry",
        "GNNs cannot predict scalar properties like energy, only vector properties like forces",
        "Message passing cannot propagate information beyond first-neighbor atoms",
      ],
      correctAnswer: 1,
      explanation:
        "The 1-WL limit means MPNNs cannot distinguish graphs with identical local connectivity patterns but different 3D geometries (e.g., enantiomers, certain cyclic structures); higher-order GNNs or incorporating geometric features (distances, angles) are needed.",
      hints: [
        "The Weisfeiler-Lehman test is a classical graph isomorphism heuristic — 1-WL equivalence defines a GNN\'s expressivity ceiling.",
        "Two molecules can have identical bonding topology but different 3D shapes — a topology-only GNN cannot tell them apart.",
      ],
    },
  ],

  "equivariant-networks": [
    {
      id: "q-sciml-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "E(3)-equivariance in neural networks means that the network\'s output:",
      options: [
        "Remains unchanged (invariant) for all possible inputs",
        "Transforms in the same way as the output\'s physical quantity when the input 3D coordinates are rotated, reflected, or translated",
        "Can only process molecules with exactly 3 atoms",
        "Is equivariant to permutations of atomic indices but not to rotations",
      ],
      correctAnswer: 1,
      explanation:
        "E(3)-equivariance means if you rotate the input molecule, the output (forces, dipole vector) rotates correspondingly; if you translate, energy remains the same (invariant). This embeds physical symmetries of 3D space directly into the model architecture.",
      hints: [
        "E(3) is the Euclidean group in 3D: rotations, reflections, and translations.",
        "An equivariant model transforms its output consistently with the transformation applied to the input.",
      ],
    },
    {
      id: "q-sciml-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Invariant neural networks (like SchNet) and equivariant neural networks (like NequIP) are both useful in molecular simulation, but equivariant networks are generally needed when the output is a directional quantity like atomic forces.",
      correctAnswer: "True",
      explanation:
        "Forces are vectors (directional) — a rotation-invariant model cannot directly output rotated forces. Equivariant models output quantities that transform correctly, enabling direct force prediction without finite-difference derivatives of the energy.",
      hints: [
        "Energy is a scalar (invariant to rotation); force is a vector (must rotate with the molecule).",
        "If you want to directly predict forces (not derive them from energy), the model must be equivariant in its vector outputs.",
      ],
    },
    {
      id: "q-sciml-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Tensor field networks and SE(3)-Transformers achieve equivariance by operating on:",
      options: [
        "Scalar features only, achieving equivariance through data augmentation during training",
        "Irreducible representations (irreps) of the rotation group SO(3), where features are spherical harmonic coefficients that transform predictably under rotation",
        "Fourier transforms of 3D point cloud density functions discretized on a voxel grid",
        "Graph Laplacian eigenvectors of the molecular contact graph",
      ],
      correctAnswer: 1,
      explanation:
        "By decomposing features into irreps of SO(3) (type-0 scalars, type-1 vectors, type-2 tensors, etc.) and using Clebsch-Gordan tensor products for interactions, these networks guarantee equivariance by construction via representation theory.",
      hints: [
        'Irreducible representations (irreps) of SO(3) are the spherical harmonics — the "eigenfunctions" of rotation.',
        "Combining irreps via Clebsch-Gordan products ensures the output transforms correctly under rotation without any data augmentation.",
      ],
    },
  ],

  "differentiable-programming": [
    {
      id: "q-sciml-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "JAX enables differentiable programming in scientific computing primarily through:",
      options: [
        "A just-in-time compiler for CUDA kernels only",
        "Composable function transformations including automatic differentiation (grad), JIT compilation (jit), vectorization (vmap), and parallelization (pmap)",
        "A Python library for symbolic mathematics and formula manipulation",
        "A replacement for NumPy that runs on TPUs but not GPUs",
      ],
      correctAnswer: 1,
      explanation:
        "JAX\'s power comes from composable transforms: jit compiles to XLA for GPU/TPU, grad computes exact derivatives via reverse-mode AD, vmap batches any function automatically, and pmap parallelizes across devices — enabling high-performance scientific ML with minimal code change.",
      hints: [
        'JAX is often described as "NumPy on steroids" — familiar API with powerful transformations built on top.',
        "The four key transforms are: grad (differentiation), jit (compilation), vmap (vectorization), pmap (parallelism).",
      ],
    },
    {
      id: "q-sciml-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Differentiable physics simulators enable end-to-end gradient-based optimization of physical system parameters by backpropagating loss gradients through the simulation itself.",
      correctAnswer: "True",
      explanation:
        "Differentiable simulators (e.g., Brax, DiffTaichi, Warp) compute derivatives of simulation outputs with respect to physical parameters (initial conditions, material properties) via AD, enabling gradient-based inverse design without finite-difference approximations.",
      hints: [
        "Traditional simulators are black boxes — you cannot differentiate through them. Differentiable simulators expose gradients.",
        "If you can differentiate through the physics simulation, you can use gradient descent to optimize any parameter of the simulation.",
      ],
    },
    {
      id: "q-sciml-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The checkpointing technique in differentiable programming trades memory for computation by:",
      options: [
        "Saving model weights to disk at regular intervals during training",
        "Storing only a subset of intermediate activations during the forward pass and recomputing others during backpropagation",
        "Using lower-precision arithmetic to reduce memory consumption during the forward pass",
        "Distributing the computation graph across multiple GPUs",
      ],
      correctAnswer: 1,
      explanation:
        "Gradient checkpointing stores only O(√N) activations from N layers (instead of O(N)); during backpropagation, it recomputes the unstored activations from the nearest checkpoint — reducing memory from O(N) to O(√N) at the cost of ~33% more FLOPs.",
      hints: [
        "Backpropagation needs the forward pass activations to compute gradients — normally all must be stored.",
        "Checkpointing saves only some activations and recomputes the rest during the backward pass when needed.",
      ],
    },
  ],

  "digital-twins": [
    {
      id: "q-sciml-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A digital twin in engineering is best described as:",
      options: [
        "A backup copy of a CAD design file stored in the cloud",
        "A virtual, real-time synchronized computational replica of a physical system that enables monitoring, prediction, and optimization",
        "A duplicate physical prototype used for destructive testing",
        "A 3D visualization of a system for presentation purposes",
      ],
      correctAnswer: 1,
      explanation:
        "Digital twins continuously ingest real-time sensor data from a physical asset, update their model state, and run simulations/predictions — enabling predictive maintenance, failure detection, and virtual what-if testing without risking the physical system.",
      hints: [
        "The key attributes are: virtual, synchronized with the physical system in real time, and used for simulation/prediction.",
        "Digital twins in manufacturing predict when a machine will fail before it actually does, enabling proactive maintenance.",
      ],
    },
    {
      id: "q-sciml-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Neural surrogate models are used within digital twins to replace expensive physics-based simulations that cannot run at the speeds required for real-time decision making.",
      correctAnswer: "True",
      explanation:
        "High-fidelity FEM or CFD simulations can take hours, incompatible with real-time twin operation; neural surrogates trained on simulation data provide predictions in milliseconds, enabling real-time state estimation, anomaly detection, and optimization within the twin.",
      hints: [
        "A real-time system needs predictions in milliseconds; FEM simulations take hours — the gap requires a fast surrogate.",
        "The surrogate is trained offline on high-fidelity simulation data, then deployed for fast inference in the twin.",
      ],
    },
    {
      id: "q-sciml-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Physics-constrained neural networks used as digital twin surrogates offer an advantage over pure data-driven surrogates because:",
      options: [
        "They require no training data and can be deployed immediately",
        "They extrapolate more reliably to unseen operating conditions by respecting physical conservation laws and governing equations",
        "They run 100\\times faster than unconstrained neural networks at inference time",
        "They automatically learn the optimal sensor placement for the physical system",
      ],
      correctAnswer: 1,
      explanation:
        "Cosmological likelihoods for complex statistics (e.g., higher-order statistics, galaxy morphologies) are analytically intractable; SBI methods (SNPE, SNLE, SNRE) train neural estimators on simulation pairs (\\theta, x) to approximate the posterior directly.",
      hints: [
        "Traditional Bayesian inference requires evaluating the likelihood — what if you cannot write it down?",
        "Forward simulations are feasible (you can simulate the universe given cosmological parameters), even if the inverse probability is not analytically tractable.",
      ],
    },
  ],

  "climate-science-ml": [
    {
      id: "q-sciml-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "ML is being used in climate science to improve the parameterization of which processes that are too small to be resolved by general circulation models (GCMs)?",
      options: [
        "Continental drift and tectonic plate movement",
        "Sub-grid convection, cloud formation, and turbulent mixing, which occur at scales finer than GCM grid cells",
        "Ocean basin circulation at the thousand-kilometer scale",
        "Solar irradiance variability over the 11-year sunspot cycle",
      ],
      correctAnswer: 1,
      explanation:
        "GCMs have grid cells of ~100 km; convective storms and cloud microphysics occur at meters to kilometers. ML-based parameterizations (e.g., NeurIP, ClimSim data) learn these sub-grid processes from high-resolution simulations to replace classical empirical parameterizations.",
      hints: [
        "GCMs have grid cells of ~100 km; convective storms and cloud microphysics occur at much smaller scales — they must be parameterized, not resolved.",
        "The bottleneck is the number of hypotheses that can be tested — AI dramatically expands this throughput virtually.",
      ],
    },
    {
      id: "q-sciml-kp25-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "AlphaFold2's impact on structural biology is a concrete example of accelerated scientific discovery, having predicted the structures of over 200 million proteins and depositing them in a public database.",
      correctAnswer: "True",
      explanation:
        "DeepMind and EMBL-EBI released the AlphaFold Protein Structure Database with predicted structures for virtually all known proteins (~200M+), transforming structural biology by making structure prediction near-instantaneous rather than requiring months of X-ray crystallography.",
      hints: [
        "AlphaFold2's database provides free, instant access to predicted structures that previously required expensive, time-consuming experimental determination.",
        "X-ray crystallography can take months to years per structure; AlphaFold2 predicts in minutes.",
      ],
    },
    {
      id: "q-sciml-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "AI Scientist" concept (autonomous scientific discovery agents) faces what fundamental challenge beyond just generating hypotheses?',
      options: [
        "Modern GPUs are insufficiently powerful to run scientific ML experiments",
        "Ensuring generated hypotheses are novel, experimentally testable, and that autonomous validation processes maintain rigorous scientific standards without human bias or hallucination",
        "Scientific papers are copyrighted, preventing AI access to the literature",
        "Autonomous agents cannot interface with laboratory equipment",
      ],
      correctAnswer: 1,
      explanation:
        "Autonomous discovery agents must generate truly novel (not already known) hypotheses, design executable experiments, and validate results without hallucinating conclusions — requiring robust uncertainty quantification, grounding to physical reality, and rigorous falsifiability checks.",
      hints: [
        "LLMs can generate plausible-sounding but factually incorrect scientific claims — verification is the hard part.",
        "Scientific rigor requires that findings be reproducible and falsifiable — autonomy must not sacrifice these properties.",
      ],
    },
  ],

  "accelerated-discovery": [
    {
      id: "q-sciml-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "AI-accelerated scientific discovery primarily compresses which part of the traditional research pipeline?",
      options: [
        "Peer review and journal publication timelines",
        "Hypothesis generation, candidate screening, and experimental design — reducing the time from hypothesis to validated discovery",
        "Laboratory equipment procurement and installation",
        "Regulatory approval processes for new scientific methods",
      ],
      correctAnswer: 1,
      explanation:
        'AI compresses the "ideation-to-validation" cycle: generative models propose candidates, property predictors screen millions virtually, active learning prioritizes experiments — collapsing years of iterative experimentation into weeks of ML-guided search.',
      hints: [
        "The bottleneck is the number of hypotheses that can be tested — AI dramatically expands this throughput virtually.",
        "The goal is to learn the most from the fewest experiments — experiment budgets are real constraints.",
      ],
    },
    {
      id: "q-sciml-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AlphaFold2's impact on structural biology is a concrete example of accelerated scientific discovery, having predicted the structures of over 200 million proteins and depositing them in a public database.",
      correctAnswer: "True",
      explanation:
        "DeepMind and EMBL-EBI released the AlphaFold Protein Structure Database with predicted structures for virtually all known proteins (~200M+), transforming structural biology by making structure prediction near-instantaneous rather than requiring months of X-ray crystallography.",
      hints: [
        "AlphaFold2's database provides free, instant access to predicted structures that previously required expensive, time-consuming experimental determination.",
        "X-ray crystallography can take months to years per structure; AlphaFold2 predicts in minutes.",
      ],
    },
    {
      id: "q-sciml-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "AI Scientist" concept (autonomous scientific discovery agents) faces what fundamental challenge beyond just generating hypotheses?',
      options: [
        "Modern GPUs are insufficiently powerful to run scientific ML experiments",
        "Ensuring generated hypotheses are novel, experimentally testable, and that autonomous validation processes maintain rigorous scientific standards without human bias or hallucination",
        "Scientific papers are copyrighted, preventing AI access to the literature",
        "Autonomous agents cannot interface with laboratory equipment",
      ],
      correctAnswer: 1,
      explanation:
        "Autonomous discovery agents must generate truly novel (not already known) hypotheses, design executable experiments, and validate results without hallucinating conclusions — requiring robust uncertainty quantification, grounding to physical reality, and rigorous falsifiability checks.",
      hints: [
        "LLMs can generate plausible-sounding but factually incorrect scientific claims — verification is the hard part.",
        "Scientific rigor requires that findings be reproducible and falsifiable — autonomy must not sacrifice these properties.",
      ],
    },
  ],

  "reproducibility-sci": [
    {
      id: "q-sciml-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'The "reproducibility crisis" in ML research refers to:',
      options: [
        "The difficulty of reproducing physical experiments due to equipment variability",
        "The widespread inability to reproduce published ML results due to missing code, data, and non-standardized evaluation protocols",
        "The challenge of running the same ML model on different hardware and getting identical floating point results",
        "The difficulty of reproducing natural language model outputs due to sampling stochasticity",
      ],
      correctAnswer: 1,
      explanation:
        "Many published ML results cannot be reproduced because code and data are not released, hyperparameter details are omitted, evaluation metrics differ, or results depend on undisclosed compute budgets — eroding scientific trust and impeding cumulative progress.",
      hints: [
        "If you cannot run someone else\'s experiment and get the same result, scientific progress is impeded.",
        "Missing code, undisclosed hyperparameters, and inconsistent benchmarks are concrete contributors to this crisis.",
      ],
    },
    {
      id: "q-sciml-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The use of fixed random seeds and releasing complete training code and data is considered best practice for reproducible ML research in scientific domains.",
      correctAnswer: "True",
      explanation:
        "Reproducibility best practices include: fixed seeds for all stochastic operations, full code release (training, evaluation, preprocessing), data release or specification, hardware/software environment documentation (requirements.txt, Dockerfile), and reporting variance over multiple runs.",
      hints: [
        "Stochastic training can give different results each run if seeds are not fixed — making results difficult to reproduce.",
        "Full code and data release lets anyone re-run the exact experiment — the gold standard for reproducibility.",
      ],
    },
    {
      id: "q-sciml-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The distinction between "replication" and "reproduction" in scientific ML is that:',
      options: [
        "Replication and reproduction are interchangeable terms with no meaningful difference",
        "Reproduction uses the same code/data to verify the result; replication independently re-implements the method from the paper description to test generalizability",
        "Replication refers to running experiments on a replica server, while reproduction refers to re-running on the original hardware",
        "Reproduction verifies statistical significance while replication tests for practical significance",
      ],
      correctAnswer: 1,
      explanation:
        "Reproduction (same code, data, pipeline) verifies computational correctness; replication (independent implementation from description) tests whether the scientific finding is genuine and robust across different implementations — a stronger claim of scientific validity.",
      hints: [
        "Reproduction is a weaker check — it mainly confirms that the code runs correctly.",
        "Replication is the stronger test — an independent implementation succeeding means the idea itself is sound, not just the specific code.",
      ],
    },
  ],

  "sparse-sensing": [
    {
      id: "q-sciml-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Compressed sensing (CS) theory guarantees exact recovery of a sparse signal from measurements far fewer than the Nyquist rate, provided two conditions are met. What are they?",
      options: [
        "The signal must be Gaussian and the measurement matrix must be orthogonal",
        "The signal must be sparse (or compressible) in some basis, and the measurement matrix must satisfy the Restricted Isometry Property (RIP)",
        "The measurement noise must be zero and the signal must be bandlimited",
        "The signal must be 1D and the measurements must be taken at random time points",
      ],
      correctAnswer: 1,
      explanation:
        "CS theory (Candès, Romberg, Tao; Donoho) guarantees that an s-sparse signal in R^n can be exactly recovered from m = O(s\\cdotlog(n/s)) measurements if the measurement matrix satisfies RIP, via L1-minimization (basis pursuit).",
      hints: [
        "Sparsity means the signal has only a few non-zero components in some representation basis.",
        "RIP (Restricted Isometry Property) ensures the measurement matrix does not distort the geometry of sparse vectors.",
      ],
    },
    {
      id: "q-sciml-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deep learning-based compressed sensing reconstruction methods (e.g., unrolled iterative algorithms) can outperform classical L1-minimization (basis pursuit) by learning problem-specific priors from data.",
      correctAnswer: "True",
      explanation:
        "Algorithm unrolling (LISTA, ISTA-Net) and end-to-end reconstruction networks (E2E-Var-Net) learn measurement-specific priors, achieving higher image quality at lower acceleration factors than classical CS for MRI and CT — at the cost of generalizability across protocols.",
      hints: [
        "L1-minimization uses a hand-designed sparsity prior; deep networks learn data-specific priors from training examples.",
        "A network trained on brain MRI data exploits the structure of brain images in ways that generic L1 minimization cannot.",
      ],
    },
    {
      id: "q-sciml-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Sparse sensing for fluid dynamics using optimal sensor placement (e.g., SSPOC) selects sensor locations to:",
      options: [
        "Maximize the number of sensors deployed across the flow domain",
        "Identify a minimal set of physical measurement locations that allows accurate reconstruction of the full flow field from reduced basis representations",
        "Detect turbulent regions only, ignoring laminar parts of the flow",
        "Minimize the computational cost of the Navier-Stokes solver",
      ],
      correctAnswer: 1,
      explanation:
        "SSPOC and similar methods combine POD/DMD reduced bases with compressed sensing to find sparse sensor locations that optimally reconstruct the full state — enabling real-time flow reconstruction from just a handful of pressure or velocity sensors in experimental settings.",
      hints: [
        "Think about placing a small number of flow sensors (pressure taps) to infer the entire flow field around an airfoil.",
        "The reconstruction uses a reduced basis (POD modes) to express the full field as a linear combination, recovered from sparse sensor observations.",
      ],
    },
  ],

  "scientific-benchmarks": [
    {
      id: "q-sciml-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The MD17 dataset is a standard benchmark in scientific ML for evaluating:",
      options: [
        "Medical image segmentation across 17 organ types",
        "ML interatomic potentials on energy and force prediction for small organic molecules from MD trajectories",
        "Multi-document summarization of 17-sentence scientific abstracts",
        "Protein-ligand binding affinity prediction for drug discovery",
      ],
      correctAnswer: 1,
      explanation:
        "MD17 contains molecular dynamics trajectories of 9 small organic molecules computed with DFT, providing energy and atomic force labels — the standard benchmark for evaluating accuracy and data efficiency of ML potentials (MAE in kcal/mol for energies, kcal/mol/Å for forces).",
      hints: [
        "MD stands for Molecular Dynamics — the dataset contains snapshots from DFT-level trajectories.",
        "The benchmark tests how well ML potentials predict energies and forces, which are required for running MD simulations.",
      ],
    },
    {
      id: "q-sciml-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "WeatherBench is a standardized benchmark for evaluating ML-based weather forecasting models that provides baseline scores from numerical weather prediction (NWP) models for comparison.",
      correctAnswer: "True",
      explanation:
        "WeatherBench (and WeatherBench 2) provides ERA5-based evaluation protocols, standard metrics (RMSE, ACC at specific pressure levels), and operational NWP (IFS, GFS) baseline scores — enabling fair comparison of ML weather models on a common test set.",
      hints: [
        "Without a common benchmark, every ML weather paper would use different evaluation metrics and test periods.",
        "WeatherBench includes NWP baseline scores so ML models can directly compare against state-of-the-art operational forecasts.",
      ],
    },
    {
      id: "q-sciml-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Open Catalyst Project (OCP) benchmark advances ML for scientific applications by:",
      options: [
        "Providing a dataset of catalytic reaction outcomes for pharmaceutical synthesis",
        "Releasing a large-scale DFT-computed dataset of catalyst-adsorbate systems with energy/force labels to develop ML potentials for electrocatalysis applications",
        "Benchmarking NLP models on scientific literature about catalysis",
        "Comparing the speed of different molecular dynamics software packages",
      ],
      correctAnswer: 1,
      explanation:
        "OCP (Meta AI + CMU) provides >1 billion DFT energy/force calculations on catalyst surfaces with adsorbates, enabling ML potential development for applications like CO2 reduction and nitrogen fixation — critical for renewable energy and sustainable chemistry.",
      hints: [
        "OCP focuses on heterogeneous catalysis: molecules adsorbing onto material surfaces, relevant to electrochemical applications.",
        "The scale (1 billion+ DFT calculations) far exceeds what any individual group could compute — it is a community resource.",
      ],
    },
  ],

  "hybrid-ml-physics": [
    {
      id: "q-sciml-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The key motivation for hybrid ML-physics models over purely data-driven ML models in science is:",
      options: [
        "Physics-based components make the model run faster on any hardware",
        "Physics constraints improve generalization, ensure physical consistency, and enable extrapolation to regimes not covered by training data",
        "Hybrid models require less training data than purely physics-based models",
        "Physics components automatically tune all model hyperparameters",
      ],
      correctAnswer: 1,
      explanation:
        "Hybrid models leverage ML\'s flexibility for unknown or complex sub-processes while using physics equations as structural constraints — improving generalization beyond training data, guaranteeing conservation laws, and enabling interpretable decomposition of model components.",
      hints: [
        "Physics knowledge is a powerful inductive bias that reduces the space of possible models to physically plausible ones.",
        "In extrapolation, physics constraints prevent the model from making predictions that violate basic physical laws.",
      ],
    },
    {
      id: "q-sciml-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Universal Differential Equation (UDE) framework combines mechanistic ODE/PDE models with neural networks by replacing unknown or uncertain model terms with neural network components that are learned from data.",
      correctAnswer: "True",
      explanation:
        "UDEs (Rackauckas et al.) embed neural networks inside differential equations: known physics is written explicitly while unknown terms (reaction rates, constitutive relations) are replaced by neural networks, trained end-to-end using differentiable ODE solvers.",
      hints: [
        "If you know most of a physical model but not one specific term, you can replace just that term with a neural network.",
        "The neural network learns the missing physics from data, while the rest of the model remains interpretable.",
      ],
    },
    {
      id: "q-sciml-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "gray-box" modeling approach in hybrid ML-physics differs from "black-box" ML in that:',
      options: [
        "Gray-box models are only applicable to linear physical systems",
        "Gray-box models incorporate known physical structure (conservation laws, reaction network topology) while using ML to learn unknown parameters or sub-models, preserving interpretability",
        "Gray-box models use gray-scale images as inputs rather than color images",
        "Gray-box models require no training data because physics fully specifies the model",
      ],
      correctAnswer: 1,
      explanation:
        "Gray-box models sit between white-box (fully mechanistic, all parameters known) and black-box (pure ML): they impose known physical structure (e.g., network topology, conservation form) while learning unknown kinetic constants or closure terms from data.",
      hints: [
        "White box = fully known physics; black box = pure ML. Gray box = hybrid of both.",
        "In a reaction network, the topology (which species react with which) may be known while rate constants must be learned from data.",
      ],
    },
  ],
};

const additionalScimlQuestions: Record<string, Question[]> = {
  'fourier-neural-operators': [
    {
      id: 'q-sciml-kp31-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The Fourier Neural Operator (FNO) learns mappings between function spaces. Its core innovation is applying the integral kernel operator in the ___.',
      options: [
        'Spatial domain using learned convolutional filters of fixed size',
        'Fourier domain, where the kernel becomes a pointwise multiplication by learned complex weights on a truncated set of Fourier modes',
        'Wavelet domain using learnable mother wavelets at multiple scales',
        'Graph spectral domain using the graph Laplacian eigenbasis of the input mesh',
      ],
      correctAnswer: 1,
      explanation: 'FNO applies FFT to the input function, multiplies by learned complex weight tensors on the lowest R Fourier modes, then inverse-FFTs back. This is equivalent to a global convolution but is O(N log N) and resolution-invariant—the same weights work for any discretisation of the input function.',
      hints: [
        'In the Fourier domain, convolution becomes pointwise multiplication—what does "learning the kernel" mean there?',
        'Truncating to R modes is a low-pass filter assumption: the operator is assumed to be smooth.',
      ],
    },
    {
      id: 'q-sciml-kp31-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A trained FNO model can be evaluated on a finer spatial grid than the one used during training without retraining, because the learned Fourier mode weights are discretisation-agnostic.',
      correctAnswer: 'True',
      explanation: 'Resolution-invariance is a key FNO property: since the operator is parameterised in Fourier space (truncated modes), it can be applied to any resolution by simply running FFT at that resolution, multiplying the same learned weights, and inverse-FFT. This "zero-shot" super-resolution is widely used in PDE surrogate settings.',
      hints: [
        'The Fourier transform of a function at different resolutions still has the same low-frequency modes.',
        'If the learned weights are on modes 1..R, those modes exist regardless of grid resolution.',
      ],
    },
    {
      id: 'q-sciml-kp31-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Compared to PINNs, FNO-based surrogates offer a different trade-off. Which statement correctly captures the main difference?',
      options: [
        'FNO enforces PDE constraints exactly via automatic differentiation at test time, while PINNs do not',
        'FNO is a data-driven operator learner that requires paired (input, solution) training data but amortises inference cost across many PDE instances; PINNs solve each instance from scratch using physics loss and need no solution data',
        'FNO can only handle 1D PDEs, while PINNs work in arbitrary dimensions',
        'FNO requires mesh-based discretisation, while PINNs are always mesh-free',
      ],
      correctAnswer: 1,
      explanation: 'PINNs embed the PDE as a loss term and train per-instance—no labelled solution data required but each new scenario needs a full retrain. FNO learns an operator mapping (e.g., initial condition \\to solution) across many instances; inference is a single forward pass but training needs ground-truth solutions (e.g., from a classical solver).',
      hints: [
        'Think about what "amortised" means: you pay a large upfront cost that gets reused.',
        'PINN: physics at training time; FNO: physics baked in via training data.',
      ],
    },
  ],
  'uncertainty-sci-ml': [
    {
      id: 'q-sciml-kp32-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In Bayesian neural networks applied to scientific ML, the posterior over weights p(W|D) is typically approximated via ___.',
      options: [
        'Exact marginalisation over all possible weight configurations',
        'Variational inference (e.g., mean-field VI with ELBO) or MCMC methods such as HMC, because exact posterior computation is intractable for large networks',
        'Maximum a posteriori (MAP) estimation, which gives the full posterior distribution',
        'Bootstrap aggregation over 3 or more independently trained networks',
      ],
      correctAnswer: 1,
      explanation: 'Exact Bayesian inference scales exponentially in the number of parameters. Practical methods include (1) variational inference: approximate the posterior with a factorised Gaussian and minimise the KL divergence via the ELBO; (2) MCMC (e.g., HMC, NUTS): sample chains from the posterior—accurate but expensive; (3) deep ensembles: computationally cheapest but not strictly Bayesian.',
      hints: [
        'MAP gives a point estimate, not a distribution. The posterior is a distribution over weights.',
        'The ELBO (Evidence Lower BOund) is the objective for VI: maximising it minimises KL(q||p).',
      ],
    },
    {
      id: 'q-sciml-kp32-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Conformal prediction provides distribution-free coverage guarantees: given a calibration set, it constructs prediction intervals that contain the true value with at least (1−\\alpha) probability, regardless of the underlying data distribution.',
      correctAnswer: 'True',
      explanation: 'Conformal prediction is distribution-free: under exchangeability, the prediction interval {ŷ : score(x, ŷ) \\leq q̂_{1−\\alpha}} achieves marginal coverage \\geq 1−\\alpha without assumptions on the model or data distribution. It is widely used in scientific ML to provide rigorous uncertainty bounds for surrogate models.',
      hints: [
        'Conformal methods use a held-out calibration set to set the score threshold.',
        'Coverage is marginal (over random calibration sets), not conditional on x.',
      ],
    },
    {
      id: 'q-sciml-kp32-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In scientific ML, aleatoric uncertainty and epistemic uncertainty serve different roles. Which statement is correct?',
      options: [
        'Aleatoric uncertainty decreases with more training data; epistemic uncertainty is irreducible',
        'Epistemic uncertainty (model ignorance) reflects the data distribution and can be reduced with more data; aleatoric uncertainty (irreducible noise) is only reducible by increasing model complexity',
        'Both types of uncertainty are irreducible and cannot be estimated separately by any model',
        'Epistemic uncertainty is only relevant for classification tasks, not for PDE regression',
      ],
      correctAnswer: 1,
      explanation: 'Epistemic (model) uncertainty arises from limited data—it shrinks as more observations are added. Aleatoric (data) uncertainty reflects irreducible stochasticity (sensor noise, chaotic dynamics). In surrogate modelling, epistemic uncertainty indicates where the surrogate should not be trusted; aleatoric uncertainty indicates the inherent variability of the physical system.',
      hints: [
        'Think: if you had infinite training data, which uncertainty would disappear?',
        'A noisy sensor on a turbulent flow introduces aleatoric uncertainty that no amount of data removes.',
      ],
    },
  ],
  'active-learning-sci-advanced': [
    {
      id: 'q-sciml-kp33-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In active learning for scientific ML surrogates, the acquisition function determines which simulation to run next. Which acquisition function is motivated by maximising information gain about the model parameters?',
      options: [
        'Greedy nearest-neighbor: run the simulation closest to an already-labelled point',
        'Maximum entropy or BALD (Bayesian Active Learning by Disagreement), which maximises mutual information between predictions and model parameters',
        'Random sampling over the input space',
        'Minimum variance: run the simulation where variance of an ensemble is minimised',
      ],
      correctAnswer: 1,
      explanation: 'BALD selects the input x* that maximises I(y; W | x*, D) = H[y|x*, D] − E_{p(W|D)}[H[y|x*, W]], balancing high predictive uncertainty with low average conditional uncertainty. This is equivalent to selecting points where the ensemble disagrees most about predictions, driving the model to reduce epistemic uncertainty efficiently.',
      hints: [
        'Information gain = how much does observing this label reduce uncertainty about model weights?',
        'BALD = "Bayesian Active Learning by Disagreement" — the ensemble members disagree most at informative points.',
      ],
    },
    {
      id: 'q-sciml-kp33-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In physics-informed active learning, collocation points for the PDE residual can be adaptively placed in regions of high residual loss, reducing the total number of collocation points needed for accurate solutions.',
      correctAnswer: 'True',
      explanation: 'Adaptive collocation (e.g., RAR — Residual-based Adaptive Refinement) monitors the PDE residual across the domain and adds new collocation points where it is highest. This concentrates compute on difficult regions (sharp gradients, boundary layers) and dramatically reduces the total point budget compared to uniform sampling.',
      hints: [
        'Uniform collocation wastes points in easy regions; adaptive methods focus on hard regions.',
        'RAR is analogous to adaptive mesh refinement (AMR) in classical PDE solvers.',
      ],
    },
    {
      id: 'q-sciml-kp33-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'For a batch active learning strategy in scientific surrogate modelling, why is greedy sequential selection of the top-k most uncertain points suboptimal?',
      options: [
        'Because sequential selection is computationally faster than batch selection',
        'Because the top-k points are often clustered in the same high-uncertainty region, leading to redundant simulations and poor space coverage',
        'Because sequential selection requires re-fitting the surrogate after each point, which is impossible with neural network surrogates',
        'Because greedy selection always picks boundary points, which have low information content',
      ],
      correctAnswer: 1,
      explanation: 'Greedy sequential selection picks the single most uncertain point, re-ranks, picks the next, etc. If run in batch (no refit between picks), the top-k points all concentrate near the current maximum-uncertainty region, wasting budget on redundant, correlated simulations. Batch strategies (e.g., determinantal point processes, core-set selection, k-DPP) explicitly encourage diversity within the batch.',
      hints: [
        'High uncertainty is spatially correlated — nearby points are all uncertain for the same reason.',
        'Diversity in the batch \\approx sampling from different uncertain "clusters" rather than repeating the same one.',
      ],
    },
  ],
  'graph-neural-pde': [
    {
      id: 'q-sciml-kp34-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Graph Neural Networks (GNNs) are suited for PDE solving on irregular meshes because ___.',
      options: [
        'GNNs require a regular Cartesian grid and apply fixed convolution stencils',
        'GNNs naturally operate on arbitrary graph topologies, so mesh nodes become graph nodes and edges encode spatial adjacency, with message passing mimicking finite-element interactions',
        'GNNs encode the PDE in their loss function rather than their architecture',
        'GNNs automatically generate the mesh from the PDE boundary conditions',
      ],
      correctAnswer: 1,
      explanation: 'Methods like MeshGraphNets (Pfaff et al., 2021) represent simulation meshes as graphs, run learned message passing (aggregating neighbour features via edge networks), and roll out dynamics step-by-step. This handles non-uniform, adaptive meshes naturally and generalises across mesh refinements, unlike grid-based CNNs.',
      hints: [
        'In FEM, degrees of freedom interact locally through mesh connectivity—this is exactly the graph message-passing structure.',
        'CNNs assume a regular grid; GNNs can represent any topology.',
      ],
    },
    {
      id: 'q-sciml-kp34-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Message-passing GNNs are limited in their ability to distinguish certain non-isomorphic graphs (the Weisfeiler-Leman limitation), which can affect their expressiveness for PDE problems requiring global geometric reasoning.',
      correctAnswer: 'True',
      explanation: 'Standard message passing (sum/mean aggregation) cannot distinguish all graph structures—it is at most as powerful as the 1-WL graph isomorphism test. For PDE tasks requiring global geometric properties (e.g., long-range pressure propagation), higher-order GNNs, transformer attention, or multi-scale architectures are needed to overcome this limitation.',
      hints: [
        'WL test: two graphs are "the same" if message passing cannot distinguish their node feature distributions.',
        'Long-range interactions in a PDE (e.g., elliptic equations) require information to travel many hops in the graph.',
      ],
    },
    {
      id: 'q-sciml-kp34-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Multipole Graph Neural Operator (MGNO) and similar hierarchical GNN-based operators address the long-range interaction problem by ___.',
      options: [
        'Adding skip connections between the input and output layers of the GNN',
        'Building a multi-resolution graph hierarchy (coarse-to-fine) so that long-range interactions propagate via few hops through coarser levels, analogous to multigrid methods',
        'Replacing message passing with attention over all node pairs (O(N\\^2) complexity)',
        'Using random graph rewiring to create shortcut edges between distant nodes',
      ],
      correctAnswer: 1,
      explanation: 'Hierarchical/multigrid GNN operators (e.g., MGNO, Geo-FNO on graphs) construct a coarsened graph hierarchy: messages at the coarsest level travel across the entire domain in one hop, enabling O(log N) effective interaction distance. This mirrors classical multigrid PDE solvers and keeps complexity near O(N).',
      hints: [
        'Multigrid: smooth errors at fine levels, correct large-scale errors at coarse levels.',
        'Going from fine to coarse to fine \\approx one message-passing round covers the whole domain.',
      ],
    },
  ],
  'symbolic-regression-advanced': [
    {
      id: 'q-sciml-kp35-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'PySR and similar modern symbolic regression tools search for analytical formulas from data. Their core search algorithm is typically ___.',
      options: [
        'Exhaustive enumeration of all possible formulas up to a fixed length',
        'Evolutionary/genetic programming: a population of expression trees is evolved via mutation and crossover, guided by a parsimony-penalised fitness score',
        'Gradient descent on a continuous relaxation of the expression tree space',
        'Bayesian optimisation over the discrete grammar of mathematical expressions',
      ],
      correctAnswer: 1,
      explanation: 'Genetic programming (GP) maintains a population of expression trees. Each iteration: (1) evaluate fitness = accuracy − complexity penalty; (2) select parents; (3) apply crossover (swap subtrees) and mutation (replace nodes/operators); (4) keep the Pareto front of accuracy vs. complexity. PySR adds gradient-based constant optimisation at each step for efficiency.',
      hints: [
        'Expression trees naturally support crossover: swap a subtree from one parent into another.',
        'Parsimony pressure: prefer shorter formulas that fit equally well — Occam\'s razor in practice.',
      ],
    },
    {
      id: 'q-sciml-kp35-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Symbolic regression can recover exact closed-form equations (e.g., Newton\'s law F = ma) from noisy experimental data, making it a tool for scientific discovery rather than just prediction.',
      correctAnswer: 'True',
      explanation: 'Symbolic regression searches for interpretable formulas rather than black-box models. Landmark examples include Udrescu & Tegmark\'s AI Feynman (2020), which recovered 100 physics equations from the Feynman symbolic regression benchmark, and Cranmer et al.\'s discovery of conservation laws from particle physics simulations.',
      hints: [
        'A neural network gives you a number; symbolic regression gives you a formula you can reason about.',
        'If the formula is exact physics, it will generalise perfectly to new regimes—extrapolation is possible.',
      ],
    },
    {
      id: 'q-sciml-kp35-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key challenge with symbolic regression at scale (many variables, high complexity) is ___.',
      options: [
        'That genetic programming cannot represent any formula involving trigonometric functions',
        'The combinatorial explosion of expression tree space: the number of possible formulas grows super-exponentially in depth/arity, making exhaustive search infeasible and requiring aggressive heuristics or deep learning guidance',
        'That symbolic regression requires labelled training data unlike PINNs which need no data',
        'That symbolic regression results always overfit because they lack regularisation',
      ],
      correctAnswer: 1,
      explanation: 'With k input variables and n operator types, the number of expression trees of depth d grows as O((k\\cdotn)^(2^d)). Beyond ~5 variables and moderate complexity, naive GP struggles. Modern approaches address this via: (1) neural-guided search (e.g., NeSymReS uses transformers to propose candidate expressions); (2) embedding dimensional analysis constraints; (3) parallelised island-model evolution.',
      hints: [
        'Depth 5 tree with 10 nodes and 10 operators: 10^10 possible trees—exhaustive search is hopeless.',
        'Neural guidance: a transformer trained on (data, formula) pairs can propose likely formula skeletons.',
      ],
    },
  ],
  'data-driven-turbulence': [
    {
      id: 'q-sciml-kp36-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In data-driven turbulence closure for RANS (Reynolds-Averaged Navier-Stokes), the ML model is trained to predict ___.',
      options: [
        'The raw velocity field at each timestep, replacing the full Navier-Stokes solve',
        'The Reynolds stress tensor \\tau_ij = −\\rho⟨u\'_i u\'_j⟩, which encodes the effect of unresolved turbulent fluctuations on the mean flow',
        'The turbulent kinetic energy spectrum in wavenumber space',
        'The Kolmogorov microscale \\eta as a function of Reynolds number',
      ],
      correctAnswer: 1,
      explanation: 'RANS equations are unclosed: the Reynolds stress tensor \\tau_ij appears but is unknown. Traditional closures (k-\\epsilon, k-\\omega) use linear eddy viscosity assumptions. Data-driven approaches (e.g., Ling et al., Schmelzer et al.) train ML models to map mean-flow features (strain rate, vorticity, pressure gradient) \\to \\tau_ij from high-fidelity DNS data.',
      hints: [
        'RANS averaging introduces \\tau_ij as the "closure problem"—it must be modelled.',
        'DNS resolves all scales but is too expensive for engineering Re; RANS is cheap but needs a closure.',
      ],
    },
    {
      id: 'q-sciml-kp36-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Galilean invariance and rotational equivariance are important physical constraints for ML turbulence closure models, because the Reynolds stress must transform correctly under coordinate changes.',
      correctAnswer: 'True',
      explanation: 'Ling et al. (2016) showed that embedding tensor-basis representations (Pope\'s integrity basis for symmetric tensors) into neural networks enforces both Galilean invariance and frame-independence by construction. Unconstrained networks can learn invariant mappings accidentally but are not guaranteed to remain physically consistent outside the training distribution.',
      hints: [
        'The Reynolds stress is a rank-2 symmetric tensor; it must transform as T_ij \\to R_ik R_jl T_kl under rotation R.',
        'Pope\'s tensor basis: any symmetric, traceless function of symmetric input tensors can be written as a linear combination of 10 basis tensors with scalar coefficients.',
      ],
    },
    {
      id: 'q-sciml-kp36-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A major challenge for deploying ML turbulence models in RANS solvers is a-posteriori instability. What does this mean and how is it addressed?',
      options: [
        'The ML model is trained in an a-priori setting (given mean-flow features, predict \\tau_ij) but when deployed inside the RANS solver (a-posteriori), errors accumulate and may cause solver divergence; addressed by differentiable RANS solvers enabling end-to-end training',
        'The ML model is unstable during training because of vanishing gradients in deep networks; addressed by residual connections',
        'The RANS solver diverges because the ML model predicts negative turbulent kinetic energy; addressed by adding a ReLU output activation',
        'The ML model is too slow for real-time inference; addressed by model distillation',
      ],
      correctAnswer: 0,
      explanation: 'A-priori testing: ML predicts \\tau_ij from ground-truth DNS mean-flow features—high accuracy. A-posteriori testing: deploy ML inside RANS; mean-flow now comes from the RANS solver itself, which differs from DNS. Small ML errors alter the mean-flow, which further misleads ML predictions, leading to instability. Solutions: differentiable RANS solvers (JAX-Fluids, etc.) that backpropagate through the full simulation loop during training.',
      hints: [
        'A-priori: perfect input features. A-posteriori: noisy/drifted features from the solver itself—compound errors.',
        'Differentiable solvers make the full simulation a computational graph, enabling end-to-end gradient training.',
      ],
    },
  ],
  'neural-ode-applications': [
    {
      id: 'q-sciml-kp37-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Neural ODEs parameterise the derivative of a hidden state as dh/dt = f_\\theta(h(t), t). A key memory-efficient training technique unique to Neural ODEs is ___.',
      options: [
        'Gradient checkpointing, storing only every k-th layer activation',
        'The adjoint method, which computes gradients by solving a reverse-time ODE without storing forward states',
        'Mixed-precision training to halve activation memory requirements',
        'Truncated backpropagation through time (TBPTT), which cuts gradients after a fixed number of steps',
      ],
      correctAnswer: 1,
      explanation: 'Chen et al. (2018) showed that gradients of the ODE loss w.r.t. \\theta and h(t\\_0) can be computed by integrating the adjoint ODE backward in time: da/dt = −a^T \\partialf/\\partialh. This requires O(1) memory (no forward activation storage) at the cost of an extra ODE solve, making Neural ODEs memory-efficient for very deep (long-time) integration.',
      hints: [
        'Standard backprop through a discrete ODE solver stores all intermediate states—memory is O(N_steps).',
        'Adjoint method: store only the final state, then recompute states backward as needed during the reverse ODE solve.',
      ],
    },
    {
      id: 'q-sciml-kp37-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Latent Neural ODEs can model irregularly sampled time series by encoding observed data with an RNN encoder, inferring a latent initial condition z(t\\_0), then evolving z via a Neural ODE and decoding to outputs at arbitrary query times.',
      correctAnswer: 'True',
      explanation: 'Rubanova et al. (2019) introduced Latent Neural ODEs: an RNN encoder processes observed (t_i, x_i) pairs (possibly irregularly spaced) backward in time to infer z(t\\_0); the Neural ODE then provides a continuous-time latent trajectory; a decoder reconstructs observations at any desired time. This naturally handles missing data and irregular sampling, unlike RNNs that assume fixed time steps.',
      hints: [
        'RNNs require fixed-step inputs; Neural ODEs provide continuous-time dynamics—combine both.',
        'The latent trajectory z(t) is smooth and continuous, so querying at any t is simply integrating the ODE to that time.',
      ],
    },
    {
      id: 'q-sciml-kp37-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When using a Neural ODE to model chaotic dynamical systems (e.g., Lorenz-63), training becomes difficult because ___.',
      options: [
        'The adjoint ODE cannot be integrated backward in time for chaotic systems',
        'Gradients explode exponentially along the Lyapunov exponent direction as the adjoint is integrated backward; truncated trajectories and specialised loss functions (e.g., shadowing, SRB measure matching) are used to stabilise training',
        'Chaotic systems have no fixed points, making it impossible to define a loss function',
        'Neural ODEs only support autonomous (time-independent) dynamics, but chaotic systems are time-dependent',
      ],
      correctAnswer: 1,
      explanation: 'In chaotic systems, the largest Lyapunov exponent \\lambda\\_1 > 0 causes nearby trajectories to diverge exponentially. During adjoint backward integration, the gradient grows as e^(\\lambda\\_1T), causing numerical instability and gradient explosion for long trajectories. Solutions: (1) short-time MSE on local trajectory segments; (2) ergodic/SRB measure loss that matches long-time statistics rather than point-wise trajectories; (3) Ensemble Kalman Inversion.',
      hints: [
        'Lyapunov exponent: the rate at which infinitesimally separated trajectories diverge. Positive \\to chaos.',
        'If you cannot match the trajectory exactly (butterfly effect), can you match its statistics instead?',
      ],
    },
  ],
  'quantum-ml': [
    {
      id: 'q-sciml-kp38-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A Variational Quantum Eigensolver (VQE) is a hybrid quantum-classical algorithm. The quantum circuit\'s role is to ___.',
      options: [
        'Classically diagonalise the Hamiltonian matrix and return the ground state energy',
        'Prepare a parameterised trial state |\\psi(\\theta)⟩ and estimate ⟨\\psi(\\theta)|H|\\psi(\\theta)⟩ via measurement; classical optimisation then updates \\theta to minimise this energy expectation',
        'Run Shor\'s algorithm to factorise the molecular Hamiltonian into independent subsystems',
        'Replace the classical ML backward pass by computing parameter-shift rule gradients on quantum hardware',
      ],
      correctAnswer: 1,
      explanation: 'VQE: a parameterised quantum circuit (ansatz) prepares |\\psi(\\theta)⟩ on a quantum processor; repeated measurements estimate ⟨H⟩ via Pauli decomposition. A classical optimiser (gradient-free or using parameter-shift rule gradients) minimises ⟨H⟩(\\theta). Convergence \\to ground state energy. VQE leverages quantum state preparation while keeping optimisation classical, suiting near-term noisy devices.',
      hints: [
        'The variational principle: ⟨\\psi|H|\\psi⟩ \\geq E_0 for any |\\psi⟩. Minimising it finds the ground state.',
        'Parameter-shift rule: \\partial⟨H⟩/\\partial\\theta_k = [⟨H⟩(\\theta_k + \\pi/2) − ⟨H⟩(\\theta_k − \\pi/2)] / 2 — enables gradient estimation from two circuit evaluations.',
      ],
    },
    {
      id: 'q-sciml-kp38-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Quantum kernel methods encode classical data into quantum states and use the inner product between quantum states as a kernel for classical SVM, potentially offering an exponential feature space without explicitly computing it.',
      correctAnswer: 'True',
      explanation: 'Quantum kernel: K(x_i, x_j) = |⟨\\phi(x_i)|\\phi(x_j)⟩|\\^2, where |\\phi(x)⟩ is a quantum feature map prepared by a circuit. The Hilbert space of n qubits has dimension 2^n, giving an exponentially large implicit feature space. Classical SVMs then optimise over this kernel. Whether this gives practical advantage over classical kernels is an active research question.',
      hints: [
        'Classical kernel trick: implicitly compute in high-dimensional space without materialising feature vectors.',
        'Quantum feature map: the quantum circuit maps x to a superposition in 2^n-dimensional Hilbert space.',
      ],
    },
    {
      id: 'q-sciml-kp38-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "barren plateau" problem in quantum machine learning refers to ___.',
      options: [
        'Quantum circuits producing flat output distributions that ignore the input data',
        'The exponential vanishing of gradients in parameterised quantum circuits as the number of qubits grows, caused by the random unitary nature of deep circuits concentrating the measure on the uniform distribution',
        'A hardware calibration issue causing systematic bias in gate operations on quantum processors',
        'The inability of variational circuits to represent non-unitary (dissipative) quantum dynamics',
      ],
      correctAnswer: 1,
      explanation: 'McClean et al. (2018) proved that for random parameterised circuits, Var[\\partial⟨H⟩/\\partial\\theta_k] decreases exponentially in the number of qubits n: the gradient landscape is exponentially flat ("barren plateau"), making gradient-based optimisation infeasible for large systems. Mitigations include: local cost functions, structured ansätze (hardware-efficient, chemically-motivated UCCSD), layerwise training.',
      hints: [
        'Deep random circuits approach the Haar random unitary—gradients of any observable vanish exponentially.',
        'Local cost (acting on a few qubits) avoids barren plateaus; global cost (all qubits) suffers from them.',
      ],
    },
  ],
  'physics-ml-hybrid': [
    {
      id: 'q-sciml-kp39-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Universal Differential Equations (UDEs) extend Neural ODEs by ___.',
      options: [
        'Adding attention mechanisms to the ODE right-hand side to handle variable-length inputs',
        'Embedding neural networks only in unknown terms within known differential equation structure, so that established physics is preserved while missing sub-models are learned',
        'Using universal approximation to guarantee that any ODE can be represented exactly with a large enough network',
        'Replacing the ODE solver with a neural network that directly maps initial conditions to solutions',
      ],
      correctAnswer: 1,
      explanation: 'UDEs (Rackauckas et al., 2020): if the ODE is ẋ = f(x, t; p) where part of f is known physics and part is unknown, only the unknown part is replaced by a neural network: ẋ = f_known(x, t) + NN_\\theta(x, t). The known physics provides strong inductive bias, reducing data requirements and improving generalisation. Training uses adjoint sensitivity through the ODE solve.',
      hints: [
        'If you know most of a physical model but not one specific term, you can replace just that term with a neural network.',
        'The neural network learns the missing physics from data, while the rest of the model remains interpretable.',
      ],
    },
    {
      id: 'q-sciml-kp39-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Hamiltonian Neural Networks (HNNs) learn the Hamiltonian function H(q, p) from trajectory data and use Hamilton\'s equations (q̇ = \\partialH/\\partialp, ṗ = −\\partialH/\\partialq) to evolve dynamics, automatically conserving total energy by construction.',
      correctAnswer: 'True',
      explanation: 'HNNs (Greydanus et al., 2019) parameterise H_\\theta(q, p) with a neural network and derive dynamics via Hamilton\'s equations using autograd. Since Hamilton\'s equations conserve H exactly (dH/dt = 0 by construction), HNNs perfectly conserve energy throughout rollout—unlike standard Neural ODEs which can drift. This makes them effective for long-horizon physical simulation.',
      hints: [
        'Hamilton\'s equations preserve H as a constant of motion—this is a mathematical identity, not a learned property.',
        'Lagrangian NNs do the same for Lagrangian mechanics, conserving energy via Euler-Lagrange equations.',
      ],
    },
    {
      id: 'q-sciml-kp39-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Equivariant neural networks (e.g., E(3)-equivariant GNNs like NequIP, MACE) are used for molecular force field learning because ___.',
      options: [
        'They process only equidistant atom pairs, simplifying the graph construction',
        'Physical energies and forces must be invariant/equivariant under Euclidean symmetries (rotation, translation, reflection); equivariant networks satisfy these constraints by construction, dramatically improving data efficiency',
        'They avoid computing pairwise distances, which is the computational bottleneck in MD simulations',
        'They use equivariant attention that scales as O(N) in the number of atoms rather than O(N\\^2)',
      ],
      correctAnswer: 1,
      explanation: 'Molecular energy E must be invariant under rigid body transformations (E(3) symmetry), and forces F_i = −\\partialE/\\partialr_i are equivariant (rotate with the molecule). E(3)-equivariant GNNs (NequIP, MACE, Allegro) represent atomic features as irreducible representations of SO(3) and use Clebsch-Gordan products for equivariant message passing—achieving 10-100x better data efficiency than non-equivariant models.',
      hints: [
        'If you rotate a molecule, the energy is the same but the forces rotate with it—equivariance, not invariance.',
        'Irreducible representations (irreps) of SO(3) are the spherical harmonics—they transform predictably under rotation.',
      ],
    },
  ],
  'differentiable-simulation': [
    {
      id: 'q-sciml-kp40-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Differentiable physics simulators enable end-to-end gradient-based optimisation through a simulation. A key challenge is handling ___.',
      options: [
        'Floating-point arithmetic, which introduces rounding errors in all gradient computations',
        'Discontinuous events (contact, collision, phase changes) where gradients are zero or undefined, requiring smoothing, randomisation, or alternative gradient estimators',
        'The requirement that all physical quantities must be positive, limiting the loss function design',
        'GPU memory constraints, which prevent storing simulation state at each timestep',
      ],
      correctAnswer: 1,
      explanation: 'Rigid-body contact, fluid shock waves, and phase transitions introduce non-differentiable discontinuities. Approaches: (1) smooth contact models (penalty-based, spring forces); (2) randomised smoothing (perturb inputs, average gradients); (3) complementarity-based differentiable contact (DiffTaichi, Brax); (4) event-driven adjoints that handle discontinuities analytically. Without these, gradients are zero or NaN at collision events.',
      hints: [
        'At a collision moment, the velocity changes instantaneously—the step function has zero gradient almost everywhere.',
        'Smoothing: replace the hard contact with a soft constraint; gradients exist but may be biased.',
      ],
    },
    {
      id: 'q-sciml-kp40-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Differentiable rendering (e.g., NeRF, NVDiffrast) enables gradient-based 3D reconstruction by making the rendering equation differentiable with respect to scene parameters such as geometry, materials, and lighting.',
      correctAnswer: 'True',
      explanation: 'Differentiable rendering computes \\partial(rendered pixel)/\\partial(scene parameters) via rasterisation or ray-marching, enabling gradient descent to fit scene parameters to observed images. NeRF uses differentiable volume rendering; NVDiffrast uses differentiable rasterisation with edge sampling to handle visibility discontinuities. This underpins inverse rendering, neural scene representations, and text-to-3D methods.',
      hints: [
        'Inverse rendering = given images, infer 3D scene—this is an optimisation problem requiring gradients.',
        'Edge discontinuities in rasterisation: the silhouette of an object is a step function in pixel space—requires special treatment.',
      ],
    },
    {
      id: 'q-sciml-kp40-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Score Distillation Sampling (SDS) in DreamFusion uses a pretrained 2D diffusion model as a differentiable loss for 3D optimisation. The SDS gradient update direction is ___.',
      options: [
        'The gradient of the pixel-wise MSE between rendered images and ground-truth photographs',
        'The score function of the diffusion model evaluated at the noisy rendered image, minus the score of a random noise distribution—guiding the 3D representation toward high-likelihood regions of the 2D diffusion model\'s distribution',
        'The negative log-likelihood of the text prompt under a CLIP model applied to the rendered image',
        'The Jacobian of the rendering function with respect to the NeRF density field',
      ],
      correctAnswer: 1,
      explanation: 'SDS gradient: \\nabla_\\theta L_SDS = E_{t,\\epsilon}[w(t)(\\epsilon_\\phi(x_t; y, t) − \\epsilon) \\cdot \\partialx/\\partial\\theta], where \\epsilon_\\phi is the diffusion model\'s predicted noise and \\epsilon is the actual noise added. The term (\\epsilon_\\phi − \\epsilon) is a "denoising direction" pointing toward samples consistent with text y. This gradient, backpropagated through rendering \\partialx/\\partial\\theta, updates the 3D representation without needing a 3D dataset.',
      hints: [
        'SDS: "if this rendered view doesn\'t look like it was sampled from the diffusion model, update the 3D scene to make it more likely."',
        'No 3D GT needed—the 2D diffusion model provides the supervisory signal via its score function.',
      ],
    },
  ],
};

Object.assign(questions, additionalScimlQuestions);

const extraScimlQuestions: Record<string, Question[]> = {
  "pinns-advanced": [
    {
      id: "q-sciml-extra-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A PINN trained on the 2D Navier-Stokes equations fails to converge: the residual loss decreases but the boundary condition loss stagnates. Which adaptive strategy is theoretically grounded in spectral analysis of the NTK to fix this?",
      options: [
        "Increase the number of collocation points in the interior domain and decrease boundary points",
        "Set the boundary loss weight lambda_b = max_k(lambda_k^NTK) / mean(lambda_b^NTK), where lambda^NTK denotes the NTK eigenvalue spectrum of each loss term, equalizing effective learning rates",
        "Switch from Adam to SGD optimizer with momentum 0.99",
        "Replace the tanh activation with ReLU to prevent gradient saturation at boundary points",
      ],
      correctAnswer: 1,
      explanation: "Wang et al. (2021) showed that the rate of convergence of each PINN loss term is controlled by the eigenvalues of the corresponding NTK block. When lambda^NTK eigenvalues for the boundary loss are much smaller than those for the residual loss, the boundary term learns much more slowly. The NTK-based adaptive weighting scheme equalizes these by scaling lambda_b propto max(lambda_r^NTK) / mean(lambda_b^NTK), making all terms converge at comparable rates.",
      hints: [
        "The NTK eigenvalue governs how fast gradient descent reduces a particular loss component — small eigenvalues mean slow learning for that term.",
        "Simply increasing lambda_b by a fixed constant is ad hoc; the NTK provides the theoretically correct scaling factor.",
      ],
    },
    {
      id: "q-sciml-extra-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Residual point placement in PINNs affects training quality. Which placement strategy has been shown to outperform uniform random sampling for PDEs with sharp gradients or thin boundary layers?",
      options: [
        "Uniform grid sampling with dx = 1/N in each spatial dimension",
        "Latin Hypercube Sampling (LHS) to maximize coverage of the domain",
        "Adaptive resampling that places more residual points in regions of high PDE residual, such as the RAR (Residual-Adaptive Refinement) method",
        "Gaussian random sampling centered at the domain centroid",
      ],
      correctAnswer: 2,
      explanation: "RAR (Lu et al., 2021) periodically evaluates the PDE residual across the domain and adds new collocation points in high-residual regions. This focuses computational effort on regions where the network violates the PDE most strongly, analogous to mesh refinement in finite element methods. For convection-dominated problems or solutions with shocks, uniform sampling wastes capacity on smooth regions while undersampling critical gradients.",
      hints: [
        "A thin boundary layer occupies a tiny fraction of the domain — uniform sampling allocates proportionally few points there, causing poor resolution.",
        "RAR is iterative: train briefly, evaluate residuals everywhere, add points in high-residual regions, continue training — analogous to adaptive mesh refinement.",
      ],
    },
    {
      id: "q-sciml-extra-3",
      type: "true-false",
      difficulty: "medium",
      question: "Extended PINNs (XPINNs) decompose the spatial-temporal domain into non-overlapping subdomains, training separate neural networks on each subdomain with interface conditions enforcing continuity, enabling parallelization and better scaling to large domains.",
      correctAnswer: "True",
      explanation: "XPINNs (Jagtap & Karniadakis, 2020) partition the domain and train local networks with: (1) the PDE residual loss within each subdomain, (2) interface conditions requiring continuity of the solution and its normal derivatives at shared boundaries. This divide-and-conquer approach is embarrassingly parallelizable across subdomains, handles large domains that a single network cannot represent well, and can adaptively refine subdomain placement.",
      hints: [
        "A single PINN over a large 3D domain requires a huge network to represent the solution everywhere — XPINNs use smaller, local networks.",
        "Interface conditions are the key engineering challenge: the normal derivative must match on both sides of the interface — this is analogous to FEM element interfaces.",
      ],
    },
    {
      id: "q-sciml-extra-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For inverse problems using PINNs (e.g., inferring the diffusivity field nu(x) in \\partialu/\\partialt = nu(x) * \\partial\\^2u/\\partialx\\^2), what modification is required when nu(x) is a spatially varying unknown function rather than a scalar?",
      options: [
        "nu(x) cannot be identified by PINNs — only scalar constants are learnable as PINN parameters",
        "nu(x) is represented as a second neural network n_phi(x) trained jointly with u_theta(x,t), with the physics loss enforcing \\partialu_theta/\\partialt = n_phi(x) * \\partial\\^2u_theta/\\partialx\\^2 at collocation points",
        "nu(x) is approximated by piecewise constants on a user-defined spatial grid, with the grid values as learnable parameters",
        "nu(x) is inferred by symbolic regression on the residuals of a forward PINN trained with a guessed nu value",
      ],
      correctAnswer: 1,
      explanation: "When the unknown is a function rather than a scalar, it is parameterized as a second neural network n_phi(x) (or a Gaussian process). The physics loss L_r = (1/N_r) sum |\\partialu_theta/\\partialt - n_phi(x) * \\partial\\^2u_theta/\\partialx\\^2|^2 is minimized jointly over theta and phi, with a data loss L_data anchoring u_theta to observations. This two-network approach can recover smooth spatially varying coefficient fields from sparse measurements.",
      hints: [
        "The unknown function nu(x) must be parameterized — a neural network is the natural choice for a smooth, nonlinear function approximator.",
        "Joint optimization of both networks requires careful weighting between the physics loss and data loss to avoid trivial solutions.",
      ],
    },
  ],
  "fno-deeponet": [
    {
      id: "q-sciml-extra-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Fourier Neural Operator (FNO) applies a truncated Fourier transform with R retained modes. What is the computational complexity of the FNO's Fourier layer for input of size N (number of grid points), and what makes it resolution-invariant?",
      options: [
        "O(N^2) due to the dense convolution in the spatial domain; resolution invariance comes from zero-padding higher-frequency modes",
        "O(N log N) for the FFT plus O(R * d) for the mode multiplication; resolution invariance comes from the fact that the learned weights W_R operate on fixed R frequency modes regardless of N",
        "O(R^2) due to the all-pairs attention between retained Fourier modes; resolution invariance is a side effect of the attention mechanism",
        "O(N * R) for scanning each grid point against each mode; resolution invariance requires retraining for each new resolution",
      ],
      correctAnswer: 1,
      explanation: "FNO applies FFT (O(N log N)), multiplies the R lowest Fourier modes by learned complex weight tensors W_R (O(R * d_in * d_out) — independent of N), then applies inverse FFT (O(N log N)). Total: O(N log N). Resolution invariance: the same W_R weights apply at any resolution N because they parameterize R fixed frequency modes — a coarser or finer grid simply uses more or fewer of the Fourier basis functions beyond R, which are zeroed out.",
      hints: [
        "The FFT always produces N modes; FNO keeps only the R lowest, multiplies by learned weights, zeros the rest, and transforms back.",
        "The weights W_R have shape (R, d_in, d_out) — this is fixed regardless of grid resolution N, giving resolution invariance.",
      ],
    },
    {
      id: "q-sciml-extra-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DeepONet (Lu et al., 2021) learns operators by decomposing the output function into a basis. What are the 'branch net' and 'trunk net' in DeepONet, and what does each encode?",
      options: [
        "Branch net processes the query point x where the output is evaluated; trunk net processes the input function u values at fixed sensor locations",
        "Branch net encodes the input function u evaluated at fixed sensor points into a coefficient vector; trunk net encodes the query point x into a basis function vector; output is their dot product",
        "Branch net and trunk net are identical networks applied to the input function at different scales for multi-resolution processing",
        "Branch net is a recurrent network processing the input function sequentially; trunk net is a feed-forward network for the output domain",
      ],
      correctAnswer: 1,
      explanation: "DeepONet factorizes the output function as G(u)(y) = sum_k b_k(u(x_1),...,u(x_m)) * t_k(y). The branch net maps the input function's sensor readings {u(x_i)} to coefficients {b_k}, encoding 'which operator is being applied'. The trunk net maps query points y to basis functions {t_k(y)}, encoding 'where to evaluate'. The dot product b^T * t(y) gives the output value at any query point y, enabling super-resolution and out-of-distribution query evaluation.",
      hints: [
        "Think of b_k as the 'amplitude' of the k-th mode and t_k(y) as the k-th 'basis function' — DeepONet learns both from data.",
        "The universal approximation theorem for operators guarantees this factorization can approximate any continuous operator given sufficient network capacity.",
      ],
    },
    {
      id: "q-sciml-extra-7",
      type: "true-false",
      difficulty: "medium",
      question: "Neural operators like FNO and DeepONet learn mappings between function spaces (infinite-dimensional), whereas standard neural networks learn mappings between finite-dimensional vector spaces, making neural operators fundamentally capable of discretization-invariant predictions.",
      correctAnswer: "True",
      explanation: "Neural operators approximate operators G: U -> V between function spaces, where U and V are infinite-dimensional (e.g., L^2 spaces). The learned operator can then be evaluated at any discretization of the input/output domain. Standard neural networks map R^n -> R^m with fixed input/output dimensions — changing the grid resolution requires retraining. Neural operators achieve discretization invariance by parameterizing the operator kernel rather than the discrete matrix.",
      hints: [
        "Function space learning: the operator maps a function (continuous object) to another function, regardless of how either is discretized.",
        "In practice, FNO inputs must be on a regular grid; DeepONet is more flexible, accepting arbitrary sensor locations for the input function.",
      ],
    },
    {
      id: "q-sciml-extra-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When comparing FNO to a PINN for solving parametric PDEs (e.g., the Navier-Stokes equations for many different viscosity values), what is the key advantage of FNO?",
      options: [
        "FNO enforces the PDE exactly at training points via hard constraints, while PINNs only approximately satisfy the PDE",
        "FNO amortizes the cost over many PDE instances: once trained, it predicts solutions for new parameters in milliseconds without retraining, while a PINN must be re-optimized for each new parameter setting",
        "FNO uses smaller networks (fewer parameters) than PINNs because Fourier modes provide a compact solution basis",
        "FNO can handle discontinuous solutions (shocks) better than PINNs because FFT naturally represents discontinuities",
      ],
      correctAnswer: 1,
      explanation: "PINNs are instance-specific: each new PDE parameter (e.g., new viscosity nu) requires a new optimization from scratch, taking minutes to hours. FNO is trained once on a distribution of PDE parameters and learns to map (parameter, initial condition) -> solution in a single forward pass at inference time. This amortized cost makes FNO orders of magnitude faster for parametric PDEs, enabling real-time PDE surrogates for design optimization or control.",
      hints: [
        "PINN training is an optimization for one specific PDE instance — like solving a single system of equations.",
        "FNO training is like learning a lookup table over the parameter space — inference is just a forward pass.",
      ],
    },
  ],
  "uncertainty-quantification-advanced": [
    {
      id: "q-sciml-extra-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Bayesian neural networks (BNNs) place a prior over weights and perform inference over the posterior p(W|D). For scientific ML with large networks, exact posterior inference is intractable. Which approximate inference method uses local reparameterization and factored Gaussian posterior q(W)?",
      options: [
        "Hamiltonian Monte Carlo (HMC) with NUTS adaption",
        "Variational inference with the mean-field approximation: q(W) = prod_i N(mu_i, sigma_i^2), optimizing the ELBO via the reparameterization trick",
        "Dropout-based inference treating dropout masks as approximate posterior samples",
        "Laplace approximation computing the Hessian of the loss at the MAP estimate",
      ],
      correctAnswer: 1,
      explanation: "Mean-field variational inference parameterizes q(W) as a factored Gaussian with learnable means mu_i and variances sigma_i^2 (doubling the number of parameters). The ELBO L = E_q[log p(D|W)] - KL(q||p) is optimized via the reparameterization trick: W = mu + sigma * epsilon, epsilon ~ N(0,I), enabling unbiased gradient estimates. This is 'Bayes by Backprop' (Blundell et al., 2015) and scales to large networks, unlike HMC.",
      hints: [
        "The reparameterization trick makes the stochastic ELBO differentiable w.r.t. mu and sigma — critical for gradient-based optimization.",
        "Mean-field assumes weight independence — posterior correlations between weights are ignored, which is a key approximation error.",
      ],
    },
    {
      id: "q-sciml-extra-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Deep ensembles for uncertainty quantification train M independent neural networks with random initializations. What does the ensemble variance capture, and why does it outperform a single BNN with MC dropout?",
      options: [
        "Ensemble variance captures only aleatoric (data) uncertainty; MC dropout captures both aleatoric and epistemic uncertainty",
        "Ensemble variance captures epistemic uncertainty through the diversity of M independently converged solutions; the diversity comes from different loss landscape basins, giving better calibration than a single BNN confined to one basin",
        "Deep ensembles are always worse-calibrated than BNNs but cheaper to train, making them a pragmatic trade-off",
        "Ensemble variance captures only the variance due to different random seeds and is not a meaningful uncertainty measure",
      ],
      correctAnswer: 1,
      explanation: "Lakshminarayanan et al. (2017) showed that deep ensembles produce well-calibrated uncertainty by averaging M models that converge to different local optima in the loss landscape (different basins correspond to different function hypotheses). MC dropout samples within one basin, producing less diverse predictions. On out-of-distribution detection benchmarks, deep ensembles consistently outperform single-BNN MC dropout, at the cost of M times more memory and inference time.",
      hints: [
        "Different random initializations lead to different loss landscape basins — these represent genuinely different function hypotheses.",
        "MC dropout is like sampling small perturbations around one point in weight space; ensembles sample from multiple distant points.",
      ],
    },
    {
      id: "q-sciml-extra-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Conformal prediction provides distribution-free coverage guarantees for scientific ML. For a regression task predicting molecular energies, what does the (1-alpha)-conformal prediction interval guarantee?",
      options: [
        "The interval contains the true energy with probability (1-alpha) under the model's posterior predictive distribution",
        "For any new test molecule drawn exchangeably with the calibration set, the prediction interval covers the true energy with marginal probability at least (1-alpha), without assuming any distribution for the residuals",
        "The interval is the smallest set containing (1-alpha) fraction of the training set labels",
        "The interval is calibrated so that (1-alpha) fraction of ensemble member predictions fall within it",
      ],
      correctAnswer: 1,
      explanation: "Conformal prediction (Vovk et al.) computes nonconformity scores on a held-out calibration set, then constructs prediction intervals at the (ceil((n+1)(1-alpha))/n)-th empirical quantile of calibration scores. The key guarantee: for any exchangeable test point, P(y_test in C(x_test)) >= 1-alpha — marginal coverage, requiring no distributional assumptions on residuals. This is stronger than Bayesian credible intervals, which only hold asymptotically under correct model specification.",
      hints: [
        "Conformal prediction is model-agnostic: it can wrap any ML model (neural network, random forest, PINN) to give valid coverage guarantees.",
        "The exchangeability assumption (test and calibration data from the same distribution) is the only requirement — much weaker than Gaussian residuals.",
      ],
    },
    {
      id: "q-sciml-extra-12",
      type: "true-false",
      difficulty: "medium",
      question: "For scientific ML applications, epistemic uncertainty (model uncertainty from limited data) should decrease as more training data is added, whereas aleatoric uncertainty (data noise) remains constant regardless of dataset size.",
      correctAnswer: "True",
      explanation: "Epistemic uncertainty reflects what the model doesn't know due to limited training data — more data reduces this by constraining the posterior over model parameters. Aleatoric uncertainty reflects inherent noise in measurements or the physical system (e.g., quantum noise in molecular energy measurements) and cannot be reduced by collecting more data. Disentangling these two types is critical in scientific ML: epistemic uncertainty guides active learning (query where the model is uncertain), while aleatoric uncertainty sets the floor of achievable prediction accuracy.",
      hints: [
        "Aleatoric: if you repeated the same experiment 1000 times and still got different energy values, that is aleatoric uncertainty — irreducible.",
        "Epistemic: if two models trained on different subsets disagree, that disagreement is epistemic — more data would force agreement.",
      ],
    },
    {
      id: "q-sciml-extra-13",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Laplace approximation for BNN posterior estimation computes the Hessian of the training loss at the MAP solution. What is the primary computational challenge, and how do modern Laplace approximations (like the Kronecker-factored Laplace) address it?",
      options: [
        "The Hessian has O(P^2) entries for P parameters; Kronecker-factored approximations (KFAC) approximate each layer's Hessian block as a Kronecker product of two smaller matrices, reducing storage to O(P) and enabling tractable sampling",
        "The Hessian requires computing third-order derivatives; KFAC uses Taylor expansion to approximate these with second-order terms",
        "The MAP solution is not unique for neural networks; Laplace approximation averages over multiple MAP solutions found by different initializations",
        "The Hessian computation requires the full dataset; mini-batch Hessian estimates introduce bias that KFAC corrects via importance reweighting",
      ],
      correctAnswer: 0,
      explanation: "For a network with P parameters, the full Hessian H = d^2 L / dW^2 has P^2 entries — infeasible for modern networks (P ~ 10^8). KFAC (Martens & Grosse, 2015) approximates the Fisher information (approximate Hessian) block-diagonally per layer, with each layer's block approximated as A ⊗ G where A and G are smaller matrices. The Kronecker structure reduces storage from O(P^2) to O(P) and enables fast matrix-vector products for posterior sampling.",
      hints: [
        "KFAC exploits the structure of neural network gradients: for a linear layer, the gradient is an outer product of input activations and output gradients.",
        "Kronecker product A ⊗ G: (A ⊗ G)^{-1} = A^{-1} ⊗ G^{-1} — inverse is cheap when A and G are small.",
      ],
    },
  ],
  "equivariant-networks-advanced": [
    {
      id: "q-sciml-extra-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "E(3)-equivariant neural networks for molecular property prediction must satisfy equivariance under the E(3) group (rotations, reflections, translations). What does equivariance formally mean for a layer f in this context?",
      options: [
        "f(g * x) = f(x) for all group elements g in E(3), meaning the output is invariant to E(3) transformations of the input",
        "f(g * x) = g * f(x) for all g in E(3), meaning rotating/reflecting/translating the input produces the correspondingly transformed output — the layer commutes with the group action",
        "f is a homomorphism: f(g * x) = f(g) * f(x) for all group elements g",
        "f's Jacobian df/dx is orthogonal for all inputs x, ensuring the network preserves distances",
      ],
      correctAnswer: 1,
      explanation: "Equivariance: f(g * x) = g * f(x) — if you rotate the molecule and then apply f, you get the same result as applying f first and then rotating the output. For invariant outputs (e.g., energy), g acts trivially: g * scalar = scalar, reducing to f(g*x) = f(x). For equivariant outputs (e.g., forces, dipole vectors), g acts as the corresponding rotation. Networks like SEGNN, PaiNN, NequIP, and MACE enforce this algebraically using irreducible representations of SO(3).",
      hints: [
        "Invariance is a special case of equivariance where the output representation is trivial (scalars don't transform under rotation).",
        "Forces must be equivariant: rotating a molecule rotates its forces. Energy must be invariant: rotating a molecule doesn't change its energy.",
      ],
    },
    {
      id: "q-sciml-extra-15",
      type: "multiple-choice",
      difficulty: "hard",
      question: "SE(3)-Transformers (Fuchs et al., 2020) extend self-attention to 3D geometric data. How do SE(3)-Transformers achieve equivariance in the attention mechanism?",
      options: [
        "By using relative positions r_ij = x_i - x_j as attention keys, combined with type-l equivariant features as values, ensuring attention weights are rotation-invariant and value aggregation is equivariant",
        "By applying a standard transformer and then post-hoc rotating the outputs to match the input orientation",
        "By restricting the attention to be purely based on inter-atomic distances (invariant scalars), discarding all directional information",
        "By using quaternion representations for all intermediate features, which naturally transform correctly under rotation",
      ],
      correctAnswer: 0,
      explanation: "SE(3)-Transformers compute attention weights from rotation-invariant quantities (distances, dot products of type-0 features) and aggregate equivariant feature vectors (type-l spherical harmonics). The key: attention weights \\alpha_ij are invariant (scalars), while values V_j are type-l equivariant features. The update h_i = sum_j \\alpha_ij * V_j inherits the equivariance of V_j. Basis functions from irreducible representations of SO(3) parameterize the equivariant kernels.",
      hints: [
        "Self-attention becomes equivariant when keys/queries compute invariant scores and values carry equivariant representations.",
        "Spherical harmonics Y_l^m are the irreducible representations of SO(3) — they transform in a known, well-defined way under rotation.",
      ],
    },
    {
      id: "q-sciml-extra-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Graph Neural Networks (GNNs) for molecular property prediction use message passing. What fundamental limitation of standard GNNs motivates the use of directional/geometric GNNs like DimeNet or SphereNet?",
      options: [
        "Standard GNNs cannot handle graphs with cycles, making them unable to process ring-containing molecules",
        "Standard GNNs aggregate messages using only inter-atomic distances (invariant scalars), making them unable to distinguish molecular configurations with the same distance matrix but different 3D geometries (e.g., enantiomers or different conformers)",
        "Standard GNNs cannot be trained on GPUs because graph operations are not parallelizable",
        "Standard GNNs require fixed-size input graphs, making them unable to handle molecules of different sizes",
      ],
      correctAnswer: 1,
      explanation: "Standard message-passing GNNs with radial basis function edge features depend only on pairwise distances {r_ij}, which are insufficient to uniquely determine 3D molecular geometry. Two different 3D configurations can have identical pairwise distance matrices (e.g., different torsion angles where distances between pairs 1-4, 2-4, 3-4 are the same). DimeNet adds bond angles (3-body interactions), SphereNet adds torsion angles (4-body), recovering geometric uniqueness needed for accurate force field prediction.",
      hints: [
        "Distance matrix encodes all pairwise distances but not the relative orientation — two conformers can have the same distances in a reduced subset of pairs.",
        "Adding angles: knowing r_ij, r_jk, and angle theta_ijk uniquely determines the local 3-atom geometry — breaking the distance-only ambiguity.",
      ],
    },
    {
      id: "q-sciml-extra-17",
      type: "true-false",
      difficulty: "easy",
      question: "In equivariant GNNs for molecular force fields, forces can be computed as the negative gradient of the predicted potential energy with respect to atomic positions (-dE/dx_i), automatically guaranteeing energy conservation.",
      correctAnswer: "True",
      explanation: "If an equivariant network predicts a scalar energy E(x_1,...,x_N) that is E(3)-invariant, then F_i = -dE/dx_i is automatically equivariant (a vector that rotates with the molecule) and by construction satisfies F = -grad_x E, guaranteeing energy conservation. This 'energy-conserving' force prediction is used in NequIP, MACE, and SchNet — it is more physically principled than directly predicting forces, which can violate energy conservation.",
      hints: [
        "Force = -gradient of potential energy. If E is invariant and x_i transforms as a vector, then -dE/dx_i transforms as a vector — equivariance follows.",
        "Non-conservative force fields can create or destroy energy during MD simulations, causing unphysical dynamics and trajectory drift.",
      ],
    },
    {
      id: "q-sciml-extra-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "MACE (Multi-Atomic Cluster Expansion, Batatia et al. 2022) achieves high accuracy and efficiency for ML force fields. What is its key architectural innovation over simpler equivariant GNNs?",
      options: [
        "MACE uses a global attention mechanism over all atoms simultaneously instead of local message passing",
        "MACE constructs equivariant message features by taking tensor products of many-body atomic cluster descriptors, enabling high-body-order interactions (equivalent to n-body potentials) within a local message-passing framework",
        "MACE replaces spherical harmonics with learned rotation-equivariant basis functions trained end-to-end",
        "MACE uses a separate transformer network for each element type in the periodic table",
      ],
      correctAnswer: 1,
      explanation: "MACE's message features are constructed by iterated tensor products of equivariant atomic basis functions, generating high-body-order cluster expansion terms (3-body, 4-body, ...) within a single message-passing layer. This corresponds to the Atomic Cluster Expansion (ACE) framework but with learnable coefficients and end-to-end training. High body-order interactions capture complex many-body chemistry (e.g., angle-dependent bonding, ring strain) that low-body-order models miss, giving MACE state-of-the-art accuracy on MD17, rMD17, and ANI benchmarks.",
      hints: [
        "Tensor products of equivariant features produce higher-order equivariant features: (type-l1) x (type-l2) -> sum of type-l features — this encodes multi-body interactions.",
        "A 1-layer MACE with 3 tensor products encodes up to (number of products + 1)-body interactions in a single message, without needing deep networks.",
      ],
    },
  ],
  "neural-operator-extensions": [
    {
      id: "q-sciml-extra-19",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Geo-FNO (Geometry-adaptive Fourier Neural Operator) extends FNO to handle PDEs on irregular geometries. What is the key strategy for handling non-rectangular domains?",
      options: [
        "Using a graph neural network to replace the FFT operations on irregular meshes",
        "Learning a diffeomorphic mapping that deforms the irregular computational domain to a regular rectangular domain where standard FNO can be applied, with the mapping also learned from data",
        "Padding the irregular domain with zeros to create a rectangular domain and applying standard FNO",
        "Applying FNO independently on each triangle in a triangulated mesh",
      ],
      correctAnswer: 1,
      explanation: "Geo-FNO (Li et al., 2023) learns a mapping phi: physical domain -> unit square, applying standard FNO in the latent (computational) domain, then mapping back via phi^{-1}. The mapping phi is parameterized by a neural network and learned jointly with the FNO weights. This enables FNO's spectral efficiency on arbitrary domains (airfoils, organs, terrain) while preserving its resolution invariance property.",
      hints: [
        "This mirrors the isogeometric analysis approach in FEM: compute in a reference domain, map to the physical domain via NURBS or splines.",
        "The learned mapping must be bijective (diffeomorphic) — this is ensured by architecture constraints or regularization on the Jacobian.",
      ],
    },
    {
      id: "q-sciml-extra-20",
      type: "true-false",
      difficulty: "medium",
      question: "Operator learning (FNO, DeepONet) can be applied to time-dependent PDEs by treating time as an additional spatial dimension, enabling autoregressive rollouts where the operator maps the current solution field to the next time step.",
      correctAnswer: "True",
      explanation: "For time-dependent PDEs like Navier-Stokes, FNO can be trained to map u(x,t) -> u(x,t+dt) as a one-step rollout operator. Autoregressively applying this operator over many steps generates long-time predictions. Challenges include error accumulation in autoregressive rollouts (each step's error is the next step's input error). Pushforward training (training with rollout-accumulated inputs) and pushforward regularization improve stability compared to only training on one-step predictions.",
      hints: [
        "One-step training vs. multi-step training: one-step is easier but accumulates errors; multi-step (rollout training) is harder but produces more stable long-time predictions.",
        "Treating time as a spatial dimension is efficient for batch processing but loses the sequential nature of autoregressive prediction.",
      ],
    },
    {
      id: "q-sciml-extra-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the 'operator learning vs. function learning' distinction, and why does it matter for generalization in scientific ML?",
      options: [
        "Function learning trains one model per PDE instance; operator learning trains one model for all instances — generalizing across initial conditions, boundary conditions, and parameters without retraining",
        "Operator learning uses higher-dimensional inputs; function learning uses lower-dimensional inputs",
        "Function learning is supervised; operator learning is self-supervised using PDE residuals as the training signal",
        "Operator learning applies only to linear PDEs; function learning handles nonlinear PDEs",
      ],
      correctAnswer: 0,
      explanation: "Function learning approximates u: R^d -> R^d for a fixed PDE instance (fixed IC/BC/parameters). Operator learning approximates G: U -> V between function spaces — mapping an entire input function (IC, forcing) to the solution function. A trained neural operator can predict solutions for any IC in the training distribution without retraining, amortizing the cost of solving many PDE instances. This is the key scalability advantage for parametric studies, uncertainty quantification, and design optimization.",
      hints: [
        "PINN is function learning: solve one PDE at a time. FNO is operator learning: learn the solution map for a whole family of PDEs.",
        "Operator learning requires a dataset of input-output function pairs; function learning requires only one PDE instance.",
      ],
    },
  ],
  "bayesian-methods-sciml": [
    {
      id: "q-sciml-extra-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Gaussian Process (GP) regression is an exact Bayesian nonparametric method. For N training points and M test points, what is the computational complexity of GP inference, and what approximation is used for large N?",
      options: [
        "O(N log N) for inference via FFT; sparse GPs using M << N inducing points reduce this to O(NM^2)",
        "O(N^3) for Cholesky decomposition of the N\\timesN kernel matrix; sparse GPs (e.g., FITC, SVGP) use M inducing points to reduce complexity to O(NM^2) or O(M^3) with mini-batch training",
        "O(N^2) for the matrix inverse; inducing point methods eliminate this by diagonal approximation",
        "O(N) with conjugate gradient solvers; no approximations are needed for large N",
      ],
      correctAnswer: 1,
      explanation: "Exact GP requires inverting the N\\timesN kernel matrix K, costing O(N^3) for Cholesky factorization and O(N^2) for predictions — infeasible for N > 10^4. Sparse GP methods introduce M << N inducing points {z_m} that summarize the data: FITC approximates p(f|X,y) using the M inducing outputs, reducing complexity to O(NM^2). SVGP (Hensman et al., 2013) uses variational inference with mini-batches, reducing per-step cost to O(M^3) regardless of N, enabling GP scaling to millions of points.",
      hints: [
        "Cholesky factorization of an N\\timesN matrix costs O(N^3) — for N=10^5, this is 10^15 operations, completely infeasible.",
        "Inducing points are 'summary' inputs chosen to span the data distribution; the GP approximation passes through the posterior at these points exactly.",
      ],
    },
    {
      id: "q-sciml-extra-23",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Bayesian optimization for scientific discovery (e.g., materials design), the Expected Improvement (EI) acquisition function balances exploration and exploitation. When does EI favor exploration over exploitation?",
      options: [
        "When the acquisition function value is set manually by the user to a high exploration weight",
        "When the GP posterior variance sigma^2(x) is large at a point x (high uncertainty), EI is high even if the posterior mean mu(x) is below the current best — the wide uncertainty makes improvement likely",
        "EI always prefers the global maximum of the posterior mean, regardless of uncertainty",
        "EI favors exploration only in the first iteration when no data is available",
      ],
      correctAnswer: 1,
      explanation: "EI(x) = E[max(f(x) - f*, 0)] = (mu(x) - f*) * Phi(Z) + sigma(x) * phi(Z), where Z = (mu(x) - f*) / sigma(x), Phi is the normal CDF, phi is the normal PDF, and f* is the current best. In low-uncertainty regions with mu(x) < f*, EI is dominated by the exploitation term (negative Z makes Phi(Z) small). In high-uncertainty regions (large sigma), the phi(Z) * sigma term is large even for mu(x) < f*, driving exploration.",
      hints: [
        "EI decomposes into exploitation (mu - f*) * Phi(Z) and exploration sigma * phi(Z). When sigma is large, exploration dominates.",
        "phi(Z) is the standard normal PDF — it peaks near Z=0, meaning EI is highest when uncertainty is large (sigma makes Z small even for sub-optimal means).",
      ],
    },
    {
      id: "q-sciml-extra-24",
      type: "true-false",
      difficulty: "medium",
      question: "Markov Chain Monte Carlo (MCMC) methods like Hamiltonian Monte Carlo (HMC) produce asymptotically exact samples from the posterior p(W|D) for Bayesian neural networks, unlike variational inference which produces biased approximations.",
      correctAnswer: "True",
      explanation: "HMC (Neal, 2011) simulates Hamiltonian dynamics in weight space, using gradients of log p(W|D) to propose distant, low-autocorrelation samples with high acceptance probability. Given sufficient computation, HMC converges to the true posterior — making it asymptotically exact. Variational inference optimizes a tractable approximate family q(W) which, due to the mean-field or other approximation, can never match the true posterior even with infinite compute. For small networks, HMC-based BNNs (e.g., NUTS) are the gold standard.",
      hints: [
        "MCMC is exact asymptotically because the Markov chain's stationary distribution is the target posterior — but mixing can be slow in high dimensions.",
        "Variational inference optimizes the ELBO, which is a lower bound; the gap between ELBO and true log-evidence measures the approximation error.",
      ],
    },
    {
      id: "q-sciml-extra-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Score-based conformal prediction for scientific ML requires a nonconformity score function A(x, y). For a regression task predicting molecular energies with a heteroscedastic model outputting mu(x) and sigma(x), which nonconformity score gives locally adaptive intervals?",
      options: [
        "A(x, y) = |y - mu(x)|, giving intervals of uniform width across the input space",
        "A(x, y) = |y - mu(x)| / sigma(x), normalizing residuals by the local predicted uncertainty, giving wider intervals where sigma(x) is large and tighter intervals where sigma(x) is small",
        "A(x, y) = (y - mu(x))^2 / sigma(x)^2, equivalent to the chi-squared statistic",
        "A(x, y) = -log p(y|mu(x), sigma(x)), the negative log-likelihood under the predicted distribution",
      ],
      correctAnswer: 1,
      explanation: "The normalized conformal score A(x,y) = |y - mu(x)| / sigma(x) adapts interval width to local uncertainty: in high-uncertainty regions (large sigma(x)), the denominator is large, so the raw residual |y - mu(x)| must be larger to achieve the same quantile — producing wider intervals. In low-uncertainty regions, intervals are tighter. The conformal quantile q_alpha is computed on calibration normalized residuals, and the prediction interval is [mu(x) - q_alpha * sigma(x), mu(x) + q_alpha * sigma(x)], giving locally adaptive coverage.",
      hints: [
        "Without normalization, the interval has fixed half-width q_alpha regardless of whether the model is confident or uncertain at x — this is poorly calibrated locally.",
        "With normalization, the interval automatically expands in regions where the model knows it is uncertain — a much more informative uncertainty estimate.",
      ],
    },
  ],
  "graph-ml-molecules-advanced": [
    {
      id: "q-sciml-extra-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The Weisfeiler-Lehman (WL) graph isomorphism test sets an expressiveness ceiling for standard message-passing GNNs. What does this mean for molecular GNNs?",
      options: [
        "GNNs cannot distinguish any two molecules with the same molecular formula",
        "GNNs are as powerful as the 1-WL test: they cannot distinguish graphs that 1-WL cannot distinguish, such as certain pairs of non-isomorphic graphs with identical neighborhood histograms — including some distinct molecular graphs",
        "GNNs can perfectly identify all molecules because molecular graphs have atom type labels that 1-WL does not have",
        "The WL test only applies to undirected unweighted graphs; molecular graphs with bond types are exempt from this limitation",
      ],
      correctAnswer: 1,
      explanation: "Xu et al. (2019) proved that standard MPNN GNNs are at most as expressive as the 1-WL test: two graphs that fool 1-WL also fool any MPNN. For molecules, 1-WL fails to distinguish certain non-isomorphic graphs with identical local neighborhood structures — e.g., some pairs of molecules that differ only in global topology. Higher-order GNNs (k-WL), ring-based features, or geometric (3D) information are needed to distinguish these cases.",
      hints: [
        "1-WL works by iteratively hashing each node's neighborhood multiset — it fails when two non-isomorphic graphs have identical neighborhood hash sequences.",
        "Atom type labels help but don't fully fix the problem — some distinct molecular graphs still have identical labeled 1-WL colorings.",
      ],
    },
    {
      id: "q-sciml-extra-27",
      type: "true-false",
      difficulty: "easy",
      question: "Attention-based GNNs like Graph Attention Networks (GAT) can learn to assign different importance weights to different neighboring atoms when aggregating messages, unlike isotropic GNNs that treat all neighbors equally.",
      correctAnswer: "True",
      explanation: "GAT (Velickovic et al., 2018) computes attention weights alpha_ij = softmax(e_ij) where e_ij = LeakyReLU(a^T [W h_i || W h_j]) — the attention score between atom i and neighbor j depends on both their features. This allows the network to attend more to chemically important neighbors (e.g., electronegative atoms in polar bonds) and less to distant or irrelevant atoms, in contrast to sum/mean aggregation GNNs that weight all neighbors equally.",
      hints: [
        "In a benzene ring, all carbons are equidistant — but a functional group attached to one position is more chemically relevant. GAT can learn to attend to it more.",
        "Multi-head attention averages across K independent attention functions, providing diverse views of the neighborhood — analogous to multi-head self-attention in Transformers.",
      ],
    },
    {
      id: "q-sciml-extra-28",
      type: "multiple-choice",
      difficulty: "hard",
      question: "AlphaFold2's architecture for protein structure prediction combines multiple attention mechanisms. What is the role of the 'Evoformer' block's 'triangle attention' (triangle multiplicative update and triangle self-attention)?",
      options: [
        "Triangle attention processes the sequence of residue tokens in triplets to capture three-body residue interactions",
        "Triangle attention updates the pairwise residue representation m_ij by aggregating information from all triangles (i,j,k) in the residue graph, enforcing geometric consistency by ensuring that the distance/contact information between residues i-j is consistent with i-k and j-k",
        "Triangle attention is a memory-efficient variant of full self-attention that only attends to residues within a triangular window of the sequence",
        "Triangle attention refers to the three-pronged attention head: one head for sequence, one for structure, one for evolutionary information",
      ],
      correctAnswer: 1,
      explanation: "Evoformer's triangle multiplicative updates compute: m_ij <- m_ij + sum_k gate * m_ik * m_kj (outgoing edges) or m_ij <- m_ij + sum_k gate * m_ki * m_kj (incoming edges). This enforces transitivity in the pairwise distance matrix: if i is close to k and k is close to j, then i-j should be constrained. Triangle self-attention attends over one index of the pair matrix while keeping the other fixed, pooling structural context from all triangles. Together, these create geometrically consistent pairwise representations essential for accurate structure prediction.",
      hints: [
        "A triangle (i,j,k) in the protein graph represents a triple of residues — the distances between all three pairs must be geometrically consistent (triangle inequality).",
        "Triangle updates are essentially a form of outer-product memory: m_ij is updated by combining m_ik and m_jk, propagating structural information through chains of residue pairs.",
      ],
    },
    {
      id: "q-sciml-extra-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In molecular generation with graph neural networks (e.g., JTVAE, GraphVAE), what is a key challenge that atom-by-atom generation methods face compared to fragment-based generation?",
      options: [
        "Atom-by-atom generation requires a different network architecture for each element type",
        "Atom-by-atom generation must ensure generated graphs correspond to valid, chemically synthesizable molecules — validity is not guaranteed because the sequential bond-adding process can produce disconnected, valence-violating, or ring-containing structures that require complex post-processing",
        "Atom-by-atom methods cannot generate molecules with more than 10 heavy atoms due to memory constraints",
        "Atom-by-atom methods produce molecules in SMILES format, which cannot represent complex ring systems",
      ],
      correctAnswer: 1,
      explanation: "Sequential atom/bond generation (e.g., GraphRNN, GCPN) adds atoms and edges step-by-step, but must enforce hard chemical constraints at each step: correct valence (e.g., carbon has at most 4 bonds), no impossible ring systems, and synthesizability. Ensuring these constraints requires constrained decoding or validity filters, and many generated graphs are invalid. JTVAE avoids this by generating in the 'junction tree' space of chemical fragments (rings, chains), which are inherently valid scaffolds — only assembling valid fragments from a predefined vocabulary.",
      hints: [
        "Adding one atom at a time: after each addition, you must check valence constraints, connectivity, and chemical rules — the search space of valid paths is exponentially constrained.",
        "Fragment-based methods (JTVAE, BRICS decomposition) precompute a vocabulary of valid chemical substructures and only connect these — validity by construction.",
      ],
    },
    {
      id: "q-sciml-extra-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Score matching-based diffusion models for molecular conformation generation (e.g., DiffSBDD, EquiDiff) must be equivariant to E(3). Why can standard score matching not be directly applied in Cartesian coordinates for molecule generation?",
      options: [
        "Cartesian coordinates are continuous while diffusion models require discrete inputs",
        "The score function nabla_x log p(x) in Cartesian space is not equivariant — rotating all atomic positions changes the score direction, but the rotated score should equal the rotated original score for a roto-equivariant model; standard Gaussian diffusion in Cartesian coordinates breaks this because the prior N(0,I) is not E(3)-invariant under translation",
        "Cartesian coordinates require computing gradients of the energy function, which is too slow for large molecules",
        "Standard score matching assumes independent noise on each dimension, which would generate molecules with atoms at random positions with no bond structure",
      ],
      correctAnswer: 1,
      explanation: "The problem is two-fold: (1) Translation: N(0,I) in 3N-dimensional Cartesian space assigns different likelihoods to translated copies of the same molecule — the prior is not translation-invariant, so learned scores are biased toward the origin. (2) Rotation: the score function must be SE(3)-equivariant for physical consistency. Solutions include working in internal coordinates (bond lengths, angles, torsions) which are inherently SE(3)-invariant (GeoDiff, Torsional Diffusion), or using equivariant score networks that map coordinates to equivariant vectors (EquiFM, EDM by removing the COM).",
      hints: [
        "Translational invariance fix: center the molecule at its centroid before diffusion — removing the 3 translational degrees of freedom from the prior.",
        "Equivariant score network: the denoising network must output F_i that transforms as a vector under rotation — requiring an E(3)-equivariant architecture like those in NequIP or MACE.",
      ],
    },
  ],
};

Object.assign(questions, extraScimlQuestions);

registerQuestions(questions);
export default questions;
