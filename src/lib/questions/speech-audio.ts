import type { Question } from '@/lib/curriculum'

const questions: Record<string, Question[]> = {
  // ── aud-kp-1: Acoustic Models and Feature Extraction (MFCC, Mel Spectrogram) ──
  'acoustic-models': [
    {
      id: 'q-aud-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Mel-Frequency Cepstral Coefficients (MFCCs) are designed to mimic human auditory perception by:',
      options: [
        'Using a linear frequency scale to represent all frequencies equally',
        'Applying a mel-scale filterbank that compresses high frequencies, matching the ear\'s logarithmic frequency sensitivity',
        'Computing the raw Fourier transform magnitudes at fixed 100 Hz intervals',
        'Encoding the phase information of the speech signal using sinusoidal basis functions',
      ],
      correctAnswer: 1,
      explanation: 'The mel scale is a perceptually motivated frequency scale where equal spacing corresponds to equal perceived pitch differences; the filterbank applies wider filters at high frequencies, reflecting that human hearing is less sensitive to fine frequency distinctions there.',
      hints: [
        'Humans perceive pitch changes more finely at low frequencies—how should the filterbank spacing reflect this?',
        'The word "mel" comes from the word "melody"—it is a perceptual, not physical, scale.',
      ],
    },
    {
      id: 'q-aud-kp1-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The discrete cosine transform (DCT) step in MFCC computation is used to decorrelate the log mel filterbank energies, producing compact and approximately uncorrelated coefficients.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Adjacent mel filterbank channels overlap and are correlated; the DCT projects the log-energy vector into a space where most information is concentrated in the first ~13 coefficients and the coefficients are nearly decorrelated, making MFCCs compact features for downstream models.',
      hints: [
        'Correlated features waste model capacity—decorrelation concentrates information into fewer dimensions.',
        'The DCT is related to the PCA of the filterbank energies under certain assumptions.',
      ],
    },
    {
      id: 'q-aud-kp1-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A mel spectrogram differs from an MFCC in that it:',
      options: [
        'Uses a linear frequency scale instead of the mel scale',
        'Retains the log-power representation after the mel filterbank without applying the DCT, preserving richer spectral shape information',
        'Is computed from the raw waveform using 1D convolutions rather than short-time Fourier transform',
        'Includes phase information discarded during MFCC computation',
      ],
      correctAnswer: 1,
      explanation: 'A mel spectrogram is simply the log-power output of the mel filterbank (STFT magnitude → mel filterbank → log), stopping before the DCT; it is higher-dimensional than MFCCs but retains full spectral shape, making it preferred as input for deep learning models.',
      hints: [
        'MFCCs add one more step beyond the log-mel filterbank output—what step is that?',
        'Deep neural networks can learn their own compression; they do not need the DCT\'s manual decorrelation.',
      ],
    },
  ],

  // ── aud-kp-2: HMM-based ASR and Viterbi Decoding ─────────────────────────
  'hmm-asr': [
    {
      id: 'q-aud-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a traditional HMM-based ASR system, the acoustic model represents:',
      options: [
        'The probability of a word sequence given the acoustic observation sequence',
        'The probability of observing acoustic features (e.g., MFCCs) given a phoneme state',
        'The language model probability of word sequences in a given language',
        'The mapping from graphemes (letters) to phonemes using a pronunciation dictionary',
      ],
      correctAnswer: 1,
      explanation: 'The acoustic model (emission probability) in HMM-ASR estimates P(observations | phoneme state); combined with the transition model and language model, this forms the basis for MAP decoding of the most likely word sequence.',
      hints: [
        'ASR uses Bayes\' rule: the acoustic model provides P(features | words), the language model provides P(words).',
        'The acoustic model encodes what each phoneme "sounds like" in feature space.',
      ],
    },
    {
      id: 'q-aud-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In HMM-based ASR, Gaussian Mixture Models (GMMs) were historically used as emission distributions because they can approximate arbitrary continuous distributions over MFCC feature vectors.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'GMMs model P(MFCCs | HMM state) as a weighted sum of Gaussians, allowing flexible approximation of the typically non-Gaussian acoustic feature distributions for each phoneme state; they were the dominant acoustic modelling approach before DNNs.',
      hints: [
        'MFCC distributions per phoneme are multimodal (different speakers, contexts)—why would a single Gaussian be insufficient?',
        'A mixture of K Gaussians can approximate any smooth density with enough components.',
      ],
    },
    {
      id: 'q-aud-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In the Viterbi algorithm for HMM decoding in ASR, the "trellis" represents:',
      options: [
        'The full word lattice of possible transcriptions ranked by acoustic score',
        'A dynamic programming table storing the probability of the most likely partial path ending in each state at each time step',
        'The confusion matrix of phoneme substitution errors from the acoustic model',
        'The graph of all possible phone sequences in the pronunciation lexicon',
      ],
      correctAnswer: 1,
      explanation: 'The Viterbi trellis is a (states × time) matrix where each cell stores the maximum probability of any path reaching that state at that time and a back-pointer to trace the optimal path; this enables O(T × S²) decoding instead of exponential enumeration.',
      hints: [
        'Dynamic programming avoids re-computing sub-problems—what sub-problem does each trellis cell encode?',
        'The back-pointer in each cell traces which previous state led to the maximum probability.',
      ],
    },
  ],

  // ── aud-kp-3: CTC Loss and Sequence-to-Sequence ASR ──────────────────────
  'ctc-loss': [
    {
      id: 'q-aud-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The main problem that CTC (Connectionist Temporal Classification) loss solves in ASR is:',
      options: [
        'Reducing the memory requirements of training large transformer models',
        'Enabling training without requiring frame-level alignments between acoustic features and phoneme labels',
        'Improving beam search decoding speed by pruning the hypothesis space',
        'Preventing overfitting by acting as a regularisation term on the output distribution',
      ],
      correctAnswer: 1,
      explanation: 'CTC marginalises over all valid alignments between the variable-length input sequence and the shorter output label sequence, eliminating the need for the expensive forced-alignment step required in HMM-GMM training.',
      hints: [
        'Traditional HMM training needed explicit frame-to-phoneme alignment labels—how does CTC avoid this?',
        'CTC sums the probability over all "valid" ways to collapse the output to the target sequence.',
      ],
    },
    {
      id: 'q-aud-kp3-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'CTC uses a special blank token in the output alphabet; consecutive repeated characters or characters separated only by blanks collapse to the same label, enabling multiple frames to emit the same phoneme.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'The CTC collapsing rule removes consecutive repeated tokens and then removes blanks, so "a-blank-a-a" collapses to "aa" (two a\'s) while "a-a-blank-a" also collapses to "aa"; this allows multiple-frame emissions without explicit segmentation.',
      hints: [
        'Without the blank token, how would CTC distinguish "aa" from a single "a" emitted over two frames?',
        'The blank acts as an "I am still in the same label" signal across time steps.',
      ],
    },
    {
      id: 'q-aud-kp3-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Attention-based encoder-decoder models for ASR differ from CTC models primarily in that:',
      options: [
        'Attention models process audio in real time while CTC requires the full utterance',
        'Attention models learn a soft, learnable alignment between encoder states and output tokens, enabling richer context and better handling of long-range dependencies',
        'Attention models output phoneme sequences while CTC outputs word sequences directly',
        'Attention models require no language model during decoding while CTC always requires one',
      ],
      correctAnswer: 1,
      explanation: 'Attention-based seq2seq models compute a dynamic weighted combination of all encoder states at each decoding step, learning a soft alignment; this enables better handling of long utterances and cross-lingual phenomena compared to CTC\'s conditional independence assumption.',
      hints: [
        'CTC assumes conditional independence between output frames given the input—what does attention relax?',
        'The attention mechanism lets the decoder "look back" at any part of the encoded audio when generating each output token.',
      ],
    },
  ],

  // ── aud-kp-4: Whisper and Large-Scale ASR Pretraining ────────────────────
  'whisper-model': [
    {
      id: 'q-aud-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Whisper (OpenAI) achieves strong multilingual ASR performance primarily because of:',
      options: [
        'A novel recurrent architecture specifically designed for streaming audio',
        'Weak supervision at scale: training on 680,000 hours of multilingual audio-transcript pairs collected from the internet',
        'Using a language model trained on 100B tokens to re-score ASR hypotheses',
        'Applying data augmentation with adversarial noise during every training step',
      ],
      correctAnswer: 1,
      explanation: 'Whisper\'s key contribution is scale and diversity: training on 680k hours of internet-sourced multilingual audio with paired transcripts provides enough coverage of accents, languages, and conditions to generalise robustly without task-specific fine-tuning.',
      hints: [
        'Previous ASR systems required careful domain-specific data curation—what did Whisper trade this for?',
        'The transcripts used for supervision were not manually labelled but collected from existing aligned audio-text sources.',
      ],
    },
    {
      id: 'q-aud-kp4-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Whisper uses a standard encoder-decoder transformer architecture, where the encoder processes mel spectrogram frames and the decoder autoregressively generates text tokens.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Whisper applies a standard transformer encoder to the mel spectrogram and a causal transformer decoder to generate transcription tokens; special tokens encode the task (transcribe vs. translate), language, and timestamp mode.',
      hints: [
        'The architecture is deliberately standard—Whisper\'s novelty is in the data and training setup, not novel architecture components.',
        'Task and language are communicated to the decoder via special prefix tokens, not separate model components.',
      ],
    },
    {
      id: 'q-aud-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key limitation of Whisper in practical deployment is:',
      options: [
        'It cannot handle audio longer than 10 seconds without special chunking',
        'Its real-time factor is too slow for real-time streaming on most consumer hardware without optimisation',
        'It only supports English transcription despite being trained on multilingual data',
        'It requires manually provided word-level timestamps to produce accurate transcriptions',
      ],
      correctAnswer: 1,
      explanation: 'Whisper\'s larger models (medium, large) require significant GPU compute; achieving real-time transcription on CPU or resource-constrained hardware requires distillation (e.g., Whisper Distil) or quantisation techniques.',
      hints: [
        'Whisper large-v3 has 1.5B parameters—what does inference speed look like on a CPU?',
        'The 30-second chunking constraint (answer A) exists but is addressable via sliding window; compute is a harder constraint.',
      ],
    },
  ],

  // ── aud-kp-5: Language Model Rescoring and Beam Search ───────────────────
  'language-model-rescoring': [
    {
      id: 'q-aud-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In ASR beam search decoding, the "beam width" controls:',
      options: [
        'The frequency range of acoustic features considered by the decoder',
        'The number of partial hypotheses (candidate transcriptions) retained at each decoding step',
        'The maximum allowed length of the output transcription',
        'The interpolation weight between acoustic and language model scores',
      ],
      correctAnswer: 1,
      explanation: 'Beam search keeps the top-B hypotheses at each step; B=1 is greedy decoding, larger B explores more of the search space at greater computational cost, trading off speed for transcription accuracy.',
      hints: [
        'Larger beam width increases accuracy (closer to exhaustive search) but also increases memory and compute.',
        'Think about what "beam" metaphorically means—a narrow beam vs. a wide beam of light.',
      ],
    },
    {
      id: 'q-aud-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Shallow fusion in ASR combines acoustic model scores with language model scores at every beam search step by simple log-probability addition, whereas deep fusion integrates the LM into the acoustic model training.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Shallow fusion adds λ·log P_LM(w) to the acoustic log-score at each step during decoding (no retraining required); deep fusion (and cold/warm fusion variants) incorporates LM hidden states into the end-to-end model during training for tighter integration.',
      hints: [
        'Shallow fusion is "plug-in"—no model retraining needed, just score interpolation at decode time.',
        'Deep fusion requires modifying and retraining the acoustic model to accept LM representations as additional input.',
      ],
    },
    {
      id: 'q-aud-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'N-best list rescoring with a neural LM differs from shallow fusion in that:',
      options: [
        'N-best rescoring uses a larger beam width than shallow fusion',
        'The LM is applied only after beam search completes, reranking a fixed set of complete hypotheses rather than influencing the search trajectory',
        'N-best rescoring trains the LM and acoustic model jointly on paired audio-text data',
        'N-best rescoring uses character-level LMs while shallow fusion uses word-level LMs',
      ],
      correctAnswer: 1,
      explanation: 'N-best rescoring runs beam search with the acoustic model alone to produce the top-N complete transcriptions, then re-scores each with a (potentially slow) neural LM; the final hypothesis is the highest-scoring after LM rescoring, without the LM affecting search directions.',
      hints: [
        'Shallow fusion requires the LM to score partial hypotheses in real time—N-best rescoring avoids this constraint.',
        'A large neural LM that is too slow for step-by-step beam search can still be used for post-hoc rescoring.',
      ],
    },
  ],

  // ── aud-kp-6: Tacotron and Sequence-to-Sequence TTS ──────────────────────
  'tacotron': [
    {
      id: 'q-aud-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Tacotron 2\'s core architecture converts text to:',
      options: [
        'Raw audio waveform samples at 24kHz directly from character embeddings',
        'Mel spectrogram frames autoregressively, which are then converted to audio by a separate vocoder',
        'Phoneme duration labels used to drive a concatenative synthesiser',
        'A sequence of MFCC coefficients fed into an HMM-based vocoder',
      ],
      correctAnswer: 1,
      explanation: 'Tacotron 2 uses an attention-based encoder-decoder to produce mel spectrogram frames from character or phoneme input, then passes the predicted mel spectrogram through a WaveNet vocoder to generate the final audio waveform.',
      hints: [
        'Tacotron 2 is a two-stage system: spectrogram synthesis then waveform synthesis.',
        'The mel spectrogram is an intermediate representation—which separately trained model converts it to audio?',
      ],
    },
    {
      id: 'q-aud-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Tacotron uses location-sensitive attention to prevent common failure modes such as attention jumping backward or skipping words during synthesis.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Location-sensitive attention incorporates the previous attention distribution as a convolutional feature, encouraging monotonically advancing alignment and reducing failure modes like repeated phonemes or skipped words common in content-based attention.',
      hints: [
        'Standard attention can focus anywhere—why is monotonic, left-to-right attention preferable for TTS?',
        'Location-based features encode "where attention was previously" to bias toward moving forward in the input sequence.',
      ],
    },
    {
      id: 'q-aud-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "stop token" in Tacotron 2 is trained to predict:',
      options: [
        'The probability that the current mel frame contains a silent segment',
        'The probability that the current decoding step is the last frame of the spectrogram, signalling end of synthesis',
        'The confidence score of the attention alignment at each decoder step',
        'The probability of a breath or pause in the synthesised speech',
      ],
      correctAnswer: 1,
      explanation: 'Tacotron 2 trains a binary stop token classifier at each decoder step that predicts whether synthesis should terminate; this replaces fixed-length output, enabling variable-length synthesis without prior knowledge of utterance duration.',
      hints: [
        'The decoder generates frames until something tells it to stop—without a stop token, how would you know when to end?',
        'The stop token is trained on the final frame position label from the training data.',
      ],
    },
  ],

  // ── aud-kp-7: Neural Vocoders: WaveNet, WaveGlow, HiFi-GAN ───────────────
  'vocoders': [
    {
      id: 'q-aud-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'WaveNet generates audio by:',
      options: [
        'Transforming a mel spectrogram using Griffin-Lim phase reconstruction',
        'Autoregressively predicting each audio sample conditioned on all previous samples and optional conditioning features',
        'Applying an inverse short-time Fourier transform to a predicted complex spectrogram',
        'Sampling from a uniform distribution and reshaping with a normalising flow',
      ],
      correctAnswer: 1,
      explanation: 'WaveNet is an autoregressive model using dilated causal convolutions to model P(x_t | x_{<t}, c), where c is optional conditioning (e.g., mel spectrogram); it achieves high quality but is slow to generate because each sample depends on all prior samples.',
      hints: [
        'Autoregressive means each output depends on previous outputs—why does this make generation slow?',
        'Dilated convolutions expand the receptive field exponentially without proportionally increasing parameters.',
      ],
    },
    {
      id: 'q-aud-kp7-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'HiFi-GAN achieves faster-than-real-time audio synthesis by using a generator with multi-receptive field fusion and discriminators that operate at multiple resolutions and periods.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'HiFi-GAN\'s generator uses multi-receptive field fusion (parallel dilated convolutions with different kernel sizes) for high-quality mel inversion; its multi-period and multi-scale discriminators enforce both fine-grained and macro-level waveform quality, enabling high-fidelity synthesis at high speed.',
      hints: [
        'GAN-based vocoders generate all samples in a single forward pass, unlike autoregressive models—how does this affect speed?',
        'Multiple discriminator periods (2, 3, 5, 7, 11) ensure the generator cannot exploit blind spots in any single discriminator.',
      ],
    },
    {
      id: 'q-aud-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'WaveGlow uses a normalising flow architecture for vocoding. During inference, the flow is:',
      options: [
        'Run forward (audio → latent noise) to encode a reference utterance for speaker adaptation',
        'Run in reverse (latent noise → audio) conditioned on the mel spectrogram to generate a waveform in a single pass',
        'Applied iteratively using the same forward direction until convergence',
        'Used only for training; inference falls back to Griffin-Lim phase reconstruction',
      ],
      correctAnswer: 1,
      explanation: 'Normalising flows are bijective; training maps audio to a simple noise distribution (forward pass), while inference samples noise and runs the inverse transform conditioned on the mel spectrogram, generating audio in a single non-autoregressive pass.',
      hints: [
        'Flows learn an invertible mapping between the data distribution and a simple prior—which direction is used for generation?',
        'Because the flow is non-autoregressive, all audio samples are generated simultaneously, enabling fast inference.',
      ],
    },
  ],

  // ── aud-kp-8: FastSpeech and Non-Autoregressive TTS ──────────────────────
  'fastspeech': [
    {
      id: 'q-aud-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'FastSpeech 2 eliminates the need for a teacher model (unlike FastSpeech 1) by:',
      options: [
        'Using a pre-trained BERT model to initialise the encoder',
        'Extracting duration, pitch, and energy directly from the training data using a Montreal Forced Aligner and signal processing',
        'Training on 10x more data than FastSpeech 1 to compensate for the lack of knowledge distillation',
        'Replacing the transformer encoder with a conformer block that captures local acoustic patterns',
      ],
      correctAnswer: 1,
      explanation: 'FastSpeech 1 required a Tacotron teacher to extract phone durations via attention; FastSpeech 2 uses an MFA-derived duration aligner and extracts fundamental frequency (F0) and energy from ground-truth audio directly, removing the teacher dependency.',
      hints: [
        'FastSpeech 1\'s attention-extracted durations were noisy because they came from a teacher\'s soft attention.',
        'Montreal Forced Aligner provides forced-alignment durations directly from audio-text pairs.',
      ],
    },
    {
      id: 'q-aud-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Non-autoregressive TTS models like FastSpeech generate mel spectrogram frames in parallel, making synthesis much faster than autoregressive models at the cost of some naturalness.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'FastSpeech predicts all mel frames simultaneously (after length regulation to match predicted phoneme durations), enabling GPU-parallel inference that is orders of magnitude faster than autoregressive decoding, with marginal quality loss on most benchmarks.',
      hints: [
        'Autoregressive models generate one frame at a time sequentially—how does parallel generation change wall-clock inference time?',
        'The quality trade-off exists because non-autoregressive models lose fine-grained sequential dependencies.',
      ],
    },
    {
      id: 'q-aud-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The length regulator in FastSpeech maps phoneme-level encoder outputs to frame-level decoder inputs by:',
      options: [
        'Applying a learned linear projection that changes the temporal resolution',
        'Repeating each phoneme encoder output according to the predicted phoneme duration in frames',
        'Using cross-attention between phoneme encodings and a fixed temporal grid',
        'Inserting learnable positional embeddings between phoneme boundaries',
      ],
      correctAnswer: 1,
      explanation: 'The length regulator duplicates each phoneme\'s encoder representation by its predicted (or ground-truth) duration in frames, expanding the phoneme-length sequence into a frame-length sequence that the decoder can use for parallel mel generation.',
      hints: [
        'The encoder has one vector per phoneme; the decoder needs one vector per output frame—how do you bridge this length mismatch?',
        'If phoneme /a/ lasts 5 frames, its encoder output is simply replicated 5 times in the frame-level sequence.',
      ],
    },
  ],

  // ── aud-kp-9: Voice Cloning and Speaker Adaptation ───────────────────────
  'voice-cloning': [
    {
      id: 'q-aud-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Few-shot voice cloning systems (e.g., SV2TTS) adapt a multi-speaker TTS model to a new speaker by:',
      options: [
        'Retraining all model weights from scratch on 10–30 seconds of target speaker audio',
        'Computing a speaker embedding from a short target-speaker reference clip and conditioning the TTS model on it',
        'Replacing the vocoder with a speaker-specific unit trained on 24 hours of data',
        'Applying a post-processing equalizer to match the target speaker\'s formant frequencies',
      ],
      correctAnswer: 1,
      explanation: 'Few-shot cloning encodes the target speaker\'s voice characteristics into a fixed-dimensional embedding using a pretrained speaker encoder, then conditions the mel spectrogram synthesiser on this embedding—no fine-tuning of the TTS model is required.',
      hints: [
        'If you needed to retrain the whole model, "few-shot" would be impractical—what is the fast alternative?',
        'A speaker encoder maps raw audio to a point in speaker space that captures voice identity.',
      ],
    },
    {
      id: 'q-aud-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Speaker adaptation via fine-tuning on target speaker data (many-shot cloning) generally produces higher similarity to the target voice than zero-shot embedding-based approaches, at the cost of requiring more data and computation.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Fine-tuning updates model weights specifically for the target speaker, capturing fine-grained prosodic and acoustic idiosyncrasies that a fixed embedding cannot fully encode; however, it requires minutes-to-hours of training data and GPU time per new speaker.',
      hints: [
        'A fixed embedding vector has limited capacity compared to updating millions of model parameters.',
        'Zero-shot approaches are faster to deploy but compress speaker identity into a single vector.',
      ],
    },
    {
      id: 'q-aud-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Natural language processing of the input text in voice cloning systems is important because:',
      options: [
        'Homographs (e.g., "read" as present vs. past tense) require contextual disambiguation for correct pronunciation',
        'TTS models encode text directly as Unicode code points without any text normalisation',
        'Language model scores are used to re-rank synthesised audio during generation',
        'Phoneme lookup dictionaries are not needed when transformer encoders are used',
      ],
      correctAnswer: 0,
      explanation: 'Correct pronunciation depends on part-of-speech context: "read" (reed) vs "read" (red), "lead" (leed) vs "lead" (led); text analysis (tokenisation, POS tagging, grapheme-to-phoneme conversion) ensures correct pronunciation in synthesised speech.',
      hints: [
        'A voice cloning system that mispronounces context-dependent words sounds unnatural regardless of voice quality.',
        'G2P (grapheme-to-phoneme) conversion is the standard step that maps written words to phoneme sequences.',
      ],
    },
  ],

  // ── aud-kp-10: Zero-Shot TTS and VALL-E ───────────────────────────────────
  'zero-shot-tts': [
    {
      id: 'q-aud-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'VALL-E (Microsoft) models TTS as a language modelling problem by:',
      options: [
        'Directly predicting mel spectrogram frames using a standard autoregressive transformer',
        'Predicting discrete audio codec tokens (from EnCodec) autoregressively, conditioned on text and a 3-second speaker prompt',
        'Using a diffusion model to iteratively refine a noisy mel spectrogram into clean speech',
        'Applying BERT-style masked prediction to audio tokens to recover the full utterance',
      ],
      correctAnswer: 1,
      explanation: 'VALL-E frames TTS as in-context learning: it tokenises audio with EnCodec into discrete codes, then trains an autoregressive language model to predict these codes conditioned on text tokens and a short speaker prompt, enabling zero-shot speaker generalisation.',
      hints: [
        'The key insight is that discrete audio tokens behave like text tokens—what well-established architecture handles sequences of discrete tokens?',
        'The 3-second prompt provides the voice "context" analogous to a few-shot example in a language model.',
      ],
    },
    {
      id: 'q-aud-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Zero-shot TTS systems can theoretically synthesise any speaker\'s voice from a short reference clip without any speaker-specific training, but they typically produce lower speaker similarity than fine-tuned systems.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Zero-shot systems generalise across speakers seen during large-scale training but cannot fully capture every nuance of an unseen speaker\'s voice from a 3–10 second clip; fine-tuned systems that update weights for a specific speaker achieve higher similarity at the cost of per-speaker training.',
      hints: [
        'A short reference clip constrains how much speaker information can be extracted.',
        'Fine-tuning provides a much richer adaptation signal than a single forward-pass encoding of the reference.',
      ],
    },
    {
      id: 'q-aud-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The hierarchical codec language modelling in VALL-E uses two stages because:',
      options: [
        'The first stage generates coarse (low-bitrate) audio codec codes; the second stage refines them with fine-grained (high-bitrate) residual codes for full fidelity',
        'The first stage predicts phoneme durations; the second stage predicts mel spectrograms',
        'The two stages correspond to speaker identity and linguistic content modelled separately',
        'The first stage uses a causal transformer; the second stage uses bidirectional attention for better context',
      ],
      correctAnswer: 0,
      explanation: 'EnCodec uses residual vector quantisation with multiple codebook layers; VALL-E predicts the first (coarsest) codebook tokens autoregressively for speaker and prosody, then uses a non-autoregressive model to fill in the remaining residual codebooks that add acoustic detail.',
      hints: [
        'Residual VQ encodes audio at progressively finer detail in successive codebooks—which level captures the most speaker-relevant structure?',
        'The first codebook captures the broadest acoustic properties; later codebooks refine acoustic quality.',
      ],
    },
  ],

  // ── aud-kp-11: wav2vec 2.0 and Self-Supervised Speech Representations ─────
  'wav2vec': [
    {
      id: 'q-aud-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'wav2vec 2.0 learns speech representations by:',
      options: [
        'Training on paired audio-transcript data using CTC loss from the start',
        'Masking portions of latent speech representations and training the model to identify the correct quantised representation among distractors via contrastive loss',
        'Predicting the next audio frame from all previous frames using autoregressive decoding',
        'Using knowledge distillation from a supervised ASR model to transfer representations',
      ],
      correctAnswer: 1,
      explanation: 'wav2vec 2.0 is self-supervised: it quantises raw audio with a codebook, masks spans of the latent representations, and trains the transformer to identify the correct quantised target among a set of negative distractors via a contrastive objective—no transcripts are needed.',
      hints: [
        'Self-supervised learning creates its own supervision signal from the data—where does wav2vec 2.0 get its labels?',
        'The contrastive objective forces the model to distinguish correct masked representations from random distractors.',
      ],
    },
    {
      id: 'q-aud-kp11-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'After self-supervised pre-training, wav2vec 2.0 can be fine-tuned for ASR with as little as 10 minutes of labelled speech data and still achieve competitive word error rates.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'The rich representations learned during self-supervised pre-training on unlabelled audio encode phonetic structure; subsequent fine-tuning with CTC loss on very small labelled sets (10 min, 1 hour) achieves WERs competitive with supervised models trained on hundreds of hours.',
      hints: [
        'Pre-training on 960 hours of LibriSpeech unlabelled audio gives the model a head start—how little supervision is then needed?',
        'This is the key practical value of self-supervised learning: reducing the labelled data requirement.',
      ],
    },
    {
      id: 'q-aud-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The quantisation module in wav2vec 2.0 converts continuous latent representations to discrete codes using:',
      options: [
        'k-means clustering applied offline before training begins',
        'Gumbel-softmax to enable differentiable selection of entries from multiple codebooks (product quantisation)',
        'Hard VQ with straight-through gradient estimation and a single codebook',
        'Principal components rounded to the nearest integer value',
      ],
      correctAnswer: 1,
      explanation: 'wav2vec 2.0 uses product quantisation with Gumbel-softmax: it maintains G groups of V entries each and selects one entry per group using temperature-based soft selection that becomes approximately one-hot, allowing end-to-end gradient flow through the discrete bottleneck.',
      hints: [
        'Hard argmax is not differentiable—what technique provides a differentiable approximation to discrete selection?',
        'Product quantisation uses multiple codebooks in parallel to increase the effective codebook size exponentially.',
      ],
    },
  ],

  // ── aud-kp-12: HuBERT and Masked Prediction for Audio ────────────────────
  'hubert': [
    {
      id: 'q-aud-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'HuBERT (Hidden-Unit BERT) differs from wav2vec 2.0 in its self-supervised objective by:',
      options: [
        'Using a contrastive loss where positive and negative samples come from the same utterance',
        'Predicting offline cluster assignments (pseudo-labels from k-means) for masked frames rather than using contrastive learning',
        'Training on phoneme sequence labels extracted from a forced aligner',
        'Applying a reconstruction loss that minimises MSE between predicted and original spectrogram features',
      ],
      correctAnswer: 1,
      explanation: 'HuBERT uses a BERT-style masked prediction objective: offline k-means clusters are computed on MFCC features (or previous HuBERT representations), and the transformer must predict these cluster assignments for masked time steps—a classification loss rather than contrastive.',
      hints: [
        'BERT predicts masked tokens using a cross-entropy loss—HuBERT\'s audio analogue is predicting masked ___.',
        'The cluster labels are "pseudo-labels" because they are not human-annotated but computed automatically.',
      ],
    },
    {
      id: 'q-aud-kp12-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'HuBERT training is iterative: in the first iteration, k-means clusters are computed on MFCCs; in subsequent iterations, clusters are recomputed on the representations of the previously trained HuBERT model.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Iterative refinement improves the pseudo-label quality: MFCC-based clusters are phonetically coarse, while clusters from a trained HuBERT capture richer linguistic structure; retraining on better pseudo-labels bootstraps progressively more informative representations.',
      hints: [
        'Better teacher labels lead to a better student model—how does HuBERT improve its own teacher?',
        'This is analogous to self-training in semi-supervised learning, where the model iteratively improves its own pseudo-labels.',
      ],
    },
    {
      id: 'q-aud-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The masked prediction loss in HuBERT is computed only on masked frames (not all frames) because:',
      options: [
        'Computing loss on all frames causes gradient exploding in the transformer encoder',
        'Predicting unmasked frames is trivial (the input is visible), so the model would learn to copy rather than understand context',
        'Unmasked frames have zero gradient by definition of the cross-entropy loss',
        'The cluster assignments for unmasked frames are always incorrect due to codebook collapse',
      ],
      correctAnswer: 1,
      explanation: 'If loss were computed on all frames, the model could trivially predict the cluster label of an unmasked frame by encoding its features directly without understanding context; masking forces the model to use surrounding context to infer the hidden representation.',
      hints: [
        'BERT masks input tokens—what would happen if BERT also had to predict the tokens it can see?',
        'Learning from context (the surrounding frames) is the point; predicting what you can see is not a learning challenge.',
      ],
    },
  ],

  // ── aud-kp-13: Audio Spectrogram Transformer (AST) ───────────────────────
  'audio-spectrogram-transformer': [
    {
      id: 'q-aud-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Audio Spectrogram Transformer (AST) adapts the Vision Transformer (ViT) for audio by treating:',
      options: [
        'Raw audio waveform samples as 1D token sequences fed into a standard transformer',
        'A mel spectrogram as a 2D image, splitting it into patches that are linearly embedded as transformer input tokens',
        'MFCC coefficient sequences as word tokens in a BERT-style architecture',
        'Audio events as graph nodes connected by temporal edges in a graph transformer',
      ],
      correctAnswer: 1,
      explanation: 'AST views the mel spectrogram as a 2D time-frequency image, splits it into fixed-size overlapping patches (analogous to image patches in ViT), and processes them with a standard transformer encoder pre-trained on ImageNet via transfer learning.',
      hints: [
        'ViT splits images into patches—AST applies the same idea to spectrograms as 2D images.',
        'Time and frequency are the two axes of a spectrogram, analogous to the spatial axes of an image.',
      ],
    },
    {
      id: 'q-aud-kp13-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'AST can leverage ImageNet pre-trained ViT weights for audio classification by adapting the positional embeddings to the spectrogram patch grid via interpolation.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'AST transfers ViT weights pre-trained on ImageNet; since the patch grid shape may differ between images and spectrograms, positional embeddings are bilinearly interpolated to match the new 2D grid, enabling cross-modal transfer learning from vision to audio.',
      hints: [
        'Low-level visual features (edges, textures) learned on images may transfer to time-frequency patterns in spectrograms.',
        'Interpolating positional embeddings adapts the learned spatial structure to the new patch layout.',
      ],
    },
    {
      id: 'q-aud-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Compared to CNN-based audio classifiers, the main advantage of the attention mechanism in AST is:',
      options: [
        'Faster inference speed due to parallelism in attention computation versus sequential convolution',
        'The ability to model long-range time-frequency dependencies without the locality constraint of convolution',
        'Lower memory footprint because attention requires fewer parameters than deep CNN stacks',
        'Automatic invariance to frequency transpositions in musical instrument classification',
      ],
      correctAnswer: 1,
      explanation: 'Convolutional layers have a fixed local receptive field; attention allows every patch to directly attend to every other patch, capturing global time-frequency relationships (e.g., harmonic overtones spread across frequency) that CNNs model only after many layers.',
      hints: [
        'A CNN\'s receptive field grows with depth—how many layers are needed to model global dependencies?',
        'Attention is "all-pairs"—every input position can directly influence every output position in one layer.',
      ],
    },
  ],

  // ── aud-kp-14: Contrastive Learning for Audio (CLAP) ─────────────────────
  'contrastive-audio': [
    {
      id: 'q-aud-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'CLAP (Contrastive Language-Audio Pretraining) is analogous to CLIP but for audio. It trains by:',
      options: [
        'Predicting masked audio tokens from surrounding text tokens in a cross-modal transformer',
        'Maximising cosine similarity between matched audio-text pairs and minimising it for mismatched pairs in a shared embedding space',
        'Using audio captions as pseudo-labels to fine-tune a pre-trained audio spectrogram transformer',
        'Generating audio from text descriptions using a diffusion model and comparing outputs',
      ],
      correctAnswer: 1,
      explanation: 'CLAP trains an audio encoder and a text encoder jointly using InfoNCE contrastive loss: paired audio-text descriptions are pulled together in embedding space while unpaired combinations are pushed apart, enabling zero-shot audio classification via text queries.',
      hints: [
        'CLIP does the same for image-text pairs—CLAP is the audio-text equivalent.',
        'After training, you can classify audio by comparing its embedding to embeddings of category descriptions.',
      ],
    },
    {
      id: 'q-aud-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A CLAP-trained model can perform zero-shot audio classification by comparing the audio embedding to text embeddings of class descriptions, selecting the class with highest cosine similarity.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Because CLAP aligns audio and text in a shared semantic space, a query like "sound of a dog barking" can be encoded as text and compared to audio embeddings, enabling classification without any audio examples for those classes—just text descriptions.',
      hints: [
        'If audio and text are in the same space, finding which text label matches the audio is a nearest-neighbour search.',
        'This is the same mechanism that makes CLIP work for zero-shot image classification.',
      ],
    },
    {
      id: 'q-aud-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The InfoNCE loss used in contrastive audio-text training is defined over a mini-batch such that:',
      options: [
        'The loss sums binary cross-entropy over all positive pairs in the dataset',
        'For each anchor, the loss is the cross-entropy of a softmax over the anchor\'s similarity to its positive and all in-batch negatives, encouraging the positive to have the highest similarity',
        'The loss minimises the Wasserstein distance between audio and text embedding distributions',
        'The loss maximises mutual information between audio and text using a density-ratio estimator',
      ],
      correctAnswer: 1,
      explanation: 'InfoNCE treats each sample in the batch as a "query": it forms a softmax distribution over similarities to all other samples and maximises the probability assigned to the true positive, which is equivalent to maximising a lower bound on mutual information.',
      hints: [
        'Think of InfoNCE as an N-way classification problem per sample: which of the N audio clips matches this text?',
        'Larger batch sizes provide more negatives, making the contrastive task harder and representations richer.',
      ],
    },
  ],

  // ── aud-kp-15: Audio Tokenization: EnCodec and SoundStream ───────────────
  'audio-tokenization': [
    {
      id: 'q-aud-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'EnCodec (Meta) and SoundStream (Google) are neural audio codecs that compress audio by:',
      options: [
        'Applying MP3-style psychoacoustic masking to remove perceptually irrelevant frequency components',
        'Encoding audio through a convolutional encoder, then quantising latent representations with residual vector quantisation (RVQ), and decoding with a convolutional decoder',
        'Predicting future audio frames with a transformer and storing only the prediction errors',
        'Using discrete cosine transform coefficients rounded to 8-bit integers for efficient storage',
      ],
      correctAnswer: 1,
      explanation: 'Both EnCodec and SoundStream use a 1D CNN encoder-decoder with residual VQ (RVQ) in the latent space; RVQ applies multiple VQ layers sequentially, each quantising the residual from the previous, enabling high-quality reconstruction at low bitrates.',
      hints: [
        'Traditional codecs use hand-crafted signal processing; neural codecs learn the compression end-to-end.',
        'Residual VQ means each codebook layer encodes the error not captured by previous layers.',
      ],
    },
    {
      id: 'q-aud-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Residual Vector Quantisation (RVQ) in audio codecs uses multiple codebooks sequentially, where each codebook quantises the residual error left by the previous codebook.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'RVQ applies the first codebook to the raw latent, computes the quantisation residual, applies a second codebook to that residual, and so on; more codebook layers mean lower reconstruction error and higher bitrate (since more code indices must be transmitted).',
      hints: [
        'After the first VQ step, there is still an error signal—what does the next codebook encode?',
        'Adding more RVQ layers increases the codebook depth, allowing finer-grained reconstruction.',
      ],
    },
    {
      id: 'q-aud-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'EnCodec trains its RVQ-based codec end-to-end with a combination of losses. Which loss component ensures perceptual quality beyond simple reconstruction?',
      options: [
        'CTC loss computed between encoded tokens and phone-level transcriptions',
        'Multi-scale spectrogram reconstruction loss combined with an adversarial discriminator loss on the waveform and spectrogram',
        'KL divergence between the quantised latent distribution and a Gaussian prior',
        'Contrastive loss encouraging embeddings of similar audio segments to be close in latent space',
      ],
      correctAnswer: 1,
      explanation: 'EnCodec combines a multi-scale mel spectrogram reconstruction loss (for spectral fidelity) with adversarial training using multi-scale and multi-period waveform discriminators (similar to HiFi-GAN), ensuring perceptual quality that pure MSE losses cannot achieve.',
      hints: [
        'Pixel-wise (sample-wise) MSE loss is known to produce blurry/muffled outputs—what kind of loss enforces perceptual sharpness?',
        'Adversarial discriminators push the decoder to produce samples indistinguishable from real audio.',
      ],
    },
  ],

  // ── aud-kp-16: X-Vectors and Speaker Embeddings ──────────────────────────
  'x-vectors': [
    {
      id: 'q-aud-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'X-vectors are speaker embeddings extracted by:',
      options: [
        'Computing the mean MFCC vector over a speaker\'s entire utterance',
        'Passing variable-length utterance features through a TDNN with a statistics pooling layer, then extracting the activation at a narrow bottleneck trained for speaker classification',
        'Applying PCA to the GMM supervector from a Universal Background Model',
        'Averaging the hidden states of a transformer trained on ASR tasks over all frames',
      ],
      correctAnswer: 1,
      explanation: 'X-vector extraction uses a Time Delay Neural Network (TDNN) with a statistical pooling layer that aggregates frame-level statistics (mean and standard deviation) into a fixed-size segment-level representation, trained with a speaker classification objective.',
      hints: [
        'The TDNN processes sequences of frames; statistical pooling collapses the variable-length sequence to a fixed-length summary.',
        'The embedding is extracted from a specific layer (the "embedding" or "bottleneck" layer) after training.',
      ],
    },
    {
      id: 'q-aud-kp16-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'I-vectors (ivectors) preceded x-vectors and represent a speaker\'s utterance as a single point in a low-dimensional "total variability space" estimated from a Universal Background Model and a factor analysis model.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'I-vectors compress the speaker-plus-channel variability captured by a GMM-UBM into a low-rank factor analysis subspace (total variability space); x-vectors replaced them by using discriminative neural network training instead of generative factor analysis.',
      hints: [
        'I-vectors are generative (GMM-based); x-vectors are discriminative (NN-based)—which framework tends to perform better in modern practice?',
        'Total variability space captures both speaker and channel effects in a single low-dimensional vector.',
      ],
    },
    {
      id: 'q-aud-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Statistical pooling in x-vector extraction computes which statistics over frame-level TDNN outputs before the segment-level layers?',
      options: [
        'Maximum and minimum activation values across all frames',
        'Mean and standard deviation of activations across frames, concatenated to form a single fixed-length vector',
        'Weighted sum of frame activations using attention weights learned during training',
        'First and second moments normalised by the number of frames times a trainable temperature parameter',
      ],
      correctAnswer: 1,
      explanation: 'Statistical pooling concatenates the temporal mean and standard deviation of the TDNN frame-level outputs, providing a simple but effective fixed-length summary that encodes both average and variability of speaker characteristics across the utterance.',
      hints: [
        'The pooling must collapse variable-length sequences (different utterance durations) to a fixed-length vector.',
        'Mean captures the average vocal tract properties; standard deviation captures speaking rate and prosodic variability.',
      ],
    },
  ],

  // ── aud-kp-17: Speaker Verification with PLDA and Cosine Scoring ──────────
  'speaker-verification': [
    {
      id: 'q-aud-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Speaker verification is the task of:',
      options: [
        'Identifying the name of an unknown speaker from a large database of enrolled speakers',
        'Deciding whether an utterance was spoken by a claimed target speaker (yes/no decision)',
        'Transcribing the words spoken by a specific speaker in a recording',
        'Counting the number of distinct speakers in an audio recording',
      ],
      correctAnswer: 1,
      explanation: 'Verification is a binary authentication task: given a claimed identity and a test utterance, decide whether the utterance is genuine (from the claimed speaker) or an impostor, typically by thresholding a similarity score.',
      hints: [
        'Contrast with speaker identification, which is a multi-class problem—verification is a binary decision.',
        'Think of it like password authentication: you claim an identity and the system verifies the claim.',
      ],
    },
    {
      id: 'q-aud-kp17-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'PLDA (Probabilistic Linear Discriminant Analysis) is used in speaker verification to model within-speaker and between-speaker variability in the x-vector space, producing a well-calibrated log-likelihood ratio score.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'PLDA models the x-vector distribution as a linear Gaussian model with speaker and channel factors; the PLDA score is the log-likelihood ratio of the hypothesis "same speaker" vs "different speaker," providing better-calibrated decisions than raw cosine similarity.',
      hints: [
        'Cosine similarity ignores the Gaussian structure of the x-vector space—PLDA explicitly models this structure.',
        'A log-likelihood ratio directly answers the hypothesis testing question at the heart of verification.',
      ],
    },
    {
      id: 'q-aud-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Equal Error Rate (EER) in speaker verification is the operating point where:',
      options: [
        'The system accepts all genuine speakers and rejects all impostors perfectly',
        'The False Acceptance Rate (FAR) equals the False Rejection Rate (FRR)',
        'The F1 score of genuine and impostor classification is maximised',
        'The decision threshold equals the prior probability of being a genuine speaker',
      ],
      correctAnswer: 1,
      explanation: 'EER is a threshold-independent summary metric where FAR (fraction of impostors incorrectly accepted) equals FRR (fraction of genuine speakers incorrectly rejected); lower EER indicates better discriminative performance.',
      hints: [
        'FAR and FRR trade off as the threshold changes—EER is the crossover point where they balance.',
        'EER summarises the ROC curve at a specific operating point where the error types are symmetric.',
      ],
    },
  ],

  // ── aud-kp-18: Speaker Diarization: Clustering and End-to-End ─────────────
  'diarization': [
    {
      id: 'q-aud-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Speaker diarization answers the question:',
      options: [
        '"What words were spoken in this recording?"',
        '"Who spoke when?" — segmenting the audio and attributing each segment to a speaker',
        '"How many words per minute did each speaker speak?"',
        '"Is this speaker the same as the one in my enrolled database?"',
      ],
      correctAnswer: 1,
      explanation: 'Diarization partitions an audio recording into homogeneous segments attributed to individual speakers, answering "who spoke when" without necessarily identifying the speakers by name.',
      hints: [
        'Diarization does not transcribe words; it segments and labels speakers.',
        'The output is a timeline of speaker labels, not a transcription or identity verification.',
      ],
    },
    {
      id: 'q-aud-kp18-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Traditional modular diarization pipelines first segment speech into speaker-homogeneous regions, extract speaker embeddings per segment, then apply spectral clustering to assign speaker labels.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'The classical pipeline consists of: Voice Activity Detection → speaker change detection or fixed-length segmentation → x-vector/d-vector extraction → agglomerative hierarchical or spectral clustering → (optional) re-segmentation with HMM.',
      hints: [
        'The pipeline is modular—each step uses separate models and the outputs are passed sequentially.',
        'Clustering assigns speaker labels without knowing the number of speakers in advance (for some methods).',
      ],
    },
    {
      id: 'q-aud-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'End-to-end neural diarization (EEND) models, unlike clustering-based systems, can handle overlapping speech because:',
      options: [
        'They apply a CTC loss that marginalises over all possible speaker orderings',
        'They produce per-frame posterior probabilities for each speaker simultaneously rather than assigning each frame to exactly one speaker',
        'They use a separate speaker activity detector trained on artificially mixed overlapping speech',
        'They first perform source separation and then run independent single-speaker ASR on each channel',
      ],
      correctAnswer: 1,
      explanation: 'EEND models output simultaneous per-speaker activity probabilities for each frame using a multi-label binary classification objective, allowing multiple speakers to be active at the same time—which clustering-based approaches cannot represent since they assign each segment to a single cluster.',
      hints: [
        'Clustering assigns one speaker per segment—what happens when two people speak simultaneously?',
        'Multi-label output means the model can predict "speaker A AND speaker B are active" at the same frame.',
      ],
    },
  ],

  // ── aud-kp-19: Anti-Spoofing and Deepfake Audio Detection ────────────────
  'anti-spoofing': [
    {
      id: 'q-aud-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the ASVspoof challenge, the primary threat models evaluated are:',
      options: [
        'Channel noise and reverberation degrading genuine speech',
        'Text-to-speech synthesis, voice conversion, and replay attacks used to spoof a speaker verification system',
        'Adversarial perturbations added to the waveform to fool the ASR transcription',
        'Bandwidth limitations causing codec artefacts that mimic different speakers',
      ],
      correctAnswer: 1,
      explanation: 'ASVspoof evaluates spoofing attacks on automatic speaker verification: TTS and voice conversion generate fake speech matching a target speaker\'s voice, while replay attacks play back a genuine recording—all aimed at fooling the biometric system.',
      hints: [
        'Spoofing in biometrics means presenting a fake but plausible biometric trait to be accepted as genuine.',
        'TTS and voice conversion are "logical access" attacks; replay is a "physical access" attack in the ASVspoof taxonomy.',
      ],
    },
    {
      id: 'q-aud-kp19-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'LFCC (Linear Frequency Cepstral Coefficients) features are often more effective than MFCCs for anti-spoofing because TTS artefacts are more distinctive on a linear frequency scale.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'TTS and voice conversion systems often leave artefacts in high-frequency regions that the mel scale compresses; LFCC treats all frequency bands equally, preserving high-frequency artefact information that helps distinguish synthesised from genuine speech.',
      hints: [
        'The mel scale emphasises low frequencies—what happens to high-frequency TTS artefacts in MFCCs?',
        'Anti-spoofing is a different task from ASR—different frequency regions may carry the most discriminative information.',
      ],
    },
    {
      id: 'q-aud-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Generalisation to unseen spoofing attacks (unknown TTS systems) is a major challenge in anti-spoofing. Which training strategy most directly addresses this?',
      options: [
        'Training on as many known TTS systems as possible and relying on interpolation',
        'Using self-supervised pre-trained speech representations (e.g., wav2vec 2.0) that capture general acoustic properties, combined with data augmentation with diverse codec distortions',
        'Training exclusively on replay attacks to develop robust microphone-agnostic features',
        'Applying class-conditional normalising flows to model the known spoof distribution',
      ],
      correctAnswer: 1,
      explanation: 'Self-supervised representations encode rich general acoustic features not biased toward specific known spoof systems; combined with augmentations that simulate codec/channel distortions, this approach generalises better to unseen attack types encountered in real deployments.',
      hints: [
        'Models trained to detect specific TTS systems tend to fail on new TTS systems not seen during training—what features generalise?',
        'Self-supervised pre-training captures phonetic structure and acoustic patterns from diverse data, not specific artefacts of one TTS system.',
      ],
    },
  ],

  // ── aud-kp-20: Speaker Adaptation and Personalization ────────────────────
  'speaker-adaptation': [
    {
      id: 'q-aud-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Speaker-adaptive training (SAT) in ASR improves robustness by:',
      options: [
        'Training a separate ASR model for each speaker in the corpus',
        'Training a single model with speaker-specific feature transformations (e.g., fMLLR) so the model learns to adapt to speaker-normalised features',
        'Augmenting training data with simulated speaker changes every 10 seconds',
        'Applying vocal tract length normalisation only at test time as post-processing',
      ],
      correctAnswer: 1,
      explanation: 'SAT trains the acoustic model jointly with per-speaker linear feature transforms (e.g., fMLLR); at test time, speaker-adapted features are computed from a small amount of audio, normalising speaker variability and improving recognition accuracy.',
      hints: [
        'Training a model on raw heterogeneous speaker data without any normalisation leaves speaker variability in the features.',
        'The linear transforms in SAT bring different speakers\' features closer together in acoustic space.',
      ],
    },
    {
      id: 'q-aud-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Low-Rank Adaptation (LoRA) can be used for speaker-specific fine-tuning of a large speech model, updating only a small fraction of parameters via low-rank weight matrices for efficiency.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'LoRA inserts trainable low-rank decomposition matrices alongside frozen pre-trained weights; for speaker adaptation, only these small matrices are updated on speaker-specific data, dramatically reducing storage and compute compared to full fine-tuning.',
      hints: [
        'Full fine-tuning stores a separate copy of all model weights per speaker—LoRA stores only the small low-rank matrices.',
        'Low-rank updates assume that task/speaker adaptation requires moving within a low-dimensional subspace of weight space.',
      ],
    },
    {
      id: 'q-aud-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Test-time adaptation for personalised ASR (adapting a model at inference time without retraining) can be achieved by:',
      options: [
        'Fine-tuning all encoder layers using the test utterance as both input and pseudo-label',
        'Updating only batch normalisation statistics or prompt embeddings on a short enrolment segment, leaving other weights frozen',
        'Replacing the language model with a speaker-specific n-gram model built from the test utterance transcript',
        'Applying a speaker-identity-conditioned data augmentation to the test spectrogram before decoding',
      ],
      correctAnswer: 1,
      explanation: 'Lightweight test-time adaptation methods update only minimal parameters (e.g., BN statistics, learned prompt tokens) on enrolment data, providing a personalised model without full retraining while preserving the pre-trained model\'s general capabilities.',
      hints: [
        'Updating all weights at test time is slow and risks catastrophic forgetting—which components can be updated cheaply?',
        'Learned prompts (prefix tokens) steer the model\'s behaviour without changing the underlying weight matrices.',
      ],
    },
  ],

  // ── aud-kp-21: Environmental Sound Classification and ESC-50 ─────────────
  'environmental-sound': [
    {
      id: 'q-aud-kp21-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The ESC-50 dataset is a benchmark for environmental sound classification consisting of:',
      options: [
        '50 hours of continuously recorded urban soundscapes with dense annotations',
        '2,000 five-second audio clips across 50 semantic categories of environmental sounds',
        '50 speakers each recording 2,000 words in noisy environments',
        '50,000 audio clips of music genres labelled by crowd-sourced annotators',
      ],
      correctAnswer: 1,
      explanation: 'ESC-50 contains 2,000 clips (5 seconds each) across 50 categories (animals, urban sounds, natural soundscapes, etc.), organised into 5 folds for cross-validation; it is a standard benchmark for non-speech audio classification.',
      hints: [
        'The "50" in ESC-50 refers to the number of distinct sound categories.',
        'Five-second clips are long enough to capture the characteristic texture of most environmental sounds.',
      ],
    },
    {
      id: 'q-aud-kp21-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Random cropping and mixup augmentation are commonly applied to audio spectrograms during training to improve generalisation on environmental sound classification tasks.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Random time and frequency crops expose the model to partial views of sounds (robustness to start/end time variability); mixup linearly interpolates two spectrogram-label pairs, acting as a regulariser that smooths decision boundaries and reduces overfitting on small datasets like ESC-50.',
      hints: [
        'Environmental sounds often have variable onset times—how does random cropping help generalisation?',
        'Mixup creates "in-between" examples that the model must interpolate its predictions for, discouraging overconfident boundaries.',
      ],
    },
    {
      id: 'q-aud-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Why does transfer learning from large-scale audio pre-training (e.g., on AudioSet) typically outperform training from scratch on ESC-50?',
      options: [
        'AudioSet uses the same 50 categories as ESC-50, providing direct label transfer',
        'Large-scale pre-training provides learned audio representations that capture general spectrotemporal patterns and sound textures transferable to new categories with little data',
        'AudioSet models are pre-trained without any classification head, making them more flexible for fine-tuning',
        'ESC-50 clip lengths exactly match AudioSet clip lengths, reducing the need for any architecture modification',
      ],
      correctAnswer: 1,
      explanation: 'Pre-training on AudioSet\'s 527 categories and 2M+ clips learns rich spectral and temporal features (onset patterns, harmonic structures, texture) that generalise well; ESC-50\'s 2,000 clips are insufficient to learn these representations from scratch.',
      hints: [
        'Deep networks require large datasets to learn general, low-level audio features—ESC-50 alone cannot provide this.',
        'Transfer learning reuses features learned on a large dataset, requiring only the classification head to be adapted.',
      ],
    },
  ],

  // ── aud-kp-22: Audio Event Detection and Sound Source Localization ─────────
  'audio-event-detection': [
    {
      id: 'q-aud-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Audio Event Detection (AED) differs from audio classification in that AED:',
      options: [
        'Works only with music recordings while classification handles environmental sounds',
        'Predicts not just the presence of sound events but also their temporal boundaries (onset and offset times) within a recording',
        'Requires multi-channel microphone arrays instead of single-channel audio',
        'Uses only symbolic music notation rather than audio waveforms as input',
      ],
      correctAnswer: 1,
      explanation: 'AED localises events in time (onset/offset detection) in addition to classifying them; this is a temporally precise task, unlike clip-level audio classification which only predicts which classes are present in a fixed-length clip.',
      hints: [
        'Classification answers "what sound is present?" AED answers "what sound is present and when?"',
        'Temporal localisation requires frame-level or segment-level predictions rather than a single clip-level label.',
      ],
    },
    {
      id: 'q-aud-kp22-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Sound source localisation using a microphone array typically uses the Time Difference of Arrival (TDOA) between microphones to estimate the direction of a sound source.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'TDOA measures the delay with which a sound reaches different microphones; using the known geometry of the array, the TDOA values triangulate the direction of arrival (DOA) and, with multiple arrays, the 3D position of the source.',
      hints: [
        'Sound travels at a fixed speed (~343 m/s)—a small time delay between two microphones implies the sound came from one direction.',
        'The Generalized Cross-Correlation with Phase Transform (GCC-PHAT) is a standard TDOA estimator.',
      ],
    },
    {
      id: 'q-aud-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In the DCASE challenge for Sound Event Localisation and Detection (SELD), the SELDnet architecture jointly predicts:',
      options: [
        'The speaker identity and word count for each detected audio event',
        'Sound event class activity and the Direction of Arrival (DOA) simultaneously using a shared encoder and two prediction branches',
        'The source separation masks and the event class labels independently using two separate encoders',
        'The onset time only; offset times are inferred post-hoc by thresholding the activity score',
      ],
      correctAnswer: 1,
      explanation: 'SELDnet uses a shared convolutional-recurrent encoder and two decoder branches: one predicts per-class activity (SED), the other predicts the 3D DOA vector for each active class (SSL); joint training encourages shared representations beneficial for both tasks.',
      hints: [
        'SELD combines two tasks—sound event detection (what and when) and sound source localisation (where).',
        'Joint prediction from a shared encoder enables the model to learn representations useful for both tasks simultaneously.',
      ],
    },
  ],

  // ── aud-kp-23: Music Genre, Mood, and Instrument Classification ───────────
  'music-classification': [
    {
      id: 'q-aud-kp23-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Music genre classification using deep learning typically uses which input representation?',
      options: [
        'MIDI note sequences transcribed from the audio using an automatic piano transcription system',
        'Mel spectrograms or short-time Fourier transform magnitude spectrograms as 2D images fed into CNNs or transformers',
        'Raw symbolic chord progressions extracted via a chord recognition model',
        'One-hot encoded BPM (beats per minute) and key signature labels',
      ],
      correctAnswer: 1,
      explanation: 'Mel or STFT magnitude spectrograms capture the harmonic, rhythmic, and timbral content of music in a 2D time-frequency representation amenable to image-based CNN architectures; they preserve the acoustic information needed to distinguish genres.',
      hints: [
        'Music genre information is encoded in timbral texture, rhythm, and harmony—which representation captures all of these?',
        'CNNs applied to spectrograms treat frequency as a spatial axis and can detect harmonic patterns as vertical structures.',
      ],
    },
    {
      id: 'q-aud-kp23-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Music mood classification is more subjective than genre classification because mood labels depend on listener perception, cultural context, and emotional state, leading to higher inter-annotator disagreement.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Genre categories are relatively stable and consensus-driven, while mood labels (e.g., "happy", "melancholic") involve affective perception that varies across listeners; datasets like Valence-Arousal annotations reflect this through wider label distributions and lower inter-rater reliability.',
      hints: [
        'Two listeners may agree that a song is "pop" but disagree on whether it feels "joyful" or "nostalgic."',
        'The Russell circumplex model of affect (valence-arousal) is one framework for structuring mood annotations continuously.',
      ],
    },
    {
      id: 'q-aud-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Instrument classification in real music recordings is more challenging than in isolated note datasets because:',
      options: [
        'Musical instruments have been extensively catalogued, so the classes are too easy to distinguish',
        'Polyphonic mixing, timbre interactions, and shared harmonic content between instruments make individual instrument identification from the mixture acoustically ambiguous',
        'Real recordings use higher sample rates that standard CNNs cannot process efficiently',
        'Copyright restrictions prevent training on commercial music recordings',
      ],
      correctAnswer: 1,
      explanation: 'In a mixture, instruments share the harmonic series (e.g., violin and flute both have overtones at the same frequencies), masking and timbre interaction make individual timbres hard to isolate; polyphonic models must perform joint source-instrument identification.',
      hints: [
        'An isolated piano note has clear, unambiguous features; how does its spectrogram look when mixed with a cello?',
        'Instrument recognition in isolation achieves near-perfect accuracy; why does performance drop in polyphonic context?',
      ],
    },
  ],

  // ── aud-kp-24: Polyphonic Sound Event Detection (SED) ────────────────────
  'sed-polyphonic': [
    {
      id: 'q-aud-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Polyphonic SED differs from monophonic SED in that it must:',
      options: [
        'Handle audio files longer than 60 seconds with memory-efficient processing',
        'Detect multiple sound events that can be simultaneously active at any given time frame',
        'Operate on multi-channel audio from microphone arrays rather than mono recordings',
        'Classify sounds at a word level rather than at a category level',
      ],
      correctAnswer: 1,
      explanation: 'Polyphonic SED requires multi-label frame-level predictions, since multiple event classes (e.g., speech, music, dog bark) can overlap in time; monophonic SED assumes at most one active event per frame.',
      hints: [
        'In a cafeteria, speech and background music and cutlery sounds all occur simultaneously—how many labels per frame?',
        'Multi-label classification outputs a probability per class rather than a single argmax class.',
      ],
    },
    {
      id: 'q-aud-kp24-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Mean Teacher training is used in semi-supervised SED to leverage large amounts of unlabelled audio, where a student model is trained to match the outputs of a slowly updated exponential moving average (EMA) teacher model.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Mean Teacher enforces consistency: the student is trained on labelled data with ground-truth loss and on unlabelled data by matching the teacher\'s (EMA-averaged student) predictions; the EMA teacher provides stable pseudo-labels, improving semi-supervised learning significantly.',
      hints: [
        'The EMA teacher is more stable than the rapidly updating student—why does this make it a better pseudo-label source?',
        'DCASE 2021+ challenges include a semi-supervised SED task where this approach is state-of-the-art.',
      ],
    },
    {
      id: 'q-aud-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Intersection over Union (IoU) for temporal sound event detection is computed between:',
      options: [
        'The spectrogram patches predicted to contain events and the ground-truth spectrogram regions',
        'The predicted event time interval [onset_pred, offset_pred] and the ground-truth interval [onset_gt, offset_gt] for matched event instances',
        'The per-frame class probability vectors predicted by the model and the binary ground-truth label vectors',
        'The frequency range of the detected event and the frequency range of the annotated event class',
      ],
      correctAnswer: 1,
      explanation: 'Temporal IoU measures the overlap between predicted and ground-truth time intervals: IoU = duration of intersection / duration of union; it is used to determine if a detected event instance is a true positive (IoU > threshold) in event-based evaluation metrics.',
      hints: [
        'IoU in object detection measures spatial overlap; temporal IoU applies the same concept along the time axis.',
        'A prediction that starts and ends at the right time has IoU = 1; a completely non-overlapping prediction has IoU = 0.',
      ],
    },
  ],

  // ── aud-kp-25: Automated Audio Captioning and AudioCaps ──────────────────
  'audio-captioning': [
    {
      id: 'q-aud-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Automated Audio Captioning (AAC) is the task of:',
      options: [
        'Generating subtitles for speech content in an audio recording',
        'Producing a natural language sentence describing the content of a non-speech audio clip',
        'Translating audio captions from one language to another using a neural MT system',
        'Classifying audio clips into pre-defined textual categories from a fixed vocabulary',
      ],
      correctAnswer: 1,
      explanation: 'AAC generates free-form natural language descriptions of audio scenes (e.g., "A dog is barking in the distance while birds chirp nearby"), going beyond classification labels to capture the richness of the audio scene.',
      hints: [
        'Unlike classification, captioning generates open-ended text rather than selecting from a fixed set of labels.',
        'AAC is the audio equivalent of image captioning (generating descriptions of what is seen/heard).',
      ],
    },
    {
      id: 'q-aud-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'AudioCaps is the largest AAC dataset available and was created by having human annotators write captions for 10-second AudioSet clips sourced from YouTube.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'AudioCaps contains ~46k audio clips from AudioSet (10 seconds each) with human-written captions collected via Amazon Mechanical Turk; it remains a primary training and evaluation benchmark for automated audio captioning models.',
      hints: [
        'AudioCaps leverages the scale of AudioSet while adding the textual descriptions that AudioSet\'s fixed labels cannot provide.',
        'Crowdsourcing captions from non-expert annotators provides natural language diversity but introduces label noise.',
      ],
    },
    {
      id: 'q-aud-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'FENSE (Fluency ENhanced Sentence-bert Evaluation) is preferred over BLEU for evaluating audio captions because:',
      options: [
        'FENSE is computed faster than BLEU on standard hardware',
        'BLEU measures n-gram overlap and penalises fluency, while FENSE uses semantic sentence embeddings and a fluency penalty, correlating better with human judgements of caption quality',
        'FENSE is the only metric accepted by the DCASE challenge for official evaluation',
        'BLEU requires 5 reference captions per clip, while FENSE needs only one',
      ],
      correctAnswer: 1,
      explanation: 'BLEU\'s n-gram matching penalises semantically correct but differently phrased captions; FENSE combines sentence-BERT cosine similarity (capturing semantic equivalence) with a fluency penalty from a language model, achieving higher correlation with human ratings of caption quality.',
      hints: [
        '"A dog barks loudly" and "A canine vocally barks" are semantically equivalent—how does BLEU score this pair?',
        'Metric correlations with human judgements are measured on human evaluation datasets like ClothoV2.',
      ],
    },
  ],

  // ── aud-kp-26: Music Generation with Transformers (MusicLM, MusicGen) ─────
  'music-generation': [
    {
      id: 'q-aud-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'MusicGen (Meta) generates music by:',
      options: [
        'Synthesising audio directly from a symbolic MIDI sequence using a neural vocoder',
        'Predicting EnCodec audio tokens autoregressively conditioned on text or melody prompts',
        'Applying a diffusion model in the mel spectrogram domain conditioned on a music style embedding',
        'Combining a music transcription model with a rule-based harmonisation system',
      ],
      correctAnswer: 1,
      explanation: 'MusicGen uses a transformer to autoregressively predict EnCodec RVQ tokens conditioned on text descriptions and optional melody inputs, with a novel "delay pattern" that enables efficient parallel prediction of multi-codebook tokens.',
      hints: [
        'Like VALL-E for speech, MusicGen treats music generation as a language modelling problem over discrete audio tokens.',
        'The conditioning modalities (text, melody) are encoded and injected into the transformer via cross-attention or prefix tokens.',
      ],
    },
    {
      id: 'q-aud-kp26-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'MusicLM (Google) uses a hierarchical sequence-to-sequence modelling approach, where a semantic token model first generates coarse tokens and an acoustic model then generates fine-grained audio tokens.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'MusicLM conditions on MuLan music-text joint embeddings and generates audio in two stages: a semantic model produces tokens from w2v-BERT (coarse semantic structure), then an acoustic model (SoundStream tokens) renders the final audio at full quality.',
      hints: [
        'Hierarchical generation mirrors how humans compose music: first sketch the structure, then fill in the details.',
        'The two-stage approach separates high-level semantic content from fine-grained acoustic rendering.',
      ],
    },
    {
      id: 'q-aud-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key challenge in text-to-music generation evaluation is that:',
      options: [
        'No automatic metrics exist for measuring music quality',
        'Subjective music quality and text-music relevance require human evaluation, and automatic proxy metrics (FID on spectrograms, CLAP similarity) do not fully capture creative quality or listener preference',
        'Music generation outputs are always too short for meaningful perceptual evaluation',
        'Copyright law prohibits publishing evaluation results on music generation models',
      ],
      correctAnswer: 1,
      explanation: 'Automatic metrics like Fréchet Audio Distance measure statistical similarity to a reference set but cannot capture creative attributes (originality, emotional expressiveness, stylistic coherence) that human listeners evaluate; human listening studies are the gold standard but are expensive and subjective.',
      hints: [
        'FID measures distributional similarity to reference music—is a statistically average-sounding piece necessarily good music?',
        'CLAP scores measure text-audio alignment but not absolute quality or originality.',
      ],
    },
  ],

  // ── aud-kp-27: Speech Enhancement and Noise Suppression ──────────────────
  'speech-enhancement': [
    {
      id: 'q-aud-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The goal of speech enhancement is to:',
      options: [
        'Increase the speaking rate to compress audio for faster transmission',
        'Remove or attenuate background noise and interference to improve speech intelligibility and quality',
        'Convert speech from one language to another while preserving vocal characteristics',
        'Increase the pitch of a speaker\'s voice to match a target pitch profile',
      ],
      correctAnswer: 1,
      explanation: 'Speech enhancement suppresses non-speech components (noise, reverberation, interfering speakers) from a noisy signal to produce a cleaner output; applications include telephony, hearing aids, and ASR front-ends.',
      hints: [
        'Enhanced speech should sound more like the original clean recording before noise was added.',
        'Enhancement is a signal processing and machine learning problem: learn to separate speech from noise.',
      ],
    },
    {
      id: 'q-aud-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'PESQ (Perceptual Evaluation of Speech Quality) and STOI (Short-Time Objective Intelligibility) are objective metrics that correlate with human perception of speech quality and intelligibility respectively.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'PESQ (ITU-T P.862) models the human auditory system to estimate perceived quality (MOS-LQO score), while STOI measures the correlation between clean and enhanced short-time spectral envelopes to predict intelligibility; both are standard benchmarks for speech enhancement evaluation.',
      hints: [
        'Objective metrics replace expensive listening tests for rapid development iteration.',
        'PESQ correlates with Mean Opinion Score (MOS); STOI with word recognition accuracy by listeners.',
      ],
    },
    {
      id: 'q-aud-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The DCCRN (Deep Complex Convolutional Recurrent Network) improves over real-valued enhancement networks by:',
      options: [
        'Processing each frequency band independently with a dedicated recurrent network',
        'Operating on complex-valued STFT representations with complex convolutions, enabling joint magnitude and phase estimation for better reconstruction quality',
        'Using a fully convolutional architecture without any recurrent layers to reduce latency',
        'Applying a GAN discriminator that evaluates the imaginary part of the STFT separately',
      ],
      correctAnswer: 1,
      explanation: 'Real-valued networks typically estimate magnitude only and reconstruct phase from the noisy input (a poor approximation); DCCRN performs convolutions in the complex domain, learning to refine both magnitude and phase simultaneously, leading to improved audio quality.',
      hints: [
        'The STFT has magnitude and phase—most classical enhancement only fixes the magnitude.',
        'Complex convolutions treat the real and imaginary parts as a 2D quantity, preserving their relationship.',
      ],
    },
  ],

  // ── aud-kp-28: Source Separation: Conv-TasNet and Demucs ─────────────────
  'source-separation': [
    {
      id: 'q-aud-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Conv-TasNet performs speech source separation by:',
      options: [
        'Running multiple ASR models in parallel and combining their transcripts to infer source signals',
        'Operating entirely in the time domain: learning a 1D convolutional encoder, estimating per-source masks via a temporal convolutional network, and decoding with a learned synthesis filter',
        'Applying a beamformer to a multi-channel microphone array to spatially filter each speaker',
        'Using a variational autoencoder to sample source components from independent latent distributions',
      ],
      correctAnswer: 1,
      explanation: 'Conv-TasNet replaces the STFT with a learned 1D encoder, estimates multiplicative masks for each source using a stack of dilated temporal convolutional modules, and reconstructs each source by applying the masks and running the learned decoder—all in time domain.',
      hints: [
        'TasNet stands for "Time-domain Audio Separation Network"—what does "time domain" tell you about the input/output?',
        'The mask per source controls how much of the encoded representation each source receives.',
      ],
    },
    {
      id: 'q-aud-kp28-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Permutation Invariant Training (PIT) is needed for source separation because the model must learn to assign separated outputs to the correct source regardless of which output channel they appear in.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Since there is no canonical ordering of sources, PIT computes the loss for all permutations of output-to-reference assignments and uses the minimum-loss permutation for backpropagation, avoiding the ambiguity problem in training multi-source separation models.',
      hints: [
        'If you have two speakers and two output channels, there are two ways to assign them—which is "correct" without PIT?',
        'PIT makes the training objective invariant to source ordering, solving the label permutation problem.',
      ],
    },
    {
      id: 'q-aud-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Hybrid Demucs improves music source separation over earlier models by combining:',
      options: [
        'A GAN generator for each source with a frequency-domain discriminator',
        'Both time-domain waveform processing (Demucs U-Net) and frequency-domain spectrogram processing (spectrogram U-Net), fusing their outputs for each source',
        'Three separate Demucs models trained on different frequency bands and mixed in post-processing',
        'A diffusion model for source refinement applied after a coarse waveform separation model',
      ],
      correctAnswer: 1,
      explanation: 'Hybrid Demucs runs a waveform-domain U-Net and a spectrogram-domain U-Net in parallel, then combines their outputs via a learned cross-domain fusion; this exploits the complementary strengths of time-domain (transient fidelity) and frequency-domain (spectral precision) processing.',
      hints: [
        'Time-domain models capture fine waveform structure; frequency-domain models exploit spectral patterns—what happens when you combine both?',
        'The fusion allows the model to borrow representations from both domains at each scale of the U-Net hierarchy.',
      ],
    },
  ],

  // ── aud-kp-29: Diffusion Models for Audio Generation ─────────────────────
  'audio-diffusion': [
    {
      id: 'q-aud-kp29-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Diffusion models generate audio by:',
      options: [
        'Iteratively refining an initial random noise signal by predicting and subtracting noise at each denoising step',
        'Sampling from a normalising flow trained to transform Gaussian noise into audio in one step',
        'Running a GAN generator that maps a latent vector to a mel spectrogram in one forward pass',
        'Predicting the next audio frame autoregressively from all previous frames',
      ],
      correctAnswer: 0,
      explanation: 'Diffusion models define a forward noising process that gradually adds Gaussian noise to data, then train a denoising network to reverse this process step by step, starting from pure noise and recovering clean audio over multiple denoising steps.',
      hints: [
        'The "diffusion" metaphor is physical: imagine ink diffusing into water and the model learning to run this backward.',
        'Unlike GANs, diffusion models are trained with a simple denoising objective rather than adversarial training.',
      ],
    },
    {
      id: 'q-aud-kp29-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'AudioLDM operates the diffusion process in a compressed latent space rather than directly on mel spectrograms, enabling faster generation while maintaining quality.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'AudioLDM uses a VAE to encode mel spectrograms into a compact latent space, runs the diffusion denoising process in this low-dimensional latent space conditioned on CLAP audio embeddings, then decodes with the VAE decoder and a vocoder—dramatically reducing computational cost vs. pixel-space diffusion.',
      hints: [
        'Running diffusion on raw mel spectrograms (high-dimensional) is expensive—what does compressing to a latent space gain?',
        'Latent diffusion models were popularised by Stable Diffusion for images; AudioLDM applies the same idea to audio.',
      ],
    },
    {
      id: 'q-aud-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Classifier-Free Guidance (CFG) in conditional audio diffusion models works by:',
      options: [
        'Training a separate classifier on the conditioning signal and using its gradient to steer generation',
        'Training the denoising network both with and without conditioning, then linearly extrapolating beyond the conditional prediction at inference time for stronger conditioning adherence',
        'Replacing the conditioning with a class-conditional mean during 50% of training steps as regularisation',
        'Using a discriminator to measure how closely the generated audio matches the text condition',
      ],
      correctAnswer: 1,
      explanation: 'CFG jointly trains a conditional and unconditional denoiser; at inference, the predicted noise is interpolated as: ε_guided = ε_uncond + γ·(ε_cond − ε_uncond), where γ > 1 amplifies the direction from unconditional to conditional, producing outputs that more strongly adhere to the conditioning at the cost of diversity.',
      hints: [
        'Compare the output with and without conditioning—CFG amplifies the difference to increase conditioning adherence.',
        'The guidance scale γ controls the trade-off between sample diversity and conditioning fidelity.',
      ],
    },
  ],

  // ── aud-kp-30: Audio-Language Models and Speech LLMs ─────────────────────
  'audio-llms': [
    {
      id: 'q-aud-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Audio-Language Models like Qwen-Audio extend LLMs to audio by:',
      options: [
        'Replacing the LLM\'s tokeniser with a speech-specific byte-pair encoding of audio samples',
        'Adding an audio encoder whose output representations are projected into the LLM\'s token embedding space, enabling the LLM to process audio and text together',
        'Fine-tuning the LLM exclusively on audio transcription pairs with no instruction tuning',
        'Using the LLM only for generating text captions after a separate audio classification head produces category labels',
      ],
      correctAnswer: 1,
      explanation: 'Audio-LLMs attach a pre-trained audio encoder (e.g., Whisper encoder, wav2vec 2.0) to an LLM via a projection layer; audio frame embeddings are treated as soft tokens in the LLM\'s context, enabling the model to follow multimodal instructions involving both speech/audio and text.',
      hints: [
        'LLMs process sequences of tokens—how do you turn continuous audio features into something the LLM can attend to?',
        'The projection layer bridges the audio encoder\'s representation space and the LLM\'s embedding space.',
      ],
    },
    {
      id: 'q-aud-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Speech LLMs like SpeechGPT can not only transcribe speech but also generate speech responses directly from the LLM without a separate TTS system, by predicting discrete speech tokens.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'SpeechGPT unifies speech understanding and generation by extending the LLM vocabulary with discrete speech tokens (from HuBERT or EnCodec); the model generates both text and speech token sequences, which are decoded by a vocoder into audio—enabling end-to-end spoken dialogue.',
      hints: [
        'If the LLM can predict any token type, and speech is represented as tokens, can it generate speech natively?',
        'Discrete speech tokens make speech generation equivalent to text generation—a sequence prediction problem.',
      ],
    },
    {
      id: 'q-aud-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key advantage of end-to-end speech LLMs over cascade systems (ASR → text LLM → TTS) for spoken dialogue is:',
      options: [
        'They require significantly less training data because the cascade components can be reused',
        'They can preserve paralinguistic information (prosody, speaker identity, emotion) throughout the pipeline rather than losing it during ASR transcription',
        'They are simpler to train because there are fewer loss terms than in a cascade system',
        'They are always faster at inference because they skip the ASR decoding step',
      ],
      correctAnswer: 1,
      explanation: 'Cascade systems discard non-linguistic information (tone, emotion, speaker accent) when converting speech to text; end-to-end models that process audio directly can propagate paralinguistic cues from the input to the response, enabling more natural spoken interaction.',
      hints: [
        'When you transcribe speech to text, what information about how something was said gets lost?',
        'Prosody (stress, intonation) carries pragmatic meaning—"really?" said flatly vs. with rising intonation means different things.',
      ],
    },
  ],
}

export default questions
