import type { Question } from "@/lib/curriculum";

const questions: Record<string, Question[]> = {
  // ── aud-kp-1: Acoustic Models and Feature Extraction (MFCC, Mel Spectrogram) ──
  "acoustic-models": [
    {
      id: "q-aud-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Mel-Frequency Cepstral Coefficients (MFCCs) are designed to mimic human auditory perception by:",
      options: [
        "Using a linear frequency scale so that all frequencies are represented with equal resolution",
        "Applying a mel-scale filterbank that compresses high frequencies, reflecting that the human ear is less sensitive to fine frequency differences at high frequencies",
        "Computing the raw Fourier transform magnitudes at logarithmically spaced frequency intervals to match auditory filter shapes",
        "Extracting spectral peaks from the short-time Fourier transform and encoding their frequencies as sinusoidal basis coefficients",
      ],
      correctAnswer: 1,
      explanation:
        "The mel scale is a perceptually motivated frequency scale where equal perceptual pitch intervals are equally spaced. The mel filterbank applies wider filters at high frequencies and narrower filters at low frequencies, reflecting that humans perceive pitch changes more finely at low frequencies and less precisely at high frequencies. This compression of high-frequency resolution is what gives MFCCs their perceptual character.",
      hints: [
        "At low frequencies, two close notes sound different; at high frequencies, the same frequency difference sounds like a single tone. How should the filterbank reflect this?",
        'The word "mel" comes from "melody" — it is a perceptual scale, not a physical one.',
      ],
    },
    {
      id: "q-aud-kp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The discrete cosine transform (DCT) step in MFCC computation is used to decorrelate the log mel filterbank energies, producing compact and approximately uncorrelated coefficients.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Adjacent mel filterbank channels overlap heavily and are therefore correlated. The DCT projects the log-energy vector into a space where most information is concentrated in the first approximately 13 coefficients and the coefficients are nearly decorrelated. This decorrelation means that a simple diagonal-covariance model (e.g., Gaussian) can represent the features well, making MFCCs compact and effective for downstream models.",
      hints: [
        "Decorrelation means the covariance matrix of the transformed features is close to diagonal — why is this important for compact modeling?",
        "The DCT is the optimal linear transform for decorrelating Gaussian sources under MSE — it plays a role analogous to PCA here.",
      ],
    },
    {
      id: "q-aud-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A mel spectrogram differs from MFCCs in that the mel spectrogram:",
      options: [
        "Uses a linear frequency scale instead of the mel scale, capturing all frequencies uniformly",
        "Stops after the log-mel filterbank step, retaining the full high-dimensional spectral envelope without the DCT compression used in MFCCs",
        "Is computed directly from the raw waveform using 1D convolutions without any STFT windowing",
        "Preserves the raw STFT phase information that is discarded in MFCC computation",
      ],
      correctAnswer: 1,
      explanation:
        "A mel spectrogram is computed as \\[\\text{STFT} \\rightarrow \\text{mel filterbank} \\rightarrow \\log \\], stopping before the DCT. MFCCs apply one additional step — the DCT — to decorrelate and compress these log-mel energies into approximately 13 coefficients. Because the mel spectrogram skips the DCT, it retains the full high-dimensional spectral envelope (typically 80 or 128 mel bins), preserving richer spectral shape information that deep neural networks can exploit.",
      hints: [
        "MFCCs apply one more transformation after the log-mel filterbank — what is it, and why might skipping it be beneficial?",
        "Deep networks can learn their own data-driven compression; the DCT's fixed linear decorrelation may discard information useful for the task.",
      ],
    },
  ],

  // ── aud-kp-2: HMM-based ASR and Viterbi Decoding ─────────────────────────
  "hmm-asr": [
    {
      id: "q-aud-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a traditional HMM-based ASR system, the acoustic model represents:",
      options: [
        "The prior probability of each word before any audio is observed",
        "The probability of observing acoustic features (e.g., MFCCs) given a particular phoneme state",
        "The language model probability of word sequences in a given language",
        "The mapping from graphemes (written letters) to phonemes (spoken sounds) using a pronunciation dictionary",
      ],
      correctAnswer: 1,
      explanation:
        "The acoustic model estimates the emission probability \\[P(\\text{observations} \\mid \\text{phoneme state})\\], describing what acoustic features look like when a particular phoneme is spoken. Combined with the HMM transition model and the language model via Bayes' rule, this enables finding the most likely word sequence.",
      hints: [
        "Bayes' rule for ASR: \\[P(W \\mid O) \\propto P(O \\mid W) P(W)\\]. Which term comes from the acoustic model?",
        'The acoustic model encodes what each phoneme "sounds like" as a distribution over feature vectors.',
      ],
    },
    {
      id: "q-aud-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In HMM-based ASR, Gaussian Mixture Models (GMMs) were historically used as emission distributions because they can approximate arbitrary continuous distributions over MFCC feature vectors.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "GMMs model \\[P(\\text{MFCCs} \\mid \\text{HMM state})\\] as a weighted sum of Gaussians. Since acoustic distributions for each phoneme are typically multimodal (different speakers, phonetic contexts), a single Gaussian would be insufficient. A mixture of K Gaussians can approximate any smooth density with enough components, making GMMs the dominant acoustic modeling approach before DNNs.",
      hints: [
        "Why would a single Gaussian fail to model the MFCC distribution of a phoneme spoken by many different people?",
        "With enough mixture components, a GMM can model arbitrarily complex density shapes — what mathematical property makes this possible?",
      ],
    },
    {
      id: "q-aud-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In the Viterbi algorithm for HMM decoding in ASR, the "trellis" is:',
      options: [
        "A word-level lattice enumerating all possible transcriptions with their acoustic scores",
        "A dynamic programming table where each cell stores the maximum log-probability of any partial path ending in a given state at a given time step, along with a back-pointer to recover the optimal state sequence",
        "A confusion matrix summarising phoneme-level substitution errors from the acoustic model",
        "A graph of all possible phone sequences from the pronunciation lexicon",
      ],
      correctAnswer: 1,
      explanation:
        "The Viterbi trellis is a states-by-time matrix. Each cell \\[\\delta_t(s)\\] holds the maximum log-probability of any path ending in state s at time t, computed via:\n\\[\n\\delta_t(s) = \\max_{s'} \\left[ \\delta_{t-1}(s') + \\log a_{s's} \\right] + \\log b_s(O_t)\n\\]\nwhere \\[a_{s's}\\] is the transition probability and \\[b_s(O_t)\\] is the emission score. A back-pointer records which previous state achieved the maximum. This avoids exponential enumeration, reducing complexity from O(S^T) to O(T \\cdot S^2).",
      hints: [
        "Each trellis cell encodes the best partial path ending there — what sub-problem does this represent?",
        "The back-pointer enables reconstructing the full optimal state sequence after the forward pass completes.",
      ],
    },
  ],

  // ── aud-kp-3: CTC Loss and Sequence-to-Sequence ASR ──────────────────────
  "ctc-loss": [
    {
      id: "q-aud-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The main problem that CTC (Connectionist Temporal Classification) loss solves in ASR is:",
      options: [
        "Reducing the memory footprint of large transformer models during training",
        "Enabling end-to-end training without requiring explicit frame-level alignments between acoustic features and phoneme labels",
        "Accelerating beam search decoding by pruning low-probability hypotheses early",
        "Acting as a regularisation term that prevents overfitting to the acoustic training data",
      ],
      correctAnswer: 1,
      explanation:
        "CTC eliminates the need for the expensive forced-alignment step required in HMM-GMM training, where each audio frame must be explicitly labelled with the corresponding phoneme state. Instead, CTC introduces a blank token and marginalises over all valid alignments between the variable-length input sequence and the shorter output label sequence, allowing the network to learn an implicit alignment during training.",
      hints: [
        "Traditional HMM-GMM acoustic model training requires a separate forced-alignment step that labels every audio frame with its corresponding phoneme — how does CTC remove this requirement?",
        'CTC sums the probability over all "valid" ways to map the output sequence to the target label sequence, using a blank token to handle repetitions.',
      ],
    },
    {
      id: "q-aud-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CTC uses a special blank token; under the CTC collapsing rule, consecutive repeated characters or characters separated only by blanks collapse to the same label, which is how CTC handles multiple frames emitting the same phoneme.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        'The CTC collapsing rule applies two steps in order: (1) remove all blank tokens, then (2) collapse any remaining consecutive repeated characters into a single instance. For example, the output sequence "c-a-b-blank-a-a-blank-c" collapses to "cabac", and both "c-blank-c" and "c-c" collapse to "c" — which is why the blank token is essential: it allows the model to emit the same character over multiple non-consecutive frames without confusion.',
      hints: [
        'Consider the sequence "a-a" emitted over two frames vs. "a-blank-a" emitted over two frames — what does each collapse to, and why does this distinction matter?',
        'The blank token acts as a "separator" signal — it tells CTC "this frame did not emit any output character."',
      ],
    },
    {
      id: "q-aud-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key difference between attention-based encoder-decoder ASR and CTC-based ASR is that:",
      options: [
        "Attention models can process streaming audio in real time, while CTC requires the entire utterance before decoding begins",
        "Attention models learn a soft, learned alignment between encoder states and each output token, enabling explicit modelling of output-to-output dependencies; CTC imposes a conditional independence assumption that output tokens depend only on the input",
        "Attention models output phoneme sequences while CTC outputs word sequences directly without any vocabulary mapping",
        "Attention models require a language model for decoding, whereas CTC does not benefit from language model rescoring",
      ],
      correctAnswer: 1,
      explanation:
        "Attention-based seq2seq models use a cross-attention mechanism to compute a dynamic weighted combination of all encoder states at each decoding step. This enables each output token to depend on the entire input and on previously generated output tokens, capturing output-to-output dependencies (similar to an implicit language model). CTC, by contrast, assumes each output label is conditionally independent of all other outputs given the encoder states — \\[P(y_1, ..., y_T \\mid x) = \\prod_t P(y_t \\mid x)\\] — which is a key limitation that attention-based models overcome.",
      hints: [
        "CTC's conditional independence assumption: \\[P(y_t \\mid y_{<t}, x) = P(y_t \\mid x)\\]. How does attention violate this?",
        'The attention mechanism lets the decoder "look back" at any encoded audio frame when generating each output token, and also attend to previously generated tokens.',
      ],
    },
  ],

  // ── aud-kp-4: Whisper and Large-Scale ASR Pretraining ────────────────────
  "whisper-model": [
    {
      id: "q-aud-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Whisper (OpenAI) achieves strong multilingual ASR performance primarily because of:",
      options: [
        "A novel recurrent architecture specifically designed for streaming audio",
        "Weak supervision at scale: training on 680,000 hours of multilingual audio-transcript pairs collected from the internet",
        "Using a language model trained on 100B tokens to re-score ASR hypotheses",
        "Applying data augmentation with adversarial noise during every training step",
      ],
      correctAnswer: 1,
      explanation:
        "Whisper\'s key contribution is scale and diversity: training on 680k hours of internet-sourced multilingual audio with paired transcripts provides enough coverage of accents, languages, and conditions to generalise robustly without task-specific fine-tuning.",
      hints: [
        "Previous ASR systems required careful domain-specific data curation—what did Whisper trade this for?",
        "The transcripts used for supervision were not manually labelled but collected from existing aligned audio-text sources.",
      ],
    },
    {
      id: "q-aud-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Whisper uses a standard encoder-decoder transformer architecture, where the encoder processes mel spectrogram frames and the decoder autoregressively generates text tokens.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Whisper applies a standard transformer encoder to the mel spectrogram and a causal transformer decoder to generate transcription tokens; special tokens encode the task (transcribe vs. translate), language, and timestamp mode.",
      hints: [
        "The architecture is deliberately standard—Whisper\'s novelty is in the data and training setup, not novel architecture components.",
        "Task and language are communicated to the decoder via special prefix tokens, not separate model components.",
      ],
    },
    {
      id: "q-aud-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A key limitation of Whisper in practical deployment is:",
      options: [
        "It cannot handle audio longer than 10 seconds without special chunking",
        "Its real-time factor is too slow for real-time streaming on most consumer hardware without optimisation",
        "It only supports English transcription despite being trained on multilingual data",
        "It requires manually provided word-level timestamps to produce accurate transcriptions",
      ],
      correctAnswer: 1,
      explanation:
        "Whisper\'s larger models (medium, large) require significant GPU compute; achieving real-time transcription on CPU or resource-constrained hardware requires distillation (e.g., Whisper Distil) or quantisation techniques.",
      hints: [
        "Whisper large-v3 has 1.5B parameters—what does inference speed look like on a CPU?",
        "The 30-second chunking constraint (answer A) exists but is addressable via sliding window; compute is a harder constraint.",
      ],
    },
  ],

  // ── aud-kp-5: Language Model Rescoring and Beam Search ───────────────────
  "language-model-rescoring": [
    {
      id: "q-aud-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In ASR beam search decoding, the "beam width" controls:',
      options: [
        "The frequency range of acoustic features considered by the decoder",
        "The number of partial hypotheses (candidate transcriptions) retained at each decoding step",
        "The maximum allowed length of the output transcription",
        "The interpolation weight between acoustic and language model scores",
      ],
      correctAnswer: 1,
      explanation:
        "Beam search keeps the top-B hypotheses at each step; B=1 is greedy decoding, larger B explores more of the search space at greater computational cost, trading off speed for transcription accuracy.",
      hints: [
        "Larger beam width increases accuracy (closer to exhaustive search) but also increases memory and compute.",
        'Think about what "beam" metaphorically means—a narrow beam vs. a wide beam of light.',
      ],
    },
    {
      id: "q-aud-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Shallow fusion in ASR combines acoustic model scores with language model scores at every beam search step by simple log-probability addition, whereas deep fusion integrates the LM into the acoustic model training.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Shallow fusion adds λ·log P_LM(w) to the acoustic log-score at each step during decoding (no retraining required); deep fusion (and cold/warm fusion variants) incorporates LM hidden states into the end-to-end model during training for tighter integration.",
      hints: [
        'Shallow fusion is "plug-in"—no model retraining needed, just score interpolation at decode time.',
        "Deep fusion requires modifying and retraining the acoustic model to accept LM representations as additional input.",
      ],
    },
    {
      id: "q-aud-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "N-best list rescoring with a neural LM differs from shallow fusion in that:",
      options: [
        "N-best rescoring uses a larger beam width than shallow fusion",
        "The LM is applied only after beam search completes, reranking a fixed set of complete hypotheses rather than influencing the search trajectory",
        "N-best rescoring trains the LM and acoustic model jointly on paired audio-text data",
        "N-best rescoring uses character-level LMs while shallow fusion uses word-level LMs",
      ],
      correctAnswer: 1,
      explanation:
        "N-best rescoring runs beam search with the acoustic model alone to produce the top-N complete transcriptions, then re-scores each with a (potentially slow) neural LM; the final hypothesis is the highest-scoring after LM rescoring, without the LM affecting search directions.",
      hints: [
        "Shallow fusion requires the LM to score partial hypotheses in real time—N-best rescoring avoids this constraint.",
        "A large neural LM that is too slow for step-by-step beam search can still be used for post-hoc rescoring.",
      ],
    },
  ],

  // ── aud-kp-6: Tacotron and Sequence-to-Sequence TTS ──────────────────────
  tacotron: [
    {
      id: "q-aud-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Tacotron 2's core architecture converts text to:",
      options: [
        "Raw audio waveform samples at 24kHz directly from character embeddings",
        "Mel spectrogram frames autoregressively, which are then converted to audio by a separate vocoder",
        "Phoneme duration labels used to drive a concatenative synthesiser",
        "A sequence of MFCC coefficients fed into an HMM-based vocoder",
      ],
      correctAnswer: 1,
      explanation:
        "Tacotron 2 uses an attention-based encoder-decoder to produce mel spectrogram frames from character or phoneme input, then passes the predicted mel spectrogram through a WaveNet vocoder to generate the final audio waveform.",
      hints: [
        "Tacotron 2 is a two-stage system: spectrogram synthesis then waveform synthesis.",
        "The mel spectrogram is an intermediate representation—which separately trained model converts it to audio?",
      ],
    },
    {
      id: "q-aud-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Tacotron uses location-sensitive attention to prevent common failure modes such as attention jumping backward or skipping words during synthesis.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Location-sensitive attention incorporates the previous attention distribution as a convolutional feature, encouraging monotonically advancing alignment and reducing failure modes like repeated phonemes or skipped words common in content-based attention.",
      hints: [
        "Standard attention can focus anywhere—why is monotonic, left-to-right attention preferable for TTS?",
        'Location-based features encode "where attention was previously" to bias toward moving forward in the input sequence.',
      ],
    },
    {
      id: "q-aud-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: 'The "stop token" in Tacotron 2 is trained to predict:',
      options: [
        "The probability that the current mel frame contains a silent segment",
        "The probability that the current decoding step is the last frame of the spectrogram, signalling end of synthesis",
        "The confidence score of the attention alignment at each decoder step",
        "The probability of a breath or pause in the synthesised speech",
      ],
      correctAnswer: 1,
      explanation:
        "Tacotron 2 trains a binary stop token classifier at each decoder step that predicts whether synthesis should terminate; this replaces fixed-length output, enabling variable-length synthesis without prior knowledge of utterance duration.",
      hints: [
        "The decoder generates frames until something tells it to stop—without a stop token, how would you know when to end?",
        "The stop token is trained on the final frame position label from the training data.",
      ],
    },
  ],

  // ── aud-kp-7: Neural Vocoders: WaveNet, WaveGlow, HiFi-GAN ───────────────
  vocoders: [
    {
      id: "q-aud-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "WaveNet generates audio by:",
      options: [
        "Transforming a mel spectrogram using Griffin-Lim phase reconstruction",
        "Autoregressively predicting each audio sample conditioned on all previous samples and optional conditioning features",
        "Applying an inverse short-time Fourier transform to a predicted complex spectrogram",
        "Sampling from a uniform distribution and reshaping with a normalising flow",
      ],
      correctAnswer: 1,
      explanation:
        "WaveNet is an autoregressive model using dilated causal convolutions to model P(x_t | x_{<t}, c), where c is optional conditioning (e.g., mel spectrogram); it achieves high quality but is slow to generate because each sample depends on all prior samples.",
      hints: [
        "Autoregressive means each output depends on previous outputs—why does this make generation slow?",
        "Dilated convolutions expand the receptive field exponentially without proportionally increasing parameters.",
      ],
    },
    {
      id: "q-aud-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "HiFi-GAN achieves faster-than-real-time audio synthesis by using a generator with multi-receptive field fusion and discriminators that operate at multiple resolutions and periods.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "HiFi-GAN\'s generator uses multi-receptive field fusion (parallel dilated convolutions with different kernel sizes) for high-quality mel inversion; its multi-period and multi-scale discriminators enforce both fine-grained and macro-level waveform quality, enabling high-fidelity synthesis at high speed.",
      hints: [
        "GAN-based vocoders generate all samples in a single forward pass, unlike autoregressive models—how does this affect speed?",
        "Multiple discriminator periods (2, 3, 5, 7, 11) ensure the generator cannot exploit blind spots in any single discriminator.",
      ],
    },
    {
      id: "q-aud-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "WaveGlow uses a normalising flow architecture for vocoding. During inference, the flow is:",
      options: [
        "Run forward (audio → latent noise) to encode a reference utterance for speaker adaptation",
        "Run in reverse (latent noise → audio) conditioned on the mel spectrogram to generate a waveform in a single pass",
        "Applied iteratively using the same forward direction until convergence",
        "Used only for training; inference falls back to Griffin-Lim phase reconstruction",
      ],
      correctAnswer: 1,
      explanation:
        "Normalising flows are bijective; training maps audio to a simple noise distribution (forward pass), while inference samples noise and runs the inverse transform conditioned on the mel spectrogram, generating audio in a single non-autoregressive pass.",
      hints: [
        "Flows learn an invertible mapping between the data distribution and a simple prior—which direction is used for generation?",
        "Because the flow is non-autoregressive, all audio samples are generated simultaneously, enabling fast inference.",
      ],
    },
  ],

  // ── aud-kp-8: FastSpeech and Non-Autoregressive TTS ──────────────────────
  fastspeech: [
    {
      id: "q-aud-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "FastSpeech 2 eliminates the need for a teacher model (unlike FastSpeech 1) by:",
      options: [
        "Using a pre-trained BERT model to initialise the encoder",
        "Extracting duration, pitch, and energy directly from the training data using a Montreal Forced Aligner and signal processing",
        "Training on 10x more data than FastSpeech 1 to compensate for the lack of knowledge distillation",
        "Replacing the transformer encoder with a conformer block that captures local acoustic patterns",
      ],
      correctAnswer: 1,
      explanation:
        "FastSpeech 1 required a Tacotron teacher to extract phone durations via attention; FastSpeech 2 uses an MFA-derived duration aligner and extracts fundamental frequency (F0) and energy from ground-truth audio directly, removing the teacher dependency.",
      hints: [
        "FastSpeech 1's attention-extracted durations were noisy because they came from a teacher\'s soft attention.",
        "Montreal Forced Aligner provides forced-alignment durations directly from audio-text pairs.",
      ],
    },
    {
      id: "q-aud-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Non-autoregressive TTS models like FastSpeech generate mel spectrogram frames in parallel, making synthesis much faster than autoregressive models at the cost of some naturalness.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "FastSpeech predicts all mel frames simultaneously (after length regulation to match predicted phoneme durations), enabling GPU-parallel inference that is orders of magnitude faster than autoregressive decoding, with marginal quality loss on most benchmarks.",
      hints: [
        "Autoregressive models generate one frame at a time sequentially—how does parallel generation change wall-clock inference time?",
        "The quality trade-off exists because non-autoregressive models lose fine-grained sequential dependencies.",
      ],
    },
    {
      id: "q-aud-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The length regulator in FastSpeech maps phoneme-level encoder outputs to frame-level decoder inputs by:",
      options: [
        "Applying a learned linear projection that changes the temporal resolution",
        "Repeating each phoneme encoder output according to the predicted phoneme duration in frames",
        "Using cross-attention between phoneme encodings and a fixed temporal grid",
        "Inserting learnable positional embeddings between phoneme boundaries",
      ],
      correctAnswer: 1,
      explanation:
        "The length regulator duplicates each phoneme\'s encoder representation by its predicted (or ground-truth) duration in frames, expanding the phoneme-length sequence into a frame-length sequence that the decoder can use for parallel mel generation.",
      hints: [
        "The encoder has one vector per phoneme; the decoder needs one vector per output frame—how do you bridge this length mismatch?",
        "If phoneme /a/ lasts 5 frames, its encoder output is simply replicated 5 times in the frame-level sequence.",
      ],
    },
  ],

  // ── aud-kp-9: Voice Cloning and Speaker Adaptation ───────────────────────
  "voice-cloning": [
    {
      id: "q-aud-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Few-shot voice cloning systems (e.g., SV2TTS) adapt a multi-speaker TTS model to a new speaker by:",
      options: [
        "Retraining all model weights from scratch on 10–30 seconds of target speaker audio",
        "Computing a speaker embedding from a short target-speaker reference clip and conditioning the TTS model on it",
        "Replacing the vocoder with a speaker-specific unit trained on 24 hours of data",
        "Applying a post-processing equalizer to match the target speaker\'s formant frequencies",
      ],
      correctAnswer: 1,
      explanation:
        "Few-shot cloning encodes the target speaker\'s voice characteristics into a fixed-dimensional embedding using a pretrained speaker encoder, then conditions the mel spectrogram synthesiser on this embedding—no fine-tuning of the TTS model is required.",
      hints: [
        'If you needed to retrain the whole model, "few-shot" would be impractical—what is the fast alternative?',
        "A speaker encoder maps raw audio to a point in speaker space that captures voice identity.",
      ],
    },
    {
      id: "q-aud-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Speaker adaptation via fine-tuning on target speaker data (many-shot cloning) generally produces higher similarity to the target voice than zero-shot embedding-based approaches, at the cost of requiring more data and computation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Fine-tuning updates model weights specifically for the target speaker, capturing fine-grained prosodic and acoustic idiosyncrasies that a fixed embedding cannot fully encode; however, it requires minutes-to-hours of training data and GPU time per new speaker.",
      hints: [
        "A fixed embedding vector has limited capacity compared to updating millions of model parameters.",
        "Zero-shot approaches are faster to deploy but compress speaker identity into a single vector.",
      ],
    },
    {
      id: "q-aud-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Natural language processing of the input text in voice cloning systems is important because:",
      options: [
        'Homographs (e.g., "read" as present vs. past tense) require contextual disambiguation for correct pronunciation',
        "TTS models encode text directly as Unicode code points without any text normalisation",
        "Language model scores are used to re-rank synthesised audio during generation",
        "Phoneme lookup dictionaries are not needed when transformer encoders are used",
      ],
      correctAnswer: 0,
      explanation:
        'Correct pronunciation depends on part-of-speech context: "read" (reed) vs "read" (red), "lead" (leed) vs "lead" (led); text analysis (tokenisation, POS tagging, grapheme-to-phoneme conversion) ensures correct pronunciation in synthesised speech.',
      hints: [
        "A voice cloning system that mispronounces context-dependent words sounds unnatural regardless of voice quality.",
        "G2P (grapheme-to-phoneme) conversion is the standard step that maps written words to phoneme sequences.",
      ],
    },
  ],

  // ── aud-kp-10: Zero-Shot TTS and VALL-E ───────────────────────────────────
  "zero-shot-tts": [
    {
      id: "q-aud-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "VALL-E (Microsoft) models TTS as a language modelling problem by:",
      options: [
        "Directly predicting mel spectrogram frames using a standard autoregressive transformer",
        "Predicting discrete audio codec tokens (from EnCodec) autoregressively, conditioned on text and a 3-second speaker prompt",
        "Using a diffusion model to iteratively refine a noisy mel spectrogram into clean speech",
        "Applying BERT-style masked prediction to audio tokens to recover the full utterance",
      ],
      correctAnswer: 1,
      explanation:
        "VALL-E frames TTS as in-context learning: it tokenises audio with EnCodec into discrete codes, then trains an autoregressive language model to predict these codes conditioned on text tokens and a short speaker prompt, enabling zero-shot speaker generalisation.",
      hints: [
        "The key insight is that discrete audio tokens behave like text tokens—what well-established architecture handles sequences of discrete tokens?",
        'The 3-second prompt provides the voice "context" analogous to a few-shot example in a language model.',
      ],
    },
    {
      id: "q-aud-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Zero-shot TTS systems can theoretically synthesise any speaker\'s voice from a short reference clip without any speaker-specific training, but they typically produce lower speaker similarity than fine-tuned systems.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Zero-shot systems generalise across speakers seen during large-scale training but cannot fully capture every nuance of an unseen speaker\'s voice from a 3–10 second clip; fine-tuned systems that update weights for a specific speaker achieve higher similarity at the cost of per-speaker training.",
      hints: [
        "A short reference clip constrains how much speaker information can be extracted.",
        "Fine-tuning provides a much richer adaptation signal than a single forward-pass encoding of the reference.",
      ],
    },
    {
      id: "q-aud-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The hierarchical codec language modelling in VALL-E uses two stages because:",
      options: [
        "The first stage generates coarse (low-bitrate) audio codec codes; the second stage refines them with fine-grained (high-bitrate) residual codes for full fidelity",
        "The first stage predicts phoneme durations; the second stage predicts mel spectrograms",
        "The two stages correspond to speaker identity and linguistic content modelled separately",
        "The first stage uses a causal transformer; the second stage uses bidirectional attention for better context",
      ],
      correctAnswer: 0,
      explanation:
        "EnCodec uses residual vector quantisation with multiple codebook layers; VALL-E predicts the first (coarsest) codebook tokens autoregressively for speaker and prosody, then uses a non-autoregressive model to fill in the remaining residual codebooks that add acoustic detail.",
      hints: [
        "Residual VQ encodes audio at progressively finer detail in successive codebooks—which level captures the most speaker-relevant structure?",
        "The first codebook captures the broadest acoustic properties; later codebooks refine acoustic quality.",
      ],
    },
  ],

  // ── aud-kp-11: wav2vec 2.0 and Self-Supervised Speech Representations ─────
  wav2vec: [
    {
      id: "q-aud-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "wav2vec 2.0 learns speech representations by:",
      options: [
        "Training on paired audio-transcript data using CTC loss from the start",
        "Masking portions of latent speech representations and training the model to identify the correct quantised representation among distractors via contrastive loss",
        "Predicting the next audio frame from all previous frames using autoregressive decoding",
        "Using knowledge distillation from a supervised ASR model to transfer representations",
      ],
      correctAnswer: 1,
      explanation:
        "wav2vec 2.0 is self-supervised: it quantises raw audio with a codebook, masks spans of the latent representations, and trains the transformer to identify the correct quantised target among a set of negative distractors via a contrastive objective—no transcripts are needed.",
      hints: [
        "Self-supervised learning creates its own supervision signal from the data—where does wav2vec 2.0 get its labels?",
        "The contrastive objective forces the model to distinguish correct masked representations from random distractors.",
      ],
    },
    {
      id: "q-aud-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "After self-supervised pre-training, wav2vec 2.0 can be fine-tuned for ASR with as little as 10 minutes of labelled speech data and still achieve competitive word error rates.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The rich representations learned during self-supervised pre-training on unlabelled audio encode phonetic structure; subsequent fine-tuning with CTC loss on very small labelled sets (10 min, 1 hour) achieves WERs competitive with supervised models trained on hundreds of hours.",
      hints: [
        "Pre-training on 960 hours of LibriSpeech unlabelled audio gives the model a head start—how little supervision is then needed?",
        "This is the key practical value of self-supervised learning: reducing the labelled data requirement.",
      ],
    },
    {
      id: "q-aud-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The quantisation module in wav2vec 2.0 converts continuous latent representations to discrete codes using:",
      options: [
        "k-means clustering applied offline before training begins",
        "Gumbel-softmax to enable differentiable selection of entries from multiple codebooks (product quantisation)",
        "Hard VQ with straight-through gradient estimation and a single codebook",
        "Principal components rounded to the nearest integer value",
      ],
      correctAnswer: 1,
      explanation:
        "wav2vec 2.0 uses product quantisation (PQ) with Gumbel-softmax. The latent vector \\[z\\] is split into G groups, each with a codebook of V entries. During training, the Gumbel-softmax selection:\n\\[\\hat{c}_g = \\text{one-hot}\\left(\\arg\\max_i\\left[\\frac{z_g \\cdot e_i}{\\tau} + g_i\\right]\\right)\\]\nwhere \\[g_i \\sim \\text{Gumbel}(0,1)\\] and \\[\\tau\\] is temperature, provides a differentiable approximation to argmax (\\[\\tau \\to 0\\] makes it nearly one-hot). This allows end-to-end gradient flow through the discrete bottleneck. PQ with G groups yields an effective codebook of size V^G, enabling high-dimensional quantisation without storing a single large codebook.",
      hints: [
        "Hard argmax is not differentiable—what technique provides a differentiable approximation to discrete one-hot selection?",
        "Product quantisation: if each of G groups has V entries, the total number of unique codes is V^G — exponentially larger than V with a single codebook.",
      ],
    },
  ],

  // ── aud-kp-12: HuBERT and Masked Prediction for Audio ────────────────────
  hubert: [
    {
      id: "q-aud-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "HuBERT (Hidden-Unit BERT) differs from wav2vec 2.0 in its self-supervised objective by:",
      options: [
        "Using a contrastive loss where positive and negative samples come from the same utterance",
        "Predicting offline cluster assignments (pseudo-labels from k-means) for masked frames rather than using contrastive learning",
        "Training on phoneme sequence labels extracted from a forced aligner",
        "Applying a reconstruction loss that minimises MSE between predicted and original spectrogram features",
      ],
      correctAnswer: 1,
      explanation:
        "HuBERT uses a BERT-style masked prediction objective: offline k-means clusters are computed on MFCC features (or previous HuBERT representations), and the transformer must predict these cluster assignments for masked time steps—a classification loss rather than contrastive.",
      hints: [
        "BERT predicts masked tokens using a cross-entropy loss—HuBERT\'s audio analogue is predicting masked ___.",
        'The cluster labels are "pseudo-labels" because they are not human-annotated but computed automatically.',
      ],
    },
    {
      id: "q-aud-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "HuBERT training is iterative: in the first iteration, k-means clusters are computed on MFCCs; in subsequent iterations, clusters are recomputed on the representations of the previously trained HuBERT model.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Iterative refinement improves the pseudo-label quality: MFCC-based clusters are phonetically coarse, while clusters from a trained HuBERT capture richer linguistic structure; retraining on better pseudo-labels bootstraps progressively more informative representations.",
      hints: [
        "Better teacher labels lead to a better student model—how does HuBERT improve its own teacher?",
        "This is analogous to self-training in semi-supervised learning, where the model iteratively improves its own pseudo-labels.",
      ],
    },
    {
      id: "q-aud-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The masked prediction loss in HuBERT is computed only on masked frames (not all frames) because:",
      options: [
        "Computing loss on all frames causes gradient exploding in the transformer encoder",
        "Predicting unmasked frames is trivial (the input is visible), so the model would learn to copy rather than understand context",
        "Unmasked frames have zero gradient by definition of the cross-entropy loss",
        "The cluster assignments for unmasked frames are always incorrect due to codebook collapse",
      ],
      correctAnswer: 1,
      explanation:
        "If loss were computed on all frames, the model could trivially predict the cluster label of an unmasked frame by encoding its features directly without understanding context; masking forces the model to use surrounding context to infer the hidden representation.",
      hints: [
        "BERT masks input tokens—what would happen if BERT also had to predict the tokens it can see?",
        "Learning from context (the surrounding frames) is the point; predicting what you can see is not a learning challenge.",
      ],
    },
  ],

  // ── aud-kp-13: Audio Spectrogram Transformer (AST) ───────────────────────
  "audio-spectrogram-transformer": [
    {
      id: "q-aud-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Audio Spectrogram Transformer (AST) adapts the Vision Transformer (ViT) for audio by treating:",
      options: [
        "Raw audio waveform samples as 1D token sequences fed into a standard transformer",
        "A mel spectrogram as a 2D image, splitting it into patches that are linearly embedded as transformer input tokens",
        "MFCC coefficient sequences as word tokens in a BERT-style architecture",
        "Audio events as graph nodes connected by temporal edges in a graph transformer",
      ],
      correctAnswer: 1,
      explanation:
        "AST views the mel spectrogram as a 2D time-frequency image, splits it into fixed-size overlapping patches (analogous to image patches in ViT), and processes them with a standard transformer encoder pre-trained on ImageNet via transfer learning.",
      hints: [
        "ViT splits images into patches—AST applies the same idea to spectrograms as 2D images.",
        "Time and frequency are the two axes of a spectrogram, analogous to the spatial axes of an image.",
      ],
    },
    {
      id: "q-aud-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AST can leverage ImageNet pre-trained ViT weights for audio classification by adapting the positional embeddings to the spectrogram patch grid via interpolation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AST transfers ViT weights pre-trained on ImageNet; since the patch grid shape may differ between images and spectrograms, positional embeddings are bilinearly interpolated to match the new 2D grid, enabling cross-modal transfer learning from vision to audio.",
      hints: [
        "Low-level visual features (edges, textures) learned on images may transfer to time-frequency patterns in spectrograms.",
        "Interpolating positional embeddings adapts the learned spatial structure to the new patch layout.",
      ],
    },
    {
      id: "q-aud-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Compared to CNN-based audio classifiers, the main advantage of the attention mechanism in AST is:",
      options: [
        "Faster inference speed due to parallelism in attention computation versus sequential convolution",
        "The ability to model long-range time-frequency dependencies without the locality constraint of convolution",
        "Lower memory footprint because attention requires fewer parameters than deep CNN stacks",
        "Automatic invariance to frequency transpositions in musical instrument classification",
      ],
      correctAnswer: 1,
      explanation:
        "Convolutional layers have a fixed local receptive field; attention allows every patch to directly attend to every other patch, capturing global time-frequency relationships (e.g., harmonic overtones spread across frequency) that CNNs model only after many layers.",
      hints: [
        "A CNN\'s receptive field grows with depth—how many layers are needed to model global dependencies?",
        'Attention is "all-pairs"—every input position can directly influence every output position in one layer.',
      ],
    },
  ],

  // ── aud-kp-14: Contrastive Learning for Audio (CLAP) ─────────────────────
  "contrastive-audio": [
    {
      id: "q-aud-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "CLAP (Contrastive Language-Audio Pretraining) is analogous to CLIP but for audio. It trains by:",
      options: [
        "Predicting masked audio tokens from surrounding text tokens in a cross-modal transformer",
        "Maximising cosine similarity between matched audio-text pairs and minimising it for mismatched pairs in a shared embedding space",
        "Using audio captions as pseudo-labels to fine-tune a pre-trained audio spectrogram transformer",
        "Generating audio from text descriptions using a diffusion model and comparing outputs",
      ],
      correctAnswer: 1,
      explanation:
        "CLAP trains an audio encoder and a text encoder jointly using InfoNCE contrastive loss: paired audio-text descriptions are pulled together in embedding space while unpaired combinations are pushed apart, enabling zero-shot audio classification via text queries.",
      hints: [
        "CLIP does the same for image-text pairs—CLAP is the audio-text equivalent.",
        "After training, you can classify audio by comparing its embedding to embeddings of category descriptions.",
      ],
    },
    {
      id: "q-aud-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A CLAP-trained model can perform zero-shot audio classification by comparing the audio embedding to text embeddings of class descriptions, selecting the class with highest cosine similarity.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        'Because CLAP aligns audio and text in a shared semantic space, a query like "sound of a dog barking" can be encoded as text and compared to audio embeddings, enabling classification without any audio examples for those classes—just text descriptions.',
      hints: [
        "If audio and text are in the same space, finding which text label matches the audio is a nearest-neighbour search.",
        "This is the same mechanism that makes CLIP work for zero-shot image classification.",
      ],
    },
    {
      id: "q-aud-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The InfoNCE loss used in contrastive audio-text training is defined over a mini-batch such that:",
      options: [
        "The loss sums binary cross-entropy over all positive pairs in the dataset",
        "For each anchor, the loss is the cross-entropy of a softmax over the anchor\'s similarity to its positive and all in-batch negatives, encouraging the positive to have the highest similarity",
        "The loss minimises the Wasserstein distance between audio and text embedding distributions",
        "The loss maximises mutual information between audio and text using a density-ratio estimator",
      ],
      correctAnswer: 1,
      explanation:
        'InfoNCE treats each sample in the batch as a "query": it forms a softmax distribution over similarities to all other samples and maximises the probability assigned to the true positive, which is equivalent to maximising a lower bound on mutual information.',
      hints: [
        "Think of InfoNCE as an N-way classification problem per sample: which of the N audio clips matches this text?",
        "Larger batch sizes provide more negatives, making the contrastive task harder and representations richer.",
      ],
    },
  ],

  // ── aud-kp-15: Audio Tokenization: EnCodec and SoundStream ───────────────
  "audio-tokenization": [
    {
      id: "q-aud-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "EnCodec (Meta) and SoundStream (Google) are neural audio codecs that compress audio by:",
      options: [
        "Applying MP3-style psychoacoustic masking to remove perceptually irrelevant frequency components",
        "Encoding audio through a convolutional encoder, then quantising latent representations with residual vector quantisation (RVQ), and decoding with a convolutional decoder",
        "Predicting future audio frames with a transformer and storing only the prediction errors",
        "Using discrete cosine transform coefficients rounded to 8-bit integers for efficient storage",
      ],
      correctAnswer: 1,
      explanation:
        "Both EnCodec and SoundStream use a 1D CNN encoder-decoder with residual VQ (RVQ) in the latent space; RVQ applies multiple VQ layers sequentially, each quantising the residual from the previous, enabling high-quality reconstruction at low bitrates.",
      hints: [
        "Traditional codecs use hand-crafted signal processing; neural codecs learn the compression end-to-end.",
        "Residual VQ means each codebook layer encodes the error not captured by previous layers.",
      ],
    },
    {
      id: "q-aud-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Residual Vector Quantisation (RVQ) in audio codecs uses multiple codebooks sequentially, where each codebook quantises the residual error left by the previous codebook.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "RVQ applies the first codebook to the raw latent, computes the quantisation residual, applies a second codebook to that residual, and so on; more codebook layers mean lower reconstruction error and higher bitrate (since more code indices must be transmitted).",
      hints: [
        "After the first VQ step, there is still an error signal—what does the next codebook encode?",
        "Adding more RVQ layers increases the codebook depth, allowing finer-grained reconstruction.",
      ],
    },
    {
      id: "q-aud-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "EnCodec trains its RVQ-based codec end-to-end with a combination of losses. Which loss component ensures perceptual quality beyond simple reconstruction?",
      options: [
        "CTC loss computed between encoded tokens and phone-level transcriptions",
        "Multi-scale spectrogram reconstruction loss combined with an adversarial discriminator loss on the waveform and spectrogram",
        "KL divergence between the quantised latent distribution and a Gaussian prior",
        "Contrastive loss encouraging embeddings of similar audio segments to be close in latent space",
      ],
      correctAnswer: 1,
      explanation:
        "EnCodec combines a multi-scale mel spectrogram reconstruction loss (for spectral fidelity) with adversarial training using multi-scale and multi-period waveform discriminators (similar to HiFi-GAN), ensuring perceptual quality that pure MSE losses cannot achieve.",
      hints: [
        "Pixel-wise (sample-wise) MSE loss is known to produce blurry/muffled outputs—what kind of loss enforces perceptual sharpness?",
        "Adversarial discriminators push the decoder to produce samples indistinguishable from real audio.",
      ],
    },
  ],

  // ── aud-kp-16: X-Vectors and Speaker Embeddings ──────────────────────────
  "x-vectors": [
    {
      id: "q-aud-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "X-vectors are speaker embeddings extracted by:",
      options: [
        "Computing the mean MFCC vector over a speaker\'s entire utterance",
        "Passing variable-length utterance features through a TDNN with a statistics pooling layer, then extracting the activation at a narrow bottleneck trained for speaker classification",
        "Applying PCA to the GMM supervector from a Universal Background Model",
        "Averaging the hidden states of a transformer trained on ASR tasks over all frames",
      ],
      correctAnswer: 1,
      explanation:
        "X-vector extraction uses a Time Delay Neural Network (TDNN) with a statistical pooling layer that aggregates frame-level statistics (mean and standard deviation) into a fixed-size segment-level representation, trained with a speaker classification objective.",
      hints: [
        "The TDNN processes sequences of frames; statistical pooling collapses the variable-length sequence to a fixed-length summary.",
        'The embedding is extracted from a specific layer (the "embedding" or "bottleneck" layer) after training.',
      ],
    },
    {
      id: "q-aud-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'I-vectors (ivectors) preceded x-vectors and represent a speaker\'s utterance as a single point in a low-dimensional "total variability space" estimated from a Universal Background Model and a factor analysis model.',
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "I-vectors compress the speaker-plus-channel variability captured by a GMM-UBM into a low-rank factor analysis subspace (total variability space); x-vectors replaced them by using discriminative neural network training instead of generative factor analysis.",
      hints: [
        "I-vectors are generative (GMM-based); x-vectors are discriminative (NN-based)—which framework tends to perform better in modern practice?",
        "Total variability space captures both speaker and channel effects in a single low-dimensional vector.",
      ],
    },
    {
      id: "q-aud-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Statistical pooling in x-vector extraction computes which statistics over frame-level TDNN outputs before the segment-level layers?",
      options: [
        "Maximum and minimum activation values across all frames",
        "Mean and standard deviation of activations across frames, concatenated to form a single fixed-length vector",
        "Weighted sum of frame activations using attention weights learned during training",
        "First and second moments normalised by the number of frames times a trainable temperature parameter",
      ],
      correctAnswer: 1,
      explanation:
        "Statistical pooling concatenates the temporal mean and standard deviation of the TDNN frame-level outputs, providing a simple but effective fixed-length summary that encodes both average and variability of speaker characteristics across the utterance.",
      hints: [
        "The pooling must collapse variable-length sequences (different utterance durations) to a fixed-length vector.",
        "Mean captures the average vocal tract properties; standard deviation captures speaking rate and prosodic variability.",
      ],
    },
  ],

  // ── aud-kp-17: Speaker Verification with PLDA and Cosine Scoring ──────────
  "speaker-verification": [
    {
      id: "q-aud-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Speaker verification is the task of:",
      options: [
        "Identifying the name of an unknown speaker from a large database of enrolled speakers",
        "Deciding whether an utterance was spoken by a claimed target speaker (yes/no decision)",
        "Transcribing the words spoken by a specific speaker in a recording",
        "Counting the number of distinct speakers in an audio recording",
      ],
      correctAnswer: 1,
      explanation:
        "Verification is a binary authentication task: given a claimed identity and a test utterance, decide whether the utterance is genuine (from the claimed speaker) or an impostor, typically by thresholding a similarity score.",
      hints: [
        "Contrast with speaker identification, which is a multi-class problem—verification is a binary decision.",
        "Think of it like password authentication: you claim an identity and the system verifies the claim.",
      ],
    },
    {
      id: "q-aud-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PLDA (Probabilistic Linear Discriminant Analysis) is used in speaker verification to model within-speaker and between-speaker variability in the x-vector space, producing a well-calibrated log-likelihood ratio score.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "PLDA models the x-vector distribution as a linear Gaussian model with speaker and channel factors; the PLDA score is the log-likelihood ratio of the hypothesis 'same speaker' vs 'different speaker,' providing better-calibrated decisions than raw cosine similarity.",
      hints: [
        "Cosine similarity ignores the Gaussian structure of the x-vector space—PLDA explicitly models this structure.",
        "A log-likelihood ratio directly answers the hypothesis testing question at the heart of verification.",
      ],
    },
    {
      id: "q-aud-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Equal Error Rate (EER) in speaker verification is the operating point where:",
      options: [
        "The system accepts all genuine speakers and rejects all impostors perfectly",
        "The False Acceptance Rate (FAR) equals the False Rejection Rate (FRR)",
        "The F1 score of genuine and impostor classification is maximised",
        "The decision threshold equals the prior probability of being a genuine speaker",
      ],
      correctAnswer: 1,
      explanation:
        "EER is a threshold-independent summary metric where FAR (fraction of impostors incorrectly accepted) equals FRR (fraction of genuine speakers incorrectly rejected); lower EER indicates better discriminative performance.",
      hints: [
        "FAR and FRR trade off as the threshold changes—EER is the crossover point where they balance.",
        "EER summarises the ROC curve at a specific operating point where the error types are symmetric.",
      ],
    },
  ],

  // ── aud-kp-18: Speaker Diarization: Clustering and End-to-End ─────────────
  diarization: [
    {
      id: "q-aud-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Speaker diarization answers the question:",
      options: [
        '"What words were spoken in this recording?"',
        '"Who spoke when?" — segmenting the audio and attributing each segment to a speaker',
        '"How many words per minute did each speaker speak?"',
        '"Is this speaker the same as the one in my enrolled database?"',
      ],
      correctAnswer: 1,
      explanation:
        'Diarization partitions an audio recording into homogeneous segments attributed to individual speakers, answering "who spoke when" without necessarily identifying the speakers by name.',
      hints: [
        "Diarization does not transcribe words; it segments and labels speakers.",
        "The output is a timeline of speaker labels, not a transcription or identity verification.",
      ],
    },
    {
      id: "q-aud-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Traditional modular diarization pipelines first segment speech into speaker-homogeneous regions, extract speaker embeddings per segment, then apply spectral clustering to assign speaker labels.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The classical pipeline consists of: Voice Activity Detection → speaker change detection or fixed-length segmentation → x-vector/d-vector extraction → agglomerative hierarchical or spectral clustering → (optional) re-segmentation with HMM.",
      hints: [
        "The pipeline is modular—each step uses separate models and the outputs are passed sequentially.",
        "Clustering assigns speaker labels without knowing the number of speakers in advance (for some methods).",
      ],
    },
    {
      id: "q-aud-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "End-to-end neural diarization (EEND) models, unlike clustering-based systems, can handle overlapping speech because:",
      options: [
        "They apply a CTC loss that marginalises over all possible speaker orderings",
        "They produce per-frame posterior probabilities for each speaker simultaneously rather than assigning each frame to exactly one speaker",
        "They use a separate speaker activity detector trained on artificially mixed overlapping speech",
        "They first perform source separation and then run independent single-speaker ASR on each channel",
      ],
      correctAnswer: 1,
      explanation:
        "EEND models output simultaneous per-speaker activity probabilities for each frame using a multi-label binary classification objective, allowing multiple speakers to be active at the same time—which clustering-based approaches cannot represent since they assign each segment to a single cluster.",
      hints: [
        "Clustering assigns one speaker per segment—what happens when two people speak simultaneously?",
        'Multi-label output means the model can predict "speaker A AND speaker B are active" at the same frame.',
      ],
    },
  ],

  // ── aud-kp-19: Anti-Spoofing and Deepfake Audio Detection ────────────────
  "anti-spoofing": [
    {
      id: "q-aud-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the ASVspoof challenge, the primary threat models evaluated are:",
      options: [
        "Channel noise and reverberation degrading genuine speech",
        "Text-to-speech synthesis, voice conversion, and replay attacks used to spoof a speaker verification system",
        "Adversarial perturbations added to the waveform to fool the ASR transcription",
        "Bandwidth limitations causing codec artefacts that mimic different speakers",
      ],
      correctAnswer: 1,
      explanation:
        "ASVspoof evaluates spoofing attacks on automatic speaker verification: TTS and voice conversion generate fake speech matching a target speaker\'s voice, while replay attacks play back a genuine recording through a loudspeaker into the microphone—all aimed at fooling the biometric system.",
      hints: [
        "Spoofing in biometrics means presenting a fake but plausible biometric trait to be accepted as genuine.",
        'TTS and voice conversion are "logical access" attacks; replay is a "physical access" attack in the ASVspoof taxonomy.',
      ],
    },
    {
      id: "q-aud-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LFCC (Linear Frequency Cepstral Coefficients) features are often more effective than MFCCs for anti-spoofing because TTS artefacts are more distinctive on a linear frequency scale.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "TTS and voice conversion systems often leave artefacts in high-frequency regions that the mel scale compresses; LFCC treats all frequency bands equally, preserving high-frequency artefact information that helps distinguish synthesised from genuine speech.",
      hints: [
        "The mel scale emphasises low frequencies—what happens to high-frequency TTS artefacts in MFCCs?",
        "Anti-spoofing is a different task from ASR—different frequency regions may carry the most discriminative information.",
      ],
    },
    {
      id: "q-aud-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Generalisation to unseen spoofing attacks (unknown TTS systems) is a major challenge in anti-spoofing. Which training strategy most directly addresses this?",
      options: [
        "Training on as many known TTS systems as possible and relying on interpolation",
        "Using self-supervised pre-trained speech representations (e.g., wav2vec 2.0) that capture general acoustic properties, combined with data augmentation with diverse codec distortions",
        "Training exclusively on replay attacks to develop robust microphone-agnostic features",
        "Applying class-conditional normalising flows to model the known spoof distribution",
      ],
      correctAnswer: 1,
      explanation:
        "Self-supervised representations encode rich general acoustic features not biased toward specific known spoof systems; combined with augmentations that simulate codec/channel distortions, this approach generalises better to unseen attack types encountered in real deployments.",
      hints: [
        "Models trained to detect specific TTS systems tend to fail on new TTS systems not seen during training—what features generalise?",
        "Self-supervised pre-training captures phonetic structure and acoustic patterns from diverse data, not specific artefacts of one TTS system.",
      ],
    },
  ],

  // ── aud-kp-20: Speaker Adaptation and Personalization ────────────────────
  "speaker-adaptation": [
    {
      id: "q-aud-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Speaker-adaptive training (SAT) in ASR improves robustness by:",
      options: [
        "Training a separate ASR model for each speaker in the corpus",
        "Training a single model with speaker-specific feature transformations (e.g., fMLLR) so the model learns to adapt to speaker-normalised features",
        "Augmenting training data with simulated speaker changes every 10 seconds",
        "Applying a post-processing equalizer to match the target speaker\'s formant frequencies",
      ],
      correctAnswer: 1,
      explanation:
        "SAT trains the acoustic model jointly with per-speaker linear feature transforms (e.g., fMLLR); at test time, speaker-adapted features are computed from a small amount of audio, normalising speaker variability and improving recognition accuracy.",
      hints: [
        "Training a model on raw heterogeneous speaker data without any normalisation leaves speaker variability in the features.",
        "The linear transforms in SAT bring different speakers' features closer together in acoustic space.",
      ],
    },
    {
      id: "q-aud-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Low-Rank Adaptation (LoRA) can be used for speaker-specific fine-tuning of a large speech model, updating only a small fraction of parameters via low-rank weight matrices for efficiency.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "LoRA inserts trainable low-rank decomposition matrices alongside frozen pre-trained weights; for speaker adaptation, only these small matrices are updated on speaker-specific data, dramatically reducing storage and compute compared to full fine-tuning.",
      hints: [
        "Full fine-tuning stores a separate copy of all model weights per speaker—LoRA stores only the small low-rank matrices.",
        "Low-rank updates assume that task/speaker adaptation requires moving within a low-dimensional subspace of weight space.",
      ],
    },
    {
      id: "q-aud-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Test-time adaptation for personalised ASR (adapting a model at inference time without retraining) can be achieved by:",
      options: [
        "Fine-tuning all encoder layers using the test utterance as both input and pseudo-label",
        "Updating only batch normalisation statistics or prompt embeddings on a short enrolment segment, leaving other weights frozen",
        "Replacing the language model with a speaker-specific n-gram model built from the test utterance transcript",
        "Applying a speaker-identity-conditioned data augmentation to the test spectrogram before decoding",
      ],
      correctAnswer: 1,
      explanation:
        "Lightweight test-time adaptation methods update only minimal parameters (e.g., BN statistics, learned prompt tokens) on enrolment data, providing a personalised model without full retraining while preserving the pre-trained model\'s general capabilities.",
      hints: [
        "Updating all weights at test time is slow and risks catastrophic forgetting—which components can be updated cheaply?",
        "Learned prompts (prefix tokens) steer the model\'s behaviour without changing the underlying weight matrices.",
      ],
    },
  ],

  // ── aud-kp-21: Environmental Sound Classification and ESC-50 ─────────────
  "environmental-sound": [
    {
      id: "q-aud-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The ESC-50 dataset is a benchmark for environmental sound classification consisting of:",
      options: [
        "50 hours of continuously recorded urban soundscapes with dense annotations",
        "2,000 five-second audio clips across 50 semantic categories of environmental sounds",
        "50 speakers each recording 2,000 words in noisy environments",
        "50,000 audio clips of music genres labelled by crowd-sourced annotators",
      ],
      correctAnswer: 1,
      explanation:
        "ESC-50 contains 2,000 clips (5 seconds each) across 50 categories (animals, urban sounds, natural soundscapes, etc.), organised into 5 folds for cross-validation; it is a standard benchmark for non-speech audio classification.",
      hints: [
        'The "50" in ESC-50 refers to the number of distinct sound categories.',
        "Five-second clips are long enough to capture the characteristic texture of most environmental sounds.",
      ],
    },
    {
      id: "q-aud-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Random cropping and mixup augmentation are commonly applied to audio spectrograms during training to improve generalisation on environmental sound classification tasks.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Random time and frequency crops expose the model to partial views of sounds (robustness to start/end time variability); mixup linearly interpolates two spectrogram-label pairs, acting as a regulariser that smooths decision boundaries and reduces overfitting on small datasets like ESC-50.",
      hints: [
        "Environmental sounds often have variable onset times—how does random cropping help generalisation?",
        'Mixup creates "in-between" examples that the model must interpolate its predictions for, discouraging overconfident boundaries.',
      ],
    },
    {
      id: "q-aud-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does transfer learning from large-scale audio pre-training (e.g., on AudioSet) typically outperform training from scratch on ESC-50?",
      options: [
        "AudioSet uses the same 50 categories as ESC-50, providing direct label transfer",
        "Large-scale pre-training provides learned audio representations that capture general spectrotemporal patterns and sound textures transferable to new categories with little data",
        "AudioSet models are pre-trained without any classification head, making them more flexible for fine-tuning",
        "ESC-50 clip lengths exactly match AudioSet clip lengths, reducing the need for any architecture modification",
      ],
      correctAnswer: 1,
      explanation:
        "Pre-training on AudioSet\'s 527 categories and 2M+ clips learns rich spectral and temporal features (onset patterns, harmonic structures, texture) that generalise well; ESC-50's 2,000 clips are insufficient to learn these representations from scratch.",
      hints: [
        "Deep networks require large datasets to learn general, low-level audio features—ESC-50 alone cannot provide this.",
        "Transfer learning reuses features learned on a large dataset, requiring only the classification head to be adapted.",
      ],
    },
  ],

  // ── aud-kp-22: Audio Event Detection and Sound Source Localization ─────────
  "audio-event-detection": [
    {
      id: "q-aud-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Audio Event Detection (AED) differs from audio classification in that AED:",
      options: [
        "Works only with music recordings while classification handles environmental sounds",
        "Predictss just the presence of sound events but also their temporal boundaries (onset and offset times) within a recording",
        "Requires multi-channel microphone arrays instead of single-channel audio",
        "Uses only symbolic music notation rather than audio waveforms as input",
      ],
      correctAnswer: 1,
      explanation:
        "AED localises events in time (onset/offset detection) in addition to classifying them; this is a temporally precise task, unlike clip-level audio classification which only predicts which classes are present in a fixed-length clip.",
      hints: [
        'Classification answers "what sound is present?" AED answers "what sound is present and when?"',
        "Temporal localisation requires frame-level or segment-level predictions rather than a single clip-level label.",
      ],
    },
    {
      id: "q-aud-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Sound source localisation using a microphone array typically uses the Time Difference of Arrival (TDOA) between microphones to estimate the direction of a sound source.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "TDOA measures the delay with which a sound reaches different microphones; using the known geometry of the array, the TDOA values triangulate the direction of arrival (DOA) and, with multiple arrays, the 3D position of the source.",
      hints: [
        "Sound travels at a fixed speed (~343 m/s)—a small time delay between two microphones implies the sound came from one direction.",
        "The Generalized Cross-Correlation with Phase Transform (GCC-PHAT) is a standard TDOA estimator.",
      ],
    },
    {
      id: "q-aud-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the DCASE challenge for Sound Event Localisation and Detection (SELD), the SELDnet architecture jointly predicts:",
      options: [
        "The speaker identity and word count for each detected audio event",
        "Sound event class activity and the Direction of Arrival (DOA) simultaneously using a shared encoder and two prediction branches",
        "The source separation masks and the event class labels independently using two separate encoders",
        "The onset time only; offset times are inferred post-hoc by thresholding the activity score",
      ],
      correctAnswer: 1,
      explanation:
        "SELDnet uses a shared convolutional-recurrent encoder and two decoder branches: one predicts per-class activity (SED), the other predicts the 3D DOA vector for each active class (SSL); joint training encourages shared representations beneficial for both tasks.",
      hints: [
        "SELD combines two tasks—sound event detection (what and when) and sound source localisation (where).",
        "Joint prediction from a shared encoder enables the model to learn representations useful for both tasks simultaneously.",
      ],
    },
  ],

  // ── aud-kp-23: Music Genre, Mood, and Instrument Classification ───────────
  "music-classification": [
    {
      id: "q-aud-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Music genre classification using deep learning typically uses which input representation?",
      options: [
        "MIDI note sequences transcribed from the audio using an automatic piano transcription system",
        "Mel spectrograms or short-time Fourier transform magnitude spectrograms as 2D images fed into CNNs or transformers",
        "Raw symbolic chord progressions extracted via a chord recognition model",
        "One-hot encoded BPM (beats per minute) and key signature labels",
      ],
      correctAnswer: 1,
      explanation:
        "Mel or STFT magnitude spectrograms capture the harmonic, rhythmic, and timbral content of music in a 2D time-frequency representation amenable to image-based CNN architectures; they preserve the acoustic information needed to distinguish genres.",
      hints: [
        "Music genre information is encoded in timbral texture, rhythm, and harmony—which representation captures all of these?",
        "CNNs applied to spectrograms treat frequency as a spatial axis and can detect harmonic patterns as vertical structures.",
      ],
    },
    {
      id: "q-aud-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Music mood classification is more subjective than genre classification because mood labels depend on listener perception, cultural context, and emotional state, leading to higher inter-annotator disagreement.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        'Genre categories are relatively stable and consensus-driven, while mood labels (e.g., "happy", "melancholic") involve affective perception that varies across listeners; datasets like Valence-Arousal annotations reflect this through wider label distributions and lower inter-rater reliability.',
      hints: [
        'Two listeners may agree that a song is "pop" but disagree on whether it feels "joyful" or "nostalgic".',
        "The Russell circumplex model of affect (valence-arousal) is one framework for structuring mood annotations continuously.",
      ],
    },
    {
      id: "q-aud-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Instrument classification in real music recordings is more challenging than in isolated note datasets because:",
      options: [
        "Musical instruments have been extensively catalogued, so the classes are too easy to distinguish",
        "Polyphonic mixing, timbre interaction, and shared harmonic content between instruments make individual instrument identification from the mixture acoustically ambiguous",
        "Real recordings use higher sample rates that standard CNNs cannot process efficiently",
        "Copyright restrictions prevent training on commercial music recordings",
      ],
      correctAnswer: 1,
      explanation:
        "In a mixture, instruments share the harmonic series (e.g., violin and flute both have overtones at the same frequencies), masking and timbre interaction make individual timbres hard to isolate; polyphonic models must perform joint source-instrument identification.",
      hints: [
        "An isolated piano note has clear, unambiguous features; how does its spectrogram look when mixed with a cello?",
        "Instrument recognition in isolation achieves near-perfect accuracy; why does performance drop in polyphonic context?",
      ],
    },
  ],

  // ── aud-kp-24: Polyphonic Sound Event Detection (SED) ────────────────────
  "sed-polyphonic": [
    {
      id: "q-aud-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Polyphonic SED differs from monophonic SED in that it must:",
      options: [
        "Handle audio files longer than 60 seconds with memory-efficient processing",
        "Detect multiple sound events that can be simultaneously active at any given time frame",
        "Operate on multi-channel audio from microphone arrays rather than mono recordings",
        "Classify sounds at a word level rather than at a category level",
      ],
      correctAnswer: 1,
      explanation:
        "Polyphonic SED requires multi-label frame-level predictions, since multiple event classes (e.g., speech, music, dog bark) can overlap in time; monophonic SED assumes at most one active event per frame.",
      hints: [
        "In a cafeteria, speech and background music and cutlery sounds all occur simultaneously—how many labels per frame?",
        "Multi-label classification outputs a probability per class rather than a single argmax class.",
      ],
    },
    {
      id: "q-aud-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Mean Teacher training is used in semi-supervised SED to leverage large amounts of unlabelled audio, where a student model is trained to match the outputs of a slowly updated exponential moving average (EMA) teacher model.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Mean Teacher enforces consistency: the student is trained on labelled data with ground-truth loss and on unlabelled data by matching the teacher\'s (EMA-averaged student) predictions; the EMA teacher provides stable pseudo-labels, improving semi-supervised learning significantly.",
      hints: [
        "The EMA teacher is more stable than the rapidly updating student—why does this make it a better pseudo-label source?",
        "DCASE 2021+ challenges include a semi-supervised SED task where this approach is state-of-the-art.",
      ],
    },
    {
      id: "q-aud-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Intersection over Union (IoU) for temporal sound event detection is computed between:",
      options: [
        "The spectrogram patches predicted to contain events and the ground-truth spectrogram regions",
        "The predicted event time interval [onset_pred, offset_pred] and the ground-truth interval [onset_gt, offset_gt] for matched event instances",
        "The per-frame class probability vectors predicted by the model and the binary ground-truth label vectors",
        "The frequency range of the detected event and the frequency range of the annotated event class",
      ],
      correctAnswer: 1,
      explanation:
        "Temporal IoU measures the overlap between predicted and ground-truth time intervals: IoU = duration of intersection / duration of union; it is used to determine if a detected event instance is a true positive (IoU > threshold) in event-based evaluation metrics.",
      hints: [
        "IoU in object detection measures spatial overlap; temporal IoU applies the same concept along the time axis.",
        "A prediction that starts and ends at the right time has IoU = 1; a completely non-overlapping prediction has IoU = 0.",
      ],
    },
  ],

  // ── aud-kp-25: Automated Audio Captioning and AudioCaps ──────────────────
  "audio-captioning": [
    {
      id: "q-aud-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Automated Audio Captioning (AAC) is the task of:",
      options: [
        "Generating subtitles for speech content in an audio recording",
        "Producing a natural language sentence describing the content of a non-speech audio clip",
        "Translating audio captions from one language to another using a neural MT system",
        "Classifying audio clips into pre-defined textual categories from a fixed vocabulary",
      ],
      correctAnswer: 1,
      explanation:
        'AAC generates free-form natural language descriptions of audio scenes (e.g., "A dog is barking in the distance while birds chirp nearby"), going beyond classification labels to capture the richness of the audio scene.',
      hints: [
        "Unlike classification, captioning generates open-ended text rather than selecting from a fixed set of labels.",
        "AAC is the audio equivalent of image captioning (generating descriptions of what is seen/heard).",
      ],
    },
    {
      id: "q-aud-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AudioCaps is the largest AAC dataset available and was created by having human annotators write captions for 10-second AudioSet clips sourced from YouTube.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AudioCaps contains ~46k audio clips from AudioSet (10 seconds each) with human-written captions collected via Amazon Mechanical Turk; it remains a primary training and evaluation benchmark for automated audio captioning models.",
      hints: [
        "AudioCaps leverages the scale of AudioSet while adding the textual descriptions that AudioSet\'s fixed labels cannot provide.",
        "Crowdsourcing captions from non-expert annotators provides natural language diversity but introduces label noise.",
      ],
    },
    {
      id: "q-aud-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FENSE (Fluency ENhanced Sentence-bert Evaluation) is preferred over BLEU for evaluating audio captions because:",
      options: [
        "FENSE is computed faster than BLEU on standard hardware",
        "BLEU measures n-gram overlap and penalises fluency, while FENSE uses semantic sentence embeddings and a fluency penalty, correlating better with human judgements of caption quality",
        "FENSE is the only metric accepted by the DCASE challenge for official evaluation",
        "BLEU requires 5 reference captions per clip, while FENSE needs only one",
      ],
      correctAnswer: 1,
      explanation:
        "BLEU\'s n-gram matching penalises semantically correct but differently phrased captions; FENSE combines sentence-BERT cosine similarity (capturing semantic equivalence) with a fluency penalty from a language model, achieving higher correlation with human ratings of caption quality.",
      hints: [
        '"A dog barks loudly" and "A canine vocally barks" are semantically equivalent—how does BLEU score this pair?',
        "Metric correlations with human judgements are measured on human evaluation datasets like ClothoV2.",
      ],
    },
  ],

  // ── aud-kp-26: Music Generation with Transformers (MusicLM, MusicGen) ─────
  "music-generation": [
    {
      id: "q-aud-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "MusicGen (Meta) generates music by:",
      options: [
        "Synthesising audio directly from a symbolic MIDI sequence using a neural vocoder",
        "Predicting EnCodec audio tokens autoregressively conditioned on text or melody prompts",
        "Applying a diffusion model in the mel spectrogram domain conditioned on a music style embedding",
        "Combining a music transcription model with a rule-based harmonisation system",
      ],
      correctAnswer: 1,
      explanation:
        'MusicGen uses a transformer to autoregressively predict EnCodec RVQ tokens conditioned on text descriptions and optional melody inputs, with a novel "delay pattern" that enables efficient parallel prediction of multi-codebook tokens.',
      hints: [
        "Like VALL-E for speech, MusicGen treats music generation as a language modelling problem over discrete audio tokens.",
        "The conditioning modalities (text, melody) are encoded and injected into the transformer via cross-attention or prefix tokens.",
      ],
    },
    {
      id: "q-aud-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "MusicLM (Google) uses a hierarchical sequence-to-sequence modelling approach, where a semantic token model first generates coarse tokens and an acoustic model then generates fine-grained audio tokens.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "MusicLM conditions on MuLan music-text joint embeddings and generates audio in two stages: a semantic model produces tokens from w2v-BERT (coarse semantic structure), then an acoustic model (SoundStream tokens) renders the final audio at full quality.",
      hints: [
        "Hierarchical generation mirrors how humans compose music: first sketch the structure, then fill in the details.",
        "The two-stage approach separates high-level semantic content from fine-grained acoustic rendering.",
      ],
    },
    {
      id: "q-aud-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge in text-to-music generation evaluation is that:",
      options: [
        "No automatic metrics exist for measuring music quality",
        "Subjective music quality and text-music relevance require human evaluation, and automatic proxy metrics (FID on spectrograms, CLAP similarity) do not fully capture creative quality or listener preference",
        "Music generation outputs are always too short for meaningful perceptual evaluation",
        "Copyright law prohibits publishing evaluation results on music generation models",
      ],
      correctAnswer: 1,
      explanation:
        "Automatic metrics like Fréchet Audio Distance measure statistical similarity to a reference set but cannot capture creative attributes (originality, emotional expressiveness, stylistic coherence) that human listeners evaluate; human listening studies are the gold standard but are expensive and subjective.",
      hints: [
        "FID measures distributional similarity to reference music—is a statistically average-sounding piece necessarily good music?",
        "CLAP scores measure text-audio alignment but not absolute quality or originality.",
      ],
    },
  ],

  // ── aud-kp-27: Speech Enhancement and Noise Suppression ──────────────────
  "speech-enhancement": [
    {
      id: "q-aud-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The goal of speech enhancement is to:",
      options: [
        "Increase the speaking rate to compress audio for faster transmission",
        "Remove or attenuate background noise and interference to improve speech intelligibility and quality",
        "Convert speech from one language to another while preserving vocal characteristics",
        "Increase the pitch of a speaker\'s voice to match a target pitch profile",
      ],
      correctAnswer: 1,
      explanation:
        "Speech enhancement suppresses non-speech components (noise, reverberation, interfering speakers) from a noisy signal to produce a cleaner output; applications include telephony, hearing aids, and ASR front-ends.",
      hints: [
        "Enhanced speech should sound more like the original clean recording before noise was added.",
        "Enhancement is a signal processing and machine learning problem: learn to separate speech from noise.",
      ],
    },
    {
      id: "q-aud-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PESQ (Perceptual Evaluation of Speech Quality) and STOI (Short-Time Objective Intelligibility) are objective metrics that correlate with human perception of speech quality and intelligibility respectively.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "PESQ (ITU-T P.862) models the human auditory system to estimate perceived quality (MOS-LQO score), while STOI measures the correlation between clean and enhanced short-time spectral envelopes to predict intelligibility; both are standard benchmarks for speech enhancement evaluation.",
      hints: [
        "Objective metrics replace expensive listening tests for rapid development iteration.",
        "PESQ correlates with Mean Opinion Score (MOS); STOI with word recognition accuracy by listeners.",
      ],
    },
    {
      id: "q-aud-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The DCCRN (Deep Complex Convolutional Recurrent Network) improves over real-valued enhancement networks by:",
      options: [
        "Processing each frequency band independently with a dedicated recurrent network",
        "Operating on complex-valued STFT representations with complex convolutions, enabling joint magnitude and phase estimation for better reconstruction quality",
        "Using a fully convolutional architecture without any recurrent layers to reduce latency",
        "Applying a GAN discriminator that evaluates the imaginary part of the STFT separately",
      ],
      correctAnswer: 1,
      explanation:
        "Real-valued networks typically estimate magnitude only and reconstruct phase from the noisy input (a poor approximation); DCCRN performs convolutions in the complex domain, learning to refine both magnitude and phase simultaneously, leading to improved audio quality.",
      hints: [
        "The STFT has magnitude and phase—most classical enhancement only fixes the magnitude.",
        "Complex convolutions treat the real and imaginary parts as a 2D quantity, preserving their relationship.",
      ],
    },
  ],

  // ── aud-kp-28: Source Separation: Conv-TasNet and Demucs ─────────────────
  "source-separation": [
    {
      id: "q-aud-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Conv-TasNet performs speech source separation by:",
      options: [
        "Running multiple ASR models in parallel and combining their transcripts to infer source signals",
        "Operating entirely in the time domain: learning a 1D convolutional encoder, estimating per-source masks via a temporal convolutional network, and decoding with a learned synthesis filter",
        "Applying a beamformer to a multi-channel microphone array to spatially filter each speaker",
        "Using a variational autoencoder to sample source components from independent latent distributions",
      ],
      correctAnswer: 1,
      explanation:
        "Conv-TasNet replaces the STFT with a learned 1D encoder, estimates multiplicative masks for each source using a stack of dilated temporal convolutional modules, and reconstructs each source by applying the masks and running the learned decoder—all in time domain.",
      hints: [
        'TasNet stands for "Time-domain Audio Separation Network"—what does "time domain" tell you about the input/output?',
        "The mask per source controls how much of the encoded representation each source receives.",
      ],
    },
    {
      id: "q-aud-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Permutation Invariant Training (PIT) is needed for source separation because the model must learn to assign separated outputs to the correct source regardless of which output channel they appear in.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Since there is no canonical ordering of sources, PIT computes the loss for all permutations of output-to-reference assignments and uses the minimum-loss permutation for backpropagation, avoiding the ambiguity problem in training multi-source separation models.",
      hints: [
        'If you have two speakers and two output channels, there are two ways to assign them—which is "correct" without PIT?',
        "PIT makes the training objective invariant to source ordering, solving the label permutation problem.",
      ],
    },
    {
      id: "q-aud-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Hybrid Demucs improves music source separation over earlier models by combining:",
      options: [
        "A GAN generator for each source with a frequency-domain discriminator",
        "Both time-domain waveform processing (Demucs U-Net) and frequency-domain spectrogram processing (spectrogram U-Net), fusing their outputs for each source",
        "Three separate Demucs models trained on different frequency bands and mixed in post-processing",
        "A diffusion model for source refinement applied after a coarse waveform separation model",
      ],
      correctAnswer: 1,
      explanation:
        "Hybrid Demucs runs a waveform-domain U-Net and a spectrogram-domain U-Net in parallel, then combines their outputs via a learned cross-domain fusion; this exploits the complementary strengths of time-domain (transient fidelity) and frequency-domain (spectral precision) processing.",
      hints: [
        "Time-domain models capture fine waveform structure; frequency-domain models exploit spectral patterns—what happens when you combine both?",
        "The fusion allows the model to borrow representations from both domains at each scale of the U-Net hierarchy.",
      ],
    },
  ],

  // ── aud-kp-29: Diffusion Models for Audio Generation ─────────────────────
  "audio-diffusion": [
    {
      id: "q-aud-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Diffusion models generate audio by:",
      options: [
        "Iteratively refining an initial random noise signal by predicting and subtracting noise at each denoising step",
        "Sampling from a normalising flow trained to transform Gaussian noise into audio in one step",
        "Running a GAN generator that maps a latent vector to a mel spectrogram in one forward pass",
        "Predicting the next audio frame autoregressively from all previous frames",
      ],
      correctAnswer: 0,
      explanation:
        "Diffusion models define a forward noising process that gradually adds Gaussian noise to data, then train a denoising network to reverse this process step by step, starting from pure noise and recovering clean audio over multiple denoising steps.",
      hints: [
        'The "diffusion" metaphor is physical: imagine ink diffusing into water and the model learning to run this backward.',
        "Unlike GANs, diffusion models are trained with a simple denoising objective rather than adversarial training.",
      ],
    },
    {
      id: "q-aud-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AudioLDM operates the diffusion process in a compressed latent space rather than directly on mel spectrograms, enabling faster generation while maintaining quality.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AudioLDM uses a VAE to encode mel spectrograms into a compact latent space, runs the diffusion denoising process in this low-dimensional latent space conditioned on CLAP audio embeddings, then decodes with the VAE decoder and a vocoder—dramatically reducing computational cost vs. pixel-space diffusion.",
      hints: [
        "Running diffusion on raw mel spectrograms (high-dimensional) is expensive—what does compressing to a latent space gain?",
        "Latent diffusion models were popularised by Stable Diffusion for images; AudioLDM applies the same idea to audio.",
      ],
    },
    {
      id: "q-aud-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Classifier-Free Guidance (CFG) in conditional audio diffusion models works by:",
      options: [
        "Training a separate classifier on the conditioning signal and using its gradient to steer generation",
        "Training the denoising network both with and without conditioning, then linearly extrapolating beyond the conditional prediction at inference time for stronger conditioning adherence",
        "Replacing the conditioning with a class-conditional mean during 50% of training steps as regularisation",
        "Using a discriminator to measure how closely the generated audio matches the text condition",
      ],
      correctAnswer: 1,
      explanation:
        "CFG jointly trains a conditional and unconditional denoiser; at inference, the predicted noise is interpolated as: ε_guided = ε_uncond + γ·(ε_cond − ε_uncond), where γ > 1 amplifies the direction from unconditional to conditional, producing outputs that more strongly adhere to the conditioning at the cost of diversity.",
      hints: [
        "Compare the output with and without conditioning—CFG amplifies the difference to increase conditioning adherence.",
        "The guidance scale γ controls the trade-off between sample diversity and conditioning fidelity.",
      ],
    },
  ],

  // ── aud-kp-30: Audio-Language Models and Speech LLMs ─────────────────────
  "audio-llms": [
    {
      id: "q-aud-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Audio-Language Models like Qwen-Audio extend LLMs to audio by:",
      options: [
        "Replacing the LLM\'s tokeniser with a speech-specific byte-pair encoding of audio samples",
        "Adding an audio encoder whose output representations are projected into the LLM\'s token embedding space, enabling the LLM to process audio and text together",
        "Fine-tuning the LLM exclusively on audio transcription pairs with no instruction tuning",
        "Using the LLM only for generating text captions after a separate audio classification head produces category labels",
      ],
      correctAnswer: 1,
      explanation:
        "Audio-LLMs attach a pre-trained audio encoder (e.g., Whisper encoder, wav2vec 2.0) to an LLM via a projection layer; audio frame embeddings are treated as soft tokens in the LLM\'s context, enabling the model to follow multimodal instructions involving both speech/audio and text.",
      hints: [
        "LLMs process sequences of tokens—how do you turn continuous audio features into something the LLM can attend to?",
        "The projection layer bridges the audio encoder\'s representation space and the LLM\'s embedding space.",
      ],
    },
    {
      id: "q-aud-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Speech LLMs like SpeechGPT can not only transcribe speech but also generate speech responses directly from the LLM without a separate TTS system, by predicting discrete speech tokens.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "SpeechGPT unifies speech understanding and generation by extending the LLM vocabulary with discrete speech tokens (from HuBERT or EnCodec); the model generates both text and speech token sequences, which are decoded by a vocoder into audio—enabling end-to-end spoken dialogue.",
      hints: [
        "If the LLM can predict any token type, and speech is represented as tokens, can it generate speech natively?",
        "Discrete speech tokens make speech generation equivalent to text generation—a sequence prediction problem.",
      ],
    },
    {
      id: "q-aud-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key advantage of end-to-end speech LLMs over cascade systems (ASR → text LLM → TTS) for spoken dialogue is:",
      options: [
        "They require significantly less training data because the cascade components can be reused",
        "They can preserve paralinguistic information (prosody, speaker identity, emotion) throughout the pipeline rather than losing it during ASR transcription",
        "They are simpler to train because there are fewer loss terms than in a cascade system",
        "They are always faster at inference because they skip the ASR decoding step",
      ],
      correctAnswer: 1,
      explanation:
        "Cascade systems discard non-linguistic information (tone, emotion, speaker accent) when converting speech to text; end-to-end models that process audio directly can propagate paralinguistic cues from the input to the response, enabling more natural spoken interaction.",
      hints: [
        "When you transcribe speech to text, what information about how something was said gets lost?",
        'Prosody (stress, intonation) carries pragmatic meaning—"really?" said flatly vs. with rising intonation means different things.',
      ],
    },
  ],
};

const additionalAudioQuestions: Record<string, Question[]> = {
  'tts-fundamentals': [
    {
      id: 'q-aud-kp31-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Tacotron 2 generates speech in two stages. What are those stages?',
      options: [
        'First a language model generates word embeddings, then a lookup table maps each embedding to a pre-recorded phoneme',
        'First a sequence-to-sequence model with attention converts text to mel spectrograms, then a WaveNet vocoder converts mel spectrograms to waveforms',
        'First a CTC model transcribes text to phonemes, then an HMM aligns phonemes to acoustic frames',
        'First a VAE samples from a style embedding, then a GAN decoder generates audio directly from noise',
      ],
      correctAnswer: 1,
      explanation: 'Tacotron 2 (Shen et al., 2018): (1) a recurrent seq2seq model with location-sensitive attention maps character/phoneme sequences to mel spectrograms; (2) a WaveNet conditioned on mel spectrograms synthesises the raw waveform. This two-stage approach achieves near-human naturalness on MOS evaluations.',
      hints: [
        'Stage 1 handles the linguistic-to-acoustic mapping; stage 2 handles the acoustic-to-waveform synthesis.',
        'WaveNet was originally an unconditional waveform model; conditioning on mel spectrograms makes it a vocoder.',
      ],
    },
    {
      id: 'q-aud-kp31-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'FastSpeech 2 eliminates the autoregressive mel-spectrogram generation step of Tacotron by using a non-autoregressive feed-forward Transformer with explicit duration, pitch, and energy predictors, achieving much faster inference.',
      correctAnswer: 'True',
      explanation: 'FastSpeech 2 (Ren et al., 2021) uses a length regulator to expand phoneme representations to frame level using a predicted duration (from a forced-aligned teacher), then predicts pitch and energy per frame. Since all frames are predicted in parallel (not autoregressively), inference is ~30x faster than Tacotron 2 with comparable quality.',
      hints: [
        'Autoregressive: generate frame N before frame N+1; non-autoregressive: generate all frames simultaneously.',
        'The duration predictor tells the model how many mel frames each phoneme spans—eliminating the attention alignment.',
      ],
    },
    {
      id: 'q-aud-kp31-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'VALL-E (Wang et al., 2023) reformulates TTS as a language modelling task. How does it achieve zero-shot voice cloning from a 3-second prompt?',
      options: [
        'It fine-tunes the model on the speaker\'s voice for 10 steps during inference',
        'It uses EnCodec to tokenise the 3-second prompt into discrete audio codes, then uses the autoregressive codec language model conditioned on the prompt tokens and target text to predict audio codes for the new utterance in the same speaker\'s voice',
        'It extracts a speaker embedding from the prompt using a d-vector model and adds it to the Tacotron decoder hidden state',
        'It retrieves the most similar training speaker and copies their vocal characteristics',
      ],
      correctAnswer: 1,
      explanation: 'VALL-E tokenises the 3-second prompt with EnCodec (neural codec with 8 RVQ codebooks) to produce discrete audio tokens. An autoregressive Transformer language model is conditioned on (text tokens + prompt audio tokens) and generates target audio tokens; a non-autoregressive model fills in the remaining RVQ layers. The result inherits the speaker timbre, prosody, and acoustic environment of the prompt.',
      hints: [
        'EnCodec RVQ: 8 codebooks, each 75 tokens/sec — the first codebook captures coarse features (timbre), later ones capture fine detail.',
        'Conditioning on the prompt audio tokens = "continue speaking in this voice" framing.',
      ],
    },
  ],
  'neural-vocoders': [
    {
      id: 'q-aud-kp32-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'HiFi-GAN achieves high-fidelity waveform synthesis faster than real-time by using ___.',
      options: [
        'A WaveNet-style autoregressive model with mixture of logistics output distribution',
        'A GAN with a multi-period discriminator (MPD) and multi-scale discriminator (MSD) that evaluate the generator\'s output at multiple temporal resolutions and periodicities, combined with feature matching and mel-spectrogram reconstruction losses',
        'A normalising flow that invertibly maps a Gaussian prior to a waveform distribution',
        'A diffusion model that iteratively denoises from Gaussian noise conditioned on mel spectrograms',
      ],
      correctAnswer: 1,
      explanation: 'HiFi-GAN (Kong et al., 2020): the generator uses multi-receptive field fusion (MRF) blocks; the discriminators are (1) MPD: evaluates sliced 1D signals at periods T ∈ {2,3,5,7,11}; (2) MSD: evaluates at original and downsampled resolutions. Combined with feature matching loss (L1 on discriminator features) and mel reconstruction loss, HiFi-GAN is >160x faster than WaveNet with comparable quality.',
      hints: [
        'Multi-period discriminator: reshape waveform into 2D (period × frames) and apply 2D convolution — captures periodic structure.',
        'Feature matching: force generator features to match real waveform features in each discriminator layer.',
      ],
    },
    {
      id: 'q-aud-kp32-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'WaveGlow is a flow-based vocoder that can be trained to maximise exact log-likelihood and performs inference by running the flow in reverse, making it non-autoregressive and parallelisable.',
      correctAnswer: 'True',
      explanation: 'WaveGlow (Prenger et al., 2019) combines WaveNet-style affine coupling layers with Glow\'s multi-scale architecture. Training maximises the exact log-likelihood p(x) = p(z)|det J|⁻¹ via the change-of-variables formula (z = f(x)). Inference inverts f: x = f⁻¹(z) — all samples are generated in parallel, giving real-time or faster synthesis without the sequential bottleneck of WaveNet.',
      hints: [
        'Normalising flows are invertible by design: train z = f(x), infer x = f⁻¹(z).',
        'No autoregression means all waveform samples are computed simultaneously — O(1) latency in the number of steps.',
      ],
    },
    {
      id: 'q-aud-kp32-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'DiffWave and WaveGrad are diffusion-based vocoders. Compared to GAN-based vocoders like HiFi-GAN, their main trade-off is ___.',
      options: [
        'Diffusion vocoders are always lower quality because diffusion models cannot model audio waveforms',
        'Diffusion vocoders achieve comparable or higher quality with more stable training (no mode collapse, no GAN training instability) but require many denoising steps at inference, increasing latency; accelerated samplers (DDIM, DPM-Solver) partially close the gap',
        'Diffusion vocoders are faster than HiFi-GAN because they compute all timesteps in parallel',
        'Diffusion vocoders require much more training data than GANs because they have no discriminator',
      ],
      correctAnswer: 1,
      explanation: 'Diffusion vocoders (DiffWave, WaveGrad) achieve high MOS scores without adversarial training instability. The cost is inference time: 1000 denoising steps at 22 kHz = slow. Accelerated samplers (6-step WaveGrad, 6-step DiffWave) reduce latency significantly. HiFi-GAN remains the dominant real-time vocoder choice, while diffusion vocoders are preferred for highest-quality offline synthesis.',
      hints: [
        'GAN training: generator vs. discriminator — can be unstable, but inference is one forward pass.',
        'Diffusion inference: T denoising steps required — T=1000 for best quality, T=6 for fast approximation.',
      ],
    },
  ],
  'keyword-spotting': [
    {
      id: 'q-aud-kp33-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Keyword spotting (KWS) systems must run on microcontrollers with <1 MB memory. Which architecture family is best suited for this constraint?',
      options: [
        'Full Transformer encoder processing 1-second mel spectrogram patches',
        'Depthwise separable convolutions (DS-CNN, MobileNet-style) or attention-free tiny RNNs, which reduce parameter count and multiply-accumulate operations by 5-10x compared to standard CNNs while maintaining accuracy',
        'WaveNet with dilated causal convolutions for maximum receptive field',
        'Bidirectional LSTM with 5 layers to capture temporal context',
      ],
      correctAnswer: 1,
      explanation: 'DS-CNN (Zhang et al., 2017) and its successors (TC-ResNet, Temporal Efficient Neural Network) use depthwise separable convolutions to cut FLOPs by ~10x. They operate on mel spectrogram frames (typically 40 mel bins, 25ms frames) and achieve >95% accuracy on Google Speech Commands with <200K parameters—deployable on Cortex-M4 MCUs.',
      hints: [
        'Depthwise separable conv: depthwise (per-channel spatial) + pointwise (1×1 channel mixing) = standard conv with far fewer params.',
        'The target: detect "Hey Siri" / "OK Google" always-on with a coin-cell battery life.',
      ],
    },
    {
      id: 'q-aud-kp33-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Attention-based keyword spotting (using a soft attention mechanism over audio frames) allows the model to focus on the most discriminative temporal regions of the keyword, improving robustness to noise and different speaking rates.',
      correctAnswer: 'True',
      explanation: 'Attention-based KWS (de Andrade et al., 2018; Berg et al., 2021) computes a weighted sum over frame-level features, emphasising frames containing the keyword acoustics. This is more robust than average pooling (which includes silent frames) and handles variable speaking rates better than fixed-length feature windows.',
      hints: [
        'In noisy environments, not all frames are equally informative—attention can down-weight noise frames.',
        'Speaking rate variation: "hey" might span 2 frames or 6 frames; attention adapts to the actual extent.',
      ],
    },
    {
      id: 'q-aud-kp33-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In few-shot keyword spotting, the model must detect a new keyword from only 5-10 enrollment samples per user. Which learning paradigm best addresses this?',
      options: [
        'Fine-tuning the entire KWS model on the 5 enrollment samples for 100 epochs',
        'Metric learning with prototypical networks: compute a prototype embedding for the keyword from enrollment samples, then classify new audio by nearest-prototype distance in embedding space',
        'Increasing the model size to memorise the enrollment samples',
        'Using a pre-trained speech LLM and prompting it with the enrollment audio clips',
      ],
      correctAnswer: 1,
      explanation: 'Prototypical networks (Snell et al.) are effective for few-shot KWS: compute a prototype c_k = (1/|S_k|) Σ f_θ(x) for each class (keyword / silence / other), then classify by arg min_k d(f_θ(query), c_k). The embedding f_θ is meta-trained on many known keywords to generalise to new ones with few samples. This avoids overfitting to 5 enrollment examples.',
      hints: [
        'Few-shot: 5 enrollment samples cannot train a fresh model—you need a pre-learned embedding space.',
        'Prototype = average embedding of support set samples — the new keyword is represented by its centroid.',
      ],
    },
  ],
  'singing-voice-synthesis': [
    {
      id: 'q-aud-kp34-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Singing voice synthesis (SVS) differs from TTS in that the input includes ___.',
      options: [
        'Only text transcriptions, exactly as in TTS',
        'Musical score information including note pitch (MIDI note), duration, and lyrics, requiring the model to match phoneme timing to note boundaries and produce accurate pitch trajectories',
        'Audio recordings of instruments that the model must blend with the vocal output',
        'Speaker embeddings that encode the desired singing style independently of pitch',
      ],
      correctAnswer: 1,
      explanation: 'SVS systems (XiaoiceSing, DiffSinger, VISinger) receive (lyrics, note sequence with pitch+duration) as input. Unlike TTS where pitch is prosodic and freely predicted, SVS must produce phonemes precisely on the given MIDI pitch (F0 must match note frequency) and within specified note durations. This adds explicit musical structure to the acoustic modelling challenge.',
      hints: [
        'In speech, F0 is a prosodic feature predicted from text; in singing, F0 is prescribed by the musical score.',
        'Note duration in a score specifies exactly how long each phoneme group must last — much stricter than TTS duration prediction.',
      ],
    },
    {
      id: 'q-aud-kp34-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'DiffSinger uses a diffusion model conditioned on a shallow mel spectrogram predicted by a fast acoustic model, acting as a warm start that reduces the number of required diffusion steps for singing voice synthesis.',
      correctAnswer: 'True',
      explanation: 'DiffSinger (Liu et al., 2022) introduces a "shallow diffusion mechanism": a lightweight acoustic model first generates a rough mel spectrogram M₀; the diffusion model then refines M₀ over K steps (e.g., K=100 vs 1000 for cold start from noise). This reduces inference steps by ~10x while maintaining quality, addressing the diffusion vocoder latency problem in SVS.',
      hints: [
        'Cold start: diffuse from pure noise → many steps needed. Warm start: diffuse from a rough prediction → far fewer steps.',
        'The fast acoustic model is like FastSpeech for singing—coarse but quick; the diffusion model polishes it.',
      ],
    },
    {
      id: 'q-aud-kp34-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key challenge unique to SVS compared to TTS is vibrato and breath modelling. How do modern SVS systems typically handle vibrato?',
      options: [
        'Vibrato is entirely ignored because it can be added as post-processing with a fixed modulation frequency',
        'Vibrato is modelled as a learnable sinusoidal perturbation added to the F0 trajectory, with singer-specific amplitude and rate predicted by an auxiliary network, conditioned on the musical context',
        'Vibrato is handled by the text-to-phoneme front-end which tags vibrato positions in the lyrics',
        'Vibrato emerges spontaneously from any sufficiently large acoustic model without explicit modelling',
      ],
      correctAnswer: 1,
      explanation: 'Vibrato is a quasi-periodic F0 oscillation (typically 5-7 Hz, ±50 cents amplitude) that varies by singer, note, and musical phrase. Systems like VISinger 2 and SongCreator predict vibrato onset/offset timing and sinusoidal parameters (rate, extent) conditioned on the musical score and singer embedding. Accurate vibrato modelling is crucial for naturalness in operatic or pop singing styles.',
      hints: [
        'Fixed post-processing vibrato is uniform — real singing has variable vibrato onset, rate, and depth.',
        'Vibrato onset often occurs after a held note\'s initial transient — context-dependent prediction is needed.',
      ],
    },
  ],
  'audio-qa': [
    {
      id: 'q-aud-kp35-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Audio Question Answering (AQA) systems that process audio-text pairs are typically built by ___.',
      options: [
        'Transcribing audio to text with ASR and then running text-only QA on the transcript',
        'Using a pretrained audio encoder (e.g., CLAP, AudioMAE) to extract audio embeddings, projecting them into an LLM\'s token space, and fine-tuning the LLM to answer questions about the audio content',
        'Training a random forest on MFCC statistics extracted from the audio clip',
        'Generating spectrogram images and running visual QA models on the images',
      ],
      correctAnswer: 1,
      explanation: 'LLM-based AQA (e.g., Pengi, LTU, Qwen-Audio) follow the multimodal LLM pattern: audio encoder → linear projection → LLM. The audio encoder (CLAP, BEATs, AudioMAE) extracts semantic audio features; the projection aligns audio embeddings with the LLM\'s text embedding space; instruction fine-tuning teaches the LLM to answer questions about sounds, music, and speech. This handles open-ended questions that ASR+text QA misses (e.g., "Is this piano playing legato or staccato?").',
      hints: [
        'ASR+text QA loses non-linguistic information: timbre, tempo, instrument identity, emotional tone.',
        'CLAP: Contrastive Language-Audio Pretraining — the audio analogue of CLIP, aligning audio and text in the same embedding space.',
      ],
    },
    {
      id: 'q-aud-kp35-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'CLAP (Contrastive Language-Audio Pretraining) uses contrastive learning to align audio and text representations in a shared embedding space, enabling zero-shot audio classification by comparing audio embeddings to text prompt embeddings.',
      correctAnswer: 'True',
      explanation: 'CLAP (Wu et al., 2023) trains on (audio clip, text description) pairs with InfoNCE loss: matching pairs are pushed close, non-matching pairs pushed apart in the joint embedding space. Zero-shot classification: compute embeddings for class prompts ("sound of rain", "dog barking"), compute audio embedding, predict the closest prompt. No audio-specific fine-tuning required for new classes.',
      hints: [
        'CLAP is to audio what CLIP is to images: contrastive pretraining on large (audio, text) pair datasets.',
        'Zero-shot: the embedding space alignment means audio and text about the same concept are geometrically close.',
      ],
    },
    {
      id: 'q-aud-kp35-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The AudioCaps dataset and CLOTHO benchmark evaluate audio captioning, not QA. What distinguishes audio captioning from AQA, and why does AQA require additional training signal?',
      options: [
        'Audio captioning is harder than AQA because it requires generating longer text responses',
        'Audio captioning produces a free-form description of audio content (one answer per clip); AQA requires answering diverse, open-ended questions about the same clip, demanding flexible grounding and reasoning over audio semantics—requiring instruction-tuning datasets with varied question-answer pairs',
        'AQA is easier because questions constrain the output space, while captioning requires full scene understanding',
        'The two tasks are identical; the same model checkpoint can be used for both without any additional training',
      ],
      correctAnswer: 1,
      explanation: 'Captioning: given audio, generate a single descriptive sentence—trained on (audio, caption) pairs. AQA: given audio + arbitrary question, generate a correct answer—requires the model to ground specific question semantics in the audio signal. This demands instruction-following ability and diverse QA training data. AQUALLM and similar work create (audio, question, answer) triplets by repurposing AudioCaps/CLOTHO captions with LLM-generated questions.',
      hints: [
        'A captioning model asked "what tempo is this music?" may fail because it was only trained to describe scene content.',
        'Instruction tuning: show the model many (audio, question, answer) examples to learn how to respond to diverse questions.',
      ],
    },
  ],
  'sound-synthesis': [
    {
      id: 'q-aud-kp36-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'AudioLDM generates audio from text prompts using a latent diffusion model. Its key innovation compared to waveform-space diffusion is ___.',
      options: [
        'It uses a GAN discriminator instead of a score-matching objective to stabilise training',
        'It runs the diffusion process in the latent space of a pretrained VAE encoder, which is lower-dimensional than the mel spectrogram or waveform space, dramatically reducing compute while preserving perceptual quality',
        'It conditions each denoising step on a separate text embedding from GPT-4',
        'It synthesises audio by retrieving and concatenating nearest-neighbour segments from the training set',
      ],
      correctAnswer: 1,
      explanation: 'AudioLDM (Liu et al., 2023): a VAE compresses mel spectrograms to a compact latent space (e.g., 64-channel latent at 1/4 temporal resolution); a CLAP text encoder conditions a U-Net diffusion model in latent space; a HiFi-GAN vocoder decodes the generated mel to waveform. Latent diffusion is ~100x cheaper than waveform diffusion while maintaining quality.',
      hints: [
        'Latent diffusion (Stable Diffusion) insight: compress first, diffuse in compressed space, decompress—compute-efficient.',
        'CLAP conditioning: text prompt → CLAP text embedding → cross-attention in U-Net → guides generation toward described sound.',
      ],
    },
    {
      id: 'q-aud-kp36-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Foley synthesis — generating sound effects that match video content — requires cross-modal alignment between audio and visual modalities, typically achieved by conditioning the audio generation model on visual frame features.',
      correctAnswer: 'True',
      explanation: 'Video-to-Foley synthesis (SpecVQGAN, FoleyCrafter) conditions audio generation on visual features extracted from each video frame (e.g., ResNet, ViT features). The model learns cross-modal correspondences: footsteps align with walking feet, water sounds align with water visuals. Temporal alignment is enforced by conditioning on per-frame features throughout the audio generation process.',
      hints: [
        'Foley artists in film manually create sound effects synchronised to video; Foley synthesis automates this.',
        'Frame-level visual features preserve temporal correspondence: sound onset aligns with visual event onset.',
      ],
    },
    {
      id: 'q-aud-kp36-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Music generation models like MusicGen use a single-stage language model with delay pattern interleaving for multi-codebook audio. Why is the delay pattern necessary?',
      options: [
        'To ensure that each codebook is generated on a different GPU in parallel, reducing inference time',
        'Because RVQ codebooks have a hierarchical dependency (codebook k refines residuals from codebooks 1..k-1), the delay pattern offsets each codebook\'s generation by one timestep so that codebook k at time t can attend to codebook k-1 at time t—capturing inter-codebook dependency without a separate model per codebook',
        'To avoid the model generating silence by ensuring each timestep always produces non-zero tokens',
        'Because the MIDI score requires beat-aligned token generation with explicit delay between note events',
      ],
      correctAnswer: 1,
      explanation: 'EnCodec produces K codebooks (K=4 or 8) per timestep t. Naive flattening (all K tokens per t before moving to t+1) requires modelling K-way dependency. MusicGen\'s delay pattern: codebook k at timestep t is offset by k positions, so the sequence is [c1_t1, c1_t2, c2_t1, c1_t3, c2_t2, c3_t1, ...]. This allows a single autoregressive model to decode all codebooks while preserving inter-codebook conditioning structure.',
      hints: [
        'RVQ: codebook 1 quantises the signal coarsely; codebook 2 quantises the residual after codebook 1, etc.',
        'Delay pattern: think of it as diagonals in a K×T grid being flattened into a single sequence.',
      ],
    },
  ],
  'bioacoustics': [
    {
      id: 'q-aud-kp37-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'BirdNET is a deep learning model for bird species identification from audio. Its deployment challenge, compared to standard audio classification, is ___.',
      options: [
        'Bird calls are too short (< 0.1 seconds) for any mel spectrogram to represent',
        'The class imbalance is extreme: thousands of species with highly varying call frequency, geographic distribution, and recording quality; few-shot or transfer learning is needed for rare species',
        'Bird audio always contains multiple simultaneous species, requiring blind source separation before classification',
        'Bird identification is a regression problem (predicting GPS coordinates) rather than a classification problem',
      ],
      correctAnswer: 1,
      explanation: 'BirdNET (Kahl et al.) covers ~6000 species with massive class imbalance: some species have thousands of recordings, others have < 10. Transfer learning from ImageNet/AudioSet pretrained features and data augmentation (mixup, pitch shifting) are critical. Rare species require few-shot adaptation. Geographic and temporal priors further improve accuracy by restricting plausible species based on location/date.',
      hints: [
        '6000 species × varying rarity = long-tail distribution; a majority-class classifier would miss rare species entirely.',
        'Geographic prior: a European bird is very unlikely to appear in a recording from South America—use location metadata.',
      ],
    },
    {
      id: 'q-aud-kp37-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Passive acoustic monitoring (PAM) uses autonomous recording units deployed in the field to collect continuous audio data, and ML models process the recordings to detect and count wildlife vocalizations at scale.',
      correctAnswer: 'True',
      explanation: 'PAM with ML is transforming ecology: ARUs (Autonomous Recording Units) record continuously for weeks; models like BirdNET, ORCA-SPOT (orca detection), and PUMILIO (bat calls) process terabytes of audio to produce species occurrence data at scale impossible with human review. This enables biodiversity monitoring across vast habitats.',
      hints: [
        'Traditional wildlife surveys: human observer counts. PAM: continuous audio + ML = 24/7 coverage at low cost.',
        'A single ARU can generate ~100 GB/day of audio; ML is essential to process this volume.',
      ],
    },
    {
      id: 'q-aud-kp37-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Cetacean (whale/dolphin) communication detection uses click detection for echolocation clicks and whistle detection for social calls. What specific challenge do sperm whale clicks pose for standard audio ML?',
      options: [
        'Sperm whale clicks are inaudible to standard hydrophones due to their high frequency content',
        'Sperm whale clicks are extremely broadband (0.1-30 kHz), very brief (<1ms), and occur at inter-click intervals encoding identity (codas); standard short-time STFT loses inter-click timing information, requiring point process or template-matching approaches',
        'Sperm whale clicks perfectly overlap with shipping noise, making them impossible to separate',
        'Sperm whale communication occurs at depths below 1000m where no hydrophone can operate',
      ],
      correctAnswer: 1,
      explanation: 'Sperm whale codas are rhythmic patterns of 3-20 clicks spaced 50-500ms apart; the identity information is in the inter-click intervals (ICI), not spectral content. Standard MFCC/mel features lose this temporal structure. Effective detection uses: (1) waveform-domain click detectors (energy thresholding + matched filters); (2) ICI-based coda classifiers; (3) DTTS (Deep Template Time Series) that explicitly model click patterns.',
      hints: [
        'Coda classification: {click, gap, click, gap, click} — the pattern of gaps encodes identity, not the click\'s spectral content.',
        'Short-time STFT uses 25ms windows — much longer than a 1ms click — so the click energy is smeared across frames.',
      ],
    },
  ],
  'audio-forensics': [
    {
      id: 'q-aud-kp38-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Deepfake speech detection (anti-spoofing) aims to distinguish synthesised or voice-converted speech from genuine speech. The ASVspoof challenges evaluate models on which types of attacks?',
      options: [
        'Only text-to-speech systems using old HMM-based synthesis',
        'Text-to-speech (TTS), voice conversion (VC), and replay attacks (playing a recording of the target speaker through a loudspeaker into the microphone), covering both synthesis-based and physical playback spoofing',
        'Only replay attacks, since TTS has been solved and is no longer a spoofing threat',
        'Only adversarial perturbations added to genuine speech recordings',
      ],
      correctAnswer: 1,
      explanation: 'ASVspoof 2019/2021 cover: (LA) logical access — TTS+VC generated spoofs attacking ASV systems; (PA) physical access — replay attacks in various room conditions; (DF) deepfake — codec-processed and post-processed TTS/VC. Models (LCNN, RawNet2, AASIST) are evaluated on Equal Error Rate (EER) where impostor acceptance rate = genuine rejection rate.',
      hints: [
        'Logical access: the attacker submits synthetic audio to a remote system; physical access: the attacker plays audio in a room containing the microphone.',
        'EER: the operating point where false acceptance rate = false rejection rate—lower is better for anti-spoofing.',
      ],
    },
    {
      id: 'q-aud-kp38-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Spectral artifacts in the high-frequency range (> 8 kHz) are a reliable indicator of neural TTS spoofing because most vocoders introduce phase discontinuities or oversmoothing at high frequencies that genuine speech does not exhibit.',
      correctAnswer: 'True',
      explanation: 'Mel spectrogram-based TTS/vocoders often use mel filterbanks covering only 0-8 kHz; the HiFi-GAN or WaveNet vocoder must "hallucinate" the 8-22 kHz region. This produces characteristic artifacts: spectral repetitions, phase discontinuities, and oversmoothed harmonics detectable by anti-spoofing models trained to examine high-frequency regions. RawNet2 operates directly on waveforms to capture these subtle artifacts.',
      hints: [
        'Human speech has harmonics extending to 10+ kHz with complex phase structure; vocoders may smooth or repeat these.',
        'Sinc filters and vocoders apply implicit low-pass filtering that leaves characteristic high-frequency signatures.',
      ],
    },
    {
      id: 'q-aud-kp38-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Generalisation to unseen TTS systems is a core challenge in anti-spoofing. Models trained on ASVspoof 2019 often fail on ASVspoof 2021 because ___.',
      options: [
        'The evaluation metric changed from EER to minDCF between 2019 and 2021',
        'Modern TTS/VC systems (e.g., VITS, YourTTS, VALL-E) produce fewer codec artifacts, phone-level temporal structure, and naturalness scores approaching genuine speech; 2019-trained models overfit to artifacts specific to 2019 synthesis systems',
        'ASVspoof 2021 uses a different microphone type that changes the acoustic characteristics of genuine speech',
        'The speaker demographics changed between the two datasets, causing a distribution shift in genuine speech characteristics',
      ],
      correctAnswer: 1,
      explanation: 'Anti-spoofing generalisation is an arms race: models trained on 2019 TTS artifacts (often vocoder-specific spectral discontinuities) fail when newer TTS systems (VITS, NaturalSpeech, VALL-E) produce near-natural speech with different or no artifacts. Solutions: training on diverse, diverse-codec datasets; using codec-agnostic features (e.g., phase-based); self-supervised features from wav2vec/HuBERT that encode naturalness.',
      hints: [
        'Arms race: TTS quality improves → spoofs are harder to detect → better detectors needed → cycle repeats.',
        'Overfitting to vocoder artifacts: the model learns "HiFi-GAN sounds like X" but fails when VITS produces different artifacts.',
      ],
    },
  ],
  'audio-representation': [
    {
      id: 'q-aud-kp39-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'EnCodec is a neural audio codec that uses residual vector quantisation (RVQ). What role does RVQ play in the compression and reconstruction quality trade-off?',
      options: [
        'RVQ applies a single codebook that quantises the full audio signal at once',
        'RVQ applies K successive codebooks: codebook 1 quantises the encoder output, codebook 2 quantises the residual after codebook 1 reconstruction, etc.; using more codebooks (higher bitrate) improves reconstruction quality while using fewer (lower bitrate) enables more aggressive compression',
        'RVQ uses random quantisation at each layer to regularise the latent space',
        'RVQ replaces the neural encoder with a classical Huffman coding scheme for lossless compression',
      ],
      correctAnswer: 1,
      explanation: 'EnCodec\'s RVQ: z = encoder(x); q₁ = VQ(z); r₁ = z − decode(q₁); q₂ = VQ(r₁); r₂ = r₁ − decode(q₂); ...; qK = VQ(r_{K-1}). Quantisation codes (q₁,...,qK) are transmitted. At 24 kHz, EnCodec uses K=32 codebooks at 75 tokens/sec per codebook for 6 kbps, or K=8 for 1.5 kbps. Each additional codebook captures finer signal details, improving perceptual quality.',
      hints: [
        'Residual: each codebook codes what the previous level left uncaptured.',
        'Lower bitrate = fewer codebooks = more compression = lower quality. Classic rate-distortion trade-off.',
      ],
    },
    {
      id: 'q-aud-kp39-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'AudioMAE (Masked Autoencoders for Audio) learns audio representations by masking patches of the input spectrogram and training the model to reconstruct the masked patches, following the same self-supervised framework as image MAE.',
      correctAnswer: 'True',
      explanation: 'AudioMAE (He et al., adapting image MAE to audio): the mel spectrogram is split into patches; a high masking ratio (~80%) is applied; a ViT encoder processes only visible patches; a lightweight decoder reconstructs the full spectrogram. Pre-trained representations transfer effectively to downstream audio classification (AudioSet, ESC-50) and show complementary strengths to CLAP\'s contrastive approach.',
      hints: [
        'Image MAE: mask 75% of image patches, reconstruct with a ViT. AudioMAE: same idea on mel spectrogram patches.',
        '80% masking ratio forces the model to learn holistic audio semantics rather than copying visible adjacent patches.',
      ],
    },
    {
      id: 'q-aud-kp39-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'BEATs (Audio Pre-Training with Acoustic Tokenizers) uses a two-stage iterative pretraining approach. What makes it different from AudioMAE and wav2vec?',
      options: [
        'BEATs uses contrastive learning instead of masked prediction, like CLAP but with in-domain audio-only pretraining',
        'BEATs jointly trains an acoustic tokenizer (discrete audio unit generator) and a Transformer encoder in alternating stages: the tokenizer provides discrete targets for masked prediction, while the Transformer provides better features to update the tokenizer—each improves the other iteratively',
        'BEATs uses a fixed speech recogniser as the teacher, distilling ASR knowledge into a general audio model',
        'BEATs processes audio in the frequency domain using discrete wavelet coefficients as both input and reconstruction target',
      ],
      correctAnswer: 1,
      explanation: 'BEATs (Chen et al., 2022): iteration 1—train a tokenizer using the current audio encoder features; use the tokenizer\'s discrete labels as masked prediction targets for the audio Transformer. Iteration 2—retrain the tokenizer with the improved encoder features; retrain the Transformer with better targets. Each cycle improves both. BEATs achieves state-of-the-art on AudioSet without relying on teacher models or contrastive pairs.',
      hints: [
        'AudioMAE reconstructs continuous mel values; BEATs predicts discrete token labels—a classification target that may be more semantically meaningful.',
        'Iterative refinement: the tokenizer improves as the encoder improves, creating a virtuous cycle.',
      ],
    },
  ],
  'audio-diffusion-advanced': [
    {
      id: 'q-aud-kp40-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Stable Audio and AudioLDM 2 both use latent diffusion for audio generation. What additional conditioning mechanism does AudioLDM 2 introduce over AudioLDM 1?',
      options: [
        'It conditions on MIDI piano roll inputs to enable symbolic music control',
        'It introduces GPT-2-based text encodings as an intermediate representation, projecting both text and audio caption features through a language model to unify diverse conditioning modalities before cross-attending into the diffusion U-Net',
        'It replaces CLAP text embeddings with raw BERT token-level attention over individual words',
        'It conditions on speaker embeddings extracted from reference speech to enable voice cloning in audio synthesis',
      ],
      correctAnswer: 1,
      explanation: 'AudioLDM 2 (Liu et al., 2023) uses a GPT-2 model as a "bridge" between conditioning text and the diffusion model: diverse text conditioning signals (AudioCaps captions, music descriptions) are encoded and projected through a GPT-2-based language model that generates conditioning tokens; these are then cross-attended in the U-Net. This unifies conditioning for speech, music, and general sound in a single model.',
      hints: [
        'AudioLDM 1: CLAP text embedding → cross-attention. AudioLDM 2: CLAP → GPT-2 bridge → cross-attention.',
        'The GPT-2 bridge learns to translate between the conditioning modality space and the diffusion latent space.',
      ],
    },
    {
      id: 'q-aud-kp40-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Classifier-free guidance (CFG) is commonly used in audio diffusion models to improve prompt adherence: during inference, the model\'s score is extrapolated between the unconditional and conditional predictions, with a guidance scale > 1 amplifying the effect of the condition.',
      correctAnswer: 'True',
      explanation: 'CFG for audio: ε_guided = ε_uncond + γ·(ε_cond − ε_uncond), where γ is the guidance scale. At γ=1, standard conditional generation. At γ>1, the conditional direction is amplified, increasing prompt adherence at the cost of diversity/naturalness. AudioLDM, MusicGen, and Stable Audio all use CFG with γ typically 3-7 for audio generation.',
      hints: [
        'CFG training: randomly drop the condition (replace with null/empty) during training so the model learns both conditional and unconditional score.',
        'Higher γ: more like the text prompt; lower γ: more diverse but less adherent. Trade-off similar to temperature in LLMs.',
      ],
    },
    {
      id: 'q-aud-kp40-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Inpainting and outpainting for audio — filling in a masked region or extending a recording — is achieved with diffusion models by ___.',
      options: [
        'Running the diffusion model only on the masked region with no conditioning on the surrounding context',
        'Conditioning the reverse diffusion process on the known (unmasked) audio regions by: at each denoising step, replacing the known-region\'s noisy latent with the appropriately noise-corrupted version of the original audio, while freely sampling the unknown region — a technique called RePaint adapted to audio latent diffusion',
        'Concatenating the surrounding audio to the text prompt and running standard conditional generation',
        'Using a separate encoder to extract a style embedding from the surrounding context and conditioning a TTS model on that style',
      ],
      correctAnswer: 1,
      explanation: 'Audio inpainting via RePaint-style latent diffusion: at diffusion step t, known regions z_known are corrupted to noise level t (z_t_known = sqrt(ᾱ_t)·z_known + sqrt(1−ᾱ_t)·ε) and substituted back into the noisy latent; the model freely denoises the masked region. Repeated resampling (back-and-forth diffusion steps in the RePaint schedule) ensures the generated content blends naturally with the boundary. MusicGen and AudioLDM both support variants of this.',
      hints: [
        'RePaint: at each denoising step, stitch together "what we know" (corrupted to this noise level) and "what we\'re generating" (freely denoised) — then denoise together.',
        'The key insight: corrupt the known region to the same noise level as the generated region so they can be combined consistently.',
      ],
    },
  ],
}

Object.assign(questions, additionalAudioQuestions);

const extraAudioQuestions: Record<string, Question[]> = {
  "whisper-architecture": [
    {
      id: "q-aud-ex1-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Whisper (OpenAI, 2022) is trained with a multitask objective. Which of the following tasks does a single Whisper model handle simultaneously?",
      options: [
        "Only speech recognition in English",
        "Speech recognition, language identification, voice activity detection, and translation — all controlled by special decoder tokens",
        "Speaker diarisation and named entity recognition from transcripts",
        "Real-time ASR only; batch transcription requires a separate model",
      ],
      correctAnswer: 1,
      explanation: "Whisper uses a single encoder-decoder transformer trained on 680,000 hours of weakly supervised web audio. Task control is achieved via special tokens prepended to the decoder: <|transcribe|> for transcription, <|translate|> for translation to English, <|nospeech|> for silence detection, and a language token for identification. All tasks share one model.",
      hints: [
        "Special tokens in Whisper's decoder act as task instructions — the model shifts behaviour based on which tokens it sees.",
        "Multitask training provides implicit regularisation: the model learns robust audio representations by solving diverse tasks.",
      ],
    },
    {
      id: "q-aud-ex1-2",
      type: "true-false",
      difficulty: "easy",
      question: "Whisper's encoder processes 30-second log-mel spectrogram windows and is based on the standard Transformer encoder architecture without any convolutional front-end.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Whisper uses two 1D convolutional layers with GELU activations as a convolutional front-end before the standard Transformer encoder. These convolutions extract short-range features from the 80-channel log-mel spectrogram before positional embeddings and self-attention layers process them.",
      hints: [
        "Audio Transformers often include a CNN stem to extract local patterns before global attention — this reduces sequence length and improves efficiency.",
        "The convolutional front-end in Whisper uses kernel size 3 and stride 2, halving the temporal resolution before attention.",
      ],
    },
    {
      id: "q-aud-ex1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A key limitation of Whisper's 30-second fixed-window design for streaming ASR is:",
      options: [
        "The model cannot handle audio shorter than 30 seconds",
        "Real-time streaming requires output after every spoken word, but Whisper must buffer 30 seconds before decoding, introducing a latency of up to 30 seconds",
        "Whisper uses sinusoidal positional encodings that prevent processing any audio less than 10 seconds",
        "The encoder output is too large for real-time decoding on consumer hardware",
      ],
      correctAnswer: 1,
      explanation: "Whisper's encoder processes a fixed 30-second window; streaming applications requiring low-latency output (e.g., live captioning) are fundamentally at odds with this design. Workarounds include chunked inference with overlapping windows and voice-activity-based segmentation, but inherent latency remains. Whisper was designed for transcription, not streaming.",
      hints: [
        "Streaming ASR outputs partial transcriptions continuously; 30-second buffering means waiting for the full window before any words appear.",
        "Chunked inference heuristics (e.g., WhisperX) mitigate latency but introduce boundary artefacts at chunk edges.",
      ],
    },
  ],
  "ctc-vs-attention": [
    {
      id: "q-aud-ex2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Connectionist Temporal Classification (CTC) makes a conditional independence assumption to tractably compute the marginal probability over all valid alignments. That assumption is:",
      options: [
        "Each output token depends only on the previous token (Markov property)",
        "Output labels at each time step are conditionally independent of each other given the encoder hidden states",
        "The blank symbol must occur at every other time step",
        "The input features are independent across frames",
      ],
      correctAnswer: 1,
      explanation: "CTC assumes outputs are conditionally independent given the encoder hidden states: P(y1,...,yT | h) = prod P(yt | ht). This factorisation allows dynamic programming (forward-backward algorithm) to sum over all valid alignments in O(T x |V|) time, but it prevents the model from explicitly learning output dependencies (unlike attention-based decoders with LM-like output conditioning).",
      hints: [
        "The CTC dynamic programming algorithm sums all alignment paths via the forward-backward algorithm, which requires independence to factorise.",
        "This independence is why CTC benefits from external language model rescoring: the model cannot internally learn n-gram dependencies.",
      ],
    },
    {
      id: "q-aud-ex2-2",
      type: "true-false",
      difficulty: "easy",
      question: "Attention-based encoder-decoder ASR models (like Whisper) can naturally handle both streaming and offline transcription without any architectural modification.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Standard attention-based encoder-decoders use full self-attention over the entire input sequence, requiring complete audio before decoding. Streaming requires causal or chunk-wise attention mechanisms (e.g., Monotonic Chunkwise Attention, Streaming Transformer) that restrict attention to past frames only. Offline models must be re-architected for streaming.",
      hints: [
        "Full attention attends to all input frames including future frames — for streaming, you cannot see the future.",
        "Monotonic attention forces the attention head to move left-to-right through the input, enabling streaming with bounded latency.",
      ],
    },
    {
      id: "q-aud-ex2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Hybrid CTC/attention models (e.g., ESPnet) combine both objectives during training. What does this hybrid loss achieve that neither CTC nor attention alone provides?",
      options: [
        "It doubles the number of parameters, increasing model capacity",
        "CTC enforces monotonic alignment (stabilising early training), while attention learns fine-grained output dependencies; jointly, the model trains faster and achieves lower WER than either alone",
        "It eliminates the need for a language model during decoding by combining both probabilistic models",
        "CTC removes the need for subword tokenisation, allowing character-level training for both objectives",
      ],
      correctAnswer: 1,
      explanation: "CTC provides monotonic alignment guidance that stabilises encoder training and prevents attention from degenerating in early epochs. Attention learns richer output-to-output dependencies (acting like an implicit LM). The hybrid loss (lambda times CTC plus (1-lambda) times attention, lambda approximately 0.3) exploits both benefits, consistently outperforming either alone in WER on benchmarks like LibriSpeech.",
      hints: [
        "In early training, attention alignments are noisy and unstable; CTC gradient provides a cleaner signal to align the encoder.",
        "At inference time, CTC prefix scores and attention scores are combined beam-search scores for joint decoding.",
      ],
    },
  ],
  "confidence-calibration-asr": [
    {
      id: "q-aud-ex3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "ASR confidence scores are used to flag uncertain words for human review. A well-calibrated confidence score means:",
      options: [
        "The confidence score equals the log-probability of the top hypothesis",
        "Among all words assigned confidence p, approximately p fraction are transcribed correctly",
        "The confidence score is always above 0.9 for speech with SNR > 20 dB",
        "Confidence scores are identical to the softmax output of the final decoder layer",
      ],
      correctAnswer: 1,
      explanation: "Calibration means the confidence score is a reliable probability estimate: if the model assigns confidence 0.8 to words, 80% of those words should be correct. ASR models trained with cross-entropy often produce overconfident softmax probabilities; calibration methods (temperature scaling, isotonic regression, Platt scaling) correct the miscalibration.",
      hints: [
        "A calibration curve plots predicted confidence vs. actual accuracy — a perfectly calibrated model lies on the diagonal.",
        "Overconfidence in ASR: the model assigns high probability to incorrect words in noisy conditions, misleading downstream applications.",
      ],
    },
    {
      id: "q-aud-ex3-2",
      type: "true-false",
      difficulty: "easy",
      question: "Temperature scaling is one of the simplest post-hoc calibration methods, dividing the logits by a learned scalar T > 1 before softmax to produce flatter, better-calibrated probability distributions.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Temperature scaling divides all logits by a single temperature parameter T optimised on a held-out validation set to minimise negative log-likelihood (Expected Calibration Error). T > 1 softens the distribution, reducing overconfidence. It does not change the argmax (accuracy) but improves reliability of the confidence score.",
      hints: [
        "Temperature > 1 flattens the softmax; temperature < 1 sharpens it. Overconfident models need T > 1.",
        "Temperature scaling is appealing because it has only one parameter and does not require retraining the base model.",
      ],
    },
    {
      id: "q-aud-ex3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In production ASR systems, word-level confidence scores are typically computed from which sources to improve accuracy over raw softmax probabilities?",
      options: [
        "The raw decoder softmax probability of the top token at each step, with no further processing",
        "A combination of the acoustic model score, language model score, and sometimes a separately trained confidence model that sees features like the N-best list score gap, frame-level posteriors, and acoustic noise estimates",
        "The edit distance between the top hypothesis and the second-best hypothesis divided by the utterance length",
        "The average mel spectrogram energy in the word time interval, normalised by expected energy for the phone sequence",
      ],
      correctAnswer: 1,
      explanation: "Production confidence models (e.g., at Google, Microsoft) combine: (1) AM/LM score gap between top-1 and top-2 hypotheses in N-best lists, (2) lattice-based posterior probabilities (integrating over all alignments), (3) duration and silence features, (4) a discriminatively trained neural confidence model. Raw softmax probabilities alone are poorly calibrated due to model overconfidence and beam search effects.",
      hints: [
        "N-best score gap: a large gap between top and second hypothesis correlates with higher confidence that the top is correct.",
        "Lattice posteriors integrate over many alignments — they are more robust than single-hypothesis probabilities.",
      ],
    },
  ],
  "vits-tts": [
    {
      id: "q-aud-ex4-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "VITS (Variational Inference with adversarial learning for end-To-end Speech synthesis) is a single-stage TTS model. What two components allow VITS to perform both text alignment and waveform generation end-to-end?",
      options: [
        "A Tacotron 2 acoustic model and a separate HiFi-GAN vocoder fine-tuned jointly",
        "A conditional VAE with normalising flows for latent alignment (replacing the attention mechanism) and a HiFi-GAN-style GAN vocoder operating in latent space, trained jointly with the VAE",
        "A CTC aligner for forced alignment and a WaveNet decoder for synthesis, sharing the same LSTM encoder",
        "A BERT text encoder for phoneme embeddings and a diffusion model for mel spectrogram synthesis",
      ],
      correctAnswer: 1,
      explanation: "VITS (Kim et al., 2021) trains a VAE where: the prior network encodes phoneme embeddings, a normalising flow refines the latent, and a stochastic duration predictor replaces attention-based alignment using monotonic alignment search (MAS). A HiFi-GAN decoder generates the waveform directly from the latent. End-to-end training with adversarial, reconstruction, and KL losses enables one-stage synthesis with naturalness comparable to two-stage systems.",
      hints: [
        "Monotonic alignment search (MAS) in VITS finds the most likely alignment between phonemes and latent frames without explicit attention.",
        "The normalising flow maps the simple prior to a complex posterior, increasing the expressiveness of the latent distribution.",
      ],
    },
    {
      id: "q-aud-ex4-2",
      type: "true-false",
      difficulty: "medium",
      question: "VITS achieves higher Mean Opinion Scores (MOS) than Tacotron 2 + WaveGlow on standard TTS benchmarks, demonstrating that end-to-end single-stage training can match or exceed pipeline-based two-stage approaches.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "VITS achieves MOS scores on LJSpeech that match or exceed Tacotron 2 + WaveGlow (MOS ~4.3 vs 4.0), while also enabling faster inference by eliminating the acoustic feature intermediate. The joint training of all components avoids the mismatch between acoustic model output and vocoder input that degrades two-stage systems.",
      hints: [
        "Pipeline mismatch: a vocoder trained on ground-truth mel spectrograms degrades when given predicted mel spectrograms — joint training avoids this.",
        "VITS MOS on LJSpeech is approximately 4.43 vs human speech approximately 4.55, a remarkable result for end-to-end synthesis.",
      ],
    },
  ],
  "diffusion-tts": [
    {
      id: "q-aud-ex5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Diffusion-based TTS models like DiffSpeech and Grad-TTS generate mel spectrograms by:",
      options: [
        "Training a flow-based model to invertibly map phoneme embeddings to mel spectrograms",
        "Iteratively denoising Gaussian noise conditioned on text/phoneme representations using a U-Net or Transformer denoising network, starting from pure noise and recovering a mel spectrogram over multiple steps",
        "Using a GAN generator to directly map text embeddings to mel spectrograms in one forward pass",
        "Computing the mel spectrogram as the product of a BERT encoder and an acoustic dictionary learned during training",
      ],
      correctAnswer: 1,
      explanation: "Diffusion TTS models (Grad-TTS, DiffSpeech) define a forward diffusion process that adds noise to mel spectrograms and train a denoising score network conditioned on phoneme/duration features. At inference, pure Gaussian noise is iteratively denoised over T steps (T=1000 for training, accelerated to T=6-50 with DDIM/DPM-Solver for practical TTS). This avoids GAN training instability and achieves diverse, high-quality synthesis.",
      hints: [
        "The conditioning on phoneme representations guides the diffusion model toward synthesizing the specified linguistic content.",
        "DDIM (Denoising Diffusion Implicit Models) accelerates inference from 1000 to ~50 steps without retraining by making the reverse process non-Markovian.",
      ],
    },
    {
      id: "q-aud-ex5-2",
      type: "true-false",
      difficulty: "hard",
      question: "Diffusion-based TTS models have faster inference than GAN-based vocoders like HiFi-GAN because the diffusion process eliminates the need for iterative refinement.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Diffusion TTS inference is slower than GAN vocoders, not faster. HiFi-GAN generates waveforms in a single forward pass (more than 100x real-time). Diffusion models require multiple denoising steps (typically 6-1000), each requiring a full U-Net forward pass. Accelerated samplers (DDIM, DPM-Solver) reduce steps to ~6-50, approaching real-time but still slower than GANs on equivalent hardware.",
      hints: [
        "GAN inference is one forward pass; diffusion inference is N denoising steps, each a forward pass.",
        "The quality vs. speed trade-off in diffusion TTS: more steps = higher quality but slower inference.",
      ],
    },
  ],
  "zero-shot-voice-cloning": [
    {
      id: "q-aud-ex6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Zero-shot voice cloning systems like YourTTS and VALL-E synthesise speech in a target speaker's voice from only a few seconds of reference audio. What is the key challenge that distinguishes zero-shot from speaker-adaptive TTS?",
      options: [
        "Zero-shot cloning requires real-time processing, while speaker-adaptive TTS can run offline",
        "Zero-shot cloning must generalise to speakers not seen during training, requiring the model to extract and condition on speaker identity from very limited reference audio at inference time only",
        "Zero-shot cloning is limited to languages seen during training, while speaker-adaptive TTS can handle new languages",
        "Speaker-adaptive TTS requires a separate ASR model to transcribe the reference audio, while zero-shot cloning does not",
      ],
      correctAnswer: 1,
      explanation: "Speaker-adaptive TTS fine-tunes model parameters on new speaker data (requiring 5-30 minutes of audio and training time). Zero-shot cloning extracts a speaker embedding from a 3-10 second reference at inference without any parameter updates, relying on the model having learned a disentangled speaker representation space during pre-training on diverse speakers.",
      hints: [
        "Zero-shot means no gradient update at test time; the model must extract speaker identity purely from the reference audio embedding.",
        "The speaker encoder must distil voice characteristics (vocal tract, speaking style) into a compact embedding generalising to unseen voices.",
      ],
    },
    {
      id: "q-aud-ex6-2",
      type: "true-false",
      difficulty: "medium",
      question: "VALL-E (Microsoft, 2023) treats TTS as a language modelling task by generating discrete audio codec tokens conditioned on phoneme sequences and a 3-second speaker prompt, achieving zero-shot voice cloning.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "VALL-E uses EnCodec to tokenise audio into discrete codec codes, then trains a transformer language model to predict these codes conditioned on phoneme input and a 3-second speaker reference (also tokenised). At inference, the model auto-regressively generates codec tokens that are decoded to speech, implicitly capturing the speaker's voice from the reference tokens without any speaker encoder training.",
      hints: [
        "By treating audio as discrete tokens, VALL-E reframes TTS as a next-token prediction problem — the same as language modelling.",
        "The 3-second reference provides speaker context as a prefix of codec tokens; the model continues generating in the same voice.",
      ],
    },
    {
      id: "q-aud-ex6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Speaker disentanglement in voice cloning models is the separation of speaker identity from linguistic content in the learned representation. Which training signal most directly encourages this disentanglement?",
      options: [
        "Training the model on a single speaker dataset with diverse phoneme coverage",
        "Using a speaker-adversarial loss that penalises the content encoder if a speaker classifier can predict speaker identity from content features, forcing content representations to be speaker-agnostic",
        "Adding a perceptual loss between the synthesised and reference spectrogram at the phoneme level",
        "Training with data augmentation that randomly shifts the pitch of all training utterances by a fixed semitone interval",
      ],
      correctAnswer: 1,
      explanation: "Adversarial speaker disentanglement (used in SPEECHSPLIT, AutoVC) trains a speaker classifier on the content encoder output and reverses its gradient with respect to the content encoder — forcing content features to contain no speaker information. This gradient reversal technique (similar to DANN in domain adaptation) explicitly encourages disentanglement.",
      hints: [
        "Adversarial training flips the gradient from the speaker classifier, penalising the encoder for being speaker-informative.",
        "A good disentanglement: swap speaker embeddings between two utterances — the content should transfer perfectly while the voice changes.",
      ],
    },
  ],
  "wav2vec-pretraining": [
    {
      id: "q-aud-ex7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "wav2vec 2.0's contrastive pretraining objective involves masking latent speech representations and predicting the true quantised representation from distractors. The quantised representations come from:",
      options: [
        "k-means clusters computed on MFCCs offline before training",
        "A learnable product quantisation module trained jointly with the transformer, producing discrete codes from the continuous CNN features",
        "Phone labels extracted from a pre-trained forced aligner",
        "Codebook vectors from a separate EnCodec model pre-trained on speech",
      ],
      correctAnswer: 1,
      explanation: "wav2vec 2.0 uses a joint product quantisation module: the CNN encoder extracts continuous latent features, which are simultaneously quantised (via straight-through estimator and Gumbel-softmax) into discrete codes. The transformer must identify the true quantised code for a masked time step among K distractors sampled from the same batch — a contrastive loss that trains both encoder and quantiser jointly.",
      hints: [
        "Product quantisation: split the feature vector into G groups, each quantised independently, with G times V total codes (V = codebook size per group).",
        "The Gumbel-softmax allows differentiable sampling through the discrete codebook selection during training.",
      ],
    },
    {
      id: "q-aud-ex7-2",
      type: "true-false",
      difficulty: "easy",
      question: "wav2vec 2.0 requires transcribed speech data for pre-training, since the contrastive objective aligns encoder representations with ground-truth phoneme labels.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "wav2vec 2.0's contrastive pretraining is fully self-supervised: it requires only raw unlabelled audio. The targets are quantised versions of the model's own CNN features (not phoneme labels). Transcribed data is only needed for fine-tuning the transformer with CTC loss on the downstream ASR task.",
      hints: [
        "Self-supervised means the training signal comes from the data itself — no human labels needed for pre-training.",
        "The quantised codes are learned automatically; they cluster into speech units that resemble phonemes, but without phoneme labels.",
      ],
    },
    {
      id: "q-aud-ex7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "data2vec (Baevski et al., 2022) generalises wav2vec 2.0's pretraining approach to audio, vision, and text. What is the key change data2vec makes to the prediction target?",
      options: [
        "It predicts quantised discrete codes from an offline codebook, as in wav2vec 2.0",
        "It predicts continuous contextualized representations from the top K layers of an exponential moving average (EMA) teacher model, rather than discrete codes",
        "It predicts the raw waveform samples for masked frames, using an L1 reconstruction loss",
        "It predicts MFCC features of masked frames using a regression head added to the transformer output",
      ],
      correctAnswer: 1,
      explanation: "data2vec replaces discrete quantised targets with continuous targets: the EMA teacher (a slowly updated copy of the student model) processes the full unmasked input and provides top-K layer averaged representations as regression targets. The student (with masked input) must predict these contextualised representations via smooth L2 loss, avoiding codebook collapse and enabling a unified framework across modalities.",
      hints: [
        "EMA teacher: weights are updated as theta_teacher = m times theta_teacher plus (1-m) times theta_student, making the teacher a stable, slowly evolving version of the student.",
        "Continuous targets (L2 loss) are smoother than discrete targets (cross-entropy) and avoid the codebook collapse problem that discrete quantisation can suffer.",
      ],
    },
  ],
  "beat-tracking": [
    {
      id: "q-aud-ex8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Beat tracking in music aims to identify the regular pulse at which a listener would tap their foot. Dynamic programming-based beat trackers (e.g., Ellis 2007) combine:",
      options: [
        "A mel spectrogram classifier and a Viterbi decoder over phoneme states",
        "A novelty function (onset detection function, e.g., spectral flux) with a dynamic programming step that finds a sequence of beat times maximising onset strength while penalising deviations from a tempo-consistent inter-beat interval",
        "A trained speaker identification model repurposed for tempo estimation",
        "A Fourier transform of the waveform envelope to find the dominant low-frequency periodicity",
      ],
      correctAnswer: 1,
      explanation: "Beat tracking: (1) compute onset detection function (ODF) — spectral flux, complex domain, etc.; (2) estimate tempo from ODF autocorrelation or Fourier analysis; (3) dynamic programming finds beat sequence maximising ODF strength at beat locations subject to a tempo penalty (quadratic deviation from estimated period). This penalises tempo changes while allowing for gradual tempo drift.",
      hints: [
        "The DP ensures beat times are spaced consistently (musical metre), not just placed at every onset peak.",
        "Spectral flux ODF: measure how much the short-time spectrum changes frame-by-frame — peaks correspond to note onsets.",
      ],
    },
    {
      id: "q-aud-ex8-2",
      type: "true-false",
      difficulty: "easy",
      question: "Downbeat tracking (identifying beat 1 of each musical bar) is generally harder than beat tracking because it requires musical metre understanding and often cannot be solved by periodicity analysis of the onset function alone.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Beats occur at the lowest-level rhythmic pulse (e.g., quarter notes at 120 BPM = 2 beats/second), which is detectable via periodic onset patterns. Downbeats occur at bar boundaries (e.g., every 4 beats for 4/4 time) and are identified by musical cues like harmonic changes, stronger onsets, and rhythmic groupings — requiring higher-level musical understanding beyond simple periodicity detection.",
      hints: [
        "If you only see the onset function periodicity, all four beats in a 4/4 bar look identical; downbeats require harmonic or structural context.",
        "Models like BeatNet and DBN-based trackers use a joint beat/downbeat HMM to model the metric hierarchy explicitly.",
      ],
    },
    {
      id: "q-aud-ex8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Neural beat trackers like BeatNet and TCN-based models supersede dynamic programming approaches primarily because:",
      options: [
        "Neural models can process audio at lower sample rates, reducing computational cost",
        "Neural models learn directly from annotated beat data to detect complex rhythmic patterns (syncopation, irregular metre, expressive timing) that rule-based ODF methods fail on, while still allowing integration of temporal consistency constraints via probabilistic decoding",
        "Dynamic programming is NP-hard for beat sequences, while neural inference is polynomial",
        "Neural beat trackers produce MIDI output directly, while DP trackers only output onset times",
      ],
      correctAnswer: 1,
      explanation: "Classical DP beat trackers rely on hand-crafted onset functions that struggle with syncopated rhythms, strong expressive timing (rubato), or complex polyrhythm. Neural models (TCN, transformer-based) trained on annotated datasets learn to detect beat positions from raw or mel-spectrogram input, handling musical complexity. Probabilistic models (HMM, DBN) can then enforce rhythmic consistency on top of neural activations.",
      hints: [
        "Syncopation: onsets on the off-beat; classical onset functions see all onsets equally and do not know which to select as beats.",
        "Rubato: expressive tempo variation in classical music makes fixed-tempo DP penalties fail; neural models learn to handle this from data.",
      ],
    },
  ],
  "source-separation-advanced": [
    {
      id: "q-aud-ex9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Hybrid Transformer-based source separation models like HTDemucs combine CNN and Transformer components. What does the Transformer encoder add over the pure CNN Conv-TasNet approach?",
      options: [
        "The Transformer replaces all convolutions with attention, reducing parameter count",
        "Long-range temporal context: Transformer self-attention can model dependencies across the full song duration (minutes), capturing repetitive structure that dilated CNNs with fixed receptive fields miss",
        "The Transformer processes frequency-domain features while the CNN handles time-domain, enabling dual-domain separation",
        "Transformer encoders in HTDemucs are only applied to the first and last seconds of the track to set boundary conditions",
      ],
      correctAnswer: 1,
      explanation: "Dilated CNNs in Conv-TasNet have receptive fields limited by dilation depth (seconds of context). HTDemucs (Defossez, 2023) processes audio in both time and frequency domains and inserts cross-domain Transformer layers that attend over the full sequence, capturing long-range repetitions (verse-chorus structure, repeated riffs) critical for coherent multi-minute source separation.",
      hints: [
        "A song's verse may repeat 4 minutes later; dilated CNN receptive field of ~15s cannot capture this context.",
        "Cross-domain: the Transformer bridges time-domain and STFT-domain representations, exploiting complementary information from both.",
      ],
    },
    {
      id: "q-aud-ex9-2",
      type: "true-false",
      difficulty: "medium",
      question: "Audio source separation models trained with Permutation Invariant Training (PIT) can handle an arbitrary and unknown number of simultaneously active sources during inference.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Standard PIT is defined over a fixed number of output sources S: the model outputs exactly S channels and PIT finds the optimal assignment of reference sources to outputs. When the number of active sources is unknown or variable, separate mechanisms are needed: recursive (sequential) separation, iterative estimation, or attractor-based methods (e.g., DPRNN with dynamic speaker counting). A fixed-S PIT model cannot natively handle variable-S scenarios.",
      hints: [
        "PIT minimises over S! permutations — this is defined only when both the number of outputs and references are exactly S.",
        "For cocktail party problems with unknown speakers, methods like DPRNN with end-of-sequence tokens extend separation to variable speaker counts.",
      ],
    },
  ],
  "audio-fingerprinting": [
    {
      id: "q-aud-ex10-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Audio fingerprinting systems like Shazam identify recordings by matching compact hash codes extracted from audio. The Shazam algorithm extracts fingerprints by:",
      options: [
        "Computing MFCCs and comparing them against stored templates using DTW",
        "Finding local spectral peaks (time-frequency constellation points) in the spectrogram and hashing pairs of peaks (anchor point + target point) with their time offset into a compact fingerprint database",
        "Training a neural network to embed audio clips into a fixed-size vector and retrieving by approximate nearest-neighbour search",
        "Computing the autocorrelation function of the audio signal and storing its peak positions as a fingerprint",
      ],
      correctAnswer: 1,
      explanation: "Shazam (Wang 2003) identifies peaks in the time-frequency spectrogram (constellation map), then forms combinatorial hashes from pairs of peaks: (f1, f2, delta_t) — two peak frequencies and their time difference. These hashes are robust to noise, time offsets, and compression artefacts. Matching involves looking up query hashes in a database and finding the recording with consistent time-offset matches.",
      hints: [
        "Constellation map: sparse set of spectrally prominent peaks that are robust to distortion — most audio details are discarded.",
        "The hash encodes (f_anchor, f_target, t_target minus t_anchor) — time difference encodes relative timing, making the fingerprint shift-invariant.",
      ],
    },
    {
      id: "q-aud-ex10-2",
      type: "true-false",
      difficulty: "easy",
      question: "Neural audio fingerprinting systems (e.g., Neural Audio Fingerprint, 2021) use contrastive learning to train a compact embedding that is robust to audio degradations such as background noise, codec compression, and band-pass filtering.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Neural Audio Fingerprint (Chang et al., 2021) applies contrastive learning: augmented versions of the same audio segment (with noise, codec, EQ distortions) are pushed together in embedding space, while embeddings from different segments are pushed apart. This learns a representation that is invariant to real-world audio degradations, enabling robust song identification from noisy query clips.",
      hints: [
        "Contrastive learning: positive pairs are augmented versions of the same segment; negatives are different segments from the batch.",
        "Neural fingerprints achieve higher accuracy than Shazam-style spectral peaks in highly degraded conditions (very noisy environments).",
      ],
    },
    {
      id: "q-aud-ex10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Chord recognition from audio is challenging because the same chord (e.g., C major) can be voiced differently (different inversions, octave doublings, timbre) while functionally equivalent. Modern chord recognition systems handle this by:",
      options: [
        "Requiring all training recordings to use root position voicings to eliminate ambiguity",
        "Using chroma features (pitch class profiles summed over octaves) as input to temporal models (CRF, BLSTM) that learn chord-to-chroma mappings while using HMM smoothing to enforce musical chord transition probabilities",
        "Detecting MIDI note events with a piano transcription model and mapping note sets to chord labels via a lookup table",
        "Training separate chord classifiers for each instrument timbre (guitar, piano, vocal) and combining their outputs by majority vote",
      ],
      correctAnswer: 1,
      explanation: "Chroma features aggregate energy across all octaves into 12 pitch classes (C, C#, D, ..., B), collapsing octave information but retaining harmonic content. BLSTM or Transformer models process chroma sequences, learning chord-to-chroma templates. CRF or HMM output layers enforce musically plausible chord transitions (e.g., high probability of C to G, low probability of C to F#dim). Combining acoustic features with language model priors is key to robust chord recognition.",
      hints: [
        "Chroma: collapse the spectrogram vertically by summing all octave multiples of each pitch — C4 and C5 contribute to the same chroma bin.",
        "Chord transitions follow musical grammar (tonal harmony); modelling these transitions with HMM/CRF significantly improves accuracy.",
      ],
    },
  ],
};

Object.assign(questions, extraAudioQuestions);

const extraAudioQuestions2: Record<string, Question[]> = {
  "hubert-data2vec-advanced": [
    {
      id: "q-aud-ex11-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "HuBERT uses offline k-means clustering to generate pseudo-labels for masked prediction. A critical failure mode during training is cluster collapse. What causes this and how is it prevented?",
      options: [
        "Cluster collapse occurs when the transformer outputs zero vectors; it is prevented by adding batch normalisation after each attention layer",
        "Cluster collapse occurs when all frames are assigned to the same cluster, typically due to trivial solutions where the CNN encoder outputs near-constant features; it is mitigated by initialising k-means on diverse acoustic features (MFCCs) and using multiple codebooks",
        "Cluster collapse is caused by gradient overflow in the transformer; gradient clipping with max norm 1.0 prevents it",
        "Cluster collapse is unique to contrastive methods and cannot occur in masked prediction frameworks like HuBERT",
      ],
      correctAnswer: 1,
      explanation: "If k-means clusters degenerate (all frames assigned one cluster), every masked frame has the same pseudo-label and the cross-entropy loss provides no discriminative signal. HuBERT mitigates this by: (1) using MFCCs as input to the first k-means iteration (diverse features prevent trivial initialisation), (2) iteratively recomputing clusters on better representations, and (3) using multiple codebooks at different layers to provide complementary pseudo-labels.",
      hints: [
        "Trivial solution: CNN encoder outputs a constant feature vector regardless of input — all k-means clusters collapse to one centroid.",
        "MFCC-based first-iteration clusters are acoustically diverse (different phonemes cluster separately), providing a good starting point that avoids collapse.",
      ],
    },
    {
      id: "q-aud-ex11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The masking strategy in HuBERT applies contiguous block masking (masking spans of consecutive frames) rather than independent random frame masking. Why is span masking preferred?",
      options: [
        "Span masking is computationally cheaper because it requires fewer masked positions to be predicted",
        "Span masking forces the model to reconstruct longer acoustic units (phoneme or syllable-length spans), preventing the model from using neighbouring unmasked frames as a shortcut to predict the immediately adjacent masked frame",
        "Span masking is required by the k-means clustering algorithm which can only generate cluster labels for contiguous segments",
        "Span masking is identical to BERT's token masking — the choice has no practical effect on downstream performance",
      ],
      correctAnswer: 1,
      explanation: "Independent random masking would leave most masked frames surrounded by unmasked neighbours; a simple interpolation of adjacent features would suffice for prediction, requiring no genuine contextual understanding. Span masking (masking contiguous blocks of ~10 frames, ~100ms) forces the model to integrate longer-range context to reconstruct the entire masked region — learning richer representations analogous to predicting masked words in BERT rather than isolated characters.",
      hints: [
        "If frame t-1 and t+1 are visible and t is masked, linear interpolation may achieve low loss without any learning.",
        "100ms span covers roughly one phoneme; predicting an entire phoneme's frames from context requires understanding surrounding phoneme boundaries.",
      ],
    },
    {
      id: "q-aud-ex11-3",
      type: "true-false",
      difficulty: "medium",
      question: "Self-supervised audio models like wav2vec 2.0 and HuBERT, when fine-tuned with only 10 minutes of labelled speech, can achieve competitive word error rates compared to supervised models trained on 100+ hours of labelled data.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "A key result of wav2vec 2.0 and HuBERT is extreme label efficiency: fine-tuning a large pre-trained model on 10 minutes of transcribed speech achieves WERs competitive with supervised baselines using >100 hours of labelled data. For example, HuBERT Large fine-tuned on 10 min of LibriSpeech achieves ~3.4% WER on test-clean, while a comparable supervised-only model requires ~100x more labelled data to match this.",
      hints: [
        "Pre-training on thousands of hours of unlabelled speech learns general phonetic representations; only fine-tuning needs labels.",
        "10 minutes ~ 600 utterances — dramatically fewer than traditional ASR systems require for acoustic model training.",
      ],
    },
  ],
};

Object.assign(questions, extraAudioQuestions2);

export default questions;
