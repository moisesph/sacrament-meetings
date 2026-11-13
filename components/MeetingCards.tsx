import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${meeting.date}T12:00:00`));

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

        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex items-center justify-center rounded-sm bg-[#006184] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004f6d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006184]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}