import { describe, expect, it } from "vitest";
import { getCourseBySlug } from "./course-data";
import { courses } from "./curriculum";
import { getQuestions } from "./questions";

describe("course-data", () => {
  it("hydrates registry-backed questions for courses that do not embed them inline", () => {
    const course = getCourseBySlug("karpathy-nn-zero-to-hero");
    const kp = course?.topics[0].knowledgePoints[0];

    expect(course).not.toBeNull();
    expect(kp?.questions?.length).toBeGreaterThan(0);
    expect(kp?.questions).toEqual(getQuestions(kp?.slug ?? ""));
  });

  it("preserves inline curriculum questions when they already exist", () => {
    const course = getCourseBySlug("rl-fundamentals");
    const sourceCourse = courses.find((entry) => entry.slug === "rl-fundamentals");

    expect(course).not.toBeNull();
    expect(course?.topics[0].knowledgePoints[0].questions?.length).toBeGreaterThan(0);
    expect(course?.topics[0].knowledgePoints[0].questions).toEqual(
      sourceCourse?.topics[0].knowledgePoints[0].questions,
    );
  });

  it("returns null for unknown slugs", () => {
    expect(getCourseBySlug("does-not-exist")).toBeNull();
  });
});
