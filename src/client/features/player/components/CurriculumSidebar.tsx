"use client";

import { CheckCircle2, Lock, FileQuestion, Clock, Play } from "lucide-react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";
import { CourseModule } from "@/client/features/courses/types/course.types";

interface Props {
  modules: CourseModule[];
}

export default function CurriculumSidebar({ modules }: Props) {
  const { currentLessonId, completedLessonIds, selectLesson, openModal } = usePlayerStore();

  const handleLessonClick = (lesson: any) => {
    if (lesson.isLocked) return;
    selectLesson(lesson.id);

    // If lesson has a quiz attached, allow student to also open the exam modal
    if (lesson.quiz) {
      openModal("examModal", { quiz: lesson.quiz });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Topics for this course header */}
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Topics for This Course
        </h3>
      </div>

      {/* Modules List */}
      <div className="divide-y divide-gray-100">
        {modules.map((module) => (
          <div key={module.id} className="p-5 space-y-3.5">
            {/* Module header */}
            <div>
              <h4 className="text-sm font-bold text-gray-900">{module.title}</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                {module.subtitle}
              </p>
            </div>

            {/* Module lessons list */}
            <div className="space-y-1.5 pt-1">
              {module.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId;
                const isCompleted = completedLessonIds.has(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                      isActive
                        ? "bg-teal-50 text-teal-900 font-semibold border-l-4 border-teal-500 shadow-xs"
                        : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-900"
                    }`}
                  >
                    {/* Left: Icon + Title */}
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        ) : isActive ? (
                          <Play className="h-3.5 w-3.5 text-teal-600 fill-teal-600" />
                        ) : (
                          <FileQuestion className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <span className="truncate leading-tight">{lesson.title}</span>
                    </div>

                    {/* Right: Badges / Locked State */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {lesson.questionBadge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-tight bg-teal-50 text-teal-600 border border-teal-100">
                          {lesson.questionBadge}
                        </span>
                      )}
                      {lesson.timeBadge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-tight bg-rose-50 text-rose-500 border border-rose-100">
                          {lesson.timeBadge}
                        </span>
                      )}
                      {lesson.isLocked ? (
                        <Lock className="h-3.5 w-3.5 text-gray-300" />
                      ) : !lesson.questionBadge && !lesson.timeBadge && (
                        <Lock className="h-3.5 w-3.5 text-gray-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
