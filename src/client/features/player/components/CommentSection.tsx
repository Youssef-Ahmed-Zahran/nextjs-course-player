"use client";

import { useState } from "react";
import { ArrowRight, MessageSquare, ThumbsUp } from "lucide-react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";

export default function CommentSection() {
  const { comments, addComment, savedDraftComment, setSavedDraftComment } = usePlayerStore();
  const [inputText, setInputText] = useState(savedDraftComment);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    setSavedDraftComment(val); // Always keep session draft preserved
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    addComment(inputText.trim());
    setInputText("");
    setIsSubmitting(false);
  };

  return (
    <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Comments
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
          {comments.length} Discussion{comments.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Existing Comments List */}
      <div className="space-y-6 divide-y divide-gray-100">
        {comments.map((comm, index) => (
          <div key={comm.id} className={`flex items-start gap-4 ${index > 0 ? "pt-5" : ""}`}>
            {/* Student Avatar */}
            <div className="relative h-11 w-11 flex-shrink-0 rounded-full overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={comm.avatar}
                alt={comm.author}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Comment Body */}
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-semibold text-gray-900">{comm.author}</h4>
                <span className="text-xs text-gray-400 font-normal">{comm.createdAt}</span>
              </div>
              <p className="text-xs leading-relaxed text-gray-500 font-normal">
                {comm.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Write a comment form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-gray-100">
        <div>
          <label htmlFor="commentInput" className="sr-only">
            Write a comment
          </label>
          <textarea
            id="commentInput"
            rows={4}
            value={inputText}
            onChange={handleTextChange}
            placeholder="Write a comment..."
            className="w-full rounded-xl border border-gray-200 p-4 text-xs text-gray-800 placeholder-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all resize-none shadow-inner"
          />
        </div>

        {/* Submit Review Button with Arrow (As exactly shown in Figma image) */}
        <div>
          <button
            type="submit"
            disabled={!inputText.trim() || isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 text-xs font-semibold shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
          >
            <span>Submit Review</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </section>
  );
}
