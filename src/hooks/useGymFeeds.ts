import { useEffect, useState } from 'react';
import { initialSnapshot, loadFeedSnapshot, type FeedKind } from '../services/feedClient';
export function useGymFeeds(kind: FeedKind) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  useEffect(() => {
    let active = true;
    let current: AbortController | undefined;
    async function refresh() {
      current?.abort();
      const controller = new AbortController();
      current = controller;
      const timeout = setTimeout(() => controller.abort(), 10_000);
      try {
        const next = await loadFeedSnapshot(kind, controller.signal);
        if (active && current === controller) setSnapshot(next);
      } finally {
        clearTimeout(timeout);
      }
    }
    void refresh();
    const interval = setInterval(refresh, 60_000);
    return () => {
      active = false;
      current?.abort();
      clearInterval(interval);
    };
  }, [kind]);
  return snapshot;
}
