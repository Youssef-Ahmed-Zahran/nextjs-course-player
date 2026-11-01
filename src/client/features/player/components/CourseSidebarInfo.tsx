
import { usePlayerStore } from "@/client/features/player/store/playerStore";

export default function CourseSidebarInfo() {
  const { course, progress } = usePlayerStore();

  if (!course) return null;

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        {/* Instructor Info With Avatar Bubble Callout as in Figma */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-teal-500 shadow-md">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Small status indicator */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-400">
              Instructor
            </span>
            <h4 className="text-sm font-bold text-gray-800 leading-tight">
              {course.instructor}
            </h4>
          </div>
        </div>

        {/* Circular Progress Badge */}
        <div className="relative flex flex-col items-center">
          <div className="relative h-11 w-11 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              {/* Background track */}
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Animated Progress path */}
              <path
                className="text-teal-500 transition-all duration-700 ease-out"
                strokeDasharray={`${progress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-gray-700">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar beneath */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] font-medium text-gray-500">
          <span>Overall Completion</span>
          <span className="text-teal-600 font-bold">{progress}% Completed</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
