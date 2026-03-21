import { describe, it, expect } from 'vitest'
import { getQuestions, getAllQuestions } from './registry'

// Import all question files to trigger registration
import './index'

describe('Question Registry', () => {

  describe('getQuestions', () => {
    it('should return questions for a valid slug', () => {
      const questions = getQuestions('rl-fundamentals')
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
