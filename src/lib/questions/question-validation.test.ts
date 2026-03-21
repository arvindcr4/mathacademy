import { describe, it, expect } from 'vitest'
import { getAllQuestions, getQuestions } from './registry'
import type { Question } from '@/lib/curriculum'

describe('Question Data Quality', () => {
  const allQuestions = getAllQuestions()

  describe('Option Quality', () => {
    it('should have options with reasonable length', () => {
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (const q of questions as Question[]) {
          if (q.type === 'multiple-choice' && q.options) {
            for (const opt of q.options) {
              expect(opt.length).toBeGreaterThanOrEqual(1)
              expect(opt.length).toBeLessThanOrEqual(1000)
            }
          }
        }
      }
    })

    it('should have unique options per question', () => {
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (const q of questions as Question[]) {
          if (q.type === 'multiple-choice' && q.options) {
            const uniqueOpts = new Set(q.options.map(o => o.trim().toLowerCase()))
            expect(uniqueOpts.size).toBe(q.options.length)
          }
        }
      }
    })

    it('should have options that are not just A/B/C/D labels', () => {
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (const q of questions as Question[]) {
          if (q.type === 'multiple-choice' && q.options) {
            for (const opt of q.options) {
              // Options should be longer than single character labels
              expect(opt.trim().length).toBeGreaterThan(1)
            }
          }
        }
      }
    })
  })

  describe('True-False Question Quality', () => {
    it('should have valid correctAnswer for true-false', () => {
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (const q of questions as Question[]) {
          if (q.type === 'true-false') {
            expect(['true', 'false']).toContain(q.correctAnswer)
          }
        }
      }
    })
  })

  describe('Question Text Quality', () => {
    it('should have questions ending with punctuation', () => {
      const validEndings = ['?', '.', '!', ':', ')', '`', '"']
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (const q of questions as Question[]) {
          const lastChar = q.question.trim().slice(-1)
          expect(validEndings.includes(lastChar)).toBe(true)
        }
      }
    })

    it('should have questions that are not too short', () => {
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (const q of questions as Question[]) {
          expect(q.question.trim().length).toBeGreaterThanOrEqual(10)
        }
      }
    })
  })

  describe('Explanation Quality', () => {
    it('should have explanations ending with punctuation', () => {
      const validEndings = ['.', '!', '?', ')', ']', '`', '"']
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (const q of questions as Question[]) {
          const lastChar = q.explanation.trim().slice(-1)
          expect(validEndings.includes(lastChar)).toBe(true)
        }
      }
    })
  })

  describe('Bank Organization', () => {
    it('should have questions sorted by difficulty within each bank', () => {
      const difficultyRank = { easy: 0, medium: 1, hard: 2 }
      for (const [_bankName, questions] of Object.entries(allQuestions)) {
        for (let i = 1; i < questions.length; i++) {
          const prevRank = difficultyRank[questions[i - 1].difficulty]
          const currRank = difficultyRank[questions[i].difficulty]
          expect(prevRank).toBeLessThanOrEqual(currRank)
        }
      }
    })
  })
})

describe('Registry Functions', () => {
  it('should return empty array for non-existent slug', () => {
    const questions = getQuestions('non-existent-slug-12345')
    expect(questions).toEqual([])
  })

  it('should return array for valid slug', () => {
    const allQuestions = getAllQuestions()
    const firstBankSlug = Object.keys(allQuestions)[0]
    const questions = getQuestions(firstBankSlug)
    expect(Array.isArray(questions)).toBe(true)
  })
})
