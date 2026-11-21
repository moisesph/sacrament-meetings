'use client';

import MeetingError, {
  type MeetingErrorProps,
} from "../../../components/MeetingError";

export default function PublicMeetingsError(props: MeetingErrorProps) {
  return <MeetingError {...props} />;
}