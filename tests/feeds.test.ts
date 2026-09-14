import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localUrl, parseCalendar, parsePhotos } from '../src/feeds';

const fresh = () => new Date().toISOString();
const photo = {
  id: '1',
  imageUrl: 'https://cdn.example.com/photo.jpg',
  permalink: 'https://www.instagram.com/p/example/',
  caption: 'Training',
};
test('photo feed rejects stale content and unsafe links', () => {
  assert.equal(parsePhotos({ fetchedAt: fresh(), items: [photo] }).length, 1);
  assert.equal(parsePhotos({ fetchedAt: '2020-01-01T00:00:00Z', items: [photo] }).length, 0);
  assert.equal(
    parsePhotos({ fetchedAt: fresh(), items: [{ ...photo, permalink: 'javascript:alert(1)' }] })
      .length,
    0,
  );
  assert.equal(
    parsePhotos({ fetchedAt: fresh(), items: [{ ...photo, imageUrl: 'data:text/html,evil' }] })
      .length,
    0,
  );
});
test('calendar distinguishes empty data from unavailable or malformed data', () => {
  assert.deepEqual(parseCalendar({ fetchedAt: fresh(), items: [] })?.items, []);
  assert.equal(parseCalendar({ fetchedAt: null, items: [] }), null);
  assert.equal(parseCalendar({ fetchedAt: '2020-01-01T00:00:00Z', items: [] }), null);
  assert.equal(parseCalendar({ fetchedAt: fresh(), items: [{ title: 'Broken' }] }), null);
});
test('runtime feed paths cannot redirect requests to an external host', () => {
  assert.equal(localUrl('https://evil.example/feed.json', './default.json'), './default.json');
  assert.equal(localUrl('./../private.json', './default.json'), './default.json');
  assert.equal(localUrl('./feeds/calendar.json', './default.json'), './feeds/calendar.json');
});

import { upcomingClasses, eventDay, eventTime } from '../src/services/calendar';
test('all-day closures keep Eastern dates and exclusive end dates', () => {
  const closure = {
    id: 'closed',
    title: 'Closed',
    start: '2026-12-25',
    end: '2026-12-26',
    allDay: true,
  };
  assert.match(eventDay(closure), /Dec 25/);
  assert.equal(upcomingClasses([closure], new Date('2026-12-26T04:00:00Z')).length, 1);
  assert.equal(upcomingClasses([closure], new Date('2026-12-26T05:00:00Z')).length, 0);
});
test('class times follow Eastern daylight saving changes', () => {
  assert.equal(eventTime('2026-03-08T06:30:00Z'), '1:30 AM');
  assert.equal(eventTime('2026-03-08T07:30:00Z'), '3:30 AM');
  assert.equal(eventTime('2026-11-01T05:30:00Z'), '1:30 AM');
  assert.equal(eventTime('2026-11-01T06:30:00Z'), '1:30 AM');
});
