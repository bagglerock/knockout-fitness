import type { ClassEvent } from '../feeds';
export const gymTimezone = 'America/New_York';
export function calendarLink(id: string) {
  return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(id)}&ctz=America%2FNew_York&mode=AGENDA`;
}
export function upcomingClasses(items: ClassEvent[], now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: gymTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  const localDate = `${part('year')}-${part('month')}-${part('day')}`;
  return items.filter((item) =>
    item.allDay ? item.end > localDate : Date.parse(item.end) > now.getTime(),
  );
}
export function eventDay(event: ClassEvent) {
  // Date-only events have no timezone: noon UTC retains the gym's date.
  return new Date(event.allDay ? `${event.start}T12:00:00Z` : event.start).toLocaleDateString(
    'en-US',
    { timeZone: gymTimezone, weekday: 'short', month: 'short', day: 'numeric' },
  );
}
export function eventTime(value: string) {
  return new Date(value).toLocaleTimeString('en-US', {
    timeZone: gymTimezone,
    hour: 'numeric',
    minute: '2-digit',
  });
}
