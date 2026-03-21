import { describe, it, expect } from 'vitest'
import type { Question } from '@/lib/curriculum'
import * as questionFiles from './index'

// Non-ASCII characters that should not be used (use LaTeX instead)
const NON_ASCII_PATTERNS = /[→←↔↕↑↓⇒⇔∀∃∈∉⊂⊃⊆⊇∪∩∞±×÷∑∏∂∇≈≠≤≥]/

describe('Question Types', () => {
  it('should have valid question types', () => {
    const validTypes = ['multiple-choice', 'true-false', 'coding']

    const testQuestion: Question = {
      id: 'test-q-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Test question?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Test explanation',
      hints: ['Test hint'],
    }

    expect(validTypes).toContain(testQuestion.type)
  })

  it('should have valid difficulty levels', () => {
    const validDifficulties = ['easy', 'medium', 'hard']

    const testQuestion: Question = {
      id: 'test-q-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Test question?',
      correctAnswer: 'true',
      explanation: 'Test explanation',
    }

    expect(validDifficulties).toContain(testQuestion.difficulty)
  })
})

describe('Question Validation', () => {
  it('should validate multiple-choice questions have options', () => {
    const mcQuestion: Question = {
      id: 'test-mc-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is 2+2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: '2+2=4',
    }

    expect(mcQuestion.options).toBeDefined()
    expect(mcQuestion.options!.length).toBeGreaterThanOrEqual(2)
    expect(typeof mcQuestion.correctAnswer).toBe('number')
  })

  it('should validate true-false questions have string answers', () => {
    const tfQuestion: Question = {
      id: 'test-tf-1',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The sky is blue.',
      correctAnswer: 'true',
      explanation: 'The sky appears blue due to Rayleigh scattering.',
    }

    expect(['true', 'false']).toContain(tfQuestion.correctAnswer)
  })
})

describe('LaTeX Formatting', () => {
  it('should use proper LaTeX delimiters', () => {
    const latexQuestion = 'Express $\\\\log_{4}(k^2 t)$ as a single logarithm.'

    // Check for inline math delimiters
    expect(latexQuestion).toMatch(/\$[^$]+\$/)

    // Check that Unicode math symbols are not used
    // Note: This test checks that we're moving away from Unicode symbols
    // The NON_ASCII_PATTERNS constant at the top covers the main Unicode math symbols
  })
})

describe('Math Academy Style', () => {
  it('should have explanations that start with recall pattern', () => {
    const explanation = `First, let's recall the product rule for logarithms:

\\[
\\log_n a + \\log_n b = \\log_n(ab)
\\]

Using the product rule, we can combine the logarithms.

Therefore, the answer is $\\log_4(k^3 t^3)$.`

    expect(explanation).toMatch(/First, let's recall/)
    expect(explanation).toMatch(/Therefore/)
  })

  it('should have step-by-step derivations', () => {
    const explanation = `**Step 1:** Identify the rule
**Step 2:** Apply the rule
**Step 3:** Simplify

Therefore, the answer is $\\log_4(k^3 t^3)$.`

    expect(explanation).toMatch(/\*\*Step/)
    expect(explanation).toMatch(/Therefore/)
  })
})

describe('Question Files Validation', () => {
  const questionBanks = questionFiles.questionBanks

  it('should have question banks defined', () => {
    expect(questionBanks).toBeDefined()
    expect(Object.keys(questionBanks).length).toBeGreaterThan(0)
  })

  it('should have valid question structure in all banks', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      expect(Array.isArray(questions), `${bankName} should be an array`).toBe(true)

      for (const q of questions as Question[]) {
        // Required fields
        expect(q.id, `${bankName}: ${q.id} should have id`).toBeDefined()
        expect(q.type, `${bankName}: ${q.id} should have type`).toBeDefined()
        expect(q.difficulty, `${bankName}: ${q.id} should have difficulty`).toBeDefined()
        expect(q.question, `${bankName}: ${q.id} should have question`).toBeDefined()
        expect(q.correctAnswer, `${bankName}: ${q.id} should have correctAnswer`).toBeDefined()
        expect(q.explanation, `${bankName}: ${q.id} should have explanation`).toBeDefined()

        // Type validation
        expect(['multiple-choice', 'true-false', 'coding']).toContain(q.type)

        // Difficulty validation
        expect(['easy', 'medium', 'hard']).toContain(q.difficulty)

        // Multiple choice specific
        if (q.type === 'multiple-choice') {
          expect(q.options, `${bankName}: ${q.id} MC should have options`).toBeDefined()
          expect(q.options!.length, `${bankName}: ${q.id} should have 2-5 options`).toBeGreaterThanOrEqual(2)
          expect(q.options!.length, `${bankName}: ${q.id} should have 2-5 options`).toBeLessThanOrEqual(5)
          expect(typeof q.correctAnswer, `${bankName}: ${q.id} MC correctAnswer should be number`).toBe('number')
          expect(q.correctAnswer as number, `${bankName}: ${q.id} correctAnswer out of bounds`).toBeLessThan(q.options!.length)
        }

        // True-false specific
        if (q.type === 'true-false') {
          expect(['true', 'false']).toContain(q.correctAnswer)
        }
      }
    }
  })

  it('should not contain non-ASCII math symbols', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      for (const q of questions as Question[]) {
        expect(q.question, `${bankName}: ${q.id} question has non-ASCII`).not.toMatch(NON_ASCII_PATTERNS)
        expect(q.explanation, `${bankName}: ${q.id} explanation has non-ASCII`).not.toMatch(NON_ASCII_PATTERNS)
        if (q.options) {
          for (const opt of q.options) {
            expect(opt, `${bankName}: ${q.id} option has non-ASCII`).not.toMatch(NON_ASCII_PATTERNS)
          }
        }
      }
    }
  })

  it('should have unique question IDs across all banks', () => {
    const allIds = new Set<string>()
    const duplicates: string[] = []

    for (const [bankName, questions] of Object.entries(questionBanks)) {
      for (const q of questions as Question[]) {
        if (allIds.has(q.id)) {
          duplicates.push(`${q.id} (in ${bankName})`)
        }
        allIds.add(q.id)
      }
    }

    expect(duplicates, `Duplicate IDs found: ${duplicates.slice(0, 10).join(', ')}`).toHaveLength(0)
  })

  it('should have valid hints (strings, not empty)', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      for (const q of questions as Question[]) {
        if (q.hints) {
          expect(Array.isArray(q.hints), `${bankName}: ${q.id} hints should be array`).toBe(true)
          for (const hint of q.hints) {
            expect(typeof hint, `${bankName}: ${q.id} hint should be string`).toBe('string')
            expect(hint.length, `${bankName}: ${q.id} hint should not be empty`).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('should have valid true-false correctAnswer values', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      for (const q of questions as Question[]) {
        if (q.type === 'true-false') {
          expect(
            ['true', 'false', 'True', 'False'].includes(q.correctAnswer as string),
            `${bankName}: ${q.id} TF correctAnswer should be true/false`
          ).toBe(true)
        }
      }
    }
  })

  it('should have properly formatted bank names (kebab-case)', () => {
    const validBankNamePattern = /^[a-z0-9-]+$/

    for (const bankName of Object.keys(questionBanks)) {
      expect(
        validBankNamePattern.test(bankName),
        `Bank name "${bankName}" should be kebab-case (lowercase, hyphens only)`
      ).toBe(true)
    }
  })

  it('should have minimum questions per bank', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      expect(
        (questions as Question[]).length,
        `${bankName} should have at least 3 questions`
      ).toBeGreaterThanOrEqual(3)
    }
  })

  it('should have reasonable explanation lengths', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      for (const q of questions as Question[]) {
        expect(
          q.explanation.length,
          `${bankName}: ${q.id} explanation should be at least 20 chars`
        ).toBeGreaterThanOrEqual(20)
        expect(
          q.explanation.length,
          `${bankName}: ${q.id} explanation should be under 5000 chars`
        ).toBeLessThanOrEqual(5000)
      }
    }
  })

  it('should have reasonable question text lengths', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      for (const q of questions as Question[]) {
        expect(
          q.question.length,
          `${bankName}: ${q.id} question should be at least 10 chars`
        ).toBeGreaterThanOrEqual(10)
        expect(
          q.question.length,
          `${bankName}: ${q.id} question should be under 2000 chars`
        ).toBeLessThanOrEqual(2000)
      }
    }
  })

  it('should have valid coding questions with codeSnippet', () => {
    for (const [bankName, questions] of Object.entries(questionBanks)) {
      for (const q of questions as Question[]) {
        if (q.type === 'coding') {
          expect(
            q.codeSnippet,
            `${bankName}: ${q.id} coding question should have codeSnippet`
          ).toBeDefined()
          expect(
            q.codeSnippet!.length,
            `${bankName}: ${q.id} codeSnippet should not be empty`
          ).toBeGreaterThan(0)
        }
      }
    }
  })
})
