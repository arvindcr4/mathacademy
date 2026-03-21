import { describe, it, expect } from 'vitest'
import { courses, categories } from './curriculum'

describe('Curriculum Data', () => {
  describe('Categories', () => {
    it('should have categories defined', () => {
      expect(categories).toBeDefined()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('should have valid category structure', () => {
      for (const cat of categories) {
        expect(cat.id, 'Category should have id').toBeDefined()
        expect(cat.name, 'Category should have name').toBeDefined()
        expect(cat.id.length, 'Category ID should not be empty').toBeGreaterThan(0)
      }
    })

    it('should have unique category IDs', () => {
      const ids = categories.map(c => c.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size, 'Category IDs should be unique').toBe(ids.length)
    })
  })

  describe('Courses', () => {
    it('should have courses defined', () => {
      expect(courses).toBeDefined()
      expect(Array.isArray(courses)).toBe(true)
      expect(courses.length).toBeGreaterThan(0)
    })

    it('should have valid course structure', () => {
      for (const course of courses) {
        expect(course.id, `${course.name} should have id`).toBeDefined()
        expect(course.slug, `${course.name} should have slug`).toBeDefined()
        expect(course.name, `${course.name} should have name`).toBeDefined()
        expect(course.description, `${course.name} should have description`).toBeDefined()
        expect(course.category, `${course.name} should have category`).toBeDefined()
        expect(course.topics, `${course.name} should have topics array`).toBeDefined()
        expect(Array.isArray(course.topics), `${course.name} topics should be array`).toBe(true)
      }
    })

    it('should have unique course IDs', () => {
      const ids = courses.map(c => c.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size, 'Course IDs should be unique').toBe(ids.length)
    })

    it('should have unique course slugs', () => {
      const slugs = courses.map(c => c.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size, 'Course slugs should be unique').toBe(slugs.length)
    })

    it('should have valid category references', () => {
      const categoryIds = new Set(categories.map(c => c.id))

      for (const course of courses) {
        expect(
          categoryIds.has(course.category),
          `${course.name} has invalid category: ${course.category}`
        ).toBe(true)
      }
    })

    it('should have valid topic counts', () => {
      for (const course of courses) {
        expect(
          course.topicCount,
          `${course.name} topicCount should match actual topics`
        ).toBe(course.topics.length)
      }
    })

    it('should have positive estimated hours', () => {
      for (const course of courses) {
        expect(
          course.estimatedHours,
          `${course.name} should have positive estimatedHours`
        ).toBeGreaterThan(0)
      }
    })

    it('should have valid slug format (kebab-case)', () => {
      const kebabPattern = /^[a-z0-9-]+$/

      for (const course of courses) {
        expect(
          kebabPattern.test(course.slug),
          `${course.name} slug "${course.slug}" should be kebab-case`
        ).toBe(true)
      }
    })
  })

  describe('Topics', () => {
    it('should have valid topic structure', () => {
      for (const course of courses) {
        for (const topic of course.topics) {
          expect(topic.id, `${course.name}: ${topic.name} should have id`).toBeDefined()
          expect(topic.slug, `${course.name}: ${topic.name} should have slug`).toBeDefined()
          expect(topic.name, `${course.name}: ${topic.name} should have name`).toBeDefined()
          expect(topic.knowledgePoints, `${course.name}: ${topic.name} should have knowledgePoints`).toBeDefined()
          expect(Array.isArray(topic.knowledgePoints), 'knowledgePoints should be array').toBe(true)
        }
      }
    })

    it('should have unique topic IDs within each course', () => {
      for (const course of courses) {
        const ids = course.topics.map(t => t.id)
        const uniqueIds = new Set(ids)
        expect(
          uniqueIds.size,
          `${course.name} should have unique topic IDs`
        ).toBe(ids.length)
      }
    })

    it('should have unique topic slugs within each course', () => {
      for (const course of courses) {
        const slugs = course.topics.map(t => t.slug)
        const uniqueSlugs = new Set(slugs)
        expect(
          uniqueSlugs.size,
          `${course.name} should have unique topic slugs`
        ).toBe(slugs.length)
      }
    })

    it('should have at least one knowledge point per topic', () => {
      for (const course of courses) {
        for (const topic of course.topics) {
          expect(
            topic.knowledgePoints.length,
            `${course.name}: ${topic.name} should have at least one knowledge point`
          ).toBeGreaterThan(0)
        }
      }
    })
  })

  describe('Knowledge Points', () => {
    it('should have valid knowledge point structure', () => {
      for (const course of courses) {
        for (const topic of course.topics) {
          for (const kp of topic.knowledgePoints) {
            expect(kp.id, `${topic.name}: KP should have id`).toBeDefined()
            expect(kp.slug, `${topic.name}: KP should have slug`).toBeDefined()
            expect(kp.name, `${topic.name}: KP should have name`).toBeDefined()
          }
        }
      }
    })

    it('should have unique knowledge point IDs within each topic', () => {
      for (const course of courses) {
        for (const topic of course.topics) {
          const ids = topic.knowledgePoints.map(kp => kp.id)
          const uniqueIds = new Set(ids)
          expect(
            uniqueIds.size,
            `${course.name}: ${topic.name} should have unique KP IDs`
          ).toBe(ids.length)
        }
      }
    })

    it('should have unique knowledge point slugs within each topic', () => {
      for (const course of courses) {
        for (const topic of course.topics) {
          const slugs = topic.knowledgePoints.map(kp => kp.slug)
          const uniqueSlugs = new Set(slugs)
          expect(
            uniqueSlugs.size,
            `${course.name}: ${topic.name} should have unique KP slugs`
          ).toBe(slugs.length)
        }
      }
    })

    it('should have valid slug format for knowledge points', () => {
      const kebabPattern = /^[a-z0-9-]+$/

      for (const course of courses) {
        for (const topic of course.topics) {
          for (const kp of topic.knowledgePoints) {
            expect(
              kebabPattern.test(kp.slug),
              `${course.name}: ${topic.name} KP slug "${kp.slug}" should be kebab-case`
            ).toBe(true)
          }
        }
      }
    })
  })
})

describe('Course Statistics', () => {
  it('should have reasonable course count', () => {
    expect(courses.length, 'Should have at least 5 courses').toBeGreaterThanOrEqual(5)
  })

  it('should have reasonable topics per course', () => {
    for (const course of courses) {
      expect(
        course.topics.length,
        `${course.name} should have at least 1 topic`
      ).toBeGreaterThanOrEqual(1)
    }
  })

  it('should have total knowledge points across courses', () => {
    let totalKPs = 0
    for (const course of courses) {
      for (const topic of course.topics) {
        totalKPs += topic.knowledgePoints.length
      }
    }
    expect(totalKPs, 'Should have at least 20 total knowledge points').toBeGreaterThan(20)
  })
})
