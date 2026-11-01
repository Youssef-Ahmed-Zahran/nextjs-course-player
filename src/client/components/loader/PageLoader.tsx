export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-teal-500/20 border-t-teal-500" />
      </div>
      <p className="animate-pulse text-xs font-semibold tracking-wider text-teal-600">
        Loading...
      </p>
    </div>
  );
}
