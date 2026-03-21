import { describe, it, expect } from 'vitest'
import { courses, categories, type Question } from './curriculum'

describe('Curriculum Type Guards', () => {
  it('should have valid Question type structure', () => {
    const validQuestion: Question = {
      id: 'test-q-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Test question?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Test explanation.',
    }

    expect(validQuestion.type).toBe('multiple-choice')
    expect(validQuestion.difficulty).toBe('easy')
    expect(typeof validQuestion.correctAnswer).toBe('number')
  })

  it('should have valid true-false question structure', () => {
    const tfQuestion: Question = {
      id: 'test-tf-1',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Is this true?',
      correctAnswer: 'true',
      explanation: 'Yes it is.',
    }

    expect(tfQuestion.type).toBe('true-false')
    expect(['true', 'false']).toContain(tfQuestion.correctAnswer)
  })

  it('should have valid coding question structure', () => {
    const codingQuestion: Question = {
      id: 'test-code-1',
      type: 'coding',
      difficulty: 'hard',
      question: 'Write a function',
      correctAnswer: 'solution',
      explanation: 'Explanation here.',
      codeSnippet: 'def solve():',
      testCases: [
        { input: '1', output: '2' },
      ],
    }

    expect(codingQuestion.type).toBe('coding')
    expect(codingQuestion.codeSnippet).toBeDefined()
    expect(codingQuestion.testCases).toHaveLength(1)
  })
})

describe('Curriculum Lookup Functions', () => {
  it('should find course by slug', () => {
    const slug = courses[0].slug
    const found = courses.find(c => c.slug === slug)
    expect(found).toBeDefined()
    expect(found!.slug).toBe(slug)
  })

  it('should find topic by slug within course', () => {
    const course = courses[0]
    const topic = course.topics[0]
    const found = course.topics.find(t => t.slug === topic.slug)
    expect(found).toBeDefined()
  })

  it('should find knowledge point by slug within topic', () => {
    const course = courses[0]
    const topic = course.topics[0]
    const kp = topic.knowledgePoints[0]
    const found = topic.knowledgePoints.find(k => k.slug === kp.slug)
    expect(found).toBeDefined()
  })
})

describe('Curriculum Statistics', () => {
  it('should have total topics across all courses', () => {
    let totalTopics = 0
    for (const course of courses) {
      totalTopics += course.topics.length
    }
    expect(totalTopics).toBeGreaterThan(0)
  })

  it('should have total knowledge points across all courses', () => {
    let totalKPs = 0
    for (const course of courses) {
      for (const topic of course.topics) {
        totalKPs += topic.knowledgePoints.length
      }
    }
    expect(totalKPs).toBeGreaterThan(0)
  })

  it('should have courses per category mapping', () => {
    const coursesPerCategory = new Map<string, number>()
    for (const course of courses) {
      const count = coursesPerCategory.get(course.category) || 0
      coursesPerCategory.set(course.category, count + 1)
    }

    // All categories should have at least one course
    for (const cat of categories) {
      expect(coursesPerCategory.has(cat.id)).toBe(true)
    }
  })
})

describe('Curriculum Data Integrity', () => {
  it('should have consistent topicCount field', () => {
    for (const course of courses) {
      expect(course.topicCount).toBe(course.topics.length)
    }
  })

  it('should have valid hex colors', () => {
    const hexColorPattern = /^#[0-9A-Fa-f]{6}$/
    for (const course of courses) {
      expect(hexColorPattern.test(course.color)).toBe(true)
    }
  })

  it('should have valid slugs (kebab-case)', () => {
    const kebabPattern = /^[a-z0-9-]+$/
    for (const course of courses) {
      expect(kebabPattern.test(course.slug)).toBe(true)
      for (const topic of course.topics) {
        expect(kebabPattern.test(topic.slug)).toBe(true)
        for (const kp of topic.knowledgePoints) {
          expect(kebabPattern.test(kp.slug)).toBe(true)
        }
      }
    }
  })

  it('should have unique topic slugs within each course', () => {
    for (const course of courses) {
      const slugs = course.topics.map(t => t.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    }
  })

  it('should have unique KP slugs within each topic', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        const slugs = topic.knowledgePoints.map(kp => kp.slug)
        const uniqueSlugs = new Set(slugs)
        expect(uniqueSlugs.size).toBe(slugs.length)
      }
    }
  })
})

describe('Course Properties', () => {
  it('should have positive estimated hours', () => {
    for (const course of courses) {
      expect(course.estimatedHours).toBeGreaterThan(0)
    }
  })

  it('should have at least one topic per course', () => {
    for (const course of courses) {
      expect(course.topics.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('should have at least one KP per topic', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        expect(topic.knowledgePoints.length).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('should have non-empty descriptions', () => {
    for (const course of courses) {
      expect(course.description.trim().length).toBeGreaterThan(10)
    }
  })
})
