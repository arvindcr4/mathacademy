# Autoresearch: LearnNova Style Lessons

## Objective
Populate the LearnNova curriculum with comprehensive knowledge points (lesson content) for Coding Interview Prep and Reinforcement Learning courses. The platform renders lesson content from `src/lib/curriculum.ts` (metadata) and `src/app/course/[slug]/page.tsx` (exampleProblems dictionary).

## Metrics
- **Primary**: knowledge_points_added (count, higher is better)
- **Secondary**: topics_with_content (count), topics_fully_covered (count)

## How to Run
`./autoresearch.sh` — outputs `METRIC name=number` lines.

## Files in Scope
- `src/lib/curriculum.ts` — Course/Topic/KnowledgePoint metadata definitions
- `src/app/course/[slug]/page.tsx` — Example problems and practice content dictionary

## Off Limits
- Database schema (`prisma/schema.prisma`)
- Component files (`src/components/`)
- Dashboard and home pages

## Constraints
- Keep knowledge point slugs kebab-case (e.g., `two-sum`, `bellman-optimality`)
- Each knowledge point needs: id, slug, name in curriculum.ts
- Each knowledge point slug in page.tsx needs at least 1 practice problem with question, answer, hints
- Topic descriptions must remain meaningful and accurate

## What's Been Tried
_(empty — fresh start)_
