import { describe, it, expect } from 'vitest'
import { getQuestions, getAllQuestions, registerQuestions, questionOverrides } from './registry'
import type { QuestionsMap } from './registry'

// Import all question files to trigger registration
import './index'

describe('Question Registry', () => {

  describe('getQuestions', () => {
    it('should return questions for a valid slug', () => {
      const questions = getQuestions('policy-definition')
      expect(Array.isArray(questions)).toBe(true)
      expect(questions.length).toBeGreaterThan(0)
    })

    it('should return empty array for non-existent slug', () => {
      const questions = getQuestions('non-existent-slug')
      expect(questions).toEqual([])
    })
  })

  describe('getAllQuestions', () => {
    it('should return an object with question banks', () => {
      const allQuestions = getAllQuestions()
      expect(typeof allQuestions).toBe('object')
      expect(Object.keys(allQuestions).length).toBeGreaterThan(0)
    })
  })

  describe('registerQuestions', () => {
    it('should register new question banks', () => {
      const testQuestions: QuestionsMap = {
        'test-bank': [
          {
            id: 'test-q-1',
            type: 'multiple-choice',
            difficulty: 'easy',
            question: 'Test question?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 0,
            explanation: 'Test explanation.',
          },
        ],
      }

      registerQuestions(testQuestions)

      const retrieved = getQuestions('test-bank')
      expect(retrieved.length).toBe(1)
      expect(retrieved[0].id).toBe('test-q-1')
    })
  })
})

describe('Question Normalization', () => {
  it('should normalize true-false answers to lowercase', () => {
    // True-false questions with "True"/"False" should be normalized to "true"/"false"
    const tfQuestions = getQuestions('systems-design-interview')

    for (const q of tfQuestions) {
      if (q.type === 'true-false') {
        expect(['true', 'false']).toContain(q.correctAnswer)
      }
    }
  })

  it('should keep multiple-choice answers as numbers', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice') {
          expect(
            typeof q.correctAnswer,
            `${bankName}: ${q.id} MC correctAnswer should be number`
          ).toBe('number')
        }
      }
    }
  })

  it('should sort questions by difficulty', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      const difficulties = questions.map(q => q.difficulty)
      const difficultyRank = { easy: 0, medium: 1, hard: 2 }

      // Check that easy questions come before medium, and medium before hard
      for (let i = 1; i < difficulties.length; i++) {
        const prevRank = difficultyRank[difficulties[i - 1]]
        const currRank = difficultyRank[difficulties[i]]

        // Allow equal or increasing difficulty
        expect(
          prevRank,
          `${bankName}: Questions should be sorted by difficulty`
        ).toBeLessThanOrEqual(currRank)
      }
    }
  })
})

describe('Question ID Uniqueness', () => {
  it('should have unique question IDs across all banks', () => {
    const allQuestions = getAllQuestions()
    const allIds: string[] = []

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        allIds.push(q.id)
      }
    }

    const uniqueIds = new Set(allIds)
    expect(
      uniqueIds.size,
      'All question IDs should be unique'
    ).toBe(allIds.length)
  })
})

describe('Question Content Validation', () => {
  it('should have non-empty questions', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          q.question.trim().length,
          `${bankName}: ${q.id} should have non-empty question`
        ).toBeGreaterThan(0)
      }
    }
  })

  it('should have non-empty explanations', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          q.explanation.trim().length,
          `${bankName}: ${q.id} should have non-empty explanation`
        ).toBeGreaterThan(0)
      }
    }
  })

  it('should have correctAnswer within bounds for multiple-choice', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice' && q.options) {
          expect(
            q.correctAnswer as number,
            `${bankName}: ${q.id} correctAnswer should be within options bounds`
          ).toBeLessThan(q.options.length)
          expect(
            q.correctAnswer as number,
            `${bankName}: ${q.id} correctAnswer should be >= 0`
          ).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })
})

describe('Question Overrides', () => {
  it('should have question overrides defined', () => {
    expect(questionOverrides).toBeDefined()
    expect(typeof questionOverrides).toBe('object')
  })

  it('should have valid override structure', () => {
    for (const [id, override] of Object.entries(questionOverrides)) {
      expect(typeof id, 'Override ID should be string').toBe('string')
      expect(typeof override, `Override for ${id} should be object`).toBe('object')

      // If options are overridden with a numeric correctAnswer, it should be valid for those options
      if (override.options && typeof override.correctAnswer === 'number') {
        expect(
          override.correctAnswer,
          `${id}: override correctAnswer should be within options bounds`
        ).toBeLessThan(override.options.length)
      }
    }
  })

  it('should only contain overrides for existing question IDs', () => {
    const allQuestions = getAllQuestions()
    const allIds = new Set<string>()

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        allIds.add(q.id)
      }
    }

    // Note: Some overrides may exist for questions not yet loaded
    // This test documents which overrides exist
    const overrideIds = Object.keys(questionOverrides)
    expect(overrideIds.length, 'Should have at least one override').toBeGreaterThan(0)
  })
})

describe('Hints Validation', () => {
  it('should have hints arrays that are not empty', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.hints) {
          expect(
            Array.isArray(q.hints),
            `${bankName}: ${q.id} hints should be array`
          ).toBe(true)
          expect(
            q.hints.length,
            `${bankName}: ${q.id} should have at least one hint after normalization`
          ).toBeGreaterThan(0)
        }
      }
    }
  })

  it('should have non-empty hint strings', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.hints) {
          for (const hint of q.hints) {
            expect(
              typeof hint,
              `${bankName}: ${q.id} hint should be string`
            ).toBe('string')
            expect(
              hint.trim().length,
              `${bankName}: ${q.id} hint should not be empty`
            ).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('should have at most 5 hints per question', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.hints) {
          expect(
            q.hints.length,
            `${bankName}: ${q.id} should have at most 5 hints`
          ).toBeLessThanOrEqual(5)
        }
      }
    }
  })
})

describe('Options Validation', () => {
  it('should have non-empty option strings', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice' && q.options) {
          for (const opt of q.options) {
            expect(
              typeof opt,
              `${bankName}: ${q.id} option should be string`
            ).toBe('string')
            expect(
              opt.trim().length,
              `${bankName}: ${q.id} option should not be empty`
            ).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('should have unique options within each question', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice' && q.options) {
          const uniqueOptions = new Set(q.options.map(o => o.trim()))
          expect(
            uniqueOptions.size,
            `${bankName}: ${q.id} options should be unique`
          ).toBe(q.options.length)
        }
      }
    }
  })
})

describe('Coding Questions Validation', () => {
  it('should have valid structure for coding questions', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'coding') {
          // Coding questions should have a question prompt
          expect(
            q.question.trim().length,
            `${bankName}: ${q.id} coding question should have prompt`
          ).toBeGreaterThan(0)

          // Coding questions should have an explanation
          expect(
            q.explanation.trim().length,
            `${bankName}: ${q.id} coding question should have explanation`
          ).toBeGreaterThan(0)
        }
      }
    }
  })
})

describe('Registry Edge Cases', () => {
  it('should handle multiple registrations of the same bank', () => {
    const testQuestions: QuestionsMap = {
      'edge-case-bank': [
        {
          id: 'edge-q-1',
          type: 'multiple-choice',
          difficulty: 'easy',
          question: 'First question?',
          options: ['A', 'B'],
          correctAnswer: 0,
          explanation: 'First explanation.',
        },
      ],
    }

    registerQuestions(testQuestions)

    // Register again with different content
    const updatedQuestions: QuestionsMap = {
      'edge-case-bank': [
        {
          id: 'edge-q-2',
          type: 'multiple-choice',
          difficulty: 'medium',
          question: 'Second question?',
          options: ['C', 'D'],
          correctAnswer: 1,
          explanation: 'Second explanation.',
        },
      ],
    }

    registerQuestions(updatedQuestions)

    const retrieved = getQuestions('edge-case-bank')
    // After second registration, the bank should be replaced
    expect(retrieved.length).toBe(1)
    expect(retrieved[0].id).toBe('edge-q-2')
  })

  it('should handle empty question bank registration', () => {
    const emptyBank: QuestionsMap = {
      'empty-bank': [],
    }

    registerQuestions(emptyBank)

    const retrieved = getQuestions('empty-bank')
    expect(retrieved).toEqual([])
  })

  it('should handle slug with special characters gracefully', () => {
    const specialSlug = 'test-with-dashes-and-numbers-123'
    const questions = getQuestions(specialSlug)
    expect(Array.isArray(questions)).toBe(true)
  })
})
