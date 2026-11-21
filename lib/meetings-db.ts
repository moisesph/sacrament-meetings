import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = "",
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ""
): Promise<number> {
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE date = ${date}::date
    ORDER BY id ASC
  `;

  return rows as unknown as SacramentMeeting[];
}

function requireMeetingId(id: number): void {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID");
  }
}

function requireValidDate(date: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Invalid meeting date");
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date
  ) {
    throw new Error("Invalid meeting date");
  }
}

function requireMeetingType(meetingType: string): void {
  if (
    !["testimony", "regular", "stake", "general", "special"].includes(
      meetingType
    )
  ) {
    throw new Error("Invalid meeting type");
  }
}

function requireNonEmptyString(value: string, fieldName: string): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} is required`);
  }
}

export async function createMeeting(
  data: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
  requireValidDate(data.date);
  requireMeetingType(data.meetingType);
  requireNonEmptyString(data.presiding, "Presiding");
  requireNonEmptyString(data.conducting, "Conducting");
  requireNonEmptyString(data.openingPrayer, "Opening prayer");
  requireNonEmptyString(data.closingPrayer, "Closing prayer");

  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date}::date,
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []}::text[],
      ${JSON.stringify(data.openingHymn)}::jsonb,
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)}::jsonb,
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(data.speakers)}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb,
      ${data.closingPrayer}
    )
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  return rows[0] as unknown as SacramentMeeting;
}

export async function addMeeting(
  data: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
  return createMeeting(data);
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  requireMeetingId(id);

  if (updates.date !== undefined) {
    requireValidDate(updates.date);
  }
  if (updates.meetingType !== undefined) {
    requireMeetingType(updates.meetingType);
  }
  if (updates.presiding !== undefined) {
    requireNonEmptyString(updates.presiding, "Presiding");
  }
  if (updates.conducting !== undefined) {
    requireNonEmptyString(updates.conducting, "Conducting");
  }
  if (updates.openingPrayer !== undefined) {
    requireNonEmptyString(updates.openingPrayer, "Opening prayer");
  }
  if (updates.closingPrayer !== undefined) {
    requireNonEmptyString(updates.closingPrayer, "Closing prayer");
  }

  const rows = await sql`
    UPDATE meetings
    SET
      date = CASE WHEN ${updates.date !== undefined} THEN ${updates.date ?? null}::date ELSE date END,
      meeting_type = CASE WHEN ${updates.meetingType !== undefined} THEN ${updates.meetingType ?? null} ELSE meeting_type END,
      presiding = CASE WHEN ${updates.presiding !== undefined} THEN ${updates.presiding ?? null} ELSE presiding END,
      conducting = CASE WHEN ${updates.conducting !== undefined} THEN ${updates.conducting ?? null} ELSE conducting END,
      announcements = CASE WHEN ${updates.announcements !== undefined} THEN ${updates.announcements ?? []}::text[] ELSE announcements END,
      opening_hymn = CASE WHEN ${updates.openingHymn !== undefined} THEN ${JSON.stringify(updates.openingHymn ?? null)}::jsonb ELSE opening_hymn END,
      opening_prayer = CASE WHEN ${updates.openingPrayer !== undefined} THEN ${updates.openingPrayer ?? null} ELSE opening_prayer END,
      ward_business = CASE WHEN ${updates.wardBusiness !== undefined} THEN ${JSON.stringify(updates.wardBusiness ?? null)}::jsonb ELSE ward_business END,
      stake_business = CASE WHEN ${updates.stakeBusiness !== undefined} THEN ${updates.stakeBusiness ?? null} ELSE stake_business END,
      sacrament_hymn = CASE WHEN ${updates.sacramentHymn !== undefined} THEN ${JSON.stringify(updates.sacramentHymn ?? null)}::jsonb ELSE sacrament_hymn END,
      speakers = CASE WHEN ${updates.speakers !== undefined} THEN ${JSON.stringify(updates.speakers ?? null)}::jsonb ELSE speakers END,
      closing_hymn = CASE WHEN ${updates.closingHymn !== undefined} THEN ${JSON.stringify(updates.closingHymn ?? null)}::jsonb ELSE closing_hymn END,
      closing_prayer = CASE WHEN ${updates.closingPrayer !== undefined} THEN ${updates.closingPrayer ?? null} ELSE closing_prayer END
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  requireMeetingId(id);

  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}
