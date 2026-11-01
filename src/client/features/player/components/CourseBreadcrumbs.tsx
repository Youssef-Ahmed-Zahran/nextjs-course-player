import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  courseTitle?: string;
}

export default function CourseBreadcrumbs({ courseTitle = "Starting SEO as your Home" }: Props) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-medium py-3">
      <Link href="/" className="hover:text-teal-600 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-3 w-3 text-gray-300" />
      <Link href="/courses" className="hover:text-teal-600 transition-colors">
        Courses
      </Link>
      <ChevronRight className="h-3 w-3 text-gray-300" />
      <span className="text-gray-600 font-semibold truncate max-w-[200px] sm:max-w-none">
        Course Details
      </span>
    </nav>
  );
}
