import { registerQuestions } from './index'

registerQuestions({
  'resnet-architectures': [
    {
      id: 'q-fai-kp-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why do ResNet architectures perform better than extremely deep plain CNNs?",
      options: [
        "They have fewer parameters, making them faster to train.",
        "They introduce skip connections (residuals) that mitigate the vanishing gradient problem, allowing for deeper networks.",
        "They automatically augment the dataset during the forward pass.",
        "They use larger convolutional kernels in every layer."
      ],
      correctAnswer: "They introduce skip connections (residuals) that mitigate the vanishing gradient problem, allowing for deeper networks.",
      explanation: "ResNets utilize skip connections (or residual connections) that bypass some layers, providing an alternative path for the gradient to flow backwards. This solves the vanishing gradient problem, which plagues very deep plain networks."
    }
  ],
  'fine-tuning-vision': [
    {
      id: 'q-fai-kp-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "When fine-tuning a pre-trained vision model in fastai, what is the typical initial training step?",
      options: [
        "Unfreeze all layers and train with a high learning rate.",
        "Train only the newly added, randomly initialized head (the final layers) while keeping the pre-trained body frozen.",
        "Train only the first convolutional layer while freezing the rest.",
        "Re-initialize all weights randomly before training."
      ],
      correctAnswer: "Train only the newly added, randomly initialized head (the final layers) while keeping the pre-trained body frozen.",
      explanation: "In fastai, fine-tuning typically starts by freezing the pre-trained 'body' (which already knows how to detect general features) and training only the randomly initialized 'head' (customized for the specific task), before unfreezing and training the entire network with discriminative learning rates."
    }
  ],
  'data-augmentation': [
    {
      id: 'q-fai-kp-3',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "What is the primary purpose of applying data augmentation to training images?",
      options: [
        "To increase the resolution of the images.",
        "To reduce the storage space required for the dataset.",
        "To artificially increase the diversity of the training set by applying random transformations, reducing overfitting.",
        "To normalize the pixel values to a standard range."
      ],
      correctAnswer: "To artificially increase the diversity of the training set by applying random transformations, reducing overfitting.",
      explanation: "Data augmentation (like random cropping, flipping, and rotation) forces the model to learn invariant features, making it generalize better to unseen data and reducing overfitting."
    }
  ],
  'model-deployment-hf': [
    {
      id: 'q-fai-kp-4',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "Which of the following describes a common approach to deploying a fastai model to Hugging Face Spaces?",
      options: [
        "Writing a custom C++ inference engine.",
        "Exporting the model as a pickle file (.pkl) and loading it within a Gradio or Streamlit app.",
        "Training the model from scratch directly on the Hugging Face servers.",
        "Using a specialized hardware accelerator specifically designed for Hugging Face."
      ],
      correctAnswer: "Exporting the model as a pickle file (.pkl) and loading it within a Gradio or Streamlit app.",
      explanation: "fastai models can be easily exported to a .pkl file and deployed using frameworks like Gradio or Streamlit on Hugging Face Spaces for interactive web applications."
    }
  ],
  'learning-rate-finder': [
    {
      id: 'q-fai-kp-5',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How does the Learning Rate Finder help in training a neural network?",
      options: [
        "It automatically finds the perfect architecture for the dataset.",
        "It trains the model completely without any manual intervention.",
        "It gradually increases the learning rate while training for one epoch, helping identify the optimal learning rate before the loss explodes.",
        "It dynamically adjusts the learning rate during the final training phase."
      ],
      correctAnswer: "It gradually increases the learning rate while training for one epoch, helping identify the optimal learning rate before the loss explodes.",
      explanation: "The LR Finder slowly increases the learning rate and records the loss. By plotting this, practitioners can pick a learning rate where the loss is decreasing most rapidly (steepest downward slope) before it starts diverging."
    }
  ],
  'datablock-api': [
    {
      id: 'q-fai-kp-6',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the primary function of the DataBlock API in fastai?",
      options: [
        "To define the neural network architecture.",
        "To build the computational graph for backpropagation.",
        "To provide a flexible, high-level declarative way to specify how data should be loaded, split, and transformed.",
        "To manage database connections."
      ],
      correctAnswer: "To provide a flexible, high-level declarative way to specify how data should be loaded, split, and transformed.",
      explanation: "The DataBlock API is a highly customizable pipeline system that defines the types of inputs/targets, how to get items, how to split data into train/validation sets, and what transformations to apply."
    }
  ],
  'progressive-resizing': [
    {
      id: 'q-fai-kp-7',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the concept of progressive resizing in fastai?",
      options: [
        "Training a model initially on smaller images, then continuing training on progressively larger versions of the same images.",
        "Gradually increasing the depth of the neural network during training.",
        "Increasing the batch size linearly as training progresses.",
        "Dynamically adjusting the size of the convolution kernels."
      ],
      correctAnswer: "Training a model initially on smaller images, then continuing training on progressively larger versions of the same images.",
      explanation: "Progressive resizing speeds up initial training and helps the model generalize better by learning scale-invariant features. It’s like a form of data augmentation that changes image resolution."
    }
  ],
  'test-time-augmentation': [
    {
      id: 'q-fai-kp-8',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How does Test-Time Augmentation (TTA) improve model accuracy?",
      options: [
        "By applying data augmentation during validation to artificially increase the size of the validation set.",
        "By predicting on the original image and several augmented versions of it, then averaging the predictions.",
        "By fine-tuning the model on the test set before final evaluation.",
        "By training the model for a longer duration."
      ],
      correctAnswer: "By predicting on the original image and several augmented versions of it, then averaging the predictions.",
      explanation: "TTA creates multiple augmented copies of an input during inference. The model predicts on all copies, and the results are averaged (or maxed), leading to a more robust and accurate final prediction."
    }
  ],
  'mixup-augmentation': [
    {
      id: 'q-fai-kp-9',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "Which of the following best describes the Mixup data augmentation technique?",
      options: [
        "Randomly swapping pixels between two images.",
        "Adding Gaussian noise to images.",
        "Taking a linear combination (weighted average) of two input images and their corresponding one-hot encoded labels.",
        "Using a generative adversarial network to create mixed images."
      ],
      correctAnswer: "Taking a linear combination (weighted average) of two input images and their corresponding one-hot encoded labels.",
      explanation: "Mixup blends two images (e.g., 30% dog, 70% cat) and their labels simultaneously. This regularizes the network, forcing it to make smoother transitions between classes."
    }
  ],
  'label-smoothing': [
    {
      id: 'q-fai-kp-10',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "What problem does label smoothing address?",
      options: [
        "The vanishing gradient problem.",
        "The network becoming overconfident in its predictions, which can lead to poor generalization.",
        "Imbalanced datasets where one class has too few samples.",
        "Incorrectly labeled data in the training set."
      ],
      correctAnswer: "The network becoming overconfident in its predictions, which can lead to poor generalization.",
      explanation: "Instead of using hard one-hot targets (e.g., [1.0, 0.0]), label smoothing changes them to softer probabilities (e.g., [0.9, 0.1]). This discourages the network from pushing logits to extreme values and improves generalization."
    }
  ],
  'tokenization-numericalization': [
    {
      id: 'q-fai-kp-11',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "What is the order of the two main steps in preparing raw text for an NLP model?",
      options: [
        "Tokenization (splitting text into distinct units), then Numericalization (converting tokens to integers).",
        "Numericalization (converting characters to ASCII), then Tokenization (grouping ASCII into words).",
        "Stemming, then Lemmatization.",
        "Embedding, then Tokenization."
      ],
      correctAnswer: "Tokenization (splitting text into distinct units), then Numericalization (converting tokens to integers).",
      explanation: "Raw text must first be split into tokens (words, subwords, or characters). Then, a vocabulary is built, and those tokens are numericalized (mapped to unique integer indices) before they can be fed into an embedding layer."
    }
  ],
  'ulmfit-approach': [
    {
      id: 'q-fai-kp-12',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What are the three stages of the ULMFiT (Universal Language Model Fine-tuning) approach?",
      options: [
        "Tokenization, Numericalization, Embedding.",
        "Training from scratch, Freezing, Unfreezing.",
        "Pre-training a Language Model on a large corpus, Fine-tuning the LM on the target dataset, Fine-tuning a Classifier on the target task.",
        "Data collection, Model building, Model deployment."
      ],
      correctAnswer: "Pre-training a Language Model on a large corpus, Fine-tuning the LM on the target dataset, Fine-tuning a Classifier on the target task.",
      explanation: "ULMFiT introduced transfer learning to NLP by first pre-training a language model (e.g., on Wikipedia), fine-tuning it to the specific style of the target corpus, and finally replacing the LM head with a classifier head to fine-tune on the classification task."
    }
  ],
  'language-model-finetuning': [
    {
      id: 'q-fai-kp-13',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why is it important to fine-tune the language model on your specific dataset before training a classifier?",
      options: [
        "To increase the size of the vocabulary.",
        "Because the pre-trained model knows English grammar, but needs to learn the specific jargon, style, and distribution of the target dataset.",
        "To convert the text data into numerical vectors.",
        "To reduce the number of parameters in the model."
      ],
      correctAnswer: "Because the pre-trained model knows English grammar, but needs to learn the specific jargon, style, and distribution of the target dataset.",
      explanation: "A Wikipedia pre-trained model knows general English, but fine-tuning it as an LM on your specific dataset (e.g., IMDB reviews or medical notes) helps it adapt to the domain-specific vocabulary and stylistic nuances."
    }
  ],
  'rnn-lstm-basics': [
    {
      id: 'q-fai-kp-14',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is a major advantage of LSTMs over standard RNNs?",
      options: [
        "LSTMs do not require backpropagation.",
        "LSTMs are much faster to train.",
        "LSTMs use cell states and gates to better preserve long-term dependencies and mitigate the vanishing gradient problem.",
        "LSTMs only process text data, whereas RNNs process audio."
      ],
      correctAnswer: "LSTMs use cell states and gates to better preserve long-term dependencies and mitigate the vanishing gradient problem.",
      explanation: "LSTMs introduce a complex gating mechanism (forget, input, output gates) and a separate cell state, which allows gradients to flow more easily across long sequences, solving the vanishing gradient issue of vanilla RNNs."
    }
  ],
  'text-dataloaders': [
    {
      id: 'q-fai-kp-15',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How does fastai\'s TextDataLoader typically handle text documents of varying lengths?",
      options: [
        "It truncates all documents to the length of the shortest document.",
        "It pads shorter documents with a special padding token and sorts them by length to minimize padding.",
        "It processes them one by one without batching.",
        "It removes punctuation to equalize lengths."
      ],
      correctAnswer: "It pads shorter documents with a special padding token and sorts them by length to minimize padding.",
      explanation: "To process sequences in parallel batches, fastai pads shorter sequences with a special token (like `xxpad`). It also uses techniques like sorting by length (SortishSampler) to group sequences of similar lengths, minimizing wasted computation on padding."
    }
  ],
  'embedding-layers-categoricals': [
    {
      id: 'q-fai-kp-16',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How does an embedding layer handle categorical variables differently from one-hot encoding?",
      options: [
        "It converts categorical variables into strings.",
        "It maps categorical variables into dense, learnable, lower-dimensional continuous vectors rather than sparse, high-dimensional binary vectors.",
        "It assigns a single arbitrary integer to each category.",
        "It ignores categorical variables completely."
      ],
      correctAnswer: "It maps categorical variables into dense, learnable, lower-dimensional continuous vectors rather than sparse, high-dimensional binary vectors.",
      explanation: "Embeddings map categories (like user IDs or zip codes) to dense vectors. The network learns these vector representations during training, capturing semantic relationships between categories that one-hot encoding cannot."
    }
  ],
  'decision-trees-ensembles': [
    {
      id: 'q-fai-kp-17',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the main principle behind Random Forests?",
      options: [
        "Using a single, very deep decision tree.",
        "Training multiple decision trees on different random subsets of data and features, then averaging their predictions to reduce variance.",
        "Training trees sequentially, where each tree corrects the errors of the previous one.",
        "Replacing decision trees with shallow neural networks."
      ],
      correctAnswer: "Training multiple decision trees on different random subsets of data and features, then averaging their predictions to reduce variance.",
      explanation: "Random Forests are an ensemble method that builds numerous independent decision trees (bagging) using random subsets of data and features. Averaging their outputs creates a more robust model that is less prone to overfitting than a single tree."
    }
  ],
  'matrix-factorization': [
    {
      id: 'q-fai-kp-18',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "In the context of collaborative filtering, what does matrix factorization attempt to do?",
      options: [
        "Calculate the determinant of the user-item interaction matrix.",
        "Invert the user-item matrix.",
        "Decompose the large, sparse user-item interaction matrix into the dot product of two lower-dimensional matrices (user embeddings and item embeddings).",
        "Convert the matrix into a pandas DataFrame."
      ],
      correctAnswer: "Decompose the large, sparse user-item interaction matrix into the dot product of two lower-dimensional matrices (user embeddings and item embeddings).",
      explanation: "Matrix factorization discovers latent factors by finding a user embedding matrix and an item embedding matrix such that their dot product approximates the known ratings in the sparse user-item matrix."
    }
  ],
  'cold-start-problem': [
    {
      id: 'q-fai-kp-19',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "What is the 'Cold Start Problem' in recommender systems?",
      options: [
        "When the servers take too long to boot up.",
        "The difficulty in providing accurate recommendations for new users or new items that have no prior interaction history.",
        "When the learning rate is initially set too low.",
        "When the model\'s weights are initialized to zero."
      ],
      correctAnswer: "The difficulty in providing accurate recommendations for new users or new items that have no prior interaction history.",
      explanation: "Collaborative filtering relies on past user-item interactions. A 'cold start' occurs when a new user joins or a new item is added, making it impossible to recommend based on historical data until interactions occur."
    }
  ],
  'tabular-dataloaders': [
    {
      id: 'q-fai-kp-20',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "When preparing tabular data in fastai, how are continuous and categorical variables typically preprocessed?",
      options: [
        "Continuous variables are one-hot encoded, categoricals are ignored.",
        "Both are normalized to have a mean of 0 and standard deviation of 1.",
        "Continuous variables are normalized/filled; categorical variables are label-encoded to prepare them for embedding layers.",
        "Categorical variables are normalized, continuous variables are label-encoded."
      ],
      correctAnswer: "Continuous variables are normalized/filled; categorical variables are label-encoded to prepare them for embedding layers.",
      explanation: "In fastai\'s tabular processing (TabularPandas), continuous variables have missing values filled and are normalized, while categorical variables are stringified, categorized, and converted to integer codes for the embedding layers."
    }
  ],
  'convolutions-pooling': [
    {
      id: 'q-fai-kp-21',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the primary role of a Max Pooling layer in a CNN?",
      options: [
        "To increase the number of channels.",
        "To perform a non-linear activation.",
        "To reduce the spatial dimensions (height and width) of the feature maps, reducing parameters and providing translation invariance.",
        "To compute the loss of the network."
      ],
      correctAnswer: "To reduce the spatial dimensions (height and width) of the feature maps, reducing parameters and providing translation invariance.",
      explanation: "Max pooling downsamples the feature maps by taking the maximum value over a small window. This reduces computational load, controls overfitting, and makes the detection of features somewhat invariant to small translations."
    }
  ],
  'cross-entropy-loss': [
    {
      id: 'q-fai-kp-22',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why is Cross-Entropy Loss preferred over Mean Squared Error (MSE) for classification tasks?",
      options: [
        "Because MSE can only be used for images.",
        "Cross-entropy heavily penalizes confident but incorrect predictions, and its gradient pairs well with the softmax function to prevent learning slowdowns.",
        "Cross-entropy requires less memory.",
        "Cross-entropy does not require labels."
      ],
      correctAnswer: "Cross-entropy heavily penalizes confident but incorrect predictions, and its gradient pairs well with the softmax function to prevent learning slowdowns.",
      explanation: "Cross-entropy loss measures the difference between two probability distributions. Unlike MSE, when combined with softmax, its derivative is linear w.r.t the logits, avoiding the vanishing gradient problem when predictions are very wrong but confident."
    }
  ],
  'weight-initialization': [
    {
      id: 'q-fai-kp-23',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "Why do we use specific weight initialization techniques like Kaiming (He) initialization instead of initializing all weights to zero?",
      options: [
        "Initializing to zero causes the network to output NaN.",
        "Initializing to zero breaks symmetry; all neurons would learn the exact same features during backpropagation.",
        "Initializing to zero makes the learning rate too high.",
        "Kaiming initialization guarantees global minima."
      ],
      correctAnswer: "Initializing to zero breaks symmetry; all neurons would learn the exact same features during backpropagation.",
      explanation: "If weights are initialized to zero, every neuron in a layer computes the same output and receives the same gradient, effectively acting as a single neuron. Kaiming/He initialization breaks this symmetry and scales the variance to prevent vanishing/exploding gradients with ReLU activations."
    }
  ],
  'adam-rmsprop': [
    {
      id: 'q-fai-kp-24',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "How does the Adam optimizer improve upon standard Stochastic Gradient Descent?",
      options: [
        "By ignoring the learning rate completely.",
        "By only updating weights once per epoch.",
        "By computing adaptive learning rates for each parameter based on estimates of first and second moments of the gradients (momentum and variance).",
        "By automatically adding layers to the network."
      ],
      correctAnswer: "By computing adaptive learning rates for each parameter based on estimates of first and second moments of the gradients (momentum and variance).",
      explanation: "Adam (Adaptive Moment Estimation) combines ideas from Momentum (exponential moving average of past gradients) and RMSProp (scaling by the moving average of squared gradients) to adaptively adjust the learning rate for each individual parameter."
    }
  ],
  'stochastic-gradient-descent': [
    {
      id: 'q-fai-kp-25',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What makes 'Stochastic' Gradient Descent (SGD) different from standard Gradient Descent?",
      options: [
        "It introduces randomness into the loss function.",
        "It updates parameters using a small random mini-batch of data at each step, rather than the entire dataset.",
        "It changes the network architecture randomly.",
        "It uses a randomly selected activation function."
      ],
      correctAnswer: "It updates parameters using a small random mini-batch of data at each step, rather than the entire dataset.",
      explanation: "Standard GD computes the gradient over the entire dataset before taking a step. SGD approximates the gradient using a random mini-batch, making it much faster to compute and allowing for more frequent updates."
    }
  ],
  'autoencoders': [
    {
      id: 'q-fai-kp-26',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "What is the primary architectural structure of an Autoencoder?",
      options: [
        "A generator and a discriminator.",
        "An encoder that compresses input into a latent representation, and a decoder that reconstructs the input from that representation.",
        "A sequence of identical Transformer blocks.",
        "Only fully connected layers with no hidden bottleneck."
      ],
      correctAnswer: "An encoder that compresses input into a latent representation, and a decoder that reconstructs the input from that representation.",
      explanation: "An autoencoder learns to copy its input to its output through a bottleneck layer (latent space). The encoder compresses the data, and the decoder attempts to reconstruct it, forcing the model to learn a meaningful lower-dimensional representation."
    }
  ],
  'unet-architectures': [
    {
      id: 'q-fai-kp-27',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: "What specific feature distinguishes a U-Net from a standard encoder-decoder architecture?",
      options: [
        "It does not use convolutions.",
        "It relies heavily on recurrent layers.",
        "It incorporates skip connections that concatenate high-resolution features from the encoder directly to the corresponding layers in the decoder.",
        "It uses a softmax layer at every step."
      ],
      correctAnswer: "It incorporates skip connections that concatenate high-resolution features from the encoder directly to the corresponding layers in the decoder.",
      explanation: "U-Net introduces skip connections across the 'U' shape. These connections pass spatial information from the downsampling path directly to the upsampling path, crucial for precise localization in tasks like image segmentation."
    }
  ],
  'gan-basics': [
    {
      id: 'q-fai-kp-28',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "In a Generative Adversarial Network (GAN), what are the roles of the two competing networks?",
      options: [
        "An encoder compresses data; a decoder decompresses it.",
        "A generator tries to create fake data that looks real; a discriminator tries to distinguish between real data and the fake data.",
        "An actor selects actions; a critic evaluates them.",
        "A teacher model provides labels; a student model learns them."
      ],
      correctAnswer: "A generator tries to create fake data that looks real; a discriminator tries to distinguish between real data and the fake data.",
      explanation: "GANs consist of a Generator (which synthesizes fake data from noise) and a Discriminator (which acts as a binary classifier to distinguish real vs. fake). They are trained together in a zero-sum game."
    }
  ],
  'diffusion-fundamentals': [
    {
      id: 'q-fai-kp-29',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "How do Diffusion models (like Stable Diffusion) generate images?",
      options: [
        "By adversarial training against a discriminator.",
        "By predicting the next pixel in a sequence autoregressively.",
        "By starting with random noise and iteratively applying a neural network to denoise it step-by-step into a clear image.",
        "By applying a single pass through a U-Net."
      ],
      correctAnswer: "By starting with random noise and iteratively applying a neural network to denoise it step-by-step into a clear image.",
      explanation: "Diffusion models are trained to reverse a forward diffusion process (which adds noise to an image). During generation, they start with pure Gaussian noise and iteratively 'denoise' it to reveal a coherent image."
    }
  ],
  'ethical-implications-ai': [
    {
      id: 'q-fai-kp-30',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Why is evaluating the ethical implications of AI models, like bias and fairness, critical before deployment?",
      options: [
        "Because ethical models always run faster on GPUs.",
        "To prevent models from amplifying existing societal biases present in the training data, which can lead to unfair or harmful outcomes.",
        "It is only required by law; there is no technical reason.",
        "Because it reduces the size of the model\'s weights."
      ],
      correctAnswer: "To prevent models from amplifying existing societal biases present in the training data, which can lead to unfair or harmful outcomes.",
      explanation: "Machine learning models learn from historical data. If that data contains biases, the model will likely learn and automate those biases, potentially causing harm when deployed in real-world systems."
    }
  ]
})
