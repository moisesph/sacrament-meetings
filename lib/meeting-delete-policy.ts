export function isDemoMeetingDeletionEnabled(): boolean {
  const demoDatabaseId = process.env.MEETING_DEMO_DELETE_DATABASE_ID;
  const currentDatabaseId = process.env.NEON_PROJECT_ID;

  return (
    process.env.NODE_ENV !== "production" &&
    process.env.MEETING_DEMO_DELETE_ENABLED === "true" &&
    Boolean(demoDatabaseId) &&
    Boolean(currentDatabaseId) &&
    demoDatabaseId === currentDatabaseId
  );
}