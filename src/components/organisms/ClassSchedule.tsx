import { useGymFeeds } from '../../hooks/useGymFeeds';
import { LiveSchedule } from './LiveSchedule';
import { ScheduleFallback } from './ScheduleFallback';

export function ClassSchedule() {
  const { config, calendar } = useGymFeeds('calendar');
  if (calendar) return <LiveSchedule calendar={calendar} calendarId={config.calendarId} />;
  return <ScheduleFallback calendarId={config.calendarId} />;
}
