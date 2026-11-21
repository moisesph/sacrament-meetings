import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <section className="mx-auto max-w-2xl border border-[color:var(--color-muted)]/20 bg-[var(--color-surface)] p-8 text-[color:var(--color-text)] shadow-sm">
      <h1 className="text-2xl font-semibold">Meeting not found</h1>

      <p className="mt-3 text-[color:var(--color-muted)]">
        The meeting you requested could not be found.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-flex items-center justify-center rounded-sm bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      >
        Back to meetings
      </Link>
    </section>
  );
}
