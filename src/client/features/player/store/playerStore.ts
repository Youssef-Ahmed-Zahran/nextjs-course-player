import { create } from "zustand";
import { Course, CourseComment, Lesson, QuizData } from "@/client/features/courses/types/course.types";

interface PlayerStore {
  course: Course | null;
  currentLessonId: string | null;
  completedLessonIds: Set<string>;
  progress: number;
  comments: CourseComment[];
  isWidePlayer: boolean;

  // Active Interactive Popups / Modals
  activeModal: "none" | "askQuestion" | "leaderboard" | "pdfViewer" | "examModal";
  activePdfUrl: string | null;
  activeQuiz: QuizData | null;
  savedDraftComment: string; // Keeps text saved even if popup or sheet closed accidentally

  // Actions
  initPlayer: (course: Course) => void;
  selectLesson: (lessonId: string) => void;
  markLessonComplete: (lessonId: string) => void;
  toggleLessonComplete: (lessonId: string) => void;
  addComment: (content: string, author?: string) => void;
  setSavedDraftComment: (text: string) => void;
  getCurrentLesson: () => Lesson | null;
  toggleWidePlayer: () => void;
  openModal: (modal: "askQuestion" | "leaderboard" | "pdfViewer" | "examModal", payload?: { pdfUrl?: string; quiz?: QuizData }) => void;
  closeModal: () => void;
}

function computeProgress(course: Course, completedIds: Set<string>): number {
  const all = course.modules.flatMap((m) => m.lessons);
  if (all.length === 0) return 0;
  return Math.round((completedIds.size / all.length) * 100);
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  course: null,
  currentLessonId: null,
  completedLessonIds: new Set<string>(),
  progress: 0,
  comments: [],
  isWidePlayer: false,
  activeModal: "none",
  activePdfUrl: null,
  activeQuiz: null,
  savedDraftComment: "",

  initPlayer: (course: Course) => {
    const completedIds = new Set<string>(
      course.modules
        .flatMap((m) => m.lessons)
        .filter((l) => l.completed)
        .map((l) => l.id)
    );
    const firstLesson = course.modules[0]?.lessons[0] ?? null;

    set({
      course,
      currentLessonId: firstLesson?.id ?? null,
      completedLessonIds: completedIds,
      progress: computeProgress(course, completedIds),
      comments: [...course.comments],
      activeModal: "none",
      activePdfUrl: null,
      activeQuiz: null,
    });
  },

  selectLesson: (lessonId: string) => {
    set({ currentLessonId: lessonId });
  },

  markLessonComplete: (lessonId: string) => {
    const { course, completedLessonIds } = get();
    if (!course || completedLessonIds.has(lessonId)) return;
    const next = new Set(completedLessonIds);
    next.add(lessonId);
    set({ completedLessonIds: next, progress: computeProgress(course, next) });
  },

  toggleLessonComplete: (lessonId: string) => {
    const { course, completedLessonIds } = get();
    if (!course) return;
    const next = new Set(completedLessonIds);
    if (next.has(lessonId)) {
      next.delete(lessonId);
    } else {
      next.add(lessonId);
    }
    set({ completedLessonIds: next, progress: computeProgress(course, next) });
  },

  addComment: (content: string, author = "Student Name Goes Here") => {
    const newComment: CourseComment = {
      id: `comment-${Date.now()}`,
      author,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      content,
      createdAt: "Just now",
      likes: 0,
    };
    set((state) => ({
      comments: [newComment, ...state.comments],
      savedDraftComment: "", // clear draft after posting
    }));
  },

  setSavedDraftComment: (text: string) => {
    set({ savedDraftComment: text });
  },

  getCurrentLesson: () => {
    const { course, currentLessonId } = get();
    if (!course || !currentLessonId) return null;
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.id === currentLessonId) return lesson;
      }
    }
    return null;
  },

  toggleWidePlayer: () => {
    set((state) => ({ isWidePlayer: !state.isWidePlayer }));
  },

  openModal: (modal, payload) => {
    set({
      activeModal: modal,
      activePdfUrl: payload?.pdfUrl ?? null,
      activeQuiz: payload?.quiz ?? null,
    });
  },

  closeModal: () => {
    set({
      activeModal: "none",
      activePdfUrl: null,
      activeQuiz: null,
    });
  },
}));
