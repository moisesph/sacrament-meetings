'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isDemoMeetingDeletionEnabled } from "./meeting-delete-policy";
import {
  MeetingDeletionDisabledError,
  MeetingValidationError,
  runMeetingMutation,
} from "./meeting-action-errors";
import {
  getMeetingValidationState,
  type MeetingFormState,
} from "./meeting-form-state";
import {
  createMeeting as createMeetingInDatabase,
  updateMeeting as updateMeetingInDatabase,
  deleteMeeting as deleteMeetingInDatabase,
} from "./meetings-db";

const hymnSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().trim().min(1, "Hymn title is required"),
});

const wardBusinessSchema = z.object({
  description: z.string().trim().min(1, "Ward business description is required"),
});

const speakerSchema = z.object({
  name: z.string().trim().min(1, "Speaker name is required"),
  topic: z.string().trim(),
  type: z.enum(["speaker", "musical-number"]),
});

function jsonField<T extends z.ZodType>(fieldName: string, schema: T) {
  return z
    .string({
      error: `${fieldName} must be supplied as a JSON string`,
    })
    .transform((value, context) => {
      try {
        return JSON.parse(value);
      } catch {
        context.addIssue({
          code: "custom",
          message: `${fieldName} must contain valid JSON`,
        });
        return z.NEVER;
      }
    })
    .pipe(schema);
}

const booleanStringSchema = z
  .enum(["true", "false"], {
    error: "stakeBusiness must be \"true\" or \"false\"",
  })
  .transform((value) => value === "true");

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must use YYYY-MM-DD")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  }, "date must be a valid calendar date");

const announcementSchema = z.array(
  z.string().trim().min(1, "Announcement text is required"),
);

const announcementsFieldSchema = z.union([
  announcementSchema,
  z
    .string({
      error: "announcements must be text, an array, or a JSON array string",
    })
    .transform((value) => {
      let parsed: unknown;

      try {
        parsed = JSON.parse(value);
      } catch {
        return [value];
      }

      return Array.isArray(parsed) ? parsed : [value];
    })
    .pipe(announcementSchema),
]);

const meetingFormSchema = z.object({
  date: isoDateSchema,
  meetingType: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().trim().min(1, "presiding is required"),
  conducting: z.string().trim().min(1, "conducting is required"),
  announcements: announcementsFieldSchema.optional(),
  openingHymn: jsonField("openingHymn", hymnSchema),
  openingPrayer: z.string().trim().min(1, "openingPrayer is required"),
  wardBusiness: jsonField(
    "wardBusiness",
    z.array(wardBusinessSchema),
  ),
  stakeBusiness: booleanStringSchema,
  sacramentHymn: jsonField("sacramentHymn", hymnSchema),
  speakers: jsonField("speakers", z.array(speakerSchema)),
  closingHymn: jsonField("closingHymn", hymnSchema),
  closingPrayer: z.string().trim().min(1, "closingPrayer is required"),
});

const meetingUpdateSchema = meetingFormSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one meeting field must be submitted",
  });

function getRawFormData(formData: FormData): Record<string, unknown> {
  const fields = [
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

  const raw: Record<string, unknown> = {};

  for (const field of fields) {
    if (formData.has(field)) {
      const values = formData.getAll(field);
      raw[field] = values.length === 1 ? values[0] : values;
    }
  }

  return raw;
}

export async function createMeeting(
  _previousState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const result = meetingFormSchema.safeParse(getRawFormData(formData));

  if (!result.success) {
    return getMeetingValidationState(result.error.issues, formData);
  }

  const meeting = await runMeetingMutation("create", () =>
    createMeetingInDatabase(result.data),
  );

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${meeting.id}`);
  revalidatePath("/meetings/current");

  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _previousState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new MeetingValidationError("id: Invalid meeting ID");
  }

  const result = meetingUpdateSchema.safeParse(getRawFormData(formData));

  if (!result.success) {
    return getMeetingValidationState(result.error.issues, formData);
  }

  const meeting = await runMeetingMutation(
    "update",
    () => updateMeetingInDatabase(id, result.data),
    id,
  );

  if (!meeting) {
    throw new Error("This meeting could not be updated. It may no longer exist.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath("/meetings/current");

  redirect("/meetings");
}

export async function deleteMeeting(id: number): Promise<boolean> {
  if (!isDemoMeetingDeletionEnabled()) {
    throw new MeetingDeletionDisabledError();
  }

  const deleted = await runMeetingMutation(
    "delete",
    () => deleteMeetingInDatabase(id),
    id,
  );

  if (deleted) {
    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
    revalidatePath("/meetings/current");
  }

  return deleted;
}