import Image from "next/image";
import { Suspense } from "react";
import MeetingCard from "../../../components/MeetingCards";
import { MeetingSearch } from "../../../components/MeetingSearch";
import { Pagination } from "../../../components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "../../../lib/meetings-db";
import type { SacramentMeeting } from "../../../lib/types";

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params?.query ?? "";
  const currentPage = Number(params?.page) || 1;

  let meetings: SacramentMeeting[];
  let totalPages: number;

  try {
    [meetings, totalPages] = await Promise.all([
      getMeetings(query, currentPage),
      getMeetingsTotalPages(query),
    ]);
  } catch {
    return (
      <div
        className="border-l-4 border-[color:var(--color-primary)] bg-[var(--color-surface)] p-4 text-[color:var(--color-text)]"
        role="alert"
      >
        Unable to load meetings.
      </div>
    );
  }

  return (
    <section className="text-[color:var(--color-text)]">
      <div className="border-b border-[color:var(--color-muted)]/20 pb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-primary)]">
          Sacrament Meeting Planner
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          All Meetings
        </h1>

        <p className="mt-2 text-[color:var(--color-muted)]">
          Review the available sacrament meeting programs.
        </p>
      </div>

      <div className="mt-6 overflow-hidden border border-[color:var(--color-muted)]/20 bg-[var(--color-surface)] shadow-sm">
        <Image
          src="/church.jpg"
          alt="Church meetinghouse surrounded by trees"
          width={1200}
          height={500}
          className="h-56 w-full object-cover sm:h-72"
          priority
        />

        <div className="border-t-4 border-[color:var(--color-primary)] px-6 py-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-primary)]">
            Barrio Comayagüela
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Sacrament Meeting Programs
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            View upcoming and previous sacrament meeting programs, including
            hymns, prayers, speakers, announcements, and Church business.
          </p>
        </div>
      </div>

      <div
        className="
          mt-6
          [&_input]:w-full
          [&_input]:rounded-sm
          [&_input]:border
          [&_input]:border-[color:var(--color-muted)]/30
          [&_input]:bg-[var(--color-surface)]
          [&_input]:px-4
          [&_input]:py-2.5
          [&_input]:text-[color:var(--color-text)]
          [&_input]:placeholder:text-[color:var(--color-muted)]
          [&_input:focus]:border-[color:var(--color-primary)]
          [&_input:focus]:outline-none
          [&_input:focus]:ring-2
          [&_input:focus]:ring-[color:var(--color-primary)]
        "
      >
        <Suspense
          fallback={
            <div
              className="h-11 animate-pulse rounded-sm border border-[color:var(--color-muted)]/20 bg-[var(--color-surface)]"
              aria-hidden="true"
            />
          }
        >
          <MeetingSearch />
        </Suspense>
      </div>

      {meetings.length > 0 ? (
        <div className="mt-6 grid gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-[color:var(--color-muted)]/20 bg-[var(--color-surface)] p-6 text-center">
          <p className="text-[color:var(--color-muted)]">
            No meetings found.
          </p>
        </div>
      )}

      {totalPages > 0 && (
        <div className="mt-8 flex justify-center text-[color:var(--color-primary)]">
          <Suspense fallback={null}>
            <Pagination totalPages={totalPages} />
          </Suspense>
        </div>
      )}
    </section>
  );
}