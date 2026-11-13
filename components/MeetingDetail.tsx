import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${meeting.date}T12:00:00`));

  return (
    <article className="w-full overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="h-1 bg-[#006184]" />

      <header className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#006184]">
          {meeting.meetingType} meeting
        </p>

        <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Sacrament Meeting
          </h1>

          <time className="text-sm text-slate-600" dateTime={meeting.date}>
            {formattedDate}
          </time>
        </div>
      </header>

      <section className="grid gap-3 border-b border-slate-200 px-5 py-4 sm:grid-cols-2 sm:px-6">
        <AgendaItem label="Presiding" value={meeting.presiding} />
        <AgendaItem label="Conducting" value={meeting.conducting} />
      </section>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <MeetingSection title="Announcements">
          <ul className="list-outside list-disc space-y-1 pl-5 text-sm text-slate-700 marker:text-[#006184]">
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        </MeetingSection>
      )}

      <MeetingSection title="Opening">
        <div className="grid gap-3 sm:grid-cols-2">
          <AgendaItem
            label="Opening Hymn"
            value={`#${meeting.openingHymn.number} - ${meeting.openingHymn.title}`}
          />

          <AgendaItem label="Opening Prayer" value={meeting.openingPrayer} />
        </div>
      </MeetingSection>

      {(meeting.wardBusiness.length > 0 || meeting.stakeBusiness) && (
        <MeetingSection title="Church Business">
          <div className="space-y-3">
            {meeting.wardBusiness.length > 0 && (
              <div className="border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">
                  Ward Business
                </p>

                <ul className="mt-2 list-outside list-disc space-y-1 pl-5 text-sm text-slate-700 marker:text-[#006184]">
                  {meeting.wardBusiness.map((item, index) => (
                    <li key={`${item.description}-${index}`}>
                      {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meeting.stakeBusiness && (
              <AgendaItem
                label="Stake Business"
                value="Stake business will be presented"
              />
            )}
          </div>
        </MeetingSection>
      )}

      <MeetingSection title="Sacrament">
        <AgendaItem
          label="Sacrament Hymn"
          value={`#${meeting.sacramentHymn.number} - ${meeting.sacramentHymn.title}`}
        />
      </MeetingSection>

      <MeetingSection title="Program">
        <div className="grid gap-3 sm:grid-cols-2">
          {meeting.speakers.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="border border-slate-200 px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#006184]">
                {item.type === "musical-number"
                  ? "Musical Number"
                  : `Speaker ${index + 1}`}
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {item.name}
              </p>

              {item.topic && (
                <p className="mt-1 text-sm text-slate-600">
                  Topic: {item.topic}
                </p>
              )}
            </div>
          ))}
        </div>
      </MeetingSection>

      <section className="px-5 py-4 sm:px-6">
        <SectionTitle>Closing</SectionTitle>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <AgendaItem
            label="Closing Hymn"
            value={`#${meeting.closingHymn.number} - ${meeting.closingHymn.title}`}
          />

          <AgendaItem label="Closing Prayer" value={meeting.closingPrayer} />
        </div>
      </section>
    </article>
  );
}

interface MeetingSectionProps {
  title: string;
  children: React.ReactNode;
}

function MeetingSection({ title, children }: MeetingSectionProps) {
  return (
    <section className="border-b border-slate-200 px-5 py-4 sm:px-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-3">{children}</div>
    </section>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="border-l-2 border-[#006184] pl-3 text-lg font-semibold text-slate-900">
      {children}
    </h2>
  );
}

interface AgendaItemProps {
  label: string;
  value: string;
}

function AgendaItem({ label, value }: AgendaItemProps) {
  return (
    <div className="h-full border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>

      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
