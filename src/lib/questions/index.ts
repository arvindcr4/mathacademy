import type { Question } from '@/lib/curriculum'

// Registry: maps kp-slug → questions array
export type QuestionsMap = Record<string, Question[]>

const registry: QuestionsMap = {}

const difficultyRank: Record<Question['difficulty'], number> = {
  easy: 0,
  medium: 1,
  hard: 2,
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function ensureSentence(text: string): string {
  return /[.!?]$/.test(text) ? text : `${text}.`
}

function cleanExplanation(text: string): string {
  let normalized = normalizeText(text)

  for (const marker of ['Wait - let me reconsider:', 'Wait, let me reconsider:']) {
    const markerIndex = normalized.lastIndexOf(marker)
    if (markerIndex !== -1) {
      normalized = normalized.slice(markerIndex + marker.length).trim()
    }
  }

  return normalized
}

function firstSentence(text: string): string {
  const normalized = normalizeText(text)
  const match = normalized.match(/^.*?[.!?](?=\s|$)/)
  return match ? match[0] : normalized
}

function clip(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}...`
}

function dedupeHints(hints: string[]): string[] {
  const seen = new Set<string>()
  const normalizedHints: string[] = []

  for (const hint of hints) {
    const normalizedHint = ensureSentence(normalizeText(hint))
    const key = normalizedHint.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      normalizedHints.push(normalizedHint)
    }
  }

  return normalizedHints
}

function hasConcreteExample(questionText: string): boolean {
  return /\[[^\]]+\]|"[^"]+"|\bgiven\b|\bfor input\b|\bfor nums\b|\bfor coins\b|\bfor tree\b|\bfor\s+[A-Za-z0-9_]+\s*=/.test(questionText)
}

function buildRecallHint(question: Question, explanation: string): string {
  const haystack = `${question.question} ${explanation}`.toLowerCase()

  if (question.type === 'true-false') {
    return 'Recall the exact rule the statement is claiming before you try to confirm or disprove it.'
  }

  if (/(dynamic programming|dp|recurrence|stairs|coin change|house robber|word break|subsequence)/i.test(haystack)) {
    return 'Define the state clearly first, then ask how the current answer depends on smaller subproblems.'
  }

  if (/(hash map|hash set|complement|duplicate)/i.test(haystack)) {
    return 'Ask what value must be remembered from earlier elements so each new element can be checked in O(1) time.'
  }

  if (/(stack|parentheses|bracket|queue)/i.test(haystack)) {
    return 'Track the order in which items must be matched or removed; that usually identifies the right data structure.'
  }

  if (/(linked list|pointer|cycle|node)/i.test(haystack)) {
    return 'Sketch the pointer positions before and after one move so you can see which references must be preserved.'
  }

  if (/(tree|bst|inorder|ancestor|level order|traversal)/i.test(haystack)) {
    return 'Start from the tree property or traversal order that must stay true at every node.'
  }

  if (/(binary search|sorted|pivot|divide and conquer|half)/i.test(haystack)) {
    return 'Identify the condition that lets you discard half of the remaining search space.'
  }

  if (/(prime|factor|gcd|lcm|mod|totient|fibonacci|binomial|catalan|logarithm)/i.test(haystack)) {
    return 'Recall the defining identity or recurrence first, then apply it to the specific numbers in the prompt.'
  }

  return 'Pin down the core invariant or rule first, then compare the answer choices against it.'
}

function buildWorkHint(question: Question, explanation: string): string {
  const haystack = `${question.question} ${explanation}`.toLowerCase()

  if (question.type === 'true-false') {
    return 'Test the claim on the smallest confirming example or counterexample you can build.'
  }

  if (hasConcreteExample(question.question)) {
    return 'Work the exact example in the prompt step by step before you choose an answer.'
  }

  if (/time complexity|space complexity|optimal/i.test(haystack)) {
    return 'Count how many elements, states, or levels the best-known approach has to process.'
  }

  return 'Write down one intermediate step by hand; the right choice should match that state change.'
}

function buildConceptHint(question: Question, explanation: string): string {
  const summary = clip(
    firstSentence(explanation).replace(/\boption\s+[0-9A-D]+\b/gi, 'the correct choice'),
    160
  )
  const prefix = question.difficulty === 'hard' ? 'Key checkpoint' : 'Core idea'
  return `${prefix}: ${summary}`
}

function normalizeHints(question: Question, explanation: string): string[] {
  const authoredHints = question.hints ? dedupeHints(question.hints) : []
  const fallbackHints = dedupeHints([
    buildRecallHint(question, explanation),
    buildWorkHint(question, explanation),
    buildConceptHint(question, explanation),
  ])

  if (authoredHints.length === 0) {
    return fallbackHints
  }

  const combinedHints = dedupeHints([...authoredHints, ...fallbackHints])
  return combinedHints.slice(0, Math.max(3, authoredHints.length))
}

function normalizeQuestion(question: Question): Question {
  const explanation = ensureSentence(cleanExplanation(question.explanation))

  return {
    ...question,
    explanation,
    hints: normalizeHints(question, explanation),
  }
}

function normalizeQuestionSet(questions: Question[]): Question[] {
  return questions
    .map((question, index) => ({ question: normalizeQuestion(question), index }))
    .sort((a, b) => {
      const difficultyDelta = difficultyRank[a.question.difficulty] - difficultyRank[b.question.difficulty]
      return difficultyDelta !== 0 ? difficultyDelta : a.index - b.index
    })
    .map(({ question }) => question)
}

export function registerQuestions(map: QuestionsMap) {
  const normalizedEntries = Object.fromEntries(
    Object.entries(map).map(([kpSlug, questions]) => [kpSlug, normalizeQuestionSet(questions)])
  )

  Object.assign(registry, normalizedEntries)
}

export function getQuestions(kpSlug: string): Question[] {
  return registry[kpSlug] ?? []
}

export function getAllQuestions(): QuestionsMap {
  return registry
}

// ── Course question files ─────────────────────────────────────────────────
import './rl-fundamentals'
import './rl-applications'
import './math-for-ml'
import './rlhf-alignment'
import './nlp-fundamentals'
import './computer-vision'
import './agentic-ai'
import './deep-learning-fundamentals'
import './ml-systems'
import './transformers-llms'
import './financial-ml'
import './production-ml-engineering'
import './speech-audio'
import './quantum-ml'
import './ai-climate'
import './robotics-embodied'
import './vision-3d'
import './ai-healthcare'
import './scientific-ml'
import './generative-adversarial-networks'
import './domain-adaptation-advanced'
import './ml-system-design'
import './linear-algebra-deep-dive'
import './tabular-ml'
import './ml-evaluation-benchmarking'
import './data-centric-ai'
import './advanced-optimization-ml'
import './meta-learning'
import './self-supervised-learning'
import './coding-interviews-1'
import './coding-interviews-2'
import './coding-interviews-3'
import './gemini-multimodal'
