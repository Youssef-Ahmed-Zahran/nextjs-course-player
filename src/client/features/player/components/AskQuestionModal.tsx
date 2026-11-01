"use client";

import { useState } from "react";
import { X, HelpCircle, Send, CheckCircle2 } from "lucide-react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";

export default function AskQuestionModal() {
  const { closeModal, course, getCurrentLesson, addComment } = usePlayerStore();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDetails, setQuestionDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const lesson = getCurrentLesson();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionTitle.trim()) return;

    // Post as a discussion comment referencing the question
    addComment(
      `[Question: ${questionTitle}] ${questionDetails}`,
      "Student Question",
    );
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm ">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Question Submitted!
            </h3>
            <p className="text-xs text-gray-500">
              The instructor and fellow students have been notified in the
              discussion thread.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5 text-teal-600">
              <div className="p-2 rounded-xl bg-teal-50">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Ask a Question
                </h3>
                <p className="text-xs text-gray-400">
                  Regarding: {lesson?.title ?? course?.title}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Question Summary
              </label>
              <input
                type="text"
                required
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                placeholder="e.g., How do canonical tags differ from 301 redirects?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Detailed Description
              </label>
              <textarea
                rows={4}
                value={questionDetails}
                onChange={(e) => setQuestionDetails(e.target.value)}
                placeholder="Explain what you tried, what timestamp you're referring to..."
                className="w-full p-3.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!questionTitle.trim()}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post Question</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
