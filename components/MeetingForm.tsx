'use client';

import {
  useActionState,
  useId,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type InvalidEvent,
} from "react";
import {
  initialMeetingFormState,
  type MeetingFormField,
  type MeetingFormState,
  type MeetingFormValues,
} from "../lib/meeting-form-state";

export type MeetingFormAction = (
  previousState: MeetingFormState,
  formData: FormData,
) => Promise<MeetingFormState>;

interface MeetingFormProps {
  action: MeetingFormAction;
  initialValues: MeetingFormValues;
  mode: "create" | "edit";
}

type EditableControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function subscribeToLocalDate() {
  return () => {};
}

function getLocalDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getServerDate(): string {
  return "";
}

const fieldLabels: Record<MeetingFormField, string> = {
  date: "Date",
  meetingType: "Meeting type",
  presiding: "Presiding",
  conducting: "Conducting",
  announcements: "Announcements (text or JSON array)",
  openingHymn: "Opening hymn (JSON)",
  openingPrayer: "Opening prayer",
  wardBusiness: "Ward business (JSON array)",
  stakeBusiness: "Stake business",
  sacramentHymn: "Sacrament hymn (JSON)",
  speakers: "Speakers (JSON array)",
  closingHymn: "Closing hymn (JSON)",
  closingPrayer: "Closing prayer",
};

export default function MeetingForm({
  action,
  initialValues,
  mode,
}: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialMeetingFormState,
  );
  const localDate = useSyncExternalStore(
    subscribeToLocalDate,
    getLocalDate,
    getServerDate,
  );
  const [editedValues, setEditedValues] = useState<MeetingFormValues>({});
  const values = {
    ...initialValues,
    ...state.values,
    ...editedValues,
    date:
      editedValues.date ??
      state.values.date ??
      initialValues.date ??
      (mode === "create" ? localDate : undefined),
  };
  const [nativeErrors, setNativeErrors] = useState<
    Partial<Record<MeetingFormField, string>>
  >({});
  const idPrefix = useId();
  const labelClassName =
    mode === "create"
      ? "text-sm font-medium text-slate-700"
      : "text-sm font-medium text-[color:var(--color-text)]";
  const controlClassName =
    mode === "create"
      ? "rounded-sm border border-slate-300 px-3 py-2 text-slate-900"
      : "rounded-sm border border-[color:var(--color-muted)]/40 bg-[var(--color-surface)] px-3 py-2 text-[color:var(--color-text)]";
  const selectClassName = `${controlClassName} bg-[var(--color-surface)]`;
  const errorClassName = "min-h-5 text-sm text-red-700";

  function fieldId(field: MeetingFormField): string {
    return `${idPrefix}-${field}`;
  }

  function errorId(field: MeetingFormField): string {
    return `${fieldId(field)}-error`;
  }

  function getErrors(field: MeetingFormField): string[] {
    const nativeError = nativeErrors[field];
    return nativeError ? [nativeError] : state.errors[field] ?? [];
  }

  function handleChange(
    field: MeetingFormField,
    event: ChangeEvent<EditableControl>,
  ) {
    const value = event.currentTarget.value;
    setEditedValues((current) => ({ ...current, [field]: value }));

    if (event.currentTarget.validity.valid) {
      setNativeErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function handleInvalid(
    field: MeetingFormField,
    event: InvalidEvent<EditableControl>,
  ) {
    const validity = event.currentTarget.validity;
    let message = `${fieldLabels[field]} is invalid. Check the value and try again.`;

    if (validity.valueMissing) {
      message = `${fieldLabels[field]} is required.`;
    } else if (validity.typeMismatch || validity.badInput) {
      message = `Enter a valid ${fieldLabels[field].toLowerCase()}.`;
    }

    setNativeErrors((current) => ({ ...current, [field]: message }));
  }

  function controlProps(field: MeetingFormField) {
    const hasErrors = getErrors(field).length > 0;

    return {
      id: fieldId(field),
      "aria-describedby": errorId(field),
      "aria-invalid": hasErrors ? true : undefined,
      onChange: (event: ChangeEvent<EditableControl>) =>
        handleChange(field, event),
      onInvalid: (event: InvalidEvent<EditableControl>) =>
        handleInvalid(field, event),
      value: values[field] ?? "",
    };
  }

  function renderError(field: MeetingFormField) {
    return (
      <p id={errorId(field)} aria-live="polite" className={errorClassName}>
        {getErrors(field).map((message, index) => (
          <span key={`${field}-${index}`} className="block">
            {message}
          </span>
        ))}
      </p>
    );
  }

  function renderLabel(field: MeetingFormField) {
    return (
      <label htmlFor={fieldId(field)} className={labelClassName}>
        {fieldLabels[field]}
      </label>
    );
  }

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      {state.message && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="grid gap-1">
        {renderLabel("date")}
        <input
          {...controlProps("date")}
          type="date"
          name="date"
          required
          className={controlClassName}
        />
        {renderError("date")}
      </div>

      <div className="grid gap-1">
        {renderLabel("meetingType")}
        <select
          {...controlProps("meetingType")}
          name="meetingType"
          required
          className={selectClassName}
        >
          <option value="testimony">Testimony</option>
          <option value="regular">Regular</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
        {renderError("meetingType")}
      </div>

      <div className="grid gap-1">
        {renderLabel("presiding")}
        <input
          {...controlProps("presiding")}
          name="presiding"
          required
          className={controlClassName}
        />
        {renderError("presiding")}
      </div>

      <div className="grid gap-1">
        {renderLabel("conducting")}
        <input
          {...controlProps("conducting")}
          name="conducting"
          required
          className={controlClassName}
        />
        {renderError("conducting")}
      </div>

      <div className="grid gap-1">
        {renderLabel("announcements")}
        <textarea
          {...controlProps("announcements")}
          name="announcements"
          rows={3}
          className={`${controlClassName} font-mono text-sm`}
        />
        {renderError("announcements")}
      </div>

      <div className="grid gap-1">
        {renderLabel("openingHymn")}
        <textarea
          {...controlProps("openingHymn")}
          name="openingHymn"
          rows={2}
          required
          className={`${controlClassName} font-mono text-sm`}
        />
        {renderError("openingHymn")}
      </div>

      <div className="grid gap-1">
        {renderLabel("openingPrayer")}
        <input
          {...controlProps("openingPrayer")}
          name="openingPrayer"
          required
          className={controlClassName}
        />
        {renderError("openingPrayer")}
      </div>

      <div className="grid gap-1">
        {renderLabel("wardBusiness")}
        <textarea
          {...controlProps("wardBusiness")}
          name="wardBusiness"
          rows={3}
          required
          className={`${controlClassName} font-mono text-sm`}
        />
        {renderError("wardBusiness")}
      </div>

      <div className="grid gap-1">
        {renderLabel("stakeBusiness")}
        <select
          {...controlProps("stakeBusiness")}
          name="stakeBusiness"
          required
          className={selectClassName}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {renderError("stakeBusiness")}
      </div>

      <div className="grid gap-1">
        {renderLabel("sacramentHymn")}
        <textarea
          {...controlProps("sacramentHymn")}
          name="sacramentHymn"
          rows={2}
          required
          className={`${controlClassName} font-mono text-sm`}
        />
        {renderError("sacramentHymn")}
      </div>

      <div className="grid gap-1">
        {renderLabel("speakers")}
        <textarea
          {...controlProps("speakers")}
          name="speakers"
          rows={3}
          required
          className={`${controlClassName} font-mono text-sm`}
        />
        {renderError("speakers")}
      </div>

      <div className="grid gap-1">
        {renderLabel("closingHymn")}
        <textarea
          {...controlProps("closingHymn")}
          name="closingHymn"
          rows={2}
          required
          className={`${controlClassName} font-mono text-sm`}
        />
        {renderError("closingHymn")}
      </div>

      <div className="grid gap-1">
        {renderLabel("closingPrayer")}
        <input
          {...controlProps("closingPrayer")}
          name="closingPrayer"
          required
          className={controlClassName}
        />
        {renderError("closingPrayer")}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={
          mode === "create"
            ? "mt-2 w-fit rounded-sm bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
            : "mt-2 w-fit rounded-sm bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        }
      >
        {isPending ? "Saving…" : mode === "create" ? "Create meeting" : "Save changes"}
      </button>
    </form>
  );
}
