import { upcomingClasses, calendarLink } from '../../services/calendar';
import type { CalendarFeed } from '../../feeds';
import { ClassRow } from '../molecules/ClassRow';
export function LiveSchedule({
  calendar,
  calendarId,
}: {
  calendar: CalendarFeed;
  calendarId: string;
}) {
  const upcoming = upcomingClasses(calendar.items);
  const stale = Date.now() - Date.parse(calendar.fetchedAt) > 15 * 60_000;
  return (
    <div className="live-schedule">
      <p className="notice">
        All times Eastern.
        {stale && ' Updates are delayed. Please confirm with the gym before attending.'}
      </p>
      {upcoming.length ? (
        <ul>
          {upcoming.map((event) => (
            <ClassRow key={event.id} event={event} />
          ))}
        </ul>
      ) : (
        <p className="empty-state">
          No upcoming classes are listed. Contact the gym for availability.
        </p>
      )}
      {calendarId && (
        <a className="text-link" href={calendarLink(calendarId)}>
          Open Google Calendar ↗
        </a>
      )}
    </div>
  );
}
