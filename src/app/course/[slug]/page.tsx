import { courses } from "@/lib/curriculum";
import CourseClient from "./CourseClient";

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function CoursePage() {
  return <CourseClient />;
}
