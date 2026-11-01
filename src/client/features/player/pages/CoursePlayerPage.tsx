import { coursesData } from "@/data/courses.data";
import CourseBreadcrumbs from "@/client/features/player/components/CourseBreadcrumbs";
import CoursePlayerClient from "@/client/features/player/components/CoursePlayerClient";
import { Course } from "@/client/features/courses/types/course.types";

interface Props {
  courseId: string;
}

export default function CoursePlayerPage({ courseId }: Props) {
  // Data resolution happens on the server — no useEffect needed
  const course: Course =
    coursesData.find((c) => c.id === courseId) ?? coursesData[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-16">
      {/* Server-rendered: Breadcrumbs + Title */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CourseBreadcrumbs courseTitle={course.title} />
          <div className="py-2 pb-5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Client boundary starts here — all interactive content */}
      <CoursePlayerClient course={course} />
    </div>
  );
}
