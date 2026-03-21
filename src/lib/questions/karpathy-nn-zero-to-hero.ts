import { registerQuestions } from "./index";

registerQuestions({
  "derivative-chain-rule": [
    {
      id: "q-k-kp-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the fundamental purpose of the chain rule in backpropagation?",
      options: [
        "To initialize the weights of a neural network.",
        "To recursively calculate local gradients backwards through the computational graph, multiplying them to find the global gradient.",
        "To define the architecture of a multi-layer perceptron.",
        "To perform matrix multiplication between the inputs and weights.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recall that the chain rule states that for a composite function $f(x) = g(h(x))$, the derivative with respect to $x$ is the product of the outer function's derivative evaluated at the inner function times the inner function's derivative.\n" +
        "\n**Step 2:** In backpropagation, we apply this principle recursively. The error signal from the output flows backward through the computational graph, and at each node we multiply the upstream gradient by the local gradient of that operation.\n" +
        "\n**Step 3:** This process repeats until we reach the input weights, with each gradient being the product of all local gradients along the path from the loss to that weight.",
      hints: [
        "Think about how calculus handles derivatives of composed functions.",
        "The gradient of the loss with respect to an early parameter must travel through every operation in between.",
      ],
    },
    {
      id: "q-k-kp-1-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "If f(x) = g(h(x)), what does the chain rule say about df/dx?",
      options: [
        "df/dx = dg/dx + dh/dx",
        "df/dx = (dg/dh) * (dh/dx)",
        "df/dx = dg/dh / dh/dx",
        "df/dx = dg/dx * dh/dx",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The chain rule states that for a composed function $f(x) = g(h(x))$, the derivative with respect to $x$ is: $\\frac{df}{dx} = \\frac{dg}{dh} \\cdot \\frac{dh}{dx}$.\n" +
        "\n**Step 2:** The derivative of the outer function $g$ evaluated at $h(x)$, multiplied by the derivative of the inner function $h$ with respect to $x$.\n" +
        "\n**Step 3:** This is the fundamental mechanism by which gradients flow backwards through computational graphs in neural networks.",
      hints: [
        "The chain rule multiplies derivatives along the chain of compositions.",
        "Each intermediate variable contributes its own local derivative.",
      ],
    },
    {
      id: "q-k-kp-1-c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's Micrograd, when computing backprop for an addition node z = x + y, what is dz/dx?",
      options: ["0", "y", "1", "x"],
      correctAnswer: 2,
      explanation:
        "**Step 1:** Consider the function $z = x + y$. To find $\frac{dz}{dx}$, treat $y$ as a constant (since $y$ does not depend on $x$).\n" +
        "\n**Step 2:** Differentiating gives $\frac{dz}{dx} = \frac{d}{dx}(x + y) = 1 + 0 = 1$.\n" +
        "\n**Step 3:** This means the gradient from the output is passed through unchanged to $x$ (and also to $y$). This is why addition nodes fan out gradients equally to all their inputs.",
      hints: [
        "Differentiate x + y with respect to x treating y as a constant.",
        "The local gradient of addition with respect to each input is always 1.",
      ],
    },
    {
      id: "q-k-kp-1-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When computing the backward pass for z = x * y, what gradient does x receive (in terms of the upstream gradient dL/dz)?",
      options: [
        "dL/dz * x",
        "dL/dz * y",
        "dL/dz / y",
        "dL/dz + y",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The chain rule gives dL/dx = (dL/dz) * (dz/dx). For z = x * y, we have dz/dx = y.\n\n**Step 2:** So dL/dx = dL/dz * y. The local gradient for x is y, multiplied by the upstream gradient.\n\n**Step 3:** Symmetrically, y receives gradient dL/dz * x, since dz/dy = x.",
      hints: [
        "Apply the chain rule: upstream gradient times local gradient.",
        "The local gradient of x*y with respect to x is just y.",
      ],
    },
    {
      id: "q-k-kp-1-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the derivative of tanh(x) with respect to x, expressed in terms of tanh(x) itself?",
      options: [
        "tanh(x)",
        "1 - tanh(x)",
        "1 - tanh(x)^2",
        "tanh(x) * (1 - tanh(x))",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** The derivative of tanh(x) is 1 - tanh^2(x), also written as sech^2(x).\n\n**Step 2:** This is why in Micrograd's backward pass, Karpathy writes `self.grad += (1 - t**2) * out.grad` where t = out.data.\n\n**Step 3:** The gradient uses the already-computed forward value t, requiring no extra computation.",
      hints: [
        "This is the standard calculus derivative of the hyperbolic tangent.",
        "It can be re-expressed using the output value itself, which is convenient for backprop.",
      ],
    },
    {
      id: "q-k-kp-1-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Micrograd, why must you accumulate gradients with `+=` rather than `=` when implementing the backward function of a node?",
      options: [
        "Because Python does not support direct assignment in closures.",
        "Because a variable can be used in multiple places in the graph, and each use contributes an additive gradient term.",
        "Because `=` would reset the running mean.",
        "Because `+=` is faster on modern hardware.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** If a value node is used more than once (e.g., x in both x*y and x*z), each usage path contributes to x.grad.\n\n**Step 2:** Using `=` would overwrite one path's gradient with another, losing contributions.\n\n**Step 3:** Using `+=` accumulates both contributions correctly, giving the total derivative.",
      hints: [
        "Think about what happens when a variable appears multiple times in a computational graph.",
        "Calculus: the total derivative sums contributions from all paths.",
      ],
    },
    {
      id: "q-k-kp-1-g",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the gradient of the ReLU activation function f(x) = max(0, x) with respect to x?",
      options: [
        "Always 1.",
        "1 if x > 0, and 0 if x <= 0.",
        "x if x > 0, and 0 otherwise.",
        "0.5 for all x.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** ReLU is defined as f(x) = max(0, x). When x > 0, f'(x) = 1 (gradient passes through unchanged).\n\n**Step 2:** When x <= 0, f(x) = 0 and f'(x) = 0 (gradient is clamped to zero).\n\n**Step 3:** This piecewise linear nature makes ReLU computationally efficient and avoids the saturation problem of sigmoid/tanh in the positive region.",
      hints: [
        "Differentiate max(0, x) piecewise: one piece for x > 0, one for x < 0.",
        "The gradient at x = 0 is technically undefined but conventionally set to 0 in practice.",
      ],
    },
  ],
  "computational-graphs": [
    {
      id: "q-k-kp-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How does an autograd engine (like Micrograd) represent a mathematical expression?",
      options: [
        "As a continuous function in memory.",
        "As a string of text that is parsed at runtime.",
        "As a Directed Acyclic Graph (DAG) where nodes are values and edges are operations.",
        "As a single dense tensor.",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** Autograd engines dynamically build a Directed Acyclic Graph (DAG) during the forward pass.\n\n**Step 2:** The DAG links scalar values or tensors with the operations that produced them.\n\n**Step 3:** This graph enables reverse-mode differentiation - traversing the graph backward to compute gradients via the chain rule.",
      hints: [
        "Nodes store the value and its children; edges encode which operation created it.",
        "DAG means no cycles - gradients can flow backwards without looping.",
      ],
    },
    {
      id: "q-k-kp-2-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's Value class (Micrograd), what information does each node store besides its scalar data value?",
      options: [
        "Only the learning rate.",
        "Its gradient, the set of child nodes (_children), and the backward function (_backward).",
        "The entire training dataset.",
        "The network architecture string.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Each Value node stores `data` - the forward pass scalar value.\n\n**Step 2:** It stores `grad` (gradient initialized to 0), `_prev` (set of input nodes), and `_backward` (closure that propagates gradients).\n\n**Step 3:** This self-contained structure enables automatic differentiation - each node knows how to compute and propagate its local gradient backward.",
      hints: [
        "The _backward closure is set at creation time by each operation's implementation.",
        "grad starts at 0 and is accumulated during the backward pass.",
      ],
    },
    {
      id: "q-k-kp-2-c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is the computational graph called 'dynamic' in PyTorch (eager mode) compared to TensorFlow 1.x's 'static' graphs?",
      options: [
        "Because PyTorch graphs change automatically during inference.",
        "Because PyTorch builds the graph on-the-fly during each forward pass, so the graph can differ between calls (e.g., based on if-else control flow).",
        "Because the graph is stored on the GPU dynamically.",
        "Because the weights change the graph structure after every update.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** In dynamic (define-by-run) frameworks, the computational graph is re-created every forward pass.\n\n**Step 2:** The graph structure is based on actual Python control flow at runtime.\n\n**Step 3:** This makes debugging natural and allows data-dependent architectures like RNNs with variable-length sequences.",
      hints: [
        "Think about how Python if/for statements interact with the graph construction.",
        "Contrast with TF1 where you first define a static graph, then feed data into a session.",
      ],
    },
    {
      id: "q-k-kp-2-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does calling `.backward()` on the final loss node in Micrograd trigger?",
      options: [
        "It resets all gradients to zero.",
        "It runs a topological sort and then calls each node's _backward function in reverse order, propagating gradients.",
        "It reinitialises the network weights.",
        "It performs another forward pass to verify the output.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Calling `.backward()` on the output node seeds the loss's own gradient to 1.0.\n\n**Step 2:** It performs a topological sort of the DAG to determine the correct order.\n\n**Step 3:** It iterates in reverse topological order, calling `_backward` on each node to propagate gradients to its parents.",
      hints: [
        "The loss node is the root; gradients flow from root to leaves.",
        "Topological sort ensures parents receive gradients after all their children have been processed.",
      ],
    },
    {
      id: "q-k-kp-2-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a computational graph, what is the key difference between a 'leaf' node and an 'intermediate' node?",
      options: [
        "Leaf nodes are always scalars; intermediate nodes are always tensors.",
        "Leaf nodes have no parent inputs (they are model parameters or inputs), while intermediate nodes are results of operations on other nodes.",
        "Leaf nodes have zero gradient; intermediate nodes have non-zero gradients.",
        "Leaf nodes are only on GPUs; intermediate nodes live on CPU.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Leaf nodes are the inputs to the graph - model weights, biases, or input data.\n\n**Step 2:** They have no `_children` because they are not produced by any operation.\n\n**Step 3:** Gradients accumulate at leaf nodes via `+=`, and these are the parameters that the optimizer updates during training.",
      hints: [
        "In PyTorch, leaf tensors are those created directly by the user (not as the result of an operation).",
        "Only leaf tensors retain their gradients by default after .backward().",
      ],
    },
    {
      id: "q-k-kp-2-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What happens to memory efficiency when you call `.backward()` after a very long forward pass without using gradient checkpointing?",
      options: [
        "Memory usage is constant because gradients overwrite forward activations.",
        "All intermediate activations from the forward pass must be kept in memory for use during backward, so memory scales with sequence/depth.",
        "The backward pass uses no memory beyond the model weights.",
        "PyTorch automatically frees intermediate activations after each layer.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** During forward, every intermediate value needed for gradient computation is stored on the graph.\n\n**Step 2:** For deep or long-sequence models, this is a significant memory cost.\n\n**Step 3:** Gradient checkpointing trades recomputation for memory by discarding and recomputing intermediate activations.",
      hints: [
        "The backward function closures hold references to the input tensors they need.",
        "This is one motivation for techniques like gradient checkpointing in large models.",
      ],
    },
    {
      id: "q-k-kp-2-g",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In PyTorch, what does `torch.no_grad()` do to the computational graph?",
      options: [
        "It deletes the model weights.",
        "It disables gradient tracking, so no backward graph is built during the forward pass.",
        "It forces the model to run on CPU.",
        "It doubles the inference speed by skipping all activations.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Inside a `with torch.no_grad():` block, PyTorch does not record operations into the autograd graph.\n\n**Step 2:** This means no backward graph is built during the forward pass.\n\n**Step 3:** It reduces memory usage and speeds up inference since no backward computation is needed.",
      hints: [
        "Use torch.no_grad() during evaluation or inference loops.",
        "Without it, every forward pass builds a graph that is never used during inference, wasting memory.",
      ],
    },
  ],
  "topological-sort-autograd": [
    {
      id: "q-k-kp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is topological sort necessary during backpropagation in a computational graph?",
      options: [
        "To sort the dataset before training.",
        "To ensure that the gradient for a node is only calculated after all nodes that depend on it have calculated their gradients.",
        "To arrange the neurons in a layer by their activation values.",
        "To speed up the forward pass by skipping zero weights.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** In a DAG, a node's gradient depends on the gradients of the nodes it outputs to.\n\n**Step 2:** A topological sort orders all nodes so that every node appears after all the nodes that depend on it.\n\n**Step 3:** Reversing this order gives the correct backward traversal for gradient propagation.",
      hints: [
        "A node's gradient is the sum of contributions from all nodes it feeds into.",
        "Topological order means every node appears after all its dependencies.",
      ],
    },
    {
      id: "q-k-kp-3-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's Micrograd implementation, how is topological sort typically implemented?",
      options: [
        "Using a breadth-first search from the output node.",
        "Using a recursive depth-first search that appends nodes to a list after visiting all children.",
        "By sorting nodes alphabetically by their label.",
        "By sorting nodes by their data values.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A DFS-based topological sort visits a node's children first.\n\n**Step 2:** After visiting all descendants, the node itself is appended to the order list.\n\n**Step 3:** Reversing this list gives the correct topological order from output to inputs for backpropagation.",
      hints: [
        "Post-order DFS naturally produces a reverse topological ordering.",
        "Karpathy tracks visited nodes in a set to avoid processing duplicates.",
      ],
    },
    {
      id: "q-k-kp-3-c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why must a computational graph be acyclic (the 'A' in DAG) for backpropagation to work correctly?",
      options: [
        "Cycles would make the graph too large to store in memory.",
        "Cycles would create infinite loops during the topological sort and gradient propagation.",
        "Cyclic graphs cannot represent mathematical operations.",
        "Cycles are only a problem in TensorFlow, not PyTorch.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** If the graph had a cycle, topological sort would not terminate.\n\n**Step 2:** Gradients would loop back and accumulate indefinitely during backpropagation.\n\n**Step 3:** Acyclicity guarantees a well-defined order and finite gradient computation.",
      hints: [
        "Try running DFS on a graph with a cycle - what happens?",
        "Feedforward networks are acyclic by design; RNNs are unrolled to be acyclic.",
      ],
    },
    {
      id: "q-k-kp-3-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a topologically sorted graph for backprop, which node should have its gradient seeded to 1.0 first?",
      options: [
        "The first input node (e.g., x).",
        "A randomly selected intermediate node.",
        "The final output node (the loss).",
        "The node with the largest data value.",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** dL/dL = 1.0 by definition - the derivative of any quantity with respect to itself is 1.\n\n**Step 2:** We seed the loss node's gradient to 1.0 and then propagate backwards through the graph.\n\n**Step 3:** This is how reverse-mode autodiff (backpropagation) starts.",
      hints: [
        "The derivative of a quantity with respect to itself is always 1.",
        "Backprop flows from the loss backward through the graph.",
      ],
    },
    {
      id: "q-k-kp-3-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What would go wrong if you ran the _backward functions in forward topological order (from inputs to outputs) instead of reverse order?",
      options: [
        "The gradients would be correct but computed twice as slowly.",
        "Node gradients would be computed before upstream gradients are complete, giving incorrect partial (or zero) gradients.",
        "The graph would be modified during traversal.",
        "Only the leaf nodes would receive gradients.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** In backpropagation, each node's `_backward` needs the already-computed gradient of its output node(s).\n\n**Step 2:** In forward topological order, the output node's gradient hasn't been accumulated yet (still 0).\n\n**Step 3:** This means gradients written to inputs are incorrect or zero, leading to wrong parameter updates.",
      hints: [
        "Each _backward reads `out.grad` and writes to its children's `.grad`.",
        "If out.grad is 0 when _backward runs, the chain rule product is 0.",
      ],
    },
    {
      id: "q-k-kp-3-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does Karpathy handle the case where a Value node is used multiple times as an input (e.g., x * x)?",
      options: [
        "He creates a copy of the node to avoid gradient aliasing.",
        "He uses `=` instead of `+=` in the backward function.",
        "He relies on `+=` gradient accumulation so both usages contribute to x.grad correctly.",
        "He raises a ValueError because repeated use is not supported.",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** When x appears as both operands in x * x, the backward of multiply fires once but needs to contribute two gradient terms.\n\n**Step 2:** This is because dz/dx = 2x in z = x^2, so both paths through the graph contribute to x.grad.\n\n**Step 3:** Since `.grad` is accumulated with `+=`, both contributions are added correctly.",
      hints: [
        "For z = x^2, dz/dx = 2x. Both paths through the graph contribute x each.",
        "Using `=` would only record one path's contribution, losing the other.",
      ],
    },
    {
      id: "q-k-kp-3-g",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's Micrograd, what does the `_op` string stored on a Value node represent?",
      options: [
        "The name of the Python variable holding the value.",
        "The operation (such as '+', '*', 'tanh') that produced this node from its children.",
        "The gradient accumulated so far.",
        "The index of the node in the topological order.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** `_op` is a human-readable label used for visualization (e.g., with Graphviz).\n\n**Step 2:** It records which operation (such as '+', '*', 'tanh') created this node.\n\n**Step 3:** This makes it easy to debug and display the computational graph structure.",
      hints: [
        "Karpathy uses _op only for visualization; it has no effect on computation.",
        "Leaf nodes (weights, inputs) have _op = '' since they were not created by an operation.",
      ],
    },
  ],
  "neuron-implementation": [
    {
      id: "q-k-kp-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a standard artificial neuron, what mathematical operation immediately follows the dot product of the weights and inputs (plus bias)?",
      options: [
        "A non-linear activation function, like Tanh or ReLU.",
        "A linear transformation.",
        "Batch Normalization.",
        "A softmax operation.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** A neuron computes w*x + b (dot product of weights and inputs plus bias).\n\n**Step 2:** This pre-activation value is passed through a non-linear activation function (e.g., Tanh).\n\n**Step 3:** This non-linearity allows the network to learn complex, non-linear representations that a single linear transformation could not capture.",
      hints: [
        "Without the non-linearity, stacking layers would still be a linear model.",
        "Activation functions introduce the non-linearity needed to learn complex functions.",
      ],
    },
    {
      id: "q-k-kp-4-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's Micrograd Neuron class, how are the weights initialized?",
      options: [
        "All to zero.",
        "All to one.",
        "Randomly from a uniform distribution (e.g., random.uniform(-1, 1)).",
        "Using Glorot/Xavier initialization from PyTorch.",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** Karpathy initializes each weight as `Value(random.uniform(-1, 1))` in the Neuron constructor.\n\n**Step 2:** Random initialization breaks symmetry so neurons learn different features.\n\n**Step 3:** Zero initialization would make all neurons identical since they would all receive the same gradients.",
      hints: [
        "Zero initialization is a common mistake - all neurons would have identical gradients and learn nothing different.",
        "Symmetry breaking requires at least random initialization.",
      ],
    },
    {
      id: "q-k-kp-4-c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's MLP class built with Micrograd, what does the `parameters()` method return?",
      options: [
        "Only the biases of all neurons.",
        "A list of all learnable Value objects (weights and biases) across all layers.",
        "The number of layers in the network.",
        "The gradient values of the final layer.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** `parameters()` recursively collects all Value objects from every Neuron in every Layer in the MLP.\n\n**Step 2:** It returns a list of all learnable parameters (weights and biases) across the network.\n\n**Step 3:** This list is iterated during gradient descent to update each parameter: `p.data -= lr * p.grad`.",
      hints: [
        "The optimizer needs to know which values to update.",
        "It mirrors PyTorch's `model.parameters()` which returns an iterator of all learnable tensors.",
      ],
    },
    {
      id: "q-k-kp-4-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why must you zero out the gradients (set `.grad = 0`) before each backward pass when training in a loop?",
      options: [
        "Because gradients are automatically set to None after each backward pass.",
        "Because gradients accumulate with `+=`, so without zeroing they would compound across multiple backward passes.",
        "Because the optimizer requires zero-initialized gradients to function.",
        "Because zeroing prevents the learning rate from being too large.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Each `.backward()` call adds to `.grad` via `+=`.\n\n**Step 2:** Running `.backward()` twice without zeroing doubles the gradients.\n\n**Step 3:** Always zero gradients with `.grad = 0` before each new backward pass.",
      hints: [
        "In PyTorch, this is `optimizer.zero_grad()` or `model.zero_grad()`.",
        "In Micrograd, Karpathy manually loops over parameters and sets `.grad = 0`.",
      ],
    },
    {
      id: "q-k-kp-4-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What would happen if you used a linear activation function (i.e., f(x) = x, identity) for every neuron in an MLP?",
      options: [
        "Training would be faster but less accurate.",
        "The entire MLP would collapse to a single linear transformation, no matter how many layers are stacked.",
        "Each layer would independently learn different features.",
        "Backpropagation would fail due to vanishing gradients.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A composition of linear functions is still a linear function: W2 * (W1 * x) = (W2 W1) * x.\n\n**Step 2:** Any depth of linear layers is representationally equivalent to a single matrix multiplication.\n\n**Step 3:** Non-linear activation functions break this linearity, making depth useful.",
      hints: [
        "Linear maps composed are still linear maps.",
        "This is why activation functions are not optional in deep learning.",
      ],
    },
    {
      id: "q-k-kp-4-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a Micrograd neuron forward pass, `act = (e2x - 1) / (e2x + 1)` implements tanh via the exponential formula. What is a potential numerical issue with this compared to using `math.tanh` directly?",
      options: [
        "It produces the wrong mathematical result for all inputs.",
        "It can suffer from overflow when the input is very large (e2x becomes inf), while math.tanh handles this gracefully.",
        "It is not differentiable.",
        "It only works for positive inputs.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Computing exp(2x) for large x causes floating-point overflow to inf.\n\n**Step 2:** Dividing inf-1 by inf+1 gives NaN in floating-point arithmetic.\n\n**Step 3:** Built-in tanh implementations use numerically stable algorithms (like the one Karpathy derives) to avoid this issue.",
      hints: [
        "Python floats overflow to inf at around exp(709).",
        "Karpathy notes this in the lectures as a motivation for numerical stability in frameworks.",
      ],
    },
    {
      id: "q-k-kp-4-g",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's Micrograd MLP, why does the `Neuron.__call__` method return a scalar Value rather than a tensor?",
      options: [
        "Because Micrograd is designed to work only with scalars, building up scalar-level computation graphs.",
        "Because tensors are not supported in Python.",
        "Because scalar Values are faster than tensors on modern GPUs.",
        "Because the output must always be between -1 and 1.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Micrograd operates on individual scalar values to build intuition for autograd.\n\n**Step 2:** Every number in the computation is a Value object that builds up a computational graph.\n\n**Step 3:** Real frameworks like PyTorch operate on tensors for efficiency, but the autograd machinery is conceptually identical.",
      hints: [
        "Micrograd is pedagogical - it trades efficiency for clarity.",
        "PyTorch's autograd works the same way but on entire tensors at once.",
      ],
    },
  ],
  "gradient-descent-basics": [
    {
      id: "q-k-kp-5",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the context of training a neural network, what does the learning rate control?",
      options: [
        "The number of epochs.",
        "The amount of data in each batch.",
        "The step size taken in the direction of the negative gradient during weight updates.",
        "The architecture of the network.",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** The learning rate is a hyperparameter that scales the gradient.\n\n**Step 2:** It determines the step size taken in the direction of the negative gradient during weight updates.\n\n**Step 3:** A well-chosen learning rate enables efficient convergence to a local minimum without overshooting.",
      hints: [
        "Too high: the loss oscillates or diverges. Too low: training is painfully slow.",
        "The update rule is: param -= learning_rate * param.grad",
      ],
    },
    {
      id: "q-k-kp-5-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's Micrograd training loop, the parameter update rule is `p.data -= learning_rate * p.grad`. Why is there a minus sign?",
      options: [
        "Because loss is always negative.",
        "Because we want to move in the direction that decreases the loss, which is opposite to the gradient direction.",
        "Because it is a convention with no mathematical meaning.",
        "Because the gradient is always negative.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The gradient points in the direction of steepest ascent of the loss.\n\n**Step 2:** To minimize the loss, we move in the opposite direction.\n\n**Step 3:** Hence we subtract the gradient (scaled by learning rate) from the parameters: `param -= lr * param.grad`.",
      hints: [
        "Gradient ascent adds the gradient; gradient descent subtracts it.",
        "We are minimizing the loss function, so we go opposite to the gradient.",
      ],
    },
    {
      id: "q-k-kp-5-c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the difference between Stochastic Gradient Descent (SGD) and full-batch Gradient Descent?",
      options: [
        "SGD uses momentum; batch GD does not.",
        "SGD computes the gradient on a single (or small mini-batch) example per step; batch GD uses the entire dataset for each gradient step.",
        "Batch GD always converges faster to a better minimum.",
        "SGD can only be used for classification tasks.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Full-batch GD computes the exact gradient but is very slow per update.\n\n**Step 2:** SGD and minibatch SGD compute noisy but cheap gradient estimates.\n\n**Step 3:** Many more updates in the same time typically leads to faster practical convergence despite the noise.",
      hints: [
        "The 'S' in SGD stands for Stochastic - gradient is estimated from random subsets.",
        "More frequent but noisier updates often beat infrequent exact updates.",
      ],
    },
    {
      id: "q-k-kp-5-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "If the loss is not decreasing during training, which of the following is NOT a likely cause?",
      options: [
        "The learning rate is too small.",
        "The gradients are vanishing.",
        "The model has too many layers.",
        "The dataset has too many training examples.",
      ],
      correctAnswer: 3,
      explanation:
        "**Step 1:** Having more training data is generally beneficial for generalization.\n\n**Step 2:** Non-decreasing loss is typically caused by learning rate issues or bugs.\n\n**Step 3:** Other causes include vanishing/exploding gradients and architecture problems.",
      hints: [
        "More data helps generalization; it does not prevent the loss from decreasing.",
        "Debugging non-decreasing loss: check learning rate, gradient magnitudes, and code correctness first.",
      ],
    },
    {
      id: "q-k-kp-5-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does Karpathy suggest using a loss function like mean squared error (MSE) first when debugging a neural network, before switching to cross-entropy?",
      options: [
        "Because MSE is always a better loss function than cross-entropy.",
        "Because MSE gives interpretable units (e.g., average squared error), making it easier to sanity-check whether gradients are flowing correctly.",
        "Because cross-entropy does not support backpropagation.",
        "Because MSE is numerically more stable for all tasks.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** When debugging, MSE is easy to reason about - loss near zero means predictions are close to targets.\n\n**Step 2:** Cross-entropy with softmax is more numerically complex.\n\n**Step 3:** Starting simple helps isolate whether the backprop implementation is correct before adding complexity.",
      hints: [
        "Karpathy emphasizes building intuition by starting simple.",
        "If MSE does not decrease, there is likely a bug in the forward or backward pass.",
      ],
    },
    {
      id: "q-k-kp-5-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the 'loss landscape' and why does the shape of the landscape matter for gradient descent?",
      options: [
        "It is a plot of model architecture decisions; a flat landscape means few hyperparameters.",
        "It is the surface defined by the loss as a function of all model parameters; its geometry (curvature, saddle points, local minima) determines how easily gradient descent converges.",
        "It is the distribution of training loss values across different datasets.",
        "It refers to the GPU memory layout used to store the loss tensor.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The loss landscape is a high-dimensional surface over the parameter space.\n\n**Step 2:** Its geometry (curvature, saddle points, local minima) determines how easily gradient descent converges.\n\n**Step 3:** Overparameterized networks tend to have surprisingly benign landscapes, contributing to their trainability.",
      hints: [
        "Visualizing a 2D slice of the loss landscape (loss vs. one or two parameters) can build intuition.",
        "Sharp minima tend to generalize worse than flat minima.",
      ],
    },
    {
      id: "q-k-kp-5-g",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "After computing the backward pass, what is the correct formula for updating a parameter p using gradient descent with learning rate lr?",
      options: [
        "p.data = p.data + lr * p.grad",
        "p.data -= lr * p.grad",
        "p.data = p.grad / lr",
        "p.grad -= lr * p.data",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Gradient descent moves parameters in the direction that reduces the loss.\n\n**Step 2:** We subtract the gradient (scaled by learning rate) from the current parameter value.\n\n**Step 3:** `p.data -= lr * p.grad` is the standard in-place update used in Karpathy's Micrograd training loop.",
      hints: [
        "Subtraction because we move against the gradient (descent, not ascent).",
        "lr scales how large a step we take; too large causes divergence, too small is slow.",
      ],
    },
  ],
  "character-level-lm": [
    {
      id: "q-k-kp-6",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a character-level language model, what constitutes the model's vocabulary?",
      options: [
        "A dictionary of common English words.",
        "The unique set of characters present in the training dataset.",
        "Syllables and phonemes.",
        "Sub-word tokens like Byte-Pair Encoding.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A character-level model treats individual characters (like 'a', 'b', '\n') as its atomic units.\n\n**Step 2:** The vocabulary consists of all unique characters in the training data.\n\n**Step 3:** The model predicts the next character in a sequence, learning the distribution over character sequences.",
      hints: [
        "The vocabulary is built from `sorted(set(''.join(words)))` over the training corpus.",
        "For English names, this is typically 26 letters plus a special start/end token.",
      ],
    },
    {
      id: "q-k-kp-6-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's makemore series, what special token is typically added to mark the beginning and end of a word?",
      options: [
        "A space character ' '.",
        "A period '.'.",
        "A dot-slash token './'.",
        "An underscore '_'.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Karpathy uses the period '.' as both the start and end-of-sequence marker.\n\n**Step 2:** The model learns to start generating after '.' and stop when it predicts '.' again.\n\n**Step 3:** This provides natural boundaries for generated sequences.",
      hints: [
        "This simplifies the model - one token serves dual duty as start and stop.",
        "In the bigram matrix, the '.' row gives the probability of each character being the first character.",
      ],
    },
    {
      id: "q-k-kp-6-c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When generating new names from a trained character-level language model, what does the sampling process look like?",
      options: [
        "Pick the character with the highest probability at every step (greedy decoding).",
        "Sample the next character from the probability distribution output by the model, then feed it back as input, repeating until the end token is generated.",
        "Generate all characters in parallel using the full context.",
        "Randomly pick any character from the vocabulary without using the model.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Autoregressive generation samples from P(next_char | context) using `torch.multinomial`.\n\n**Step 2:** The sampled character is fed back as the new input for the next step.\n\n**Step 3:** This process repeats until the end token is generated, producing diverse outputs.",
      hints: [
        "Greedy decoding (argmax) often produces repetitive outputs.",
        "torch.multinomial samples from a categorical distribution defined by the probability tensor.",
      ],
    },
    {
      id: "q-k-kp-6-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the makemore bigram model, how is the training loss computed given the probability assigned to the actual next character?",
      options: [
        "Mean squared error between the one-hot target and the predicted probability.",
        "Negative log likelihood: take the log of the assigned probability and negate it, averaged over all training pairs.",
        "Binary cross-entropy between each character pair.",
        "Hinge loss based on the rank of the correct character.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** For each bigram (context, target), the model assigns a probability to the target.\n\n**Step 2:** The loss is -log(prob_of_target), averaged across the dataset.\n\n**Step 3:** A perfect model assigns probability 1.0, giving log(1) = 0 and total loss = 0.",
      hints: [
        "Lower NLL means the model assigns higher probability to the correct next character.",
        "The average NLL over the dataset is equivalent to the cross-entropy loss.",
      ],
    },
    {
      id: "q-k-kp-6-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the theoretical minimum average NLL loss for a bigram model trained on a dataset where each bigram is equally likely among 27 possible next characters?",
      options: [
        "0.0",
        "log(27) \\approx 3.296",
        "1/27 \\approx 0.037",
        "27.0",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** If each of 27 characters is equally likely, the model assigns probability 1/27 to each.\n\n**Step 2:** The NLL per character is -log(1/27) = log(27) \\approx 3.296.\n\n**Step 3:** This is the baseline 'dumb' model loss; a trained model should beat it.",
      hints: [
        "NLL = -log(probability assigned to correct character).",
        "Uniform probability over 27 characters is 1/27; -log(1/27) = log(27).",
      ],
    },
    {
      id: "q-k-kp-6-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does Karpathy build both a counting-based bigram model AND a neural network bigram model in makemore, if they solve the same task?",
      options: [
        "The neural network version has much lower loss than the counting model.",
        "To show that the neural network framework (embeddings + softmax + NLL loss) is equivalent to the counting model in the bigram case, establishing a conceptual bridge before scaling to more complex MLP models.",
        "Because the counting model cannot generate new names.",
        "Because PyTorch does not support counting-based models.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The neural bigram model converges to the same probabilities as the counting model.\n\n**Step 2:** Karpathy uses this equivalence to show the NN framework is a generalization.\n\n**Step 3:** This bridges conceptual gaps before moving to context-window MLPs.",
      hints: [
        "The weight matrix W in the neural bigram model learns to represent log-counts.",
        "This bridge is pedagogically important: counts are special-case NNs.",
      ],
    },
    {
      id: "q-k-kp-6-g",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the makemore character-level LM, how does Karpathy split the dataset into training, validation, and test sets?",
      options: [
        "He uses 50% train, 25% validation, 25% test.",
        "He uses 80% train, 10% validation, 10% test.",
        "He uses 90% train and 10% test with no validation set.",
        "He uses the entire dataset for training and generates a new test set.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Karpathy splits data into 80% training, 10% validation, and 10% test.\n\n**Step 2:** The validation set is used to tune hyperparameters during development.\n\n**Step 3:** The test set is used only for final evaluation to get an unbiased estimate.",
      hints: [
        "The validation set guides hyperparameter choices; the test set measures final performance.",
        "Looking at test performance during development leads to overfitting to the test set.",
      ],
    },
  ],
  "bigram-counting": [
    {
      id: "q-k-kp-7",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How do you find the empirical probability of a character given the previous character using a pure counting bigram model?",
      options: [
        "By dividing the count of the bigram by the total count of the previous character.",
        "By passing the counts through a linear layer.",
        "By dividing the total vocabulary size by the bigram count.",
        "By taking the log of the count.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** In a pure counting bigram model, P(w2|w1) = count(w1, w2) / count(w1).\n\n**Step 2:** This normalizes raw frequencies of bigrams by the frequency of the context character.\n\n**Step 3:** The result is a proper probability distribution over next characters.",
      hints: [
        "This is simply the definition of conditional probability from counting.",
        "In code: `P = N / N.sum(1, keepdim=True)` where N is the bigram count matrix.",
      ],
    },
    {
      id: "q-k-kp-7-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's makemore, the bigram count matrix N has shape [27, 27]. What do the rows and columns represent?",
      options: [
        "Rows are output characters; columns are input (context) characters.",
        "Rows are input (context) characters; columns are next (output) characters.",
        "Rows are words; columns are characters.",
        "Both rows and columns represent the full vocabulary sorted by frequency.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** N[i, j] counts how many times character j followed character i in the training data.\n\n**Step 2:** Row i contains counts for each possible next character after context character i.\n\n**Step 3:** Normalizing row i by dividing by N[i].sum() gives P(next | context=i).",
      hints: [
        "Accessing N[i] gives a 1D tensor of counts for each possible next character after i.",
        "Normalization: N[i] / N[i].sum() gives P(next | context=i).",
      ],
    },
    {
      id: "q-k-kp-7-c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What PyTorch function does Karpathy use to sample the next character from the probability distribution in the bigram model?",
      options: [
        "torch.argmax()",
        "torch.multinomial()",
        "torch.randint()",
        "torch.sample()",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** `torch.multinomial` samples indices according to a probability distribution.\n\n**Step 2:** Karpathy calls `torch.multinomial(p, num_samples=1, replacement=True)` to sample one character.\n\n**Step 3:** This performs weighted random sampling from the categorical distribution p.",
      hints: [
        "argmax would always pick the single most likely character (greedy), giving repetitive output.",
        "multinomial performs weighted random sampling from a categorical distribution.",
      ],
    },
    {
      id: "q-k-kp-7-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's makemore, how is each word wrapped before processing bigrams?",
      options: [
        "Padded with zeros on both sides.",
        "Surrounded by the special start/end token '.' so bigrams include '.->first_char and last_char->'.'.",
        "Reversed before processing.",
        "Converted to uppercase before processing.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Karpathy prepends and appends '.' to each word (e.g., 'emma' becomes '.emma.').\n\n**Step 2:** This allows the model to learn the distribution over starting characters (from '.') and ending characters (transitioning to '.').\n\n**Step 3:** The '.' character marks natural boundaries for generated sequences.",
      hints: [
        "Without start/end tokens, the model would not know which characters begin or end words.",
        "The '.' character gets index 0 in Karpathy's stoi mapping.",
      ],
    },
    {
      id: "q-k-kp-7-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the key limitation of a bigram model that motivates extending to trigrams, n-grams, or MLP-based models?",
      options: [
        "Bigram models cannot be stored on a GPU.",
        "A bigram model uses only the immediately preceding character as context, missing longer-range dependencies (e.g., the character two positions back).",
        "Bigram models always overfit because they memorize the training data exactly.",
        "Bigram models cannot generate characters with probability less than 0.01.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A bigram model uses only one character of context.\n\n**Step 2:** It cannot capture patterns spanning multiple characters (e.g., 'qu' requires seeing 'q' two steps back).\n\n**Step 3:** Larger context windows (trigrams, MLPs) address this limitation.",
      hints: [
        "The context window of a bigram model is 1. More context usually means better predictions.",
        "This motivates the MLP model in makemore Part 3 (Bengio et al.).",
      ],
    },
    {
      id: "q-k-kp-7-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If you add 1 to all bigram counts before normalizing (Laplace smoothing), how does this affect the probability of an unseen bigram?",
      options: [
        "The unseen bigram probability remains 0.",
        "The unseen bigram gets a small but non-zero probability of 1 / (total_count + vocab_size).",
        "The unseen bigram gets probability 1.0.",
        "Laplace smoothing has no effect on unseen bigrams.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Adding 1 to every count ensures every bigram has count at least 1.\n\n**Step 2:** After normalization, unseen bigrams get probability 1 / (sum_of_counts + vocab_size).\n\n**Step 3:** This avoids infinite NLL from zero-probability bigrams at test time.",
      hints: [
        "Laplace smoothing is also called additive smoothing or add-one smoothing.",
        "The denominator increases by vocab_size because 1 is added to each of the vocab_size possible next characters.",
      ],
    },
    {
      id: "q-k-kp-7-g",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's makemore bigram counting, what does the code `N[stoi[ch1], stoi[ch2]] += 1` accomplish?",
      options: [
        "It subtracts a count from the transition matrix.",
        "It increments the count for the bigram (ch1, ch2) in the 2D count matrix N.",
        "It normalizes row ch1 of the matrix.",
        "It converts character ch2 to its one-hot encoding.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** stoi (string-to-integer) maps each character to its integer index.\n\n**Step 2:** N[stoi[ch1], stoi[ch2]] indexes the cell for bigram (ch1, ch2) in the count matrix.\n\n**Step 3:** `+= 1` records one more occurrence of this character pair.",
      hints: [
        "stoi stands for string-to-integer: a dictionary mapping each character to a unique index.",
        "After counting all bigrams, normalizing each row gives the conditional probability distribution.",
      ],
    },
  ],
  "negative-log-likelihood": [
    {
      id: "q-k-kp-8",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why do we optimize the Negative Log Likelihood (NLL) instead of directly maximizing probabilities?",
      options: [
        "Because probabilities multiply and become vanishingly small, while logs add; NLL turns maximizing a product into minimizing a sum.",
        "Because logs are faster to compute on modern GPUs.",
        "Because NLL acts as a regularization term.",
        "Because maximizing probability directly ignores the ground truth labels.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Multiplying many probabilities (between 0 and 1) leads to numerical underflow.\n\n**Step 2:** Taking the log transforms the product into a sum: log(a * b) = log(a) + log(b).\n\n**Step 3:** Taking the negative turns maximization into minimization: NLL = -log(probabilities).",
      hints: [
        "log(a * b) = log(a) + log(b) - products become sums under log.",
        "Since log is monotonically increasing, maximizing log(prob) is equivalent to maximizing prob.",
      ],
    },
    {
      id: "q-k-kp-8-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What NLL value does a perfect model achieve (one that assigns probability 1.0 to every correct next character)?",
      options: ["infinity", "1.0", "0.0", "-1.0"],
      correctAnswer: 2,
      explanation:
        "**Step 1:** -log(1.0) = 0 because log(1) = 0.\n\n**Step 2:** A perfect model assigns probability 1 to every correct prediction.\n\n**Step 3:** In practice, NLL > 0 for any real model since perfect predictions are impossible.",
      hints: [
        "log(1) = 0, so -log(1) = 0.",
        "NLL = 0 means perfect predictions with complete certainty.",
      ],
    },
    {
      id: "q-k-kp-8-c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What happens to the NLL loss as a model assigns a probability close to 0 to the correct next character?",
      options: [
        "NLL approaches 0.",
        "NLL approaches 1.",
        "NLL approaches infinity.",
        "NLL stays constant.",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** -log(x) as x approaches 0 goes to +infinity.\n\n**Step 2:** Assigning zero probability to a correct token is catastrophic - loss becomes infinite.\n\n**Step 3:** This motivates smoothing techniques and numerical safeguards.",
      hints: [
        "Plot -log(x) for x in (0, 1] to see the behavior.",
        "This is the mathematical reason why we must avoid zero probabilities.",
      ],
    },
    {
      id: "q-k-kp-8-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In PyTorch, which function computes cross-entropy from raw logits (unnormalized scores) directly, without needing a prior softmax call?",
      options: [
        "torch.nn.NLLLoss",
        "torch.nn.BCELoss",
        "torch.nn.functional.cross_entropy",
        "torch.nn.functional.softmax",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** `F.cross_entropy` accepts raw logits and internally applies log-softmax + NLL.\n\n**Step 2:** It uses the log-sum-exp trick for numerical stability.\n\n**Step 3:** You should NOT apply softmax before passing to cross_entropy.",
      hints: [
        "NLLLoss expects log-probabilities (output of log_softmax), not raw logits.",
        "cross_entropy = log_softmax + NLLLoss, done in one stable step.",
      ],
    },
    {
      id: "q-k-kp-8-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How is cross-entropy loss related to KL divergence between the true label distribution and the predicted distribution?",
      options: [
        "Cross-entropy equals KL divergence exactly.",
        "Cross-entropy equals KL divergence plus the entropy of the true distribution, but since the true label is a one-hot, its entropy is 0 so they are equal in that case.",
        "Cross-entropy is the square of the KL divergence.",
        "They are unrelated loss functions.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Cross-entropy is H(p, q) = H(p) + KL(p || q), where H(p) is the entropy.\n\n**Step 2:** When p is one-hot, H(p) = 0, so H(p, q) = KL(p || q).\n\n**Step 3:** Minimizing cross-entropy is equivalent to minimizing KL divergence between true and predicted distributions.",
      hints: [
        "One-hot distributions have zero entropy - they are completely certain.",
        "This connection shows cross-entropy loss has a clean information-theoretic interpretation.",
      ],
    },
    {
      id: "q-k-kp-8-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the neural bigram model (makemore), if the weight matrix W has logits for each input character, what operation converts these logits to probabilities?",
      options: [
        "Sigmoid applied element-wise.",
        "Softmax applied row-wise to normalize logit rows into probability distributions.",
        "ReLU followed by L1 normalization.",
        "The log function applied to the raw counts.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The weight matrix W has shape [27, 27], with each row representing an input character.\n\n**Step 2:** The logits in each row are raw scores for each possible next character.\n\n**Step 3:** Softmax converts these to a valid probability distribution (non-negative, sums to 1).",
      hints: [
        "Softmax: exp(logit_i) / sum(exp(logit_j) for all j).",
        "The output of softmax is always in (0, 1) and sums to exactly 1 per row.",
      ],
    },
    {
      id: "q-k-kp-8-g",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does it mean for a language model to have a perplexity of 27 on a test set with a 27-character vocabulary?",
      options: [
        "The model assigns probability 1 to every correct character - perfect performance.",
        "The model is performing at chance level, equivalent to randomly guessing from all 27 characters equally.",
        "The model is overfit and predicts only the 27 most common characters.",
        "Perplexity of 27 means the model has 27% accuracy.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Perplexity is defined as exp(NLL), where NLL is negative log likelihood.\n\n**Step 2:** A uniform model over 27 characters has NLL = log(27) \\approx 3.296, so perplexity = 27.\n\n**Step 3:** Perplexity 27 means no better than random guessing. Lower perplexity indicates better performance.",
      hints: [
        "Perplexity = exp(cross-entropy loss). Lower is better.",
        "Perplexity can be interpreted as the effective vocabulary size the model is choosing from.",
      ],
    },
  ],
  "smoothing-counts": [
    {
      id: "q-k-kp-9",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the purpose of adding a small constant (like 1) to all bigram counts before calculating probabilities (Laplace Smoothing)?",
      options: [
        "To increase the learning rate.",
        "To ensure no bigram has exactly 0 probability, which would result in an infinite negative log likelihood.",
        "To make the matrix multiplication faster.",
        "To bias the model towards generating longer sequences.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** If a bigram never appeared in training data, its count is 0 and probability is 0.\n\n**Step 2:** During evaluation, log(0) = -infinity causes NaN gradients.\n\n**Step 3:** Adding a small constant ensures all probabilities are non-zero.",
      hints: [
        "Laplace smoothing is one of the simplest forms of regularization.",
        "Larger smoothing values make the distribution more uniform (less confident).",
      ],
    },
    {
      id: "q-k-kp-9-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's makemore, the smoothing operation is `(N + 1).float()` before normalization. What does increasing the smoothing constant from 1 to a large number (e.g., 1000) do to the resulting distribution?",
      options: [
        "Makes the distribution sharper (more confident in common bigrams).",
        "Makes the distribution more uniform (flatter), approaching equal probability for all next characters.",
        "Has no effect because normalization cancels it out.",
        "Increases the NLL loss to infinity.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Adding a very large constant to all counts dominates the actual observed counts.\n\n**Step 2:** After normalization, this approaches 1/27 for every character - a uniform distribution.\n\n**Step 3:** The model 'forgets' the training data and becomes maximally uncertain.",
      hints: [
        "Think of the limit: as smoothing -> infinity, observed counts become negligible.",
        "This is the bias-variance tradeoff: more smoothing = lower variance but higher bias.",
      ],
    },
    {
      id: "q-k-kp-9-c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does Karpathy observe about the NLL loss when comparing a smoothed bigram model to the unsmoothed version on the training set?",
      options: [
        "Smoothing always decreases NLL on the training set.",
        "Smoothing slightly increases NLL on the training set (worse fit) but prevents infinite NLL on unseen bigrams at test time.",
        "Smoothing has no effect on NLL.",
        "Smoothing decreases NLL on training set and test set equally.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Smoothing reduces probability for common bigrams by boosting unseen ones.\n\n**Step 2:** This slightly worsens training NLL but prevents infinite loss on unseen bigrams.\n\n**Step 3:** It trades some training fit for better generalization and numerical stability.",
      hints: [
        "Smoothing is a regularization technique - it trades training fit for better generalization.",
        "Regularization almost always slightly hurts training loss while helping test loss.",
      ],
    },
    {
      id: "q-k-kp-9-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does L2 regularization on the neural network weights relate conceptually to Laplace smoothing on bigram counts?",
      options: [
        "They are completely different - one applies to NNs and the other to counts only.",
        "Both pull the model toward a uniform/default distribution, penalizing extreme or overconfident predictions.",
        "L2 regularization is strictly stronger than Laplace smoothing.",
        "Laplace smoothing is only for count models; L2 regularization is only for continuous weights.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** L2 regularization pushes logit weights toward zero.\n\n**Step 2:** Via softmax, this pushes probabilities toward uniform (1/vocab_size).\n\n**Step 3:** This is analogous to Laplace smoothing - both are forms of regularization.",
      hints: [
        "Karpathy explicitly makes this analogy in the makemore lecture.",
        "Zero logits -> softmax outputs 1/27 for each character = uniform distribution.",
      ],
    },
    {
      id: "q-k-kp-9-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the context of the neural bigram model, what does it mean for the weight matrix W to have logits = 0 for every entry?",
      options: [
        "The model predicts probability 1 for the first character in the vocabulary.",
        "The model outputs a uniform probability distribution (1/27) over all next characters.",
        "The model produces NaN because softmax cannot handle zeros.",
        "The loss is 0 because all logits are equal.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** softmax([0, 0, ..., 0]) = [1/27, 1/27, ..., 1/27] because exp(0) = 1.\n\n**Step 2:** A weight matrix of all zeros produces a uniform distribution.\n\n**Step 3:** This is the maximally uncertain model with loss log(27) \\approx 3.296.",
      hints: [
        "All-zero logits means all exponentiated values are exp(0) = 1, and there are 27 of them.",
        "This is the initialization point for the neural bigram model before training.",
      ],
    },
    {
      id: "q-k-kp-9-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Karpathy's training loop for the neural bigram model, he adds a regularization loss `0.01 * (W**2).mean()`. What is this term doing mathematically?",
      options: [
        "Penalizing large gradients to prevent exploding gradients.",
        "Penalizing large weight values to encourage weights to stay small and the model to stay close to uniform predictions.",
        "Adding noise to the weights for better generalization.",
        "Ensuring the weight matrix stays normalized.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** `(W**2).mean()` computes the mean squared magnitude of the weights.\n\n**Step 2:** Adding it to the loss penalizes large weight values during training.\n\n**Step 3:** This discourages overconfident predictions - the neural analog of Laplace smoothing.",
      hints: [
        "L2 regularization is also known as weight decay.",
        "Large logits -> overconfident softmax outputs; small logits -> uniform outputs.",
      ],
    },
    {
      id: "q-k-kp-9-g",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the simplest interpretation of Laplace smoothing from a Bayesian perspective?",
      options: [
        "It is equivalent to placing a uniform Dirichlet prior over the character transition probabilities.",
        "It is equivalent to doubling the training dataset size.",
        "It removes all zero-count bigrams from consideration.",
        "It applies a Gaussian prior to the model weights.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Adding pseudocounts corresponds to a Dirichlet prior in Bayesian statistics.\n\n**Step 2:** A uniform Dirichlet prior represents the belief that all transitions are equally likely.\n\n**Step 3:** The observed data updates this prior to produce the posterior distribution.",
      hints: [
        "The Dirichlet distribution is the conjugate prior for the categorical/multinomial distribution.",
        "More pseudocounts = stronger prior belief in uniformity.",
      ],
    },
  ],
  "one-hot-encoding": [
    {
      id: "q-k-kp-10",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How is a categorical integer (like a character index) typically represented before being fed into a neural network's linear layer?",
      options: [
        "As a continuous float.",
        "As a one-hot encoded vector.",
        "As an ASCII byte array.",
        "As a base-10 decimal.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Categorical data like character IDs are represented as one-hot vectors.\n\n**Step 2:** A one-hot vector is all zeros with a single '1' at the category index.\n\n**Step 3:** This allows the vector to be multiplied by a weight matrix to select the appropriate row.",
      hints: [
        "One-hot: all zeros except a single 1 at the position corresponding to the category.",
        "In PyTorch: F.one_hot(tensor, num_classes=27).float()",
      ],
    },
    {
      id: "q-k-kp-10-b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "If there are 27 characters in the vocabulary, what is the shape of the one-hot vector for a single character?",
      options: ["(1,)", "(27,)", "(27, 27)", "(1, 27)"],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A one-hot vector for vocabulary size 27 is a 1D tensor of length 27.\n\n**Step 2:** It has a single 1 at the character's index and 0s elsewhere.\n\n**Step 3:** When batched, it becomes shape (batch_size, 27).",
      hints: [
        "The vector length equals the vocabulary size.",
        "Each entry is a binary flag indicating whether that index is the current character.",
      ],
    },
    {
      id: "q-k-kp-10-c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the result of multiplying a one-hot vector (for character index i) by a weight matrix W of shape [27, 27]?",
      options: [
        "The scalar dot product of row i and column i of W.",
        "The i-th row of W, extracted as a vector.",
        "The entire matrix W scaled by 1/27.",
        "A vector of all zeros.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A one-hot vector with 1 at position i, when multiplied by W, zeros out all rows except row i.\n\n**Step 2:** It returns exactly row i of W: e_i @ W = W[i, :].\n\n**Step 3:** This is why embedding lookup is mathematically equivalent to multiplying by a one-hot vector.",
      hints: [
        "e_i @ W = W[i, :] where e_i is the standard basis vector.",
        "This mathematical equivalence is central to understanding embedding layers.",
      ],
    },
    {
      id: "q-k-kp-10-d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why do we call it an 'embedding lookup' rather than 'one-hot matrix multiplication' in modern neural networks?",
      options: [
        "Because embedding lookup has a different mathematical result.",
        "Because embedding lookup is computationally more efficient - it directly indexes a row rather than performing a full (mostly zero) matrix multiplication.",
        "Because one-hot encoding is patent-protected by early deep learning companies.",
        "Because embedding lookup does not require backpropagation.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Mathematically, one-hot multiplication and embedding lookup are identical.\n\n**Step 2:** But indexing `W[i]` is O(embedding_dim) while one-hot multiplication is O(vocab_size * embedding_dim).\n\n**Step 3:** For large vocabularies, the speedup from indexing is enormous.",
      hints: [
        "Multiplying by a sparse one-hot vector does redundant work (multiplying by 0 many times).",
        "PyTorch's nn.Embedding directly implements this efficient indexed lookup.",
      ],
    },
    {
      id: "q-k-kp-10-e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Karpathy's MLP (makemore Part 3), he uses a context window of 3 characters. How does he prepare the input for the MLP from three one-hot encoded characters?",
      options: [
        "He sums the three one-hot vectors element-wise.",
        "He looks up the embedding vector for each character and concatenates the three embedding vectors into a single input vector.",
        "He stacks them as a 3x27 matrix and passes it through a 2D convolution.",
        "He multiplies the three one-hot vectors together element-wise.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Each of the 3 context characters is mapped to a low-dimensional embedding vector.\n\n**Step 2:** These three vectors are concatenated to form the MLP input.\n\n**Step 3:** This allows the network to learn interactions between context characters.",
      hints: [
        "Concatenation preserves positional information; summing would lose it.",
        "If each embedding is 2D and context is 3 chars, the MLP input is 6D (3*2).",
      ],
    },
    {
      id: "q-k-kp-10-f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Karpathy's 2D embedding visualization (makemore Part 3), what do the positions of characters in the 2D embedding space reveal?",
      options: [
        "The ASCII code value of each character.",
        "The frequency of each character in the training data.",
        "Learned similarity structure - characters that appear in similar contexts cluster together.",
        "The order of characters in the alphabet.",
      ],
      correctAnswer: 2,
      explanation:
        "**Step 1:** After training, plotting 2D embeddings reveals learned structure.\n\n**Step 2:** Vowels cluster together because they appear in similar contexts.\n\n**Step 3:** The network learns distributional similarity without being explicitly taught about phonetics.",
      hints: [
        "This is the distributional hypothesis: words/characters in similar contexts have similar meanings/roles.",
        "Karpathy visualizes this with matplotlib scatter plots to build intuition for what embeddings learn.",
      ],
    },
    {
      id: "q-k-kp-10-g",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does using `torch.tensor(X_enc).float()` to create a one-hot encoded input for a large vocabulary cause memory issues compared to using an embedding layer?",
      options: [
        "Because float32 tensors are not supported on GPUs.",
        "Because a one-hot matrix of shape [N, vocab_size] is dense and grows linearly with vocab_size, wasting memory on mostly-zero values that an embedding lookup avoids.",
        "Because one-hot encoding does not support backpropagation.",
        "Because float32 one-hot tensors cannot be multiplied by weight matrices.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** For vocabulary of 50,000 tokens, each one-hot vector would be 50,000 floats.\n\n**Step 2:** A dataset of 1M tokens would require 200GB for inputs alone.\n\n**Step 3:** Embedding lookup stores only the table and accesses by index, using a tiny fraction of the memory.",
      hints: [
        "Large language models use vocabularies of 50K+ tokens - one-hot encoding is infeasible.",
        "nn.Embedding is the standard solution: it stores a lookup table and indexes into it.",
      ],
    },
  ],
  "embedding-lookups": [
    {
      id: "q-k-kp-11",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In PyTorch, what is the mathematical and programmatic equivalent of multiplying a one-hot vector by a weight matrix?",
      options: [
        "Applying a Tanh activation.",
        "Indexing into the rows of the weight matrix, commonly implemented as an Embedding layer.",
        "Performing a convolution operation.",
        "Calculating the cross entropy.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Multiplying a one-hot vector by matrix W extracts row i: e_i @ W = W[i].\n\n**Step 2:** PyTorch's `nn.Embedding` optimizes this by directly indexing into the parameter matrix.\n\n**Step 3:** This is much more efficient than performing the full sparse matrix multiplication.",
      hints: [
        "One-hot @ W = W[i], where i is the non-zero index of the one-hot vector.",
        "nn.Embedding(num_embeddings, embedding_dim) stores a learnable lookup table.",
      ],
    },
  ],
  "hidden-layers": [
    {
      id: "q-k-kp-12",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of the hidden layer (often with a Tanh activation) in the Bengio et al. MLP language model?",
      options: [
        "To count bigrams.",
        "To learn non-linear representations and interactions of the input context characters.",
        "To convert the logits into a probability distribution.",
        "To initialize the weights.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A simple linear model can only learn linear relationships between inputs and outputs.\n\n**Step 2:** The hidden layer combined with a non-linearity allows the network to learn complex, non-linear relationships.\n\n**Step 3:** This enables the network to capture higher-order interactions between context characters.",
      hints: [
        "The hidden layer transforms the concatenated embeddings into a new representation.",
        "Without the non-linearity, the MLP would be equivalent to a single linear layer.",
      ],
    },
  ],
  "pytorch-cross-entropy": [
    {
      id: "q-k-kp-13",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is it generally better to use PyTorch's `F.cross_entropy` instead of manually computing `softmax` followed by `nll_loss`?",
      options: [
        "Because `cross_entropy` has no mathematical relation to softmax.",
        "It is numerically more stable (avoids NaN due to exp(large_numbers)), handles extreme values safely, and is computationally faster due to fused kernels.",
        "It automatically regularizes the model.",
        "It allows you to bypass the backward pass.",
      ],
      correctAnswer: 1,
      explanation:
        "`F.cross_entropy` fuses the log, softmax, and negative log-likelihood operations. By subtracting the maximum logit before exponentiating, it ensures numerical stability, avoiding 'inf' and 'NaN' errors while being highly optimized.",
      hints: [
        "The log-sum-exp trick subtracts max(logits) before exponentiating to prevent overflow.",
        "Using F.cross_entropy directly on logits is always preferred over manual softmax + log + nll.",
      ],
    },
  ],
  minibatches: [
    {
      id: "q-k-kp-14",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why do we typically train neural networks using minibatches rather than the entire dataset at once?",
      options: [
        "To guarantee the exact true gradient is calculated at every step.",
        "To estimate the gradient much faster and update weights more frequently, leading to faster overall convergence despite some noise.",
        "Because it prevents overfitting entirely.",
        "To increase the loss.",
      ],
      correctAnswer: 1,
      explanation:
        "Minibatches provide a noisy but computationally cheap estimate of the true gradient. Taking many small, fast steps generally leads to much faster convergence than taking a single perfectly accurate step that requires scanning the whole dataset.",
      hints: [
        "A minibatch of 32 is 1000x faster to process than a dataset of 32000.",
        "The noise in minibatch gradients can even help escape sharp local minima.",
      ],
    },
  ],
  "learning-rate-decay": [
    {
      id: "q-k-kp-15",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is a common and effective strategy for adjusting the learning rate over the course of training?",
      options: [
        "Starting very low and exponentially increasing it.",
        "Keeping it strictly constant for the entire training run.",
        "Starting with a high learning rate to learn quickly, then decaying it (lowering it) to fine-tune and settle into a local minimum.",
        "Randomly changing it at every step.",
      ],
      correctAnswer: 2,
      explanation:
        "Learning rate decay allows the model to make large updates early on to rapidly descend the loss landscape, and then take smaller, precise steps later to converge smoothly to the bottom of the minimum without overshooting.",
      hints: [
        "Karpathy uses a learning rate finder and step decay in the makemore lectures.",
        "Cosine annealing and step decay are two popular learning rate schedules.",
      ],
    },
  ],
  "kaiming-init": [
    {
      id: "q-k-kp-16",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What specific problem does Kaiming (He) initialization address when applied to deep neural networks with ReLU/Tanh activations?",
      options: [
        "It prevents the network from needing an optimizer.",
        "It preserves the variance of activations across layers, preventing signals from shrinking to zero or exploding.",
        "It zeroes out half the weights to act as dropout.",
        "It replaces the need for a loss function.",
      ],
      correctAnswer: 1,
      explanation:
        "If weights are initialized randomly without proper scaling, the variance of the outputs shrinks or grows exponentially with each layer. Kaiming initialization scales weights by a factor of `sqrt(gain / fan_in)` to maintain a stable variance.",
      hints: [
        "For ReLU, Kaiming uses gain=sqrt(2); for Tanh, gain \\approx 5/3.",
        "fan_in is the number of input connections to a neuron.",
      ],
    },
  ],
  "dead-neurons": [
    {
      id: "q-k-kp-17",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What causes a 'dead' neuron when using the Tanh or ReLU activation functions?",
      options: [
        "When the learning rate is too low.",
        "If the pre-activation value is too extreme, the local gradient becomes zero, and the neuron stops learning completely.",
        "When the batch size is exactly 1.",
        "If the input data contains negative values.",
      ],
      correctAnswer: 1,
      explanation:
        "For ReLU, negative inputs give 0 output and 0 gradient. For Tanh, inputs far from 0 saturate at 1 or -1, where the gradient is completely flat (0). In both cases, if a neuron always hits these flat regions, it receives no gradients to update its weights.",
      hints: [
        "Plot the gradient of tanh - it is highest near 0 and approaches 0 for large |x|.",
        "Karpathy visualizes the fraction of dead neurons using histograms of pre-activations.",
      ],
    },
  ],
  "batch-normalization": [
    {
      id: "q-k-kp-18",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does Batch Normalization conceptually stabilize the training of deep networks?",
      options: [
        "By normalizing the pre-activations of a layer to have zero mean and unit variance across the minibatch, mitigating internal covariate shift.",
        "By ensuring every weight matrix is exactly orthogonal.",
        "By applying a random mask to the inputs.",
        "By normalizing the gradients, not the activations.",
      ],
      correctAnswer: 0,
      explanation:
        "BatchNorm computes the mean and variance of the batch and normalizes the activations. It then applies a learned scale and shift (`gamma` and `beta`), ensuring activations stay in a stable range, which dramatically smooths gradient flow.",
      hints: [
        "BatchNorm reduces sensitivity to weight initialization.",
        "gamma and beta are learned parameters that allow the network to undo the normalization if needed.",
      ],
    },
  ],
  "batchnorm-inference": [
    {
      id: "q-k-kp-19",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does a Batch Normalization layer behave differently during inference compared to training?",
      options: [
        "It acts as a linear projection without bias.",
        "During training, it uses the batch mean/variance; during inference, it uses a running mean/variance calculated during training.",
        "It is completely disabled and skipped during inference.",
        "It uses the exact same batch mean and variance for every single inference request.",
      ],
      correctAnswer: 1,
      explanation:
        "At inference time, you might process a single example (batch size 1), where batch statistics don't make sense. Thus, BatchNorm tracks an exponentially moving average of means and variances during training to use later during inference.",
      hints: [
        "In PyTorch, model.eval() switches BatchNorm to use the stored running stats.",
        "model.train() switches back to using batch statistics.",
      ],
    },
  ],
  "pytorch-hooks": [
    {
      id: "q-k-kp-20",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is a PyTorch forward/backward hook typically used for when debugging a model?",
      options: [
        "To intercept and inspect intermediate activations and gradients as they flow through the network without changing the model code.",
        "To download datasets from the internet.",
        "To plot graphs directly in the terminal.",
        "To bypass the autograd engine and speed up inference.",
      ],
      correctAnswer: 0,
      explanation:
        "Hooks are callback functions you can attach to `nn.Module` objects. They allow you to observe, log, or even modify the tensors passing through the forward or backward passes-excellent for diagnosing vanishing gradients or dead neurons.",
      hints: [
        "register_forward_hook captures the output of a layer during forward pass.",
        "register_backward_hook captures gradients flowing back through a layer.",
      ],
    },
  ],
  "self-attention-math": [
    {
      id: "q-k-kp-21",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "At its core, what is the mathematical self-attention operation computing?",
      options: [
        "A standard Multilayer Perceptron applied to each token independently.",
        "A weighted sum of Value vectors, where the weights are determined by the scaled dot-product between Query and Key vectors.",
        "A spatial convolution over the sequence tokens.",
        "A recurrent state update.",
      ],
      correctAnswer: 1,
      explanation:
        "Self-attention takes Queries, Keys, and Values. It computes an attention matrix by dotting Q and K, scales it, applies softmax, and multiplies it by V, effectively aggregating information from other tokens based on relevance.",
      hints: [
        "Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V",
        "The softmax output weights determine how much each Value vector contributes.",
      ],
    },
  ],
  "causal-masking": [
    {
      id: "q-k-kp-22",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why do we apply a lower-triangular mask (often using `tril`) to the attention scores in an autoregressive language model like GPT?",
      options: [
        "To prevent tokens from 'looking ahead' into the future, ensuring they only attend to previous context.",
        "To reduce the memory footprint by 50%.",
        "To emphasize the diagonal elements.",
        "To make the attention matrix symmetric.",
      ],
      correctAnswer: 0,
      explanation:
        "In autoregressive training, the model predicts the *next* token. If the attention mask didn't block future tokens, the model would simply 'cheat' by looking at the answer during training.",
      hints: [
        "tril(ones(T, T)) creates a lower triangular matrix of 1s.",
        "Future positions are set to -inf before softmax so they get attention weight 0.",
      ],
    },
  ],
  "multi-head-attention": [
    {
      id: "q-k-kp-23",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary benefit of using Multi-Head Attention over a single attention head?",
      options: [
        "It reduces the total number of parameters in the model.",
        "It completely prevents overfitting.",
        "It allows the model to attend to different representation subspaces (e.g., syntax vs semantics) at different positions simultaneously.",
        "It allows the model to process multiple batches at once.",
      ],
      correctAnswer: 2,
      explanation:
        "By splitting the Queries, Keys, and Values into multiple heads, the model can learn multiple independent attention patterns. For instance, one head might look for pronouns, while another looks for rhyming words.",
      hints: [
        "Each head operates on a lower-dimensional projection of Q, K, V.",
        "Outputs of all heads are concatenated and projected back to the model dimension.",
      ],
    },
  ],
  "positional-encoding-gpt": [
    {
      id: "q-k-kp-24",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why do Transformer architectures strictly require positional encodings or embeddings?",
      options: [
        "Because they use RNNs under the hood.",
        "Because the self-attention mechanism is a set operation (permutation equivariant) and has no inherent notion of sequence order.",
        "To regularize the input embeddings.",
        "Because it is required to normalize the data.",
      ],
      correctAnswer: 1,
      explanation:
        "Unlike Recurrent Neural Networks (RNNs) that process tokens sequentially, attention processes all tokens simultaneously. Without adding positional information, the model wouldn't know if a word is at the beginning or end of a sentence.",
      hints: [
        "If you shuffled the input tokens, self-attention without positional encodings would give the same output (just shuffled).",
        "GPT uses learned positional embeddings added to token embeddings.",
      ],
    },
  ],
  "residual-connections": [
    {
      id: "q-k-kp-25",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How do residual (skip) connections primarily help in training deep Transformers?",
      options: [
        "They reduce the sequence length.",
        "They provide a direct 'highway' path for gradients to flow backwards, mitigating the vanishing gradient problem in deep networks.",
        "They act as a substitute for Layer Normalization.",
        "They force the network to output zero.",
      ],
      correctAnswer: 1,
      explanation:
        "By adding the input of a layer to its output (`x + layer(x)`), the gradient can pass directly through the addition operation during backpropagation. This ensures early layers receive strong gradient signals.",
      hints: [
        "The gradient of x + f(x) with respect to x is 1 + df/dx - at minimum 1.",
        "Residual connections were introduced by He et al. in ResNet and adopted in Transformers.",
      ],
    },
  ],
  "mixed-precision-training": [
    {
      id: "q-k-kp-26",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the main advantage of Mixed Precision training (e.g., using bfloat16 or float16) when reproducing GPT-2?",
      options: [
        "It perfectly eliminates all training loss.",
        "It drastically reduces memory bandwidth requirements and speeds up tensor core compute, often doubling training speed with minimal accuracy loss.",
        "It allows the model to handle infinite context windows.",
        "It prevents dead neurons.",
      ],
      correctAnswer: 1,
      explanation:
        "Modern GPUs have specialized Tensor Cores that perform matrix multiplications incredibly fast in fp16/bf16. Using mixed precision cuts memory usage in half and accelerates math, while keeping critical operations in fp32 to maintain numerical stability.",
      hints: [
        "bfloat16 has the same exponent range as float32 but less mantissa precision.",
        "torch.autocast context manager enables mixed precision with minimal code changes.",
      ],
    },
  ],
  "gradient-accumulation": [
    {
      id: "q-k-kp-27",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does Gradient Accumulation solve the problem of training with large batch sizes on memory-constrained GPUs?",
      options: [
        "By dynamically compressing the model weights.",
        "By skipping the backward pass for half the batch.",
        "By accumulating gradients over multiple smaller micro-steps (forward/backward) before performing a single optimizer weight update.",
        "By storing gradients on the CPU instead of the GPU.",
      ],
      correctAnswer: 2,
      explanation:
        "If a GPU can only hold a batch of 4, you can run 8 forward/backward passes, summing the gradients each time, and then step the optimizer. Mathematically, this simulates a batch size of 32 (8 * 4).",
      hints: [
        "Do NOT call optimizer.zero_grad() between micro-steps - only after the full accumulation.",
        "Divide the loss by the number of accumulation steps to keep the gradient scale correct.",
      ],
    },
  ],
  "distributed-data-parallel": [
    {
      id: "q-k-kp-28",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In PyTorch's Distributed Data Parallel (DDP), how are model gradients synchronized across multiple GPUs?",
      options: [
        "Only the main GPU calculates gradients, the others only do forward passes.",
        "Each GPU computes gradients on its own data split, and an All-Reduce operation averages the gradients across all GPUs before the optimizer step.",
        "Models are split layer-by-layer across the GPUs.",
        "Gradients are never synchronized; each GPU trains a separate model.",
      ],
      correctAnswer: 1,
      explanation:
        "DDP duplicates the entire model on every GPU. Each processes a different chunk of the batch. During the backward pass, an All-Reduce communication averages the gradients so every GPU makes the exact same weight update.",
      hints: [
        "All-Reduce is a collective communication operation that sums (then averages) across all ranks.",
        "After All-Reduce, every GPU has identical gradients and makes the same optimizer step.",
      ],
    },
  ],
  "fused-adamw": [
    {
      id: "q-k-kp-29",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What does a 'fused' optimizer (like Fused AdamW in PyTorch) do differently than a standard un-fused optimizer to speed up training?",
      options: [
        "It fuses multiple elemental parameter-update operations into a single CUDA kernel, reducing memory reads/writes between HBM and SRAM.",
        "It fuses the forward and backward passes together.",
        "It fuses the loss calculation with the optimizer.",
        "It merges all the weights into one giant vector.",
      ],
      correctAnswer: 0,
      explanation:
        "Standard optimizers execute many small operations (multiply, add, square root) sequentially, reading/writing to High Bandwidth Memory (HBM) each time. Fused kernels do it all in fast SRAM in one go, removing memory bottlenecks.",
      hints: [
        "Memory bandwidth is often the bottleneck for optimizer steps, not compute.",
        "torch.optim.AdamW has a `fused=True` parameter to enable this optimization.",
      ],
    },
  ],
  "flash-attention": [
    {
      id: "q-k-kp-30",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is FlashAttention significantly faster and more memory-efficient than the standard PyTorch attention implementation?",
      options: [
        "It approximates the attention matrix, sacrificing accuracy for speed.",
        "It removes the softmax operation completely.",
        "It computes exact attention in a hardware-aware manner, using tiling and recomputation to minimize memory reads/writes between GPU HBM and SRAM.",
        "It runs exclusively on the CPU.",
      ],
      correctAnswer: 2,
      explanation:
        "Standard attention materializes a massive NxN attention matrix in slow GPU HBM. FlashAttention avoids this by processing the attention block by block (tiling) entirely in fast SRAM, yielding exact results with massive speedups.",
      hints: [
        "The NxN attention matrix for long sequences is the memory bottleneck in standard attention.",
        "FlashAttention v2 in PyTorch: F.scaled_dot_product_attention() uses it automatically.",
      ],
    },
  ],
  "makemore-bigram": [
    {
      id: "q-k-kp-31",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the makemore bigram model, after counting all character pairs, how is the count matrix converted into a probability matrix for sampling?",
      options: [
        "By subtracting the minimum count from each row.",
        "By dividing each row by the sum of that row, so each row sums to 1.",
        "By applying a softmax over the entire flattened matrix.",
        "By taking the log of each count value.",
      ],
      correctAnswer: 1,
      explanation:
        "The count matrix N[i, j] records how often character j follows character i. To get probabilities, each row is normalized: P[i, :] = N[i, :] / N[i, :].sum(). This gives a proper probability distribution for each preceding character.",
      hints: [
        "Each row of the probability matrix represents a conditional distribution P(next | current).",
        "Normalization: divide by the row sum so probabilities add up to 1.",
      ],
    },
    {
      id: "q-k-kp-32",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's makemore bigram model, what is the purpose of adding a smoothing count (e.g., +1) to the count matrix before normalizing to probabilities?",
      options: [
        "To make the matrix invertible for linear algebra operations.",
        "To avoid zero probabilities for unseen bigrams, which would cause log(0) = -inf during loss calculation.",
        "To increase the vocabulary size.",
        "To speed up sampling during inference.",
      ],
      correctAnswer: 1,
      explanation:
        "If a bigram (ch1, ch2) never appeared in the training data, P[i,j] = 0. During training, the negative log-likelihood loss computes -log(P), and log(0) = -inf, causing NaN gradients. Adding 1 (Laplace/add-one smoothing) ensures all probabilities are strictly positive.",
      hints: [
        "Zero probability in the model leads to infinite loss.",
        "Add-one smoothing is the simplest form of regularization for count-based models.",
      ],
    },
    {
      id: "q-k-kp-33",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What does a bigram model's average negative log-likelihood (NLL) loss converge toward if the model perfectly matches the training data distribution?",
      options: [
        "Zero, because the model predicts every bigram correctly.",
        "The entropy of the bigram distribution H(P), which is the theoretical lower bound for the average NLL.",
        "log(vocab_size), regardless of the training data.",
        "Infinity, because NLL is always increasing.",
      ],
      correctAnswer: 1,
      explanation:
        "The average NLL -E[log P(x)] is lower-bounded by the entropy H(P) = -sum_x P(x) log P(x). A model that perfectly recovers the true data distribution achieves exactly H(P) on average. A uniform model achieves log(27) \\approx 3.296 (for 27 characters), the maximum entropy for the vocabulary.",
      hints: [
        "Shannon entropy is the minimum average bits (or nats) needed to encode samples from P.",
        "A uniform distribution maximizes entropy; a peaked distribution minimizes it.",
      ],
    },
  ],
  "makemore-mlp": [
    {
      id: "q-k-kp-34",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's MLP character language model (makemore part 2), what does the 'context window' hyperparameter control?",
      options: [
        "The number of hidden neurons in the MLP.",
        "How many preceding characters are concatenated as input to predict the next character.",
        "The learning rate schedule.",
        "The number of training epochs.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The context window (block_size) specifies how many preceding characters are used as input.\\n\\n**Step 2:** These character embeddings are concatenated into a single flat vector of shape (context * d_embed) passed to the MLP.\\n\\n**Step 3:** Larger context provides more predictive history but increases the input dimension and computation cost.",
      hints: [
        "Think of the context window as the 'memory' of the model.",
        "Bigram uses context=1; the MLP typically uses context=3.",
      ],
    },
    {
      id: "q-k-kp-35",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's MLP character model, why is there typically a gap between training loss and validation loss during training?",
      options: [
        "Validation loss is always lower because the model was never trained on the validation set.",
        "Training loss is lower than validation loss because the model has memorized aspects of the training set (overfitting).",
        "There is no gap; training and validation loss should always be identical.",
        "Validation loss is lower due to the absence of dropout during evaluation.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Overfitting occurs when a model memorizes training-specific patterns instead of learning generalizable features.\\n\\n**Step 2:** This causes training loss to fall below validation loss, as the model performs better on seen data.\\n\\n**Step 3:** Monitoring both curves detects overfitting early and informs when to stop or regularize.",
      hints: [
        "The train/val loss gap is the classic signal of overfitting.",
        "If both losses are high, the model is underfitting.",
      ],
    },
    {
      id: "q-k-kp-36",
      type: "true-false",
      difficulty: "hard",
      question:
        "In Karpathy's MLP model, the embedding lookup for an entire batch of context windows can be performed with a single integer tensor index into the embedding matrix, and the result is then flattened before being passed to the hidden layer.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** Integer indexing C[X] retrieves embeddings of shape (B, T, d) from the embedding table.\\n\\n**Step 2:** `.view(B, T*d)` reshapes this to (B, T*d), concatenating all T character embeddings into one flat vector per example.\\n\\n**Step 3:** This flattened vector is then passed to the first linear layer as the MLP input.",
      hints: [
        "Integer indexing into an nn.Embedding matrix is equivalent to a lookup table.",
        "`.view(B, -1)` flattens the (B, T, d) tensor to (B, T*d).",
      ],
    },
  ],
  "makemore-wavenet": [
    {
      id: "q-k-kp-37",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the WaveNet-inspired makemore model, what is the purpose of dilated causal convolutions?",
      options: [
        "To reduce memory usage by sharing weights across time steps.",
        "To exponentially increase the receptive field with depth while maintaining causality, so each position can attend to a wide history without a quadratic increase in parameters.",
        "To apply attention across the full sequence in parallel.",
        "To replace the embedding layer with a convolution over byte values.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Dilation factor doubles each layer: 1, 2, 4, 8, ... causing the kernel to skip input positions exponentially.\\n\\n**Step 2:** Stacking layers doubles the receptive field each time, giving exponential growth in depth with linear parameter growth.\\n\\n**Step 3:** Causality is preserved by zero-padding on the left only, ensuring each output depends only on past inputs.",
      hints: [
        "Dilation factor doubles with each layer: 1, 2, 4, 8, ...",
        "Receptive field grows exponentially: each layer roughly doubles the history accessible.",
      ],
    },
    {
      id: "q-k-kp-38",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's WaveNet-like architecture for character generation, what is the 'receptive field' and why does it matter?",
      options: [
        "The number of output classes the model can predict.",
        "The number of past time steps that can influence a given output position; a larger receptive field allows the model to use more context.",
        "The size of the embedding dimension.",
        "The learning rate warmup period measured in steps.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The receptive field is the number of past input positions that can affect a given output position.\\n\\n**Step 2:** Small receptive field limits the model's context, hurting long-range dependency modeling.\\n\\n**Step 3:** Dilated convolutions grow the receptive field exponentially with depth, enabling long-range context efficiently.",
      hints: [
        "Small receptive field = short memory = poor long-range modeling.",
        "WaveNet uses stacked dilated convolutions to achieve a large receptive field cheaply.",
      ],
    },
    {
      id: "q-k-kp-39",
      type: "true-false",
      difficulty: "easy",
      question:
        "In the original WaveNet architecture, causal convolutions ensure each output sample is conditioned only on previous time steps and not on future time steps.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** Autoregressive models predict the next token from only previous tokens, never future ones.\\n\\n**Step 2:** Causal convolutions enforce this by zero-padding on the left side, ensuring each output depends only on past inputs.\\n\\n**Step 3:** Without causal masking, the model could look at future tokens during training, defeating the learning objective.",
      hints: [
        "Causal = no future leakage: output at time t only depends on inputs 1..t.",
        "Causal masking in transformers and causal padding in convolutions serve the same purpose.",
      ],
    },
  ],
  "batchnorm-detail": [
    {
      id: "q-k-kp-40",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "During training with batch normalization, what statistics are used to normalize the activations, and how do they differ from what is used at inference time?",
      options: [
        "Training uses the global dataset mean and variance; inference uses the batch mean and variance.",
        "Training uses the mean and variance computed over the current mini-batch; inference uses running (exponential moving average) mean and variance accumulated during training.",
        "Both training and inference use the running statistics; the batch statistics are never used.",
        "Training and inference both use the batch statistics; running statistics are never stored.",
      ],
      correctAnswer: 1,
      explanation:
        "During training, BatchNorm normalizes each feature using the current batch\'s mean and variance, which introduces noise that acts as regularization. At inference (after `model.eval()`), a single sample or small batch would give unreliable statistics, so BatchNorm switches to using the running mean/variance accumulated during training via exponential moving average.",
      hints: [
        "Batch statistics are noisy per mini-batch; running statistics are stable over training.",
        "model.train() vs model.eval() controls which stats BatchNorm uses.",
      ],
    },
    {
      id: "q-k-kp-41",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In PyTorch's BatchNorm, what is the role of the `momentum` parameter (default 0.1)?",
      options: [
        "It controls the learning rate for the gamma and beta parameters.",
        "It sets the fraction of the new batch statistic blended into the running mean/variance each step: running = (1 - momentum) * running + momentum * batch_stat.",
        "It determines the decay rate of the gradient during backpropagation.",
        "It sets the minimum batch size before normalization kicks in.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Running statistics are updated via: running = (1 - momentum) * running + momentum * batch_stat.\\n\\n**Step 2:** With default momentum=0.1, each new batch contributes 10% to the running estimate.\\n\\n**Step 3:** Lower momentum gives slower adaptation but more stable statistics; higher momentum adapts faster but noisier.",
      hints: [
        "PyTorch's `momentum` is the weight on the NEW batch stat, not the old running stat.",
        "Higher momentum = faster adaptation; lower = more stable estimates.",
      ],
    },
    {
      id: "q-k-kp-42",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using very small batch sizes (e.g., batch size 1) with batch normalization can cause training instability because the per-batch mean and variance estimates are highly noisy with a single sample.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** BatchNorm requires enough samples to compute meaningful mean and variance statistics.\\n\\n**Step 2:** With batch size 1, variance = 0, so normalization divides by zero or produces degenerate distributions.\\n\\n**Step 3:** GroupNorm and LayerNorm are batch-size-independent, making them suitable alternatives for small-batch or single-sample inference.",
      hints: [
        "Variance of a single sample is 0 - you cannot normalize with that.",
        "LayerNorm and GroupNorm are batch-size-independent alternatives.",
      ],
    },
  ],
  "backprop-ninja": [
    {
      id: "q-k-kp-43",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the 'backprop ninja' lecture, Karpathy manually derives the gradient of cross-entropy loss combined with softmax. What is the elegant form of dL/d(logits) when the correct class is index y?",
      options: [
        "softmax(logits) everywhere.",
        "softmax(logits) - 1 at index y; softmax(logits) everywhere else - equivalent to softmax(logits) minus the one-hot target.",
        "-log(softmax(logits)[y]).",
        "1/softmax(logits)[y] at index y; 0 everywhere else.",
      ],
      correctAnswer:
        "softmax(logits) - 1 at index y; softmax(logits) everywhere else - equivalent to softmax(logits) minus the one-hot target.",
      explanation:
        "**Step 1:** Combining the softmax derivative with the cross-entropy derivative simplifies dramatically.\\n\\n**Step 2:** For the correct class y: dL/d(logits[y]) = softmax(logits[y]) - 1. For all other classes i != y: dL/d(logits[i]) = softmax(logits[i]).\\n\\n**Step 3:** Compactly: dL/d(logits) = softmax(logits) - one_hot(y), the predicted probabilities minus the target.",
      hints: [
        "Combine the softmax derivative and cross-entropy gradient in one step.",
        "The result is simply the predicted probabilities minus the target one-hot vector.",
      ],
    },
    {
      id: "q-k-kp-44",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is numerical gradient checking, and why does Karpathy use it to verify manual backprop implementations?",
      options: [
        "It is a method to speed up gradient computation using finite differences.",
        "It approximates the gradient using (f(x+h) - f(x-h)) / (2h) for small h, and compares it to the analytically computed gradient to verify correctness.",
        "It quantizes gradients to 8-bit integers for memory efficiency.",
        "It uses the Jacobian matrix to verify that the model's outputs are correct.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Numerical gradient checking uses (f(x+h) - f(x-h)) / (2h) to approximate the derivative at each parameter.\\n\\n**Step 2:** This formula is derived directly from the loss function with no chain rule, making it a trustworthy reference.\\n\\n**Step 3:** Comparing numerical gradients to analytically computed gradients (relative error < 1e-5) verifies the backward pass implementation.",
      hints: [
        "Centered difference (f(x+h) - f(x-h)) / (2h) is more accurate than forward difference.",
        "Typical tolerance is relative error < 1e-5.",
      ],
    },
    {
      id: "q-k-kp-45",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Karpathy's manual backprop exercises, implementing the backward pass for the log-sum-exp operation (used in cross-entropy) requires computing the softmax probabilities as an intermediate step.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** The log-sum-exp function is log(sum_i exp(x_i)). Its gradient is exp(x_i) / sum_j exp(x_j) = softmax(x)_i.\\n\\n**Step 2:** This means the backward pass for cross-entropy requires softmax probabilities as an intermediate.\\n\\n**Step 3:** PyTorch's F.cross_entropy can compute this gradient efficiently without explicitly materializing softmax in the forward pass.",
      hints: [
        "d/dx_i [log(sum_j exp(x_j))] = exp(x_i) / sum_j exp(x_j) = softmax(x)_i.",
        "This is why PyTorch's F.cross_entropy can compute gradients without an explicit softmax forward pass.",
      ],
    },
  ],
  "gpt-architecture": [
    {
      id: "q-k-kp-46",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's GPT implementation (nanoGPT), how is causal masking implemented in the self-attention module?",
      options: [
        "By setting the learning rate to zero for future-position attention weights.",
        "By adding -infinity to the attention logits at positions corresponding to future tokens before the softmax, so those positions get zero probability after softmax.",
        "By setting the key and query matrices for future positions to zero.",
        "By shuffling the input tokens randomly before computing attention.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** torch.tril creates a lower-triangular mask of shape (T, T) marking valid (past/present) positions as 1.\\n\\n**Step 2:** Attention logits at future positions are masked by adding float('-inf') before softmax.\\n\\n**Step 3:** After softmax, exp(-inf) = 0, so masked positions receive zero attention weight, enforcing causality.",
      hints: [
        "torch.tril creates a lower-triangular mask; upper-triangle positions need to be masked out.",
        "Masked_fill with float('-inf') \\to softmax gives 0 attention to those positions.",
      ],
    },
    {
      id: "q-k-kp-47",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In multi-head attention as implemented in nanoGPT, what is the purpose of splitting the embedding dimension into multiple heads?",
      options: [
        "To reduce the total parameter count by sharing weights across heads.",
        "To allow different heads to attend to different positions or relationship types simultaneously, enriching the representation compared to a single attention operation.",
        "To enable parallelism across GPUs by assigning one head per GPU.",
        "To implement positional encoding without adding a separate embedding.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Q, K, V are split into n_heads, each operating on d_model / n_heads dimensions.\\n\\n**Step 2:** Each head independently learns different attention patterns (e.g., syntactic, semantic, positional).\\n\\n**Step 3:** All head outputs are concatenated and projected back to d_model, combining diverse attention subspaces.",
      hints: [
        "Each head operates on a slice of the full embedding dimension.",
        "After computing, all heads are concatenated and projected: output = concat(head_1,...,head_h) @ W_O.",
      ],
    },
    {
      id: "q-k-kp-48",
      type: "true-false",
      difficulty: "easy",
      question:
        "In GPT-style models, positional embeddings are added element-wise (not concatenated) to the token embeddings before the first transformer block.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** Positional embeddings of shape (T, d_model) are learned concurrently with token embeddings.\\n\\n**Step 2:** They are added element-wise: x = tok_emb + pos_emb, preserving the (B, T, d_model) shape.\\n\\n**Step 3:** Addition (not concatenation) keeps the embedding dimension fixed, allowing the model to jointly encode token identity and position.",
      hints: [
        "Element-wise addition: x = tok_emb + pos_emb, both of shape (B, T, d_model).",
        "Concatenation would double the embedding dimension, which is not the standard GPT approach.",
      ],
    },
  ],
  "tokenization-detail": [
    {
      id: "q-k-kp-49",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In GPT-2's byte-pair encoding (BPE) tokenizer, what is the base vocabulary before any merges are learned?",
      options: [
        "The 26 letters of the English alphabet.",
        "The 256 possible byte values (0-255), making the tokenizer lossless for any byte sequence.",
        "A hand-curated list of the 1000 most common English words.",
        "Unicode code points up to 0xFFFF.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** GPT-2's base vocabulary is exactly 256 byte values (0-255), the raw bytes of any file.\\n\\n**Step 2:** Merge rules learned during training combine bytes into subword tokens, reducing sequence length.\\n\\n**Step 3:** Byte-level base ensures any text (in any language or encoding) can be tokenized without an <UNK> token.",
      hints: [
        "Byte-level means no <UNK> token is ever needed.",
        "256 bytes is the base; merge rules are learned on top to form longer subword tokens.",
      ],
    },
    {
      id: "q-k-kp-50",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does increasing the vocabulary size of a BPE tokenizer reduce sequence length but potentially increase model size?",
      options: [
        "Larger vocabularies require more GPU memory to store the tokenizer rules.",
        "With more merge rules, longer text spans become single tokens (shorter sequences), but the embedding table and output projection matrix grow proportionally to vocab size, increasing parameter count.",
        "Larger vocabularies slow down tokenization speed linearly.",
        "Larger vocabularies reduce the model's ability to handle rare words.",
      ],
      correctAnswer: 1,
      explanation:
        "Each token in the vocabulary needs a row in the embedding matrix (vocab_size \\times d_model) and a column in the language model head (d_model \\times vocab_size). For GPT-2, vocab_size=50,257, which means the embedding and LM head together account for a significant fraction of total parameters.",
      hints: [
        "Embedding table size = vocab_size \\times d_model.",
        "LM head (unembedding) is often tied to the embedding matrix to save parameters.",
      ],
    },
    {
      id: "q-k-kp-51",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Karpathy's tokenization lecture, he demonstrates that BPE tokenizers can behave unexpectedly with non-English text, arithmetic, and whitespace because merges are learned predominantly from English web text, biasing the token boundaries.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** BPE merge rules are learned from the training corpus statistics, reflecting the data distribution.\\n\\n**Step 2:** GPT-2's WebText training is English-heavy, biasing merges toward English subwords.\\n\\n**Step 3:** This causes non-English text and arithmetic to fragment into many tokens, degrading per-token performance on these tasks.",
      hints: [
        "A simple number like '127' may be a single token in English but split differently in another language context.",
        "This is why multilingual models like Llama 3 use much larger vocabularies (128K tokens).",
      ],
    },
  ],
  "micrograd-autograd": [
    {
      id: "q-k-kp-52",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Karpathy's Micrograd, what is a 'leaf node' in the computational graph?",
      options: [
        "The final output node that holds the loss value.",
        "A node with no children - a variable created directly (e.g., a weight or input), not as the result of an operation on other Values.",
        "A node that has been visited during topological sort.",
        "Any node whose gradient is currently zero.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Leaf nodes are the 'roots' of the computation - inputs and parameters not produced by any operation.\\n\\n**Step 2:** In Micrograd, they have an empty `_children` set; they are created directly with no operation history.\\n\\n**Step 3:** Leaf nodes with `requires_grad=True` (or `grad=True` in Micrograd) are the terminals of gradient accumulation during backpropagation.",
      hints: [
        "Think of leaves as the 'roots' of the computation in the forward direction.",
        "In Micrograd: `Value._children` is empty for leaf nodes.",
      ],
    },
    {
      id: "q-k-kp-53",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Micrograd's `backward()` method, why is topological sort used before executing the backward pass?",
      options: [
        "To sort nodes alphabetically for debugging purposes.",
        "To ensure gradients are propagated from the output (loss) back to the inputs in the correct order - each node's backward is called only after all downstream nodes have propagated their gradients to it.",
        "To find the shortest path through the graph.",
        "To remove duplicate nodes that share the same value.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** A topological sort gives a linear ordering consistent with all data dependencies in the graph.\\n\\n**Step 2:** Reversing this order (reverse topological sort) yields: loss first, then its inputs, and so on toward leaves.\\n\\n**Step 3:** Without this ordering, a node might use stale gradients before upstream gradients have been accumulated, breaking backpropagation.",
      hints: [
        "In a DAG, topological sort gives a linear order consistent with all edges.",
        "Reverse topological order = correct backpropagation order.",
      ],
    },
    {
      id: "q-k-kp-54",
      type: "true-false",
      difficulty: "hard",
      question:
        "In Micrograd, calling `loss.backward()` computes gradients by iterating over all nodes in reverse topological order and calling each node's stored `_backward` closure, which accumulates gradients into its inputs using `+=`.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** Each operation captures a `_backward` closure that computes the local gradient with respect to its inputs.\\n\\n**Step 2:** `loss.backward()` iterates nodes in reverse topological order, calling each `_backward` closure.\\n\\n**Step 3:** Gradients are accumulated with `+=` to handle nodes used by multiple operations, ensuring all contributions are summed.",
      hints: [
        "Closures capture the local operand values at operation creation time.",
        "`+=` is critical because a node can contribute to multiple downstream operations.",
      ],
    },
  ],
  "initialization-deep": [
    {
      id: "q-k-kp-55",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key difference between Xavier (Glorot) initialization and He (Kaiming) initialization, and when should each be used?",
      options: [
        "Xavier uses fan_in only; He uses fan_out only.",
        "Xavier is designed for symmetric activations like tanh/sigmoid (variance 1/fan_in); He doubles this variance for ReLU activations to compensate for the zero-ing of negative inputs.",
        "Xavier uses random uniform distributions; He uses random normal distributions exclusively.",
        "There is no difference; both are interchangeable.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Xavier targets symmetric activations (tanh/sigmoid) with variance 1/fan_in for both forward and backward passes.\\n\\n**Step 2:** ReLU zeroes out ~50% of activations, effectively halving variance - Xavier would cause vanishing.\\n\\n**Step 3:** He initialization doubles the variance to 2/fan_in (gain=sqrt(2) for ReLU), compensating for the ReLU clipping.",
      hints: [
        "ReLU kills ~50% of activations; the variance needs to be doubled to compensate.",
        "He init: std = sqrt(2/fan_in); Xavier: std = sqrt(1/fan_in).",
      ],
    },
    {
      id: "q-k-kp-56",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the 'dead ReLU' problem, and which condition most commonly causes it?",
      options: [
        "ReLU neurons that output very large values and saturate the network.",
        "ReLU neurons whose input is always negative, so their output is always zero and they receive zero gradient, permanently preventing them from learning.",
        "ReLU neurons that overfit to the training set.",
        "ReLU neurons that only activate on a single training example.",
      ],
      correctAnswer: 1,
      explanation:
        "If a ReLU neuron\'s pre-activation is always <= 0 (e.g., due to a large negative bias or an excessively large learning rate step), the ReLU output is always 0 and the local gradient is 0. No gradient flows back through the neuron, so its weights never update. This 'dead neuron' is permanent unless the bias shifts.",
      hints: [
        "Dead ReLU: gradient = 0 because output = max(0, x) = 0 always.",
        "A learning rate that is too high can push neurons into this dead zone.",
      ],
    },
    {
      id: "q-k-kp-57",
      type: "true-false",
      difficulty: "easy",
      question:
        "Initializing all weights in a neural network to exactly zero prevents the symmetry-breaking required for learning, because all neurons in a layer compute identical gradients and update identically.",
      correctAnswer: "true",
      explanation:
        "If all weights are zero, all neurons in a layer produce the same activation (zero) and receive the same gradient, so they remain identical after each update. This symmetry is never broken, effectively collapsing the layer to a single neuron. Random initialization breaks symmetry, allowing different neurons to specialize.",
      hints: [
        "All-zero init: every neuron is identical \\to they learn identically \\to they stay identical.",
        "This is called the 'symmetry problem' and it is why random weight initialization is essential.",
      ],
    },
  ],
  "regularization-karpathy": [
    {
      id: "q-k-kp-58",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Karpathy's training videos, which diagnostic plot is used to detect overfitting by showing both training and validation loss curves during training?",
      options: [
        "A histogram of the weight magnitudes.",
        "A plot of training loss and validation loss versus training iterations (the loss curve).",
        "A scatter plot of predicted vs actual outputs.",
        "A heatmap of the attention weights.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The loss curve plots training and validation loss on the y-axis against training steps on the x-axis.\\n\\n**Step 2:** Overfitting: training loss keeps falling while validation loss plateaus or rises.\\n\\n**Step 3:** Healthy generalization: both losses decrease together; underfitting: both remain high.",
      hints: [
        "The train/val loss curve is the first thing to check when debugging training.",
        "Overfitting: train loss still falling while val loss rises or stalls.",
      ],
    },
    {
      id: "q-k-kp-59",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When comparing L2 regularization (weight decay) and dropout as regularization strategies, which statement is most accurate?",
      options: [
        "L2 regularization and dropout are mathematically identical and interchangeable.",
        "L2 regularization penalizes large weights through the loss function (encouraging small weights), while dropout randomly zeros activations during training (encouraging redundant representations); both reduce overfitting but via different mechanisms.",
        "Dropout works only for convolutional layers; L2 works only for linear layers.",
        "L2 regularization is applied during inference; dropout is applied only during the forward pass of training.",
      ],
      correctAnswer: 1,
      explanation:
        "L2 (weight decay) adds a term lambda * sum(w^2) to the loss, shrinking weights toward zero. Dropout randomly drops activations with probability p during training, preventing co-adaptation of neurons. Both regularize, but L2 targets weight magnitude while dropout targets feature co-dependence.",
      hints: [
        "L2: penalty on weight magnitude in the loss. Dropout: stochastic masking of activations.",
        "In AdamW, weight decay is decoupled from the adaptive learning rate (unlike in Adam with L2).",
      ],
    },
    {
      id: "q-k-kp-60",
      type: "true-false",
      difficulty: "easy",
      question:
        "Early stopping is a regularization technique where training is halted when the validation loss stops improving, preventing the model from overfitting by not allowing it to memorize training-set noise.",
      correctAnswer: "true",
      explanation:
        "**Step 1:** Early stopping tracks validation loss and stops training when it fails to improve for 'patience' steps.\\n\\n**Step 2:** The model checkpoint with the best validation loss is retained as the final model.\\n\\n**Step 3:** It is a simple, architecture-agnostic regularization technique that prevents overfitting without any model changes.",
      hints: [
        "Early stopping: save the model at the validation loss minimum, stop when it plateaus.",
        "It is 'free' regularization - no hyperparameters needed beyond patience.",
      ],
    },
  ],
});
