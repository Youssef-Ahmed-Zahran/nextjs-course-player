"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";
import { Course } from "@/client/features/courses/types/course.types";
import VideoPlayer from "./VideoPlayer";
import CourseMaterials from "./CourseMaterials";
import CommentSection from "./CommentSection";
import CurriculumSidebar from "./CurriculumSidebar";
import CourseSidebarInfo from "./CourseSidebarInfo";
import AskQuestionModal from "./AskQuestionModal";
import LeaderboardModal from "./LeaderboardModal";
import PdfViewerModal from "./PdfViewerModal";
import ExamModal from "./ExamModal";

interface Props {
  course: Course;
}

export default function CoursePlayerClient({ course }: Props) {
  const { initPlayer, isWidePlayer, activeModal } = usePlayerStore();

  const curriculumRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initPlayer(course);
  }, [course, initPlayer]);

  const scrollToCurriculum = () => {
    curriculumRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Video + Materials + Comments */}
          <div
            className={`space-y-6 transition-all duration-300 ${
              isWidePlayer ? "lg:col-span-12" : "lg:col-span-8"
            }`}
          >
            <VideoPlayer
              onScrollToCurriculum={scrollToCurriculum}
              onScrollToComments={scrollToComments}
            />

            <div id="course-materials">
              <CourseMaterials />
            </div>

            <div ref={commentsRef} id="comments-section">
              <CommentSection />
            </div>
          </div>

          {/* Right Column: Instructor Info + Curriculum Sidebar */}
          <div
            ref={curriculumRef}
            className={`space-y-6 ${
              isWidePlayer ? "lg:col-span-12 pt-4" : "lg:col-span-4"
            }`}
          >
            <div className="space-y-6">
              <CourseSidebarInfo />
              <CurriculumSidebar modules={course.modules} />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeModal === "askQuestion" && <AskQuestionModal />}
      {activeModal === "leaderboard" && <LeaderboardModal />}
      {activeModal === "pdfViewer" && <PdfViewerModal />}
      {activeModal === "examModal" && <ExamModal />}
    </>
  );
}
