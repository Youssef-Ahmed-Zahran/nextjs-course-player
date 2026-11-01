import Link from "next/link";
import {
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Course } from "@/client/features/courses/types/course.types";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const isStarted = course.progress > 0;
  const isCompleted = course.progress === 100;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-white/90 backdrop-blur-md text-gray-800 shadow-sm">
            {course.category}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Completed
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Rating & Level */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-gray-400 font-normal">
              ({course.reviewCount})
            </span>
          </div>
          <span className="text-gray-400 font-medium">{course.level}</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 pt-1">
          <div className="h-7 w-7 rounded-full overflow-hidden border border-gray-200">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs font-semibold text-gray-700">
            {course.instructor}
          </span>
        </div>

        {/* Meta Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span>{course.overviewStats.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-gray-400" />
            <span>{course.overviewStats.lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <span>{course.overviewStats.enrolled}</span>
          </div>
        </div>

        {/* Progress Bar (if started) */}
        {isStarted && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-gray-500">Progress</span>
              <span className="text-teal-600">{course.progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/courses/${course.id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold transition-all shadow-sm group-hover:shadow hover:gap-3"
          >
            <span>
              {isCompleted
                ? "Review Course"
                : isStarted
                  ? "Continue Learning"
                  : "Start Course"}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
