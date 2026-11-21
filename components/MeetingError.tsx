'use client';

import Link from "next/link";

export interface MeetingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingError({ reset }: MeetingErrorProps) {
  return (
    <section
      aria-labelledby="meeting-error-title"
      className="mx-auto max-w-2xl border border-[color:var(--color-muted)]/30 bg-[var(--color-surface)] p-8 text-[color:var(--color-text)]"
      role="alert"
    >
      <h1 id="meeting-error-title" className="text-2xl font-semibold">
        We couldn&apos;t complete that request
      </h1>

      <p className="mt-3 text-[color:var(--color-muted)]">
        Something went wrong while loading or saving meeting information. Please try again.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-sm bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-sm border border-[color:var(--color-muted)]/40 px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[color:var(--color-muted)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          Back to meetings
        </Link>
      </div>
    </section>
  );
}