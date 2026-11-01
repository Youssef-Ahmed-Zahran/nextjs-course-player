"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function ErrorFallback({ error, reset }: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">
          Something went wrong
        </h2>
        <p className="max-w-sm text-sm text-gray-400">
          {error?.message ?? "An unexpected error occurred. Please try again."}
        </p>
      </div>
      {reset && (
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}
