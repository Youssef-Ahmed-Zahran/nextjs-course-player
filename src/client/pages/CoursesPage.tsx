import { coursesData } from "@/data/courses.data";
import CourseList from "@/client/features/courses/components/CourseList";
import { BookOpen, Sparkles, Award } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-20">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold tracking-tight border border-teal-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Learning Experience</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Explore Our Featured Courses
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Advance your career with industry-proven courses taught by expert practitioners.
              Track your progress, take interactive exams, and learn at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-bold text-gray-900">Available Courses (6)</h2>
          </div>
        </div>

        <CourseList courses={coursesData} />
      </section>
    </div>
  );
}
