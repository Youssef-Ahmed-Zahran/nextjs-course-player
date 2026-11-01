"use client";

import { X, Download, ExternalLink, FileText } from "lucide-react";
import { usePlayerStore } from "@/client/features/player/store/playerStore";

export default function PdfViewerModal() {
  const { closeModal, activePdfUrl } = usePlayerStore();

  if (!activePdfUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm ">
      <div className="relative w-full max-w-5xl h-[92vh] rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                Document / Material Fullscreen Viewer
              </h3>
              <p className="text-[10px] text-gray-400">PDF Reader & Annotation Preview</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              title="Open in new window"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={closeModal}
              className="p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              title="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe */}
        <div className="flex-1 w-full bg-gray-100 relative">
          <iframe
            src={activePdfUrl}
            className="w-full h-full border-none"
            title="PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
}

