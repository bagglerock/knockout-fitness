export type Photo = { id: string; imageUrl: string; permalink: string; caption: string };
export type ClassEvent = { id: string; title: string; start: string; end: string; allDay: boolean };
export type CalendarFeed = { items: ClassEvent[]; fetchedAt: string };
export type Config = { calendarId: string; instagramFeedUrl: string; calendarFeedUrl: string };
export const defaults: Config = {
  calendarId: '',
  instagramFeedUrl: './feeds/instagram.json',
  calendarFeedUrl: './feeds/calendar.json',
};
export function httpsUrl(value: unknown, instagram = false): value is string {
  if (typeof value !== 'string') return false;
  try {
    const u = new URL(value);
    return (
      u.protocol === 'https:' &&
      (!instagram || u.hostname === 'www.instagram.com' || u.hostname === 'instagram.com')
    );
  } catch {
    return false;
  }
}
export function localUrl(value: unknown, fallback: string): string {
  return typeof value === 'string' &&
    /^\.\/[a-zA-Z0-9_./-]+\.json$/.test(value) &&
    !value.includes('..')
    ? value
    : fallback;
}
export function parsePhotos(data: unknown): Photo[] {
  const feed = data as { fetchedAt?: string; items?: unknown[] };
  if (!feed || !Array.isArray(feed.items) || !feed.fetchedAt) return [];
  const age = Date.now() - Date.parse(feed.fetchedAt);
  if (!Number.isFinite(age) || age < -60_000 || age > 24 * 60 * 60 * 1000) return [];
  return feed.items
    .filter((x): x is Photo => {
      const p = x as Photo;
      return (
        !!p &&
        typeof p.id === 'string' &&
        httpsUrl(p.imageUrl) &&
        httpsUrl(p.permalink, true) &&
        typeof p.caption === 'string'
      );
    })
    .slice(0, 12);
}
export function parseCalendar(data: unknown): { items: ClassEvent[]; fetchedAt: string } | null {
  const feed = data as { fetchedAt?: string; items?: unknown[] };
  if (!feed || !Array.isArray(feed.items) || typeof feed.fetchedAt !== 'string') return null;
  const age = Date.now() - Date.parse(feed.fetchedAt);
  if (!Number.isFinite(age) || age < -60_000 || age > 60 * 60 * 1000) return null;
  const items = feed.items.filter((x): x is ClassEvent => {
    const e = x as ClassEvent;
    return (
      !!e &&
      typeof e.id === 'string' &&
      typeof e.title === 'string' &&
      typeof e.allDay === 'boolean' &&
      typeof e.start === 'string' &&
      typeof e.end === 'string' &&
      Date.parse(e.end) > Date.parse(e.start) &&
      (!e.allDay || (/^\d{4}-\d{2}-\d{2}$/.test(e.start) && /^\d{4}-\d{2}-\d{2}$/.test(e.end))) &&
      Number.isFinite(Date.parse(e.start)) &&
      Number.isFinite(Date.parse(e.end))
    );
  });
  // A malformed feed must not look like a genuinely empty schedule.
  return items.length === feed.items.length ? { items, fetchedAt: feed.fetchedAt } : null;
}
