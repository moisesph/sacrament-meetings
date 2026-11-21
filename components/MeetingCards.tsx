import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
import { isDemoMeetingDeletionEnabled } from "@/lib/meeting-delete-policy";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const deletionEnabled = isDemoMeetingDeletionEnabled();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${meeting.date}T12:00:00`));

  const deleteMeetingWithId = deleteMeeting.bind(null, meeting.id);

  async function submitDeleteMeeting(): Promise<void> {
    "use server";

    const deleted = await deleteMeetingWithId();

    if (!deleted) {
      throw new Error("This meeting could not be deleted. It may no longer exist.");
    }
  }

  return (
    <article className="border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <div className="h-1 bg-[#006184]" />

      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#006184]">
            {meeting.meetingType}
          </p>

          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            {formattedDate}
          </h2>

          <dl className="mt-4 grid gap-2 text-sm">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-slate-800">Presiding:</dt>
              <dd className="text-slate-600">{meeting.presiding}</dd>
            </div>

            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-slate-800">Conducting:</dt>
              <dd className="text-slate-600">{meeting.conducting}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/meetings/${meeting.id}`}
            className="inline-flex items-center justify-center rounded-sm bg-[#006184] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004f6d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006184]"
          >
            View Details
          </Link>

          <form action={submitDeleteMeeting}>
            <button
              type="submit"
              aria-label={`Delete meeting ${formattedDate} (ID ${meeting.id})`}
              title={
                deletionEnabled
                  ? `Delete meeting ${formattedDate}`
                  : "Deletion is disabled unless this server is configured for a disposable demo database"
              }
              disabled={!deletionEnabled}
              className="inline-flex items-center justify-center rounded-sm border border-red-700 px-4 py-2.5 text-sm font-semibold text-red-800 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}