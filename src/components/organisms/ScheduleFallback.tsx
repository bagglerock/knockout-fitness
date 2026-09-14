import { ActionLink } from '../atoms/ActionLink';
import { WeeklySchedule } from '../molecules/WeeklySchedule';
import { calendarLink } from '../../services/calendar';

export function ScheduleFallback({ calendarId }: { calendarId: string }) {
  return (
    <div className="regular-schedule">
      <div className="regular-schedule-heading">
        <p className="small-label">THE WEEK AT KNOCKOUT</p>
        <h2>WEEKLY CLASS SCHEDULE.</h2>
      </div>
      <p className="notice">
        {calendarId
          ? 'Live updates are unavailable. Showing our regular weekly timetable. '
          : 'Our regular weekly timetable. '}
        All times Eastern. Please confirm last-minute changes with a coach.
      </p>
      <WeeklySchedule />
      <div className="schedule-contact">
        <p>Not sure where to start? We’ll help you find your class.</p>
        <ActionLink href="tel:+17325987167">Call Jim · 732-598-7167</ActionLink>
        {calendarId && (
          <a className="text-link" href={calendarLink(calendarId)}>
            Open Google Calendar ↗
          </a>
        )}
      </div>
    </div>
  );
}
