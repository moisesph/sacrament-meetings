export default function EditMeetingLoading() {
  const fields = [
    { label: "w-1/4", control: "h-10" },
    { label: "w-1/3", control: "h-10" },
    { label: "w-1/4", control: "h-10" },
    { label: "w-1/3", control: "h-10" },
    { label: "w-2/5", control: "h-20" },
    { label: "w-1/3", control: "h-16" },
    { label: "w-1/4", control: "h-10" },
    { label: "w-2/5", control: "h-20" },
    { label: "w-1/4", control: "h-10" },
    { label: "w-1/3", control: "h-16" },
    { label: "w-2/5", control: "h-20" },
    { label: "w-1/3", control: "h-16" },
    { label: "w-1/4", control: "h-10" },
  ];

  return (
    <section className="mx-auto max-w-2xl border border-[color:var(--color-muted)]/20 bg-[var(--color-surface)] p-8 text-[color:var(--color-text)] shadow-sm">
      <p role="status" className="sr-only">
        Loading meeting…
      </p>

      <div aria-hidden="true" className="motion-safe:animate-pulse">
        <div className="h-8 w-2/5 rounded-sm bg-[color:var(--color-muted)]/25" />

        <div className="mt-6 grid gap-4">
          {fields.map((field, index) => (
            <div key={index} className="grid gap-1">
              <div
                className={`h-5 ${field.label} rounded-sm bg-[color:var(--color-muted)]/25`}
              />
              <div
                className={`${field.control} w-full rounded-sm border border-[color:var(--color-muted)]/40 bg-[color:var(--color-muted)]/10`}
              />
            </div>
          ))}

          <div className="mt-2 h-10 w-32 rounded-sm bg-[var(--color-primary)]/50" />
        </div>
      </div>
    </section>
  );
}
