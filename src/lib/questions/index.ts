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

function buildReasoningHint(question: Question, explanation: string): string {
  const haystack = `${question.question} ${explanation}`.toLowerCase()

  if (question.type === 'true-false') {
    return 'Test the statement on a concrete example or counterexample before deciding.'
  }

  if (/\[[^\]]+\]/.test(question.question) || /\bfor input\b/i.test(question.question) || /\bgiven\b/i.test(question.question)) {
    return 'Work through the concrete example in the prompt by hand before comparing the answer choices.'
  }

  if (/time complexity|space complexity|optimal/i.test(haystack)) {
    return 'Identify the best-known approach first, then compare the dominant time or space cost.'
  }

  if (/(stack|queue|heap|hash|tree|graph|pointer|window|dynamic programming|dp|greedy|binary search)/i.test(haystack)) {
    return 'Focus on the core invariant the algorithm or data structure must preserve.'
  }

  return 'Translate the prompt into the core algorithmic idea before evaluating the choices.'
}

function buildConceptHint(question: Question, explanation: string): string {
  const summary = clip(
    firstSentence(explanation).replace(/\boption\s+[0-9A-D]+\b/gi, 'the correct choice'),
    140
  )
  const prefix = question.difficulty === 'hard' ? 'Key checkpoint' : 'Core idea'
  return `${prefix}: ${summary}`
}

function normalizeHints(question: Question, explanation: string): string[] {
  if (question.hints && question.hints.length > 0) {
    return dedupeHints(question.hints)
  }

  return dedupeHints([
    buildReasoningHint(question, explanation),
    buildConceptHint(question, explanation),
  ])
}

function normalizeQuestion(question: Question): Question {
  const explanation = ensureSentence(normalizeText(question.explanation))

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
import './coding-interviews'
