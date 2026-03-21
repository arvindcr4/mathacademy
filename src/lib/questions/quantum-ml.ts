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
        "Let's recall the action of H on computational basis states:\n\\[\nH|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = |+\\rangle, \\qquad H|1\\rangle = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |-\\rangle.\n\\]\nWriting |0\\rangle as the column vector \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, we compute:\n\\[\nH|0\\rangle = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}.\n\\]\nThe result |+\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} is an equal superposition with phase 0.",
      hints: [
        "Write out H as a 2\\times2 matrix and multiply by the column vector [1, 0]\\^T representing |0⟩.",
        "H maps |0⟩ \\to |+⟩ and |1⟩ \\to |−⟩ = (|0⟩ − |1⟩)/√2.",
      ],
    },
    {
      id: "q-qml-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Pauli-Z gate acting on a general qubit \\alpha|0⟩ + \\beta|1⟩ produces ___.",
      options: ["\\beta|0⟩ + \\alpha|1⟩", "\\alpha|0⟩ − \\beta|1⟩", "−\\alpha|0⟩ + \\beta|1⟩", "\\alpha|0⟩ + \\beta|1⟩"],
      correctAnswer: 1,
      explanation:
        "The Pauli-Z matrix is Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}.  Applying it to a general qubit state \\alpha|0\\rangle + \\beta|1\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}:\n\\[\nZ\\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} = \\begin{pmatrix} \\alpha \\\\ -\\beta \\end{pmatrix} = \\alpha|0\\rangle - \\beta|1\\rangle.\n\\]\nGeometrically, Z is a \\pi rotation around the Z-axis; it leaves |0\\rangle unchanged while flipping the phase of the |1\\rangle amplitude.",
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
        "The S gate (phase gate) has matrix S = [[1,0],[0,i]]. What is S\\^2 equal to?",
      options: ["Identity I", "Pauli-X", "Pauli-Z", "Hadamard H"],
      correctAnswer: 2,
      explanation:
        "The S gate is diagonal: S = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix} = \\operatorname{diag}(1, i).  Squaring a diagonal matrix squares each diagonal entry:\n\\[\nS^2 = \\operatorname{diag}(1^2, i^2) = \\operatorname{diag}(1, -1) = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} = Z.\n\\]\nApplying the phase gate twice gives a total phase shift of \\pi (since i \cdot i = -1), which is exactly the Pauli-Z operation.",
      hints: [
        "S = diag(1, i). Squaring a diagonal matrix just squares the diagonal entries: S\\^2 = diag(1\\^2, i\\^2) = diag(1, −1).",
        "Compare S\\^2 = diag(1,−1) with the Pauli-Z matrix diag(1,−1). They are the same.",
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
        "Step 1 — Apply H to qubit 1 (initially |0\\rangle):\n\\[\nH|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = |+\\rangle.\n\\]\nThe two-qubit state is |+\\rangle \\otimes |0\\rangle = \\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}}.\n\nStep 2 — Apply CNOT with qubit 1 as control and qubit 2 as target.  CNOT flips the target iff the control is |1\\rangle:\n\\[\n|00\\rangle \\to |00\\rangle, \\qquad |10\\rangle \\to |11\\rangle.\n\\]\nThe final state is therefore \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}, the Bell state |\\Phi^+\\rangle.",
      hints: [
        "Expand |+⟩|0⟩ = (|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩+|10⟩)/√2, then apply CNOT to each term.",
        "CNOT: |00⟩\\to|00⟩, |01⟩\\to|01⟩, |10⟩\\to|11⟩, |11⟩\\to|10⟩.",
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
        "Gates acting on disjoint (non-overlapping) qubits commute and can be executed simultaneously on most quantum hardware.  This parallelism is explicitly used to minimise circuit depth — the critical metric for hardware where decoherence limits how many sequential operations can be performed.  Only gates that share a qubit must respect their ordering.",
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
        "In the computational basis \\{|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle\\}, CNOT is defined by which target state results from each two-qubit input:\n\n  - |00\\rangle \\to |00\\rangle  (control = 0, no flip)\n  - |01\\rangle \\to |01\\rangle  (control = 0, no flip)\n  - |10\\rangle \\to |11\\rangle  (control = 1, flip)\n  - |11\\rangle \\to |10\\rangle  (control = 1, flip)\n\nColumns of the matrix are the output vectors for each input basis state.  The third and fourth columns of the identity are swapped, giving:\n\\[\n\\begin{pmatrix} 1&0&0&0 \\\\ 0&1&0&0 \\\\ 0&0&0&1 \\\\ 0&0&1&0 \\end{pmatrix}.\n\\]",
      hints: [
        "CNOT leaves |00⟩ and |01⟩ unchanged (control is |0⟩), and flips the target when control is |1⟩: |10⟩\\leftrightarrow|11⟩.",
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
        "Bell states are the four maximally entangled two-qubit states:\n\\[\n|\\Phi^\\pm\\rangle = \\frac{|00\\rangle \\pm |11\\rangle}{\\sqrt{2}}, \\qquad |\\Psi^\\pm\\rangle = \\frac{|01\\rangle \\pm |10\\rangle}{\\sqrt{2}}.\n\\]\nOption (|00\rangle + |11\rangle)/\sqrt{2} is exactly |\Phi^+\rangle, a Bell state.  All other options are either unentangled (|00\rangle, |01\rangle - |10\rangle) or single-qubit superpositions (|0\rangle + |1\rangle)/\sqrt{2}.",
      hints: [
        "A Bell state involves two qubits that are entangled - it cannot be factored into individual qubit states.",
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
        "Entanglement creates non-local correlations — measuring one qubit instantly fixes the other — but this cannot convey information because each party cannot control or predict their individual outcome.  The no-communication theorem proves that without a classical side-channel, no signal can be sent; the statistical correlations alone are insufficient.",
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
        "Quantum teleportation works in three steps: (1) Bell measurement on the input qubit and the sender's half of the entangled pair; (2) classical transmission of two measurement bits; (3) unitary correction on the receiver's qubit.  The entanglement provides the non-local correlations, but the classical bits are essential — without them the protocol conveys no quantum state.",
      hints: [
        "Teleportation always requires a classical side-channel - think about what that channel carries and why it is necessary.",
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
      options: ["O(log N)", "O(N)", "O(√N)", "O(N\\^2)"],
      correctAnswer: 2,
      explanation:
        "Grover's algorithm uses amplitude amplification to boost the probability of the marked state.  Each iteration increases the amplitude of the target by O(1/\\sqrt{N}) and decreases others, requiring roughly \\sqrt{N} iterations to reach O(1) success probability.  This yields O(\\sqrt{N}) query complexity — a quadratic speed-up over classical O(N) linear search.",
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
        "Shor's algorithm reduces integer factorisation to period-finding, which the quantum Fourier transform (QFT) solves in polynomial time O((log N)^3).  The best classical algorithms (general number field sieve) run in sub-exponential time ~e^{O((log N)^{1/3} (log log N)^{2/3})}, so Shor gives an exponential speed-up.",
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
        "The Quantum Fourier Transform allows Shor's algorithm to extract the period r of the function f(x) = a^x mod N from a superposition of values.  By computing the QFT on the register holding x, the period r appears as peaks in the frequency domain:\n\\[\n|j\\rangle \\xrightarrow{\\text{QFT}} \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1} e^{2\\pi i j k/N}|k\\rangle.\n\\]\nKnowing r, we can factor N using the relation between the period of a^x mod N and its prime factors, completing Shor's efficient factoring algorithm.",
      hints: [
        "Period-finding is equivalent to detecting periodicity in a function - which transform is classically used for this?",
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
        "NISQ stands for Noisy Intermediate-Scale Quantum.  These are devices typically having 50–1000 physical qubits that cannot yet perform fault-tolerant quantum computation due to insufficient error correction and limited coherence times.  The term was coined by John Preskill in 2018 to characterise the current era of quantum technology.",
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
        "Decoherence is the process by which a qubit loses its quantum superposition due to unwanted interactions with the environment (thermal fluctuations, electromagnetic noise, etc.).  It causes off-diagonal density matrix elements to decay, effectively converting a pure quantum state into a classical mixed state.  This limits both the depth of circuits that can run reliably and the effective number of sequential operations.",
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
        "The depolarizing channel is defined as:\n\\[\n\\rho \\mapsto (1-p)\\rho + \\frac{p}{4}(X\\rho X + Y\\rho Y + Z\\rho Z),\n\\]\nwhich applies X, Y, or Z each with probability p/4 and leaves the state unchanged with probability 1-3p/4.  This uniformly contracts the Bloch vector toward the origin (maximally mixed state), unlike bit-flip (only X) or phase-damping (only Z) channels.",
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
        "VQE (Variational Quantum Eigensolver) minimises the expectation value of a Hamiltonian H with respect to a parameterized state |\\psi(\\theta)\\rangle:\n\\[\nE(\\theta) = \\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle.\n\\]\nBy the variational principle, E(\\theta) \\geq E_0 (the true ground state energy).  VQE is particularly valuable for quantum chemistry where finding the ground state energy of molecular Hamiltonians is computationally intractable classically.",
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
        "VQE is a hybrid quantum-classical algorithm.  The quantum processor prepares the parameterized state |\\psi(\\theta)\\rangle and measures \\langle H \\rangle.  A classical optimiser then updates \\theta to minimise E(\\theta).  This hybrid approach is essential for NISQ devices, which cannot run deep quantum algorithms but can evaluate expectation values of shallow circuits.",
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
        "Which mathematical principle guarantees that the VQE expectation value ⟨\\psi(\\theta)|H|\\psi(\\theta)⟩ is always an upper bound on the ground state energy?",
      options: [
        "Cauchy-Schwarz inequality",
        "Variational principle (Rayleigh-Ritz method)",
        "Heisenberg uncertainty principle",
        "Jordan-Wigner transformation",
      ],
      correctAnswer: 1,
      explanation:
        "The variational principle (Rayleigh-Ritz method) states that for any normalized state |\\psi\\rangle:\n\\[\n\\langle\\psi|H|\\psi\\rangle \\geq E_0,\n\\]\nwhere E_0 is the ground state energy.  Equality holds only when |\\psi\\rangle is the exact ground state.  This principle guarantees that any trial state gives an upper bound on E_0, which VQE exploits by searching over the parameter space of an ansatz.",
      hints: [
        "This principle appears in quantum mechanics courses as a method for approximating ground state energies.",
        "The ground state minimizes the energy - any other state must have energy at least as large.",
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
        "QAOA alternates between two Hamiltonians for p layers:\n1. Cost Hamiltonian H_C: encodes the optimisation objective (e.g., for MAX-CUT, H_C = \\sum_{\\langle i,j\\rangle} \\frac{1}{2}(1 - Z_i Z_j)).\n2. Mixer Hamiltonian H_M: typically \\sum_i X_i (or a problem-structured mixer), which adds quantum fluctuations.\nThe circuit applies U(H_M, \\beta_p)U(H_C, \\gamma_p)\\cdots U(H_M, \\beta_1)U(H_C, \\gamma_1) to the |+\\rangle^{\\otimes n} state.",
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
        "At p = 1, QAOA applies a single cost and mixer layer.  This provides only a constant-factor approximation guarantee for MAX-CUT (\\alpha \\approx 0.5 for large regular graphs), not the optimal solution.  For NP-hard problems like MAX-CUT, finding the global optimum requires either large p or a quantum algorithm with different guarantees.  Classical approximation algorithms with better guarantees exist for some problems.",
      hints: [
        "More circuit layers generally allow better approximation - think about what one layer can realistically explore.",
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
        "QAOA was introduced by Farhi, Goldstone & Gutmann (2014) for MAX-CUT on graphs.  MAX-CUT is an NP-hard problem: given a graph, partition vertices into two sets to maximise the number of edges crossing the partition.  The QAOA paper showed that a quantum computer might approximate this better than classical algorithms for certain graph instances.",
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
        "Expressibility measures how well the distribution of states produced by a parameterized ansatz approximates the Haar-random (uniform) distribution over the Hilbert space.  A highly expressive ansatz can generate states close to any point in the Hilbert space.  Formally, expressibility is quantified by the difference between the ansatz state distribution and the Haar distribution (e.g., via the frame potential).",
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
        "Hardware-efficient ansatze use gates and qubit connectivity native to the specific quantum device, minimising gate errors and SWAP overhead.  The trade-off is that the ansatz structure may have no relationship to the problem being solved, potentially harming trainability and solution quality.  They contrast with problem-directed ansatze like UCCSD for quantum chemistry.",
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
        "The Unitary Coupled Cluster (UCC) ansatz is derived from classical coupled cluster theory:\n\\[\nU_{\\text{UCC}}(\\theta) = e^{\\hat{T}(\\theta) - \\hat{T}^\\dagger(\\theta)}, \\quad \\hat{T} = \\sum_i \\theta_i \\hat{t}_i,\n\\]\nwhere \\hat{t}_i are excitation operators.  UCCSD (single and double excitations) preserves particle number and spin symmetry, making it physically appropriate for molecular electronic structure calculations.",
      hints: [
        "Classical quantum chemistry has a hierarchy of approximations (HF, CCSD, CCSDT…) - which ansatz borrows from this?",
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
        "For a parameter \\theta in a gate of the form e^{-i\\theta P/2} where P is a Pauli operator, the parameter-shift rule states:\n\\[\n\\frac{\\partial \\langle H \\rangle}{\\partial \\theta} = \\frac{1}{2}\\sin\\!\\left(\\frac{\\pi}{2}\\right)\\left[\\langle H \\rangle_{\\theta+\\pi/2} - \\langle H \\rangle_{\\theta-\\pi/2}\\right] = \\frac{1}{2}\\left[\\langle H \\rangle_{\\theta+\\pi/2} - \\langle H \\rangle_{\\theta-\\pi/2}\\right].\n\\]\nThus exactly 2 circuit evaluations per parameter are needed.",
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
        "The expectation value of a Pauli rotation gate e^{-i\\theta P/2} varies as \\sin(\\theta + \\phi) or \\cos(\\theta + \\phi), both of which have exact derivatives expressible in terms of shifted evaluations.  The parameter-shift rule exploits this sinusoidal structure to compute \\partial\\langle H\\rangle/\\partial\\theta analytically, unlike finite-difference methods which are approximate.",
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
        "For a gate of the form U(\\theta) = exp(−i\\thetaG) where G has eigenvalues \\pmr, the parameter-shift rule uses a shift of s = \\pi/(4r). For a standard Pauli rotation where r = 1/2, what is the shift?",
      options: ["\\pi/8", "\\pi/4", "\\pi/2", "\\pi"],
      correctAnswer: 2,
      explanation:
        "The general parameter-shift formula for a gate U(\\theta) = e^{-i\\theta G} with eigenvalues \\pm r gives shift s = \\pi/(4r).  For the standard Pauli rotation G = P/2 (eigenvalues \\pm 1/2), we have r = 1/2, so:\n\\[\ns = \\frac{\\pi}{4 \cdot \frac{1}{2}} = \\frac{\\pi}{2}.\n\\]\nThis is the widely used \\pi/2 shift in PennyLane, Qiskit, and other frameworks.",
      hints: [
        "Substitute r = 1/2 into s = \\pi/(4r) directly.",
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
      options: ["O(1/n)", "O(1/2\\^n)", "O(n)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "In a barren plateau, the gradient of the cost function vanishes exponentially with the number of qubits n.  Formally, \\mathbb{V}[\\partial_k C] \\sim O(1/b^n) for some b > 1.  This means exponentially many measurements are required to distinguish the gradient from zero, making gradient-based training intractable for large n.",
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
        "Local cost functions (e.g., measuring only a single qubit or shallow subsystems) and problem-inspired ansatze avoid the full Haar-random regime that causes exponential gradient vanishing.  Barren plateaus arise in globally-entangled, expressible circuits; keeping the circuit shallow and structured prevents the distribution from becoming Haar-random, yielding at most polynomially vanishing gradients.",
      hints: [
        "Deep, globally entangled circuits are most prone to barren plateaus - locality limits the damage.",
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
        "Uniform random initialization in [0, 2\\pi]",
        "Identity block initialization (initializing blocks to near-identity)",
        "Xavier/Glorot initialization from classical neural networks",
        "Zero initialization of all parameters",
      ],
      correctAnswer: 1,
      explanation:
        "Identity block initialisation (Grant et al., 2019) sets each parameterized block to approximate the identity operation (e.g., small rotation angles around identity).  This keeps the circuit output near a product state at the start of training, avoiding the flat loss landscape of deep random circuits.  Each block's gradient remains O(1) rather than exponentially small.",
      hints: [
        "Starting near the identity means the circuit output is close to a known reference state, giving a non-flat loss landscape initially.",
        "This technique was specifically designed for quantum circuits - classical initializations do not directly translate.",
      ],
    },
  ],

  "quantum-feature-maps": [
    {
      id: "q-qml-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A quantum feature map \\phi(x) encodes classical data x into a quantum state |\\phi(x)⟩. What defines the corresponding quantum kernel?",
      options: [
        "The trace of the density matrix \\rho(x)",
        "The inner product |⟨\\phi(x)|\\phi(x′)⟩|\\^2",
        "The number of gates in the encoding circuit",
        "The entanglement entropy of |\\phi(x)⟩",
      ],
      correctAnswer: 1,
      explanation:
        "A quantum kernel K(x, x') = |\\langle\\phi(x)|\\phi(x')\\rangle|^2 is the squared overlap between two feature states.  It can be estimated quantumly by preparing |\\phi(x)\\rangle and |\\phi(x')\\rangle on two registers and running a SWAP test or overlap circuit, measuring the probability of the reference state.",
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
        "The ZZFeatureMap encodes n features using n qubits with the circuit:\n\\[\nU_{\\text{ZZ}}(x) = \\left(\\prod_{i<j} e^{i\\phi_{ij}(x) Z_i Z_j}\\right)\\text{HADAMARD}^{\\otimes n}, \\quad \\phi_{ij}(x) = (\\pi - x_i)(\\pi - x_j).\n\\]\nThe ZZ interactions create entanglement between feature dimensions and the \\phi_{ij} encoding introduces higher-order feature cross terms.",
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
        "For a quantum kernel to offer a potential advantage, the corresponding feature map must access a Hilbert space that cannot be efficiently simulated classically.  If the kernel K(x, x') can be computed in polynomial time on a classical computer, then a classical SVM with that kernel matches the quantum approach — no advantage is possible (Huang et al., 2021).",
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
        "In a quantum SVM, the quantum computer evaluates the kernel function K(x_i, x_j) = |\\langle\\phi(x_i)|\\phi(x_j)\\rangle|^2 by preparing feature states |\\phi(x_i)\\rangle and |\\phi(x_j)\\rangle and measuring their overlap.  The classical computer then solves the kernelized SVM optimisation problem using these quantum-evaluated kernel values.",
      hints: [
        "Quantum and classical parts have different roles - the quantum part accesses the high-dimensional feature space.",
        "Once the kernel matrix is computed, standard classical quadratic programming solves the SVM dual problem.",
      ],
    },
    {
      id: "q-qml-kp12-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Computing the full N\\timesN quantum kernel matrix for N training points requires O(N\\^2) quantum circuit evaluations.",
      correctAnswer: "True",
      explanation:
        "The kernel trick lets SVMs learn non-linear decision boundaries without explicitly computing features in high-dimensional space.  Instead, only kernel values K(x, x') between pairs of data points are needed.  A quantum feature map \\phi(x) provides access to kernels in large (possibly exponentially large) Hilbert spaces, potentially capturing richer feature interactions than classical kernels.",
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
        "Classical kernels are limited to feature spaces that can be computed efficiently in the original input dimension (polynomial in n).  A quantum kernel with an exponentially large Hilbert space could in principle capture correlations that no efficient classical kernel can represent.  However, establishing a rigorous exponential advantage requires proving classical hardness of computing the specific quantum kernel.",
      hints: [
        "The hardness argument must be rooted in a well-studied computational problem - not just circuit size.",
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
        "Amplitude encoding maps N classical data values into the amplitudes of an n-qubit state where N = 2\\^n. What is a key advantage of this encoding?",
      options: [
        "It requires O(N) gates to prepare",
        "It stores exponentially many values in only n qubits",
        "It is hardware-efficient for all quantum devices",
        "It preserves the locality structure of the data",
      ],
      correctAnswer: 1,
      explanation:
        "Basis encoding represents a classical data point x = (x_1, ..., x_n) as the computational basis state |x\\rangle = |x_1\\rangle \\otimes \\cdots \\otimes |x_n\\rangle where each x_i is mapped to |0\\rangle or |1\\rangle.  An n-qubit state encodes n bits of information.  This is simple but inefficient for continuous or high-precision data.",
      hints: [
        "Consider how many values the amplitudes of an n-qubit state can hold versus n classical bits.",
        "The exponential compression is the main theoretical advantage - but state preparation cost is a practical concern.",
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
        "Amplitude encoding stores classical data in the amplitudes of a quantum state:\n\\[\n|\\psi\\rangle = \\frac{1}{\\|x\\|}\\sum_{i=1}^{N} x_i|i\\rangle,\n\\]\nwhere N = 2^n and x_i are the components of the normalized data vector x.  This achieves exponential compression (n qubits encode N = 2^n dimensional vectors) but requires efficient preparation and readout of arbitrary amplitude distributions.",
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
        "Feature encoding schemes trade off qubit efficiency, preparation complexity, and ability to capture relevant structure.  Basis encoding uses n qubits for n bits; amplitude encoding uses n qubits for N = 2^n dimensional vectors; and angle encoding (q|0\\rangle + r|1\\rangle) uses 1 qubit per feature.  The best choice depends on the problem, hardware constraints, and what quantum operations are available.",
      hints: [
        "Convert 5 to binary: 5 = 4 + 1 = 2\\^2 + 2⁰, so the bits from most significant to least are...",
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
        "Quantum advantage for ML means a quantum algorithm achieves lower error or better generalisation than the best-known classical algorithm using comparable resources.  Possible sources include access to exponentially large Hilbert spaces, quantum interference, and entanglement that provide computational pathways unavailable classically.",
      hints: [
        'If a classical algorithm can match the quantum speedup, the "advantage" disappears - what would you call that process?',
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
        "Potential advantages for quantum ML include: (1) kernel methods in exponentially large feature spaces; (2) quantum sampling from distributions classically intractable to approximate; (3) quantum linear algebra speedups for certain matrix inversions; (4) quantum simulation of physical systems that underlie molecular or materials data.",
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
        "A claimed quantum advantage must overcome classical algorithms running on GPUs/TPUs, software like PyTorch/TensorFlow with highly optimised libraries, and the reality that many ML tasks are not limited by compute but by data and model design.  Careful benchmarking on tasks relevant to real applications is essential before claiming practical advantage.",
      hints: [
        "Provable advantage needs a cryptographic or complexity-theoretic hardness assumption - not just an empirical gap.",
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
        "Tang introduced the sample-and-query (SQ) access model as a classical analogue of quantum random-access memory (QRAM).  SQ access provides two operations: (1) sample a row index i with probability proportional to its squared norm \\Vert r_i \\Vert^2; (2) query an individual entry A_{ij}.  This model lets classical algorithms simulate certain quantum recommendation algorithms (like Kerenidis & Prakash) by sampling rather than true superposition queries, achieving a polynomial classical speedup.  The dequantization shows that the quantum advantage in recommendation systems rested on the SQ data access model, not genuine quantum parallelism.",
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
        "QNNs differ from classical NNs in that: (1) information is encoded in quantum states (superposition, entanglement); (2) parameterised gates perform rotations on the Bloch sphere or in higher-dimensional spaces; (3) measurement collapses the state, producing classical outputs; (4) training uses quantum (parameter-shift) or classical (finite difference) gradients.  They are not simply quantisations of classical NNs.",
      hints: [
        "Dequantization targets a specific class of quantum algorithms - those whose speedup came from data access, not quantum interference.",
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
        "Common QNN architectures include: variational quantum eigensolvers (for chemistry); quantum circuit born machines (for generative modelling); quantum convolutional neural networks (inspired by classical CNNs); and quantum recurrent neural networks (for sequential data).  Each architecture is adapted to the structure of the problem and the quantum hardware constraints.",
      hints: [
        "HHL claimed exponential speedup for Ax=b - it was one of the most celebrated quantum ML algorithms until scrutinized.",
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
        "A Quantum Convolutional Neural Network (QCNN) applies layers of local parametrised unitaries (analogous to convolutional filters) followed by pooling operations, hierarchically reducing the number of qubits while extracting features.  The structure mimics classical CNNs but processes quantum data directly without costly state tomography.",
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
        "QCNNs exploit quantum superposition to process multiple regions of an image simultaneously and use entanglement between neighbouring qubits to learn spatial correlations.  The hierarchical structure progressively reduces qubit count via pooling, keeping the circuit depth shallow enough for NISQ hardware while maintaining quantum advantage potential.",
      hints: [
        'Unitary transformations are linear - they cannot "fold" the state space the way a sigmoid or ReLU does.',
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
        "Quantum convolutional layers apply two-qubit unitaries to overlapping qubit pairs, capturing local spatial correlations.  These are analogous to classical filter kernels but operate on quantum states.  Pooling reduces the number of qubits (and parameters) by discarding or measuring some qubits while preserving relevant information in the remaining ones.",
      hints: [
        "Once you discard a subsystem (trace it out), the remaining state evolves non-unitarily - this is the key to dissipation.",
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
        "A Quantum Recurrent Neural Network (QRNN) processes sequential data by applying parametrised quantum operations that depend on both the current input and the previous quantum state.  The hidden state is a quantum state that encodes past information via entanglement, allowing the network to remember temporal dependencies in a quantum mechanical way.",
      hints: [
        "Classical CNNs use pooling to reduce spatial dimensions - QCNNs do something analogous with qubits.",
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
        "QRNNs can process sequences of quantum states or classical data encoded into quantum states.  Unlike classical RNNs that store hidden state vectors classically, QRNNs maintain quantum coherence across time steps, potentially capturing long-range dependencies more efficiently due to exponential state space size.",
      hints: [
        'Barren plateaus arise in globally deep circuits - local, hierarchical structure limits how "random" the circuit looks.',
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
        "Challenges for QRNNs include: decoherence over long sequences (limiting circuit depth); difficulty of backpropagation through time (BPTT) on quantum hardware; and output readout, since measuring a quantum hidden state destroys it.  Hybrid classical-quantum RNNs are a practical compromise, using quantum circuits for encoding and processing but classical RNN architectures for sequence modeling.",
      hints: [
        "After measuring and discarding qubits, the reduced state lives in a smaller Hilbert space - this is the definition of a partial trace.",
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
        "Transfer learning in quantum ML adapts a pre-trained quantum model to a new but related task, reducing training data requirements.  A quantum feature map pre-trained on a source task may already capture relevant correlations for the target task, requiring only fine-tuning of the final layers.",
      hints: [
        "Classical RNNs pass a hidden vector between steps - the quantum analogue passes a quantum state.",
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
        "Classical-to-quantum transfer learning uses a classical pre-trained model to select or initialise quantum circuit parameters.  Quantum-to-quantum transfer directly ports parameters from one quantum circuit to another.  Both reduce the effective training cost by leveraging knowledge from related tasks.",
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
        "Quantum transfer learning is especially valuable on NISQ hardware where training from scratch is costly due to noise and decoherence.  Pre-training on simpler or larger datasets can bring the initial loss landscape to a favourable region, improving convergence and final performance on resource-limited target tasks.",
      hints: [
        "Each time step adds circuit depth - think about what happens to gradients in very deep parameterized quantum circuits.",
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
        "Hybrid classical-quantum models split computation: a quantum computer evaluates a portion of the model (e.g., a kernel or parametrised circuit) while a classical computer handles the rest (e.g., optimisation, preprocessing, post-processing).  This design makes the most of NISQ hardware by delegating only quantum-appropriate tasks to the quantum processor.",
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
        "The quantum portion is responsible for tasks that benefit from superposition and entanglement (e.g., evaluating high-dimensional kernels, generating or processing quantum states).  The classical portion handles tasks that are already efficient classically (e.g., gradient-based optimisation, data loading, loss evaluation).  VQE is a canonical example of this hybrid paradigm.",
      hints: [
        "This mirrors classical transfer learning where only the final layers are fine-tuned on a new task.",
        "Training the full classical network on quantum hardware would be impractical - freezing it solves this.",
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
        "Practical considerations include: minimising data transfer between classical and quantum processors; choosing ansatz depth to fit within coherence times; and designing interfaces so the classical optimiser receives differentiable loss signals.  Current hybrid algorithms (VQE, QAOA, quantum kernel methods) are at the forefront of practical quantum ML.",
      hints: [
        "Think about the cost of amplitude encoding - storing 2\\^n amplitudes in n qubits requires preparing those amplitudes somehow.",
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
        "A Quantum Boltzmann Machine (QBM) uses quantum Gibbs states \\rho = e^{-\\beta H}/Z as the probability distribution over visible and hidden units, where H is a Hamiltonian and Z = \\text{Tr}(e^{-\\beta H}) is the partition function.  The quantum nature allows the model to represent distributions that are classically intractable to sample from.",
      hints: [
        "Quantum devices are best used for tasks that benefit from quantum superposition and interference.",
        "The classical optimizer cannot run on quantum hardware directly - it handles the feedback loop.",
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
        "Unlike classical Boltzmann machines that sample from P(v) \\propto e^{\\beta E(v)} using Markov Chain Monte Carlo, QBMs directly encode the Boltzmann distribution in quantum states.  This avoids the thermal equilibration bottleneck of classical MCMC but requires preparing quantum Gibbs states, which itself is challenging.",
      hints: [
        "Think about what limits a purely quantum approach on today\'s hardware - qubit count and coherence time are the main bottlenecks.",
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
        "Quantum Boltzmann machines can in principle represent certain distributions more compactly than classical ones due to the exponential size of Hilbert space.  However, training requires computing expectation values under \\rho, which necessitates either quantum hardware (to prepare \\rho) or classical approximations that may not capture the full quantum advantage.",
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
        "A quantum autoencoder learns to compress quantum data by training a parametrised circuit U(\\theta) to map an input state |\\psi\\rangle to a lower-dimensional latent representation, then a decoder to reconstruct the original state.  Training minimises the reconstruction error F = \\langle\\psi|U^\\dagger(\\theta)\\|0\\rangle\\langle0\\|U(\\theta)|\\psi\\rangle.",
      hints: [
        "Quantum circuits produce quantum states; data is obtained by measuring - what does each measurement give you?",
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
        "Quantum autoencoders compress quantum states by identifying and discarding irrelevant qubits (those mapped to |0\\rangle after the encoding circuit).  The latent space is the subspace spanned by the remaining qubits.  Unlike classical autoencoders that compress statistical data, quantum autoencoders compress quantum information, preserving coherence and entanglement structure.",
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
        "Quantum autoencoders can reduce the number of qubits needed to represent quantum data, lowering the cost of subsequent processing.  Applications include compressing quantum simulation results, reducing tomography overhead, and variational quantum simulation of large systems by encoding them in a smaller subsystem.",
      hints: [
        "Every time you measure a quantum circuit you get one sample - estimating expectations requires averaging many shots.",
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
        "Quantum diffusion models use the quantum mechanism of noise (decoherence) to model data distributions.  The forward process gradually corrupts a data state with noise, and a learned reverse process denoises it.  The quantum advantage lies in the ability to represent complex multimodal distributions via interference in a high-dimensional Hilbert space.",
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
        "A quantum diffusion model represents the data distribution as the equilibrium state of a noisy quantum channel.  The forward diffusion maps clean data to a mixed state; the reverse process is a learned quantum channel that denoises.  Measurement during the reverse process provides samples from the learned distribution.",
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
        "Compared to classical diffusion models (Score Matching, SDE-based), quantum diffusion models operate in Hilbert space rather than pixel space, potentially capturing quantum correlations in data.  However, preparing and measuring quantum states limits them to quantum data unless classical shadow tomography provides an interface to classical data.",
      hints: [
        "Preparing a thermal state is much harder than preparing a pure state - it requires simulating a system at finite temperature.",
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
        "The Born rule distribution |⟨x|\\psi(\\theta)⟩|\\^2 for each bit string x",
        "A classical Boltzmann distribution",
        "A Gaussian distribution over qubit angles",
      ],
      correctAnswer: 1,
      explanation:
        "Qiskit Machine Learning provides the QuantumInstance to execute circuits on simulators or real hardware, and trainable QNN models (TwoLayerQNN, OpflowQNN) that integrate with PyTorch via the TorchConnector.  This allows hybrid quantum-classical training using familiar PyTorch tooling.",
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
        "Qiskit's SamQHO (Sampling Quantum HO) and QGAN (Quantum Generative Adversarial Network) are quantum ML algorithms implemented in Qiskit.  They demonstrate the platform's capabilities for quantum generative modeling and sampling tasks.",
      hints: [
        "Boson sampling involves sampling from the output distribution of a linear optical network - classically hard due to permanent computation.",
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
        "Qiskit provides circuit builders (RealAmplitudes, EfficientSU2), optimizers (COBYLA, SPSA, ADAM), and trainable QNN architectures that support backpropagation through quantum circuits.  The statevector_simulator backend is used for noiseless training; qasm_simulator for hardware-like noise simulation.",
      hints: [
        "Exact log-likelihood requires knowing p(x) for all x - exponentially expensive for n qubits.",
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
        "Molecular electronic structure is governed by the electronic Schr\\ddot{o}dinger equation H\\psi = E\\psi.  Solving this for large molecules is exponentially hard classically but can be approximated using a quantum computer by mapping the Hamiltonian to a sum of Pauli operators and finding its ground state energy with VQE.",
      hints: [
        "If the trash qubits contain no information about the input, they must be in a state independent of the input - what is the simplest such state?",
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
        "The Jordan-Wigner transformation maps fermionic creation/annihilation operators to qubit operators:\n\\[\nc_i = \\prod_{j<i} Z_j \\sigma_i^-, \\qquad c_i^\\dagger = \\prod_{j<i} Z_j \\sigma_i^+,\n\\]\nThis allows any molecular Hamiltonian (fermionic) to be expressed as a sum of tensor products of Pauli operators, enabling its evaluation on a qubit-based quantum computer.",
      hints: [
        "The input to a quantum autoencoder is a quantum state, not a classical vector - such states can be exponentially complex classically.",
        "Quantum states of n qubits live in a 2\\^n-dimensional Hilbert space; quantum autoencoders work directly in this space.",
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
        "Trotterisation (or more generally, product formulas) approximates e^{-iHt} = \\prod_j e^{-iH_j t/s} + O(t^2/s) by decomposing H into easy-to-simulate terms.  Higher-order trotterisation reduces the error but increases circuit depth.  For quantum chemistry simulations, the Bravyi-Kitaev transformation provides a more efficient fermionic-to-qubit mapping than Jordan-Wigner.",
      hints: [
        "Fidelity measures how close two quantum states are - perfect compression gives fidelity 1 between input and reconstructed output.",
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
        "Quantum approximate optimisation (QAOA, VQE) and adiabatic quantum optimisation (quantum annealing) are two paradigms for quantum combinatorial optimisation.  QAOA is a gate-model algorithm using variational circuits; quantum annealing is an analog approach using controlled adiabatic evolution of a physical system.",
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
        "Adiabatic quantum computation works by preparing the ground state of a simple Hamiltonian H_0, then slowly evolving to H_p (encoding the problem).  By the adiabatic theorem, the system stays in the ground state if the evolution is slow enough.  Quantum annealing is a finite-temperature, non-ideal implementation of this idea on devices like D-Wave.",
      hints: [
        'The "inspired" qualifier is key - these are classical algorithms informed by quantum mathematics.',
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
        "Limitations of quantum annealing include: limited connectivity (embedding problems onto hardware graph is hard); decoherence during the long anneal time; and the fact that the adiabatic theorem requires arbitrarily slow evolution for exact solution, which is impractical.  For NP-hard problems, no quantum algorithm is known to provide guaranteed speedups over classical methods.",
      hints: [
        "A diagonal density matrix in the computational basis is equivalent to a classical probability distribution.",
        "Off-diagonal elements of density matrices represent quantum coherence - quantum-inspired models exploit this richer structure.",
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
        "HHL (Harrow-Hassidim-Lloyd) solves linear systems Ax = b in time O(\\log N \\cdot \\kappa^2 \\cdot 1/\\epsilon) on a quantum computer, exponentially faster than classical O(N \\cdot \\kappa \\cdot \\log(1/\\epsilon)) for certain sparse matrices.  However, this exponential speedup requires: (1) ability to prepare b as a quantum state; (2) readout of x as classical information is costly.",
      hints: [
        "PennyLane is designed for differentiable quantum programming - it needs to connect to frameworks that support automatic differentiation.",
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
        "Quantum linear algebra advantages require special data structures: the condition number \\kappa (ratio of largest to smallest eigenvalue) must be small; matrix must be sparse with efficient QPCA-oracle access; and results must be readable without full state tomography.  These conditions are restrictive in practice.",
      hints: [
        "QNode is the central abstraction in PennyLane - it bridges quantum circuits and classical differentiation.",
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
        "The quantum singular value estimation (QSVE) algorithm uses quantum phase estimation on the singular value decomposition of a matrix A = \\sum_i \\sigma_i |u_i\\rangle\\langle v_i|.  Given input state \\sum_i v_i|v_i\\rangle, QSVE outputs \\sum_i v_i|\\sigma_i\\rangle|u_i\\rangle, enabling applications in recommendation systems, least squares, and differential equations.",
      hints: [
        "PennyLane devices are quantum backends (simulators or real QPUs) - not classical ML frameworks.",
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
        "Warm-starting QAOA uses a good classical solution to initialise the mixer Hamiltonian, biasing the quantum optimisation toward high-quality starting points.  This reduces the number of layers p needed for a given approximation ratio and improves convergence, especially when an approximate classical solution is available.",
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
        "Adaptive QAOA varies the number of layers p based on training progress, increasing depth when the optimisation is still improving and stopping when marginal gains are small.  This is particularly useful for problems where optimal depth is unknown a priori and hardware noise makes unnecessarily deep circuits counterproductive.",
      hints: [
        'The "Q" in QSVC stands for quantum - it computes the kernel matrix using quantum circuits.',
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
        "Domain-specific mixers (e.g., mixers constrained to feasible subspaces) preserve problem constraints by construction, avoiding the need for penalty terms in the cost function that can cause Barren plateaus or optimisation difficulties.  Examples include mixers for graph partitioning that only generate valid cuts, and mixers for portfolio optimisation that enforce cardinality constraints.",
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
        "O(N\\^3)",
        "Exponentially with system size",
        "O(1)",
      ],
      correctAnswer: 2,
      explanation:
        "Volk's lifting lemma and Aaronson-Ambainis conjecture concern the limitations of classical algorithms for learning and testing properties of quantum states.  Understanding these limits is crucial for identifying genuine quantum advantages rather than artifacts of weak classical baselines.",
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
        "Random circuit sampling (RCS) benchmarks like Google Sycamore use pseudo-random quantum circuits and compare classical simulation cost (estimated via Tensor Network methods) against hardware runtime.  While Sycamore demonstrated quantum supremacy on this task, it remains an abstract computation without known practical applications.",
      hints: [
        "Electrons are fermions obeying anti-commutation relations; qubits obey spin algebra - a mapping between them is needed.",
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
        "Quantum advantage in ML requires comparing against the best classical ML methods (including neural networks, kernel methods, ensemble methods) on well-motivated datasets.  Synthetic tasks designed to favour quantum circuits must be checked against classical algorithms that weren't originally considered.  Fair comparison demands expertise in both quantum computing and classical ML.",
      hints: [
        "Drug-target interactions are fundamentally quantum mechanical - electron orbital overlap determines binding strength.",
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
        "For a QUBO problem with n binary variables, an Ising Hamiltonian is formulated with spins s_i \\in {\\pm1}. The number of two-body (J_ij) coupling terms is at most:",
      options: ["n", "n log n", "n(n−1)/2", "2\\^n"],
      correctAnswer: 2,
      explanation:
        "An Ising Hamiltonian H = −\\Sigma_ij J_ij s_i s_j − \\Sigma_i h_i s_i has at most n(n−1)/2 distinct two-body couplings (one for each pair of spins), which determines the hardware connectivity requirements for quantum annealers.",
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
        "QML in cryptography is primarily defensive: using quantum hardware to improve attack detection, cryptographic protocol design, or post-quantum cryptography implementation.  Quantum key distribution (QKD) provides information-theoretic security based on quantum mechanics, but is unrelated to QML.",
      hints: [
        "The caveats of HHL - sparse input, QRAM, and quantum state output - are what limit its practical advantage.",
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
        "Post-quantum cryptography (PQC) develops classical cryptographic algorithms (lattice-based, code-based, hash-based) secure against quantum attacks.  QML contributes to cryptanalysis — using QNNs to attack or test cryptographic primitives — and to securing machine learning itself against quantum adversaries.",
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
        "QML can both strengthen and threaten cryptography: quantum kernel methods may break certain lattice-based cryptosystems by efficiently computing classically-intractable kernel values; simultaneously, QML enables better anomaly detection for monitoring cryptographic infrastructure and designing quantum-resistant protocols.",
      hints: [
        "Block-encoding embeds a matrix A in the upper-left block of a unitary - QSVT then applies functions to A's singular values.",
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
        "QUBO requires binary variables and a quadratic objective - binary cluster assignment fits perfectly.",
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
        "A small gap requires a slow annealing schedule - the adiabatic theorem sets this requirement quantitatively.",
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
        "Quantum volume QV = 2^n where n is the largest circuit size successfully run; it captures a holistic system quality metric including qubit connectivity, gate error rates, measurement fidelity, and cross-talk - not just qubit count.",
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
        "XEB requires classical simulation of the target circuit - which is why supremacy circuits must be at the boundary of classical simulability.",
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
        "Weight sharing in classical CNNs reduces parameters and enforces translational symmetry - QCNNs apply the same idea to qubits.",
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
        "LSTMs use forget/input gates to maintain long-range gradients - QRNNs have no such mechanism.",
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
        "In QKD, Alice and Bob compare a subset of their bits to check for errors - Eve's measurement introduces ~25% error.",
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
        "Post-quantum (or quantum-resistant) cryptography develops classical algorithms based on problems believed to be hard for quantum computers, such as lattice problems (CRYSTALS-Kyber, CRYSTALS-Dilithium), hash-based signatures, and code-based cryptography - standardized by NIST starting 2022.",
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
        "Classical pseudo-random number generators are deterministic - quantum measurement outcomes are provably random.",
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
        "Angle embedding encodes each feature x_i as a rotation angle \\theta_i in a single-qubit gate R(x_i), needing n qubits for n features; amplitude embedding encodes N = 2^n features as amplitudes of an n-qubit state, achieving exponential compression but requiring exponentially deep state preparation circuits.",
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
        "Think of the analogy to GPU batching in deep learning - multiple inputs are processed together to reduce overhead.",
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
        "Statistical noise from finite shots requires many circuit runs per gradient estimate - multiply this by the number of parameters and training steps.",
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
        "Via the variational principle: ⟨\\psi(\\theta)|H|\\psi(\\theta)⟩ \\geq E_ground for any state |\\psi(\\theta)⟩",
        "By computing the exact eigenspectrum using quantum phase estimation",
        "By averaging over many random ansatz circuits",
      ],
      correctAnswer: 1,
      explanation:
        "The variational principle guarantees that the expectation value of H in any trial state is an upper bound on the ground state energy; VQE minimizes this expectation value over the parameterized ansatz, approaching the true ground state energy from above.",
      hints: [
        "The variational principle is the quantum mechanical analogue of the fact that any trial wavefunction overestimates the ground state energy.",
        "VQE optimizes \\theta to minimize ⟨H⟩ - each evaluation gives an upper bound, and minimization drives it toward the exact ground state.",
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
        "DFT relies on approximate exchange-correlation functionals that fail for strongly correlated molecules; quantum algorithms like VQE with UCCSD ansatz or quantum phase estimation can in principle compute ground state energies to chemical accuracy (1 kcal/mol \\approx 1.6 mhartree) by working directly in the full Hilbert space.",
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
        "The second-quantized molecular Hamiltonian H = \\Sigma_pq h_pq a†_p a_q + (1/2) \\Sigma_pqrs h_pqrs a†_p a†_q a_r a_s must be mapped to qubit operators for quantum simulation. Compared to the Bravyi-Kitaev (BK) transformation, what advantage does the Jordan-Wigner (JW) transformation have?",
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
        "JW's Z strings track fermion parity - each creation operator a†_j becomes X_j + iY_j followed by a Z string.",
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
        "Noise characterization on NISQ devices - such as measuring T1 (energy relaxation), T2 (dephasing time), and gate error rates - is essential for error-aware circuit compilation and mitigation.",
      correctAnswer: "True",
      explanation:
        "Characterizing each qubit's T1 (relaxation time), T2 (coherence time), single- and two-qubit gate fidelities, and readout errors allows compilers to route circuits to less noisy qubits, choose error-aware decompositions, and calibrate mitigation techniques like ZNE or PEC.",
      hints: [
        "T1 limits how long a qubit can hold a |1⟩ state; T2 \\leq 2T1 limits the coherence during superposition.",
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
        "Dynamical decoupling: inserting sequences of \\pi-pulses during idle periods to suppress dephasing errors",
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
        "QNNs can theoretically represent certain functions with exponentially fewer parameters than classical networks due to the exponential size of Hilbert space.  However, this expressivity must be balanced against trainability (avoiding barren plateaus) and the cost of reading out results.",
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
        "Strategies include local cost functions, shallow but expressive ansatze, identity block initialisation, and problem-inspired circuit architectures.  No single approach universally solves the barren plateau problem; the best strategy depends on the specific circuit structure and problem.",
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
        "Exponential sampling overhead (1/\\gamma\\^2)\\^n where \\gamma is the noise parameter and n is circuit depth",
        "Cannot be used with multi-qubit gates",
        "Requires perfect state preparation",
      ],
      correctAnswer: 1,
      explanation:
        "Applications include classifying quantum states (e.g., distinguishing separable from entangled states), learning unknown unitaries, quantum error correction decoding, and as function approximators within larger quantum-classical hybrid pipelines.  The advantage is most clear when the input data is itself quantum.",
      hints: [
        "Each noisy gate in PEC introduces a factor of overhead - these multiply across the circuit depth.",
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
        "The confusion matrix relates what you prepared to what you measured - inversion corrects the measured probabilities.",
        "For n qubits, the assignment matrix is 2^n \\times 2^n; for large n, tensor product approximations are used.",
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
        "During the readout pulse (which takes microseconds), a qubit in |1⟩ can relax to |0⟩ via T1 decay, causing a false |0⟩ measurement outcome; this asymmetric error (|1⟩\\to|0⟩ more likely than |0⟩\\to|1⟩) is a primary source of readout error in superconducting quantum processors.",
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
        "The full n-qubit assignment matrix is 2^n \\times 2^n, making it exponentially expensive to calibrate. TREX applies random single-qubit Pauli twirls before readout to symmetrize the error channel into a diagonal (depolarizing-like) form, reducing calibration to n single-qubit experiments and avoiding multi-qubit correlated error modeling.",
      hints: [
        "Twirling converts a general error channel into a simpler symmetric form - for readout errors, this means diagonal assignment matrix.",
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
        "Photons don't interact strongly with their environment - which is good for coherence but bad for implementing two-qubit gates.",
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
        "Each coupler in a superconducting processor causes ZZ cross-talk between connected qubits - fewer couplers means less cross-talk.",
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
        "|⟨\\phi(x)|\\phi(x')⟩|",
        "|⟨\\phi(x)|\\phi(x')⟩|\\^2",
        "⟨\\phi(x)|Z⊗n|\\phi(x')⟩",
        "Tr[\\rho(x) \\rho(x')]",
      ],
      correctAnswer: 1,
      explanation: "The quantum kernel is K(x, x') = |\\langle\\phi(x)|\\phi(x')\\rangle|^2, the squared overlap between two feature states.  It can be computed by preparing |\\phi(x)\\rangle and |\\phi(x')\\rangle, applying the SWAP test circuit, and measuring the probability of |0\\rangle^{\\otimes n}:\\[\\langle\\phi(x)|\\phi(x')\\rangle|^2 = P(|0\\rangle^{\\otimes n}).\\]",
      hints: [
        "The Born rule: the probability of measuring |0...0⟩ after circuit U†(x')U(x)|0...0⟩ equals |⟨0...0|U†(x')U(x)|0...0⟩|\\^2 = |⟨\\phi(x')|\\phi(x)⟩|\\^2.",
        "Quantum kernels inherit the mathematical properties of classical kernels (symmetry, positive semi-definiteness) from the inner product structure of Hilbert space.",
      ],
    },
    {
      id: "q-qml-ex1-2",
      type: "true-false",
      difficulty: "easy",
      question: "A quantum kernel SVM (QSVM) can be implemented by computing all pairwise quantum kernel values K(xi, xj) classically once, then using a standard classical SVM solver with the pre-computed kernel matrix.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Kernel-target alignment measures how well a kernel separates labelled data:\n\\[\nA = \\frac{\\sum_{i,j} y_i y_j K(x_i, x_j)}{\\sqrt{\\sum_{i,j} K(x_i, x_j)^2}}.\\]\nMaximising A ensures the kernel maximally correlates with the labels y_i \\in \\{-1, +1\\}, improving generalisation.",
      hints: [
        "Quantum hardware is only used to fill the kernel matrix; the SVM training itself is classical quadratic programming.",
        "For n training points, computing the full kernel matrix requires O(n\\^2) quantum circuit evaluations, which is a practical bottleneck.",
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
      explanation: "ProjectQ is an open-source quantum computing framework providing: circuit compilation optimising for specific hardware topologies; high-performance simulators (statevector, density matrix, tensor network); and interfaces to IBM, Rigetti, and IonQ backends.  Its ArchitectureAwareCompiler reduces circuit depth by exploiting hardware connectivity.",
      hints: [
        "KTA is the Frobenius inner product between the computed kernel and the ideal label-based kernel, normalised to [-1, 1].",
        "Training quantum feature maps to maximise KTA is an alternative to end-to-end QNN training - more interpretable and avoids barren plateaus.",
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
      explanation: "The Quantum Fourier Transform in ProjectQ is implemented as:\n\\[\n\\text{QFT}_n = \\frac{1}{\\sqrt{2^n}}\\sum_{j,k=0}^{2^n-1} e^{2\\pi i jk/2^n}|j\\rangle\\langle k|.\\]\nIt uses the standard butterfly network of controlled-R_k gates with O(n^2) gate complexity, and is a subroutine in Shor's algorithm.",
      hints: [
        "More expressive \$\\neq\$ more useful: a feature map mapping everything to near-uniform states provides no discrimination.",
        "Inductive bias must be built into the feature map; random deep feature maps suffer the same concentration as random deep circuits.",
      ],
    },
  ],
  "barren-plateaus-deep": [
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
      explanation: "Symmetry verification projects the variational state onto the correct symmetry sector.  For the particle number operator \\hat{N} = \\sum_i c_i^\\dagger c_i, any state |\\psi\\rangle has expectation \\langle\\psi|\\hat{N}|\\psi\\rangle.  If this deviates from the expected integer, the state has experienced an error and should be corrected or discarded.",
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
      correctAnswer: 0,
      explanation: "NISQ constraints: (1) decoherence limits circuit depth to \\lesssim 1000 gates; (2) gate errors (1-10\\times 10^{-3} for 2-qubit gates) accumulate; (3) qubit connectivity limits circuit efficiency; (4) readout fidelity (95-99\\%); (5) limited qubit counts (50-1000).  These require shallow circuits, error mitigation, and hardware-efficient ansatze.",
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
      explanation: "Quantum advantage analysis uses complexity theory to establish separations: (1) classical simulation of random quantum circuits is #P-hard for constant depth; (2) quantum sampling tasks are believed to be hard for classical computers; (3) translating these to practical ML advantage requires careful problem formulation and realistic baselines.",
      hints: [
        "Haar-random states are maximally mixed when traced over any subsystem - no parameter affects the reduced density matrix.",
        "The connection: expressibility (ability to represent any unitary) and entanglement are correlated - more expressible circuits are more barren.",
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
      explanation: "Barren plateau mitigation: (1) local cost functions scale gradient variance as O(1/n); (2) shallow ansatze (p \\leq 3-5) avoid Haar-random regime; (3) problem-inspired circuits respect solution structure; (4) noise-aware training compensates for hardware errors; (5) classical pre-training initializes to non-flat regions.",
      hints: [
        "Random initialisation of all parameters simultaneously creates a random deep circuit - exactly the barren plateau regime.",
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
        "Gate folding: replacing each gate U with U \\cdot U† \\cdot U, which is equivalent to U but with 3x more noise due to additional gate operations",
        "Increasing the number of qubits to dilute the noise across a larger Hilbert space",
        "Running the circuit at a higher temperature by reducing cryogenic cooling",
      ],
      correctAnswer: 1,
      explanation: "Zero-noise extrapolation (ZNE): measure the expectation value E(\\lambda) at noise rates \\lambda = 1, 2, 3 (achieved by gate stretching), then fit the model E(\\lambda) = E_0 + a\\lambda + b\\lambda^2 and extrapolate to \\lambda \\to 0.  This requires the dominant noise to be polynomial and the extrapolation model to be accurate.",
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
      correctAnswer: 1,
      explanation: "Dynamic decoupling applies fast X/Y gates to idle qubits: the XY4 sequence (\\tau-X-\\tau-Y-\\tau-X-\\tau-Y-\\tau) effectively decouples qubits from the environment during circuit idle times.  For superconducting qubits with T2 \\sim 100-500 \\mu s, DD extends effective coherence by factors of 2-5x during waiting periods.",
      hints: [
        "Extrapolation to zero is always uncertain - the more data points and the closer they are to zero noise, the better the estimate.",
        "If the noise model is misspecified (e.g., linear assumed but actual is non-linear), ZNE introduces systematic bias.",
      ],
    },
    {
      id: "q-qml-ex3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Probabilistic Error Cancellation (PEC) represents the ideal noiseless gate as a quasi-probability decomposition over noisy operations. What is the 'one-norm' \\gamma of this decomposition and why does it matter?",
      options: [
        "\\gamma = 1 always, since probabilities sum to 1",
        "\\gamma > 1 is the sum of absolute values of the quasi-probability coefficients; the sampling overhead of PEC scales as \\gamma^{2n} for n gates, making it exponentially costly for deep circuits",
        "\\gamma is the average gate fidelity of the noisy hardware, bounded between 0 and 1",
        "\\gamma measures the entanglement entropy introduced by the noise channel",
      ],
      correctAnswer: 1,
      explanation: "Symmetry verification in VQE: for a Hamiltonian with [H, \\hat{N}] = 0, measuring \\hat{N} after each VQE iteration projects onto the correct particle-number sector.  This prevents the optimiser from exploring symmetry-violating excited states and improves convergence to the desired ground state.",
      hints: [
        "\\gamma > 1 because the quasi-probability distribution has negative weights - no valid probability distribution can represent the ideal noiseless gate exactly.",
        "For a depolarizing channel with error rate p, \\gamma \\approx 1 + 4p/3 per gate; for 100 gates at p=0.01, overhead = (1.013)^{200} \\approx 14x.",
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
      explanation: "Symmetry verification uses a symmetry operator S that commutes with the Hamiltonian: [H, S] = 0.  If measuring S gives an unexpected eigenvalue, the state has been corrupted by decoherence or gate errors.  The verification circuit applies S-measurement before final readout, enabling error detection and correction.",
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
      correctAnswer: 0,
      explanation: "The most limiting NISQ constraint for QML is decoherence (T2 \\sim 100-500 \\mu s), which limits circuit depth to \\lesssim 1000 gates and restricts QAOA to p \\leq 5-10 layers.  This rules out deep quantum algorithms but allows shallow variational circuits like VQE and simple QNNs.",
      hints: [
        "In the computational basis, a Z error leaves |0⟩ \\to |0⟩ and |1⟩ \\to -|1⟩ - the measurement outcome is unchanged.",
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
      explanation: "Quantum advantage analysis for ML: the most rigorous path requires showing a complexity-theoretic separation between quantum and classical algorithms for an ML task.  Tang's dequantization shows that for recommendation systems, quantum advantage disappears when QRAM is replaced with classical sampling access, highlighting the importance of data access assumptions.",
      hints: [
        "Clifford circuits are classically simulable in polynomial time (Gottesman-Knill theorem), providing free noiseless reference values.",
        "The key insight: near-Clifford circuits have similar noise characteristics to the target circuit but can be simulated exactly - perfect training data for the regression model.",
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
      explanation: "NISQ constraints for QML: (1) limited coherence requiring shallow circuits (\\lesssim 1000 gates); (2) gate errors accumulating over circuits; (3) qubit connectivity constraining circuit efficiency; (4) measurement fidelity limiting shot counts; (5) 50-1000 qubits available.  These make hybrid classical-quantum approaches and error mitigation essential.",
      hints: [
        "NISQ constraints directly limit the depth of useful variational circuits - too deep and decoherence dominates.",
        "The threshold for fault tolerance requires two-qubit gate errors below ~0.1-1% (depending on code), which current devices approach but don't reliably achieve.",
      ],
    },
    {
      id: "q-qml-ex5-2",
      type: "true-false",
      difficulty: "easy",
      question: "On NISQ devices, increasing circuit depth always improves the quality of variational quantum algorithm results because more layers enable richer representations.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "Barren plateau mitigation via local costs: replacing global cost C = \\langle H \\rangle with local cost C_{local} = \\frac{1}{n}\\sum_{i=1}^n \\langle H_i \\rangle where each H_i acts on O(1) qubits.  This changes the gradient scaling from O(1/b^n) to O(1/poly(n)), making training tractable.",
      hints: [
        "Gate error per layer: each two-qubit gate adds ~0.5% error; after 100 gates, the output fidelity has dropped to ~0.995^{100} \\approx 0.6.",
        "The expressibility-noise trade-off defines the NISQ 'sweet spot' - a key challenge in practical VQA design.",
      ],
    },
    {
      id: "q-qml-ex5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For a variational quantum algorithm targeting an n-qubit problem, the number of shots required to estimate a single expectation value to precision \\epsilon scales as:",
      options: [
        "O(n/\\epsilon)",
        "O(1/\\epsilon\\^2)",
        "O(n\\^2/\\epsilon\\^4)",
        "O(2^n/\\epsilon)",
      ],
      correctAnswer: 1,
      explanation: "Symmetry verification in VQE for molecular Hamiltonians: the particle number operator \\hat{N} = \\sum_i c_i^\\dagger c_i commutes with H.  By measuring \\hat{N} and projecting onto the correct sector after each VQE iteration, the optimizer only explores physically valid states with the correct electron count.",
      hints: [
        "Each shot gives a single \\pm1 outcome; averaging N shots gives standard error \\sigma/√N. Setting \\sigma/√N = \\epsilon gives N = \\sigma\\^2/\\epsilon\\^2.",
        "For gradient estimation via parameter shift, 2 expectation value evaluations are needed per parameter - multiplied by the shot count.",
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
      explanation: "Quantum advantage in recommendation systems: Kerenidis-Prakash (KP) achieves exponential quantum speedup for low-rank matrix completion.  However, Tang (2019) showed a classical algorithm with polynomial complexity achieves the same query guarantees using sample-and-query (SQ) access.  The quantum advantage rested on QRAM assumptions, not fundamental quantum complexity.",
      hints: [
        "If the input and output are classical, the quantum computer must solve a classically hard subroutine - often avoidable classically.",
        "Quantum data advantage: processing a quantum state without full classical tomography (which is exponentially expensive) is naturally quantum.",
      ],
    },
    {
      id: "q-qml-ex6-2",
      type: "true-false",
      difficulty: "easy",
      question: "Grover's search algorithm provides a quadratic quantum speedup for unstructured database search, which directly translates to a quadratic speedup in training any machine learning model that uses gradient descent.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "Dequantization of quantum algorithms: when quantum algorithms assume quantum random access memory (QRAM) for data loading, classical algorithms with sample-and-query (SQ) access often achieve similar performance.  This raises the bar for quantum advantage claims — QRAM remains an experimental challenge, making classical SQ algorithms a fairer comparison.",
      hints: [
        "Grover speeds up 'find the item satisfying property P' - gradient descent does not reduce to this problem structure.",
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
        "Random circuits produce outputs that are classically hard to simulate but carry no useful information - the hardness arises from complexity-theoretic arguments about sampling from anticoncentrated distributions, not from solving an ML-relevant problem",
        "Random circuit sampling can only be run once per qubit, making it incompatible with training",
        "The outputs are quantum states that cannot be measured and converted to classical predictions",
      ],
      correctAnswer: 1,
      explanation: "When can quantum ML genuinely offer advantage? Three promising settings: (1) inherently quantum data (quantum sensors, simulation outputs); (2) exponentially large Hilbert spaces for kernel methods; (3) quantum sampling tasks in generative modelling.  Each requires rigorous hardness proofs and careful comparison with classical baselines.",
      hints: [
        "The hardness of random circuit sampling comes from the 'noise in the output' - useful ML outputs need structured, not random, computation.",
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
        "Quantum states with low entanglement (area-law entanglement) - specifically matrix product states can represent these efficiently with bond dimension polynomial in system size",
        "Only product states (zero entanglement) - any entanglement makes tensor network simulation exponential",
        "Quantum states produced by circuits with depth less than log n, where n is the system size",
      ],
      correctAnswer: 1,
      explanation: "Matrix Product States (MPS) efficiently represent 1D quantum states satisfying area-law entanglement (entanglement entropy bounded by a constant, not scaling with system size). Many variational circuits trained with limited depth produce low-entanglement states efficiently simulable classically via MPS with polynomial bond dimension. This means shallow VQCs may provide no quantum advantage over optimised MPS-based classical methods.",
      hints: [
        "Area law: entanglement entropy of a 1D region scales as constant (area) not volume; MPS capture this efficiently.",
        "If the ground state of a 1D Hamiltonian satisfies area law (provable for gapped 1D systems), MPS simulate it efficiently - no quantum advantage for these systems.",
      ],
    },
  ],
};

Object.assign(questions, extraQmlQuestions);

const extraQmlQuestions2: Record<string, Question[]> = {
  "barren-plateau-mitigation": [
    {
      id: "q-qml-ex7-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Identity block initialisation (Grant et al., 2019) mitigates barren plateaus at the start of training. What is the initialisation strategy?",
      options: [
        "Initialise all rotation angles to zero so every gate is the identity matrix",
        "Pair parameterised blocks so each pair multiplies to the identity; small perturbations around this initialisation preserve gradient information without entering the exponentially flat random landscape",
        "Initialise all angles randomly from Uniform[-0.01, 0.01] to stay near identity",
        "Use He initialisation from classical deep learning, adapted by scaling by 1/sqrt(qubit count)",
      ],
      correctAnswer: 1,
      explanation: "Local cost functions for barren plateau mitigation: the global cost C = \\langle\\psi|H|\\psi\\rangle has gradient variance O(1/b^n), but the local cost C_{local} = \\frac{1}{n}\\sum_{i=1}^n \\langle\\psi|Z_i|\\psi\\rangle has variance O(1/n), preventing exponential gradient vanishing and enabling tractable training.",
      hints: [
        "A circuit identically equal to the identity produces zero gradient everywhere - so exact identity initialisation is also bad.",
        "The key insight: near-identity circuits are not 2-designs, so their gradients have polynomial (not exponential) variance.",
      ],
    },
    {
      id: "q-qml-ex7-2",
      type: "true-false",
      difficulty: "easy",
      question: "Hardware-efficient ansatze (HEA) are designed to reduce circuit depth and SWAP overhead on NISQ devices, but they are generally more susceptible to barren plateaus than structured chemistry-inspired ansatze (e.g., UCCSD).",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Quantum embedding choices on NISQ hardware: angle encoding (1 qubit per feature) uses only single-qubit rotations and is hardware-efficient; ZZFeatureMap requires entangling CNOT gates that amplify hardware errors; the optimal choice trades expressibility against hardware noise and circuit depth.",
      hints: [
        "Over-expressible ansatze approach 2-designs, causing barren plateaus; problem-structured ansatze restrict to physically relevant states.",
        "UCCSD exponential operator form naturally respects fermion symmetries, limiting the reachable state space and avoiding barren plateau regions.",
      ],
    },
    {
      id: "q-qml-ex7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Noise-induced barren plateaus (NiBP) are distinct from expressibility-induced barren plateaus. What is the mechanism of NiBP and how does it scale?",
      options: [
        "Hardware noise causes bit-flip errors that corrupt gradient estimates; NiBP scales linearly with circuit depth",
        "Depolarising noise at each layer exponentially suppresses the purity of the quantum state toward the maximally mixed state; gradients of any observable in the maximally mixed state are exactly zero, so noise drives gradients to zero exponentially in circuit depth",
        "Phase noise from qubit decoherence introduces random offsets to rotation angles; the gradient variance scales as 1/T where T is the coherence time",
        "NiBP occurs only in trapped-ion systems due to their slow gate speeds; superconducting qubits are immune",
      ],
      correctAnswer: 1,
      explanation: "Classical pre-training for QNNs: train a classical neural network with similar architecture on the same dataset, then use the classical weights to initialise quantum circuit parameters.  This provides a non-flat starting point in parameter space, avoiding the exponential gradient suppression of deep random circuits at initialisation.",
      hints: [
        "Maximally mixed state rho = I/2^n: every observable has expectation Tr[O I/2^n] = Tr[O]/2^n, a constant independent of circuit parameters - zero gradient.",
        "NiBP applies to any variational circuit on noisy hardware; even structured, shallow ansatze eventually hit NiBP if circuit depth exceeds the hardware's effective coherence budget.",
      ],
    },
  ],
  "qsvm-kernel-alignment": [
    {
      id: "q-qml-ex8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Quantum kernel estimation on hardware requires repeated circuit evaluation to statistically estimate K(xi, xj). What is the standard method to ensure the estimated kernel matrix is valid (positive semidefinite) despite shot noise?",
      options: [
        "Discard negative eigenvalues from the kernel matrix by setting them to zero after eigendecomposition",
        "Clip the diagonal of the kernel matrix to ensure it is exactly 1",
        "Thresholding: set all kernel entries below a noise threshold to zero",
        "Add a small multiple of the identity matrix (ridge regularisation) to the kernel matrix to ensure positive definiteness before SVM training",
      ],
      correctAnswer: 3,
      explanation: "Quantum SVM kernel alignment optimizes feature map parameters \\theta to maximise kernel-target alignment:\n\\[\nA(\\theta) = \\frac{\\sum_{i,j} y_i y_j K_\\theta(x_i, x_j)}{\\sqrt{\\sum_{i,j} K_\\theta(x_i, x_j)^2}}.\\]\nMaximising A(\\theta) ensures the kernel maximally correlates with the training labels.",
      hints: [
        "Shot noise makes K_ij estimates stochastic; when aggregated into a matrix, small negative eigenvalues appear due to rounding errors.",
        "Ridge regularisation K + lambda*I is mathematically equivalent to adding a Gaussian RBF kernel to the quantum kernel, providing numerical stability.",
      ],
    },
    {
      id: "q-qml-ex8-2",
      type: "true-false",
      difficulty: "medium",
      question: "Classical kernel methods like the RBF (Radial Basis Function) kernel can always be computed exactly and in O(n) time for n-dimensional input data, giving them a practical advantage over quantum kernels that require O(n_shots) circuit evaluations per pair.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "Hybrid kernel alignment: the quantum computer evaluates K_\\theta(x_i, x_j) via overlap circuits for each pair (i, j); the classical computer computes A(\\theta) and its gradient via the parameter-shift rule on the quantum processor.  This hybrid loop continues until A(\\theta) converges.",
      hints: [
        "Classical kernel evaluation is cheap per pair but the full Gram matrix has N^2 entries - both quantum and classical kernels share this O(N^2) bottleneck.",
        "The practical quantum kernel disadvantage is per-entry cost: each K(xi, xj) requires running a quantum circuit ~1000 times, versus one O(d) arithmetic operation classically.",
      ],
    },
  ],
  "quantum-advantage-ml-advanced": [
    {
      id: "q-qml-ex9-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The quantum speedup for recommendation systems claimed by Kerenidis and Prakash (2016) was reduced to a polynomial classical speedup by Tang (2019). What specific classical technique enabled this dequantization?",
      options: [
        "Fast Fourier Transform applied to the user-item preference matrix",
        "Stochastic gradient descent with mini-batches enabling O(poly(d)) matrix factorisation",
        "Sample and query (SQ) access: the ability to efficiently sample entries of the matrix proportional to their squared magnitudes, enabling Monte Carlo low-rank approximation with polylogarithmic overhead",
        "Locality-sensitive hashing to find approximate nearest neighbours in the user embedding space",
      ],
      correctAnswer: 2,
      explanation: "Quantum advantage for molecular property prediction: classical CCSD(T) scales as O(n^7), becoming intractable for molecules beyond ~50 electrons.  VQE on a quantum computer could compute exact molecular energies in polynomial time, enabling drug discovery and materials design at scales impossible for classical quantum chemistry.",
      hints: [
        "QRAM allows superposition access to data: 'query all indices at once.' SQ access simulates this classically by efficient importance sampling.",
        "The quantum recommendation algorithm's core is low-rank matrix approximation via quantum phase estimation; Tang showed Monte Carlo methods under SQ access achieve the same complexity.",
      ],
    },
    {
      id: "q-qml-ex9-2",
      type: "true-false",
      difficulty: "easy",
      question: "For quantum ML to achieve a practical advantage over classical ML, it is generally sufficient to show that the quantum algorithm has better asymptotic complexity on some problem instance.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "QAOA for combinatorial optimisation: with p \\to \\infty layers, QAOA converges to the ground state, but achieving meaningful approximation ratios requires p scaling with problem size.  Current NISQ devices with p \\leq 5-10 layers provide only modest approximation guarantees for NP-hard problems.",
      hints: [
        "Asymptotic speedup on paper vs. practical speedup: hardware constants, QRAM overhead, and output sampling costs all matter.",
        "Dequantization shows that the asymptotic speedup often relies on QRAM assumptions that are themselves classically simulable.",
      ],
    },
    {
      id: "q-qml-ex9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Quantum ML models are sometimes proposed for learning from quantum data generated by other quantum systems (e.g., quantum sensors, quantum chemistry experiments). Why is this the strongest case for quantum ML advantage?",
      options: [
        "Quantum sensors always produce more data than classical sensors, giving quantum ML more training signal",
        "Quantum data (quantum states) has no efficient classical description in general; processing quantum data on a quantum computer avoids the exponentially expensive step of measuring and classically reconstructing the state, offering genuine computational savings",
        "Quantum ML models have more parameters when applied to quantum data, enabling better generalisation",
        "Quantum data is always low-dimensional, making quantum ML more efficient than classical methods",
      ],
      correctAnswer: 1,
      explanation: "Quantum ML advantage benchmarks: Quantum Volume and Circuit Layer Operations measure raw hardware capability but not ML task performance.  Meaningful benchmarks require: (1) ML tasks with real data; (2) comparison against best classical ML methods; (3) scaling experiments to show advantage growth.  MLCommons is developing quantum ML benchmark standards.",
      hints: [
        "Classical ML on quantum data: measure the quantum state (destroying it) to get exponentially many classical parameters, then run classical ML. Quantum ML: process the state directly.",
        "Full quantum state tomography of n qubits requires O(2^n) measurements - processing the state directly on a quantum computer is always more efficient.",
      ],
    },
    {
      id: "q-qml-ex9-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The NISQ era constraint of limited coherence time most directly limits which aspect of variational quantum ML algorithms?",
      options: [
        "The number of trainable parameters in the variational circuit",
        "The maximum useful circuit depth (number of sequential gate layers), since decoherence degrades state quality proportional to execution time",
        "The number of qubits that can be used in the circuit",
        "The number of times the same circuit can be re-run for gradient estimation",
      ],
      correctAnswer: 1,
      explanation: "Hybrid quantum-classical architectures: quantum circuits handle tasks requiring large Hilbert spaces (kernel evaluation, state preparation, quantum sampling); classical processors handle efficient classical computation (optimisation, linear algebra, data loading).  This pragmatic division of labour makes the most of NISQ hardware while leaving a clear path to scalable quantum advantage.",
      hints: [
        "Coherence time is a wall clock constraint: the circuit must complete before the quantum state decoheres into a useless mixed state.",
        "Depth limit from coherence: deeper circuits are more expressive but exponentially more noisy; the NISQ sweet spot is near the coherence-limited depth.",
      ],
    },
  ],
};

Object.assign(questions, extraQmlQuestions2);

registerQuestions(questions);
export default questions;
