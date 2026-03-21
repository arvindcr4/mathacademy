import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // Topic 1: RAG Fundamentals
  "rag-vs-finetuning": [
    {
      id: "q-rag-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary advantage of RAG over fine-tuning for knowledge-intensive tasks?",
      options: [
        "RAG is always cheaper than fine-tuning",
        "RAG can access up-to-date information without retraining the model",
        "RAG produces more creative responses",
        "RAG requires no preprocessing",
      ],
      correctAnswer: 1,
      explanation:
        "RAG retrieves information from an external knowledge base at inference time, allowing it to access current information without retraining. Fine-tuning bakes knowledge into model weights, which becomes stale as information changes. For rapidly evolving domains (news, documentation, legal), RAG's ability to update the knowledge base without retraining is crucial.",
      hints: [
        "Fine-tuning knowledge is frozen at training time",
        "RAG = retrieval at inference time = current data",
      ],
    },
    {
      id: "q-rag-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When should you choose fine-tuning over RAG?",
      options: [
        "When you need access to current information",
        "When you need the model to learn new reasoning patterns or style adaptation",
        "When you have a large document corpus",
        "When latency is critical",
      ],
      correctAnswer: 1,
      explanation:
        "Fine-tuning is better for learning new behaviors, styles, or reasoning patterns that aren't about factual knowledge. Examples: medical diagnosis logic, code in a specific framework's conventions, writing in a brand voice. RAG is for knowledge retrieval; fine-tuning is for behavior adaptation.",
      hints: [
        "RAG = facts, fine-tuning = behaviors",
        "Style and reasoning are learned, not retrieved",
      ],
    },
  ],

  "rag-architecture": [
    {
      id: "q-rag-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What are the three main components of a RAG system?",
      options: [
        "CPU, GPU, and RAM",
        "Retriever, Generator (LLM), and Knowledge Base",
        "Training, Validation, and Testing",
        "Encoder, Decoder, and Attention",
      ],
      correctAnswer: 1,
      explanation:
        "A RAG system has: (1) Knowledge Base - documents stored in a retrievable format (usually vector embeddings), (2) Retriever - finds relevant documents given a query, (3) Generator (LLM) - produces the final answer using retrieved context. The retriever connects the query to relevant knowledge, which the LLM uses to generate a response.",
      hints: [
        "Think: where is knowledge stored, how is it found, how is it used?",
        "RAG = Retrieve + Augment + Generate",
      ],
    },
  ],

  "when-to-use-rag": [
    {
      id: "q-rag-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which scenario is LEAST suitable for RAG?",
      options: [
        "Customer support bot answering questions about product manuals",
        "Legal document Q&A with case law references",
        "Creative writing assistant generating fictional stories",
        "Internal knowledge base search for company policies",
      ],
      correctAnswer: 2,
      explanation:
        "Creative writing doesn't benefit from RAG because it doesn't require retrieving specific factual information. RAG excels when answers must be grounded in specific documents (manuals, laws, policies). Creative tasks need the model's learned capabilities, not retrieved context.",
      hints: [
        "RAG is for finding and using specific information",
        "Creative writing = imagination, not retrieval",
      ],
    },
  ],

  "rag-limitations": [
    {
      id: "q-rag-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is 'lost in the middle' phenomenon in RAG?",
      options: [
        "Documents in the middle of the context window are less likely to be used by the LLM",
        "The retrieval step loses important documents",
        "Middle tokens are dropped during generation",
        "The embedding model ignores middle words",
      ],
      correctAnswer: 0,
      explanation:
        "Research shows LLMs tend to use information at the beginning and end of their context window more effectively than information in the middle. When retrieved documents are placed in the middle of the prompt, the model may ignore them. Solutions include: re-ranking to put most relevant docs first/last, or using smaller context windows.",
      hints: [
        "It's about where information is placed in context",
        "Beginning and end get more attention",
      ],
    },
  ],

  // Topic 2: Chunking Strategies
  "fixed-size-chunking": [
    {
      id: "q-rag-6",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is fixed-size chunking?",
      options: [
        "Chunks that vary based on document structure",
        "Splitting documents into equal-sized pieces (e.g., 512 tokens) regardless of content",
        "Chunks based on sentence boundaries",
        "Chunks based on semantic meaning",
      ],
      correctAnswer: 1,
      explanation:
        "Fixed-size chunking divides documents into equal-sized pieces (e.g., 512 tokens, 1000 characters). It's simple and fast but can split sentences or ideas mid-way. Overlap (e.g., 50 tokens) helps ensure context isn't lost at boundaries. Best for uniform documents where structure doesn't matter.",
      hints: [
        "Fixed = same size regardless of content",
        "Simple but may break semantic units",
      ],
    },
  ],

  "semantic-chunking": [
    {
      id: "q-rag-7",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does semantic chunking differ from fixed-size chunking?",
      options: [
        "Semantic chunking is always faster",
        "Semantic chunking splits at natural boundaries (sentences, paragraphs) based on meaning similarity",
        "Semantic chunking produces larger chunks",
        "Semantic chunking only works for English",
      ],
      correctAnswer: 1,
      explanation:
        "Semantic chunking analyzes the meaning of text to find natural break points. It might use sentence embeddings to detect topic shifts or respect document structure (headings, paragraphs). This keeps related information together, improving retrieval quality but at higher computational cost.",
      hints: [
        "Semantic = meaning-based",
        "Chunks follow natural content boundaries",
      ],
    },
  ],

  "chunk-size-tradeoffs": [
    {
      id: "q-rag-8",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the trade-off between small and large chunk sizes?",
      options: [
        "Small chunks are always better",
        "Small chunks provide precise retrieval but may lack context; large chunks provide context but may include irrelevant information",
        "Large chunks are always better",
        "Chunk size doesn't affect retrieval quality",
      ],
      correctAnswer: 1,
      explanation:
        "Small chunks (e.g., 100-200 tokens) enable precise matching but may miss surrounding context needed to answer questions. Large chunks (e.g., 1000+ tokens) preserve context but dilute relevant information with noise and increase token costs. Optimal size depends on document type and query patterns.",
      hints: [
        "Small = precise but fragmented",
        "Large = contextual but noisy",
      ],
    },
  ],

  // Topic 3: Vector Databases
  "embedding-models": [
    {
      id: "q-rag-9",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is an embedding model's role in RAG?",
      options: [
        "It generates the final answer",
        "It converts text into dense vectors that capture semantic meaning for similarity search",
        "It chunks documents",
        "It stores the documents",
      ],
      correctAnswer: 1,
      explanation:
        "Embedding models (like OpenAI text-embedding-3, Cohere embeddings, Sentence-BERT) convert text into fixed-size dense vectors where semantically similar texts have similar vectors. This enables similarity search: query embedding finds document embeddings closest in vector space.",
      hints: [
        "Embeddings = semantic meaning as numbers",
        "Similar meaning = similar vectors",
      ],
    },
  ],

  "vector-similarity": [
    {
      id: "q-rag-10",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is cosine similarity and why is it commonly used for vector search?",
      options: [
        "It measures the Euclidean distance between vectors",
        "It measures the angle between vectors, capturing direction similarity regardless of magnitude",
        "It counts matching dimensions",
        "It measures vector magnitude",
      ],
      correctAnswer: 1,
      explanation:
        "Cosine similarity measures the cosine of the angle between two vectors. It ranges from -1 to 1, where 1 means identical direction. It's preferred for text embeddings because it captures semantic similarity (direction) while being invariant to document length (magnitude). A long and short document on the same topic should be similar.",
      hints: [
        "Angle matters, not length",
        "Direction = meaning, magnitude = length",
      ],
    },
  ],

  "ann-indexes": [
    {
      id: "q-rag-11",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why do vector databases use Approximate Nearest Neighbor (ANN) indexes instead of exact search?",
      options: [
        "ANN is always accurate",
        "Exact search is O(n) which is too slow for millions of vectors; ANN trades slight accuracy for O(log n) search",
        "ANN uses less memory",
        "Exact search doesn't work with vectors",
      ],
      correctAnswer: 1,
      explanation:
        "Exact k-NN search requires computing similarity to all N vectors, which is O(N) and prohibitively slow for large datasets. ANN indexes (HNSW, IVF, LSH) achieve O(log N) by organizing vectors into structures that prune the search space. They return approximately the best results with ~95-99% recall at 10-100x speedup.",
      hints: [
        "Millions of vectors = exact search too slow",
        "Approximate = fast but may miss some results",
      ],
    },
  ],

  "pinecone-weaviate": [
    {
      id: "q-rag-12",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is a key difference between Pinecone and Weaviate?",
      options: [
        "Pinecone is open-source, Weaviate is proprietary",
        "Pinecone is a managed service optimized for simplicity; Weaviate is open-source with more customization and hybrid search capabilities",
        "Weaviate doesn't support vector search",
        "Pinecone requires on-premise deployment",
      ],
      correctAnswer: 1,
      explanation:
        "Pinecone is a fully managed vector database focused on simplicity and performance - you just create an index and upsert vectors. Weaviate is open-source with richer features: GraphQL API, built-in vectorization modules, hybrid search (vector + keyword), and object storage. Choose Pinecone for simplicity, Weaviate for control and features.",
      hints: [
        "Managed vs self-hosted with more features",
        "Pinecone = easy, Weaviate = flexible",
      ],
    },
  ],

  // Topic 4: Retrieval Optimization
  "hybrid-search": [
    {
      id: "q-rag-13",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why does hybrid search (BM25 + vector) often outperform vector-only search?",
      options: [
        "BM25 is always better than vectors",
        "BM25 excels at exact keyword matching while vectors capture semantic similarity; combining both covers more query types",
        "Vector search is too slow",
        "Hybrid search uses less memory",
      ],
      correctAnswer: 1,
      explanation:
        "Vector search handles semantic queries ('how to fix slow computer') but can miss exact terms ('error code 0x80070005'). BM25 excels at keyword matching but misses synonyms. Hybrid search combines both: BM25 for precise terms, vectors for semantics, then fuses the results (Reciprocal Rank Fusion). This improves recall across query types.",
      hints: [
        "Keywords = precision, vectors = semantics",
        "Combining covers both cases",
      ],
    },
  ],

  "reranking-models": [
    {
      id: "q-rag-14",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why use a cross-encoder reranker after initial retrieval?",
      options: [
        "Cross-encoders are faster than bi-encoders",
        "Cross-encoders jointly encode query and document for more accurate relevance scoring than vector similarity",
        "Cross-encoders use less memory",
        "Cross-encoders can handle more documents",
      ],
      correctAnswer: 1,
      explanation:
        "Bi-encoders (standard embeddings) encode query and document separately, losing fine-grained interaction information. Cross-encoders feed both query and document together into a transformer, capturing query-document interactions for much higher accuracy. They're too slow for millions of docs but perfect for re-ranking top 20-50 results.",
      hints: [
        "Separate encoding = fast but less accurate",
        "Joint encoding = accurate but slow",
      ],
    },
  ],

  "query-expansion": [
    {
      id: "q-rag-15",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is query expansion in RAG?",
      options: [
        "Making the query longer",
        "Generating additional related queries or adding synonyms to improve retrieval recall",
        "Expanding the search index",
        "Increasing chunk size",
      ],
      correctAnswer: 1,
      explanation:
        "Query expansion addresses vocabulary mismatch: users may use different words than documents. Techniques include: adding synonyms, generating multiple related queries with an LLM, or using HyDE (generate hypothetical answer, search for that). This increases recall by catching documents that use different terminology.",
      hints: [
        "User says 'car', document says 'automobile'",
        "More query variations = more retrieval paths",
      ],
    },
  ],

  "hyde": [
    {
      id: "q-rag-16",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does HyDE (Hypothetical Document Embeddings) improve retrieval?",
      options: [
        "It generates longer queries",
        "It generates a hypothetical answer to the query, then searches for documents similar to that answer rather than the query itself",
        "It uses multiple embedding models",
        "It expands the vector database",
      ],
      correctAnswer: 1,
      explanation:
        "HyDE recognizes that queries are often short and abstract while documents are detailed and concrete. It uses an LLM to generate a hypothetical answer to the query, embeds this hypothetical document, and searches for similar real documents. This bridges the query-document gap effectively.",
      hints: [
        "Query = 'what is X?', hypothetical doc = explanation of X",
        "Answer-to-answer matching works better than query-to-answer",
      ],
    },
  ],

  // Topic 5: Long Context
  "context-window-limits": [
    {
      id: "q-rag-17",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What happens when retrieved documents exceed the LLM's context window?",
      options: [
        "The LLM automatically compresses the documents",
        "Documents must be truncated or summarized, potentially losing relevant information",
        "The LLM processes them in multiple passes",
        "Nothing - modern LLMs have unlimited context",
      ],
      correctAnswer: 1,
      explanation:
        "LLMs have fixed context windows (4K, 128K, 200K tokens depending on model). When retrieved content plus prompt exceeds this limit, you must truncate documents, summarize them, or use a sliding window approach. This is a key constraint in RAG system design that affects how many and how large chunks can be retrieved.",
      hints: [
        "Context windows are finite",
        "Too many docs = truncation = lost info",
      ],
    },
  ],

  "context-compression": [
    {
      id: "q-rag-18",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is context compression in RAG systems?",
      options: [
        "Compressing the vector database",
        "Summarizing or extracting relevant parts of retrieved documents to fit within context limits",
        "Compressing the query",
        "Reducing embedding dimensions",
      ],
      correctAnswer: 1,
      explanation:
        "Context compression reduces token usage by: (1) Extractive: selecting most relevant sentences/paragraphs, (2) Abstractive: LLM summarization of documents, (3) Learned compression: trained models that compress while preserving query-relevant information. This allows more documents to be considered within fixed context windows.",
      hints: [
        "Keep relevant, discard irrelevant",
        "Fit more docs in same context window",
      ],
    },
  ],

  "long-context-models": [
    {
      id: "q-rag-19",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are the trade-offs of using long-context models (128K+ tokens) for RAG?",
      options: [
        "Long-context models are always better",
        "Long-context enables more documents but increases latency, cost, and may suffer from 'lost in the middle' issues",
        "Long-context models have worse accuracy",
        "Long-context models don't work with RAG",
      ],
      correctAnswer: 1,
      explanation:
        "Long-context models (Claude 200K, GPT-4 128K, Gemini 1M) allow retrieving more documents, but: (1) Higher cost: more tokens = more $, (2) Higher latency: processing takes longer, (3) Quality issues: 'lost in the middle' phenomenon where center content is less utilized, (4) Diminishing returns: more docs doesn't always mean better answers.",
      hints: [
        "More context = more cost and latency",
        "Quality may not improve linearly",
      ],
    },
  ],

  // Topic 6: RAG Evaluation
  "rag-metrics": [
    {
      id: "q-rag-20",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are the key metrics for evaluating RAG system performance?",
      options: [
        "Only accuracy",
        "Retrieval metrics (recall, MRR) and generation metrics (faithfulness, relevance, answer quality)",
        "Only latency",
        "Only cost",
      ],
      correctAnswer: 1,
      explanation:
        "RAG evaluation covers two stages: (1) Retrieval: recall (did we find relevant docs?), precision (were retrieved docs relevant?), MRR (how high were relevant docs ranked?), (2) Generation: faithfulness (answer grounded in context?), relevance (answer addresses query?), coherence (is answer well-formed?).",
      hints: [
        "Two stages: finding docs and using docs",
        "Both retrieval and generation need metrics",
      ],
    },
  ],

  "ragas-framework": [
    {
      id: "q-rag-21",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What metrics does the RAGAS framework provide for RAG evaluation?",
      options: [
        "Only retrieval metrics",
        "Faithfulness, Answer Relevance, Context Relevance, Context Recall",
        "Only latency metrics",
        "Only cost metrics",
      ],
      correctAnswer: 1,
      explanation:
        "RAGAS (Retrieval Augmented Generation Assessment) provides: (1) Faithfulness - answer grounded in retrieved context, (2) Answer Relevance - answer addresses the question, (3) Context Relevance - retrieved context is relevant to question, (4) Context Recall - relevant context was retrieved. These cover both retrieval and generation quality.",
      hints: [
        "RAGAS = comprehensive RAG evaluation",
        "Four metrics covering retrieval and generation",
      ],
    },
  ],

  "retrieval-eval": [
    {
      id: "q-rag-22",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How do you measure retrieval quality when you don't have ground truth labels?",
      options: [
        "You cannot measure it without labels",
        "Use LLM-as-judge to score relevance, or measure downstream answer quality as a proxy",
        "Only use latency metrics",
        "Count the number of retrieved documents",
      ],
      correctAnswer: 1,
      explanation:
        "Without labeled relevance judgments, you can: (1) LLM-as-judge: ask an LLM to rate query-document relevance, (2) Indirect evaluation: measure if answers using retrieved docs are correct, (3) Intrinsic metrics: diversity of retrieved docs, embedding similarity scores. These proxy measures help tune retrieval even without gold labels.",
      hints: [
        "No labels = need proxy measures",
        "Answer quality reflects retrieval quality",
      ],
    },
  ],
};

registerQuestions(questions);
