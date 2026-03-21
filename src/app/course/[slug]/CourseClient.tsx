'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { courses, Course, Topic } from '@/lib/curriculum'

// Simulated user progress
const userProgress: Record<string, number> = {
  'mdp': 0.85,
  'bellman-equations': 0.6,
  'dynamic-programming': 0.3,
  'transfer-learning': 0.4,
  'lora': 0.1,
}

export default function CourseClient() {
  const params = useParams()
  const slug = params.slug as string
  const course = courses.find(c => c.slug === slug)

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [currentKpIndex, setCurrentKpIndex] = useState(0)
  const [showExample, setShowExample] = useState(true)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [xpGained, setXpGained] = useState(0)
  const [masteryLevel, setMasteryLevel] = useState(0)

  useEffect(() => {
    if (course && !selectedTopic) {
      setSelectedTopic(course.topics[0])
    }
  }, [course, selectedTopic])

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link href="/" className="text-blue-400 hover:underline">Go back home</Link>
        </div>
      </div>
    )
  }

  const currentKp = selectedTopic?.knowledgePoints[currentKpIndex]
  const totalKps = selectedTopic?.knowledgePoints.length || 0
  const progress = selectedTopic ? (userProgress[selectedTopic.slug] || 0) : 0

  const handleSubmit = () => {
    const isCorrect = Math.random() > 0.3
    setFeedback(isCorrect ? 'correct' : 'incorrect')

    if (isCorrect) {
      setXpGained(prev => prev + (currentKp ? 10 : 5))
      setMasteryLevel(prev => Math.min(prev + 0.1, 1))
    }

    setTimeout(() => {
      setFeedback(null)
      setUserAnswer('')
      if (currentKpIndex < totalKps - 1) {
        setCurrentKpIndex(prev => prev + 1)
        setShowExample(true)
      }
    }, 1500)
  }

  const exampleProblems: Record<string, { q: string; a: string; hints: string[] }[]> = {
    'states-and-actions': [
      { q: 'In a chess game, which of the following BEST represents a "state"?', a: 'The complete board configuration at a given moment', hints: ['Think about what captures all relevant information', 'The history of moves is not needed'] },
      { q: 'Why is the Markov property important in RL?', a: 'The future depends only on the current state, not the full history', hints: ['It simplifies the problem', 'Memory of past events is not needed'] },
    ],
    'reward-hypothesis': [
      { q: 'What does the reward signal define in an RL problem?', a: 'What is good/bad in the immediate sense', hints: ['Think about the goal', 'It guides the agent towards desired behavior'] },
    ],
    'discount-factor': [
      { q: 'What happens when gamma (discount factor) approaches 0?', a: 'The agent becomes myopic, focusing only on immediate rewards', hints: ['Future rewards become less important', 'Think about the mathematical limit'] },
    ],
    'value-function': [
      { q: 'V(s) represents the expected _____ when following policy π from state s.', a: 'Return', hints: ['It\'s a prediction of future rewards', 'Think about what we\'re estimating'] },
    ],
    'bellman-equations': [
      { q: 'The Bellman equation expresses V(s) in terms of:', a: 'V(s\') for successor states and immediate reward', hints: ['It decomposes recursively', 'Think about the next state and reward'] },
    ],
    'bellman-recursion': [
      { q: 'Bootstrapping in TD learning means:', a: 'Updating estimates based on other estimates (not waiting for final outcome)', hints: ['Compare to Monte Carlo', 'TD uses the next state\'s value estimate'] },
    ],
    'contraction-mapping': [
      { q: 'Why does the Bellman backup operator guarantee convergence?', a: 'It is a γ-contraction mapping in the sup-norm, so iteration converges to the unique fixed point', hints: ['Think about the discount factor γ < 1', 'Fixed point theorem'] },
    ],
    'dp-convergence': [
      { q: 'What is the time complexity of value iteration with |S| states and |A| actions?', a: 'O(|S|² × |A|) per iteration', hints: ['For each state-action pair you update all next states', 'Multiply state count squared by action count'] },
    ],
    'asynchronous-dp': [
      { q: 'An advantage of asynchronous DP over synchronous DP is:', a: 'It can update states in any order, allowing focus on relevant states and faster practical convergence', hints: ['Not all states need equal attention', 'Think about real-time problems'] },
    ],
    'first-visit-mc': [
      { q: 'In first-visit MC, the return G_t is used:', a: 'Only for the first time state s is visited in an episode', hints: ['Contrast with every-visit MC', 'Each state counted at most once per episode'] },
    ],
    'importance-sampling': [
      { q: 'Off-policy MC uses importance sampling to:', a: 'Correct for the difference in distribution between behavior policy and target policy', hints: ['We act under μ but want to learn about π', 'Weight returns by π(a|s)/μ(a|s)'] },
    ],
    'target-networks': [
      { q: 'Why does DQN use a separate target network?', a: 'To stabilize training by providing fixed TD targets during updates', hints: ['Without it, targets shift with every update', 'The target network is updated less frequently'] },
    ],
    'double-dqn': [
      { q: 'Double DQN reduces overestimation bias by:', a: 'Using the online network to select actions and the target network to evaluate them', hints: ['Max operation causes overestimation in standard DQN', 'Two separate networks for selection and evaluation'] },
    ],
    'baseline-variance': [
      { q: 'Adding a baseline b(s) to REINFORCE:', a: 'Reduces variance without introducing bias', hints: ['The expected value of baseline term is zero', 'Advantage = R - b(s)'] },
    ],
    'natural-policy-gradient': [
      { q: 'The natural policy gradient uses the _____ to account for the geometry of the policy space.', a: 'Fisher information matrix', hints: ['Standard gradient ignores policy geometry', 'NPG preconditions gradient by F⁻¹'] },
    ],
    'rainbow-dqn': [
      { q: 'Rainbow DQN combines how many improvements over vanilla DQN?', a: '6 improvements: Double DQN, Dueling, Prioritized Replay, Multi-step, Distributional, Noisy Nets', hints: ['It is the combination paper', 'Each improvement was validated separately first'] },
    ],
    'model-based-rl': [
      { q: 'A key advantage of model-based RL over model-free RL is:', a: 'Higher sample efficiency — the agent can plan and simulate experiences without real environment interaction', hints: ['Think about data efficiency', 'Models let you generate synthetic rollouts'] },
    ],
    'vectors-matrices': [
      { q: 'What is the result of multiplying a 3×4 matrix by a 4×2 matrix?', a: 'A 3×2 matrix', hints: ['(m×n) × (n×p) = (m×p)', 'Inner dimensions must match'] },
    ],
    'eigenvalues-eigenvectors': [
      { q: 'If Av = λv, what does λ represent?', a: 'The eigenvalue — a scalar showing how much the eigenvector v is scaled by matrix A', hints: ['The eigenvector direction is preserved', 'λ scales the vector'] },
    ],
    'svd': [
      { q: 'SVD decomposes matrix A into:', a: 'A = UΣVᵀ where U, V are orthogonal and Σ is diagonal with singular values', hints: ['Three matrices', 'The middle matrix contains singular values'] },
    ],
    'scaled-dot-product': [
      { q: 'Why do we scale dot products by √d_k in attention?', a: 'To prevent vanishing gradients — dot products grow large in high dimensions, pushing softmax into saturation regions', hints: ['Think about variance of dot products', 'Large values → flat softmax gradients'] },
    ],
    'multi-head-attention': [
      { q: 'What is the benefit of using h attention heads instead of 1?', a: 'Different heads can attend to different positions and representation subspaces simultaneously', hints: ['Diversity of attention patterns', 'Each head learns different relationships'] },
    ],
    'positional-encoding': [
      { q: 'RoPE (Rotary Position Embedding) encodes position by:', a: 'Rotating query and key vectors in 2D planes by angles proportional to position, enabling relative position capture', hints: ['It modifies Q and K before attention', 'Used in Llama, PaLM, and many modern LLMs'] },
    ],
    'scaling-laws': [
      { q: 'The Chinchilla scaling law states that for optimal training, model size and training tokens should be scaled:', a: 'Roughly equally — a model with N parameters should be trained on ~20N tokens', hints: ['GPT-3 was undertrained relative to this', 'Chinchilla beat Gopher at 70B vs 280B'] },
    ],
    'mixture-of-experts': [
      { q: 'In a Mixture of Experts (MoE) model, the router assigns each token to:', a: 'A subset of experts (typically top-2), activating only those parameters for that token', hints: ['Sparse activation — not all experts fire', 'Mixtral 8×7B uses MoE'] },
    ],
    'kv-cache': [
      { q: 'The KV cache speeds up autoregressive inference by:', a: 'Storing key and value tensors from previous tokens, avoiding recomputing them at each generation step', hints: ['Attention needs past K and V', 'Without it, each step reprocesses the full sequence'] },
    ],
    'speculative-decoding': [
      { q: 'Speculative decoding uses a small draft model to:', a: 'Propose multiple tokens that the large target model then verifies in parallel, achieving >1 token per forward pass', hints: ['The target model checks draft tokens in one pass', 'Speedup comes from batch verification'] },
    ],
    'wandb-basics': [
      { q: 'In W&B, a "run" corresponds to:', a: 'A single training experiment with its own config, metrics, and artifacts', hints: ['Projects contain many runs', 'Each call to wandb.init() creates a run'] },
    ],
    'data-drift': [
      { q: 'Which statistical test is commonly used to detect distribution shift between training and serving data?', a: 'Kolmogorov-Smirnov (KS) test or Population Stability Index (PSI)', hints: ['You compare two distributions', 'PSI is common in finance/ML monitoring'] },
    ],
    'lora-rank-selection': [
      { q: 'A higher LoRA rank r means:', a: 'More trainable parameters and more expressive updates, but higher memory cost', hints: ['Rank determines size of A and B matrices', 'r=64 > r=8 in expressiveness'] },
    ],
    'lora-merge': [
      { q: 'After training, LoRA weights are merged into the base model by:', a: 'Adding W₀ + BA (where B and A are the low-rank matrices) to produce the final weight matrix', hints: ['The update is BA, not B×A separately', 'Merged model has no inference overhead'] },
    ],
    'double-quantization': [
      { q: 'In QLoRA, double quantization reduces memory by:', a: 'Quantizing the quantization constants themselves (from 32-bit to 8-bit), saving ~0.37 bits per parameter', hints: ['The quantization constants for each block are also quantized', 'Saves memory on the quantization metadata'] },
    ],
    'constitutional-ai': [
      { q: 'In Constitutional AI (CAI), the model is trained to be helpful/harmless using:', a: 'A set of principles (constitution) where the model critiques and revises its own outputs — no human labels needed', hints: ['Anthropic\'s approach to RLHF without human preference labels', 'The model self-critiques based on principles'] },
    ],
  }

  const currentExamples = currentKp ? exampleProblems[currentKp.slug] || [
    { q: `Practice problem for: ${currentKp.name}`, a: 'Correct answer here', hints: ['Think carefully', 'Apply the concept'] }
  ] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${course.color}33` }}
              >
                {course.icon}
              </div>
              <div>
                <div className="font-semibold">{course.name}</div>
                <div className="text-xs text-gray-400">{course.category.replace('-', ' ')}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 rounded-full">
              <span className="text-yellow-400 font-bold">+{xpGained}</span>
              <span className="text-xs text-gray-400">XP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Mastery:</span>
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                  style={{ width: `${masteryLevel * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Topic List */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sticky top-24">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Topics
              </h2>
              <div className="space-y-2">
                {course.topics.map(topic => {
                  const topicProgress = userProgress[topic.slug] || 0
                  const isActive = selectedTopic?.id === topic.id
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopic(topic)
                        setCurrentKpIndex(0)
                        setShowExample(true)
                        setMasteryLevel(topicProgress)
                      }}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition
                        ${isActive ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'}
                      `}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{topic.name}</span>
                        {topicProgress > 0 && (
                          <span className="text-xs text-green-400">
                            {Math.round(topicProgress * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1">
                        <div
                          className="h-full rounded-full bg-green-500 transition-all"
                          style={{ width: `${topicProgress * 100}%` }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTopic && (
              <div className="space-y-6">
                {/* Topic Header */}
                <div>
                  <h1 className="text-2xl font-bold mb-2">{selectedTopic.name}</h1>
                  <p className="text-gray-400">{selectedTopic.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Knowledge Points ({currentKpIndex + 1} of {totalKps})
                    </span>
                    <span className="text-sm font-medium">
                      {currentKp?.name || 'Complete'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${((currentKpIndex + 1) / totalKps) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Lesson Content */}
                {currentKp && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                    {/* Example Section */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-400 font-semibold">Example</span>
                        <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                          Follow along
                        </span>
                      </div>
                      <div className="space-y-3">
                        <p className="text-lg">{currentExamples[0]?.q}</p>
                        <div className="bg-black/30 rounded-lg p-3 border-l-4 border-blue-500">
                          <span className="text-gray-400 text-sm">Answer: </span>
                          <span className="text-green-400">{currentExamples[0]?.a}</span>
                        </div>
                        {showExample && currentExamples[0]?.hints && (
                          <details className="text-sm">
                            <summary className="text-gray-400 cursor-pointer hover:text-white">
                              Need a hint?
                            </summary>
                            <div className="mt-2 space-y-1">
                              {currentExamples[0].hints.map((hint, i) => (
                                <div key={i} className="text-yellow-400/80">
                                  → {hint}
                                </div>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    </div>

                    {/* Practice Problem */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">Practice</span>
                        <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                          {10} XP
                        </span>
                      </div>
                      <p className="text-lg">{currentExamples[0]?.q || `Practice: ${currentKp.name}`}</p>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        placeholder="Type your answer..."
                        className={`
                          w-full bg-black/30 border rounded-lg px-4 py-3 text-white
                          focus:outline-none focus:ring-2
                          ${feedback === 'correct' ? 'border-green-500 focus:ring-green-500' : ''}
                          ${feedback === 'incorrect' ? 'border-red-500 focus:ring-red-500' : ''}
                          ${!feedback ? 'border-white/20 focus:ring-blue-500' : ''}
                        `}
                        disabled={feedback !== null}
                      />
                      {feedback && (
                        <div className={`
                          p-4 rounded-lg animate-slide-up
                          ${feedback === 'correct' ? 'bg-green-500/20 border border-green-500/50' : ''}
                          ${feedback === 'incorrect' ? 'bg-red-500/20 border border-red-500/50' : ''}
                        `}>
                          {feedback === 'correct' ? (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">✓</span>
                              <div>
                                <div className="font-semibold text-green-400">Correct!</div>
                                <div className="text-sm text-gray-400">+{10} XP earned</div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">✗</span>
                                <div className="font-semibold text-red-400">Incorrect</div>
                              </div>
                              <p className="text-sm text-gray-400">
                                The correct answer was: <span className="text-green-400">{currentExamples[0]?.a}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      {!feedback && (
                        <button
                          onClick={handleSubmit}
                          disabled={!userAnswer.trim()}
                          className={`
                            px-6 py-3 rounded-lg font-semibold transition
                            ${userAnswer.trim()
                              ? 'bg-blue-500 hover:bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            }
                          `}
                        >
                          Check Answer
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentKpIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentKpIndex === 0}
                    className={`
                      px-4 py-2 rounded-lg transition
                      ${currentKpIndex === 0 ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}
                    `}
                  >
                    ← Previous
                  </button>
                  {currentKpIndex === totalKps - 1 ? (
                    <Link
                      href={`/course/${course.slug}`}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition"
                    >
                      Complete Topic ✓
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentKpIndex(prev => Math.min(totalKps - 1, prev + 1))
                        setShowExample(true)
                      }}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
