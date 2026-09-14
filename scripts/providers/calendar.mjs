import { requestJson } from './http.mjs';

function eventsUrl(env, pageToken) {
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(env.GOOGLE_CALENDAR_ID)}/events`,
  );
  url.search = new URLSearchParams({
    key: env.GOOGLE_API_KEY,
    singleEvents: 'true',
    orderBy: 'startTime',
    timeZone: 'America/New_York',
    timeMin: new Date().toISOString(),
    timeMax: new Date(Date.now() + 28 * 86400_000).toISOString(),
    maxResults: '250',
    ...(pageToken ? { pageToken } : {}),
  }).toString();
  return url;
}
function normalizeEvent(event) {
  return {
    id: String(event.id),
    title: String(event.summary || 'Class').slice(0, 200),
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date,
    allDay: Boolean(event.start.date),
  };
}
export async function calendarFeed(env) {
  const events = [];
  let pageToken;
  for (let page = 0; page < 20; page++) {
    const data = await requestJson(eventsUrl(env, pageToken));
    if (!Array.isArray(data.items)) throw new Error('Invalid calendar response');
    events.push(...data.items.filter((event) => event.status !== 'cancelled').map(normalizeEvent));
    pageToken = data.nextPageToken;
    if (!pageToken) break;
  }
  if (pageToken)
    throw new Error('Calendar pagination limit reached; retained previous complete feed');
  return { fetchedAt: new Date().toISOString(), source: 'google-calendar', items: events };
}
