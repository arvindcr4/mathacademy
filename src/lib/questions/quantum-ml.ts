import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'qubits-gates': [
    {
      id: 'q-qml-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A Hadamard gate H applied to |0⟩ produces ___.',
      options: [
        '|1⟩',
        '(|0⟩ − |1⟩) / √2',
        '(|0⟩ + |1⟩) / √2',
        '|0⟩',
      ],
      correctAnswer: 2,
      explanation: 'The Hadamard matrix is H = (1/√2)[[1,1],[1,−1]]. Acting on |0⟩ = [1,0]ᵀ gives H|0⟩ = (1/√2)[1,1]ᵀ = (|0⟩ + |1⟩)/√2, the |+⟩ state — an equal superposition with positive phase.',
      hints: [
        'Write out H as a 2×2 matrix and multiply by the column vector [1, 0]ᵀ representing |0⟩.',
        'H maps |0⟩ → |+⟩ and |1⟩ → |−⟩ = (|0⟩ − |1⟩)/√2.',
      ],
    },
    {
      id: 'q-qml-kp1-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The Pauli-Z gate acting on a general qubit α|0⟩ + β|1⟩ produces ___.',
      options: [
        'β|0⟩ + α|1⟩',
        'α|0⟩ − β|1⟩',
        '−α|0⟩ + β|1⟩',
        'α|0⟩ + β|1⟩',
      ],
      correctAnswer: 1,
      explanation: 'The Pauli-Z matrix is Z = [[1,0],[0,−1]]. Acting on α|0⟩ + β|1⟩ = [α,β]ᵀ gives Z[α,β]ᵀ = [α,−β]ᵀ = α|0⟩ − β|1⟩. Z is a π rotation around the Z-axis, flipping the phase of the |1⟩ component.',
      hints: [
        'The Z matrix leaves |0⟩ unchanged but multiplies |1⟩ by −1.',
        'Z = diag(1, −1), so it simply negates the amplitude of |1⟩.',
      ],
    },
    {
      id: 'q-qml-kp1-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The S gate (phase gate) has matrix S = [[1,0],[0,i]]. What is S² equal to?',
      options: [
        'Identity I',
        'Pauli-X',
        'Pauli-Z',
        'Hadamard H',
      ],
      correctAnswer: 2,
      explanation: 'S² = [[1,0],[0,i]]² = [[1,0],[0,i²]] = [[1,0],[0,−1]] = Z. Applying the S gate twice is equivalent to a π/2 phase shift applied twice, giving a π phase shift — the Pauli-Z gate.',
      hints: [
        'S = diag(1, i). Squaring a diagonal matrix just squares the diagonal entries: S² = diag(1², i²) = diag(1, −1).',
        'Compare S² = diag(1,−1) with the Pauli-Z matrix diag(1,−1). They are the same.',
      ],
    },
  ],

  'quantum-circuits': [
    {
      id: 'q-qml-kp2-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A circuit applies H to qubit 1 (initially |0⟩), then a CNOT with qubit 1 as control and qubit 2 (initially |0⟩) as target. The resulting two-qubit state is ___.',
      options: [
        '|00⟩',
        '(|00⟩ + |11⟩) / √2',
        '(|01⟩ + |10⟩) / √2',
        '|11⟩',
      ],
      correctAnswer: 1,
      explanation: 'After H: qubit 1 is (|0⟩+|1⟩)/√2, system is (|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩+|10⟩)/√2. CNOT flips qubit 2 when qubit 1 is |1⟩: |00⟩→|00⟩, |10⟩→|11⟩. Result: (|00⟩+|11⟩)/√2, the Φ⁺ Bell state.',
      hints: [
        'Expand |+⟩|0⟩ = (|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩+|10⟩)/√2, then apply CNOT to each term.',
        'CNOT: |00⟩→|00⟩, |01⟩→|01⟩, |10⟩→|11⟩, |11⟩→|10⟩.',
      ],
    },
    {
      id: 'q-qml-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In a quantum circuit, gates must be applied in a strictly sequential order and cannot be parallelized across independent qubits.',
      correctAnswer: 'false',
      explanation: 'Gates acting on disjoint sets of qubits commute and can be applied in parallel, which is exploited for circuit depth reduction and hardware efficiency. Circuit depth counts the longest sequential chain of non-commuting gates, not the total number of gates.',
      hints: [
        'Consider whether a gate on qubit 1 can possibly affect the state of qubit 3 if they are not entangled or connected by the circuit.',
        'Parallel execution of gates on independent qubits is a key strategy for reducing circuit depth on quantum hardware.',
      ],
    },
    {
      id: 'q-qml-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The CNOT gate has the matrix (in computational basis {|00⟩,|01⟩,|10⟩,|11⟩}) ___.',
      options: [
        '[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]',
        '[[0,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]]',
        '[[1,0,0,0],[0,0,0,1],[0,0,1,0],[0,1,0,0]]',
        '[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,0]]',
      ],
      correctAnswer: 0,
      explanation: 'CNOT maps |00⟩→|00⟩, |01⟩→|01⟩, |10⟩→|11⟩, |11⟩→|10⟩. In matrix form with rows/columns ordered {|00⟩,|01⟩,|10⟩,|11⟩}, the 3rd and 4th rows are swapped relative to the identity: [[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]].',
      hints: [
        'CNOT leaves |00⟩ and |01⟩ unchanged (control is |0⟩), and flips the target when control is |1⟩: |10⟩↔|11⟩.',
        'Read off each column: which basis state does each input map to? The column for |10⟩ must be |11⟩.',
      ],
    },
  ],

  'quantum-entanglement': [
    {
      id: 'q-qml-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which of the following is a Bell state?',
      options: [
        '|00⟩',
        '(|0⟩ + |1⟩) / √2',
        '(|00⟩ + |11⟩) / √2',
        '|01⟩ − |10⟩',
      ],
      correctAnswer: 2,
      explanation: 'Bell states are maximally entangled two-qubit states; (|00⟩ + |11⟩)/√2, known as Φ⁺, is one of the four Bell states and cannot be written as a product of two single-qubit states.',
      hints: [
        'A Bell state involves two qubits that are entangled — it cannot be factored into individual qubit states.',
        'Superposition of a single qubit is not entanglement; look for a two-qubit state with correlated outcomes.',
      ],
    },
    {
      id: 'q-qml-kp3-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Quantum entanglement allows two parties to communicate information faster than the speed of light.',
      correctAnswer: 'false',
      explanation: 'Entanglement produces correlated measurement outcomes but no information is transmitted; the no-communication theorem proves that entanglement alone cannot be used for superluminal signaling.',
      hints: [
        'Consider whether the party measuring first can choose or predict what the other party will observe.',
        'The no-communication theorem is a fundamental result in quantum information theory.',
      ],
    },
    {
      id: 'q-qml-kp3-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In quantum computing, which property of entangled states is exploited by quantum teleportation?',
      options: [
        'Faster-than-light communication',
        'Cloning of quantum states',
        'Non-local correlations combined with classical communication',
        'Infinite parallelism of all qubit states',
      ],
      correctAnswer: 2,
      explanation: 'Quantum teleportation uses entanglement to transfer an unknown quantum state using non-local correlations plus two classical bits; the classical channel ensures no faster-than-light information transfer.',
      hints: [
        'Teleportation always requires a classical side-channel — think about what that channel carries and why it is necessary.',
        'Cloning is forbidden by the no-cloning theorem, and FTL communication is ruled out.',
      ],
    },
  ],

  'quantum-algorithms': [
    {
      id: 'q-qml-kp4-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Grover's algorithm searches an unsorted database of N items. What is its query complexity?",
      options: ['O(log N)', 'O(N)', 'O(√N)', 'O(N²)'],
      correctAnswer: 2,
      explanation: "Grover's algorithm achieves a quadratic speedup over classical linear search, requiring O(√N) oracle queries to find a marked item with high probability.",
      hints: [
        'Classical brute-force search is O(N); quantum algorithms can do better by a polynomial factor.',
        'The amplitude amplification technique at the heart of Grover repeats roughly √N times.',
      ],
    },
    {
      id: 'q-qml-kp4-2',
      type: 'true-false',
      difficulty: 'easy',
      question: "Shor's algorithm can factor large integers exponentially faster than the best known classical algorithms.",
      correctAnswer: 'true',
      explanation: "Shor's algorithm runs in polynomial time O((log N)³) using quantum phase estimation and the quantum Fourier transform, versus sub-exponential but super-polynomial classical factoring algorithms.",
      hints: [
        'The best classical factoring algorithms (e.g., general number field sieve) are sub-exponential but not polynomial.',
        'Shor reduces factoring to period-finding, which quantum Fourier transform solves efficiently.',
      ],
    },
    {
      id: 'q-qml-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "Which subroutine is central to Shor's algorithm for finding the period of a modular function?",
      options: [
        'Grover diffusion operator',
        'Quantum Fourier Transform (QFT)',
        'Harrow-Hassidim-Lloyd (HHL) algorithm',
        'Variational Quantum Eigensolver (VQE)',
      ],
      correctAnswer: 1,
      explanation: "The Quantum Fourier Transform allows Shor's algorithm to extract the period of f(x) = aˣ mod N from a superposition of values, reducing integer factoring to order-finding.",
      hints: [
        'Period-finding is equivalent to detecting periodicity in a function — which transform is classically used for this?',
        'The quantum analogue of the discrete Fourier transform is a key building block in many quantum algorithms.',
      ],
    },
  ],

  'nisq-era': [
    {
      id: 'q-qml-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does NISQ stand for in the context of quantum computing?',
      options: [
        'Non-Ideal Sequential Quantum',
        'Noisy Intermediate-Scale Quantum',
        'Normalized Integrated Signal Qubit',
        'Near-Infinite Superposition Quantum',
      ],
      correctAnswer: 1,
      explanation: 'NISQ (Noisy Intermediate-Scale Quantum) refers to current quantum devices with 50–1000 qubits that lack full error correction, coined by John Preskill in 2018.',
      hints: [
        'The term was introduced to describe devices that are too noisy for fault-tolerant computation but too large to simulate classically.',
        'Two key adjectives describe the era: the presence of noise, and the moderate number of qubits.',
      ],
    },
    {
      id: 'q-qml-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Decoherence in NISQ devices causes qubits to lose their quantum properties by interacting with the environment.',
      correctAnswer: 'true',
      explanation: 'Decoherence is the process by which quantum superposition is lost due to uncontrolled environmental interactions, collapsing qubits toward classical mixed states and limiting circuit depth.',
      hints: [
        'Any unintended coupling between a qubit and external degrees of freedom will degrade the quantum state.',
        'Decoherence time (T1, T2) bounds how long a qubit can hold quantum information.',
      ],
    },
    {
      id: 'q-qml-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which noise model describes errors that randomly apply a Pauli gate (X, Y, or Z) to a qubit with equal probability?',
      options: [
        'Amplitude damping',
        'Phase damping',
        'Depolarizing channel',
        'Bit-flip channel',
      ],
      correctAnswer: 2,
      explanation: 'The depolarizing channel applies each of X, Y, Z with probability p/4 and the identity with probability 1−3p/4, uniformly shrinking the Bloch vector toward the maximally mixed state.',
      hints: [
        'Bit-flip only applies X; think about which channel applies all three Pauli errors with equal weight.',
        'The depolarizing channel is the most symmetric noise model and maps any pure state toward the center of the Bloch sphere.',
      ],
    },
  ],

  'vqe': [
    {
      id: 'q-qml-kp6-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The Variational Quantum Eigensolver (VQE) is used to estimate which property of a Hamiltonian?',
      options: [
        'Maximum eigenvalue',
        'Ground state energy (minimum eigenvalue)',
        'Trace of the Hamiltonian',
        'Operator norm',
      ],
      correctAnswer: 1,
      explanation: 'VQE approximates the ground state energy of a Hamiltonian by minimizing the expectation value ⟨ψ(θ)|H|ψ(θ)⟩ over parameterized circuit parameters θ, leveraging the variational principle.',
      hints: [
        'The variational principle guarantees that any trial state gives an energy above or equal to the true ground state.',
        'VQE is motivated by quantum chemistry where the ground state energy determines molecular stability.',
      ],
    },
    {
      id: 'q-qml-kp6-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In VQE, the quantum computer is used to prepare a parameterized state and measure expectation values, while a classical optimizer updates the parameters.',
      correctAnswer: 'true',
      explanation: 'VQE is a hybrid algorithm: the quantum device handles state preparation and Hamiltonian measurement, while a classical optimizer (e.g., COBYLA, BFGS) minimizes the energy over circuit parameters.',
      hints: [
        'Think about which tasks require quantum superposition and which can be done efficiently on classical hardware.',
        'The hybrid structure is what makes VQE practical for NISQ devices with limited coherence time.',
      ],
    },
    {
      id: 'q-qml-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which mathematical principle guarantees that the VQE expectation value ⟨ψ(θ)|H|ψ(θ)⟩ is always an upper bound on the ground state energy?',
      options: [
        'Cauchy-Schwarz inequality',
        'Variational principle (Rayleigh-Ritz method)',
        'Heisenberg uncertainty principle',
        'Jordan-Wigner transformation',
      ],
      correctAnswer: 1,
      explanation: 'The variational principle states that for any normalized state |ψ⟩, ⟨ψ|H|ψ⟩ ≥ E₀, where E₀ is the true ground state energy, providing the theoretical foundation for VQE.',
      hints: [
        'This principle appears in quantum mechanics courses as a method for approximating ground state energies.',
        'The ground state minimizes the energy — any other state must have energy at least as large.',
      ],
    },
  ],

  'qaoa': [
    {
      id: 'q-qml-kp7-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'QAOA alternates between two types of operators. What are they?',
      options: [
        'Measurement operator and reset operator',
        'Cost Hamiltonian and Mixer Hamiltonian',
        'Encoding unitary and decoding unitary',
        'Grover oracle and diffusion operator',
      ],
      correctAnswer: 1,
      explanation: 'QAOA alternates p rounds of the cost Hamiltonian Hc (encoding the optimization objective) and the mixer Hamiltonian Hm (typically uniform X rotations), with 2p variational angles (γ, β).',
      hints: [
        'One operator encodes what we want to optimize; the other explores the solution space.',
        'The two operators serve analogous roles to the problem energy and kinetic energy in quantum annealing.',
      ],
    },
    {
      id: 'q-qml-kp7-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'At p = 1 layer, QAOA is guaranteed to find the optimal solution to any combinatorial optimization problem.',
      correctAnswer: 'false',
      explanation: 'QAOA with p = 1 provides only a constant-factor approximation; approaching the optimal solution generally requires p → ∞ layers, and even then optimality is not guaranteed for NP-hard problems.',
      hints: [
        'More circuit layers generally allow better approximation — think about what one layer can realistically explore.',
        'If a single-layer quantum circuit could solve NP-hard problems exactly, this would have major computational complexity implications.',
      ],
    },
    {
      id: 'q-qml-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'QAOA was originally designed to solve which class of combinatorial optimization problems?',
      options: [
        'Linear programming',
        'Constraint satisfaction problems (CSPs) encoded as MAX-CUT',
        'Convex optimization',
        'Sorting networks',
      ],
      correctAnswer: 1,
      explanation: 'QAOA was introduced by Farhi, Goldstone, and Gutmann (2014) for MAX-CUT, a prototypical NP-hard combinatorial optimization problem where the goal is to partition graph vertices to maximize cut edges.',
      hints: [
        'The original QAOA paper targets a graph problem where you partition vertices into two sets.',
        'MAX-CUT is a canonical NP-hard problem often used to benchmark quantum optimization algorithms.',
      ],
    },
  ],

  'ansatz-design': [
    {
      id: 'q-qml-kp8-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What does "expressibility" of a quantum ansatz measure?',
      options: [
        'The number of parameters in the circuit',
        'How uniformly the parameterized circuit can cover the Haar-random distribution of states',
        'The circuit depth in terms of two-qubit gates',
        'The fidelity between the ansatz state and a target state',
      ],
      correctAnswer: 1,
      explanation: 'Expressibility quantifies how well a parameterized ansatz samples the full Hilbert space; a highly expressible ansatz approximates the Haar-random distribution of states, meaning it can represent a wider variety of quantum states.',
      hints: [
        'A very expressive circuit can reach almost any quantum state; compare this to a model with too few parameters.',
        'Expressibility is measured by comparing the state distribution of the ansatz to the uniform (Haar) distribution over states.',
      ],
    },
    {
      id: 'q-qml-kp8-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Hardware-efficient ansatze are designed to minimize the number of gates that are native to the quantum hardware, regardless of the problem structure.',
      correctAnswer: 'true',
      explanation: 'Hardware-efficient ansatze prioritize using the native gate set and connectivity of a specific quantum device to reduce noise, even if the circuit structure has no direct relationship to the problem being solved.',
      hints: [
        'On real NISQ hardware, gate errors and connectivity constraints make some circuits far less noisy than others.',
        'The trade-off is that hardware efficiency may sacrifice problem-specific structure or trainability.',
      ],
    },
    {
      id: 'q-qml-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which ansatz type embeds the physical symmetries of a molecular Hamiltonian into the circuit structure, making it particularly suitable for quantum chemistry?',
      options: [
        'Random unitary ansatz',
        'Hardware-efficient ansatz',
        'Unitary Coupled Cluster (UCC) ansatz',
        'Quantum Convolutional ansatz',
      ],
      correctAnswer: 2,
      explanation: 'The Unitary Coupled Cluster (UCC) ansatz, particularly UCCSD, is motivated by classical coupled cluster theory and respects particle-number conservation, making it chemically meaningful for molecular ground state calculations.',
      hints: [
        'Classical quantum chemistry has a hierarchy of approximations (HF, CCSD, CCSDT…) — which ansatz borrows from this?',
        'For chemistry problems, preserving electron number and spin symmetry in the ansatz is physically important.',
      ],
    },
  ],

  'parameter-shift': [
    {
      id: 'q-qml-kp9-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The parameter-shift rule computes the gradient of a quantum circuit expectation value using how many circuit evaluations per parameter?',
      options: ['1', '2', '4', 'O(n)'],
      correctAnswer: 1,
      explanation: 'The parameter-shift rule evaluates the circuit at θ + π/2 and θ − π/2, requiring exactly 2 evaluations per parameter to compute an exact analytic gradient without finite-difference approximation.',
      hints: [
        'Unlike finite differences (which also use 2 evaluations but give approximate gradients), this rule gives exact results.',
        'The two shifted evaluations are symmetric around the original parameter value.',
      ],
    },
    {
      id: 'q-qml-kp9-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The parameter-shift rule gives the exact gradient (not an approximation) of the expectation value with respect to a gate parameter.',
      correctAnswer: 'true',
      explanation: 'Because parameterized gates have the form exp(−iθP/2) where P is a Pauli operator, the expectation value is a sinusoidal function of θ, and the parameter-shift rule computes its exact derivative analytically.',
      hints: [
        'Finite differences approximate derivatives; the parameter-shift rule exploits the specific mathematical structure of quantum gates.',
        'The expectation value of any Pauli gate rotation is a sine/cosine function, whose derivative can be computed exactly.',
      ],
    },
    {
      id: 'q-qml-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'For a gate of the form U(θ) = exp(−iθG) where G has eigenvalues ±r, the parameter-shift rule uses a shift of s = π/(4r). For a standard Pauli rotation where r = 1/2, what is the shift?',
      options: ['π/8', 'π/4', 'π/2', 'π'],
      correctAnswer: 2,
      explanation: 'With r = 1/2 for standard Pauli rotations, the shift is s = π/(4 × 1/2) = π/2, giving the classic ∂f/∂θ = [f(θ + π/2) − f(θ − π/2)] / 2 formula.',
      hints: [
        'Substitute r = 1/2 into s = π/(4r) directly.',
        'This is the standard shift used in PennyLane and most QML frameworks for single-qubit rotation gates.',
      ],
    },
  ],

  'barren-plateaus': [
    {
      id: 'q-qml-kp10-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Barren plateaus in quantum neural networks cause gradients to vanish exponentially with the number of qubits n. How does the gradient variance scale?',
      options: ['O(1/n)', 'O(1/2ⁿ)', 'O(n)', 'O(log n)'],
      correctAnswer: 1,
      explanation: 'In random parameterized circuits, gradient variance decreases exponentially as O(1/2ⁿ), meaning exponentially many circuit evaluations are needed to detect a gradient signal, making training infeasible at scale.',
      hints: [
        'Exponential scaling with the number of qubits is a hallmark of the barren plateau problem.',
        'Even with measurement averaging, the signal-to-noise ratio falls exponentially in n.',
      ],
    },
    {
      id: 'q-qml-kp10-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Barren plateaus can be partially avoided by using problem-inspired or shallow local ansatze instead of deep global random circuits.',
      correctAnswer: 'true',
      explanation: 'Local cost functions and shallow, structured ansatze avoid the full Haar-random regime, resulting in at most polynomially vanishing gradients rather than exponentially vanishing ones.',
      hints: [
        'Deep, globally entangled circuits are most prone to barren plateaus — locality limits the damage.',
        'The barren plateau theorem applies to global cost functions on expressive random circuits; local structure breaks this assumption.',
      ],
    },
    {
      id: 'q-qml-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which initialization strategy has been shown to help avoid barren plateaus in deep quantum circuits?',
      options: [
        'Uniform random initialization in [0, 2π]',
        'Identity block initialization (initializing blocks to near-identity)',
        'Xavier/Glorot initialization from classical neural networks',
        'Zero initialization of all parameters',
      ],
      correctAnswer: 1,
      explanation: 'Grant et al. (2019) proposed identity block initialization, where parameter blocks are set so each block approximates the identity, keeping gradients non-vanishing at the start of training for deep circuits.',
      hints: [
        'Starting near the identity means the circuit output is close to a known reference state, giving a non-flat loss landscape initially.',
        'This technique was specifically designed for quantum circuits — classical initializations do not directly translate.',
      ],
    },
  ],

  'quantum-feature-maps': [
    {
      id: 'q-qml-kp11-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A quantum feature map φ(x) encodes classical data x into a quantum state |φ(x)⟩. What defines the corresponding quantum kernel?',
      options: [
        'The trace of the density matrix ρ(x)',
        'The inner product |⟨φ(x)|φ(x′)⟩|²',
        'The number of gates in the encoding circuit',
        'The entanglement entropy of |φ(x)⟩',
      ],
      correctAnswer: 1,
      explanation: 'The quantum kernel between two data points x and x′ is defined as K(x, x′) = |⟨φ(x)|φ(x′)⟩|², computed by running the feature map circuit and its inverse and measuring the zero-state probability.',
      hints: [
        'In kernel methods, the kernel function measures similarity between feature representations.',
        'The quantum kernel can be estimated by a "swap test" or by running the overlap circuit and measuring the |0⟩ probability.',
      ],
    },
    {
      id: 'q-qml-kp11-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The ZZFeatureMap in PennyLane/Qiskit encodes classical data using both single-qubit and two-qubit interactions to create entanglement between feature dimensions.',
      correctAnswer: 'true',
      explanation: 'The ZZFeatureMap applies Hadamard gates followed by ZZ-interaction unitaries exp(i(π − x_i)(π − x_j)ZZ) between pairs of qubits, creating non-linear and entangled encodings of the input features.',
      hints: [
        'The "ZZ" in the name hints at two-qubit Pauli-ZZ interactions between feature pairs.',
        'Entanglement between qubits allows the feature map to capture correlations between different input dimensions.',
      ],
    },
    {
      id: 'q-qml-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'For a quantum kernel to provide a genuine advantage, the feature map should ideally produce a kernel that is:',
      options: [
        'Efficiently computable classically',
        'A linear kernel in the original feature space',
        'Hard to compute classically but accessible via quantum circuits',
        'Equivalent to the RBF (Gaussian) kernel',
      ],
      correctAnswer: 2,
      explanation: 'Quantum kernel advantage requires that the feature space is classically hard to access; if the kernel can be efficiently computed classically, there is no quantum computational benefit over classical kernel SVMs.',
      hints: [
        'The whole point of a quantum feature map is to access a Hilbert space that classical computers cannot efficiently simulate.',
        'If the kernel is classically simulable, Huang et al. (2021) showed quantum kernel methods offer no advantage.',
      ],
    },
  ],

  'quantum-svm': [
    {
      id: 'q-qml-kp12-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In a quantum SVM, what role does the quantum computer play?',
      options: [
        'Running the classical SVM optimization',
        'Computing the kernel matrix K(x_i, x_j) via quantum circuits',
        'Generating the training labels',
        'Performing gradient descent on the support vectors',
      ],
      correctAnswer: 1,
      explanation: 'The quantum computer evaluates the quantum kernel matrix by running overlap circuits for each pair of training points; the classical SVM solver then uses this kernel matrix for training.',
      hints: [
        'Quantum and classical parts have different roles — the quantum part accesses the high-dimensional feature space.',
        'Once the kernel matrix is computed, standard classical quadratic programming solves the SVM dual problem.',
      ],
    },
    {
      id: 'q-qml-kp12-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Computing the full N×N quantum kernel matrix for N training points requires O(N²) quantum circuit evaluations.',
      correctAnswer: 'true',
      explanation: 'Since each kernel entry K(x_i, x_j) requires one quantum circuit evaluation and there are N(N−1)/2 unique pairs, the total cost is O(N²) circuit runs, which can be a bottleneck for large datasets.',
      hints: [
        'Count how many pairs of training points exist in a dataset of size N.',
        'This quadratic scaling is also a challenge for classical kernel SVMs, but quantum circuits add per-evaluation overhead.',
      ],
    },
    {
      id: 'q-qml-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Havlíček et al. (2019) constructed a quantum SVM with a provable classical hardness guarantee. What was the basis of this guarantee?',
      options: [
        'NP-hardness of the kernel computation',
        'The feature map was based on a problem believed to be classically intractable (related to the discrete logarithm)',
        'The dataset was too large to fit in classical memory',
        'The quantum circuit contained exponentially many gates',
      ],
      correctAnswer: 1,
      explanation: 'Havlíček et al. based classical hardness on the assumption that certain quantum circuits related to the discrete logarithm problem cannot be efficiently simulated classically, providing a complexity-theoretic separation.',
      hints: [
        'The hardness argument must be rooted in a well-studied computational problem — not just circuit size.',
        'The discrete logarithm problem underlies many cryptographic protocols and is believed to be classically hard.',
      ],
    },
  ],

  'data-encoding': [
    {
      id: 'q-qml-kp13-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Amplitude encoding maps N classical data values into the amplitudes of an n-qubit state where N = 2ⁿ. What is a key advantage of this encoding?',
      options: [
        'It requires O(N) gates to prepare',
        'It stores exponentially many values in only n qubits',
        'It is hardware-efficient for all quantum devices',
        'It preserves the locality structure of the data',
      ],
      correctAnswer: 1,
      explanation: 'Amplitude encoding is exponentially compact: n qubits store 2ⁿ real amplitudes, enabling logarithmic qubit scaling with data size, though state preparation circuits can be exponentially deep in the worst case.',
      hints: [
        'Consider how many values the amplitudes of an n-qubit state can hold versus n classical bits.',
        'The exponential compression is the main theoretical advantage — but state preparation cost is a practical concern.',
      ],
    },
    {
      id: 'q-qml-kp13-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Angle encoding maps each classical feature to the rotation angle of a single-qubit gate, requiring one qubit per feature.',
      correctAnswer: 'true',
      explanation: 'In angle encoding, a feature xᵢ is encoded as the angle of an Rx(xᵢ) or Ry(xᵢ) rotation gate applied to qubit i, giving a linear qubit count but losing the exponential compression of amplitude encoding.',
      hints: [
        'Think about the most direct mapping: one rotation gate encodes one number, so one qubit per feature.',
        'Angle encoding is simpler to implement and requires no complex state preparation, at the cost of linear qubit scaling.',
      ],
    },
    {
      id: 'q-qml-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Basis encoding represents classical integers in binary using computational basis states. To represent the integer 5 on 3 qubits, what state is prepared?',
      options: ['|000⟩', '|101⟩', '|110⟩', '|011⟩'],
      correctAnswer: 1,
      explanation: '5 in binary is 101, so basis encoding maps it to |101⟩, where each qubit holds one bit of the binary representation; this encoding uses one qubit per bit and allows no superposition over the data.',
      hints: [
        'Convert 5 to binary: 5 = 4 + 1 = 2² + 2⁰, so the bits from most significant to least are...',
        'Basis encoding is the most direct: each classical bit maps to one qubit in the |0⟩ or |1⟩ state.',
      ],
    },
  ],

  'quantum-advantage-ml': [
    {
      id: 'q-qml-kp14-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which of the following best describes a "dequantization" result in the context of quantum ML advantage?',
      options: [
        'Showing that quantum computers cannot solve a problem at all',
        'Developing a classical algorithm that matches a quantum algorithm\'s performance',
        'Measuring the decoherence rate of a quantum ML model',
        'Removing quantum gates from a hybrid circuit',
      ],
      correctAnswer: 1,
      explanation: 'Dequantization results (e.g., Tang 2019 on quantum recommendation systems) show that classical algorithms can achieve similar asymptotic performance to claimed quantum speedups, often by using classical analogues of quantum random-access techniques.',
      hints: [
        'If a classical algorithm can match the quantum speedup, the "advantage" disappears — what would you call that process?',
        'Tang\'s work on quantum recommendation systems is the canonical dequantization example.',
      ],
    },
    {
      id: 'q-qml-kp14-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'A provable quantum advantage in ML has been conclusively demonstrated for real-world large-scale datasets as of 2024.',
      correctAnswer: 'false',
      explanation: 'As of 2024, all provable quantum ML advantages are confined to constructed or synthetic problem instances; no unambiguous quantum advantage has been demonstrated on practically relevant large-scale ML tasks.',
      hints: [
        'Consider the gap between theoretical complexity separations and practical benchmarks on real data.',
        'Quantum hardware limitations and dequantization results make real-world advantage claims very difficult to sustain.',
      ],
    },
    {
      id: 'q-qml-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Liu et al. (2021) showed a provable quantum kernel learning advantage under a specific assumption. What was the key assumption?',
      options: [
        'The training dataset is exponentially large',
        'The quantum feature map is based on a classically hard problem (discrete log)',
        'Quantum hardware has zero noise',
        'The classical SVM uses a linear kernel',
      ],
      correctAnswer: 1,
      explanation: 'Liu et al. proved a quantum kernel classification advantage assuming the feature map encodes a problem related to the discrete logarithm, which is believed to be classically hard, yielding a complexity-theoretic separation.',
      hints: [
        'Provable advantage needs a cryptographic or complexity-theoretic hardness assumption — not just an empirical gap.',
        'The discrete logarithm connection links quantum ML advantage to well-studied hardness conjectures.',
      ],
    },
  ],

  'dequantization': [
    {
      id: 'q-qml-kp15-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Tang\'s 2019 dequantization of quantum recommendation systems achieved classical speedup by using which classical data structure?',
      options: [
        'Hash tables',
        'Sample-and-query (SQ) access to data',
        'Bloom filters',
        'B-trees',
      ],
      correctAnswer: 1,
      explanation: 'Tang introduced "sample-and-query" (SQ) access — the ability to sample from a probability distribution proportional to row norms and query individual entries — as the classical analogue of quantum random-access memory (QRAM).',
      hints: [
        'QRAM gives quantum algorithms fast superposition access to data; what classical equivalent enables similar statistical sampling?',
        'The key insight is that quantum speedup sometimes relies only on the ability to sample efficiently, not true quantum parallelism.',
      ],
    },
    {
      id: 'q-qml-kp15-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Dequantization results disprove the utility of all quantum algorithms.',
      correctAnswer: 'false',
      explanation: 'Dequantization only applies to specific algorithms that relied on QRAM-style data access; algorithms like Shor\'s (factoring) and Grover\'s (search) remain without classical polynomial-time equivalents.',
      hints: [
        'Dequantization targets a specific class of quantum algorithms — those whose speedup came from data access, not quantum interference.',
        'Factoring and unstructured search have no known classical polynomial equivalents, so they are not dequantizable.',
      ],
    },
    {
      id: 'q-qml-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which quantum linear algebra algorithm was one of the first major targets of dequantization efforts?',
      options: [
        'Quantum phase estimation',
        'HHL (Harrow-Hassidim-Lloyd) algorithm for linear systems',
        'Quantum Fourier Transform',
        'Variational Quantum Eigensolver',
      ],
      correctAnswer: 1,
      explanation: 'The HHL algorithm claimed exponential speedup for solving linear systems; dequantization results by Tang and others showed classical randomized algorithms can achieve similar performance under the same input model (QRAM-accessible sparse matrices).',
      hints: [
        'HHL claimed exponential speedup for Ax=b — it was one of the most celebrated quantum ML algorithms until scrutinized.',
        'The caveats of HHL (QRAM input, sparse/well-conditioned matrices, sampling output) opened the door to classical alternatives.',
      ],
    },
  ],

  'qnn-architecture': [
    {
      id: 'q-qml-kp16-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In a quantum neural network (QNN), what plays the role of "layers" in a classical neural network?',
      options: [
        'Individual qubit measurements',
        'Blocks of parameterized quantum gates (unitaries)',
        'Classical bias vectors',
        'Ancilla qubit registers',
      ],
      correctAnswer: 1,
      explanation: 'QNN layers consist of blocks of parameterized unitary gates (e.g., rotation gates and entangling gates) that transform the quantum state, analogous to weight matrices and activation functions in classical networks.',
      hints: [
        'In classical NNs, layers apply learnable transformations; in QNNs, the transformations must be unitary.',
        'Each block typically combines single-qubit rotations (parameters) and fixed entangling gates (structure).',
      ],
    },
    {
      id: 'q-qml-kp16-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum neural networks are unitary transformations and therefore cannot introduce non-linearity the same way classical activation functions do.',
      correctAnswer: 'true',
      explanation: 'All quantum gates are unitary (linear) transformations; non-linearity in QNNs must come from measurement and re-encoding steps, unlike classical networks where activation functions like ReLU directly introduce non-linearity.',
      hints: [
        'Unitary transformations are linear — they cannot "fold" the state space the way a sigmoid or ReLU does.',
        'Measurement is the only inherently non-linear operation in quantum mechanics.',
      ],
    },
    {
      id: 'q-qml-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In a dissipative QNN (DQNN), what mechanism replaces ancilla qubits to enable non-unitary learning dynamics?',
      options: [
        'Repeated Hadamard gates',
        'Tracing out (discarding) ancilla qubits after each layer',
        'Classical batch normalization applied between layers',
        'Grover amplitude amplification after each layer',
      ],
      correctAnswer: 1,
      explanation: 'DQNNs reset or trace out ancilla qubits between layers, inducing a non-unitary, dissipative map analogous to a quantum channel, allowing the network to implement non-unitary transformations and potentially improve trainability.',
      hints: [
        'Once you discard a subsystem (trace it out), the remaining state evolves non-unitarily — this is the key to dissipation.',
        'Quantum channels (completely positive trace-preserving maps) generalize unitary evolution and describe open quantum systems.',
      ],
    },
  ],

  'quantum-cnn': [
    {
      id: 'q-qml-kp17-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Quantum Convolutional Neural Networks (QCNNs) achieve logarithmic circuit depth by using which structural feature?',
      options: [
        'Dense all-to-all connectivity',
        'Alternating convolutional and pooling layers that halve the qubit count each round',
        'Amplitude amplification at each layer',
        'Classical max-pooling operations',
      ],
      correctAnswer: 1,
      explanation: 'QCNNs alternate parameterized convolutional unitaries (acting on neighboring qubits) with pooling operations (measuring and discarding half the qubits), reducing the active qubit count by half per layer for O(log n) total depth.',
      hints: [
        'Classical CNNs use pooling to reduce spatial dimensions — QCNNs do something analogous with qubits.',
        'Reducing the number of active qubits by half each layer gives a logarithmic number of layers for n qubits.',
      ],
    },
    {
      id: 'q-qml-kp17-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'QCNNs have been shown to be free from barren plateaus due to their hierarchical local structure.',
      correctAnswer: 'true',
      explanation: 'Pesah et al. (2021) proved that QCNNs with local cost functions and hierarchical pooling avoid barren plateaus, with gradients that vanish at most polynomially (not exponentially) with system size.',
      hints: [
        'Barren plateaus arise in globally deep circuits — local, hierarchical structure limits how "random" the circuit looks.',
        'The QCNN\'s locality means each gate only sees a small patch of qubits, preventing the global randomization that causes barren plateaus.',
      ],
    },
    {
      id: 'q-qml-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In a QCNN, the "pooling" operation is most analogous to which quantum information operation?',
      options: [
        'Quantum teleportation',
        'Partial trace (tracing out measured qubits)',
        'Quantum error correction syndrome measurement',
        'Unitary dilation',
      ],
      correctAnswer: 1,
      explanation: 'QCNN pooling measures a subset of qubits and uses the measurement outcomes to conditionally rotate remaining qubits, effectively performing a partial trace that reduces the active Hilbert space dimension.',
      hints: [
        'After measuring and discarding qubits, the reduced state lives in a smaller Hilbert space — this is the definition of a partial trace.',
        'The conditioned rotations on unmeasured qubits allow classical information from the measurement to influence the remaining quantum state.',
      ],
    },
  ],

  'quantum-rnn': [
    {
      id: 'q-qml-kp18-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In a Quantum Recurrent Neural Network (QRNN), how is temporal information carried between time steps?',
      options: [
        'Classical hidden state vectors',
        'A quantum memory register whose state is passed to the next time step',
        'Repeated Grover search over the sequence',
        'Fourier encoding of the full sequence at once',
      ],
      correctAnswer: 1,
      explanation: 'QRNNs maintain a quantum memory (hidden state) register that is updated at each time step by a parameterized unitary jointly acting on the memory and new input, analogous to the hidden state in classical RNNs.',
      hints: [
        'Classical RNNs pass a hidden vector between steps — the quantum analogue passes a quantum state.',
        'The quantum memory register holds the "context" accumulated from previous inputs as a quantum state.',
      ],
    },
    {
      id: 'q-qml-kp18-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum RNNs can perfectly memorize arbitrarily long sequences due to the unitary nature of quantum evolution, which prevents information loss.',
      correctAnswer: 'false',
      explanation: 'While unitarity is reversible (no information is destroyed), the memory register has a finite Hilbert space dimension; with finite qubits, the QRNN can only represent limited context, and practical noise causes decoherence-induced forgetting.',
      hints: [
        'Unitarity means no information is lost in closed quantum systems, but finite qubit count limits the memory capacity.',
        'Real quantum hardware introduces noise and decoherence, which effectively causes information loss even in nominally unitary circuits.',
      ],
    },
    {
      id: 'q-qml-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the primary challenge in training QRNNs with gradient-based methods on long sequences?',
      options: [
        'The quantum state cannot be backpropagated',
        'Barren plateaus and vanishing gradients exacerbated by long circuit depth over time steps',
        'The hidden state must be measured at every step, collapsing it',
        'Quantum gates cannot be parameterized for recurrent use',
      ],
      correctAnswer: 1,
      explanation: 'Long sequences require deep circuits (many time steps), severely exacerbating barren plateau effects; additionally, long-range gradient flow through many unitary layers suffers from vanishing gradients analogous to classical RNN training challenges.',
      hints: [
        'Each time step adds circuit depth — think about what happens to gradients in very deep parameterized quantum circuits.',
        'The combination of depth and global entanglement across many steps pushes the circuit toward the barren plateau regime.',
      ],
    },
  ],

  'quantum-transfer-learning': [
    {
      id: 'q-qml-kp19-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In quantum transfer learning, a pre-trained classical model is combined with a quantum circuit. Where is the quantum circuit typically inserted?',
      options: [
        'Before the classical input layer',
        'As a replacement for the classical loss function',
        'After a classical feature extractor, as a trainable quantum classifier',
        'Inside the classical optimizer',
      ],
      correctAnswer: 2,
      explanation: 'In quantum transfer learning (Mari et al. 2020), a frozen or fine-tuned classical pre-trained network (e.g., ResNet) extracts features, which are then encoded and processed by a small trainable quantum circuit acting as the final classifier.',
      hints: [
        'Pre-trained classical networks are great feature extractors; the quantum part handles the final decision boundary.',
        'This architecture requires far fewer qubits since only the classification head is quantum.',
      ],
    },
    {
      id: 'q-qml-kp19-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum transfer learning allows quantum circuits to benefit from the vast amount of pre-training done on classical hardware without retraining from scratch.',
      correctAnswer: 'true',
      explanation: 'By freezing the classical backbone and only training the quantum head, quantum transfer learning leverages classical pre-training (ImageNet, etc.) while requiring only a small quantum circuit to be optimized.',
      hints: [
        'This mirrors classical transfer learning where only the final layers are fine-tuned on a new task.',
        'Training the full classical network on quantum hardware would be impractical — freezing it solves this.',
      ],
    },
    {
      id: 'q-qml-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the primary bottleneck when encoding classical neural network feature vectors into a quantum state for quantum transfer learning?',
      options: [
        'The feature vector must be integer-valued',
        'State preparation of arbitrary high-dimensional classical vectors can require exponentially deep circuits',
        'Quantum circuits cannot process continuous-valued features',
        'The quantum circuit must be re-trained for each new input',
      ],
      correctAnswer: 1,
      explanation: 'Encoding an arbitrary d-dimensional classical vector into d qubits via amplitude encoding generally requires a state preparation circuit of O(2^d) depth in the worst case, partially offsetting the benefit of the quantum classifier.',
      hints: [
        'Think about the cost of amplitude encoding — storing 2ⁿ amplitudes in n qubits requires preparing those amplitudes somehow.',
        'Efficient state preparation is an open research problem; naive approaches are exponentially expensive.',
      ],
    },
  ],

  'hybrid-classical-quantum': [
    {
      id: 'q-qml-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a hybrid classical-quantum architecture, what is the primary role of the quantum component?',
      options: [
        'Running the classical optimizer',
        'Storing the training dataset',
        'Evaluating parameterized quantum circuits to compute expectation values or kernel entries',
        'Performing data preprocessing and normalization',
      ],
      correctAnswer: 2,
      explanation: 'In hybrid architectures, the quantum processor evaluates parameterized circuits (e.g., for expectation values, kernel matrices, or quantum sampling), while the classical processor handles optimization, data management, and post-processing.',
      hints: [
        'Quantum devices are best used for tasks that benefit from quantum superposition and interference.',
        'The classical optimizer cannot run on quantum hardware directly — it handles the feedback loop.',
      ],
    },
    {
      id: 'q-qml-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Hybrid architectures are motivated in part by the limited qubit counts and coherence times of current NISQ devices, which cannot run fully quantum algorithms.',
      correctAnswer: 'true',
      explanation: 'Hybrid architectures offload the parts of a computation that require long coherence times or many qubits to classical hardware, making algorithms feasible on current NISQ devices with limited qubits and short decoherence times.',
      hints: [
        'Think about what limits a purely quantum approach on today\'s hardware — qubit count and coherence time are the main bottlenecks.',
        'NISQ devices cannot implement full fault-tolerant quantum algorithms, so hybrid approaches bridge the gap.',
      ],
    },
    {
      id: 'q-qml-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In a hybrid quantum-classical neural network, gradients of quantum circuit outputs with respect to parameters are computed using:',
      options: [
        'Classical automatic differentiation (autograd) only',
        'Finite differences applied to shot-based measurements',
        'The parameter-shift rule, enabling exact gradients from quantum hardware',
        'Symbolic differentiation of the circuit unitary matrix',
      ],
      correctAnswer: 2,
      explanation: 'The parameter-shift rule computes exact analytical gradients by evaluating the circuit at θ ± π/2, and is compatible with shot-based (sampling) quantum hardware, making it the standard gradient method in hybrid QML frameworks like PennyLane.',
      hints: [
        'Classical autograd works on classical computations; you need a rule specifically designed for quantum circuit outputs.',
        'The parameter-shift rule was designed to work directly with hardware measurements, not just simulations.',
      ],
    },
  ],

  'qgan': [
    {
      id: 'q-qml-kp21-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In a quantum GAN (qGAN), the quantum generator produces:',
      options: [
        'Classical images stored in classical memory',
        'A quantum state whose measurement samples approximate the target data distribution',
        'Classical gradients for the discriminator',
        'A quantum error correction code',
      ],
      correctAnswer: 1,
      explanation: 'The qGAN generator is a parameterized quantum circuit that prepares a quantum state; measuring this state samples from the generator distribution, which is trained to match the target (real) data distribution.',
      hints: [
        'Quantum circuits produce quantum states; data is obtained by measuring — what does each measurement give you?',
        'The generator learns to produce a quantum state whose Born-rule measurement distribution matches the training data.',
      ],
    },
    {
      id: 'q-qml-kp21-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum GANs (qGANs) are fundamentally different from classical GANs because they use quantum circuits instead of classical neural networks.',
      correctAnswer: 'false',
      explanation: 'Quantum GANs (qGANs) use classical discriminators while the generator is quantum, or they use quantum circuits for both but with different purposes. The key is that the discriminator is not quantum.',
      hints: [
        'The discriminator in a qGAN is typically a classical neural network.',
        'The generator in a qGAN is a quantum circuit.',
      ],
    },
    {
      id: 'q-qml-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Training qGANs faces a specific challenge related to the number of measurements needed. What is this challenge called?',
      options: [
        'Mode collapse',
        'Shot noise limiting gradient estimates, exacerbated by the quantum measurement postulate',
        'Gradient explosion from unitary gates',
        'Overfitting due to quantum memory',
      ],
      correctAnswer: 1,
      explanation: 'Because quantum measurements are stochastic (shot noise), gradient estimates for qGAN training have high variance; many measurement shots are needed per gradient estimate, and this cost combines multiplicatively with the number of parameters.',
      hints: [
        'Every time you measure a quantum circuit you get one sample — estimating expectations requires averaging many shots.',
        'High variance in gradient estimates (from finite shots) is a fundamental challenge distinct from classical GAN training.',
      ],
    },
  ],

  'quantum-boltzmann': [
    {
      id: 'q-qml-kp22-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A Quantum Boltzmann Machine (QBM) is the quantum analogue of a classical RBM. What replaces the classical energy function in a QBM?',
      options: [
        'A classical Hamiltonian',
        'A quantum Hamiltonian with both diagonal (classical) and off-diagonal (transverse field) terms',
        'A unitary matrix acting on the visible units',
        'A classical neural network energy estimator',
      ],
      correctAnswer: 1,
      explanation: 'The QBM replaces the classical energy E(v,h) with a quantum Hamiltonian H that includes transverse-field (off-diagonal Pauli-X) terms, allowing the model to represent quantum thermal distributions and capture non-classical correlations.',
      hints: [
        'Classical Boltzmann machines use diagonal (Z) interactions; quantum extension adds off-diagonal (X) terms.',
        'The transverse field introduces quantum fluctuations analogous to quantum tunneling in quantum annealing.',
      ],
    },
    {
      id: 'q-qml-kp22-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum Boltzmann Machines sample from a thermal (Gibbs) distribution defined by a quantum Hamiltonian.',
      correctAnswer: 'true',
      explanation: 'The QBM\'s generative model is the quantum Gibbs state ρ ∝ exp(−βH), where β is inverse temperature; learning adjusts the Hamiltonian parameters so that marginals of ρ match the training data distribution.',
      hints: [
        'Classical RBMs use Gibbs/Boltzmann distributions; QBMs extend this to quantum Hamiltonians.',
        'The quantum Gibbs state is the density matrix that minimizes free energy for a given quantum Hamiltonian and temperature.',
      ],
    },
    {
      id: 'q-qml-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the main practical obstacle to training Quantum Boltzmann Machines on quantum hardware?',
      options: [
        'QBMs cannot represent probability distributions',
        'Computing the quantum Gibbs state and its gradients requires quantum thermalization, which is hard to implement efficiently',
        'Quantum hardware cannot represent binary variables',
        'QBMs require more parameters than classical RBMs',
      ],
      correctAnswer: 1,
      explanation: 'Computing the quantum Gibbs state exp(−βH)/Z and its gradient requires quantum phase estimation or quantum simulation of thermalization, both of which are resource-intensive on NISQ hardware and remain an open engineering challenge.',
      hints: [
        'Preparing a thermal state is much harder than preparing a pure state — it requires simulating a system at finite temperature.',
        'Unlike VQE which prepares a variational pure state, preparing the Gibbs density matrix requires access to a thermal bath or expensive simulation.',
      ],
    },
  ],

  'quantum-sampling': [
    {
      id: 'q-qml-kp23-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Born Machines are generative models that produce samples by measuring a parameterized quantum state. What probability distribution do they sample from?',
      options: [
        'Uniform distribution over bit strings',
        'The Born rule distribution |⟨x|ψ(θ)⟩|² for each bit string x',
        'A classical Boltzmann distribution',
        'A Gaussian distribution over qubit angles',
      ],
      correctAnswer: 1,
      explanation: 'Born Machines learn a parameterized quantum state |ψ(θ)⟩ such that the Born rule probabilities p(x) = |⟨x|ψ(θ)⟩|² match the target data distribution, using the quantum circuit as an implicit generative model.',
      hints: [
        'Measuring a quantum state in the computational basis gives each outcome with probability determined by the Born rule.',
        'The generative model is the quantum circuit itself; data generation is a single computational-basis measurement.',
      ],
    },
    {
      id: 'q-qml-kp23-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum sampling (e.g., boson sampling) has been proposed as a near-term demonstration of quantum computational advantage over classical computers.',
      correctAnswer: 'true',
      explanation: 'Boson sampling and random circuit sampling (Google\'s 2019 Sycamore experiment) are designed specifically to be hard for classical computers to simulate, offering a route to demonstrate quantum computational advantage without requiring error correction.',
      hints: [
        'Boson sampling involves sampling from the output distribution of a linear optical network — classically hard due to permanent computation.',
        'Random circuit sampling was Google\'s experimental approach to demonstrating quantum supremacy.',
      ],
    },
    {
      id: 'q-qml-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Training a Born Machine to match a target distribution p_data typically requires minimizing which divergence, since log-likelihood is expensive to compute directly?',
      options: [
        'L2 distance between probability vectors',
        'Maximum Mean Discrepancy (MMD) using quantum kernels',
        'Kullback-Leibler divergence computed via exact simulation',
        'Cross-entropy with one-hot labels',
      ],
      correctAnswer: 1,
      explanation: 'Because computing exact log-likelihoods requires summing over 2ⁿ outcomes, Born Machines are typically trained using Maximum Mean Discrepancy (MMD) with a kernel, which can be estimated from finite samples and quantum kernel evaluations.',
      hints: [
        'Exact log-likelihood requires knowing p(x) for all x — exponentially expensive for n qubits.',
        'MMD only requires samples from both distributions and a kernel function, making it tractable for training.',
      ],
    },
  ],

  'quantum-autoencoders': [
    {
      id: 'q-qml-kp24-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A quantum autoencoder compresses an n-qubit input state into k < n qubits (the "latent space"). What does the remaining n−k qubits (trash qubits) ideally become?',
      options: [
        'Maximally entangled with the latent qubits',
        'A fixed reference state (e.g., |0...0⟩)',
        'A copy of the input state',
        'A random mixed state',
      ],
      correctAnswer: 1,
      explanation: 'In a perfect quantum autoencoder, the encoder unitary disentangles the trash qubits from the latent register, leaving the trash qubits in a fixed product state |0...0⟩, so that resetting them enables lossless decoding.',
      hints: [
        'If the trash qubits contain no information about the input, they must be in a state independent of the input — what is the simplest such state?',
        'The training objective maximizes the fidelity of the trash qubits with |0...0⟩, equivalent to maximizing compression quality.',
      ],
    },
    {
      id: 'q-qml-kp24-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'A quantum autoencoder can compress quantum states that have no efficient classical description.',
      correctAnswer: 'true',
      explanation: 'Unlike classical autoencoders that process classically-describable data, quantum autoencoders can compress highly entangled quantum states that would require exponentially many classical parameters to specify, making them useful for quantum data compression.',
      hints: [
        'The input to a quantum autoencoder is a quantum state, not a classical vector — such states can be exponentially complex classically.',
        'Quantum states of n qubits live in a 2ⁿ-dimensional Hilbert space; quantum autoencoders work directly in this space.',
      ],
    },
    {
      id: 'q-qml-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The training loss for a quantum autoencoder is typically defined as:',
      options: [
        'The von Neumann entropy of the input state',
        '1 − F, where F is the fidelity between the reconstructed output and the original input state',
        'The L2 distance between input and output measurement histograms',
        'The KL divergence between the latent state and a Gaussian prior',
      ],
      correctAnswer: 1,
      explanation: 'The quantum autoencoder is trained to maximize state fidelity F = |⟨ψ_in|ψ_out⟩|², equivalently minimizing 1−F; this is estimated using the SWAP test or by measuring the trash qubits in the |0⟩ state.',
      hints: [
        'Fidelity measures how close two quantum states are — perfect compression gives fidelity 1 between input and reconstructed output.',
        'Minimizing 1−F is equivalent to maximizing the overlap between input and output, which is the standard reconstruction objective.',
      ],
    },
  ],

  'quantum-diffusion': [
    {
      id: 'q-qml-kp25-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Quantum-inspired diffusion models borrow which key idea from quantum mechanics to improve classical generative modeling?',
      options: [
        'Entanglement between data points',
        'Superposition of noise schedules or interference-based score estimation',
        'Qubit-based data storage',
        'Quantum error correction for stable training',
      ],
      correctAnswer: 1,
      explanation: 'Quantum-inspired diffusion models incorporate quantum concepts such as superposition of multiple noise levels or interference patterns in score estimation to improve flexibility and expressiveness beyond classical Gaussian diffusion.',
      hints: [
        'Classical diffusion uses Gaussian noise; quantum inspiration often means mixing or superposing multiple processes.',
        'The "quantum-inspired" label usually means adapting quantum mathematical structures (not actual quantum hardware) to classical algorithms.',
      ],
    },
    {
      id: 'q-qml-kp25-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum-inspired diffusion models require actual quantum hardware to run.',
      correctAnswer: 'false',
      explanation: 'Quantum-inspired models are classical algorithms that borrow mathematical structures from quantum mechanics (e.g., density matrices, interference); they run on classical computers and do not require quantum hardware.',
      hints: [
        'The "inspired" qualifier is key — these are classical algorithms informed by quantum mathematics.',
        'Models like tensor networks and quantum-inspired sampling algorithms run efficiently on classical hardware.',
      ],
    },
    {
      id: 'q-qml-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which quantum mathematical object is commonly used in quantum-inspired generative models to represent mixed or probabilistic states over classical data?',
      options: [
        'Unitary matrices',
        'Density matrices (positive semidefinite, unit-trace operators)',
        'Pauli operators',
        'Bell inequalities',
      ],
      correctAnswer: 1,
      explanation: 'Density matrices, which are positive semidefinite and trace-one operators, can represent probability distributions over classical data as diagonal entries, and their off-diagonal elements capture quantum coherence; quantum-inspired models use this formalism classically.',
      hints: [
        'A diagonal density matrix in the computational basis is equivalent to a classical probability distribution.',
        'Off-diagonal elements of density matrices represent quantum coherence — quantum-inspired models exploit this richer structure.',
      ],
    },
  ],

  'pennylane': [
    {
      id: 'q-qml-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'PennyLane is a quantum ML framework. Which classical ML library does it integrate with to enable automatic differentiation of quantum circuits?',
      options: ['Scikit-learn', 'PyTorch and JAX (among others)', 'OpenCV', 'XGBoost'],
      correctAnswer: 1,
      explanation: 'PennyLane integrates with PyTorch, TensorFlow, and JAX via its device interface, allowing quantum circuit gradients (via the parameter-shift rule) to flow through hybrid classical-quantum computation graphs using standard ML autograd frameworks.',
      hints: [
        'PennyLane is designed for differentiable quantum programming — it needs to connect to frameworks that support automatic differentiation.',
        'The key selling point of PennyLane is that quantum circuits behave like differentiable layers in classical ML frameworks.',
      ],
    },
    {
      id: 'q-qml-kp26-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In PennyLane, a QNode wraps a quantum function and makes it differentiable with respect to its parameters using the parameter-shift rule by default.',
      correctAnswer: 'true',
      explanation: 'A PennyLane QNode decorates a Python function defining a quantum circuit and attaches a differentiation method (default: parameter-shift) so that gradients can be computed and integrated with classical optimizers.',
      hints: [
        'QNode is the central abstraction in PennyLane — it bridges quantum circuits and classical differentiation.',
        'The @qml.qnode decorator turns a function into a differentiable quantum node in the computation graph.',
      ],
    },
    {
      id: 'q-qml-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'PennyLane\'s "device" abstraction allows the same circuit code to run on different backends. Which of the following is NOT a valid PennyLane device?',
      options: [
        'default.qubit (statevector simulator)',
        'qiskit.ibmq (IBM Quantum hardware)',
        'tensorflow.gpu (GPU tensor operations only)',
        'lightning.gpu (cuQuantum GPU simulator)',
      ],
      correctAnswer: 2,
      explanation: 'tensorflow.gpu is not a PennyLane device; PennyLane devices are quantum simulators or hardware backends. TensorFlow is used as a classical deep learning framework, not as a quantum device, in PennyLane.',
      hints: [
        'PennyLane devices are quantum backends (simulators or real QPUs) — not classical ML frameworks.',
        'Think about which option is a classical deep learning framework rather than a quantum computing backend.',
      ],
    },
  ],

  'qiskit-ml': [
    {
      id: 'q-qml-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Qiskit Machine Learning provides which of the following for building quantum classifiers?',
      options: [
        'Only classical SVM implementations',
        'Quantum Neural Networks (EstimatorQNN, SamplerQNN) and QSVCs',
        'Pre-trained large language models',
        'Quantum error correction decoders',
      ],
      correctAnswer: 1,
      explanation: 'Qiskit Machine Learning provides EstimatorQNN and SamplerQNN for building quantum neural networks, and QSVC (Quantum Support Vector Classifier) using quantum kernels, all compatible with scikit-learn\'s API.',
      hints: [
        'Qiskit ML\'s main offerings are quantum analogues of classical ML building blocks.',
        'The scikit-learn compatibility means quantum classifiers can be used with familiar fit/predict interfaces.',
      ],
    },
    {
      id: 'q-qml-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Qiskit Machine Learning\'s QSVC class implements a quantum kernel SVM that is compatible with scikit-learn\'s SVC interface.',
      correctAnswer: 'true',
      explanation: 'QSVC wraps a quantum kernel (computed via quantum circuits) into scikit-learn\'s SVC, allowing it to be used with scikit-learn pipelines, cross-validation, and grid search just like any classical SVM.',
      hints: [
        'The "Q" in QSVC stands for quantum — it computes the kernel matrix using quantum circuits.',
        'scikit-learn compatibility means you can drop QSVC into existing ML workflows with minimal code changes.',
      ],
    },
    {
      id: 'q-qml-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In Qiskit\'s Estimator primitive (used in EstimatorQNN), what does the Estimator compute from a quantum circuit?',
      options: [
        'The full statevector of the circuit',
        'Expectation values of observables with respect to the circuit output state',
        'The circuit\'s unitary matrix explicitly',
        'Samples from the measurement distribution',
      ],
      correctAnswer: 1,
      explanation: 'The Estimator primitive computes ⟨ψ|O|ψ⟩ for a given observable O and circuit output state |ψ⟩, using either exact simulation or hardware shots with error mitigation; this is the building block for QNN forward passes.',
      hints: [
        'Estimator vs Sampler: one gives expectation values of observables, the other gives measurement outcome probabilities.',
        'Expectation values are real numbers that can be used directly as QNN outputs for regression or classification.',
      ],
    },
  ],

  'quantum-chemistry': [
    {
      id: 'q-qml-kp28-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Quantum computers are well-suited for quantum chemistry because simulating molecular Hamiltonians on classical computers scales as:',
      options: ['O(N log N) with N electrons', 'O(N³)', 'Exponentially with system size', 'O(1)'],
      correctAnswer: 2,
      explanation: 'Exact classical simulation of N-electron molecular systems requires representing a Hilbert space of dimension 2^N (exponential), making it intractable for large molecules; quantum computers can represent this space efficiently using N qubits.',
      hints: [
        'Think about how many basis states are needed to describe N electrons, each of which can be in spin-up or spin-down.',
        'This exponential classical scaling is the central motivation for quantum chemistry on quantum computers.',
      ],
    },
    {
      id: 'q-qml-kp28-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The Jordan-Wigner transformation is used to map fermionic operators (electron creation/annihilation) to qubit operators (Pauli matrices).',
      correctAnswer: 'true',
      explanation: 'The Jordan-Wigner transformation maps fermionic creation/annihilation operators to strings of Pauli operators, enabling molecular Hamiltonians expressed in second quantization to be implemented on qubit-based quantum computers.',
      hints: [
        'Electrons are fermions obeying anti-commutation relations; qubits obey spin algebra — a mapping between them is needed.',
        'Jordan-Wigner (and Bravyi-Kitaev) are the standard transformations for converting chemistry Hamiltonians to qubit form.',
      ],
    },
    {
      id: 'q-qml-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In quantum drug discovery pipelines, quantum computers are used to estimate which molecular property that determines binding affinity?',
      options: [
        'Molecular weight',
        'Ground state electronic energy and electronic structure',
        'Boiling point',
        'Protein sequence length',
      ],
      correctAnswer: 1,
      explanation: 'Drug binding affinity depends on the electronic structure (ground state energy, orbital interactions) of the drug-target complex; quantum computers can calculate these energies more accurately than classical approximations for complex molecules.',
      hints: [
        'Drug-target interactions are fundamentally quantum mechanical — electron orbital overlap determines binding strength.',
        'VQE and quantum phase estimation are the main quantum algorithms proposed for computing electronic energies in drug discovery.',
      ],
    },
  ],

  'quantum-optimization': [
    {
      id: 'q-qml-kp29-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Quantum annealing finds the ground state of an Ising Hamiltonian by starting in the ground state of a transverse field and slowly changing to the problem Hamiltonian. What quantum phenomenon enables this?',
      options: [
        'Quantum error correction',
        'Adiabatic theorem',
        'Quantum teleportation',
        'Grover\'s amplitude amplification',
      ],
      correctAnswer: 1,
      explanation: 'The adiabatic theorem guarantees that a quantum system remains in its ground state if the Hamiltonian changes slowly enough; quantum annealing exploits this to evolve from an easy initial ground state to the hard problem ground state.',
      hints: [
        'The adiabatic theorem relates the rate of change of a Hamiltonian to whether the system stays in its ground state.',
        'D-Wave quantum annealers implement this principle using superconducting flux qubits.',
      ],
    },
    {
      id: 'q-qml-kp29-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The Traveling Salesman Problem (TSP) and portfolio optimization can both be formulated as Quadratic Unconstrained Binary Optimization (QUBO) problems for quantum solvers.',
      correctAnswer: 'true',
      explanation: 'Many combinatorial optimization problems, including TSP, max-cut, portfolio optimization, and vehicle routing, can be reformulated as QUBO problems, which are directly solvable by quantum annealers (D-Wave) or approximated by QAOA.',
      hints: [
        'QUBO is a canonical form for combinatorial optimization problems that maps naturally to the Ising Hamiltonian.',
        'The ability to recast diverse problems as QUBO/Ising is what makes quantum annealing broadly applicable.',
      ],
    },
    {
      id: 'q-qml-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'For a QUBO problem with n binary variables, an Ising Hamiltonian is formulated with spins s_i ∈ {±1}. The number of two-body (J_ij) coupling terms is at most:',
      options: ['n', 'n log n', 'n(n−1)/2', '2ⁿ'],
      correctAnswer: 2,
      explanation: 'An Ising Hamiltonian H = −Σ_ij J_ij s_i s_j − Σ_i h_i s_i has at most n(n−1)/2 distinct two-body couplings (one for each pair of spins), which determines the hardware connectivity requirements for quantum annealers.',
      hints: [
        'Count the number of pairs from n spins: this is a combination problem.',
        'Dense QUBO problems require all-to-all connectivity, which is hard to achieve physically on current quantum annealers.',
      ],
    },
  ],

  'quantum-error-mitigation': [
    {
      id: 'q-qml-kp30-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Zero-Noise Extrapolation (ZNE) is an error mitigation technique that estimates the noiseless expectation value by:',
      options: [
        'Applying quantum error correction codes',
        'Running the circuit at multiple noise levels and extrapolating to zero noise',
        'Averaging over random compilations of the circuit',
        'Adding ancilla qubits to detect errors',
      ],
      correctAnswer: 1,
      explanation: 'ZNE intentionally boosts the noise level (e.g., by stretching gate durations or folding circuits) to create multiple data points, then fits a model to extrapolate the expectation value to the zero-noise limit.',
      hints: [
        'If you can measure at several noise levels, you can fit a curve and read off the y-intercept at zero noise.',
        'Noise boosting techniques include gate folding (repeating U†U pairs) or pulse stretching on hardware.',
      ],
    },
    {
      id: 'q-qml-kp30-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Quantum error mitigation techniques eliminate quantum errors completely, equivalent to full quantum error correction.',
      correctAnswer: 'false',
      explanation: 'Error mitigation reduces the bias in expectation value estimates but increases the statistical variance (sampling overhead); it does not eliminate errors or protect quantum information during computation, unlike full quantum error correction.',
      hints: [
        'Mitigation is a post-processing statistical technique; error correction is a physical mechanism that detects and corrects errors in real time.',
        'The overhead of mitigation grows with circuit depth, and mitigation cannot make arbitrarily deep circuits reliable.',
      ],
    },
    {
      id: 'q-qml-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Probabilistic Error Cancellation (PEC) mitigates noise by decomposing the ideal (noiseless) circuit into a quasi-probability sum over noisy circuits. What is the main cost of PEC?',
      options: [
        'Requires knowledge of all future gate operations',
        'Exponential sampling overhead (1/γ²)ⁿ where γ is the noise parameter and n is circuit depth',
        'Cannot be used with multi-qubit gates',
        'Requires perfect state preparation',
      ],
      correctAnswer: 1,
      explanation: 'PEC has sampling overhead that scales exponentially with circuit depth: the number of samples needed grows as (1/γ²)ⁿ, where γ is related to the gate error rate, making it practical only for shallow circuits on near-term hardware.',
      hints: [
        'Each noisy gate in PEC introduces a factor of overhead — these multiply across the circuit depth.',
        'The exponential overhead is the fundamental reason error mitigation cannot scale to arbitrary depths without error correction.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
