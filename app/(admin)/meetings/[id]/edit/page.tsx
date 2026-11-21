import { notFound } from "next/navigation";
import { updateMeeting } from "../../../../../lib/actions";
import MeetingForm from "../../../../../components/MeetingForm";
import { getMeetingById } from "../../../../../lib/meetings-db";
import type { MeetingFormValues } from "../../../../../lib/meeting-form-state";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id: routeId } = await params;
  const id = Number(routeId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, id);
  const initialValues: MeetingFormValues = {
    date: meeting.date,
    meetingType: meeting.meetingType,
    presiding: meeting.presiding,
    conducting: meeting.conducting,
    announcements: JSON.stringify(meeting.announcements ?? []),
    openingHymn: JSON.stringify(meeting.openingHymn),
    openingPrayer: meeting.openingPrayer,
    wardBusiness: JSON.stringify(meeting.wardBusiness),
    stakeBusiness: String(meeting.stakeBusiness),
    sacramentHymn: JSON.stringify(meeting.sacramentHymn),
    speakers: JSON.stringify(meeting.speakers),
    closingHymn: JSON.stringify(meeting.closingHymn),
    closingPrayer: meeting.closingPrayer,
  };

  return (
    <section className="mx-auto max-w-2xl border border-[color:var(--color-muted)]/20 bg-[var(--color-surface)] p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-[color:var(--color-text)]">
        Edit Meeting
      </h1>

      <MeetingForm action={updateMeetingWithId} initialValues={initialValues} mode="edit" />
    </section>
  );
}