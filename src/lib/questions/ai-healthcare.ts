import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "medical-image-classification": [
    {
      id: "q-hc-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "CheXNet was trained primarily to detect which condition from chest X-rays?",
      options: [
        "Diabetic retinopathy",
        "Pneumonia",
        "Skin cancer",
        "Brain tumors",
      ],
      correctAnswer: 1,
      explanation:
        "CheXNet is a deep learning model developed by Stanford that detects pneumonia from chest X-rays, achieving radiologist-level performance on the ChestX-ray14 dataset.",
      hints: [
        "Think about which dataset CheXNet was benchmarked on — it contains 14 chest pathology labels.",
        "CheXNet gained fame for matching radiologists on a very common respiratory illness diagnosis.",
      ],
    },
    {
      id: "q-hc-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "EyePACS is a dataset used for detecting diabetic retinopathy from fundus photographs.",
      correctAnswer: "true",
      explanation:
        "EyePACS is a large-scale fundus image dataset used in the Kaggle Diabetic Retinopathy Detection challenge, containing graded retinal photographs for training automated screening models.",
      hints: [
        "EyePACS operates a diabetic retinopathy screening program in community health settings.",
        "The dataset contains fundus photographs — images of the back of the eye.",
      ],
    },
    {
      id: "q-hc-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which technique is most commonly used to make medical image classification models more interpretable by highlighting regions the model focuses on?",
      options: [
        "Dropout regularization",
        "Grad-CAM (Gradient-weighted Class Activation Mapping)",
        "Batch normalization",
        "Data augmentation",
      ],
      correctAnswer: 1,
      explanation:
        "Grad-CAM produces heatmaps by computing gradients of the class score with respect to feature maps, highlighting which image regions drove the classification — critical for clinical trust and validation.",
      hints: [
        "This technique produces a heatmap overlaid on the original image.",
        "It uses gradient information flowing into the final convolutional layer.",
      ],
    },
  ],

  "radiology-ai": [
    {
      id: "q-hc-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which deep learning architecture is most widely used for volumetric medical image segmentation tasks such as CT and MRI organ segmentation?",
      options: ["ResNet-50", "U-Net (and its 3D variants)", "BERT", "YOLO"],
      correctAnswer: 1,
      explanation:
        "U-Net\'s encoder-decoder structure with skip connections was designed for biomedical image segmentation; its 3D variant (V-Net, nnU-Net) naturally handles volumetric CT/MRI data.",
      hints: [
        "This architecture has an encoder that downsamples and a decoder that upsamples, connected by skip connections.",
        "It was originally introduced in a 2015 paper specifically for biomedical image segmentation.",
      ],
    },
    {
      id: "q-hc-kp2-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "MRI images inherently provide ionizing radiation exposure to patients, similar to CT scans.",
      correctAnswer: "false",
      explanation:
        "MRI uses magnetic fields and radio waves — no ionizing radiation. CT scans use X-rays (ionizing radiation), which is why radiation dose management is a concern for CT but not MRI.",
      hints: [
        "Consider the physical principle behind MRI: it uses a strong magnetic field and radio frequency pulses.",
        "Ionizing radiation refers to X-rays and gamma rays, not magnetic fields.",
      ],
    },
    {
      id: "q-hc-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the context of AI-based radiology segmentation, what does the Dice Similarity Coefficient (DSC) measure?",
      options: [
        "The model\'s inference speed on GPU hardware",
        "The overlap between predicted and ground-truth segmentation masks",
        "The signal-to-noise ratio of the reconstructed image",
        "The classification accuracy on a held-out test set",
      ],
      correctAnswer: 1,
      explanation:
        "DSC = 2|A∩B| / (|A|+|B|), measuring spatial overlap between predicted and ground-truth masks. A DSC of 1.0 means perfect overlap; 0 means no overlap — it is the standard segmentation evaluation metric.",
      hints: [
        "DSC involves a ratio that compares the intersection of two sets to their combined size.",
        "It is sometimes called the F1 score for segmentation tasks.",
      ],
    },
  ],

  "pathology-ai": [
    {
      id: "q-hc-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary challenge of applying deep learning directly to Whole Slide Images (WSIs) in computational pathology?",
      options: [
        "WSIs are stored in JPEG format which is lossy",
        "WSIs are extremely high-resolution (often billions of pixels), making direct end-to-end training infeasible",
        "Pathology slides are always grayscale and lack color information",
        "Ground truth labels are always available at the pixel level for WSIs",
      ],
      correctAnswer: 1,
      explanation:
        "WSIs can be 100,000×100,000 pixels or more; loading them into GPU memory is impossible. The standard approach is Multiple Instance Learning (MIL) on extracted patches.",
      hints: [
        "Think about how many pixels a 40× magnification slide contains — it is measured in gigapixels.",
        "The solution involves dividing the image into smaller pieces called patches or tiles.",
      ],
    },
    {
      id: "q-hc-kp3-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Stain normalization is an important preprocessing step in computational pathology because H&E staining appearance can vary significantly across different labs and scanners.",
      correctAnswer: "true",
      explanation:
        "Hematoxylin & Eosin staining varies in color and intensity due to differences in reagent batches, staining protocols, and scanner hardware, causing domain shift that degrades model generalization without normalization.",
      hints: [
        "Think about why a model trained on slides from one hospital might fail on slides from another.",
        "The issue is that the same tissue can look different colors depending on how it was prepared and scanned.",
      ],
    },
    {
      id: "q-hc-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multiple Instance Learning (MIL) is used in computational pathology because:",
      options: [
        "It allows training without any labels at all (fully unsupervised)",
        "It enables slide-level labels to supervise models that process bags of patches without patch-level annotations",
        "It requires pixel-level annotations for every cell in the slide",
        "It is exclusively used for 3D volumetric data, not 2D slides",
      ],
      correctAnswer: 1,
      explanation:
        'In MIL, a slide is treated as a "bag" of patch "instances." Only the bag (slide) label — e.g., cancer/no cancer — is needed; the model learns which patches are informative without costly patch-level annotation.',
      hints: [
        "Pathologists typically label an entire slide as positive or negative, not each individual patch.",
        'Think about what "weakly supervised" learning means — you have labels at a coarser level than the data.',
      ],
    },
  ],

  "clinical-nlp": [
    {
      id: "q-hc-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Under HIPAA, which of the following is one of the 18 categories of Protected Health Information (PHI) that must be removed during de-identification of clinical text?",
      options: [
        "Patient\'s primary diagnosis code (ICD-10)",
        "Geographic data more specific than state (e.g., city, zip code, street address)",
        "The attending physician\'s medical license number",
        "The number of hospital beds in the treating facility",
      ],
      correctAnswer: 1,
      explanation:
        "HIPAA\'s Safe Harbor method requires removal of 18 specific PHI categories including names, geographic subdivisions smaller than a state, dates (except year) for individuals over 89, phone numbers, email addresses, SSNs, and more. Zip codes finer than the first 3 digits must be removed or generalized.",
      hints: [
        "HIPAA\'s Safe Harbor method enumerates 18 PHI categories; geographic identifiers below the state level are explicitly listed.",
        "Even a patient\'s 5-digit zip code can narrow location to a small community and is considered PHI under Safe Harbor.",
      ],
    },
    {
      id: "q-hc-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Named Entity Recognition (NER) models for clinical de-identification must handle the challenge that the same string (e.g., "Jackson") could be either a patient name (PHI) or a clinical term (e.g., Jackson\'s sign), requiring contextual disambiguation.',
      correctAnswer: "true",
      explanation:
        "Clinical NER de-identification is harder than general NER because medical text contains eponyms (Jackson\'s sign, Addison\'s disease) and abbreviations that overlap with person names, locations, and other PHI — context-sensitive models like BioBERT-based NER substantially outperform rule-based systems on this disambiguation.",
      hints: [
        "Many medical conditions and signs are named after people — these eponyms look identical to person-name PHI.",
        "Contextual models (transformers) capture surrounding words to resolve whether a name-like token is PHI or medical terminology.",
      ],
    },
    {
      id: "q-hc-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The i2b2 (Informatics for Integrating Biology and the Bedside) de-identification shared task evaluates NLP systems on clinical notes. What is the primary evaluation metric used in the i2b2 de-identification track?",
      options: [
        "BLEU score comparing predicted vs. reference redacted text",
        "Entity-level precision, recall, and F1 score over PHI spans",
        "Character error rate (CER) of reconstructed patient records",
        "AUROC of a binary classifier predicting whether a document contains PHI",
      ],
      correctAnswer: 1,
      explanation:
        "The i2b2 de-identification challenge evaluates systems using token- or entity-level precision, recall, and F1 over PHI spans (names, dates, locations, IDs, etc.). High recall is especially critical — missing a PHI span (false negative) is a privacy violation worse than over-redacting.",
      hints: [
        "The task is a span-labelling NER problem; standard NER metrics (P/R/F1 over entity spans) apply.",
        "In privacy-sensitive de-identification, recall of PHI matters more than precision — what does a false negative mean here?",
      ],
    },
  ],

  "ehr-modeling": [
    {
      id: "q-hc-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is a key challenge when modeling longitudinal EHR data with deep learning?",
      options: [
        "EHR data is always complete with no missing values",
        "Irregular time intervals between patient visits and high rates of missing data",
        "EHR systems store data only in image format",
        "Longitudinal EHR data never exceeds 100 time steps per patient",
      ],
      correctAnswer: 1,
      explanation:
        "Patient visits occur at irregular intervals and many measurements are missing (not collected if not clinically indicated), requiring models that handle variable-length sequences and missingness explicitly.",
      hints: [
        "Think about how often a patient visits a doctor — it is not on a fixed daily or weekly schedule.",
        "When a lab test is not ordered, there is no value recorded — that information is absent, not zero.",
      ],
    },
    {
      id: "q-hc-kp5-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "MIMIC-III is a freely accessible critical care EHR database that is widely used for clinical ML research.",
      correctAnswer: "true",
      explanation:
        "MIMIC-III (Medical Information Mart for Intensive Care) contains de-identified data from over 40,000 ICU patients at Beth Israel Deaconess Medical Center and is a standard benchmark for clinical prediction tasks.",
      hints: [
        "MIMIC stands for Medical Information Mart for Intensive Care.",
        "It was released by MIT and requires a data use agreement, but is publicly available to credentialed researchers.",
      ],
    },
    {
      id: "q-hc-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The RETAIN model for EHR was notable because it used attention mechanisms to achieve which property important for clinical deployment?",
      options: [
        "Higher throughput than LSTM baselines",
        "Interpretability — clinicians could see which visits and medical codes influenced the prediction",
        "Elimination of the need for any labeled training data",
        "Perfect handling of missing data through imputation",
      ],
      correctAnswer: 1,
      explanation:
        "RETAIN (REverse Time AttentIoN) uses two attention mechanisms — one over visits and one over medical codes — producing interpretable weights that show which clinical events most influenced the prediction.",
      hints: [
        "RETAIN was designed with clinician trust in mind, not just accuracy.",
        'Its name contains the word "Attention" — think about what attention weights tell you.',
      ],
    },
  ],

  "drug-discovery-ml": [
    {
      id: "q-hc-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does ADMET stand for in drug discovery?",
      options: [
        "Absorption, Distribution, Metabolism, Excretion, Toxicity",
        "Affinity, Docking, Modelling, Efficacy, Testing",
        "Automated Drug Matching and Evaluation Toolkit",
        "Antigen Detection, Membrane Entry, and Toxin",
      ],
      correctAnswer: 0,
      explanation:
        "ADMET properties determine how a drug moves through and is processed by the body (pharmacokinetics) and whether it is toxic — these are critical filters in early drug discovery to reduce late-stage failures.",
      hints: [
        "These five terms describe the journey of a compound from ingestion through the body to elimination.",
        "The last letter stands for a property that can cause a drug candidate to fail safety trials.",
      ],
    },
    {
      id: "q-hc-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Graph Neural Networks (GNNs) are particularly well-suited for molecular property prediction because molecules have a natural graph structure with atoms as nodes and bonds as edges.",
      correctAnswer: "true",
      explanation:
        "Molecular graphs naturally encode chemical structure; GNNs like MPNN, Chemprop, and AttentiveFP learn from these graphs by passing messages between atoms, capturing local chemical environments effectively.",
      hints: [
        "Think about what a molecule looks like drawn on paper — circles (atoms) connected by lines (bonds).",
        "GNNs operate on graph-structured data, passing information along edges between nodes.",
      ],
    },
    {
      id: "q-hc-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which molecular representation encodes a molecule as a fixed-length binary vector where each bit indicates the presence of a particular structural feature or substructure?",
      options: [
        "SMILES string",
        "Molecular fingerprint (e.g., ECFP/Morgan fingerprint)",
        "InChI key",
        "PDB file",
      ],
      correctAnswer: 1,
      explanation:
        "Morgan/ECFP fingerprints hash circular atom neighborhoods into bit vectors; each bit signals the presence of a specific chemical substructure, enabling fast similarity search and use with classical ML models.",
      hints: [
        "This representation is a long binary or count vector, not a string or 3D coordinate file.",
        "It is based on circular neighborhoods around each atom, at a specified radius.",
      ],
    },
  ],

  "protein-structure": [
    {
      id: "q-hc-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In AlphaFold2's output, the pLDDT score (predicted Local Distance Difference Test) ranges from 0 to 100. What does a pLDDT score above 90 indicate?",
      options: [
        "The predicted structure is thermodynamically unstable",
        "Very high per-residue structural confidence — the prediction is expected to be accurate to within ~1.5 Å",
        "The region is a disordered loop that AlphaFold2 cannot model",
        "The sequence alignment contains more than 90% identical homologs",
      ],
      correctAnswer: 1,
      explanation:
        "pLDDT is AlphaFold2's per-residue confidence metric. Scores >90 indicate very high confidence (backbone RMSD typically <1.5 Å from true structure). Scores 70–90 indicate good confidence; 50–70 indicate low confidence (often loops/linkers); <50 indicates disordered or unreliable regions. AlphaFold2 colors its 3D models by pLDDT to guide interpretation.",
      hints: [
        "pLDDT is a self-assessed confidence score, not an external validation metric — higher means the model is confident in that residue\'s position.",
        "Disordered regions of proteins that lack a fixed 3D structure tend to receive low pLDDT scores, which is actually informative.",
      ],
    },
    {
      id: "q-hc-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AlphaFold2's Evoformer module processes a Multiple Sequence Alignment (MSA) of homologous sequences as a key input, exploiting co-evolutionary signals to infer residue-residue contacts.",
      correctAnswer: "true",
      explanation:
        "The Evoformer takes an MSA representation (rows = homologous sequences, columns = residue positions) and jointly updates it with a pairwise residue-residue representation. Correlated mutations between residue pairs across evolution — co-evolutionary signals — provide strong geometric constraints that guide 3D structure prediction.",
      hints: [
        "If two residues that are spatially close in 3D mutate together across evolution, this co-variation is a strong signal for proximity.",
        "The MSA representation has shape (N_seq × N_res); the pair representation has shape (N_res × N_res) — Evoformer updates both jointly.",
      ],
    },
    {
      id: "q-hc-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "AlphaFold2 achieved a median GDT_TS score of approximately 92 on CASP14 free-modelling targets. What does GDT_TS measure?",
      options: [
        "The percentage of residues within 2 Å of the true structure, averaged over all residue pairs",
        "The global distance test score — the average percentage of Cα atoms within 1, 2, 4, and 8 Å cutoffs of the reference structure",
        "The TM-score, which measures template-free structural similarity independent of protein length",
        "The RMSD of all heavy atoms between predicted and experimental structures",
      ],
      correctAnswer: 1,
      explanation:
        "GDT_TS (Global Distance Test Total Score) averages the percentage of Cα atoms within 1, 2, 4, and 8 Å of the reference structure: GDT_TS = (P1 + P2 + P4 + P8) / 4. A score of 92 means AlphaFold2 predictions were competitive with experimental accuracy for the majority of CASP14 targets, a historic milestone in structural biology.",
      hints: [
        "GDT_TS uses four distance cutoffs (1, 2, 4, 8 Å) and averages the fraction of Cα atoms within each — near 100 is perfect.",
        "Prior state-of-the-art methods scored in the 40–60 range on free-modelling targets at CASP13; AlphaFold2's 92 was transformative.",
      ],
    },
  ],

  "genomics-ml": [
    {
      id: "q-hc-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In genomics, what does a variant caller determine from sequencing reads?",
      options: [
        "The 3D folding structure of a protein encoded by a gene",
        "Positions in the genome where the sample differs from a reference genome (SNPs, indels)",
        "The expression level of each gene in a tissue sample",
        "The methylation state of CpG islands",
      ],
      correctAnswer: 1,
      explanation:
        "Variant calling identifies single nucleotide polymorphisms (SNPs) and insertions/deletions (indels) by comparing aligned sequencing reads to a reference genome — a fundamental step in genomics pipelines.",
      hints: [
        'Think about what "variant" means in a genomic context — differences from a reference.',
        "SNPs and indels are the two most common types of genomic variants.",
      ],
    },
    {
      id: "q-hc-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DeepVariant, developed by Google, models variant calling as an image classification problem by converting read pileups into image tensors.",
      correctAnswer: "true",
      explanation:
        "DeepVariant encodes aligned sequencing read pileups as RGB-like images and uses an Inception-based CNN to classify each candidate position as reference, heterozygous variant, or homozygous variant.",
      hints: [
        "Think about how sequencing reads stacked at a genomic position can be visualized — it looks like an image.",
        "Google used a well-known image classification CNN architecture for this task.",
      ],
    },
    {
      id: "q-hc-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Genome-wide association studies (GWAS) identify statistical associations between genetic variants and traits. What is a major limitation that ML methods aim to address?",
      options: [
        "GWAS can only analyze mitochondrial DNA",
        "GWAS tests each variant independently, missing complex polygenic interactions and non-linear effects",
        "GWAS requires whole-genome sequencing of fewer than 100 individuals",
        "GWAS results are always causal, not just associative",
      ],
      correctAnswer: 1,
      explanation:
        "Traditional GWAS tests each SNP independently (marginal associations), missing epistatic interactions. ML methods like polygenic risk score models and neural networks can capture non-linear, combinatorial genetic effects.",
      hints: [
        "GWAS applies a statistical test at each variant position one at a time.",
        'Think about what "epistasis" means — interaction effects between multiple genetic variants.',
      ],
    },
  ],

  "clinical-trials": [
    {
      id: "q-hc-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of randomization in a clinical trial?",
      options: [
        "To ensure all participants receive the experimental treatment",
        "To balance known and unknown confounding factors between treatment and control groups",
        "To reduce the cost of recruiting participants",
        "To allow researchers to choose which patients get the drug",
      ],
      correctAnswer: 1,
      explanation:
        "Randomization distributes both measured and unmeasured confounders evenly across groups, enabling a causal interpretation of the observed treatment effect — the gold standard for causal inference.",
      hints: [
        "Without randomization, patients who choose treatment may differ systematically from those who do not.",
        "Randomization handles confounders we know about and ones we have not even measured.",
      ],
    },
    {
      id: "q-hc-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Adaptive clinical trial designs use interim data to modify trial parameters (e.g., sample size, dose allocation) while maintaining type I error control.",
      correctAnswer: "true",
      explanation:
        "Adaptive designs use pre-specified decision rules and statistical adjustments (e.g., alpha spending functions) to allow mid-trial modifications based on accumulating data without inflating the false positive rate.",
      hints: [
        "Traditional trials fix all parameters before starting; adaptive trials allow changes based on early results.",
        "The key challenge is maintaining statistical validity despite looking at the data during the trial.",
      ],
    },
    {
      id: "q-hc-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ML methods for patient enrollment optimization in clinical trials primarily aim to:",
      options: [
        "Replace the need for a control arm by simulating placebo response",
        "Identify patients most likely to respond to treatment and enrich the trial population for faster signal detection",
        "Guarantee that all enrolled patients will benefit from the experimental treatment",
        "Automate the IRB approval process",
      ],
      correctAnswer: 1,
      explanation:
        "By predicting treatment responders using biomarker and EHR data, ML-guided enrollment enriches the trial with likely responders, reducing required sample size and trial duration while maintaining scientific validity.",
      hints: [
        "Think about what happens to statistical power when you enroll patients who are unlikely to respond.",
        "The goal is to make the treatment effect signal stronger and detectable with fewer patients.",
      ],
    },
  ],

  "survival-analysis": [
    {
      id: "q-hc-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is censoring in survival analysis?",
      options: [
        "Removing outlier patients from the analysis",
        "The situation where the event of interest has not been observed for a patient by the end of follow-up",
        "Blinding the analyst to treatment group assignments",
        "Adjusting for age and sex in a Cox model",
      ],
      correctAnswer: 1,
      explanation:
        "Censoring occurs when a patient leaves the study, is lost to follow-up, or the study ends before the event occurs — we know they survived at least until censoring, but not when (or if) the event occurs later.",
      hints: [
        "Think about a patient who moves away before the study ends — you stop observing them.",
        "Censored patients provide partial information: they survived at least up to the censoring time.",
      ],
    },
    {
      id: "q-hc-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Cox proportional hazards model assumes that the ratio of hazard rates between any two individuals remains constant over time.",
      correctAnswer: "true",
      explanation:
        "The proportional hazards assumption means the hazard ratio between two covariate patterns is constant across time, allowing Cox regression to estimate covariate effects without specifying the baseline hazard function.",
      hints: [
        'This is the "proportional" part of the Cox proportional hazards model name.',
        "If the treatment effect grows or diminishes over time, this assumption would be violated.",
      ],
    },
    {
      id: "q-hc-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DeepHit and similar deep learning survival models extend classical approaches by:",
      options: [
        "Ignoring censored observations entirely",
        "Jointly modeling the time to event and competing risks without the proportional hazards assumption",
        "Replacing the Kaplan-Meier estimator with logistic regression",
        "Requiring complete follow-up data with no censoring",
      ],
      correctAnswer: 1,
      explanation:
        "DeepHit learns a discrete joint distribution over time-to-first-event for competing risks without any parametric assumptions, outperforming Cox models when the proportional hazards assumption is violated.",
      hints: [
        "Think about competing risks — a patient can die from cancer or from heart disease, not both.",
        "Deep learning can model complex, non-proportional hazard shapes that Cox cannot.",
      ],
    },
  ],

  "medical-llms": [
    {
      id: "q-hc-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Med-PaLM 2 achieved a major milestone by reaching expert-level performance on which benchmark?",
      options: [
        "MNIST handwritten digit recognition",
        "US Medical Licensing Examination (USMLE) questions",
        "ImageNet classification",
        "WMT machine translation benchmark",
      ],
      correctAnswer: 1,
      explanation:
        "Med-PaLM 2 scored over 85% on USMLE-style questions, matching or exceeding the passing threshold of expert clinicians — a landmark for clinical AI question answering.",
      hints: [
        "Think about the exam that medical students must pass to practice medicine in the US.",
        'The "Med" prefix in Med-PaLM suggests it was evaluated on medical knowledge questions.',
      ],
    },
    {
      id: "q-hc-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "BioGPT was pre-trained on biomedical literature from PubMed to improve performance on biomedical text mining tasks.",
      correctAnswer: "true",
      explanation:
        "BioGPT (Microsoft) is a GPT-2-style causal language model pre-trained on 15 million PubMed abstracts, achieving state-of-the-art results on biomedical relation extraction, QA, and text generation benchmarks.",
      hints: [
        "BioGPT follows the same pattern as BioBERT — domain-specific pre-training on biomedical text.",
        "PubMed is the primary corpus of biomedical literature containing millions of scientific abstracts.",
      ],
    },
    {
      id: "q-hc-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LLaVA-Med extends the LLaVA multimodal model for medicine by:",
      options: [
        "Training only on text-based clinical notes without any images",
        "Fine-tuning on biomedical image-text pairs to enable visual question answering over medical images",
        "Replacing the vision encoder with a genomics encoder",
        "Using reinforcement learning from human feedback without any supervised training",
      ],
      correctAnswer: 1,
      explanation:
        "LLaVA-Med adapts LLaVA (Large Language and Vision Assistant) with biomedical image-text instruction tuning using figure-caption pairs from PMC, enabling visual question answering over X-rays, pathology slides, and other medical images.",
      hints: [
        "LLaVA-Med extends a multimodal (vision + language) model into the medical domain.",
        "The training data comes from figure-caption pairs in biomedical papers, pairing images with text descriptions.",
      ],
    },
  ],

  "fda-regulation": [
    {
      id: "q-hc-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The FDA classifies Software as a Medical Device (SaMD) into three risk-based classes. An AI/ML algorithm that analyzes retinal images to definitively diagnose diabetic retinopathy and directly drives treatment decisions would most likely fall under which class?",
      options: [
        "Class I — General controls, lowest risk, no 510(k) or PMA required",
        "Class II — Special controls; 510(k) substantial equivalence clearance typically required",
        "Class III — Most stringent; Premarket Approval (PMA) required for novel high-risk devices",
        "Class 0 — Exempt from all FDA oversight as clinical decision support",
      ],
      correctAnswer: 2,
      explanation:
        "Under the SaMD framework and FDA\'s risk classification, AI that drives critical treatment decisions for serious/life-threatening conditions (Class III SaMD in IMDRF terms) maps to FDA Class III, requiring Premarket Approval (PMA). The IDx-DR retinal AI was a notable exception cleared via De Novo pathway because it met certain criteria; novel high-stakes diagnostic AIs without predicate devices typically require PMA.",
      hints: [
        "FDA Class III is for devices that support or sustain human life, prevent impairment of health, or present unreasonable risk — autonomous AI diagnostics driving treatment fall here.",
        "The 510(k) pathway (Class II) requires showing substantial equivalence to a legally marketed predicate device; a novel AI diagnostic algorithm often lacks a predicate.",
      ],
    },
    {
      id: "q-hc-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Under the FDA\'s proposed framework for AI/ML-based SaMD, a "locked" algorithm that does not change after deployment can be updated post-market without notifying the FDA, as long as the changes are minor.',
      correctAnswer: "false",
      explanation:
        'The FDA distinguishes "locked" (static, fixed after validation) from "adaptive" (continuously learning) AI/ML SaMD. Even for locked algorithms, significant changes to the AI function, intended use, or performance characteristics require a new 510(k) or PMA supplement. The FDA\'s Predetermined Change Control Plan (PCCP) framework is being developed to pre-specify and pre-approve acceptable post-market modifications.',
      hints: [
        "Any change to an FDA-cleared device that significantly affects safety or effectiveness requires regulatory notification or submission.",
        "The PCCP concept allows manufacturers to pre-specify planned modifications and get them reviewed upfront — reducing the burden of post-market resubmission for anticipated changes.",
      ],
    },
    {
      id: "q-hc-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The 510(k) premarket notification pathway for AI-based SaMD requires a manufacturer to demonstrate:",
      options: [
        "That the device is more effective than the current gold standard in a randomized controlled trial",
        "Substantial equivalence to a legally marketed predicate device in terms of intended use and technological characteristics",
        "That the AI model achieves >95% accuracy on an independent test set of at least 10,000 samples",
        "That the device has received CE marking in the European Union before FDA submission",
      ],
      correctAnswer: 1,
      explanation:
        "The 510(k) pathway grants clearance when a new device is substantially equivalent to a predicate (a previously cleared or pre-1976 device) in intended use and technological characteristics. If the technological characteristics differ, the manufacturer must show they do not raise new safety/efficacy questions. For AI/ML SaMD, finding an appropriate predicate and demonstrating equivalence of the algorithm\'s performance characteristics is the core regulatory challenge.",
      hints: [
        "510(k) does NOT require clinical trials proving superiority — only substantial equivalence to an existing cleared device.",
        "The predicate device anchors the regulatory pathway; if no predicate exists, the De Novo pathway or PMA is required.",
      ],
    },
  ],

  "federated-healthcare": [
    {
      id: "q-hc-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the core privacy advantage of federated learning in healthcare?",
      options: [
        "It encrypts patient records using AES-256 before storage",
        "Patient data never leaves the local institution — only model updates (gradients) are shared",
        "It anonymizes all data before sending to a central server",
        "It trains models only on synthetic data, never on real patients",
      ],
      correctAnswer: 1,
      explanation:
        "In federated learning, each hospital trains on its local data and sends only gradient updates or model weights to an aggregator — raw patient records are never transmitted, preserving data sovereignty and privacy.",
      hints: [
        "The key idea is that the data stays local while knowledge (from model parameters) is shared.",
        "Think about what is sent to the central server — it is not the training data itself.",
      ],
    },
    {
      id: "q-hc-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Federated learning completely eliminates privacy risk because gradients carry no information about the underlying training data.",
      correctAnswer: "false",
      explanation:
        "Gradient inversion attacks can reconstruct training data from shared gradients, making raw federated learning insufficient for strong privacy guarantees. Techniques like differential privacy or secure aggregation are needed.",
      hints: [
        "Research has shown that gradients can leak information about the data used to compute them.",
        "Differential privacy adds calibrated noise to gradients to provide formal privacy guarantees.",
      ],
    },
    {
      id: "q-hc-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FedAvg (Federated Averaging) aggregates local model updates by:",
      options: [
        "Taking the median of gradients to resist Byzantine failures",
        "Computing a weighted average of local model weights, weighted by each client\'s dataset size",
        "Selecting the best-performing local model and discarding others",
        "Applying a global learning rate to the sum of all client gradients",
      ],
      correctAnswer: 1,
      explanation:
        "FedAvg aggregates by computing ∑(n_k/n)·w_k — a weighted average of local model weights proportional to local dataset size — which converges to the same solution as centralized training under IID data conditions.",
      hints: [
        "FedAvg is the most basic aggregation rule; it weights each institution\'s contribution by its data volume.",
        "A hospital with 10,000 patients contributes more to the aggregated model than one with 500.",
      ],
    },
  ],

  "biosignal-ml": [
    {
      id: "q-hc-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which deep learning architecture is most commonly used for ECG arrhythmia classification from raw waveforms?",
      options: [
        "Vision Transformer (ViT)",
        "1D Convolutional Neural Network or ResNet applied to the time-series waveform",
        "BERT applied to tokenized ECG segments",
        "U-Net for ECG segmentation only",
      ],
      correctAnswer: 1,
      explanation:
        "1D CNNs and 1D ResNets naturally process temporal ECG waveforms as 1D sequences, learning local morphological features (P-wave, QRS complex, T-wave) hierarchically — Rajpurkar\'s Stanford model used this for cardiologist-level arrhythmia detection.",
      hints: [
        "ECG data is a time-series waveform, not a 2D image — consider which convolution dimension fits.",
        "The same ResNet architecture used for images can be adapted to 1D temporal signals.",
      ],
    },
    {
      id: "q-hc-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "EEG signals recorded from scalp electrodes have higher spatial resolution than fMRI for mapping brain function.",
      correctAnswer: "false",
      explanation:
        "EEG has excellent temporal resolution (milliseconds) but poor spatial resolution due to volume conduction through the skull. fMRI has high spatial resolution (~1 mm) but poor temporal resolution (~2 seconds).",
      hints: [
        "EEG electrodes sit on the scalp and measure electrical activity through bone and tissue — this blurs spatial information.",
        "Consider the trade-off: what EEG gains in time precision, it loses in spatial precision.",
      ],
    },
    {
      id: "q-hc-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "PPG (Photoplethysmography) signals from wearable devices can be used to estimate which clinically relevant measurement without a traditional cuff?",
      options: [
        "Blood glucose level",
        "Bone mineral density",
        "Blood oxygen saturation (SpO₂) and heart rate",
        "Intracranial pressure",
      ],
      correctAnswer: 2,
      explanation:
        "PPG measures light absorption changes caused by blood volume pulsing through tissue; by using red and infrared wavelengths, devices can compute SpO₂ via Beer-Lambert law, and heart rate from pulse timing — both now standard in consumer smartwatches.",
      hints: [
        "PPG uses light — think about what physical property of blood changes with each heartbeat.",
        "Pulse oximeters in hospitals use the same physical principle as wearable PPG sensors.",
      ],
    },
  ],

  "surgical-ai": [
    {
      id: "q-hc-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The da Vinci Surgical System is best described as:",
      options: [
        "A fully autonomous robotic surgeon that operates without a human surgeon",
        "A teleoperated robotic system where a surgeon controls robotic arms in real time",
        "An AI system that plans surgical incisions automatically",
        "A diagnostic imaging device for pre-surgical planning",
      ],
      correctAnswer: 1,
      explanation:
        "Da Vinci is a surgeon-controlled teleoperation system — the surgeon sits at a console and controls robotic arms with tremor filtration and motion scaling; it is not autonomous. AI assistance layers are being added on top.",
      hints: [
        "The surgeon is always in the loop — the robot does not act independently.",
        "Teleoperation means controlling a remote device in real time from a distance.",
      ],
    },
    {
      id: "q-hc-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Surgical phase recognition models that segment a surgical video into workflow phases (e.g., cholecystectomy phases) primarily use temporal models such as TCN or LSTM applied to per-frame feature embeddings.",
      correctAnswer: "true",
      explanation:
        "Surgical phase recognition pipelines typically extract per-frame features with a CNN, then apply a temporal model (TCN, LSTM, or Transformer) to capture phase transitions across the video — combining spatial and temporal reasoning.",
      hints: [
        'Recognizing a "phase" requires understanding not just a single frame but the sequence of actions over time.',
        "The pipeline has two stages: spatial feature extraction per frame, then temporal modeling over the sequence.",
      ],
    },
    {
      id: "q-hc-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary purpose of skill assessment models in surgical AI?",
      options: [
        "To replace surgical board certification exams entirely",
        "To automatically evaluate surgeon technical proficiency from tool motion or video data for training feedback",
        "To predict patient outcomes from the surgical report",
        "To schedule operating room time based on surgeon availability",
      ],
      correctAnswer: 1,
      explanation:
        "Surgical skill assessment models analyze instrument kinematics or video to score economy of motion, instrument handling, and procedural efficiency — providing objective, automated feedback for surgical training.",
      hints: [
        "Think about how a surgical trainer evaluates a resident — they watch the movements and technique.",
        "Automated assessment provides scalable, objective feedback without requiring an expert to watch every recording.",
      ],
    },
  ],

  "precision-medicine": [
    {
      id: "q-hc-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Patient stratification in precision medicine aims to:",
      options: [
        "Rank hospitals by patient outcome quality",
        "Identify subgroups of patients who share biological characteristics that predict differential treatment response",
        "Assign patients to clinical trials randomly",
        "Reduce hospital readmission rates through discharge planning",
      ],
      correctAnswer: 1,
      explanation:
        "Stratification finds patient subgroups (by genomics, proteomics, imaging, or clinical features) that respond differently to a treatment, enabling targeted therapies that benefit responders and avoid toxicity in non-responders.",
      hints: [
        'Precision medicine is sometimes called "the right treatment for the right patient at the right time."',
        "If all patients respond identically, stratification is unnecessary — the challenge is heterogeneous responses.",
      ],
    },
    {
      id: "q-hc-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Polygenic Risk Scores (PRS) aggregate the effects of many common genetic variants to estimate an individual\'s genetic predisposition to a disease.",
      correctAnswer: "true",
      explanation:
        "PRS sum the weighted contributions of thousands of SNPs (weights from GWAS effect sizes) to produce a score predicting genetic liability for conditions like coronary artery disease, breast cancer, or type 2 diabetes.",
      hints: [
        'The word "polygenic" means "many genes" — not a single causal mutation but thousands of small effects.',
        "PRS is like a weighted sum where each SNP contributes a small amount based on its GWAS association strength.",
      ],
    },
    {
      id: "q-hc-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In an oncology precision medicine trial, the SHIVA trial tested a molecularly targeted therapy approach and found:",
      options: [
        "Molecularly matched therapies always outperformed conventional chemotherapy across all tumor types",
        "No significant improvement in progression-free survival for molecularly matched versus unmatched therapies overall, highlighting the complexity of tumor biology",
        "Genomic sequencing is not feasible within standard clinical timelines",
        "Targeted therapy eliminated all drug resistance mechanisms",
      ],
      correctAnswer: 1,
      explanation:
        "The SHIVA trial randomized patients to molecularly matched vs. physician\'s choice treatment and found no PFS benefit, illustrating that simple biomarker-drug matching without understanding tumor biology context often fails.",
      hints: [
        "The SHIVA result was surprising and cautionary — simple genomic matching is not always sufficient.",
        "Cancer biology is complex: a mutation does not always mean the corresponding targeted drug will work.",
      ],
    },
  ],

  "drug-repurposing": [
    {
      id: "q-hc-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Drug repurposing (repositioning) refers to:",
      options: [
        "Synthesizing entirely new chemical compounds for new indications",
        "Finding new therapeutic uses for drugs already approved or in development for other conditions",
        "Changing the dosage of an existing drug for the same indication",
        "Switching from brand-name to generic drug formulations",
      ],
      correctAnswer: 1,
      explanation:
        "Drug repurposing leverages existing safety and pharmacokinetic data for approved or abandoned compounds, dramatically reducing development time and cost compared to de novo drug discovery.",
      hints: [
        "A famous example: thalidomide, originally a sedative, was repurposed for multiple myeloma.",
        "If safety is already established, the development timeline to a new indication is much shorter.",
      ],
    },
    {
      id: "q-hc-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Knowledge graphs for drug repurposing integrate heterogeneous biomedical data (genes, drugs, diseases, proteins) as nodes and relationships between them as edges to predict novel drug-disease associations.",
      correctAnswer: "true",
      explanation:
        "Biomedical knowledge graphs (e.g., Hetionet) represent drugs, genes, diseases, and pathways as nodes with typed edges (treats, binds, causes); graph embedding and link prediction then score plausible new drug-disease edges.",
      hints: [
        "A knowledge graph connects entities — think of drugs, targets, diseases all linked by biological relationships.",
        "Link prediction asks: given the existing graph, which drug-disease edge is most likely to be true?",
      ],
    },
    {
      id: "q-hc-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Graph-based drug repurposing methods like DRKG (Drug Repurposing Knowledge Graph) use which technique to generate vector representations of biomedical entities for downstream link prediction?",
      options: [
        "Principal Component Analysis on gene expression matrices",
        "Knowledge graph embedding methods (e.g., TransE, RotatE, DistMult)",
        "Hidden Markov Models on protein sequences",
        "Recurrent neural networks on SMILES strings",
      ],
      correctAnswer: 1,
      explanation:
        "KG embedding methods learn low-dimensional vectors for entities and relations such that the embedding geometry preserves relational structure — TransE models relation as translation (h + r ≈ t), enabling scoring of candidate drug-disease links.",
      hints: [
        "These methods learn embeddings of nodes and edges jointly, so entity vectors encode the graph topology.",
        "TransE is named because it models a relation as a translation (vector addition) in embedding space.",
      ],
    },
  ],

  "epidemic-modeling": [
    {
      id: "q-hc-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the classic SIR compartmental model for epidemic modeling, what do S, I, and R stand for?",
      options: [
        "Symptomatic, Infected, Recovered",
        "Susceptible, Infected (Infectious), Recovered",
        "Screened, Isolated, Released",
        "Spread, Incubation, Removal",
      ],
      correctAnswer: 1,
      explanation:
        "SIR divides the population into Susceptible (can get infected), Infectious (currently spreading the disease), and Recovered (immune or removed) compartments, with transitions governed by transmission and recovery rates.",
      hints: [
        "The first compartment contains people who have not yet had the disease.",
        "The last compartment includes people who can no longer spread the infection.",
      ],
    },
    {
      id: "q-hc-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ML-based epidemic forecasting models like those used by the CDC FluSight challenge have consistently outperformed mechanistic SIR-type models across all time horizons.",
      correctAnswer: "false",
      explanation:
        "Ensemble and mechanistic-ML hybrid models tend to perform best; purely ML models often excel at short-term forecasts but mechanistic models may outperform at longer horizons where biological constraints matter more.",
      hints: [
        "FluSight results show that no single model dominates — ensemble approaches win.",
        "Think about what happens at longer time horizons: pure data-driven models can violate biological constraints.",
      ],
    },
    {
      id: "q-hc-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "During COVID-19, mobility data from smartphones was used in epidemic modeling primarily to:",
      options: [
        "Directly measure the number of infected individuals in real time",
        "Estimate contact rate reductions from social distancing interventions and inform transmission parameters",
        "Replace PCR testing as the primary diagnostic method",
        "Predict individual-level infection risk for contact tracing",
      ],
      correctAnswer: 1,
      explanation:
        "Mobility data (from Google, Apple, SafeGraph) served as a proxy for contact rate changes — reduction in mobility correlated with reduced transmission rate β in SIR-type models, helping quantify intervention effectiveness.",
      hints: [
        "Mobility data tells you how much people moved around — more movement implies more potential contacts.",
        "In epidemic models, the transmission rate depends on how frequently susceptible and infectious people come into contact.",
      ],
    },
  ],

  "mental-health-ai": [
    {
      id: "q-hc-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Digital phenotyping in mental health uses passive data from smartphones to infer:",
      options: [
        "A patient\'s genetic predisposition to mental illness",
        "Behavioral and psychological indicators (mood, activity, social patterns) from sensor and usage data",
        "Brain connectivity patterns from MRI scans",
        "Medication adherence records from pharmacy databases",
      ],
      correctAnswer: 1,
      explanation:
        "Digital phenotyping captures passively sensed behaviors — GPS mobility, screen time, call/text frequency, accelerometry — and infers mental health states like depression or mania episodes without active user input.",
      hints: [
        "Think about what your phone knows about you without you telling it: location, app usage, movement.",
        "The goal is to detect changes in behavior that correlate with mental health episodes.",
      ],
    },
    {
      id: "q-hc-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "NLP analysis of social media text (e.g., Twitter posts) has been validated as a reliable, HIPAA-compliant replacement for clinical psychiatric assessment.",
      correctAnswer: "false",
      explanation:
        "Social media NLP shows research promise for population-level mental health surveillance but is not a clinical diagnostic tool — it lacks the clinical validity, individual-level accuracy, and privacy protections required for HIPAA-compliant patient care.",
      hints: [
        "Population-level trends from social media are different from individual-level clinical diagnosis.",
        "Clinical assessments require validated instruments and professional judgment — social media analysis cannot replace these.",
      ],
    },
    {
      id: "q-hc-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key ethical concern with AI systems designed to predict suicide risk from EHR or behavioral data is:",
      options: [
        "These models are too computationally expensive for hospital deployment",
        "High false positive rates can lead to unnecessary and potentially harmful interventions, while false negatives miss at-risk individuals, and the models may reflect historical disparities in care",
        "The models cannot be trained without genomic data from each patient",
        "Insurance companies require these predictions before covering mental health treatment",
      ],
      correctAnswer: 1,
      explanation:
        "Suicide risk models face dual harm from errors: false positives trigger costly, stigmatizing involuntary holds; false negatives miss at-risk patients. Historical EHR biases also risk perpetuating racial and socioeconomic disparities in care.",
      hints: [
        "Think about the consequences of being wrong in either direction — too many alerts vs. missing someone at risk.",
        "If the training data reflects historical disparities in who received care, those disparities are encoded in the model.",
      ],
    },
  ],

  "healthcare-fairness": [
    {
      id: "q-hc-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The landmark 2019 Obermeyer et al. study revealed racial bias in a widely used healthcare algorithm. What was the nature of the bias?",
      options: [
        "The algorithm systematically overdiagnosed Black patients with rare diseases",
        "The algorithm used healthcare cost as a proxy for health need, underestimating the health needs of Black patients who had historically lower healthcare spending",
        "The algorithm excluded non-English speaking patients from risk predictions",
        "The algorithm performed better on female patients than male patients across all racial groups",
      ],
      correctAnswer: 1,
      explanation:
        "The commercial algorithm predicted future healthcare costs as a proxy for health needs; because Black patients had historically lower access to care (and thus lower costs), the model systematically assigned them lower risk scores despite similar or worse health status.",
      hints: [
        "The proxy variable used — healthcare cost — is itself shaped by systemic inequities in healthcare access.",
        "Lower spending does not mean better health if some groups have historically had less access to care.",
      ],
    },
    {
      id: "q-hc-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "It is mathematically impossible to simultaneously satisfy demographic parity, equalized odds, and calibration fairness criteria in a binary classifier when base rates differ across groups.",
      correctAnswer: "true",
      explanation:
        "Chouldechova\'s impossibility theorem and Kleinberg et al. prove that when base rates differ between groups, no classifier can simultaneously satisfy calibration and equal false positive/negative rates — fairness criteria are fundamentally in tension.",
      hints: [
        "When disease prevalence differs between groups, making a test equally accurate for all cannot also make it equally calibrated across groups.",
        "This is a mathematical impossibility result, not just an empirical observation.",
      ],
    },
    {
      id: "q-hc-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Subgroup performance analysis in healthcare AI fairness evaluations should be conducted along which dimensions?",
      options: [
        "Only overall AUC on the full test set",
        "Race/ethnicity, sex, age, socioeconomic status, geographic region, and any other clinically relevant subgroups",
        "Only the majority demographic group, as it has the most statistical power",
        "Only groups specified by the FDA without additional exploratory analysis",
      ],
      correctAnswer: 1,
      explanation:
        "Comprehensive fairness audits disaggregate performance by race, sex, age, insurance status, site, and intersectional groups — overall metrics can mask severe underperformance in minority subgroups that are underrepresented in training data.",
      hints: [
        "Think about what happens to statistical power when you enroll patients who are unlikely to respond.",
        "The goal is to make the treatment effect signal stronger and detectable with fewer patients.",
      ],
    },
  ],

  "molecular-generation": [
    {
      id: "q-hc-kp21-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In molecular generation with Variational Autoencoders (VAEs), what is the role of the latent space?",
      options: [
        "To store the 3D crystal structure of each generated molecule",
        "To provide a continuous, smooth representation of chemical space that enables interpolation and optimization between molecules",
        "To enforce the valence rules of organic chemistry directly during training",
        "To compute the exact free energy of solvation for each candidate molecule",
      ],
      correctAnswer: 1,
      explanation:
        "The VAE latent space encodes molecules as continuous vectors; nearby points correspond to chemically similar molecules, enabling gradient-based optimization and interpolation to navigate chemical space toward desired property targets.",
      hints: [
        "A smooth, continuous space allows you to move gradually between two molecules and explore intermediate structures.",
        "Bayesian optimization can be applied in this continuous space to find molecules with target properties.",
      ],
    },
    {
      id: "q-hc-kp21-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Diffusion models have been applied to molecular generation by learning to denoise molecular structures from Gaussian noise back to valid 3D conformations.",
      correctAnswer: "true",
      explanation:
        "Models like DiffSBDD, TargetDiff, and DiffMol apply the diffusion framework to 3D molecular geometry — iteratively refining random noise into valid atom coordinates and types conditioned on a protein pocket or desired properties.",
      hints: [
        "Diffusion models learn to reverse a noise process — the same framework used for image generation (DALL-E, Stable Diffusion).",
        "Applying this to molecules means starting from random atom positions and refining them toward a valid structure.",
      ],
    },
    {
      id: "q-hc-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge in evaluating molecular generation models is assessing whether generated molecules are not just valid and novel, but also:",
      options: [
        "Shorter than 5 atoms in length for computational efficiency",
        "Drug-like and synthesizable — satisfying properties like Lipinski\'s Rule of Five and having a predicted synthetic route",
        "Identical to known FDA-approved drugs in the training set",
        "Generated faster than 1 millisecond per molecule on CPU hardware",
      ],
      correctAnswer: 1,
      explanation:
        "Standard metrics (validity, uniqueness, novelty) are necessary but insufficient; generated molecules must also be drug-like (Lipinski, QED) and synthetically accessible (SA score, ASKCOS route prediction) to be practically useful.",
      hints: [
        "Generating a valid SMILES is easy — the hard part is generating something a chemist can actually make.",
        "Lipinski\'s Rule of Five captures the properties of orally bioavailable drugs: molecular weight, logP, H-bond donors/acceptors.",
      ],
    },
  ],

  "de-novo-drug": [
    {
      id: "q-hc-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In de novo drug design with Reinforcement Learning, the reward signal is typically derived from:",
      options: [
        "Human expert ratings provided after each generated molecule",
        "Predicted property scores (e.g., docking score, QED, SA score) computed by external oracles for each generated molecule",
        "The log-likelihood of the molecule under the generation model itself",
        "The molecular weight of the generated compound",
      ],
      correctAnswer: 1,
      explanation:
        "RL for drug design uses property predictors (docking engines, ADMET models, QED calculators) as reward oracles — the generator is trained to maximize expected reward, steering generation toward molecules with desired pharmacological profiles.",
      hints: [
        "In RL, the agent receives a reward signal from the environment — what plays the role of the environment in drug design?",
        "External computational tools (docking, property prediction) act as the reward function.",
      ],
    },
    {
      id: "q-hc-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "REINVENT is an RL-based molecular generation framework that uses a prior language model to prevent the agent from generating chemically unreasonable molecules during optimization.",
      correctAnswer: "true",
      explanation:
        "REINVENT uses a pre-trained prior (RNN on SMILES) as a regularizer in the RL objective — the agent is penalized for deviating too far from the prior, maintaining chemical validity and drug-likeness during reward-driven optimization.",
      hints: [
        "Without regularization, RL reward hacking can lead to molecules that maximize the score but are chemically nonsensical.",
        "The prior acts as a constraint: stay reasonably close to drug-like chemical space while optimizing for the target.",
      ],
    },
    {
      id: "q-hc-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'A common failure mode in RL-based molecular optimization called "reward hacking" occurs when:',
      options: [
        "The model converges too slowly due to sparse reward signals",
        "The agent exploits imperfections in the proxy reward model to generate molecules that score high in silico but fail in biochemical assays",
        "The RL policy gradient has a vanishing gradient problem for long SMILES strings",
        "Multiple GPUs cause gradient synchronization errors during distributed training",
      ],
      correctAnswer: 1,
      explanation:
        "Proxy reward models (QSAR models, docking scores) are imperfect surrogates for true activity; the RL agent finds inputs that exploit model blind spots, scoring high in silico but failing in biochemical assays — a critical validation challenge.",
      hints: [
        "The RL agent is trying to maximize the proxy score, not the true biological activity.",
        "Any gap between the proxy model and reality can be exploited by a powerful optimizer.",
      ],
    },
  ],

  "multiomics-ml": [
    {
      id: "q-hc-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Multi-omics integration combines data from which types of molecular measurements?",
      options: [
        "Only genomics and proteomics",
        "Genomics, transcriptomics, proteomics, metabolomics, and epigenomics (among others)",
        "Only imaging and clinical lab values",
        "Only genomics and clinical notes",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-omics integrates multiple molecular layers — DNA variants (genomics), RNA expression (transcriptomics), protein abundance (proteomics), metabolite levels (metabolomics), and methylation (epigenomics) — to get a richer biological picture.",
      hints: [
        'Each "-omics" layer captures a different molecular level of biological information.',
        'The suffix "-omics" refers to comprehensive measurement of a class of molecules (genes, transcripts, proteins, metabolites).',
      ],
    },
    {
      id: "q-hc-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'The "curse of dimensionality" is particularly severe in multi-omics ML because combining multiple omics layers dramatically increases feature dimensionality relative to available patient samples.',
      correctAnswer: "true",
      explanation:
        "Each omics layer can have tens of thousands of features (e.g., 20,000+ genes, 10,000+ proteins); combining layers creates feature spaces with n ≪ p (few samples, many features), necessitating dimensionality reduction, regularization, or feature selection.",
      hints: [
        "Typical multi-omics studies may have hundreds to thousands of patients but hundreds of thousands of features.",
        "When features vastly outnumber samples, overfitting becomes a severe problem.",
      ],
    },
    {
      id: "q-hc-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-Omics Factor Analysis (MOFA) integrates multiple omics datasets by:",
      options: [
        "Training a separate neural network for each omics layer and concatenating the outputs",
        "Learning shared and layer-specific latent factors that explain variance across omics datasets simultaneously",
        "Applying PCA independently to each omics layer and concatenating the top components",
        "Using a GAN to generate synthetic cross-omics pairs for data augmentation",
      ],
      correctAnswer: 1,
      explanation:
        "MOFA is a probabilistic factor analysis framework that decomposes multiple omics matrices into shared latent factors, identifying coordinated variation across molecular layers and enabling downstream sample clustering and biomarker discovery.",
      hints: [
        "Factor analysis finds latent variables that explain observed variance — MOFA extends this to multiple data types simultaneously.",
        "The key innovation is discovering which latent factors are shared across omics layers versus specific to one layer.",
      ],
    },
  ],

  "medical-report-gen": [
    {
      id: "q-hc-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Medical report generation from chest X-rays is typically formulated as which type of machine learning task?",
      options: [
        "Image clustering",
        "Image-to-text generation (visual captioning / report generation)",
        "Image super-resolution",
        "Time-series forecasting",
      ],
      correctAnswer: 1,
      explanation:
        "Medical report generation is an image captioning task: given a chest X-ray (or other medical image), the model generates a free-text radiology report describing findings — requiring joint vision and language modeling.",
      hints: [
        "The output is a paragraph of text describing what is visible in the image.",
        "This is analogous to image captioning for natural images, but applied to medical images with clinical language.",
      ],
    },
    {
      id: "q-hc-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Standard NLP metrics like BLEU and ROUGE are sufficient to fully evaluate the clinical quality of AI-generated radiology reports.",
      correctAnswer: "false",
      explanation:
        "BLEU/ROUGE measure n-gram overlap, not clinical correctness — a report can score high on BLEU while missing critical findings or containing factual errors. Clinical factuality metrics (e.g., CheXpert label F1, RadGraph F1) and radiologist evaluation are also needed.",
      hints: [
        "BLEU measures word overlap with reference text — is word overlap the same as medical accuracy?",
        "A report could use different words than the reference but still be clinically accurate, or use similar words but miss key findings.",
      ],
    },
    {
      id: "q-hc-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "hallucination" problem in medical report generation refers to:',
      options: [
        "The model generating reports that are too short to be clinically useful",
        "The model generating plausible-sounding but factually incorrect clinical findings not supported by the image",
        "The model refusing to generate reports for pathological images",
        "The model generating reports in the wrong language",
      ],
      correctAnswer: 1,
      explanation:
        'Hallucination in medical report generation is a safety-critical failure: the model produces confident, fluent text describing findings (e.g., "bilateral infiltrates") that are not actually visible in the image — a dangerous error in clinical contexts.',
      hints: [
        "This is the same hallucination problem seen in general LLMs, but with severe consequences in medical settings.",
        "The model generates text that sounds clinically appropriate but does not accurately describe what is in the image.",
      ],
    },
  ],

  "clinical-decision-support": [
    {
      id: "q-hc-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the following best describes a Clinical Decision Support System (CDSS)?",
      options: [
        "A system that autonomously prescribes medications without physician review",
        "A tool that provides clinicians with patient-specific assessments, recommendations, or alerts to support clinical decisions",
        "An administrative system for managing hospital billing and coding",
        "A patient-facing app for self-diagnosis",
      ],
      correctAnswer: 1,
      explanation:
        "CDSS tools augment — not replace — clinician judgment by surfacing relevant evidence, risk scores, or guideline-based alerts at the point of care, keeping the clinician in the decision loop.",
      hints: [
        'The key word is "support" — the system assists a human decision-maker rather than acting autonomously.',
        "Examples include sepsis early warning alerts, drug interaction checkers, and diagnostic suggestion tools.",
      ],
    },
    {
      id: "q-hc-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        '"Alert fatigue" is a recognized problem with CDSS systems where clinicians begin ignoring or overriding alerts due to excessive, low-specificity notifications.',
      correctAnswer: "true",
      explanation:
        "Studies show override rates for CDSS alerts can exceed 90%; too many low-value alerts train clinicians to dismiss them reflexively, potentially causing them to miss truly critical alerts — a paradox of over-alerting reducing safety.",
      hints: [
        "Think about what happens when a car alarm goes off constantly — people stop paying attention.",
        "The problem is not the existence of alerts but their volume and specificity — too many false positives desensitize users.",
      ],
    },
    {
      id: "q-hc-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The APACHE II score is an example of a classical CDSS scoring system for ICU patients. What does it predict?",
      options: [
        "The optimal antibiotic regimen for a specific infection",
        "The risk of in-hospital mortality based on physiological variables, age, and chronic health status",
        "The probability of hospital-acquired infection within 72 hours",
        "The optimal ventilator settings for a mechanically ventilated patient",
      ],
      correctAnswer: 1,
      explanation:
        "APACHE II (Acute Physiology and Chronic Health Evaluation II) uses 12 routine physiological measurements plus age and chronic health points to estimate ICU mortality risk — a foundational clinical scoring tool predating ML-based risk models.",
      hints: [
        "APACHE is used to classify ICU disease severity — what is the most important outcome in an ICU setting?",
        "It uses variables like temperature, heart rate, blood pressure, and creatinine that are routinely measured on admission.",
      ],
    },
  ],

  "wearable-health": [
    {
      id: "q-hc-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Edge AI in wearable health monitoring refers to:",
      options: [
        "Running AI inference in the cloud and streaming results to the wearable",
        "Running ML inference directly on the wearable device\'s local processor without sending data to the cloud",
        "Using edge servers in hospitals to process wearable data",
        "Deploying AI at the edge of hospital networks for imaging analysis",
      ],
      correctAnswer: 1,
      explanation:
        "Edge AI runs inference on-device (microcontroller, mobile SoC) enabling real-time, low-latency health monitoring without continuous cloud connectivity, reducing privacy exposure and battery consumption from data transmission.",
      hints: [
        "Think about a smartwatch detecting atrial fibrillation — should it wait for a cloud connection or alert you immediately?",
        'The "edge" refers to processing at the data source (the device) rather than centralizing it remotely.',
      ],
    },
    {
      id: "q-hc-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Model quantization (e.g., INT8 or INT4) is commonly used to deploy ML models on wearable devices because it reduces model size and inference latency at the cost of some accuracy.",
      correctAnswer: "true",
      explanation:
        "Quantization reduces weight precision from FP32 to INT8/INT4, shrinking model size 4-8× and accelerating inference on low-power hardware (NPUs, ARM Cortex-M) with typically <1-2% accuracy degradation for well-quantized models.",
      hints: [
        "Wearable microcontrollers have kilobytes of RAM, not gigabytes — the model must fit in very limited memory.",
        "Quantization trades numerical precision for efficiency — fewer bits per weight means smaller, faster models.",
      ],
    },
    {
      id: "q-hc-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which technique allows wearable health ML models to adapt to individual users over time without requiring data to be sent to a central server?",
      options: [
        "Transfer learning from ImageNet pre-trained models",
        "On-device personalization / federated meta-learning with local fine-tuning",
        "Batch normalization layer freezing",
        "Knowledge distillation from a teacher model in the cloud",
      ],
      correctAnswer: 1,
      explanation:
        "Federated learning with local fine-tuning (or federated meta-learning approaches like Per-FedAvg) allows models to personalize on local user data without transmitting it, adapting to individual physiological baselines and activity patterns.",
      hints: [
        "Personalization requires using the individual\'s own data — the challenge is doing this without central data collection.",
        "Federated learning keeps data on-device; meta-learning provides a model initialization that adapts quickly.",
      ],
    },
  ],

  "synthetic-health-data": [
    {
      id: "q-hc-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The primary motivation for generating synthetic health data is:",
      options: [
        "To replace all real patient data in clinical databases",
        "To enable data sharing for research and model training while preserving patient privacy",
        "To reduce the cost of running clinical trials by replacing real patients",
        "To inflate dataset sizes beyond what is statistically meaningful",
      ],
      correctAnswer: 1,
      explanation:
        "Synthetic health data mimics the statistical properties of real patient data without containing real patients' information, enabling research data sharing, ML training, and algorithm testing while addressing privacy and regulatory barriers.",
      hints: [
        "The core value is enabling data sharing where real data cannot be shared due to privacy concerns.",
        "Synthetic data preserves statistical patterns while not being traceable to any real individual.",
      ],
    },
    {
      id: "q-hc-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Membership inference attacks can determine whether a specific real patient\'s record was used in training a generative model, posing a privacy risk even for synthetic data.",
      correctAnswer: "true",
      explanation:
        "Membership inference attacks query a generative model to infer whether a specific record was in the training set; if the model memorizes training data, synthetic outputs can leak information about real individuals — motivating differential privacy in synthesis.",
      hints: [
        'Just because data is called "synthetic" does not mean the generative model cannot leak information about its training set.',
        "Membership inference attacks probe the model with a specific record and observe the model\'s response to infer training membership.",
      ],
    },
    {
      id: "q-hc-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which metric is commonly used to evaluate whether a synthetic health dataset preserves the statistical properties of the real data while maintaining privacy?",
      options: [
        "Pixel-level PSNR (Peak Signal-to-Noise Ratio)",
        "Train-on-Synthetic-Test-on-Real (TSTR) accuracy alongside privacy metrics like nearest-neighbor distance ratios",
        "Perplexity of a language model trained on the synthetic data",
        "Precision and recall on the ImageNet benchmark",
      ],
      correctAnswer: 1,
      explanation:
        "TSTR evaluates utility: train a downstream model on synthetic data, test on real — if accuracy matches Train-on-Real-Test-on-Real (TRTR), the synthetic data is useful. Nearest-neighbor ratios and DCR (Distance to Closest Record) assess privacy leakage.",
      hints: [
        "The utility of synthetic health data is ultimately measured by how well models trained on it work on real patients.",
        "Privacy is measured by how close synthetic records are to their real training counterparts.",
      ],
    },
  ],

  "health-outcome-prediction": [
    {
      id: "q-hc-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The CHADS₂ score is a classic clinical risk score used to predict:",
      options: [
        "Surgical complication risk in cardiac surgery",
        "Stroke risk in patients with atrial fibrillation",
        "Sepsis onset within 24 hours in ICU patients",
        "30-day readmission risk after hospital discharge",
      ],
      correctAnswer: 1,
      explanation:
        "CHADS₂ (Congestive heart failure, Hypertension, Age ≥75, Diabetes, Stroke history) scores stroke risk in atrial fibrillation patients to guide anticoagulation therapy decisions — a simple but effective additive risk score.",
      hints: [
        "Each letter in CHADS₂ is a risk factor — the score sums up how many apply to a patient.",
        "Atrial fibrillation is a cardiac arrhythmia that increases the risk of a specific serious complication.",
      ],
    },
    {
      id: "q-hc-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "XGBoost and gradient boosting models consistently outperform deep learning models for structured tabular EHR data in health outcome prediction tasks.",
      correctAnswer: "false",
      explanation:
        "Gradient boosting (XGBoost, LightGBM) frequently outperforms deep learning on small-to-medium tabular EHR datasets, but deep learning (Transformer-based models) can surpass them on large datasets with complex temporal patterns.",
      hints: [
        "The answer depends heavily on dataset size and temporal complexity.",
        "For tabular data with moderate sample sizes, tree-based methods often win; for large longitudinal datasets, deep models can excel.",
      ],
    },
    {
      id: "q-hc-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Calibration of a health risk prediction model is important because:",
      options: [
        "It ensures the model runs faster at inference time",
        "A well-calibrated model\'s predicted probabilities accurately reflect the true likelihood of the outcome, which is essential for clinical decision-making",
        "Calibration is only needed for models deployed in dermatology",
        "It guarantees the model is fair across demographic subgroups",
      ],
      correctAnswer: 1,
      explanation:
        "If a model predicts 70% risk, true event frequency among such predictions should be ~70%; miscalibration causes clinicians to over- or under-treat based on misleading probability estimates — calibration curves and Platt scaling are standard correction tools.",
      hints: [
        "Discrimination (AUC) tells you if the model ranks patients correctly; calibration tells you if the predicted probabilities are accurate.",
        "A doctor who trusts model probabilities needs those probabilities to reflect real-world event rates.",
      ],
    },
  ],

  "imaging-biomarkers": [
    {
      id: "q-hc-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Radiomics refers to:",
      options: [
        "The use of radioactive tracers in PET imaging",
        "High-throughput extraction of quantitative features (texture, shape, intensity) from medical images for downstream analysis",
        "A type of MRI sequence that measures radiofrequency absorption",
        "The study of radiation dose optimization in CT scanning",
      ],
      correctAnswer: 1,
      explanation:
        "Radiomics extracts hundreds or thousands of quantitative features (texture, morphology, wavelet-based features) from medical images, converting visual information into mineable data for biomarker discovery and outcome prediction.",
      hints: [
        'The "omics" suffix signals high-throughput quantitative analysis — applied to imaging data.',
        "Instead of a radiologist\'s qualitative description, radiomics produces a large feature vector from the image.",
      ],
    },
    {
      id: "q-hc-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Radiomic features extracted from medical images are highly reproducible across different scanners and acquisition protocols without any harmonization.",
      correctAnswer: "false",
      explanation:
        "Radiomic features are notoriously sensitive to scanner manufacturer, acquisition protocol (slice thickness, reconstruction kernel), and segmentation variability — harmonization methods (ComBat, normalization) are essential for multi-site studies.",
      hints: [
        "Think about how differently two scanners might reconstruct the same patient\'s CT scan with different settings.",
        "Texture features in particular are strongly affected by image reconstruction parameters.",
      ],
    },
    {
      id: "q-hc-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Deep learning-based imaging biomarkers differ from handcrafted radiomic features in that they:",
      options: [
        "Can only analyze 2D images, not volumetric 3D data",
        "Learn task-relevant representations directly from data without manual feature engineering, potentially capturing patterns beyond human visual intuition",
        "Always require pixel-level annotation for every training image",
        "Are computationally cheaper to extract than handcrafted radiomic pipelines",
      ],
      correctAnswer: 1,
      explanation:
        "Deep learning features are learned end-to-end, discovering image patterns most predictive of the target outcome — they can capture subtle, non-obvious features that handcrafted radiomic pipelines miss, at the cost of interpretability.",
      hints: [
        "Handcrafted radiomics requires domain experts to define which features to extract; deep learning automates this.",
        "The trade-off is interpretability: we know what a texture feature measures, but a deep feature may be opaque.",
      ],
    },
  ],

  "real-world-evidence": [
    {
      id: "q-hc-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Real-World Evidence (RWE) in healthcare refers to evidence derived from:",
      options: [
        "Randomized controlled trials conducted in academic medical centers",
        "Observational data collected in routine clinical practice (EHR, claims, registries, wearables)",
        "Animal studies conducted before human clinical trials",
        "Phase III trial data submitted to regulatory agencies",
      ],
      correctAnswer: 1,
      explanation:
        "RWE comes from real-world data (RWD) collected outside controlled trials — EHR records, insurance claims, patient registries, and wearables — reflecting how treatments perform in diverse real-world patient populations.",
      hints: [
        "The contrast is with randomized controlled trials, which have strict inclusion/exclusion criteria.",
        "Real-world data reflects actual clinical practice, not a controlled experimental setting.",
      ],
    },
    {
      id: "q-hc-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Confounding by indication is a specific bias in observational studies where sicker patients are more likely to receive a treatment, making the treatment appear harmful even if it is beneficial.",
      correctAnswer: "true",
      explanation:
        "Confounding by indication occurs when the reason a patient receives treatment (they are sicker) is also associated with the outcome — crude observational estimates attribute the poorer outcomes of sick patients to the treatment itself.",
      hints: [
        "Think about who gets intensive chemotherapy — they have more severe disease, which independently worsens outcomes.",
        "The confounding variable is disease severity, which affects both treatment assignment and the outcome.",
      ],
    },
    {
      id: "q-hc-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Propensity score matching in observational RWE studies attempts to:",
      options: [
        "Increase sample size by oversampling treated patients",
        "Balance covariate distributions between treated and untreated groups to reduce confounding, mimicking randomization",
        "Extrapolate RCT results to broader patient populations",
        "Identify causal mechanisms through instrumental variable estimation",
      ],
      correctAnswer: 1,
      explanation:
        "Propensity scores model the probability of receiving treatment given observed covariates; matching or weighting by propensity score creates comparable treated and control groups with similar covariate distributions, reducing observed confounding.",
      hints: [
        "Propensity scores summarize all observed confounders into a single probability.",
        "By matching patients with similar propensity scores, you create groups that look similar on measured characteristics — like a pseudo-randomization.",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
