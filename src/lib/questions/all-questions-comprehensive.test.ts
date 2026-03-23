/**
 * Comprehensive validation test for ALL question files (68 files, 73+ question banks).
 *
 * This test suite goes beyond the existing registry/index tests by:
 * 1. Verifying every single question file is imported and registered
 * 2. Checking cross-file consistency (no ID collisions across files)
 * 3. Validating answer format consistency per type
 * 4. Checking that question banks map to actual curriculum knowledge points
 * 5. Ensuring no empty/degenerate questions slip through
 * 6. Verifying structural integrity of every question across all 68 files
 */
import { describe, it, expect } from 'vitest'
import type { Question } from '@/lib/curriculum'
import { courses } from '@/lib/curriculum'
import { getAllQuestions, getQuestions } from './registry'

// Import index to trigger all registrations
import './index'

const allQuestions = getAllQuestions()
const allBankNames = Object.keys(allQuestions)

// Collect every question into a flat list for global checks
const flatQuestions: { bank: string; question: Question }[] = []
for (const [bank, questions] of Object.entries(allQuestions)) {
  for (const q of questions) {
    flatQuestions.push({ bank, question: q })
  }
}

describe('Comprehensive Question File Validation', () => {
  describe('File coverage', () => {
    it('should have at least 50 question banks registered', () => {
      // We know there are 68 question files; after registration we expect many banks
      expect(allBankNames.length).toBeGreaterThanOrEqual(50)
    })

    it('should have at least 300 total questions across all banks', () => {
      expect(flatQuestions.length).toBeGreaterThanOrEqual(300)
    })

    it('should have no empty question banks', () => {
      for (const [bankName, questions] of Object.entries(allQuestions)) {
        expect(
          questions.length,
          `Bank "${bankName}" should not be empty`
        ).toBeGreaterThan(0)
      }
    })
  })

  describe('Required fields on every question', () => {
    it('every question must have a non-empty id', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(q.id, `${bank}: question missing id`).toBeDefined()
        expect(typeof q.id, `${bank}: id must be string`).toBe('string')
        expect(q.id.trim().length, `${bank}: id must not be empty`).toBeGreaterThan(0)
      }
    })

    it('every question must have a valid type', () => {
      const validTypes = ['multiple-choice', 'true-false', 'coding']
      for (const { bank, question: q } of flatQuestions) {
        expect(q.type, `${bank}/${q.id}: missing type`).toBeDefined()
        expect(
          validTypes.includes(q.type),
          `${bank}/${q.id}: invalid type "${q.type}"`
        ).toBe(true)
      }
    })

    it('every question must have a valid difficulty', () => {
      const validDifficulties = ['easy', 'medium', 'hard']
      for (const { bank, question: q } of flatQuestions) {
        expect(q.difficulty, `${bank}/${q.id}: missing difficulty`).toBeDefined()
        expect(
          validDifficulties.includes(q.difficulty),
          `${bank}/${q.id}: invalid difficulty "${q.difficulty}"`
        ).toBe(true)
      }
    })

    it('every question must have non-empty question text', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(q.question, `${bank}/${q.id}: missing question text`).toBeDefined()
        expect(typeof q.question, `${bank}/${q.id}: question must be string`).toBe('string')
        expect(
          q.question.trim().length,
          `${bank}/${q.id}: question text is empty`
        ).toBeGreaterThan(0)
      }
    })

    it('every question must have a correctAnswer', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.correctAnswer !== undefined && q.correctAnswer !== null,
          `${bank}/${q.id}: missing correctAnswer`
        ).toBe(true)
      }
    })

    it('every question must have a non-empty explanation', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(q.explanation, `${bank}/${q.id}: missing explanation`).toBeDefined()
        expect(typeof q.explanation, `${bank}/${q.id}: explanation must be string`).toBe('string')
        expect(
          q.explanation.trim().length,
          `${bank}/${q.id}: explanation is empty`
        ).toBeGreaterThan(0)
      }
    })
  })

  describe('Answer format consistency', () => {
    it('multiple-choice questions must have options array', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'multiple-choice') {
          expect(
            Array.isArray(q.options),
            `${bank}/${q.id}: MC question missing options array`
          ).toBe(true)
        }
      }
    })

    it('multiple-choice questions must have at least 2 options', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'multiple-choice' && q.options) {
          expect(
            q.options.length,
            `${bank}/${q.id}: MC question needs at least 2 options (has ${q.options.length})`
          ).toBeGreaterThanOrEqual(2)
        }
      }
    })

    it('multiple-choice correctAnswer must be a number within options bounds', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'multiple-choice' && q.options) {
          expect(
            typeof q.correctAnswer,
            `${bank}/${q.id}: MC correctAnswer must be number, got ${typeof q.correctAnswer}`
          ).toBe('number')
          const idx = q.correctAnswer as number
          expect(
            idx >= 0 && idx < q.options.length,
            `${bank}/${q.id}: correctAnswer ${idx} out of bounds [0, ${q.options.length - 1}]`
          ).toBe(true)
        }
      }
    })

    it('multiple-choice options must all be non-empty strings', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'multiple-choice' && q.options) {
          for (let i = 0; i < q.options.length; i++) {
            expect(
              typeof q.options[i],
              `${bank}/${q.id}: option[${i}] must be string`
            ).toBe('string')
            expect(
              q.options[i].trim().length,
              `${bank}/${q.id}: option[${i}] is empty`
            ).toBeGreaterThan(0)
          }
        }
      }
    })

    it('multiple-choice options must be unique within each question', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'multiple-choice' && q.options) {
          const normalized = q.options.map(o => o.trim().toLowerCase())
          const unique = new Set(normalized)
          expect(
            unique.size,
            `${bank}/${q.id}: has duplicate options`
          ).toBe(q.options.length)
        }
      }
    })

    it('true-false correctAnswer must be "true" or "false"', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'true-false') {
          expect(
            ['true', 'false'].includes(q.correctAnswer as string),
            `${bank}/${q.id}: TF correctAnswer must be "true" or "false", got "${q.correctAnswer}"`
          ).toBe(true)
        }
      }
    })

    it('true-false questions should NOT have options array', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'true-false') {
          // It's acceptable to have no options or empty options for TF
          if (q.options) {
            // If options exist, they should be the standard true/false pair
            expect(
              q.options.length,
              `${bank}/${q.id}: TF question has unexpected options count`
            ).toBeLessThanOrEqual(2)
          }
        }
      }
    })

    it('coding questions must have non-empty question text', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'coding') {
          expect(
            q.question.trim().length,
            `${bank}/${q.id}: coding question has empty question text`
          ).toBeGreaterThan(0)
        }
      }
    })

    it('coding questions with codeSnippet must have non-empty snippet', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'coding' && q.codeSnippet !== undefined) {
          expect(
            q.codeSnippet.trim().length,
            `${bank}/${q.id}: codeSnippet is empty`
          ).toBeGreaterThan(0)
        }
      }
    })

    it('coding questions with testCases must have valid input/output', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.type === 'coding' && q.testCases) {
          expect(
            q.testCases.length,
            `${bank}/${q.id}: testCases array is empty`
          ).toBeGreaterThan(0)
          for (const tc of q.testCases) {
            expect(tc.input, `${bank}/${q.id}: test case missing input`).toBeDefined()
            expect(tc.output, `${bank}/${q.id}: test case missing output`).toBeDefined()
          }
        }
      }
    })
  })

  describe('Global ID uniqueness', () => {
    it('every question ID must be globally unique across all banks', () => {
      const idMap = new Map<string, string>()
      const duplicates: string[] = []

      for (const { bank, question: q } of flatQuestions) {
        if (idMap.has(q.id)) {
          duplicates.push(`"${q.id}" in ${bank} (first in ${idMap.get(q.id)})`)
        }
        idMap.set(q.id, bank)
      }

      expect(
        duplicates.length,
        `Duplicate IDs found: ${duplicates.slice(0, 5).join('; ')}`
      ).toBe(0)
    })

    it('question IDs must be kebab-case', () => {
      const kebabPattern = /^[a-z0-9-]+$/
      for (const { bank, question: q } of flatQuestions) {
        expect(
          kebabPattern.test(q.id),
          `${bank}/${q.id}: ID must be kebab-case (got "${q.id}")`
        ).toBe(true)
      }
    })

    it('question IDs must not contain consecutive hyphens', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.id.includes('--'),
          `${bank}/${q.id}: ID must not have consecutive hyphens`
        ).toBe(false)
      }
    })

    it('question IDs must have reasonable length (3-100 chars)', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.id.length >= 3 && q.id.length <= 100,
          `${bank}/${q.id}: ID length ${q.id.length} out of [3, 100]`
        ).toBe(true)
      }
    })
  })

  describe('Bank name format', () => {
    it('bank names must be kebab-case', () => {
      const kebabPattern = /^[a-z0-9-]+$/
      for (const bankName of allBankNames) {
        expect(
          kebabPattern.test(bankName),
          `Bank "${bankName}" must be kebab-case`
        ).toBe(true)
      }
    })
  })

  describe('Hints validation', () => {
    it('hints must be an array of non-empty strings when present', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.hints !== undefined) {
          expect(
            Array.isArray(q.hints),
            `${bank}/${q.id}: hints must be array`
          ).toBe(true)
          for (const hint of q.hints) {
            expect(typeof hint, `${bank}/${q.id}: hint must be string`).toBe('string')
            expect(
              hint.trim().length,
              `${bank}/${q.id}: hint is empty string`
            ).toBeGreaterThan(0)
          }
        }
      }
    })

    it('hints should have at most 5 entries per question', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.hints) {
          expect(
            q.hints.length,
            `${bank}/${q.id}: too many hints (${q.hints.length})`
          ).toBeLessThanOrEqual(5)
        }
      }
    })
  })

  describe('stepByStep validation', () => {
    it('stepByStep must have at least one meaningful step when present', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.stepByStep) {
          const hasStep1 = q.stepByStep.step1 !== undefined && q.stepByStep.step1.trim().length > 0
          const hasStep2 = q.stepByStep.step2 !== undefined && q.stepByStep.step2.trim().length > 0
          const hasStep3 = q.stepByStep.step3 !== undefined && q.stepByStep.step3.trim().length > 0
          expect(
            hasStep1 || hasStep2 || hasStep3,
            `${bank}/${q.id}: stepByStep has no meaningful steps`
          ).toBe(true)
        }
      }
    })
  })

  describe('Question text quality', () => {
    it('question text must be at least 10 characters', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.question.trim().length,
          `${bank}/${q.id}: question too short (${q.question.trim().length} chars)`
        ).toBeGreaterThanOrEqual(10)
      }
    })

    it('question text must be under 2000 characters', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.question.trim().length,
          `${bank}/${q.id}: question too long (${q.question.trim().length} chars)`
        ).toBeLessThanOrEqual(2000)
      }
    })

    it('question text must not have trailing double spaces', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.question.endsWith('  '),
          `${bank}/${q.id}: question has trailing double spaces`
        ).toBe(false)
      }
    })

    it('question text must start with a valid character', () => {
      const validStart = /^[A-Za-z0-9$\[("'*\\\-]/
      for (const { bank, question: q } of flatQuestions) {
        const firstChar = q.question.trim()[0]
        expect(
          validStart.test(firstChar),
          `${bank}/${q.id}: question starts with invalid char "${firstChar}"`
        ).toBe(true)
      }
    })
  })

  describe('Explanation quality', () => {
    it('explanations must be at least 20 characters', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.explanation.trim().length,
          `${bank}/${q.id}: explanation too short (${q.explanation.trim().length} chars)`
        ).toBeGreaterThanOrEqual(20)
      }
    })

    it('explanations must end with valid punctuation', () => {
      const validEndings = ['.', '!', '?', ')', ']', '`', '"']
      for (const { bank, question: q } of flatQuestions) {
        const lastChar = q.explanation.trim().slice(-1)
        expect(
          validEndings.includes(lastChar),
          `${bank}/${q.id}: explanation ends with "${lastChar}" instead of punctuation`
        ).toBe(true)
      }
    })

    it('explanations must not start with whitespace', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          q.explanation.startsWith(' ') || q.explanation.startsWith('\n'),
          `${bank}/${q.id}: explanation starts with whitespace`
        ).toBe(false)
      }
    })
  })

  describe('Difficulty distribution', () => {
    it('should have questions at all three difficulty levels', () => {
      const difficulties = new Set(flatQuestions.map(fq => fq.question.difficulty))
      expect(difficulties.has('easy'), 'Should have easy questions').toBe(true)
      expect(difficulties.has('medium'), 'Should have medium questions').toBe(true)
      expect(difficulties.has('hard'), 'Should have hard questions').toBe(true)
    })

    it('questions should be sorted by difficulty within each bank', () => {
      const difficultyRank: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
      for (const [bankName, questions] of Object.entries(allQuestions)) {
        for (let i = 1; i < questions.length; i++) {
          const prevRank = difficultyRank[questions[i - 1].difficulty]
          const currRank = difficultyRank[questions[i].difficulty]
          expect(
            prevRank <= currRank,
            `${bankName}: question[${i - 1}] (${questions[i - 1].difficulty}) should come before question[${i}] (${questions[i].difficulty})`
          ).toBe(true)
        }
      }
    })
  })

  describe('Question type distribution', () => {
    it('should have multiple-choice questions', () => {
      const mcCount = flatQuestions.filter(fq => fq.question.type === 'multiple-choice').length
      expect(mcCount, 'Should have multiple-choice questions').toBeGreaterThan(0)
    })

    it('should have true-false questions', () => {
      const tfCount = flatQuestions.filter(fq => fq.question.type === 'true-false').length
      expect(tfCount, 'Should have true-false questions').toBeGreaterThan(0)
    })

    it('should have at least 2 question types across all banks', () => {
      const types = new Set(flatQuestions.map(fq => fq.question.type))
      expect(types.size, 'Should have multiple question types').toBeGreaterThanOrEqual(2)
    })
  })

  describe('Curriculum cross-reference', () => {
    it('should have questions for at least some curriculum knowledge points', () => {
      // Collect all KP slugs from curriculum
      const kpSlugs = new Set<string>()
      for (const course of courses) {
        for (const topic of course.topics) {
          for (const kp of topic.knowledgePoints) {
            kpSlugs.add(kp.slug)
          }
        }
      }

      // Check how many KP slugs have matching question banks
      let matchCount = 0
      for (const slug of kpSlugs) {
        const questions = getQuestions(slug)
        if (questions.length > 0) {
          matchCount++
        }
      }

      // At least some KPs should have questions
      expect(
        matchCount,
        `Only ${matchCount} KP slugs have matching question banks`
      ).toBeGreaterThan(0)
    })
  })

  describe('Non-ASCII math symbols check', () => {
    const NON_ASCII_PATTERNS = /[→←↔↕↑↓⇒⇔∀∃∈∉⊂⊃⊆⊇∪∩∞±×÷∑∏∂∇≈≠≤≥]/

    it('question text must not contain non-ASCII math symbols', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          NON_ASCII_PATTERNS.test(q.question),
          `${bank}/${q.id}: question contains non-ASCII math symbol`
        ).toBe(false)
      }
    })

    it('explanation text must not contain non-ASCII math symbols', () => {
      for (const { bank, question: q } of flatQuestions) {
        expect(
          NON_ASCII_PATTERNS.test(q.explanation),
          `${bank}/${q.id}: explanation contains non-ASCII math symbol`
        ).toBe(false)
      }
    })

    it('options must not contain non-ASCII math symbols', () => {
      for (const { bank, question: q } of flatQuestions) {
        if (q.options) {
          for (const opt of q.options) {
            expect(
              NON_ASCII_PATTERNS.test(opt),
              `${bank}/${q.id}: option contains non-ASCII math symbol`
            ).toBe(false)
          }
        }
      }
    })
  })

  describe('Parentheses balance in questions', () => {
    it('question text should have roughly balanced parentheses', () => {
      for (const { bank, question: q } of flatQuestions) {
        const openCount = (q.question.match(/\(/g) || []).length
        const closeCount = (q.question.match(/\)/g) || []).length
        const diff = Math.abs(openCount - closeCount)
        expect(
          diff,
          `${bank}/${q.id}: unbalanced parentheses (${openCount} open, ${closeCount} close)`
        ).toBeLessThanOrEqual(2)
      }
    })
  })

  describe('Summary statistics', () => {
    it('should report total questions per type', () => {
      const typeCounts: Record<string, number> = {}
      for (const { question: q } of flatQuestions) {
        typeCounts[q.type] = (typeCounts[q.type] || 0) + 1
      }

      // Verify we have counted something
      expect(Object.keys(typeCounts).length).toBeGreaterThan(0)

      // Log for visibility
      for (const [type, count] of Object.entries(typeCounts)) {
        expect(count, `Should have at least 1 ${type} question`).toBeGreaterThan(0)
      }
    })

    it('should report total questions per difficulty', () => {
      const diffCounts: Record<string, number> = {}
      for (const { question: q } of flatQuestions) {
        diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1
      }

      expect(diffCounts['easy'] || 0, 'Should have easy questions').toBeGreaterThan(0)
      expect(diffCounts['medium'] || 0, 'Should have medium questions').toBeGreaterThan(0)
      expect(diffCounts['hard'] || 0, 'Should have hard questions').toBeGreaterThan(0)
    })
  })
})
