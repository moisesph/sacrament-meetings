export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-4xl"
      role="status"
      aria-live="polite"
      aria-label="Loading meeting information"
    >
      <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 w-full bg-[#006184]" />

        <div className="space-y-3 border-b border-slate-200 px-6 py-8 sm:px-8">
          <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
          <div className="h-9 w-64 max-w-full animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-48 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="grid gap-4 border-b border-slate-200 px-6 py-6 sm:grid-cols-2 sm:px-8">
          <LoadingItem />
          <LoadingItem />
        </div>

        <div className="space-y-5 border-b border-slate-200 px-6 py-7 sm:px-8">
          <div className="h-7 w-32 animate-pulse rounded bg-slate-200" />

          <div className="grid gap-4 sm:grid-cols-2">
            <LoadingItem />
            <LoadingItem />
          </div>
        </div>

        <div className="space-y-5 px-6 py-7 sm:px-8">
          <div className="h-7 w-28 animate-pulse rounded bg-slate-200" />

          <div className="space-y-3">
            <div className="h-20 animate-pulse rounded bg-slate-100" />
            <div className="h-20 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-slate-600">
        Loading meeting information...
      </p>
    </div>
  );
}

function LoadingItem() {
  return (
    <div className="space-y-2 rounded bg-slate-50 p-4">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      <div className="h-5 w-40 max-w-full animate-pulse rounded bg-slate-200" />
    </div>
  );
}
