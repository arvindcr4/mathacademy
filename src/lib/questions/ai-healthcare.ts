import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

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
        "Think about which dataset CheXNet was benchmarked on - it contains 14 chest pathology labels.",
        "CheXNet gained fame for matching radiologists on a very common respiratory illness diagnosis.",
      ],
    },
    {
      id: "q-hc-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "EyePACS is a dataset used for detecting diabetic retinopathy from fundus photographs.",
      correctAnswer: "True",
      explanation:
        "EyePACS is a large-scale fundus image dataset used in the Kaggle Diabetic Retinopathy Detection challenge, containing graded retinal photographs for training automated screening models.",
      hints: [
        "EyePACS operates a diabetic retinopathy screening program in community health settings.",
        "The dataset contains fundus photographs - images of the back of the eye.",
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
        "Grad-CAM produces heatmaps by computing gradients of the class score with respect to feature maps, highlighting which image regions drove the classification - critical for clinical trust and validation.",
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
      correctAnswer: "False",
      explanation:
        "MRI uses magnetic fields and radio waves - no ionizing radiation. CT scans use X-rays (ionizing radiation), which is why radiation dose management is a concern for CT but not MRI.",
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
        "The Dice Similarity Coefficient is defined as:\n\n" +
        "\\[\\text{DSC} = \\frac{2|A \\cap B|}{|A| + |B|}\\]" +
        "\n\nThis formula measures the spatial overlap between the predicted and ground-truth masks. A DSC of 1.0 means perfect overlap; 0 means no overlap. It is the standard evaluation metric for medical image segmentation tasks.",
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
        "WSIs can be 100,000\\times100,000 pixels or more; loading them into GPU memory is impossible. The standard approach is Multiple Instance Learning (MIL) on extracted patches.",
      hints: [
        "Think about how many pixels a 40\\times magnification slide contains - it is measured in gigapixels.",
        "The solution involves dividing the image into smaller pieces called patches or tiles.",
      ],
    },
    {
      id: "q-hc-kp3-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Stain normalization is an important preprocessing step in computational pathology because H&E staining appearance can vary significantly across different labs and scanners.",
      correctAnswer: "True",
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
        'In MIL, a slide is treated as a "bag" of patch "instances." Only the bag (slide) label - e.g., cancer/no cancer - is needed; the model learns which patches are informative without costly patch-level annotation.',
      hints: [
        "Pathologists typically label an entire slide as positive or negative, not each individual patch.",
        'Think about what "weakly supervised" learning means - you have labels at a coarser level than the data.',
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
      correctAnswer: "True",
      explanation:
        "Clinical NER de-identification is harder than general NER because medical text contains eponyms (Jackson\'s sign, Addison\'s disease) and abbreviations that overlap with person names, locations, and other PHI - context-sensitive models like BioBERT-based NER substantially outperform rule-based systems on this disambiguation.",
      hints: [
        "Many medical conditions and signs are named after people - these eponyms look identical to person-name PHI.",
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
        "The i2b2 de-identification challenge evaluates systems using token- or entity-level precision, recall, and F1 over PHI spans (names, dates, locations, IDs, etc.). High recall is especially critical - missing a PHI span (false negative) is a privacy violation worse than over-redacting.",
      hints: [
        "The task is a span-labelling NER problem; standard NER metrics (P/R/F1 over entity spans) apply.",
        "In privacy-sensitive de-identification, recall of PHI matters more than precision - what does a false negative mean here?",
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
        "First, let's recall that Electronic Health Records (EHR) capture patient data over multiple visits spanning months or years. " +
        "A fundamental challenge is that patient visits occur at irregular intervals - a patient might return in 3 days or 6 months depending on their condition. " +
        "Additionally, not all measurements are taken at every visit; many values are missing because they were not clinically indicated at that time. " +
        "**Step 1:** Recognize that patient visits are inherently irregular and do not follow fixed time schedules. " +
        "**Step 2:** Understand that EHR data has high rates of missingness - many observations are absent because they were not measured or recorded. " +
        "**Step 3:** Note that deep learning models must explicitly handle variable-length sequences and missing data, often using techniques like RNNs with masking, attention mechanisms, or imputation strategies. " +
        "Therefore, the answer is irregular time intervals between patient visits and high rates of missing data.",
    },
    {
      id: "q-hc-kp5-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "MIMIC-III is a freely accessible critical care EHR database that is widely used for clinical ML research.",
      correctAnswer: "True",
      explanation:
        "First, let's recall that MIMIC-III (Medical Information Mart for Intensive Care) is a large, publicly available database of critical care patients. " +
        "It was developed by MIT and contains de-identified electronic health records from over 40,000 patients who stayed in the ICU at Beth Israel Deaconess Medical Center. " +
        "The dataset includes vital signs, laboratory tests, medications, notes, and other clinical data collected during routine care. " +
        "**Step 1:** Understand that MIMIC-III is freely accessible to credentialed researchers after completing a data use agreement. " +
        "**Step 2:** Recognize that it has become a standard benchmark dataset for developing and evaluating clinical machine learning models. " +
        "**Step 3:** Note that the dataset covers diverse clinical prediction tasks including mortality prediction, length of stay estimation, and organ failure assessment. " +
        "Therefore, the answer is True.",
    },
    {
      id: "q-hc-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The RETAIN model for EHR was notable because it used attention mechanisms to achieve which property important for clinical deployment?",
      options: [
        "Higher throughput than LSTM baselines",
        "Interpretability - clinicians could see which visits and medical codes influenced the prediction",
        "Elimination of the need for any labeled training data",
        "Perfect handling of missing data through imputation",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall that RETAIN (REverse Time AttentIoN) is an interpretable deep learning model designed for longitudinal EHR analysis. " +
        "Clinical deployment of AI models requires clinician trust, which is difficult to achieve with black-box predictions. " +
        "RETAIN addresses this by using a hierarchical attention mechanism that produces interpretable weights. " +
        "**Step 1:** Understand that RETAIN uses two levels of attention - one at the visit level and one at the medical code level within each visit. " +
        "**Step 2:** Recognize that these attention weights reveal which visits and which specific medical codes most influenced the model's prediction. " +
        "**Step 3:** Note that clinicians can examine these weights to validate whether the model's reasoning aligns with clinical intuition, building trust in the model's predictions. " +
        "Therefore, the answer is interpretability - clinicians could see which visits and medical codes influenced the prediction.",
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
        "First, let's recall that ADMET represents the five key pharmacokinetic properties used to evaluate drug candidates. " +
        "These properties determine how a drug is absorbed, distributed throughout the body, metabolized, excreted, and whether it causes toxicity. " +
        "Evaluating these properties early in drug discovery helps identify and eliminate candidates likely to fail in later, more expensive clinical trials. " +
        "**Step 1:** Absorption - how the drug enters the bloodstream from its site of administration. " +
        "**Step 2:** Distribution - how the drug spreads through body tissues and compartments. " +
        "**Step 3:** Metabolism, Excretion, and Toxicity - how the body processes and eliminates the drug, and whether the compound causes harmful effects. " +
        "Therefore, the answer is Absorption, Distribution, Metabolism, Excretion, Toxicity.",
    },
    {
      id: "q-hc-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Graph Neural Networks (GNNs) are particularly well-suited for molecular property prediction because molecules have a natural graph structure with atoms as nodes and bonds as edges.",
      correctAnswer: "True",
      explanation:
        "First, let's recall that molecules have a natural graph representation where atoms are nodes and chemical bonds are edges. " +
        "This graph structure encodes important chemical information about connectivity and local chemical environments. " +
        "Traditional ML approaches require fixed-size feature vectors, but molecular data varies in size and connectivity. " +
        "**Step 1:** Understand that GNNs operate directly on graph-structured data, making them well-suited for molecules with their natural graph representation. " +
        "**Step 2:** Recognize that GNNs like MPNN, Chemprop, and AttentiveFP pass messages between atoms along bonds, learning to capture local chemical environments. " +
        "**Step 3:** Note that this message-passing approach allows GNNs to learn molecular representations that outperform hand-crafted features for property prediction. " +
        "Therefore, the answer is True.",
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
        "First, let's recall that molecular fingerprints are fixed-length binary vectors used to represent molecular structure computationally. " +
        "Morgan fingerprints (also known as Extended-Connectivity Fingerprints or ECFP) are computed by analyzing circular neighborhoods around each atom up to a specified radius. " +
        "Each bit position in the fingerprint corresponds to whether a particular chemical substructure is present in the molecule. " +
        "**Step 1:** Understand that Morgan/ECFP fingerprints encode the presence of specific chemical substructures as bits in a fixed-length vector. " +
        "**Step 2:** Recognize that these fingerprints enable fast molecular similarity search by comparing bit vectors using metrics like Tanimoto similarity. " +
        "**Step 3:** Note that fingerprints are particularly useful with classical ML models that require fixed-size numerical input. " +
        "Therefore, the answer is Molecular fingerprint (e.g., ECFP/Morgan fingerprint).",
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
        "Very high per-residue structural confidence - the prediction is expected to be accurate to within ~1.5 Å",
        "The region is a disordered loop that AlphaFold2 cannot model",
        "The sequence alignment contains more than 90% identical homologs",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall that pLDDT (predicted Local Distance Difference Test) is AlphaFold2's per-residue confidence metric, ranging from 0 to 100. " +
        "AlphaFold2 uses this score to indicate how confident the model is about the predicted position of each amino acid in the 3D structure. " +
        "This self-assessed confidence helps biologists interpret which parts of the prediction are reliable. " +
        "**Step 1:** Understand that scores above 90 indicate very high confidence in the predicted residue positions. " +
        "**Step 2:** Recognize that such high confidence typically corresponds to backbone RMSD errors of approximately 1.5 Angstroms or less from the true structure. " +
        "**Step 3:** Note that AlphaFold2 visualizes this by coloring the 3D structure by pLDDT score, allowing researchers to quickly identify reliable vs. disordered regions. " +
        "Therefore, the answer is Very high per-residue structural confidence - the prediction is expected to be accurate to within ~1.5 Å.",
      hints: [
        "pLDDT is a self-assessed confidence score, not an external validation metric - higher means the model is confident in that residue\'s position.",
        "Disordered regions of proteins that lack a fixed 3D structure tend to receive low pLDDT scores, which is actually informative.",
      ],
    },
    {
      id: "q-hc-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AlphaFold2's Evoformer module processes a Multiple Sequence Alignment (MSA) of homologous sequences as a key input, exploiting co-evolutionary signals to infer residue-residue contacts.",
      correctAnswer: "True",
      explanation:
        "First, let's recall that AlphaFold2's Evoformer module is the core neural network architecture that processes multiple representations of the protein sequence. " +
        "One of its key inputs is a Multiple Sequence Alignment (MSA) containing homologous sequences from diverse species, which provides evolutionary information. " +
        "The MSA captures which residues tend to co-vary across evolution - when two residues are spatially close, mutations in one often select for compensating mutations in the other. " +
        "**Step 1:** Understand that the MSA representation has shape (N_sequences x N_residues) while a pairwise representation captures residue-residue relationships. " +
        "**Step 2:** Recognize that the Evoformer jointly updates both representations, allowing co-evolutionary signals to inform contact predictions. " +
        "**Step 3:** Note that correlated mutations (co-evolution) provide geometric constraints that guide the model toward accurate 3D structure prediction. " +
        "Therefore, the answer is True.",
      hints: [
        "If two residues that are spatially close in 3D mutate together across evolution, this co-variation is a strong signal for proximity.",
        "The MSA representation has shape (N_seq \\times N_res); the pair representation has shape (N_res \\times N_res) - Evoformer updates both jointly.",
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
        "The global distance test score - the average percentage of C\\alpha atoms within 1, 2, 4, and 8 Å cutoffs of the reference structure",
        "The TM-score, which measures template-free structural similarity independent of protein length",
        "The RMSD of all heavy atoms between predicted and experimental structures",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall that GDT_TS (Global Distance Test Total Score) is the primary metric used in CASP (Critical Assessment of protein Structure Prediction) to evaluate predicted protein structures. " +
        "It measures how well the C-alpha atoms of a predicted structure align with those of the experimental reference structure. " +
        "The metric averages the percentage of C-alpha atoms that fall within four different distance thresholds (1, 2, 4, and 8 Angstroms). " +
        "**Step 1:** Understand that GDT_TS computes the percentage of C-alpha atoms within 1, 2, 4, and 8 Angstroms of the reference. " +
        "**Step 2:** Recognize that GDT_TS = (P1 + P2 + P4 + P8) / 4, averaging these four percentages. " +
        "**Step 3:** Note that AlphaFold2's median GDT_TS of ~92 on CASP14 free-modeling targets was transformative, as prior methods scored in the 40-60 range. " +
        "Therefore, the answer is the global distance test score - the average percentage of C\\alpha atoms within 1, 2, 4, and 8 Å cutoffs of the reference structure.",
      hints: [
        "GDT_TS uses four distance cutoffs (1, 2, 4, 8 Å) and averages the fraction of C\\alpha atoms within each - near 100 is perfect.",
        "Prior state-of-the-art methods scored in the 40-60 range on free-modelling targets at CASP13; AlphaFold2's 92 was transformative.",
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
        "First, let's recall that variant calling is a fundamental computational step in genomics pipelines. " +
        "When sequencing a genome, the resulting reads are aligned to a reference genome to identify where they differ. " +
        "These differences from the reference are called genomic variants and include single nucleotide polymorphisms (SNPs) and insertions/deletions (indels). " +
        "**Step 1:** Understand that variant callers compare aligned sequencing reads against a reference genome to identify differences. " +
        "**Step 2:** Recognize that SNPs are single nucleotide changes, while indels are insertions or deletions of nucleotides. " +
        "**Step 3:** Note that variant calling is a foundational step that enables downstream analyses like GWAS, disease association studies, and precision medicine. " +
        "Therefore, the answer is positions in the genome where the sample differs from a reference genome (SNPs, indels).",
      hints: [
        'Think about what "variant" means in a genomic context - differences from a reference.',
        "SNPs and indels are the two most common types of genomic variants.",
      ],
    },
    {
      id: "q-hc-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DeepVariant, developed by Google, models variant calling as an image classification problem by converting read pileups into image tensors.",
      correctAnswer: "True",
      explanation:
        "First, let's recall that DeepVariant, developed by Google Brain, revolutionized variant calling by applying deep learning to the problem. " +
        "The key insight was to convert the problem of classifying genomic positions into an image classification problem. " +
        "At each candidate genomic position, sequencing reads are stacked in a pileup visualization that resembles an image. " +
        "**Step 1:** Understand that DeepVariant converts read pileups at each genomic position into RGB-like image tensors. " +
        "**Step 2:** Recognize that these images capture patterns in the sequencing data - coverage, base quality, and alignment patterns. " +
        "**Step 3:** Note that an Inception-based convolutional neural network (CNN) then classifies each position as reference, heterozygous variant, or homozygous variant. " +
        "Therefore, the answer is True.",
      hints: [
        "Think about how sequencing reads stacked at a genomic position can be visualized - it looks like an image.",
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
        "First, let's recall that traditional Genome-Wide Association Studies (GWAS) test each genetic variant independently for association with a trait. " +
        "This approach is statistically simple and computationally efficient, but it cannot capture the complex way that multiple variants interact to influence traits. " +
        "Most complex traits are influenced by many genetic variants with small effects, and these variants often interact with each other (epistasis). " +
        "**Step 1:** Understand that GWAS applies a statistical test at each variant position one at a time, missing interactions between variants. " +
        "**Step 2:** Recognize that epistatic interactions - where the effect of one variant depends on another variant - are missed by marginal testing. " +
        "**Step 3:** Note that ML methods like polygenic risk scores and neural networks can learn non-linear, combinatorial genetic effects that traditional GWAS cannot capture. " +
        "Therefore, the answer is GWAS tests each variant independently, missing complex polygenic interactions and non-linear effects.",
      hints: [
        "GWAS applies a statistical test at each variant position one at a time.",
        'Think about what "epistasis" means - interaction effects between multiple genetic variants.',
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
        "First, let's recall that randomization is a fundamental principle of clinical trial design that helps ensure the validity of causal inference. " +
        "By randomly assigning participants to treatment or control groups, we balance both measured and unmeasured confounding factors between the groups. " +
        "This balance is critical because there may be unknown factors that influence both who receives a treatment and the outcome. " +
        "**Step 1:** Understand that randomization helps balance both known and unknown confounders between treatment and control groups. " +
        "**Step 2:** Recognize that without randomization, researchers cannot distinguish whether differences in outcomes are due to the treatment or due to pre-existing differences between groups. " +
        "**Step 3:** Note that this balance enables causal interpretation of the observed treatment effect, making randomization the gold standard for causal inference in clinical research. " +
        "Therefore, the answer is to balance known and unknown confounding factors between treatment and control groups.",
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
      correctAnswer: "True",
      explanation:
        "First, let's recall that traditional clinical trials fix all parameters (sample size, dose, allocation ratios) before enrollment begins. " +
        "Adaptive trial designs allow modifications to these parameters based on interim data collected during the trial. " +
        "The key challenge is that looking at data during the trial can inflate the false positive rate (type I error), requiring careful statistical adjustments. " +
        "**Step 1:** Understand that adaptive designs allow mid-trial modifications based on accumulating data using pre-specified decision rules. " +
        "**Step 2:** Recognize that these modifications might include adjusting sample size, reallocating doses, or dropping treatment arms. " +
        "**Step 3:** Note that statistical methods like alpha spending functions maintain type I error control despite multiple interim looks at the data. " +
        "Therefore, the answer is True.",
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
        "First, let's recall that clinical trials often struggle with patient enrollment, taking years to complete due to difficulty finding patients who meet all criteria. " +
        "A key insight is that if we can identify patients most likely to respond to the treatment, we can enrich the trial population to detect treatment effects faster. " +
        "ML methods analyze biomarker data and EHR records to predict which patients are most likely to benefit from the experimental treatment. " +
        "**Step 1:** Understand that ML-guided enrollment uses predictive models to identify patients most likely to respond to treatment. " +
        "**Step 2:** Recognize that enrolling these patients enriches the trial, making the treatment effect signal stronger and easier to detect. " +
        "**Step 3:** Note that this approach can reduce required sample size and trial duration while maintaining scientific validity. " +
        "Therefore, the answer is identify patients most likely to respond to treatment and enrich the trial population for faster signal detection.",
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
        "First, let's recall that survival analysis studies time-to-event data, such as time until death or disease recurrence. " +
        "A fundamental challenge is that we often cannot observe the event for all patients - the study may end before the event occurs, or patients may drop out. " +
        "Censoring occurs when we have partial information about a patient's survival time. " +
        "**Step 1:** Understand that censoring happens when a patient leaves the study, is lost to follow-up, or the study ends before the event is observed. " +
        "**Step 2:** Recognize that censored patients provide partial information: we know they survived at least until the censoring time, but not what happened afterward. " +
        "**Step 3:** Note that survival analysis methods like the Kaplan-Meier estimator and Cox regression are designed to handle censoring appropriately. " +
        "Therefore, the answer is the situation where the event of interest has not been observed for a patient by the end of follow-up.",
      hints: [
        "Think about a patient who moves away before the study ends - you stop observing them.",
        "Censored patients provide partial information: they survived at least up to the censoring time.",
      ],
    },
    {
      id: "q-hc-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Cox proportional hazards model assumes that the ratio of hazard rates between any two individuals remains constant over time.",
      correctAnswer: "True",
      explanation:
        "First, let's recall that the Cox proportional hazards model is one of the most widely used methods in survival analysis. " +
        "It estimates the effect of covariates (like treatment assignment) on the hazard rate, but it makes a key assumption about how hazards compare between individuals. " +
        "The proportional hazards assumption states that the ratio of hazard rates between any two individuals remains constant over time. " +
        "**Step 1:** Understand that the hazard rate represents the instantaneous risk of the event occurring at a given time. " +
        "**Step 2:** Recognize that proportional hazards means if one group has twice the hazard of another at any given time, this ratio stays the same throughout the study. " +
        "**Step 3:** Note that this assumption allows Cox regression to estimate covariate effects without needing to specify the baseline hazard function. " +
        "Therefore, the answer is True.",
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
        "First, let's recall that classical survival models like Cox regression assume proportional hazards, which may not hold in many real-world scenarios. " +
        "DeepHit is a deep learning model for survival analysis that addresses these limitations. " +
        "It uses a discrete-time formulation and can model complex, non-proportional hazard shapes that classical methods cannot capture. " +
        "**Step 1:** Understand that DeepHit learns a joint distribution over time-to-event without parametric assumptions about the hazard shape. " +
        "**Step 2:** Recognize that DeepHit handles competing risks (when multiple events can occur) by modeling them jointly. " +
        "**Step 3:** Note that this approach outperforms Cox models when the proportional hazards assumption is violated. " +
        "Therefore, the answer is jointly modeling the time to event and competing risks without the proportional hazards assumption.",
      hints: [
        "Think about competing risks - a patient can die from cancer or from heart disease, not both.",
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
        "First, let's recall that Med-PaLM 2 is a large language model developed by Google Research specifically for medical applications. " +
        "It was developed to answer complex medical questions that require expert-level domain knowledge. " +
        "The US Medical Licensing Examination (USMLE) is a standardized test that medical professionals must pass to become licensed physicians in the United States. " +
        "**Step 1:** Understand that Med-PaLM 2 was evaluated on USMLE-style medical licensing examination questions. " +
        "**Step 2:** Recognize that Med-PaLM 2 scored over 85% on these questions, matching or exceeding the passing threshold for expert clinicians. " +
        "**Step 3:** Note that this performance represented a landmark achievement for clinical AI question-answering systems. " +
        "Therefore, the answer is US Medical Licensing Examination (USMLE) questions.",
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
      correctAnswer: "True",
      explanation:
        "First, let's recall that BioGPT is a large language model developed by Microsoft specifically for biomedical text mining tasks. " +
        "It follows the GPT-2 architecture, which is a causal (decoder-only) language model trained to predict the next token. " +
        "The key innovation is domain-specific pre-training on biomedical literature from PubMed, which contains millions of scientific abstracts. " +
        "**Step 1:** Understand that BioGPT was pre-trained on 15 million PubMed abstracts to learn the specialized language of biomedical literature. " +
        "**Step 2:** Recognize that this domain-specific pre-training enables BioGPT to better understand biomedical terminology and relationships. " +
        "**Step 3:** Note that BioGPT achieved state-of-the-art results on biomedical relation extraction, question answering, and text generation benchmarks. " +
        "Therefore, the answer is True.",
      hints: [
        "BioGPT follows the same pattern as BioBERT - domain-specific pre-training on biomedical text.",
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
        "First, let's recall that LLaVA (Large Language and Vision Assistant) is a multimodal model that connects a vision encoder with a language model for visual question answering. " +
        "LLaVA-Med extends this architecture to the biomedical domain by adapting it with domain-specific training. " +
        "The training uses figure-caption pairs from PubMed Central (PMC), which pair medical images with their text descriptions from scientific papers. " +
        "**Step 1:** Understand that LLaVA-Med fine-tunes a multimodal (vision + language) model on biomedical image-text pairs. " +
        "**Step 2:** Recognize that this training uses figure-caption pairs from scientific papers, which naturally pair medical images with descriptive text. " +
        "**Step 3:** Note that this enables visual question answering over medical images including X-rays, pathology slides, and other clinical images. " +
        "Therefore, the answer is fine-tuning on biomedical image-text pairs to enable visual question answering over medical images.",
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
        "Class I - General controls, lowest risk, no 510(k) or PMA required",
        "Class II - Special controls; 510(k) substantial equivalence clearance typically required",
        "Class III - Most stringent; Premarket Approval (PMA) required for novel high-risk devices",
        "Class 0 - Exempt from all FDA oversight as clinical decision support",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall that the FDA classifies medical devices into three risk-based classes, with Class III being the highest risk category. " +
        "Software as a Medical Device (SaMD) that makes autonomous diagnostic decisions for serious or life-threatening conditions falls into the highest risk class. " +
        "When an AI algorithm directly drives treatment decisions (not just provides decision support), it is considered higher risk because there is no human clinician intermediate to catch errors. " +
        "**Step 1:** Understand that AI that definitively diagnoses a condition and directly drives treatment decisions is considered high-risk under FDA's SaMD framework. " +
        "**Step 2:** Recognize that such autonomous diagnostic AI typically maps to FDA Class III, requiring Premarket Approval (PMA). " +
        "**Step 3:** Note that the 510(k) pathway (Class II) requires showing substantial equivalence to a previously cleared device, but novel autonomous AI often lacks a predicate device for equivalence. " +
        "Therefore, the answer is Class III - Most stringent; Premarket Approval (PMA) required for novel high-risk devices.",
      hints: [
        "FDA Class III is for devices that support or sustain human life, prevent impairment of health, or present unreasonable risk - autonomous AI diagnostics driving treatment fall here.",
        "The 510(k) pathway (Class II) requires showing substantial equivalence to a legally marketed predicate device; a novel AI diagnostic algorithm often lacks a predicate.",
      ],
    },
    {
      id: "q-hc-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Under the FDA\'s proposed framework for AI/ML-based SaMD, a "locked" algorithm that does not change after deployment can be updated post-market without notifying the FDA, as long as the changes are minor.',
      correctAnswer: "False",
      explanation:
        "First, let's recall that the FDA distinguishes between \"locked\" algorithms (static, fixed after validation) and \"adaptive\" algorithms (continuously learning from new data). " +
        "Locked algorithms do not change after deployment, but they can still be updated through traditional software development processes. " +
        "Any significant changes to a medical device require regulatory review to ensure safety and effectiveness are maintained. " +
        "**Step 1:** Understand that even for locked algorithms, significant changes to the AI function, intended use, or performance characteristics require a new 510(k) or PMA supplement. " +
        "**Step 2:** Recognize that the FDA distinguishes between minor changes (which may not require submission) and significant changes (which require regulatory review). " +
        "**Step 3:** Note that the FDA's Predetermined Change Control Plan (PCCP) framework allows manufacturers to pre-specify acceptable post-market modifications and get them reviewed upfront. " +
        "Therefore, the answer is False.",
      hints: [
        "Any change to an FDA-cleared device that significantly affects safety or effectiveness requires regulatory notification or submission.",
        "The PCCP concept allows manufacturers to pre-specify planned modifications and get them reviewed upfront - reducing the burden of post-market resubmission for anticipated changes.",
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
        "First, let's recall that the 510(k) pathway is one of the main FDA regulatory pathways for medical devices, including AI-based Software as a Medical Device (SaMD). " +
        "It requires demonstrating that a new device is substantially equivalent to a legally marketed predicate device that was cleared before 1976 or has been determined to be substantially equivalent. " +
        "The key is showing equivalence in both intended use and technological characteristics, not proving superior effectiveness. " +
        "**Step 1:** Understand that 510(k) does NOT require clinical trials proving superiority - only substantial equivalence to an existing cleared device. " +
        "**Step 2:** Recognize that if technological characteristics differ from the predicate, the manufacturer must show they do not raise new safety or efficacy questions. " +
        "**Step 3:** Note that for AI/ML SaMD, finding an appropriate predicate device and demonstrating equivalence of algorithmic performance is the core regulatory challenge. " +
        "Therefore, the answer is substantial equivalence to a legally marketed predicate device in terms of intended use and technological characteristics.",
      hints: [
        "510(k) does NOT require clinical trials proving superiority - only substantial equivalence to an existing cleared device.",
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
        "Patient data never leaves the local institution - only model updates (gradients) are shared",
        "It anonymizes all data before sending to a central server",
        "It trains models only on synthetic data, never on real patients",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall that federated learning is a machine learning approach designed to address privacy concerns in distributed data settings like healthcare. " +
        "In healthcare, patient data is distributed across hospitals and institutions, and regulations like HIPAA restrict how this data can be shared. " +
        "Federated learning allows models to be trained on this distributed data without requiring the raw data to leave its source institution. " +
        "**Step 1:** Understand that in federated learning, each hospital trains a model on its local patient data. " +
        "**Step 2:** Recognize that only model updates (gradients or weights) are shared with a central aggregator - raw patient records are never transmitted. " +
        "**Step 3:** Note that this preserves data sovereignty and privacy while enabling collaborative model development across institutions. " +
        "Therefore, the answer is Patient data never leaves the local institution - only model updates (gradients) are shared.",
      hints: [
        "The key idea is that the data stays local while knowledge (from model parameters) is shared.",
        "Think about what is sent to the central server - it is not the training data itself.",
      ],
    },
    {
      id: "q-hc-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Federated learning completely eliminates privacy risk because gradients carry no information about the underlying training data.",
      correctAnswer: "False",
      explanation:
        "First, let's recall that federated learning shares model updates (gradients or weights) with a central server rather than raw data. " +
        "A common misconception is that since no raw data is transmitted, federated learning provides complete privacy protection. " +
        "However, research has shown that gradient information can be exploited to reconstruct the original training data. " +
        "**Step 1:** Understand that gradient inversion attacks can reconstruct training data from shared gradients by analyzing the model updates. " +
        "**Step 2:** Recognize that this makes raw federated learning insufficient for strong privacy guarantees in sensitive applications like healthcare. " +
        "**Step 3:** Note that additional privacy techniques like differential privacy (adding calibrated noise) or secure aggregation (cryptographic protocols) are needed to provide formal privacy guarantees. " +
        "Therefore, the answer is False.",
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
        "First, let's recall that FedAvg (Federated Averaging) is the most widely used aggregation algorithm in federated learning. " +
        "It combines model updates from multiple participating clients (like hospitals) into a single global model. " +
        "The key insight is that institutions with more data should have proportionally more influence on the final model. " +
        "**Step 1:** Understand that FedAvg computes a weighted average of local model weights from each participating client. " +
        "**Step 2:** Recognize that the weight assigned to each client's model is proportional to that client's dataset size. " +
        "**Step 3:** Note that under the assumption of independent and identically distributed (IID) data, this weighted average converges to the same solution as centralized training. " +
        "Therefore, the answer is computing a weighted average of local model weights, weighted by each client's dataset size.",
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
        "First, let's recall that ECG (electrocardiogram) data is a time-series waveform that captures the electrical activity of the heart over time. " +
        "The waveform contains characteristic patterns like the P-wave, QRS complex, and T-wave that correspond to different phases of the cardiac cycle. " +
        "Deep learning models need to learn these local morphological features hierarchically to classify different arrhythmia types. " +
        "**Step 1:** Understand that ECG data is inherently a 1D temporal signal, not a 2D image, so architectures designed for sequences work best. " +
        "**Step 2:** Recognize that 1D convolutional neural networks (CNNs) and 1D ResNets can process these waveforms directly, learning hierarchical features. " +
        "**Step 3:** Note that Rajpurkar's Stanford model demonstrated cardiologist-level arrhythmia detection using this approach. " +
        "Therefore, the answer is 1D Convolutional Neural Network or ResNet applied to the time-series waveform.",
      hints: [
        "ECG data is a time-series waveform, not a 2D image - consider which convolution dimension fits.",
        "The same ResNet architecture used for images can be adapted to 1D temporal signals.",
      ],
    },
    {
      id: "q-hc-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "EEG signals recorded from scalp electrodes have higher spatial resolution than fMRI for mapping brain function.",
      correctAnswer: "False",
      explanation:
        "First, let's recall that EEG (electroencephalography) and fMRI (functional magnetic resonance imaging) are two different brain imaging modalities with complementary strengths and weaknesses. " +
        "EEG measures electrical activity directly from scalp electrodes with millisecond temporal resolution, but the signal is blurred as it passes through the skull and scalp (volume conduction). " +
        "fMRI measures blood oxygen level changes (BOLD signal) with high spatial resolution (~1 mm) but very poor temporal resolution (~2 seconds per volume). " +
        "**Step 1:** Understand that EEG has excellent temporal resolution (milliseconds) but poor spatial resolution due to volume conduction through the skull. " +
        "**Step 2:** Recognize that fMRI has high spatial resolution (~1 mm) for mapping brain activity but poor temporal resolution (~2 seconds). " +
        "**Step 3:** Note that these represent a fundamental trade-off in brain imaging: you can measure brain activity quickly (EEG) or precisely in space (fMRI), but not both simultaneously with the same modality. " +
        "Therefore, the answer is False.",
      hints: [
        "EEG electrodes sit on the scalp and measure electrical activity through bone and tissue - this blurs spatial information.",
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
        "Blood oxygen saturation (SpO$_2$) and heart rate",
        "Intracranial pressure",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall that PPG (Photoplethysmography) is an optical technique that measures light absorption changes in tissue caused by blood volume pulsing through blood vessels with each heartbeat. " +
        "The technology uses a light source (typically red or infrared LED) and a photodetector to measure these absorption changes. " +
        "By analyzing the PPG signal at different wavelengths, devices can extract clinically relevant measurements. " +
        "**Step 1:** Understand that PPG measures light absorption changes caused by blood volume pulsing through tissue with each heartbeat. " +
        "**Step 2:** Recognize that by using red and infrared wavelengths, devices can compute blood oxygen saturation (SpO2) using the Beer-Lambert law. " +
        "**Step 3:** Note that heart rate can be extracted from the timing of pulses in the PPG waveform. " +
        "Therefore, the answer is blood oxygen saturation (SpO2) and heart rate.",
      hints: [
        "PPG uses light - think about what physical property of blood changes with each heartbeat.",
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
        "First, let's recall that the da Vinci Surgical System is a widely used robotic surgical platform that enables minimally invasive surgery. " +
        "Despite its advanced capabilities, it is not an autonomous system - a human surgeon always maintains control. " +
        "The surgeon operates from a console that provides a high-definition 3D view of the surgical site and controls robotic arms with precision-enhancing features. " +
        "**Step 1:** Understand that da Vinci is a teleoperated system where a surgeon controls robotic arms in real time from a console. " +
        "**Step 2:** Recognize that the system provides benefits like tremor filtration and motion scaling to enhance surgical precision. " +
        "**Step 3:** Note that AI assistance layers are being developed to augment the system, but the surgeon remains always in control. " +
        "Therefore, the answer is A teleoperated robotic system where a surgeon controls robotic arms in real time.",
      hints: [
        "The surgeon is always in the loop - the robot does not act independently.",
        "Teleoperation means controlling a remote device in real time from a distance.",
      ],
    },
    {
      id: "q-hc-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Surgical phase recognition models that segment a surgical video into workflow phases (e.g., cholecystectomy phases) primarily use temporal models such as TCN or LSTM applied to per-frame feature embeddings.",
      correctAnswer: "True",
      explanation:
        "First, let's recall that surgical phase recognition involves segmenting a surgical video into different workflow phases, such as preparation, dissection, and closure. " +
        "This requires understanding both what is happening in individual frames (spatial features) and how actions unfold over time (temporal patterns). " +
        "The standard approach uses a two-stage pipeline: CNN for spatial feature extraction followed by a temporal model. " +
        "**Step 1:** Understand that per-frame features are extracted using a CNN, which captures the spatial content of each video frame. " +
        "**Step 2:** Recognize that temporal models like TCN, LSTM, or Transformer are then applied to the sequence of frame features to capture phase transitions. " +
        "**Step 3:** Note that this combination of spatial and temporal reasoning enables accurate segmentation of surgical workflow phases. " +
        "Therefore, the answer is True.",
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
        "First, let's recall that surgical training traditionally relies on expert observation and subjective feedback to evaluate trainee proficiency. " +
        "This approach is time-consuming and may lack consistency across different trainers. " +
        "Skill assessment models use computational methods to objectively evaluate surgical performance from tool motion data or video. " +
        "**Step 1:** Understand that skill assessment models analyze instrument kinematics or video to score various aspects of surgical technique. " +
        "**Step 2:** Recognize that they evaluate metrics like economy of motion (minimizing unnecessary movements), instrument handling, and procedural efficiency. " +
        "**Step 3:** Note that these models provide objective, automated feedback for surgical training, enabling trainees to receive consistent and scalable assessment. " +
        "Therefore, the answer is to automatically evaluate surgeon technical proficiency from tool motion or video data for training feedback.",
      hints: [
        "Think about how a surgical trainer evaluates a resident - they watch the movements and technique.",
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
        "First, let's recall that precision medicine aims to deliver targeted therapies to patients based on their individual characteristics. " +
        "A key insight is that different patients with the same disease may respond differently to the same treatment due to biological differences. " +
        "Patient stratification identifies subgroups of patients who share biological characteristics that predict differential treatment response. " +
        "**Step 1:** Understand that patient stratification identifies subgroups of patients based on genomics, proteomics, imaging, or clinical features. " +
        "**Step 2:** Recognize that these subgroups respond differently to treatments - some benefit while others may experience toxicity or lack efficacy. " +
        "**Step 3:** Note that this enables targeted therapies that benefit responders and avoid harming non-responders. " +
        "Therefore, the answer is identify subgroups of patients who share biological characteristics that predict differential treatment response.",
      hints: [
        'Precision medicine is sometimes called "the right treatment for the right patient at the right time."',
        "If all patients respond identically, stratification is unnecessary - the challenge is heterogeneous responses.",
      ],
    },
    {
      id: "q-hc-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Polygenic Risk Scores (PRS) aggregate the effects of many common genetic variants to estimate an individual\'s genetic predisposition to a disease.",
      correctAnswer: "True",
      explanation:
        "First, let's recall that Polygenic Risk Scores (PRS) are a tool in precision medicine for estimating genetic predisposition to diseases. " +
        "Most common diseases are influenced by many genetic variants, each with a small effect size, rather than a single causative mutation. " +
        "PRS aggregate these small effects across thousands of genetic variants to produce an overall risk score. " +
        "**Step 1:** Understand that PRS sums the weighted contributions of thousands of SNPs (single nucleotide polymorphisms), where weights come from GWAS effect sizes. " +
        "**Step 2:** Recognize that the resulting score predicts genetic liability for conditions like coronary artery disease, breast cancer, or type 2 diabetes. " +
        "**Step 3:** Note that PRS can identify individuals at higher genetic risk who might benefit from preventive interventions. " +
        "Therefore, the answer is True.",
      hints: [
        'The word "polygenic" means "many genes" - not a single causal mutation but thousands of small effects.',
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
        "The SHIVA result was surprising and cautionary - simple genomic matching is not always sufficient.",
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
      correctAnswer: "True",
      explanation:
        "Biomedical knowledge graphs (e.g., Hetionet) represent drugs, genes, diseases, and pathways as nodes with typed edges (treats, binds, causes); graph embedding and link prediction then score plausible new drug-disease edges.",
      hints: [
        "A knowledge graph connects entities - think of drugs, targets, diseases all linked by biological relationships.",
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
        "KG embedding methods learn low-dimensional vectors for entities and relations such that the embedding geometry preserves relational structure - TransE models relation as translation (h + r \\approx t), enabling scoring of candidate drug-disease links.",
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
      correctAnswer: "False",
      explanation:
        "Ensemble and mechanistic-ML hybrid models tend to perform best; purely ML models often excel at short-term forecasts but mechanistic models may outperform at longer horizons where biological constraints matter more.",
      hints: [
        "FluSight results show that no single model dominates - ensemble approaches win.",
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
        "Mobility data (from Google, Apple, SafeGraph) served as a proxy for contact rate changes - reduction in mobility correlated with reduced transmission rate \\beta in SIR-type models, helping quantify intervention effectiveness.",
      hints: [
        "Mobility data tells you how much people moved around - more movement implies more potential contacts.",
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
        "Digital phenotyping captures passively sensed behaviors - GPS mobility, screen time, call/text frequency, accelerometry - and infers mental health states like depression or mania episodes without active user input.",
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
      correctAnswer: "False",
      explanation:
        "Social media NLP shows research promise for population-level mental health surveillance but is not a clinical diagnostic tool - it lacks the clinical validity, individual-level accuracy, and privacy protections required for HIPAA-compliant patient care.",
      hints: [
        "Population-level trends from social media are different from individual-level clinical diagnosis.",
        "Clinical assessments require validated instruments and professional judgment - social media analysis cannot replace these.",
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
        "Think about the consequences of being wrong in either direction - too many alerts vs. missing someone at risk.",
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
        "The proxy variable used - healthcare cost - is itself shaped by systemic inequities in healthcare access.",
        "Lower spending does not mean better health if some groups have historically had less access to care.",
      ],
    },
    {
      id: "q-hc-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "It is mathematically impossible to simultaneously satisfy demographic parity, equalized odds, and calibration fairness criteria in a binary classifier when base rates differ across groups.",
      correctAnswer: "True",
      explanation:
        "Chouldechova\'s impossibility theorem and Kleinberg et al. prove that when base rates differ between groups, no classifier can simultaneously satisfy calibration and equal false positive/negative rates - fairness criteria are fundamentally in tension.",
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
        "Comprehensive fairness audits disaggregate performance by race, sex, age, insurance status, site, and intersectional groups - overall metrics can mask severe underperformance in minority subgroups that are underrepresented in training data.",
      hints: [
        "Overall AUC can mask severe underperformance in minority subgroups that are underrepresented in training data.",
        "Intersectional analysis (e.g., Black women, elderly men) may reveal disparities invisible to single-axis subgroup analysis.",
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
      correctAnswer: "True",
      explanation:
        "Models like DiffSBDD, TargetDiff, and DiffMol apply the diffusion framework to 3D molecular geometry - iteratively refining random noise into valid atom coordinates and types conditioned on a protein pocket or desired properties.",
      hints: [
        "Diffusion models learn to reverse a noise process - the same framework used for image generation (DALL-E, Stable Diffusion).",
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
        "Drug-like and synthesizable - satisfying properties like Lipinski\'s Rule of Five and having a predicted synthetic route",
        "Identical to known FDA-approved drugs in the training set",
        "Generated faster than 1 millisecond per molecule on CPU hardware",
      ],
      correctAnswer: 1,
      explanation:
        "Standard metrics (validity, uniqueness, novelty) are necessary but insufficient; generated molecules must also be drug-like (Lipinski, QED) and synthetically accessible (SA score, ASKCOS route prediction) to be practically useful.",
      hints: [
        "Generating a valid SMILES is easy - the hard part is generating something a chemist can actually make.",
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
        "RL for drug design uses property predictors (docking engines, ADMET models, QED calculators) as reward oracles - the generator is trained to maximize expected reward, steering generation toward molecules with desired pharmacological profiles.",
      hints: [
        "In RL, the agent receives a reward signal from the environment - what plays the role of the environment in drug design?",
        "External computational tools (docking, property prediction) act as the reward function.",
      ],
    },
    {
      id: "q-hc-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "REINVENT is an RL-based molecular generation framework that uses a prior language model to prevent the agent from generating chemically unreasonable molecules during optimization.",
      correctAnswer: "True",
      explanation:
        "REINVENT uses a pre-trained prior (RNN on SMILES) as a regularizer in the RL objective - the agent is penalized for deviating too far from the prior, maintaining chemical validity and drug-likeness during reward-driven optimization.",
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
        "Proxy reward models (QSAR models, docking scores) are imperfect surrogates for true activity; the RL agent finds inputs that exploit model blind spots, scoring high in silico but failing in biochemical assays - a critical validation challenge.",
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
        "Multi-omics integrates multiple molecular layers - DNA variants (genomics), RNA expression (transcriptomics), protein abundance (proteomics), metabolite levels (metabolomics), and methylation (epigenomics) - to get a richer biological picture.",
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
      correctAnswer: "True",
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
        "Factor analysis finds latent variables that explain observed variance - MOFA extends this to multiple data types simultaneously.",
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
        "Medical report generation is an image captioning task: given a chest X-ray (or other medical image), the model generates a free-text radiology report describing findings - requiring joint vision and language modeling.",
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
      correctAnswer: "False",
      explanation:
        "BLEU/ROUGE measure n-gram overlap, not clinical correctness - a report can score high on BLEU while missing critical findings or containing factual errors. Clinical factuality metrics (e.g., CheXpert label F1, RadGraph F1) and radiologist evaluation are also needed.",
      hints: [
        "BLEU measures word overlap with reference text - is word overlap the same as medical accuracy?",
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
        'Hallucination in medical report generation is a safety-critical failure: the model produces confident, fluent text describing findings (e.g., "bilateral infiltrates") that are not actually visible in the image - a dangerous error in clinical contexts.',
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
        "CDSS tools augment - not replace - clinician judgment by surfacing relevant evidence, risk scores, or guideline-based alerts at the point of care, keeping the clinician in the decision loop.",
      hints: [
        'The key word is "support" - the system assists a human decision-maker rather than acting autonomously.',
        "Examples include sepsis early warning alerts, drug interaction checkers, and diagnostic suggestion tools.",
      ],
    },
    {
      id: "q-hc-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        '"Alert fatigue" is a recognized problem with CDSS systems where clinicians begin ignoring or overriding alerts due to excessive, low-specificity notifications.',
      correctAnswer: "True",
      explanation:
        "Studies show override rates for CDSS alerts can exceed 90%; too many low-value alerts train clinicians to dismiss them reflexively, potentially causing them to miss truly critical alerts - a paradox of over-alerting reducing safety.",
      hints: [
        "Think about what happens when a car alarm goes off constantly - people stop paying attention.",
        "The problem is not the existence of alerts but their volume and specificity - too many false positives desensitize users.",
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
        "APACHE II (Acute Physiology and Chronic Health Evaluation II) uses 12 routine physiological measurements plus age and chronic health points to estimate ICU mortality risk - a foundational clinical scoring tool predating ML-based risk models.",
      hints: [
        "APACHE is used to classify ICU disease severity - what is the most important outcome in an ICU setting?",
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
        "Think about a smartwatch detecting atrial fibrillation - should it wait for a cloud connection or alert you immediately?",
        'The "edge" refers to processing at the data source (the device) rather than centralizing it remotely.',
      ],
    },
    {
      id: "q-hc-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Model quantization (e.g., INT8 or INT4) is commonly used to deploy ML models on wearable devices because it reduces model size and inference latency at the cost of some accuracy.",
      correctAnswer: "True",
      explanation:
        "Quantization reduces weight precision from FP32 to INT8/INT4, shrinking model size 4-8\\times and accelerating inference on low-power hardware (NPUs, ARM Cortex-M) with typically <1-2% accuracy degradation for well-quantized models.",
      hints: [
        "Wearable microcontrollers have kilobytes of RAM, not gigabytes - the model must fit in very limited memory.",
        "Quantization trades numerical precision for efficiency - fewer bits per weight means smaller, faster models.",
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
        "Personalization requires using the individual\'s own data - the challenge is doing this without central data collection.",
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
      correctAnswer: "True",
      explanation:
        "Membership inference attacks query a generative model to infer whether a specific record was in the training set; if the model memorizes training data, synthetic outputs can leak information about real individuals - motivating differential privacy in synthesis.",
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
        "TSTR evaluates utility: train a downstream model on synthetic data, test on real - if accuracy matches Train-on-Real-Test-on-Real (TRTR), the synthetic data is useful. Nearest-neighbor ratios and DCR (Distance to Closest Record) assess privacy leakage.",
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
        "The CHADS\\_2 score is a classic clinical risk score used to predict:",
      options: [
        "Surgical complication risk in cardiac surgery",
        "Stroke risk in patients with atrial fibrillation",
        "Sepsis onset within 24 hours in ICU patients",
        "30-day readmission risk after hospital discharge",
      ],
      correctAnswer: 1,
      explanation:
        "CHADS\\_2 (Congestive heart failure, Hypertension, Age \\geq75, Diabetes, Stroke history) scores stroke risk in atrial fibrillation patients to guide anticoagulation therapy decisions - a simple but effective additive risk score.",
      hints: [
        "Each letter in CHADS\\_2 is a risk factor - the score sums up how many apply to a patient.",
        "Atrial fibrillation is a cardiac arrhythmia that increases the risk of a specific serious complication.",
      ],
    },
    {
      id: "q-hc-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "XGBoost and gradient boosting models consistently outperform deep learning models for structured tabular EHR data in health outcome prediction tasks.",
      correctAnswer: "False",
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
        "If a model predicts 70% risk, true event frequency among such predictions should be ~70%; miscalibration causes clinicians to over- or under-treat based on misleading probability estimates - calibration curves and Platt scaling are standard correction tools.",
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
        'The "omics" suffix signals high-throughput quantitative analysis - applied to imaging data.',
        "Instead of a radiologist\'s qualitative description, radiomics produces a large feature vector from the image.",
      ],
    },
    {
      id: "q-hc-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Radiomic features extracted from medical images are highly reproducible across different scanners and acquisition protocols without any harmonization.",
      correctAnswer: "False",
      explanation:
        "Radiomic features are notoriously sensitive to scanner manufacturer, acquisition protocol (slice thickness, reconstruction kernel), and segmentation variability - harmonization methods (ComBat, normalization) are essential for multi-site studies.",
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
        "Deep learning features are learned end-to-end, discovering image patterns most predictive of the target outcome - they can capture subtle, non-obvious features that handcrafted radiomic pipelines miss, at the cost of interpretability.",
      hints: [
        "Handcrafted radiomics requires domain experts to define which features to extract; deep learning automates this.",
        "The trade-off is interpretability: we know what a texture feature measures, but a deep feature may be opaque.",
      ],
    },
  ],

  "clinical-nlp-advanced": [
    {
      id: "q-hc-kp31-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "MIMIC-III is a widely used clinical NLP benchmark dataset that contains:",
      options: [
        "Annotated radiology images from 50 US hospitals",
        "De-identified ICU clinical notes, lab results, and waveforms from Beth Israel Deaconess Medical Center",
        "Genomic sequences from the 1000 Genomes Project",
        "Transcribed patient-physician conversations from primary care clinics",
      ],
      correctAnswer: 1,
      explanation:
        "MIMIC-III (Medical Information Mart for Intensive Care) contains de-identified data for over 40,000 ICU patients, including nursing notes, discharge summaries, lab values, and vital signs, making it the gold standard for clinical NLP research.",
      hints: [
        "MIMIC-III is from a single large academic medical center - Beth Israel Deaconess in Boston.",
        "The dataset is de-identified to allow broad research access while protecting patient privacy.",
      ],
    },
    {
      id: "q-hc-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "De-identification of clinical notes using NLP rule-based systems alone is sufficient to meet HIPAA Safe Harbor requirements for all 18 protected health information (PHI) categories.",
      correctAnswer: "False",
      explanation:
        "Rule-based PHI de-identification often misses rare or ambiguous identifiers; hybrid approaches combining rule-based systems with ML named entity recognition are needed to reliably suppress all 18 HIPAA PHI categories, and residual risk still exists.",
      hints: [
        "HIPAA Safe Harbor requires removal of 18 specific PHI categories including dates, locations, and unique identifiers.",
        "Clinical text contains highly varied PHI formats that rule-based systems struggle to cover exhaustively.",
      ],
    },
    {
      id: "q-hc-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Medical named entity recognition (NER) in clinical notes differs from general-domain NER primarily because:",
      options: [
        "Clinical NER uses a smaller vocabulary than general NER",
        "Clinical text contains heavy use of abbreviations, negations, and implicit temporal context that require domain-specific models trained on clinical corpora",
        "Medical entities are always explicitly labeled by clinicians in EHR systems",
        "Clinical NER does not need to handle misspellings because notes are typed by professionals",
      ],
      correctAnswer: 1,
      explanation:
        "Clinical notes are rife with abbreviations (SOB = shortness of breath), negations ('no fever'), section-dependent context, and non-standard spelling - models like ClinicalBERT or BioBERT fine-tuned on MIMIC outperform general BERT on these tasks.",
      hints: [
        "Consider that 'SOB' means shortness of breath in a clinical note, but abbreviation resolution requires clinical context.",
        "Negation detection ('denies chest pain') is critical for clinical NER but rare in general text.",
      ],
    },
  ],

  "drug-discovery-admet": [
    {
      id: "q-hc-kp32-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In computational drug discovery, ADMET refers to which set of molecular properties?",
      options: [
        "Accuracy, Diversity, Mechanism, Efficacy, Toxicity",
        "Absorption, Distribution, Metabolism, Excretion, and Toxicity",
        "Activity, Docking, Molecular weight, Entropy, Thermostability",
        "Affinity, Dissociation, Metabolism, Elimination, Tolerance",
      ],
      correctAnswer: 1,
      explanation:
        "ADMET describes the pharmacokinetic and safety profile of drug candidates: how well a compound is absorbed, distributed through the body, metabolized, excreted, and whether it is toxic - all critical for clinical viability.",
      hints: [
        "Think of ADMET as describing what the body does to a drug, and what the drug does to the body.",
        "Most drug candidates fail in clinical trials due to ADMET problems, not lack of target activity.",
      ],
    },
    {
      id: "q-hc-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Virtual screening with ML models can replace wet-lab high-throughput screening entirely in modern drug discovery pipelines.",
      correctAnswer: "False",
      explanation:
        "ML-based virtual screening dramatically narrows the chemical space to prioritize candidates, but experimental validation (binding assays, cell-based assays) remains essential because computational models are imperfect proxies for biological activity.",
      hints: [
        "Virtual screening reduces the number of compounds to test, but cannot eliminate experimental validation.",
        "ML models predict activity based on learned patterns - any model errors propagate to false positives.",
      ],
    },
    {
      id: "q-hc-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Graph Neural Networks (GNNs) are preferred over fingerprint-based ML for molecular property prediction because:",
      options: [
        "GNNs are computationally cheaper than computing Morgan fingerprints",
        "GNNs operate on the raw molecular graph, learning task-relevant atom and bond features end-to-end without manual feature engineering",
        "GNNs can process protein sequences directly without 3D structure",
        "GNNs enforce the Lipinski Rule of Five as an architectural constraint",
      ],
      correctAnswer: 1,
      explanation:
        "GNNs represent molecules as graphs with atoms as nodes and bonds as edges, propagating information via message-passing to learn representations tailored to the prediction task, unlike fixed Morgan fingerprints that cannot be adapted during training.",
      hints: [
        "Morgan fingerprints are fixed representations; GNNs learn representations from the task signal.",
        "The molecular graph captures bond topology directly, which is what determines chemical properties.",
      ],
    },
  ],

  "genomics-variant-calling": [
    {
      id: "q-hc-kp33-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Polygenic Risk Scores (PRS) in genomics aggregate:",
      options: [
        "The expression levels of thousands of genes from RNA-seq data",
        "The weighted sum of effect sizes of thousands of common SNPs associated with a trait from GWAS",
        "The number of rare pathogenic variants in a patient's exome",
        "The methylation status of CpG sites in cancer samples",
      ],
      correctAnswer: 1,
      explanation:
        "PRS sums the allele dosages of trait-associated SNPs weighted by their GWAS effect sizes (log odds ratios), providing a continuous genetic liability score for complex diseases like type 2 diabetes or coronary artery disease.",
      hints: [
        "GWAS identifies SNPs associated with a trait; PRS aggregates many small effects into a single score.",
        "PRS captures common polygenic architecture - many variants each with tiny effects.",
      ],
    },
    {
      id: "q-hc-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deep learning models like DeepVariant improve variant calling accuracy by framing the problem as image classification over pileup images of sequencing reads.",
      correctAnswer: "True",
      explanation:
        "DeepVariant (Google) encodes read pileups as multi-channel images and applies an Inception-based CNN to classify sites as homozygous reference, heterozygous, or homozygous alternate, achieving state-of-the-art SNP and indel calling accuracy.",
      hints: [
        "Pileup images visualize how sequencing reads stack up at each genomic position - DeepVariant treats this as a 2D image.",
        "The image classification framing allows DeepVariant to leverage pre-trained vision architectures.",
      ],
    },
    {
      id: "q-hc-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key limitation of PRS transferability across populations is:",
      options: [
        "PRS requires whole genome sequencing and cannot be computed from genotyping arrays",
        "GWAS summary statistics used to derive PRS are predominantly from European-ancestry cohorts, causing lower predictive accuracy in non-European populations due to LD pattern differences",
        "PRS can only predict binary disease outcomes, not quantitative traits",
        "SNP effect sizes are unstable across different sequencing platforms",
      ],
      correctAnswer: 1,
      explanation:
        "Linkage disequilibrium (LD) patterns, allele frequencies, and environmental interactions differ across ancestries; PRS derived from European GWAS underperform in African, East Asian, or South Asian populations, raising health equity concerns.",
      hints: [
        "LD patterns determine which SNPs tag causal variants - these differ by ancestry due to population history.",
        "The lack of diversity in genomic research is a recognized barrier to equitable PRS applications.",
      ],
    },
  ],

  "radiology-workflow-ai": [
    {
      id: "q-hc-kp34-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The first FDA De Novo-authorized autonomous AI diagnostic system for diabetic retinopathy screening was:",
      options: [
        "CheXNet by Stanford",
        "IDx-DR by Digital Diagnostics",
        "Viz.ai stroke detection AI",
        "Paige.AI prostate cancer pathology system",
      ],
      correctAnswer: 1,
      explanation:
        "IDx-DR received FDA De Novo authorization in 2018 as the first AI device authorized to provide a screening decision for diabetic retinopathy without a clinician reviewing the image - a landmark for autonomous AI diagnostics.",
      hints: [
        "This system operates without a specialist needing to review the image - it gives a binary screen result directly.",
        "It was cleared via the De Novo pathway, meaning there was no predicate device.",
      ],
    },
    {
      id: "q-hc-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AI triage systems for chest X-rays that prioritize worklists (e.g., flagging urgent findings) are considered high-risk FDA Class III devices requiring Premarket Approval.",
      correctAnswer: "False",
      explanation:
        "Worklist prioritization AI that flags potential findings for radiologist review - rather than providing a standalone diagnosis - is typically cleared as Class II via 510(k), as a radiologist remains in the diagnostic loop and the AI functions as decision support.",
      hints: [
        "The risk classification depends on whether the AI makes autonomous clinical decisions or assists a clinician.",
        "Triage tools that surface cases for human review are lower risk than systems that autonomously diagnose.",
      ],
    },
    {
      id: "q-hc-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The 'AI-induced automation bias' concern in radiology refers to:",
      options: [
        "AI models that are biased against certain demographic groups in image quality",
        "Radiologists over-trusting AI recommendations and failing to critically evaluate AI errors, potentially missing findings the AI missed",
        "AI systems that systematically over-diagnose rare conditions to maximize sensitivity",
        "Faster radiologist reading speed when AI is absent compared to when it is present",
      ],
      correctAnswer: 1,
      explanation:
        "Automation bias occurs when clinicians defer to AI outputs rather than applying independent judgment; studies show radiologists may miss findings the AI missed because they anchor on AI-negative results, paradoxically reducing performance despite using AI.",
      hints: [
        "Automation bias is a human factors problem - over-reliance on automated systems.",
        "If a radiologist trusts AI completely, the human provides no additional value beyond the AI alone.",
      ],
    },
  ],

  "digital-pathology-ml": [
    {
      id: "q-hc-kp35-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Whole Slide Image (WSI) analysis using deep learning is challenging primarily because:",
      options: [
        "Pathology slides contain too few cells to learn meaningful features",
        "WSIs are gigapixel images (often 100,000\\times100,000+ pixels) that cannot be processed as a single tensor on current hardware",
        "Digital pathology images lack color information compared to histological stains",
        "Pathology labels are always at the pixel level, making annotation inexpensive",
      ],
      correctAnswer: 1,
      explanation:
        "A single WSI scanned at 40x magnification can exceed 100,000x100,000 pixels; this requires patch-based analysis, multiple instance learning (MIL), or hierarchical approaches rather than treating the whole slide as a single image.",
      hints: [
        "GPU memory limits how large an image can be processed - a gigapixel image far exceeds any GPU.",
        "The solution is to divide the slide into smaller patches and aggregate predictions.",
      ],
    },
    {
      id: "q-hc-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Multiple Instance Learning (MIL) for pathology allows training cancer detection models using only slide-level labels (e.g., 'tumor present') without pixel-level annotations.",
      correctAnswer: "True",
      explanation:
        "In MIL, a slide is a 'bag' of patches (instances); the bag label is positive if any patch contains tumor. Models like CLAM and DSMIL learn to identify which patches drive the bag-level prediction without patch-level supervision.",
      hints: [
        "MIL operates at the bag level - you know the slide has cancer but not which patches contain it.",
        "This is valuable because pixel-level annotation of pathology slides requires expert pathologists and is expensive.",
      ],
    },
    {
      id: "q-hc-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The CLAM (Clustering-constrained Attention Multiple Instance Learning) model improves upon basic attention MIL by:",
      options: [
        "Using a recurrent network to process patches sequentially in scan order",
        "Adding instance-level clustering constraints that encourage attention scores to separate tumor from normal patches within the bag",
        "Replacing attention pooling with global average pooling for computational efficiency",
        "Using a GAN to generate additional synthetic pathology patches during training",
      ],
      correctAnswer: 1,
      explanation:
        "CLAM adds SVM-based instance-level discriminative loss that pushes high-attention instances toward the correct class cluster, improving the quality of attention maps and enabling interpretable patch-level localization without patch labels.",
      hints: [
        "CLAM uses the attention mechanism to identify which patches are most informative, then adds a constraint to make those patches semantically consistent.",
        "The clustering constraint is applied at training time, not at inference - it regularizes the learned attention.",
      ],
    },
  ],

  "clinical-trials-adaptive": [
    {
      id: "q-hc-kp36-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "ML-assisted patient cohort selection for clinical trials aims to:",
      options: [
        "Replace informed consent with automated eligibility screening",
        "Identify eligible patients from EHR data by matching clinical trial inclusion/exclusion criteria automatically",
        "Randomize patients to treatment arms using ML instead of traditional randomization",
        "Design the trial protocol by predicting which outcomes will be statistically significant",
      ],
      correctAnswer: 1,
      explanation:
        "Cohort selection ML models parse trial eligibility criteria (often expressed in natural language) and match them against structured and unstructured EHR data to identify eligible patients, dramatically accelerating enrollment.",
      hints: [
        "Trial eligibility criteria are complex - a patient must meet many criteria simultaneously.",
        "EHR data contains structured data (labs, diagnoses) and unstructured notes that NLP can mine.",
      ],
    },
    {
      id: "q-hc-kp36-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Adaptive clinical trial designs use interim data analyses with pre-specified rules for modifying the trial (e.g., sample size, arms) without inflating the type I error rate.",
      correctAnswer: "True",
      explanation:
        "Pre-specified adaptive designs (sample size re-estimation, arm dropping, population enrichment) allow modifications based on accumulating data while maintaining overall type I error control through pre-planned alpha-spending functions or simulation-based error rates.",
      hints: [
        "The key word is 'pre-specified' - adaptations must be planned before the trial starts to control error rates.",
        "Unplanned modifications based on interim results are a serious source of inflated false positive rates.",
      ],
    },
    {
      id: "q-hc-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ML models for predicting clinical trial dropout (participant non-compliance or early withdrawal) are valuable because:",
      options: [
        "They can be used to exclude likely dropouts from randomization before trial start",
        "They enable proactive retention interventions for high-risk participants, reducing attrition bias and improving statistical power",
        "Dropout prediction models replace the need for intention-to-treat analysis",
        "They are required by FDA regulations before any Phase III trial can begin",
      ],
      correctAnswer: 1,
      explanation:
        "High dropout rates reduce statistical power and introduce attrition bias; ML dropout prediction allows trial coordinators to target retention resources (extra check-ins, transport assistance) toward participants most likely to withdraw, protecting trial integrity.",
      hints: [
        "Dropout reduces the analyzable sample size, requiring more participants to achieve the same power.",
        "Proactive intervention is more effective than reactive rescue - you need to identify high-risk participants early.",
      ],
    },
  ],

  "mental-health-digital-biomarkers": [
    {
      id: "q-hc-kp37-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The PHQ-9 is a validated clinical instrument used to screen for:",
      options: [
        "Post-traumatic stress disorder (PTSD) severity",
        "Depression severity using 9 questions based on DSM-5 criteria",
        "Anxiety disorder using the Hamilton Anxiety Scale",
        "Bipolar disorder using the Young Mania Rating Scale",
      ],
      correctAnswer: 1,
      explanation:
        "The Patient Health Questionnaire-9 (PHQ-9) consists of 9 items mapping to DSM depressive episode criteria; scores range 0-27, with validated cutoffs for mild, moderate, moderately-severe, and severe depression.",
      hints: [
        "The '9' in PHQ-9 refers to the number of questions, each scoring 0-3.",
        "The DSM-5 has 9 diagnostic criteria for a major depressive episode - PHQ-9 maps directly to these.",
      ],
    },
    {
      id: "q-hc-kp37-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Digital biomarkers derived from smartphone sensor data (GPS, accelerometer, screen time) have been validated as FDA-cleared clinical endpoints for antidepressant trials.",
      correctAnswer: "False",
      explanation:
        "As of 2025, digital biomarkers for mental health show research promise but have not been approved as primary clinical endpoints in FDA-regulated trials; they are primarily used as exploratory secondary endpoints or in digital therapeutics research contexts.",
      hints: [
        "FDA clearance as a clinical endpoint requires extensive validation evidence and regulatory review.",
        "Digital biomarkers are research tools - promising but not yet fully validated for regulatory decision-making.",
      ],
    },
    {
      id: "q-hc-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key ethical challenge specific to mental health AI applications compared to other medical AI is:",
      options: [
        "Mental health AI requires more computational resources than imaging AI",
        "Mental health data is uniquely sensitive - stigmatization risks, vulnerability of the population, and potential for coercive use (e.g., predicting suicidality for legal purposes) require heightened privacy and consent protections",
        "Mental health conditions cannot be reliably diagnosed from any data source",
        "Mental health AI must always use reinforcement learning because conditions change over time",
      ],
      correctAnswer: 1,
      explanation:
        "Mental health data carries exceptional stigma risks; people with mental illness are a vulnerable population requiring special protections; and predictions about suicidality or psychosis could be misused by employers, insurers, or legal systems - requiring especially rigorous ethical frameworks.",
      hints: [
        "Mental health stigma remains pervasive - unauthorized disclosure of a mental health prediction could harm someone's employment or relationships.",
        "Vulnerability of the population studied raises the bar for ethical conduct and informed consent.",
      ],
    },
  ],

  "health-equity-sdoh": [
    {
      id: "q-hc-kp38-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Social Determinants of Health (SDOH) features in clinical ML models refer to:",
      options: [
        "Genetic variants associated with socially defined racial categories",
        "Non-medical factors like housing stability, food security, income, education, and neighborhood environment that influence health outcomes",
        "Social media usage patterns linked to mental health",
        "Hospital social work documentation from discharge planning notes only",
      ],
      correctAnswer: 1,
      explanation:
        "SDOH encompasses the conditions in which people are born, grow, work, live, and age - including economic stability, education, social context, health systems access, and neighborhood environment - which explain significant variation in health outcomes.",
      hints: [
        "SDOH is about the social context of a patient's life, not their biology.",
        "Examples include food deserts, housing insecurity, and transportation barriers to healthcare access.",
      ],
    },
    {
      id: "q-hc-kp38-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Including race as a variable in clinical ML models always improves model fairness and reduces health disparities.",
      correctAnswer: "False",
      explanation:
        "Including race can encode historical discrimination into predictions (perpetuating disparities) or mask the underlying SDOH causes; some race-adjusted calculators (e.g., eGFR, VBAC risk) have been criticized for biasing care. The appropriate use of race in models requires careful causal reasoning.",
      hints: [
        "Race is a social construct, not a biological category - it often proxies for racism and structural inequity.",
        "Using race as a feature can perpetuate discrimination if the feature encodes historical inequities rather than causal biology.",
      ],
    },
    {
      id: "q-hc-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Disparate performance of a clinical ML model across demographic groups can arise even when protected attributes (race, sex) are excluded from the model due to:",
      options: [
        "Numerical precision errors in floating-point arithmetic on different hardware",
        "Proxy variables correlated with protected attributes (e.g., zip code, insurance type) and underrepresentation of minority groups in training data",
        "Differences in hospital EHR vendor systems used by different demographic groups",
        "The model architecture's inability to handle class-imbalanced data",
      ],
      correctAnswer: 1,
      explanation:
        "Even without explicit protected attributes, correlated proxies (zip code ~ race, insurance ~ income) allow bias to re-enter; underrepresentation in training data causes worse calibration and discrimination in minority groups - a phenomenon called 'fairness through unawareness' failure.",
      hints: [
        "Removing the sensitive attribute is not sufficient if other features are correlated with it.",
        "Underrepresentation means the model sees fewer examples from certain groups, reducing its accuracy for those groups.",
      ],
    },
  ],

  "cdss-integration": [
    {
      id: "q-hc-kp39-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Interruptive vs. non-interruptive CDS alerts differ in that:",
      options: [
        "Interruptive alerts appear in a separate dashboard while non-interruptive alerts appear inline",
        "Interruptive alerts halt clinical workflow and require acknowledgment before proceeding, while non-interruptive alerts display passively without blocking the workflow",
        "Interruptive alerts use ML models while non-interruptive alerts use rule-based logic",
        "Non-interruptive alerts are only shown to nurses, not physicians",
      ],
      correctAnswer: 1,
      explanation:
        "Interruptive (hard-stop) alerts pause the clinician's workflow and require a response before proceeding - high specificity is critical because low-value interruptions contribute severely to alert fatigue. Non-interruptive (passive) alerts provide ambient information without disrupting workflow.",
      hints: [
        "Hard-stop alerts are like a pop-up dialog that must be dismissed - they interrupt whatever the clinician is doing.",
        "The design choice (interruptive vs. non-interruptive) should match the urgency and consequence of the alert.",
      ],
    },
    {
      id: "q-hc-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Studies show that physicians override more than 90% of drug-drug interaction alerts in some EHR systems, primarily because these alerts have low clinical relevance for most patients.",
      correctAnswer: "True",
      explanation:
        "Multiple studies across major EHRs show override rates of 90-96% for drug-drug interaction alerts; most fire for interactions that are clinically irrelevant for the specific patient context, training clinicians to dismiss alerts reflexively - the classic alert fatigue paradox.",
      hints: [
        "If nearly every alert is a false alarm, the rational response is to stop paying attention to alerts.",
        "This is an unintended consequence of overly sensitive alerting systems.",
      ],
    },
    {
      id: "q-hc-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The 5 Rights framework for CDS (Osheroff et al.) specifies that effective CDS must deliver the right information to the right person at the right time through the right channel in the right format. Which failure mode violates the 'right time' criterion?",
      options: [
        "Showing a sepsis alert on a cardiology dashboard that cardiologists never check",
        "Triggering a drug allergy alert hours after a medication has already been administered",
        "Displaying a complex risk score without any clinical interpretation guidance",
        "Sending a critical lab alert to the ordering nurse instead of the responsible physician",
      ],
      correctAnswer: 1,
      explanation:
        "The 'right time' criterion means alerts must fire when action is still possible; a drug allergy alert after the medication has been given is clinically useless - the intervention window has passed. Timely integration with ordering workflows is essential.",
      hints: [
        "Timeliness is about whether the alert arrives when the clinician can still act on it.",
        "A retrospective alert that fires after an irreversible action has been taken cannot prevent harm.",
      ],
    },
  ],

  "federated-health-privacy": [
    {
      id: "q-hc-kp40-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Under HIPAA, federated learning in healthcare is valuable primarily because it:",
      options: [
        "Encrypts all patient data using AES-256 before storage in the EHR",
        "Allows model training across institutions without transmitting PHI, since only model gradients or weights leave each site",
        "Replaces IRB approval for multi-site research studies",
        "Enables cloud storage of de-identified patient records compliant with Safe Harbor",
      ],
      correctAnswer: 1,
      explanation:
        "HIPAA restricts transmission of Protected Health Information (PHI) across covered entities; federated learning sidesteps this by keeping PHI on-premises at each institution and sharing only derived model updates - a key enabler of multi-institutional healthcare AI.",
      hints: [
        "HIPAA's core concern is preventing unauthorized PHI disclosure - federated learning keeps PHI local.",
        "Model weights and gradients are not PHI, making their transmission potentially HIPAA-compliant.",
      ],
    },
    {
      id: "q-hc-kp40-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Differential privacy (DP) guarantees that the inclusion or exclusion of any single patient's data in federated training cannot be detected from the published model with more than a small probability bound epsilon.",
      correctAnswer: "True",
      explanation:
        "Epsilon-differential privacy provides a formal mathematical guarantee: the probability of any outcome (including model weights) changes by at most e^epsilon when any one individual's data is added or removed, bounding individual information leakage.",
      hints: [
        "Differential privacy is a formal mathematical definition - it bounds how much one person's data affects the output.",
        "Smaller epsilon means stronger privacy but typically at the cost of model utility.",
      ],
    },
    {
      id: "q-hc-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Fully Homomorphic Encryption (FHE) in federated healthcare ML allows:",
      options: [
        "Training ML models on plaintext data with post-training encryption of the model weights",
        "Performing computation (including gradient computation) directly on encrypted data without ever decrypting it on the server side",
        "Encrypting only the identifiable fields in EHR while leaving clinical values in plaintext",
        "Generating encryption keys from model gradients to secure the communication channel",
      ],
      correctAnswer: 1,
      explanation:
        "FHE allows arithmetic operations on ciphertext; a federated server can aggregate encrypted gradients without seeing the underlying data, providing stronger guarantees than standard federated learning - at significant computational cost that remains a practical barrier.",
      hints: [
        "Homomorphic means 'structure-preserving': operations on encrypted data produce encrypted results that decrypt to the correct answer.",
        "FHE eliminates the need to trust the aggregating server because it never sees unencrypted data.",
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
        "RWE comes from real-world data (RWD) collected outside controlled trials - EHR records, insurance claims, patient registries, and wearables - reflecting how treatments perform in diverse real-world patient populations.",
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
      correctAnswer: "True",
      explanation:
        "Confounding by indication occurs when the reason a patient receives treatment (they are sicker) is also associated with the outcome - crude observational estimates attribute the poorer outcomes of sick patients to the treatment itself.",
      hints: [
        "Think about who gets intensive chemotherapy - they have more severe disease, which independently worsens outcomes.",
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
        "By matching patients with similar propensity scores, you create groups that look similar on measured characteristics - like a pseudo-randomization.",
      ],
    },
  ],
};

const extra: Record<string, Question[]> = {
  "fda-regulation-samd": [
    {
      id: "q-hc-ex1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "FDA's Software as a Medical Device (SaMD) framework classifies AI software by which primary criterion?",
      options: [
        "The programming language used to implement the software",
        "The significance of the information provided by the software and the state of the healthcare situation",
        "Whether the software is deployed on-premise or in the cloud",
        "The number of parameters in the underlying machine learning model",
      ],
      correctAnswer: 1,
      explanation: "SaMD risk classification is based on two axes: significance of the information (treat/diagnose/drive vs. inform) and state of the situation (critical vs. serious vs. non-serious), yielding a three-tier risk framework where higher significance in critical situations is Class III.",
      hints: [
        "Think about what the software does with its output and how serious the clinical context is.",
        "FDA cares about consequences of wrong information, not technical implementation details.",
      ],
    },
    {
      id: "q-hc-ex1-2",
      type: "true-false",
      difficulty: "easy",
      question: "A 510(k) clearance for a medical AI device requires the manufacturer to demonstrate that the device is substantially equivalent to an existing legally marketed predicate device.",
      correctAnswer: "True",
      explanation: "The 510(k) pathway compares a new device to a predicate: if the new device has the same intended use and substantially equivalent technological characteristics (or different characteristics that do not raise new safety questions), it can be cleared without full clinical trials.",
      hints: [
        "510(k) is a comparative pathway - you need a previously cleared predicate to compare against.",
        "Substantial equivalence can be based on intended use alone, or intended use plus technology.",
      ],
    },
    {
      id: "q-hc-ex1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Under FDA's Pre-Submission (Q-Sub) program, an AI medical device developer can:",
      options: [
        "Submit a complete PMA application anonymously before committing to a product name",
        "Request written feedback from FDA on proposed study designs and regulatory strategies before submitting a formal application",
        "Obtain provisional FDA clearance to market the device while a full 510(k) is pending",
        "Bypass IRB requirements for early feasibility studies with fewer than 10 participants",
      ],
      correctAnswer: 1,
      explanation: "The Pre-Submission program allows developers to engage FDA early - submitting a briefing document and proposed questions to receive written FDA feedback on study design, data collection plans, and regulatory pathways before investing in a full clinical study.",
      hints: [
        "Pre-Submission is a risk-reduction mechanism - you get FDA's perspective before expensive commitments.",
        "FDA responds in writing, giving developers informal but valuable guidance on their development plan.",
      ],
    },
    {
      id: "q-hc-ex1-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "FDA's Predetermined Change Control Plan (PCCP) framework for AI/ML-based SaMD is designed to address which unique challenge of AI medical devices?",
      options: [
        "The high computational cost of running inference on medical-grade hardware",
        "AI models that learn and change after deployment, potentially requiring new premarket submissions for every model update",
        "The lack of interpretability in black-box models used for life-critical decisions",
        "Data privacy requirements when models are retrained on new patient populations",
      ],
      correctAnswer: 1,
      explanation: "Traditional medical device regulation treats devices as static; AI models may need continuous updates to maintain performance. PCCP allows manufacturers to pre-specify anticipated changes (within defined bounds) so that routine model updates do not each require a new 510(k), while still ensuring safety.",
      hints: [
        "Think about what makes AI devices fundamentally different from a scalpel or a blood pressure cuff.",
        "PCCP pre-approves the types of changes that are allowed without a new submission - not the changes themselves.",
      ],
    },
    {
      id: "q-hc-ex1-5",
      type: "true-false",
      difficulty: "medium",
      question: "The De Novo pathway is the appropriate FDA regulatory route for novel, low-to-moderate risk AI devices when no predicate device exists.",
      correctAnswer: "True",
      explanation: "De Novo is used for novel device types that are not substantially equivalent to any predicate but pose low-to-moderate risk; FDA evaluates the novel device and may create a new device classification that can serve as a predicate for future similar devices.",
      hints: [
        "Without a predicate, 510(k) cannot be used. De Novo fills the gap for low-risk novel devices.",
        "IDx-DR (autonomous diabetic retinopathy screening) was the first AI device to receive De Novo authorization.",
      ],
    },
    {
      id: "q-hc-ex1-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "FDA's draft guidance on AI-enabled device software functions identifies which key element that should be included in a device's labeling to ensure safe use of an AI diagnostic tool?",
      options: [
        "The model architecture and number of training parameters",
        "Intended use population, performance characteristics by subgroup, known limitations, and instructions on how clinicians should integrate the AI output into clinical decisions",
        "The source code and training dataset to enable independent validation",
        "Cloud computing infrastructure details and uptime guarantees",
      ],
      correctAnswer: 1,
      explanation: "FDA requires labeling that clearly specifies the intended patient population, validated performance metrics (including subgroup performance to reveal disparities), known failure modes, and guidance on appropriate clinical use - enabling clinicians to understand when to trust or override the AI.",
      hints: [
        "Labeling is the interface between the device and its users - clinicians need to know when the device works and when it does not.",
        "Subgroup performance disclosure helps prevent automation bias in populations where the device underperforms.",
      ],
    },
  ],

  "clinical-validation-ai": [
    {
      id: "q-hc-ex2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The CONSORT-AI extension to the CONSORT reporting guideline was developed to ensure that:",
      options: [
        "AI algorithms are always compared to human expert performance as a control arm",
        "Randomized trials evaluating AI interventions report details specific to AI (training data, model version, human-AI interaction) enabling reproducibility and critical appraisal",
        "Clinical AI trials always use a crossover design to control for temporal confounding",
        "AI diagnostic tools are validated in prospective studies before any retrospective analysis is published",
      ],
      correctAnswer: 1,
      explanation: "CONSORT-AI adds AI-specific reporting items to the standard CONSORT checklist: description of the AI system version, training data, how the AI output was integrated into clinical workflow, and human-AI interaction details - critical for reproducibility and evidence synthesis.",
      hints: [
        "CONSORT is a checklist for reporting randomized trials; CONSORT-AI adds items specific to AI.",
        "Without knowing which model version was used and how it was applied, trial results cannot be reproduced or generalized.",
      ],
    },
    {
      id: "q-hc-ex2-2",
      type: "true-false",
      difficulty: "medium",
      question: "Prospective clinical validation of an AI diagnostic model always provides stronger evidence of real-world efficacy than a large retrospective study on held-out test data.",
      correctAnswer: "True",
      explanation: "Retrospective studies use historical data collected under conditions that may not reflect how the AI will be deployed (different acquisition protocols, patient selection, labeling quality); prospective studies collect data in the actual deployment workflow, revealing operational challenges like covariate shift and workflow integration issues.",
      hints: [
        "Retrospective data was collected in the past for a different purpose - it may not represent the future deployment environment.",
        "Prospective studies can capture workflow factors (how clinicians interact with the AI) that retrospective studies cannot.",
      ],
    },
    {
      id: "q-hc-ex2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A common pitfall in AI clinical validation studies is 'spectrum bias.' This refers to:",
      options: [
        "The tendency for AI models to perform better on high-quality images than low-quality images in the same test set",
        "Using a test set with a different mix of disease severity than the real clinical population, inflating performance estimates",
        "Overfitting to a specific imaging spectrum (e.g., CT Hounsfield units) during training",
        "Evaluating the AI across a spectrum of thresholds when reporting a single AUC",
      ],
      correctAnswer: 1,
      explanation: "Spectrum bias occurs when the validation set contains proportionally more clear-cut cases (obvious positives and negatives) than the real clinical setting, inflating sensitivity and specificity; a diagnostically challenging mix representative of actual clinical caseload is required for valid performance estimates.",
      hints: [
        "If your test set has only obvious cancers and clear normals, performance will look better than in real practice where borderline cases are common.",
        "The 'spectrum' refers to the range of disease severity - from subtle early findings to obvious advanced disease.",
      ],
    },
    {
      id: "q-hc-ex2-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In a randomized trial comparing AI-assisted versus unaided radiologist reading, which study design best isolates the effect of the AI tool on patient outcomes rather than just reader performance metrics?",
      options: [
        "A cross-sectional study measuring radiologist AUC with and without AI on the same images",
        "A randomized cluster trial where patients are randomized to AI-assisted or standard workflow, with patient-level outcomes (missed diagnoses, time-to-treatment) as endpoints",
        "A case-control study comparing patients who received AI-assisted reads to historical controls",
        "A retrospective analysis of sites that adopted AI versus sites that did not",
      ],
      correctAnswer: 1,
      explanation: "Patient-randomized trials with patient-level clinical outcomes (missed cancers, treatment delays, mortality) are the gold standard; reader performance studies (AUC) do not measure whether better discrimination actually translates to patient benefit, and site-level comparisons suffer from confounding.",
      hints: [
        "The ultimate goal of diagnostic AI is improving patient outcomes, not radiologist AUC.",
        "Randomizing patients ensures comparable groups and allows causal inference about the AI's effect.",
      ],
    },
    {
      id: "q-hc-ex2-5",
      type: "true-false",
      difficulty: "hard",
      question: "An AI model that achieves 95% sensitivity and 90% specificity on internal validation will typically achieve similar performance when externally validated at a different institution.",
      correctAnswer: "False",
      explanation: "External validation routinely reveals substantial performance drops due to covariate shift: differences in imaging equipment, patient population demographics, disease prevalence, acquisition protocols, and labeling conventions between training and deployment sites. Published studies show median AUC drops of 0.05-0.15 on external validation.",
      hints: [
        "Performance drops between internal and external validation are a well-documented phenomenon in medical AI.",
        "Different hospitals use different scanner models, protocols, and patient populations - all of which can shift the input distribution.",
      ],
    },
  ],

  "medical-imaging-advanced": [
    {
      id: "q-hc-ex3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Uncertainty quantification in medical AI models is clinically important because:",
      options: [
        "Higher uncertainty always indicates model failure and triggers automatic reprocessing",
        "Reliable uncertainty estimates allow the model to flag low-confidence predictions for human review, preventing high-stakes errors on out-of-distribution inputs",
        "Uncertainty quantification reduces computational cost by skipping difficult cases",
        "FDA requires all Class II medical devices to output calibrated confidence intervals",
      ],
      correctAnswer: 1,
      explanation: "A model that knows what it does not know can defer uncertain cases to radiologists, concentrating AI efficiency gains on clear cases while preserving human oversight for ambiguous or out-of-distribution inputs - improving overall safety without sacrificing throughput.",
      hints: [
        "A model that is confidently wrong is dangerous; a model that flags its uncertainty enables human-AI collaboration.",
        "Out-of-distribution inputs (unusual pathology, image artifacts) are exactly where AI models fail most - uncertainty should be high for these.",
      ],
    },
    {
      id: "q-hc-ex3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Monte Carlo Dropout (MC Dropout) is commonly used for uncertainty estimation in medical image models. It works by:",
      options: [
        "Training multiple models with different architectures and averaging their predictions",
        "Keeping dropout active at test time and running multiple stochastic forward passes to estimate the variance of predictions as an uncertainty proxy",
        "Adding Gaussian noise to input images at test time and measuring output sensitivity",
        "Training a separate uncertainty head alongside the main prediction head",
      ],
      correctAnswer: 1,
      explanation: "MC Dropout treats dropout as approximate Bayesian inference: at test time, dropout is left on, and T forward passes produce a distribution of predictions. The variance of this distribution approximates predictive uncertainty - high variance signals uncertain, potentially out-of-distribution inputs.",
      hints: [
        "Standard dropout is turned off at test time; MC Dropout keeps it on to generate a distribution of outputs.",
        "Running the model T times with different random dropout masks gives T different predictions - their spread is the uncertainty.",
      ],
    },
    {
      id: "q-hc-ex3-3",
      type: "true-false",
      difficulty: "easy",
      question: "Detection tasks in medical imaging AI (e.g., finding a nodule) are generally easier to evaluate than prognosis tasks (e.g., predicting 5-year survival) because detection has objective ground truth labels.",
      correctAnswer: "True",
      explanation: "Detection ground truth comes from radiologist annotations or biopsy confirmation; prognosis requires long follow-up, suffers from censoring, and involves outcomes shaped by treatments received after imaging - making label quality, evaluation metrics (concordance index), and confounding far more complex.",
      hints: [
        "Detection: is the nodule there? Prognosis: will the patient survive 5 years? - these have very different ground truth challenges.",
        "Prognosis labels are subject to censoring (patients lost to follow-up) and treatment confounding.",
      ],
    },
    {
      id: "q-hc-ex3-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Calibration in medical AI models refers to the alignment between predicted probabilities and observed event rates. A model is perfectly calibrated when:",
      options: [
        "Its AUC equals 1.0 on the test set",
        "Among all patients for whom it predicts p% probability of disease, exactly p% actually have the disease",
        "The model's sensitivity and specificity are equal at the optimal operating threshold",
        "Its predictions are invariant to changes in image acquisition parameters",
      ],
      correctAnswer: 1,
      explanation: "Calibration means predicted probabilities reflect true event frequencies: if the model says '70% risk of malignancy' for 1000 nodules, roughly 700 of them should be malignant. Modern deep learning models are often overconfident (poorly calibrated) and require post-hoc calibration (Platt scaling, temperature scaling).",
      hints: [
        "AUC measures ranking (discrimination), not probability accuracy (calibration) - a model can have high AUC but be poorly calibrated.",
        "Calibration curves plot predicted probability (x-axis) against observed frequency (y-axis) - a perfect diagonal means perfect calibration.",
      ],
    },
    {
      id: "q-hc-ex3-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The AI task taxonomy for medical imaging distinguishes 'diagnosis' from 'prognosis.' Which statement correctly characterizes the key difference?",
      options: [
        "Diagnosis uses imaging only; prognosis always requires genomic data",
        "Diagnosis classifies the current state (what disease is present now); prognosis predicts future outcomes (what will happen to this patient over time)",
        "Prognosis models are always trained with survival analysis while diagnosis models use cross-entropy loss",
        "Diagnosis is a binary classification task; prognosis is always a regression task",
      ],
      correctAnswer: 1,
      explanation: "Diagnosis infers the current pathological state from the image (e.g., 'this lesion is malignant'); prognosis predicts future outcomes (e.g., 'this patient has 60% 5-year survival') - requiring different labels, evaluation metrics (Kaplan-Meier, concordance index), and handling of time-dependent confounders.",
      hints: [
        "Diagnosis answers 'what is wrong now?' Prognosis answers 'what will happen next?'",
        "Prognosis requires longitudinal follow-up data and must deal with censoring - patients who leave the study before the endpoint.",
      ],
    },
  ],

  "health-nlp-advanced": [
    {
      id: "q-hc-ex4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "FHIR (Fast Healthcare Interoperability Resources) is significant for clinical NLP because:",
      options: [
        "It provides a standardized format for imaging data as a DICOM replacement",
        "It defines a standard for representing and exchanging electronic health records as web-based API-accessible resources, enabling NLP pipelines to access structured and unstructured clinical data uniformly",
        "It is an FDA-mandated encryption standard for PHI in transit",
        "It is a clinical annotation schema for labeling NLP training data",
      ],
      correctAnswer: 1,
      explanation: "FHIR standardizes clinical data as RESTful resources (Patient, Observation, Condition, etc.) accessible via HTTP APIs; NLP pipelines can query FHIR endpoints to retrieve clinical notes, lab results, and medication lists programmatically, enabling scalable, interoperable clinical AI systems.",
      hints: [
        "FHIR makes EHR data accessible via APIs - think of it as a standard programming interface to any EHR system.",
        "NLP pipelines need to ingest clinical text reliably; FHIR provides a standardized way to retrieve it.",
      ],
    },
    {
      id: "q-hc-ex4-2",
      type: "true-false",
      difficulty: "medium",
      question: "Automatic ICD-10 coding from clinical notes is a multi-label classification problem because a single patient encounter can warrant multiple diagnosis codes simultaneously.",
      correctAnswer: "True",
      explanation: "A hospitalization may involve heart failure, pneumonia, type 2 diabetes, and chronic kidney disease - each coded separately with its own ICD-10 code. Models must predict a set of codes, not a single label, making it multi-label rather than multi-class, with strong class imbalance (rare codes vs. common ones).",
      hints: [
        "Multi-class means one correct class; multi-label means multiple correct labels simultaneously.",
        "Think about a complex hospital admission - many diagnoses can be documented and coded at once.",
      ],
    },
    {
      id: "q-hc-ex4-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Clinical trial matching using NLP involves which core technical challenge?",
      options: [
        "Generating synthetic patient records to expand enrollment",
        "Mapping free-text patient characteristics from EHR notes to the structured inclusion/exclusion criteria of clinical trials, requiring reasoning over negation, temporality, and medical equivalences",
        "Predicting which treatment arm a patient will be randomized to",
        "Detecting adverse events in trial participant notes for safety reporting",
      ],
      correctAnswer: 1,
      explanation: "Trial eligibility criteria are complex logical expressions over clinical concepts; matching them to EHR notes requires recognizing negated conditions ('no prior stroke'), temporal relationships ('diagnosed within the last 6 months'), and medical concept normalization (aspirin = acetylsalicylic acid) - combining NER, negation detection, and temporal reasoning.",
      hints: [
        "Eligibility criteria say things like 'no prior MI in the last 3 months' - this requires understanding negation and time.",
        "Medical concept normalization maps surface text variants ('heart attack', 'MI', 'myocardial infarction') to the same concept.",
      ],
    },
    {
      id: "q-hc-ex4-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The HIPAA Safe Harbor de-identification method requires removal of which category of identifiers from clinical text that is particularly challenging for rule-based NLP systems?",
      options: [
        "Patient names, which are always in a predictable 'FirstName LastName' format",
        "Geographic data smaller than state, dates (other than year), phone numbers, and unique identifiers - many of which appear in highly variable, context-dependent formats in free text",
        "ICD diagnosis codes, which can uniquely identify rare disease patients",
        "Medication lists, which are structured and easy to extract",
      ],
      correctAnswer: 1,
      explanation: "HIPAA Safe Harbor lists 18 PHI categories; the hardest for NLP include dates (written in many formats), zip codes, phone numbers in narrative context, and quasi-identifiers like unique diagnoses that can re-identify rare disease patients through external data linkage.",
      hints: [
        "Dates in clinical notes appear in many formats ('follow-up in 3 months', '12/15', 'last Tuesday') that challenge pattern matching.",
        "Some identifiers (zip code + age + rare diagnosis) can uniquely identify a patient even after standard de-identification.",
      ],
    },
    {
      id: "q-hc-ex4-5",
      type: "true-false",
      difficulty: "hard",
      question: "Clinical NLP models trained on MIMIC-III data (Beth Israel Deaconess Medical Center) will generally generalize without performance loss to clinical notes from other hospital systems.",
      correctAnswer: "False",
      explanation: "Clinical notes vary substantially by institution: documentation culture, specialty mix, EHR template structures, abbreviation conventions, and patient population demographics all differ. Models trained on a single-site academic ICU corpus typically show significant performance degradation on community hospitals, pediatric centers, or notes from different EHR systems.",
      hints: [
        "Every hospital has its own note-writing culture and EHR template structure - these create site-specific NLP challenges.",
        "MIMIC is ICU-focused and from a single academic center - community hospitals and other specialties have very different notes.",
      ],
    },
    {
      id: "q-hc-ex4-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Large language models like GPT-4 or Med-PaLM 2 applied to clinical decision support differ from traditional clinical NLP models primarily in their ability to:",
      options: [
        "Process DICOM imaging data directly alongside text",
        "Perform multi-step reasoning across heterogeneous clinical context (notes, lab values, guidelines) in a zero-shot or few-shot manner without task-specific fine-tuning",
        "Guarantee factual accuracy because they are trained on medical textbooks",
        "Operate within HIPAA-compliant environments by default without additional security measures",
      ],
      correctAnswer: 1,
      explanation: "LLMs enable flexible, instruction-following clinical reasoning - answering complex clinical questions, summarizing records, or synthesizing guidelines without dedicated fine-tuning. However, they hallucinate, lack guaranteed factual accuracy, require careful prompt engineering, and raise deployment challenges around privacy and liability.",
      hints: [
        "Traditional clinical NLP models are task-specific; LLMs can generalize across tasks with prompts.",
        "Zero-shot means no task-specific training examples - just a description of the task.",
      ],
    },
  ],

  "fda-pma-samd-advanced": [
    {
      id: "q-hc-ex5-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Under FDA's SaMD risk classification framework, an AI model that interprets cardiac rhythms from an implanted device and autonomously delivers a defibrillation shock would be classified as:",
      options: [
        "Class I (low risk, exempt from premarket review)",
        "Class III (high risk), requiring Premarket Approval because it treats a critical condition and drives clinical management autonomously",
        "Class II (moderate risk), requiring only 510(k) clearance as decision support",
        "Not regulated as SaMD because the hardware device is already FDA-approved",
      ],
      correctAnswer: 1,
      explanation: "FDA SaMD classification is determined by significance (treat/drive) times situation (critical); autonomously treating a life-threatening cardiac arrhythmia is the highest risk combination. Class III requires a PMA with clinical evidence of safety and effectiveness, unlike Class II which uses the 510(k) substantial equivalence pathway.",
      hints: [
        "Autonomous treatment of a critical condition is the highest-risk SaMD category.",
        "The SaMD framework distinguishes 'inform' from 'drive clinical management' - autonomous treatment is the highest significance.",
      ],
    },
    {
      id: "q-hc-ex5-2",
      type: "true-false",
      difficulty: "medium",
      question: "FDA's Total Product Life Cycle (TPLC) approach to AI device regulation requires manufacturers to monitor real-world performance after clearance and report significant performance degradation to FDA.",
      correctAnswer: "True",
      explanation: "TPLC extends regulatory oversight beyond premarket clearance to post-market surveillance; manufacturers must establish monitoring programs to detect distribution shift, performance degradation, and unexpected failure modes in deployed AI models, reporting significant issues through the Medical Device Reporting (MDR) system.",
      hints: [
        "TPLC is 'total' because it spans the whole product lifecycle, not just the premarket review.",
        "AI models can degrade over time as patient populations, imaging equipment, or clinical practices change.",
      ],
    },
    {
      id: "q-hc-ex5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The concept of a 'predicate device' in the 510(k) pathway creates a challenge for novel AI diagnostic tools because:",
      options: [
        "Predicate devices must use the same programming language and hardware as the new device",
        "For truly novel AI tasks with no prior cleared device, there may be no appropriate predicate, forcing developers toward the more burdensome De Novo or PMA pathway",
        "Predicate devices are only acceptable if they were cleared within the past 5 years",
        "AI-based devices cannot use software-only predicates and must compare to physical device predicates",
      ],
      correctAnswer: 1,
      explanation: "The 510(k) pathway requires a substantially equivalent predicate; AI applications that address entirely new clinical problems (e.g., predicting a condition no prior device detected) have no predicate. De Novo creates a new classification category for these novel-but-low-risk devices, while truly high-risk novel devices require PMA.",
      hints: [
        "If no prior device did what yours does, you cannot claim substantial equivalence to a predicate.",
        "De Novo was specifically created for this gap: novel devices that pose low-to-moderate risk but have no predicate.",
      ],
    },
    {
      id: "q-hc-ex5-4",
      type: "true-false",
      difficulty: "easy",
      question: "IRB (Institutional Review Board) approval is required for clinical studies that prospectively collect patient data to validate an AI diagnostic model, even if the model itself is not yet FDA-cleared.",
      correctAnswer: "True",
      explanation: "IRB oversight applies to human subjects research involving data collection (including medical records, images, and biological specimens); prospective collection of patient data for AI validation constitutes human subjects research requiring IRB review of consent procedures, data privacy protections, and study design.",
      hints: [
        "IRB approval protects research participants - any prospective human subjects study requires it.",
        "The regulatory status of the AI being evaluated does not affect whether IRB oversight is needed for the study.",
      ],
    },
  ],

  "imaging-calibration-uncertainty": [
    {
      id: "q-hc-ex6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Temperature scaling is a common post-hoc calibration method for neural network classifiers. It adjusts model logits before the final softmax by a single scalar parameter T. When T > 1, the effect on predicted probabilities is:",
      options: [
        "Probabilities become more extreme (sharper distribution), increasing model confidence",
        "Probabilities become softer (closer to uniform), reducing overconfidence by distributing probability mass more evenly across classes",
        "The argmax prediction changes for borderline cases, improving accuracy on uncertain examples",
        "The model is retrained on the calibration set to adjust weights, not just logits",
      ],
      correctAnswer: 1,
      explanation: "Temperature scaling divides logits by T before softmax; T > 1 reduces logit magnitudes, softening the distribution and pulling predicted probabilities toward 0.5 for binary - correcting the overconfidence common in deep networks. T < 1 sharpens predictions. Crucially, argmax is unchanged, so accuracy is preserved.",
      hints: [
        "Logits divided by T > 1 are smaller in magnitude - smaller logits mean softer softmax outputs.",
        "Temperature scaling changes confidence levels but not the predicted class - accuracy is unaffected.",
      ],
    },
    {
      id: "q-hc-ex6-2",
      type: "true-false",
      difficulty: "medium",
      question: "A model with high AUC-ROC but poor calibration is problematic for clinical decision support because clinicians using the predicted probability to make threshold-based decisions will receive unreliable risk estimates.",
      correctAnswer: "True",
      explanation: "AUC measures ranking ability (can the model order patients by risk?); calibration measures accuracy of probabilities (does a 70% prediction mean 70% event rate?). A poorly calibrated model with high AUC correctly orders patients but gives misleading absolute probabilities, causing clinicians to misestimate true event rates when setting thresholds.",
      hints: [
        "AUC = 0.9 means the model ranks patients well, but it does not mean 90% predicted probability really means 90% event rate.",
        "If a model says 40% risk for all patients but orders them correctly, AUC is fine but calibration is terrible.",
      ],
    },
    {
      id: "q-hc-ex6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Deep Ensembles for uncertainty quantification in medical AI train multiple models with different random seeds. Compared to MC Dropout, Deep Ensembles typically provide:",
      options: [
        "Lower computational cost because individual models are smaller than a single full model",
        "Better-calibrated and more reliable uncertainty estimates because ensemble disagreement captures model uncertainty more faithfully than approximate Bayesian inference via dropout",
        "Identical uncertainty estimates because both methods approximate the same Bayesian posterior",
        "Worse out-of-distribution detection because ensemble members are trained on the same data and tend to agree even on OOD inputs",
      ],
      correctAnswer: 1,
      explanation: "Deep Ensembles are empirically found to produce better-calibrated uncertainties and superior OOD detection than MC Dropout; different random initializations cause models to explore different local minima, capturing function space diversity. MC Dropout is a cruder approximation to Bayesian inference and tends to underestimate uncertainty.",
      hints: [
        "Multiple independently trained models explore different hypotheses; their disagreement is a strong uncertainty signal.",
        "MC Dropout approximates a specific Bayesian model; Deep Ensembles implicitly integrate over more diverse hypotheses.",
      ],
    },
  ],

  "icd-coding-fhir": [
    {
      id: "q-hc-ex7-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The CAML (Convolutional Attention for Multi-Label classification) model for automated ICD coding from clinical notes uses attention mechanisms for which purpose beyond standard text classification?",
      options: [
        "To speed up inference by skipping tokens that are unlikely to contain diagnosis information",
        "To learn a per-label attention distribution that highlights the specific text spans supporting each individual ICD code, providing label-specific explanations",
        "To weight tokens by their inverse document frequency in the medical corpus",
        "To apply multi-head attention across ICD code hierarchies for code grouping",
      ],
      correctAnswer: 1,
      explanation: "CAML computes a separate attention vector over the document for each ICD label, allowing the model to focus on different parts of the clinical note for different codes - 'pneumonia' focuses on different sentences than 'heart failure.' This per-label attention also provides interpretable evidence for each predicted code.",
      hints: [
        "Multi-label classification requires the model to produce a separate decision for each of the thousands of ICD codes.",
        "Per-label attention means the model reads the note differently depending on which code it is currently evaluating.",
      ],
    },
  ],
};

Object.assign(questions, extra);

registerQuestions(questions);
export default questions;
