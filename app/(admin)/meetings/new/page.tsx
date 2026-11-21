import { createMeeting } from "../../../../lib/actions";
import MeetingForm from "../../../../components/MeetingForm";
import {
  type MeetingFormValues,
} from "../../../../lib/meeting-form-state";

export default function CreateMeetingPage() {
  const initialValues: MeetingFormValues = {
    meetingType: "regular",
    presiding: "",
    conducting: "",
    announcements: "[]",
    openingHymn: '{"number":1,"title":"Opening Hymn"}',
    openingPrayer: "",
    wardBusiness: "[]",
    stakeBusiness: "false",
    sacramentHymn: '{"number":2,"title":"Sacrament Hymn"}',
    speakers: "[]",
    closingHymn: '{"number":3,"title":"Closing Hymn"}',
    closingPrayer: "",
  };

  return (
    <section className="mx-auto max-w-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Create Meeting</h1>

      <MeetingForm action={createMeeting} initialValues={initialValues} mode="create" />
    </section>
  );
}