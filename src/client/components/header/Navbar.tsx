"use client";

import Link from "next/link";
import { GraduationCap, BookOpen, Compass, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/courses" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white shadow-sm transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Edu<span className="text-teal-500">Flow</span>
          </span>
        </Link>

        {/* Search Bar - hidden on tiny mobile */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm text-gray-500 w-72 focus-within:border-teal-500 focus-within:bg-white transition-colors">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons, materials..."
            className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        {/* Links & Student Profile */}
        <div className="flex items-center gap-4">
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-teal-600 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">My Courses</span>
          </Link>

          <div className="h-4 w-[1px] bg-gray-200" />

          {/* Student Avatar */}
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-teal-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Student Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden lg:inline text-xs font-medium text-gray-700">Ali Shahin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
