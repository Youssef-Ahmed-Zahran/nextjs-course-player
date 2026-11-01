# EduFlow — Modern Next.js Course Platform & Player 🎓

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nextjs-course-player.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand_5-443e38?style=for-the-badge)](https://github.com/pmndrs/zustand)

A pixel-perfect, responsive e-learning courses platform and interactive course player built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**, designed strictly after Figma desktop & mobile references.

🌐 **Live Demo:** [https://nextjs-course-player.vercel.app](https://nextjs-course-player.vercel.app)

---

## 📸 Key Features

- **📺 Dual Video Engine**:
  - Embedded real HD programming tutorials (YouTube & Vimeo) with `rel=0` and privacy-enhanced domain.
  - Native HTML5 Video (`.mp4`) player fallback.
  - Autoplay disabled by default for optimal user experience.
  - Desktop Wide Player toggle + Fullscreen auto-rotation.
- **📚 Dynamic Curriculum & Progress**:
  - Module & lesson list with duration badges, question counts, and completion checkmarks.
  - Circular SVG progress ring + linear progress bar updated in real-time.
  - One-click "Mark Complete" toggle.
- **🎮 Interactive Modals & Gamification**:
  - **Interactive Quiz / Exam**: Multiple-choice assessment with instant score computation, confetti celebration (`canvas-confetti`), and automatic course progress update.
  - **Leaderboard Modal**: Student rankings, medals (🥇🥈🥉), and motivational quotes.
  - **Ask Question Modal**: Form linked directly to current lesson.
  - **PDF Preview Modal**: Fullscreen document viewer with download options.
- **💬 Live Comments & Draft Recovery**:
  - Real-time comment submission without page reload.
  - Unsaved comment drafts are persisted in session state even if modal or drawer closes.
- **📱 Responsive & Mobile-First**:
  - Zero horizontal scroll across Mobile, Tablet, and Desktop.
  - Quick-jump navigation buttons to curriculum and comments on smaller screens.
- **⚡ Frontend-Only Architecture**:
  - 100% Mock Data with 6 complete courses (SEO, Next.js 15, Tailwind CSS, TypeScript Enterprise, Node.js APIs, System Design).

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework & Runtime** | [Next.js 16](https://nextjs.org/) (App Router, Partial Prerendering, Static Generation) |
| **UI Library** | [React 19](https://react.dev/) (Server Components, `use()` hook, `<Suspense>`) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode, 100% type-safe, zero `any`) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer |
| **State Management** | [Zustand 5](https://github.com/pmndrs/zustand) (Reactive client store) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations / FX** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🎨 Clean Architecture & Folder Structure

We implement a decoupled **Feature-Based Architecture (Colocation)** where `src/app/` is strictly a lightweight routing layer (2-3 lines per route), and all UI, logic, state, and types live within their respective features:

```text
src/
├── app/                           # Thin Next.js App Router layer (zero business logic)
│   ├── layout.tsx                 # Root layout with Navbar and viewport setup
│   ├── loading.tsx                # Page loader fallback
│   ├── error.tsx                  # Global error boundary
│   ├── not-found.tsx              # Styled 404 page
│   ├── page.tsx                   # Redirects to /courses
│   └── courses/
│       ├── page.tsx               # Invokes <CoursesPage />
│       └── [courseId]/
│           └── page.tsx           # Server Component with Suspense & generateStaticParams
│
├── client/
│   ├── components/                # Shared global components
│   │   ├── header/Navbar.tsx
│   │   ├── loader/PageLoader.tsx
│   │   ├── error/ErrorFallback.tsx
│   │   └── not-found/NotFoundPage.tsx
│   │
│   └── features/                  # Feature-based domain modules
│       ├── courses/
│       │   ├── components/        # CourseCard, CourseList, CourseProgressBar
│       │   ├── pages/
│       │   │   └── CoursesPage.tsx
│       │   └── types/
│       │       └── course.types.ts
│       │
│       └── player/
│           ├── components/        # VideoPlayer, CurriculumSidebar, CourseMaterials,
│           │                      # CommentSection, Modals (Exam, Leaderboard, etc.)
│           ├── pages/
│           │   └── CoursePlayerPage.tsx # Server Component shell
│           └── store/
│               └── playerStore.ts # Zustand store
│
└── data/
    └── courses.data.ts            # Rich Mock Data (6 complete courses)
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Youssef-Ahmed-Zahran/nextjs-course-player.git
cd nextjs-course-player
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
