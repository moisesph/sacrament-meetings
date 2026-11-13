import {
  getMeetings,
  getMeetingsByDate,
} from "../../../lib/meetings-db";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");

  const meetings = date
    ? await getMeetingsByDate(date)
    : await getMeetings();

  return Response.json(meetings, { status: 200 });
}