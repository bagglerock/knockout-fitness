import type { ClassEvent } from '../../feeds';
import { eventDay, eventTime } from '../../services/calendar';
export function ClassRow({ event }: { event: ClassEvent }) {
  return (
    <li className="class-row">
      <span className="class-date">{eventDay(event)}</span>
      <div>
        <h3>{event.title}</h3>
        <p>
          {event.allDay ? 'All-day notice' : `${eventTime(event.start)} – ${eventTime(event.end)}`}
        </p>
      </div>
      <span className="class-dot" aria-hidden="true" />
    </li>
  );
}
