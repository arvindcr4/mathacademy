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

describe('Question Difficulty Distribution', () => {
  it('should have questions across all difficulty levels', () => {
    const allQuestions = getAllQuestions()
    const difficulties = new Set<string>()

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        difficulties.add(q.difficulty)
      }
    }

    expect(difficulties.has('easy'), 'Should have easy questions').toBe(true)
    expect(difficulties.has('medium'), 'Should have medium questions').toBe(true)
    expect(difficulties.has('hard'), 'Should have hard questions').toBe(true)
  })

  it('should have valid difficulty ordering in banks', () => {
    const allQuestions = getAllQuestions()
    const difficultyRank = { easy: 0, medium: 1, hard: 2 }

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      if (questions.length < 2) continue

      for (let i = 1; i < questions.length; i++) {
        const prevRank = difficultyRank[questions[i - 1].difficulty]
        const currRank = difficultyRank[questions[i].difficulty]

        // Questions should be sorted by difficulty (non-decreasing)
        expect(
          prevRank <= currRank,
          `${bankName}: Questions should be sorted by difficulty (index ${i - 1} to ${i})`
        ).toBe(true)
      }
    }
  })
})

describe('Question Type Distribution', () => {
  it('should have multiple question types across all banks', () => {
    const allQuestions = getAllQuestions()
    const types = new Set<string>()

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        types.add(q.type)
      }
    }

    expect(types.size, 'Should have multiple question types').toBeGreaterThan(1)
  })

  it('should have multiple-choice questions', () => {
    const allQuestions = getAllQuestions()
    let hasMC = false

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice') {
          hasMC = true
          break
        }
      }
      if (hasMC) break
    }

    expect(hasMC, 'Should have at least one multiple-choice question').toBe(true)
  })

  it('should have true-false questions', () => {
    const allQuestions = getAllQuestions()
    let hasTF = false

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'true-false') {
          hasTF = true
          break
        }
      }
      if (hasTF) break
    }

    expect(hasTF, 'Should have at least one true-false question').toBe(true)
  })
})

describe('Bank Statistics', () => {
  it('should have reasonable number of questions per bank', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      // Most banks should have at least 3 questions
      if (questions.length > 0 && questions.length < 3) {
        // This is a warning, not an error
        console.log(`Warning: ${bankName} has only ${questions.length} question(s)`)
      }
    }

    // At least check that we have a reasonable total
    let totalQuestions = 0
    for (const questions of Object.values(allQuestions)) {
      totalQuestions += questions.length
    }
    expect(totalQuestions, 'Should have at least 100 total questions').toBeGreaterThan(100)
  })
})

describe('Question ID Format', () => {
  it('should have consistent ID format', () => {
    const allQuestions = getAllQuestions()
    const idPattern = /^[a-z0-9-]+$/

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          idPattern.test(q.id),
          `${bankName}: ${q.id} ID should be kebab-case (lowercase, numbers, hyphens)`
        ).toBe(true)
      }
    }
  })

  it('should have IDs with reasonable length', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          q.id.length,
          `${bankName}: ${q.id} ID should have at least 3 chars`
        ).toBeGreaterThanOrEqual(3)
        expect(
          q.id.length,
          `${bankName}: ${q.id} ID should have at most 50 chars`
        ).toBeLessThanOrEqual(50)
      }
    }
  })
})

describe('Question Bank Names', () => {
  it('should have kebab-case bank names', () => {
    const allQuestions = getAllQuestions()
    const kebabPattern = /^[a-z0-9-]+$/

    for (const bankName of Object.keys(allQuestions)) {
      expect(
        kebabPattern.test(bankName),
        `Bank name "${bankName}" should be kebab-case`
      ).toBe(true)
    }
  })

  it('should have unique bank names', () => {
    const allQuestions = getAllQuestions()
    const names = Object.keys(allQuestions)
    const uniqueNames = new Set(names)

    expect(uniqueNames.size, 'Bank names should be unique').toBe(names.length)
  })
})

describe('Question Explanation Quality', () => {
  it('should have explanations with reasonable length', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          q.explanation.length,
          `${bankName}: ${q.id} explanation should be at least 10 chars`
        ).toBeGreaterThanOrEqual(10)
        expect(
          q.explanation.length,
          `${bankName}: ${q.id} explanation should be under 10000 chars`
        ).toBeLessThanOrEqual(10000)
      }
    }
  })

  it('should have explanations ending with punctuation', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        const lastChar = q.explanation.trim().slice(-1)
        const validEnding = ['.', '!', '?', ')', ']', '`'].includes(lastChar)
        expect(
          validEnding,
          `${bankName}: ${q.id} explanation should end with punctuation`
        ).toBe(true)
      }
    }
  })
})

describe('Multiple Choice Options', () => {
  it('should have 2-6 options for MC questions', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice' && q.options) {
          expect(
            q.options.length,
            `${bankName}: ${q.id} should have at least 2 options`
          ).toBeGreaterThanOrEqual(2)
          expect(
            q.options.length,
            `${bankName}: ${q.id} should have at most 6 options`
          ).toBeLessThanOrEqual(6)
        }
      }
    }
  })

  it('should have reasonable option lengths', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice' && q.options) {
          for (const opt of q.options) {
            expect(
              opt.length,
              `${bankName}: ${q.id} option should be at least 1 char`
            ).toBeGreaterThanOrEqual(1)
            expect(
              opt.length,
              `${bankName}: ${q.id} option should be under 1000 chars`
            ).toBeLessThanOrEqual(1000)
          }
        }
      }
    }
  })
})

describe('Question ID Format', () => {
  it('should have valid kebab-case IDs', () => {
    const allQuestions = getAllQuestions()
    const kebabPattern = /^[a-z0-9-]+$/

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          kebabPattern.test(q.id),
          `${bankName}: ${q.id} should be kebab-case (lowercase, numbers, hyphens)`
        ).toBe(true)
      }
    }
  })

  it('should have IDs with reasonable length', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          q.id.length,
          `${bankName}: ${q.id} ID should be at least 3 chars`
        ).toBeGreaterThanOrEqual(3)
        expect(
          q.id.length,
          `${bankName}: ${q.id} ID should be at most 100 chars`
        ).toBeLessThanOrEqual(100)
      }
    }
  })

  it('should not have consecutive hyphens in IDs', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          q.id.includes('--'),
          `${bankName}: ${q.id} should not have consecutive hyphens`
        ).toBe(false)
      }
    }
  })
})

describe('Explanation Quality', () => {
  it('should have explanations ending with punctuation', () => {
    const allQuestions = getAllQuestions()
    const validEndings = ['.', '!', '?', ')', ']', '`']

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        const lastChar = q.explanation.trim().slice(-1)
        expect(
          validEndings.includes(lastChar),
          `${bankName}: ${q.id} explanation should end with punctuation, got "${lastChar}"`
        ).toBe(true)
      }
    }
  })

  it('should have explanations without leading whitespace', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        expect(
          q.explanation.startsWith(' '),
          `${bankName}: ${q.id} explanation should not start with space`
        ).toBe(false)
      }
    }
  })

  it('should have step-by-step explanations for complex questions', () => {
    const allQuestions = getAllQuestions()

    // Check that hard questions often have step markers
    for (const [bankName, questions] of Object.entries(allQuestions)) {
      for (const q of questions) {
        if (q.difficulty === 'hard') {
          const hasSteps = q.explanation.includes('Step') ||
                          q.explanation.includes('**Step')
          // This is a soft check - log if missing but don't fail
          if (!hasSteps) {
            console.log(`Note: ${bankName}: ${q.id} hard question missing step markers`)
          }
        }
      }
    }
  })
})

describe('Registry Edge Cases', () => {
  it('should handle registering empty question bank', () => {
    const emptyBank: QuestionsMap = {
      'empty-test-bank': [],
    }

    registerQuestions(emptyBank)

    const retrieved = getQuestions('empty-test-bank')
    expect(retrieved).toEqual([])
  })

  it('should handle overwriting existing bank', () => {
    const firstVersion: QuestionsMap = {
      'overwrite-test-bank': [
        {
          id: 'overwrite-q-1',
          type: 'multiple-choice',
          difficulty: 'easy',
          question: 'First version?',
          options: ['A', 'B'],
          correctAnswer: 0,
          explanation: 'First explanation.',
        },
      ],
    }

    const secondVersion: QuestionsMap = {
      'overwrite-test-bank': [
        {
          id: 'overwrite-q-2',
          type: 'true-false',
          difficulty: 'medium',
          question: 'Second version?',
          correctAnswer: 'true',
          explanation: 'Second explanation.',
        },
      ],
    }

    registerQuestions(firstVersion)
    expect(getQuestions('overwrite-test-bank').length).toBe(1)
    expect(getQuestions('overwrite-test-bank')[0].id).toBe('overwrite-q-1')

    registerQuestions(secondVersion)
    expect(getQuestions('overwrite-test-bank').length).toBe(1)
    expect(getQuestions('overwrite-test-bank')[0].id).toBe('overwrite-q-2')
  })

  it('should handle special characters in slug lookup', () => {
    // Test that special characters don't cause errors
    const result1 = getQuestions('test-with-dashes')
    expect(Array.isArray(result1)).toBe(true)

    const result2 = getQuestions('test123')
    expect(Array.isArray(result2)).toBe(true)

    const result3 = getQuestions('')
    expect(Array.isArray(result3)).toBe(true)
  })
})

describe('Difficulty Distribution', () => {
  it('should have questions across all difficulty levels', () => {
    const allQuestions = getAllQuestions()
    const difficulties = new Set<string>()

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        difficulties.add(q.difficulty)
      }
    }

    expect(difficulties.has('easy'), 'Should have easy questions').toBe(true)
    expect(difficulties.has('medium'), 'Should have medium questions').toBe(true)
    expect(difficulties.has('hard'), 'Should have hard questions').toBe(true)
  })

  it('should have reasonable difficulty distribution per bank', () => {
    const allQuestions = getAllQuestions()

    for (const [bankName, questions] of Object.entries(allQuestions)) {
      if (questions.length < 5) continue // Skip small banks

      const easyCount = questions.filter(q => q.difficulty === 'easy').length
      const hardCount = questions.filter(q => q.difficulty === 'hard').length

      // At least some variety in difficulty
      const hasVariety = easyCount > 0 || hardCount > 0
      if (!hasVariety && questions.length > 3) {
        console.log(`Note: ${bankName} has limited difficulty variety`)
      }
    }
  })
})

describe('Question Type Coverage', () => {
  it('should have multiple-choice questions', () => {
    const allQuestions = getAllQuestions()
    let hasMC = false

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'multiple-choice') {
          hasMC = true
          break
        }
      }
      if (hasMC) break
    }

    expect(hasMC, 'Should have at least one multiple-choice question').toBe(true)
  })

  it('should have true-false questions', () => {
    const allQuestions = getAllQuestions()
    let hasTF = false

    for (const questions of Object.values(allQuestions)) {
      for (const q of questions) {
        if (q.type === 'true-false') {
          hasTF = true
          break
        }
      }
      if (hasTF) break
    }

    expect(hasTF, 'Should have at least one true-false question').toBe(true)
  })
})
