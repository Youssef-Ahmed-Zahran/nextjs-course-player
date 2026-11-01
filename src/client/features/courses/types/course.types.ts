// ─── Material ────────────────────────────────────────────────────────────────
export interface CourseMaterialItem {
  id: string;
  title: string;
  type: "pdf" | "zip" | "doc" | "video" | "link";
  size?: string;
  url: string;
  previewUrl?: string; // for PDF modal viewer
}

// ─── Quiz / Exam Question ────────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  id: string;
  title: string;
  questionsCount: number;
  durationMinutes: number;
  questions: QuizQuestion[];
}

// ─── Comment ─────────────────────────────────────────────────────────────────
export interface CourseComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

// ─── Lesson ──────────────────────────────────────────────────────────────────
export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "10 MINUTES"
  durationSeconds: number;
  videoUrl: string;
  description?: string;
  completed: boolean;
  isLocked?: boolean;
  questionBadge?: string; // e.g. "0 QUESTION" or "3 QUESTION"
  timeBadge?: string; // e.g. "10 MINUTES" or "15 MINUTES"
  quiz?: QuizData;
}

// ─── Module ──────────────────────────────────────────────────────────────────
export interface CourseModule {
  id: string;
  title: string; // e.g. "Week 1-4"
  subtitle: string; // e.g. "Advanced story telling techniques for writers: Personas, Characters & Plots"
  lessons: Lesson[];
}

// ─── Leaderboard Entry ───────────────────────────────────────────────────────
export interface LeaderboardStudent {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  completedLessons: number;
  level: string;
  badge?: string;
}

// ─── Course Info Overview ────────────────────────────────────────────────────
export interface CourseOverviewStats {
  duration: string;
  lessons: number;
  enrolled: string;
  language: string;
}

// ─── Course ──────────────────────────────────────────────────────────────────
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  instructorBio: string;
  thumbnail: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  totalDuration: string;
  totalLessons: number;
  progress: number; // 0-100
  rating: number;
  reviewCount: number;
  overviewStats: CourseOverviewStats;
  modules: CourseModule[];
  materials: CourseMaterialItem[];
  comments: CourseComment[];
  leaderboard: LeaderboardStudent[];
  tags: string[];
  enrolledCount: number;
  lastUpdated: string;
}
