#!/usr/bin/env python3
"""Apply improved explanations to quantum-ml.ts"""

with open('src/lib/questions/quantum-ml.ts', 'r') as f:
    content = f.read()

# Explanations must be single-line TypeScript strings with \\n for display math breaks.
# In Python string: \\n = backslash-n (2 chars) -> in file \\n -> TypeScript string \n -> output newline
# In Python string: \\\\ = two backslashes -> in file \\\\ -> TypeScript string \\ -> output backslash

improved = {}
improved["q-qml-kp1-1"] = (
    "Let's recall the action of H on computational basis states:\\n"
    "\\\\[\\n"
    "H|0\\\\rangle = \\\\frac{|0\\\\rangle + |1\\\\rangle}{\\\\sqrt{2}} = |+\\\\rangle, \\\\qquad H|1\\\\rangle = \\\\frac{|0\\\\rangle - |1\\\\rangle}{\\\\sqrt{2}} = |-\\\\rangle.\\n"
    "\\\\]\\n"
    "Writing |0\\\\rangle as the column vector \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\end{pmatrix}, we compute:\\n"
    "\\\\[\\n"
    "H|0\\\\rangle = \\\\frac{1}{\\\\sqrt{2}}\\\\begin{pmatrix} 1 & 1 \\\\\\\\ 1 & -1 \\\\end{pmatrix}\\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\end{pmatrix} = \\\\frac{1}{\\\\sqrt{2}}\\\\begin{pmatrix} 1 \\\\\\\\ 1 \\\\end{pmatrix} = \\\\frac{|0\\\\rangle + |1\\\\rangle}{\\\\sqrt{2}}.\\n"
    "\\\\]\\n"
    "The result |+\\\\rangle = \\\\frac{|0\\\\rangle + |1\\\\rangle}{\\\\sqrt{2}} is an equal superposition with phase 0."
)

improved["q-qml-kp1-2"] = (
    "The Pauli-Z matrix is Z = \\\\begin{pmatrix} 1 & 0 \\\\\\\\ 0 & -1 \\\\end{pmatrix}.  Applying it to a general qubit state \\\\alpha|0\\\\rangle + \\\\beta|1\\\\rangle = \\\\begin{pmatrix} \\\\alpha \\\\\\\\ \\\\beta \\\\end{pmatrix}:\\n"
    "\\\\[\\n"
    "Z\\\\begin{pmatrix} \\\\alpha \\\\\\\\ \\\\beta \\\\end{pmatrix} = \\\\begin{pmatrix} 1 & 0 \\\\\\\\ 0 & -1 \\\\end{pmatrix}\\\\begin{pmatrix} \\\\alpha \\\\\\\\ \\\\beta \\\\end{pmatrix} = \\\\begin{pmatrix} \\\\alpha \\\\\\\\ -\\\\beta \\\\end{pmatrix} = \\\\alpha|0\\\\rangle - \\\\beta|1\\\\rangle.\\n"
    "\\\\]\\n"
    "Geometrically, Z is a \\\\pi rotation around the Z-axis; it leaves |0\\\\rangle unchanged while flipping the phase of the |1\\\\rangle amplitude."
)

improved["q-qml-kp1-3"] = (
    "The S gate is diagonal: S = \\\\begin{pmatrix} 1 & 0 \\\\\\\\ 0 & i \\\\end{pmatrix} = \\\\operatorname{diag}(1, i).  Squaring a diagonal matrix squares each diagonal entry:\\n"
    "\\\\[\\n"
    "S^2 = \\\\operatorname{diag}(1^2, i^2) = \\\\operatorname{diag}(1, -1) = \\\\begin{pmatrix} 1 & 0 \\\\\\\\ 0 & -1 \\\\end{pmatrix} = Z.\\n"
    "\\\\]\\n"
    "Applying the phase gate twice gives a total phase shift of \\\\pi (since i \\\\times i = -1), which is exactly the Pauli-Z operation."
)

improved["q-qml-kp2-1"] = (
    "Step 1 — Apply H to qubit 1 (initially |0\\\\rangle):\\n"
    "\\\\[\\n"
    "H|0\\\\rangle = \\\\frac{|0\\\\rangle + |1\\\\rangle}{\\\\sqrt{2}} = |+\\\\rangle.\\n"
    "\\\\]\\n"
    "The two-qubit state is |+\\\\rangle \\\\otimes |0\\\\rangle = \\\\frac{|00\\\\rangle + |10\\\\rangle}{\\\\sqrt{2}}.\\n\\n"
    "Step 2 — Apply CNOT with qubit 1 as control and qubit 2 as target.  CNOT flips the target iff the control is |1\\\\rangle:\\n"
    "\\\\[\\n"
    "|00\\\\rangle \\\\to |00\\\\rangle, \\\\qquad |10\\\\rangle \\\\to |11\\\\rangle.\\n"
    "\\\\]\\n"
    "The final state is therefore \\\\frac{|00\\\\rangle + |11\\\\rangle}{\\\\sqrt{2}}, the Bell state |\\\\Phi^+\\\\rangle."
)

improved["q-qml-kp2-2"] = (
    "Gates acting on disjoint (non-overlapping) qubits commute and can be executed simultaneously on most quantum hardware.  This parallelism is explicitly used to minimise circuit depth — the critical metric for hardware where decoherence limits how many sequential operations can be performed.  Only gates that share a qubit must respect their ordering."
)

improved["q-qml-kp2-3"] = (
    "In the computational basis \\\\{|00\\\\rangle, |01\\\\rangle, |10\\\\rangle, |11\\\\rangle\\\\}, CNOT is defined by which target state results from each two-qubit input:\\n\\n"
    "  - |00\\\\rangle \\\\to |00\\\\rangle  (control = 0, no flip)\\n"
    "  - |01\\\\rangle \\\\to |01\\\\rangle  (control = 0, no flip)\\n"
    "  - |10\\\\rangle \\\\to |11\\\\rangle  (control = 1, flip)\\n"
    "  - |11\\\\rangle \\\\to |10\\\\rangle  (control = 1, flip)\\n\\n"
    "Columns of the matrix are the output vectors for each input basis state.  The third and fourth columns of the identity are swapped, giving:\\n"
    "\\\\[\\n"
    "\\\\begin{pmatrix} 1&0&0&0 \\\\\\\\ 0&1&0&0 \\\\\\\\ 0&0&0&1 \\\\\\\\ 0&0&1&0 \\\\end{pmatrix}.\\n"
    "\\\\]"
)

improved["q-qml-kp3-1"] = (
    "Bell states are the four maximally entangled two-qubit states:\\n"
    "\\\\[\\n"
    "|\\\\Phi^\\\\pm\\\\rangle = \\\\frac{|00\\\\rangle \\\\pm |11\\\\rangle}{\\\\sqrt{2}}, \\\\qquad |\\\\Psi^\\\\pm\\\\rangle = \\\\frac{|01\\\\rangle \\\\pm |10\\\\rangle}{\\\\sqrt{2}}.\\n"
    "\\\\]\\n"
    r"Option (|00\rangle + |11\rangle)/\sqrt{2} is exactly |\Phi^+\rangle, a Bell state.  All other options are either unentangled (|00\rangle, |01\rangle - |10\rangle) or single-qubit superpositions (|0\rangle + |1\rangle)/\sqrt{2}."
)

improved["q-qml-kp3-2"] = (
    "Entanglement creates non-local correlations — measuring one qubit instantly fixes the other — but this cannot convey information because each party cannot control or predict their individual outcome.  The no-communication theorem proves that without a classical side-channel, no signal can be sent; the statistical correlations alone are insufficient."
)

improved["q-qml-kp3-3"] = (
    "Quantum teleportation works in three steps: (1) Bell measurement on the input qubit and the sender's half of the entangled pair; (2) classical transmission of two measurement bits; (3) unitary correction on the receiver's qubit.  The entanglement provides the non-local correlations, but the classical bits are essential — without them the protocol conveys no quantum state."
)

improved["q-qml-kp4-1"] = (
    "Grover's algorithm uses amplitude amplification to boost the probability of the marked state.  Each iteration increases the amplitude of the target by O(1/\\\sqrt{N}) and decreases others, requiring roughly \\\\sqrt{N} iterations to reach O(1) success probability.  This yields O(\\\\sqrt{N}) query complexity — a quadratic speed-up over classical O(N) linear search."
)

improved["q-qml-kp4-2"] = (
    "Shor's algorithm reduces integer factorisation to period-finding, which the quantum Fourier transform (QFT) solves in polynomial time O((log N)^3).  The best classical algorithms (general number field sieve) run in sub-exponential time ~e^{O((log N)^{1/3} (log log N)^{2/3})}, so Shor gives an exponential speed-up."
)

# Verify no actual newlines in any explanation
for qid, exp in improved.items():
    if '\n' in exp:
        pos = exp.index('\n')
        print(f"ERROR: {qid} has actual newline at pos {pos}")
        print(f"  Context: {repr(exp[max(0,pos-20):pos+20])}")

# Fix explanations using replacement
fixed = 0
failed = []
for qid, new_exp in improved.items():
    qid_pos = content.find(f'id: "{qid}"')
    if qid_pos == -1:
        failed.append(f"{qid}: ID not found")
        continue

    exp_start = content.find('explanation:\n        "', qid_pos)
    if exp_start == -1:
        failed.append(f"{qid}: exp start not found")
        continue

    hints_start = content.find('\n      hints: [', qid_pos)
    if hints_start == -1 or hints_start < exp_start:
        failed.append(f"{qid}: hints start not found")
        continue

    end_pattern = '",\n      hints: ['
    end_pos = content.find(end_pattern, exp_start)
    if end_pos == -1:
        failed.append(f"{qid}: end pattern not found")
        continue

    open_len = len('explanation:\n        "')
    old_exp_full = '"' + content[exp_start + open_len:end_pos] + '",\n      hints: ['
    if old_exp_full not in content:
        print(f"DEBUG {qid}: exact match not found for replacement")
        print(f"  Looking for: {repr(old_exp_full[:100])}")
        failed.append(f"{qid}: exact match not found")
        continue

    new_exp_full = '"' + new_exp + '",\n      hints: ['
    content = content.replace(old_exp_full, new_exp_full, 1)
    fixed += 1
    print(f"Fixed: {qid}")

print(f"\nFixed {fixed}/{len(improved)}")
if failed:
    print(f"Failed: {failed}")
else:
    with open('src/lib/questions/quantum-ml.ts', 'w') as f:
        f.write(content)
    print("File written successfully")
