import type { MeetingFieldErrors } from "./meeting-form-state";

export class MeetingValidationError extends Error {
  constructor(
    message: string,
    readonly fieldErrors: MeetingFieldErrors = {},
    readonly formError?: string,
  ) {
    super(message);
    this.name = "MeetingValidationError";
  }
}

export class MeetingDeletionDisabledError extends Error {
  constructor() {
    super("Meeting deletion is disabled for this environment.");
    this.name = "MeetingDeletionDisabledError";
  }
}

type MeetingMutationOperation = "create" | "update" | "delete";

export async function runMeetingMutation<T>(
  operation: MeetingMutationOperation,
  mutation: () => Promise<T>,
  meetingId?: number,
): Promise<T> {
  try {
    return await mutation();
  } catch (error) {
    if (
      error instanceof MeetingValidationError ||
      error instanceof MeetingDeletionDisabledError
    ) {
      throw error;
    }

    console.error("Meeting mutation failed", {
      operation,
      ...(meetingId === undefined ? {} : { meetingId }),
      errorType:
        error instanceof Error ? error.constructor.name : typeof error,
    });

    const message =
      operation === "delete"
        ? "We couldn't delete that meeting. Please try again."
        : "We couldn't save that meeting. Please try again.";

    throw new Error(message);
  }
}