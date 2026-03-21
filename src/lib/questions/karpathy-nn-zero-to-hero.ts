import { registerQuestions } from './index'

registerQuestions({
  'derivative-chain-rule': [
    {
      id: 'q-k-kp-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the fundamental purpose of the chain rule in backpropagation?",
      options: [
        "To initialize the weights of a neural network.",
        "To recursively calculate local gradients backwards through the computational graph, multiplying them to find the global gradient.",
        "To define the architecture of a multi-layer perceptron.",
        "To perform matrix multiplication between the inputs and weights."
      ],
      correctAnswer: "To recursively calculate local gradients backwards through the computational graph, multiplying them to find the global gradient.",
      explanation: "The chain rule from calculus allows us to calculate the derivative of a composite function by multiplying the local gradients of each operation, propagating the error from the output back to the inputs or weights."
    }
  ],
  'computational-graphs': [
    {
      id: 'q-k-kp-2',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "How does an autograd engine (like Micrograd) represent a mathematical expression?",
      options: [
        "As a continuous function in memory.",
        "As a string of text that is parsed at runtime.",
        "As a Directed Acyclic Graph (DAG) where nodes are values and edges are operations.",
        "As a single dense tensor."
      ],
      correctAnswer: "As a Directed Acyclic Graph (DAG) where nodes are values and edges are operations.",
      explanation: "Autograd engines dynamically build a Directed Acyclic Graph (DAG) during the forward pass, linking scalar values or tensors with the operations that produced them, enabling reverse-mode differentiation."
    }
  ],
  'topological-sort-autograd': [
    {
      id: 'q-k-kp-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why is topological sort necessary during backpropagation in a computational graph?",
      options: [
        "To sort the dataset before training.",
        "To ensure that the gradient for a node is only calculated after all nodes that depend on it have calculated their gradients.",
        "To arrange the neurons in a layer by their activation values.",
        "To speed up the forward pass by skipping zero weights."
      ],
      correctAnswer: "To ensure that the gradient for a node is only calculated after all nodes that depend on it have calculated their gradients.",
      explanation: "In a DAG, a node's gradient depends on the gradients of the nodes it outputs to. A topological sort guarantees we traverse the graph backward in the correct dependency order."
    }
  ],
  'neuron-implementation': [
    {
      id: 'q-k-kp-4',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "In a standard artificial neuron, what mathematical operation immediately follows the dot product of the weights and inputs (plus bias)?",
      options: [
        "A non-linear activation function, like Tanh or ReLU.",
        "A linear transformation.",
        "Batch Normalization.",
        "A softmax operation."
      ],
      correctAnswer: "A non-linear activation function, like Tanh or ReLU.",
      explanation: "A neuron computes `w*x + b` and then passes that pre-activation value through a non-linear activation function (e.g., Tanh) to squash or transform the output, allowing the network to learn non-linear representations."
    }
  ],
  'gradient-descent-basics': [
    {
      id: 'q-k-kp-5',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "In the context of training a neural network, what does the learning rate control?",
      options: [
        "The number of epochs.",
        "The amount of data in each batch.",
        "The step size taken in the direction of the negative gradient during weight updates.",
        "The architecture of the network."
      ],
      correctAnswer: "The step size taken in the direction of the negative gradient during weight updates.",
      explanation: "The learning rate is a hyperparameter that scales the gradient, determining how big of a step to take in the parameter space towards a local minimum of the loss function."
    }
  ],
  'character-level-lm': [
    {
      id: 'q-k-kp-6',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "In a character-level language model, what constitutes the model's vocabulary?",
      options: [
        "A dictionary of common English words.",
        "The unique set of characters present in the training dataset.",
        "Syllables and phonemes.",
        "Sub-word tokens like Byte-Pair Encoding."
      ],
      correctAnswer: "The unique set of characters present in the training dataset.",
      explanation: "A character-level model treats individual characters (like 'a', 'b', '\n') as its atomic units (vocabulary) and tries to predict the next character in a sequence."
    }
  ],
  'bigram-counting': [
    {
      id: 'q-k-kp-7',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How do you find the empirical probability of a character given the previous character using a pure counting bigram model?",
      options: [
        "By dividing the count of the bigram by the total count of the previous character.",
        "By passing the counts through a linear layer.",
        "By dividing the total vocabulary size by the bigram count.",
        "By taking the log of the count."
      ],
      correctAnswer: "By dividing the count of the bigram by the total count of the previous character.",
      explanation: "In a pure counting bigram model, `P(w2|w1) = count(w1, w2) / count(w1)`. You normalize the raw frequencies of the bigrams by the frequency of the context."
    }
  ],
  'negative-log-likelihood': [
    {
      id: 'q-k-kp-8',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why do we optimize the Negative Log Likelihood (NLL) instead of directly maximizing probabilities?",
      options: [
        "Because probabilities multiply and become vanishingly small, while logs add; NLL turns maximizing a product into minimizing a sum.",
        "Because logs are faster to compute on modern GPUs.",
        "Because NLL acts as a regularization term.",
        "Because maximizing probability directly ignores the ground truth labels."
      ],
      correctAnswer: "Because probabilities multiply and become vanishingly small, while logs add; NLL turns maximizing a product into minimizing a sum.",
      explanation: "Multiplying many probabilities (values between 0 and 1) leads to numerical underflow. Taking the log transforms the product into a sum, and taking the negative turns the maximization problem into a standard loss minimization problem."
    }
  ],
  'smoothing-counts': [
    {
      id: 'q-k-kp-9',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the purpose of adding a small constant (like 1) to all bigram counts before calculating probabilities (Laplace Smoothing)?",
      options: [
        "To increase the learning rate.",
        "To ensure no bigram has exactly 0 probability, which would result in an infinite negative log likelihood.",
        "To make the matrix multiplication faster.",
        "To bias the model towards generating longer sequences."
      ],
      correctAnswer: "To ensure no bigram has exactly 0 probability, which would result in an infinite negative log likelihood.",
      explanation: "If a bigram never appeared in the training data, its count is 0. If the model encounters this in evaluation, the probability is 0, making the log likelihood negative infinity. Adding a 'fake count' ensures all probabilities are non-zero."
    }
  ],
  'one-hot-encoding': [
    {
      id: 'q-k-kp-10',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "How is a categorical integer (like a character index) typically represented before being fed into a neural network's linear layer?",
      options: [
        "As a continuous float.",
        "As a one-hot encoded vector.",
        "As an ASCII byte array.",
        "As a base-10 decimal."
      ],
      correctAnswer: "As a one-hot encoded vector.",
      explanation: "Categorical data like character IDs are generally represented as one-hot vectors—arrays of all zeros with a single '1' at the index corresponding to the category—so they can be multiplied by a weight matrix."
    }
  ],
  'embedding-lookups': [
    {
      id: 'q-k-kp-11',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "In PyTorch, what is the mathematical and programmatic equivalent of multiplying a one-hot vector by a weight matrix?",
      options: [
        "Applying a Tanh activation.",
        "Indexing into the rows of the weight matrix, commonly implemented as an Embedding layer.",
        "Performing a convolution operation.",
        "Calculating the cross entropy."
      ],
      correctAnswer: "Indexing into the rows of the weight matrix, commonly implemented as an Embedding layer.",
      explanation: "Multiplying a one-hot vector by matrix `W` simply extracts the i-th row of `W`. PyTorch's `nn.Embedding` optimizes this by skipping the matrix multiplication and directly indexing into the parameter matrix."
    }
  ],
  'hidden-layers': [
    {
      id: 'q-k-kp-12',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "What is the primary purpose of the hidden layer (often with a Tanh activation) in the Bengio et al. MLP language model?",
      options: [
        "To count bigrams.",
        "To learn non-linear representations and interactions of the input context characters.",
        "To convert the logits into a probability distribution.",
        "To initialize the weights."
      ],
      correctAnswer: "To learn non-linear representations and interactions of the input context characters.",
      explanation: "Unlike a simple linear model, the hidden layer combined with a non-linearity allows the network to learn complex, non-linear relationships and higher-order interactions between the context words/characters."
    }
  ],
  'pytorch-cross-entropy': [
    {
      id: 'q-k-kp-13',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why is it generally better to use PyTorch's `F.cross_entropy` instead of manually computing `softmax` followed by `nll_loss`?",
      options: [
        "Because `cross_entropy` has no mathematical relation to softmax.",
        "It is numerically more stable (avoids NaN due to exp(large_numbers)), handles extreme values safely, and is computationally faster due to fused kernels.",
        "It automatically regularizes the model.",
        "It allows you to bypass the backward pass."
      ],
      correctAnswer: "It is numerically more stable (avoids NaN due to exp(large_numbers)), handles extreme values safely, and is computationally faster due to fused kernels.",
      explanation: "`F.cross_entropy` fuses the log, softmax, and negative log-likelihood operations. By subtracting the maximum logit before exponentiating, it ensures numerical stability, avoiding 'inf' and 'NaN' errors while being highly optimized."
    }
  ],
  'minibatches': [
    {
      id: 'q-k-kp-14',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "Why do we typically train neural networks using minibatches rather than the entire dataset at once?",
      options: [
        "To guarantee the exact true gradient is calculated at every step.",
        "To estimate the gradient much faster and update weights more frequently, leading to faster overall convergence despite some noise.",
        "Because it prevents overfitting entirely.",
        "To increase the loss."
      ],
      correctAnswer: "To estimate the gradient much faster and update weights more frequently, leading to faster overall convergence despite some noise.",
      explanation: "Minibatches provide a noisy but computationally cheap estimate of the true gradient. Taking many small, fast steps generally leads to much faster convergence than taking a single perfectly accurate step that requires scanning the whole dataset."
    }
  ],
  'learning-rate-decay': [
    {
      id: 'q-k-kp-15',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is a common and effective strategy for adjusting the learning rate over the course of training?",
      options: [
        "Starting very low and exponentially increasing it.",
        "Keeping it strictly constant for the entire training run.",
        "Starting with a high learning rate to learn quickly, then decaying it (lowering it) to fine-tune and settle into a local minimum.",
        "Randomly changing it at every step."
      ],
      correctAnswer: "Starting with a high learning rate to learn quickly, then decaying it (lowering it) to fine-tune and settle into a local minimum.",
      explanation: "Learning rate decay allows the model to make large updates early on to rapidly descend the loss landscape, and then take smaller, precise steps later to converge smoothly to the bottom of the minimum without overshooting."
    }
  ],
  'kaiming-init': [
    {
      id: 'q-k-kp-16',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "What specific problem does Kaiming (He) initialization address when applied to deep neural networks with ReLU/Tanh activations?",
      options: [
        "It prevents the network from needing an optimizer.",
        "It preserves the variance of activations across layers, preventing signals from shrinking to zero or exploding.",
        "It zeroes out half the weights to act as dropout.",
        "It replaces the need for a loss function."
      ],
      correctAnswer: "It preserves the variance of activations across layers, preventing signals from shrinking to zero or exploding.",
      explanation: "If weights are initialized randomly without proper scaling, the variance of the outputs shrinks or grows exponentially with each layer. Kaiming initialization scales weights by a factor of `sqrt(gain / fan_in)` to maintain a stable variance."
    }
  ],
  'dead-neurons': [
    {
      id: 'q-k-kp-17',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What causes a 'dead' neuron when using the Tanh or ReLU activation functions?",
      options: [
        "When the learning rate is too low.",
        "If the pre-activation value is too extreme, the local gradient becomes zero, and the neuron stops learning completely.",
        "When the batch size is exactly 1.",
        "If the input data contains negative values."
      ],
      correctAnswer: "If the pre-activation value is too extreme, the local gradient becomes zero, and the neuron stops learning completely.",
      explanation: "For ReLU, negative inputs give 0 output and 0 gradient. For Tanh, inputs far from 0 saturate at 1 or -1, where the gradient is completely flat (0). In both cases, if a neuron always hits these flat regions, it receives no gradients to update its weights."
    }
  ],
  'batch-normalization': [
    {
      id: 'q-k-kp-18',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "How does Batch Normalization conceptually stabilize the training of deep networks?",
      options: [
        "By normalizing the pre-activations of a layer to have zero mean and unit variance across the minibatch, mitigating internal covariate shift.",
        "By ensuring every weight matrix is exactly orthogonal.",
        "By applying a random mask to the inputs.",
        "By normalizing the gradients, not the activations."
      ],
      correctAnswer: "By normalizing the pre-activations of a layer to have zero mean and unit variance across the minibatch, mitigating internal covariate shift.",
      explanation: "BatchNorm computes the mean and variance of the batch and normalizes the activations. It then applies a learned scale and shift (`gamma` and `beta`), ensuring activations stay in a stable range, which dramatically smooths gradient flow."
    }
  ],
  'batchnorm-inference': [
    {
      id: 'q-k-kp-19',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How does a Batch Normalization layer behave differently during inference compared to training?",
      options: [
        "It acts as a linear projection without bias.",
        "During training, it uses the batch mean/variance; during inference, it uses a running mean/variance calculated during training.",
        "It is completely disabled and skipped during inference.",
        "It uses the exact same batch mean and variance for every single inference request."
      ],
      correctAnswer: "During training, it uses the batch mean/variance; during inference, it uses a running mean/variance calculated during training.",
      explanation: "At inference time, you might process a single example (batch size 1), where batch statistics don't make sense. Thus, BatchNorm tracks an exponentially moving average of means and variances during training to use later during inference."
    }
  ],
  'pytorch-hooks': [
    {
      id: 'q-k-kp-20',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "What is a PyTorch forward/backward hook typically used for when debugging a model?",
      options: [
        "To intercept and inspect intermediate activations and gradients as they flow through the network without changing the model code.",
        "To download datasets from the internet.",
        "To plot graphs directly in the terminal.",
        "To bypass the autograd engine and speed up inference."
      ],
      correctAnswer: "To intercept and inspect intermediate activations and gradients as they flow through the network without changing the model code.",
      explanation: "Hooks are callback functions you can attach to `nn.Module` objects. They allow you to observe, log, or even modify the tensors passing through the forward or backward passes—excellent for diagnosing vanishing gradients or dead neurons."
    }
  ],
  'self-attention-math': [
    {
      id: 'q-k-kp-21',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "At its core, what is the mathematical self-attention operation computing?",
      options: [
        "A standard Multilayer Perceptron applied to each token independently.",
        "A weighted sum of Value vectors, where the weights are determined by the scaled dot-product between Query and Key vectors.",
        "A spatial convolution over the sequence tokens.",
        "A recurrent state update."
      ],
      correctAnswer: "A weighted sum of Value vectors, where the weights are determined by the scaled dot-product between Query and Key vectors.",
      explanation: "Self-attention takes Queries, Keys, and Values. It computes an attention matrix by dotting Q and K, scales it, applies softmax, and multiplies it by V, effectively aggregating information from other tokens based on relevance."
    }
  ],
  'causal-masking': [
    {
      id: 'q-k-kp-22',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why do we apply a lower-triangular mask (often using `tril`) to the attention scores in an autoregressive language model like GPT?",
      options: [
        "To prevent tokens from 'looking ahead' into the future, ensuring they only attend to previous context.",
        "To reduce the memory footprint by 50%.",
        "To emphasize the diagonal elements.",
        "To make the attention matrix symmetric."
      ],
      correctAnswer: "To prevent tokens from 'looking ahead' into the future, ensuring they only attend to previous context.",
      explanation: "In autoregressive training, the model predicts the *next* token. If the attention mask didn't block future tokens, the model would simply 'cheat' by looking at the answer during training."
    }
  ],
  'multi-head-attention': [
    {
      id: 'q-k-kp-23',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the primary benefit of using Multi-Head Attention over a single attention head?",
      options: [
        "It reduces the total number of parameters in the model.",
        "It completely prevents overfitting.",
        "It allows the model to attend to different representation subspaces (e.g., syntax vs semantics) at different positions simultaneously.",
        "It allows the model to process multiple batches at once."
      ],
      correctAnswer: "It allows the model to attend to different representation subspaces (e.g., syntax vs semantics) at different positions simultaneously.",
      explanation: "By splitting the Queries, Keys, and Values into multiple heads, the model can learn multiple independent attention patterns. For instance, one head might look for pronouns, while another looks for rhyming words."
    }
  ],
  'positional-encoding-gpt': [
    {
      id: 'q-k-kp-24',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why do Transformer architectures strictly require positional encodings or embeddings?",
      options: [
        "Because they use RNNs under the hood.",
        "Because the self-attention mechanism is a set operation (permutation equivariant) and has no inherent notion of sequence order.",
        "To regularize the input embeddings.",
        "Because it is required to normalize the data."
      ],
      correctAnswer: "Because the self-attention mechanism is a set operation (permutation equivariant) and has no inherent notion of sequence order.",
      explanation: "Unlike Recurrent Neural Networks (RNNs) that process tokens sequentially, attention processes all tokens simultaneously. Without adding positional information, the model wouldn't know if a word is at the beginning or end of a sentence."
    }
  ],
  'residual-connections': [
    {
      id: 'q-k-kp-25',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "How do residual (skip) connections primarily help in training deep Transformers?",
      options: [
        "They reduce the sequence length.",
        "They provide a direct 'highway' path for gradients to flow backwards, mitigating the vanishing gradient problem in deep networks.",
        "They act as a substitute for Layer Normalization.",
        "They force the network to output zero."
      ],
      correctAnswer: "They provide a direct 'highway' path for gradients to flow backwards, mitigating the vanishing gradient problem in deep networks.",
      explanation: "By adding the input of a layer to its output (`x + layer(x)`), the gradient can pass directly through the addition operation during backpropagation. This ensures early layers receive strong gradient signals."
    }
  ],
  'mixed-precision-training': [
    {
      id: 'q-k-kp-26',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the main advantage of Mixed Precision training (e.g., using bfloat16 or float16) when reproducing GPT-2?",
      options: [
        "It perfectly eliminates all training loss.",
        "It drastically reduces memory bandwidth requirements and speeds up tensor core compute, often doubling training speed with minimal accuracy loss.",
        "It allows the model to handle infinite context windows.",
        "It prevents dead neurons."
      ],
      correctAnswer: "It drastically reduces memory bandwidth requirements and speeds up tensor core compute, often doubling training speed with minimal accuracy loss.",
      explanation: "Modern GPUs have specialized Tensor Cores that perform matrix multiplications incredibly fast in fp16/bf16. Using mixed precision cuts memory usage in half and accelerates math, while keeping critical operations in fp32 to maintain numerical stability."
    }
  ],
  'gradient-accumulation': [
    {
      id: 'q-k-kp-27',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How does Gradient Accumulation solve the problem of training with large batch sizes on memory-constrained GPUs?",
      options: [
        "By dynamically compressing the model weights.",
        "By skipping the backward pass for half the batch.",
        "By accumulating gradients over multiple smaller micro-steps (forward/backward) before performing a single optimizer weight update.",
        "By storing gradients on the CPU instead of the GPU."
      ],
      correctAnswer: "By accumulating gradients over multiple smaller micro-steps (forward/backward) before performing a single optimizer weight update.",
      explanation: "If a GPU can only hold a batch of 4, you can run 8 forward/backward passes, summing the gradients each time, and then step the optimizer. Mathematically, this simulates a batch size of 32 (8 * 4)."
    }
  ],
  'distributed-data-parallel': [
    {
      id: 'q-k-kp-28',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "In PyTorch's Distributed Data Parallel (DDP), how are model gradients synchronized across multiple GPUs?",
      options: [
        "Only the main GPU calculates gradients, the others only do forward passes.",
        "Each GPU computes gradients on its own data split, and an All-Reduce operation averages the gradients across all GPUs before the optimizer step.",
        "Models are split layer-by-layer across the GPUs.",
        "Gradients are never synchronized; each GPU trains a separate model."
      ],
      correctAnswer: "Each GPU computes gradients on its own data split, and an All-Reduce operation averages the gradients across all GPUs before the optimizer step.",
      explanation: "DDP duplicates the entire model on every GPU. Each processes a different chunk of the batch. During the backward pass, an All-Reduce communication averages the gradients so every GPU makes the exact same weight update."
    }
  ],
  'fused-adamw': [
    {
      id: 'q-k-kp-29',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "What does a 'fused' optimizer (like Fused AdamW in PyTorch) do differently than a standard un-fused optimizer to speed up training?",
      options: [
        "It fuses multiple elemental parameter-update operations into a single CUDA kernel, reducing memory reads/writes between HBM and SRAM.",
        "It fuses the forward and backward passes together.",
        "It fuses the loss calculation with the optimizer.",
        "It merges all the weights into one giant vector."
      ],
      correctAnswer: "It fuses multiple elemental parameter-update operations into a single CUDA kernel, reducing memory reads/writes between HBM and SRAM.",
      explanation: "Standard optimizers execute many small operations (multiply, add, square root) sequentially, reading/writing to High Bandwidth Memory (HBM) each time. Fused kernels do it all in fast SRAM in one go, removing memory bottlenecks."
    }
  ],
  'flash-attention': [
    {
      id: 'q-k-kp-30',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "Why is FlashAttention significantly faster and more memory-efficient than the standard PyTorch attention implementation?",
      options: [
        "It approximates the attention matrix, sacrificing accuracy for speed.",
        "It removes the softmax operation completely.",
        "It computes exact attention in a hardware-aware manner, using tiling and recomputation to minimize memory reads/writes between GPU HBM and SRAM.",
        "It runs exclusively on the CPU."
      ],
      correctAnswer: "It computes exact attention in a hardware-aware manner, using tiling and recomputation to minimize memory reads/writes between GPU HBM and SRAM.",
      explanation: "Standard attention materializes a massive NxN attention matrix in slow GPU HBM. FlashAttention avoids this by processing the attention block by block (tiling) entirely in fast SRAM, yielding exact results with massive speedups."
    }
  ]
})
