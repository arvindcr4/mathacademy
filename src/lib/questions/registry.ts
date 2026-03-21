import type { Question } from "@/lib/curriculum";

// Registry: maps kp-slug  ->  questions array
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
      "Approximately 1.9 \$\\times\$ 10^-5",
      "Approximately 2.8 \$\\times\$ 10^-4",
      "Approximately 7.6 \$\\times\$ 10^-4",
      "Approximately 3.6 \$\\times\$ 10^-1",
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
    options: ["1.5", "2.5", "10", "sqrt(2.5) \$\\approx\$ 1.58"],
    correctAnswer: 1,
  },
  "q-sciml-kp2-2": {
    question:
      "For a scalar Neural ODE at some time t, suppose the adjoint is a(t) = 2 and the local Jacobian is \\partialf_θ/\\partialh(t) = 3. According to the adjoint equation, what is da/dt at that time?",
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
  "q-rob-kp1-1": {
    question: "What computational bottleneck makes EKF-SLAM scale poorly to large maps?",
    options: [
      "The number of laser scan points per frame exceeds GPU memory",
      "The covariance matrix grows as O(N^2) in the number of landmarks N, making updates O(N^2) per step",
      "EKF requires computing the Jacobian of the neural network policy at each step",
      "The linearization error accumulates multiplicatively, not additively, with map size",
    ],
    correctAnswer: 1,
  },
  "q-rob-kp1-3": {
    question:
      "After a loop-closure constraint is added in pose-graph SLAM, which algorithm is used to optimize the poses?",
    options: [
      "Gauss-Newton or Levenberg-Marquardt nonlinear least-squares minimizing the sum of squared pose-constraint residuals",
      "A* search to find the shortest path through the pose graph",
      "Particle filter with loop closure likelihood weighting",
      "Expectation-Maximization over Gaussian mixture pose distributions",
    ],
    correctAnswer: 0,
  },
  "q-rob-kp11-3": {
    question:
      "What is the main practical challenge of applying DAgger to physical robot learning?",
    options: [
      "Compounding errors cannot occur in physical robots because proprioception corrects drift automatically",
      "Physical expert querying requires a human operator to provide correct actions at every state the robot visits, which is time-consuming and burdensome, making fully interactive DAgger impractical for long-horizon tasks",
      "DAgger cannot be applied to continuous action spaces such as robot joint torques",
      "The aggregated dataset always overfits to early demonstrations, preventing the policy from improving",
    ],
    correctAnswer: 1,
  },
  "q-rob-kp13-3": {
    question:
      "For robot deployment, what is the main practical advantage of using DDIM instead of DDPM in Diffusion Policy?",
    options: [
      "DDIM allows deterministic sampling with far fewer denoising steps (e.g., 10 vs 100), greatly reducing inference latency for real-time robot control",
      "DDPM produces higher-quality actions than DDIM at the cost of more GPU memory",
      "DDIM requires a separate value function to score action candidates, whereas DDPM does not",
      "DDPM supports continuous action spaces while DDIM is limited to discrete action tokens",
    ],
    correctAnswer: 0,
  },
  "q-clim-kp31-2": {
    type: "multiple-choice",
    question:
      "In DeepMind's data center cooling work, what did the RL system learn to optimize?",
    options: [
      "Chiller, cooling tower, and pump setpoints to reduce cooling energy",
      "The location of new data centers",
      "Server CPU clock speeds for each workload",
      "Fiber network routing between regions",
      "Wholesale electricity prices in nearby markets",
    ],
    correctAnswer: 0,
  },
  "q-clim-kp32-2": {
    type: "multiple-choice",
    question:
      "Why may ML models trained only on historical climate-yield data underestimate future climate impacts on crop yields?",
    options: [
      "Future climate conditions can fall outside the model's training distribution",
      "Crop yields are independent of weather once soil is known",
      "Satellite sensors stop measuring vegetation under high CO2",
      "Historical data always contains more extreme heat than future scenarios",
      "Yield models cannot use precipitation as an input",
    ],
    correctAnswer: 0,
  },
  "q-clim-kp37-2": {
    type: "multiple-choice",
    question:
      "What is the main risk of applying naive ML bias correction to climate model outputs?",
    options: [
      "It can distort the climate change signal and introduce spurious trends",
      "It forces all model outputs to match the historical mean exactly",
      "It removes all extremes from the corrected series",
      "It makes climate projections impossible beyond 2030",
      "It guarantees better extrapolation to new forcing scenarios",
    ],
    correctAnswer: 0,
  },
  "q-clim-kp40-2": {
    type: "multiple-choice",
    question: "What does ML predict in contrail-avoidance routing for aviation?",
    options: [
      "The probability that a flight segment will produce persistent contrails",
      "The number of passengers likely to miss connections",
      "The resale value of the aircraft after the flight",
      "The price of jet fuel at destination airports",
      "The probability of runway congestion during landing",
    ],
    correctAnswer: 0,
  },
  "q-cv3d-kp4-2": {
    type: "true-false",
    question:
      "ZoeDepth produces metric monocular depth by adding a metric binning head on top of a DPT/MiDaS relative-depth backbone.",
    correctAnswer: "true",
  },
  "q-cv3d-kp7-1": {
    type: "multiple-choice",
    question:
      "An Instant-NGP hash encoding has 16 levels, 2^19 entries per level, and 2 features per entry. How many trainable parameters does the encoding have in total?",
    correctAnswer: 1,
  },
  "q-cv3d-kp19-2": {
    type: "true-false",
    question:
      "CenterPoint detects 3D objects with a BEV center heatmap and regresses size, orientation, and velocity at each detected center instead of using rotated anchors.",
    correctAnswer: "true",
  },
  "q-cv3d-kp31-2": {
    type: "true-false",
    question:
      "Instant-NGP's multiresolution hash encoding can tolerate hash collisions without explicit conflict resolution because repeated gradient updates let shared entries encode the dominant queried signal.",
    correctAnswer: "true",
  },
  "q-dl-kp7-1": {
    question:
      "In Adam, if m_hat = 0.01 and v_hat = 0.0001, what is m_hat / sqrt(v_hat)?",
    options: ["0.001", "0.01", "0.1", "1", "100"],
    correctAnswer: 3,
  },
  "q-dl-kp14-3": {
    question:
      "In one self-attention layer, what is the maximum path length between token 1 and token 100?",
    options: ["1", "2", "10", "99", "It depends on d_model"],
    correctAnswer: 0,
  },
  "q-dl-kp15-2": {
    type: "multiple-choice",
    question: "If H(x)=F(x)+x and F'(x)=0 at a point, what is H'(x) there?",
    options: ["0", "1", "F(x)", "x", "F'(x)"],
    correctAnswer: 1,
  },
  "q-dl-kp30-2": {
    question: "If GELU(x)=x*Phi(x) and Phi(2)~=0.977, what is GELU(2) closest to?",
    options: ["0.023", "0.046", "0.98", "1.95", "2.98"],
    correctAnswer: 3,
  },
  "q-msd-kp10-6": {
    type: "multiple-choice",
    question:
      "A fraud model's recall falls from 85% on test to 60% in production within 3 months, with no change in fraud rate. Which option best explains the drop?",
    options: [
      "The test set was too small; retrain with more data.",
      "Adversarial concept drift: fraudsters are adapting their behavior patterns to evade the model. Corrective action: continuous model monitoring with adversarial feature drift detection, frequent retraining on recent data, and active collection of new fraud patterns.",
      "The serving infrastructure has bugs causing wrong predictions.",
      "The model was overfitted to the test set; apply stronger regularization.",
    ],
    correctAnswer: 1,
  },
  "q-msd-kp11-6": {
    type: "multiple-choice",
    question:
      "An ads pCTR model is overpredicting observed CTR by about 2x. What is the most efficient post-hoc fix without retraining the model?",
    options: [
      "Retrain the full two-tower model with a calibration objective.",
      "Apply Platt scaling: train a logistic regression on (model output, observed label) pairs using recent production data, then use the regression to map raw model outputs to calibrated probabilities.",
      "Multiply all pCTR predictions by 0.5 uniformly.",
      "Filter out low-pCTR predictions below 0.01.",
    ],
    correctAnswer: 1,
  },
  "q-msd-kp13-6": {
    type: "multiple-choice",
    question:
      "After global rollout, recall drops on non-English content and false positives spike in some languages. Which option best explains the failure?",
    options: [
      "Underfitting on non-English languages (fix: larger model) and distribution shift (fix: more test data).",
      "Cross-lingual transfer failure (recall drops because the English-trained model does not generalize to other languages - fix: multilingual fine-tuning with target-language examples) and cultural/linguistic false positive bias (the model flags culturally-specific idioms as harmful - fix: adversarial debiasing with native-language annotators).",
      "The model is overfitting to English training data (fix: add L2 regularization) and has high false positive rate globally (fix: increase the classification threshold).",
      "Insufficient training data (fix: collect more English examples) and annotation errors (fix: re-annotate the test set).",
    ],
    correctAnswer: 1,
  },
  "q-msd-rt1-3": {
    type: "multiple-choice",
    question:
      "A serving pipeline has p50 latency of 62 ms but p99 latency of 130 ms against an 80 ms SLA. What best explains the tail-latency spike?",
    options: [
      "The model inference is too slow at p99 - replace the model with a smaller one.",
      "Tail latency amplification: at p99, sequential steps compound slow tails (GC pause, Redis eviction, network jitter). Mitigation: hedged requests to the feature store, per-step timeouts with cached fallbacks, and request-level retries with backoff.",
      "The ANN retrieval step needs more replicas to reduce p99.",
      "Response serialization at 5 ms is the bottleneck - switch from JSON to protobuf.",
    ],
    correctAnswer: 1,
  },
  "q-dc-kp1-1": {
    question:
      "Trying larger models changes F1 from 72% to 73-74%, but fixing mislabeled training examples raises it to 85%. What does this show?",
    options: [
      "Trying larger architectures is the main source of improvement",
      "Improving label quality matters more than swapping architectures here",
      "Relabeling is just another form of fine-tuning",
      "The gain is mainly a regularization effect",
    ],
    correctAnswer: 1,
  },
  "q-dc-kp3-2": {
    type: "multiple-choice",
    question:
      "At the same average noise rate, which kind of label noise usually harms training more?",
    options: [
      "Symmetric noise, because both classes are corrupted equally",
      "Asymmetric noise, because it systematically pushes the decision boundary toward one class",
      "They are equally harmful if the average flip rate is the same",
      "Neither type matters once the dataset is large enough",
    ],
    correctAnswer: 1,
  },
  "q-dc-kp6-1": {
    question: "Why can active learning outperform random sampling when labels are expensive?",
    options: [
      "It should match random sampling until nearly all unlabeled data is labeled",
      "It spends labels on the examples likely to teach the model the most",
      "It works by automatically labeling the rest of the unlabeled pool",
      "It helps only when the model architecture changes each round",
    ],
    correctAnswer: 1,
  },
  "q-dc-kp7-1": {
    question: "Why can starting training with easier examples improve a model's final performance?",
    options: [
      "Easy examples always create the largest gradients",
      "They let the model learn broad structure first, then use hard examples to refine it",
      "Hard examples are usually mislabeled and should be delayed",
      "It is basically the same as gradient clipping",
    ],
    correctAnswer: 1,
  },
  "q-gem-kp-33": {
    type: "multiple-choice",
    question:
      "Why can vector-search RAG still be useful even when Gemini has a very large context window?",
    options: [
      "It can be faster and cheaper for large corpora, and it helps retrieve only the most relevant chunks.",
      "Gemini cannot read multiple documents in a single prompt.",
      "Large-context models cannot compare information across documents.",
      "RAG is required for any grounded response.",
    ],
    correctAnswer: 0,
  },
  "q-gem-kp-51": {
    type: "multiple-choice",
    question: "What does the `ANY` function-calling mode require Gemini to do?",
    options: [
      "Return at least one function call instead of replying with plain text only.",
      "Automatically choose the newest function definition.",
      "Execute the function itself on Google's servers.",
      "Call every available function in sequence.",
    ],
    correctAnswer: 0,
  },
  "q-gem-kp-92": {
    type: "multiple-choice",
    question:
      "What is the most accurate statement about Google Search grounding in the Gemini API?",
    options: [
      "It guarantees every factual statement is correct because each claim is independently verified.",
      "It can improve factuality by tying the answer to retrieved sources, but the model can still misread or misstate them.",
      "It disables generative reasoning and returns only verbatim search snippets.",
      "It works only for coding questions, not general factual queries.",
    ],
    correctAnswer: 1,
  },
  "q-gem-kp-98": {
    type: "multiple-choice",
    question:
      "With Gemini JSON mode enabled and a response schema provided, what does constrained decoding enforce most directly?",
    options: [
      "That the output follows the schema's structure, including required fields and basic field types.",
      "That every value in the JSON is factually correct.",
      "That the model returns the shortest valid JSON.",
      "That client-side validation is unnecessary.",
    ],
    correctAnswer: 0,
  },
  "q-ssl-kp7-1": {
    type: "multiple-choice",
    question: "In SimSiam, what is the role of stopgrad?",
    options: [
      "stopgrad freezes the projection head weights so only the encoder is trained",
      "stopgrad prevents gradients from flowing through one branch, breaking the trivial solution where both networks converge to output identical constant vectors",
      "stopgrad clips the gradient norm to prevent exploding gradients",
      "stopgrad is equivalent to adding L2 regularization on the target embeddings",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp8-1": {
    type: "multiple-choice",
    question: "In Barlow Twins, what do the two terms in the loss enforce?",
    options: [
      "First term enforces decorrelation; second term enforces invariance across augmentations",
      "First term (invariance): push C_ii -> 1 so each embedding dimension is consistent across views; second term (redundancy reduction): push C_ij -> 0 for i != j so different dimensions are decorrelated",
      "First term minimizes L2 distance between embeddings; second term maximizes cosine similarity",
      "First term prevents collapse; second term prevents mode dropping",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp10-3": {
    type: "multiple-choice",
    question:
      "In DINO, why are both centering and sharpening applied to the teacher output distribution?",
    options: [
      "Centering subtracts the batch mean from teacher outputs (prevents one dimension from dominating); sharpening uses a low temperature for the teacher softmax (prevents uniform collapse). Both are needed because centering alone leads to a uniform distribution, and sharpening alone leads to a single-class collapse",
      "Centering normalizes embeddings to unit sphere; sharpening applies L1 regularization to the output",
      "Centering computes the running mean of gradients for stability; sharpening amplifies the top-k logits by 10x",
      "Centering removes the bias term from the teacher projection head; sharpening applies ReLU to teacher outputs",
    ],
    correctAnswer: 0,
  },
  "q-ssl-kp44-1": {
    type: "multiple-choice",
    question:
      "Why does BERT replace 10% of masked positions with random words instead of always using [MASK]?",
    options: [
      "Random replacement adds noise that prevents the model from memorizing the training corpus",
      "If only [MASK] tokens were used, the model would learn to attend only to non-[MASK] positions at fine-tune time, causing a train-test mismatch since [MASK] never appears in downstream tasks",
      "Random words force the model to learn a uniform distribution over the vocabulary, preventing degenerate solutions",
      "10% random words match the natural token error rate in web-crawled pre-training text, making the task realistic",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp23-1": {
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
  "q-prod-kp24-1": {
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
  "q-prod-kp26-1": {
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
  "q-prod-kp29-1": {
    question:
      "A profiled inference kernel achieves only 25% of peak FLOPs but already uses 90% of peak GPU memory bandwidth. According to roofline analysis, which optimization is most likely to improve throughput?",
    options: [
      "Reduce memory traffic with kernel fusion or quantization, because the kernel is memory-bandwidth-bound.",
      "Focus on tensor-core optimizations only, because low FLOP utilization means compute is the bottleneck.",
      "Add more CPU data-loading workers, because the GPU bandwidth numbers imply a host-side input bottleneck.",
      "Lower the learning rate so each training step does less work.",
    ],
    correctAnswer: 0,
  },
  "q-aud-kp3-2": {
    type: "multiple-choice",
    question: "CTC collapse: decode a, blank, a, a, blank.",
    options: ["aa", "a", "aaa", "no label"],
    correctAnswer: 0,
  },
  "q-aud-kp5-2": {
    type: "multiple-choice",
    question:
      "Adding the LM log-score to each partial beam-search hypothesis is called:",
    options: ["shallow fusion", "deep fusion", "N-best rescoring", "cold fusion"],
    correctAnswer: 0,
  },
  "q-aud-kp24-2": {
    type: "multiple-choice",
    question: "In Mean Teacher, the teacher weights are updated by:",
    options: [
      "taking an exponential moving average of the student weights",
      "training a separate teacher on labeled data only",
      "copying the student weights exactly after each minibatch",
      "freezing the teacher after the first epoch",
    ],
    correctAnswer: 0,
  },
  "q-aud-kp28-2": {
    type: "multiple-choice",
    question:
      "When output order can flip between [A, B] and [B, A], PIT solves the:",
    options: [
      "label permutation problem",
      "phase reconstruction problem",
      "speaker counting problem",
      "beam search problem",
    ],
    correctAnswer: 0,
  },
  "q-k-kp-33": {
    question:
      "If a bigram model's predicted distribution exactly matches the true data distribution P, what is the expected average NLL?",
    options: ["0", "H(P)", "log(vocab_size), regardless of P", "It diverges to infinity"],
    correctAnswer: "H(P)",
  },
  "q-k-kp-36": {
    type: "multiple-choice",
    question:
      "If X has shape (B, T) and C has shape (V, d), what is the shape of C[X] before flattening in Karpathy's MLP?",
    options: ["(B, T, d)", "(B, d)", "(V, T, d)", "(B, T*d)"],
    correctAnswer: "(B, T, d)",
  },
  "q-k-kp-43": {
    question:
      "If p = softmax(logits) and y_one_hot is the target vector, what is dL/dlogits for cross-entropy loss on one example?",
    options: [
      "p - y_one_hot",
      "y_one_hot - p",
      "-log(p_y) applied element-wise",
      "1/p_y at the target index and 0 elsewhere",
    ],
    correctAnswer: "p - y_one_hot",
  },
  "q-k-kp-52": {
    question: "In Micrograd, which Value counts as a leaf node?",
    options: [
      "The final loss Value at the end of the graph",
      "A Value created directly as an input or parameter, not produced by an operation on other Values",
      "Any Value whose gradient is nonzero after backward()",
      "Any Value that stores an _op string",
    ],
    correctAnswer:
      "A Value created directly as an input or parameter, not produced by an operation on other Values",
  },
  "q-eval-kp3-1": {
    question:
      "A house-price model has MAE = 43.3K and RMSE = 58.3K. What does RMSE being noticeably larger than MAE usually indicate?",
    options: [
      "The model is underfitting on lower-priced houses.",
      "A few large prediction errors are inflating RMSE more than MAE.",
      "There is an implementation bug, because RMSE should equal MAE for an unbiased model.",
      "The target prices have high variance, not the model errors.",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp5-1": {
    question:
      "You have 10 fold-by-fold accuracy differences between Model A and Model B and want to run a paired t-test on those differences. Which assumption does the test make?",
    options: [
      "The paired fold-by-fold differences are approximately normally distributed.",
      "Both models must achieve at least 90% accuracy.",
      "The training split in each fold must be larger than the test split.",
      "The two models must have identical variance on every fold.",
    ],
    correctAnswer: 0,
  },
  "q-eval-kp10-2": {
    type: "true-false",
    question:
      "If the first relevant result for a query is at rank 3, additional relevant results at ranks 5 and 7 do not change that query's reciprocal rank.",
    options: ["True", "False"],
    correctAnswer: "true",
  },
  "q-eval-kp22-2": {
    question:
      "You try 50 hyperparameter settings on the same validation set and keep the one with the best validation score. How do you check whether that score is over-optimistic?",
    options: [
      "There is no risk, because the validation set was never used for gradient updates.",
      "Evaluate the selected model once on a held-out test set; the validation-test gap estimates selection bias. Using cross-validation instead of one split also helps.",
      "Average the 50 validation scores to debias the selected model.",
      "Validation overfitting only becomes a problem after thousands of configurations.",
    ],
    correctAnswer: 1,
  },
  "q-tab-kp13-1": {
    question:
      "Why do tree-based models often outperform MLPs on tabular data with many irrelevant features?",
    options: [
      "Because MLPs cannot handle numerical inputs unless every feature is normalized",
      "Because trees perform implicit feature selection through splits, while MLPs ingest all features and are more sensitive to irrelevant ones",
      "Because tree models require less GPU memory than MLPs",
      "Because MLPs cannot model nonlinear relationships in tabular data",
    ],
    correctAnswer: 1,
  },
  "q-tab-kp19-2": {
    question:
      "Which statement best describes LIME's core assumption and main limitation?",
    options: [
      "It assumes the model is globally linear, so it fails on nonlinear models",
      "It assumes the model is approximately linear near the explained point, but the neighborhood and perturbation kernel are user-defined and can change the explanation",
      "It assumes independent features and therefore returns exact Shapley values",
      "It assumes only the top-k features matter and ignores all others",
    ],
    correctAnswer: 1,
  },
  "q-tab-kp31-2": {
    question:
      "Which statement correctly describes temperature scaling for multiclass calibration?",
    options: [
      "It replaces softmax with softmax(logits / T), where T is a single scalar fit on validation data; T > 1 makes predictions less confident",
      "It fits a separate sigmoid for each class after training",
      "It rescales input features during training to stabilize gradients",
      "It learns one temperature per class and changes the ranking of class probabilities",
    ],
    correctAnswer: 0,
  },
  "q-tab-kp35-1": {
    question:
      "Which approach is a valid way to detect concept drift in production tabular ML systems?",
    options: [
      "Drift can only be detected after labels arrive and production accuracy drops",
      "Comparing feature means with t-tests is sufficient for all types of drift",
      "Monitoring only training loss during retraining is enough to detect drift",
      "Using unlabeled shift tests such as PSI / KS / chi-squared, output-distribution monitoring, or a classifier that separates old from new data; when labels arrive, also monitoring production performance",
    ],
    correctAnswer: 3,
  },
  "q-hc-kp10-2": {
    type: "multiple-choice",
    question: "What does the proportional hazards assumption in a Cox model mean?",
    options: [
      "Each patient's absolute hazard must remain constant over time.",
      "The hazard ratio between two individuals with different covariates is assumed constant over time.",
      "All predictors must have linear effects on raw survival time.",
      "The dataset cannot contain censored patients.",
    ],
    correctAnswer: 1,
  },
  "q-hc-kp30-2": {
    type: "multiple-choice",
    question: "What is confounding by indication in an observational real-world evidence study?",
    options: [
      "Patients are randomized to treatment based on disease severity.",
      "The clinical reason a patient receives a treatment is itself related to the outcome, biasing crude treatment comparisons.",
      "Investigators remove untreated patients from the analysis after enrollment.",
      "A treatment's mechanism of action is unknown at the time of analysis.",
    ],
    correctAnswer: 1,
  },
  "q-hc-kp34-2": {
    type: "multiple-choice",
    question:
      "Why are chest X-ray worklist triage AI tools usually regulated differently from autonomous diagnostic AI?",
    options: [
      "Because triage tools typically prioritize cases for radiologist review rather than making the final diagnosis, so the clinician remains in the loop.",
      "Because chest X-rays are exempt from FDA review when AI is used only for workflow.",
      "Because any radiology AI that flags urgent findings is automatically a Class I device.",
      "Because workflow tools are evaluated only on speed, not clinical safety.",
    ],
    correctAnswer: 0,
  },
  "q-hc-kp40-2": {
    type: "multiple-choice",
    question:
      "What does epsilon-differential privacy aim to guarantee in federated healthcare training?",
    options: [
      "That a model trained with DP cannot make any mistakes on minority patient groups.",
      "That adding or removing one patient's data changes the distribution of released outputs only by a bounded amount controlled by epsilon.",
      "That all gradients are encrypted end-to-end so the server never computes on plaintext values.",
      "That no attacker can ever infer anything at all about the training data.",
    ],
    correctAnswer: 1,
  },
  "q-sciml-kp4-3": {
    question:
      "A finite-difference solver uses 100 grid points in each spatial dimension. If the PDE is 4-dimensional, how many grid points are in the full grid?",
    options: ["400", "10,000", "1,000,000", "100,000,000"],
    correctAnswer: 3,
  },
  "q-sciml-kp9-3": {
    question:
      "A conformal model outputs 90% prediction intervals for molecular energy. Over many new molecules, what should that mean in practice?",
    options: [
      "Each individual interval has exactly 90% probability of containing the true energy",
      "About 90% of true energies should fall inside their predicted intervals on average",
      "All prediction intervals must have the same width",
      "The guarantee only holds when prediction errors are Gaussian",
    ],
    correctAnswer: 1,
  },
  "q-sciml-kp17-1": {
    question:
      "Seismologists record wave arrival times at the surface and use them to infer the underground rock structure. This is an example of:",
    options: [
      "A forward problem, because the measurements are known",
      "An inverse problem, because unknown parameters are inferred from observations",
      "A causal discovery problem, because the data form a time series",
      "A reinforcement learning problem, because the measurements arrive sequentially",
    ],
    correctAnswer: 1,
  },
  "q-sciml-kp24-1": {
    question:
      "A wind turbine has a live software model that ingests sensor data, updates its state in real time, and predicts failures before they happen. This system is best described as:",
    options: [
      "A cloud backup of the turbine's CAD files",
      "A digital twin",
      "A duplicate physical turbine used for destructive testing",
      "A static 3D visualization for operators",
    ],
    correctAnswer: 1,
  },
  "q-adapt-kp1-3": {
    question: "How does KLIEP estimate the importance ratio w(x)=P_T(x)/P_S(x)?",
    options: [
      "Train a source-vs-target classifier and use its odds ratio",
      "Directly fit w(x) so the reweighted source distribution matches the target under a normalization constraint",
      "Reweight each class by the ratio of target and source label frequencies",
      "Standardize source features to the target mean and variance",
    ],
    correctAnswer: 1,
  },
  "q-adapt-kp3-1": {
    question: "What is MMD^2(P,Q) for a kernel k?",
    options: [
      "The squared distance between the RKHS mean embeddings of P and Q",
      "The KL divergence between P and Q estimated with kernels",
      "The Wasserstein-1 distance between P and Q",
      "The squared difference between the covariance matrices of P and Q",
    ],
    correctAnswer: 0,
  },
  "q-adapt-kp4-3": {
    question:
      "In the Ben-David adaptation bound, what does the H-Delta-H divergence term measure?",
    options: [
      "The KL divergence between source and target feature distributions",
      "How well hypotheses in H can tell source examples from target examples apart",
      "The Wasserstein distance between the source and target marginals",
      "The mutual information between the domain label and the input",
    ],
    correctAnswer: 1,
  },
  "q-adapt-kp34-3": {
    question: "How does CoCoOp improve on CoOp for CLIP-based domain adaptation?",
    options: [
      "By learning more prompt tokens with a higher learning rate",
      "By making the prompt context depend on each input image instead of using one fixed context for all images",
      "By adding a separate adapter that replaces CLIP's text encoder",
      "By fine-tuning a target-domain language model for text prompts",
    ],
    correctAnswer: 1,
  },
  "q-cv-kp2-2": {
    question:
      "How many learnable parameters does a 64-filter 3 x 3 conv have on a 32-channel input, with one bias per filter?",
    options: ["18,432", "18,496", "18,560", "36,864"],
    correctAnswer: 1,
  },
  "q-cv-kp2-3": {
    question:
      "For a 3 x 3 conv with stride 1, what padding keeps the spatial size unchanged?",
    options: ["P = 0", "P = 1", "P = 2", "P depends on channel count"],
    correctAnswer: 1,
  },
  "q-cv-kp5-1": {
    question:
      "A predicted box has area 60, a ground-truth box has area 80, and their intersection is 40. What is IoU?",
    options: ["0.40", "0.50", "0.67", "0.75"],
    correctAnswer: 0,
  },
  "q-cv-kp6-2": {
    question: 'What does the "8s" in FCN-8s mean?',
    options: [
      "It uses an 8x-downsampled feature map with skip connections for finer output",
      "It uses 8 filters in the segmentation head",
      "It predicts 8 classes per pixel",
      "It upsamples in 8 separate stages",
    ],
    correctAnswer: 0,
  },
  "q-tr-kp1-1": {
    question:
      "In scaled dot-product attention with d_k = 64, why do we divide the scores by sqrt(d_k) = 8?",
    options: [
      "To make each attention row sum to 1",
      "To keep the logits from getting too large and saturating the softmax",
      "To match the size of the value vectors",
      "To turn dot products into cosine similarities",
    ],
    correctAnswer: 1,
  },
  "q-tr-kp1-2": {
    question:
      "For a sequence of length 512, how many query-key dot products are in the full self-attention score matrix?",
    options: ["32,768", "262,144", "16,777,216", "4,096"],
    correctAnswer: 1,
  },
  "q-tr-kp2-1": {
    question:
      "Why does 8-head attention with d_model = 512 have about the same attention compute as one 512-dimensional head?",
    options: [
      "Because each head still uses 512 dimensions",
      "Because each head uses only 512/8 = 64 dimensions, so 8 smaller heads add up to about the same total work",
      "Because all heads share the same Q, K, and V projections",
      "Because parallel execution makes the extra heads free",
    ],
    correctAnswer: 1,
  },
  "q-tr-kp5-1": {
    question:
      "Using lr = d_model^-0.5 * min(step^-0.5, step * warmup_steps^-1.5), with d_model = 512 and warmup_steps = 4000, when does the learning rate peak and about what is it?",
    options: [
      "Step 1000; about 0.001",
      "Step 4000; about 0.000696",
      "Step 10000; about 0.1",
      "Step 1; about 1.0",
    ],
    correctAnswer: 1,
  },
  "q-rlhf-kp34-2": {
    type: "multiple-choice",
    question: "In PPO-RLHF, the critic is usually initialized from which model?",
    options: [
      "The reward model, because it already produces a scalar quality estimate",
      "The frozen reference policy, because it anchors the KL term",
      "The actor policy, because PPO requires actor and critic to start identical",
      "A fresh network, because value targets must be learned from scratch",
    ],
    correctAnswer: 0,
  },
  "q-rlhf-kp38-3": {
    type: "multiple-choice",
    question: "Which preference pair is most informative when collecting online RLHF data?",
    options: [
      "One strong answer and one obviously bad answer",
      "Two close answers where the judge is genuinely uncertain which is better",
      "The two longest answers, since length exposes more behavior",
      "Pairs from prompts the model already handles confidently",
    ],
    correctAnswer: 1,
  },
  "q-rlhf-kp40-3": {
    type: "multiple-choice",
    question: "As policy KL from the SFT model grows, what usually happens to gold reward?",
    options: [
      "It keeps rising as KL grows",
      "It peaks at an intermediate KL, then declines",
      "It stays roughly flat once the reward model is fixed",
      "It falls immediately from the first policy update",
    ],
    correctAnswer: 1,
  },
  "q-rlhf-kp59-4": {
    type: "multiple-choice",
    question:
      "What is the main difference between RLHF and Constitutional AI in how harmlessness is specified?",
    options: [
      "RLHF learns it from preference data; Constitutional AI states it as explicit principles",
      "RLHF uses explicit rules; Constitutional AI learns it only from pairwise labels",
      "Both rely on the same learned reward model, just with different prompt wording",
      "Constitutional AI removes human input from the objective entirely",
    ],
    correctAnswer: 0,
  },
  "q-mls-kp6-3": {
    question:
      "In DeepSpeed ZeRO Stage 3, what is sharded across GPUs to reduce memory per GPU?",
    options: [
      "Only the optimizer states",
      "Optimizer states and gradients, but not parameters",
      "Optimizer states, gradients, and model parameters",
      "Only the model parameters",
    ],
    correctAnswer: 2,
  },
  "q-mls-kp8-3": {
    question: "How does vLLM's PagedAttention primarily improve LLM inference throughput?",
    options: [
      "Quantizing the KV cache to INT4",
      "Managing the KV cache in non-contiguous memory pages to eliminate fragmentation and enable better batching",
      "Using a speculative decoding draft model for all requests",
      "Distributing attention heads across multiple GPUs",
    ],
    correctAnswer: 1,
  },
  "q-mls-kp35-1": {
    question:
      "An ML system grows from 1 million to 1 billion users. What becomes the main scaling challenge?",
    options: [
      "The model architecture must be completely redesigned.",
      "The system must handle not just increased request volume but also increased data heterogeneity, longer tail distributions in user behavior, stricter latency SLAs at scale, and the compounding effects of model feedback loops on user behavior.",
      "More users always improve model quality due to more training data.",
      "Scaling from 1M to 1B users only requires adding more servers.",
    ],
    correctAnswer: 1,
  },
  "q-mls-kp40-1": {
    question: "Which situation best describes a silent ML failure in production?",
    options: [
      "A model that generates predictions with no sound output.",
      "A model that continues to serve predictions and appears healthy by system metrics (uptime, latency, error rate) but is actually producing subtly wrong predictions due to data drift, feature bugs, or model degradation - undetected until business impact materializes.",
      "A failure that occurs only during low-traffic periods.",
      "A model crash that is not logged to the monitoring system.",
    ],
    correctAnswer: 1,
  },
  "q-fin-kp2-1": {
    question:
      "Portfolio A has annualized excess return 12% and volatility 20%; Portfolio B has excess return 6% and volatility 8%. Which portfolio has the higher Sharpe ratio?",
    options: [
      "Portfolio A, because it has the higher excess return",
      "Portfolio B, because 0.06/0.08 = 0.75 exceeds 0.12/0.20 = 0.60",
      "Both portfolios have the same Sharpe ratio",
      "Sharpe ratios cannot be compared unless the portfolios have the same volatility",
    ],
    correctAnswer: 1,
  },
  "q-fin-kp10-3": {
    question: "Which description best matches top-of-book order flow imbalance (OFI)?",
    options: [
      "The ratio of total ask volume to total bid volume across the full depth of the book",
      "The net change in displayed demand at the best bid minus displayed supply at the best ask over the interval",
      "The number of buyer-initiated trades minus seller-initiated trades over the interval",
      "The bid-ask spread divided by the mid-price",
    ],
    correctAnswer: 1,
  },
  "q-fin-kp21-3": {
    question: "For a category/bin j in a credit scorecard, the Weight of Evidence (WoE) is computed as:",
    options: [
      "log((% of events in bin j) / (% of non-events in bin j))",
      "log(P(event | bin j) / P(non-event | bin j))",
      "(% of events in bin j - % of non-events in bin j) * 100",
      "The Gini coefficient of that variable computed within bin j",
    ],
    correctAnswer: 0,
  },
  "q-fin-kp27-3": {
    question: "Why is the SVI parameterization popular for fitting implied-volatility smiles?",
    options: [
      "It is the exact closed-form smile implied by the Heston model for any parameter set",
      "It is automatically arbitrage-free across strikes and maturities without extra constraints",
      "It uses a parsimonious five-parameter form that fits market smiles well and can be calibrated quickly, though no-arbitrage constraints still have to be imposed separately",
      "Its parameters are determined directly by spot, rates, and dividends, so calibration is unnecessary",
    ],
    correctAnswer: 2,
  },
  "q-rob-kp21-3": {
    question: "How does ADR decide when to widen or narrow the randomization range?",
    options: [
      "The performance of the policy on a fixed evaluation environment: if performance exceeds a threshold, randomization is widened; if it drops below a lower threshold, it is narrowed",
      "The gradient magnitude of the policy loss with respect to randomization parameters",
      "The KL divergence between the simulation and real-world state distributions measured with domain adaptation",
      "A human operator manually expanding the randomization range after each training run",
    ],
    correctAnswer: 0,
  },
  "q-rob-kp31-3": {
    question: "What is the main advantage of 6-DOF grasp prediction over top-down planar grasping?",
    options: [
      "6-DOF methods can generate grasps from any approach direction, enabling grasping of objects in bins, shelves, or occluded environments where a top-down approach is geometrically infeasible",
      "6-DOF methods require fewer training examples because the 6D grasp space is smaller than the 2D planar space",
      "Top-down grasps are inherently unstable; 6-DOF grasps are always more stable by definition",
      "6-DOF methods only work with RGB-D cameras while planar methods work with any sensor",
    ],
    correctAnswer: 0,
  },
  "q-rob-kp37-3": {
    question: "What is the main benefit of tight coupling over loose coupling in LiDAR-IMU odometry?",
    options: [
      "Tight coupling jointly optimizes LiDAR point-to-plane residuals and IMU pre-integration residuals in a single factor graph, providing motion estimates even during LiDAR degeneracy (e.g., in featureless corridors)",
      "Tight coupling eliminates the need for IMU entirely by using LiDAR Doppler velocity",
      "Tight coupling processes LiDAR and IMU data sequentially, with each correcting the other independently",
      "Tight coupling is only applicable to 2D LiDAR and cannot be used with 3D spinning LiDARs",
    ],
    correctAnswer: 0,
  },
  "q-rob-kp40-3": {
    question:
      "What is the main benefit of the low gear ratios used in QDD actuators for legged locomotion?",
    options: [
      "High gear ratios increase output torque but also amplify motor friction and reflected inertia, making the joint stiff and unable to feel or respond to ground contact forces; QDD's low gear ratio preserves back-drivability and impact transparency for compliant, reactive leg control",
      "Low gear ratios increase maximum joint velocity, enabling faster leg swing during running",
      "QDD eliminates the need for joint encoders by using current sensing for position control",
      "Low gear ratios reduce motor heat dissipation, allowing continuous high-torque operation",
    ],
    correctAnswer: 0,
  },
  "q-clim-kp1-2": {
    type: "multiple-choice",
    question:
      "Why are ML weather models like PanGu-Weather much cheaper to run at inference time than traditional NWP models?",
    options: [
      "They predict only a small subset of atmospheric variables",
      "They use a learned forward pass instead of numerically solving atmospheric equations at each time step",
      "They reuse yesterday's forecast without new computation",
      "They run only on CPUs while NWP requires GPUs",
    ],
    correctAnswer: 1,
  },
  "q-clim-kp6-2": {
    type: "multiple-choice",
    question: "What forecast horizon are sky-camera CNN models best suited for in solar forecasting?",
    options: [
      "Several days ahead",
      "Several hours ahead",
      "Very short-term nowcasts over roughly 0-30 minutes",
      "Seasonal outlooks",
    ],
    correctAnswer: 2,
  },
  "q-clim-kp11-2": {
    type: "multiple-choice",
    question:
      "What have ML models been used to detect in satellite hyperspectral imagery from industrial facilities?",
    options: [
      "Individual methane plumes",
      "Only cloud shadows and haze layers",
      "Underground pipelines hidden below the surface",
      "Real-time electricity demand at each facility",
    ],
    correctAnswer: 0,
  },
  "q-clim-kp35-2": {
    type: "multiple-choice",
    question: "What quantity do ML models often estimate to monitor ocean acidification globally?",
    options: [
      "Seafloor carbonate burial rates from ship tracks",
      "Surface ocean pCO2 from variables such as temperature, chlorophyll, and salinity",
      "Deep-ocean pH directly from radar backscatter",
      "Only dissolved oxygen from visible imagery",
    ],
    correctAnswer: 1,
  },
  "q-cv3d-kp18-3": {
    type: "multiple-choice",
    question:
      "Why do point-transformer models usually restrict self-attention to local kNN or radius neighborhoods instead of all points?",
    options: [
      "It reduces attention cost from quadratic to near-linear in the number of points while preserving local geometric structure.",
      "Global self-attention cannot model unordered point sets.",
      "Local attention makes positional encodings unnecessary.",
      "Using all points would force the model to output a fixed number of points.",
    ],
    correctAnswer: 0,
  },
  "q-cv3d-kp20-3": {
    type: "multiple-choice",
    question:
      "What is the main trade-off between voxel-based sparse-convolution segmenters and point-based segmenters for large 3D scenes?",
    options: [
      "Voxel methods scale efficiently by operating on occupied grid cells, but quantization loses some fine geometric detail; point-based methods preserve exact coordinates but are usually more expensive.",
      "Voxel methods avoid any spatial quantization, while point-based methods require a fixed voxel grid.",
      "Point-based methods are always more accurate and faster because they never downsample.",
      "Sparse convolutions only work for indoor scans, while point-based models only work for outdoor LiDAR.",
    ],
    correctAnswer: 0,
  },
  "q-cv3d-kp29-3": {
    type: "multiple-choice",
    question:
      "Why can a driving world model look strong on one-step prediction yet fail on long rollouts?",
    options: [
      "Small autoregressive errors compound over time, pushing the model off-distribution and degrading future predictions.",
      "World models can condition on actions only for the first predicted frame.",
      "Long rollouts remove uncertainty, so prediction quality becomes irrelevant.",
      "Camera intrinsics usually change from frame to frame during rollout.",
    ],
    correctAnswer: 0,
  },
  "q-cv3d-kp30-3": {
    type: "multiple-choice",
    question:
      "Why are open-loop metrics on logged data not enough to evaluate an end-to-end driving policy?",
    options: [
      "Because they do not test how the policy's own actions change future states; small imitation errors can compound badly in closed loop.",
      "Because open-loop evaluation cannot be used for waypoint prediction models.",
      "Because logged data contains no lane markings or traffic lights.",
      "Because only reinforcement learning policies can be evaluated offline.",
    ],
    correctAnswer: 0,
  },
  "q-gan-kp31-2": {
    type: "true-false",
    question:
      "GAN training is guaranteed to converge to a Nash equilibrium when both networks use gradient descent with a sufficiently small learning rate.",
    options: ["True", "False"],
    correctAnswer: "false",
  },
  "q-gan-kp32-2": {
    type: "true-false",
    question:
      "In a projection discriminator, the class label is incorporated by taking an inner product between the final feature vector and a class embedding rather than by concatenating the label.",
    options: ["True", "False"],
    correctAnswer: "true",
  },
  "q-gan-kp33-2": {
    type: "true-false",
    question:
      "CycleGAN's identity loss penalizes the generator when it changes an input that is already in the target domain, helping preserve color and style.",
    options: ["True", "False"],
    correctAnswer: "true",
  },
  "q-gan-kp34-2": {
    type: "true-false",
    question:
      "AttnGAN generates images from text by using word-level attention at multiple resolutions to align specific words with specific spatial regions of the image.",
    options: ["True", "False"],
    correctAnswer: "true",
  },
  "q-prod-ex4-2": {
    question:
      "In an ML DAG, preprocessing takes 4 hours and fans out to 5 training jobs. One training job fails after 3 hours. What should the pipeline do?",
    options: [
      "Rerun the entire DAG, including preprocessing.",
      "Retry only the failed training job from checkpointed preprocessing output.",
      "Mark the DAG successful with the other 4 models.",
      "Pause the whole DAG for manual recovery.",
    ],
    correctAnswer: 1,
  },
  "q-prod-ex5-2": {
    question:
      "An ML team runs 200 experiments per week with no experiment tracker. What is the main production risk?",
    options: [
      "Training slows down because too many runs compete for infrastructure.",
      "The team cannot reliably identify, reproduce, or audit the run behind the deployed model.",
      "Running many experiments always causes overfitting.",
      "This only affects compliance, not operations.",
    ],
    correctAnswer: 1,
  },
  "q-prod-ex6-1": {
    question:
      "For a 10% treatment / 90% control ML A/B test, which assignment method is correct?",
    options: [
      "Route treatment by time of day.",
      "Use a deterministic hash of a stable user ID.",
      "Randomize every request independently.",
      "Assign users alphabetically.",
    ],
    correctAnswer: 1,
  },
  "q-prod-ex9-3": {
    question:
      "A canary improves overall metrics but regresses for users in region X (8% of traffic). What is the correct promotion decision?",
    options: [
      "Promote because most users improve.",
      "Block promotion until the region X regression is understood and either fixed or explicitly accepted.",
      "Promote everywhere except region X immediately.",
      "Reject the model permanently.",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp6-1": {
    type: "multiple-choice",
    question: "In BYOL, how is the target network updated?",
    options: [
      "By gradient descent on the BYOL loss, just like the online network",
      "By exponential moving average (EMA) of the online network parameters",
      "By random re-initialization at the start of each epoch",
      "By averaging the online network parameters across all GPU workers",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp10-1": {
    type: "multiple-choice",
    question: "In DINO, how is the teacher network updated during training?",
    options: [
      "By backpropagating the student-teacher cross-entropy loss through the teacher",
      "By exponential moving average (EMA) of the student parameters, with no gradients through the teacher",
      "By re-initializing the teacher every 100 epochs",
      "By training the teacher separately on labeled data",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp33-1": {
    type: "multiple-choice",
    question: "Why does MAE run the encoder only on visible patches?",
    options: [
      "To prevent the encoder from seeing any context around masked regions",
      "To reduce encoder compute by processing only the unmasked patches",
      "Because the decoder must be deeper than the encoder",
      "To force the encoder to learn only global image statistics",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp45-1": {
    type: "multiple-choice",
    question: "In wav2vec 2.0, what is the quantization module used for during pre-training?",
    options: [
      "Compressing audio waveforms before training",
      "Turning continuous audio features into discrete targets for the contrastive loss",
      "Quantizing gradients to reduce distributed-training communication",
      "Converting raw audio into mel-spectrogram phoneme labels",
    ],
    correctAnswer: 1,
  },
  "q-meta-kp3-3": {
    question:
      "In Koch et al. (2015), Siamese Networks for one-shot image recognition are best described by which setup?",
    options: [
      "Two identical CNN branches with shared weights, trained with binary cross-entropy on a sigmoid same/different score.",
      "Two independent CNN branches trained with cross-entropy over the episode classes.",
      "Three shared branches trained with triplet loss on anchor, positive, and negative examples.",
      "A single CNN fine-tuned separately on each support example at test time.",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp6-3": {
    question:
      "In a standard single-step MAML episode, which split is used for adaptation and which for the meta-update?",
    options: [
      "Adapt on the support set; compute the meta-update from the query set.",
      "Adapt on the query set; compute the meta-update from the support set.",
      "Use the support set for both adaptation and meta-update.",
      "Use the query set for both adaptation and meta-update.",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp7-2": {
    question:
      "When Reptile uses k = 1 inner SGD step on a sampled task, what does its update reduce to?",
    options: [
      "A step proportional to the sampled task gradient at theta, matching FOMAML with one inner step.",
      "An exact second-order MAML meta-gradient through the inner update.",
      "Zero, because phi and theta are identical after one step.",
      "An average over all previously seen task gradients stored in memory.",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp41-3": {
    type: "true-false",
    question:
      "With a single inner-loop gradient step, Reptile and FOMAML reduce to the same plain task-gradient update.",
    options: ["True", "False"],
    correctAnswer: "true",
  },
  "q-msd-kp1-6": {
    question: "Which option correctly interprets 99.9% availability for an ML system?",
    options: [
      "~44 minutes/month; only infrastructure failures count toward downtime.",
      "~44 minutes/month; model degradation events (silent accuracy drops, data pipeline failures producing wrong features) must also be counted as availability failures if they cause incorrect outputs.",
      "~8.7 hours/month; 99.9% availability only applies to web servers, not ML models.",
      "~4.4 minutes/month; 99.9% is the strictest SLA and applies to all systems equally.",
    ],
    correctAnswer: 1,
  },
  "q-msd-kp5-6": {
    question:
      "In NAS with accuracy and mobile latency as joint objectives, which option explicitly searches the Pareto frontier before selecting a model?",
    options: [
      "Optimize accuracy first, then apply post-training quantization to meet latency.",
      "Use a Pareto-optimal search: identify the set of architectures where no architecture dominates another in both accuracy and latency, then select the Pareto-optimal architecture matching your latency budget.",
      "Use a weighted sum: loss = accuracy + lambda x latency. Tune lambda on the validation set.",
      "Maximize accuracy subject to a hard latency constraint using constrained optimization.",
    ],
    correctAnswer: 1,
  },
  "q-msd-kp10-3": {
    question:
      "At a 0.5% fraud rate, which option best explains how 99.5% accuracy can coexist with poor fraud recall?",
    options: [
      "False positive rate is ~0%; the model is highly accurate and the recall failure is due to class imbalance.",
      "At 0.5% fraud rate, predicting \"not fraud\" 100% of the time achieves 99.5% accuracy; the model has collapsed to the majority class, catching 0% of fraud - \"40% recall\" implies some minimal fraud detection with very high false negative rate.",
      "The model is overfitting to training data; accuracy does not generalize to test data.",
      "False positive rate is 60%, equal to the false negative rate.",
    ],
    correctAnswer: 1,
  },
  "q-msd-kp14-6": {
    question:
      "After blocking still leaves 50B candidate pairs at 0.1 ms/pair, which option adds an appropriate fast pre-filter before the expensive classifier?",
    options: [
      "Run the classifier on all 50B pairs using a distributed cluster of 500 machines.",
      "Apply two-stage scoring: a fast vectorized similarity pre-filter (TF-IDF cosine < 0.3 -> discard) to reduce candidate pairs by 90%, followed by the 0.1 ms classifier on the remaining 5B pairs. Add transitivity closure (union-find) to propagate matches.",
      "Reduce blocking to 100M candidate pairs by using stricter blocking keys, accepting recall loss.",
      "Use approximate nearest neighbor search (LSH) to replace blocking entirely, generating 1M candidate pairs.",
    ],
    correctAnswer: 1,
  },
  "q-opt-kp2-2": {
    type: "multiple-choice",
    question: "What is the key change in AdamW?",
    options: [
      "Apply weight decay directly to the weights instead of mixing it into the adaptive gradient update",
      "Add the weight-decay term to the gradient before Adam normalizes it",
      "Drop the second-moment estimate and keep only momentum",
      "Replace bias correction with Nesterov lookahead",
    ],
    correctAnswer: 0,
  },
  "q-opt-kp7-2": {
    type: "multiple-choice",
    question: "ZeRO Stage 3 shards which state across data-parallel ranks?",
    options: [
      "optimizer states, gradients, and parameters",
      "optimizer states only",
      "optimizer states and gradients only",
      "activations, gradients, and parameters",
    ],
    correctAnswer: 0,
  },
  "q-opt-kp8-2": {
    type: "multiple-choice",
    question: "When does gradient accumulation match a single large-batch update?",
    options: [
      "When the model has no batch norm layers",
      "Only when momentum and weight decay are both zero",
      "Only when each micro-batch runs on a different GPU",
      "Only when gradients are synchronized after every micro-batch",
    ],
    correctAnswer: 0,
  },
  "q-opt-kp40-2": {
    type: "multiple-choice",
    question: "If ||g||_2 exceeds c, what does global-norm clipping do?",
    options: [
      "Multiply all gradients by c / ||g||_2",
      "Clip each gradient coordinate independently into [-c, c]",
      "Zero the largest gradient coordinates until the norm is c",
      "Rescale each layer separately to norm c",
    ],
    correctAnswer: 0,
  },
  "q-ra-2": {
    question:
      "Using the three-reversal method, what are the time and extra-space complexities to rotate an array?",
    options: [
      "O(n) time, O(1) extra space",
      "O(n) time, O(n) extra space",
      "O(n log n) time, O(1) extra space",
      "O(1) time, O(1) extra space",
    ],
    correctAnswer: 0,
  },
  "q-lcp-2": {
    question:
      "If there are n strings and the shortest has length m, what is the worst-case time of vertical LCP scanning?",
    options: ["O(m)", "O(n + m)", "O(n * m)", "O(n log m)"],
    correctAnswer: 2,
  },
  "q-iq-1": {
    question: "In a queue built from two stacks, what is the amortized time per operation?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 0,
  },
  "q-av-1": {
    question:
      "For lowercase letters, what is the asymptotic cost of the optimal sliding-window solution for Find All Anagrams in a String?",
    options: [
      "O(n) time, O(1) space",
      "O(n log k) time, O(1) space",
      "O(nk) time, O(k) space",
      "O(n^2) time, O(1) space",
    ],
    correctAnswer: 0,
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
