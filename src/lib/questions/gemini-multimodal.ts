import { registerQuestions } from "./registry";

registerQuestions({
  "gemini-nano": [
    {
      id: "q-gem-kp-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following best describes the primary use case for Gemini Nano?",
      options: [
        "Deploying large-scale reasoning tasks on cloud infrastructure.",
        "On-device execution for mobile and edge applications with memory and power constraints.",
        "High-throughput video generation and editing.",
        "Training massive multimodal foundation models from scratch.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini Nano is highly optimized for edge devices (like smartphones), allowing on-device AI capabilities that ensure privacy, work offline, and have low latency.",
      hints: [
        "'Nano' implies small size - think mobile or edge hardware.",
        "Consider privacy and offline use as key constraints for on-device AI.",
      ],
    },
  ],
  "gemini-flash": [
    {
      id: "q-gem-kp-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the main design goal of the Gemini Flash model tier?",
      options: [
        "Maximum accuracy and reasoning capabilities for complex mathematical proofs.",
        "High-frequency trading and low-level system design.",
        "Speed and cost-efficiency for high-volume, lightweight multimodal tasks.",
        "Generating photorealistic 3D environments.",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini Flash is designed to be a lightweight, fast, and cost-effective model, optimizing inference speed while retaining strong multimodal capabilities.",
      hints: [
        "\'Flash\' implies speed — think high-throughput, low-latency use cases.",
        "Cost-efficiency is the other key goal alongside speed.",
      ],
    },
  ],
  "gemini-pro": [
    {
      id: "q-gem-kp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Gemini Pro is generally considered the best choice for which of the following scenarios?",
      options: [
        "Offline processing on a smartwatch.",
        "General-purpose enterprise applications requiring a balance of strong reasoning, performance, and multimodality.",
        "Only generating audio from textual descriptions.",
        "Operating exclusively without an internet connection on IoT devices.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini Pro is the versatile, workhorse model of the Gemini family, offering a great balance of advanced reasoning, multimodal processing, and efficiency for most enterprise use cases.",
      hints: [
        "\'Pro\' sits in the middle of the tier hierarchy — not the smallest or largest.",
        "Think about the \'balanced\' use case: not on-device, not the most demanding tasks.",
      ],
    },
  ],
  "gemini-ultra": [
    {
      id: "q-gem-kp-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which of the following capabilities distinguishes Gemini Ultra from the Pro and Nano tiers?",
      options: [
        "It is the only model that can run locally on an Android phone.",
        "State-of-the-art performance on highly complex tasks like coding, logical reasoning, and nuanced multimodal understanding.",
        "It processes only text data to maximize processing speed.",
        "It is completely open-source and free for all commercial use.",
      ],
      correctAnswer:
        "State-of-the-art performance on highly complex tasks like coding, logical reasoning, and nuanced multimodal understanding.",
      explanation:
        "Gemini Ultra is the most capable model in the family, designed specifically for highly complex, compute-intensive tasks that require deep reasoning and state-of-the-art multimodal understanding.",
      hints: [
        "\'Ultra\' implies maximum capability — the top of the tier hierarchy.",
        "What kinds of tasks require compute and reasoning that Pro cannot handle?",
      ],
    },
  ],
  "native-multimodality": [
    {
      id: "q-gem-kp-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Unlike early multimodal models that stitched together separate text and vision models, Gemini was trained natively on interleaved multimodal data from the beginning.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini is natively multimodal, meaning it was trained from scratch on text, images, audio, and video simultaneously, allowing it to seamlessly understand and reason across different modalities without relying on intermediary models.",
      hints: [
        "\'Natively\' means built in from the start, not added later.",
        "Compare with approaches that attach a vision encoder to a text-only model.",
      ],
    },
  ],
  "system-instructions": [
    {
      id: "q-gem-kp-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'When using the Gemini API, what is the primary purpose of providing "System Instructions"?',
      options: [
        "To bypass rate limits on the API.",
        "To define the overall persona, tone, and behavioral rules the model should follow throughout a conversation.",
        "To directly modify the model weights.",
        "To provide the user’s immediate question.",
      ],
      correctAnswer:
        "To define the overall persona, tone, and behavioral rules the model should follow throughout a conversation.",
      explanation:
        "System instructions allow developers to steer the behavior of the model, setting its persona, tone, and guidelines before it processes specific user prompts.",
      hints: [
        "System instructions appear before the conversation starts — they set the stage.",
        "Think of them as the developer\'s standing orders to the model.",
      ],
    },
  ],
  "multimodal-prompting": [
    {
      id: "q-gem-kp-7",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which prompting technique takes full advantage of Gemini’s native multimodality?",
      options: [
        "Providing only textual descriptions of images.",
        "Interleaving text, images, and video in the prompt sequentially to provide rich context.",
        "Using exclusively system instructions without user prompts.",
        "Converting all images to base64 strings but ignoring text.",
      ],
      correctAnswer:
        "Interleaving text, images, and video in the prompt sequentially to provide rich context.",
      explanation:
        "Because Gemini is natively multimodal, interleaved prompting—where text, images, and other media are mixed together naturally—provides the most effective context for the model to reason about.",
      hints: [
        "\'Interleaved\' means mixing modalities together in the same sequence.",
        "Think about how a textbook mixes diagrams and explanatory text on the same page.",
      ],
    },
  ],
  "few-shot-gemini": [
    {
      id: "q-gem-kp-8",
      type: "true-false",
      difficulty: "easy",
      question:
        "Few-shot prompting with Gemini only works for text and cannot include multimodal examples.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Few-shot prompting with Gemini is fully multimodal. You can provide examples that include both images and text to demonstrate the desired output format.",
      hints: [
        "Few-shot means giving examples — can those examples include images?",
        "Gemini\'s native multimodality extends to the example portion of the prompt.",
      ],
    },
  ],
  "context-caching": [
    {
      id: "q-gem-kp-9",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary benefit of using Context Caching in the Gemini API?",
      options: [
        "It permanently stores user data for model fine-tuning.",
        "It reduces latency and costs when repeatedly sending large amounts of context (like a long document or video) in multiple requests.",
        "It allows the model to access real-time internet search results.",
        "It caches the model outputs to serve identical responses to different users instantly.",
      ],
      correctAnswer:
        "It reduces latency and costs when repeatedly sending large amounts of context (like a long document or video) in multiple requests.",
      explanation:
        "Context Caching allows you to pass a large context window once, cache it, and reference it in subsequent requests. This significantly reduces both latency and token costs for repetitive tasks on the same large document or video.",
      hints: [
        "Think about how expensive it would be to re-send a 500-page PDF on every request.",
        "Caching avoids redundant token processing by reusing stored computation.",
      ],
    },
  ],
  "json-schema-gemini": [
    {
      id: "q-gem-kp-10",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How can you guarantee that Gemini returns its response in a strictly formatted JSON structure?",
      options: [
        "By just asking nicely in the prompt.",
        "By providing a JSON Schema object in the `response_schema` parameter of the API configuration.",
        "By setting `temperature` to 1.0.",
        "By using the `stream` parameter.",
      ],
      correctAnswer:
        "By providing a JSON Schema object in the `response_schema` parameter of the API configuration.",
      explanation:
        "The Gemini API supports structured outputs by allowing developers to pass a strict JSON Schema via the `response_schema` configuration, ensuring the model output conforms exactly to the defined structure.",
      hints: [
        "JSON Schema defines the shape of the expected output.",
        "The API parameter name contains both \'response\' and \'schema\'.",
      ],
    },
  ],
  "gemini-api-auth": [
    {
      id: "q-gem-kp-11",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the following is the standard way to authenticate requests to the Gemini API (Google AI Studio)?",
      options: [
        "OAuth 2.0 user login only.",
        "Providing an API key generated from Google AI Studio via an x-goog-api-key header or SDK configuration.",
        "Using an AWS IAM role.",
        "No authentication is required for Gemini Pro.",
      ],
      correctAnswer:
        "Providing an API key generated from Google AI Studio via an x-goog-api-key header or SDK configuration.",
      explanation:
        "The primary authentication method for the Google AI Studio Gemini API is an API key, which is passed in the SDK client initialization or via HTTP headers.",
      hints: [
        "API keys are the simplest authentication method — no OAuth flow needed.",
        "You generate the key from Google AI Studio\'s key management interface.",
      ],
    },
  ],
  "generate-content": [
    {
      id: "q-gem-kp-12",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the official Gemini SDKs, which method is typically used to send a prompt and receive a complete response?",
      options: ["predict()", "generateContent()", "completeText()", "chat()"],
      correctAnswer: "generateContent()",
      explanation:
        "The `generateContent` method (or its language-specific equivalent) is the core method in the Gemini API used for standard text, multimodal, and chat generation requests.",
      hints: [
        "The method name describes what it does: generate content.",
        "Both single-turn and multi-turn (chat) requests can use this method.",
      ],
    },
  ],
  "streaming-responses": [
    {
      id: "q-gem-kp-13",
      type: "true-false",
      difficulty: "easy",
      question:
        "The Gemini API supports streaming, allowing applications to display the generated text to the user as it is being produced.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Yes, the `generateContentStream` method returns chunks of the response as soon as they are generated, which is crucial for reducing perceived latency in chat applications.",
      hints: [
        "Streaming is what allows text to appear progressively in a chat UI.",
        "The streaming method name differs from the standard one by the word \'Stream\'.",
      ],
    },
  ],
  "token-counting": [
    {
      id: "q-gem-kp-14",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When counting tokens for a multimodal prompt in Gemini, how are images typically accounted for?",
      options: [
        "Images cost zero tokens.",
        "Images are converted to base64 text, and every character counts as a token.",
        "Images are processed by a vision encoder and consume a fixed, predetermined number of tokens (e.g., 258 tokens per image).",
        "Images are billed by megabyte, not by tokens.",
      ],
      correctAnswer:
        "Images are processed by a vision encoder and consume a fixed, predetermined number of tokens (e.g., 258 tokens per image).",
      explanation:
        "In the Gemini API, an image is encoded into a specific number of tokens (typically 258 tokens for standard images) regardless of its pixel dimensions, making token estimation predictable.",
      hints: [
        "Token cost for images is fixed per image, not proportional to resolution.",
        "258 is the commonly cited token cost per image in Gemini\'s documentation.",
      ],
    },
  ],
  "safety-settings": [
    {
      id: "q-gem-kp-15",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following best describes how safety settings work in the Gemini API?",
      options: [
        "Safety settings cannot be changed by the developer.",
        "Developers can configure thresholds (e.g., BLOCK_ONLY_HIGH) for various categories like Harassment, Hate Speech, and Dangerous Content.",
        "Safety settings only apply to image generation, not text.",
        "Safety settings are determined solely by the system prompt.",
      ],
      correctAnswer:
        "Developers can configure thresholds (e.g., BLOCK_ONLY_HIGH) for various categories like Harassment, Hate Speech, and Dangerous Content.",
      explanation:
        "The Gemini API provides granular safety settings, allowing developers to adjust blocking thresholds across different harm categories depending on their application’s use case.",
      hints: [
        "\’Granular\’ means you can configure each harm category independently.",
        "Threshold names like BLOCK_ONLY_HIGH indicate the level at which blocking triggers.",
      ],
    },
  ],
  "image-understanding": [
    {
      id: "q-gem-kp-16",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Gemini’s image understanding capabilities allow it to perform which of the following tasks?",
      options: [
        "Visual Question Answering (VQA).",
        "Extracting text from images (OCR).",
        "Describing the contents of a photograph.",
        "All of the above.",
      ],
      correctAnswer: "All of the above.",
      explanation:
        "Gemini is highly capable at VQA, OCR, and rich image captioning due to its native multimodal architecture.",
      hints: [
        "VQA means answering questions about image content.",
        "OCR means extracting text embedded in an image.",
      ],
    },
  ],
  "video-processing": [
    {
      id: "q-gem-kp-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How does Gemini process video inputs?",
      options: [
        "It watches the video in real-time as an MP4 stream.",
        "It samples frames from the video at a specific frame rate and processes them sequentially along with the audio track.",
        "It only processes the first frame of the video.",
        "It converts the video into an animated GIF before processing.",
      ],
      correctAnswer:
        "It samples frames from the video at a specific frame rate and processes them sequentially along with the audio track.",
      explanation:
        "Gemini processes video by sampling it as a sequence of image frames (e.g., 1 frame per second) and analyzing them in order, combined with the transcribed audio.",
      hints: [
        "Video is essentially a sequence of image frames — how many per second?",
        "Audio is processed alongside the visual frames for comprehensive understanding.",
      ],
    },
  ],
  "audio-transcription": [
    {
      id: "q-gem-kp-18",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When processing audio files with Gemini, what advantage does it have over traditional Speech-to-Text pipelines?",
      options: [
        "It only works with English audio.",
        "It relies entirely on an external Whisper model.",
        "It can directly reason over the audio (e.g., understanding tone, identifying speakers, summarizing) without needing an intermediate text transcript.",
        "It requires audio to be converted to MIDI format.",
      ],
      correctAnswer:
        "It can directly reason over the audio (e.g., understanding tone, identifying speakers, summarizing) without needing an intermediate text transcript.",
      explanation:
        "Because Gemini is natively multimodal, it processes audio directly. This means it can capture nuances like tone, emotion, and overlapping voices that are often lost in standard text transcripts.",
      hints: [
        "What information does a pure text transcript not capture?",
        "Gemini processes raw audio waveforms, not just word sequences.",
      ],
    },
  ],
  "file-api": [
    {
      id: "q-gem-kp-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the purpose of the Gemini File API?",
      options: [
        "To format the hard drive of the host machine.",
        "To permanently host a website\'s static assets.",
        "To temporarily upload large files (like videos, large PDFs, or audio) to Google’s servers so they can be referenced in API prompts.",
        "To download training weights of the Gemini models.",
      ],
      correctAnswer:
        "To temporarily upload large files (like videos, large PDFs, or audio) to Google’s servers so they can be referenced in API prompts.",
      explanation:
        "The File API allows developers to upload large files (up to 2GB per file) for temporary storage (usually 48 hours), returning a URI that can be used in `generateContent` requests without hitting payload size limits.",
      hints: [
        "The File API solves the problem of sending large files in HTTP request bodies.",
        "Files are temporary — they expire after 48 hours.",
      ],
    },
  ],
  "document-qa": [
    {
      id: "q-gem-kp-20",
      type: "true-false",
      difficulty: "easy",
      question:
        "Gemini can process large PDF documents and answer questions based directly on the text and charts contained within the document.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini has strong document understanding capabilities, including the ability to parse long PDFs, extract information, and reason over embedded tables and charts.",
      hints: [
        "Gemini treats PDF pages as images and can read both text and visual content.",
        "Charts and tables are visual encodings of data — Gemini can decode them.",
      ],
    },
  ],
  "tool-declarations": [
    {
      id: "q-gem-kp-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "How do you define a tool (function) for the Gemini API?",
      options: [
        "By providing an OpenAPI Swagger file in YAML format.",
        "By writing a JavaScript function inside the prompt string.",
        "By passing an array of `FunctionDeclaration` objects detailing the function name, description, and parameter schema.",
        "By executing the function locally before calling Gemini.",
      ],
      correctAnswer:
        "By passing an array of `FunctionDeclaration` objects detailing the function name, description, and parameter schema.",
      explanation:
        "Tools are defined by passing `FunctionDeclaration` objects (which use OpenAPI JSON schema syntax) to the model. The model uses these descriptions to determine if and how to call the function.",
      hints: [
        "The object type name is \'FunctionDeclaration\' — it declares the function signature.",
        "OpenAPI JSON schema syntax is the same format used in REST API documentation.",
      ],
    },
  ],
  "function-execution": [
    {
      id: "q-gem-kp-22",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When Gemini decides to call a function, what is the responsibility of the developer?",
      options: [
        "Wait for Gemini to execute the function on Google’s servers.",
        "Execute the function locally using the arguments provided by Gemini, and then send the result back to Gemini in a new prompt.",
        "Restart the API request.",
        "Generate an API key for the function.",
      ],
      correctAnswer:
        "Execute the function locally using the arguments provided by Gemini, and then send the result back to Gemini in a new prompt.",
      explanation:
        "Gemini does not execute custom functions. It only generates the function name and arguments. The developer must intercept this, run the code locally, and return the `functionResponse` back to the model.",
      hints: [
        "Gemini is the orchestrator — it tells the developer what to run.",
        "The result must be returned as a `functionResponse` in the next conversation turn.",
      ],
    },
  ],
  "parallel-function-calling": [
    {
      id: "q-gem-kp-23",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gemini models support parallel function calling, allowing the model to return multiple function calls in a single response.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini can recognize when multiple independent function calls are needed (e.g., getting the weather for three different cities) and return them simultaneously, saving round-trip latency.",
      hints: [
        "If two functions are independent, why make two round trips?",
        "Parallel calls reduce total latency compared to sequential calls.",
      ],
    },
  ],
  "google-search-grounding": [
    {
      id: "q-gem-kp-24",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary benefit of enabling the Google Search grounding tool in Gemini?",
      options: [
        "It makes the model run faster.",
        "It allows the model to augment its training data with real-time, up-to-date information from the web to reduce hallucinations.",
        "It automatically publishes the model’s answers to a public web page.",
        "It bypasses token limits.",
      ],
      correctAnswer:
        "It allows the model to augment its training data with real-time, up-to-date information from the web to reduce hallucinations.",
      explanation:
        "Grounding with Google Search connects the model to the live internet, significantly reducing hallucinations and allowing it to answer queries about recent events.",
      hints: [
        "Hallucinations occur when a model generates plausible but factually incorrect content.",
        "Grounding tethers responses to real, verifiable web content.",
      ],
    },
  ],
  "code-execution": [
    {
      id: "q-gem-kp-25",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Gemini API offers a Code Execution tool. What does this tool do?",
      options: [
        "It runs user-provided code on their local machine.",
        "It allows Gemini to write and execute Python code in a secure sandbox on Google’s servers to solve complex math or logic problems.",
        "It compiles C++ code into an executable binary.",
        "It debugs syntax errors in the developer’s application.",
      ],
      correctAnswer:
        "It allows Gemini to write and execute Python code in a secure sandbox on Google’s servers to solve complex math or logic problems.",
      explanation:
        "The Code Execution tool enables the model to autonomously write and execute Python code in a secure Google sandbox, which is incredibly useful for math, data analysis, and deterministic logic tasks.",
      hints: [
        "A sandbox ensures user safety by isolating the executed code.",
        "Python is the language supported in the Gemini Code Execution environment.",
      ],
    },
  ],
  "gemini-agents": [
    {
      id: "q-gem-kp-26",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When building an autonomous agent with Gemini, what is the typical architecture loop?",
      options: [
        "Think -> Act -> Observe (ReAct) loop utilizing tool calling.",
        "A single zero-shot prompt with no tools.",
        "Hardcoding a finite state machine.",
        "Training a new model from scratch for every task.",
      ],
      correctAnswer:
        "Think -> Act -> Observe (ReAct) loop utilizing tool calling.",
      explanation:
        "Agentic workflows typically rely on the ReAct (Reasoning and Acting) paradigm, where the model iteratively thinks about the problem, calls tools (acts), observes the result, and decides the next step.",
      hints: [
        "ReAct stands for Reasoning and Acting — a looping paradigm.",
        "The loop repeats until the model decides it has a final answer.",
      ],
    },
  ],
  "rag-with-gemini": [
    {
      id: "q-gem-kp-27",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a RAG (Retrieval-Augmented Generation) system powered by Gemini, how does the model handle long contexts up to 2 million tokens?",
      options: [
        "It doesn’t; it requires strict chunking to 4096 tokens.",
        "It relies solely on Google Search.",
        "It can ingest massive entire document repositories directly in the prompt, sometimes reducing the need for complex vector chunking.",
        "It ignores any tokens past the first 100k.",
      ],
      correctAnswer:
        "It can ingest massive entire document repositories directly in the prompt, sometimes reducing the need for complex vector chunking.",
      explanation:
        "Gemini 1.5 Pro features a massive 2-million token context window, which allows developers to often bypass complex traditional RAG (chunking/vector databases) and just place entire codebases or document libraries directly into the prompt.",
      hints: [
        "2 million tokens can hold an entire codebase or set of documents.",
        "When you can fit everything in context, you may not need a vector DB.",
      ],
    },
  ],
  "model-tuning": [
    {
      id: "q-gem-kp-28",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which tuning method is typically supported in Google AI Studio to customize Gemini’s behavior with structured examples?",
      options: [
        "Full parameters pre-training.",
        "RLHF (Reinforcement Learning from Human Feedback).",
        "Parameter-Efficient Fine-Tuning (PEFT) / Supervised Fine-Tuning.",
        "Distillation distillation.",
      ],
      correctAnswer:
        "Parameter-Efficient Fine-Tuning (PEFT) / Supervised Fine-Tuning.",
      explanation:
        "Google AI Studio allows developers to perform Supervised Fine-Tuning (often using parameter-efficient methods under the hood) by providing a dataset of input-output examples to adapt the model to a specific tone or task.",
      hints: [
        "Fine-tuning uses labeled examples of desired input/output behavior.",
        "PEFT means only a small subset of parameters are updated, saving compute.",
      ],
    },
  ],
  "evaluating-gemini": [
    {
      id: "q-gem-kp-29",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'When evaluating the output of an LLM like Gemini, what is the "LLM-as-a-Judge" technique?',
      options: [
        "Using a human panel to grade responses.",
        "Using a strong model (like Gemini 1.5 Pro) to score and evaluate the outputs of another model (or itself) against a rubric.",
        "Calculating the BLEU score.",
        "Running unit tests.",
      ],
      correctAnswer:
        "Using a strong model (like Gemini 1.5 Pro) to score and evaluate the outputs of another model (or itself) against a rubric.",
      explanation:
        "LLM-as-a-Judge involves using a highly capable foundation model to automatically evaluate the quality, relevance, or factual accuracy of text generated by an AI pipeline, scaling the evaluation process.",
      hints: [
        "Human evaluation is expensive and slow — LLM-as-a-Judge automates it.",
        "A strong model grades another model\'s outputs against a predefined rubric.",
      ],
    },
  ],
  "vertex-vs-aistudio": [
    {
      id: "q-gem-kp-30",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary difference between Google AI Studio and Vertex AI when accessing Gemini?",
      options: [
        "AI Studio only offers text models, Vertex offers multimodal.",
        "AI Studio is for prototyping and fast developer access, while Vertex AI provides enterprise-grade security, data governance, and MLOps pipelines.",
        "Vertex AI is completely free, while AI Studio is paid.",
        "There is no difference; they are the exact same platform.",
      ],
      correctAnswer:
        "AI Studio is for prototyping and fast developer access, while Vertex AI provides enterprise-grade security, data governance, and MLOps pipelines.",
      explanation:
        "Google AI Studio is built for rapid developer prototyping with easy API keys, whereas Vertex AI (on Google Cloud) offers enterprise SLAs, advanced MLOps, private endpoints, and strict data governance.",
      hints: [
        "Think about which platform is aimed at enterprise customers vs. individual developers.",
        "Vertex AI is a full Google Cloud product with SLAs and data governance.",
      ],
    },
  ],
  "context-window-1m": [
    {
      id: "q-gem-kp-31",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Approximately how large is Gemini 1.5 Pro\'s context window at launch?",
      options: [
        "8,000 tokens",
        "128,000 tokens",
        "1,000,000 tokens",
        "10,000,000 tokens",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini 1.5 Pro launched with a 1-million-token context window (later expanded to 2 million), making it the largest context window available in a generally-accessible model at the time.",
      hints: [
        "The number is in the millions, not thousands.",
        "\'1M\' is commonly used as shorthand for this context size.",
      ],
    },
    {
      id: "q-gem-kp-32",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following tasks is uniquely enabled by Gemini 1.5 Pro\'s 1M token context window that was not practical with smaller context models?",
      options: [
        "Answering a single factual trivia question.",
        "Analyzing an entire large codebase or a full-length book in a single prompt.",
        "Translating a one-sentence phrase.",
        "Generating a short poem.",
      ],
      correctAnswer: 1,
      explanation:
        "A 1-million-token context window can hold roughly 700,000 words of text, allowing entire codebases, novels, or document repositories to be included in a single prompt for holistic analysis.",
      hints: [
        "Think about the sheer volume of text 1 million tokens represents.",
        "What tasks require reasoning over a very large amount of context simultaneously?",
      ],
    },
    {
      id: "q-gem-kp-33",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini 1.5 Pro\'s long context capability means that traditional RAG (Retrieval-Augmented Generation) with vector databases is always unnecessary when using it.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "While the large context window reduces the need for RAG in many cases, RAG still offers advantages: vector search can be faster and cheaper for very large corpora, and it helps focus the model on the most relevant chunks when the full corpus exceeds even the 2M token limit.",
      hints: [
        "Consider cost and latency of filling a 2M token context vs. retrieving only relevant chunks.",
        "What happens when a corpus is larger than even the maximum context window?",
      ],
    },
  ],
  "native-multimodal-architecture": [
    {
      id: "q-gem-kp-34",
      type: "true-false",
      difficulty: "easy",
      question:
        "Gemini\'s native multimodal architecture means it was trained on text, images, audio, and video simultaneously from the start, rather than patching a separate vision module onto a text model.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Unlike GPT-4V\'s original late-fusion approach (connecting a vision encoder to a language model), Gemini was designed and trained as a natively multimodal system, allowing tighter integration across modalities.",
      hints: [
        "Think about training from scratch vs. bolting on additional modules.",
        "\'Late-fusion\' means modalities are combined after independent encoding.",
      ],
    },
    {
      id: "q-gem-kp-35",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What architectural approach did early versions of GPT-4V use that differs from Gemini\'s native multimodal design?",
      options: [
        "Training jointly on text and images from scratch.",
        "A late-fusion approach connecting a separate vision encoder to a pre-trained language model.",
        "Using only convolutional neural networks for all modalities.",
        "Processing all inputs as audio waveforms.",
      ],
      correctAnswer: 1,
      explanation:
        "GPT-4V originally used a late-fusion design where a CLIP-based vision encoder was connected to the GPT-4 language model. Gemini, by contrast, is trained from the ground up on interleaved multimodal data.",
      hints: [
        "\'Late-fusion\' refers to combining modality representations late in the pipeline.",
        "CLIP is a separately trained vision-language encoder from OpenAI.",
      ],
    },
    {
      id: "q-gem-kp-36",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which of the following best describes a key advantage of native multimodal training over late-fusion approaches for cross-modal reasoning?",
      options: [
        "Native training is faster at inference time due to fewer parameters.",
        "The model learns joint representations across modalities during training, enabling tighter cross-modal reasoning rather than treating vision as a plug-in.",
        "Late-fusion models cannot process images at all.",
        "Native training always requires more human-labeled data.",
      ],
      correctAnswer: 1,
      explanation:
        "When a model is trained natively on interleaved multimodal data, it develops shared internal representations that span text, images, and audio. This enables more nuanced cross-modal reasoning than stitching together specialized encoders post-hoc.",
      hints: [
        "Shared representations allow reasoning that spans modality boundaries.",
        "Think about what \'joint training\' means for the model\'s internal feature space.",
      ],
    },
  ],
  "video-understanding": [
    {
      id: "q-gem-kp-37",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Gemini can analyze a long video and answer questions about events that happened at different timestamps. What capability does this demonstrate?",
      options: [
        "Real-time video streaming generation.",
        "Frame-level temporal reasoning across long video sequences.",
        "Audio-only podcast summarization.",
        "3D scene reconstruction.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini\'s video understanding includes frame-level temporal reasoning, meaning it can identify when specific events happen, track objects across time, and answer questions about the sequence of events in a video.",
      hints: [
        "\'Temporal\' relates to time ordering of events.",
        "Think about what it means to reason across multiple frames of a video.",
      ],
    },
    {
      id: "q-gem-kp-38",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When Gemini processes a 1-hour video with audio, which combination of information does it integrate for understanding?",
      options: [
        "Only the audio track, converted to text.",
        "Only key frames extracted by a human.",
        "Sampled video frames combined with the audio track, processed together.",
        "The video\'s metadata and filename only.",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini\'s video processing samples frames at a regular rate and processes them alongside the audio track. This allows it to correlate visual events with speech, sound effects, and music simultaneously.",
      hints: [
        "Both visual and auditory channels contribute to video understanding.",
        "Think about what information is available in a video file.",
      ],
    },
    {
      id: "q-gem-kp-39",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini 1.5 Pro can process a video of up to approximately one hour in length within its 1-million-token context window, given standard frame sampling rates.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "At approximately 1 frame per second, a 1-hour video generates around 3,600 frames. Each frame uses roughly 258 tokens, totaling about 928,800 tokens — fitting within the 1M token context window. This enables end-to-end reasoning over feature-length content.",
      hints: [
        "Calculate: 3,600 seconds × 258 tokens/frame ≈ 928,800 tokens.",
        "1 frame per second is a common sampling rate for Gemini video processing.",
      ],
    },
  ],
  "audio-processing": [
    {
      id: "q-gem-kp-40",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which audio tasks can Gemini natively perform without relying on a separate speech-to-text service?",
      options: [
        "Only music generation.",
        "Only MIDI note detection.",
        "Speech transcription, speaker identification, and sound event recognition.",
        "Only audio compression and encoding.",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini can directly process audio inputs to transcribe speech, identify different speakers, recognize sound events (like a dog barking or a door slamming), and understand tone — all without routing through a separate speech-to-text API.",
      hints: [
        "Gemini is natively multimodal, so it handles audio directly.",
        "Think about tasks a human listener can do that go beyond just transcribing words.",
      ],
    },
    {
      id: "q-gem-kp-41",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following best describes Gemini\'s advantage over a traditional ASR (Automatic Speech Recognition) pipeline when processing a podcast?",
      options: [
        "Gemini produces audio output directly.",
        "Gemini can understand context, tone, and meaning in addition to producing a transcript, enabling richer tasks like summarization or sentiment analysis.",
        "Gemini requires no input audio and works from the video title alone.",
        "Traditional ASR pipelines always produce better transcripts.",
      ],
      correctAnswer: 1,
      explanation:
        "Traditional ASR systems produce text transcripts but lose nuance like tone, hesitation, and emotional context. Gemini processes the raw audio and can reason about these subtleties directly, enabling downstream tasks beyond simple transcription.",
      hints: [
        "What information is lost when audio is converted purely to text?",
        "Gemini can answer questions like \'What is the speaker\'s emotional tone?\' directly.",
      ],
    },
    {
      id: "q-gem-kp-42",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini\'s native audio processing allows it to distinguish between multiple speakers in a conversation and attribute statements to specific individuals.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini supports speaker diarization as part of its native audio understanding. It can identify that different speakers are present and attribute dialogue segments to each speaker, going beyond simple transcription.",
      hints: [
        "\'Diarization\' is the technical term for assigning speech segments to individual speakers.",
        "Gemini processes audio holistically, not just as a word-by-word transcript.",
      ],
    },
  ],
  "document-understanding": [
    {
      id: "q-gem-kp-43",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When a PDF containing text, charts, and scanned images is sent to Gemini, what can it do with the document?",
      options: [
        "Only extract the raw text, ignoring images and charts.",
        "Refuse to process mixed-media documents.",
        "Read and reason over text, interpret charts, and extract information from embedded images.",
        "Convert the PDF to audio and listen to it.",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini\'s document understanding capabilities span all content types within a PDF, including text paragraphs, data charts, tables, and scanned/embedded images, enabling comprehensive document QA.",
      hints: [
        "Gemini is multimodal — it handles both text and visual content.",
        "A PDF page is essentially an image to a vision model.",
      ],
    },
    {
      id: "q-gem-kp-44",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following is a practical business use case for Gemini\'s PDF/document understanding capabilities?",
      options: [
        "Generating a video advertisement.",
        "Extracting structured data from invoices and contracts at scale.",
        "Training a new language model from scratch.",
        "Compressing audio files.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini can parse invoices, contracts, and financial reports — extracting key fields (dates, amounts, parties) into structured formats like JSON. This automates document processing workflows that previously required manual data entry.",
      hints: [
        "Think about documents businesses process repeatedly with structured information.",
        "Extraction into structured formats like JSON is a key enterprise workflow.",
      ],
    },
    {
      id: "q-gem-kp-45",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini can interpret data visualizations such as bar charts and scatter plots in a PDF and answer quantitative questions about the data they represent.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini\'s visual reasoning extends to data visualizations. It can read axis labels, approximate values from bars or points, identify trends, and answer questions like \'Which quarter had the highest revenue?\' from a chart image.",
      hints: [
        "Gemini processes PDF pages as images and applies visual reasoning.",
        "Charts are a visual encoding of data — can Gemini decode them?",
      ],
    },
  ],
  "structured-outputs": [
    {
      id: "q-gem-kp-46",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does \'structured output\' mean in the context of the Gemini API?",
      options: [
        "The model returns responses formatted as audio files.",
        "The model is constrained to return responses conforming to a predefined schema (e.g., JSON).",
        "The model sorts its answers alphabetically.",
        "The model returns Markdown formatted text.",
      ],
      correctAnswer: 1,
      explanation:
        "Structured output (also called controlled generation) forces Gemini to produce output that conforms exactly to a provided JSON Schema, ensuring predictable, machine-readable responses for downstream processing.",
      hints: [
        "Think about why an application might need a guaranteed format for the model\'s response.",
        "JSON Schema is used to define the expected structure.",
      ],
    },
    {
      id: "q-gem-kp-47",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When using the Gemini API\'s structured output feature, which configuration parameter is used to define the required response format?",
      options: [
        "`temperature`",
        "`response_schema`",
        "`max_output_tokens`",
        "`stop_sequences`",
      ],
      correctAnswer: 1,
      explanation:
        "The `response_schema` parameter in the Gemini API\'s generation configuration accepts a JSON Schema definition. Setting it ensures the model\'s output is constrained to that schema, enabling reliable structured data extraction.",
      hints: [
        "The parameter name hints at defining the expected \'schema\' of the \'response\'.",
        "You also need to set `response_mime_type` to `\'application/json\'`.",
      ],
    },
    {
      id: "q-gem-kp-48",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini\'s structured output feature uses constrained decoding to guarantee schema compliance, meaning it will never produce JSON that violates the provided schema.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Google\'s structured output implementation uses constrained decoding (also known as grammar-constrained generation), which mathematically restricts the token sampling process to only produce tokens that could form valid JSON according to the schema — guaranteeing compliance.",
      hints: [
        "\'Constrained decoding\' limits which tokens the model can sample at each step.",
        "This is stronger than just prompting the model to return JSON.",
      ],
    },
  ],
  "function-calling-gemini": [
    {
      id: "q-gem-kp-49",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of function calling in the Gemini API?",
      options: [
        "To allow Gemini to directly modify files on the user\'s computer.",
        "To enable Gemini to request real-world actions or data by specifying a function name and arguments the application should execute.",
        "To speed up Gemini\'s text generation.",
        "To replace system instructions.",
      ],
      correctAnswer: 1,
      explanation:
        "Function calling allows Gemini to identify when a task requires external action (like looking up weather, querying a database, or calling an API) and express that intent as a structured function call with arguments for the developer to execute.",
      hints: [
        "Gemini itself cannot run code — it only requests that the application does.",
        "Think of it as the model expressing \'I need you to call this function with these arguments\'.",
      ],
    },
    {
      id: "q-gem-kp-50",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the Gemini function calling flow, after the model returns a `FunctionCall` response, what must the developer do next?",
      options: [
        "Nothing — Gemini automatically executes the function.",
        "Execute the function locally and send the result back to Gemini as a `FunctionResponse`.",
        "Retrain the model with the new function.",
        "Generate a new API key.",
      ],
      correctAnswer: 1,
      explanation:
        "The developer is responsible for executing the function on their side, then packaging the result as a `FunctionResponse` and sending it back to Gemini in the next conversation turn, allowing the model to incorporate the result into its final answer.",
      hints: [
        "Gemini is stateless between turns — you must send back the function result.",
        "The model cannot access external systems directly; it acts as the orchestrator.",
      ],
    },
    {
      id: "q-gem-kp-51",
      type: "true-false",
      difficulty: "hard",
      question:
        "When using the `ANY` function calling mode in Gemini, the model is forced to always return at least one function call rather than a plain text response.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The function calling mode `ANY` (as opposed to `AUTO` or `NONE`) forces the model to always invoke one of the provided tools. This is useful when you want to guarantee structured data extraction rather than allowing the model to respond in free text.",
      hints: [
        "Think about what `ANY` vs `AUTO` means in terms of when tools are invoked.",
        "This is useful for guaranteed structured extraction pipelines.",
      ],
    },
  ],
  "streaming-api": [
    {
      id: "q-gem-kp-52",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is streaming generation important for user-facing chat applications built with Gemini?",
      options: [
        "It reduces the total number of tokens generated.",
        "It allows the application to display text as it is generated, significantly reducing perceived latency.",
        "It enables the model to access the internet in real time.",
        "It compresses the response into a smaller payload.",
      ],
      correctAnswer: 1,
      explanation:
        "Streaming lets applications show partial responses to users as they are generated token-by-token, instead of waiting for the full response. This dramatically improves the user experience by reducing the time to first visible output.",
      hints: [
        "Think about how ChatGPT displays text progressively as you watch it type.",
        "\'Perceived latency\' is the time the user waits before seeing any output.",
      ],
    },
    {
      id: "q-gem-kp-53",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which Gemini SDK method is used to receive a streaming response rather than a complete response?",
      options: [
        "`generateContent()`",
        "`generateContentStream()`",
        "`streamText()`",
        "`fetchChunks()`",
      ],
      correctAnswer: 1,
      explanation:
        "The `generateContentStream()` method returns an async iterable of response chunks, allowing the application to process and display each chunk as it arrives from the server.",
      hints: [
        "The method name is almost the same as the non-streaming version but with \'Stream\' appended.",
        "It returns an async iterable, not a single promise.",
      ],
    },
    {
      id: "q-gem-kp-54",
      type: "true-false",
      difficulty: "hard",
      question:
        "When using streaming with Gemini, safety ratings and finish reasons are only available after the stream has fully completed, not in intermediate chunks.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Intermediate chunks from `generateContentStream()` contain partial text but may not yet have final safety ratings or a definitive finish reason. These are typically only present in the final chunk or the aggregated response, as safety evaluation often requires the complete context.",
      hints: [
        "Safety evaluation may need the full generated text to assess harm.",
        "The final chunk or the `.response` promise aggregates metadata.",
      ],
    },
  ],
  "gemini-nano-ondevice": [
    {
      id: "q-gem-kp-55",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is a primary privacy advantage of using Gemini Nano on a device rather than sending data to a cloud API?",
      options: [
        "On-device models produce more creative responses.",
        "User data never leaves the device, ensuring privacy and enabling offline use.",
        "On-device models have larger context windows.",
        "On-device models are always more accurate.",
      ],
      correctAnswer: 1,
      explanation:
        "Running Gemini Nano on-device means sensitive user data (like messages, photos, or voice recordings) is processed locally and never transmitted to external servers, preserving user privacy and enabling functionality without an internet connection.",
      hints: [
        "What happens to data when it stays on the device?",
        "Think about scenarios where internet connectivity is unavailable or undesirable.",
      ],
    },
    {
      id: "q-gem-kp-56",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which Google product first integrated Gemini Nano for on-device AI features such as Smart Reply and Summarize?",
      options: ["Google Search", "Pixel 8 smartphones", "Google Sheets", "Chrome OS"],
      correctAnswer: 1,
      explanation:
        "Google\'s Pixel 8 series was the first device to ship with Gemini Nano built in, enabling on-device AI features like Smart Reply in Gboard and audio summarization in the Recorder app.",
      hints: [
        "This was a flagship Google hardware announcement in late 2023.",
        "Gemini Nano is designed for mobile hardware with constrained resources.",
      ],
    },
    {
      id: "q-gem-kp-57",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini Nano uses a technique called \'distillation\' from larger Gemini models to achieve competitive capability while fitting within mobile memory and compute budgets.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini Nano is distilled from larger Gemini models, meaning its training uses the larger model\'s outputs as soft labels (knowledge distillation). This transfers capabilities into a much smaller model that fits in mobile DRAM and runs efficiently on mobile NPUs.",
      hints: [
        "Knowledge distillation transfers knowledge from a large \'teacher\' to a small \'student\'.",
        "NPUs (Neural Processing Units) on phones are optimized for on-device inference.",
      ],
    },
  ],
  "code-generation-alphacode": [
    {
      id: "q-gem-kp-58",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is AlphaCode 2, and what is its relationship to Gemini?",
      options: [
        "AlphaCode 2 is a standalone model unrelated to Gemini.",
        "AlphaCode 2 is a code-generation system powered by Gemini Pro that achieved competitive performance on programming competitions.",
        "AlphaCode 2 is a dataset for training code models.",
        "AlphaCode 2 is Google\'s code editor IDE.",
      ],
      correctAnswer: 1,
      explanation:
        "AlphaCode 2 is built on top of Gemini Pro and uses a fine-tuning plus sampling approach to solve competitive programming problems. It ranked among the top 15% of competitors on Codeforces, a major improvement over the original AlphaCode.",
      hints: [
        "AlphaCode 2 was announced alongside Gemini in December 2023.",
        "Competitive programming benchmarks involve algorithmic problem solving.",
      ],
    },
    {
      id: "q-gem-kp-59",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In competitive programming benchmarks, what approach does AlphaCode 2 use to improve its solve rate beyond a single generation?",
      options: [
        "Human-in-the-loop code review.",
        "Generating a large number of candidate solutions and then using a filtering/scoring model to select the best one.",
        "Using symbolic AI theorem provers.",
        "Hard-coding known algorithm templates.",
      ],
      correctAnswer: 1,
      explanation:
        "AlphaCode 2 generates up to 1 million candidate solutions per problem and uses a separate scoring model to rank and select the most promising submissions. This large-scale sampling strategy is central to its state-of-the-art performance.",
      hints: [
        "Diversity of samples is key — more samples increase the probability of a correct solution.",
        "A separate scoring model acts as a filter to select the best candidate.",
      ],
    },
    {
      id: "q-gem-kp-60",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini models can generate, explain, and debug code across multiple programming languages, making them useful as an AI pair programmer.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini is trained on large code datasets spanning Python, JavaScript, TypeScript, Go, C++, Java, and more. It can write new code, explain existing code, suggest fixes for bugs, and generate unit tests — all core use cases for an AI pair programmer.",
      hints: [
        "Think about what a pair programmer does: writes, explains, reviews, and debugs.",
        "Gemini was trained on code from GitHub and other sources alongside natural language.",
      ],
    },
  ],
  "benchmark-comparisons": [
    {
      id: "q-gem-kp-61",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does the MMMU (Massive Multidisciplinary Multimodal Understanding) benchmark evaluate?",
      options: [
        "How fast a model can generate images.",
        "A model\'s ability to answer college-level questions that require understanding both text and images across many academic subjects.",
        "A model\'s performance on simple arithmetic.",
        "How many languages a model can translate.",
      ],
      correctAnswer: 1,
      explanation:
        "MMMU tests multimodal models on college-level questions spanning subjects like medicine, engineering, economics, and science — where both text reasoning and image understanding (diagrams, charts, photos) are required.",
      hints: [
        "\'Multidisciplinary\' covers many academic subjects.",
        "\'Multimodal\' indicates the benchmark requires understanding both text and images.",
      ],
    },
    {
      id: "q-gem-kp-62",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "On the MMMU multimodal benchmark at launch, how did Gemini Ultra compare to GPT-4V?",
      options: [
        "Gemini Ultra scored significantly lower than GPT-4V.",
        "Gemini Ultra and GPT-4V scored identically.",
        "Gemini Ultra outperformed GPT-4V, becoming the first model to surpass human-expert performance on this benchmark.",
        "Gemini Ultra was not evaluated on MMMU.",
      ],
      correctAnswer: 2,
      explanation:
        "At launch, Gemini Ultra achieved 90.04% on MMMU, surpassing GPT-4V and crossing the human-expert threshold of 89.8% for the first time on this benchmark, establishing it as the state-of-the-art multimodal model.",
      hints: [
        "89.8% was the estimated human-expert baseline on MMMU.",
        "Gemini Ultra is the most capable tier of the Gemini family.",
      ],
    },
    {
      id: "q-gem-kp-63",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini Ultra was the first model to achieve human-expert level performance on the MMLU (Massive Multitask Language Understanding) benchmark, scoring above 90%.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini Ultra scored 90.0% on MMLU using a \'chain-of-thought\' prompting approach, becoming the first model to exceed human-expert performance (89.8%) on this comprehensive text reasoning benchmark across 57 subjects.",
      hints: [
        "MMLU is a text-only benchmark covering 57 academic subjects.",
        "The human-expert threshold on MMLU is approximately 89.8%.",
      ],
    },
  ],
  "imagen-integration": [
    {
      id: "q-gem-kp-64",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When Gemini is used to generate images in Google products, which image generation model is typically integrated to produce the actual image output?",
      options: ["DALL-E 3", "Stable Diffusion", "Imagen", "Midjourney"],
      correctAnswer: 2,
      explanation:
        "Google\'s Imagen model family (Imagen 2, Imagen 3) handles image generation in the Gemini ecosystem. Gemini acts as an intelligent interface that understands the user\'s intent and routes image generation requests to Imagen.",
      hints: [
        "Imagen is Google\'s own text-to-image model family.",
        "Think about which company built both Gemini and the integrated image generator.",
      ],
    },
    {
      id: "q-gem-kp-65",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the Gemini API, which model endpoint is used to generate images via Imagen 3?",
      options: [
        "`gemini-pro-vision`",
        "`imagen-3.0-generate-*`",
        "`gemini-ultra-image`",
        "`text-to-image-v1`",
      ],
      correctAnswer: 1,
      explanation:
        "Images are generated through Imagen model endpoints (e.g., `imagen-3.0-generate-001`) available in the Gemini API ecosystem. The Gemini conversational models can trigger image generation as part of a multimodal workflow.",
      hints: [
        "The model name reflects the product family: Imagen.",
        "Look for the versioned endpoint pattern used by Google AI services.",
      ],
    },
    {
      id: "q-gem-kp-66",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini natively supports interleaved image generation within a conversation, meaning it can generate images as part of a multi-turn dialogue where prior context influences the generated image.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini 2.0 and later models support native image output, allowing the model to generate images inline within conversational responses. Earlier integrations used Imagen as a separate call, but native image generation enables context-aware image creation driven by the full conversation history.",
      hints: [
        "\'Interleaved\' means images can appear among text within the same response.",
        "Gemini 2.0 introduced native image generation as a first-class capability.",
      ],
    },
  ],
  "interleaved-training-data": [
    {
      id: "q-gem-kp-67",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does \'interleaved text and image training data\' mean in the context of training Gemini?",
      options: [
        "Training data where text and images are stored in separate files.",
        "Training data that mixes text and images together in the same sequence, mirroring how information appears on web pages, books, and documents.",
        "A technique where images are converted to text before training.",
        "Only training on datasets that have equal numbers of text and image examples.",
      ],
      correctAnswer: 1,
      explanation:
        "Interleaved training data presents text and images together in the same context, similar to a web page with embedded images or a textbook with figures and captions. This teaches the model to reason about text and images in relation to each other.",
      hints: [
        "Think about how a textbook chapter mixes diagrams with explanatory text.",
        "Web pages are a natural source of interleaved text+image content.",
      ],
    },
    {
      id: "q-gem-kp-68",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is training on interleaved text-and-image data particularly beneficial for tasks like scientific diagram understanding?",
      options: [
        "It allows the model to memorize all existing diagrams.",
        "The model learns to associate visual elements with their textual descriptions and explanations as they naturally co-occur, enabling it to interpret novel diagrams it has never seen.",
        "It makes the model faster to run at inference time.",
        "It eliminates the need for any text training data.",
      ],
      correctAnswer: 1,
      explanation:
        "By seeing diagrams alongside their explanatory text during training, the model learns how visual features (shapes, arrows, labels) correspond to scientific concepts. This generalizes to new diagrams at inference time rather than just memorizing training examples.",
      hints: [
        "Think about how a student learns to read a diagram: they see it alongside an explanation.",
        "Generalization comes from learning the relationship pattern, not memorization.",
      ],
    },
    {
      id: "q-gem-kp-69",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini\'s training on interleaved multimodal data includes web pages, scientific papers with figures, and video-subtitle pairs, enabling it to learn cross-modal associations at scale.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Google has described Gemini\'s training data as including a diverse mix of multimodal data sources: web documents with embedded images, scientific literature with figures, subtitled video content, and more. This variety of cross-modal co-occurrence at scale is what enables robust multimodal understanding.",
      hints: [
        "Scale and diversity of cross-modal data are both important for generalization.",
        "Scientific papers are a rich source of figures with captions and in-text references.",
      ],
    },
  ],
  "capability-tiers": [
    {
      id: "q-gem-kp-70",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Rank the Gemini model tiers from smallest/fastest to largest/most capable.",
      options: [
        "Ultra → Pro → Flash → Nano",
        "Nano → Flash → Pro → Ultra",
        "Pro → Nano → Ultra → Flash",
        "Flash → Nano → Ultra → Pro",
      ],
      correctAnswer: 1,
      explanation:
        "From smallest to largest: Gemini Nano (on-device) → Gemini Flash (lightweight cloud) → Gemini Pro (balanced cloud) → Gemini Ultra (most capable). Each tier trades off size/speed against capability.",
      hints: [
        "\'Nano\' implies tiny; \'Ultra\' implies maximum capability.",
        "Think about the physical meaning of each name.",
      ],
    },
    {
      id: "q-gem-kp-71",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For which use case would Gemini Ultra be the most appropriate choice over Gemini Pro?",
      options: [
        "Generating short autocomplete suggestions in a mobile keyboard.",
        "Answering simple FAQ chatbot queries on a website.",
        "Solving complex multi-step scientific research questions requiring expert-level reasoning.",
        "Transcribing a 30-second voice memo.",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini Ultra is specifically designed for tasks that require the highest level of reasoning, nuanced understanding, and accuracy — such as analyzing complex scientific problems. Lighter tasks are more cost-efficiently handled by Pro, Flash, or Nano.",
      hints: [
        "Match the model capability to the complexity of the task.",
        "Ultra is the most expensive tier — reserve it for tasks that genuinely need it.",
      ],
    },
    {
      id: "q-gem-kp-72",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini Flash was specifically optimized using techniques like distillation from larger Gemini models to achieve a much lower cost-per-token while retaining strong multimodal capabilities.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini Flash is a distilled, efficiency-optimized model derived from larger Gemini models. It achieves significantly lower latency and cost per million tokens compared to Gemini Pro, while retaining competitive performance on many multimodal tasks.",
      hints: [
        "Distillation compresses knowledge from a large model into a smaller, faster one.",
        "Flash is described as optimized for \'speed and cost-efficiency\'.",
      ],
    },
  ],
  "multimodal-reasoning": [
    {
      id: "q-gem-kp-73",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "If you send Gemini an image of a geometry problem (a triangle with labeled angles) and ask it to find the missing angle, what type of reasoning does it apply?",
      options: [
        "Pure text reasoning without looking at the image.",
        "Multimodal reasoning — interpreting the visual geometry and applying mathematical rules.",
        "Audio processing.",
        "Code execution only.",
      ],
      correctAnswer: 1,
      explanation:
        "This is a classic multimodal reasoning task: Gemini must visually parse the triangle\'s diagram, extract the labeled angle values, and apply the geometric rule (angles in a triangle sum to 180°) to compute the missing angle.",
      hints: [
        "The model must combine visual parsing with mathematical knowledge.",
        "This is the kind of problem found in MMMU science and math categories.",
      ],
    },
    {
      id: "q-gem-kp-74",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When Gemini analyzes a scientific diagram showing a chemical reaction pathway and answers questions about it, which capabilities must it combine?",
      options: [
        "Only text understanding of chemical names.",
        "Visual parsing of the diagram structure, chemical knowledge, and language understanding to formulate an answer.",
        "Real-time web search for the reaction.",
        "Audio transcription of a lecture.",
      ],
      correctAnswer: 1,
      explanation:
        "Analyzing a reaction pathway diagram requires recognizing visual symbols (arrows, molecules, labels), applying domain knowledge (chemistry), and then generating a coherent natural language explanation — a genuine cross-modal reasoning task.",
      hints: [
        "Diagrams encode information visually; the model must decode that encoding.",
        "Chemistry knowledge is required to interpret what the visual symbols mean.",
      ],
    },
    {
      id: "q-gem-kp-75",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini can solve multi-step math word problems presented as images (e.g., a photo of a handwritten problem) by performing OCR, parsing the problem, and then applying mathematical reasoning — all in a single pass.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini\'s natively integrated OCR and mathematical reasoning capabilities allow it to ingest a photo of a handwritten problem, extract the text, parse the mathematical structure, and solve it — without needing separate OCR and math solver pipelines.",
      hints: [
        "Think about what steps a human would take when given a photo of a math problem.",
        "Gemini\'s end-to-end multimodal nature eliminates the need for separate pipeline steps.",
      ],
    },
  ],
  "safety-responsible-ai": [
    {
      id: "q-gem-kp-76",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the following harm categories does the Gemini API\'s built-in safety system evaluate by default?",
      options: [
        "Only hate speech.",
        "Harassment, hate speech, sexually explicit content, and dangerous content.",
        "Only copyright violations.",
        "Only factual inaccuracies.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini\'s safety system evaluates prompts and responses against four core harm categories by default: HARASSMENT, HATE_SPEECH, SEXUALLY_EXPLICIT, and DANGEROUS_CONTENT. Developers can adjust the blocking threshold for each category.",
      hints: [
        "Think about the main categories of potentially harmful content for a general AI assistant.",
        "There are four named categories in the Gemini safety API.",
      ],
    },
    {
      id: "q-gem-kp-77",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does setting a safety category\'s threshold to `BLOCK_ONLY_HIGH` in the Gemini API mean?",
      options: [
        "The model will block all responses regardless of content.",
        "Only content that is very likely to be harmful (high probability) will be blocked; low and medium probability harmful content will pass through.",
        "The model will only generate high-quality responses.",
        "Safety filters are completely disabled.",
      ],
      correctAnswer: 1,
      explanation:
        "`BLOCK_ONLY_HIGH` configures the safety filter to only block content where the harm probability is assessed as HIGH. Content classified as LOW or MEDIUM probability of harm will be allowed. This setting is useful for applications that need to handle sensitive topics (e.g., medical or security research) without over-blocking.",
      hints: [
        "Lower thresholds block more content; higher thresholds block less.",
        "A threshold of BLOCK_ONLY_HIGH is more permissive than BLOCK_LOW_AND_ABOVE.",
      ],
    },
    {
      id: "q-gem-kp-78",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini\'s safety evaluation applies to both the input prompt and the generated output, meaning a prompt can be blocked before any content is generated if it violates safety policies.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini\'s safety system evaluates the incoming prompt (input) as well as the generated response (output). If the prompt itself is classified as highly harmful, the API can block the request entirely and return a `PROHIBITED_CONTENT` block reason without generating any output.",
      hints: [
        "Think about why it would be valuable to reject harmful prompts before generating anything.",
        "The API response includes `block_reason` when a request is blocked at the input level.",
      ],
    },
  ],
  "grounding-rag-long-context": [
    {
      id: "q-gem-kp-79",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does \'grounding\' mean in the context of the Gemini API?",
      options: [
        "Connecting the model to an electrical ground to prevent static.",
        "Anchoring the model\'s responses to verified external sources such as Google Search or a provided document corpus.",
        "Limiting the model to only answer questions about the ground.",
        "Fine-tuning the model on a specific domain.",
      ],
      correctAnswer: 1,
      explanation:
        "Grounding refers to connecting the model\'s responses to external, verifiable sources. Google Search grounding uses live web results; document grounding uses provided files. Both reduce hallucinations by anchoring answers to real data.",
      hints: [
        "Grounding is the opposite of the model generating from memory alone.",
        "The goal is to reduce hallucinations by tying answers to real sources.",
      ],
    },
    {
      id: "q-gem-kp-80",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When is the \'long context as RAG\' approach (stuffing the entire document corpus into the context window) more advantageous than traditional vector-search RAG?",
      options: [
        "When the corpus is larger than 10 million tokens.",
        "When queries require holistic reasoning across many documents simultaneously, and the corpus fits within the context window.",
        "When inference cost is not a consideration and accuracy on isolated chunk retrieval is sufficient.",
        "When the corpus is only a single paragraph.",
      ],
      correctAnswer: 1,
      explanation:
        "Long-context RAG excels when questions require synthesizing information from many parts of a corpus simultaneously (e.g., \'What are the common themes across all these reports?\'). Traditional vector RAG retrieves only the top-k chunks, which can miss globally distributed information.",
      hints: [
        "Traditional RAG retrieves the most \'locally\' relevant chunks — what does it miss?",
        "Think about questions that require synthesizing information from across an entire corpus.",
      ],
    },
    {
      id: "q-gem-kp-81",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini\'s context caching feature allows a large shared context (e.g., a 500-page PDF) to be processed once and reused across many subsequent requests, reducing both latency and token cost.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Context caching processes the large context document once, caches the key-value (KV) attention states server-side, and allows them to be reused across subsequent API calls. This avoids re-processing the same tokens on every request, cutting costs by only billing cached tokens at a lower rate.",
      hints: [
        "KV caching stores intermediate computation results to avoid redundant work.",
        "Cached tokens are typically billed at a fraction of the cost of new input tokens.",
      ],
    },
  ],
  "multimodal-embeddings": [
    {
      id: "q-gem-kp-82",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is a multimodal embedding?",
      options: [
        "A type of audio file format.",
        "A numerical vector representation of content (text, image, or audio) in a shared semantic space, enabling cross-modal similarity search.",
        "A compression algorithm for videos.",
        "A type of model architecture with multiple attention heads.",
      ],
      correctAnswer: 1,
      explanation:
        "A multimodal embedding maps different types of content — text, images, and audio — into the same high-dimensional vector space. This allows cross-modal similarity searches, such as finding images that match a text description or vice versa.",
      hints: [
        "Think about how CLIP enables text-to-image search using embeddings.",
        "A \'shared semantic space\' means similar concepts map to nearby vectors regardless of modality.",
      ],
    },
    {
      id: "q-gem-kp-83",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which Google embedding model in the Gemini ecosystem supports generating embeddings for both text and images in a shared vector space?",
      options: [
        "`text-embedding-004`",
        "`multimodalembedding@001`",
        "`gemini-pro-embeddings`",
        "`vision-encoder-v1`",
      ],
      correctAnswer: 1,
      explanation:
        "Google\'s `multimodalembedding@001` model (available on Vertex AI) generates embeddings for text and images in a shared semantic space, enabling cross-modal retrieval — for example, searching an image database using a text query.",
      hints: [
        "The model name itself indicates its multimodal nature.",
        "This model is available on Vertex AI specifically.",
      ],
    },
    {
      id: "q-gem-kp-84",
      type: "true-false",
      difficulty: "hard",
      question:
        "Multimodal embeddings from Gemini\'s ecosystem can be used to build an image retrieval system where a user types a text query and retrieves semantically matching images from a database.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "By embedding both the text query and the candidate images into the same vector space using `multimodalembedding@001`, cosine similarity search (e.g., via Vertex AI Vector Search or Qdrant) can retrieve images semantically matching the text query — enabling text-to-image retrieval.",
      hints: [
        "If text and image embeddings live in the same space, cosine similarity finds cross-modal matches.",
        "This is the core mechanism behind systems like Google Lens.",
      ],
    },
  ],
  "gemini-api-limits": [
    {
      id: "q-gem-kp-85",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the maximum file size that can be uploaded via the Gemini File API?",
      options: ["10 MB", "100 MB", "2 GB", "Unlimited"],
      correctAnswer: 2,
      explanation:
        "The Gemini File API supports uploading files up to 2 GB each. Files are temporarily stored for 48 hours and can be used in `generateContent` requests via their uploaded URI.",
      hints: [
        "The limit is in gigabytes, not megabytes.",
        "\'Temporarily\' is key — files expire after 48 hours.",
      ],
    },
    {
      id: "q-gem-kp-86",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How long are files uploaded via the Gemini File API retained before they are automatically deleted?",
      options: ["1 hour", "24 hours", "48 hours", "7 days"],
      correctAnswer: 2,
      explanation:
        "Files uploaded to the Gemini File API are retained for 48 hours. After that, they are automatically deleted from Google\'s servers. Developers must re-upload files if they need to use them after this window.",
      hints: [
        "The retention period is measured in hours, not days.",
        "Re-uploading is required if you need the file after the expiration period.",
      ],
    },
    {
      id: "q-gem-kp-87",
      type: "true-false",
      difficulty: "hard",
      question:
        "The Gemini API enforces per-minute rate limits (RPM and TPM) that are separate from daily quota limits, and exceeding either triggers a 429 error.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The Gemini API has both per-minute rate limits (Requests Per Minute and Tokens Per Minute) and daily quota limits. Exceeding either category results in HTTP 429 (Too Many Requests) errors. Developers should implement exponential backoff retry logic to handle these gracefully.",
      hints: [
        "429 is the HTTP status code for rate limiting.",
        "Both short-term (per-minute) and long-term (daily) limits exist independently.",
      ],
    },
  ],
  "gemini-model-versions": [
    {
      id: "q-gem-kp-88",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which Gemini model version introduced the 1-million-token context window as a key feature?",
      options: [
        "Gemini 1.0 Ultra",
        "Gemini 1.5 Pro",
        "Gemini Nano 2",
        "Gemini Flash 1.0",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini 1.5 Pro was the model that introduced the landmark 1-million-token context window, which was later expanded to 2 million tokens. This was a major architectural achievement based on Google\'s Mixture-of-Experts (MoE) design.",
      hints: [
        "The \'1.5\' version number is a strong hint.",
        "The 1M token context window was a major announcement in early 2024.",
      ],
    },
    {
      id: "q-gem-kp-89",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What underlying architectural technique is believed to enable Gemini 1.5 Pro\'s efficiency gains, allowing a large context window at reduced compute cost?",
      options: [
        "Recurrent neural networks (RNNs) with memory cells.",
        "Mixture-of-Experts (MoE), which activates only a subset of model parameters for each token.",
        "Fully connected layers with no attention mechanism.",
        "Byte-pair encoding with variable-length context.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini 1.5 Pro uses a Mixture-of-Experts (MoE) architecture, where only a fraction of the model\'s total parameters are activated for any given input token. This allows the model to have a large total parameter count for capability while keeping per-inference compute efficient enough to support very long contexts.",
      hints: [
        "MoE models route each token to a small subset of \'expert\' sub-networks.",
        "This architectural choice is key to balancing capability with inference efficiency.",
      ],
    },
    {
      id: "q-gem-kp-90",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini 2.0 introduced native image output as a first-class capability, meaning the model can generate both text and images interleaved in a single response without routing to a separate image generation API call.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini 2.0 expanded the model\'s output modalities to include native image generation. This allows a single API call to return a response containing both natural language text and generated images inline, enabling richer multimodal outputs without a separate Imagen API round-trip.",
      hints: [
        "Gemini 2.0 added output modalities beyond text for the first time.",
        "\'Native\' means it is built into the model, not a post-processing step.",
      ],
    },
  ],
  "gemini-grounding": [
    {
      id: "q-gem-kp-91",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When Google Search grounding is enabled in the Gemini API, what additional information does the API response include alongside the model's answer?",
      options: [
        "Raw HTML of every page visited during the search.",
        "Grounding metadata with source citations, URIs, and support scores for each claim.",
        "A ranked list of the top 100 search results.",
        "A confidence score between 0 and 1 for the entire response.",
      ],
      correctAnswer: 1,
      explanation:
        "With grounding enabled, the API returns `groundingMetadata` containing `groundingChunks` (source URIs and titles) and `groundingSupports` that map segments of the model\'s text to the specific source chunks that substantiate them.",
      hints: [
        "Look for a `groundingMetadata` field in the Gemini API response object.",
        "Each claim in the response can be traced back to a specific web source URI.",
      ],
    },
    {
      id: "q-gem-kp-92",
      type: "true-false",
      difficulty: "easy",
      question:
        "Enabling Google Search grounding in the Gemini API guarantees that every factual statement in the model's response is verified against a real-time web source and is therefore always accurate.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Grounding significantly reduces hallucinations by tethering answers to retrieved documents, but it does not guarantee perfect accuracy. The model can still misinterpret retrieved content, and the retrieved documents themselves may be wrong or outdated.",
      hints: [
        "Grounding retrieves real sources, but the model still interprets and summarizes them.",
        "No AI system provides absolute accuracy guarantees.",
      ],
    },
    {
      id: "q-gem-kp-93",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the Gemini API, which configuration approach enables Google Search grounding?",
      options: [
        "`search_grounding=True` in the top-level request body.",
        "Adding a `Tool` with a `google_search` entry to the `tools` list in `GenerateContentConfig`.",
        "`grounding_source='google'` inside the `SafetySettings` block.",
        "`enable_search=True` in the `SystemInstruction` object.",
      ],
      correctAnswer: 1,
      explanation:
        "Google Search grounding is enabled by adding a `Tool` with a `google_search` entry to the `tools` list in `GenerateContentConfig` (or the equivalent SDK builder). This tells the model it may call the Google Search tool to retrieve current information before generating its answer.",
      hints: [
        "Grounding is implemented as a special built-in tool, not a top-level flag.",
        "The SDK class is `GoogleSearch` inside a `Tool` wrapper.",
      ],
    },
  ],
  "gemini-long-context-applications": [
    {
      id: "q-gem-kp-94",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A developer wants to answer questions about a 400-page PDF using Gemini 1.5 Pro without pre-chunking the document. Which approach is most appropriate?",
      options: [
        "Extract text, split into 512-token chunks, embed each chunk separately, and run vector similarity search.",
        "Upload the entire PDF via the File API and include the file reference in the prompt alongside the question.",
        "Summarize each chapter first with a smaller model, then feed the summaries to Gemini Pro.",
        "This is not possible; Gemini models cannot process PDFs longer than 50 pages.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini 1.5 Pro\'s 1-million-token context window can accommodate very large documents. Uploading the PDF via the File API and passing it inline with the question leverages this capability directly, avoiding the complexity and information loss of manual chunking or multi-step summarization pipelines.",
      hints: [
        "Gemini 1.5 Pro\'s long context window is its defining capability.",
        "The File API allows passing large files directly as part of the prompt.",
      ],
    },
    {
      id: "q-gem-kp-95",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gemini 1.5 Pro can ingest and reason across multiple separate documents within a single API request by including all document file references together in one prompt.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Because Gemini 1.5 Pro\'s context window is large enough to hold several full-length documents simultaneously, a single prompt can reference multiple uploaded files. The model can then perform cross-document reasoning — comparing, contrasting, or synthesizing information — in one pass.",
      hints: [
        "A 1M-token context can hold roughly 700,000 words, equivalent to several books.",
        "Multiple file references can be included sequentially in the `contents` array.",
      ],
    },
    {
      id: "q-gem-kp-96",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When asking Gemini to summarize a 2-hour video, what is the primary mechanism that allows the model to handle temporal reasoning across the full video?",
      options: [
        "The model transcribes the audio track and processes only the text transcript.",
        "Keyframes are extracted at a fixed 1-fps rate and the rest of the video is discarded.",
        "The video is sampled into frames and the full sequence of frames is placed in the context window, allowing temporal reasoning over the entire video.",
        "The model splits the video into 5-minute segments, summarizes each independently, and then summarizes the summaries.",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini natively processes video by sampling it into frames (e.g., 1 fps) and placing the entire sequence into the context window. Because all frames are in context simultaneously, the model can reason about events that span the full video duration without losing inter-segment context.",
      hints: [
        "Frame sampling rate is configurable in the File API upload step.",
        "Long-context video understanding is a key advantage over segment-based pipelines.",
      ],
    },
  ],
  "gemini-structured-output": [
    {
      id: "q-gem-kp-97",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When using Gemini\'s JSON mode via the API, which configuration field is used to enforce a specific output schema?",
      options: [
        "`json_schema` inside `SafetySettings`.",
        "`response_schema` inside `GenerationConfig` combined with `response_mime_type='application/json'`.",
        "`output_format` inside the system instruction string.",
        "`schema_validation=True` in the top-level request.",
      ],
      correctAnswer: 1,
      explanation:
        "To activate constrained JSON output, set `response_mime_type='application/json'` and provide a `response_schema` (as a Pydantic model or JSON Schema dict) in `GenerationConfig`. Gemini will then constrain its decoding to produce only tokens that satisfy the schema.",
      hints: [
        "Both `response_mime_type` and `response_schema` must be set together.",
        "`GenerationConfig` is where output format constraints live.",
      ],
    },
    {
      id: "q-gem-kp-98",
      type: "true-false",
      difficulty: "easy",
      question:
        "When Gemini's structured output (JSON mode) is enabled with a schema, the model's decoding process is constrained so it cannot produce output that violates the schema's field types and required fields.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Constrained decoding (grammar-guided generation) works at the token level: at each step only tokens that remain valid given the schema are considered. This makes schema violations structurally impossible, unlike prompting the model to 'output JSON' without enforcement.",
      hints: [
        "Constrained decoding filters the token vocabulary at each step.",
        "This is enforced at the logits level, not just a soft instruction.",
      ],
    },
    {
      id: "q-gem-kp-99",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A developer defines a `response_schema` with a nested array of objects. Which statement best describes a known limitation of Gemini's constrained JSON mode?",
      options: [
        "Nested schemas are not supported; only flat key-value pairs are allowed.",
        "Cardinality constraints like `minItems` may not be perfectly enforced during constrained decoding, so programmatic validation is still recommended.",
        "Constrained decoding only works for schemas with fewer than 10 fields.",
        "The JSON output cannot be parsed by standard `json.loads()` and requires a special library.",
      ],
      correctAnswer: 1,
      explanation:
        "Nested schemas are supported, but cardinality constraints like `minItems`/`maxItems` can be tricky for constrained decoding. The token-level grammar enforces structural correctness (brackets, commas, types), but count enforcement may not be perfectly reliable. Developers should validate the output programmatically.",
      hints: [
        "Structural constraints (types, required fields) are easier to enforce than count constraints.",
        "Always validate parsed JSON against the schema on the client side.",
      ],
    },
  ],
  "gemini-embeddings": [
    {
      id: "q-gem-kp-100",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the default output dimension of the `text-embedding-004` model from Google, and what feature allows reducing it?",
      options: [
        "768 dimensions; no configurable parameters.",
        "3072 dimensions; temperature controls quality.",
        "768 dimensions by default; `output_dimensionality` can reduce it via Matryoshka representation learning.",
        "1536 dimensions; truncation is not supported.",
      ],
      correctAnswer: 2,
      explanation:
        "`text-embedding-004` produces 768-dimensional vectors by default. Using Matryoshka Representation Learning, you can specify a smaller `output_dimensionality` (e.g., 256) while retaining most of the semantic quality, which reduces storage and retrieval latency.",
      hints: [
        "Matryoshka embeddings allow truncating vectors without retraining.",
        "768 is the default; smaller values trade some quality for efficiency.",
      ],
    },
    {
      id: "q-gem-kp-101",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which `task_type` parameter values should be used when generating embeddings for documents versus queries in a semantic search system?",
      options: [
        "`RETRIEVAL_DOCUMENT` for documents; `RETRIEVAL_QUERY` for queries.",
        "`DOCUMENT_EMBEDDING` for documents; `QUERY_EMBEDDING` for queries.",
        "Both should use `SEMANTIC_SIMILARITY`.",
        "Task types do not exist in the Gemini embeddings API.",
      ],
      correctAnswer: 0,
      explanation:
        "The Gemini Embeddings API accepts a `task_type` to optimize the embedding for its intended use. `RETRIEVAL_DOCUMENT` is used when embedding corpus documents for indexing, and `RETRIEVAL_QUERY` is used for the search query at inference time. Using the correct task type improves retrieval relevance.",
      hints: [
        "Asymmetric retrieval: document-side and query-side embeddings are optimized differently.",
        "Other task types include `SEMANTIC_SIMILARITY`, `CLASSIFICATION`, and `CLUSTERING`.",
      ],
    },
    {
      id: "q-gem-kp-102",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini's multimodal embedding model can produce a shared embedding space where text and image representations are directly comparable by cosine similarity, enabling cross-modal retrieval such as finding images from a text query.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Google\'s multimodal embedding model (available via Vertex AI) projects text and images into a shared vector space. Because the embeddings are aligned, cosine similarity between a text embedding and an image embedding is meaningful, enabling text-to-image and image-to-text retrieval without a separate alignment step.",
      hints: [
        "Shared embedding space is the key property for cross-modal retrieval.",
        "This is analogous to OpenAI\'s CLIP model.",
      ],
    },
  ],
  "gemini-system-instructions": [
    {
      id: "q-gem-kp-103",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the Gemini API, where does the system instruction appear relative to the conversation turns?",
      options: [
        "It appears after the last user turn; the user can override it by repeating the instruction.",
        "It is injected before all conversation turns and is treated with higher authority than user messages.",
        "It appears between the first and second user turns.",
        "System instructions are merged with the first user message automatically.",
      ],
      correctAnswer: 1,
      explanation:
        "System instructions are placed at the start of the context, before any user or model turns. They carry higher architectural authority, meaning the model is fine-tuned to respect them. A normal user message cannot simply override a well-written system instruction.",
      hints: [
        "System instructions set the stage before the conversation begins.",
        "They are designed to resist casual override by user messages.",
      ],
    },
    {
      id: "q-gem-kp-104",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following is a best practice when writing system instructions to set a persona for a customer service bot?",
      options: [
        "Make the system instruction as short as possible (one word) to reduce token cost.",
        "Include a clear role definition, the scope of topics the bot should handle, the desired tone, and explicit instructions on what to do when out-of-scope questions arise.",
        "Embed the product's entire knowledge base directly in the system instruction.",
        "Use the system instruction only for authentication tokens, not behavioral guidance.",
      ],
      correctAnswer: 1,
      explanation:
        "Effective system instructions define role, scope, tone, and fallback behavior. This gives the model a complete behavioral contract. Embedding entire knowledge bases in the system instruction is impractical (token limits) and is better handled via RAG or context caching.",
      hints: [
        "A persona needs: who the bot is, what it handles, how it speaks, and what to do when stuck.",
        "Keep instructions focused; use RAG for large knowledge bases.",
      ],
    },
    {
      id: "q-gem-kp-105",
      type: "true-false",
      difficulty: "hard",
      question:
        "When using context caching in the Gemini API, a system instruction can be included in the cached prefix, so it does not need to be retransmitted on every API call and does not count against per-call token costs once cached.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Context caching allows developers to cache a prefix — which can include the system instruction, large documents, or few-shot examples — so that it is processed once and reused. Cached tokens are billed at a lower rate and the prefix is not retransmitted, reducing both latency and cost on repeated calls.",
      hints: [
        "Context caching is distinct from application-level caching.",
        "Cached prefixes are stored server-side and referenced by a cache ID.",
      ],
    },
  ],
  "gemini-safety-advanced": [
    {
      id: "q-gem-kp-106",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Gemini API exposes configurable thresholds for built-in safety filters. Which of the following is a valid harm category that can be configured?",
      options: [
        "HARM_CATEGORY_FINANCIAL_FRAUD",
        "HARM_CATEGORY_HATE_SPEECH",
        "HARM_CATEGORY_POLITICAL_OPINION",
        "HARM_CATEGORY_AMBIENT_NOISE",
      ],
      correctAnswer: 1,
      explanation:
        "The Gemini API defines harm categories including `HARM_CATEGORY_HATE_SPEECH`, `HARM_CATEGORY_HARASSMENT`, `HARM_CATEGORY_SEXUALLY_EXPLICIT`, and `HARM_CATEGORY_DANGEROUS_CONTENT`. Developers can set the blocking threshold for each category independently.",
      hints: [
        "The four main harm categories map to content safety domains.",
        "Category names all follow the `HARM_CATEGORY_*` prefix pattern.",
      ],
    },
    {
      id: "q-gem-kp-107",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the Gemini API safety settings, what does setting a category's threshold to `BLOCK_ONLY_HIGH` mean?",
      options: [
        "Only content rated HIGH probability of harm in that category will be blocked; LOW and MEDIUM rated content will be allowed.",
        "All content with any probability of harm will be blocked.",
        "The category is disabled entirely.",
        "Content will be blocked only if the user explicitly reports it.",
      ],
      correctAnswer: 0,
      explanation:
        "`BLOCK_ONLY_HIGH` means the filter blocks responses only when the model assigns a HIGH probability score to that harm category. LOW and MEDIUM probability content passes through. This is the most permissive threshold, useful for research or adult-verified platforms where strictness would degrade utility.",
      hints: [
        "Thresholds range from BLOCK_NONE to BLOCK_LOW_AND_ABOVE.",
        "`BLOCK_ONLY_HIGH` is the most permissive non-off threshold.",
      ],
    },
    {
      id: "q-gem-kp-108",
      type: "true-false",
      difficulty: "easy",
      question:
        "When a Gemini API response is blocked by a safety filter, the `finish_reason` field in the response candidate is set to `SAFETY` rather than `STOP`.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The Gemini API signals safety blocks via `finish_reason: SAFETY` in the candidate object. Developers should always check `finish_reason` before accessing the response text; attempting to read `text` from a SAFETY-blocked candidate raises an error in the official SDKs.",
      hints: [
        "Check `finish_reason` before reading `.text` on a candidate.",
        "`STOP` means normal completion; `SAFETY` means filtered.",
      ],
    },
  ],
  "gemini-flash-vs-pro": [
    {
      id: "q-gem-kp-109",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which Gemini model tier is recommended for high-volume, latency-sensitive applications such as real-time chat interfaces and document classification pipelines where cost per token is a primary concern?",
      options: [
        "Gemini Ultra",
        "Gemini Pro",
        "Gemini Flash",
        "Gemini Nano",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini Flash is explicitly designed for high-frequency, cost-sensitive use cases. Its smaller architecture delivers significantly lower latency and cost per token compared to Pro, while still maintaining strong multimodal capabilities for most production tasks.",
      hints: [
        "'Flash' implies speed and economy over raw power.",
        "For chatbots processing millions of messages, cost per token dominates.",
      ],
    },
    {
      id: "q-gem-kp-110",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A company has a pipeline with two stages: (1) classify whether an incoming document is relevant, and (2) perform deep legal analysis on relevant documents. Which model routing strategy minimizes cost while preserving quality?",
      options: [
        "Use Gemini Ultra for both stages to ensure maximum accuracy.",
        "Use Gemini Flash for stage 1 (classification) and Gemini Pro for stage 2 (deep analysis).",
        "Use Gemini Nano for both stages to minimize cost.",
        "Use a single Gemini Pro call that does both classification and analysis together.",
      ],
      correctAnswer: 1,
      explanation:
        "Task routing — using a cheap fast model for triage and a more capable model only for tasks that need it — is a best practice for cost optimization. Classification is a simpler task well-suited to Flash; deep legal reasoning benefits from Pro\'s stronger capabilities.",
      hints: [
        "Not every task needs the most powerful model.",
        "Task routing is a common production cost optimization pattern.",
      ],
    },
    {
      id: "q-gem-kp-111",
      type: "true-false",
      difficulty: "hard",
      question:
        "Gemini 1.5 Flash supports the same maximum context window length as Gemini 1.5 Pro (up to 1 million input tokens).",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Both Gemini 1.5 Flash and Gemini 1.5 Pro share the same 1-million-token context window. Flash achieves its speed and cost advantages through architectural efficiency (smaller model, optimized serving), not by reducing the context length. This allows Flash to be used for long-document tasks at lower cost.",
      hints: [
        "Context window size is a property of the model generation, not just the tier.",
        "Flash\'s efficiency comes from model size and serving optimization, not shorter context.",
      ],
    },
  ],
  "gemini-tool-use": [
    {
      id: "q-gem-kp-112",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Gemini's function calling flow, after the model returns a `FunctionCall` part in its response, what is the developer's responsibility before making the next API call?",
      options: [
        "The developer must update the model weights with the function result.",
        "The developer must execute the function locally and return the result back to the model in a new `FunctionResponse` turn.",
        "The developer must restart the conversation from the beginning.",
        "The function is executed automatically by the API; no developer action is needed.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini does not execute functions itself — it only proposes the call. The developer\'s code runs the actual function (e.g., calling an external API or database), then appends the result as a `FunctionResponse` in the conversation history and calls the API again so the model can incorporate the result into its final response.",
      hints: [
        "The model returns a structured call specification; your code does the actual work.",
        "The result goes back to the model as a `FunctionResponse` content part.",
      ],
    },
    {
      id: "q-gem-kp-113",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When Gemini returns multiple `FunctionCall` parts in a single response turn, what does this indicate and how should the developer handle it?",
      options: [
        "It is an error condition; the API should never return more than one function call per turn.",
        "The model determined that multiple function calls can be made in parallel; the developer should execute all concurrently and return all results as separate `FunctionResponse` parts in one turn.",
        "The model is unsure which function to call and the developer should pick one.",
        "The developer should execute the calls sequentially, waiting for each result before starting the next.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini supports parallel function calling, where it determines multiple independent tool calls can be made simultaneously. Developers should execute all proposed calls in parallel, then return all `FunctionResponse` parts in a single turn. This dramatically reduces latency in agentic workflows that need multiple data sources.",
      hints: [
        "Parallel function calls appear as multiple `FunctionCall` parts in one response.",
        "Return all results together in one turn rather than sequentially.",
      ],
    },
    {
      id: "q-gem-kp-114",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Gemini's function calling API, the `parameters` field of a function declaration must be described using JSON Schema syntax to define the argument types and descriptions.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gemini function declarations use JSON Schema to describe parameters. Each parameter has a `type` (string, number, boolean, array, object), a `description`, and optionally `enum` values or `required` lists. This schema is how the model learns to construct valid function call arguments.",
      hints: [
        "JSON Schema is the standard format; types include string, number, object, array.",
        "The `description` of each parameter is critical for the model to understand when to use it.",
      ],
    },
  ],
  "gemini-fine-tuning": [
    {
      id: "q-gem-kp-115",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the required data format for supervised fine-tuning a Gemini model via Vertex AI Generative AI Studio?",
      options: [
        "A CSV file with columns `input` and `output`.",
        "A JSONL file where each line contains an `input_text` and `output_text` field, or a structured messages array.",
        "A TFRecord binary dataset.",
        "A plain text file with input/output pairs separated by `---`.",
      ],
      correctAnswer: 1,
      explanation:
        "Vertex AI fine-tuning for Gemini uses JSONL (JSON Lines) format. For text completion tasks, each record has `input_text` and `output_text`; for chat fine-tuning, each record has a `messages` array. The dataset is uploaded to Google Cloud Storage before starting a tuning job.",
      hints: [
        "JSONL means one JSON object per line.",
        "Data is uploaded to GCS first, then referenced by the tuning job.",
      ],
    },
    {
      id: "q-gem-kp-116",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does Gemini supervised fine-tuning (SFT) on Vertex AI differ from full parameter fine-tuning?",
      options: [
        "Vertex AI SFT updates all model parameters using standard gradient descent on the provided dataset.",
        "Vertex AI SFT uses parameter-efficient fine-tuning (PEFT) techniques such as LoRA adapters, updating only a small fraction of parameters while keeping the base model frozen.",
        "Vertex AI SFT only fine-tunes the tokenizer vocabulary, not the model weights.",
        "Vertex AI SFT is identical to prompt engineering and does not update any weights.",
      ],
      correctAnswer: 1,
      explanation:
        "Google\'s managed fine-tuning service uses parameter-efficient methods (including LoRA-style adapters) rather than full fine-tuning. This makes tuning faster and cheaper, and the resulting adapter is merged or served alongside the frozen base model. Full parameter fine-tuning of Gemini is not available to external customers.",
      hints: [
        "PEFT (Parameter-Efficient Fine-Tuning) only updates a small set of adapter parameters.",
        "LoRA is a common PEFT technique that adds low-rank matrices to attention layers.",
      ],
    },
    {
      id: "q-gem-kp-117",
      type: "true-false",
      difficulty: "easy",
      question:
        "After fine-tuning a Gemini model on Vertex AI, evaluation can be performed by comparing the tuned model's outputs on a held-out evaluation dataset against the base model.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Vertex AI provides an evaluation framework that computes metrics such as exact match, BLEU, or ROUGE on a held-out evaluation split. This allows developers to quantify whether fine-tuning improved task-specific performance before deploying the tuned model to production.",
      hints: [
        "Always evaluate on held-out data, not the training set.",
        "Vertex AI supports both automatic metrics and human evaluation workflows.",
      ],
    },
  ],
  "gemini-vs-competitors": [
    {
      id: "q-gem-kp-118",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In published benchmark comparisons (as of the Gemini 1.5 and 2.0 era), which modality is widely considered a primary competitive differentiator of the Gemini family over GPT-4o?",
      options: [
        "Text-only reasoning benchmarks like GSM8K.",
        "Long-context understanding, particularly the ability to process 1M+ token contexts natively.",
        "Image generation quality.",
        "Text-to-speech voice naturalness.",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini 1.5 Pro\'s 1-million-token (and later 2-million-token) native context window is a clear architectural differentiator. GPT-4o\'s context window was 128K tokens at launch. Gemini\'s long-context capability enables use cases like full-codebase analysis, multi-document legal review, and full-movie analysis that are impractical with shorter-context models.",
      hints: [
        "The 1M token context is Google\'s flagship benchmark differentiator.",
        "Compare context window sizes: 128K vs 1M tokens.",
      ],
    },
    {
      id: "q-gem-kp-119",
      type: "true-false",
      difficulty: "hard",
      question:
        "On MMLU (Massive Multitask Language Understanding), Gemini Ultra was the first publicly reported model to surpass human expert-level performance (~89.8%) at the time of its announcement in December 2023.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Google reported that Gemini Ultra achieved 90.0% on MMLU using a 5-shot chain-of-thought prompting strategy, making it the first model to surpass the human expert threshold of ~89.8% on that benchmark at the time of the Gemini 1.0 announcement in December 2023.",
      hints: [
        "MMLU covers 57 academic subjects; human expert level is ~89.8%.",
        "This claim was made in the original Gemini technical report.",
      ],
    },
    {
      id: "q-gem-kp-120",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When comparing Gemini and Claude (Anthropic) models, which characteristic most clearly distinguishes the two families?",
      options: [
        "Only Gemini supports function calling; Claude does not.",
        "Claude models do not support multimodal inputs.",
        "Gemini is natively integrated with Google Search grounding and the broader Google ecosystem, while Claude\'s Constitutional AI training approach prioritizes a different safety and helpfulness methodology.",
        "Claude models have a larger context window than any Gemini model.",
      ],
      correctAnswer: 2,
      explanation:
        "Gemini\'s deep integration with Google Search (grounding), Google Workspace, and Vertex AI is a product-level differentiator. Claude uses Constitutional AI (CAI) for alignment — a distinct approach from Google\'s RLHF-based methods. Both support function calling and multimodal inputs.",
      hints: [
        "Think about ecosystem integration as a differentiator, not just model capabilities.",
        "Constitutional AI is Anthropic\'s distinctive alignment methodology.",
      ],
    },
  ],
});
