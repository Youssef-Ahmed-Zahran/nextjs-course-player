
import { useState } from "react";
import { X, CheckCircle, ArrowRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { usePlayerStore } from "@/client/features/player/store/playerStore";

export default function ExamModal() {
  const { closeModal, activeQuiz, markLessonComplete, currentLessonId } =
    usePlayerStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [isFinished, setIsFinished] = useState(false);

  if (!activeQuiz) return null;

  const questions = activeQuiz.questions;
  const currentQ = questions[currentQuestionIndex];
  const total = questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isFinished) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < total - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score & finish
      setIsFinished(true);
      // Mark current lesson as complete in store & update progress!
      if (currentLessonId) {
        markLessonComplete(currentLessonId);
      }
      // Trigger celebrate confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm ">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-gray-100 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
            Interactive Assessment
          </span>
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            {activeQuiz.title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Question {currentQuestionIndex + 1} of {total} • 15 Minutes
          </p>
        </div>

        {/* Question content */}
        {!isFinished ? (
          <div className="py-5 space-y-4">
            <h4 className="text-sm font-semibold text-gray-800 leading-relaxed">
              {currentQ.question}
            </h4>

            {/* Options list */}
            <div className="space-y-2 pt-1">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected =
                  selectedAnswers[currentQuestionIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-teal-500 bg-teal-50/70 text-teal-900 ring-1 ring-teal-500"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50/50"
                    }`}
                  >
                    <span>{opt}</span>
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-teal-600 bg-teal-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next / Submit button */}
            <div className="flex justify-end pt-3">
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-40"
              >
                <span>
                  {currentQuestionIndex === total - 1
                    ? "Submit Exam"
                    : "Next Question"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Finished State */
          <div className="py-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">
                Quiz Completed!
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Your score:{" "}
                <span className="font-bold text-emerald-600">
                  {calculateScore()} / {total}
                </span>{" "}
                correct answers.
              </p>
              <p className="text-[11px] text-teal-600 font-semibold mt-2">
                ✓ Lesson marked as completed and course progress updated!
              </p>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setCurrentQuestionIndex(0);
                  setIsFinished(false);
                }}
                className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retake
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg bg-teal-500 text-white text-xs font-semibold hover:bg-teal-600"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
