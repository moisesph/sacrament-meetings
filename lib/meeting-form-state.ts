export const meetingFormFields = [
  "date",
  "meetingType",
  "presiding",
  "conducting",
  "announcements",
  "openingHymn",
  "openingPrayer",
  "wardBusiness",
  "stakeBusiness",
  "sacramentHymn",
  "speakers",
  "closingHymn",
  "closingPrayer",
] as const;

export type MeetingFormField = (typeof meetingFormFields)[number];
export type MeetingFormValues = Partial<Record<MeetingFormField, string>>;
export type MeetingFieldErrors = Partial<Record<MeetingFormField, string[]>>;

export interface MeetingFormIssue {
  path: readonly PropertyKey[];
  message: string;
}

export interface MeetingFormState {
  message: string;
  errors: MeetingFieldErrors;
  values: MeetingFormValues;
}

export const initialMeetingFormState: MeetingFormState = {
  message: "",
  errors: {},
  values: {},
};

export function getMeetingFormValues(formData: FormData): MeetingFormValues {
  const values: MeetingFormValues = {};

  for (const field of meetingFormFields) {
    const submittedValues = formData
      .getAll(field)
      .filter((value): value is string => typeof value === "string");

    if (submittedValues.length === 1) {
      values[field] = submittedValues[0];
    } else if (field === "announcements" && submittedValues.length > 1) {
      values[field] = JSON.stringify(submittedValues);
    }
  }

  return values;
}

export function getMeetingValidationState(
  issues: readonly MeetingFormIssue[],
  formData: FormData,
): MeetingFormState {
  const fieldErrors: MeetingFieldErrors = {};
  let formMessage: string | undefined;

  for (const issue of issues) {
    const field = issue.path[0];

    if (
      typeof field === "string" &&
      meetingFormFields.includes(field as MeetingFormField)
    ) {
      fieldErrors[field as MeetingFormField] ??= [];
      fieldErrors[field as MeetingFormField]?.push(issue.message);
    } else {
      formMessage ??= issue.message;
    }
  }

  return {
    message:
      formMessage ??
      (Object.keys(fieldErrors).length > 0
        ? "Please correct the highlighted fields."
        : "Please review the meeting details."),
    errors: fieldErrors,
    values: getMeetingFormValues(formData),
  };
}