"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function ErrorFallback({ error, reset }: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 border border-rose-100">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">
          Something went wrong
        </h2>
        <p className="max-w-sm text-xs text-gray-500 leading-relaxed">
          {error?.message ?? "An unexpected error occurred. Please try again."}
        </p>
      </div>
      {reset && (
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-600 hover:shadow"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
