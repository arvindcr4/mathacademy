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

export default function CoursePage() {
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
    // Simulate answer checking
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
