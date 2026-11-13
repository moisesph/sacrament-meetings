import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getMeetingsByDate } from "../../../../lib/meetings-db";

export const instant = false;

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayDate = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  const meetings = await getMeetingsByDate(sundayDate);
  const meeting = meetings[0];

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  return (
    <section className="mx-auto max-w-2xl border border-[color:var(--color-muted)]/20 bg-[var(--color-surface)] p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-primary)]">
        Current Meeting
      </p>

      <h1 className="mt-2 text-2xl font-semibold text-[color:var(--color-text)]">
        No meeting information available
      </h1>

      <p className="mt-3 text-[color:var(--color-muted)]">
        There is no meeting information available for the most recent Sunday.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-flex items-center justify-center rounded-sm bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-surface)] transition-opacity hover:opacity-90"
      >
        View All Meetings
      </Link>
    </section>
  );
}