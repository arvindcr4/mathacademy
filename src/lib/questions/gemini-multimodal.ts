import { registerQuestions } from './index'

registerQuestions({
  'gemini-nano': [
    {
      id: 'q-gem-kp-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which of the following best describes the primary use case for Gemini Nano?',
      options: [
        'Deploying large-scale reasoning tasks on cloud infrastructure.',
        'On-device execution for mobile and edge applications with memory and power constraints.',
        'High-throughput video generation and editing.',
        'Training massive multimodal foundation models from scratch.'
      ],
      correctAnswer: 'On-device execution for mobile and edge applications with memory and power constraints.',
      explanation: 'Gemini Nano is highly optimized for edge devices (like smartphones), allowing on-device AI capabilities that ensure privacy, work offline, and have low latency.'
    }
  ],
  'gemini-flash': [
    {
      id: 'q-gem-kp-2',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the main design goal of the Gemini Flash model tier?',
      options: [
        'Maximum accuracy and reasoning capabilities for complex mathematical proofs.',
        'High-frequency trading and low-level system design.',
        'Speed and cost-efficiency for high-volume, lightweight multimodal tasks.',
        'Generating photorealistic 3D environments.'
      ],
      correctAnswer: 'Speed and cost-efficiency for high-volume, lightweight multimodal tasks.',
      explanation: 'Gemini Flash is designed to be a lightweight, fast, and cost-effective model, optimizing inference speed while retaining strong multimodal capabilities.'
    }
  ],
  'gemini-pro': [
    {
      id: 'q-gem-kp-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Gemini Pro is generally considered the best choice for which of the following scenarios?',
      options: [
        'Offline processing on a smartwatch.',
        'General-purpose enterprise applications requiring a balance of strong reasoning, performance, and multimodality.',
        'Only generating audio from textual descriptions.',
        'Operating exclusively without an internet connection on IoT devices.'
      ],
      correctAnswer: 'General-purpose enterprise applications requiring a balance of strong reasoning, performance, and multimodality.',
      explanation: 'Gemini Pro is the versatile, workhorse model of the Gemini family, offering a great balance of advanced reasoning, multimodal processing, and efficiency for most enterprise use cases.'
    }
  ],
  'gemini-ultra': [
    {
      id: 'q-gem-kp-4',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which of the following capabilities distinguishes Gemini Ultra from the Pro and Nano tiers?',
      options: [
        'It is the only model that can run locally on an Android phone.',
        'State-of-the-art performance on highly complex tasks like coding, logical reasoning, and nuanced multimodal understanding.',
        'It processes only text data to maximize processing speed.',
        'It is completely open-source and free for all commercial use.'
      ],
      correctAnswer: 'State-of-the-art performance on highly complex tasks like coding, logical reasoning, and nuanced multimodal understanding.',
      explanation: 'Gemini Ultra is the most capable model in the family, designed specifically for highly complex, compute-intensive tasks that require deep reasoning and state-of-the-art multimodal understanding.'
    }
  ],
  'native-multimodality': [
    {
      id: 'q-gem-kp-5',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Unlike early multimodal models that stitched together separate text and vision models, Gemini was trained natively on interleaved multimodal data from the beginning.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Gemini is natively multimodal, meaning it was trained from scratch on text, images, audio, and video simultaneously, allowing it to seamlessly understand and reason across different modalities without relying on intermediary models.'
    }
  ],
  'system-instructions': [
    {
      id: 'q-gem-kp-6',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'When using the Gemini API, what is the primary purpose of providing "System Instructions"?',
      options: [
        'To bypass rate limits on the API.',
        'To define the overall persona, tone, and behavioral rules the model should follow throughout a conversation.',
        'To directly modify the model weights.',
        'To provide the user’s immediate question.'
      ],
      correctAnswer: 'To define the overall persona, tone, and behavioral rules the model should follow throughout a conversation.',
      explanation: 'System instructions allow developers to steer the behavior of the model, setting its persona, tone, and guidelines before it processes specific user prompts.'
    }
  ],
  'multimodal-prompting': [
    {
      id: 'q-gem-kp-7',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which prompting technique takes full advantage of Gemini’s native multimodality?',
      options: [
        'Providing only textual descriptions of images.',
        'Interleaving text, images, and video in the prompt sequentially to provide rich context.',
        'Using exclusively system instructions without user prompts.',
        'Converting all images to base64 strings but ignoring text.'
      ],
      correctAnswer: 'Interleaving text, images, and video in the prompt sequentially to provide rich context.',
      explanation: 'Because Gemini is natively multimodal, interleaved prompting—where text, images, and other media are mixed together naturally—provides the most effective context for the model to reason about.'
    }
  ],
  'few-shot-gemini': [
    {
      id: 'q-gem-kp-8',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Few-shot prompting with Gemini only works for text and cannot include multimodal examples.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Few-shot prompting with Gemini is fully multimodal. You can provide examples that include both images and text to demonstrate the desired output format.'
    }
  ],
  'context-caching': [
    {
      id: 'q-gem-kp-9',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the primary benefit of using Context Caching in the Gemini API?',
      options: [
        'It permanently stores user data for model fine-tuning.',
        'It reduces latency and costs when repeatedly sending large amounts of context (like a long document or video) in multiple requests.',
        'It allows the model to access real-time internet search results.',
        'It caches the model outputs to serve identical responses to different users instantly.'
      ],
      correctAnswer: 'It reduces latency and costs when repeatedly sending large amounts of context (like a long document or video) in multiple requests.',
      explanation: 'Context Caching allows you to pass a large context window once, cache it, and reference it in subsequent requests. This significantly reduces both latency and token costs for repetitive tasks on the same large document or video.'
    }
  ],
  'json-schema-gemini': [
    {
      id: 'q-gem-kp-10',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How can you guarantee that Gemini returns its response in a strictly formatted JSON structure?',
      options: [
        'By just asking nicely in the prompt.',
        'By providing a JSON Schema object in the `response_schema` parameter of the API configuration.',
        'By setting `temperature` to 1.0.',
        'By using the `stream` parameter.'
      ],
      correctAnswer: 'By providing a JSON Schema object in the `response_schema` parameter of the API configuration.',
      explanation: 'The Gemini API supports structured outputs by allowing developers to pass a strict JSON Schema via the `response_schema` configuration, ensuring the model output conforms exactly to the defined structure.'
    }
  ],
  'gemini-api-auth': [
    {
      id: 'q-gem-kp-11',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which of the following is the standard way to authenticate requests to the Gemini API (Google AI Studio)?',
      options: [
        'OAuth 2.0 user login only.',
        'Providing an API key generated from Google AI Studio via an x-goog-api-key header or SDK configuration.',
        'Using an AWS IAM role.',
        'No authentication is required for Gemini Pro.'
      ],
      correctAnswer: 'Providing an API key generated from Google AI Studio via an x-goog-api-key header or SDK configuration.',
      explanation: 'The primary authentication method for the Google AI Studio Gemini API is an API key, which is passed in the SDK client initialization or via HTTP headers.'
    }
  ],
  'generate-content': [
    {
      id: 'q-gem-kp-12',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In the official Gemini SDKs, which method is typically used to send a prompt and receive a complete response?',
      options: [
        'predict()',
        'generateContent()',
        'completeText()',
        'chat()'
      ],
      correctAnswer: 'generateContent()',
      explanation: 'The `generateContent` method (or its language-specific equivalent) is the core method in the Gemini API used for standard text, multimodal, and chat generation requests.'
    }
  ],
  'streaming-responses': [
    {
      id: 'q-gem-kp-13',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The Gemini API supports streaming, allowing applications to display the generated text to the user as it is being produced.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Yes, the `generateContentStream` method returns chunks of the response as soon as they are generated, which is crucial for reducing perceived latency in chat applications.'
    }
  ],
  'token-counting': [
    {
      id: 'q-gem-kp-14',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When counting tokens for a multimodal prompt in Gemini, how are images typically accounted for?',
      options: [
        'Images cost zero tokens.',
        'Images are converted to base64 text, and every character counts as a token.',
        'Images are processed by a vision encoder and consume a fixed, predetermined number of tokens (e.g., 258 tokens per image).',
        'Images are billed by megabyte, not by tokens.'
      ],
      correctAnswer: 'Images are processed by a vision encoder and consume a fixed, predetermined number of tokens (e.g., 258 tokens per image).',
      explanation: 'In the Gemini API, an image is encoded into a specific number of tokens (typically 258 tokens for standard images) regardless of its pixel dimensions, making token estimation predictable.'
    }
  ],
  'safety-settings': [
    {
      id: 'q-gem-kp-15',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which of the following best describes how safety settings work in the Gemini API?',
      options: [
        'Safety settings cannot be changed by the developer.',
        'Developers can configure thresholds (e.g., BLOCK_ONLY_HIGH) for various categories like Harassment, Hate Speech, and Dangerous Content.',
        'Safety settings only apply to image generation, not text.',
        'Safety settings are determined solely by the system prompt.'
      ],
      correctAnswer: 'Developers can configure thresholds (e.g., BLOCK_ONLY_HIGH) for various categories like Harassment, Hate Speech, and Dangerous Content.',
      explanation: 'The Gemini API provides granular safety settings, allowing developers to adjust blocking thresholds across different harm categories depending on their application’s use case.'
    }
  ],
  'image-understanding': [
    {
      id: 'q-gem-kp-16',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Gemini’s image understanding capabilities allow it to perform which of the following tasks?',
      options: [
        'Visual Question Answering (VQA).',
        'Extracting text from images (OCR).',
        'Describing the contents of a photograph.',
        'All of the above.'
      ],
      correctAnswer: 'All of the above.',
      explanation: 'Gemini is highly capable at VQA, OCR, and rich image captioning due to its native multimodal architecture.'
    }
  ],
  'video-processing': [
    {
      id: 'q-gem-kp-17',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'How does Gemini process video inputs?',
      options: [
        'It watches the video in real-time as an MP4 stream.',
        'It samples frames from the video at a specific frame rate and processes them sequentially along with the audio track.',
        'It only processes the first frame of the video.',
        'It converts the video into an animated GIF before processing.'
      ],
      correctAnswer: 'It samples frames from the video at a specific frame rate and processes them sequentially along with the audio track.',
      explanation: 'Gemini processes video by sampling it as a sequence of image frames (e.g., 1 frame per second) and analyzing them in order, combined with the transcribed audio.'
    }
  ],
  'audio-transcription': [
    {
      id: 'q-gem-kp-18',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'When processing audio files with Gemini, what advantage does it have over traditional Speech-to-Text pipelines?',
      options: [
        'It only works with English audio.',
        'It relies entirely on an external Whisper model.',
        'It can directly reason over the audio (e.g., understanding tone, identifying speakers, summarizing) without needing an intermediate text transcript.',
        'It requires audio to be converted to MIDI format.'
      ],
      correctAnswer: 'It can directly reason over the audio (e.g., understanding tone, identifying speakers, summarizing) without needing an intermediate text transcript.',
      explanation: 'Because Gemini is natively multimodal, it processes audio directly. This means it can capture nuances like tone, emotion, and overlapping voices that are often lost in standard text transcripts.'
    }
  ],
  'file-api': [
    {
      id: 'q-gem-kp-19',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the purpose of the Gemini File API?',
      options: [
        'To format the hard drive of the host machine.',
        'To permanently host a website\'s static assets.',
        'To temporarily upload large files (like videos, large PDFs, or audio) to Google’s servers so they can be referenced in API prompts.',
        'To download training weights of the Gemini models.'
      ],
      correctAnswer: 'To temporarily upload large files (like videos, large PDFs, or audio) to Google’s servers so they can be referenced in API prompts.',
      explanation: 'The File API allows developers to upload large files (up to 2GB per file) for temporary storage (usually 48 hours), returning a URI that can be used in `generateContent` requests without hitting payload size limits.'
    }
  ],
  'document-qa': [
    {
      id: 'q-gem-kp-20',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Gemini can process large PDF documents and answer questions based directly on the text and charts contained within the document.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Gemini has strong document understanding capabilities, including the ability to parse long PDFs, extract information, and reason over embedded tables and charts.'
    }
  ],
  'tool-declarations': [
    {
      id: 'q-gem-kp-21',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How do you define a tool (function) for the Gemini API?',
      options: [
        'By providing an OpenAPI Swagger file in YAML format.',
        'By writing a JavaScript function inside the prompt string.',
        'By passing an array of `FunctionDeclaration` objects detailing the function name, description, and parameter schema.',
        'By executing the function locally before calling Gemini.'
      ],
      correctAnswer: 'By passing an array of `FunctionDeclaration` objects detailing the function name, description, and parameter schema.',
      explanation: 'Tools are defined by passing `FunctionDeclaration` objects (which use OpenAPI JSON schema syntax) to the model. The model uses these descriptions to determine if and how to call the function.'
    }
  ],
  'function-execution': [
    {
      id: 'q-gem-kp-22',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When Gemini decides to call a function, what is the responsibility of the developer?',
      options: [
        'Wait for Gemini to execute the function on Google’s servers.',
        'Execute the function locally using the arguments provided by Gemini, and then send the result back to Gemini in a new prompt.',
        'Restart the API request.',
        'Generate an API key for the function.'
      ],
      correctAnswer: 'Execute the function locally using the arguments provided by Gemini, and then send the result back to Gemini in a new prompt.',
      explanation: 'Gemini does not execute custom functions. It only generates the function name and arguments. The developer must intercept this, run the code locally, and return the `functionResponse` back to the model.'
    }
  ],
  'parallel-function-calling': [
    {
      id: 'q-gem-kp-23',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Gemini models support parallel function calling, allowing the model to return multiple function calls in a single response.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Gemini can recognize when multiple independent function calls are needed (e.g., getting the weather for three different cities) and return them simultaneously, saving round-trip latency.'
    }
  ],
  'google-search-grounding': [
    {
      id: 'q-gem-kp-24',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the primary benefit of enabling the Google Search grounding tool in Gemini?',
      options: [
        'It makes the model run faster.',
        'It allows the model to augment its training data with real-time, up-to-date information from the web to reduce hallucinations.',
        'It automatically publishes the model’s answers to a public web page.',
        'It bypasses token limits.'
      ],
      correctAnswer: 'It allows the model to augment its training data with real-time, up-to-date information from the web to reduce hallucinations.',
      explanation: 'Grounding with Google Search connects the model to the live internet, significantly reducing hallucinations and allowing it to answer queries about recent events.'
    }
  ],
  'code-execution': [
    {
      id: 'q-gem-kp-25',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Gemini API offers a Code Execution tool. What does this tool do?',
      options: [
        'It runs user-provided code on their local machine.',
        'It allows Gemini to write and execute Python code in a secure sandbox on Google’s servers to solve complex math or logic problems.',
        'It compiles C++ code into an executable binary.',
        'It debugs syntax errors in the developer’s application.'
      ],
      correctAnswer: 'It allows Gemini to write and execute Python code in a secure sandbox on Google’s servers to solve complex math or logic problems.',
      explanation: 'The Code Execution tool enables the model to autonomously write and execute Python code in a secure Google sandbox, which is incredibly useful for math, data analysis, and deterministic logic tasks.'
    }
  ],
  'gemini-agents': [
    {
      id: 'q-gem-kp-26',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'When building an autonomous agent with Gemini, what is the typical architecture loop?',
      options: [
        'Think -> Act -> Observe (ReAct) loop utilizing tool calling.',
        'A single zero-shot prompt with no tools.',
        'Hardcoding a finite state machine.',
        'Training a new model from scratch for every task.'
      ],
      correctAnswer: 'Think -> Act -> Observe (ReAct) loop utilizing tool calling.',
      explanation: 'Agentic workflows typically rely on the ReAct (Reasoning and Acting) paradigm, where the model iteratively thinks about the problem, calls tools (acts), observes the result, and decides the next step.'
    }
  ],
  'rag-with-gemini': [
    {
      id: 'q-gem-kp-27',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In a RAG (Retrieval-Augmented Generation) system powered by Gemini, how does the model handle long contexts up to 2 million tokens?',
      options: [
        'It doesn’t; it requires strict chunking to 4096 tokens.',
        'It relies solely on Google Search.',
        'It can ingest massive entire document repositories directly in the prompt, sometimes reducing the need for complex vector chunking.',
        'It ignores any tokens past the first 100k.'
      ],
      correctAnswer: 'It can ingest massive entire document repositories directly in the prompt, sometimes reducing the need for complex vector chunking.',
      explanation: 'Gemini 1.5 Pro features a massive 2-million token context window, which allows developers to often bypass complex traditional RAG (chunking/vector databases) and just place entire codebases or document libraries directly into the prompt.'
    }
  ],
  'model-tuning': [
    {
      id: 'q-gem-kp-28',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which tuning method is typically supported in Google AI Studio to customize Gemini’s behavior with structured examples?',
      options: [
        'Full parameters pre-training.',
        'RLHF (Reinforcement Learning from Human Feedback).',
        'Parameter-Efficient Fine-Tuning (PEFT) / Supervised Fine-Tuning.',
        'Distillation distillation.'
      ],
      correctAnswer: 'Parameter-Efficient Fine-Tuning (PEFT) / Supervised Fine-Tuning.',
      explanation: 'Google AI Studio allows developers to perform Supervised Fine-Tuning (often using parameter-efficient methods under the hood) by providing a dataset of input-output examples to adapt the model to a specific tone or task.'
    }
  ],
  'evaluating-gemini': [
    {
      id: 'q-gem-kp-29',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When evaluating the output of an LLM like Gemini, what is the "LLM-as-a-Judge" technique?',
      options: [
        'Using a human panel to grade responses.',
        'Using a strong model (like Gemini 1.5 Pro) to score and evaluate the outputs of another model (or itself) against a rubric.',
        'Calculating the BLEU score.',
        'Running unit tests.'
      ],
      correctAnswer: 'Using a strong model (like Gemini 1.5 Pro) to score and evaluate the outputs of another model (or itself) against a rubric.',
      explanation: 'LLM-as-a-Judge involves using a highly capable foundation model to automatically evaluate the quality, relevance, or factual accuracy of text generated by an AI pipeline, scaling the evaluation process.'
    }
  ],
  'vertex-vs-aistudio': [
    {
      id: 'q-gem-kp-30',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the primary difference between Google AI Studio and Vertex AI when accessing Gemini?',
      options: [
        'AI Studio only offers text models, Vertex offers multimodal.',
        'AI Studio is for prototyping and fast developer access, while Vertex AI provides enterprise-grade security, data governance, and MLOps pipelines.',
        'Vertex AI is completely free, while AI Studio is paid.',
        'There is no difference; they are the exact same platform.'
      ],
      correctAnswer: 'AI Studio is for prototyping and fast developer access, while Vertex AI provides enterprise-grade security, data governance, and MLOps pipelines.',
      explanation: 'Google AI Studio is built for rapid developer prototyping with easy API keys, whereas Vertex AI (on Google Cloud) offers enterprise SLAs, advanced MLOps, private endpoints, and strict data governance.'
    }
  ]
})
