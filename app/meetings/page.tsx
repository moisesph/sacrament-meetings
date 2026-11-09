"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MeetingCard from "../../components/MeetingCards";
import type { SacramentMeeting } from "../../lib/types";
import Loading from "./loading";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const response = await fetch("/api/meetings");

        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }

        const apiMeetings: SacramentMeeting[] = await response.json();
        setMeetings(apiMeetings);
      } catch {
        setError("Unable to load meetings.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeetings();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div
        className="border border-red-200 bg-red-50 p-4 text-red-700"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <section>
      <div className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#006184]">
          Sacrament Meeting Planner
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          All Meetings
        </h1>

        <p className="mt-2 text-slate-600">
          Review the available sacrament meeting programs.
        </p>
      </div>

      <div className="mt-6 overflow-hidden border border-slate-200 bg-white shadow-sm">
        <Image
          src="/church.jpg"
          alt="Church meetinghouse surrounded by trees"
          width={1200}
          height={500}
          className="h-56 w-full object-cover sm:h-72"
          priority
        />

        <div className="border-t-4 border-[#006184] px-6 py-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#006184]">
            Barrio Comayagüela
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Sacrament Meeting Programs
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            View upcoming and previous sacrament meeting programs, including
            hymns, prayers, speakers, announcements, and Church business.
          </p>
        </div>
      </div>

      {meetings.length > 0 ? (
        <div className="mt-6 grid gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-slate-200 bg-white p-6 text-center">
          <p className="text-slate-600">No meetings found.</p>
        </div>
      )}
    </section>
  );
}
