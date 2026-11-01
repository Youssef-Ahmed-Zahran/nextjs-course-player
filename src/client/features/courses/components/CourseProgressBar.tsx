interface Props {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export default function CourseProgressBar({
  progress,
  className = "",
  showLabel = true,
}: Props) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-gray-400">Progress</span>
          <span
            className={
              clamped === 100
                ? "text-emerald-400"
                : clamped > 0
                  ? "text-violet-400"
                  : "text-gray-500"
            }
          >
            {clamped}%
          </span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            clamped === 100
              ? "bg-emerald-500"
              : clamped > 0
                ? "bg-violet-500"
                : "bg-gray-600"
          }`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
