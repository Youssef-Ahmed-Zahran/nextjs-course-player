import Link from "next/link";
import { BookOpen, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-3">
        <p className="text-8xl font-black text-teal-500/20 tracking-tighter">
          404
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
        <p className="max-w-sm text-xs text-gray-500 leading-relaxed">
          The course or lesson you are looking for does not exist or has been
          moved.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300"
        >
          <Home className="h-4 w-4 text-gray-400" />
          <span>Go Home</span>
        </Link>
        <Link
          href="/courses"
          className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-600 hover:shadow"
        >
          <BookOpen className="h-4 w-4" />
          <span>Browse Courses</span>
        </Link>
      </div>
    </div>
  );
}
