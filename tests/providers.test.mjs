import { test } from 'node:test';
import assert from 'node:assert/strict';
import { instagramFeed } from '../scripts/providers/instagram.mjs';
import { calendarFeed } from '../scripts/providers/calendar.mjs';

test('Instagram publishes only display data and supported still images', async (t) => {
  const token = 'test-private-token';
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    assert.equal(options.headers.Authorization, `Bearer ${token}`);
    return Response.json({
      data: [
        {
          id: 'image',
          media_type: 'IMAGE',
          media_url: 'https://cdn.example/image.jpg',
          permalink: 'https://www.instagram.com/p/image/',
          access_token: token,
        },
        {
          id: 'album',
          media_type: 'CAROUSEL_ALBUM',
          permalink: 'https://www.instagram.com/p/album/',
          children: { data: [{ media_type: 'IMAGE', media_url: 'https://cdn.example/album.jpg' }] },
        },
        { id: 'video', media_type: 'VIDEO', media_url: 'https://cdn.example/video.mp4' },
      ],
    });
  });
  const result = await instagramFeed({
    INSTAGRAM_USER_ID: '123',
    INSTAGRAM_API_VERSION: 'v99.0',
    INSTAGRAM_ACCESS_TOKEN: token,
  });
  assert.deepEqual(
    result.items.map((item) => item.id),
    ['image', 'album'],
  );
  assert.equal(JSON.stringify(result).includes(token), false);
});
test('Calendar follows pagination, skips cancellations, and excludes private fields', async (t) => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (url) => {
    calls++;
    assert.equal(url.searchParams.get('singleEvents'), 'true');
    if (calls === 1)
      return Response.json({ items: [{ status: 'cancelled' }], nextPageToken: 'next' });
    assert.equal(url.searchParams.get('pageToken'), 'next');
    return Response.json({
      items: [
        {
          id: 'holiday',
          summary: 'Closed',
          start: { date: '2026-12-25' },
          end: { date: '2026-12-26' },
          attendees: [{ email: 'private@example.com' }],
          description: 'Private note',
        },
      ],
    });
  });
  const result = await calendarFeed({
    GOOGLE_CALENDAR_ID: 'gym@example.com',
    GOOGLE_API_KEY: 'test-key',
  });
  assert.equal(calls, 2);
  assert.deepEqual(result.items, [
    { id: 'holiday', title: 'Closed', start: '2026-12-25', end: '2026-12-26', allDay: true },
  ]);
});
