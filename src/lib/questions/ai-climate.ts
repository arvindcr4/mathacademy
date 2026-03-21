import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "nwp-ml": [
    {
      id: "q-clim-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "PanGu-Weather uses a hierarchical 3D Earth Specific Transformer (3DEST) architecture. What is the key reason for using separate transformer models at different forecast lead times rather than a single model for all horizons?",
      options: [
        "Separate models reduce memory usage by sharing no parameters across time horizons",
        "Atmospheric predictability has different dominant spatial scales at short vs. long lead times — short-range forecasts require capturing mesoscale detail while longer horizons are dominated by synoptic-scale dynamics",
        "Different transformer depths are legally required by meteorological standards bodies for different forecast horizons",
        "Separate models allow different training datasets to be used for each lead time",
      ],
      correctAnswer: 1,
      explanation:
        "PanGu-Weather (Bi et al., 2023) trains four separate 3DEST models for lead times of 1h, 3h, 6h, and 24h. This hierarchical design reflects that short-range forecasting requires high-resolution mesoscale features while longer horizons are dominated by synoptic-scale patterns. Forecasts for arbitrary horizons are produced by composing model calls (e.g., 24h + 6h + 1h = 31h), analogous to binary doubling.",
      hints: [
        "The atmosphere evolves differently at short (hours) and medium (days) timescales — different physical processes dominate.",
        "PanGu-Weather\'s hierarchical composition (1h, 3h, 6h, 24h) allows arbitrary lead times by chaining models, similar to how powers of 2 represent any integer.",
      ],
    },
    {
      id: "q-clim-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ML models like Pangu-Weather and FourCastNet can produce global weather forecasts at a fraction of the computational cost of traditional NWP models.",
      correctAnswer: "True",
      explanation:
        "ML-based forecast models trained on ERA5 reanalysis data can generate 10-day global forecasts in seconds on a single GPU, compared to thousands of CPU-hours for operational NWP systems like ECMWF\'s IFS. PanGu-Weather produces a 10-day global forecast (0.25° resolution, 13 pressure levels) in about 1.4 seconds on a single A100 GPU.",
      hints: [
        "Once trained, neural networks perform only forward inference — compare this to solving differential equations numerically at each time step.",
        "ECMWF\'s IFS requires a large HPC cluster; ML models reduce this to a single GPU at inference time.",
      ],
    },
    {
      id: "q-clim-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'PanGu-Weather\'s 3D Earth Specific Transformer (3DEST) modifies standard transformer attention to be "Earth-specific." What does this Earth-specific modification address?',
      options: [
        "Replacing positional encodings with learned altitude embeddings for pressure levels",
        "Adding latitude-dependent absolute position biases to self-attention to account for Earth\'s spherical geometry and the non-uniform area of latitude bands at different latitudes",
        "Masking attention between land and ocean grid points to prevent spurious correlations",
        "Using separate attention heads for each of the 13 pressure levels to prevent inter-level information mixing",
      ],
      correctAnswer: 1,
      explanation:
        "Standard transformers use uniform positional encodings that do not reflect Earth\'s spherical geometry. PanGu-Weather\'s 3DEST incorporates Earth-specific relative position biases in attention that depend on latitude, capturing the fact that grid cells near the poles represent much smaller physical areas than equatorial cells and that atmospheric dynamics are anisotropic with respect to latitude.",
      hints: [
        "On a regular lat-lon grid, the 360 cells along a latitude circle near the pole span the same longitude degrees as equatorial cells but cover far less physical area.",
        'Earth-specific position biases teach the attention mechanism that "north-south" and "east-west" spatial relationships have different meaning depending on latitude.',
      ],
    },
  ],

  graphcast: [
    {
      id: "q-clim-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "GraphCast represents the global atmosphere using an icosahedral multi-mesh rather than a regular lat-lon grid. What advantage does an icosahedral mesh provide over a regular lat-lon grid?",
      options: [
        "It reduces the total number of atmospheric variables stored from 227 to 10",
        "The icosahedral mesh has near-uniform area across the globe, avoiding the polar singularity and grid-cell area distortion of lat-lon grids",
        "It allows GraphCast to assimilate satellite observations directly without remapping",
        "The triangular cells of an icosahedral mesh can represent topography more accurately than rectangular grid cells",
      ],
      correctAnswer: 1,
      explanation:
        "A regular lat-lon grid has extremely small cells near the poles (where longitude lines converge), causing numerical instability and wasted computation in polar regions. GraphCast uses a refined icosahedral mesh (subdivision of a regular icosahedron projected onto the sphere) that provides near-uniform cell areas across the globe, avoiding polar singularities and making message passing spatially uniform.",
      hints: [
        "On a lat-lon grid, the 360 cells along a latitude circle near the pole span the same longitude degrees as equatorial cells but cover far less physical area.",
        "An icosahedron has 20 equilateral triangular faces; recursive subdivision and projection onto the sphere yields a nearly uniform triangular mesh.",
      ],
    },
    {
      id: "q-clim-kp2-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "GraphCast was trained on ECMWF\'s ERA5 reanalysis dataset, which provides historical atmospheric states on a global grid at 0.25° resolution covering 1979–2018.",
      correctAnswer: "True",
      explanation:
        "GraphCast (Lam et al., DeepMind 2023) was trained on 40 years of ERA5 reanalysis data (1979–2018) at 0.25° resolution (~28 km), learning to auto-regressively predict the next 6-hour atmospheric state for 227 variables across 37 pressure levels. ERA5 is the ECMWF\'s fifth-generation atmospheric reanalysis, considered the gold-standard gridded climate dataset.",
      hints: [
        "ERA5 is the European Centre for Medium-Range Weather Forecasts' fifth generation reanalysis — a gridded reconstruction of past weather.",
        "0.25° resolution corresponds to roughly 28 km at the equator — the finest publicly available global reanalysis.",
      ],
    },
    {
      id: "q-clim-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GraphCast uses an encoder-processor-decoder architecture with a multi-resolution mesh in the processor. How does the multi-resolution mesh enable efficient global information propagation?",
      options: [
        "The processor uses a coarse global mesh alongside a fine local mesh; grid-to-mesh and mesh-to-grid mappings allow information to travel long distances in few GNN hops on the coarser levels",
        "The multi-resolution mesh doubles the number of message-passing steps at each resolution level",
        "Coarser mesh levels are used only for ocean variables while finer levels handle atmospheric variables",
        "The encoder compresses all grid points onto a single node that broadcasts global information before the processor runs",
      ],
      correctAnswer: 0,
      explanation:
        "GraphCast\'s processor uses a hierarchy of icosahedral meshes at multiple refinement levels simultaneously. The encoder maps input lat-lon grid data to the finest mesh; the processor runs 16 rounds of GNN message passing on this multi-mesh where coarser levels allow information to traverse the globe in fewer hops (long-range propagation), while finer levels capture local detail. The decoder maps mesh outputs back to the lat-lon grid.",
      hints: [
        "On a fine mesh, a GNN message propagates only to nearest neighbors per step — how many steps are needed to cross the globe? A coarser mesh makes this much shorter.",
        "The multi-mesh connects each fine-mesh node to nodes at all coarser resolutions, creating shortcuts for long-range atmospheric teleconnections.",
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
        "Generate high-resolution local climate information from coarse global model output",
        "Compress climate datasets for storage",
        "Downsample satellite imagery to lower resolution",
      ],
      correctAnswer: 1,
      explanation:
        "Statistical downscaling learns a mapping from coarse-resolution global climate model output to fine-resolution local observations, enabling high-resolution projections of temperature, precipitation, and other variables for impact studies.",
      hints: [
        "Global climate models run at 50–100 km resolution; local impact studies need 1–10 km — downscaling bridges this gap.",
        'The word "down" refers to going down in scale (larger scale number = finer resolution).',
      ],
    },
    {
      id: "q-clim-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deep learning super-resolution methods (e.g., SRCNN, ESRGAN) have been adapted for climate downscaling, treating coarse climate grids like low-resolution images.",
      correctAnswer: "True",
      explanation:
        "Deep learning downscaling methods (e.g., DeepSD, ClimateGAN) apply image super-resolution architectures to climate fields, learning to add fine-scale spatial detail to coarse climate model outputs by training on paired coarse-fine datasets.",
      hints: [
        "Climate fields on a grid are 2D arrays of values — structurally similar to image pixel grids.",
        "Super-resolution networks learn to hallucinate plausible fine-scale detail; the same idea applies to climate variables.",
      ],
    },
    {
      id: "q-clim-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge in evaluating deep learning climate downscaling models is:",
      options: [
        "The models produce outputs that are too smooth and lack fine-scale variability",
        "Climate variables have no spatial structure",
        "Deep learning cannot process gridded data",
        "Downscaling only works for temperature, not precipitation",
      ],
      correctAnswer: 0,
      explanation:
        "Pixel-wise loss functions (MSE/MAE) penalize large pointwise errors and produce overly smooth outputs that preserve the mean but suppress physically important extremes and fine-scale variability; perceptual and physics-informed losses help address this.",
      hints: [
        "MSE minimization finds the conditional mean, which averages out variability — is this a problem for capturing extreme events?",
        'This is the same "blurriness" problem seen in image super-resolution with L2 loss — what alternative losses are used in classical SR?',
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
        "Event attribution science uses probabilistic methods and ML to compare the likelihood of extreme events in the current climate versus a counterfactual world without anthropogenic forcing, estimating the human influence on extreme event risk.",
      hints: [
        'Attribution asks not just "did this happen?" but "would it have happened without climate change, and how likely was it?"',
        "This requires comparing two worlds: the factual (with human forcing) and counterfactual (without it).",
      ],
    },
    {
      id: "q-clim-kp4-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Convolutional neural networks have been applied to detect extreme weather patterns (e.g., tropical cyclones, atmospheric rivers) in climate model output.",
      correctAnswer: "True",
      explanation:
        "CNNs trained on labeled climate model outputs can identify spatial patterns characteristic of extreme events (tropical cyclones, atmospheric rivers, weather fronts) at scale across petabytes of climate simulation data.",
      hints: [
        "Climate data on a grid is spatially structured — the same convolution operations that detect image features can detect spatial weather patterns.",
        "Manual labeling of extreme events is time-consuming; CNNs can automate detection across large climate archives.",
      ],
    },
    {
      id: "q-clim-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Rare extreme events pose a class imbalance problem for ML models. Which technique is commonly used to address this?",
      options: [
        "Undersampling common events and oversampling extremes, or using asymmetric loss functions",
        "Ignoring rare events in training data",
        "Using only events with return periods under 10 years",
        "Normalizing all event probabilities to be equal",
      ],
      correctAnswer: 0,
      explanation:
        "Extreme events are by definition rare; ML models trained with standard losses are biased toward common conditions. Techniques include SMOTE oversampling, undersampling majorities, focal loss, or extreme-value-theory-based loss functions to improve sensitivity to rare extremes.",
      hints: [
        'A model that predicts "no extreme" 99% of the time can have high accuracy if extremes are rare — but this is useless.',
        "Class imbalance solutions either rebalance the training data or reweight the loss to penalize misclassification of rare events more heavily.",
      ],
    },
  ],

  "earth-system-emulators": [
    {
      id: "q-clim-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Neural Earth System Model (ESM) emulators are trained to replace which component of traditional climate simulations?",
      options: [
        "The data collection instruments",
        "The computationally expensive forward simulation of the full Earth system",
        "The human analysis of climate projections",
        "The storage infrastructure for climate data",
      ],
      correctAnswer: 1,
      explanation:
        "ESM emulators (e.g., ClimaX, NeuralGCM) learn to approximate the input-output mapping of expensive physics-based Earth system models, enabling rapid generation of climate projections at a fraction of the computational cost.",
      hints: [
        "Running a full ESM for one scenario can take weeks on a supercomputer; an emulator produces similar outputs in minutes.",
        "Emulators enable large ensemble studies (thousands of runs) that would be infeasible with the full model.",
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
        "Emulators can fail to generalize to emissions scenarios (e.g., extreme mitigation or high-end warming) far outside their training distribution, a form of distribution shift that requires careful validation and sometimes domain adaptation.",
      hints: [
        "ML models generalize within the distribution they were trained on — consider what happens when inputs are very different from training data.",
        "An emulator trained on 1.5–4°C warming scenarios may extrapolate poorly to a 6°C scenario.",
      ],
    },
    {
      id: "q-clim-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ClimaX (Nguyen et al., 2023) is a foundation model for climate science. What training strategy allows it to generalize across many climate tasks?",
      options: [
        "Supervised training on a single labeled dataset",
        "Pre-training on diverse climate and weather datasets with masked prediction, then fine-tuning on downstream tasks",
        "Reinforcement learning with reward signals from weather stations",
        "Zero-shot inference without any training",
      ],
      correctAnswer: 1,
      explanation:
        "ClimaX uses a BERT-style masked token prediction pre-training objective on multiple heterogeneous climate datasets (ERA5, CMIP6, etc.), learning general atmospheric representations that can be fine-tuned for forecasting, downscaling, or projection tasks.",
      hints: [
        "Foundation models in NLP use self-supervised pre-training then task-specific fine-tuning — ClimaX applies this paradigm to climate.",
        "The diversity of pre-training data enables the model to learn generalizable atmospheric features.",
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
        "Wind speed at hub height",
        "Global Horizontal Irradiance (GHI) or Direct Normal Irradiance (DNI)",
        "Sea surface temperature",
        "Soil moisture content",
      ],
      correctAnswer: 1,
      explanation:
        "PV power generation is primarily driven by solar irradiance (GHI for flat panels, DNI for concentrating systems); ML models forecast irradiance from NWP outputs, satellite imagery, or sky camera images, then convert to power using panel efficiency curves.",
      hints: [
        "Photovoltaic panels convert light energy to electricity — what measure of light reaching the surface is most relevant?",
        "GHI (global horizontal irradiance) is the total solar radiation on a horizontal surface, the standard input for PV models.",
      ],
    },
    {
      id: "q-clim-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Sky imagery from ground-based cameras combined with CNNs can forecast solar irradiance up to several hours ahead with high accuracy.",
      correctAnswer: "False",
      explanation:
        "Sky cameras provide accurate very short-term (nowcasting, 0–30 minutes) forecasts by tracking cloud movement, but multi-hour ahead forecasts require NWP model output or satellite data, as clouds move beyond the camera\'s field of view.",
      hints: [
        "Sky cameras capture a local view; clouds move across the sky — how far ahead can you predict from a local camera?",
        "The forecasting horizon of sky cameras is limited by the time it takes clouds to move out of or into the field of view.",
      ],
    },
    {
      id: "q-clim-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Probabilistic solar forecasting is preferred over deterministic point forecasts for grid integration. Why?",
      options: [
        "Probabilistic forecasts are easier to compute",
        "Grid operators need uncertainty quantification to make optimal reserve scheduling and risk management decisions",
        "Deterministic forecasts are illegal in electricity markets",
        "Probabilistic forecasts are more accurate in mean absolute error",
      ],
      correctAnswer: 1,
      explanation:
        "Grid operators need to know not just the expected solar output but also its uncertainty (prediction intervals, quantiles) to optimally schedule spinning reserves, storage dispatch, and ancillary services — decisions that require risk-aware optimization.",
      hints: [
        'A forecast saying "500 MW ± 50 MW" is more actionable than just "500 MW" when deciding how much backup capacity to hold.',
        "Reserve scheduling is an economic decision under uncertainty — probabilistic information enables better decisions.",
      ],
    },
  ],

  "wind-forecasting": [
    {
      id: "q-clim-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Wind power output P is related to wind speed v by which physical relationship?",
      options: ["P ∝ v", "P ∝ v²", "P ∝ v³", "P ∝ √v"],
      correctAnswer: 2,
      explanation:
        "Wind power follows P = ½ρAv³ (Betz\'s law), scaling as the cube of wind speed; this cubic relationship means small errors in wind speed forecasts translate to large errors in power prediction, making accurate wind forecasting critical.",
      hints: [
        "The kinetic energy of air flowing through a turbine rotor area A at speed v involves both area, density, and the speed — what power of v appears in kinetic energy?",
        "Kinetic energy is ½mv² and power is energy per unit time; the mass flow rate through the turbine adds another factor of v.",
      ],
    },
    {
      id: "q-clim-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SCADA data from wind turbines (rotor speed, pitch angle, power output, vibration) can be used to train ML models for predictive maintenance.",
      correctAnswer: "True",
      explanation:
        "SCADA systems on wind turbines collect high-frequency operational data; ML models trained on this data can detect anomalies and predict component failures (gearbox, bearings, blades) days to weeks before they occur, reducing unplanned downtime.",
      hints: [
        "SCADA data contains rich real-time operational signals that change when components start to degrade.",
        "Predictive maintenance uses historical failure data to train models that recognize the precursor signatures of failures.",
      ],
    },
    {
      id: "q-clim-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Wake effects in wind farms reduce downstream turbine power output. Which ML approach is commonly used to model wake interactions for farm-level power optimization?",
      options: [
        "Linear regression on total farm output",
        "Graph Neural Networks treating turbines as nodes and wake propagation as directed edges",
        "Convolutional networks on satellite wind maps",
        "Recurrent networks on national grid frequency data",
      ],
      correctAnswer: 1,
      explanation:
        "Wake interactions propagate from upwind to downwind turbines following the prevailing wind direction; GNNs naturally represent this directed spatial dependency, with turbines as nodes and wake edges carrying flow deficit information for farm-level optimization.",
      hints: [
        "Wake effects are directional and depend on turbine layout and wind direction — what data structure captures pairwise directional relationships?",
        "The interaction graph changes with wind direction, making dynamic GNNs appropriate for varying wake topologies.",
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
        "ML-driven demand response programs forecast demand, identify flexible loads (HVAC, EV charging, industrial processes), and send price signals or direct control commands to shift consumption away from peak periods, reducing the need for expensive peaking plants.",
      hints: [
        "Demand response is about adjusting consumption, not generation — when is grid stress highest and what can be deferred?",
        "Flexible loads that can be shifted in time without significant user impact are the target of demand response programs.",
      ],
    },
    {
      id: "q-clim-kp8-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Optimal Power Flow (OPF) is an NP-hard optimization problem that ML methods are being used to speed up for real-time grid operation.",
      correctAnswer: "True",
      explanation:
        "AC Optimal Power Flow is non-convex and NP-hard in general; ML approaches (learning to warm-start solvers, predict active constraints, or directly output near-optimal solutions) enable faster OPF solving for real-time grid dispatch decisions.",
      hints: [
        "OPF involves non-linear power flow equations over a large network — it\'s computationally intensive even for medium-sized grids.",
        "ML can learn the mapping from grid conditions to optimal dispatch, bypassing iterative solver steps.",
      ],
    },
    {
      id: "q-clim-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Graph Neural Networks applied to power grid optimization treat the grid as a graph. What do nodes and edges represent?",
      options: [
        "Countries and their energy trading relationships",
        "Buses (substations/generators) and transmission lines",
        "Individual electrons and their paths",
        "Time steps and state transitions",
      ],
      correctAnswer: 1,
      explanation:
        "In power grid GNNs, nodes represent electrical buses (substations, generators, loads) with voltage and power injection features, and edges represent transmission lines with impedance and thermal limit attributes, enabling physics-informed message passing.",
      hints: [
        'A power grid connects generation sources to loads through transmission infrastructure — what are the natural "atoms" of this network?',
        "The graph structure of a GNN mirrors the physical topology of the power grid.",
      ],
    },
  ],

  "energy-storage": [
    {
      id: "q-clim-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Reinforcement learning is used for battery storage management in energy systems. What is typically the RL agent\'s action space?",
      options: [
        "The physical battery chemistry parameters",
        "Charge and discharge power rate (or the decision to hold)",
        "The electricity price forecast",
        "The solar irradiance level",
      ],
      correctAnswer: 1,
      explanation:
        "The RL agent for battery management controls the charge/discharge power rate (positive = charge, negative = discharge, zero = hold) at each time step, optimizing decisions over a horizon to maximize revenue or minimize grid costs subject to state-of-charge constraints.",
      hints: [
        "The agent controls what it can actively decide — it observes prices and state of charge, but can only control energy flow.",
        "Battery management is fundamentally a sequential decision problem: when to buy (charge) and when to sell (discharge) energy.",
      ],
    },
    {
      id: "q-clim-kp9-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The State of Charge (SoC) of a battery must always be maintained within safe bounds (e.g., 20%–90%) to prevent degradation, and this is a key constraint in RL-based battery management.",
      correctAnswer: "True",
      explanation:
        "Overcharging (SoC > 100%) or deep discharging (SoC < 0%) damages battery cells; RL agents for battery management must incorporate SoC bounds as hard constraints or penalize violations in the reward function to protect battery longevity.",
      hints: [
        "Batteries have physical limits on charge; exceeding them degrades capacity permanently.",
        "Safe RL or constrained MDP formulations are needed to enforce SoC bounds during training and deployment.",
      ],
    },
    {
      id: "q-clim-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In energy arbitrage with a battery, the optimal charging strategy depends on forecasting electricity prices. Which RL formulation naturally handles the uncertainty in future prices?",
      options: [
        "Deterministic model predictive control",
        "Stochastic MDP with probabilistic price forecasts as part of the state",
        "Linear programming over a fixed price schedule",
        "Greedy single-step optimization",
      ],
      correctAnswer: 1,
      explanation:
        "Electricity prices are stochastic; formulating battery management as a stochastic MDP where the state includes probabilistic price forecasts (e.g., scenario trees or distributional embeddings) allows the RL agent to learn risk-aware policies that hedge against price uncertainty.",
      hints: [
        "Deterministic control assumes perfect foresight; real prices are uncertain — which framework naturally handles this?",
        "An RL agent trained on diverse price scenarios learns to be robust to uncertainty rather than optimizing for a single predicted trajectory.",
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
        "A VPP aggregates heterogeneous distributed energy resources (DERs) — rooftop solar, home batteries, EV chargers, flexible loads — and coordinates them via software to appear and operate as a single dispatchable power plant to the grid.",
      hints: [
        'The "virtual" in VPP means there is no single physical plant — it is a software-coordinated portfolio of small assets.',
        "Aggregation allows small resources that cannot participate individually in wholesale markets to do so collectively.",
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
        "VPP optimization requires accurate forecasts of each asset\'s available flexibility (e.g., how much a battery can discharge, how much an EV can be delayed); ML aggregates these across thousands of assets to optimize market bids and real-time dispatch.",
      hints: [
        "Each asset (solar panel, battery, EV) has its own forecast uncertainty; aggregating thousands reduces total uncertainty.",
        "Optimal market bidding requires knowing not just expected output but also the uncertainty in available capacity.",
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
        "Federated learning trains a global aggregation model by sharing only model updates (gradients), not raw energy usage data, preserving the privacy of individual residential and commercial customers while still enabling system-wide optimization.",
      hints: [
        "Home energy data is sensitive — smart meter data can reveal daily routines and occupancy patterns.",
        "Federated learning keeps sensitive data on local devices while still contributing to a shared model.",
      ],
    },
  ],

  "ghg-monitoring": [
    {
      id: "q-clim-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Satellite-based GHG monitoring uses which type of spectroscopy to detect CO₂ and CH₄ concentrations in the atmosphere?",
      options: [
        "X-ray fluorescence",
        "Near-infrared and shortwave-infrared (NIR/SWIR) absorption spectroscopy",
        "Microwave radar backscatter",
        "Visible light photometry",
      ],
      correctAnswer: 1,
      explanation:
        "CO₂ and CH₄ absorb solar radiation at specific NIR/SWIR wavelengths; satellites like OCO-2, GOSAT, and Sentinel-5P measure the reflected sunlight spectrum to retrieve column-averaged GHG concentrations using spectral inversion algorithms.",
      hints: [
        "Greenhouse gases absorb infrared radiation — this same absorption signature in sunlight reflected from the surface enables remote sensing.",
        "The specific wavelengths at which CO₂ and CH₄ absorb define the spectral bands used by GHG monitoring satellites.",
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
        "ML models (CNNs, matched filters combined with deep learning) applied to hyperspectral data from EMIT, PRISMA, and GHGSat satellites can detect and quantify individual methane super-emitter plumes from oil and gas facilities, landfills, and agriculture.",
      hints: [
        "Individual facility plumes create small, localized spectral anomalies in satellite imagery — ML can detect these patterns.",
        "EMIT (Earth Surface Mineral Dust Source Investigation) data has been used to map thousands of methane plumes globally.",
      ],
    },
    {
      id: "q-clim-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Inverse modeling in atmospheric GHG monitoring uses ML to solve which ill-posed problem?",
      options: [
        "Predicting future emissions from policy scenarios",
        "Inferring surface emission fluxes from observed atmospheric concentration measurements",
        "Generating synthetic satellite images for training",
        "Converting spectral radiance to surface reflectance",
      ],
      correctAnswer: 1,
      explanation:
        "Inverse modeling solves for the surface emission field (sources and sinks) that best explains observed atmospheric concentrations, accounting for atmospheric transport; this ill-posed inversion is being accelerated with ML as an efficient surrogate for the transport model.",
      hints: [
        "Forward modeling predicts concentrations from emissions; inverse modeling reverses this — going from observations to sources.",
        "Atmospheric transport makes this problem ill-posed: many different emission patterns can produce similar observation signals.",
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
        "Industrial facilities emit heat and chemical plumes detectable in thermal infrared and spectral bands; ML models applied to multispectral, hyperspectral, and thermal satellite imagery can identify and classify emission sources, map plumes, and estimate emission rates.",
      hints: [
        "Hot industrial processes emit heat and chemical by-products — which parts of the electromagnetic spectrum capture these?",
        "Visible imagery shows facility structure; thermal IR reveals heat signatures; hyperspectral captures chemical absorption features.",
      ],
    },
    {
      id: "q-clim-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Object detection models (e.g., YOLO, Faster R-CNN) have been adapted to detect industrial infrastructure (power plants, oil refineries) in satellite imagery to track global emissions sources.",
      correctAnswer: "True",
      explanation:
        "Projects like Global Energy Monitor and WattTime\'s Climate TRACE use object detection models trained on labeled satellite imagery to automatically detect and track industrial assets (cooling towers, flare stacks, storage tanks) globally for bottom-up emissions accounting.",
      hints: [
        "Industrial facilities have distinctive visual signatures from space — cooling towers, stacks, storage tanks — detectable by object detectors.",
        "Automating facility detection across the globe at scale is only feasible with ML, not manual annotation.",
      ],
    },
    {
      id: "q-clim-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Climate TRACE uses a multi-modal ML approach to estimate facility-level emissions. Which combination of data sources is typical?",
      options: [
        "Only self-reported emissions from companies",
        "Satellite imagery, nighttime lights, air quality sensor data, economic activity proxies, and atmospheric observations fused with ML",
        "Ground-level air quality monitors only",
        "Smartphone GPS traces of industrial workers",
      ],
      correctAnswer: 1,
      explanation:
        "Climate TRACE combines satellite remote sensing (optical, thermal, SAR), nighttime lights (as activity proxy), air quality measurements, weather data, and atmospheric GHG observations in multi-modal ML models to produce independent, facility-level emissions estimates.",
      hints: [
        "No single data source captures all aspects of facility activity and emissions — multi-modal fusion provides redundancy and fills gaps.",
        "The goal is independent estimation without relying on self-reported data that may be incomplete or inaccurate.",
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
        "Raw material extraction through disposal/end-of-life",
        "Just the use phase of a product",
        "Only transportation emissions",
      ],
      correctAnswer: 1,
      explanation:
        "Cradle-to-grave LCA tracks all environmental impacts from raw material extraction (cradle), through manufacturing, distribution, use, and finally to waste treatment or disposal (grave), providing a complete picture of a product\'s lifecycle emissions.",
      hints: [
        'The metaphor of "cradle" (birth/raw materials) to "grave" (disposal) covers the full product lifecycle.',
        "Partial LCA (e.g., only the use phase) misses important upstream or downstream emissions.",
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
        "NLP models (named entity recognition, relation extraction, document classification) trained on sustainability reporting standards (GRI, TCFD, CDP) can automatically extract Scope 1, 2, and 3 emission figures from unstructured text in annual reports and ESG disclosures.",
      hints: [
        "Corporate sustainability reports contain emissions data in unstructured text — NLP can extract structured information from this.",
        "Automating extraction at scale enables comparison and aggregation of emissions data across thousands of companies.",
      ],
    },
    {
      id: "q-clim-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Scope 3 emissions are the most challenging to account for in corporate carbon accounting. Why?",
      options: [
        "They occur inside the company\'s own facilities",
        "They span the entire value chain (upstream suppliers and downstream customers) and require data from entities outside direct control",
        "They are too small to measure accurately",
        "They only apply to financial institutions",
      ],
      correctAnswer: 1,
      explanation:
        "Scope 3 covers indirect value chain emissions (purchased goods, employee travel, product use and disposal) from entities outside the reporting company\'s operational control, requiring data collection from thousands of suppliers and customers with varying reporting quality.",
      hints: [
        "Scope 1 is direct (own facilities), Scope 2 is purchased energy, and Scope 3 is everything else up and down the supply chain.",
        "A manufacturer\'s Scope 3 can be 10x larger than Scopes 1+2 combined, but tracking it requires cooperation from all suppliers.",
      ],
    },
  ],

  "deforestation-detection": [
    {
      id: "q-clim-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which satellite constellation provides frequent (daily to weekly) optical imagery of the entire Earth\'s surface, enabling near-real-time deforestation monitoring?",
      options: [
        "GPS satellites",
        "Planet Labs' Dove constellation (3–5 m resolution daily coverage)",
        "Hubble Space Telescope",
        "NOAA weather satellites",
      ],
      correctAnswer: 1,
      explanation:
        "Planet Labs' fleet of hundreds of Dove CubeSats achieves daily global coverage at 3–5 m resolution; this high temporal frequency enables near-real-time change detection, making it transformative for deforestation monitoring in systems like GLAD alerts.",
      hints: [
        "Near-real-time deforestation monitoring needs high revisit frequency — which satellite constellation is designed for daily global coverage?",
        "Traditional satellites like Landsat revisit every 16 days — insufficient for rapid deforestation events.",
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
        "Tropical rainforests are frequently covered by clouds that block optical satellites; SAR sensors emit microwave pulses that penetrate clouds and collect structural backscatter information from the forest canopy, enabling continuous monitoring regardless of cloud cover.",
      hints: [
        "Optical sensors need sunlight and clear skies; radar systems generate their own signal and can operate day/night, through clouds.",
        "The Amazon and Congo Basin are perpetually cloud-covered in optical imagery — SAR provides reliable coverage.",
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
        "GLAD alerts analyze dense time-series of Landsat 8 reflectance data, using spectral indices (NDVI, NDWI) and statistical change detection with a Bayesian probability model to identify pixels where forest cover has been lost, providing near-weekly alerts.",
      hints: [
        "GLAD needs to detect sudden changes in dense vegetation — which spectral index measures vegetation greenness?",
        'Time-series analysis can flag the moment a pixel\'s spectral signature changes from "dense forest" to "bare ground."',
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
        "IAMs couple energy system models (technology deployment, cost curves), macroeconomic models (investment, GDP), land-use models (agriculture, forests), and simplified climate models to explore consistent scenarios of decarbonization pathways and their consequences.",
      hints: [
        "Reaching net zero requires changes across energy, economy, land use, and climate — no single model type captures all these dimensions.",
        "The IPCC uses IAMs (e.g., MESSAGE, REMIND, IMAGE) to develop the shared socioeconomic pathways (SSPs).",
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
        "ML emulators trained on IAM scenario databases can evaluate thousands of pathway scenarios in seconds, enabling rapid exploration of the solution space for optimal decarbonization strategies that would take months using the full IAM.",
      hints: [
        "Running a full IAM scenario takes hours to days; emulators compress this to milliseconds, enabling optimization over the policy space.",
        'This is the same "emulator" concept used for climate models — fast ML approximations of expensive simulations.',
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
        "Net-zero pathways involve Pareto trade-offs among cost minimization, emission reduction speed, energy security (avoiding import dependence), distributional equity (just transition), biodiversity (land use for bioenergy), and food security (competition for land).",
      hints: [
        "A pathway that minimizes cost might require massive land use for bioenergy, conflicting with food and biodiversity goals.",
        "Multi-objective problems have no single optimal solution — they have a Pareto frontier of trade-offs.",
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
        "Semantic segmentation produces a dense class map where each pixel is assigned a land cover or land use category; unlike object detection (bounding boxes), segmentation provides pixel-level understanding of the spatial distribution of classes.",
      hints: [
        'Segmentation answers "what is this pixel?" for every pixel in the image simultaneously.',
        "Dense pixel labeling is more informative than bounding boxes for area estimation tasks like measuring deforestation or urban expansion.",
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
        "U-Net\'s encoder-decoder with skip connections preserves fine spatial detail while building hierarchical semantic features; this architecture transfers effectively to satellite imagery segmentation and has become a standard baseline for remote sensing tasks.",
      hints: [
        "Skip connections in U-Net pass high-resolution spatial features directly from the encoder to the decoder — why would this matter for segmentation?",
        "The encoder-decoder structure works for any dense prediction task, not just the biomedical images it was designed for.",
      ],
    },
    {
      id: "q-clim-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A major challenge in satellite semantic segmentation is domain shift between different sensors. What causes this shift?",
      options: [
        "Different countries use different map projections",
        "Different sensors have different spectral bands, spatial resolutions, and radiometric calibrations",
        "Satellite data is always in different file formats",
        "Cloud masks are applied inconsistently",
      ],
      correctAnswer: 1,
      explanation:
        "Models trained on Sentinel-2 imagery (10 m, 13 bands) fail on Planet imagery (3 m, 4 bands) because the spectral and spatial characteristics differ; domain adaptation, multi-sensor training, or foundation models pretrained on diverse sensors address this shift.",
      hints: [
        "A model trained on one camera fails when deployed on another — this is domain shift, caused by differences in the imaging process.",
        "Satellite sensors vary in wavelength bands, ground sampling distance, and calibration — all of which change the statistical distribution of image values.",
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
        "Masked AutoEncoder (MAE) on HLS Landsat and Sentinel-2 time-series data",
        "Contrastive learning between paired SAR and optical images",
        "Next-token prediction on satellite metadata text",
      ],
      correctAnswer: 1,
      explanation:
        "Prithvi uses a Vision Transformer trained with Masked AutoEncoder objectives on Harmonized Landsat Sentinel (HLS) multi-spectral time-series data, learning rich spatiotemporal representations that can be fine-tuned for downstream Earth observation tasks.",
      hints: [
        "MAE (masked autoencoding) learns by predicting masked patches — applied to satellite time-series instead of natural images.",
        "Self-supervised pre-training on large unlabeled satellite archives avoids the need for massive labeled datasets.",
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
        "Foundation models pre-trained on large unlabeled satellite datasets learn general geospatial representations that transfer efficiently; fine-tuning on hundreds to thousands of labeled samples achieves competitive performance on tasks like crop mapping, flood detection, and building extraction.",
      hints: [
        "The pre-training on massive unlabeled data provides rich initial representations — fine-tuning only adjusts these for the specific task.",
        "This mirrors how BERT fine-tuning works in NLP: strong pre-trained features + small labeled dataset = good downstream performance.",
      ],
    },
    {
      id: "q-clim-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SatMAE extends standard MAE to handle satellite imagery by introducing which key modification?",
      options: [
        "Replacing transformers with CNNs for efficiency",
        "Temporal and spectral group masking to handle multi-temporal multi-spectral inputs",
        "Using GPS coordinates as positional encodings instead of 2D grid positions",
        "Applying contrastive loss instead of reconstruction loss",
      ],
      correctAnswer: 1,
      explanation:
        "SatMAE introduces temporal and spectral group masking strategies that mask entire time steps or spectral bands rather than random patches, forcing the model to learn meaningful temporal and cross-spectral relationships critical for Earth observation applications.",
      hints: [
        "Standard MAE masks random spatial patches; satellite data also has temporal and spectral dimensions — how should masking be adapted?",
        "Group masking at the temporal/spectral level teaches the model to reconstruct missing time steps or bands, a more meaningful pretext task.",
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
        "Atmospheric water vapor content",
      ],
      correctAnswer: 1,
      explanation:
        "Change detection algorithms identify pixels or objects that have changed between two or more images taken at different times, enabling monitoring of urban growth, deforestation, disaster damage, and coastline change.",
      hints: [
        "If the same location looks different in two images from different dates, something on the ground has changed.",
        "Change detection is the foundation of many Earth observation monitoring applications.",
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
        "Siamese networks process two images (bi-temporal or multi-temporal) through shared-weight encoders to extract aligned feature representations, then compute a difference or attention map that highlights changed regions — a natural architecture for comparative analysis.",
      hints: [
        "Siamese networks were originally designed for face verification (comparing two images) — change detection is analogous.",
        "Shared weights ensure that both images are projected into the same feature space, making their comparison meaningful.",
      ],
    },
    {
      id: "q-clim-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Time-series change detection using CCDC (Continuous Change Detection and Classification) fits which model to each pixel\'s spectral time series?",
      options: [
        "A deep neural network with LSTM layers",
        "A harmonic regression model with seasonal components, detecting breaks in the model fit",
        "A random forest classifier on monthly composites",
        "A support vector machine on spectral difference images",
      ],
      correctAnswer: 1,
      explanation:
        "CCDC fits harmonic (sinusoidal) regression models to capture seasonal vegetation cycles in each pixel\'s Landsat time series; abrupt changes (deforestation, floods, agriculture conversion) appear as statistical breaks in the model residuals.",
      hints: [
        "Vegetation has strong seasonal cycles — a model that captures these cycles can detect when they are disrupted.",
        "Harmonic models fit sine/cosine curves to time series; a sharp deviation from the fitted curve signals a change.",
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
        "Satellites measure SST using thermal infrared sensors that detect the long-wave radiation emitted by the ocean surface; ML correction algorithms remove atmospheric interference and cloud contamination to produce high-quality SST products used for ocean heat monitoring.",
      hints: [
        "Temperature determines the wavelength of thermal emission (Planck\'s law) — which part of the spectrum detects heat?",
        "Thermal infrared sensors measure emitted rather than reflected radiation, making them sensitive to surface temperature.",
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
        "Passive microwave sensors (SMMR, SSM/I, SSMIS) measure natural microwave emission from the sea ice surface and have provided continuous global sea ice extent and concentration data since 1979, revealing dramatic Arctic ice loss correlated with climate warming.",
      hints: [
        "Passive microwave sensors work day/night and through clouds — essential for monitoring the polar regions.",
        "The 45+ year microwave record provides the definitive long-term dataset for Arctic and Antarctic sea ice change.",
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
        "Phytoplankton contain chlorophyll-a, which absorbs blue light and reflects green light; ocean color sensors measure the water-leaving reflectance spectrum, and ML algorithms (neural networks, mixture density networks) retrieve chlorophyll-a concentrations to map phytoplankton distribution.",
      hints: [
        "Phytoplankton are the base of the marine food web and a major carbon sink — how can satellites detect microscopic organisms in the ocean?",
        "Ocean color changes from blue (clear deep water) to green (chlorophyll-rich) as phytoplankton concentration increases.",
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
        "Wildfire risk depends on the fire triangle (fuel, heat, oxygen); ML models integrate fuel type and moisture (from satellite vegetation indices and weather), topography (slope, aspect channeling wind), meteorological conditions, and lightning/human ignition patterns.",
      hints: [
        "Fire requires fuel, heat, and oxygen — think about which environmental variables control each leg of this triangle.",
        "Wind drives fire spread rate and direction; fuel moisture controls ignition probability — both are key predictors.",
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
        "MODIS and VIIRS satellites detect active fires as thermal anomalies (pixels with anomalously high 4 µm mid-infrared brightness temperature) relative to their surroundings; ML refinements reduce false positives from sun glint and hot industrial surfaces.",
      hints: [
        "Active fires are much hotter than surrounding land — this thermal contrast is detectable from space in the mid-infrared.",
        "NASA\'s FIRMS (Fire Information for Resource Management System) provides near-real-time active fire data from these satellites.",
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
        "Embedding Rothermel\'s fire spread equations as constraints or loss terms, ensuring physically consistent predictions",
        "Using reinforcement learning to fight virtual fires",
        "Only using historical fire perimeters without weather data",
      ],
      correctAnswer: 1,
      explanation:
        "Physics-informed approaches embed Rothermel\'s semi-empirical fire spread model (relating rate of spread to fuel properties, wind, and slope) into the neural network training via physics-based loss terms, ensuring predictions respect known fire behavior even in data-sparse conditions.",
      hints: [
        "Purely data-driven models may violate physical laws about how fire spreads uphill vs. downhill or with/against the wind.",
        "Physics constraints regularize the model, especially important when training data covers only a fraction of possible conditions.",
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
        "Advanced Metering Infrastructure (AMI) smart meters provide 15-minute to hourly consumption data; combined with weather (temperature, humidity), building type, and occupancy schedule features, ML models can predict energy consumption with high accuracy.",
      hints: [
        "The most direct signal of energy consumption is the meter reading itself — time-series of past consumption is the key input.",
        "Weather is a major driver of heating/cooling loads, making it the most important external feature for building energy models.",
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
        "Occupancy creates characteristic spikes and dips in electricity consumption (lights, appliances, plug loads); LSTM and Transformer models learn these temporal signatures, enabling implicit occupancy detection without dedicated PIR sensors — though with privacy implications.",
      hints: [
        "Human presence causes predictable energy use patterns (morning activity, evening appliance use) — can these patterns be learned from meter data alone?",
        "This is both technically useful and a privacy concern — meter data reveals daily routines even without explicit tracking.",
      ],
    },
    {
      id: "q-clim-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "Energy Plus" model is used as a simulation tool for building energy optimization. How do ML models interface with it in optimization workflows?',
      options: [
        "They replace EnergyPlus entirely",
        "They serve as fast surrogate models trained on EnergyPlus simulation outputs for rapid optimization",
        "They post-process EnergyPlus visualizations",
        "They control EnergyPlus via natural language commands",
      ],
      correctAnswer: 1,
      explanation:
        "EnergyPlus simulations are computationally expensive (minutes per run); ML surrogates trained on simulation results can evaluate thousands of design alternatives or control strategies per second, enabling efficient optimization of building design and operation parameters.",
      hints: [
        "Running EnergyPlus for every candidate design in an optimization would take weeks — what is the standard solution for expensive black-box functions?",
        "Surrogate-based optimization (also called Bayesian optimization or emulation-based optimization) is a classic approach for expensive simulators.",
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
        "RL HVAC agents use a composite reward combining comfort metrics (PPD/PMV thermal comfort indices or temperature deviation penalties) and energy cost; the trade-off weighting is a design choice that determines how aggressively the agent sacrifices comfort for energy savings.",
      hints: [
        "Comfort and energy are often in tension — cooling more maintains comfort but uses more electricity.",
        "Multi-objective RL combines competing objectives into a single weighted reward, with the weights encoding the desired trade-off.",
      ],
    },
    {
      id: "q-clim-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Google\'s DeepMind demonstrated RL-based cooling control in data centers, achieving approximately 40% reduction in cooling energy.",
      correctAnswer: "True",
      explanation:
        "DeepMind applied deep RL to Google\'s data center cooling systems, learning a control policy from operational data that reduced cooling energy by approximately 40% and Power Usage Effectiveness (PUE) by 15%, a landmark industrial RL success story.",
      hints: [
        "Data center cooling is a massive energy consumer globally — even a few percent improvement represents significant savings.",
        "This was one of the most widely cited real-world applications of deep RL to a physical system.",
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
        "Standard RL explores by trial-and-error, which in a physical building means potentially setting temperatures to extremes before learning they are uncomfortable or damaging; constrained RL, safe RL, and model-based RL approaches address this by incorporating safety constraints during training.",
      hints: [
        "In simulation, unsafe exploration has no real-world consequences; in a real building, exploration affects actual occupants and equipment.",
        "Safe RL adds safety constraints that prevent the agent from taking actions that violate thermal comfort or equipment operating bounds.",
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
        "Flood risk = hazard × exposure × vulnerability; hazard (inundation depth/frequency) comes from hydrological and hydraulic models, while exposure (buildings, infrastructure, population) and vulnerability (damage functions) come from land use and socioeconomic data.",
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
