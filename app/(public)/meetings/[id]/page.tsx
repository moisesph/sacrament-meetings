"use client";

import { use, useEffect, useState } from "react";
import MeetingDetail from "../../../../components/MeetingDetail";
import Loading from "../loading";
import type { SacramentMeeting } from "../../../../lib/types";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MeetingPage({ params }: MeetingPageProps) {
  const { id } = use(params);

  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const response = await fetch(`/api/meetings/${id}`);

        if (response.status === 400) {
          throw new Error("The meeting ID is invalid.");
        }

        if (response.status === 404) {
          throw new Error("The meeting was not found.");
        }

        if (!response.ok) {
          throw new Error("Unable to load the meeting.");
        }

        const apiMeeting: SacramentMeeting = await response.json();
        setMeeting(apiMeeting);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load the meeting.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeeting();
  }, [id]);

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

  if (!meeting) {
    return null;
  }

  return <MeetingDetail meeting={meeting} />;
}
