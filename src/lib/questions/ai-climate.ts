import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "nwp-ml": [
    {
      id: "q-clim-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "PanGu-Weather uses a hierarchical 3D Earth Specific Transformer (3DEST) architecture with separate models for 1h, 3h, 6h, and 24h lead times. What is the key reason for this hierarchical design?",
      options: [
        "Separate models reduce memory usage by sharing no parameters across time horizons",
        "Atmospheric predictability has different dominant spatial scales at short versus long lead times; short-range forecasts require high-resolution mesoscale features while longer horizons are dominated by synoptic-scale dynamics",
        "Different transformer depths are required by meteorological standards bodies for different forecast horizons",
        "Separate models allow different training datasets to be used for each lead time",
      ],
      correctAnswer: 1,
      explanation:
        "PanGu-Weather (Bi et al., 2023) trains four separate 3DEST models for lead times of 1h, 3h, 6h, and 24h. This hierarchical design reflects that atmospheric predictability varies with forecast horizon:\n\n" +
        "\\[\\text{Short-range (1--6h):} \\quad \\text{mesoscale detail dominates, high spatial resolution needed}\\]" +
        "\\[\\text{Long-range (24h+):} \\quad \\text{synoptic-scale patterns dominate}\\]" +
        "\nForecasts for arbitrary horizons are produced by composing model calls (e.g., \\(24h + 6h + 1h = 31h\\)), analogous to binary doubling for representing any integer as a sum of powers of 2.\n\n" +
        "Using a single model for all horizons would require compromising between these conflicting resolution and scale requirements.",
      hints: [
        "The atmosphere has different dominant spatial patterns at short (hours) versus medium (days) timescales. What implications does this have for model design?",
        "PanGu-Weather chains its models like building blocks (24h + 6h + 1h for 31h). This is analogous to representing any integer using powers of 2 — what property makes this composition work?",
      ],
    },
    {
      id: "q-clim-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ML models such as Pangu-Weather and FourCastNet can produce global weather forecasts at a fraction of the computational cost of traditional numerical weather prediction (NWP) models.",
      correctAnswer: "True",
      explanation:
        "ML-based forecast models are trained once on ERA5 reanalysis data, then perform only forward inference at inference time. " +
        "This is fundamentally more efficient than NWP, which must numerically solve the primitive atmospheric equations at each time step:\n\n" +
        "\\[\\frac{\\partial \\mathbf{u}}{\\partial t} + (\\mathbf{u} \\cdot \\nabla)\\mathbf{u} = -\\frac{1}{\\rho}\\nabla p - f\\mathbf{k} \\times \\mathbf{u} + \\mathbf{F}_{\\text{dissipation}}\\]\n\n" +
        "PanGu-Weather generates a 10-day global forecast (0.25° resolution, 13 pressure levels) in approximately 1.4 seconds on a single A100 GPU, compared to thousands of CPU-hours for operational NWP systems like ECMWF's IFS.",
      hints: [
        "Once trained, a neural network performs only forward inference — no iterative numerical solvers are needed. How does this compare to solving differential equations at each time step?",
        "Traditional NWP requires a large HPC cluster; ML models reduce this computational burden dramatically at inference time.",
      ],
    },
    {
      id: "q-clim-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "PanGu-Weather's 3D Earth Specific Transformer (3DEST) modifies standard transformer attention to be \"Earth-specific.\" What specific problem does this Earth-specific modification address?",
      options: [
        "Replacing positional encodings with learned altitude embeddings for each pressure level",
        "Adding latitude-dependent absolute position biases to self-attention to account for Earth's spherical geometry and the non-uniform physical area of latitude bands at different latitudes",
        "Masking attention between land and ocean grid points to prevent spurious correlations",
        "Using separate attention heads for each of the 13 pressure levels to prevent inter-level information mixing",
      ],
      correctAnswer: 1,
      explanation:
        "Standard transformers use uniform positional encodings that do not reflect Earth's spherical geometry. On a regular latitude-longitude grid:\n\n" +
        "\\[\\text{Grid cell area} \\propto \\cos(\\text{latitude})\\]\n\n" +
        "This means grid cells near the poles represent much smaller physical areas than equatorial cells. For example, the 360 grid cells along a latitude circle at 89° span the same longitude range as those at the equator but cover roughly 1/60th the physical area.\n\n" +
        "3DEST incorporates Earth-specific relative position biases in attention that depend on latitude, capturing:\n" +
        "\\[- \\text{Anisotropic atmospheric dynamics (different behavior near poles versus equator)}\\]" +
        "\\[- \\text{Variable grid cell area affecting information propagation}\\]",
      hints: [
        "On a regular lat-lon grid, the 360 cells along a latitude circle near the pole span the same number of degrees as equatorial cells. What is different about these cells?",
        "Atmospheric dynamics near the poles involve fundamentally different physics (e.g., polar vortex, jet stream) than at the equator. How might this affect attention patterns?",
      ],
    },
  ],

  graphcast: [
    {
      id: "q-clim-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "GraphCast represents the global atmosphere using an icosahedral multi-mesh rather than a regular lat-lon grid. What is the primary advantage of this design choice?",
      options: [
        "It reduces the total number of atmospheric variables stored from 227 to 10",
        "The icosahedral mesh has near-uniform cell area across the globe, avoiding the polar singularity and grid-cell area distortion inherent in lat-lon grids",
        "It allows GraphCast to assimilate satellite observations directly without any coordinate transformation",
        "The triangular cells of an icosahedral mesh can represent topography more accurately than rectangular grid cells",
      ],
      correctAnswer: 1,
      explanation:
        "A regular lat-lon grid has a fundamental problem at the poles: as longitude lines converge, the grid cells become extremely small. The cell area is proportional to \\(\\cos(\\text{latitude})\\), which approaches zero at the poles. This causes:\n\n" +
        "\\[- \\text{Numerical instability near poles}\\]" +
        "\\[- \\text{Wasted computation in polar regions (many tiny cells)}\\]" +
        "\\[- \\text{Non-uniform message passing in graph neural networks}\\]" +
        "\n" +
        "GraphCast uses a refined icosahedral mesh created by recursively subdividing the 20 triangular faces of a regular icosahedron and projecting onto the sphere. This produces near-uniform triangular cells across the globe, eliminating the polar singularity.",
      hints: [
        "On a lat-lon grid, cell area is proportional to \\(\\cos(\\text{latitude})\\). What happens at the poles where \\(\\cos(90°) = 0\\)?",
        "An icosahedron has 20 equilateral triangular faces. Recursive subdivision of these faces and projection onto the sphere creates a mesh with what key property?",
      ],
    },
    {
      id: "q-clim-kp2-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "GraphCast was trained on ECMWF's ERA5 reanalysis dataset, which provides gridded historical atmospheric states at 0.25° resolution (~28 km at the equator) covering the period 1979–2018.",
      correctAnswer: "True",
      explanation:
        "GraphCast (Lam et al., DeepMind 2023) was trained on 40 years of ERA5 reanalysis data (1979–2018). Each training example consists of:\n\n" +
        "\\[- \\text{Input: atmospheric state at time } t\\]" +
        "\\[- \\text{Target: atmospheric state at time } t + 6\\text{h}\\]" +
        "\n" +
        "The model learns to auto-regressively predict the next 6-hour atmospheric state for 227 variables across 37 pressure levels. ERA5 (ECMWF's fifth-generation atmospheric reanalysis) is the gold-standard gridded climate dataset, providing consistent, quality-controlled historical weather estimates.",
      hints: [
        "ERA5 is the European Centre for Medium-Range Weather Forecasts' fifth generation reanalysis — essentially a physically consistent, gridded reconstruction of past weather.",
        "0.25° resolution corresponds to roughly 28 km at the equator. Why might this resolution be considered fine for global reanalysis?",
      ],
    },
    {
      id: "q-clim-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GraphCast uses an encoder-processor-decoder architecture with a multi-resolution icosahedral mesh in the processor. How does the multi-resolution mesh enable efficient long-range information propagation?",
      options: [
        "The processor uses a coarse global mesh alongside a fine local mesh; grid-to-mesh and mesh-to-grid mappings allow information to travel long distances in few GNN hops on the coarser levels",
        "The multi-resolution mesh doubles the number of message-passing steps at each resolution level",
        "Coarser mesh levels are used only for ocean variables while finer levels handle atmospheric variables",
        "The encoder compresses all grid points onto a single node that broadcasts global information before the processor runs",
      ],
      correctAnswer: 0,
      explanation:
        "GraphCast's processor runs 16 rounds of GNN message passing on a hierarchy of icosahedral meshes at multiple refinement levels:\n\n" +
        "\\[\\text{Fine mesh:} \\quad \\text{distance per hop} \\approx 100\\text{ km} \\Rightarrow \\text{need thousands of hops to cross the globe}\\]" +
        "\\[\\text{Coarse mesh:} \\quad \\text{distance per hop} \\approx 1000\\text{ km} \\Rightarrow \\text{need tens of hops to cross the globe}\\]" +
        "\n" +
        "Each fine-mesh node is connected to corresponding nodes at all coarser resolutions, creating \"shortcut\" edges for long-range atmospheric teleconnections (e.g., El Nino's effect on North American weather). The decoder then maps mesh outputs back to the lat-lon grid.",
      hints: [
        "On a fine mesh, a GNN message propagates only to nearest neighbors per step. How many such hops are needed to span the globe? A coarser mesh changes this calculation — how?",
        "The multi-mesh connects each fine-mesh node to nodes at all coarser resolutions. What does this connection structure enable that a single-resolution mesh cannot?",
      ],
    },
  ],

  "climate-downscaling": [
    {
      id: "q-clim-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Statistical downscaling in climate science aims to:",
      options: [
        "Reduce the number of climate models used in an ensemble",
        "Generate high-resolution local climate information (e.g., temperature, precipitation) from coarse global climate model output",
        "Compress climate datasets for more efficient storage",
        "Downsample satellite imagery to a lower resolution",
      ],
      correctAnswer: 1,
      explanation:
        "Global climate models (GCMs) typically run at 50--100 km horizontal resolution. However, local impact studies — for agriculture, urban planning, or infrastructure — often require 1--10 km resolution. Statistical downscaling bridges this gap by learning a mapping:\n\n" +
        "\\[\\hat{X}_{\\text{high-res}} = f\\left(X_{\\text{coarse}}\\right)\\]\n\n" +
        "where \\(f\\) is learned from paired coarse-fine historical data. This enables high-resolution projections without running prohibitively expensive fine-grid climate simulations.",
      hints: [
        "Global climate models typically operate at 50--100 km resolution. Local impact studies often need 1--10 km resolution. What bridges this gap?",
        'The word "down" in downscaling refers to going to finer spatial scales. Why might a smaller-scale number represent finer resolution?',
      ],
    },
    {
      id: "q-clim-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deep learning super-resolution methods (e.g., SRCNN, ESRGAN) have been adapted for climate downscaling by treating coarse climate grids as low-resolution images and learning to add fine-scale spatial detail.",
      correctAnswer: "True",
      explanation:
        "Climate fields on a grid are 2D arrays of values — structurally identical to image pixel grids. Methods such as DeepSD and ClimateGAN apply image super-resolution architectures to climate data:\n\n" +
        "\\[I_{\\text{coarse}} \\xrightarrow{\\text{SR model}} \\hat{I}_{\\text{high-res}}\\]\n\n" +
        "These models are trained on paired coarse-fine datasets (e.g., coarse GCM output matched with high-resolution observations) and learn to hallucinate physically plausible fine-scale features consistent with the coarse pattern.",
      hints: [
        "Climate data on a grid is fundamentally a 2D array of values. What other type of data is also represented as 2D arrays of values with spatial structure?",
        "In image super-resolution, the goal is to reconstruct a high-resolution image from a low-resolution version. How does this map to climate data?",
      ],
    },
    {
      id: "q-clim-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge when evaluating deep learning climate downscaling models is that pixel-wise loss functions like MSE tend to produce outputs that:",
      options: [
        "Are too smooth and lack fine-scale variability, suppressing physically important extremes",
        "Have no spatial structure",
        "Cannot be processed by deep learning architectures",
        "Only work for temperature, not precipitation",
      ],
      correctAnswer: 0,
      explanation:
        "Pixel-wise losses like MSE and MAE minimize the expected pixel-level error. For a target \\(y\\) and prediction \\(\\hat{y}\\):\n\n" +
        "\\[\\mathcal{L}_{\\text{MSE}} = \\mathbb{E}\\left[(y - \\hat{y})^2\\right]\\]\n\n" +
        "This loss is minimized by predicting the conditional mean \\(\\hat{y} = \\mathbb{E}[y|x]\\), which averages out variability. The result is overly smooth outputs that:\n\n" +
        "\\[- \\text{Preserve the mean accurately}\\]" +
        "\\[- \\text{Underestimate extremes (heat waves, heavy rainfall)}\\]" +
        "\\[- \\text{Lack physically important fine-scale structure}\\]" +
        "\n" +
        "Perceptual losses, adversarial losses, and physics-informed losses are used to address this.",
      hints: [
        "MSE loss is minimized by the conditional mean. What does this averaging operation do to extreme values in the prediction?",
        "The same 'blurriness' problem appears in image super-resolution with L2 loss. What alternative loss functions are used to produce sharper images?",
      ],
    },
  ],

  "extreme-events": [
    {
      id: "q-clim-kp4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Climate attribution studies use ML to answer which type of question about extreme weather events?",
      options: [
        "Where the next hurricane will make landfall",
        "Whether and by how much human-caused climate change altered the probability or intensity of a specific event",
        "How many people will evacuate during a flood",
        "What the GDP cost of a drought will be",
      ],
      correctAnswer: 1,
      explanation:
        "Event attribution science addresses the counterfactual question: would this extreme event have occurred without anthropogenic climate change, and how much did human forcing change its probability or intensity?\n\n" +
        "\\[P(\\text{event} | \\text{factual climate}) \\quad \\text{vs.} \\quad P(\\text{event} | \\text{counterfactual climate})\\]\n\n" +
        "ML enables rapid detection of attribution-relevant patterns in large climate model ensembles (thousands of simulations), comparing worlds with and without human forcing.",
      hints: [
        "Attribution asks not just 'did this happen?' but 'would it have happened without climate change, and how much did climate change alter its likelihood?'",
        "This requires comparing two worlds: the factual world (with human forcing) versus a counterfactual world (without it).",
      ],
    },
    {
      id: "q-clim-kp4-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Convolutional neural networks (CNNs) have been applied to detect extreme weather patterns (e.g., tropical cyclones, atmospheric rivers) in climate model output.",
      correctAnswer: "True",
      explanation:
        "CNNs excel at identifying spatial patterns in gridded data. Climate model output is structurally identical to image data: a 2D spatial grid of values. By treating climate fields as 'images,' CNN architectures — the same ones used in computer vision — can be applied directly:\n\n" +
        "\\[\\text{Input:} \\quad T(x, y, t), \\; u(x, y, t), \\; v(x, y, t) \\quad \\text{(temperature, wind components)}\\]" +
        "\\[\\downarrow \\text{Conv layers}\\]" +
        "\\[\\text{Output:} \\quad \\text{event label (cyclone / no cyclone)}\\]" +
        "\n" +
        "This enables automated detection across petabytes of climate simulation data.",
      hints: [
        "Climate data on a grid is spatially structured — the same convolution operations that detect edges and features in images can detect spatial weather patterns.",
        "Manual labeling of extreme events is time-consuming; CNNs can automate detection across large climate archives at scale.",
      ],
    },
    {
      id: "q-clim-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Rare extreme events pose a class imbalance problem for ML models. Which approach is commonly used to address this?",
      options: [
        "Undersampling common events and oversampling extremes, or using asymmetric loss functions that penalize missing rare events more heavily",
        "Ignoring rare events in training data to focus on common cases",
        "Using only events with return periods under 10 years",
        "Normalizing all event probabilities to be equal",
      ],
      correctAnswer: 0,
      explanation:
        "A model predicting 'no extreme event' 99% of the time can achieve 99% accuracy if extremes are rare — yet it is completely useless for early warning. This is the class imbalance problem.\n\n" +
        "Data-level solutions:\n" +
        "\\[- \\text{Oversampling: SMOTE generates synthetic minority examples}\\]" +
        "\\[- \\text{Undersampling: remove majority (non-event) samples}\\]" +
        "\n" +
        "Algorithm-level solutions:\n" +
        "\\[- \\text{Focal loss: } \\mathcal{L}_{\\text{focal}} = -(1 - p_t)^\\gamma \\log(p_t) \\text{ — focuses on hard, rare examples}\\]" +
        "\\[- \\text{Asymmetric loss: penalize false negatives more than false positives}\\]",
      hints: [
        "If a model achieves 99% accuracy by predicting 'no extreme' always, what is the problem with this model for early warning applications?",
        "Class imbalance solutions work at either the data level (resampling) or the algorithm level (modifying the loss function). Which approach would you use if you cannot collect more data?",
      ],
    },
  ],

  "earth-system-emulators": [
    {
      id: "q-clim-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Neural Earth System Model (ESM) emulators are trained to replace which computationally expensive component of traditional climate simulations?",
      options: [
        "The data collection instruments",
        "The computationally expensive forward simulation of the full Earth system",
        "The human analysis of climate projections",
        "The storage infrastructure for climate data",
      ],
      correctAnswer: 1,
      explanation:
        "Earth system models simulate the coupled atmosphere, ocean, land surface, and ice using numerically solving partial differential equations:\n\n" +
        "\\[\\frac{\\partial \\mathbf{u}}{\\partial t} = -(\\mathbf{u} \\cdot \\nabla)\\mathbf{u} - f\\mathbf{k} \\times \\mathbf{u} + \\mathcal{F}\\]" +
        "\\[\\frac{\\partial T}{\\partial t} = -\\nabla \\cdot \\mathbf{F}_{\\text{rad}} + \\mathcal{Q}_{\\text{convection}}\\]\n\n" +
        "Running a full ESM for one emissions scenario can take weeks on a supercomputer. ESM emulators learn the input-output mapping:\n\n" +
        "\\[\\hat{\\mathbf{y}} = f_\\theta(\\mathbf{x}; \\text{scenario})\\]\n\n" +
        "Enabling rapid climate projections at a fraction of the computational cost.",
      hints: [
        "Running a full ESM for one scenario can take weeks on a supercomputer. An emulator can produce similar outputs in what timeframe?",
        "Emulators enable large ensemble studies (thousands of runs) that would be infeasible with the full model. Why might we need so many runs?",
      ],
    },
    {
      id: "q-clim-kp5-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ESM emulators trained on one emissions scenario can be directly applied without modification to very different scenarios far outside their training distribution.",
      correctAnswer: "False",
      explanation:
        "ML models generalize within the distribution they were trained on. For ESM emulators:\n\n" +
        "\\[\\text{Training distribution:} \\quad \\Delta T \\in [1.5^\\circ\\text{C}, 4^\\circ\\text{C}] \\text{ warming}\\]" +
        "\\[\\text{Test distribution:} \\quad \\Delta T > 6^\\circ\\text{C} \\text{ (extreme scenario)}\\]\n\n" +
        "When inputs are far outside training data, models may extrapolate catastrophically. An emulator trained on moderate warming scenarios may fail to capture tipping point behaviors (e.g., ice sheet collapse, permafrost thaw) that emerge only at high warming levels.\n\n" +
        "This is a form of distribution shift requiring careful validation and domain adaptation.",
      hints: [
        "ML models generalize within the distribution they were trained on. What happens when inputs are very different from anything in training data?",
        "An emulator trained on 1.5–4°C warming scenarios may extrapolate poorly to a 6°C scenario. What physical processes become dominant at very high warming levels that may not appear in moderate scenarios?",
      ],
    },
    {
      id: "q-clim-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ClimaX (Nguyen et al., 2023) is a foundation model for climate science. What training strategy allows it to generalize across many different climate tasks?",
      options: [
        "Supervised training on a single labeled climate dataset",
        "Pre-training on diverse climate and weather datasets using masked prediction (self-supervised), then fine-tuning on downstream tasks",
        "Reinforcement learning with reward signals from weather stations",
        "Zero-shot inference without any task-specific training",
      ],
      correctAnswer: 1,
      explanation:
        "ClimaX uses a BERT-style masked token prediction pre-training objective on multiple heterogeneous climate datasets (ERA5, CMIP6, etc.):\n\n" +
        "\\[\\mathcal{L}_{\\text{MAE}} = \\mathbb{E}\\left[\\|\\text{Decoder}(\\text{Encoder}(\\mathbf{x}_{\\text{masked}})) - \\mathbf{x}_{\\text{original}}\\|^2\\right]\\]\n\n" +
        "The model learns general atmospheric representations by predicting randomly masked patches of climate data. Pre-training on diverse datasets enables the model to learn generalizable features. Fine-tuning on hundreds to thousands of labeled samples then achieves strong performance on downstream tasks:\n\n" +
        "\\[- \\text{Weather forecasting}\\]" +
        "\\[- \\text{Climate downscaling}\\]" +
        "\\[- \\text{Projection under new scenarios}\\]",
      hints: [
        "Foundation models in NLP use self-supervised pre-training on large unlabeled corpora, then task-specific fine-tuning. How does ClimaX apply this paradigm to climate data?",
        "The diversity of pre-training data across different climate datasets and variables enables what key property for downstream tasks?",
      ],
    },
  ],

  "solar-forecasting": [
    {
      id: "q-clim-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which meteorological variable is the primary input for machine learning models that forecast photovoltaic (PV) power output?",
      options: [
        "Wind speed at hub height of a wind turbine",
        "Global Horizontal Irradiance (GHI) or Direct Normal Irradiance (DNI), which measure solar radiation at the surface",
        "Sea surface temperature",
        "Soil moisture content",
      ],
      correctAnswer: 1,
      explanation:
        "Photovoltaic panels convert solar radiation directly into electricity. The power output is approximately:\n\n" +
        "\\[P_{\\text{PV}} = GHI \\cdot A \\cdot \\eta\\]\n\n" +
        "where \\(A\\) is panel area and \\(\\eta\\) is efficiency. GHI (Global Horizontal Irradiance) is the total solar radiation on a horizontal surface; DNI (Direct Normal Irradiance) is used for concentrating solar systems. ML models forecast irradiance from NWP outputs, satellite imagery, or sky camera images, then convert to power using efficiency curves.",
      hints: [
        "Photovoltaic panels convert light energy directly to electricity. What measure of light reaching the surface is most relevant for predicting power output?",
        "GHI (global horizontal irradiance) is the total solar radiation on a horizontal surface — why is this the standard input for flat PV panel models?",
      ],
    },
    {
      id: "q-clim-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Sky imagery from ground-based cameras combined with CNNs can forecast solar irradiance accurately up to several hours ahead.",
      correctAnswer: "False",
      explanation:
        "Sky cameras capture a local field of view (typically 180° or 360° hemispheric images). Clouds move at typical speeds of 5--20 m/s:\n\n" +
        "\\[\\text{Forecast horizon} \\approx \\frac{\\text{camera range}}{\\text{cloud speed}} \\approx \\frac{10\\text{ km}}{10\\text{ m/s}} \\approx 1000\\text{ s} \\approx 15\\text{ minutes}\\]\n\n" +
        "Beyond this horizon, clouds have moved out of the camera's field of view. Sky cameras therefore excel at nowcasting (0--30 minutes) but cannot provide reliable multi-hour ahead forecasts. For longer horizons, NWP model output or satellite data is required.",
      hints: [
        "Sky cameras capture a local view of the sky. Clouds move at 5--20 m/s — how far can they travel in one hour? Is this within a typical sky camera's field of view?",
        "The forecasting horizon of sky cameras is physically limited by the time it takes clouds to traverse the camera's field of view. What data source is needed for multi-hour ahead forecasts?",
      ],
    },
    {
      id: "q-clim-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Probabilistic solar forecasting is preferred over deterministic point forecasts for grid integration. What is the key reason?",
      options: [
        "Probabilistic forecasts are computationally easier to produce",
        "Grid operators require uncertainty quantification for optimal reserve scheduling, storage dispatch, and risk-aware decision making under uncertainty",
        "Deterministic forecasts are not permitted in electricity markets",
        "Probabilistic forecasts always have lower mean absolute error than deterministic forecasts",
      ],
      correctAnswer: 1,
      explanation:
        "A deterministic forecast says '500 MW' but provides no information about uncertainty. A probabilistic forecast might say:\n\n" +
        "\\[\\hat{y} = 500\\text{ MW}, \\quad P_{90}(y \\in [460, 540]\\text{ MW}) = 90\\%\\]\n\n" +
        "Grid operators must make risk-aware decisions about:\n\n" +
        "\\[- \\text{Spinning reserves (backup capacity to cover shortfalls)}\\]" +
        "\\[- \\text{Storage dispatch (when to charge/discharge)}\\]" +
        "\\[- \\text{Ancillary services (frequency regulation)}\\]\n\n" +
        "All of these require knowing not just the expected output but the full distribution of possible outcomes.",
      hints: [
        'A forecast saying "500 MW \\pm 50 MW" provides actionable uncertainty information. Why is this more useful than just "500 MW" when deciding how much backup capacity to hold?',
        "Reserve scheduling is fundamentally an economic decision under uncertainty. What specific information does a grid operator need to make this decision optimally?",
      ],
    },
  ],

  "wind-forecasting": [
    {
      id: "q-clim-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Wind power output \\(P\\) is related to wind speed \\(v\\) by which physical relationship?",
      options: ["\\(P \\propto v\\)", "\\(P \\propto v^2\\)", "\\(P \\propto v^3\\)", "\\(P \\propto \\sqrt{v}\\)"],
      correctAnswer: 2,
      explanation:
        "Wind power follows from the kinetic energy flux through a turbine rotor. The power extracted from the wind is:\n\n" +
        "\\[P = \\frac{1}{2} \\eta \\rho A v^3\\]\n\n" +
        "where:\n" +
        "\\[- \\eta = \\text{blade efficiency (Betz limit } \\approx 0.59\\text{)}\\]" +
        "\\[- \\rho = \\text{air density }(\\approx 1.225\\text{ kg/m}^3)\\]" +
        "\\[- A = \\text{rotor swept area } = \\pi r^2\\]\n\n" +
        "The \\(v^3\\) scaling means small forecast errors amplify dramatically: a 10% error in wind speed leads to a ~33% error in power output. This makes accurate wind forecasting critical for grid integration.",
      hints: [
        "Wind power comes from the kinetic energy of moving air. Kinetic energy is \\(KE = \\frac{1}{2}mv^2\\). Power is energy per unit time. What additional factor of \\(v\\) appears when you consider mass flow rate through the turbine?",
        "The kinetic energy equation involves \\(v^2\\); power is energy per time. When you account for how much air mass flows through the turbine per second (which itself is proportional to \\(v\\)), what power do you get?",
      ],
    },
    {
      id: "q-clim-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SCADA data from wind turbines — including rotor speed, pitch angle, power output, and vibration measurements — can be used to train ML models for predictive maintenance.",
      correctAnswer: "True",
      explanation:
        "SCADA (Supervisory Control and Data Acquisition) systems continuously record high-frequency operational data from wind turbines:\n\n" +
        "\\[\\mathbf{x}_t = \\{T_{\\text{gearbox}}, \\omega_{\\text{rotor}}, \\theta_{\\text{pitch}}, P_{\\text{output}}, a_{\\text{vibration}}, \\ldots\\}\\]\n\n" +
        "As components degrade (bearing wear, gearbox fatigue, blade erosion), their signatures in SCADA data change:\n\n" +
        "\\[- \\text{Gearbox temperature rises}\\]" +
        "\\[- \\text{Vibration amplitude increases}\\]" +
        "\\[- \\text{Efficiency drops (same wind, less power)}\\]\n\n" +
        "ML models trained on historical failure data learn to detect these precursor signatures, predicting failures days to weeks in advance.",
      hints: [
        "SCADA data contains rich real-time operational signals. What happens to these signals when a component starts to degrade — do they remain the same?",
        "Predictive maintenance uses historical failure data to train models. What do the models learn to recognize — the signatures of failure or the normal operating patterns?",
      ],
    },
    {
      id: "q-clim-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Wake effects in wind farms cause upwind turbines to reduce power output of downstream turbines. Which ML approach is commonly used to model wake interactions for farm-level power optimization?",
      options: [
        "Linear regression on total farm output",
        "Graph Neural Networks (GNNs) treating turbines as nodes and wake propagation as directed edges",
        "Convolutional networks on satellite wind maps",
        "Recurrent networks on national grid frequency data",
      ],
      correctAnswer: 1,
      explanation:
        "Wake effects create a directed spatial dependency: wake deficits propagate from upwind to downwind turbines along the wind direction. A graph structure naturally captures this:\n\n" +
        "\\[\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})\\]" +
        "\\[\\mathcal{V} = \\{\\text{turbines}\\}, \\quad \\mathcal{E} = \\{\\text{wake edges along wind direction}\\}\\]\n\n" +
        "GNNs perform message passing on this graph:\n\n" +
        "\\[h_i^{(k+1)} = \\text{UPDATE}\\left(h_i^{(k)}, \\sum_{j \\in \\mathcal{N}_i} \\text{MESSAGE}(h_i^{(k)}, h_j^{(k)})\\right)\\]\n\n" +
        "The message function incorporates wake deficit information (flow speed reduction, turbulence intensity). Since the wind direction changes, the graph topology is dynamic, requiring GNNs that can adapt to varying edge structures.",
      hints: [
        "Wake effects are directional: they propagate downwind from upwind turbines. What data structure is designed to capture directed pairwise relationships between entities?",
        "When the wind direction changes, which turbines affect which other turbines also changes. What property of GNNs makes them suitable for this dynamic wake topology?",
      ],
    },
  ],

  "grid-optimization": [
    {
      id: "q-clim-kp8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Demand Response programs use ML to achieve which goal in smart grid management?",
      options: [
        "Building new power plants automatically",
        "Shifting or reducing electricity consumption during peak demand periods to balance supply and demand",
        "Encrypting smart meter data for privacy",
        "Replacing human grid operators with autonomous systems",
      ],
      correctAnswer: 1,
      explanation:
        "Demand response adjusts electricity consumption rather than generation. During peak demand periods:\n\n" +
        "\\[\\text{Demand} > \\text{Supply capacity} \\Rightarrow \\text{spot prices spike}\\]\n\n" +
        "ML enables demand response by:\n\n" +
        "\\[- \\text{Forecasting demand at fine spatial/temporal resolution}\\]" +
        "\\[- \\text{Identifying flexible loads (HVAC, EV charging, industrial processes)}\\]" +
        "\\[- \\text{Sending price signals or direct control commands}\\]" +
        "\n" +
        "This shifts consumption away from peaks, reducing reliance on expensive peaking power plants.",
      hints: [
        "Demand response is about adjusting consumption, not generation. When is grid stress highest (peaks)? What types of electricity use can be deferred to different times without significant user impact?",
        "Flexible loads (HVAC, EV charging) can be shifted in time. Why are these targets of demand response programs?",
      ],
    },
    {
      id: "q-clim-kp8-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Optimal Power Flow (OPF) is an NP-hard optimization problem that ML methods are being used to accelerate for real-time grid operation.",
      correctAnswer: "True",
      explanation:
        "The AC Optimal Power Flow problem solves:\n\n" +
        "\\[\\min_{\\mathbf{x}} \\sum_i c_i P_i \\quad \\text{s.t.} \\quad |V_i| = V_i^{\\text{spec}}, \\; |S_{ij}| \\leq S_{ij}^{\\max}, \\; P_{\\text{gen}} - P_{\\text{load}} = P(\\mathbf{x})\\]\n\n" +
        "This involves non-linear power flow equations (Kirchhoff's laws) over a large network. AC-OPF is non-convex and NP-hard. ML approaches accelerate OPF by:\n\n" +
        "\\[- \\text{Learning warm-start initializations for Newton-Raphson solvers}\\]" +
        "\\[- \\text{Predicting active constraint sets (reducing the problem size)}\\]" +
        "\\[- \\text{Directly outputting near-optimal dispatch decisions}\\]",
      hints: [
        "OPF involves non-linear power flow equations (Kirchhoff's laws) over a large network of buses and transmission lines. What computational complexity class does this fall into?",
        "ML can learn the mapping from grid conditions (loads, generation) to optimal dispatch, bypassing what computationally intensive process?",
      ],
    },
    {
      id: "q-clim-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Graph Neural Networks applied to power grid optimization treat the grid as a graph. In this representation, what do nodes and edges typically represent?",
      options: [
        "Countries and their international energy trading relationships",
        "Buses (substations, generators, loads) and transmission lines connecting them",
        "Individual electrons and their microscopic paths through conductors",
        "Time steps in a sequential dispatch problem and the transitions between them",
      ],
      correctAnswer: 1,
      explanation:
        "In power grid GNNs, the graph structure mirrors the physical topology of the network:\n\n" +
        "\\[\\text{Nodes } \\mathcal{V}: \\quad \\text{buses } i \\text{ with features } h_i = \\{V_i, \\theta_i, P_i, Q_i\\}\\]\n" +
        "\\[\\text{Edges } \\mathcal{E}: \\quad (i, j) \\text{ with attributes } e_{ij} = \\{z_{ij}, S_{ij}^{\\max}\\}\\]\n\n" +
        "where \\(V_i\\) is voltage magnitude, \\(\\theta_i\\) is voltage angle, \\(P_i, Q_i\\) are active/reactive power, and \\(z_{ij} = r_{ij} + jx_{ij}\\) is the line impedance. GNN message passing on this graph:\n\n" +
        "\\[h_i^{(k+1)} = \\sigma\\left(W^{(k)} h_i^{(k)} + \\sum_{j \\in \\mathcal{N}_i} M^{(k)}(h_i^{(k)}, h_j^{(k)}, e_{ij})\\right)\\]\n\n" +
        "This enables physics-informed optimization that respects grid topology.",
      hints: [
        "A power grid connects generation sources to loads through transmission infrastructure. What are the natural 'atoms' of this network — the entities connected and the connections between them?",
        "The graph structure of a GNN mirrors the physical topology of the power grid. In physics-informed GNNs for power systems, what physical laws are encoded in the message passing?",
      ],
    },
  ],

  "energy-storage": [
    {
      id: "q-clim-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Reinforcement learning is used for battery storage management in energy systems. What is typically the RL agent's action space?",
      options: [
        "The physical battery chemistry parameters (electrolyte composition, electrode materials)",
        "The charge/discharge power rate at each time step (positive for charging, negative for discharging, or zero for holding)",
        "The electricity price forecast",
        "The solar irradiance level",
      ],
      correctAnswer: 1,
      explanation:
        "Battery management involves a sequential decision at each time step:\n\n" +
        "\\[a_t \\in \\{P_{\\text{charge}}, \\; P_{\\text{discharge}}, \\; 0\\}\\]\n\n" +
        "The state-of-charge evolves according to:\n\n" +
        "\\[\\text{SoC}_{t+1} = \\text{SoC}_t - \\frac{P_{\\text{discharge}} \\cdot \\Delta t}{C_{\\text{battery}}} = \\text{SoC}_t + \\frac{P_{\\text{charge}} \\cdot \\Delta t}{C_{\\text{battery}}}\\]\n\n" +
        "The RL agent observes electricity prices, current SoC, and grid conditions, then decides the power rate. The reward is typically the profit from energy arbitrage minus degradation costs.",
      hints: [
        "The RL agent can only control what it can directly act upon. It observes prices and SoC, but what specific variable does it directly control related to energy flow?",
        "Battery management is fundamentally about when to buy energy from the grid (charge) and when to sell it back (discharge). How is this decision formalized as an action?",
      ],
    },
    {
      id: "q-clim-kp9-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The State of Charge (SoC) of a battery must be maintained within safe bounds (e.g., 20%–90%) to prevent degradation, and this represents a key constraint in RL-based battery management.",
      correctAnswer: "True",
      explanation:
        "Lithium-ion batteries degrade when:\n\n" +
        "\\[\\text{SoC} > 100\\% \\quad \\text{(overcharging)} \\Rightarrow \\text{lithium plating}\\]" +
        "\\[\\text{SoC} < 0\\% \\quad \\text{(deep discharge)} \\Rightarrow \\text{irreversible capacity loss}\\]" +
        "\n" +
        "This creates a constrained MDP:\n\n" +
        "\\[\\min_{\\pi} \\mathbb{E}\\left[\\sum_t r_t\\right] \\quad \\text{s.t.} \\quad \\text{SoC}_t \\in [\\text{SoC}_{\\min}, \\text{SoC}_{\\max}]\\]\n\n" +
        "Approaches to enforce SoC bounds include:\n" +
        "\\[- \\text{Hard constraints: clip actions that would violate bounds}\\]" +
        "\\[- \\text{Constrained RL: project to feasible set after each step}\\]" +
        "\\[- \\text{Penalty method: add degradation cost to reward}\\]\n\n" +
        "Safe exploration is critical — in a physical system, unsafe actions during training can damage equipment.",
      hints: [
        "Batteries have physical limits on charge — exceeding these limits degrades capacity permanently. What does this mean for the SoC range in which a battery should operate?",
        "Safe RL or constrained MDP formulations are needed to enforce SoC bounds during both training and deployment. Why is this particularly important during training (exploration)?",
      ],
    },
    {
      id: "q-clim-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In energy arbitrage with a battery, the optimal charging strategy depends on forecasting electricity prices. Which RL formulation naturally handles the inherent uncertainty in future prices?",
      options: [
        "Deterministic model predictive control",
        "Stochastic MDP where the state includes probabilistic price forecasts (e.g., scenario trees or distributional embeddings)",
        "Linear programming over a fixed price schedule",
        "Greedy single-step optimization",
      ],
      correctAnswer: 1,
      explanation:
        "Electricity prices are stochastic with temporal dependencies:\n\n" +
        "\\[p_t \\sim \\mathcal{N}(\\mu_t, \\sigma_t^2), \\quad \\mu_t = f(p_{t-1}, p_{t-2}, \\ldots)\\]\n\n" +
        "A stochastic MDP incorporates price uncertainty directly into the state:\n\n" +
        "\\[s_t = \\{\\text{SoC}_t, \\; \\hat{p}_{t:t+H}, \\; \\text{scenario index } k\\}\\]\n\n" +
        "where \\(\\hat{p}_{t:t+H}\\) represents a price scenario tree. The agent learns a policy that is robust across scenarios:\n\n" +
        "\\[\\pi^* = \\arg\\max_\\pi \\mathbb{E}\\left[\\sum_t r(s_t, a_t)\\right]\\]\n\n" +
        "This is critical because:\n" +
        "\\[- \\text{Deterministic MPC assumes perfect foresight — fails in practice}\\]" +
        "\\[- \\text{Greedy optimization ignores future price trajectories}\\]" +
        "\\[- \\text{Stochastic MDP learns risk-aware policies across diverse scenarios}\\]\n\n" +
        "The agent trained on diverse price scenarios learns to be robust rather than optimizing for a single predicted trajectory.",
      hints: [
        "Deterministic control assumes you know future prices exactly. Why is this assumption violated in real electricity markets?",
        "An RL agent trained only on a single predicted price trajectory may overfit to that trajectory. What happens when actual prices deviate? How does a stochastic MDP address this?",
      ],
    },
  ],

  "virtual-power-plants": [
    {
      id: "q-clim-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A Virtual Power Plant (VPP) aggregates which types of distributed energy resources?",
      options: [
        "Only large centralized nuclear plants",
        "Distributed solar, wind, batteries, EVs, and flexible loads coordinated as a single dispatchable unit",
        "Exclusively offshore wind farms",
        "Coal and natural gas peaking units",
      ],
      correctAnswer: 1,
      explanation:
        "A VPP aggregates heterogeneous distributed energy resources (DERs) that individually are too small to participate in wholesale electricity markets:\n\n" +
        "\\[\\text{VPP} = \\{\\text{rooftop solar}, \\; \\text{home batteries}, \\; \\text{EV chargers}, \\; \\text{flexible HVAC loads}, \\ldots\\}\\]\n\n" +
        "Coordination software aggregates their flexibility and dispatches them as a single unit. This allows thousands of small assets to collectively provide services (frequency regulation, peak shaving) that only large generators could previously provide.",
      hints: [
        "The 'virtual' in VPP means there is no single physical power plant. Instead, what is being coordinated by software?",
        "Why might small resources like home batteries not be able to participate individually in wholesale markets? How does aggregation solve this?",
      ],
    },
    {
      id: "q-clim-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ML models in VPPs are used to forecast the aggregate output and flexibility of thousands of distributed assets, enabling optimal bidding in energy markets.",
      correctAnswer: "True",
      explanation:
        "VPP optimization requires forecasting at two levels:\n\n" +
        "\\[1. \\; \\text{Per-asset generation/consumption forecasts} \\Rightarrow \\text{uncertainty } \\sigma_i^2\]" +
        "\\[2. \\; \\text{Aggregate VPP flexibility} \\Rightarrow \\text{combined uncertainty scales as } \\sigma_{\\text{agg}}^2 \\approx \\sum_i \\sigma_i^2 \\cdot w_i^2\\]\n\n" +
        "ML models trained on historical asset data predict each asset's available flexibility (e.g., how much a battery can discharge, how much an EV charging session can be delayed). Aggregation reduces total forecast uncertainty relative to individual assets. Market bidding requires both expected output and uncertainty bounds to be credible.",
      hints: [
        "Each asset (solar panel, battery, EV) has its own forecast uncertainty. What happens to total uncertainty when you aggregate thousands of assets?",
        "Optimal market bidding requires knowing not just the expected output but also uncertainty in available capacity. Why is this uncertainty information important for market credibility?",
      ],
    },
    {
      id: "q-clim-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Federated learning is well-suited for VPP optimization because:",
      options: [
        "It trains a global model without sharing raw private data from individual homes and businesses",
        "It requires all data to be centralized on one server",
        "It eliminates the need for communication between devices",
        "It works only with image data from smart meters",
      ],
      correctAnswer: 0,
      explanation:
        "In federated learning for VPPs, each home/business trains a local model on its own energy data:\n\n" +
        "\\[\\theta_i^{(k+1)} = \\theta_i^{(k)} - \\eta \\nabla \\mathcal{L}_i(\\theta_i^{(k)})\\]\n\n" +
        "Only model gradients (not raw data) are shared with a central server:\n\n" +
        "\\[\\theta_{\\text{global}} = \\frac{1}{N}\\sum_i \\theta_i\\]\n\n" +
        "This preserves privacy because:\n" +
        "\\[- \\text{Raw energy consumption patterns (reveal daily routines) never leave the home}\\]" +
        "\\[- \\text{Only mathematical gradients are transmitted}\\]" +
        "\\[- \\text{Local differential privacy can further protect individual data}\\]\n\n" +
        "The approach enables system-wide VPP optimization without compromising customer privacy.",
      hints: [
        "Home energy data is sensitive — smart meter data can reveal when people wake up, sleep, leave for work, and more. How does federated learning address this privacy concern?",
        "In federated learning, what specifically is shared with the central server (model weights, gradients, or raw data)? What stays local?",
      ],
    },
  ],

  "ghg-monitoring": [
    {
      id: "q-clim-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Satellite-based GHG monitoring uses which type of spectroscopy to detect atmospheric CO\\_2 and CH\\_4 concentrations?",
      options: [
        "X-ray fluorescence",
        "Near-infrared and shortwave-infrared (NIR/SWIR) absorption spectroscopy",
        "Microwave radar backscatter",
        "Visible light photometry",
      ],
      correctAnswer: 1,
      explanation:
        "CO\\_2 and CH\\_4 have characteristic absorption features in the NIR/SWIR portion of the electromagnetic spectrum:\n\n" +
        "\\[\\text{CO}_2: \\quad \\lambda \\approx 1.6\\;\\mu\\text{m}, \\; 2.0\\;\\mu\\text{m}\\]" +
        "\\[\\text{CH}_4: \\quad \\lambda \\approx 1.7\\;\\mu\\text{m}, \\; 2.3\\;\\mu\\text{m}\\]\n\n" +
        "Satellites like OCO-2, GOSAT, and Sentinel-5P measure the reflected solar spectrum in these absorption bands. The depth of the absorption feature encodes the column concentration of the gas above the surface. Spectral inversion algorithms retrieve the concentration:\n\n" +
        "\\[I_{\\text{observed}}(\\lambda) = I_{\\text{surface}}(\\lambda) \\cdot T(\\lambda; C_{\\text{GHG}})\\]",
      hints: [
        "Greenhouse gases absorb infrared radiation — this is the physical basis for how remote sensing detects them. In which portion of the spectrum do these absorption features appear?",
        "The specific wavelengths at which CO\\_2 and CH\\_4 absorb are determined by their molecular structure. What do these characteristic absorption wavelengths define in the satellite instrument design?",
      ],
    },
    {
      id: "q-clim-kp11-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ML models have been used to detect individual methane plumes from industrial facilities in satellite hyperspectral imagery.",
      correctAnswer: "True",
      explanation:
        "Methane plumes create localized spectral anomalies in hyperspectral imagery. A methane detection approach:\n\n" +
        "\\[1. \\; \\text{Measure spectrum } I(\\lambda) \\text{ at each pixel}\\]" +
        "\\[2. \\; \\text{Compute methane column } C_{\\text{CH}_4} \\text{ via spectral fitting}\\]" +
        "\\[3. \\; \\text{Apply ML anomaly detection: } \\hat{y} = f(I(\\lambda))\\]\n\n" +
        "Instruments like EMIT (NASA's Earth Surface Mineral Dust Source Investigation) detect methane via:\n" +
        "\\[\\text{CH}_4 \\text{ absorption feature at } 2.3\\;\\mu\\text{m} \\Rightarrow \\text{enhanced radiance deficit}\\]\n\n" +
        "ML models (matched filters, CNNs) identify super-emitter plumes from oil/gas facilities, landfills, and agriculture against the background atmospheric concentration.",
      hints: [
        "Individual facility plumes create small, localized spectral anomalies — what property of the spectrum is being analyzed to detect these plumes?",
        "EMIT (Earth Surface Mineral Dust Source Investigation) was designed for mineral mapping but has been used to detect what specific greenhouse gas from thousands of industrial facilities?",
      ],
    },
    {
      id: "q-clim-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Inverse modeling in atmospheric GHG monitoring uses ML to solve which fundamentally ill-posed problem?",
      options: [
        "Predicting future emissions under different policy scenarios",
        "Inferring surface emission fluxes from observed atmospheric concentration measurements, accounting for atmospheric transport",
        "Generating synthetic satellite images for training ML models",
        "Converting spectral radiance measurements to surface reflectance values",
      ],
      correctAnswer: 1,
      explanation:
        "Inverse modeling reverses the forward modeling process:\n\n" +
        "\\[\\text{Forward: } \\quad \\mathbf{C} = \\mathcal{M}(\\mathbf{E}) + \\epsilon\\]" +
        "\\[\\text{Inverse: } \\quad \\hat{\\mathbf{E}} = \\mathcal{M}^{-1}(\\mathbf{C})\\]\n\n" +
        "where \\(\\mathbf{C}\\) are observed concentrations, \\(\\mathbf{E}\\) are emissions, and \\(\\mathcal{M}\\) is the atmospheric transport model. The problem is ill-posed because:\n\n" +
        "\\[\\text{Non-uniqueness: } \\quad \\text{Many emission patterns produce similar concentration observations}\\]" +
        "\\[\\text{Transport chaos: } \\quad \\text{Small errors in transport model propagate to large emission errors}\\]\n\n" +
        "ML accelerates this by learning a surrogate for the expensive transport model \\(\\mathcal{M}\\), enabling fast posterior estimation via Bayesian inversion.",
      hints: [
        "Forward modeling predicts atmospheric concentrations given emissions. What does inverse modeling do — what is being solved for from what?",
        "Atmospheric transport (wind patterns, turbulence) introduces uncertainty. Can different emission patterns produce the same observed concentration pattern? What makes this problem ill-posed?",
      ],
    },
  ],

  "industrial-emissions": [
    {
      id: "q-clim-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Remote sensing detection of industrial emissions from facilities like steel mills or cement plants typically uses which type of satellite data?",
      options: [
        "GPS signal strength",
        "Multispectral or hyperspectral optical imagery and thermal infrared data",
        "Radio frequency emissions",
        "Seismic vibration data",
      ],
      correctAnswer: 1,
      explanation:
        "Industrial facilities have distinctive thermal and spectral signatures:\n\n" +
        "\\[\\text{Thermal IR:} \\quad \\text{Heat plumes from cooling towers, furnaces} \\Rightarrow T > 300\\text{ K above background}\\]" +
        "\\[\\text{Hyperspectral:} \\quad \\text{Chemical absorption features (SO}_2\\text{, NO}_x\\text{, CO}_2\\text{) in SWIR}\\]\n\n" +
        "ML models applied to these data can:\n" +
        "\\[- \\text{Identify and classify emission source types}\\]" +
        "\\[- \\text{Map plume dispersion patterns}\\]" +
        "\\[- \\text{Estimate emission rates from plume concentration profiles}\\]\n\n" +
        "For example, flare stacks from oil refineries emit in thermal IR with a characteristic blackbody spectrum.",
      hints: [
        "Hot industrial processes emit heat and chemical by-products. Which parts of the electromagnetic spectrum are specifically sensitive to heat signatures and chemical absorption?",
        "Visible imagery shows structural features; thermal IR reveals heat signatures. What additional information does hyperspectral imagery provide that the other two do not?",
      ],
    },
    {
      id: "q-clim-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Object detection models (e.g., YOLO, Faster R-CNN) have been adapted to detect industrial infrastructure such as power plants and oil refineries in satellite imagery to track global emissions sources.",
      correctAnswer: "True",
      explanation:
        "Object detection models trained on labeled satellite imagery can identify industrial facilities by their visual signatures:\n\n" +
        "\\[\\text{Cooling towers:} \\quad \\text{large rectangular hyperbolic shapes, water vapor plumes}\\]" +
        "\\[\\text{Flare stacks:} \\quad \\text{tall vertical structures with thermal anomalies}\\]" +
        "\\[\\text{Storage tanks:} \\quad \\text{circular structures with floating roofs}\\]\n\n" +
        "Projects like Global Energy Monitor and Climate TRACE (WattTime) use these detections for bottom-up emissions accounting:\n\n" +
        "\\[\\text{Emissions} = \\sum_{\\text{facilities}} \\text{Activity} \\times \\text{Emission Factor}\\]\n\n" +
        "Automating facility detection across the globe is only feasible with ML — manual annotation of millions of square km of imagery is impossible.",
      hints: [
        "Industrial facilities have distinctive visual signatures from space (cooling towers, stacks, storage tanks). What computer vision task identifies and localizes these objects in imagery?",
        "Automating facility detection across the globe at scale — why is this task infeasible for human analysts but feasible for ML?",
      ],
    },
    {
      id: "q-clim-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Climate TRACE uses a multi-modal ML approach to estimate facility-level emissions. Which combination of data sources is typical of this approach?",
      options: [
        "Only self-reported emissions from companies",
        "Satellite imagery (optical, thermal, SAR), nighttime lights, air quality sensor data, economic activity proxies, and atmospheric observations fused with ML",
        "Ground-level air quality monitors only",
        "Smartphone GPS traces of industrial workers",
      ],
      correctAnswer: 1,
      explanation:
        "No single data source provides complete information about industrial activity and emissions. Climate TRACE fuses multiple modalities:\n\n" +
        "\\[\\mathbf{X} = \\{\\underbrace{I_{\\text{satellite}}}_{\\text{facility detection}}, \\; \\underbrace{L_{\\text{nighttime}}}_{\\text{activity proxy}}, \\; \\underbrace{AQ_{\\text{sensors}}}_{\\text{concentration}}, \\; \\underbrace{GHG_{\\text{atm}}}_{\\text{emissions}}\\}\\]\n\n" +
        "Multi-modal fusion provides:\n" +
        "\\[- \\text{Redundancy: multiple signals for the same activity}\\]" +
        "\\[- \\text{Complementarity: different modalities capture different aspects}\\]" +
        "\\[- \\text{Cross-validation: consistent signals strengthen confidence}\\]\n\n" +
        "The goal is independent estimation without relying on self-reported data, which may be incomplete or inaccurate.",
      hints: [
        "No single data source captures all aspects of facility activity and emissions. What does multi-modal fusion provide — redundancy, complementarity, or both?",
        "The goal is independent estimation of emissions without relying on self-reported data. Why might self-reported data be unreliable?",
      ],
    },
  ],

  "carbon-accounting": [
    {
      id: "q-clim-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Life Cycle Assessment (LCA) quantifies the environmental impact of a product. What does "cradle-to-grave" analysis cover?',
      options: [
        "Only the manufacturing stage",
        "Raw material extraction through manufacturing, distribution, use, and disposal/end-of-life",
        "Just the use phase of a product",
        "Only transportation emissions during distribution",
      ],
      correctAnswer: 1,
      explanation:
        "Cradle-to-grave LCA covers the complete lifecycle:\n\n" +
        "\\[\\underbrace{\\text{Raw material extraction}}_{\\text{cradle}} \\Rightarrow \\text{Manufacturing} \\Rightarrow \\text{Distribution} \\Rightarrow \\text{Use Phase} \\Rightarrow \\underbrace{\\text{Disposal/Recycling}}_{\\text{grave}}\\]\n\n" +
        "For a gasoline-powered car, cradle-to-grave includes:\n" +
        "\\[- \\text{Oil extraction, refining (cradle)}\\]" +
        "\\[- \\text{Manufacturing, assembly}\\]" +
        "\\[- \\text{Use: fuel combustion emissions}\\]" +
        "\\[- \\text{End-of-life: scrapping, recycling (grave)}\\]\n\n" +
        "Partial LCA (e.g., only use phase) misses significant upstream or downstream emissions, potentially leading to misleading conclusions.",
      hints: [
        "The metaphor of 'cradle' (birth/raw materials) to 'grave' (disposal/end-of-life) — what stages of a product's existence does this span?",
        "A partial LCA considering only the use phase of a gasoline car misses what major emissions sources?",
      ],
    },
    {
      id: "q-clim-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "NLP models can automate the extraction of carbon emissions data from corporate sustainability reports and supply chain documents.",
      correctAnswer: "True",
      explanation:
        "Corporate sustainability reports contain structured data in unstructured text. NLP techniques extract this automatically:\n\n" +
        "\\[\\text{Documents} \\xrightarrow{\\text{NER}} \\text{Entities: Scope 1/2/3 emissions, targets, timelines}\\]" +
        "\\[\\xrightarrow{\\text{Relation Extraction}} \\text{Relations: company } \\xrightarrow{\\text{reports}} \\text{emissions} \\xrightarrow{\\text{as}} \\text{value}\\]\n\n" +
        "Models trained on reporting standards (GRI, TCFD, CDP) can:\n" +
        "\\[- \\text{Extract Scope 1, 2, 3 emission figures}\\]" +
        "\\[- \\text{Identify reduction targets and timelines}\\]" +
        "\\[- \\text{Classify companies by climate risk exposure}\\]\n\n" +
        "This enables automated analysis across thousands of companies for portfolio climate risk assessment.",
      hints: [
        "Corporate sustainability reports contain emissions data in free text. What NLP technique transforms this unstructured text into structured database entries?",
        "Manually reading and extracting data from thousands of sustainability reports would take years. What does automation enable at scale?",
      ],
    },
    {
      id: "q-clim-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Scope 3 emissions are the most challenging to account for in corporate carbon accounting. Why?",
      options: [
        "They occur inside the company's own facilities",
        "They span the entire value chain (upstream suppliers and downstream customers) and require data from entities outside the company's direct control",
        "They are too small to measure accurately",
        "They only apply to financial institutions",
      ],
      correctAnswer: 1,
      explanation:
        "Scope 3 covers all indirect emissions in the value chain:\n\n" +
        "\\[\\text{Scope 3 categories:}\\]" +
        "\\[- \\text{Purchased goods and services}\\]" +
        "\\[- \\text{Employee commuting and business travel}\\]" +
        "\\[- \\text{Product use by customers}\\]" +
        "\\[- \\text{End-of-life treatment of sold products}\\]\n\n" +
        "The challenge is data collection from thousands of entities with varying reporting quality:\n\n" +
        "\\[\\text{Scope 3}_{\\text{company}} = \\sum_{\\text{suppliers } j} E_j \\cdot T_{ij}\\]\n\n" +
        "where \\(E_j\\) is supplier \\(j\\)'s emissions and \\(T_{ij}\\) is the contribution of supplier \\(j\\)'s input to product \\(i\\). A manufacturer's Scope 3 can be 10x larger than Scopes 1+2 combined.",
      hints: [
        "Scope 1 is direct emissions (own facilities), Scope 2 is purchased energy. Scope 3 is 'everything else' — what does this include?",
        "A manufacturer's Scope 3 can be 10x larger than Scopes 1+2 combined. What makes collecting this data difficult — is it the number of entities involved or something else?",
      ],
    },
  ],

  "deforestation-detection": [
    {
      id: "q-clim-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which satellite constellation provides frequent (daily to weekly) optical imagery of the entire Earth's surface, enabling near-real-time deforestation monitoring?",
      options: [
        "GPS satellites",
        "Planet Labs' Dove constellation (3-5 m resolution with daily global coverage)",
        "Hubble Space Telescope",
        "NOAA weather satellites (GOES series)",
      ],
      correctAnswer: 1,
      explanation:
        "Planet Labs' Dove constellation consists of over 100 CubeSats in Sun-synchronous orbits providing daily global coverage at 3-5 m resolution:\n\n" +
        "\\[\\text{Revisit frequency} \\approx 1\\text{ day} \\quad (360\\text{ orbits/day over poles})\\]\n\n" +
        "Traditional Landsat satellites revisit every 16 days — insufficient for rapid deforestation events that can remove forest cover in days. Planet's high temporal frequency enables near-real-time change detection systems like GLAD (Global Land Analysis and Discovery) deforestation alerts.",
      hints: [
        "Near-real-time deforestation monitoring requires high revisit frequency. Planet Labs' Dove constellation was specifically designed for what temporal resolution?",
        "Traditional satellites like Landsat revisit every 16 days. Why might this be insufficient for monitoring deforestation in the Amazon?",
      ],
    },
    {
      id: "q-clim-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SAR (Synthetic Aperture Radar) satellites are particularly valuable for deforestation detection in tropical rainforests because they can penetrate cloud cover.",
      correctAnswer: "True",
      explanation:
        "SAR and optical sensing differ fundamentally in how they interact with the atmosphere:\n\n" +
        "\\[\\text{Optical:} \\quad I_{\\text{observed}} = I_{\\text{surface}} \\cdot T_{\\text{atmosphere}} \\quad \\Rightarrow \\text{blocked by clouds}\\]\n" +
        "\\[\\text{SAR:} \\quad \\text{signal} \\xrightarrow{\\text{emit}} \\text{clouds} \\xrightarrow{\\text{scatter}} \\text{receiver} \\quad \\Rightarrow \\text{penetrates clouds}\\]\n\n" +
        "SAR emits microwave pulses (typically C-band or X-band) that:\n" +
        "\\[- \\text{Penetrate cloud cover (clouds are largely transparent to microwaves)}\\]" +
        "\\[- \\text{Provide day/night operation (active sensor)}\\]" +
        "\\[- \\text{Capture canopy structure from backscatter intensity}\\]\n\n" +
        "Tropical rainforests are perpetually cloud-covered — SAR provides reliable, continuous monitoring.",
      hints: [
        "Optical sensors need sunlight and clear skies to see the surface. What physical property of radar waves allows them to 'see' through clouds?",
        "The Amazon and Congo Basin are frequently cloud-covered. What type of satellite sensor provides reliable deforestation monitoring in these regions?",
      ],
    },
    {
      id: "q-clim-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Global Land Analysis and Discovery (GLAD) deforestation alert system uses which ML approach to detect forest loss?",
      options: [
        "Reinforcement learning agents that patrol virtual forest maps",
        "Landsat time-series analysis using statistical change detection on spectral indices (e.g., NDVI) combined with decision trees",
        "GPT-based text analysis of news reports",
        "Audio classification of chainsaw sounds from forest microphones",
      ],
      correctAnswer: 1,
      explanation:
        "GLAD analyzes dense Landsat 8 time series for each pixel. The NDVI (Normalized Difference Vegetation Index) captures vegetation greenness:\n\n" +
        "\\[\\text{NDVI} = \\frac{\\text{NIR} - \\text{Red}}{\\text{NIR} + \\text{Red}} \\in [-1, +1]\\]\n\n" +
        "\\[\\text{Dense vegetation:} \\quad \\text{NDVI} \\approx 0.8-0.9\\]" +
        "\\[\\text{Bare ground:} \\quad \\text{NDVI} \\approx 0.0-0.1\\]\n\n" +
        "GLAD uses a Bayesian change detection model on the NDVI time series:\n\n" +
        "\\[P(\\text{change} | \\text{NDVI}_{t:t+T}) > \\tau \\Rightarrow \\text{alert}\\]\n\n" +
        "Decision trees classify pixels as forest/non-forest based on NDVI thresholds and temporal consistency. Alerts are generated near-weekly when a pixel's NDVI drops below the forest threshold.",
      hints: [
        "GLAD needs to detect sudden changes in dense vegetation. Which spectral index specifically measures vegetation greenness — what does this index compare?",
        "A pixel that was 'dense forest' (NDVI ~0.8) suddenly shows NDVI ~0.1. What does this temporal signature suggest about what happened?",
      ],
    },
  ],

  "net-zero-pathways": [
    {
      id: "q-clim-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Integrated Assessment Models (IAMs) used for net-zero pathway analysis combine which types of models?",
      options: [
        "Only economic models",
        "Energy system, economic, land use, and climate models linked together",
        "Weather prediction and satellite models",
        "Financial market and actuarial risk models",
      ],
      correctAnswer: 1,
      explanation:
        "Reaching net zero requires understanding interactions across multiple Earth systems. IAMs couple:\n\n" +
        "\\[- \\text{Energy system models: technology deployment, cost curves, learning rates}\\]" +
        "\\[- \\text{Macroeconomic models: investment, GDP, employment impacts}\\]" +
        "\\[- \\text{Land-use models: agriculture, forests, bioenergy constraints}\\]" +
        "\\[- \\text{Climate models: simplified temperature and carbon cycle responses}\\]\n\n" +
        "This coupling ensures internal consistency: energy decisions affect land use, which affects climate, which affects the economy. The IPCC uses IAMs (MESSAGE, REMIND, IMAGE) to develop shared socioeconomic pathways (SSPs).",
      hints: [
        "Reaching net zero requires changes across energy, economy, land use, and climate. Why is no single model type sufficient to capture all these dimensions?",
        "The IPCC uses specific IAMs (MESSAGE, REMIND, IMAGE) to develop the shared socioeconomic pathways (SSPs). What does SSP stand for?",
      ],
    },
    {
      id: "q-clim-kp15-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ML can accelerate net-zero pathway optimization by acting as a fast surrogate for expensive IAM simulations.",
      correctAnswer: "True",
      explanation:
        "Running a full IAM scenario for one pathway takes hours to days on HPC infrastructure:\n\n" +
        "\\[T_{\\text{full IAM}} \\approx 4-48\\text{ hours per scenario}\\]\n\n" +
        "ML emulators trained on IAM scenario databases learn the input-output relationship:\n\n" +
        "\\[\\hat{y} = f_\\theta(\\text{policy inputs}; \\text{scenario assumptions})\\]\n\n" +
        "Once trained, emulators evaluate thousands of scenarios per second, enabling:\n" +
        "\\[- \\text{Rapid exploration of the policy solution space}\\]" +
        "\\[- \\text{Monte Carlo uncertainty quantification (1000s of runs)}\\]" +
        "\\[- \\text{Optimization over policy parameters}\\]\n\n" +
        "This is the same emulator concept used for climate models — fast ML approximations of expensive simulations.",
      hints: [
        "Running a full IAM scenario takes hours to days on a supercomputer. What does ML compression enable this to be reduced to?",
        "What is the 'emulator' concept in climate science — how does it relate to IAMs?",
      ],
    },
    {
      id: "q-clim-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-objective optimization for net-zero pathways must balance which competing objectives?",
      options: [
        "Only minimizing cost and emissions",
        "Cost, emissions, energy security, equity, biodiversity, and food security (among others)",
        "Only GDP growth and renewable deployment speed",
        "Investor returns and regulatory compliance",
      ],
      correctAnswer: 1,
      explanation:
        "Net-zero pathways involve fundamental trade-offs across multiple objectives:\n\n" +
        "\\[\\min \\; \\{ \\text{Cost}, \\; \\text{Emissions}, \\; \\text{Land use}, \\; \\text{Equity} \\}\\]\n\n" +
        "Key trade-offs:\n" +
        "\\[- \\text{Bioenergy (low-carbon but land-intensive)} \\Leftrightarrow \\text{Food security, Biodiversity}\\]" +
        "\\[- \\text{Rapid decarbonization} \\Leftrightarrow \\text{Economic disruption, Equity (just transition)}\\]" +
        "\\[- \\text{Energy independence} \\Leftrightarrow \\text{Cost minimization}\\]\n\n" +
        "These objectives are often in tension — a pathway minimizing cost might require massive land use for bioenergy, conflicting with biodiversity goals. Multi-objective optimization produces a Pareto frontier of optimal trade-offs, not a single solution.",
      hints: [
        "A pathway that minimizes cost might require massive land use for bioenergy. What other objectives does this potentially conflict with?",
        "Multi-objective problems with competing objectives don't have a single 'optimal' solution. What do they have instead?",
      ],
    },
  ],

  "satellite-segmentation": [
    {
      id: "q-clim-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Semantic segmentation of satellite imagery assigns which output to each pixel?",
      options: [
        "A bounding box around the object",
        "A class label (e.g., urban, forest, water, cropland)",
        "The GPS coordinates of the pixel",
        "A depth estimate from the surface",
      ],
      correctAnswer: 1,
      explanation:
        "Semantic segmentation produces a dense class map where each pixel receives a label:\n\n" +
        "\\[\\hat{y}_{i,j} = f_\\theta(I_{i,j}) \\in \\{\\text{urban}, \\; \\text{forest}, \\; \\text{water}, \\; \\text{cropland}, \\ldots\\}\\]\n\n" +
        "This contrasts with:\n" +
        "\\[- \\text{Object detection: bounding boxes around objects}\\]" +
        "\\[- \\text{Instance segmentation: unique IDs per object instance}\\]" +
        "\\[- \\text{Semantic segmentation: class label per pixel}\\]\n\n" +
        "For deforestation monitoring, semantic segmentation provides pixel-level area estimates — more precise than counting bounding boxes.",
      hints: [
        "Segmentation answers 'what is this pixel?' for every pixel in the image simultaneously. What specific information is assigned to each pixel?",
        "For measuring urban expansion, why is pixel-level labeling (segmentation) more informative than bounding boxes (object detection)?",
      ],
    },
    {
      id: "q-clim-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "U-Net, originally developed for biomedical image segmentation, is widely used for satellite image segmentation due to its encoder-decoder architecture with skip connections.",
      correctAnswer: "True",
      explanation:
        "U-Net's architecture consists of:\n\n" +
        "\\[\\text{Encoder (downsampling):} \\quad I \\xrightarrow{\\text{conv}} h_1 \\xrightarrow{\\text{conv}} h_2 \\xrightarrow{\\text{conv}} h_3\\]" +
        "\\[\\text{Decoder (upsampling):} \\quad h_3 \\xrightarrow{\\text{deconv}} g_2 \\xrightarrow{\\text{deconv}} g_1 \\xrightarrow{\\text{deconv}} \\hat{I}\\]" +
        "\\[\\text{Skip connections:} \\quad g_i = \\text{Concat}(g_{i+1}, h_i)\\]\n\n" +
        "Skip connections preserve fine spatial details that would otherwise be lost during downsampling. This is critical for satellite imagery where precise boundary delineation (e.g., forest edges) matters. The architecture transfers effectively because both biomedical and satellite images are dense prediction tasks requiring spatial precision.",
      hints: [
        "During downsampling in the encoder, spatial resolution is reduced. What architectural feature of U-Net allows high-resolution spatial information from the encoder to reach the decoder?",
        "U-Net was designed for biomedical cell segmentation. What property makes it applicable to satellite imagery — is it the architecture type or the specific feature extraction?",
      ],
    },
    {
      id: "q-clim-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A major challenge in satellite semantic segmentation is domain shift between different sensors. What is the primary cause of this shift?",
      options: [
        "Different countries use different map projections",
        "Different sensors have different spectral bands, spatial resolutions, and radiometric calibrations",
        "Satellite data is always stored in different file formats",
        "Cloud masks are applied inconsistently by different processing pipelines",
      ],
      correctAnswer: 1,
      explanation:
        "Domain shift occurs when the statistical distribution of image values differs between training and test data:\n\n" +
        "\\[P_{\\text{train}}(I, y) \\neq P_{\\text{test}}(I, y)\\]\n\n" +
        "For satellite sensors, key differences:\n\n" +
        "\\[\\begin{array}{c|c|c} \\text{Property} & \\text{Sentinel-2} & \\text{Planet}\\\\ \\hline \\text{Spatial resolution} & 10\\text{ m} & 3\\text{ m}\\\\ \\text{Spectral bands} & 13\\; (\\text{VNIR/SWIR}) & 4\\; (\\text{RGB/NIR}) \\\\ \\text{Radiometric calibration} & \\text{ESA calibrated} & \\text{Planet calibrated} \\end{array}\\]\n\n" +
        "These differences cause spectral and spatial characteristics to differ, leading to distribution shift that degrades model performance when transferring between sensors.",
      hints: [
        "A model trained on Sentinel-2 imagery fails when deployed on Planet imagery. What changed — the model architecture or the input data distribution?",
        "Satellite sensors vary in spectral bands, ground sampling distance, and radiometric calibration. Which of these creates the most fundamental change in the statistical distribution of pixel values?",
      ],
    },
  ],

  "geospatial-foundation-models": [
    {
      id: "q-clim-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Prithvi (IBM/NASA) is a geospatial foundation model pre-trained using which self-supervised learning strategy?",
      options: [
        "Supervised classification on ImageNet",
        "Masked AutoEncoder (MAE) on Harmonized Landsat Sentinel (HLS) multi-spectral time-series data",
        "Contrastive learning between paired SAR and optical images",
        "Next-token prediction on satellite metadata text",
      ],
      correctAnswer: 1,
      explanation:
        "Prithvi uses a Vision Transformer (ViT) trained with Masked AutoEncoder objectives:\n\n" +
        "\\[\\mathcal{L}_{\\text{MAE}} = \\mathbb{E}\\left[\\|\\text{Decoder}(\\text{Encoder}(I_{\\text{masked}})) - I_{\\text{original}}\\|^2\\right]\\]\n\n" +
        "The model learns by predicting randomly masked patches of multi-spectral satellite time series. Pre-training on Harmonized Landsat Sentinel (HLS) data — which provides consistent, harmonized Landsat 8/9 and Sentinel-2 products — teaches rich spatiotemporal representations that transfer to downstream Earth observation tasks.",
      hints: [
        "MAE (masked autoencoding) learns by predicting masked patches. How is this applied to satellite time-series data rather than natural images?",
        "Self-supervised pre-training on large unlabeled satellite archives avoids the need for what — labeled datasets or unlabeled data?",
      ],
    },
    {
      id: "q-clim-kp17-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Geospatial foundation models like SatMAE and Prithvi can be fine-tuned on small labeled datasets to achieve strong performance on specialized Earth observation tasks.",
      correctAnswer: "True",
      explanation:
        "Foundation models leverage transfer learning from self-supervised pre-training:\n\n" +
        "\\[\\theta_{\\text{pretrained}} \\xrightarrow{\\text{fine-tune}} \\theta_{\\text{task}}\\]\n\n" +
        "The pre-training on massive unlabeled satellite archives (millions of scenes) provides rich, generalizable representations. Fine-tuning on small labeled datasets (hundreds to thousands of samples) achieves competitive performance because:\n" +
        "\\[- \\text{Low-level features (edges, textures) transfer across sensors}\\]" +
        "\\[- \\text{High-level semantic features are task-specific and learned during fine-tuning}\\]\n\n" +
        "This mirrors BERT fine-tuning in NLP: strong pre-trained features + small labeled dataset = good downstream performance.",
      hints: [
        "What does the pre-training on massive unlabeled satellite data provide — is it task-specific knowledge or generalizable representations?",
        "In NLP, BERT pre-training + fine-tuning on small labeled data produces strong results. What does this paradigm look like when applied to satellite imagery?",
      ],
    },
    {
      id: "q-clim-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SatMAE extends standard MAE to handle satellite imagery by introducing which key modification for multi-temporal multi-spectral inputs?",
      options: [
        "Replacing transformers with CNNs for computational efficiency",
        "Temporal and spectral group masking that masks entire time steps or spectral bands rather than random spatial patches",
        "Using GPS coordinates as positional encodings instead of 2D grid positions",
        "Applying contrastive loss instead of reconstruction loss",
      ],
      correctAnswer: 1,
      explanation:
        "Standard MAE masks random spatial patches. Satellite imagery has additional dimensions:\n\n" +
        "\\[I \\in \\mathbb{R}^{H \\times W \\times T \\times B}\\]\n\n" +
        "where \\(T\\) = time steps and \\(B\\) = spectral bands. SatMAE introduces group masking:\n\n" +
        "\\[\\text{Temporal masking:} \\quad \\text{mask all bands for certain time steps}\\]" +
        "\\[\\text{Spectral masking:} \\quad \\text{mask all time steps for certain bands}\\]\n\n" +
        "This forces the model to learn cross-temporal and cross-spectral relationships, which are more meaningful pretext tasks for Earth observation than random spatial patching.",
      hints: [
        "Standard MAE masks random spatial patches on 2D images. Satellite data has additional dimensions (time and spectral bands). How should masking be adapted?",
        "Group masking at the temporal/spectral level forces the model to learn what type of relationships that random spatial patching cannot?",
      ],
    },
  ],

  "change-detection": [
    {
      id: "q-clim-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Change detection in remote sensing compares satellite images from different dates to identify:",
      options: [
        "The altitude of the satellite",
        "Regions where land cover or land use has changed between the two acquisition dates",
        "The accuracy of the GPS coordinates of the images",
        "Atmospheric water vapor content during acquisition",
      ],
      correctAnswer: 1,
      explanation:
        "Change detection identifies spatial locations where the observed surface properties have changed between two or more dates:\n\n" +
        "\\[\\Delta_{i,j} = \\|I^{(t_2)}_{i,j} - I^{(t_1)}_{i,j}\\| > \\tau \\Rightarrow \\text{change detected}\\]\n\n" +
        "Applications include:\n" +
        "\\[- \\text{Urban growth monitoring}\\]" +
        "\\[- \\text{Deforestation tracking}\\]" +
        "\\[- \\text{Disaster damage assessment}\\]" +
        "\\[- \\text{Crop rotation detection}\\]\n\n" +
        "The key assumption is that atmospheric and illumination differences between dates are corrected, so remaining differences reflect actual surface changes.",
      hints: [
        "If the same location looks different in two images from different dates, what can you conclude about what happened on the ground?",
        "Change detection is the foundation of many Earth observation monitoring applications. What specific question does it answer?",
      ],
    },
    {
      id: "q-clim-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Siamese neural networks are commonly used for change detection because they are designed to compare two inputs and produce a similarity or difference measure.",
      correctAnswer: "True",
      explanation:
        "Siamese networks use twin encoders with shared weights to process bi-temporal images:\n\n" +
        "\\[h^{(1)} = f_\\theta(I^{(t_1)}), \\quad h^{(2)} = f_\\theta(I^{(t_2)})\\]" +
        "\\[\\hat{y} = g\\left(h^{(1)}, h^{(2)}\\right) = \\text{change map}\\]\n\n" +
        "Shared weights ensure both images are projected into the same feature space, making comparison meaningful. The difference head produces an attention or distance map highlighting changed regions. This architecture was first used for face verification — change detection is directly analogous.",
      hints: [
        "Siamese networks were originally designed for face verification (comparing two images to determine if they show the same person). How does this map to change detection?",
        "Why is it important that both encoders in a Siamese network share weights? What does this ensure about the feature representations?",
      ],
    },
    {
      id: "q-clim-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Time-series change detection using CCDC (Continuous Change Detection and Classification) fits which model to each pixel's spectral time series?",
      options: [
        "A deep neural network with LSTM layers",
        "A harmonic regression model with seasonal components, detecting breaks in the model fit",
        "A random forest classifier on monthly composite images",
        "A support vector machine on spectral difference images",
      ],
      correctAnswer: 1,
      explanation:
        "CCDC models each pixel's temporal trajectory as a harmonic regression with seasonal components:\n\n" +
        "\\[\\text{NDVI}(t) = \\sum_{k=0}^{K} \\left[ a_k \\cos\\left(\\frac{2\\pi k t}{T}\\right) + b_k \\sin\\left(\\frac{2\\pi k t}{T}\\right) \\right] + \\epsilon\\]\n\n" +
        "where \\(T\\) is the annual cycle period. This captures:\n" +
        "\\[- \\text{Seasonal vegetation phenology}\\]" +
        "\\[- \\text{Baseline vegetation condition}\\]\n\n" +
        "When a change occurs (deforestation, flooding), the observed trajectory deviates significantly from the fitted harmonic model. CCDC detects this as a 'break' in the model residuals:\n\n" +
        "\\[|\\text{NDVI}_{\\text{observed}}(t) - \\text{NDVI}_{\\text{fitted}}(t)| > \\tau \\Rightarrow \\text{change detected}\\]",
      hints: [
        "Vegetation has strong seasonal cycles (green-up in spring, senescence in fall). What type of mathematical model captures these periodic cycles?",
        "When deforestation occurs, the NDVI trajectory changes abruptly. How does CCDC detect this — is it the trajectory matching a pattern or failing to match one?",
      ],
    },
  ],

  "ocean-monitoring": [
    {
      id: "q-clim-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which satellite measurement is used to monitor global sea surface temperature (SST) for ocean heat content tracking?",
      options: [
        "Visible light reflectance",
        "Thermal infrared emission from the ocean surface",
        "Microwave backscatter from ocean waves",
        "GPS signal delay through the atmosphere",
      ],
      correctAnswer: 1,
      explanation:
        "Satellites measure SST using thermal infrared sensors. According to Planck's law, the radiation emitted by the ocean surface has a spectrum that depends on temperature:\n\n" +
        "\\[B(\\lambda, T) = \\frac{2hc^2}{\\lambda^5} \\frac{1}{e^{hc/(\\lambda k_B T)} - 1}\\]\n\n" +
        "At typical SST (~15°C), peak emission is at \\(\\lambda \\approx 11\\;\\mu\\text{m}\\) (thermal infrared). ML correction algorithms remove atmospheric interference and cloud contamination to produce high-quality SST products used for ocean heat monitoring:\n\n" +
        "\\[\\text{SST}_{\\text{corrected}} = \\text{SST}_{\\text{brightness}} - \\Delta T_{\\text{atmospheric}}\\]",
      hints: [
        "Temperature determines the wavelength of thermal emission (Planck's law). At typical ocean surface temperatures, what part of the electromagnetic spectrum does the peak emission fall in?",
        "Thermal infrared sensors measure emitted rather than reflected radiation. What advantage does this provide for monitoring ocean surface temperature?",
      ],
    },
    {
      id: "q-clim-kp19-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Sea ice extent in the Arctic has been monitored using passive microwave satellite data since the 1970s, providing a long-term record of ice loss.",
      correctAnswer: "True",
      explanation:
        "Passive microwave sensors (SMMR, SSM/I, SSMIS) measure natural microwave emission from the sea ice surface. The emissivity of ice differs from open ocean:\n\n" +
        "\\[\\epsilon_{\\text{ice}} \\approx 0.85-0.95 \\quad \\text{vs.} \\quad \\epsilon_{\\text{ocean}} \\approx 0.5-0.7\\]\n\n" +
        "This difference allows sea ice concentration to be retrieved globally. The 45+ year passive microwave record (1979-present) provides the definitive dataset for tracking Arctic and Antarctic sea ice trends, revealing approximately 13% decline per decade in Arctic summer sea ice extent.",
      hints: [
        "Passive microwave sensors work day/night and through clouds. Why is this essential for monitoring polar regions?",
        "The passive microwave record spans over 45 years. What makes this record definitive for understanding sea ice change?",
      ],
    },
    {
      id: "q-clim-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ML models for marine ecosystem monitoring from ocean color satellites (e.g., MODIS, PACE) estimate which ecologically important variable?",
      options: [
        "Ocean floor bathymetry",
        "Chlorophyll-a concentration as a proxy for phytoplankton biomass",
        "Fish population density directly",
        "Seawater salinity at depth",
      ],
      correctAnswer: 1,
      explanation:
        "Phytoplankton contain chlorophyll-a, which absorbs blue light and reflects green light. Ocean color sensors measure the water-leaving reflectance spectrum:\n\n" +
        "\\[R_{\\text{rs}}(\\lambda) = \\frac{L_w(\\lambda)}{E_d(\\lambda)}\\]\n\n" +
        "The ratio of blue to green reflectance encodes chlorophyll-a concentration. ML algorithms (neural networks, mixture density networks) retrieve chlorophyll-a concentrations:\n\n" +
        "\\[\\hat{C}_{\\text{chla}} = f_\\theta(R_{\\text{rs}}(\\lambda_1), R_{\\text{rs}}(\\lambda_2), \\ldots)\\]\n\n" +
        "Phytoplankton are the base of the marine food web and a major carbon sink — satellite chlorophyll maps provide global ocean productivity estimates.",
      hints: [
        "Phytoplankton are microscopic organisms at the base of the marine food web. How can satellites detect them in the open ocean?",
        "Ocean color changes from blue (clear deep water) to green as phytoplankton concentration increases. What specific pigment causes this color change?",
      ],
    },
  ],

  "wildfire-prediction": [
    {
      id: "q-clim-kp20-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Wildfire risk prediction models integrate which combination of variables?",
      options: [
        "Only historical fire perimeter data",
        "Fuel moisture content, topography, wind speed/direction, temperature, humidity, and ignition sources",
        "Only satellite imagery from the current day",
        "Economic data on forest management spending",
      ],
      correctAnswer: 1,
      explanation:
        "Wildfire risk depends on the fire triangle (fuel, heat, oxygen). ML models integrate:\n\n" +
        "\\[- \\text{Fuel: type, moisture content, loading (kg/m}^2\\text{)}\\]" +
        "\\[- \\text{Weather: temperature, humidity, wind speed/direction}\\]" +
        "\\[- \\text{Topography: slope, aspect (affects wind, drainage)}\\]" +
        "\\[- \\text{Ignition sources: lightning, human activity}\\]\n\n" +
        "The Rothermel model for fire spread rate:\n\n" +
        "\\[R = \\frac{I_{\\text{R}}}{\\rho_b \\epsilon \\delta Q}\\]\n\n" +
        "where \\(I_{\\text{R}}\\) is the reaction intensity, \\(\\rho_b\\) is fuel bulk density. Wind and slope modify the spread rate exponentially.",
      hints: [
        "Fire requires fuel, heat, and oxygen — think about which environmental variables control each leg of this triangle.",
        "Wind drives fire spread rate and direction; fuel moisture controls ignition probability. Both are key predictors in the Rothermel model.",
      ],
    },
    {
      id: "q-clim-kp20-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Active fire detection from satellites uses thermal infrared anomaly detection to identify burning pixels in near real-time.",
      correctAnswer: "True",
      explanation:
        "MODIS and VIIRS satellites detect active fires as thermal anomalies. The 4 µm mid-infrared brightness temperature of a fire pixel is much higher than background:\n\n" +
        "\\[T_{\\text{fire}} \\approx 300-500\\text{ K} \\quad \\text{vs.} \\quad T_{\\text{background}} \\approx 250-310\\text{ K}\\]\n\n" +
        "The fire detection algorithm identifies pixels where:\n\n" +
        "\\[T_{4\\mu\\text{m}} > T_{\\text{background}} + \\Delta T_{\\text{threshold}}\\]\n\n" +
        "ML refinements reduce false positives from sun glint, hot desert surfaces, and industrial facilities. NASA's FIRMS provides near-real-time active fire data.",
      hints: [
        "Active fires are much hotter than surrounding land. What physical property makes them detectable from space in the mid-infrared?",
        "NASA's FIRMS (Fire Information for Resource Management System) provides near-real-time active fire data. Which satellite instruments does it use?",
      ],
    },
    {
      id: "q-clim-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Physics-informed ML fire spread models improve over purely data-driven approaches by:",
      options: [
        "Removing the need for any input data",
        "Embedding Rothermel's fire spread equations as constraints or loss terms, ensuring physically consistent predictions",
        "Using reinforcement learning to fight virtual fires",
        "Only using historical fire perimeters without weather data",
      ],
      correctAnswer: 1,
      explanation:
        "The Rothermel model encodes the physics of fire spread:\n\n" +
        "\\[R = \\frac{I_{\\text{R}}}{\\rho_b \\epsilon \\delta Q} \\cdot \\phi_w \\cdot \\phi_s\\]\n\n" +
        "where \\(\\phi_w\\) and \\(\\phi_s\\) are wind and slope factors. Purely data-driven models may violate these physical constraints (e.g., predict fire spreading faster uphill than downhill).\n\n" +
        "Physics-informed neural networks (PINNs) embed these as loss terms:\n\n" +
        "\\[\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{data}} + \\lambda \\mathcal{L}_{\\text{physics}}\\]\n\n" +
        "where \\(\\mathcal{L}_{\\text{physics}}\\) penalizes violations of the Rothermel equations. This regularizes the model especially in data-sparse regions.",
      hints: [
        "Purely data-driven models may learn spurious correlations. Can a model trained only on historical fire perimeters learn that fire spreads faster uphill than downhill?",
        "Physics constraints serve as regularization. Why is this particularly important when training data covers only a fraction of possible fire conditions?",
      ],
    },
  ],

  "building-energy": [
    {
      id: "q-clim-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Building energy consumption prediction models are trained primarily on which type of data?",
      options: [
        "Satellite imagery of rooftops",
        "AMI/smart meter time-series data, weather data, and building characteristics",
        "Occupant surveys and interviews",
        "Utility company financial reports",
      ],
      correctAnswer: 1,
      explanation:
        "Advanced Metering Infrastructure (AMI) smart meters provide 15-minute to hourly consumption data. Combined with weather (temperature, humidity) and building characteristics (type, age, size):\n\n" +
        "\\[\\hat{E}_{t+1} = f_\\theta(E_t, E_{t-1}, \\ldots, W_t, W_{t-1}, \\ldots; \\text{building features})\\]\n\n" +
        "Weather is a major driver of heating/cooling loads, making it the most important external feature for building energy models.",
      hints: [
        "The most direct signal of energy consumption is the meter reading itself. What type of data does a smart meter provide?",
        "Weather is a major driver of heating/cooling loads. What external features would you include as inputs to a building energy prediction model?",
      ],
    },
    {
      id: "q-clim-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deep learning models for building energy prediction can learn occupancy patterns from smart meter data without explicit occupancy sensors.",
      correctAnswer: "True",
      explanation:
        "Occupancy creates characteristic temporal signatures in electricity consumption:\n\n" +
        "\\[\\text{Morning peak:} \\quad \\text{lights, coffee makers, HVAC ramp-up}\\]" +
        "\\[\\text{Afternoon low:} \\quad \\text{workday, minimal occupancy}\\]" +
        "\\[\\text{Evening peak:} \\quad \\text{cooking, entertainment, HVAC}\\]\n\n" +
        "LSTM and Transformer models learn these temporal patterns from historical consumption data, enabling implicit occupancy detection without dedicated sensors. This is both technically useful and a privacy concern — meter data reveals daily routines even without explicit tracking.",
      hints: [
        "Human presence causes predictable energy use patterns. Can these patterns be learned from meter data alone, or do you need explicit occupancy sensors?",
        "What does smart meter data reveal about daily routines even without explicit occupancy sensors?",
      ],
    },
    {
      id: "q-clim-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "EnergyPlus" model is used as a simulation tool for building energy optimization. How do ML models interface with it in optimization workflows?',
      options: [
        "They replace EnergyPlus entirely",
        "They serve as fast surrogate models trained on EnergyPlus simulation outputs for rapid optimization",
        "They post-process EnergyPlus visualizations",
        "They control EnergyPlus via natural language commands",
      ],
      correctAnswer: 1,
      explanation:
        "EnergyPlus simulations solve detailed physical models of building thermodynamics:\n\n" +
        "\\[\\frac{dT_{\\text{zone}}}{dt} = \\frac{1}{C}\\left( \\dot{Q}_{\\text{HVAC}} + \\dot{Q}_{\\text{solar}} + \\dot{Q}_{\\text{internal}} - \\dot{Q}_{\\text{loss}} \\right)\\]\n\n" +
        "Each simulation run takes minutes. ML surrogates trained on simulation results learn:\n\n" +
        "\\[\\hat{y} = f_\\theta(\\text{building design}, \\text{control params})\\]\n\n" +
        "These evaluate in milliseconds, enabling optimization over thousands of design alternatives per second via surrogate-based optimization (Bayesian optimization, CMA-ES).",
      hints: [
        "Running EnergyPlus for every candidate design in an optimization would take weeks. What is the standard solution for optimizing over expensive black-box functions?",
        "Surrogate-based optimization uses a fast approximation of the expensive simulator. What is the typical name for this approach?",
      ],
    },
  ],

  "hvac-control": [
    {
      id: "q-clim-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Reinforcement learning HVAC control agents formulate thermal comfort and energy cost as:",
      options: [
        "Two separate single-objective problems solved independently",
        "A multi-objective reward combining comfort penalty and energy cost minimization",
        "Hard constraints that cannot be traded off",
        "External signals provided by building occupants",
      ],
      correctAnswer: 1,
      explanation:
        "RL HVAC agents use a composite reward:\n\n" +
        "\\[r_t = -\\alpha \\cdot \\text{EnergyCost}_t - \\beta \\cdot \\text{ComfortPenalty}_t\\]\n\n" +
        "where comfort is measured by PPD (Predicted Percentage Dissatisfied) or PMV (Predicted Mean Vote) indices:\n\n" +
        "\\[\\text{PMV} = f(T, RH, v, M, I_c)\\]" +
        "\\[\\text{PPD} = 100 - 95 \\cdot e^{-(0.03353 \\cdot \\text{PMV}^4 + 0.2179 \\cdot \\text{PMV}^2)}\\]\n\n" +
        "The trade-off weights \\(\\alpha, \\beta\\) encode the desired comfort-energy compromise.",
      hints: [
        "Comfort and energy are often in tension — cooling more maintains comfort but uses more electricity. How is this trade-off formalized in RL?",
        "Multi-objective RL combines competing objectives into a single weighted reward. What do the weights encode?",
      ],
    },
    {
      id: "q-clim-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Google's DeepMind demonstrated RL-based cooling control in data centers, achieving approximately 40% reduction in cooling energy.",
      correctAnswer: "True",
      explanation:
        "DeepMind applied deep RL to Google's data center cooling systems (2016, published 2018). The RL agent learned to control cooling equipment (chillers, cooling towers, pumps, CRAHs) by processing:\n\n" +
        "\\[s_t = \\{T_{\\text{inlet}}, T_{\\text{outlet}}, P, \\text{setpoints}\\}\\]\n\n" +
        "The learned policy reduced cooling energy by ~40% and Power Usage Effectiveness (PUE) by 15%. PUE is defined as:\n\n" +
        "\\[\\text{PUE} = \\frac{\\text{Total facility power}}{\\text{IT equipment power}}\\]\n\n" +
        "This was one of the most widely cited real-world applications of deep RL to a physical control system.",
      hints: [
        "Data center cooling is a massive energy consumer globally. Even a few percent improvement represents significant cost savings and carbon reduction.",
        "This was one of the most widely cited real-world applications of deep RL. What made it significant?",
      ],
    },
    {
      id: "q-clim-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key safety challenge in deploying RL for HVAC control in occupied buildings is:",
      options: [
        "RL agents cannot process temperature sensor data",
        "Unsafe exploration during training can cause thermal discomfort or equipment damage before the agent has learned safe behavior",
        "HVAC systems do not have actuators that RL agents can control",
        "RL requires too much computational power to run on building management systems",
      ],
      correctAnswer: 1,
      explanation:
        "Standard RL uses exploration (trial-and-error) to learn:\n\n" +
        "\\[a_t = \\pi_\\theta(s_t) + \\epsilon \\quad \\text{(additive exploration noise)}\\]\n\n" +
        "In simulation, unsafe exploration has no consequences. In an occupied building:\n\n" +
        "\\[\\text{Unsafe action: set temperature to 35°C in summer} \\Rightarrow \\text{occupant discomfort, potential heat stroke}\\]\n\n" +
        "Safe RL addresses this via:\n" +
        "\\[- \\text{Constrained RL: } \\pi \\text{ constrained to safe state-action space}\\]" +
        "\\[- \\text{Model-based RL: simulate before acting in real world}\\]" +
        "\\[- \\text{Penalty method: large reward penalty for unsafe actions}\\]\n\n" +
        "This is critical for deployment in occupied buildings.",
      hints: [
        "In simulation, unsafe exploration has no consequences. In a real building, what are the consequences of exploration?",
        "Safe RL adds constraints to prevent the agent from taking actions that violate thermal comfort or equipment operating bounds. Why is this particularly important for buildings with occupants?",
      ],
    },
  ],

  "urban-heat-islands": [
    {
      id: "q-clim-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Urban Heat Islands (UHIs) cause city centers to be warmer than surrounding rural areas primarily because of:",
      options: [
        "Higher altitude of buildings",
        "Replacement of vegetation with impervious surfaces (asphalt, concrete) that absorb and retain heat, plus waste heat from human activity",
        "Air conditioning systems cooling the inside of buildings",
        "Higher population density causing more body heat",
      ],
      correctAnswer: 1,
      explanation:
        "UHIs arise from low-albedo impervious surfaces that absorb solar radiation, lack of evapotranspiration from vegetation, urban geometry trapping longwave radiation, and waste heat from traffic and buildings — all causing cities to be 1–5°C warmer than surrounding rural areas.",
      hints: [
        "Compare a grass field (cools through evapotranspiration, high albedo) to an asphalt parking lot (low albedo, no evaporation).",
        "The UHI effect is strongest at night when urban surfaces slowly release stored daytime heat.",
      ],
    },
    {
      id: "q-clim-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Landsat thermal infrared data is commonly used to map Land Surface Temperature (LST) and identify urban heat island hotspots.",
      correctAnswer: "True",
      explanation:
        "Landsat\'s Thermal Infrared Sensor (TIRS) measures LST at 100 m resolution (resampled to 30 m); ML algorithms combining LST with NDVI, surface albedo, and urban morphology data identify UHI hotspots and quantify the cooling effect of green spaces.",
      hints: [
        "LST from thermal infrared satellites captures the surface energy balance directly — hotter surfaces emit more thermal radiation.",
        "Combining LST with vegetation indices allows identification of which urban interventions (trees, green roofs) most effectively cool hotspots.",
      ],
    },
    {
      id: "q-clim-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ML models for urban heat island mitigation planning predict the cooling benefit of urban greening interventions. Which physical mechanism most strongly drives this cooling?",
      options: [
        "Increased solar reflectance (albedo) from leaf surfaces",
        "Evapotranspiration from vegetation that converts sensible heat to latent heat",
        "Shading only from tree canopies",
        "Reduction in vehicle traffic near parks",
      ],
      correctAnswer: 1,
      explanation:
        "Evapotranspiration is the dominant UHI mitigation mechanism of vegetation; plants transpire water that evaporates, consuming latent heat and dramatically cooling the surrounding air — urban trees can reduce local temperatures by 2–8°C through this process.",
      hints: [
        "Think about how sweating cools the human body — vegetation does the same thing at a large scale.",
        "Albedo and shading contribute, but evapotranspiration\'s latent heat flux is the largest cooling term in the urban surface energy balance.",
      ],
    },
  ],

  "transportation-emissions": [
    {
      id: "q-clim-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Transportation is the largest source of GHG emissions in many developed countries. ML models for transportation emissions use which data to estimate emissions at a fine spatial scale?",
      options: [
        "Only annual fuel sales statistics",
        "GPS traces, traffic counts, vehicle fleet composition, and speed data",
        "Only satellite imagery of roads",
        "Census population data alone",
      ],
      correctAnswer: 1,
      explanation:
        "High-resolution transportation emission models combine GPS probe vehicle data, traffic count sensors, fleet composition surveys, and speed profiles to estimate link-level emissions using vehicle emission factor models (MOVES, EMEP), enabling spatial mapping of transportation emissions.",
      hints: [
        "Emissions vary by vehicle type, speed, and road grade — fine-resolution estimation requires all of these inputs.",
        "GPS trace data from connected vehicles and navigation apps provides unprecedented detail on actual driving behavior.",
      ],
    },
    {
      id: "q-clim-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deep reinforcement learning is being applied to optimize EV charging schedules to minimize grid peak demand and maximize use of renewable energy.",
      correctAnswer: "True",
      explanation:
        "RL agents for EV charging management learn to schedule charging sessions to avoid grid peaks (valley filling), align with periods of high renewable generation (e.g., solar midday), and minimize electricity costs, while ensuring vehicles are charged by their departure time.",
      hints: [
        "EV charging is flexible in time — a vehicle plugged in for 8 hours only needs 2 hours of charging, giving 6 hours of flexibility.",
        "This flexibility makes EV charging a natural demand response resource that RL can optimize.",
      ],
    },
    {
      id: "q-clim-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Vehicle-to-Grid (V2G) concept uses EV batteries as grid storage. Which challenge makes RL-based V2G optimization particularly difficult?",
      options: [
        "EVs do not have bidirectional chargers",
        "Uncertainty in driver departure times and energy needs makes the MDP partially observable",
        "Grid frequency never changes, so optimization is unnecessary",
        "EVs cannot communicate with grid operators",
      ],
      correctAnswer: 1,
      explanation:
        "V2G optimization must ensure batteries are sufficiently charged when drivers need their vehicles, but departure times and trip energy needs are uncertain; the resulting partially observable MDP requires learning robust policies under uncertainty about future user behavior.",
      hints: [
        "If you discharge the battery too aggressively for V2G, the driver may not have enough range for their trip — how do you handle this uncertainty?",
        "Partial observability arises because the agent cannot observe future driver behavior — only past behavior and stated preferences.",
      ],
    },
  ],

  "smart-city-ai": [
    {
      id: "q-clim-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "AI-driven adaptive traffic signal control reduces emissions by:",
      options: [
        "Increasing the speed limit on all roads",
        "Reducing vehicle idling and stop-and-go driving through optimized signal timing based on real-time traffic flow",
        "Installing more traffic lights to slow vehicles",
        "Replacing all traffic lights with roundabouts",
      ],
      correctAnswer: 1,
      explanation:
        "Vehicles idling at red lights and accelerating from stops consume significantly more fuel and produce more emissions than steady-speed driving; AI traffic signal systems (e.g., Surtrac, DeepMind\'s TSCS) reduce stop frequency and idling time by coordinating signals to create green waves.",
      hints: [
        "Consider the fuel consumption difference between a car idling at a red light versus cruising at steady speed.",
        "Reducing the number of stop-start cycles per trip is the key mechanism for emission reduction in adaptive signal control.",
      ],
    },
    {
      id: "q-clim-kp25-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Digital twin technology combined with AI enables cities to simulate and optimize infrastructure decisions before physical implementation.",
      correctAnswer: "True",
      explanation:
        "City-scale digital twins (e.g., Singapore\'s Virtual Singapore) combine 3D urban models, sensor data, and AI simulation to test urban planning scenarios (building placements, transit routes, green space additions) and predict their impact on energy use, traffic, and emissions before costly physical changes.",
      hints: [
        "A digital twin is a real-time virtual replica of a physical system — cities can run experiments in the digital world first.",
        "Testing a new bus route in a simulation costs nothing; building a new road costs millions — digital twins enable cheap experimentation.",
      ],
    },
    {
      id: "q-clim-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-agent reinforcement learning (MARL) is used in smart city AI for distributed control problems. What makes MARL particularly challenging compared to single-agent RL?",
      options: [
        "MARL cannot handle continuous state spaces",
        "Non-stationarity: from each agent\'s perspective, other agents' changing policies make the environment non-stationary",
        "MARL requires more sensors than single-agent RL",
        "MARL agents cannot share information with each other",
      ],
      correctAnswer: 1,
      explanation:
        "In MARL, all agents learn simultaneously, so the environment each agent faces changes as other agents update their policies — this non-stationarity violates the stationarity assumption of single-agent RL and makes convergence guarantees much harder to establish.",
      hints: [
        "Single-agent RL assumes a stationary environment (fixed transition probabilities); what happens when other agents are also learning and changing?",
        "This is the multi-agent credit assignment and non-stationarity problem — a central challenge in MARL theory.",
      ],
    },
  ],

  "flood-risk": [
    {
      id: "q-clim-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Flood risk maps are produced by combining which two main types of data?",
      options: [
        "Ocean salinity and air pressure data",
        "Hydrological/hydraulic models of water flow (hazard) and exposure/vulnerability data about assets at risk",
        "Only historical flood insurance claims",
        "Soil pH and crop yield data",
      ],
      correctAnswer: 1,
      explanation:
        "Flood risk = hazard \\times exposure \\times vulnerability; hazard (inundation depth/frequency) comes from hydrological and hydraulic models, while exposure (buildings, infrastructure, population) and vulnerability (damage functions) come from land use and socioeconomic data.",
      hints: [
        "Risk in hazard science has a standard formula: risk is not just where flooding occurs, but also what and who is affected.",
        "A flood in an uninhabited desert is a hazard but not a risk — exposure and vulnerability complete the picture.",
      ],
    },
    {
      id: "q-clim-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LSTM networks have been applied to streamflow forecasting for flood early warning, outperforming traditional hydrological models in some catchments.",
      correctAnswer: "True",
      explanation:
        "Kratzert et al. (2018, 2019) demonstrated that LSTM networks trained on rainfall-runoff data from large basins outperform the SAC-SMA and VIC hydrological models in many catchments, leveraging data-driven learning of complex rainfall-runoff relationships.",
      hints: [
        "Streamflow depends on rainfall patterns accumulated over hours to days — which architecture is designed for temporal sequences?",
        'LSTMs can learn the "memory" of a catchment (soil moisture, groundwater) implicitly from historical rainfall-runoff pairs.',
      ],
    },
    {
      id: "q-clim-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Google\'s global flood forecasting system uses ML to extend flood prediction to ungauged river basins. What is the "ungauged basin" problem?',
      options: [
        "Basins with no satellite coverage",
        "Catchments without in-situ streamflow gauges, where traditional calibrated hydrological models cannot be applied",
        "Urban drainage systems with unknown pipe diameters",
        "Coastal areas with tidal influence",
      ],
      correctAnswer: 1,
      explanation:
        "Traditional hydrological models require calibration against observed streamflow data; in the ~60% of the world\'s land area with no stream gauges, ML models trained on gauged basins can transfer to ungauged ones using physical catchment attributes (geology, slope, soil), enabling global flood forecasting.",
      hints: [
        "Without observed data to calibrate against, how do you build a reliable flood model for a river no one has measured?",
        "ML models trained on diverse gauged basins learn general rainfall-runoff relationships that can generalize to ungauged catchments via similar physical attributes.",
      ],
    },
  ],

  "agricultural-ml": [
    {
      id: "q-clim-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which remote sensing vegetation index is most commonly used to monitor crop health and estimate agricultural yield?",
      options: [
        "NDWI (Normalized Difference Water Index)",
        "NDVI (Normalized Difference Vegetation Index)",
        "SAVI (Soil-Adjusted Vegetation Index)",
        "EVI (Enhanced Vegetation Index)",
      ],
      correctAnswer: 1,
      explanation:
        "NDVI = (NIR − Red)/(NIR + Red) exploits the contrast between strong near-infrared reflectance from healthy vegetation and red light absorption by chlorophyll; it is the most widely used index for crop health monitoring, phenology tracking, and yield prediction globally.",
      hints: [
        "Healthy plants absorb red light for photosynthesis and strongly reflect near-infrared — which index captures this contrast?",
        "NDVI is bounded between −1 and +1; healthy dense vegetation typically has NDVI > 0.6.",
      ],
    },
    {
      id: "q-clim-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Hyperspectral imaging combined with ML can detect crop disease and nutrient stress before visible symptoms appear.",
      correctAnswer: "True",
      explanation:
        "Disease and nutrient stress alter leaf biochemistry (chlorophyll, water content, lignin) that are detectable in specific hyperspectral bands before visual symptoms emerge; ML classifiers trained on hyperspectral signatures enable early intervention to prevent yield losses.",
      hints: [
        "Biochemical changes in leaves affect their spectral reflectance before the plant shows visible yellowing or lesions.",
        "Early detection (days to weeks before visible symptoms) enables preventive treatment rather than reactive response.",
      ],
    },
    {
      id: "q-clim-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Crop yield prediction models that combine satellite time-series with weather data and ML achieve good accuracy partly by capturing:",
      options: [
        "Soil chemical composition from orbit",
        "In-season crop growth trajectories (phenological development from planting through maturity) as temporal features",
        "Farmer decision-making behavior directly",
        "Commodity futures prices as a proxy for yield",
      ],
      correctAnswer: 1,
      explanation:
        "NDVI and LAI time-series from satellite sensors capture the crop growth curve from emergence through senescence; ML models that ingest this temporal trajectory can detect stress events, estimate accumulated biomass, and predict final yield months before harvest.",
      hints: [
        "The full growing season trajectory of a crop (not just one snapshot) contains far more information about final yield.",
        "A crop that showed stress in mid-season will have a different yield trajectory than one that grew consistently — temporal ML captures this.",
      ],
    },
  ],

  "climate-migration": [
    {
      id: "q-clim-kp28-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Climate vulnerability assessments that use ML combine which types of indices to identify at-risk populations?",
      options: [
        "Only temperature anomaly data",
        "Exposure to climate hazards, sensitivity (adaptive capacity), and socioeconomic vulnerability indicators",
        "GDP per capita alone",
        "Only sea level rise projections",
      ],
      correctAnswer: 1,
      explanation:
        "Climate vulnerability is a function of exposure (magnitude of climate change), sensitivity (how much a system is affected), and adaptive capacity (ability to cope and adjust); ML models integrate hazard maps, agricultural dependence, governance quality, health indicators, and poverty data to map compound vulnerability.",
      hints: [
        "The IPCC vulnerability framework has three components — a small island nation may have high exposure and low adaptive capacity.",
        "Vulnerability is not just physical proximity to a hazard; social, economic, and institutional factors determine who bears the greatest risk.",
      ],
    },
    {
      id: "q-clim-kp28-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ML models for climate migration prediction are trained on historical migration data combined with climate indicators to forecast future population displacement.",
      correctAnswer: "True",
      explanation:
        "Climate migration models use regression and ML approaches trained on historical migration flows, climate anomalies (droughts, floods, temperature extremes), agricultural shocks, and conflict data to project future displacement under different climate scenarios.",
      hints: [
        "Historical data on where people moved and what climate conditions preceded the movement provides the training signal.",
        "Climate migration is multi-causal — climate shocks interact with economic and political factors, requiring multi-variable ML models.",
      ],
    },
    {
      id: "q-clim-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Agent-based modeling (ABM) combined with ML is used for climate migration simulation. What advantage does ABM offer over statistical regression models?",
      options: [
        "ABM requires less data than regression",
        "ABM explicitly simulates individual household decisions and their interactions, capturing emergent collective migration dynamics",
        "ABM can only run on supercomputers",
        "ABM ignores climate variables",
      ],
      correctAnswer: 1,
      explanation:
        "ABMs simulate each household as an agent with decision rules (incorporating climate stress, social networks, economic resources); collective migration patterns emerge from these individual decisions, capturing threshold effects, network-driven migration corridors, and feedback loops that aggregate regression models miss.",
      hints: [
        "Migration has strong social network effects — people move where others from their community have moved.",
        "Emergent behaviors (sudden mass displacement when a tipping point is crossed) cannot be captured by linear aggregate models.",
      ],
    },
  ],

  "biodiversity-monitoring": [
    {
      id: "q-clim-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Passive acoustic monitoring (PAM) uses which ML technique to identify wildlife species from audio recordings?",
      options: [
        "Linear regression on sound amplitude",
        "Convolutional neural networks applied to spectrogram images of audio recordings",
        "K-means clustering of GPS coordinates",
        "Decision trees on habitat type",
      ],
      correctAnswer: 1,
      explanation:
        "Audio recordings are converted to spectrograms (2D time-frequency representations) that are treated as images; CNNs trained on labeled spectrograms can identify hundreds of bird, bat, frog, and insect species from their characteristic acoustic signatures.",
      hints: [
        "Spectrograms convert sound into a 2D image where patterns in time and frequency characterize each species' call.",
        "Once converted to an image, species identification becomes an image classification problem suited to CNNs.",
      ],
    },
    {
      id: "q-clim-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Camera trap image classification using deep learning allows automated species identification from millions of wildlife camera trap images, replacing manual expert labeling.",
      correctAnswer: "True",
      explanation:
        "Projects like Wildlife Insights and the Serengeti Camera Trap dataset use CNNs to classify species in camera trap images; models achieve expert-level accuracy on common species, enabling automated processing of millions of images that would take expert years to manually label.",
      hints: [
        "Camera traps generate enormous volumes of images — manual labeling by experts is the bottleneck for global biodiversity monitoring.",
        "CNNs trained on labeled image datasets transfer well to camera trap images where lighting and scene conditions vary significantly.",
      ],
    },
    {
      id: "q-clim-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Environmental DNA (eDNA) metabarcoding combined with ML is used for biodiversity assessment. What does eDNA metabarcoding detect?",
      options: [
        "Air pollution levels in ecosystems",
        "Species presence from DNA fragments shed into water or soil, identified by sequencing and ML taxonomic classification",
        "Photosynthesis rates of individual plants",
        "Soil pH levels across ecosystems",
      ],
      correctAnswer: 1,
      explanation:
        "eDNA metabarcoding sequences DNA fragments from environmental samples (water, soil, air); ML classifiers match these sequences against reference databases to taxonomically identify which species are present in an ecosystem without direct observation, enabling non-invasive biodiversity surveys.",
      hints: [
        "Animals shed DNA into their environment through skin cells, feces, and mucus — collecting water samples can reveal which fish species inhabit a lake.",
        "ML is needed to rapidly classify millions of short DNA sequences against reference databases covering hundreds of thousands of species.",
      ],
    },
  ],

  "climate-nlp": [
    {
      id: "q-clim-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "NLP models for climate policy analysis are used to extract which information from government reports and IPCC documents?",
      options: [
        "Weather forecasts embedded in policy text",
        "Policy commitments, emission targets, mitigation measures, and regulatory instruments",
        "Financial derivatives for carbon markets",
        "Satellite imagery metadata",
      ],
      correctAnswer: 1,
      explanation:
        "NLP models (named entity recognition, relation extraction, text classification) extract structured information from unstructured policy documents: emission targets (NDCs, net-zero pledges), policy instruments (carbon taxes, regulations), and sector-specific mitigation measures for systematic comparative analysis.",
      hints: [
        "Policy documents contain important commitments in free text — NLP can extract these systematically at scale.",
        "Comparing hundreds of national climate plans manually would take years; NLP automates this extraction.",
      ],
    },
    {
      id: "q-clim-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Large language models fine-tuned on ESG (Environmental, Social, Governance) reports can classify corporate climate disclosures by TCFD (Task Force on Climate-related Financial Disclosures) categories.",
      correctAnswer: "True",
      explanation:
        "LLMs fine-tuned on labeled ESG report text can classify disclosure paragraphs into TCFD categories (governance, strategy, risk management, metrics and targets), enabling automated structured extraction and comparison of climate risk disclosures across thousands of companies.",
      hints: [
        "TCFD defines specific categories for climate risk disclosure; NLP can learn to recognize which text belongs to which category.",
        "Automated TCFD classification enables investors and regulators to compare disclosures systematically across entire industries.",
      ],
    },
    {
      id: "q-clim-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Climate change communication research uses NLP sentiment analysis and framing detection to analyze which phenomenon in social media and news data?",
      options: [
        "Actual temperature anomalies correlated with social media activity",
        "How climate change is framed (e.g., as economic threat, moral issue, or security risk) and the prevalence of climate misinformation across platforms",
        "The typing speed of climate scientists on social media",
        "Satellite image captions on Instagram",
      ],
      correctAnswer: 1,
      explanation:
        "NLP framing analysis and misinformation detection models identify how climate change is portrayed across media ecosystems, tracking narrative frames (economic cost vs. opportunity, catastrophism vs. denial), misinformation narratives, and their geographic and temporal spread — informing communication strategies.",
      hints: [
        "How an issue is framed (the economic angle, the moral angle, the national security angle) influences public opinion differently.",
        "Misinformation detection requires identifying specific false claims about climate science at scale across millions of posts.",
      ],
    },
  ],
};

const moreClimQ: Record<string, Question[]> = {
  "climate-energy": [
    { id: "q-clim-kp31-1", type: "multiple-choice", difficulty: "medium", question: "AI-driven energy demand forecasting is critical for grid operators. Which ML approach is most effective for day-ahead electricity demand prediction given weather forecasts and historical consumption data?", options: ["K-nearest neighbors on raw consumption", "Gradient boosting models or LSTMs trained on weather variables (temperature, humidity, solar irradiance), calendar features, and lagged consumption — achieving MAPE below 2% for regional grids", "Simple linear regression on temperature alone", "Random forests without weather features"], correctAnswer: 1, explanation: "Day-ahead forecasting uses ensemble methods (gradient boosting: XGBoost/LightGBM) and deep sequence models (LSTM, Temporal Fusion Transformer). Key features include temperature (heating/cooling loads), solar irradiance (solar generation), and temporal patterns. Sub-2% MAPE is routinely achieved by leading utilities.", hints: ["Temperature is the strongest predictor of electricity demand — heat waves and cold snaps cause demand spikes.", "Residual load (demand minus renewable generation) forecasting is increasingly important as variable renewables penetrate grids."] },
    { id: "q-clim-kp31-2", type: "true-false", difficulty: "medium", question: "Reinforcement learning has been applied to data center cooling optimization (e.g., Google DeepMind's work), reducing cooling energy by 40% by learning optimal chiller and cooling tower setpoints.", correctAnswer: "True", explanation: "DeepMind's RL agent for Google data center cooling (2016, published 2018) reduced cooling energy by ~40% by learning complex multi-variable control policies for chillers, cooling towers, and pumps — a task too complex for traditional rule-based control. The agent outperformed human-engineered heuristics.", hints: ["The state space includes hundreds of sensors; the action space adjusts dozens of setpoints.", "Safety constraints are enforced via model-based rollouts before real-world action deployment."] },
    { id: "q-clim-kp31-3", type: "multiple-choice", difficulty: "hard", question: "Smart grid demand response uses ML to shift flexible loads (EV charging, HVAC, industrial processes) away from peak demand periods. The primary optimization challenge is:", options: ["Predicting solar panel degradation", "Coordinating distributed flexible assets to flatten the net load curve while respecting individual user preferences and comfort constraints — a multi-agent or hierarchical control problem", "Training convolutional networks on smart meter images", "Detecting grid equipment failures with satellite imagery"], correctAnswer: 1, explanation: "Demand response aggregation is a multi-agent control problem: each flexible asset has local preferences/constraints, and the aggregator must coordinate thousands of assets to provide grid services (peak shaving, frequency regulation). Multi-agent RL and model predictive control (MPC) with learned load models are leading approaches.", hints: ["EV charging: driver wants battery charged by 7am; aggregator wants to minimize charging during 5-8pm peak.", "Federated learning preserves user privacy while learning load flexibility models across millions of smart meters."] },
  ],
  "climate-agriculture": [
    { id: "q-clim-kp32-1", type: "multiple-choice", difficulty: "medium", question: "Crop yield prediction using satellite imagery and ML is critical for food security planning under climate change. Which sensor type is most informative for estimating crop biomass and growth stage?", options: ["RGB camera images", "Multispectral imagery including near-infrared (NIR) bands, enabling computation of NDVI and related vegetation indices", "Thermal infrared only", "Synthetic aperture radar only"], correctAnswer: 1, explanation: "NDVI (Normalized Difference Vegetation Index) = (NIR-Red)/(NIR+Red) correlates strongly with photosynthetic activity, leaf area index, and crop biomass. Multispectral + NIR imagery from Sentinel-2, Landsat, or Planet Scope enables NDVI time series for crop monitoring and yield forecasting via CNNs or LSTMs.", hints: ["Healthy green vegetation absorbs red light (photosynthesis) and strongly reflects NIR — making NIR critical.", "NDVI time series over a growing season captures phenological stages: planting, greenup, heading, senescence."] },
    { id: "q-clim-kp32-2", type: "true-false", difficulty: "easy", question: "Climate change projections suggest that agricultural yields for staple crops (wheat, maize, rice) will decrease on average in tropical and subtropical regions while potentially increasing in some high-latitude regions — a pattern that ML models trained on historical data may fail to capture accurately.", correctAnswer: "True", explanation: "ML models trained on historical climate-yield relationships may underestimate future impacts because future climate conditions (temperature, precipitation, CO2 concentrations) will be outside the historical training distribution. Process-based crop models (DSSAT, APSIM) combined with ML are preferred for out-of-distribution climate projection.", hints: ["Distribution shift: future extreme heat events are rarer in historical data, causing underestimation of heat stress impacts.", "Hybrid ML + process models: use ML for parameter estimation, process models for mechanistic projections."] },
    { id: "q-clim-kp32-3", type: "multiple-choice", difficulty: "hard", question: "Precision agriculture systems use ML to optimize variable-rate application of fertilizers and pesticides. The key environmental benefit beyond cost savings is:", options: ["Faster drone battery life", "Reducing excess fertilizer application that causes nitrous oxide (N2O) emissions and nitrogen runoff into waterways — N2O is a potent greenhouse gas (~265x CO2 over 100 years)", "Increasing total crop area", "Eliminating the need for crop rotation"], correctAnswer: 1, explanation: "Nitrogen fertilizer overapplication leads to (1) N2O emissions (strong GHG) from soil microbes, (2) nitrate runoff causing eutrophication of waterways, and (3) economic waste. ML-driven variable-rate fertilization (using soil sensors, yield maps, remote sensing) matches nitrogen supply to crop demand spatially and temporally.", hints: ["Agriculture accounts for ~10% of global GHG emissions, with N2O from fertilizers a major component.", "ML models predict crop nitrogen needs from soil organic matter maps, historical yield data, and real-time NDVI."] },
  ],
  "climate-carbon": [
    { id: "q-clim-kp33-1", type: "multiple-choice", difficulty: "medium", question: "Methane (CH4) leak detection from oil and gas infrastructure using satellite imagery has been advanced by ML. Which satellite instrument has been particularly transformative for global methane monitoring?", options: ["Landsat 8 multispectral sensor", "TROPOMI (TROPOspheric Monitoring Instrument) on Sentinel-5P, providing daily global CH4 column retrievals at 5.5km resolution", "GOES-16 weather satellite", "ICESat-2 lidar"], correctAnswer: 1, explanation: "TROPOMI provides daily global CH4 total column retrievals at ~5.5km x 3.5km resolution. ML algorithms (e.g., variational inversion models, neural network-based retrievals) dramatically improve detection of point source emitters — oil/gas facilities, coal mines, landfills. GHGSat and MethaneSAT provide even higher resolution.", hints: ["TROPOMI has detected super-emitter facilities responsible for disproportionately large CH4 emissions.", "Atmospheric inversion modeling with ML combines satellite observations with transport models to attribute emissions to sources."] },
    { id: "q-clim-kp33-2", type: "true-false", difficulty: "medium", question: "Direct Air Capture (DAC) of CO2 is being optimized using ML to discover novel sorbent materials with higher CO2 affinity, lower regeneration energy, and longer operational lifetimes.", correctAnswer: "True", explanation: "ML accelerates DAC sorbent discovery by screening vast chemical spaces (metal-organic frameworks, solid amines, ionic liquids) for CO2 adsorption properties. Graph neural networks predict adsorption isotherms, regeneration kinetics, and degradation rates from molecular structure — reducing the experimental screening burden.", hints: ["Metal-organic frameworks (MOFs) have millions of hypothetical structures — ML screens which to synthesize.", "Regeneration energy (releasing captured CO2 via heat or pressure swing) is the dominant DAC cost — ML targets this."] },
    { id: "q-clim-kp33-3", type: "multiple-choice", difficulty: "hard", question: "Natural carbon sink monitoring (forests, oceans, soils) uses ML to quantify carbon stocks and fluxes. The primary challenge for forest above-ground biomass estimation is:", options: ["Lack of any satellite data for forests", "Converting remotely sensed signals (LiDAR canopy height, SAR backscatter, optical reflectance) to biomass (Mg/ha) requires locally calibrated allometric equations — introducing large uncertainties in tropical forests where field data is sparse", "Forests don't store significant amounts of carbon", "ML cannot process multisource satellite data"], correctAnswer: 1, explanation: "Forest biomass estimation requires allometric conversion of tree metrics to carbon mass. In tropical forests (which store ~40% of terrestrial carbon), sparse field inventory data creates calibration uncertainty. GEDI LiDAR, Sentinel-1 SAR, and Landsat/Sentinel-2 fusion with ML reduces this uncertainty, but large confidence intervals remain for high-biomass tropical forests.", hints: ["GEDI (Global Ecosystem Dynamics Investigation) LiDAR on ISS measures 3D forest structure globally.", "Bayesian ML approaches quantify estimation uncertainty — critical for carbon credit verification."] },
  ],
  "climate-adaptation": [
    { id: "q-clim-kp34-1", type: "multiple-choice", difficulty: "medium", question: "Flood risk mapping using ML and remote sensing is critical for climate adaptation planning. Which combination of data sources provides the most accurate 100-year floodplain delineation?", options: ["Only historical flood records", "LiDAR-derived high-resolution DEMs + hydrological ML models calibrated on historical flood events + climate projections — outperforming traditional 1D hydraulic models for large-scale analysis", "Low-resolution SRTM elevation data alone", "Social media flood reports only"], correctAnswer: 1, explanation: "High-accuracy flood mapping requires: (1) LiDAR DEMs for precise terrain (0.1-1m resolution), (2) ML flood extent models calibrated on Sentinel-1 SAR flood observations, and (3) climate-adjusted precipitation frequency statistics. Together these enable probabilistic floodplain mapping at scale — essential for infrastructure planning.", hints: ["Sentinel-1 SAR penetrates clouds and provides flood extent maps during/after flood events globally.", "Physics-informed neural networks can emulate 2D hydraulic models (HEC-RAS, LISFLOOD) at a fraction of the computational cost."] },
    { id: "q-clim-kp34-2", type: "true-false", difficulty: "medium", question: "Climate migration modeling uses ML to identify populations most vulnerable to climate-induced displacement by integrating climate exposure (flood/drought/heat), socioeconomic vulnerability, and adaptive capacity indicators.", correctAnswer: "True", explanation: "Climate migration risk models (e.g., from World Bank, UNHCR) combine hazard layers (flood depth, drought index, sea level rise) with socioeconomic vulnerability data using ML to identify displacement hotspots — estimating 216M internal climate migrants by 2050 under business-as-usual scenarios.", hints: ["Adaptive capacity (income, education, social networks) reduces displacement risk even under equal climate exposure.", "ML models reveal which specific combinations of hazards and vulnerabilities drive migration decisions — informing targeted adaptation."] },
    { id: "q-clim-kp34-3", type: "multiple-choice", difficulty: "hard", question: "Compound climate event prediction (simultaneous or cascading extremes, e.g., concurrent drought and heatwave) is a frontier in climate ML. Why is compound event frequency underestimated by analyzing hazards independently?", options: ["Individual hazard models are too accurate for compound analysis", "Climate variables are correlated (heatwaves increase drought severity via evapotranspiration; high soil temperature amplifies heat stress) — joint probability of compound events is higher than the product of marginal probabilities when variables are positively dependent", "Compound events only occur in mountainous regions", "Independent analysis overestimates compound event frequency"], correctAnswer: 1, explanation: "Drought and heatwave co-occurrence is positively correlated: drought reduces latent heat flux (evaporation), causing more surface heating that worsens the heatwave. Joint return period estimation requires copula models or ML that captures multivariate dependencies rather than treating hazards as independent.", hints: ["A 1-in-100-year drought and 1-in-100-year heatwave occurring simultaneously is more likely than 1-in-10,000 if they're positively correlated.", "Vine copulas and multivariate neural density estimators capture the dependence structure between climate extremes."] },
  ],
  "climate-ocean": [
    { id: "q-clim-kp35-1", type: "multiple-choice", difficulty: "medium", question: "Ocean heat content (OHC) is a critical indicator of climate change, absorbing ~90% of excess energy. ML approaches for OHC estimation from sparse Argo float profiles use which technique to reconstruct the full 3D ocean state?", options: ["Simple spatial interpolation of float observations", "Optimal interpolation with ML-learned covariance structures, or data-driven ocean state estimation combining Argo floats, satellite altimetry, and SST observations via Gaussian processes or neural networks", "Only climate model output", "Ship-based observations only"], correctAnswer: 1, explanation: "Argo floats provide ~4000 temperature/salinity profiles globally but sample sparsely. ML optimal interpolation combines float data with satellite altimetry (sea level), SST, and ocean model prior to reconstruct full 3D temperature fields. Products like ARMOR3D use this approach for global subsurface ocean monitoring.", hints: ["Satellite altimetry measures sea surface height, which integrates the thermal expansion signature of OHC changes.", "Argo floats profile down to 2000m; Deep Argo extends to 6000m for abyssal ocean monitoring."] },
    { id: "q-clim-kp35-2", type: "true-false", difficulty: "medium", question: "Ocean acidification (decreasing pH from CO2 absorption) is monitored using ML models that predict surface ocean pCO2 (partial pressure of CO2) from satellite observations of temperature, chlorophyll, and salinity.", correctAnswer: "True", explanation: "Surface ocean pCO2 determines CO2 flux direction and rate. Ship-based measurements are sparse; ML (neural networks, XGBoost) trained on ship transect data predicts global surface pCO2 maps from satellite SST, chlorophyll-a, mixed layer depth, and climatological salinity — enabling global ocean carbon flux estimation.", hints: ["The SOCAT dataset provides millions of pCO2 measurements from research vessels and ships of opportunity.", "Ocean net CO2 uptake (currently ~2.5 PgC/yr) is estimated by integrating satellite-predicted pCO2 flux maps."] },
    { id: "q-clim-kp35-3", type: "multiple-choice", difficulty: "hard", question: "Marine heatwaves (MHWs) — prolonged periods of anomalously warm ocean temperatures — cause coral bleaching and fishery disruption. ML prediction of MHW onset and duration uses:", options: ["Only sea surface temperature anomaly thresholds", "Precursor signals in subsurface ocean heat content, ENSO state, Pacific Decadal Oscillation indices, and atmospheric circulation patterns — learned by LSTMs or transformer models for 4-16 week prediction lead times", "Random forest on cloud cover alone", "MHW prediction is impossible beyond 1 week"], correctAnswer: 1, explanation: "MHW predictability stems from slowly evolving ocean heat content anomalies and large-scale climate modes (ENSO, PDO, AMO). LSTMs and attention models trained on subsurface temperature, satellite SST, and climate indices provide 4-8 week skillful MHW predictions — enabling coral reef early warning systems.", hints: ["The 2013-2015 'Blob' MHW in the North Pacific was predictable 2-3 months in advance from subsurface heat content.", "MHW intensity (how far above the 90th percentile seasonal threshold) and duration both matter for ecosystem impact."] },
  ],
  "climate-policy": [
    { id: "q-clim-kp36-1", type: "multiple-choice", difficulty: "medium", question: "Integrated Assessment Models (IAMs) like DICE, REMIND, and MESSAGE compute optimal climate policy pathways. ML is being integrated into IAMs primarily to:", options: ["Replace all process-based components with neural networks", "Replace computationally expensive damage functions, energy system modules, and economic optimization solvers with emulators — enabling uncertainty quantification across thousands of IAM runs", "Predict stock market responses to climate policy", "Visualize IAM outputs only"], correctAnswer: 1, explanation: "IAM emulators (neural network surrogates) trained on IAM runs can evaluate the full model in milliseconds vs hours, enabling Monte Carlo uncertainty quantification across policy and climate uncertainty dimensions. ML also enables climate-economy damage function estimation from observed economic-climate relationships.", hints: ["The Social Cost of Carbon (SCC) is computed by IAMs — uncertainty quantification across damage function assumptions changes SCC dramatically.", "Emulator-based IAMs enable real-time policy scenario exploration — interactive climate policy dashboards."] },
    { id: "q-clim-kp36-2", type: "true-false", difficulty: "easy", question: "AI systems themselves have a significant and growing carbon footprint due to energy consumption in training and inference, which is relevant when evaluating AI's net climate impact.", correctAnswer: "True", explanation: "Large model training (GPT-4, Gemini) consumes millions of kWh — comparable to hundreds of transatlantic flights. Inference at scale (billions of daily queries) adds further emissions. However, AI's potential to accelerate clean energy, reduce industrial emissions, and improve grid efficiency may far exceed its own footprint if deployed at scale.", hints: ["ML CO2 emissions depend on energy source: training on renewable energy vs coal has 10-40x different carbon intensity.", "Patterson et al. (2021) estimated GPT-3 training ~552 tCO2e — but also noted this is amortized over all inference uses."] },
    { id: "q-clim-kp36-3", type: "multiple-choice", difficulty: "hard", question: "Carbon pricing mechanism design (cap-and-trade, carbon tax) is being informed by ML analysis of energy market data, emissions monitoring, and behavioral economics. The key ML contribution is:", options: ["ML sets carbon prices automatically without human input", "ML estimates the price elasticity of emissions across sectors and firms, detects carbon leakage patterns, and identifies optimal price trajectories to meet emissions targets — supporting evidence-based policy design", "ML enforces carbon regulations in real-time", "ML replaces all economic modeling for climate policy"], correctAnswer: 1, explanation: "ML analyzes large administrative datasets (firm-level emissions, energy consumption, production data) to estimate sector-specific price elasticities, detect leakage (firms relocating emissions offshore), and evaluate policy counterfactuals via causal ML methods. This empirical approach complements theoretical economic models for policy design.", hints: ["Carbon leakage: emissions don't decrease if carbon-intensive production simply moves to unregulated regions.", "Causal ML (difference-in-differences, synthetic control) estimates the counterfactual: what would emissions have been without the carbon price?"] },
  ],
  "climate-ml-risks": [
    { id: "q-clim-kp37-1", type: "multiple-choice", difficulty: "hard", question: "Climate model emulators (neural networks trained to emulate expensive climate model runs) face a critical challenge for climate change applications that doesn't affect weather forecasting as severely. This challenge is:", options: ["Emulators run too slowly for real-time applications", "Emulators are trained on historical climate data and current model runs (within known forcing ranges) but must generalize to novel forcing scenarios (higher CO2, different aerosols) — severe out-of-distribution extrapolation beyond training data", "Emulators cannot process gridded climate data", "Climate emulators require too much training data"], correctAnswer: 1, explanation: "Weather forecast emulators (like Pangu, GraphCast) operate near the training data distribution. Climate emulators must project decades into the future under forcing scenarios that may exceed anything in training data (e.g., SSP5-8.5 CO2 concentrations). Without physics constraints, purely data-driven climate emulators risk catastrophic extrapolation failures.", hints: ["Physics-informed neural networks (PINNs) and hybrid ML-physical models partially address extrapolation via embedded physical laws.", "Climate model ensembles (CMIP6) provide training data across multiple forcing scenarios, partially mitigating OOD issues."] },
    { id: "q-clim-kp37-2", type: "true-false", difficulty: "medium", question: "Bias correction of climate model outputs using ML (quantile delta mapping, neural network correction) can introduce spurious trends if the bias correction method is not designed to preserve the model's climate change signal.", correctAnswer: "True", explanation: "Naive bias correction (e.g., quantile mapping that shifts model outputs to match observed distributions) can distort the climate change delta (future-present difference) if the correction function is applied stationarily. Trend-preserving bias correction methods (quantile delta mapping) correct biases while preserving the relative change signal.", hints: ["The 'delta method': apply the model's climate change delta to the observed baseline, bypassing raw model values.", "Non-stationarity assumption: the bias correction relationship trained on historical data may not hold in future climate states."] },
    { id: "q-clim-kp37-3", type: "multiple-choice", difficulty: "hard", question: "Geoengineering governance research uses ML to analyze the risk of 'termination shock' if solar radiation management (SRM, e.g., stratospheric aerosol injection) is suddenly stopped. The termination shock risk is:", options: ["SRM causes permanent stratospheric damage", "Rapid rebound warming if SRM is abruptly halted after decades of use, since the underlying CO2 forcing persists — the temperature would rise rapidly to where it would have been without SRM", "SRM can only be operated for 5 years maximum", "Termination shock only affects polar regions"], correctAnswer: 1, explanation: "If SRM is deployed for decades and then suddenly stopped (due to geopolitical conflict, funding failure, or technical failure), temperatures would rebound rapidly (over years, not decades) to what they would have been without SRM — but the world would be unprepared for such rapid change. ML climate models quantify the probability and magnitude of termination shock under different scenarios.", hints: ["The bounce-back rate (degrees C/decade) upon termination could far exceed any historically experienced warming rate.", "This risk creates a 'ratchet effect' — once SRM is deployed, stopping it is itself a major climate risk."] },
  ],
  "climate-biodiversity": [
    { id: "q-clim-kp38-1", type: "multiple-choice", difficulty: "medium", question: "ML-powered species distribution modeling (SDM) projects how climate change will shift the geographic ranges of species. Which approach captures the nonlinear relationships between climate variables and species occurrence better than traditional MaxEnt models?", options: ["Linear discriminant analysis on species records", "Gradient boosting (BRT/GBM) or deep neural networks that capture nonlinear interactions between temperature, precipitation, soil, and topography predictors across millions of occurrence records", "Principal component analysis of climate variables only", "K-means clustering of species habitats"], correctAnswer: 1, explanation: "Traditional MaxEnt uses linear features; modern SDMs use gradient boosting trees or neural networks that capture nonlinear climate-species relationships. When combined with CMIP6 climate projections, these models project range shifts, contractions, and novel climate refugia under different emissions scenarios.", hints: ["Ensemble SDMs combining multiple algorithms (MaxEnt, BRT, RF) reduce model uncertainty in range projections.", "Bioclim variables (e.g., BIO1-BIO19) from WorldClim provide standard climate predictors for global SDMs."] },
    { id: "q-clim-kp38-2", type: "true-false", difficulty: "medium", question: "Bioacoustic monitoring using ML (training classifiers on audio recordings from forests and reefs) enables scalable, low-cost biodiversity assessment without requiring expert taxonomists in the field.", correctAnswer: "True", explanation: "Passive acoustic monitoring (PAM) with ML classifiers (CNNs on spectrograms, BirdNET, FrogID) identifies species from audio at scale. Coral reef soundscapes indicate reef health; tropical forest recorders detect deforestation. AudioMoth sensors and cloud ML enable continent-scale biodiversity monitoring at unprecedented scale and cost.", hints: ["BirdNET (Cornell Lab) classifies 3000+ bird species from audio spectrograms with high accuracy.", "Acoustic complexity indices (ACI, BIO) provide rapid biodiversity proxies without species-level classification."] },
    { id: "q-clim-kp38-3", type: "multiple-choice", difficulty: "hard", question: "The IUCN Red List assessment process is being accelerated by ML to predict extinction risk for data-deficient species. The key features used are:", options: ["Only taxonomic classification", "Life history traits (body size, generation length, reproductive rate), range size, habitat specificity, and remotely sensed habitat condition trends — combined in gradient boosting models trained on assessed species", "Social media mentions of species", "Genome sequence length only"], correctAnswer: 1, explanation: "ML extinction risk models trained on IUCN-assessed species use life history traits and range/habitat features to predict risk categories for data-deficient species (currently ~20% of assessed species). This enables rapid, consistent risk screening across millions of unassessed species — essential given accelerating biodiversity loss.", hints: ["Small range size and habitat specialization are among the strongest predictors of extinction risk.", "GARPy, PREDICTS, and similar ML frameworks enable continuous automated IUCN red list screening."] },
  ],
  "climate-infrastructure": [
    { id: "q-clim-kp39-1", type: "multiple-choice", difficulty: "medium", question: "Infrastructure climate risk assessment uses ML to estimate physical climate risks (damage probabilities from floods, hurricanes, wildfires) to assets like power grids, bridges, and buildings. The key methodological advance over deterministic engineering assessments is:", options: ["ML replaces all engineering calculations", "Probabilistic damage functions learned from historical damage records + Monte Carlo climate scenario sampling, providing distributions of expected damage across the full uncertainty range of climate projections", "ML only identifies which assets are at risk, not the magnitude", "Infrastructure risk assessment doesn't use remote sensing"], correctAnswer: 1, explanation: "Classical engineering uses deterministic design standards (e.g., 100-year flood). ML enables probabilistic vulnerability curves (damage ratio vs hazard intensity) trained on actual damage records, combined with climate model ensembles — producing expected damage distributions that inform risk-informed infrastructure investment and insurance pricing.", hints: ["Physical risk metrics: expected annual damage (EAD), value at risk (VaR) under 1.5°C vs 4°C scenarios.", "CLIMADA, RiskScape, and similar open platforms combine ML damage functions with climate hazard datasets."] },
    { id: "q-clim-kp39-2", type: "true-false", difficulty: "easy", question: "Building energy retrofitting prioritization using ML can identify which buildings will benefit most from insulation, HVAC upgrades, or solar panel installation by analyzing energy consumption data, building characteristics, and climate projections.", correctAnswer: "True", explanation: "ML building energy models (EnergyScore, data-driven EPC models) trained on smart meter data, building age/type/material, and climate variables identify retrofit opportunities. Targeting high-consumption, low-efficiency buildings in climate-vulnerable zones maximizes both emissions reductions and climate resilience per investment dollar.", hints: ["Energy Performance Certificates (EPC) labels are predicted from building characteristics without full energy audits.", "Federated learning across utility companies enables large-scale building energy modeling without sharing individual customer data."] },
    { id: "q-clim-kp39-3", type: "multiple-choice", difficulty: "hard", question: "Sea level rise (SLR) projections for coastal infrastructure planning must integrate multiple contributing processes. ML is used to improve which component of SLR projections?", options: ["ML replaces all physical oceanographic modeling", "ML emulates ice sheet dynamics (WAIS/Greenland instability), improving probabilistic SLR projections that span a wide range from 0.3m to >2m by 2100 depending on ice sheet behavior assumptions", "ML only projects storm surge, not mean SLR", "SLR projection is fully solved by existing tide gauge records"], correctAnswer: 1, explanation: "Marine ice sheet instability (MISI) is the largest source of SLR uncertainty. ML emulators of ice sheet models (BISICLES, PISM) enable large ensemble explorations of ice dynamics parameters, improving tail-risk quantification. This is critical: a 2m vs 0.5m SLR by 2100 fundamentally changes coastal adaptation needs.", hints: ["Structured Expert Judgment (SEJ) and ML ice sheet emulators provide probabilistic SLR distributions including low-probability high-impact tails.", "Coastal planners use SLR percentiles (e.g., 17th-83rd) for 'likely' scenarios and 95th-99th for 'risk-averse' planning."] },
  ],
  "climate-transport": [
    { id: "q-clim-kp40-1", type: "multiple-choice", difficulty: "medium", question: "Route optimization for shipping and aviation using ML can reduce transport sector emissions (currently ~25% of global CO2). The key optimization for maritime shipping is:", options: ["Maximizing ship speed at all times", "Weather-routing optimization using ML models of ocean currents, wave height, and wind patterns to find minimum-fuel routes — reducing fuel consumption 5-15% without speed reductions", "Minimizing port waiting times only", "Optimizing crew scheduling only"], correctAnswer: 1, explanation: "ML weather routing combines ocean current forecasts, wave/wind data, and ship performance models (hull fouling, propeller efficiency) to find fuel-optimal routes. Combined with hull cleaning optimization and slow steaming, ML-based route optimization contributes significantly to IMO's target of 50% shipping emissions reduction by 2050.", hints: ["Ocean currents (Gulf Stream, Kuroshio) can add or reduce effective ship speed by 2-3 knots — significant for fuel consumption.", "Digital twin models of individual ships learn vessel-specific fuel consumption curves from AIS and engine telemetry data."] },
    { id: "q-clim-kp40-2", type: "true-false", difficulty: "medium", question: "Contrail avoidance routing for aviation — rerouting flights to avoid ice-supersaturated regions where persistent contrails form — can reduce aviation's climate forcing by up to 60%, and ML is used to predict contrail formation probability from weather forecasts.", correctAnswer: "True", explanation: "Persistent contrails contribute ~35% of aviation's total climate impact (warming). ML models trained on satellite-detected persistent contrails and ERA5 meteorological reanalysis predict contrail formation probability from humidity, temperature, and aircraft type. Google Research showed contrail avoidance routing in Japan reduced contrail formation by 54% with only 0.3% fuel penalty.", hints: ["Schmidt-Appleman criterion predicts contrail formation from engine exhaust temperature and ambient conditions.", "Contrails only form in ice-supersaturated air masses (RHi > 100%) — ML identifies these volumes from NWP forecasts."] },
    { id: "q-clim-kp40-3", type: "multiple-choice", difficulty: "hard", question: "Electric vehicle (EV) adoption modeling for climate policy uses ML to forecast EV market penetration. The Bass diffusion model augmented with ML predictors includes which climate-relevant factor?", options: ["Color preferences of car buyers only", "Charging infrastructure density, electricity grid carbon intensity, battery cost learning curves, policy incentives, and consumer range anxiety — together determining the social and economic conditions for mass EV adoption", "Only oil price forecasts", "Vehicle weight regulations only"], correctAnswer: 1, explanation: "ML-augmented adoption models capture the nonlinear interactions between: (1) charging infrastructure (availability determines range anxiety), (2) electricity price and carbon intensity (affects lifecycle emissions), (3) battery cost learning curves (S-curve of technology cost reduction), and (4) policy incentives. These produce scenario-based EV adoption forecasts used by the IEA, IRENA, and national energy agencies.", hints: ["Battery costs have followed Wright's Law: ~18% cost reduction per doubling of cumulative production — from $1200/kWh in 2010 to ~$100/kWh by 2025.", "Grid carbon intensity determines EV lifecycle emissions — EVs charged on coal-heavy grids may have higher lifecycle emissions than efficient ICE vehicles in some regions."] },
  ],
};

Object.assign(questions, moreClimQ);

registerQuestions(questions);
export default questions;
