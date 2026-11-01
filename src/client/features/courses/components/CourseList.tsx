import { Course } from "@/client/features/courses/types/course.types";
import CourseCard from "./CourseCard";

interface Props {
  courses: Course[];
}

export default function CourseList({ courses }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

