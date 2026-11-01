# EduFlow - Course Platform & Course Player

A pixel-perfect, responsive Course Learning Platform and Course Player built strictly following the Figma visual references (Desktop & Mobile view) using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🎨 Architectural Design & Folder Structure

We implemented a clean, decoupled **Folder-Based Architecture** where the `src/app/` directory serves strictly as a lightweight routing layer (2-3 lines per page) and all UI components, state machines, business logic, and mock datasets reside outside it:

```
src/
├── data/
│   └── courses.data.ts            # Rich Mock Data (6 complete courses, modules, lessons, quizes, comments, leaderboard)
├── client/
│   ├── components/                # Shared global UI widgets
│   │   ├── header/Navbar.tsx      # Clean top navigation with student profile
│   │   ├── loader/PageLoader.tsx  # Animated skeleton loader
│   │   ├── error/ErrorFallback.tsx# Resilient error boundary screen
│   │   └── not-found/NotFoundPage.tsx # 404 page with navigation actions
│   ├── features/
│   │   ├── courses/               # Courses Catalog Feature
│   │   │   ├── components/        # CourseCard, CourseList, CourseProgressBar
│   │   │   └── types/             # course.types.ts
│   │   └── player/                # Course Player Feature
│   │       ├── components/
│   │       │   ├── VideoPlayer.tsx       # Video player + Fullscreen + Wide mode + Social links + Quick popup triggers
│   │       │   ├── CurriculumSidebar.tsx # Modules, lessons, question/time badges, lock state
│   │       │   ├── CourseSidebarInfo.tsx # Instructor avatar bubble + circular & linear progress
│   │       │   ├── CourseMaterials.tsx   # 2-column details grid + downloadable assets
│   │       │   ├── CommentSection.tsx    # Live instant comments + draft session recovery
│   │       │   ├── AskQuestionModal.tsx  # Interactive "Ask a Question" modal
│   │       │   ├── LeaderboardModal.tsx  # Student Leaderboard with motivational message
│   │       │   ├── PdfViewerModal.tsx    # Fullscreen PDF reader / viewer modal
│   │       │   └── ExamModal.tsx         # Interactive quiz with score calculation & confetti celebration
│   │       └── store/
│   │           └── playerStore.ts        # Zustand reactive state manager
│   └── pages/
│       ├── CoursesPage.tsx        # Catalog page (6 courses with progress & action buttons)
│       └── CoursePlayerPage.tsx   # Pixel-perfect reproduction of the Figma desktop & mobile designs
└── app/                           # Thin Next.js App Router Layer
    ├── layout.tsx
    ├── loading.tsx
    ├── error.tsx
    ├── not-found.tsx
    ├── page.tsx                   # Redirects cleanly to /courses
    └── courses/
        ├── page.tsx               # Invokes <CoursesPage />
        └── [courseId]/
            └── page.tsx           # Invokes <CoursePlayerPage courseId={...} />
```

---

## ✨ Features & Figma Design Accuracy

1. **Exact Visual Correspondence**:
   - Clean light theme palette matching Figma reference (`#f8fafc` background, crisp white cards, `#0d9488` teal accents).
   - Breadcrumb navigation (`Home > Courses > Course Details`).
   - Title: **Starting SEO as your Home** with primary metadata.
   - 2-Column Course Materials Grid displaying Duration, Lessons, Enrolled, and Language.
   - Circular completion indicator + progress bar.
   - Section headers with badges (`0 QUESTION / 10 MINUTES`, `3 QUESTION / 15 MINUTES`).

2. **Interactive Popups & Modals**:
   - **Ask a Question Modal**: Submit questions linked directly to current lesson.
   - **Leaderboard Modal**: Student rankings, medals, points, and motivational guidance.
   - **PDF Viewer Modal**: Fullscreen document reader with download and new tab preview.
   - **Interactive Quiz / Exam Modal**: Multiple-choice assessment with instant score calculation, confetti animation on completion, and automatic progress increase.

3. **Responsive Mobile & Desktop Experience**:
   - **Desktop Wide Mode**: Toggle between 2-column sidebar layout and wide player layout.
   - **Mobile Responsiveness**: Zero horizontal scroll, touch-optimized buttons, quick action jumps to Curriculum or Comments, and fullscreen landscape video capability.
   - **Session Draft Persistence**: Comment input preserves unsaved drafts in store even if modal closes.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 3. Production Build
```bash
npm run build
npm start
```
