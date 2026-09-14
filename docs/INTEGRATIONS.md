# Instagram and Google Calendar

Status: integration design, not connected. Provider requirements checked September
14, 2026; recheck exact permissions and account configuration during implementation.

## Instagram photos

### Owner experience

The operator posts to the gym's Instagram account as usual. The website periodically
refreshes a gallery from that account. Clicking a gallery item opens the original
Instagram post. The original brand graphics and curated site photos remain local.

### Account prerequisite

The repository currently links to an Instagram **location page**, not an account
profile. That location URL does not identify the authorized media owner. Obtain
the actual gym handle and confirm who can authorize the account.

Meta's Instagram API with Instagram Login supports professional Business and
Creator accounts. A personal account requires a different plan, such as conversion
with the owner's agreement or using a curated local gallery while access is resolved.
Do not implement scraping of Instagram pages or use the retired Basic Display API.

Preferred path: official Instagram API with Instagram Login and minimum read
permissions. Confirm the current media-read scope, app mode, app-role requirements,
and any review/access requirements for this specific owner/app relationship.
Do not promise production access solely because a development token works.

Sources: [Instagram Login](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login),
[platform overview](https://developers.facebook.com/documentation/instagram-platform/overview),
[media reference](https://developers.facebook.com/documentation/instagram-platform/reference/instagram-media).

### Proposed implementation

- A server-side adapter reads the authorized account's recent media and emits a small public gallery response.
- Keep credentials on the server. Validate OAuth state and use the provider's required redirect flow; do not pass access tokens into React.
- Start with a small gallery of still images and suitable carousel images. Define ordering and deduplicate by media ID. Treat video/Reels as an explicit later display choice rather than broken image URLs.
- Suggested refresh target: every 30 minutes, subject to provider quotas and hosting capabilities. This is periodic synchronization, not an instant update guarantee.
- Use scheduled refresh where available, with bounded caching and request coalescing to avoid a provider call for every page view.
- Refresh expiring authorization according to the selected API's current rules; record expiry and failure status privately. Provide a reconnection procedure when authorization is revoked or expires.
- Refresh media URLs rather than treating them as permanent. Remove deleted/unavailable media on successful reconciliation. Respect current provider retention/deletion requirements when caching.
- Escape captions as plain text. Allow only expected HTTPS media and post URLs. Do not expose provider error payloads or tokens in public responses/logs.
- On failure, use still-valid cached items; remove broken items and fall back to curated local photos with a link to the confirmed Instagram profile. Do not label local fallback images as recent Instagram posts.

Proposed public shape: `items[{id, imageUrl, permalink, caption, publishedAt}]`,
`fetchedAt`, and `source` (`instagram` or `local`). Expose only fields needed by the UI.
No token belongs in that response.

### Validation before activation

Verify image/carousel rendering, a new post appearing after refresh, expired and
revoked credentials, rate limits, broken media URLs, removal of deleted posts,
and a useful local fallback. The gallery must never block page rendering.

## Google Calendar schedule

### Owner experience

Create a dedicated gym classes calendar in the gym operator's Google account.
The initial calendar creation and sharing setup happen in a browser; afterwards,
the operator can create and edit class events using Google Calendar on a phone.
Create repeating events for normal classes and change individual occurrences for
exceptions. The website reads the calendar without a website rebuild.

Use `America/New_York` for the gym calendar and visible schedule, including daylight
saving changes. Label the displayed timezone so visitors elsewhere do not mistake
class times for their device's local timezone.

Keep this calendar limited to public class information. Personal appointments,
member details, private lesson attendee lists, and internal notes do not belong in it.

Sources: [create a calendar](https://support.google.com/calendar/answer/37095?hl=en),
[Google Calendar mobile app](https://play.google.com/store/apps/details?hl=en&id=com.google.android.calendar),
[embed a calendar](https://support.google.com/calendar/answer/41207?hl=en).

### Display choices

| Approach | Benefits | Tradeoffs |
| --- | --- | --- |
| Public Google Calendar embed | Fastest initial setup; no custom calendar API backend | Limited visual control; verify mobile sizing and provide an open-calendar link |
| Custom React agenda using Calendar API | Matches the site's branding; upcoming classes, day navigation, and optional class filters | Backend/cache integration and failure handling needed |

Recommended target: custom branded agenda, with an open-Google-Calendar link and
an embed as an optional interim solution. The embed is an option to ship sooner,
not a second schedule for the owner to maintain.

For a public dedicated calendar, use public read access with a restricted API key
where required by Google project configuration. For a private calendar, use a
properly authorized server-side read-only connection and explicitly filter fields
published to visitors. Private OAuth credentials never reach the frontend.

### Proposed custom agenda behavior

Fetch a bounded upcoming window, expand recurring events with `singleEvents=true`,
order by start time, and follow pagination. A full bounded refresh should replace
that cached window so removed events do not linger. Handle rescheduled recurring
instances, canceled events, all-day events, and exclusive all-day end dates.
Treat descriptions as untrusted text and publish only approved fields.

Suggested cache target: five minutes. Show a last-updated warning if older than
15 minutes after failures; after an hour without a successful refresh, suppress
the potentially misleading "next class" claim and direct visitors to the calendar
or gym. These thresholds are proposed product choices, not Google guarantees.

Use title, start/end time, and optional public description/location. Class type
filters should use a documented naming convention the operator can manage from
a phone; unrecognized titles still appear under "All classes."

An all-day "Closed" notice must be visibly distinct. Adding such a notice does
not automatically cancel repeating classes: the operator must remove/cancel those
occurrences, unless a later explicit closure rule is implemented.

The current Saturday schedule says `10:30 AM - 11:00 PM - MMA Live Sparring`.
Confirm the intended end time; do not silently fix it or import it as verified.
No historical schedule should be presented as current without owner confirmation.

Source: [Calendar events.list](https://developers.google.com/workspace/calendar/api/v3/reference/events/list).

### Validation before activation

Verify a phone edit reaching the site within the target interval, a repeating
class, one canceled occurrence, a rescheduled occurrence, a holiday closure,
all-day rendering, both DST transitions, a valid empty week, pagination, and API
failure. Calendar reads must never modify events or create bookings.
