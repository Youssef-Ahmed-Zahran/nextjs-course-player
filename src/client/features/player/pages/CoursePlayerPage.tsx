"use client";

import { useEffect, useRef } from "react";
import { coursesData } from "@/data/courses.data";
import { usePlayerStore } from "@/client/features/player/store/playerStore";
import CourseBreadcrumbs from "@/client/features/player/components/CourseBreadcrumbs";
import VideoPlayer from "@/client/features/player/components/VideoPlayer";
import CourseMaterials from "@/client/features/player/components/CourseMaterials";
import CommentSection from "@/client/features/player/components/CommentSection";
import CurriculumSidebar from "@/client/features/player/components/CurriculumSidebar";
import CourseSidebarInfo from "@/client/features/player/components/CourseSidebarInfo";
import AskQuestionModal from "@/client/features/player/components/AskQuestionModal";
import LeaderboardModal from "@/client/features/player/components/LeaderboardModal";
import PdfViewerModal from "@/client/features/player/components/PdfViewerModal";
import ExamModal from "@/client/features/player/components/ExamModal";

interface Props {
  courseId: string;
}

export default function CoursePlayerPage({ courseId }: Props) {
  const { initPlayer, course, isWidePlayer, activeModal } = usePlayerStore();

  const curriculumRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // Initialize course store
  useEffect(() => {
    const foundCourse = coursesData.find((c) => c.id === courseId) ?? coursesData[0];
    initPlayer(foundCourse);
  }, [courseId, initPlayer]);

  const scrollToCurriculum = () => {
    curriculumRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-16">
      {/* Top Banner / Breadcrumb Area with Title */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CourseBreadcrumbs courseTitle={course.title} />
          {/* Main Course Header Title - exactly matching Figma */}
          <div className="py-2 pb-5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Video + Materials + Comments */}
          <div
            className={`space-y-6 transition-all duration-300 ${
              isWidePlayer ? "lg:col-span-12" : "lg:col-span-8"
            }`}
          >
            {/* 1. Video Player Container with Actions Bar */}
            <VideoPlayer
              onScrollToCurriculum={scrollToCurriculum}
              onScrollToComments={scrollToComments}
            />

            {/* 2. Course Materials Section */}
            <div id="course-materials">
              <CourseMaterials />
            </div>

            {/* 3. Comments & Review Section */}
            <div ref={commentsRef} id="comments-section">
              <CommentSection />
            </div>
          </div>

          {/* Right Column: Instructor Info + Curriculum Sidebar (Moves below if wide mode) */}
          <div
            ref={curriculumRef}
            className={`space-y-6 ${
              isWidePlayer ? "lg:col-span-12 pt-4" : "lg:col-span-4"
            }`}
          >
            {/* Sticky instructor & Progress Overview */}
            <div className="space-y-6">
              <CourseSidebarInfo />
              <CurriculumSidebar modules={course.modules} />
            </div>
          </div>
        </div>
      </main>

      {/* Render Active Modals / Popups */}
      {activeModal === "askQuestion" && <AskQuestionModal />}
      {activeModal === "leaderboard" && <LeaderboardModal />}
      {activeModal === "pdfViewer" && <PdfViewerModal />}
      {activeModal === "examModal" && <ExamModal />}
    </div>
  );
}

