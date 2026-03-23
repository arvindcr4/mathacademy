import { courses, type Course } from "@/lib/curriculum";
import { getQuestions } from "@/lib/questions";

export function hydrateCourseQuestions(course: Course): Course {
  return {
    ...course,
    topics: course.topics.map((topic) => ({
      ...topic,
      knowledgePoints: topic.knowledgePoints.map((knowledgePoint) => ({
        ...knowledgePoint,
        questions:
          knowledgePoint.questions && knowledgePoint.questions.length > 0
            ? knowledgePoint.questions
            : getQuestions(knowledgePoint.slug),
      })),
    })),
  };
}

export function getCourseBySlug(slug: string): Course | null {
  const course = courses.find((entry) => entry.slug === slug);
  return course ? hydrateCourseQuestions(course) : null;
}
