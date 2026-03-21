import type { Question } from "@/lib/curriculum";

// Registry: maps kp-slug → questions array
export type QuestionsMap = Record<string, Question[]>;

const registry: QuestionsMap = {};

const difficultyRank: Record<Question["difficulty"], number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

type QuestionOverride = Partial<
  Pick<
    Question,
    | "type"
    | "question"
    | "options"
    | "correctAnswer"
    | "explanation"
    | "hints"
    | "codeSnippet"
  >
>;

const questionOverrides: Record<string, QuestionOverride> = {
  "q-ra-1": {
    question: "Rotate [1,2,3,4,5,6,7] to the right by 3. What array do you get?",
    options: [
      "[5,6,7,1,2,3,4]",
      "[4,5,6,7,1,2,3]",
      "[3,4,5,6,7,1,2,3]",
      "[1,2,3,4,5,6,7]",
    ],
    correctAnswer: 0,
    explanation:
      "A right rotation by 3 moves the last three elements, [5,6,7], to the front. The result is [5,6,7,1,2,3,4].",
    hints: [
      "This is a right rotation, so the tail moves to the front.",
      "Take the last three elements [5,6,7] and place them before [1,2,3,4].",
    ],
  },
  "q-rnn-4": {
    question: "What list remains after removing the 2nd node from the end of 1->2->3->4->5?",
    options: ["1->2->3->5", "1->2->4->5", "1->3->4->5", "2->3->4->5"],
    correctAnswer: 0,
    explanation:
      "Counting from the end gives 5 as first and 4 as second, so the node with value 4 is removed. The remaining list is 1->2->3->5.",
    hints: [
      "Count backward from the tail: 5 is first, 4 is second.",
      "Delete the node with value 4 and reconnect 3 directly to 5.",
    ],
  },
  "q-vbst-2": {
    options: [
      "[10,5,15,null,null,6,20]",
      "[5,3,7,1,4,6,8]",
      "[2,1,3]",
      "[1,null,2]",
    ],
    correctAnswer: 0,
    explanation:
      "The tree [10,5,15,null,null,6,20] passes the immediate-child check at node 15 because 6 < 15, but it is still invalid because 6 lies in the right subtree of 10 and must therefore be greater than 10.",
    hints: [
      "A node in the right subtree must respect every ancestor bound, not only its parent.",
      "Here the value 6 is in the right subtree of 10, so it violates the global lower bound.",
    ],
  },
  "q-gem-kp-16": {
    question:
      "Which set of tasks is included in Gemini's image-understanding capabilities?",
    options: [
      "Visual question answering, OCR, and image description.",
      "OCR only, not question answering or captioning.",
      "Image description only, not text extraction.",
      "Image generation only, not image understanding.",
    ],
    correctAnswer: 0,
  },
  "q-gem-kp-28": {
    question:
      "If you want to adapt Gemini in Google AI Studio using labeled input-output examples, which approach are you using?",
    options: [
      "Pre-training a new foundation model from scratch.",
      "Reinforcement learning from human feedback without labeled input-output pairs.",
      "Supervised fine-tuning, often implemented with parameter-efficient methods.",
      "Prompt engineering alone, without any model adaptation.",
    ],
    correctAnswer: 2,
  },
  "q-gem-kp-48": {
    type: "multiple-choice",
    question:
      "What mechanism lets Gemini's structured output feature enforce a provided JSON schema more reliably than prompt-only formatting instructions?",
    options: [
      "Higher temperature sampling.",
      "Constrained decoding / grammar-constrained generation.",
      "Post-processing the output with regex after generation.",
      "Streaming the JSON response in smaller chunks.",
    ],
    correctAnswer: 1,
  },
  "q-gem-kp-54": {
    type: "multiple-choice",
    question:
      "When using generateContentStream(), where should an application usually look for the final safety ratings and finish reason?",
    options: [
      "In the first streamed chunk.",
      "In the final chunk or the aggregated .response.",
      "Only in the request headers.",
      "Streaming responses never include them.",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp37-1": {
    question:
      "An inference service's p99 latency jumps from 80 ms to 400 ms after a deploy. Which combination of observability signals best answers: 'Is there a spike?', 'Which requests are affected?', and 'Where in the prediction path is time spent?'",
    options: [
      "Metrics for detecting the spike, logs for inspecting affected requests, and traces for locating which component adds latency.",
      "Logs for detecting the spike, traces for inspecting affected requests, and metrics for locating which component adds latency.",
      "Metrics for all three questions, because aggregates are sufficient for debugging.",
      "Traces for detecting the spike, logs for locating the slow component, and metrics for inspecting affected requests.",
    ],
    correctAnswer: 0,
  },
  "q-prod-kp35-1": {
    question:
      "A hiring model advances 72% of applicants from group A and 54% from group B. Under the 80% rule, what is the correct conclusion?",
    options: [
      "No disparate impact, because both groups have pass rates above 50%.",
      "Potential disparate impact, because 54/72 = 0.75, which is below 0.8.",
      "No disparate impact, because the absolute gap is only 18 percentage points.",
      "You cannot assess disparate impact here without measuring latency by group.",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp34-1": {
    question:
      "An on-call engineer is paged for PSI > 0.25 on a key production feature at 2 AM. Which runbook content would most directly help them triage and mitigate the incident safely?",
    options: [
      "A copy of the full model training code and recent experiment history.",
      "Alert definitions and thresholds, step-by-step triage checks, copy-paste rollback commands, escalation contacts, and common root causes.",
      "A list of all users affected by previous incidents.",
      "The quarterly roadmap for the ML platform team.",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp7-2": {
    type: "multiple-choice",
    question:
      "Which ML serving scenario is the best fit for REST/JSON rather than gRPC?",
    options: [
      "A public inference API used by browser clients and third-party developers, with moderate throughput and frequent manual debugging.",
      "An internal microservice handling 50,000 RPS with p99 latency under 5 ms.",
      "A backend-only service where binary serialization and HTTP/2 multiplexing are the primary bottlenecks.",
      "A latency-critical internal scoring service where payload size and serialization overhead dominate.",
    ],
    correctAnswer: 0,
  },
  "q-k-kp-5-d": {
    question:
      "A model's training loss stays flat instead of dropping. Which explanation is least likely?",
    options: [
      "The learning rate is too small.",
      "The gradients are vanishing.",
      "There is a bug in the training code.",
      "The training set has many examples.",
    ],
    correctAnswer: "The training set has many examples.",
  },
  "q-k-kp-10-b": {
    question:
      "In PyTorch, if you one-hot encode a single character index from a 27-character vocabulary as a 1D tensor, what shape do you get?",
    options: ["(27,)", "(1, 27)", "(27, 1)", "(1,)"],
    correctAnswer: "(27,)",
  },
  "q-k-kp-10-c": {
    question:
      "If e_i is a 1 x 27 one-hot row vector with its 1 at index i, what is e_i @ W for a weight matrix W of shape [27, 27]?",
    options: [
      "The i-th row of W, extracted as a vector.",
      "The i-th column of W, extracted as a vector.",
      "The scalar W[i, i].",
      "The zero vector.",
    ],
    correctAnswer: "The i-th row of W, extracted as a vector.",
  },
  "q-k-kp-17": {
    question:
      "What situation can make a ReLU neuron, or a tanh neuron in saturation, effectively stop learning?",
    options: [
      "Using a learning rate that is too low.",
      "When its pre-activation stays in a region where the local gradient is zero or near zero.",
      "When the batch size is 1.",
      "When the input contains negative values.",
    ],
    correctAnswer:
      "When its pre-activation stays in a region where the local gradient is zero or near zero.",
  },
  "q-nlp-kp2-1": {
    question:
      "In the sentence 'The bank can guarantee deposits will eventually cover future tuition costs,' why is the word 'bank' difficult for static word embeddings such as Word2Vec or GloVe?",
    options: [
      "\"bank\" is too rare in corpora to learn a stable embedding.",
      "Static embeddings assign one context-independent vector to \"bank\", blending its financial and river senses.",
      "Static embeddings can represent verbs but not nouns with multiple meanings.",
      "The sentence is too long for word embeddings to use nearby context.",
    ],
    correctAnswer: 1,
  },
  "q-nlp-kp3-1": {
    question:
      "Using a bigram model, what is the probability of the sentence '<s> I want Chinese food </s>' if P(I|<s>) = 0.25, P(want|I) = 0.33, P(Chinese|want) = 0.0065, P(food|Chinese) = 0.52, and P(</s>|food) = 0.68?",
    options: [
      "Approximately 1.9 × 10^-5",
      "Approximately 2.8 × 10^-4",
      "Approximately 7.6 × 10^-4",
      "Approximately 3.6 × 10^-1",
    ],
    correctAnswer: 0,
  },
  "q-nlp-kp11-2": {
    question:
      "SQuAD 1.1 evaluates with Exact Match (EM) and token-level F1. If a model predicts 'the Amazon River' and the gold answer is 'the Amazon', which statement is correct?",
    options: [
      "EM = 1 because the main entity matches.",
      "EM = 0, but F1 is greater than 0 because the prediction partially overlaps the gold answer.",
      "Both EM and F1 are 0 because the strings are not identical.",
      "EM and F1 must always be equal on extractive QA tasks.",
    ],
    correctAnswer: 1,
  },
  "q-nlp-kp18-1": {
    question:
      "Why is SBERT much more efficient than a cross-encoder BERT for semantic search over 10 million candidate sentences?",
    options: [
      "Because SBERT compresses all 10 million candidates into one combined embedding.",
      "Because SBERT encodes candidates independently once offline, then compares the query embedding to stored candidate embeddings instead of running BERT on every query-candidate pair.",
      "Because SBERT removes the transformer and uses only cosine similarity.",
      "Because SBERT makes exact nearest-neighbor search constant-time.",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp29-2": {
    question:
      "CURL creates positive pairs by taking two random crops of the same observation frame.",
    correctAnswer: "true",
  },
  "q-ssl-kp40-2": {
    question:
      "In the alignment-uniformity view of contrastive SSL, what do the two terms mean?",
    options: [
      "Alignment means augmented views of the same example map nearby, and uniformity means embeddings spread out across the unit hypersphere.",
      "Alignment means matching embeddings to human judgments, and uniformity means balancing cluster sizes.",
      "Alignment means maximizing cosine similarity for all pairs, and uniformity means minimizing the covariance condition number.",
      "Alignment and uniformity are gradient-stability measures used to detect collapse during training.",
    ],
    correctAnswer: 0,
  },
  "q-ssl-kp3-2": {
    question: "In InfoNCE, what effect does lowering the temperature τ have?",
    options: [
      "It makes the similarity distribution peakier, so hard negatives have more influence.",
      "It increases the number of negative samples in the loss.",
      "It changes cosine similarity into Euclidean distance.",
      "It directly lowers the optimizer learning rate.",
    ],
    correctAnswer: 0,
  },
  "q-ssl-kp31-2": {
    question:
      "According to the explanation, what was the single most impactful factor behind DINOv2's improvement over DINO?",
    options: [
      "Curated high-quality training data.",
      "Replacing the loss with cosine similarity.",
      "Adding text supervision.",
      "Using a larger backbone alone.",
    ],
    correctAnswer: 0,
  },
  "q-adapt-kp2-1": {
    question:
      "Suppose a domain classifier is trained on equally many source and target examples and outputs p = P(source=1|x). Which expression gives the importance weight w(x) = P_T(x)/P_S(x)?",
    options: [
      "w(x) = p / (1 - p)",
      "w(x) = (1 - p) / p",
      "w(x) = log(p / (1 - p))",
      "w(x) = p(1 - p)",
    ],
    correctAnswer: 1,
  },
  "q-adapt-kp26-1": {
    question: "Which condition defines pure label shift?",
    options: [
      "P(X|Y) stays the same but P(Y) changes between source and target.",
      "P(Y|X) changes between source and target.",
      "P(X) changes while both P(Y) and P(X|Y) stay the same.",
      "Target labels are noisier than source labels.",
    ],
    correctAnswer: 0,
  },
  "q-adapt-kp35-3": {
    question:
      "In source-free domain adaptation, why add marginal-entropy maximization on top of entropy minimization?",
    options: [
      "To avoid vanishing gradients once predictions become confident.",
      "To prevent collapse to predicting the same class for nearly all target examples.",
      "To correct label imbalance in the source dataset.",
      "To recalibrate batch-normalization statistics on target data.",
    ],
    correctAnswer: 1,
  },
  "q-adapt-kp36-2": {
    type: "multiple-choice",
    question:
      "Why does freezing the backbone and adapting only small adapter layers help in continual domain adaptation?",
    options: [
      "It removes the need for target-domain adaptation signals.",
      "It limits updates to a small parameter subset, preserving backbone representations and reducing catastrophic forgetting.",
      "It guarantees zero forgetting with no stability-plasticity tradeoff.",
      "It makes regularization methods like EWC unnecessary.",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp21-2": {
    question:
      "You have source documents and model-written summaries, but no reference summaries. Your main concern is whether the summaries hallucinate facts. Which evaluation approach is most appropriate?",
    options: [
      "Use ROUGE against the source document.",
      "Use NLI- or QA-based factual consistency checks against the source document.",
      "Ask raters for overall summary quality only.",
      "Use summary perplexity as a proxy for factual accuracy.",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp22-1": {
    question:
      "You are tuning hyperparameters for a new model and want one final unbiased estimate of performance. How should the validation and test sets be used?",
    options: [
      "Use both validation and test sets repeatedly during tuning so the final estimate is stable.",
      "Use the validation set for model and hyperparameter choices; keep the test set untouched for one final evaluation.",
      "Use the validation set only for early stopping; use the test set for regularization and feature choices.",
      "Tune on the test set and report the validation result at the end.",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp25-1": {
    question:
      "You report AUC = 0.84 on a held-out test set, and a stakeholder asks for a 95% confidence interval without assuming a normal sampling distribution. What should you do?",
    options: [
      "Retrain many models on random subsets of the training data and average their AUCs.",
      "Bootstrap the test set by resampling it with replacement many times and recomputing AUC.",
      "Add random noise to the test labels and measure how much AUC changes.",
      "Report only the single test-set AUC; a confidence interval requires a parametric assumption.",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp31-1": {
    question:
      "A classifier approves 60% of group A and 60% of group B. But among truly qualified applicants, TPR is 90% for group A and 70% for group B, and FPR is 20% for group A and 10% for group B. Which statement is correct?",
    options: [
      "It satisfies equalized odds but not demographic parity.",
      "It satisfies demographic parity but not equalized odds.",
      "It satisfies both because the overall approval rates match.",
      "It satisfies neither because demographic parity and equalized odds always rise and fall together.",
    ],
    correctAnswer: 1,
  },
  "q-tab-kp22-1": {
    question:
      "Why can naive target encoding overfit on rare categories, and how does smoothed target encoding reduce that problem?",
    options: [
      "It removes rare categories entirely and replaces them with the global mean.",
      "It blends each category mean with the global mean, shrinking rare categories much more strongly than frequent ones.",
      "It computes encodings only from other folds so a sample never contributes to its own encoding.",
      "It rescales encoded values to [0, 1] so models can split on them more easily.",
    ],
    correctAnswer: 1,
  },
  "q-tab-kp33-2": {
    question:
      "For an imbalanced classifier, how should you choose the decision threshold if your objective is to maximize F1?",
    options: [
      "Use 0.5 by default; F1 is already balanced between precision and recall.",
      "Sweep candidate thresholds on a validation set and choose the one with the highest F1.",
      "Set the threshold to sqrt(prevalence).",
      "Set the threshold equal to the positive-class prevalence.",
    ],
    correctAnswer: 1,
  },
  "q-tab-kp39-1": {
    question:
      "Which statement best explains why excellent AutoML validation metrics are not enough to approve a model for production?",
    options: [
      "AutoML always chooses the most complex model, so it will overfit regardless of dataset size.",
      "AutoML optimizes a validation metric, but it can still rely on leaky features or choose models that fail calibration, latency, or regulatory constraints without domain review.",
      "AutoML cannot work with missing values or categorical features.",
      "AutoML only works on tabular datasets smaller than 100,000 rows.",
    ],
    correctAnswer: 1,
  },
  "q-tab-kp30-1": {
    question:
      "Which statement correctly describes how TabPFN makes predictions and why it is limited to small tabular datasets?",
    options: [
      "It fine-tunes on each new dataset with gradient descent, and its main limitation is pretraining-data diversity.",
      "It is pre-trained on synthetic tabular data, then uses the full training set as context in a single forward pass at inference; attention cost limits it to small datasets.",
      "It learns one universal tabular embedding and then needs only the feature schema at inference time.",
      "It trains a separate model for each dataset at inference time, so optimization speed is the main limitation.",
    ],
    correctAnswer: 1,
  },
  "q-mls-kp27-2": {
    question:
      "In LLM serving, prefix caching reuses the KV cache computed for the shared prompt prefix across requests.",
    correctAnswer: "true",
  },
  "q-mls-kp40-2": {
    question:
      "A recommendation model suddenly returns the same 10 items to every user. What should you investigate first?",
    options: [
      "Restore the model weights from backup immediately.",
      "Check for a feature or serving bug causing identical inputs or shared cached outputs; compare serving-time features, freshness timestamps, and recent deployments.",
      "Retrain the model with a higher learning rate.",
      "Scale out the inference service.",
    ],
    correctAnswer: 1,
  },
  "q-mls-kp12-2": {
    question:
      "Compared with a nightly batch job, real-time inference can use fresher features at request time.",
    correctAnswer: "true",
  },
  "q-mls-kp22-1": {
    question:
      "Which Kubernetes abstraction is best suited for orchestrating a distributed ML training job with coordinated workers and failure recovery?",
    options: [
      "Deployment with HorizontalPodAutoscaler",
      "A training operator such as Kubeflow PyTorchJob or TFJob",
      "DaemonSet",
      "StatefulSet with persistent volume claims",
    ],
    correctAnswer: 1,
  },
  "q-hc-kp13-2": {
    type: "multiple-choice",
    question:
      "What is the main reason plain federated learning is not a complete privacy solution in healthcare?",
    options: [
      "Hospitals must centralize patient labels before training",
      "Shared gradients or weights can leak information about underlying patient records",
      "Federated learning only works on encrypted medical images",
      "Local training prevents the global model from converging",
    ],
    correctAnswer: 1,
  },
  "q-hc-kp18-2": {
    type: "multiple-choice",
    question:
      "Which statement best reflects how ML and mechanistic epidemic forecasting models usually compare?",
    options: [
      "Pure ML models outperform mechanistic models at every forecast horizon",
      "Mechanistic SIR-style models outperform ML models at every forecast horizon",
      "ML models often do well short term, while mechanistic or hybrid models are often stronger at longer horizons",
      "Only mechanistic models can be included in ensemble forecasts",
    ],
    correctAnswer: 2,
  },
  "q-hc-kp24-2": {
    type: "multiple-choice",
    question:
      "Why are BLEU and ROUGE alone not enough to evaluate AI-generated radiology reports?",
    options: [
      "They require pixel-level annotations for each image",
      "They measure text overlap, not whether the clinical findings are factually correct and complete",
      "They can only be computed for English-language reports",
      "They are designed only for speech-recognition evaluation",
    ],
    correctAnswer: 1,
  },
  "q-hc-kp31-2": {
    type: "multiple-choice",
    question:
      "Why are hybrid rule-based plus ML systems commonly preferred for de-identifying clinical notes?",
    options: [
      "Rule-based systems cannot remove numeric identifiers such as phone numbers",
      "Clinical notes contain rare and ambiguous PHI patterns that rules alone often miss",
      "HIPAA Safe Harbor requires the use of transformer models",
      "ML is only needed for diagnosis extraction, not de-identification",
    ],
    correctAnswer: 1,
  },
  "q-cv-kp17-1": {
    question: "How does zero-shot image classification work in models like CLIP?",
    options: [
      "Encode each class description as text, compare those text embeddings to the image embedding, and predict the most similar class",
      "Fine-tune a new classifier on a few labeled images of each test class before inference",
      "Generate synthetic training images for unseen classes from their names and train on those",
      "Cluster image embeddings and assign the image to the nearest cluster centroid",
    ],
    correctAnswer: 0,
  },
  "q-cv-kp5-2": {
    question:
      "Why are detections sorted by confidence before Average Precision (AP) is computed?",
    options: [
      "Because AP traces precision and recall as the confidence threshold moves from high-confidence detections to lower-confidence ones",
      "Because IoU can only be computed after detections are ranked by confidence",
      "Because AP is defined by evaluating the largest predicted boxes first",
      "Because sorting by confidence removes the need to match detections to ground-truth boxes",
    ],
    correctAnswer: 0,
  },
  "q-cv-kp5-3": {
    question: "Why can DETR skip Non-Maximum Suppression at inference?",
    options: [
      "Because one-to-one Hungarian matching trains each query to specialize to at most one object",
      "Because transformer outputs are guaranteed not to overlap spatially",
      "Because DETR predicts segmentation masks instead of bounding boxes",
      "Because softmax over classes automatically suppresses duplicate boxes",
    ],
    correctAnswer: 0,
  },
  "q-cv-kp10-2": {
    question:
      "Why is global self-attention in a ViT layer more expensive than a 3x3 CNN layer at the same token resolution?",
    options: [
      "Self-attention compares every token with every other token, while a 3x3 convolution only mixes each position with 9 local neighbors",
      "Self-attention processes tokens sequentially, while CNNs process all positions in parallel",
      "Self-attention requires a different parameter matrix for each token position, while CNNs reuse one kernel",
      "A 3x3 convolution sees the whole image in one layer, so it needs fewer computations",
    ],
    correctAnswer: 0,
  },
  "q-tr-kp6-2": {
    type: "multiple-choice",
    question:
      "GPT-2 has a 50,257-token vocabulary. If another tokenizer has about 100,000 tokens and the same d_model, how large is its embedding table?",
    options: [
      "About 2x as many rows",
      "About 4x as many rows",
      "The same number of rows, just wider rows",
      "About half as many rows",
    ],
    correctAnswer: 0,
  },
  "q-tr-kp7-1": {
    question:
      "If loss scales as L(N) ∝ N^-0.076 and is 3.0 at 1B parameters, about what is it at 10B parameters?",
    options: ["About 2.5", "About 3.0", "About 1.5", "About 0.3"],
    correctAnswer: 0,
  },
  "q-tr-kp10-1": {
    question:
      "Why do learned absolute position embeddings trained only up to position 2048 usually degrade beyond that length?",
    options: [
      "Positions beyond 2048 have no learned in-distribution embeddings, so the model sees unseen positional inputs",
      "The attention matrix cannot be computed for sequences longer than 2048",
      "Transformers ignore token order once the sequence is long",
      "The tokenizer truncates every input to 2048 before the model sees it",
    ],
    correctAnswer: 0,
  },
  "q-tr-kp15-1": {
    question:
      "A 7B model is 14 GB in FP16. What is its theoretical size in INT4, and why is the real size slightly larger?",
    options: [
      "3.5 GB; per-group scales or zero-points add overhead",
      "7 GB; 4-bit weights still take 1 byte each",
      "14 GB; quantization changes precision but not size",
      "1.75 GB; metadata compression halves the INT4 size again",
    ],
    correctAnswer: 0,
  },
  "q-opt-kp4-2": {
    type: "multiple-choice",
    question: "What distinguishes SGDR from basic cosine annealing?",
    options: [
      "SGDR adds periodic warm restarts that reset the learning rate back near its maximum",
      "SGDR keeps the learning rate fixed after the first cosine decay",
      "SGDR replaces the cosine schedule with exponential decay",
      "SGDR differs only by using a larger peak learning rate",
    ],
    correctAnswer: 0,
  },
  "q-opt-kp22-1": {
    question:
      "Which optimization problem is the standard definition of the proximal operator prox_{λf}(v)?",
    options: [
      "argmin_x λf(x) + (1/2)||x - v||^2",
      "argmin_x f(x) + λ||x - v||",
      "argmin_x λf(x) - (1/2)||x - v||^2",
      "argmax_x λf(x) + (1/2)||x - v||^2",
    ],
    correctAnswer: 0,
  },
  "q-opt-kp35-3": {
    question:
      "For non-convex finite-sum objectives, what is the main theoretical advantage of variance-reduction methods like SARAH or SPIDER over vanilla SGD?",
    options: [
      "They guarantee convergence to the global minimum",
      "They need fewer gradient evaluations to reach an ε-stationary point",
      "They remove the need for snapshot or correction terms",
      "They have the same convergence behavior as SGD but lower memory use",
    ],
    correctAnswer: 1,
  },
  "q-opt-kp37-3": {
    question:
      "For SGD on a strongly convex objective with a decaying learning rate η_t = c/t, which asymptotic convergence rate is classically associated with vanilla SGD?",
    options: ["O(log t / t)", "O(1/sqrt(t))", "O(1/t^2)", "O(e^(-t))"],
    correctAnswer: 0,
  },
  "q-sciml-kp1-1": {
    question:
      "A PINN is evaluated at 4 interior collocation points, and the PDE residual values N[u_θ](x_i,t_i) are [1, -1, 2, -2]. What is the physics residual loss L_r?",
    options: ["1.5", "2.5", "10", "sqrt(2.5) ≈ 1.58"],
    correctAnswer: 1,
  },
  "q-sciml-kp2-2": {
    question:
      "For a scalar Neural ODE at some time t, suppose the adjoint is a(t) = 2 and the local Jacobian is ∂f_θ/∂h(t) = 3. According to the adjoint equation, what is da/dt at that time?",
    options: ["-6", "6", "-3", "3"],
    correctAnswer: 0,
  },
  "q-sciml-kp3-3": {
    question:
      "A DeepONet branch net outputs [1, 2], the trunk net outputs [3, 1], and the bias is 2. What is the predicted operator value G(u)(y)?",
    options: ["7", "5", "9", "14"],
    correctAnswer: 0,
  },
  "q-sciml-kp23-3": {
    question:
      "A differentiable program has N = 10,000 sequential layers. If gradient checkpointing stores only O(sqrt(N)) activations instead of O(N), about how many activations are stored, ignoring constant factors?",
    options: ["10", "100", "1,000", "10,000"],
    correctAnswer: 1,
  },
  "q-fai-kp-5": {
    question:
      "What does the learning rate finder help you estimate before full training?",
    options: [
      "A good learning-rate range by sweeping the learning rate upward until the loss stops improving",
      "The best network architecture for the dataset",
      "The exact number of epochs needed for convergence",
      "Which optimizer will achieve the highest final accuracy",
    ],
    correctAnswer: 0,
  },
  "q-fai-kp-27": {
    question:
      "What architectural idea makes U-Net especially effective for image segmentation?",
    options: [
      "Skip connections that pass high-resolution encoder features to matching decoder layers",
      "Recurrent layers that process the image row by row",
      "A single bottleneck representation used to predict every pixel without skip connections",
      "A softmax layer after every convolution block",
    ],
    correctAnswer: 0,
  },
  "q-fai-kp-36b": {
    question:
      "How do anchor-free detectors differ from anchor-based detectors such as Faster R-CNN?",
    options: [
      "They predict object locations directly from feature-map positions instead of refining predefined anchor boxes",
      "They still rely on anchor boxes, but use fewer anchor shapes",
      "They avoid neural networks and rely on classical image processing",
      "They are just another name for anchor-based detectors",
    ],
    correctAnswer: 0,
  },
  "q-fai-kp-40": {
    question:
      "Which statement correctly matches learn.save() and learn.export() in fastai?",
    options: [
      "learn.save() stores a training checkpoint; learn.export() creates a self-contained artifact for inference and deployment",
      "learn.save() and learn.export() both save the full Learner and are interchangeable",
      "learn.save() exports an ONNX model; learn.export() saves only weights",
      "learn.export() is mainly for compressing models, not for deployment",
    ],
    correctAnswer: 0,
  },
  "q-rl-kp10-3": {
    question: "If Q^pi(s,a) = 8 and V^pi(s) = 5, find A^pi(s,a).",
    options: ["3", "-3", "13", "8/5"],
    correctAnswer: 0,
  },
  "q-rl-kp12-3": {
    question:
      "If V^pi(s1) = 1 + 0.5V^pi(s2) and V^pi(s2) = 0.5V^pi(s1), find V^pi(s1).",
    options: ["4/3", "2/3", "1", "2"],
    correctAnswer: 0,
  },
  "q-rl-kp23-3": {
    question:
      "If the per-step importance-sampling ratio is 1/0.925 for 20 steps, find rho.",
    options: ["(1/0.925)^20 ~= 4.76", "0.925^20 ~= 0.21", "20/0.925 ~= 21.62", "1"],
    correctAnswer: 0,
  },
  "q-rl-kp26-3": {
    question:
      "If each Q_hat(s,a) is an unbiased noisy estimate of 0, what is E[max_a Q_hat(s,a)]?",
    options: ["> 0", "= 0", "< 0", "Cannot be determined"],
    correctAnswer: 0,
  },
  "q-agent-kp1-5": {
    type: "multiple-choice",
    question:
      "An agent adds 50 observations of about 200 tokens each to its running context. About how many tokens do those observations contribute?",
    options: ["1,000", "10,000", "20,000", "100,000"],
    correctAnswer: 1,
  },
  "q-agent-kp2-3": {
    question:
      "Human experts say a chemistry agent performs much better than vanilla GPT-4, but an LLM judge rates them nearly the same. What is the safest conclusion?",
    options: [
      "LLMs are reliable evaluators of expert-level chemistry tasks.",
      "LLM self-evaluation is unreliable when the task requires expertise the model does not have.",
      "Tool use did not materially improve the chemistry output.",
      "Human experts are systematically biased toward tool-using systems.",
    ],
    correctAnswer: 1,
  },
  "q-agent-kp3-9": {
    question:
      "ReAct tends to outperform chain-of-thought the most on which kind of task?",
    options: [
      "Code generation from a fixed prompt",
      "Multi-hop question answering that can use external search",
      "Arithmetic reasoning where all needed information is already in the prompt",
      "Static multiple-choice knowledge questions with no retrieval",
    ],
    correctAnswer: 1,
  },
  "q-agent-kp9-3": {
    question:
      "On repository bug-fixing benchmarks such as SWE-Bench, which agent design tends to work best?",
    options: [
      "Single-pass code generation with no tool use",
      "An iterative agent that edits files, runs tests or commands, and revises based on the results",
      "Pure retrieval of similar past patches with no execution",
      "An agent that only writes diffs and never runs code",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp1-1": {
    type: "multiple-choice",
    question: "Which change allows DQN to handle large state spaces?",
    options: [
      "Using a lookup table with interpolation between states",
      "Approximating the Q-function with a deep neural network parameterized by theta",
      "Discretizing the state space into a finite grid",
      "Running multiple Q-learning agents in parallel",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp1-3": {
    type: "multiple-choice",
    question:
      "Which two techniques made DQN stable enough to learn Atari games from raw pixels?",
    options: [
      "Policy gradients and entropy regularization",
      "Experience replay and a separate target network",
      "Batch normalization and residual connections",
      "Prioritized sampling and double Q-learning",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp2-1": {
    type: "multiple-choice",
    question: "What does DQN do with transitions stored in the replay buffer during training?",
    options: [
      "Replays the most recent transition for every gradient update",
      "Samples mini-batches of past transitions uniformly at random for training",
      "Only stores transitions from successful episodes",
      "Replays entire episodes in reverse order",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp3-1": {
    type: "multiple-choice",
    question: "What is the target network used for in DQN?",
    options: [
      "Select actions during environment interaction",
      "Provide stable TD targets by being updated less frequently than the online network",
      "Compute the policy gradient",
      "Encode state observations into feature vectors",
    ],
    correctAnswer: 1,
  },
  "q-mfml-kp2-3": {
    type: "multiple-choice",
    question: "If A and B are both invertible n x n matrices, what is (AB)^-1?",
    options: ["A^-1B^-1", "B^-1A^-1", "AB", "(A+B)^-1"],
    correctAnswer: 1,
  },
  "q-mfml-kp8-3": {
    type: "multiple-choice",
    question: "Which statement about Bayes' theorem is correct?",
    options: [
      "It requires H and E to be independent",
      "It follows from conditional probability and only requires P(E) > 0",
      "It can be used only when H and E are mutually exclusive",
      "It implies P(H|E) = P(E|H)",
    ],
    correctAnswer: 1,
  },
  "q-mfml-kp10-3": {
    type: "multiple-choice",
    question: "Which estimator is unbiased for the variance sigma^2 of a normal distribution?",
    options: [
      "sigma_hat^2_MLE = (1/n) sum_i (x_i-x_bar)^2",
      "s^2 = (1/(n-1)) sum_i (x_i-x_bar)^2",
      "(1/n) sum_i x_i^2",
      "x_bar^2",
    ],
    correctAnswer: 1,
  },
  "q-mfml-kp11-1": {
    question: "Compute grad f(1,2) for f(x,y) = 3x^2y + y^3 - 2x.",
    options: ["[10, 15]", "[12, 15]", "[10, 12]", "[6, 15]"],
    correctAnswer: 0,
  },
  "q-fin-kp26-3": {
    question:
      "A neural network trained to price options can encode the no-arbitrage constraint that call price is convex and non-increasing in strike by:",
    options: [
      "Adding L2 regularisation to penalise large weights",
      "Constraining the network architecture so second derivatives with respect to strike are non-negative (e.g., using monotone networks or penalty terms in the loss)",
      "Using dropout to prevent overfitting to training strike-price combinations",
      "Normalising the training targets to unit variance before fitting",
    ],
    correctAnswer: 1,
  },
  "q-fin-kp31-1": {
    question: "What is the primary limitation of historical-simulation VaR?",
    options: [
      "Historical simulation requires matrix inversion, which is numerically unstable",
      "Historical simulation is anchored to the specific historical window and cannot capture loss scenarios worse than any day in that window, understating tail risk when the history lacks extreme events",
      "Historical simulation overestimates VaR because it always uses the worst day as the estimate",
      "Historical simulation requires normally distributed returns, which rarely holds in practice",
    ],
    correctAnswer: 1,
  },
  "q-fin-kp33-3": {
    question:
      "Generalized Linear Models (GLMs) with log link and Tweedie distributions are the actuarial standard for insurance loss modeling. What is the primary advantage over ordinary least squares regression?",
    options: [
      "GLMs are faster to train than OLS because they use gradient descent rather than matrix inversion",
      "GLMs with log link enforce non-negative predictions and model multiplicative interactions between rating factors, matching the multiplicative structure of insurance tariffs and the right-skewed, zero-inflated nature of insurance losses",
      "GLMs always achieve higher predictive accuracy than OLS because they use regularization by default",
      "GLMs are preferred because they can handle more than 100 features without overfitting",
    ],
    correctAnswer: 1,
  },
  "q-fin-kp34-1": {
    question:
      "Why can an Information Coefficient (IC) of only 0.05 still be useful in quantitative equity investing?",
    options: [
      "IC is computed on monthly returns, which are inherently noisy compared to daily predictions",
      "Financial markets are highly competitive: most alpha signals are arbitraged away, leaving IC near zero. The residual IC of 0.05, applied with high breadth via the Fundamental Law of Active Management, compounds into economically significant returns",
      "IC of 0.05 means the model is wrong 95% of the time and should be discarded",
      "Low IC is caused by transaction costs that reduce gross alpha to near zero",
    ],
    correctAnswer: 1,
  },
};

// ── Hint generation helpers ─────────────────────────────────────────────────

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "must",
    "shall",
    "can",
    "need",
    "dare",
    "ought",
    "used",
    "to",
    "of",
    "in",
    "for",
    "on",
    "with",
    "at",
    "by",
    "from",
    "as",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "between",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "just",
    "but",
    "and",
    "if",
    "or",
    "because",
    "until",
    "while",
    "about",
    "against",
    "this",
    "that",
    "these",
    "those",
    "which",
    "who",
    "whom",
    "what",
    "whose",
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

function buildConceptHint(_question: Question, explanation: string): string {
  const keywords = extractKeywords(explanation);
  const significantWords = keywords.slice(0, 3);
  if (significantWords.length > 0) {
    return `Key concepts: ${significantWords.join(", ")}.`;
  }
  return "Review the core concepts related to this topic.";
}

function buildWorkHint(_question: Question, explanation: string): string {
  const sentences = explanation.split(/[.!?]+/).filter((s) => s.trim());
  if (sentences.length > 1) {
    const workSentence = sentences.find(
      (s) =>
        s.toLowerCase().includes("compute") ||
        s.toLowerCase().includes("calculate") ||
        s.toLowerCase().includes("find") ||
        s.toLowerCase().includes("determine"),
    );
    if (workSentence) {
      return `Work: ${workSentence.trim()}.`;
    }
  }
  return "Apply the relevant formula or technique to solve this problem.";
}

function dedupeHints(hints: string[]): string[] {
  const seen = new Set<string>();
  return hints.filter((hint) => {
    const normalized = hint.toLowerCase().trim();
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function normalizeCorrectAnswer(q: Question): Question["correctAnswer"] {
  if (q.type === "true-false") {
    const answer = String(q.correctAnswer).toLowerCase();
    return answer === "true" ? "true" : "false";
  }
  return q.correctAnswer;
}

function cleanExplanation(explanation: string): string {
  return explanation
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();
}

function ensureSentence(text: string): string {
  if (!text) return text;
  const trimmed = text.trim();
  if (!/[.!?]$/.test(trimmed)) {
    return trimmed + ".";
  }
  return trimmed;
}

function normalizeHints(question: Question, explanation: string): string[] {
  const authoredHints = question.hints ?? [];
  const fallbackHints = dedupeHints([
    buildWorkHint(question, explanation),
    buildConceptHint(question, explanation),
  ]);

  if (authoredHints.length === 0) {
    return fallbackHints;
  }

  const combinedHints = dedupeHints([...authoredHints, ...fallbackHints]);
  return combinedHints.slice(0, Math.max(3, authoredHints.length));
}

function normalizeQuestion(question: Question): Question {
  const overriddenQuestion = questionOverrides[question.id]
    ? { ...question, ...questionOverrides[question.id] }
    : question;
  const explanation = ensureSentence(
    cleanExplanation(overriddenQuestion.explanation),
  );

  return {
    ...overriddenQuestion,
    correctAnswer: normalizeCorrectAnswer(overriddenQuestion),
    explanation,
    hints: normalizeHints(overriddenQuestion, explanation),
  };
}

function normalizeQuestionSet(questions: Question[]): Question[] {
  return questions
    .map((question, index) => ({
      question: normalizeQuestion(question),
      index,
    }))
    .sort((a, b) => {
      const difficultyDelta =
        difficultyRank[a.question.difficulty] -
        difficultyRank[b.question.difficulty];
      return difficultyDelta !== 0 ? difficultyDelta : a.index - b.index;
    })
    .map(({ question }) => question);
}

export function registerQuestions(map: QuestionsMap) {
  const normalizedEntries = Object.fromEntries(
    Object.entries(map).map(([kpSlug, questions]) => [
      kpSlug,
      normalizeQuestionSet(questions),
    ]),
  );

  Object.assign(registry, normalizedEntries);
}

export function getQuestions(kpSlug: string): Question[] {
  return registry[kpSlug] ?? [];
}

export function getAllQuestions(): QuestionsMap {
  return registry;
}

export { questionOverrides };
