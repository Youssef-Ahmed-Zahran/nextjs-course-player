"use client";

import { useEffect, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  Columns,
  HelpCircle,
  Trophy,
  FileText,
  MessageSquare,
  Share2,
} from "lucide-react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";

interface Props {
  onScrollToCurriculum?: () => void;
  onScrollToComments?: () => void;
}

export default function VideoPlayer({ onScrollToCurriculum, onScrollToComments }: Props) {
  const {
    currentLessonId,
    getCurrentLesson,
    markLessonComplete,
    isWidePlayer,
    toggleWidePlayer,
    openModal,
  } = usePlayerStore();

  const lesson = getCurrentLesson();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentLessonId]);

  const handleVideoEnded = () => {
    if (currentLessonId) {
      markLessonComplete(currentLessonId);
    }
  };

  const handleToggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
        if ("screen" in window && "orientation" in window.screen && "lock" in window.screen.orientation) {
          (window.screen.orientation as any).lock("landscape").catch(() => {});
        }
      } catch (err) {
        console.warn("Fullscreen error:", err);
      }
    } else {
      await document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleShare = (network: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = lesson?.title ?? "Course Lesson";
    if (network === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      youtube: `https://youtube.com`,
    };
    if (shareUrls[network]) {
      window.open(shareUrls[network], "_blank", "noopener,noreferrer");
    }
  };

  if (!lesson) return null;

  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Top sticky video container for mobile */}
      <div
        ref={containerRef}
        className="relative w-full bg-slate-950 aspect-video group overflow-hidden"
      >
        <video
          ref={videoRef}
          src={lesson.videoUrl}
          className="w-full h-full object-contain"
          controls
          playsInline
          onEnded={handleVideoEnded}
        />

        {/* Custom Overlay Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
          {/* Wide Mode Toggle (Desktop only) */}
          <button
            onClick={toggleWidePlayer}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium hover:bg-black/80 transition-all border border-white/10"
            title={isWidePlayer ? "Normal View" : "Wide Player"}
          >
            <Columns className="h-3.5 w-3.5 text-teal-400" />
            <span>{isWidePlayer ? "Normal" : "Wide Player"}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all border border-white/10"
            title="Fullscreen / Auto-rotate"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Action Bar Beneath Player: Social icons + Mobile Quick Nav & Popups */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 border-b border-gray-100 bg-white">
        {/* Left: Social Share Icons (SVG vectors) */}
        <div className="flex items-center gap-3 text-gray-400">
          {/* Facebook */}
          <button
            onClick={() => handleShare("facebook")}
            className="hover:text-blue-600 transition-colors p-1"
            title="Share on Facebook"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          {/* Twitter / X */}
          <button
            onClick={() => handleShare("twitter")}
            className="hover:text-sky-500 transition-colors p-1"
            title="Share on Twitter"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 23.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          {/* LinkedIn */}
          <button
            onClick={() => handleShare("linkedin")}
            className="hover:text-blue-700 transition-colors p-1"
            title="Share on LinkedIn"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </button>
          {/* YouTube */}
          <button
            onClick={() => handleShare("youtube")}
            className="hover:text-red-600 transition-colors p-1"
            title="YouTube channel"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </button>
          {/* Copy link */}
          <button
            onClick={() => handleShare("copy")}
            className="hover:text-teal-600 transition-colors p-1 text-xs font-medium flex items-center gap-1"
            title="Copy link"
          >
            <Share2 className="h-3.5 w-3.5" />
            {copied && <span className="text-[10px] text-teal-600">Copied!</span>}
          </button>
        </div>

        {/* Right: Quick Action Buttons & Interactive Popups (Required by Design Spec) */}
        <div className="flex items-center gap-2">
          {/* Ask Question Popup Button */}
          <button
            onClick={() => openModal("askQuestion")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-semibold transition-colors border border-teal-100"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Ask Question</span>
          </button>

          {/* Leaderboard Popup Button */}
          <button
            onClick={() => openModal("leaderboard")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-semibold transition-colors border border-amber-100"
          >
            <Trophy className="h-3.5 w-3.5" />
            <span>Leaderboard</span>
          </button>

          {/* Scroll to Curriculum (Mobile shortcut) */}
          {onScrollToCurriculum && (
            <button
              onClick={onScrollToCurriculum}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium transition-colors"
            >
              <FileText className="h-3.5 w-3.5 text-gray-500" />
              <span>Lessons</span>
            </button>
          )}

          {/* Scroll to Comments */}
          {onScrollToComments && (
            <button
              onClick={onScrollToComments}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-gray-500" />
              <span>Comments</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
