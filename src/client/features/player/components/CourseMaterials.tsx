
import {
  Clock,
  BookOpen,
  Users,
  Globe,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";

export default function CourseMaterials() {
  const { course, openModal } = usePlayerStore();

  if (!course) return null;

  return (
    <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
        Course Materials
      </h2>

      {/* 2-Column Overview Grid exactly matching Desktop Mockup */}
      <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          {/* Column 1 */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <Clock className="h-4 w-4 text-gray-400" />
                Duration:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.duration}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <BookOpen className="h-4 w-4 text-gray-400" />
                Lessons:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.lessons}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <Users className="h-4 w-4 text-gray-400" />
                Enrolled:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.enrolled}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <Globe className="h-4 w-4 text-gray-400" />
                Language:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.language}
              </span>
            </div>
          </div>

          {/* Column 2 (mirrored statistics in desktop reference) */}
          <div className="space-y-3.5 sm:border-l sm:border-gray-100 sm:pl-8">
            <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <Clock className="h-4 w-4 text-gray-400" />
                Duration:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.duration}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <BookOpen className="h-4 w-4 text-gray-400" />
                Lessons:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.lessons}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <Users className="h-4 w-4 text-gray-400" />
                Enrolled:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.enrolled}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <Globe className="h-4 w-4 text-gray-400" />
                Language:
              </span>
              <span className="font-semibold text-gray-800">
                {course.overviewStats.language}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Attached Files & PDFs with Fullscreen Preview Modal Trigger */}
      {course.materials.length > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Downloadable Assets & Handouts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.materials.map((mat) => (
              <div
                key={mat.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-gray-200/80 hover:border-teal-400 bg-white transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-teal-600 transition-colors">
                      {mat.title}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {mat.size ?? "Document"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* View in PDF Modal */}
                  {mat.type === "pdf" && (
                    <button
                      onClick={() =>
                        openModal("pdfViewer", {
                          pdfUrl: mat.previewUrl ?? mat.url,
                        })
                      }
                      className="p-1.5 rounded-md text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                      title="Preview in full popup"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  {/* Download */}
                  <a
                    href={mat.url}
                    download
                    className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
