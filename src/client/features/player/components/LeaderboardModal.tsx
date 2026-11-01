"use client";

import { X, Trophy, Medal, Award, Flame } from "lucide-react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";

// Motivational quotes randomly selected
const motivationalQuotes = [
  "«عاش يا بطل! الاستمرارية هي السر في النجاح والوصول لأعلى المراتب.» 🚀",
  "«خطوة بخطوة بتوصل لهدفك.. مجهودك مش هيضيع أبدًا!» 💪",
  "«أنت أقرب مما تتخيل للقمة.. كمل بنفس الشغف!» ⭐",
  "«المذاكرة والاجتهاد هما استثمارك الأكبر في مستقبلك.» 🔥",
];

export default function LeaderboardModal() {
  const { closeModal, course } = usePlayerStore();
  const students = course?.leaderboard ?? [];

  // Pick a random motivational line
  const quote = motivationalQuotes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col max-h-[85vh]">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Student Leaderboard</h3>
            <p className="text-xs text-gray-400">Top learners ranking this week</p>
          </div>
        </div>

        {/* Motivational Card */}
        <div className="my-3.5 p-3.5 rounded-xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-100/80">
          <div className="flex items-start gap-2">
            <Flame className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-teal-900">رسالة تحفيزية:</p>
              <p className="text-xs text-teal-800 mt-0.5 leading-relaxed font-medium">
                {quote}
              </p>
            </div>
          </div>
        </div>

        {/* List of Ranked Students */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 divide-y divide-gray-50">
          {students.map((student) => {
            const isFirst = student.rank === 1;
            const isSecond = student.rank === 2;
            const isThird = student.rank === 3;

            return (
              <div
                key={student.name}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  isFirst
                    ? "bg-amber-50/70 border border-amber-200/80"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank number or medal */}
                  <div className="w-6 text-center">
                    {isFirst ? (
                      <span className="text-lg">🥇</span>
                    ) : isSecond ? (
                      <span className="text-lg">🥈</span>
                    ) : isThird ? (
                      <span className="text-lg">🥉</span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">#{student.rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name & Lessons */}
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 leading-tight">
                      {student.name}
                    </h5>
                    <p className="text-[11px] text-gray-400">
                      {student.completedLessons} lessons completed • {student.level}
                    </p>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <span className="text-xs font-extrabold text-teal-600">
                    {student.points.toLocaleString()} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

