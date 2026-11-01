import Link from "next/link";
import { BookOpen, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <p className="text-8xl font-black text-violet-500/20">404</p>
        <h1 className="text-2xl font-bold text-white">Page not found</h1>
        <p className="max-w-sm text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
        <Link
          href="/courses"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          <BookOpen className="h-4 w-4" />
          Browse Courses
        </Link>
      </div>
    </div>
  );
}
