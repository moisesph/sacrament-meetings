'use client';

import MeetingError, {
  type MeetingErrorProps,
} from "../../../components/MeetingError";

export default function AdminMeetingsError(props: MeetingErrorProps) {
  return <MeetingError {...props} />;
}