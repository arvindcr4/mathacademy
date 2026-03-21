import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "qubits-gates": [
    {
      id: "q-qml-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A Hadamard gate H applied to |0⟩ produces ___.",
      options: ["|1⟩", "(|0⟩ − |1⟩) / √2", "(|0⟩ + |1⟩) / √2", "|0⟩"],
      correctAnswer: 2,
      explanation:
        "The Hadamard matrix is H = (1/√2)[[1,1],[1,−1]]. Acting on |0⟩ = [1,0]ᵀ gives H|0⟩ = (1/√2)[1,1]ᵀ = (|0⟩ + |1⟩)/√2, the |+⟩ state — an equal superposition with positive phase.",
      hints: [
        "Write out H as a 2×2 matrix and multiply by the column vector [1, 0]ᵀ representing |0⟩.",
        "H maps |0⟩ → |+⟩ and |1⟩ → |−⟩ = (|0⟩ − |1⟩)/√2.",
      ],
    },
    {
      id: "q-qml-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Pauli-Z gate acting on a general qubit α|0⟩ + β|1⟩ produces ___.",
      options: ["β|0⟩ + α|1⟩", "α|0⟩ − β|1⟩", "−α|0⟩ + β|1⟩", "α|0⟩ + β|1⟩"],
      correctAnswer: 1,
      explanation:
        "The Pauli-Z matrix is Z = [[1,0],[0,−1]]. Acting on α|0⟩ + β|1⟩ = [α,β]ᵀ gives Z[α,β]ᵀ = [α,−β]ᵀ = α|0⟩ − β|1⟩. Z is a π rotation around the Z-axis, flipping the phase of the |1⟩ component.",
      hints: [
        "The Z matrix leaves |0⟩ unchanged but multiplies |1⟩ by −1.",
        "Z = diag(1, −1), so it simply negates the amplitude of |1⟩.",
      ],
    },
    {
      id: "q-qml-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The S gate (phase gate) has matrix S = [[1,0],[0,i]]. What is S² equal to?",
      options: ["Identity I", "Pauli-X", "Pauli-Z", "Hadamard H"],
      correctAnswer: 2,
      explanation:
        "S² = [[1,0],[0,i]]² = [[1,0],[0,i²]] = [[1,0],[0,−1]] = Z. Applying the S gate twice is equivalent to a π/2 phase shift applied twice, giving a π phase shift — the Pauli-Z gate.",
      hints: [
        "S = diag(1, i). Squaring a diagonal matrix just squares the diagonal entries: S² = diag(1², i²) = diag(1, −1).",
        "Compare S² = diag(1,−1) with the Pauli-Z matrix diag(1,−1). They are the same.",
      ],
    },
  ],

  "quantum-circuits": [
    {
      id: "q-qml-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A circuit applies H to qubit 1 (initially |0⟩), then a CNOT with qubit 1 as control and qubit 2 (initially |0⟩) as target. The resulting two-qubit state is ___.",
      options: ["|00⟩", "(|00⟩ + |11⟩) / √2", "(|01⟩ + |10⟩) / √2", "|11⟩"],
      correctAnswer: 1,
      explanation:
        "After H: qubit 1 is (|0⟩+|1⟩)/√2, system is (|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩+|10⟩)/√2. CNOT flips qubit 2 when qubit 1 is |1⟩: |00⟩→|00⟩, |10⟩→|11⟩. Result: (|00⟩+|11⟩)/√2, the Φ⁺ Bell state.",
      hints: [
        "Expand |+⟩|0⟩ = (|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩+|10⟩)/√2, then apply CNOT to each term.",
        "CNOT: |00⟩→|00⟩, |01⟩→|01⟩, |10⟩→|11⟩, |11⟩→|10⟩.",
      ],
    },
    {
      id: "q-qml-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a quantum circuit, gates must be applied in a strictly sequential order and cannot be parallelized across independent qubits.",
      correctAnswer: "False",
      explanation:
        "Gates acting on disjoint sets of qubits commute and can be applied in parallel, which is exploited for circuit depth reduction and hardware efficiency. Circuit depth counts the longest sequential chain of non-commuting gates, not the total number of gates.",
      hints: [
        "Consider whether a gate on qubit 1 can possibly affect the state of qubit 3 if they are not entangled or connected by the circuit.",
        "Parallel execution of gates on independent qubits is a key strategy for reducing circuit depth on quantum hardware.",
      ],
    },
    {
      id: "q-qml-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The CNOT gate has the matrix (in computational basis {|00⟩,|01⟩,|10⟩,|11⟩}) ___.",
      options: [
        "[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]",
        "[[0,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]]",
        "[[1,0,0,0],[0,0,0,1],[0,0,1,0],[0,1,0,0]]",
        "[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,0]]",
      ],
      correctAnswer: 0,
      explanation:
        "CNOT maps |00⟩→|00⟩, |01⟩→|01⟩, |10⟩→|11⟩, |11⟩→|10⟩. In matrix form with rows/columns ordered {|00⟩,|01⟩,|10⟩,|11⟩}, the 3rd and 4th rows are swapped relative to the identity: [[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]].",
      hints: [
        "CNOT leaves |00⟩ and |01⟩ unchanged (control is |0⟩), and flips the target when control is |1⟩: |10⟩↔|11⟩.",
        "Read off each column: which basis state does each input map to? The column for |10⟩ must be |11⟩.",
      ],
    },
  ],

  "quantum-entanglement": [
    {
      id: "q-qml-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which of the following is a Bell state?",
      options: [
        "|00⟩",
        "(|0⟩ + |1⟩) / √2",
        "(|00⟩ + |11⟩) / √2",
        "|01⟩ − |10⟩",
      ],
      correctAnswer: 2,
      explanation:
        "Bell states are maximally entangled two-qubit states; (|00⟩ + |11⟩)/√2, known as Φ⁺, is one of the four Bell states and cannot be written as a product of two single-qubit states.",
      hints: [
        "A Bell state involves two qubits that are entangled — it cannot be factored into individual qubit states.",
        "Superposition of a single qubit is not entanglement; look for a two-qubit state with correlated outcomes.",
      ],
    },
    {
      id: "q-qml-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Quantum entanglement allows two parties to communicate information faster than the speed of light.",
      correctAnswer: "False",
      explanation:
        "Entanglement produces correlated measurement outcomes but no information is transmitted; the no-communication theorem proves that entanglement alone cannot be used for superluminal signaling.",
      hints: [
        "Consider whether the party measuring first can choose or predict what the other party will observe.",
        "The no-communication theorem is a fundamental result in quantum information theory.",
      ],
    },
    {
      id: "q-qml-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In quantum computing, which property of entangled states is exploited by quantum teleportation?",
      options: [
        "Faster-than-light communication",
        "Cloning of quantum states",
        "Non-local correlations combined with classical communication",
        "Infinite parallelism of all qubit states",
      ],
      correctAnswer: 2,
      explanation:
        "Quantum teleportation uses entanglement to transfer an unknown quantum state using non-local correlations plus two classical bits; the classical channel ensures no faster-than-light information transfer.",
      hints: [
        "Teleportation always requires a classical side-channel — think about what that channel carries and why it is necessary.",
        "Cloning is forbidden by the no-cloning theorem, and FTL communication is ruled out.",
      ],
    },
  ],

  "quantum-algorithms": [
    {
      id: "q-qml-kp4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Grover\'s algorithm searches an unsorted database of N items. What is its query complexity?",
      options: ["O(log N)", "O(N)", "O(√N)", "O(N²)"],
      correctAnswer: 2,
      explanation:
        "Grover\'s algorithm achieves a quadratic speedup over classical linear search, requiring O(√N) oracle queries to find a marked item with high probability.",
      hints: [
        "Classical brute-force search is O(N); quantum algorithms can do better by a polynomial factor.",
        "The amplitude amplification technique at the heart of Grover repeats roughly √N times.",
      ],
    },
    {
      id: "q-qml-kp4-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Shor\'s algorithm can factor large integers exponentially faster than the best known classical algorithms.",
      correctAnswer: "True",
      explanation:
        "Shor\'s algorithm runs in polynomial time O((log N)³) using quantum phase estimation and the quantum Fourier transform, versus sub-exponential but super-polynomial classical factoring algorithms.",
      hints: [
        "The best classical factoring algorithms (e.g., general number field sieve) are sub-exponential but not polynomial.",
        "Shor reduces factoring to period-finding, which quantum Fourier transform solves efficiently.",
      ],
    },
    {
      id: "q-qml-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which subroutine is central to Shor\'s algorithm for finding the period of a modular function?",
      options: [
        "Grover diffusion operator",
        "Quantum Fourier Transform (QFT)",
        "Harrow-Hassidim-Lloyd (HHL) algorithm",
        "Variational Quantum Eigensolver (VQE)",
      ],
      correctAnswer: 1,
      explanation:
        "The Quantum Fourier Transform allows Shor\'s algorithm to extract the period of f(x) = aˣ mod N from a superposition of values, reducing integer factoring to order-finding.",
      hints: [
        "Period-finding is equivalent to detecting periodicity in a function — which transform is classically used for this?",
        "The quantum analogue of the discrete Fourier transform is a key building block in many quantum algorithms.",
      ],
    },
  ],

  "nisq-era": [
    {
      id: "q-qml-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does NISQ stand for in the context of quantum computing?",
      options: [
        "Non-Ideal Sequential Quantum",
        "Noisy Intermediate-Scale Quantum",
        "Normalized Integrated Signal Qubit",
        "Near-Infinite Superposition Quantum",
      ],
      correctAnswer: 1,
      explanation:
        "NISQ (Noisy Intermediate-Scale Quantum) refers to current quantum devices with 50–1000 qubits that lack full error correction, coined by John Preskill in 2018.",
      hints: [
        "The term was introduced to describe devices that are too noisy for fault-tolerant computation but too large to simulate classically.",
        "Two key adjectives describe the era: the presence of noise, and the moderate number of qubits.",
      ],
    },
    {
      id: "q-qml-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Decoherence in NISQ devices causes qubits to lose their quantum properties by interacting with the environment.",
      correctAnswer: "True",
      explanation:
        "Decoherence is the process by which quantum superposition is lost due to uncontrolled environmental interactions, collapsing qubits toward classical mixed states and limiting circuit depth.",
      hints: [
        "Any unintended coupling between a qubit and external degrees of freedom will degrade the quantum state.",
        "Decoherence time (T1, T2) bounds how long a qubit can hold quantum information.",
      ],
    },
    {
      id: "q-qml-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which noise model describes errors that randomly apply a Pauli gate (X, Y, or Z) to a qubit with equal probability?",
      options: [
        "Amplitude damping",
        "Phase damping",
        "Depolarizing channel",
        "Bit-flip channel",
      ],
      correctAnswer: 2,
      explanation:
        "The depolarizing channel applies each of X, Y, Z with probability p/4 and the identity with probability 1−3p/4, uniformly shrinking the Bloch vector toward the maximally mixed state.",
      hints: [
        "Bit-flip only applies X; think about which channel applies all three Pauli errors with equal weight.",
        "The depolarizing channel is the most symmetric noise model and maps any pure state toward the center of the Bloch sphere.",
      ],
    },
  ],

  vqe: [
    {
      id: "q-qml-kp6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Variational Quantum Eigensolver (VQE) is used to estimate which property of a Hamiltonian?",
      options: [
        "Maximum eigenvalue",
        "Ground state energy (minimum eigenvalue)",
        "Trace of the Hamiltonian",
        "Operator norm",
      ],
      correctAnswer: 1,
      explanation:
        "VQE approximates the ground state energy of a Hamiltonian by minimizing the expectation value ⟨ψ(θ)|H|ψ(θ)⟩ over parameterized circuit parameters θ, leveraging the variational principle.",
      hints: [
        "The variational principle guarantees that any trial state gives an energy above or equal to the true ground state.",
        "VQE is motivated by quantum chemistry where the ground state energy determines molecular stability.",
      ],
    },
    {
      id: "q-qml-kp6-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In VQE, the quantum computer is used to prepare a parameterized state and measure expectation values, while a classical optimizer updates the parameters.",
      correctAnswer: "True",
      explanation:
        "VQE is a hybrid algorithm: the quantum device handles state preparation and Hamiltonian measurement, while a classical optimizer (e.g., COBYLA, BFGS) minimizes the energy over circuit parameters.",
      hints: [
        "Think about which tasks require quantum superposition and which can be done efficiently on classical hardware.",
        "The hybrid structure is what makes VQE practical for NISQ devices with limited coherence time.",
      ],
    },
    {
      id: "q-qml-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which mathematical principle guarantees that the VQE expectation value ⟨ψ(θ)|H|ψ(θ)⟩ is always an upper bound on the ground state energy?",
      options: [
        "Cauchy-Schwarz inequality",
        "Variational principle (Rayleigh-Ritz method)",
        "Heisenberg uncertainty principle",
        "Jordan-Wigner transformation",
      ],
      correctAnswer: 1,
      explanation:
        "The variational principle states that for any normalized state |ψ⟩, ⟨ψ|H|ψ⟩ ≥ E₀, where E₀ is the true ground state energy, providing the theoretical foundation for VQE.",
      hints: [
        "This principle appears in quantum mechanics courses as a method for approximating ground state energies.",
        "The ground state minimizes the energy — any other state must have energy at least as large.",
      ],
    },
  ],

  qaoa: [
    {
      id: "q-qml-kp7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "QAOA alternates between two types of operators. What are they?",
      options: [
        "Measurement operator and reset operator",
        "Cost Hamiltonian and Mixer Hamiltonian",
        "Encoding unitary and decoding unitary",
        "Grover oracle and diffusion operator",
      ],
      correctAnswer: 1,
      explanation:
        "QAOA alternates p rounds of the cost Hamiltonian Hc (encoding the optimization objective) and the mixer Hamiltonian Hm (typically uniform X rotations), with 2p variational angles (γ, β).",
      hints: [
        "One operator encodes what we want to optimize; the other explores the solution space.",
        "The two operators serve analogous roles to the problem energy and kinetic energy in quantum annealing.",
      ],
    },
    {
      id: "q-qml-kp7-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "At p = 1 layer, QAOA is guaranteed to find the optimal solution to any combinatorial optimization problem.",
      correctAnswer: "False",
      explanation:
        "QAOA with p = 1 provides only a constant-factor approximation; approaching the optimal solution generally requires p → ∞ layers, and even then optimality is not guaranteed for NP-hard problems.",
      hints: [
        "More circuit layers generally allow better approximation — think about what one layer can realistically explore.",
        "If a single-layer quantum circuit could solve NP-hard problems exactly, this would have major computational complexity implications.",
      ],
    },
    {
      id: "q-qml-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "QAOA was originally designed to solve which class of combinatorial optimization problems?",
      options: [
        "Linear programming",
        "Constraint satisfaction problems (CSPs) encoded as MAX-CUT",
        "Convex optimization",
        "Sorting networks",
      ],
      correctAnswer: 1,
      explanation:
        "QAOA was introduced by Farhi, Goldstone, and Gutmann (2014) for MAX-CUT, a prototypical NP-hard combinatorial optimization problem where the goal is to partition graph vertices to maximize cut edges.",
      hints: [
        "The original QAOA paper targets a graph problem where you partition vertices into two sets.",
        "MAX-CUT is a canonical NP-hard problem often used to benchmark quantum optimization algorithms.",
      ],
    },
  ],

  "ansatz-design": [
    {
      id: "q-qml-kp8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: 'What does "expressibility" of a quantum ansatz measure?',
      options: [
        "The number of parameters in the circuit",
        "How uniformly the parameterized circuit can cover the Haar-random distribution of states",
        "The circuit depth in terms of two-qubit gates",
        "The fidelity between the ansatz state and a target state",
      ],
      correctAnswer: 1,
      explanation:
        "Expressibility quantifies how well a parameterized ansatz samples the full Hilbert space; a highly expressible ansatz approximates the Haar-random distribution of states, meaning it can represent a wider variety of quantum states.",
      hints: [
        "A very expressive circuit can reach almost any quantum state; compare this to a model with too few parameters.",
        "Expressibility is measured by comparing the state distribution of the ansatz to the uniform (Haar) distribution over states.",
      ],
    },
    {
      id: "q-qml-kp8-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Hardware-efficient ansatze are designed to minimize the number of gates that are native to the quantum hardware, regardless of the problem structure.",
      correctAnswer: "True",
      explanation:
        "Hardware-efficient ansatze prioritize using the native gate set and connectivity of a specific quantum device to reduce noise, even if the circuit structure has no direct relationship to the problem being solved.",
      hints: [
        "On real NISQ hardware, gate errors and connectivity constraints make some circuits far less noisy than others.",
        "The trade-off is that hardware efficiency may sacrifice problem-specific structure or trainability.",
      ],
    },
    {
      id: "q-qml-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which ansatz type embeds the physical symmetries of a molecular Hamiltonian into the circuit structure, making it particularly suitable for quantum chemistry?",
      options: [
        "Random unitary ansatz",
        "Hardware-efficient ansatz",
        "Unitary Coupled Cluster (UCC) ansatz",
        "Quantum Convolutional ansatz",
      ],
      correctAnswer: 2,
      explanation:
        "The Unitary Coupled Cluster (UCC) ansatz, particularly UCCSD, is motivated by classical coupled cluster theory and respects particle-number conservation, making it chemically meaningful for molecular ground state calculations.",
      hints: [
        "Classical quantum chemistry has a hierarchy of approximations (HF, CCSD, CCSDT…) — which ansatz borrows from this?",
        "For chemistry problems, preserving electron number and spin symmetry in the ansatz is physically important.",
      ],
    },
  ],

  "parameter-shift": [
    {
      id: "q-qml-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The parameter-shift rule computes the gradient of a quantum circuit expectation value using how many circuit evaluations per parameter?",
      options: ["1", "2", "4", "O(n)"],
      correctAnswer: 1,
      explanation:
        "The parameter-shift rule evaluates the circuit at θ + π/2 and θ − π/2, requiring exactly 2 evaluations per parameter to compute an exact analytic gradient without finite-difference approximation.",
      hints: [
        "Unlike finite differences (which also use 2 evaluations but give approximate gradients), this rule gives exact results.",
        "The two shifted evaluations are symmetric around the original parameter value.",
      ],
    },
    {
      id: "q-qml-kp9-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The parameter-shift rule gives the exact gradient (not an approximation) of the expectation value with respect to a gate parameter.",
      correctAnswer: "True",
      explanation:
        "Because parameterized gates have the form exp(−iθP/2) where P is a Pauli operator, the expectation value is a sinusoidal function of θ, and the parameter-shift rule computes its exact derivative analytically.",
      hints: [
        "Finite differences approximate derivatives; the parameter-shift rule exploits the specific mathematical structure of quantum gates.",
        "The expectation value of any Pauli gate rotation is a sine/cosine function, whose derivative can be computed exactly.",
      ],
    },
    {
      id: "q-qml-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a gate of the form U(θ) = exp(−iθG) where G has eigenvalues ±r, the parameter-shift rule uses a shift of s = π/(4r). For a standard Pauli rotation where r = 1/2, what is the shift?",
      options: ["π/8", "π/4", "π/2", "π"],
      correctAnswer: 2,
      explanation:
        "With r = 1/2 for standard Pauli rotations, the shift is s = π/(4 × 1/2) = π/2, giving the classic ∂f/∂θ = [f(θ + π/2) − f(θ − π/2)] / 2 formula.",
      hints: [
        "Substitute r = 1/2 into s = π/(4r) directly.",
        "This is the standard shift used in PennyLane and most QML frameworks for single-qubit rotation gates.",
      ],
    },
  ],

  "barren-plateaus": [
    {
      id: "q-qml-kp10-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Barren plateaus in quantum neural networks cause gradients to vanish exponentially with the number of qubits n. How does the gradient variance scale?",
      options: ["O(1/n)", "O(1/2ⁿ)", "O(n)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "In random parameterized circuits, gradient variance decreases exponentially as O(1/2ⁿ), meaning exponentially many circuit evaluations are needed to detect a gradient signal, making training infeasible at scale.",
      hints: [
        "Exponential scaling with the number of qubits is a hallmark of the barren plateau problem.",
        "Even with measurement averaging, the signal-to-noise ratio falls exponentially in n.",
      ],
    },
    {
      id: "q-qml-kp10-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Barren plateaus can be partially avoided by using problem-inspired or shallow local ansatze instead of deep global random circuits.",
      correctAnswer: "True",
      explanation:
        "Local cost functions and shallow, structured ansatze avoid the full Haar-random regime, resulting in at most polynomially vanishing gradients rather than exponentially vanishing ones.",
      hints: [
        "Deep, globally entangled circuits are most prone to barren plateaus — locality limits the damage.",
        "The barren plateau theorem applies to global cost functions on expressive random circuits; local structure breaks this assumption.",
      ],
    },
    {
      id: "q-qml-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which initialization strategy has been shown to help avoid barren plateaus in deep quantum circuits?",
      options: [
        "Uniform random initialization in [0, 2π]",
        "Identity block initialization (initializing blocks to near-identity)",
        "Xavier/Glorot initialization from classical neural networks",
        "Zero initialization of all parameters",
      ],
      correctAnswer: 1,
      explanation:
        "Grant et al. (2019) proposed identity block initialization, where parameter blocks are set so each block approximates the identity, keeping gradients non-vanishing at the start of training for deep circuits.",
      hints: [
        "Starting near the identity means the circuit output is close to a known reference state, giving a non-flat loss landscape initially.",
        "This technique was specifically designed for quantum circuits — classical initializations do not directly translate.",
      ],
    },
  ],

  "quantum-feature-maps": [
    {
      id: "q-qml-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A quantum feature map φ(x) encodes classical data x into a quantum state |φ(x)⟩. What defines the corresponding quantum kernel?",
      options: [
        "The trace of the density matrix ρ(x)",
        "The inner product |⟨φ(x)|φ(x′)⟩|²",
        "The number of gates in the encoding circuit",
        "The entanglement entropy of |φ(x)⟩",
      ],
      correctAnswer: 1,
      explanation:
        "The quantum kernel between two data points x and x′ is defined as K(x, x′) = |⟨φ(x)|φ(x′)⟩|², computed by running the feature map circuit and its inverse and measuring the zero-state probability.",
      hints: [
        "In kernel methods, the kernel function measures similarity between feature representations.",
        'The quantum kernel can be estimated by a "swap test" or by running the overlap circuit and measuring the |0⟩ probability.',
      ],
    },
    {
      id: "q-qml-kp11-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The ZZFeatureMap in PennyLane/Qiskit encodes classical data using both single-qubit and two-qubit interactions to create entanglement between feature dimensions.",
      correctAnswer: "True",
      explanation:
        "The ZZFeatureMap applies Hadamard gates followed by ZZ-interaction unitaries exp(i(π − x_i)(π − x_j)ZZ) between pairs of qubits, creating non-linear and entangled encodings of the input features.",
      hints: [
        'The "ZZ" in the name hints at two-qubit Pauli-ZZ interactions between feature pairs.',
        "Entanglement between qubits allows the feature map to capture correlations between different input dimensions.",
      ],
    },
    {
      id: "q-qml-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a quantum kernel to provide a genuine advantage, the feature map should ideally produce a kernel that is:",
      options: [
        "Efficiently computable classically",
        "A linear kernel in the original feature space",
        "Hard to compute classically but accessible via quantum circuits",
        "Equivalent to the RBF (Gaussian) kernel",
      ],
      correctAnswer: 2,
      explanation:
        "Quantum kernel advantage requires that the feature space is classically hard to access; if the kernel can be efficiently computed classically, there is no quantum computational benefit over classical kernel SVMs.",
      hints: [
        "The whole point of a quantum feature map is to access a Hilbert space that classical computers cannot efficiently simulate.",
        "If the kernel is classically simulable, Huang et al. (2021) showed quantum kernel methods offer no advantage.",
      ],
    },
  ],

  "quantum-svm": [
    {
      id: "q-qml-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a quantum SVM, what role does the quantum computer play?",
      options: [
        "Running the classical SVM optimization",
        "Computing the kernel matrix K(x_i, x_j) via quantum circuits",
        "Generating the training labels",
        "Performing gradient descent on the support vectors",
      ],
      correctAnswer: 1,
      explanation:
        "The quantum computer evaluates the quantum kernel matrix by running overlap circuits for each pair of training points; the classical SVM solver then uses this kernel matrix for training.",
      hints: [
        "Quantum and classical parts have different roles — the quantum part accesses the high-dimensional feature space.",
        "Once the kernel matrix is computed, standard classical quadratic programming solves the SVM dual problem.",
      ],
    },
    {
      id: "q-qml-kp12-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Computing the full N×N quantum kernel matrix for N training points requires O(N²) quantum circuit evaluations.",
      correctAnswer: "True",
      explanation:
        "Since each kernel entry K(x_i, x_j) requires one quantum circuit evaluation and there are N(N−1)/2 unique pairs, the total cost is O(N²) circuit runs, which can be a bottleneck for large datasets.",
      hints: [
        "Count how many pairs of training points exist in a dataset of size N.",
        "This quadratic scaling is also a challenge for classical kernel SVMs, but quantum circuits add per-evaluation overhead.",
      ],
    },
    {
      id: "q-qml-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Havlíček et al. (2019) constructed a quantum SVM with a provable classical hardness guarantee. What was the basis of this guarantee?",
      options: [
        "NP-hardness of the kernel computation",
        "The feature map was based on a problem believed to be classically intractable (related to the discrete logarithm)",
        "The dataset was too large to fit in classical memory",
        "The quantum circuit contained exponentially many gates",
      ],
      correctAnswer: 1,
      explanation:
        "Havlíček et al. based classical hardness on the assumption that certain quantum circuits related to the discrete logarithm problem cannot be efficiently simulated classically, providing a complexity-theoretic separation.",
      hints: [
        "The hardness argument must be rooted in a well-studied computational problem — not just circuit size.",
        "The discrete logarithm problem underlies many cryptographic protocols and is believed to be classically hard.",
      ],
    },
  ],

  "data-encoding": [
    {
      id: "q-qml-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Amplitude encoding maps N classical data values into the amplitudes of an n-qubit state where N = 2ⁿ. What is a key advantage of this encoding?",
      options: [
        "It requires O(N) gates to prepare",
        "It stores exponentially many values in only n qubits",
        "It is hardware-efficient for all quantum devices",
        "It preserves the locality structure of the data",
      ],
      correctAnswer: 1,
      explanation:
        "Amplitude encoding is exponentially compact: n qubits store 2ⁿ real amplitudes, enabling logarithmic qubit scaling with data size, though state preparation circuits can be exponentially deep in the worst case.",
      hints: [
        "Consider how many values the amplitudes of an n-qubit state can hold versus n classical bits.",
        "The exponential compression is the main theoretical advantage — but state preparation cost is a practical concern.",
      ],
    },
    {
      id: "q-qml-kp13-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Angle encoding maps each classical feature to the rotation angle of a single-qubit gate, requiring one qubit per feature.",
      correctAnswer: "True",
      explanation:
        "In angle encoding, a feature xᵢ is encoded as the angle of an Rx(xᵢ) or Ry(xᵢ) rotation gate applied to qubit i, giving a linear qubit count but losing the exponential compression of amplitude encoding.",
      hints: [
        "Think about the most direct mapping: one rotation gate encodes one number, so one qubit per feature.",
        "Angle encoding is simpler to implement and requires no complex state preparation, at the cost of linear qubit scaling.",
      ],
    },
    {
      id: "q-qml-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Basis encoding represents classical integers in binary using computational basis states. To represent the integer 5 on 3 qubits, what state is prepared?",
      options: ["|000⟩", "|101⟩", "|110⟩", "|011⟩"],
      correctAnswer: 1,
      explanation:
        "5 in binary is 101, so basis encoding maps it to |101⟩, where each qubit holds one bit of the binary representation; this encoding uses one qubit per bit and allows no superposition over the data.",
      hints: [
        "Convert 5 to binary: 5 = 4 + 1 = 2² + 2⁰, so the bits from most significant to least are...",
        "Basis encoding is the most direct: each classical bit maps to one qubit in the |0⟩ or |1⟩ state.",
      ],
    },
  ],

  "quantum-advantage-ml": [
    {
      id: "q-qml-kp14-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'Which of the following best describes a "dequantization" result in the context of quantum ML advantage?',
      options: [
        "Showing that quantum computers cannot solve a problem at all",
        "Developing a classical algorithm that matches a quantum algorithm\'s performance",
        "Measuring the decoherence rate of a quantum ML model",
        "Removing quantum gates from a hybrid circuit",
      ],
      correctAnswer: 1,
      explanation:
        "Dequantization results (e.g., Tang 2019 on quantum recommendation systems) show that classical algorithms can achieve similar asymptotic performance to claimed quantum speedups, often by using classical analogues of quantum random-access techniques.",
      hints: [
        'If a classical algorithm can match the quantum speedup, the "advantage" disappears — what would you call that process?',
        "Tang\'s work on quantum recommendation systems is the canonical dequantization example.",
      ],
    },
    {
      id: "q-qml-kp14-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A provable quantum advantage in ML has been conclusively demonstrated for real-world large-scale datasets as of 2024.",
      correctAnswer: "False",
      explanation:
        "As of 2024, all provable quantum ML advantages are confined to constructed or synthetic problem instances; no unambiguous quantum advantage has been demonstrated on practically relevant large-scale ML tasks.",
      hints: [
        "Consider the gap between theoretical complexity separations and practical benchmarks on real data.",
        "Quantum hardware limitations and dequantization results make real-world advantage claims very difficult to sustain.",
      ],
    },
    {
      id: "q-qml-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Liu et al. (2021) showed a provable quantum kernel learning advantage under a specific assumption. What was the key assumption?",
      options: [
        "The training dataset is exponentially large",
        "The quantum feature map is based on a classically hard problem (discrete log)",
        "Quantum hardware has zero noise",
        "The classical SVM uses a linear kernel",
      ],
      correctAnswer: 1,
      explanation:
        "Liu et al. proved a quantum kernel classification advantage assuming the feature map encodes a problem related to the discrete logarithm, which is believed to be classically hard, yielding a complexity-theoretic separation.",
      hints: [
        "Provable advantage needs a cryptographic or complexity-theoretic hardness assumption — not just an empirical gap.",
        "The discrete logarithm connection links quantum ML advantage to well-studied hardness conjectures.",
      ],
    },
  ],

  dequantization: [
    {
      id: "q-qml-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Tang\'s 2019 dequantization of quantum recommendation systems achieved classical speedup by using which classical data structure?",
      options: [
        "Hash tables",
        "Sample-and-query (SQ) access to data",
        "Bloom filters",
        "B-trees",
      ],
      correctAnswer: 1,
      explanation:
        'Tang introduced "sample-and-query" (SQ) access — the ability to sample from a probability distribution proportional to row norms and query individual entries — as the classical analogue of quantum random-access memory (QRAM).',
      hints: [
        "QRAM gives quantum algorithms fast superposition access to data; what classical equivalent enables similar statistical sampling?",
        "The key insight is that quantum speedup sometimes relies only on the ability to sample efficiently, not true quantum parallelism.",
      ],
    },
    {
      id: "q-qml-kp15-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Dequantization results disprove the utility of all quantum algorithms.",
      correctAnswer: "False",
      explanation:
        "Dequantization only applies to specific algorithms that relied on QRAM-style data access; algorithms like Shor\'s (factoring) and Grover\'s (search) remain without classical polynomial-time equivalents.",
      hints: [
        "Dequantization targets a specific class of quantum algorithms — those whose speedup came from data access, not quantum interference.",
        "Factoring and unstructured search have no known classical polynomial equivalents, so they are not dequantizable.",
      ],
    },
    {
      id: "q-qml-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which quantum linear algebra algorithm was one of the first major targets of dequantization efforts?",
      options: [
        "Quantum phase estimation",
        "HHL (Harrow-Hassidim-Lloyd) algorithm for linear systems",
        "Quantum Fourier Transform",
        "Variational Quantum Eigensolver",
      ],
      correctAnswer: 1,
      explanation:
        "The HHL algorithm claimed exponential speedup for solving linear systems; dequantization results by Tang and others showed classical randomized algorithms can achieve similar performance under the same input model (QRAM-accessible sparse matrices).",
      hints: [
        "HHL claimed exponential speedup for Ax=b — it was one of the most celebrated quantum ML algorithms until scrutinized.",
        "The caveats of HHL (QRAM input, sparse/well-conditioned matrices, sampling output) opened the door to classical alternatives.",
      ],
    },
  ],

  "qnn-architecture": [
    {
      id: "q-qml-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'In a quantum neural network (QNN), what plays the role of "layers" in a classical neural network?',
      options: [
        "Individual qubit measurements",
        "Blocks of parameterized quantum gates (unitaries)",
        "Classical bias vectors",
        "Ancilla qubit registers",
      ],
      correctAnswer: 1,
      explanation:
        "QNN layers consist of blocks of parameterized unitary gates (e.g., rotation gates and entangling gates) that transform the quantum state, analogous to weight matrices and activation functions in classical networks.",
      hints: [
        "In classical NNs, layers apply learnable transformations; in QNNs, the transformations must be unitary.",
        "Each block typically combines single-qubit rotations (parameters) and fixed entangling gates (structure).",
      ],
    },
    {
      id: "q-qml-kp16-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum neural networks are unitary transformations and therefore cannot introduce non-linearity the same way classical activation functions do.",
      correctAnswer: "True",
      explanation:
        "All quantum gates are unitary (linear) transformations; non-linearity in QNNs must come from measurement and re-encoding steps, unlike classical networks where activation functions like ReLU directly introduce non-linearity.",
      hints: [
        'Unitary transformations are linear — they cannot "fold" the state space the way a sigmoid or ReLU does.',
        "Measurement is the only inherently non-linear operation in quantum mechanics.",
      ],
    },
    {
      id: "q-qml-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a dissipative QNN (DQNN), what mechanism replaces ancilla qubits to enable non-unitary learning dynamics?",
      options: [
        "Repeated Hadamard gates",
        "Tracing out (discarding) ancilla qubits after each layer",
        "Classical batch normalization applied between layers",
        "Grover amplitude amplification after each layer",
      ],
      correctAnswer: 1,
      explanation:
        "DQNNs reset or trace out ancilla qubits between layers, inducing a non-unitary, dissipative map analogous to a quantum channel, allowing the network to implement non-unitary transformations and potentially improve trainability.",
      hints: [
        "Once you discard a subsystem (trace it out), the remaining state evolves non-unitarily — this is the key to dissipation.",
        "Quantum channels (completely positive trace-preserving maps) generalize unitary evolution and describe open quantum systems.",
      ],
    },
  ],

  "quantum-cnn": [
    {
      id: "q-qml-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Quantum Convolutional Neural Networks (QCNNs) achieve logarithmic circuit depth by using which structural feature?",
      options: [
        "Dense all-to-all connectivity",
        "Alternating convolutional and pooling layers that halve the qubit count each round",
        "Amplitude amplification at each layer",
        "Classical max-pooling operations",
      ],
      correctAnswer: 1,
      explanation:
        "QCNNs alternate parameterized convolutional unitaries (acting on neighboring qubits) with pooling operations (measuring and discarding half the qubits), reducing the active qubit count by half per layer for O(log n) total depth.",
      hints: [
        "Classical CNNs use pooling to reduce spatial dimensions — QCNNs do something analogous with qubits.",
        "Reducing the number of active qubits by half each layer gives a logarithmic number of layers for n qubits.",
      ],
    },
    {
      id: "q-qml-kp17-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "QCNNs have been shown to be free from barren plateaus due to their hierarchical local structure.",
      correctAnswer: "True",
      explanation:
        "Pesah et al. (2021) proved that QCNNs with local cost functions and hierarchical pooling avoid barren plateaus, with gradients that vanish at most polynomially (not exponentially) with system size.",
      hints: [
        'Barren plateaus arise in globally deep circuits — local, hierarchical structure limits how "random" the circuit looks.',
        "The QCNN\'s locality means each gate only sees a small patch of qubits, preventing the global randomization that causes barren plateaus.",
      ],
    },
    {
      id: "q-qml-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In a QCNN, the "pooling" operation is most analogous to which quantum information operation?',
      options: [
        "Quantum teleportation",
        "Partial trace (tracing out measured qubits)",
        "Quantum error correction syndrome measurement",
        "Unitary dilation",
      ],
      correctAnswer: 1,
      explanation:
        "QCNN pooling measures a subset of qubits and uses the measurement outcomes to conditionally rotate remaining qubits, effectively performing a partial trace that reduces the active Hilbert space dimension.",
      hints: [
        "After measuring and discarding qubits, the reduced state lives in a smaller Hilbert space — this is the definition of a partial trace.",
        "The conditioned rotations on unmeasured qubits allow classical information from the measurement to influence the remaining quantum state.",
      ],
    },
  ],

  "quantum-rnn": [
    {
      id: "q-qml-kp18-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a Quantum Recurrent Neural Network (QRNN), how is temporal information carried between time steps?",
      options: [
        "Classical hidden state vectors",
        "A quantum memory register whose state is passed to the next time step",
        "Repeated Grover search over the sequence",
        "Fourier encoding of the full sequence at once",
      ],
      correctAnswer: 1,
      explanation:
        "QRNNs maintain a quantum memory (hidden state) register that is updated at each time step by a parameterized unitary jointly acting on the memory and new input, analogous to the hidden state in classical RNNs.",
      hints: [
        "Classical RNNs pass a hidden vector between steps — the quantum analogue passes a quantum state.",
        'The quantum memory register holds the "context" accumulated from previous inputs as a quantum state.',
      ],
    },
    {
      id: "q-qml-kp18-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum RNNs can perfectly memorize arbitrarily long sequences due to the unitary nature of quantum evolution, which prevents information loss.",
      correctAnswer: "False",
      explanation:
        "While unitarity is reversible (no information is destroyed), the memory register has a finite Hilbert space dimension; with finite qubits, the QRNN can only represent limited context, and practical noise causes decoherence-induced forgetting.",
      hints: [
        "Unitarity means no information is lost in closed quantum systems, but finite qubit count limits the memory capacity.",
        "Real quantum hardware introduces noise and decoherence, which effectively causes information loss even in nominally unitary circuits.",
      ],
    },
    {
      id: "q-qml-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary challenge in training QRNNs with gradient-based methods on long sequences?",
      options: [
        "The quantum state cannot be backpropagated",
        "Barren plateaus and vanishing gradients exacerbated by long circuit depth over time steps",
        "The hidden state must be measured at every step, collapsing it",
        "Quantum gates cannot be parameterized for recurrent use",
      ],
      correctAnswer: 1,
      explanation:
        "Long sequences require deep circuits (many time steps), severely exacerbating barren plateau effects; additionally, long-range gradient flow through many unitary layers suffers from vanishing gradients analogous to classical RNN training challenges.",
      hints: [
        "Each time step adds circuit depth — think about what happens to gradients in very deep parameterized quantum circuits.",
        "The combination of depth and global entanglement across many steps pushes the circuit toward the barren plateau regime.",
      ],
    },
  ],

  "quantum-transfer-learning": [
    {
      id: "q-qml-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In quantum transfer learning, a pre-trained classical model is combined with a quantum circuit. Where is the quantum circuit typically inserted?",
      options: [
        "Before the classical input layer",
        "As a replacement for the classical loss function",
        "After a classical feature extractor, as a trainable quantum classifier",
        "Inside the classical optimizer",
      ],
      correctAnswer: 2,
      explanation:
        "In quantum transfer learning (Mari et al. 2020), a frozen or fine-tuned classical pre-trained network (e.g., ResNet) extracts features, which are then encoded and processed by a small trainable quantum circuit acting as the final classifier.",
      hints: [
        "Pre-trained classical networks are great feature extractors; the quantum part handles the final decision boundary.",
        "This architecture requires far fewer qubits since only the classification head is quantum.",
      ],
    },
    {
      id: "q-qml-kp19-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum transfer learning allows quantum circuits to benefit from the vast amount of pre-training done on classical hardware without retraining from scratch.",
      correctAnswer: "True",
      explanation:
        "By freezing the classical backbone and only training the quantum head, quantum transfer learning leverages classical pre-training (ImageNet, etc.) while requiring only a small quantum circuit to be optimized.",
      hints: [
        "This mirrors classical transfer learning where only the final layers are fine-tuned on a new task.",
        "Training the full classical network on quantum hardware would be impractical — freezing it solves this.",
      ],
    },
    {
      id: "q-qml-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary bottleneck when encoding classical neural network feature vectors into a quantum state for quantum transfer learning?",
      options: [
        "The feature vector must be integer-valued",
        "State preparation of arbitrary high-dimensional classical vectors can require exponentially deep circuits",
        "Quantum circuits cannot process continuous-valued features",
        "The quantum circuit must be re-trained for each new input",
      ],
      correctAnswer: 1,
      explanation:
        "Encoding an arbitrary d-dimensional classical vector into d qubits via amplitude encoding generally requires a state preparation circuit of O(2^d) depth in the worst case, partially offsetting the benefit of the quantum classifier.",
      hints: [
        "Think about the cost of amplitude encoding — storing 2ⁿ amplitudes in n qubits requires preparing those amplitudes somehow.",
        "Efficient state preparation is an open research problem; naive approaches are exponentially expensive.",
      ],
    },
  ],

  "hybrid-classical-quantum": [
    {
      id: "q-qml-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a hybrid classical-quantum architecture, what is the primary role of the quantum component?",
      options: [
        "Running the classical optimizer",
        "Storing the training dataset",
        "Evaluating parameterized quantum circuits to compute expectation values or kernel entries",
        "Performing data preprocessing and normalization",
      ],
      correctAnswer: 2,
      explanation:
        "In hybrid architectures, the quantum processor evaluates parameterized circuits (e.g., for expectation values, kernel matrices, or quantum sampling), while the classical processor handles optimization, data management, and post-processing.",
      hints: [
        "Quantum devices are best used for tasks that benefit from quantum superposition and interference.",
        "The classical optimizer cannot run on quantum hardware directly — it handles the feedback loop.",
      ],
    },
    {
      id: "q-qml-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Hybrid architectures are motivated in part by the limited qubit counts and coherence times of current NISQ devices, which cannot run fully quantum algorithms.",
      correctAnswer: "True",
      explanation:
        "Hybrid architectures offload the parts of a computation that require long coherence times or many qubits to classical hardware, making algorithms feasible on current NISQ devices with limited qubits and short decoherence times.",
      hints: [
        "Think about what limits a purely quantum approach on today\'s hardware — qubit count and coherence time are the main bottlenecks.",
        "NISQ devices cannot implement full fault-tolerant quantum algorithms, so hybrid approaches bridge the gap.",
      ],
    },
    {
      id: "q-qml-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a hybrid quantum-classical neural network, gradients of quantum circuit outputs with respect to parameters are computed using:",
      options: [
        "Classical automatic differentiation (autograd) only",
        "Finite differences applied to shot-based measurements",
        "The parameter-shift rule, enabling exact gradients from quantum hardware",
        "Symbolic differentiation of the circuit unitary matrix",
      ],
      correctAnswer: 2,
      explanation:
        "The parameter-shift rule computes exact analytical gradients by evaluating the circuit at θ ± π/2, and is compatible with shot-based (sampling) quantum hardware, making it the standard gradient method in hybrid QML frameworks like PennyLane.",
      hints: [
        "Classical autograd works on classical computations; you need a rule specifically designed for quantum circuit outputs.",
        "The parameter-shift rule was designed to work directly with hardware measurements, not just simulations.",
      ],
    },
  ],

  qgan: [
    {
      id: "q-qml-kp21-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a quantum GAN (qGAN), the quantum generator produces:",
      options: [
        "Classical images stored in classical memory",
        "A quantum state whose measurement samples approximate the target data distribution",
        "Classical gradients for the discriminator",
        "A quantum error correction code",
      ],
      correctAnswer: 1,
      explanation:
        "The qGAN generator is a parameterized quantum circuit that prepares a quantum state; measuring this state samples from the generator distribution, which is trained to match the target (real) data distribution.",
      hints: [
        "Quantum circuits produce quantum states; data is obtained by measuring — what does each measurement give you?",
        "The generator learns to produce a quantum state whose Born-rule measurement distribution matches the training data.",
      ],
    },
    {
      id: "q-qml-kp21-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum GANs (qGANs) are fundamentally different from classical GANs because they use quantum circuits instead of classical neural networks.",
      correctAnswer: "False",
      explanation:
        "Quantum GANs (qGANs) use classical discriminators while the generator is quantum, or they use quantum circuits for both but with different purposes. The key is that the discriminator is not quantum.",
      hints: [
        "The discriminator in a qGAN is typically a classical neural network.",
        "The generator in a qGAN is a quantum circuit.",
      ],
    },
    {
      id: "q-qml-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Training qGANs faces a specific challenge related to the number of measurements needed. What is this challenge called?",
      options: [
        "Mode collapse",
        "Shot noise limiting gradient estimates, exacerbated by the quantum measurement postulate",
        "Gradient explosion from unitary gates",
        "Overfitting due to quantum memory",
      ],
      correctAnswer: 1,
      explanation:
        "Because quantum measurements are stochastic (shot noise), gradient estimates for qGAN training have high variance; many measurement shots are needed per gradient estimate, and this cost combines multiplicatively with the number of parameters.",
      hints: [
        "Every time you measure a quantum circuit you get one sample — estimating expectations requires averaging many shots.",
        "High variance in gradient estimates (from finite shots) is a fundamental challenge distinct from classical GAN training.",
      ],
    },
  ],

  "quantum-boltzmann": [
    {
      id: "q-qml-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A Quantum Boltzmann Machine (QBM) is the quantum analogue of a classical RBM. What replaces the classical energy function in a QBM?",
      options: [
        "A classical Hamiltonian",
        "A quantum Hamiltonian with both diagonal (classical) and off-diagonal (transverse field) terms",
        "A unitary matrix acting on the visible units",
        "A classical neural network energy estimator",
      ],
      correctAnswer: 1,
      explanation:
        "The QBM replaces the classical energy E(v,h) with a quantum Hamiltonian H that includes transverse-field (off-diagonal Pauli-X) terms, allowing the model to represent quantum thermal distributions and capture non-classical correlations.",
      hints: [
        "Classical Boltzmann machines use diagonal (Z) interactions; quantum extension adds off-diagonal (X) terms.",
        "The transverse field introduces quantum fluctuations analogous to quantum tunneling in quantum annealing.",
      ],
    },
    {
      id: "q-qml-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum Boltzmann Machines sample from a thermal (Gibbs) distribution defined by a quantum Hamiltonian.",
      correctAnswer: "True",
      explanation:
        "The QBM\'s generative model is the quantum Gibbs state ρ ∝ exp(−βH), where β is inverse temperature; learning adjusts the Hamiltonian parameters so that marginals of ρ match the training data distribution.",
      hints: [
        "Classical RBMs use Gibbs/Boltzmann distributions; QBMs extend this to quantum Hamiltonians.",
        "The quantum Gibbs state is the density matrix that minimizes free energy for a given quantum Hamiltonian and temperature.",
      ],
    },
    {
      id: "q-qml-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main practical obstacle to training Quantum Boltzmann Machines on quantum hardware?",
      options: [
        "QBMs cannot represent probability distributions",
        "Computing the quantum Gibbs state and its gradients requires quantum thermalization, which is hard to implement efficiently",
        "Quantum hardware cannot represent binary variables",
        "QBMs require more parameters than classical RBMs",
      ],
      correctAnswer: 1,
      explanation:
        "Computing the quantum Gibbs state exp(−βH)/Z and its gradient requires quantum phase estimation or quantum simulation of thermalization, both of which are resource-intensive on NISQ hardware and remain an open engineering challenge.",
      hints: [
        "Preparing a thermal state is much harder than preparing a pure state — it requires simulating a system at finite temperature.",
        "Unlike VQE which prepares a variational pure state, preparing the Gibbs density matrix requires access to a thermal bath or expensive simulation.",
      ],
    },
  ],

  "quantum-sampling": [
    {
      id: "q-qml-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Born Machines are generative models that produce samples by measuring a parameterized quantum state. What probability distribution do they sample from?",
      options: [
        "Uniform distribution over bit strings",
        "The Born rule distribution |⟨x|ψ(θ)⟩|² for each bit string x",
        "A classical Boltzmann distribution",
        "A Gaussian distribution over qubit angles",
      ],
      correctAnswer: 1,
      explanation:
        "Born Machines learn a parameterized quantum state |ψ(θ)⟩ such that the Born rule probabilities p(x) = |⟨x|ψ(θ)⟩|² match the target data distribution, using the quantum circuit as an implicit generative model.",
      hints: [
        "Measuring a quantum state in the computational basis gives each outcome with probability determined by the Born rule.",
        "The generative model is the quantum circuit itself; data generation is a single computational-basis measurement.",
      ],
    },
    {
      id: "q-qml-kp23-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum sampling (e.g., boson sampling) has been proposed as a near-term demonstration of quantum computational advantage over classical computers.",
      correctAnswer: "True",
      explanation:
        "Boson sampling and random circuit sampling (Google\'s 2019 Sycamore experiment) are designed specifically to be hard for classical computers to simulate, offering a route to demonstrate quantum computational advantage without requiring error correction.",
      hints: [
        "Boson sampling involves sampling from the output distribution of a linear optical network — classically hard due to permanent computation.",
        "Random circuit sampling was Google\'s experimental approach to demonstrating quantum supremacy.",
      ],
    },
    {
      id: "q-qml-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Training a Born Machine to match a target distribution p_data typically requires minimizing which divergence, since log-likelihood is expensive to compute directly?",
      options: [
        "L2 distance between probability vectors",
        "Maximum Mean Discrepancy (MMD) using quantum kernels",
        "Kullback-Leibler divergence computed via exact simulation",
        "Cross-entropy with one-hot labels",
      ],
      correctAnswer: 1,
      explanation:
        "Because computing exact log-likelihoods requires summing over 2ⁿ outcomes, Born Machines are typically trained using Maximum Mean Discrepancy (MMD) with a kernel, which can be estimated from finite samples and quantum kernel evaluations.",
      hints: [
        "Exact log-likelihood requires knowing p(x) for all x — exponentially expensive for n qubits.",
        "MMD only requires samples from both distributions and a kernel function, making it tractable for training.",
      ],
    },
  ],

  "quantum-autoencoders": [
    {
      id: "q-qml-kp24-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'A quantum autoencoder compresses an n-qubit input state into k < n qubits (the "latent space"). What does the remaining n−k qubits (trash qubits) ideally become?',
      options: [
        "Maximally entangled with the latent qubits",
        "A fixed reference state (e.g., |0...0⟩)",
        "A copy of the input state",
        "A random mixed state",
      ],
      correctAnswer: 1,
      explanation:
        "In a perfect quantum autoencoder, the encoder unitary disentangles the trash qubits from the latent register, leaving the trash qubits in a fixed product state |0...0⟩, so that resetting them enables lossless decoding.",
      hints: [
        "If the trash qubits contain no information about the input, they must be in a state independent of the input — what is the simplest such state?",
        "The training objective maximizes the fidelity of the trash qubits with |0...0⟩, equivalent to maximizing compression quality.",
      ],
    },
    {
      id: "q-qml-kp24-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A quantum autoencoder can compress quantum states that have no efficient classical description.",
      correctAnswer: "True",
      explanation:
        "Unlike classical autoencoders that process classically-describable data, quantum autoencoders can compress highly entangled quantum states that would require exponentially many classical parameters to specify, making them useful for quantum data compression.",
      hints: [
        "The input to a quantum autoencoder is a quantum state, not a classical vector — such states can be exponentially complex classically.",
        "Quantum states of n qubits live in a 2ⁿ-dimensional Hilbert space; quantum autoencoders work directly in this space.",
      ],
    },
    {
      id: "q-qml-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The training loss for a quantum autoencoder is typically defined as:",
      options: [
        "The von Neumann entropy of the input state",
        "1 − F, where F is the fidelity between the reconstructed output and the original input state",
        "The L2 distance between input and output measurement histograms",
        "The KL divergence between the latent state and a Gaussian prior",
      ],
      correctAnswer: 1,
      explanation:
        "The quantum autoencoder is trained to maximize state fidelity F = |⟨ψ_in|ψ_out⟩|², equivalently minimizing 1−F; this is estimated using the SWAP test or by measuring the trash qubits in the |0⟩ state.",
      hints: [
        "Fidelity measures how close two quantum states are — perfect compression gives fidelity 1 between input and reconstructed output.",
        "Minimizing 1−F is equivalent to maximizing the overlap between input and output, which is the standard reconstruction objective.",
      ],
    },
  ],

  "quantum-diffusion": [
    {
      id: "q-qml-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Quantum-inspired diffusion models borrow which key idea from quantum mechanics to improve classical generative modeling?",
      options: [
        "Entanglement between data points",
        "Superposition of noise schedules or interference-based score estimation",
        "Qubit-based data storage",
        "Quantum error correction for stable training",
      ],
      correctAnswer: 1,
      explanation:
        "Quantum-inspired diffusion models incorporate quantum concepts such as superposition of multiple noise levels or interference patterns in score estimation to improve flexibility and expressiveness beyond classical Gaussian diffusion.",
      hints: [
        "Classical diffusion uses Gaussian noise; quantum inspiration often means mixing or superposing multiple processes.",
        'The "quantum-inspired" label usually means adapting quantum mathematical structures (not actual quantum hardware) to classical algorithms.',
      ],
    },
    {
      id: "q-qml-kp25-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum-inspired diffusion models require actual quantum hardware to run.",
      correctAnswer: "False",
      explanation:
        "Quantum-inspired models are classical algorithms that borrow mathematical structures from quantum mechanics (e.g., density matrices, interference); they run on classical computers and do not require quantum hardware.",
      hints: [
        'The "inspired" qualifier is key — these are classical algorithms informed by quantum mathematics.',
        "Models like tensor networks and quantum-inspired sampling algorithms run efficiently on classical hardware.",
      ],
    },
    {
      id: "q-qml-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which quantum mathematical object is commonly used in quantum-inspired generative models to represent mixed or probabilistic states over classical data?",
      options: [
        "Unitary matrices",
        "Density matrices (positive semidefinite, unit-trace operators)",
        "Pauli operators",
        "Bell inequalities",
      ],
      correctAnswer: 1,
      explanation:
        "Density matrices, which are positive semidefinite and trace-one operators, can represent probability distributions over classical data as diagonal entries, and their off-diagonal elements capture quantum coherence; quantum-inspired models use this formalism classically.",
      hints: [
        "A diagonal density matrix in the computational basis is equivalent to a classical probability distribution.",
        "Off-diagonal elements of density matrices represent quantum coherence — quantum-inspired models exploit this richer structure.",
      ],
    },
  ],

  pennylane: [
    {
      id: "q-qml-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "PennyLane is a quantum ML framework. Which classical ML library does it integrate with to enable automatic differentiation of quantum circuits?",
      options: [
        "Scikit-learn",
        "PyTorch and JAX (among others)",
        "OpenCV",
        "XGBoost",
      ],
      correctAnswer: 1,
      explanation:
        "PennyLane integrates with PyTorch, TensorFlow, and JAX via its device interface, allowing quantum circuit gradients (via the parameter-shift rule) to flow through hybrid classical-quantum computation graphs using standard ML autograd frameworks.",
      hints: [
        "PennyLane is designed for differentiable quantum programming — it needs to connect to frameworks that support automatic differentiation.",
        "The key selling point of PennyLane is that quantum circuits behave like differentiable layers in classical ML frameworks.",
      ],
    },
    {
      id: "q-qml-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In PennyLane, a QNode wraps a quantum function and makes it differentiable with respect to its parameters using the parameter-shift rule by default.",
      correctAnswer: "True",
      explanation:
        "A PennyLane QNode decorates a Python function defining a quantum circuit and attaches a differentiation method (default: parameter-shift) so that gradients can be computed and integrated with classical optimizers.",
      hints: [
        "QNode is the central abstraction in PennyLane — it bridges quantum circuits and classical differentiation.",
        "The @qml.qnode decorator turns a function into a differentiable quantum node in the computation graph.",
      ],
    },
    {
      id: "q-qml-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'PennyLane\'s "device" abstraction allows the same circuit code to run on different backends. Which of the following is NOT a valid PennyLane device?',
      options: [
        "default.qubit (statevector simulator)",
        "qiskit.ibmq (IBM Quantum hardware)",
        "tensorflow.gpu (GPU tensor operations only)",
        "lightning.gpu (cuQuantum GPU simulator)",
      ],
      correctAnswer: 2,
      explanation:
        "tensorflow.gpu is not a PennyLane device; PennyLane devices are quantum simulators or hardware backends. TensorFlow is used as a classical deep learning framework, not as a quantum device, in PennyLane.",
      hints: [
        "PennyLane devices are quantum backends (simulators or real QPUs) — not classical ML frameworks.",
        "Think about which option is a classical deep learning framework rather than a quantum computing backend.",
      ],
    },
  ],

  "qiskit-ml": [
    {
      id: "q-qml-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Qiskit Machine Learning provides which of the following for building quantum classifiers?",
      options: [
        "Only classical SVM implementations",
        "Quantum Neural Networks (EstimatorQNN, SamplerQNN) and QSVCs",
        "Pre-trained large language models",
        "Quantum error correction decoders",
      ],
      correctAnswer: 1,
      explanation:
        "Qiskit Machine Learning provides EstimatorQNN and SamplerQNN for building quantum neural networks, and QSVC (Quantum Support Vector Classifier) using quantum kernels, all compatible with scikit-learn\'s API.",
      hints: [
        "Qiskit ML\'s main offerings are quantum analogues of classical ML building blocks.",
        "The scikit-learn compatibility means quantum classifiers can be used with familiar fit/predict interfaces.",
      ],
    },
    {
      id: "q-qml-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Qiskit Machine Learning\'s QSVC class implements a quantum kernel SVM that is compatible with scikit-learn\'s SVC interface.",
      correctAnswer: "True",
      explanation:
        "QSVC wraps a quantum kernel (computed via quantum circuits) into scikit-learn\'s SVC, allowing it to be used with scikit-learn pipelines, cross-validation, and grid search just like any classical SVM.",
      hints: [
        'The "Q" in QSVC stands for quantum — it computes the kernel matrix using quantum circuits.',
        "scikit-learn compatibility means you can drop QSVC into existing ML workflows with minimal code changes.",
      ],
    },
    {
      id: "q-qml-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Qiskit\'s Estimator primitive (used in EstimatorQNN), what does the Estimator compute from a quantum circuit?",
      options: [
        "The full statevector of the circuit",
        "Expectation values of observables with respect to the circuit output state",
        "The circuit\'s unitary matrix explicitly",
        "Samples from the measurement distribution",
      ],
      correctAnswer: 1,
      explanation:
        "The Estimator primitive computes ⟨ψ|O|ψ⟩ for a given observable O and circuit output state |ψ⟩, using either exact simulation or hardware shots with error mitigation; this is the building block for QNN forward passes.",
      hints: [
        "Estimator vs Sampler: one gives expectation values of observables, the other gives measurement outcome probabilities.",
        "Expectation values are real numbers that can be used directly as QNN outputs for regression or classification.",
      ],
    },
  ],

  "quantum-chemistry": [
    {
      id: "q-qml-kp28-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Quantum computers are well-suited for quantum chemistry because simulating molecular Hamiltonians on classical computers scales as:",
      options: [
        "O(N log N) with N electrons",
        "O(N³)",
        "Exponentially with system size",
        "O(1)",
      ],
      correctAnswer: 2,
      explanation:
        "Exact classical simulation of N-electron molecular systems requires representing a Hilbert space of dimension 2^N (exponential), making it intractable for large molecules; quantum computers can represent this space efficiently using N qubits.",
      hints: [
        "Think about how many basis states are needed to describe N electrons, each of which can be in spin-up or spin-down.",
        "This exponential classical scaling is the central motivation for quantum chemistry on quantum computers.",
      ],
    },
    {
      id: "q-qml-kp28-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The Jordan-Wigner transformation is used to map fermionic operators (electron creation/annihilation) to qubit operators (Pauli matrices).",
      correctAnswer: "True",
      explanation:
        "The Jordan-Wigner transformation maps fermionic creation/annihilation operators to strings of Pauli operators, enabling molecular Hamiltonians expressed in second quantization to be implemented on qubit-based quantum computers.",
      hints: [
        "Electrons are fermions obeying anti-commutation relations; qubits obey spin algebra — a mapping between them is needed.",
        "Jordan-Wigner (and Bravyi-Kitaev) are the standard transformations for converting chemistry Hamiltonians to qubit form.",
      ],
    },
    {
      id: "q-qml-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In quantum drug discovery pipelines, quantum computers are used to estimate which molecular property that determines binding affinity?",
      options: [
        "Molecular weight",
        "Ground state electronic energy and electronic structure",
        "Boiling point",
        "Protein sequence length",
      ],
      correctAnswer: 1,
      explanation:
        "Drug binding affinity depends on the electronic structure (ground state energy, orbital interactions) of the drug-target complex; quantum computers can calculate these energies more accurately than classical approximations for complex molecules.",
      hints: [
        "Drug-target interactions are fundamentally quantum mechanical — electron orbital overlap determines binding strength.",
        "VQE and quantum phase estimation are the main quantum algorithms proposed for computing electronic energies in drug discovery.",
      ],
    },
  ],

  "quantum-optimization": [
    {
      id: "q-qml-kp29-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Quantum annealing finds the ground state of an Ising Hamiltonian by starting in the ground state of a transverse field and slowly changing to the problem Hamiltonian. What quantum phenomenon enables this?",
      options: [
        "Quantum error correction",
        "Adiabatic theorem",
        "Quantum teleportation",
        "Grover\'s amplitude amplification",
      ],
      correctAnswer: 1,
      explanation:
        "The adiabatic theorem guarantees that a quantum system remains in its ground state if the Hamiltonian changes slowly enough; quantum annealing exploits this to evolve from an easy initial ground state to the hard problem ground state.",
      hints: [
        "The adiabatic theorem relates the rate of change of a Hamiltonian to whether the system stays in its ground state.",
        "D-Wave quantum annealers implement this principle using superconducting flux qubits.",
      ],
    },
    {
      id: "q-qml-kp29-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The Traveling Salesman Problem (TSP) and portfolio optimization can both be formulated as Quadratic Unconstrained Binary Optimization (QUBO) problems for quantum solvers.",
      correctAnswer: "True",
      explanation:
        "Many combinatorial optimization problems, including TSP, max-cut, portfolio optimization, and vehicle routing, can be reformulated as QUBO problems, which are directly solvable by quantum annealers (D-Wave) or approximated by QAOA.",
      hints: [
        "QUBO is a canonical form for combinatorial optimization problems that maps naturally to the Ising Hamiltonian.",
        "The ability to recast diverse problems as QUBO/Ising is what makes quantum annealing broadly applicable.",
      ],
    },
    {
      id: "q-qml-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a QUBO problem with n binary variables, an Ising Hamiltonian is formulated with spins s_i ∈ {±1}. The number of two-body (J_ij) coupling terms is at most:",
      options: ["n", "n log n", "n(n−1)/2", "2ⁿ"],
      correctAnswer: 2,
      explanation:
        "An Ising Hamiltonian H = −Σ_ij J_ij s_i s_j − Σ_i h_i s_i has at most n(n−1)/2 distinct two-body couplings (one for each pair of spins), which determines the hardware connectivity requirements for quantum annealers.",
      hints: [
        "Count the number of pairs from n spins: this is a combination problem.",
        "Dense QUBO problems require all-to-all connectivity, which is hard to achieve physically on current quantum annealers.",
      ],
    },
  ],

  "quantum-linear-algebra": [
    {
      id: "q-qml-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The HHL algorithm (Harrow-Hassidim-Lloyd) solves the linear system Ax = b on a quantum computer. Under which assumptions does it claim an exponential speedup over classical solvers?",
      options: [
        "A is dense, unstructured, and b is arbitrary",
        "A is sparse, well-conditioned (small condition number κ), and b is accessible via QRAM",
        "A is a unitary matrix and b is a computational basis state",
        "A is a diagonal matrix and b has integer entries",
      ],
      correctAnswer: 1,
      explanation:
        "HHL runs in O(κ² s² polylog(N)/ε) time for an N×N s-sparse matrix with condition number κ, compared to classical O(Ns κ) solvers, but requires QRAM access to b, the solution is a quantum state (not directly readable), and dequantization results show these assumptions often allow efficient classical algorithms too.",
      hints: [
        "The caveats of HHL — sparse input, QRAM, and quantum state output — are what limit its practical advantage.",
        "Condition number κ measures how numerically stable the linear system is; small κ is a strong assumption.",
      ],
    },
    {
      id: "q-qml-kp31-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum phase estimation (QPE) can determine the eigenvalues of a unitary operator U to n bits of precision using n ancilla qubits and controlled-U operations.",
      correctAnswer: "True",
      explanation:
        "QPE applies the quantum Fourier transform to extract the phase φ in U|ψ⟩ = e^{2πiφ}|ψ⟩ with n-bit precision, requiring n ancilla qubits and 2^n applications of controlled-U; it is a core subroutine in Shor's algorithm, HHL, and quantum chemistry.",
      hints: [
        "QPE works by encoding the phase into the ancilla register and using the inverse QFT to decode it.",
        "The precision in bits is determined by the number of ancilla qubits used.",
      ],
    },
    {
      id: "q-qml-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Quantum Singular Value Transformation (QSVT) is a framework that generalizes many quantum algorithms. What is the central object it manipulates?",
      options: [
        "The eigenvalues of a Pauli operator",
        "Polynomial transformations applied to the singular values of a block-encoded matrix",
        "The amplitudes of a uniform superposition state",
        "The measurement probabilities of a multi-qubit state",
      ],
      correctAnswer: 1,
      explanation:
        "QSVT applies arbitrary polynomial functions to the singular values of a matrix A encoded in a unitary oracle via block-encoding, unifying algorithms like HHL, quantum signal processing, and quantum walks under a single framework.",
      hints: [
        "Block-encoding embeds a matrix A in the upper-left block of a unitary — QSVT then applies functions to A's singular values.",
        "The polynomial transformation is implemented using quantum signal processing (QSP) rotations.",
      ],
    },
  ],

  "quantum-optimization-advanced": [
    {
      id: "q-qml-kp32-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "QUBO (Quadratic Unconstrained Binary Optimization) problems are directly embeddable on D-Wave quantum annealers. Which of the following ML problems can be formulated as QUBO?",
      options: [
        "Gradient descent of a deep neural network",
        "Binary clustering (assigning data points to two clusters) by minimizing within-cluster distances",
        "Backpropagation through a sigmoid activation",
        "Convolutional feature map computation",
      ],
      correctAnswer: 1,
      explanation:
        "Binary clustering can be written as a QUBO by assigning binary variables to cluster membership and writing the objective (minimize intra-cluster distances, maximize inter-cluster distances) as a quadratic form in those variables, making it directly solvable by a quantum annealer.",
      hints: [
        "QUBO requires binary variables and a quadratic objective — binary cluster assignment fits perfectly.",
        "Think about how k-means with k=2 can be rewritten as an integer quadratic program over binary assignments.",
      ],
    },
    {
      id: "q-qml-kp32-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "D-Wave quantum annealers implement quantum annealing using superconducting flux qubits that are coupled via programmable Josephson junction couplers.",
      correctAnswer: "True",
      explanation:
        "D-Wave systems use superconducting flux qubits whose tunneling rates (transverse field) and pairwise couplings (Ising J_ij terms) are programmed via Josephson junction control lines, realizing the quantum annealing process in hardware.",
      hints: [
        "Flux qubits encode binary variables as two persistent current states in a superconducting loop.",
        "Josephson junctions provide the quantum tunneling (transverse field) and the programmable coupling strength between qubits.",
      ],
    },
    {
      id: "q-qml-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In quantum annealing for combinatorial optimization, the gap between the ground state and the first excited state of the annealing Hamiltonian is critical. What happens when this gap closes during the annealing schedule?",
      options: [
        "The algorithm finds the global optimum with certainty",
        "Diabatic transitions occur, exciting the system out of the ground state, degrading solution quality",
        "The transverse field automatically increases to compensate",
        "The annealing time can be reduced without penalty",
      ],
      correctAnswer: 1,
      explanation:
        "When the energy gap closes at the quantum phase transition point, the adiabatic theorem requires an exponentially slow annealing schedule to prevent diabatic excitation; if the schedule is too fast, the system transitions to excited states, reducing the probability of finding the optimal solution.",
      hints: [
        "A small gap requires a slow annealing schedule — the adiabatic theorem sets this requirement quantitatively.",
        "The worst-case exponentially small gap is why quantum annealing may not offer exponential speedups for NP-hard problems.",
      ],
    },
  ],

  "quantum-advantage-benchmarks": [
    {
      id: "q-qml-kp33-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "IBM's quantum volume (QV) metric measures the largest random square circuit (equal width and depth) that a quantum computer can implement with high fidelity. What does a higher quantum volume indicate?",
      options: [
        "More physical qubits on the chip",
        "Better overall system performance including qubit count, connectivity, gate fidelity, and measurement errors",
        "Longer coherence times only",
        "Faster gate speeds only",
      ],
      correctAnswer: 1,
      explanation:
        "Quantum volume QV = 2^n where n is the largest circuit size successfully run; it captures a holistic system quality metric including qubit connectivity, gate error rates, measurement fidelity, and cross-talk — not just qubit count.",
      hints: [
        "QV is a single number summarizing overall hardware quality; a 7-qubit system with low error rates may have higher QV than a 50-qubit noisy system.",
        "The 'square' circuit (equal width and depth) stresses connectivity and gate fidelity simultaneously.",
      ],
    },
    {
      id: "q-qml-kp33-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Cross-entropy benchmarking (XEB), as used in Google's quantum supremacy experiment, estimates circuit fidelity by comparing the measured output distribution against the ideal distribution from classical simulation.",
      correctAnswer: "True",
      explanation:
        "XEB computes the cross-entropy between measured bitstring probabilities and classically-simulated ideal probabilities; a high XEB score indicates the quantum hardware is faithfully implementing the intended random circuit, providing evidence of quantum computational fidelity.",
      hints: [
        "XEB requires classical simulation of the target circuit — which is why supremacy circuits must be at the boundary of classical simulability.",
        "The cross-entropy score distinguishes a well-functioning quantum processor from a uniform or biased classical sampler.",
      ],
    },
    {
      id: "q-qml-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Google's 2019 Sycamore quantum supremacy experiment claimed to perform a specific sampling task in 200 seconds that would take a classical supercomputer 10,000 years. What was the primary challenge to this claim raised by IBM?",
      options: [
        "The Sycamore processor had too few qubits to be considered quantum",
        "IBM showed the same sampling task could be performed classically in approximately 2.5 days by using tensor network contraction with disk storage, dramatically reducing the classical estimate",
        "The circuit used was not sufficiently random to be classically hard",
        "Google's cross-entropy benchmarking score was below the threshold for quantum fidelity",
      ],
      correctAnswer: 1,
      explanation:
        "IBM challenged Google's supremacy claim by demonstrating that optimized tensor network simulations using secondary storage (disk) could perform the same task in ~2.5 days, not 10,000 years; subsequent classical simulation improvements have continued to narrow the quantum advantage gap for random circuit sampling.",
      hints: [
        "The classical estimate for Google's task assumed in-memory computation; using disk changed the analysis significantly.",
        "Tensor network contraction algorithms have improved rapidly since 2019, further challenging quantum supremacy claims.",
      ],
    },
  ],

  "quantum-neural-networks": [
    {
      id: "q-qml-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The data re-uploading technique in quantum neural networks encodes classical data multiple times throughout the circuit layers. What is the key motivation for this approach?",
      options: [
        "To reduce the number of qubits required",
        "To enable the quantum circuit to implement universal function approximation by repeatedly mixing data with trainable parameters",
        "To prevent barren plateaus by adding noise",
        "To reduce the number of circuit measurements needed",
      ],
      correctAnswer: 1,
      explanation:
        "A single data encoding at the beginning limits the function class the circuit can represent; data re-uploading interleaves data encoding with trainable rotations throughout the circuit, enabling the QNN to approximate arbitrary functions (analogous to a universal approximator) using a single qubit.",
      hints: [
        "Pérez-Salinas et al. showed a single qubit with data re-uploading can be a universal quantum classifier.",
        "The repeated encoding creates increasingly complex functions of the input by mixing data with different trainable parameters at each layer.",
      ],
    },
    {
      id: "q-qml-kp34-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A quantum convolutional neural network (QCNN) shares the same trainable parameters (weight sharing) across qubit patches, analogous to how classical CNNs share filter weights across spatial positions.",
      correctAnswer: "True",
      explanation:
        "QCNNs apply the same parameterized two-qubit gates to all neighboring qubit pairs in each convolutional layer, implementing translational equivariance over the qubit register and reducing the parameter count analogously to classical convolutional weight sharing.",
      hints: [
        "Weight sharing in classical CNNs reduces parameters and enforces translational symmetry — QCNNs apply the same idea to qubits.",
        "Without weight sharing, a QCNN would need independently parameterized gates for every qubit pair.",
      ],
    },
    {
      id: "q-qml-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a quantum recurrent neural network trained with gradient-based methods, what is the primary gradient challenge compared to classical LSTM-based RNNs?",
      options: [
        "Gradients cannot be computed for unitary matrices",
        "The combination of deep temporal circuits and global entanglement pushes the system into barren plateaus with exponentially vanishing gradients",
        "The hidden state measurement collapses the quantum state, preventing backpropagation",
        "Quantum gates do not support the chain rule for differentiation",
      ],
      correctAnswer: 1,
      explanation:
        "Unlike LSTMs which use gating mechanisms to combat vanishing gradients, QRNNs are subject to barren plateaus: the unitary circuit across many time steps behaves like a deep random circuit, causing gradients to vanish exponentially with sequence length, making long-sequence training especially difficult.",
      hints: [
        "LSTMs use forget/input gates to maintain long-range gradients — QRNNs have no such mechanism.",
        "More time steps = deeper circuit = more pronounced barren plateau effect for QRNNs.",
      ],
    },
  ],

  "quantum-cryptography-ml": [
    {
      id: "q-qml-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Quantum Key Distribution (QKD), such as BB84, achieves information-theoretically secure key exchange. What quantum mechanical principle guarantees that eavesdropping is detectable?",
      options: [
        "The uncertainty principle: measuring a qubit inevitably disturbs it, introducing detectable errors",
        "Quantum teleportation: any intercepted qubit is teleported to the eavesdropper's location",
        "Decoherence: noise destroys the key before it can be intercepted",
        "Entanglement monogamy: entangled qubits cannot be copied",
      ],
      correctAnswer: 0,
      explanation:
        "BB84 encodes key bits in random bases; any measurement by Eve collapses the qubits in a way that introduces detectable errors in Alice and Bob's shared key. The no-cloning theorem also prevents Eve from copying qubits without disturbing them.",
      hints: [
        "In QKD, Alice and Bob compare a subset of their bits to check for errors — Eve's measurement introduces ~25% error.",
        "The no-cloning theorem is also relevant: Eve cannot make perfect copies of transmitted qubits to measure later.",
      ],
    },
    {
      id: "q-qml-kp35-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Post-quantum cryptography refers to classical cryptographic algorithms that are designed to be secure against attacks from both classical and quantum computers.",
      correctAnswer: "True",
      explanation:
        "Post-quantum (or quantum-resistant) cryptography develops classical algorithms based on problems believed to be hard for quantum computers, such as lattice problems (CRYSTALS-Kyber, CRYSTALS-Dilithium), hash-based signatures, and code-based cryptography — standardized by NIST starting 2022.",
      hints: [
        "Post-quantum cryptography runs on classical hardware but is designed to resist Shor's algorithm and Grover's algorithm.",
        "NIST's post-quantum standardization project selected lattice-based schemes as primary standards in 2022.",
      ],
    },
    {
      id: "q-qml-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Quantum random number generators (QRNGs) provide true randomness. Which quantum phenomenon is most commonly exploited in commercial QRNGs?",
      options: [
        "Quantum tunneling in a Josephson junction",
        "The inherent randomness of quantum measurement outcomes (e.g., photon detection or qubit measurement in superposition)",
        "Quantum entanglement between two parties",
        "Quantum error correction syndrome measurements",
      ],
      correctAnswer: 1,
      explanation:
        "Commercial QRNGs exploit the Born-rule randomness of quantum measurements: photons impinging on a beamsplitter and measured at either port, or qubits prepared in |+⟩ and measured in the Z basis, produce perfectly random bits because quantum measurement outcomes are fundamentally unpredictable.",
      hints: [
        "Classical pseudo-random number generators are deterministic — quantum measurement outcomes are provably random.",
        "The simplest QRNG is a qubit in |+⟩ measured in the Z basis: each outcome is 50/50 by the Born rule.",
      ],
    },
  ],

  "quantum-embedding": [
    {
      id: "q-qml-kp36-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In hybrid classical-quantum ML, quantum embedding refers to mapping classical data into a quantum Hilbert space. What distinguishes angle embedding from amplitude embedding?",
      options: [
        "Angle embedding stores each feature as a rotation angle of a single-qubit gate, requiring n qubits for n features; amplitude embedding stores 2^n features in n qubits",
        "Angle embedding uses fewer qubits but is less expressive than amplitude embedding",
        "Amplitude embedding requires only 1 qubit for arbitrary data; angle embedding requires exponentially many",
        "Angle embedding is used only for binary data; amplitude embedding handles real-valued data",
      ],
      correctAnswer: 0,
      explanation:
        "Angle embedding encodes each feature x_i as a rotation angle θ_i in a single-qubit gate R(x_i), needing n qubits for n features; amplitude embedding encodes N = 2^n features as amplitudes of an n-qubit state, achieving exponential compression but requiring exponentially deep state preparation circuits.",
      hints: [
        "Angle embedding is qubit-efficient in preparation depth but qubit-inefficient in qubit count.",
        "Amplitude embedding is qubit-efficient (logarithmic in data size) but circuit-depth inefficient (exponential preparation).",
      ],
    },
    {
      id: "q-qml-kp36-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In hybrid quantum-classical architectures, batching multiple quantum circuit evaluations reduces the overhead of classical-quantum communication but requires quantum hardware capable of parallel circuit execution.",
      correctAnswer: "True",
      explanation:
        "Each classical-quantum call has latency overhead; batching groups multiple inputs into a single submission to the quantum device, amortizing communication costs; however this requires either parallel execution on separate qubits or sequential execution on the same hardware with queuing.",
      hints: [
        "Think of the analogy to GPU batching in deep learning — multiple inputs are processed together to reduce overhead.",
        "Quantum cloud APIs (like IBM Quantum or AWS Braket) support batching via primitive-level calls.",
      ],
    },
    {
      id: "q-qml-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge in connecting classical and quantum processors in a hybrid architecture is the classical-quantum interface bottleneck. What is the main source of this bottleneck?",
      options: [
        "Classical processors are too slow to compile quantum circuits",
        "The number of shots needed to estimate expectation values with sufficient accuracy introduces significant classical-quantum round-trip latency that dominates training time",
        "Quantum processors cannot accept floating-point parameters from classical optimizers",
        "Classical automatic differentiation frameworks do not support complex numbers needed for quantum states",
      ],
      correctAnswer: 1,
      explanation:
        "Each quantum circuit evaluation requires many shots (measurements) to estimate expectation values to the required precision; combined with classical-quantum communication latency (especially for cloud quantum hardware), this round-trip cost dominates training wall time and limits the practical scale of hybrid QML.",
      hints: [
        "Statistical noise from finite shots requires many circuit runs per gradient estimate — multiply this by the number of parameters and training steps.",
        "On cloud quantum hardware, network latency further compounds the per-shot overhead.",
      ],
    },
  ],

  "quantum-chemistry-ml": [
    {
      id: "q-qml-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Variational Quantum Eigensolver (VQE) estimates the ground state energy of a molecular Hamiltonian. How does VQE guarantee an upper bound on the true ground state energy?",
      options: [
        "By using quantum error correction on all gates",
        "Via the variational principle: ⟨ψ(θ)|H|ψ(θ)⟩ ≥ E_ground for any state |ψ(θ)⟩",
        "By computing the exact eigenspectrum using quantum phase estimation",
        "By averaging over many random ansatz circuits",
      ],
      correctAnswer: 1,
      explanation:
        "The variational principle guarantees that the expectation value of H in any trial state is an upper bound on the ground state energy; VQE minimizes this expectation value over the parameterized ansatz, approaching the true ground state energy from above.",
      hints: [
        "The variational principle is the quantum mechanical analogue of the fact that any trial wavefunction overestimates the ground state energy.",
        "VQE optimizes θ to minimize ⟨H⟩ — each evaluation gives an upper bound, and minimization drives it toward the exact ground state.",
      ],
    },
    {
      id: "q-qml-kp37-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum computers can in principle achieve chemical accuracy (within 1 kcal/mol of the exact ground state energy) for molecular simulations, which classical density functional theory (DFT) often fails to reach for strongly correlated systems.",
      correctAnswer: "True",
      explanation:
        "DFT relies on approximate exchange-correlation functionals that fail for strongly correlated molecules; quantum algorithms like VQE with UCCSD ansatz or quantum phase estimation can in principle compute ground state energies to chemical accuracy (1 kcal/mol ≈ 1.6 mhartree) by working directly in the full Hilbert space.",
      hints: [
        "DFT's failure for strongly correlated electrons (e.g., transition metal complexes) is a key motivation for quantum chemistry on quantum computers.",
        "Chemical accuracy (1 kcal/mol) is the threshold needed to reliably predict reaction rates and thermodynamic properties.",
      ],
    },
    {
      id: "q-qml-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The second-quantized molecular Hamiltonian H = Σ_pq h_pq a†_p a_q + (1/2) Σ_pqrs h_pqrs a†_p a†_q a_r a_s must be mapped to qubit operators for quantum simulation. Compared to the Bravyi-Kitaev (BK) transformation, what advantage does the Jordan-Wigner (JW) transformation have?",
      options: [
        "JW produces Pauli strings of constant length O(1), independent of system size",
        "JW has a more transparent locality structure: orbital j maps to qubit j with simple Pauli-Z strings for anti-commutation, making it easier to interpret",
        "JW requires fewer qubits than BK for the same molecule",
        "JW produces sparser Hamiltonians than BK, reducing circuit depth",
      ],
      correctAnswer: 1,
      explanation:
        "Jordan-Wigner maps each fermionic mode to a qubit with a simple string of Z operators for anti-commutation, making the mapping intuitive and easy to implement; however, JW Pauli strings grow as O(N) in length. Bravyi-Kitaev achieves O(log N) Pauli string length at the cost of a less transparent mapping.",
      hints: [
        "JW's Z strings track fermion parity — each creation operator a†_j becomes X_j + iY_j followed by a Z string.",
        "BK improves JW's locality by using a binary tree structure, reducing Pauli string lengths at the cost of more complex encoding.",
      ],
    },
  ],

  "near-term-quantum": [
    {
      id: "q-qml-kp38-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "NISQ (Noisy Intermediate-Scale Quantum) devices have 50-1000+ qubits but lack quantum error correction. Which of the following is NOT a NISQ-friendly algorithm?",
      options: [
        "Variational Quantum Eigensolver (VQE)",
        "Quantum Approximate Optimization Algorithm (QAOA)",
        "Shor's algorithm for factoring large integers",
        "Quantum neural networks with shallow circuits",
      ],
      correctAnswer: 2,
      explanation:
        "Shor's algorithm requires fault-tolerant quantum error correction and millions of logical gates, far beyond NISQ capabilities; VQE, QAOA, and shallow QNNs are designed for noisy hardware with limited circuit depth, tolerating some errors.",
      hints: [
        "Shor's requires exponentially deeper circuits than current NISQ hardware coherence allows.",
        "NISQ algorithms are specifically designed to be shallow (low depth) to avoid decoherence.",
      ],
    },
    {
      id: "q-qml-kp38-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Noise characterization on NISQ devices — such as measuring T1 (energy relaxation), T2 (dephasing time), and gate error rates — is essential for error-aware circuit compilation and mitigation.",
      correctAnswer: "True",
      explanation:
        "Characterizing each qubit's T1 (relaxation time), T2 (coherence time), single- and two-qubit gate fidelities, and readout errors allows compilers to route circuits to less noisy qubits, choose error-aware decompositions, and calibrate mitigation techniques like ZNE or PEC.",
      hints: [
        "T1 limits how long a qubit can hold a |1⟩ state; T2 ≤ 2T1 limits the coherence during superposition.",
        "Error-aware compilation uses noise data to assign operations to the least noisy qubits and gate decompositions.",
      ],
    },
    {
      id: "q-qml-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Error-aware circuit compilation for NISQ devices includes which of the following noise-adaptive strategies?",
      options: [
        "Routing two-qubit gates to pairs of qubits with the highest two-qubit gate error rates",
        "Dynamical decoupling: inserting sequences of π-pulses during idle periods to suppress dephasing errors",
        "Increasing circuit depth to allow more gate operations",
        "Disabling cross-resonance gates in favor of less accurate software-simulated gates",
      ],
      correctAnswer: 1,
      explanation:
        "Dynamical decoupling (DD) inserts sequences of X or XY4 pulses during idle qubit periods, averaging out systematic dephasing errors via refocusing; this is widely used in IBM and IonQ devices to extend effective coherence time during circuit execution.",
      hints: [
        "Idle qubits decohere during gate operations on other qubits; DD pulses act like spin echoes to cancel systematic errors.",
        "XY4 sequences (X, Y, X, Y pulses) are more robust to pulse imperfections than simple X-X echo pairs.",
      ],
    },
  ],

  "quantum-error-mitigation": [
    {
      id: "q-qml-kp30-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Zero-Noise Extrapolation (ZNE) is an error mitigation technique that estimates the noiseless expectation value by:",
      options: [
        "Applying quantum error correction codes",
        "Running the circuit at multiple noise levels and extrapolating to zero noise",
        "Averaging over random compilations of the circuit",
        "Adding ancilla qubits to detect errors",
      ],
      correctAnswer: 1,
      explanation:
        "ZNE intentionally boosts the noise level (e.g., by stretching gate durations or folding circuits) to create multiple data points, then fits a model to extrapolate the expectation value to the zero-noise limit.",
      hints: [
        "If you can measure at several noise levels, you can fit a curve and read off the y-intercept at zero noise.",
        "Noise boosting techniques include gate folding (repeating U†U pairs) or pulse stretching on hardware.",
      ],
    },
    {
      id: "q-qml-kp30-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Quantum error mitigation techniques eliminate quantum errors completely, equivalent to full quantum error correction.",
      correctAnswer: "False",
      explanation:
        "Error mitigation reduces the bias in expectation value estimates but increases the statistical variance (sampling overhead); it does not eliminate errors or protect quantum information during computation, unlike full quantum error correction.",
      hints: [
        "Mitigation is a post-processing statistical technique; error correction is a physical mechanism that detects and corrects errors in real time.",
        "The overhead of mitigation grows with circuit depth, and mitigation cannot make arbitrarily deep circuits reliable.",
      ],
    },
    {
      id: "q-qml-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Probabilistic Error Cancellation (PEC) mitigates noise by decomposing the ideal (noiseless) circuit into a quasi-probability sum over noisy circuits. What is the main cost of PEC?",
      options: [
        "Requires knowledge of all future gate operations",
        "Exponential sampling overhead (1/γ²)ⁿ where γ is the noise parameter and n is circuit depth",
        "Cannot be used with multi-qubit gates",
        "Requires perfect state preparation",
      ],
      correctAnswer: 1,
      explanation:
        "PEC has sampling overhead that scales exponentially with circuit depth: the number of samples needed grows as (1/γ²)ⁿ, where γ is related to the gate error rate, making it practical only for shallow circuits on near-term hardware.",
      hints: [
        "Each noisy gate in PEC introduces a factor of overhead — these multiply across the circuit depth.",
        "The exponential overhead is the fundamental reason error mitigation cannot scale to arbitrary depths without error correction.",
      ],
    },
  ],

  "readout-error-mitigation": [
    {
      id: "q-qml-kp39-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Readout error mitigation corrects for measurement errors in quantum circuits. What is the standard calibration-based approach for single-qubit readout error correction?",
      options: [
        "Prepare each qubit in |0⟩ and |1⟩ separately, measure many times to build the assignment matrix M (where M[i][j] = P(measure i | prepare j)), then invert M to correct measurement distributions",
        "Apply a unitary rotation before measurement to rotate errors into the computational basis",
        "Repeat each measurement 1000 times and take the majority vote as the corrected outcome",
        "Use the surface code to detect and correct measurement errors before reading out results",
      ],
      correctAnswer: 0,
      explanation:
        "The assignment (confusion) matrix M characterizes readout errors: each column gives the probability distribution over measurement outcomes given a known input state. Inverting M (or solving a linear system) corrects the noisy measured distribution, recovering an estimate of the ideal probability vector. This calibration step is standard in Qiskit and Cirq mitigation toolkits.",
      hints: [
        "The confusion matrix relates what you prepared to what you measured — inversion corrects the measured probabilities.",
        "For n qubits, the assignment matrix is 2^n × 2^n; for large n, tensor product approximations are used.",
      ],
    },
    {
      id: "q-qml-kp39-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Readout errors in superconducting qubits arise partly from the finite lifetime of the |1⟩ state (T1 decay) causing the qubit to relax to |0⟩ during the measurement pulse.",
      correctAnswer: "True",
      explanation:
        "During the readout pulse (which takes microseconds), a qubit in |1⟩ can relax to |0⟩ via T1 decay, causing a false |0⟩ measurement outcome; this asymmetric error (|1⟩→|0⟩ more likely than |0⟩→|1⟩) is a primary source of readout error in superconducting quantum processors.",
      hints: [
        "T1 is the energy relaxation time; if T1 is comparable to the readout pulse duration, relaxation errors are significant.",
        "This asymmetry means P(measure 0 | prepare 1) > P(measure 1 | prepare 0) in typical superconducting qubits.",
      ],
    },
    {
      id: "q-qml-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Twirled Readout Error eXtinction (TREX) improves over standard assignment matrix mitigation by adding random Pauli twirling before measurement. What is the key advantage of TREX?",
      options: [
        "TREX eliminates the need for calibration entirely by using random circuits",
        "TREX converts correlated multi-qubit readout errors into uncorrelated single-qubit errors that can be corrected with a simpler diagonal assignment matrix, avoiding the exponentially large full assignment matrix",
        "TREX increases measurement fidelity by repeating each circuit with different twirling gates and averaging",
        "TREX works only on ion trap systems and is not applicable to superconducting qubits",
      ],
      correctAnswer: 1,
      explanation:
        "The full n-qubit assignment matrix is 2^n × 2^n, making it exponentially expensive to calibrate. TREX applies random single-qubit Pauli twirls before readout to symmetrize the error channel into a diagonal (depolarizing-like) form, reducing calibration to n single-qubit experiments and avoiding multi-qubit correlated error modeling.",
      hints: [
        "Twirling converts a general error channel into a simpler symmetric form — for readout errors, this means diagonal assignment matrix.",
        "Diagonal assignment matrix = only P(measure 0|prepare 1) and P(measure 1|prepare 0) per qubit, requiring only 2n calibration circuits.",
      ],
    },
  ],

  "quantum-hardware-platforms": [
    {
      id: "q-qml-kp40-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Superconducting qubits (as used by IBM and Google) and trapped-ion qubits (as used by IonQ and Quantinuum) have different tradeoffs. What is the primary advantage of trapped-ion qubits over superconducting qubits?",
      options: [
        "Trapped ions have faster gate speeds (nanosecond gates vs. microsecond gates)",
        "Trapped ions have higher qubit connectivity (all-to-all coupling) and longer coherence times, enabling higher-fidelity two-qubit gates",
        "Trapped ions can be operated at room temperature, eliminating the need for cryogenic systems",
        "Trapped ions have larger qubit counts (thousands of qubits vs. hundreds for superconducting)",
      ],
      correctAnswer: 1,
      explanation:
        "Trapped-ion systems benefit from all-to-all qubit connectivity (any two ions can interact via shared motional modes), longer coherence times (seconds vs. microseconds for superconducting), and higher two-qubit gate fidelities (>99.9%); the tradeoff is slower gate speeds (microseconds to milliseconds vs. nanoseconds for superconducting) and more complex laser control systems.",
      hints: [
        "Gate speed vs. gate fidelity is the key tradeoff: superconducting qubits are faster but noisier per gate.",
        "All-to-all connectivity in trapped ions avoids the SWAP overhead needed to connect non-adjacent superconducting qubits.",
      ],
    },
    {
      id: "q-qml-kp40-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Photonic quantum computers encode qubits in the quantum states of photons (e.g., polarization or path), offering the advantage of naturally operating at room temperature and enabling long-distance quantum communication.",
      correctAnswer: "True",
      explanation:
        "Photonic qubits use photon polarization, time-bin, or spatial path modes; photons travel at the speed of light and experience minimal environmental decoherence at room temperature, making them ideal for quantum communication (QKD) and distributed quantum computing, though deterministic photon-photon interactions are challenging for universal computation.",
      hints: [
        "Photons don't interact strongly with their environment — which is good for coherence but bad for implementing two-qubit gates.",
        "Photonic platforms are naturally suited for quantum networks because photons are the carriers of quantum information over fiber.",
      ],
    },
    {
      id: "q-qml-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "IBM's Eagle (127-qubit) and Heron (133-qubit) processors use a heavy-hex lattice connectivity for qubit coupling. What is the primary engineering reason for this sparse connectivity pattern over a full 2D grid?",
      options: [
        "Heavy-hex reduces the number of qubit-qubit couplers, lowering cross-talk (ZZ coupling) between qubits and improving two-qubit gate fidelity at the cost of requiring SWAP gates for non-adjacent operations",
        "Heavy-hex enables all-to-all connectivity by routing signals through bus resonators",
        "Heavy-hex reduces chip area, allowing more qubits to fit on the same die size",
        "Heavy-hex is the only connectivity that supports the surface code without additional modifications",
      ],
      correctAnswer: 0,
      explanation:
        "In superconducting processors, each coupler introduces residual ZZ coupling (always-on cross-talk) that degrades idle qubit coherence; the heavy-hex lattice reduces the number of couplers per qubit (maximum degree 3 vs. 4 for a square lattice), significantly reducing cross-talk and improving two-qubit gate fidelity, at the cost of requiring SWAP gates for non-adjacent qubit operations.",
      hints: [
        "Each coupler in a superconducting processor causes ZZ cross-talk between connected qubits — fewer couplers means less cross-talk.",
        "The tradeoff: fewer couplers = lower cross-talk but requires more SWAP gates for routing non-adjacent operations.",
      ],
    },
  ],
};

const extraQmlQuestions: Record<string, Question[]> = {
  "quantum-kernels": [
    {
      id: "q-qml-ex1-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A quantum kernel K(x, x') is defined as the inner product of two quantum feature map states. Formally, K(x, x') equals:",
      options: [
        "|⟨φ(x)|φ(x')⟩|",
        "|⟨φ(x)|φ(x')⟩|²",
        "⟨φ(x)|Z⊗n|φ(x')⟩",
        "Tr[ρ(x) ρ(x')]",
      ],
      correctAnswer: 1,
      explanation: "The quantum kernel is K(x, x') = |⟨φ(x)|φ(x')⟩|², the squared modulus of the overlap between two quantum feature states. This equals the probability of measuring the all-zero bitstring after applying U†(x') U(x) to |0⟩, which can be estimated by running this circuit and sampling. The squared modulus ensures K is real-valued and positive semi-definite.",
      hints: [
        "The Born rule: the probability of measuring |0...0⟩ after circuit U†(x')U(x)|0...0⟩ equals |⟨0...0|U†(x')U(x)|0...0⟩|² = |⟨φ(x')|φ(x)⟩|².",
        "Quantum kernels inherit the mathematical properties of classical kernels (symmetry, positive semi-definiteness) from the inner product structure of Hilbert space.",
      ],
    },
    {
      id: "q-qml-ex1-2",
      type: "true-false",
      difficulty: "easy",
      question: "A quantum kernel SVM (QSVM) can be implemented by computing all pairwise quantum kernel values K(xi, xj) classically once, then using a standard classical SVM solver with the pre-computed kernel matrix.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "The quantum kernel matrix K (also called the Gram matrix) is computed by running the overlap circuit for each pair (xi, xj) on quantum hardware. Once the full n×n matrix is available classically, a standard SVM dual optimisation (e.g., quadratic programming with cvxopt or scikit-learn's SVC) finds the support vectors and decision boundary — no quantum computation is needed during optimisation or prediction (only during kernel evaluation).",
      hints: [
        "Quantum hardware is only used to fill the kernel matrix; the SVM training itself is classical quadratic programming.",
        "For n training points, computing the full kernel matrix requires O(n²) quantum circuit evaluations, which is a practical bottleneck.",
      ],
    },
    {
      id: "q-qml-ex1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Kernel target alignment (KTA) is a metric used to select or train quantum feature maps. A high kernel target alignment between kernel matrix K and label matrix yy^T indicates:",
      options: [
        "The kernel matrix has rank 1, meaning all data points are equivalent",
        "The kernel function assigns large values to same-class pairs and small values to different-class pairs, making it well-suited for classification",
        "The kernel evaluations are computationally efficient on quantum hardware",
        "The quantum circuit implementing the feature map has low circuit depth",
      ],
      correctAnswer: 1,
      explanation: "KTA = ⟨K, yy^T⟩_F / (||K||_F ||yy^T||_F), where yy^T is the ideal kernel (1 for same class, -1 for different class). High KTA means K ≈ yy^T: same-class points have large kernel overlap (similar quantum states), different-class points have small overlap (orthogonal states). Maximising KTA via gradient ascent trains the quantum feature map to produce class-separating Hilbert space embeddings.",
      hints: [
        "KTA is the Frobenius inner product between the computed kernel and the ideal label-based kernel, normalised to [-1, 1].",
        "Training quantum feature maps to maximise KTA is an alternative to end-to-end QNN training — more interpretable and avoids barren plateaus.",
      ],
    },
    {
      id: "q-qml-ex1-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A key negative result about quantum kernels is that they can suffer from 'exponential concentration'. What does this mean for practical QSVM use?",
      options: [
        "Computing the kernel matrix takes exponential time on classical hardware",
        "For sufficiently expressive feature maps, all pairwise kernel values K(xi, xj) concentrate exponentially close to the same value as qubit count grows, making the kernel matrix nearly uniform and useless for classification",
        "The SVM dual objective has exponentially many local optima when using quantum kernels",
        "Quantum kernels require exponentially many shots per entry to achieve sufficient statistical precision",
      ],
      correctAnswer: 1,
      explanation: "Exponential concentration (Thanasilp et al., 2022): highly expressive quantum feature maps on n qubits map data to near-orthogonal states, so K(xi, xj) ≈ 2^{-n} for all pairs. The kernel matrix becomes proportional to the identity — all distances look the same — rendering the SVM uninformative. This is the kernel analogue of barren plateaus: expressibility hurts trainability.",
      hints: [
        "More expressive ≠ more useful: a feature map mapping everything to near-uniform states provides no discrimination.",
        "Inductive bias must be built into the feature map; random deep feature maps suffer the same concentration as random deep circuits.",
      ],
    },
  ],
  "barren-plateaus": [
    {
      id: "q-qml-ex2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The barren plateau phenomenon in variational quantum circuits refers to:",
      options: [
        "The circuit outputs being constant regardless of the input data",
        "Gradients of the cost function vanishing exponentially with the number of qubits, making optimisation infeasible",
        "Quantum hardware noise suppressing all gradient signals",
        "Trainable parameters converging to the same value due to parameter sharing",
      ],
      correctAnswer: 1,
      explanation: "Barren plateaus (McClean et al., 2018): for random quantum circuits with 2-design expressibility, the gradient variance of global cost functions scales as Var[∂C/∂θ] = O(2^{-n}), where n is the qubit count. On an n=50 qubit device, the gradient is ~10^{-15}, indistinguishable from numerical noise. The loss landscape becomes an exponentially flat 'plateau', and gradient-based optimisation cannot escape it.",
      hints: [
        "2-design circuits mix the state space so thoroughly that the gradient signal averages to zero from all directions.",
        "The exponential suppression means that doubling qubit count squares the gradient variance: on 100 qubits, gradients are ~10^{-30}.",
      ],
    },
    {
      id: "q-qml-ex2-2",
      type: "true-false",
      difficulty: "easy",
      question: "Using a local cost function (measuring only a few qubits rather than all qubits) is a strategy to mitigate barren plateaus because local costs have polynomially (not exponentially) vanishing gradients.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Cerezo et al. (2021) proved that local cost functions — where the observable acts on O(1) qubits — have gradient variance that vanishes at most polynomially with n, not exponentially, for shallow circuits. Global cost functions (e.g., fidelity to target state) are more susceptible to barren plateaus because they require coherence across all qubits.",
      hints: [
        "Local cost: measure a 2-qubit observable on qubits 1-2; this does not require quantum coherence across all n qubits.",
        "The proof uses the fact that local observables commute with gates far from their support, limiting the spread of gradient cancellation.",
      ],
    },
    {
      id: "q-qml-ex2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "High entanglement in a variational quantum circuit is one cause of barren plateaus. Why does high entanglement lead to gradient vanishing?",
      options: [
        "Entangled states are harder to prepare and require more gate operations, increasing noise",
        "Highly entangled circuits act as approximate unitary 2-designs, making the state nearly uniformly distributed over the Hilbert space; measuring any local observable then gives nearly the same value regardless of parameters, so the gradient vanishes",
        "Entanglement reduces the expressibility of the circuit, limiting the range of achievable cost values",
        "CNOT gates do not have differentiable parameters, so entangling layers block gradient flow",
      ],
      correctAnswer: 1,
      explanation: "If the circuit forms a unitary 2-design (or close to it), the output state is nearly Haar-random over the Hilbert space. For any observable O, Tr[O ρ] ≈ Tr[O]/2^n for a Haar-random state. Since this is independent of circuit parameters, ∂Tr[O ρ]/∂θ ≈ 0 everywhere. High entanglement is a proxy for 2-design coverage, which causes this collapse.",
      hints: [
        "Haar-random states are maximally mixed when traced over any subsystem — no parameter affects the reduced density matrix.",
        "The connection: expressibility (ability to represent any unitary) and entanglement are correlated — more expressible circuits are more barren.",
      ],
    },
    {
      id: "q-qml-ex2-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Layer-wise training is proposed as a barren plateau mitigation strategy. How does it work?",
      options: [
        "Train all layers simultaneously but with different learning rates per layer",
        "Train the first few layers of the circuit to convergence before adding new layers, ensuring each new layer is added on top of an already-trained low-entanglement subnetwork, avoiding the random initialisation that causes barren plateaus",
        "Apply gradient clipping to all layers to prevent exponentially large updates",
        "Randomly reset layer parameters to zero at each training step to escape local minima",
      ],
      correctAnswer: 1,
      explanation: "Layer-wise pre-training (Skolik et al., 2021; Grant et al., 2019): begin with a shallow circuit (few layers), train it, then add new layers initialised near identity. Since the existing trained layers provide a meaningful gradient signal (not random), the new layers can be trained without entering a barren plateau. This breaks the circuit depth symmetry that causes random 2-design behaviour.",
      hints: [
        "Random initialisation of all parameters simultaneously creates a random deep circuit — exactly the barren plateau regime.",
        "Adding layers to an already-trained circuit preserves gradient information from early layers, providing a non-zero signal for new layer training.",
      ],
    },
  ],
  "zero-noise-extrapolation": [
    {
      id: "q-qml-ex3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Zero-Noise Extrapolation (ZNE), the noise level is artificially boosted to create additional data points. Which circuit technique implements noise boosting without changing the circuit's unitary?",
      options: [
        "Adding depolarising channels after each gate via software simulation",
        "Gate folding: replacing each gate U with U · U† · U, which is equivalent to U but with 3x more noise due to additional gate operations",
        "Increasing the number of qubits to dilute the noise across a larger Hilbert space",
        "Running the circuit at a higher temperature by reducing cryogenic cooling",
      ],
      correctAnswer: 1,
      explanation: "Gate folding inserts U†U pairs after each gate U: the sequence U → U(U†U) is logically equivalent to U (since U†U = I) but executes 3 gates worth of noise. By folding each gate k times (using 2k+1 gates total), the noise level scales as approximately (2k+1)λ, where λ is the base noise per gate. Multiple noise levels are obtained by varying k.",
      hints: [
        "U†U = I: each folded pair adds noise without changing the mathematical operation.",
        "Fold factor 1: original circuit. Fold factor 3: 3x noise (U U† U). Fold factor 5: 5x noise (U U† U U† U).",
      ],
    },
    {
      id: "q-qml-ex3-2",
      type: "true-false",
      difficulty: "easy",
      question: "ZNE can exactly recover the noiseless expectation value as long as the noise model is known precisely and the extrapolation is performed correctly.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "ZNE provides an estimate of the noiseless value, not an exact recovery. Extrapolation accuracy depends on: (1) the correctness of the assumed noise model (linear, polynomial, exponential), (2) the number and range of noise data points, and (3) statistical shot noise in each evaluation. For deep circuits or severe noise, the extrapolation can diverge and produce biased estimates. ZNE reduces but does not eliminate error.",
      hints: [
        "Extrapolation to zero is always uncertain — the more data points and the closer they are to zero noise, the better the estimate.",
        "If the noise model is misspecified (e.g., linear assumed but actual is non-linear), ZNE introduces systematic bias.",
      ],
    },
    {
      id: "q-qml-ex3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Probabilistic Error Cancellation (PEC) represents the ideal noiseless gate as a quasi-probability decomposition over noisy operations. What is the 'one-norm' γ of this decomposition and why does it matter?",
      options: [
        "γ = 1 always, since probabilities sum to 1",
        "γ > 1 is the sum of absolute values of the quasi-probability coefficients; the sampling overhead of PEC scales as γ^{2n} for n gates, making it exponentially costly for deep circuits",
        "γ is the average gate fidelity of the noisy hardware, bounded between 0 and 1",
        "γ measures the entanglement entropy introduced by the noise channel",
      ],
      correctAnswer: 1,
      explanation: "In PEC, the ideal gate U is written as Σ_i c_i M_i where c_i are real (possibly negative) coefficients and M_i are implementable noisy operations. The one-norm γ = Σ_i |c_i| > 1 because some coefficients are negative. To implement PEC, one samples M_i with probability |c_i|/γ and multiplies the result by sign(c_i)·γ — the variance overhead per gate is γ², and for n independent gates it is γ^{2n}.",
      hints: [
        "γ > 1 because the quasi-probability distribution has negative weights — no valid probability distribution can represent the ideal noiseless gate exactly.",
        "For a depolarizing channel with error rate p, γ ≈ 1 + 4p/3 per gate; for 100 gates at p=0.01, overhead = (1.013)^{200} ≈ 14x.",
      ],
    },
  ],
  "symmetry-verification": [
    {
      id: "q-qml-ex4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Symmetry verification is an error mitigation technique that post-selects circuit outcomes based on physical symmetries. In a quantum chemistry simulation, which symmetry is most commonly exploited?",
      options: [
        "Time-reversal symmetry T",
        "Particle number conservation (electron number parity): the number of electrons in the target molecular state is fixed, so bitstrings violating electron number parity are discarded as erroneous",
        "Spatial rotation symmetry SO(3)",
        "Charge-conjugation symmetry C",
      ],
      correctAnswer: 1,
      explanation: "Molecular electronic states have a fixed number of electrons. In the qubit representation (Jordan-Wigner or Bravyi-Kitaev), electron number parity (total parity of all qubit measurements) must match the target state's parity. Errors that flip an odd number of qubits change parity; these erroneous bitstrings are post-selected away. This is computationally free (just check parity of the bitstring) and reduces effective error rates.",
      hints: [
        "Parity check: if the target state has even electron number, any measurement result with odd Hamming weight is definitely wrong.",
        "Post-selection discards a fraction of shots (those failing the symmetry check), increasing effective sample count needed but reducing bias.",
      ],
    },
    {
      id: "q-qml-ex4-2",
      type: "true-false",
      difficulty: "easy",
      question: "Symmetry verification can only reduce errors from bit-flip noise (Pauli-X errors) and cannot mitigate phase-flip (Pauli-Z) errors because Z errors do not change measurement outcomes in the computational basis.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Symmetry verification in the computational basis checks parity of bitstring outcomes, which only detects errors that change the measured bit value (X or Y errors). Z errors introduce phase flips that do not alter computational basis measurement outcomes and therefore pass the symmetry check undetected. Additional symmetry checks in other bases (e.g., Hadamard-rotated basis) are needed to detect phase errors.",
      hints: [
        "In the computational basis, a Z error leaves |0⟩ → |0⟩ and |1⟩ → -|1⟩ — the measurement outcome is unchanged.",
        "To detect phase errors, measure in the X basis (apply H before measurement); then Z errors appear as bit flips in the new basis.",
      ],
    },
    {
      id: "q-qml-ex4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Clifford data regression (CDR) is an error mitigation method that trains a classical model to map noisy expectation values to noiseless values. What is its key advantage over ZNE?",
      options: [
        "CDR requires no quantum hardware evaluations, running entirely on classical computers",
        "CDR uses near-Clifford circuits (efficiently simulable classically) to generate (noisy, noiseless) training pairs for the regression model, providing data-driven noise characterisation that adapts to the actual hardware noise without assuming a specific noise model",
        "CDR eliminates the need for repeated circuit evaluations by sharing shots across all training pairs",
        "CDR has zero sampling overhead because the classical regression model exactly cancels all errors",
      ],
      correctAnswer: 1,
      explanation: "CDR (Czarnik et al., 2021): replace non-Clifford gates (T gates, R_z(θ) for non-Clifford θ) with nearby Clifford gates to create efficiently simulable circuits. The simulator provides ground-truth noiseless values, while the quantum hardware provides noisy values for the same circuits. A regression model (linear or neural) is trained on these pairs, then applied to correct the target circuit. CDR adapts to actual hardware noise without extrapolation assumptions.",
      hints: [
        "Clifford circuits are classically simulable in polynomial time (Gottesman-Knill theorem), providing free noiseless reference values.",
        "The key insight: near-Clifford circuits have similar noise characteristics to the target circuit but can be simulated exactly — perfect training data for the regression model.",
      ],
    },
  ],
  "nisq-era-constraints": [
    {
      id: "q-qml-ex5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "NISQ (Noisy Intermediate-Scale Quantum) devices are characterised by which combination of limitations?",
      options: [
        "50-1000 qubits with gate fidelities >99.999% but limited connectivity",
        "50-1000 qubits, no quantum error correction, noisy two-qubit gates (99-99.9% fidelity), limited coherence times (microseconds to milliseconds), and restricted qubit connectivity",
        "Fewer than 10 qubits but perfect gate fidelity and arbitrary connectivity",
        "Unlimited qubits but restricted to single-qubit gates only",
      ],
      correctAnswer: 1,
      explanation: "Preskill's NISQ era (2018): devices with 50-1000 qubits, but without the overhead of full fault-tolerant quantum error correction. Two-qubit gate errors of ~0.1-1%, coherence times of ~100 microseconds (superconducting) or ~1 second (trapped ions), restricted connectivity (nearest-neighbor for superconducting), and measurement errors of ~1-5% collectively limit useful circuit depth to ~50-100 two-qubit gates.",
      hints: [
        "NISQ constraints directly limit the depth of useful variational circuits — too deep and decoherence dominates.",
        "The threshold for fault tolerance requires two-qubit gate errors below ~0.1-1% (depending on code), which current devices approach but don't reliably achieve.",
      ],
    },
    {
      id: "q-qml-ex5-2",
      type: "true-false",
      difficulty: "easy",
      question: "On NISQ devices, increasing circuit depth always improves the quality of variational quantum algorithm results because more layers enable richer representations.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "On NISQ hardware, there is an optimal circuit depth: shallow circuits lack expressibility to represent the target function, while deeper circuits accumulate noise from gate errors and decoherence, degrading the output fidelity. The optimal depth balances expressibility against noise accumulation and is device- and problem-specific. Beyond this depth, results worsen despite more layers.",
      hints: [
        "Gate error per layer: each two-qubit gate adds ~0.5% error; after 100 gates, the output fidelity has dropped to ~0.995^{100} ≈ 0.6.",
        "The expressibility-noise trade-off defines the NISQ 'sweet spot' — a key challenge in practical VQA design.",
      ],
    },
    {
      id: "q-qml-ex5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For a variational quantum algorithm targeting an n-qubit problem, the number of shots required to estimate a single expectation value to precision ε scales as:",
      options: [
        "O(n/ε)",
        "O(1/ε²)",
        "O(n²/ε⁴)",
        "O(2^n/ε)",
      ],
      correctAnswer: 1,
      explanation: "By the central limit theorem, estimating an expectation value with variance σ² to precision ε requires O(σ²/ε²) shots. For bounded observables (||O|| ≤ 1), σ² ≤ 1, so the shot count is O(1/ε²). This is independent of n but polynomial in 1/ε — achieving chemical precision ε = 10^{-3} requires ~10^6 shots per expectation value, which is a significant practical bottleneck on quantum hardware.",
      hints: [
        "Each shot gives a single ±1 outcome; averaging N shots gives standard error σ/√N. Setting σ/√N = ε gives N = σ²/ε².",
        "For gradient estimation via parameter shift, 2 expectation value evaluations are needed per parameter — multiplied by the shot count.",
      ],
    },
  ],
  "quantum-advantage-analysis": [
    {
      id: "q-qml-ex6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which class of ML problems is most theoretically promising for quantum advantage, based on current complexity-theoretic understanding?",
      options: [
        "Standard supervised classification on classical tabular datasets (e.g., MNIST, UCI datasets)",
        "Problems where the input data is inherently quantum (quantum state tomography, quantum simulation output) or where the function class is related to quantum computational complexity (e.g., sampling from quantum circuits)",
        "Training large language models with billions of parameters",
        "Gradient descent optimisation of classical deep neural networks",
      ],
      correctAnswer: 1,
      explanation: "Quantum advantage is most plausible for: (1) quantum data problems (the data is a quantum state, and classical description is exponentially expensive), (2) problems whose solution is linked to quantum computational hardness assumptions, and (3) simulation of quantum systems (chemistry, materials). For classical ML on classical data, dequantization and classical algorithm improvements make advantage claims fragile.",
      hints: [
        "If the input and output are classical, the quantum computer must solve a classically hard subroutine — often avoidable classically.",
        "Quantum data advantage: processing a quantum state without full classical tomography (which is exponentially expensive) is naturally quantum.",
      ],
    },
    {
      id: "q-qml-ex6-2",
      type: "true-false",
      difficulty: "easy",
      question: "Grover's search algorithm provides a quadratic quantum speedup for unstructured database search, which directly translates to a quadratic speedup in training any machine learning model that uses gradient descent.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Grover's algorithm speeds up finding a specific item in an unstructured database from O(N) to O(√N). However, gradient descent training is not equivalent to unstructured search: gradients require coherent quantum access to training data (via QRAM), the objective landscape has structure exploited by gradient methods, and applying Grover to ML training requires solving multiple subtleties around quantum query complexity and data loading. No direct quadratic speedup for general gradient descent is known.",
      hints: [
        "Grover speeds up 'find the item satisfying property P' — gradient descent does not reduce to this problem structure.",
        "Quantum speedup for specific ML subroutines (e.g., finding minimum in a loss landscape) requires specific structural assumptions not generally satisfied.",
      ],
    },
    {
      id: "q-qml-ex6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The notion of 'quantum supremacy' (or 'quantum computational advantage') was demonstrated by Google in 2019 using random circuit sampling. Why is random circuit sampling not directly useful for ML applications?",
      options: [
        "Random circuit sampling requires too many qubits for current hardware",
        "Random circuits produce outputs that are classically hard to simulate but carry no useful information — the hardness arises from complexity-theoretic arguments about sampling from anticoncentrated distributions, not from solving an ML-relevant problem",
        "Random circuit sampling can only be run once per qubit, making it incompatible with training",
        "The outputs are quantum states that cannot be measured and converted to classical predictions",
      ],
      correctAnswer: 1,
      explanation: "Google's Sycamore experiment (2019) demonstrated that measuring bitstring outputs of random quantum circuits is classically hard (anti-concentrating distribution with hardness tied to #P-hardness conjectures). However, the sampled bitstrings are essentially random — they contain no structured information useful for classification, regression, or optimisation. Supremacy demonstrations prove quantum hardware works at scale, but the computation itself is not ML-relevant.",
      hints: [
        "The hardness of random circuit sampling comes from the 'noise in the output' — useful ML outputs need structured, not random, computation.",
        "Quantum supremacy: proof that a device works; quantum advantage in ML: proof that the device solves a useful problem better than classical approaches.",
      ],
    },
    {
      id: "q-qml-ex6-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Classical simulation of quantum circuits via tensor network methods (e.g., MPS, MERA) is efficient for which class of quantum states, limiting the quantum advantage claim?",
      options: [
        "All quantum states, since tensor networks can represent any quantum state with arbitrary precision",
        "Quantum states with low entanglement (area-law entanglement) — specifically matrix product states can represent these efficiently with bond dimension polynomial in system size",
        "Only product states (zero entanglement) — any entanglement makes tensor network simulation exponential",
        "Quantum states produced by circuits with depth less than log n, where n is the system size",
      ],
      correctAnswer: 1,
      explanation: "Matrix Product States (MPS) efficiently represent 1D quantum states satisfying area-law entanglement (entanglement entropy bounded by a constant, not scaling with system size). Many variational circuits trained with limited depth produce low-entanglement states efficiently simulable classically via MPS with polynomial bond dimension. This means shallow VQCs may provide no quantum advantage over optimised MPS-based classical methods.",
      hints: [
        "Area law: entanglement entropy of a 1D region scales as constant (area) not volume; MPS capture this efficiently.",
        "If the ground state of a 1D Hamiltonian satisfies area law (provable for gapped 1D systems), MPS simulate it efficiently — no quantum advantage for these systems.",
      ],
    },
  ],
};

Object.assign(questions, extraQmlQuestions);

registerQuestions(questions);
export default questions;
