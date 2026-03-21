import { registerQuestions } from "./index";

registerQuestions({
  "resnet-architectures": [
    {
      id: "q-fai-kp-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why do ResNet architectures perform better than extremely deep plain CNNs?",
      options: [
        "They have fewer parameters, making them faster to train.",
        "They introduce skip connections (residuals) that mitigate the vanishing gradient problem, allowing for deeper networks.",
        "They automatically augment the dataset during the forward pass.",
        "They use larger convolutional kernels in every layer.",
      ],
      correctAnswer:
        "They introduce skip connections (residuals) that mitigate the vanishing gradient problem, allowing for deeper networks.",
      explanation:
        "ResNets utilize skip connections (or residual connections) that bypass some layers, providing an alternative path for the gradient to flow backwards. This solves the vanishing gradient problem, which plagues very deep plain networks.",
      hints: [
        "Think about what happens to gradients as they flow backward through many layers.",
        "ResNet stands for Residual Network — the key is in the name.",
      ],
    },
    {
      id: "q-fai-kp-1b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In fastai, which function is used to create a vision learner with a pre-trained ResNet backbone?",
      options: [
        "vision_learner(dls, resnet34, metrics=error_rate)",
        "create_cnn(dls, resnet34, metrics=error_rate)",
        "Learner.from_model(dls, resnet34)",
        "ImageLearner(dls, arch=resnet34)",
      ],
      correctAnswer: 0,
      explanation:
        "fastai\'s `vision_learner` function creates a `Learner` that wraps a pre-trained architecture (like `resnet34`) with a custom head, ready for fine-tuning. It sets up the DataLoaders, model, loss function, and metrics together.",
      hints: [
        "fastai renamed `cnn_learner` to `vision_learner` in version 2.",
        "The first argument is the DataLoaders, the second is the architecture.",
      ],
    },
    {
      id: "q-fai-kp-1c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does the number in a ResNet name (e.g., ResNet-34 vs ResNet-50) indicate?",
      options: [
        "The number of convolutional filters in the first layer.",
        "The total number of layers with learnable parameters.",
        "The input image resolution.",
        "The number of skip connections.",
      ],
      correctAnswer: 1,
      explanation:
        "The number in a ResNet variant name (18, 34, 50, 101, 152) refers to the total number of layers with learnable weights (weight layers). Deeper networks are more expressive but require more computation and data.",
      hints: [
        "ResNet-34 has 34 layers while ResNet-50 has 50 layers.",
        "More layers generally means more representational power, but also more compute.",
      ],
    },
    {
      id: "q-fai-kp-1d",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a ResNet skip connection, the input to a block is added element-wise to the output of that block before the activation function.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The core idea of a residual block is: output = F(x) + x, where F(x) is the transformation learned by the block\'s layers, and x is the identity shortcut. The addition happens before the final ReLU activation.",
      hints: [
        "The residual connection passes the identity of x alongside the learned transformation.",
        "Think about what \'residual\' means — the block learns the residual on top of the identity.",
      ],
    },
    {
      id: "q-fai-kp-1e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ResNet-50 and deeper use 'bottleneck' residual blocks instead of the basic blocks used in ResNet-34. What is the key difference?",
      options: [
        "Bottleneck blocks use larger 7×7 convolutions.",
        "Bottleneck blocks use 1×1 convolutions to reduce and then restore channel dimensions around a 3×3 convolution, reducing computation.",
        "Bottleneck blocks remove skip connections entirely.",
        "Bottleneck blocks replace ReLU with sigmoid activations.",
      ],
      correctAnswer: 1,
      explanation:
        "Bottleneck blocks use a 1×1 conv to reduce channels, a 3×3 conv on the reduced channels, then a 1×1 conv to restore channel count. This reduces the number of parameters and computation while preserving representational power.",
      hints: [
        "The 1×1 convolution acts as a channel dimension reducer (bottleneck).",
        "This design allows ResNet-50 to be deeper than ResNet-34 without a proportional increase in parameters.",
      ],
    },
    {
      id: "q-fai-kp-1f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When fastai\'s `fine_tune()` method trains a vision model, what happens during epoch 1 vs subsequent epochs by default?",
      options: [
        "Epoch 1 trains the entire model; subsequent epochs freeze the body.",
        "Epoch 1 trains only the head (body frozen); subsequent epochs train all layers with discriminative learning rates.",
        "All epochs train only the final linear layer.",
        "Epoch 1 runs the learning rate finder; subsequent epochs do actual training.",
      ],
      correctAnswer: 1,
      explanation:
        "fastai\'s `fine_tune(n)` performs one epoch of frozen body training first (training just the head), then unfreezes all layers and trains for `n` epochs using discriminative learning rates — lower rates for earlier layers, higher for the head.",
      hints: [
        "The body of a pre-trained model already has useful features; the head needs more training.",
        "`fine_tune` is a convenience wrapper around `fit_one_cycle` with freeze/unfreeze logic.",
      ],
    },
  ],
  "fine-tuning-vision": [
    {
      id: "q-fai-kp-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When fine-tuning a pre-trained vision model in fastai, what is the typical initial training step?",
      options: [
        "Unfreeze all layers and train with a high learning rate.",
        "Train only the newly added, randomly initialized head (the final layers) while keeping the pre-trained body frozen.",
        "Train only the first convolutional layer while freezing the rest.",
        "Re-initialize all weights randomly before training.",
      ],
      correctAnswer:
        "Train only the newly added, randomly initialized head (the final layers) while keeping the pre-trained body frozen.",
      explanation:
        "In fastai, fine-tuning typically starts by freezing the pre-trained \'body\' (which already knows how to detect general features) and training only the randomly initialized \'head\' (customized for the specific task), before unfreezing and training the entire network with discriminative learning rates.",
      hints: [
        "The pre-trained weights are valuable — you don\'t want to destroy them with a high learning rate early on.",
        "Think about what \'freezing\' layers means: their weights are not updated during backprop.",
      ],
    },
    {
      id: "q-fai-kp-2b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are discriminative learning rates in the context of fine-tuning?",
      options: [
        "Using different loss functions for different layers.",
        "Applying different learning rate values to different layer groups, typically lower rates for earlier layers and higher rates for later layers.",
        "Using a single adaptive learning rate determined by the Adam optimizer.",
        "Doubling the learning rate every epoch.",
      ],
      correctAnswer: 1,
      explanation:
        "Discriminative learning rates allow earlier layers (which have learned general low-level features) to be updated slowly, while later layers (closer to the task-specific head) can be updated more aggressively. In fastai, you pass a slice to specify min/max LR.",
      hints: [
        "Earlier layers in a pre-trained network learned general features (edges, textures) that change little between tasks.",
        "In fastai, you can pass `lr_max=slice(1e-6, 1e-4)` to specify a range.",
      ],
    },
    {
      id: "q-fai-kp-2c",
      type: "true-false",
      difficulty: "easy",
      question:
        "In fastai, calling `learn.unfreeze()` before training allows gradients to flow through all layers of the model, including the pre-trained backbone.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "`learn.unfreeze()` sets `requires_grad=True` for all parameters in the model, enabling the pre-trained backbone\'s weights to be updated during subsequent training steps.",
      hints: [
        "Think about what freezing means in PyTorch: `requires_grad=False` prevents gradient computation.",
        "After unfreezing, you typically use discriminative learning rates to update different layers at different speeds.",
      ],
    },
    {
      id: "q-fai-kp-2d",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why might catastrophic forgetting occur if you fine-tune a pre-trained model with a high learning rate applied uniformly to all layers?",
      options: [
        "High learning rates cause numerical overflow in the loss function.",
        "Large weight updates to the early layers overwrite the useful general features learned during pre-training, degrading performance.",
        "The model becomes too small to fit in GPU memory.",
        "The activation functions saturate at high learning rates.",
      ],
      correctAnswer: 1,
      explanation:
        "Catastrophic forgetting happens when a model trained on a new task overwrites previously learned knowledge. Large updates to early pre-trained layers destroy their carefully learned representations of low-level features, which is why discriminative (lower) learning rates for early layers are critical.",
      hints: [
        "Pre-trained features in early layers (edges, curves) are useful for almost any vision task.",
        "The solution is to use much smaller learning rates for the pre-trained backbone than for the new head.",
      ],
    },
    {
      id: "q-fai-kp-2e",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does fastai\'s `learn.freeze_to(n)` method do?",
      options: [
        "It freezes the model\'s predictions for n epochs.",
        "It freezes the first n layer groups, leaving subsequent groups trainable.",
        "It freezes only the batch normalization layers.",
        "It freezes all layers after the n-th convolutional block.",
      ],
      correctAnswer: 1,
      explanation:
        "`learn.freeze_to(n)` is a more granular control that freezes the first n layer groups (not individual layers). This allows progressive unfreezing where you gradually unfreeze more of the pre-trained body over multiple training phases.",
      hints: [
        "fastai groups layers into \'layer groups\' for purposes like discriminative learning rates.",
        "Progressive unfreezing is one strategy: unfreeze from the top down over multiple cycles.",
      ],
    },
    {
      id: "q-fai-kp-2f",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In fastai, what does `learn.fine_tune(4)` do?",
      options: [
        "Trains 4 epochs with frozen body, then 4 epochs with all layers unfrozen.",
        "Trains 1 epoch with frozen body, then 4 epochs with all layers unfrozen.",
        "Runs the learning rate finder 4 times, then trains.",
        "Trains only the last 4 layers for all epochs.",
      ],
      correctAnswer: 1,
      explanation:
        "`learn.fine_tune(n)` is a convenience method: it trains 1 epoch with the body frozen (to warm up the head), then unfreezes everything and trains for n more epochs with discriminative learning rates. So `fine_tune(4)` = 1 frozen epoch + 4 unfrozen epochs.",
      hints: [
        "The argument to `fine_tune()` is the number of unfrozen epochs, not the total.",
        "The initial frozen epoch trains only the newly added head to a reasonable starting point.",
      ],
    },
  ],
  "data-augmentation": [
    {
      id: "q-fai-kp-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of applying data augmentation to training images?",
      options: [
        "To increase the resolution of the images.",
        "To reduce the storage space required for the dataset.",
        "To artificially increase the diversity of the training set by applying random transformations, reducing overfitting.",
        "To normalize the pixel values to a standard range.",
      ],
      correctAnswer:
        "To artificially increase the diversity of the training set by applying random transformations, reducing overfitting.",
      explanation:
        "Data augmentation (like random cropping, flipping, and rotation) forces the model to learn invariant features, making it generalize better to unseen data and reducing overfitting.",
      hints: [
        "Consider what problem augmentation solves: the model seeing the same image in the same way each epoch.",
        "Augmentation is applied randomly at train time, not at inference time (usually).",
      ],
    },
    {
      id: "q-fai-kp-3b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, what does `aug_transforms()` return, and when is it applied?",
      options: [
        "A single random flip transform applied during the dataset download.",
        "A list of GPU-accelerated batch-level augmentation transforms applied during training.",
        "A preprocessing pipeline that normalizes images and removes backgrounds.",
        "A set of transforms applied only to the validation set.",
      ],
      correctAnswer: 1,
      explanation:
        "`aug_transforms()` returns a collection of common augmentation transforms (flips, rotations, zoom, brightness, contrast, warp) that fastai applies on GPU at the batch level during training. Because they run on GPU after batch formation, they\'re much faster than CPU-based per-image augmentation.",
      hints: [
        "fastai performs augmentation on GPU at batch level for speed.",
        "These transforms are only applied during training, not validation, to give an honest evaluation.",
      ],
    },
    {
      id: "q-fai-kp-3c",
      type: "true-false",
      difficulty: "easy",
      question:
        "Data augmentation should be applied to both the training set and the validation set in fastai.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Data augmentation is applied only to the training set. The validation set uses deterministic transforms (like resizing and normalization only) to give an honest, reproducible measure of model performance. Randomly modifying validation images would make evaluation inconsistent.",
      hints: [
        "The validation set is used to measure how well your model generalizes — any randomness would make the metric noisy.",
        "In fastai\'s DataBlock API, `item_tfms` and `batch_tfms` with augmentation are designed for the training pipeline.",
      ],
    },
    {
      id: "q-fai-kp-3d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the difference between `item_tfms` and `batch_tfms` in the fastai DataBlock API?",
      options: [
        "`item_tfms` runs on GPU; `batch_tfms` runs on CPU.",
        "`item_tfms` are applied per-item (on CPU, often for resizing); `batch_tfms` are applied to the whole batch (on GPU, for augmentation).",
        "`item_tfms` only applies to labels; `batch_tfms` only applies to inputs.",
        "They are identical; fastai uses them interchangeably.",
      ],
      correctAnswer: 1,
      explanation:
        "`item_tfms` (like `Resize`) run on individual items on CPU before they are collated into a batch. `batch_tfms` (like `aug_transforms()`) run on full GPU batches and can apply randomized transforms much more efficiently.",
      hints: [
        "Resizing must happen before batching because all images in a batch must have the same dimensions.",
        "GPU-accelerated batch transforms can apply complex augmentations much faster than per-image CPU transforms.",
      ],
    },
    {
      id: "q-fai-kp-3e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is \'RandomErasing\' augmentation, and what type of overfitting does it help address?",
      options: [
        "It randomly erases entire images from the dataset; it addresses class imbalance.",
        "It randomly masks out rectangular patches of an image during training, encouraging the model not to over-rely on specific regions or features.",
        "It removes low-frequency noise from images; it addresses sensor noise overfitting.",
        "It randomly erases training labels; it addresses label noise.",
      ],
      correctAnswer: 1,
      explanation:
        "RandomErasing (also related to CutOut) randomly selects rectangular regions of training images and fills them with noise or zeros. This prevents the network from over-relying on specific discriminative regions, improving robustness and generalization.",
      hints: [
        "Think about what happens if a model always identifies a bird by its beak — RandomErasing forces it to use other features too.",
        "This is different from Mixup/CutMix which blend multiple images together.",
      ],
    },
    {
      id: "q-fai-kp-3f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, what does `RandomResizedCrop` do and why is it commonly used?",
      options: [
        "It resizes images to random sizes and saves them, increasing dataset storage size.",
        "It randomly crops a portion of the image (varying scale and aspect ratio) and resizes to the target size, providing both scale and spatial augmentation.",
        "It pads images with random colors to a target size.",
        "It randomly selects images to crop from the dataset.",
      ],
      correctAnswer: 1,
      explanation:
        "`RandomResizedCrop` samples a crop with random scale (e.g., 8-100% of image area) and random aspect ratio, then resizes to the target size. This single transform provides both scale invariance and positional augmentation, and is a staple of modern image classification pipelines.",
      hints: [
        "This is the standard augmentation used in training ImageNet models.",
        "It exposes the model to the object at various scales and positions, improving generalization.",
      ],
    },
  ],
  "learning-rate-finder": [
    {
      id: "q-fai-kp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does the Learning Rate Finder help in training a neural network?",
      options: [
        "It automatically finds the perfect architecture for the dataset.",
        "It trains the model completely without any manual intervention.",
        "It gradually increases the learning rate while training for one epoch, helping identify the optimal learning rate before the loss explodes.",
        "It dynamically adjusts the learning rate during the final training phase.",
      ],
      correctAnswer:
        "It gradually increases the learning rate while training for one epoch, helping identify the optimal learning rate before the loss explodes.",
      explanation:
        "The LR Finder slowly increases the learning rate and records the loss. By plotting this, practitioners can pick a learning rate where the loss is decreasing most rapidly (steepest downward slope) before it starts diverging.",
      hints: [
        "Look for the point of steepest descent on the loss vs. learning rate plot.",
        "The LR Finder was introduced by Leslie Smith in the paper \'Cyclical Learning Rates\'.",
      ],
    },
    {
      id: "q-fai-kp-5b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In fastai, how do you run the learning rate finder on a Learner object?",
      options: [
        "learn.lr_find()",
        "learn.find_lr()",
        "learn.search_lr()",
        "LRFinder(learn).run()",
      ],
      correctAnswer: 0,
      explanation:
        "fastai\'s `Learner` has a built-in `lr_find()` method that runs the learning rate finder, plots the loss vs. learning rate curve, and suggests a good learning rate. It resets the model weights after running so no actual learning is lost.",
      hints: [
        "The method name is `lr_find()`, similar to how you might name it: find the learning rate.",
        "It both runs the finder and plots the result automatically.",
      ],
    },
    {
      id: "q-fai-kp-5c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When reading the Learning Rate Finder plot, which learning rate should you typically select?",
      options: [
        "The learning rate at which the loss is at its absolute minimum.",
        "The learning rate that is roughly one order of magnitude smaller than where the loss starts to increase.",
        "The highest learning rate tested.",
        "The learning rate at the start of the curve where loss is still very high.",
      ],
      correctAnswer: 1,
      explanation:
        "You should pick a learning rate where the loss is still clearly decreasing — roughly one order of magnitude before the minimum loss point. The minimum itself is often too high and causes instability; you want the steepest downward slope region.",
      hints: [
        "Choosing the absolute minimum on the LR plot often leads to divergence in practice.",
        "Think of it as: where is loss falling fastest and most stably?",
      ],
    },
    {
      id: "q-fai-kp-5d",
      type: "true-false",
      difficulty: "easy",
      question:
        "The Learning Rate Finder resets the model weights after running, so it does not interfere with the actual training process.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "fastai\'s `lr_find()` saves the model state before running the finder and restores it afterward. This means you can safely run it before `fit_one_cycle()` without any risk of corrupting your model\'s weights.",
      hints: [
        "If it modified the weights, the LR finder itself would be a partial training run.",
        "fastai uses the `Recorder` callback to track losses during the finder sweep.",
      ],
    },
    {
      id: "q-fai-kp-5e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the 1-cycle learning rate policy (fit_one_cycle), and how does the learning rate change during training?",
      options: [
        "The learning rate stays constant for the entire training run.",
        "The learning rate increases linearly from a low value to a high value, then decreases back to a very low value, with a corresponding momentum schedule.",
        "The learning rate halves every epoch (step decay).",
        "The learning rate is set randomly for each mini-batch.",
      ],
      correctAnswer: 1,
      explanation:
        "Leslie Smith\'s 1-cycle policy increases the LR from a low start to a max value (warmup), then decreases back to a very small value (cosine annealing), while momentum does the inverse. This allows larger effective learning rates, speeding up convergence and often achieving better final accuracy.",
      hints: [
        "This is also called \'superconvergence\' — it often converges faster than constant-LR training.",
        "The momentum schedule is the inverse: it starts high, decreases as LR rises, then rises again.",
      ],
    },
    {
      id: "q-fai-kp-5f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, what is the difference between `fit()` and `fit_one_cycle()`?",
      options: [
        "`fit()` trains for one epoch only; `fit_one_cycle()` trains forever.",
        "`fit()` uses a constant learning rate; `fit_one_cycle()` uses the 1-cycle learning rate schedule with warmup and annealing.",
        "`fit()` uses the Adam optimizer; `fit_one_cycle()` uses SGD.",
        "They are identical but `fit_one_cycle()` logs more metrics.",
      ],
      correctAnswer: 1,
      explanation:
        "`fit()` trains with a fixed learning rate. `fit_one_cycle()` implements the 1-cycle policy: it ramps the LR up then down over all epochs, which in practice converges faster and often to better optima. fastai recommends `fit_one_cycle()` as the default training method.",
      hints: [
        "The 1-cycle policy was shown by Leslie Smith to achieve \'superconvergence\'.",
        "The LR schedule in `fit_one_cycle` spans the entire training run, not just one epoch.",
      ],
    },
  ],
  "datablock-api": [
    {
      id: "q-fai-kp-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the primary function of the DataBlock API in fastai?",
      options: [
        "To define the neural network architecture.",
        "To build the computational graph for backpropagation.",
        "To provide a flexible, high-level declarative way to specify how data should be loaded, split, and transformed.",
        "To manage database connections.",
      ],
      correctAnswer:
        "To provide a flexible, high-level declarative way to specify how data should be loaded, split, and transformed.",
      explanation:
        "The DataBlock API is a highly customizable pipeline system that defines the types of inputs/targets, how to get items, how to split data into train/validation sets, and what transformations to apply.",
      hints: [
        "DataBlock is about building DataLoaders — the things that feed data into training.",
        "Think of DataBlock as a recipe: it specifies all the steps to go from raw files to ready-to-train batches.",
      ],
    },
    {
      id: "q-fai-kp-6b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the fastai DataBlock API, what does the `splitter` argument control?",
      options: [
        "How images are cropped and resized.",
        "How the dataset is divided into training and validation sets.",
        "How the model\'s output is split into class probabilities.",
        "How the learning rate is split across layer groups.",
      ],
      correctAnswer: 1,
      explanation:
        "The `splitter` in a DataBlock determines which items go to the training set and which go to the validation set. Common splitters include `RandomSplitter` (random split by percentage), `GrandparentSplitter` (by folder name), and `IndexSplitter`.",
      hints: [
        "Without a splitter, fastai wouldn\'t know which data to validate on.",
        "fastai uses the validation set to compute metrics after each epoch.",
      ],
    },
    {
      id: "q-fai-kp-6c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the role of `get_items` in the fastai DataBlock API?",
      options: [
        "It defines the neural network architecture to use.",
        "It specifies the function used to retrieve the list of all items (e.g., file paths) from the data source.",
        "It defines how to augment each item.",
        "It returns the labels for each item.",
      ],
      correctAnswer: 1,
      explanation:
        "`get_items` is the function that collects all items (typically file paths) from the data source. For image data stored in folders, `get_image_files` is commonly used. The DataBlock calls this function to discover all available data.",
      hints: [
        "Common `get_items` functions: `get_image_files` for images, `get_text_files` for text.",
        "This is the first step in building a data pipeline: find all the data.",
      ],
    },
    {
      id: "q-fai-kp-6d",
      type: "true-false",
      difficulty: "easy",
      question:
        "In fastai\'s DataBlock API, `blocks=(ImageBlock, CategoryBlock)` indicates that the inputs are images and the targets (labels) are categories.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The `blocks` parameter defines the types of input and output. `(ImageBlock, CategoryBlock)` means: inputs are images, targets are single categories. Other combinations include `(ImageBlock, MultiCategoryBlock)` for multi-label classification or `(ImageBlock, ImageBlock)` for image-to-image tasks.",
      hints: [
        "The first element in `blocks` is the input type, the second is the target type.",
        "fastai uses this information to know which transforms, metrics, and loss functions make sense.",
      ],
    },
    {
      id: "q-fai-kp-6e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is `RandomSplitter(valid_pct=0.2, seed=42)` considered a better validation strategy than manually picking the last 20% of data?",
      options: [
        "It runs faster than picking a fixed split.",
        "It prevents data leakage by ensuring that similar images end up in both sets.",
        "Random splitting avoids ordering biases (e.g., data sorted by time or class) that could make the validation set unrepresentative.",
        "It always produces exactly the same split.",
      ],
      correctAnswer: 2,
      explanation:
        "If data is sorted (e.g., by date, subject, or class label), taking the last 20% would create a biased validation set. Random splitting with a fixed seed creates a representative validation split while remaining reproducible.",
      hints: [
        "Consider what happens if your image files are named by class: last 20% would only contain certain classes.",
        "Setting `seed=42` makes the split reproducible across runs.",
      ],
    },
    {
      id: "q-fai-kp-6f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, what does calling `dblock.summary(path)` do?",
      options: [
        "It prints the model architecture and parameter count.",
        "It runs the data pipeline on a sample, showing each transformation step and the shapes of the resulting tensors to help debug the DataBlock.",
        "It summarizes the training metrics from the last run.",
        "It counts the number of items per class in the dataset.",
      ],
      correctAnswer: 1,
      explanation:
        "`dblock.summary(path)` is an essential debugging tool that processes a small sample of data through the entire DataBlock pipeline, printing each step and showing the resulting tensor shapes. It helps identify misconfigured transforms, wrong block types, or unexpected data formats before training begins.",
      hints: [
        "When building a new DataBlock, `summary()` is the first thing to call if something seems wrong.",
        "It shows you exactly what your model will receive as input.",
      ],
    },
  ],
  "test-time-augmentation": [
    {
      id: "q-fai-kp-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "How does Test-Time Augmentation (TTA) improve model accuracy?",
      options: [
        "By applying data augmentation during validation to artificially increase the size of the validation set.",
        "By predicting on the original image and several augmented versions of it, then averaging the predictions.",
        "By fine-tuning the model on the test set before final evaluation.",
        "By training the model for a longer duration.",
      ],
      correctAnswer:
        "By predicting on the original image and several augmented versions of it, then averaging the predictions.",
      explanation:
        "TTA creates multiple augmented copies of an input during inference. The model predicts on all copies, and the results are averaged (or maxed), leading to a more robust and accurate final prediction.",
      hints: [
        "TTA is an inference-time technique — no additional training occurs.",
        "Averaging predictions from multiple views reduces the effect of any single augmentation artifact.",
      ],
    },
    {
      id: "q-fai-kp-8b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In fastai, how do you get TTA predictions for a validation set?",
      options: [
        "learn.predict_tta()",
        "learn.tta()",
        "learn.validate(tta=True)",
        "TTA(learn).predict(dl)",
      ],
      correctAnswer: 1,
      explanation:
        "fastai provides `learn.tta()` which applies Test-Time Augmentation and returns predictions. It runs the validation data through the model multiple times with different random augmentations and averages the results.",
      hints: [
        "The method is named `tta()` for Test-Time Augmentation.",
        "It returns a tuple of (predictions, targets) just like `get_preds()`.",
      ],
    },
    {
      id: "q-fai-kp-8c",
      type: "true-false",
      difficulty: "medium",
      question:
        "Test-Time Augmentation requires additional GPU memory during inference compared to standard single-pass prediction.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "TTA runs multiple forward passes (e.g., 4-8) for each input, which requires proportionally more memory and compute time. However, since it\'s inference only (no backprop), the memory overhead is smaller than training, and the accuracy gain often justifies the cost.",
      hints: [
        "Each augmented view requires its own forward pass through the model.",
        "No gradients are computed during TTA, which saves some memory compared to training.",
      ],
    },
    {
      id: "q-fai-kp-8d",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why does TTA typically NOT include random horizontal flips when the task involves reading text or digits?",
      options: [
        "Horizontal flips are computationally too expensive for text.",
        "Flipping text or digits creates images that are not valid examples of the class (e.g., a mirrored \'6\' looks like \'9\').",
        "fastai does not support flipping in TTA mode.",
        "Text images are always square, making flips redundant.",
      ],
      correctAnswer: 1,
      explanation:
        "Augmentations in TTA must produce images that are still valid members of their class. Horizontally flipping a \'b\' creates a \'d\', and flipping a \'6\' creates something similar to a \'9\'. Domain knowledge should guide which augmentations are appropriate for TTA.",
      hints: [
        "Think about whether a horizontally flipped image is still a valid example of the same class.",
        "This is why `aug_transforms()` has `do_flip` parameter to control whether flipping is applied.",
      ],
    },
    {
      id: "q-fai-kp-8e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the relationship between the number of TTA passes and the expected accuracy improvement?",
      options: [
        "More TTA passes always linearly improve accuracy.",
        "Accuracy improvement from TTA shows diminishing returns — most gains come from the first few passes, and eventually adding more passes provides negligible improvement.",
        "TTA with more than 10 passes decreases accuracy due to averaging noise.",
        "TTA passes must always be a power of 2 to work correctly.",
      ],
      correctAnswer: 1,
      explanation:
        "TTA shows diminishing returns: the first few augmented views provide the most variance reduction, but each additional view contributes less. Typically 4-8 TTA passes captures most of the benefit; going to 32 or 64 passes rarely improves results significantly enough to justify the compute cost.",
      hints: [
        "Think about the law of diminishing returns — the 100th sample from a distribution tells you little more than the 10th.",
        "In practice, 4 TTA passes is commonly used as a good trade-off.",
      ],
    },
    {
      id: "q-fai-kp-8f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does TTA relate to the concept of model ensembling?",
      options: [
        "TTA is completely unrelated to ensembling — it only applies to single models.",
        "TTA can be thought of as a single-model ensemble where the same model makes predictions on different augmented views of the same input, achieving some of ensembling\'s variance-reduction benefits.",
        "TTA requires training multiple models simultaneously.",
        "TTA and ensembling both require retraining the model multiple times.",
      ],
      correctAnswer: 1,
      explanation:
        "Model ensembling averages predictions from multiple differently-trained models to reduce variance. TTA achieves a similar effect by averaging predictions from the same model on multiple augmented views of one input. It\'s a computationally cheaper way to get some ensemble-like benefits.",
      hints: [
        "Both ensembling and TTA rely on the principle that averaging independent predictions reduces variance.",
        "TTA trades training multiple models for running multiple inference passes on one model.",
      ],
    },
  ],
  "mixup-augmentation": [
    {
      id: "q-fai-kp-9",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which of the following best describes the Mixup data augmentation technique?",
      options: [
        "Randomly swapping pixels between two images.",
        "Adding Gaussian noise to images.",
        "Taking a linear combination (weighted average) of two input images and their corresponding one-hot encoded labels.",
        "Using a generative adversarial network to create mixed images.",
      ],
      correctAnswer:
        "Taking a linear combination (weighted average) of two input images and their corresponding one-hot encoded labels.",
      explanation:
        "Mixup blends two images (e.g., 30% dog, 70% cat) and their labels simultaneously. This regularizes the network, forcing it to make smoother transitions between classes.",
      hints: [
        "Mixup applies to both the inputs AND the labels simultaneously.",
        "The blending weight lambda is sampled from a Beta distribution.",
      ],
    },
    {
      id: "q-fai-kp-9b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, how is Mixup typically enabled during training?",
      options: [
        "By adding `mixup=True` to the DataBlock definition.",
        "By passing `MixUp()` as a callback to the Learner.",
        "By calling `learn.mixup()` after training starts.",
        "By setting `augment=\'mixup\'` in `aug_transforms()`.",
      ],
      correctAnswer: 1,
      explanation:
        "In fastai, Mixup is implemented as a callback. You enable it by passing `cbs=MixUp()` (or `cbs=MixUp(0.4)` with a specific alpha) to the `Learner` constructor or `fit` method. The callback intercepts each batch and applies the mixing operation.",
      hints: [
        "fastai\'s callback system allows augmentation to be plugged into the training loop at the batch level.",
        "The `MixUp` callback modifies both inputs and targets before the forward pass.",
      ],
    },
    {
      id: "q-fai-kp-9c",
      type: "true-false",
      difficulty: "medium",
      question:
        "When using Mixup, the standard Cross-Entropy loss function works without modification because the mixed labels are just interpolated probabilities.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Cross-Entropy loss naturally handles soft/mixed labels. When Mixup creates a target of [0.7, 0.3] (70% cat, 30% dog), the loss is computed as a weighted combination of the losses for each class, which is mathematically equivalent to computing cross-entropy with the interpolated probability vector.",
      hints: [
        "Cross-entropy accepts any probability distribution as a target, not just one-hot vectors.",
        "Some implementations compute the loss as a weighted sum of two separate cross-entropy terms.",
      ],
    },
    {
      id: "q-fai-kp-9d",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is CutMix augmentation, and how does it differ from Mixup?",
      options: [
        "CutMix blends two images with a soft alpha; Mixup uses hard boundaries.",
        "CutMix cuts a rectangular patch from one image and pastes it into another (adjusting labels by the patch area ratio), while Mixup linearly blends entire images and labels.",
        "CutMix applies to text data; Mixup applies to images only.",
        "They are identical techniques with different names.",
      ],
      correctAnswer: 1,
      explanation:
        "CutMix pastes a rectangular crop from image B into image A, and adjusts the label proportionally (by the fraction of area from each image). Unlike Mixup\'s global blending, CutMix produces locally coherent image regions, which can be more informative for the model.",
      hints: [
        "In CutMix, each region of the image comes entirely from one source image, not a blend.",
        "The label mixing ratio in CutMix is determined by the area of the pasted patch.",
      ],
    },
    {
      id: "q-fai-kp-9e",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why does Mixup act as a regularizer that reduces overfitting?",
      options: [
        "It reduces the model\'s parameter count.",
        "It prevents the model from memorizing specific training examples by always presenting combinations of examples, forcing smoother decision boundaries.",
        "It applies dropout implicitly by zeroing out mixed pixels.",
        "It reduces the learning rate automatically when mixing occurs.",
      ],
      correctAnswer: 1,
      explanation:
        "Mixup forces the model to learn linear interpolations between training examples. This discourages memorization of individual examples and encourages smooth, linear behavior between classes, which acts as an implicit regularizer and often improves generalization.",
      hints: [
        "A model that memorizes training data would fail on mixed images because they don\'t exist in the dataset.",
        "Mixup makes the model\'s prediction function smoother between training examples.",
      ],
    },
    {
      id: "q-fai-kp-9f",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The mixing coefficient lambda in Mixup is sampled from a Beta(alpha, alpha) distribution. What happens as alpha approaches 0?",
      options: [
        "Images are mixed with equal 50/50 weighting every time.",
        "Lambda concentrates near 0 or 1, meaning most mixed images will be almost entirely one of the two source images (nearly no mixing).",
        "The mixing becomes more uniform across all possible ratios.",
        "Lambda always equals alpha, resulting in very heavy mixing.",
      ],
      correctAnswer: 1,
      explanation:
        "Beta(alpha, alpha) with small alpha produces a U-shaped distribution concentrated near 0 and 1. This means most sampled lambdas will be close to 0 or 1, resulting in little actual mixing (the output is nearly identical to one of the source images). Higher alpha values create more uniform mixing.",
      hints: [
        "Beta(0.5, 0.5) produces a U-shaped distribution; Beta(1, 1) is uniform; Beta(2, 2) concentrates near 0.5.",
        "Setting alpha=1 in MixUp means lambda is uniform on [0, 1], giving equal probability to all mixing ratios.",
      ],
    },
  ],
  "ulmfit-approach": [
    {
      id: "q-fai-kp-12",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are the three stages of the ULMFiT (Universal Language Model Fine-tuning) approach?",
      options: [
        "Tokenization, Numericalization, Embedding.",
        "Training from scratch, Freezing, Unfreezing.",
        "Pre-training a Language Model on a large corpus, Fine-tuning the LM on the target dataset, Fine-tuning a Classifier on the target task.",
        "Data collection, Model building, Model deployment.",
      ],
      correctAnswer:
        "Pre-training a Language Model on a large corpus, Fine-tuning the LM on the target dataset, Fine-tuning a Classifier on the target task.",
      explanation:
        "ULMFiT introduced transfer learning to NLP by first pre-training a language model (e.g., on Wikipedia), fine-tuning it to the specific style of the target corpus, and finally replacing the LM head with a classifier head to fine-tune on the classification task.",
      hints: [
        "ULMFiT proved that transfer learning for NLP was feasible, predating BERT and GPT.",
        "The three stages mirror the pattern used in computer vision fine-tuning.",
      ],
    },
    {
      id: "q-fai-kp-12b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What specific technique did ULMFiT introduce to prevent catastrophic forgetting during NLP fine-tuning?",
      options: [
        "Dropout applied to all layers uniformly.",
        "Gradual unfreezing — unfreezing one layer group at a time from the top down, combined with discriminative learning rates.",
        "Reinitializing all LSTM weights before the classifier fine-tuning phase.",
        "Applying label smoothing to the language model loss.",
      ],
      correctAnswer: 1,
      explanation:
        "ULMFiT introduced gradual unfreezing: rather than unfreezing all layers at once, it unfreezes the top layer first and trains for one epoch, then unfreezes the next layer down, and so on. Combined with discriminative LRs (lower for earlier layers), this prevents catastrophic forgetting.",
      hints: [
        "Gradual unfreezing is the NLP equivalent of starting with a frozen backbone in computer vision.",
        "The intuition: the final layers are most task-specific, so unfreeze those first.",
      ],
    },
    {
      id: "q-fai-kp-12c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What type of pre-training task does a ULMFiT language model use?",
      options: [
        "Predicting whether two sentences are semantically similar.",
        "Predicting the next word in a sequence (autoregressive language modeling).",
        "Predicting masked words in a sentence (masked language modeling).",
        "Classifying sentences into sentiment categories.",
      ],
      correctAnswer: 1,
      explanation:
        "ULMFiT uses a standard autoregressive language model: given the previous tokens, predict the next one. This self-supervised objective requires no labeled data and can use enormous text corpora (e.g., Wikipedia) to learn rich representations of language.",
      hints: [
        "This is the same task as GPT-style models: predict the next word.",
        "BERT uses masked language modeling (predict missing words) — a different approach.",
      ],
    },
    {
      id: "q-fai-kp-12d",
      type: "true-false",
      difficulty: "easy",
      question:
        "ULMFiT was one of the first papers to demonstrate that NLP could benefit from pre-training + fine-tuning transfer learning, similar to how computer vision uses ImageNet pre-training.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "ULMFiT (Howard & Ruder, 2018) was a seminal paper that proved NLP transfer learning was viable at scale. It achieved state-of-the-art results on multiple text classification benchmarks and directly inspired the transformer-based pre-training approaches (BERT, GPT) that followed.",
      hints: [
        "ULMFiT was published by Jeremy Howard (fastai founder) and Sebastian Ruder in 2018.",
        "Before ULMFiT, NLP models were typically trained from scratch on each task.",
      ],
    },
    {
      id: "q-fai-kp-12e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In ULMFiT\'s second stage (fine-tuning the LM on the target corpus), why is this step important even if the target data is in the same language as the pre-training data?",
      options: [
        "It is only important if the target language is different from English.",
        "It adapts the model to the specific vocabulary, writing style, and distribution of the target domain, improving downstream classifier performance.",
        "It reduces the model size to fit on smaller hardware.",
        "It converts the LSTM weights to transformer attention weights.",
      ],
      correctAnswer: 1,
      explanation:
        "A model pre-trained on Wikipedia excels at encyclopedic text but may underperform on movie reviews or medical notes. Fine-tuning the LM on the target corpus (e.g., IMDB reviews) adapts the model to domain-specific vocabulary and style, providing better initialization for classifier fine-tuning.",
      hints: [
        "Wikipedia English and Twitter English are both English but have very different vocabularies and styles.",
        "This step is self-supervised — no labels are needed, just the raw target-domain text.",
      ],
    },
    {
      id: "q-fai-kp-12f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, after fine-tuning a language model with `learn.fine_tune()`, how do you create a text classifier using the fine-tuned encoder?",
      options: [
        "By calling `learn.to_classifier()` on the language model learner.",
        "By saving the encoder with `learn.save_encoder()` and then creating a new `text_classifier_learner` that loads it with `learn.load_encoder()`.",
        "By adding a softmax layer directly to the LSTM output.",
        "By retraining the entire model with a new loss function.",
      ],
      correctAnswer: 1,
      explanation:
        "The typical ULMFiT workflow in fastai: (1) fine-tune the language model, (2) save the encoder with `learn.save_encoder(\'finetuned_enc\')`, (3) create a `text_classifier_learner` for the classification task, (4) load the saved encoder with `learn.load_encoder(\'finetuned_enc\')`, then train the classifier.",
      hints: [
        "The encoder (LSTM body) is what carries the learned language representations.",
        "fastai separates the encoder from the decoder/head so it can be reused across tasks.",
      ],
    },
  ],
  "rnn-lstm-basics": [
    {
      id: "q-fai-kp-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is a major advantage of LSTMs over standard RNNs?",
      options: [
        "LSTMs do not require backpropagation.",
        "LSTMs are much faster to train.",
        "LSTMs use cell states and gates to better preserve long-term dependencies and mitigate the vanishing gradient problem.",
        "LSTMs only process text data, whereas RNNs process audio.",
      ],
      correctAnswer:
        "LSTMs use cell states and gates to better preserve long-term dependencies and mitigate the vanishing gradient problem.",
      explanation:
        "LSTMs introduce a complex gating mechanism (forget, input, output gates) and a separate cell state, which allows gradients to flow more easily across long sequences, solving the vanishing gradient issue of vanilla RNNs.",
      hints: [
        "LSTM stands for Long Short-Term Memory — the name hints at the core innovation.",
        "The forget gate allows the LSTM to selectively discard irrelevant information from the cell state.",
      ],
    },
    {
      id: "q-fai-kp-14b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In an LSTM, what is the role of the forget gate?",
      options: [
        "It decides what information from the previous hidden state to erase from the cell state.",
        "It generates the final output from the cell state.",
        "It controls the rate at which the learning rate decays.",
        "It determines which tokens to ignore during tokenization.",
      ],
      correctAnswer: 0,
      explanation:
        "The forget gate takes the previous hidden state and current input, passes them through a sigmoid, and outputs values between 0 and 1 for each cell state element. A value of 0 means \'completely forget\'; 1 means \'completely keep\'. This selective forgetting is what gives LSTMs their long-term memory capability.",
      hints: [
        "Values from 0 to 1 act as a soft mask on the cell state — 0 forgets, 1 retains.",
        "The forget gate is one of three gates (forget, input, output) in a standard LSTM.",
      ],
    },
    {
      id: "q-fai-kp-14c",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a standard RNN, the same set of weights is used at every time step, making it fundamentally different from a feedforward network where each layer has its own weights.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Weight sharing across time steps is a defining characteristic of RNNs. The same weight matrix W is applied at every time step, which gives RNNs their ability to handle sequences of variable length and their parameter efficiency, but also makes gradient flow challenging over long sequences.",
      hints: [
        "Think of an RNN as a feedforward network where the same layer is applied repeatedly.",
        "This weight sharing is analogous to how CNNs share weights spatially across positions.",
      ],
    },
    {
      id: "q-fai-kp-14d",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is backpropagation through time (BPTT), and why does it cause the vanishing gradient problem in long sequences?",
      options: [
        "BPTT is a special optimizer for RNNs; it causes vanishing gradients because it uses a smaller step size.",
        "BPTT unrolls the RNN across time steps and backpropagates through all of them; the gradient is repeatedly multiplied by the recurrent weight matrix, causing it to shrink exponentially for long sequences.",
        "BPTT skips gradient computation for early time steps to save memory.",
        "BPTT is only used for LSTMs, not for standard RNNs.",
      ],
      correctAnswer: 1,
      explanation:
        "BPTT treats the unrolled RNN as a deep feedforward network. The gradient of the loss w.r.t. early time steps requires multiplying by the recurrent weight matrix many times. If the largest eigenvalue of this matrix is < 1, gradients vanish exponentially; if > 1, they explode.",
      hints: [
        "Each time step in the unrolled RNN is like one layer in a deep network.",
        "The problem is analogous to the vanishing gradient in very deep feedforward networks.",
      ],
    },
    {
      id: "q-fai-kp-14e",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the purpose of using a bidirectional RNN/LSTM?",
      options: [
        "To allow the model to be trained and used for inference simultaneously.",
        "To process the sequence in both forward and backward directions, giving the model access to future context at each time step.",
        "To double the speed of training by parallelizing both directions.",
        "To handle both text and image inputs simultaneously.",
      ],
      correctAnswer: 1,
      explanation:
        "A bidirectional RNN runs two separate RNNs: one processing the sequence left-to-right (forward), and one right-to-left (backward). At each time step, the hidden states from both are concatenated, giving the model context from both past and future tokens — very useful for tasks like named entity recognition.",
      hints: [
        "Useful for classification tasks where you know the full sequence (not generation tasks).",
        "Each position sees both the tokens before and after it.",
      ],
    },
    {
      id: "q-fai-kp-14f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai\'s AWD-LSTM architecture used for language modeling, what does the \'AWD\' stand for and what does it add?",
      options: [
        "Average Weight Dropout — it applies dropout to the final softmax layer.",
        "ASGD Weight-Dropped LSTM — it uses DropConnect (dropping weight connections in the recurrent matrix), embedding dropout, and other regularization techniques.",
        "Adaptive Weight Decay — it uses L2 regularization on LSTM cell states.",
        "Asynchronous Weight Distribution — it allows parallel weight updates.",
      ],
      correctAnswer: 1,
      explanation:
        "AWD-LSTM (Merity et al., 2017) stands for ASGD Weight-Dropped LSTM. It applies several regularization techniques: DropConnect on the recurrent weight matrices (weight dropout), embedding dropout, locked dropout on hidden states, and AR/TAR regularization, achieving state-of-the-art language modeling at the time.",
      hints: [
        "AWD-LSTM is the default architecture used by fastai for text classification via ULMFiT.",
        "DropConnect differs from regular Dropout: it drops weights (connections) rather than activations.",
      ],
    },
  ],
  "decision-trees-ensembles": [
    {
      id: "q-fai-kp-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the main principle behind Random Forests?",
      options: [
        "Using a single, very deep decision tree.",
        "Training multiple decision trees on different random subsets of data and features, then averaging their predictions to reduce variance.",
        "Training trees sequentially, where each tree corrects the errors of the previous one.",
        "Replacing decision trees with shallow neural networks.",
      ],
      correctAnswer:
        "Training multiple decision trees on different random subsets of data and features, then averaging their predictions to reduce variance.",
      explanation:
        "Random Forests are an ensemble method that builds numerous independent decision trees (bagging) using random subsets of data and features. Averaging their outputs creates a more robust model that is less prone to overfitting than a single tree.",
      hints: [
        "\'Random\' in Random Forests refers to the random sampling of both data (rows) and features (columns).",
        "Averaging many slightly different, overfitting trees cancels out their individual errors.",
      ],
    },
    {
      id: "q-fai-kp-17b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key difference between bagging (as in Random Forests) and boosting (as in Gradient Boosting)?",
      options: [
        "Bagging trains trees in parallel on random subsets and averages; boosting trains trees sequentially where each tree corrects errors of the previous ones.",
        "Bagging uses decision trees; boosting uses neural networks.",
        "Bagging is for classification; boosting is for regression only.",
        "Bagging uses the same features for all trees; boosting uses random features.",
      ],
      correctAnswer: 0,
      explanation:
        "Bagging (Bootstrap Aggregating, used in Random Forests) trains many independent models in parallel on bootstrapped data subsets and aggregates results. Boosting trains models sequentially, where each new model focuses on the mistakes of the previous ensemble, building a strong learner from weak ones.",
      hints: [
        "Bagging reduces variance; boosting reduces bias.",
        "XGBoost and LightGBM are popular gradient boosting implementations.",
      ],
    },
    {
      id: "q-fai-kp-17c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is \'feature importance\' in a Random Forest, and why is it useful?",
      options: [
        "It measures which features are the most correlated with each other.",
        "It quantifies how much each feature contributes to reducing impurity across all trees, helping identify which features most influence predictions.",
        "It counts how many times each feature appears in the dataset.",
        "It measures the computational cost of processing each feature.",
      ],
      correctAnswer: 1,
      explanation:
        "Feature importance in Random Forests measures each feature\'s contribution to prediction accuracy by averaging the impurity decrease (e.g., Gini impurity) associated with each feature split across all trees. High importance features are the strongest predictors in your dataset.",
      hints: [
        "Feature importance helps with feature selection and understanding your model.",
        "In scikit-learn, `forest.feature_importances_` gives you these values.",
      ],
    },
    {
      id: "q-fai-kp-17d",
      type: "true-false",
      difficulty: "easy",
      question:
        "A single fully-grown decision tree tends to overfit training data, but a Random Forest of many such trees tends to generalize better.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "An individual deep decision tree has high variance — it memorizes training data. Random Forests reduce this variance by averaging many independently trained trees on random data/feature subsets. Each tree is biased toward its bootstrap sample, but averaging cancels these individual biases out.",
      hints: [
        "This is the classic bias-variance trade-off: one deep tree has low bias but high variance.",
        "The ensemble average has similar bias but dramatically reduced variance.",
      ],
    },
    {
      id: "q-fai-kp-17e",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In fastai\'s tabular approach, why might you train both a Random Forest and a neural network on tabular data, and how can the Random Forest help the neural network?",
      options: [
        "The Random Forest\'s predictions are added as a new input feature for the neural network.",
        "The Random Forest can be used to identify important features and reasonable preprocessing steps, providing insight that guides neural network design and hyperparameter choices.",
        "The Random Forest replaces the neural network\'s embedding layers.",
        "The Random Forest sets the initial learning rate for the neural network.",
      ],
      correctAnswer: 1,
      explanation:
        "fastai\'s approach recommends starting with a Random Forest as a baseline for tabular data because it\'s fast, interpretable, and provides feature importances. These importances reveal which features matter, guiding feature engineering, selection of categorical vs. continuous variables, and validating that the neural network is learning reasonable patterns.",
      hints: [
        "Random Forests are an excellent baseline for tabular data — they often match neural network performance with less effort.",
        "Feature importances from a forest help you focus neural network feature engineering on what matters most.",
      ],
    },
    {
      id: "q-fai-kp-17f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is Out-of-Bag (OOB) error in Random Forests, and why is it useful?",
      options: [
        "The error measured on a separate held-out test set after training.",
        "An unbiased estimate of the generalization error using the samples NOT selected in each bootstrap subset to evaluate each respective tree, requiring no separate validation set.",
        "The error that occurs when the model predicts outside the training data range.",
        "The error from trees that grew too deep (out-of-bounds).",
      ],
      correctAnswer: 1,
      explanation:
        "Each tree in a Random Forest is trained on a bootstrap sample (roughly 63% of the data). The remaining ~37% (out-of-bag samples) weren\'t used to train that tree, so they can be used to evaluate it. Averaging OOB predictions across all trees gives a reliable validation error estimate without needing a separate validation set.",
      hints: [
        "OOB error is essentially free — it uses data that was already not used for each tree\'s training.",
        "OOB samples average to about 36.8% of total data (1 - 1/e ≈ 0.632 are in-bag).",
      ],
    },
  ],
  "progressive-resizing": [
    {
      id: "q-fai-kp-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the concept of progressive resizing in fastai?",
      options: [
        "Training a model initially on smaller images, then continuing training on progressively larger versions of the same images.",
        "Gradually increasing the depth of the neural network during training.",
        "Increasing the batch size linearly as training progresses.",
        "Dynamically adjusting the size of the convolution kernels.",
      ],
      correctAnswer:
        "Training a model initially on smaller images, then continuing training on progressively larger versions of the same images.",
      explanation:
        "Progressive resizing speeds up initial training and helps the model generalize better by learning scale-invariant features. It\'s like a form of data augmentation that changes image resolution.",
      hints: [
        "Small images train faster because each forward pass processes fewer pixels.",
        "Starting with small images then moving to larger ones acts as a curriculum for the model.",
      ],
    },
    {
      id: "q-fai-kp-7b",
      type: "true-false",
      difficulty: "medium",
      question:
        "Progressive resizing can act as a form of regularization because switching to larger images mid-training introduces a distribution shift that prevents the model from overfitting to the smaller image features.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "When training switches from smaller to larger images, the model effectively sees the data from a new perspective (more detail, different aspect ratios after resizing). This distribution shift disrupts any overfitting to the smaller images and encourages the model to learn more general, resolution-invariant features.",
      hints: [
        "Each resolution change is similar to fine-tuning on a slightly different dataset.",
        "The model must generalize across resolutions, which prevents it from memorizing low-resolution artifacts.",
      ],
    },
  ],
  "label-smoothing": [
    {
      id: "q-fai-kp-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What problem does label smoothing address?",
      options: [
        "The vanishing gradient problem.",
        "The network becoming overconfident in its predictions, which can lead to poor generalization.",
        "Imbalanced datasets where one class has too few samples.",
        "Incorrectly labeled data in the training set.",
      ],
      correctAnswer:
        "The network becoming overconfident in its predictions, which can lead to poor generalization.",
      explanation:
        "Instead of using hard one-hot targets (e.g., [1.0, 0.0]), label smoothing changes them to softer probabilities (e.g., [0.9, 0.1]). This discourages the network from pushing logits to extreme values and improves generalization.",
      hints: [
        "A model that is 99.99% confident is probably overfitting — label smoothing prevents this.",
        "Label smoothing adds a small epsilon to the non-target class probabilities.",
      ],
    },
    {
      id: "q-fai-kp-10b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, how is label smoothing typically applied during training?",
      options: [
        "By modifying the dataset labels directly before training begins.",
        "By using `LabelSmoothingCrossEntropy` as the loss function in the Learner.",
        "By adding a special smoothing layer between the final activation and the output.",
        "By setting `smooth=True` in the DataBlock API.",
      ],
      correctAnswer: 1,
      explanation:
        "In fastai, label smoothing is applied through the loss function. Instead of using the standard `CrossEntropyLoss`, you use `LabelSmoothingCrossEntropy` which internally blends the hard target with a uniform distribution during loss computation — no changes to the data pipeline are needed.",
      hints: [
        "The smoothing happens at the loss function level, not in the data loading pipeline.",
        "You pass it as `loss_func=LabelSmoothingCrossEntropy()` to `vision_learner` or `Learner`.",
      ],
    },
  ],
  "tokenization-numericalization": [
    {
      id: "q-fai-kp-11",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the order of the two main steps in preparing raw text for an NLP model?",
      options: [
        "Tokenization (splitting text into distinct units), then Numericalization (converting tokens to integers).",
        "Numericalization (converting characters to ASCII), then Tokenization (grouping ASCII into words).",
        "Stemming, then Lemmatization.",
        "Embedding, then Tokenization.",
      ],
      correctAnswer:
        "Tokenization (splitting text into distinct units), then Numericalization (converting tokens to integers).",
      explanation:
        "Raw text must first be split into tokens (words, subwords, or characters). Then, a vocabulary is built, and those tokens are numericalized (mapped to unique integer indices) before they can be fed into an embedding layer.",
      hints: [
        "You can\'t convert tokens to integers until you know what tokens exist.",
        "The vocabulary is built from the tokenized training set.",
      ],
    },
  ],
  "language-model-finetuning": [
    {
      id: "q-fai-kp-13",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is it important to fine-tune the language model on your specific dataset before training a classifier?",
      options: [
        "To increase the size of the vocabulary.",
        "Because the pre-trained model knows English grammar, but needs to learn the specific jargon, style, and distribution of the target dataset.",
        "To convert the text data into numerical vectors.",
        "To reduce the number of parameters in the model.",
      ],
      correctAnswer:
        "Because the pre-trained model knows English grammar, but needs to learn the specific jargon, style, and distribution of the target dataset.",
      explanation:
        "A Wikipedia pre-trained model knows general English, but fine-tuning it as an LM on your specific dataset (e.g., IMDB reviews or medical notes) helps it adapt to the domain-specific vocabulary and stylistic nuances.",
      hints: [
        "Wikipedia English differs greatly from Twitter slang or medical terminology.",
        "This LM fine-tuning step is self-supervised — no labels needed, just raw text.",
      ],
    },
  ],
  "text-dataloaders": [
    {
      id: "q-fai-kp-15",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does fastai\'s TextDataLoader typically handle text documents of varying lengths?",
      options: [
        "It truncates all documents to the length of the shortest document.",
        "It pads shorter documents with a special padding token and sorts them by length to minimize padding.",
        "It processes them one by one without batching.",
        "It removes punctuation to equalize lengths.",
      ],
      correctAnswer:
        "It pads shorter documents with a special padding token and sorts them by length to minimize padding.",
      explanation:
        "To process sequences in parallel batches, fastai pads shorter sequences with a special token (like `xxpad`). It also uses techniques like sorting by length (SortishSampler) to group sequences of similar lengths, minimizing wasted computation on padding.",
      hints: [
        "Batches require all sequences to be the same length — padding achieves this.",
        "Sorting by length reduces padding waste: similar-length sequences are batched together.",
      ],
    },
  ],
  "embedding-layers-categoricals": [
    {
      id: "q-fai-kp-16",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does an embedding layer handle categorical variables differently from one-hot encoding?",
      options: [
        "It converts categorical variables into strings.",
        "It maps categorical variables into dense, learnable, lower-dimensional continuous vectors rather than sparse, high-dimensional binary vectors.",
        "It assigns a single arbitrary integer to each category.",
        "It ignores categorical variables completely.",
      ],
      correctAnswer:
        "It maps categorical variables into dense, learnable, lower-dimensional continuous vectors rather than sparse, high-dimensional binary vectors.",
      explanation:
        "Embeddings map categories (like user IDs or zip codes) to dense vectors. The network learns these vector representations during training, capturing semantic relationships between categories that one-hot encoding cannot.",
      hints: [
        "One-hot encoding a vocabulary of 50,000 words creates 50,000-dimensional sparse vectors; embeddings might use just 300 dimensions.",
        "The embedding vectors are learned parameters, updated during backpropagation.",
      ],
    },
  ],
  "matrix-factorization": [
    {
      id: "q-fai-kp-18",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the context of collaborative filtering, what does matrix factorization attempt to do?",
      options: [
        "Calculate the determinant of the user-item interaction matrix.",
        "Invert the user-item matrix.",
        "Decompose the large, sparse user-item interaction matrix into the dot product of two lower-dimensional matrices (user embeddings and item embeddings).",
        "Convert the matrix into a pandas DataFrame.",
      ],
      correctAnswer:
        "Decompose the large, sparse user-item interaction matrix into the dot product of two lower-dimensional matrices (user embeddings and item embeddings).",
      explanation:
        "Matrix factorization discovers latent factors by finding a user embedding matrix and an item embedding matrix such that their dot product approximates the known ratings in the sparse user-item matrix.",
      hints: [
        "The user and item embeddings represent latent features (e.g., movie genres, user preferences).",
        "Only observed ratings are used for training; the model predicts missing ones.",
      ],
    },
  ],
  "cold-start-problem": [
    {
      id: "q-fai-kp-19",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the \'Cold Start Problem\' in recommender systems?",
      options: [
        "When the servers take too long to boot up.",
        "The difficulty in providing accurate recommendations for new users or new items that have no prior interaction history.",
        "When the learning rate is initially set too low.",
        "When the model\'s weights are initialized to zero.",
      ],
      correctAnswer:
        "The difficulty in providing accurate recommendations for new users or new items that have no prior interaction history.",
      explanation:
        "Collaborative filtering relies on past user-item interactions. A \'cold start\' occurs when a new user joins or a new item is added, making it impossible to recommend based on historical data until interactions occur.",
      hints: [
        "No interaction history = no basis for personalized recommendations.",
        "Common solutions include content-based fallbacks or asking new users for preferences.",
      ],
    },
  ],
  "tabular-dataloaders": [
    {
      id: "q-fai-kp-20",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When preparing tabular data in fastai, how are continuous and categorical variables typically preprocessed?",
      options: [
        "Continuous variables are one-hot encoded, categoricals are ignored.",
        "Both are normalized to have a mean of 0 and standard deviation of 1.",
        "Continuous variables are normalized/filled; categorical variables are label-encoded to prepare them for embedding layers.",
        "Categorical variables are normalized, continuous variables are label-encoded.",
      ],
      correctAnswer:
        "Continuous variables are normalized/filled; categorical variables are label-encoded to prepare them for embedding layers.",
      explanation:
        "In fastai\'s tabular processing (TabularPandas), continuous variables have missing values filled and are normalized, while categorical variables are stringified, categorized, and converted to integer codes for the embedding layers.",
      hints: [
        "Normalization of continuous variables helps gradient descent converge faster.",
        "Categorical variables need integer codes so they can be looked up in an embedding table.",
      ],
    },
  ],
  "convolutions-pooling": [
    {
      id: "q-fai-kp-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the primary role of a Max Pooling layer in a CNN?",
      options: [
        "To increase the number of channels.",
        "To perform a non-linear activation.",
        "To reduce the spatial dimensions (height and width) of the feature maps, reducing parameters and providing translation invariance.",
        "To compute the loss of the network.",
      ],
      correctAnswer:
        "To reduce the spatial dimensions (height and width) of the feature maps, reducing parameters and providing translation invariance.",
      explanation:
        "Max pooling downsamples the feature maps by taking the maximum value over a small window. This reduces computational load, controls overfitting, and makes the detection of features somewhat invariant to small translations.",
      hints: [
        "Max pooling with a 2×2 window and stride 2 halves the spatial dimensions.",
        "Taking the maximum value preserves the strongest activation of a feature in each region.",
      ],
    },
    {
      id: "q-fai-kp-21b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the difference between a convolutional layer with stride 2 and a max pooling layer for spatial downsampling?",
      options: [
        "Strided convolutions add parameters that are learned; max pooling is a fixed, parameter-free operation.",
        "Strided convolutions always produce better features; max pooling always overfits.",
        "Max pooling can increase spatial dimensions; strided convolutions can only decrease them.",
        "They are mathematically identical operations.",
      ],
      correctAnswer: 0,
      explanation:
        "A strided convolution learns how to downsample (the kernel weights are trained), while max pooling is a fixed operation with no learnable parameters. Modern architectures (like ResNet) often prefer strided convolutions over max pooling because they let the network learn the optimal downsampling strategy.",
      hints: [
        "Parameters = learnable. Max pooling has no learnable parameters.",
        "Strided convolutions are preferred in modern architectures because the downsampling is learned, not hand-designed.",
      ],
    },
  ],
  "cross-entropy-loss": [
    {
      id: "q-fai-kp-22",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is Cross-Entropy Loss preferred over Mean Squared Error (MSE) for classification tasks?",
      options: [
        "Because MSE can only be used for images.",
        "Cross-entropy heavily penalizes confident but incorrect predictions, and its gradient pairs well with the softmax function to prevent learning slowdowns.",
        "Cross-entropy requires less memory.",
        "Cross-entropy does not require labels.",
      ],
      correctAnswer:
        "Cross-entropy heavily penalizes confident but incorrect predictions, and its gradient pairs well with the softmax function to prevent learning slowdowns.",
      explanation:
        "Cross-entropy loss measures the difference between two probability distributions. Unlike MSE, when combined with softmax, its derivative is linear w.r.t the logits, avoiding the vanishing gradient problem when predictions are very wrong but confident.",
      hints: [
        "MSE with sigmoid/softmax can lead to very small gradients when the output is near 0 or 1.",
        "Cross-entropy + softmax gradients simplify to (predicted - actual), which is elegant and numerically stable.",
      ],
    },
    {
      id: "q-fai-kp-22b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What loss function should be used in fastai for a multi-label classification problem (where each image can belong to multiple classes simultaneously)?",
      options: [
        "CrossEntropyLoss with softmax, since it produces a probability distribution.",
        "Binary Cross-Entropy with sigmoid (BCEWithLogitsLoss), since each class is an independent binary decision.",
        "Mean Squared Error, since multi-label outputs are continuous.",
        "Hinge Loss, since multi-label problems require margin-based learning.",
      ],
      correctAnswer: 1,
      explanation:
        "In multi-label classification, each class is an independent yes/no decision. Sigmoid is applied to each output independently (not softmax across outputs), and Binary Cross-Entropy is computed per class. fastai uses `BCEWithLogitsLoss` by default when `MultiCategoryBlock` is detected in the DataBlock.",
      hints: [
        "Softmax forces outputs to sum to 1, which is wrong for multi-label tasks where multiple classes can be active.",
        "Sigmoid treats each class independently: each output is squashed to [0,1] on its own.",
      ],
    },
  ],
  "weight-initialization": [
    {
      id: "q-fai-kp-23",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why do we use specific weight initialization techniques like Kaiming (He) initialization instead of initializing all weights to zero?",
      options: [
        "Initializing to zero causes the network to output NaN.",
        "Initializing to zero breaks symmetry; all neurons would learn the exact same features during backpropagation.",
        "Initializing to zero makes the learning rate too high.",
        "Kaiming initialization guarantees global minima.",
      ],
      correctAnswer:
        "Initializing to zero breaks symmetry; all neurons would learn the exact same features during backpropagation.",
      explanation:
        "If weights are initialized to zero, every neuron in a layer computes the same output and receives the same gradient, effectively acting as a single neuron. Kaiming/He initialization breaks this symmetry and scales the variance to prevent vanishing/exploding gradients with ReLU activations.",
      hints: [
        "Symmetry breaking is essential: neurons must start differently to learn different features.",
        "Kaiming initialization scales variance by 2/n where n is the number of input connections.",
      ],
    },
    {
      id: "q-fai-kp-23b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Batch Normalization is often described as making weight initialization less critical. Why?",
      options: [
        "Batch Normalization sets all weights to 1 before training begins.",
        "Batch Normalization normalizes layer activations to have zero mean and unit variance during training, which keeps activations in a stable range regardless of the initial weight scale.",
        "Batch Normalization replaces weight matrices with normalized lookup tables.",
        "Batch Normalization only affects the output layer, not intermediate layers.",
      ],
      correctAnswer: 1,
      explanation:
        "Batch Normalization normalizes the pre-activations (or activations) within each mini-batch to zero mean and unit variance, then applies learnable scale and shift parameters. This re-centering at each layer prevents activations from exploding or vanishing regardless of initial weight magnitudes, making the network much more robust to initialization choices.",
      hints: [
        "Without BatchNorm, bad initialization can cause activations to become very large or very small in deep networks.",
        "BatchNorm introduces its own learnable parameters (gamma and beta) for scale and shift.",
      ],
    },
  ],
  "adam-rmsprop": [
    {
      id: "q-fai-kp-24",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does the Adam optimizer improve upon standard Stochastic Gradient Descent?",
      options: [
        "By ignoring the learning rate completely.",
        "By only updating weights once per epoch.",
        "By computing adaptive learning rates for each parameter based on estimates of first and second moments of the gradients (momentum and variance).",
        "By automatically adding layers to the network.",
      ],
      correctAnswer:
        "By computing adaptive learning rates for each parameter based on estimates of first and second moments of the gradients (momentum and variance).",
      explanation:
        "Adam (Adaptive Moment Estimation) combines ideas from Momentum (exponential moving average of past gradients) and RMSProp (scaling by the moving average of squared gradients) to adaptively adjust the learning rate for each individual parameter.",
      hints: [
        "\'Adaptive\' means each parameter gets its own effective learning rate based on its gradient history.",
        "The first moment is the mean of gradients (momentum); the second moment is the variance (RMSProp).",
      ],
    },
  ],
  "stochastic-gradient-descent": [
    {
      id: "q-fai-kp-25",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What makes \'Stochastic\' Gradient Descent (SGD) different from standard Gradient Descent?",
      options: [
        "It introduces randomness into the loss function.",
        "It updates parameters using a small random mini-batch of data at each step, rather than the entire dataset.",
        "It changes the network architecture randomly.",
        "It uses a randomly selected activation function.",
      ],
      correctAnswer:
        "It updates parameters using a small random mini-batch of data at each step, rather than the entire dataset.",
      explanation:
        "Standard GD computes the gradient over the entire dataset before taking a step. SGD approximates the gradient using a random mini-batch, making it much faster to compute and allowing for more frequent updates.",
      hints: [
        "\'Mini-batch SGD\' is what practitioners usually mean when they say SGD.",
        "Frequent noisy updates can help SGD escape local minima that full-batch GD might get stuck in.",
      ],
    },
  ],
  "tabular-learner": [
    {
      id: "q-fai-kp-31",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, which class is used to create DataLoaders for tabular (structured) data from a pandas DataFrame?",
      options: [
        "DataBlock(blocks=(TabularBlock, CategoryBlock))",
        "TabularDataLoaders.from_df()",
        "DataLoader.from_pandas()",
        "TabularLearner.from_csv()",
      ],
      correctAnswer: 1,
      explanation:
        "`TabularDataLoaders.from_df()` is the high-level fastai API for building DataLoaders directly from a pandas DataFrame for tabular learning. It handles categorical embedding setup, continuous normalization, and train/valid splitting in one call.",
      hints: [
        "fastai provides task-specific DataLoaders factories: `TabularDataLoaders`, `ImageDataLoaders`, `TextDataLoaders`.",
        "You pass lists of `cat_names`, `cont_names`, and `y_names` to specify column roles.",
      ],
    },
    {
      id: "q-fai-kp-31b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does fastai's `TabularLearner` automatically determine the embedding dimension for a categorical variable?",
      options: [
        "It always uses an embedding dimension of 50 for every categorical variable.",
        "It uses the rule `min(600, round(1.6 * cardinality**0.56))`, capping at 600.",
        "It sets the embedding dimension equal to the cardinality (number of unique values).",
        "The user must always specify embedding dimensions manually.",
      ],
      correctAnswer: 1,
      explanation:
        "fastai applies the empirical rule `min(600, round(1.6 * n_cat**0.56))` to automatically choose embedding sizes for each categorical variable, where `n_cat` is the number of unique categories. This heuristic (derived from Kaggle competitions) balances representational capacity with parameter efficiency.",
      hints: [
        "A categorical column with 10 unique values gets a smaller embedding than one with 10,000.",
        "The cap of 600 prevents excessively large embeddings for high-cardinality columns.",
      ],
    },
    {
      id: "q-fai-kp-31c",
      type: "true-false",
      difficulty: "easy",
      question:
        "In fastai's `TabularLearner`, categorical variables are passed through learnable embedding layers, while continuous variables are concatenated directly as floats after normalization.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "fastai's tabular neural network architecture embeds each categorical variable through its own `Embedding` layer (converting integer codes to dense vectors) and concatenates those embeddings with the normalized continuous variables before passing everything through fully connected layers.",
      hints: [
        "Embeddings turn integer category codes into dense, meaningful float vectors.",
        "Continuous variables are already numeric, so they just need normalization before concatenation.",
      ],
    },
  ],
  "collab-filtering": [
    {
      id: "q-fai-kp-32",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, which class is used to create DataLoaders for collaborative filtering from a ratings DataFrame?",
      options: [
        "TabularDataLoaders.from_df()",
        "CollabDataLoaders.from_df()",
        "ImageDataLoaders.from_folder()",
        "DataBlock(blocks=(UserBlock, ItemBlock))",
      ],
      correctAnswer: 1,
      explanation:
        "`CollabDataLoaders.from_df()` builds DataLoaders for collaborative filtering directly from a DataFrame with user, item, and rating columns. It handles vocabulary creation for users and items, and sets up the data pipeline for embedding-based recommender models.",
      hints: [
        "fastai uses task-specific DataLoaders factories for each domain.",
        "You specify `user_name`, `item_name`, and `rating_name` column arguments.",
      ],
    },
    {
      id: "q-fai-kp-32b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "fastai's `EmbeddingDotBias` model for collaborative filtering adds bias terms to both users and items. What do these bias terms capture?",
      options: [
        "They capture the GPU memory offset for each embedding lookup.",
        "They capture the overall tendency of a user to rate highly and the overall popularity/quality of an item, independent of the latent factor interactions.",
        "They replace the dot product with an additive combination.",
        "They prevent gradient explosion during backpropagation.",
      ],
      correctAnswer: 1,
      explanation:
        "User bias captures how much a particular user rates above or below average (some users are generous raters, others harsh). Item bias captures the global popularity/quality of an item. The prediction is: `dot(user_emb, item_emb) + user_bias + item_bias`, so biases handle the \'easy\' part while embeddings capture interaction effects.",
      hints: [
        "Think of user bias as: does this user always rate 0.5 stars above average?",
        "Item bias: is this movie consistently rated highly regardless of the user?",
      ],
    },
    {
      id: "q-fai-kp-32c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In collaborative filtering with fastai, what does a high dot product between a user embedding and an item embedding indicate?",
      options: [
        "The user has rated the item many times.",
        "The user and item share similar latent factors, meaning the user is likely to enjoy that item.",
        "The item has a high average rating across all users.",
        "The model has overfit to that user-item pair.",
      ],
      correctAnswer: 1,
      explanation:
        "The dot product between user and item embeddings measures alignment of their latent factor vectors. A high dot product means the user's preferences (captured by their embedding) align strongly with the item's characteristics (captured by its embedding), predicting a high rating.",
      hints: [
        "Latent factors might correspond to genres, styles, or other abstract properties.",
        "If a user embedding vector and item embedding vector point in similar directions, their dot product is large.",
      ],
    },
  ],
  "text-learner": [
    {
      id: "q-fai-kp-33",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, which function creates a `TextDataLoaders` for language model fine-tuning from a folder of text files?",
      options: [
        "TextDataLoaders.from_folder(path, is_lm=True)",
        "DataBlock(blocks=TextBlock.from_folder(path))",
        "LanguageModelDataLoaders(path)",
        "TextLearner.from_folder(path)",
      ],
      correctAnswer: 0,
      explanation:
        "`TextDataLoaders.from_folder(path, is_lm=True)` creates DataLoaders for language model training/fine-tuning. The `is_lm=True` flag tells fastai to use language model targets (next-token prediction) rather than classification labels.",
      hints: [
        "Setting `is_lm=True` shifts the targets to be the next tokens rather than class labels.",
        "This is the starting point for ULMFiT-style language model fine-tuning.",
      ],
    },
    {
      id: "q-fai-kp-33b",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, after fine-tuning a language model, which function creates a text classifier learner using the fine-tuned encoder?",
      options: [
        "vision_learner(dls, AWD_LSTM)",
        "text_classifier_learner(dls, AWD_LSTM, drop_mult=0.5)",
        "Learner(dls, TextClassificationModel())",
        "TextDataLoaders.to_classifier()",
      ],
      correctAnswer: 1,
      explanation:
        "`text_classifier_learner(dls, AWD_LSTM, drop_mult=0.5)` creates a `Learner` that wraps an AWD-LSTM body with a classification head. After creating it, you load the fine-tuned language model encoder with `learn.load_encoder('finetuned_enc')` to initialize the body with pre-trained weights.",
      hints: [
        "The architecture (`AWD_LSTM`) is the second argument, analogous to `vision_learner(dls, resnet34)`.",
        "`drop_mult` scales all dropout rates in the model, allowing regularization strength control.",
      ],
    },
    {
      id: "q-fai-kp-33c",
      type: "true-false",
      difficulty: "easy",
      question:
        "In fastai's ULMFiT workflow, language model fine-tuning on the target corpus is a self-supervised step that requires no labeled data.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Language model fine-tuning uses next-token prediction as its objective. The targets are automatically derived from the input text itself (shifted by one position), so no human-provided labels are needed. This allows leveraging large amounts of unlabeled domain text.",
      hints: [
        "The label for each token is simply the next token in the sequence — no annotation needed.",
        "This is why it's called self-supervised: the data creates its own supervision signal.",
      ],
    },
  ],
  "multi-label-classification": [
    {
      id: "q-fai-kp-34",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, which metric is appropriate for evaluating multi-label classification where each sample can have multiple correct labels?",
      options: [
        "accuracy (standard single-label accuracy)",
        "accuracy_multi (which applies a threshold to independent sigmoid outputs)",
        "RocAuc (which requires a single positive class)",
        "error_rate (1 minus top-1 accuracy)",
      ],
      correctAnswer: 1,
      explanation:
        "`accuracy_multi` applies a threshold (default 0.5) to each class's sigmoid output independently and counts a prediction as correct for a class if it exceeds the threshold. This is appropriate for multi-label tasks where softmax-based accuracy is meaningless.",
      hints: [
        "Multi-label problems use sigmoid per class, not softmax across classes.",
        "`accuracy_multi` has a `thresh` parameter you can tune for precision/recall trade-off.",
      ],
    },
    {
      id: "q-fai-kp-34b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why must multi-label classification use sigmoid activation rather than softmax?",
      options: [
        "Softmax is computationally more expensive for multi-label tasks.",
        "Softmax forces all class probabilities to sum to 1, preventing multiple classes from simultaneously having high probability; sigmoid treats each class as an independent binary decision.",
        "Sigmoid outputs are always higher than softmax outputs, making it easier to train.",
        "fastai only supports sigmoid in its multi-label DataBlock.",
      ],
      correctAnswer: 1,
      explanation:
        "Softmax creates a competition between classes (probabilities sum to 1), which is correct for single-label tasks but wrong for multi-label. Sigmoid squashes each logit independently to [0, 1], allowing multiple classes to simultaneously have probabilities near 1 — which is what we want when an image can be both 'dog' and 'outdoor'.",
      hints: [
        "An image can be both 'dog' and 'running' — softmax would force the model to choose one.",
        "sigmoid(x) = 1/(1+e^-x) is applied elementwise; softmax normalizes across all elements.",
      ],
    },
    {
      id: "q-fai-kp-34c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, which loss function is automatically used when `MultiCategoryBlock` is detected in the DataBlock?",
      options: [
        "CrossEntropyLoss",
        "BCEWithLogitsLoss (binary cross-entropy with logits)",
        "MSELoss",
        "LabelSmoothingCrossEntropy",
      ],
      correctAnswer: 1,
      explanation:
        "fastai automatically selects `BCEWithLogitsLoss` for multi-label classification. This combines sigmoid activation with binary cross-entropy in a numerically stable way, computing an independent binary loss for each class.",
      hints: [
        "fastai infers the loss function from the DataBlock's output block type.",
        "`BCEWithLogitsLoss` is more numerically stable than applying sigmoid then `BCELoss` separately.",
      ],
    },
  ],
  "image-segmentation-fastai": [
    {
      id: "q-fai-kp-35",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, which function creates a learner suitable for semantic image segmentation tasks?",
      options: [
        "vision_learner(dls, resnet34)",
        "unet_learner(dls, resnet34)",
        "seg_learner(dls, resnet34)",
        "SegmentationLearner(dls, resnet34)",
      ],
      correctAnswer: 1,
      explanation:
        "`unet_learner(dls, resnet34)` builds a U-Net architecture dynamically, using a pretrained encoder (e.g., ResNet-34) as the downsampling body and generating a matching decoder with skip connections. This is fastai's standard API for semantic segmentation.",
      hints: [
        "U-Net's encoder-decoder with skip connections is the standard segmentation architecture.",
        "The pre-trained ResNet acts as the encoder; fastai builds the decoder automatically.",
      ],
    },
    {
      id: "q-fai-kp-35b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In semantic segmentation with fastai, which loss function is used, and how does it differ from image classification?",
      options: [
        "MSELoss applied to the pixel color values.",
        "Cross-entropy loss applied independently to each pixel, treating each pixel as a separate classification problem.",
        "Binary cross-entropy applied globally to the entire image mask.",
        "Dice loss, which fastai uses by default for all segmentation tasks.",
      ],
      correctAnswer: 1,
      explanation:
        "Semantic segmentation classifies every pixel in the image into one of N classes. fastai applies cross-entropy loss pixel-wise: for each pixel, the model outputs N logits and the loss is computed as if that pixel were a standalone single-label classification problem. The total loss averages over all pixels.",
      hints: [
        "Think of each pixel as a tiny single-label classification problem.",
        "The target mask assigns one class label per pixel; cross-entropy compares the model's N-class output at each pixel.",
      ],
    },
    {
      id: "q-fai-kp-35c",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In fastai, which DataLoaders factory is designed for image segmentation tasks?",
      options: [
        "ImageDataLoaders.from_folder()",
        "SegmentationDataLoaders.from_label_func()",
        "DataBlock(blocks=(ImageBlock, MaskBlock))",
        "Both B and C are valid approaches",
      ],
      correctAnswer: 3,
      explanation:
        "fastai provides two equivalent approaches for segmentation DataLoaders: `SegmentationDataLoaders.from_label_func()` is a high-level convenience factory, while using `DataBlock(blocks=(ImageBlock, MaskBlock(...)))` offers more flexibility. Both ultimately produce the same type of DataLoaders.",
      hints: [
        "`MaskBlock` is the output block for segmentation in the DataBlock API.",
        "The label function maps each image path to its corresponding segmentation mask path.",
      ],
    },
  ],
  "object-detection-fastai": [
    {
      id: "q-fai-kp-36",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In object detection, what does bounding box regression mean, and what does the model predict?",
      options: [
        "The model classifies whether an object exists in the image without locating it.",
        "The model predicts continuous coordinates (x, y, width, height) for each detected object's bounding box in addition to its class label.",
        "The model segments every pixel and groups them into bounding boxes post-hoc.",
        "The model only predicts the center coordinates, not width and height.",
      ],
      correctAnswer: 1,
      explanation:
        "Bounding box regression is the task of predicting the spatial location of objects as rectangles defined by continuous coordinates (typically center_x, center_y, width, height or x1, y1, x2, y2). This is a regression problem over the box coordinates, separate from the classification head that predicts the object class.",
      hints: [
        "Object detection has two outputs per detected object: class (classification) and box coordinates (regression).",
        "The loss combines a classification loss for the class and a regression loss (e.g., L1 or smooth L1) for the box.",
      ],
    },
    {
      id: "q-fai-kp-36b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is anchor-free object detection, and how does it differ from anchor-based methods like Faster R-CNN?",
      options: [
        "Anchor-free detection uses no neural networks; it relies on classical image processing.",
        "Anchor-free detectors predict bounding boxes as offsets from predefined fixed anchor boxes; anchor-based methods predict boxes from image key points or feature map centers.",
        "Anchor-free detectors predict object locations directly from feature map positions (e.g., object centers) without needing predefined anchor boxes, simplifying design and removing the anchor hyperparameter burden.",
        "The terms are synonymous; both methods work identically.",
      ],
      correctAnswer: 2,
      explanation:
        "Anchor-based detectors (Faster R-CNN, SSD, YOLO v2-v3) predefine a set of fixed anchor boxes at each feature map location and predict offsets from those anchors. Anchor-free detectors (FCOS, CenterNet, DETR) directly predict object centers or corners without relying on anchors, eliminating anchor hyperparameter tuning and simplifying the pipeline.",
      hints: [
        "Anchor boxes are hand-designed templates; anchor-free methods learn to predict boxes directly.",
        "DETR (DEtection TRansformer) is a prominent anchor-free model using transformers.",
      ],
    },
    {
      id: "q-fai-kp-36c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, how would you build DataLoaders for a single-object bounding box detection task using the DataBlock API?",
      options: [
        "DataBlock(blocks=(ImageBlock, BBoxBlock))",
        "DataBlock(blocks=(ImageBlock, BBoxLblBlock))",
        "DataBlock(blocks=(ImageBlock, BBoxBlock), get_y=[get_bbox, get_lbl]) with appropriate `get_y` functions",
        "ObjectDetectionDataLoaders.from_json(path)",
      ],
      correctAnswer: 2,
      explanation:
        "For detection DataLoaders with fastai's DataBlock API, you use `blocks=(ImageBlock, BBoxBlock)` or `blocks=(ImageBlock, BBoxLblBlock)` depending on whether you need class labels. You supply separate `get_y` functions that return the bounding box coordinates and class labels from your annotation source.",
      hints: [
        "`BBoxBlock` handles bounding box coordinate transforms; `BBoxLblBlock` adds class labels.",
        "The annotations are typically stored in JSON (COCO format) or CSV files.",
      ],
    },
  ],
  "callbacks-advanced": [
    {
      id: "q-fai-kp-37",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai's callback system, which two events bracket the processing of a single training batch?",
      options: [
        "`before_epoch` and `after_epoch`",
        "`before_batch` and `after_batch`",
        "`before_step` and `after_step`",
        "`on_batch_begin` and `on_batch_end`",
      ],
      correctAnswer: 1,
      explanation:
        "fastai's training loop fires `before_batch` immediately before forward pass + loss computation for each batch, and `after_batch` immediately after the optimizer step. Callbacks that need to modify inputs or outputs per-batch (like Mixup or gradient clipping) hook into these events.",
      hints: [
        "fastai uses `before_*` / `after_*` naming conventions for callback events.",
        "Other batch-level events include `before_forward`, `after_forward`, `before_backward`, `after_backward`.",
      ],
    },
    {
      id: "q-fai-kp-37b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What does fastai's `MixedPrecision` callback (previously `to_fp16()`) do, and what is the primary benefit?",
      options: [
        "It quantizes the model to INT8 for deployment, halving model size.",
        "It trains using 16-bit floating point (FP16) for forward and backward passes while maintaining 32-bit master weights, reducing memory usage and speeding up training on supported GPUs.",
        "It mixes FP32 and FP64 precision dynamically to improve numerical stability.",
        "It converts the model to BFloat16 and disables gradient scaling.",
      ],
      correctAnswer: 1,
      explanation:
        "Mixed precision training (AMP) uses FP16 for most computations (reducing memory bandwidth and exploiting Tensor Cores on modern GPUs) while keeping a FP32 master copy of weights for updates. A gradient scaler prevents underflow during FP16 backward passes. This typically provides 2-3x speedup with no accuracy loss.",
      hints: [
        "FP16 uses half the memory of FP32 and is faster on GPUs with Tensor Cores (NVIDIA Volta+).",
        "The key challenge in FP16 training is that very small gradients can underflow to zero — the scaler prevents this.",
      ],
    },
    {
      id: "q-fai-kp-37c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the role of the `CudaCallback` in fastai's training loop?",
      options: [
        "It manually allocates GPU memory for each batch.",
        "It moves each batch of data and the model to the GPU automatically before each forward pass.",
        "It monitors GPU temperature and pauses training if it overheats.",
        "It enables CUDA graph capture for faster kernel launch.",
      ],
      correctAnswer: 1,
      explanation:
        "`CudaCallback` is a lightweight fastai callback that hooks into `before_batch` and moves the input data (and labels) from CPU to GPU memory. It works alongside the model being placed on GPU, ensuring that each batch is on the correct device before the forward pass runs.",
      hints: [
        "Data is loaded on CPU by DataLoaders; it must be moved to GPU for neural network forward passes.",
        "Forgetting to move data to GPU is a common PyTorch error: 'Expected all tensors to be on the same device'.",
      ],
    },
  ],
  "distributed-training-fastai": [
    {
      id: "q-fai-kp-38",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, what does calling `learn.to_fp16()` return, and what does it enable?",
      options: [
        "It returns a new Learner with the model quantized to INT16.",
        "It returns the same Learner with a `MixedPrecision` callback added, enabling automatic mixed precision (AMP) training.",
        "It converts all model weights to FP16 permanently, with no master FP32 copy.",
        "It enables FP16 only for the final linear layer.",
      ],
      correctAnswer: 1,
      explanation:
        "`learn.to_fp16()` is a convenience method that adds fastai's `MixedPrecision` callback to the Learner and returns `self`. This enables PyTorch's Automatic Mixed Precision (AMP) for subsequent training calls, providing faster training and lower memory usage on modern GPUs.",
      hints: [
        "`to_fp16()` is syntactic sugar for adding `MixedPrecision()` to the Learner's callback list.",
        "You chain it like: `learn = vision_learner(dls, resnet50).to_fp16()`.",
      ],
    },
    {
      id: "q-fai-kp-38b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When using `DistributedDataParallel` (DDP) with fastai for multi-GPU training, how does gradient synchronization work across GPUs?",
      options: [
        "One GPU computes gradients and broadcasts them to all other GPUs after each epoch.",
        "Each GPU computes gradients on its local batch independently; DDP uses an all-reduce operation after each backward pass to average gradients across all GPUs before the optimizer step.",
        "Gradients are accumulated on the CPU and then distributed back to GPUs.",
        "DDP trains separate models on each GPU and merges weights at the end of training.",
      ],
      correctAnswer: 1,
      explanation:
        "In DDP, each GPU holds a full copy of the model and processes a shard of the batch. After each backward pass, DDP automatically performs an all-reduce (typically NCCL ring-allreduce) to average gradients across all GPUs. Each GPU then performs the same optimizer step with the averaged gradients, keeping all model copies in sync.",
      hints: [
        "All-reduce = sum gradients across all GPUs then divide by the number of GPUs.",
        "The effective batch size is `per_gpu_batch_size × num_gpus`, so the learning rate often needs scaling.",
      ],
    },
    {
      id: "q-fai-kp-38c",
      type: "true-false",
      difficulty: "medium",
      question:
        "In fastai's multi-GPU training with `DistributedDataParallel`, the effective batch size increases proportionally with the number of GPUs, which typically requires scaling the learning rate accordingly.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "With DDP, each GPU processes its own mini-batch and the total batch size is `per_gpu_batch × num_gpus`. The linear scaling rule (Goyal et al., 2017) states that the learning rate should be scaled proportionally (LR × num_gpus) to maintain equivalent optimization dynamics. fastai's `DistributedTrainer` callback handles much of the DDP setup automatically.",
      hints: [
        "Larger effective batch size → smoother gradient estimates → can use a larger learning rate.",
        "The linear scaling rule works well up to moderate GPU counts; warmup is recommended for very large batches.",
      ],
    },
  ],
  "transfer-learning-advanced": [
    {
      id: "q-fai-kp-39",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In fastai, what is the difference between the 'body' and the 'head' of a vision model created with `vision_learner`?",
      options: [
        "The body is the custom classification layers; the head is the pretrained backbone.",
        "The body is the pretrained backbone (encoder) that extracts features; the head is the newly added task-specific layers (typically pooling + linear layers) appended for the target task.",
        "They are identical; fastai uses the terms interchangeably.",
        "The head refers to attention layers; the body refers to convolutional layers.",
      ],
      correctAnswer: 1,
      explanation:
        "In fastai's `vision_learner`, the 'body' is the pretrained CNN backbone (e.g., ResNet-34 without its ImageNet classification head), which is transferred from ImageNet. The 'head' is the new task-specific layers that fastai appends (adaptive average pooling, batch norm, dropout, linear layers) to adapt the model to the target number of classes.",
      hints: [
        "The body is frozen by default during the first training phase of `fine_tune()`.",
        "`learn.model[0]` is the body; `learn.model[1]` is the head in most fastai vision models.",
      ],
    },
    {
      id: "q-fai-kp-39b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What does `Learner.freeze_to(-2)` do in fastai, and when would you use it?",
      options: [
        "It freezes the last 2 layers of the model and leaves all others trainable.",
        "It freezes all layer groups except the last 2 layer groups, allowing progressive unfreezing from the top of the network.",
        "It freezes the model for 2 epochs then automatically unfreezes.",
        "It freezes only the batch normalization layers with indices -2.",
      ],
      correctAnswer: 1,
      explanation:
        "`freeze_to(-2)` freezes all layer groups except the last 2. Negative indexing works like Python list slicing: -2 means 'leave the last 2 groups trainable'. This is useful for progressive unfreezing: you unfreeze layers gradually from the top (head) downward, training each newly unfrozen group before proceeding to earlier layers.",
      hints: [
        "fastai groups model layers into layer groups for freeze/unfreeze and discriminative LR purposes.",
        "Progressive unfreezing order: unfreeze head first, then upper body, then lower body.",
      ],
    },
    {
      id: "q-fai-kp-39c",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is a 'splitter function' in fastai, and why is it important for transfer learning?",
      options: [
        "A function that splits the dataset into train and validation sets.",
        "A function that divides a model's parameters into groups for discriminative learning rates and freeze/unfreeze operations.",
        "A function that splits large images into patches before feeding to the model.",
        "A function that controls how fastai splits batches across multiple GPUs.",
      ],
      correctAnswer: 1,
      explanation:
        "A splitter function takes a model and returns a list of parameter groups (body layers grouped by depth, plus the head). fastai uses this grouping to apply discriminative learning rates (different LR per group) and for `freeze_to()` / `unfreeze()` operations. Custom architectures need a custom splitter to enable these features.",
      hints: [
        "Standard architectures like ResNet have built-in splitters in fastai.",
        "You pass `splitter=my_splitter` to `Learner` when using a non-standard architecture.",
      ],
    },
  ],
  "production-fastai": [
    {
      id: "q-fai-kp-40",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the difference between `learn.save('checkpoint')` and `learn.export('model.pkl')` in fastai?",
      options: [
        "They are identical; both save the full Learner including DataLoaders.",
        "`learn.save()` saves only the model weights for checkpointing/resuming; `learn.export()` saves the complete Learner (weights + DataLoaders config + transforms) as a self-contained deployment artifact.",
        "`learn.save()` saves as ONNX; `learn.export()` saves as pickle.",
        "`learn.export()` compresses the model; `learn.save()` does not.",
      ],
      correctAnswer: 1,
      explanation:
        "`learn.save('name')` saves a state dict of model weights (and optionally optimizer state) — useful for training checkpoints. `learn.export('model.pkl')` pickles the complete Learner including all preprocessing transforms and vocabulary, making it self-contained for inference without needing to recreate the DataLoaders.",
      hints: [
        "For deployment, use `export()`; for resuming training, use `save()`.",
        "`load_learner('model.pkl')` can restore an exported learner in one line.",
      ],
    },
    {
      id: "q-fai-kp-40b",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is ONNX export, and what problem does it solve compared to fastai's native pickle-based export?",
      options: [
        "ONNX exports the model as a PNG image of the architecture diagram.",
        "ONNX (Open Neural Network Exchange) exports the model's computation graph in a framework-agnostic format, enabling deployment without requiring PyTorch or fastai and avoiding pickle version incompatibilities.",
        "ONNX compresses the model weights using lossy compression for smaller file sizes.",
        "ONNX is a fastai-specific export format that only works with Hugging Face Spaces.",
      ],
      correctAnswer: 1,
      explanation:
        "ONNX is an open format for ML models that can be run by many runtimes (ONNX Runtime, TensorRT, CoreML, OpenVINO) without Python, PyTorch, or fastai. Unlike pickle export, ONNX is version-agnostic and works across languages and platforms. You export via `torch.onnx.export(learn.model, ...)` after getting the model from the learner.",
      hints: [
        "ONNX Runtime can run models in C++, C#, Java, etc. — no Python needed.",
        "This is useful for edge deployment (mobile, embedded) or high-performance serving.",
      ],
    },
    {
      id: "q-fai-kp-40c",
      type: "true-false",
      difficulty: "easy",
      question:
        "When serving a fastai model in production using `learn.predict()`, the preprocessing transforms defined in the original DataLoaders are automatically applied to new inputs.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "When you export a fastai Learner with `learn.export()` and reload it with `load_learner()`, the DataLoaders (including all item transforms and batch transforms like resizing and normalization) are embedded in the exported file. Calling `learn.predict(new_item)` automatically runs the complete preprocessing pipeline before inference.",
      hints: [
        "This is why `export()` is preferred over `save()` for deployment: preprocessing comes along.",
        "You don't need to manually resize or normalize your input — the Learner handles it.",
      ],
    },
  ],
  autoencoders: [
    {
      id: "q-fai-kp-26",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary architectural structure of an Autoencoder?",
      options: [
        "A generator and a discriminator.",
        "An encoder that compresses input into a latent representation, and a decoder that reconstructs the input from that representation.",
        "A sequence of identical Transformer blocks.",
        "Only fully connected layers with no hidden bottleneck.",
      ],
      correctAnswer:
        "An encoder that compresses input into a latent representation, and a decoder that reconstructs the input from that representation.",
      explanation:
        "An autoencoder learns to copy its input to its output through a bottleneck layer (latent space). The encoder compresses the data, and the decoder attempts to reconstruct it, forcing the model to learn a meaningful lower-dimensional representation.",
      hints: [
        "The bottleneck forces the model to learn a compressed representation of the data.",
        "The reconstruction loss (e.g., MSE between input and output) drives training.",
      ],
    },
  ],
  "unet-architectures": [
    {
      id: "q-fai-kp-27",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What specific feature distinguishes a U-Net from a standard encoder-decoder architecture?",
      options: [
        "It does not use convolutions.",
        "It relies heavily on recurrent layers.",
        "It incorporates skip connections that concatenate high-resolution features from the encoder directly to the corresponding layers in the decoder.",
        "It uses a softmax layer at every step.",
      ],
      correctAnswer:
        "It incorporates skip connections that concatenate high-resolution features from the encoder directly to the corresponding layers in the decoder.",
      explanation:
        "U-Net introduces skip connections across the \'U\' shape. These connections pass spatial information from the downsampling path directly to the upsampling path, crucial for precise localization in tasks like image segmentation.",
      hints: [
        "The \'U\' shape of U-Net comes from the symmetric encoder-decoder with skip connections bridging them.",
        "Without skip connections, the decoder would have to reconstruct fine spatial details from a compressed bottleneck alone.",
      ],
    },
  ],
  "gan-basics": [
    {
      id: "q-fai-kp-28",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a Generative Adversarial Network (GAN), what are the roles of the two competing networks?",
      options: [
        "An encoder compresses data; a decoder decompresses it.",
        "A generator tries to create fake data that looks real; a discriminator tries to distinguish between real data and the fake data.",
        "An actor selects actions; a critic evaluates them.",
        "A teacher model provides labels; a student model learns them.",
      ],
      correctAnswer:
        "A generator tries to create fake data that looks real; a discriminator tries to distinguish between real data and the fake data.",
      explanation:
        "GANs consist of a Generator (which synthesizes fake data from noise) and a Discriminator (which acts as a binary classifier to distinguish real vs. fake). They are trained together in a zero-sum game.",
      hints: [
        "The generator never sees real data directly; it only receives feedback through the discriminator.",
        "Training GANs is notoriously difficult due to mode collapse and training instability.",
      ],
    },
  ],
  "diffusion-fundamentals": [
    {
      id: "q-fai-kp-29",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How do Diffusion models (like Stable Diffusion) generate images?",
      options: [
        "By adversarial training against a discriminator.",
        "By predicting the next pixel in a sequence autoregressively.",
        "By starting with random noise and iteratively applying a neural network to denoise it step-by-step into a clear image.",
        "By applying a single pass through a U-Net.",
      ],
      correctAnswer:
        "By starting with random noise and iteratively applying a neural network to denoise it step-by-step into a clear image.",
      explanation:
        "Diffusion models are trained to reverse a forward diffusion process (which adds noise to an image). During generation, they start with pure Gaussian noise and iteratively \'denoise\' it to reveal a coherent image.",
      hints: [
        "The forward process gradually adds noise; the model learns to reverse this process.",
        "Many denoising steps (e.g., 50-1000) are needed to go from pure noise to a clear image.",
      ],
    },
  ],
  "ethical-implications-ai": [
    {
      id: "q-fai-kp-30",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is evaluating the ethical implications of AI models, like bias and fairness, critical before deployment?",
      options: [
        "Because ethical models always run faster on GPUs.",
        "To prevent models from amplifying existing societal biases present in the training data, which can lead to unfair or harmful outcomes.",
        "It is only required by law; there is no technical reason.",
        "Because it reduces the size of the model\'s weights.",
      ],
      correctAnswer:
        "To prevent models from amplifying existing societal biases present in the training data, which can lead to unfair or harmful outcomes.",
      explanation:
        "Machine learning models learn from historical data. If that data contains biases, the model will likely learn and automate those biases, potentially causing harm when deployed in real-world systems.",
      hints: [
        "Biased training data leads to biased models — garbage in, garbage out.",
        "Fairness metrics (e.g., equal opportunity, demographic parity) help quantify and address bias.",
      ],
    },
  ],
  "model-deployment-hf": [
    {
      id: "q-fai-kp-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the following describes a common approach to deploying a fastai model to Hugging Face Spaces?",
      options: [
        "Writing a custom C++ inference engine.",
        "Exporting the model as a pickle file (.pkl) and loading it within a Gradio or Streamlit app.",
        "Training the model from scratch directly on the Hugging Face servers.",
        "Using a specialized hardware accelerator specifically designed for Hugging Face.",
      ],
      correctAnswer:
        "Exporting the model as a pickle file (.pkl) and loading it within a Gradio or Streamlit app.",
      explanation:
        "fastai models can be easily exported to a .pkl file and deployed using frameworks like Gradio or Streamlit on Hugging Face Spaces for interactive web applications.",
      hints: [
        "fastai\'s `learn.export()` saves the model including the DataLoaders configuration.",
        "Gradio is a popular choice for creating quick ML demos.",
      ],
    },
    {
      id: "q-fai-kp-4b",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In fastai, which method saves the trained model to a .pkl file for deployment?",
      options: [
        "learn.save('model.pkl')",
        "learn.export('model.pkl')",
        "torch.save(learn, 'model.pkl')",
        "learn.to_pickle('model.pkl')",
      ],
      correctAnswer: 1,
      explanation:
        "`learn.export('model.pkl')` saves the complete Learner object including the model weights AND the DataLoaders configuration (transforms, vocab, etc.), making it self-contained for deployment. `learn.save()` only saves the model weights and requires the DataLoaders to be recreated separately.",
      hints: [
        "`export()` is for deployment; `save()` is for checkpointing during training.",
        "The exported .pkl includes everything needed to make predictions on new data.",
      ],
    },
    {
      id: "q-fai-kp-4c",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When loading an exported fastai model for inference, which function is used?",
      options: [
        "Learner.load('model.pkl')",
        "load_learner('model.pkl')",
        "fastai.load('model.pkl')",
        "torch.load('model.pkl')",
      ],
      correctAnswer: 1,
      explanation:
        "`load_learner('model.pkl')` reconstructs the complete Learner from the exported file, including the model and all preprocessing transforms. This single line is all you need to go from a .pkl file to a fully functional model ready for inference.",
      hints: [
        "The function is `load_learner`, not `Learner.load`.",
        "It\'s imported from `fastai.vision.all` (or the relevant fastai module).",
      ],
    },
    {
      id: "q-fai-kp-4d",
      type: "true-false",
      difficulty: "easy",
      question:
        "Hugging Face Spaces allows you to host Gradio or Streamlit apps for free, making it a popular choice for deploying fastai model demos.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Hugging Face Spaces provides free hosting for Gradio and Streamlit web applications, making it the standard platform for sharing interactive ML demos. The fastai course specifically recommends it as the easiest way to deploy and share your trained models.",
      hints: [
        "Spaces runs your app on Hugging Face\'s servers, so no cloud account setup is needed.",
        "You just push your app code and model file to a Spaces repository.",
      ],
    },
    {
      id: "q-fai-kp-4e",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is a key consideration when deploying a fastai model to production regarding the Python environment?",
      options: [
        "The production server must use the same GPU as the training machine.",
        "The fastai and PyTorch versions must be compatible between training and deployment environments, as pickle files are sensitive to library version changes.",
        "The model must be retrained on the production server before it can be used.",
        "Production deployment requires converting the model to ONNX format first.",
      ],
      correctAnswer: 1,
      explanation:
        "fastai exports use Python\'s pickle, which is sensitive to library versions. A model exported with fastai 2.7 may not load correctly with fastai 2.3. Best practice is to pin library versions and match the training and deployment environments using requirements.txt or conda environments.",
      hints: [
        "This is a well-known limitation of pickle-based serialization in Python.",
        "ONNX export is an alternative that avoids this issue but requires additional conversion steps.",
      ],
    },
    {
      id: "q-fai-kp-4f",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a Gradio app using a fastai model, what does `learn.predict(img)` return?",
      options: [
        "Only the predicted class label as a string.",
        "A tuple of (predicted_label, predicted_index, probabilities_tensor) for all classes.",
        "A probability distribution as a Python list.",
        "Only the index of the most likely class.",
      ],
      correctAnswer: 1,
      explanation:
        "`learn.predict(item)` returns a 3-tuple: the decoded prediction label (e.g., \'cat\'), the integer index of that label, and a tensor of probabilities for all classes. In a Gradio app, you typically use `learn.predict(img)[2].tolist()` to get a dict mapping class names to probabilities for the label output component.",
      hints: [
        "The third element (index 2) is the full probability distribution over all classes.",
        "In Gradio\'s Label component, you pass a dict of class: probability pairs.",
      ],
    },
  ],
});
