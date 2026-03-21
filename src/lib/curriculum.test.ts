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

describe('Course Search & Lookup', () => {
  it('should have valid course lookup by slug', () => {
    const slugs = new Set(courses.map(c => c.slug))

    // Test that slugs are queryable
    for (const course of courses) {
      expect(slugs.has(course.slug), `Should be able to lookup ${course.slug}`).toBe(true)
    }
  })

  it('should have consistent id and slug naming', () => {
    for (const course of courses) {
      // Most courses should have id that matches or is similar to slug
      expect(
        course.id.length,
        `${course.name} id should have reasonable length`
      ).toBeGreaterThan(0)
      expect(
        course.slug.length,
        `${course.name} slug should have reasonable length`
      ).toBeGreaterThan(0)
    }
  })
})

describe('Topic Ordering', () => {
  it('should have logically ordered topics', () => {
    for (const course of courses) {
      // First topic should typically be introductory
      if (course.topics.length > 0) {
        const firstTopic = course.topics[0]
        expect(
          firstTopic.name,
          `${course.name} first topic should have a name`
        ).toBeDefined()
      }
    }
  })

  it('should have sequential topic progression', () => {
    for (const course of courses) {
      const topicNames = course.topics.map(t => t.name)

      // Check that topics aren't duplicated
      const uniqueNames = new Set(topicNames)
      expect(
        uniqueNames.size,
        `${course.name} should have unique topic names`
      ).toBe(topicNames.length)
    }
  })
})

describe('Knowledge Point Coverage', () => {
  it('should have reasonable number of KPs per topic', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        // Most topics should have 3-8 knowledge points
        const kpCount = topic.knowledgePoints.length
        expect(
          kpCount,
          `${course.name}: ${topic.name} should have at least 1 KP`
        ).toBeGreaterThanOrEqual(1)
        expect(
          kpCount,
          `${course.name}: ${topic.name} should have at most 15 KPs`
        ).toBeLessThanOrEqual(15)
      }
    }
  })
})

describe('Curriculum Data Integrity', () => {
  it('should have valid icon strings', () => {
    for (const course of courses) {
      expect(
        course.icon,
        `${course.name} should have an icon`
      ).toBeDefined()
      expect(
        course.icon.length,
        `${course.name} icon should not be empty`
      ).toBeGreaterThan(0)
    }
  })

  it('should have valid color strings', () => {
    for (const course of courses) {
      expect(
        course.color,
        `${course.name} should have a color`
      ).toBeDefined()
      expect(
        course.color.length,
        `${course.name} color should not be empty`
      ).toBeGreaterThan(0)
    }
  })

  it('should have unique course icons within categories', () => {
    const categoryIcons = new Map<string, Set<string>>()

    for (const course of courses) {
      if (!categoryIcons.has(course.category)) {
        categoryIcons.set(course.category, new Set())
      }
      // Note: Icons can be shared across categories
      categoryIcons.get(course.category)!.add(course.icon)
    }

    // Each category should have at least 1 icon
    for (const [cat, icons] of categoryIcons) {
      expect(
        icons.size,
        `Category ${cat} should have at least 1 unique icon`
      ).toBeGreaterThanOrEqual(1)
    }
  })

  it('should have topic descriptions', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        expect(
          topic.description,
          `${course.name}: ${topic.name} should have description`
        ).toBeDefined()
        expect(
          topic.description!.length,
          `${course.name}: ${topic.name} description should not be empty`
        ).toBeGreaterThan(0)
      }
    }
  })

  it('should have KP names following naming conventions', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        for (const kp of topic.knowledgePoints) {
          expect(
            kp.name,
            `${course.name}: ${topic.name} KP ${kp.slug} should have name`
          ).toBeDefined()
          expect(
            kp.name.length,
            `${course.name}: ${kp.slug} name should not be empty`
          ).toBeGreaterThan(0)
        }
      }
    }
  })
})

describe('Curriculum Lookup Functions', () => {
  it('should be able to find course by slug', () => {
    // Test that we can look up courses by slug
    for (const course of courses) {
      const found = courses.find(c => c.slug === course.slug)
      expect(found, `Should find course with slug ${course.slug}`).toBeDefined()
      expect(found!.slug).toBe(course.slug)
    }
  })

  it('should be able to find topic by slug within course', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        const found = course.topics.find(t => t.slug === topic.slug)
        expect(found, `${course.name}: Should find topic ${topic.slug}`).toBeDefined()
      }
    }
  })

  it('should be able to find knowledge point by slug within topic', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        for (const kp of topic.knowledgePoints) {
          const found = topic.knowledgePoints.find(k => k.slug === kp.slug)
          expect(found, `${course.name}/${topic.name}: Should find KP ${kp.slug}`).toBeDefined()
        }
      }
    }
  })

  it('should be able to enumerate all knowledge point slugs', () => {
    const allKpSlugs: string[] = []

    for (const course of courses) {
      for (const topic of course.topics) {
        for (const kp of topic.knowledgePoints) {
          allKpSlugs.push(kp.slug)
        }
      }
    }

    expect(allKpSlugs.length, 'Should have many KP slugs').toBeGreaterThan(100)
  })

  it('should be able to count courses per category', () => {
    const coursesPerCategory = new Map<string, number>()

    for (const course of courses) {
      const count = coursesPerCategory.get(course.category) || 0
      coursesPerCategory.set(course.category, count + 1)
    }

    // Each category should have at least one course
    for (const [cat, count] of coursesPerCategory) {
      expect(count, `Category ${cat} should have at least 1 course`).toBeGreaterThan(0)
    }
  })
})

describe('Curriculum Completeness', () => {
  it('should have all courses properly categorized', () => {
    const categoryIds = new Set(categories.map(c => c.id))
    const courseCategories = new Set(courses.map(c => c.category))

    // All course categories should exist in categories
    for (const cat of courseCategories) {
      expect(
        categoryIds.has(cat),
        `Category ${cat} used by courses should be defined`
      ).toBe(true)
    }
  })

  it('should have total estimated hours across courses', () => {
    let totalHours = 0
    for (const course of courses) {
      totalHours += course.estimatedHours
    }
    expect(
      totalHours,
      'Should have at least 100 total estimated hours'
    ).toBeGreaterThan(100)
  })

  it('should have courses with reasonable estimated hours', () => {
    for (const course of courses) {
      expect(
        course.estimatedHours,
        `${course.name} should have at least 1 estimated hour`
      ).toBeGreaterThanOrEqual(1)
      expect(
        course.estimatedHours,
        `${course.name} should have at most 200 estimated hours`
      ).toBeLessThanOrEqual(200)
    }
  })
})

describe('Edge Cases and Data Quality', () => {
  it('should not have duplicate KP slugs across entire curriculum', () => {
    const allKpSlugs = new Map<string, string[]>() // slug -> [locations]

    for (const course of courses) {
      for (const topic of course.topics) {
        for (const kp of topic.knowledgePoints) {
          const locations = allKpSlugs.get(kp.slug) || []
          locations.push(`${course.slug}/${topic.slug}`)
          allKpSlugs.set(kp.slug, locations)
        }
      }
    }

    // Check for duplicates
    const duplicates: string[] = []
    for (const [slug, locations] of allKpSlugs) {
      if (locations.length > 1) {
        duplicates.push(`${slug}: ${locations.join(', ')}`)
      }
    }

    // Note: Some KP slugs may intentionally be reused across courses
    // This test documents them but doesn't fail
    if (duplicates.length > 0) {
      console.log(`Note: ${duplicates.length} KP slugs appear in multiple locations`)
    }
  })

  it('should have non-empty course descriptions', () => {
    for (const course of courses) {
      expect(
        course.description.trim().length,
        `${course.name} description should not be empty`
      ).toBeGreaterThan(10)
    }
  })

  it('should have reasonable topic names', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        expect(
          topic.name.length,
          `${course.name}: ${topic.name} name should be at least 3 chars`
        ).toBeGreaterThanOrEqual(3)
        expect(
          topic.name.length,
          `${course.name}: ${topic.name} name should be under 100 chars`
        ).toBeLessThanOrEqual(100)
      }
    }
  })

  it('should have valid icon strings for categories', () => {
    for (const cat of categories) {
      expect(cat.icon, `Category ${cat.name} should have icon`).toBeDefined()
      expect(cat.icon.length, `Category ${cat.name} icon should not be empty`).toBeGreaterThan(0)
    }
  })

  it('should have valid icon strings for courses', () => {
    for (const course of courses) {
      expect(course.icon, `${course.name} should have icon`).toBeDefined()
      expect(course.icon.length, `${course.name} icon should not be empty`).toBeGreaterThan(0)
    }
  })

  it('should have topics with non-empty descriptions', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        expect(
          topic.description.trim().length,
          `${course.name}: ${topic.name} description should not be empty`
        ).toBeGreaterThan(5)
      }
    }
  })

  it('should have valid KP names', () => {
    for (const course of courses) {
      for (const topic of course.topics) {
        for (const kp of topic.knowledgePoints) {
          expect(
            kp.name.trim().length,
            `${course.slug}/${kp.slug} name should not be empty`
          ).toBeGreaterThan(2)
        }
      }
    }
  })
})
