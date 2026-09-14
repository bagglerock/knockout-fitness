import {
  defaults,
  localUrl,
  parseCalendar,
  parsePhotos,
  type Config,
  type Photo,
  type CalendarFeed,
} from '../feeds';
export type FeedKind = 'photos' | 'calendar';
export type FeedSnapshot = { config: Config; photos: Photo[]; calendar: CalendarFeed | null };
export const initialSnapshot: FeedSnapshot = { config: defaults, photos: [], calendar: null };
async function readJson(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal, cache: 'no-store' });
  if (!response.ok) throw new Error('Feed unavailable');
  return response.json();
}
async function readConfig(signal: AbortSignal): Promise<Config> {
  try {
    const data = await readJson('./site-config.json', signal);
    return {
      calendarId: typeof data.calendarId === 'string' ? data.calendarId : '',
      instagramFeedUrl: localUrl(data.instagramFeedUrl, defaults.instagramFeedUrl),
      calendarFeedUrl: localUrl(data.calendarFeedUrl, defaults.calendarFeedUrl),
    };
  } catch {
    return defaults;
  }
}
export async function loadFeedSnapshot(kind: FeedKind, signal: AbortSignal): Promise<FeedSnapshot> {
  const config = await readConfig(signal);
  try {
    const data = await readJson(
      kind === 'photos' ? config.instagramFeedUrl : config.calendarFeedUrl,
      signal,
    );
    return {
      config,
      photos: kind === 'photos' ? parsePhotos(data) : [],
      calendar: kind === 'calendar' ? parseCalendar(data) : null,
    };
  } catch {
    return { ...initialSnapshot, config };
  }
}
