# Local preview, GoDaddy deployment, and content connections

## What is ready

Five prerendered React pages, the original brand assets, phone/email/map/social
links, a local gallery, and a feed-driven agenda/gallery. The schedule always uses
our own design, falling back to the existing weekly timetable when necessary.
An optional Node worker can export public provider data. No provider account has
been connected and nothing has been uploaded to GoDaddy.

## Preview and build

```sh
npm ci
npm run check
npm run build
npm run preview
```

Use Node 22.12+; Node 24 is recommended. If a restricted environment prevents
binding a wildcard host, run `npm run preview -- --host 127.0.0.1`.

Run `npx playwright install chromium` once and `npm run test:e2e` for browser
checks. Review each page at 375px, 768px, and desktop widths, including the
original hero crop, menu, keyboard focus, day selection, imagery, and reduced motion.
The original development environment could not run those browser checks.

## Public configuration

`public/site-config.json` is copied into the build. Every value in it is public:

```json
{
  "calendarId": "",
  "instagramFeedUrl": "./feeds/instagram.json",
  "calendarFeedUrl": "./feeds/calendar.json"
}
```

After upload, editing `site-config.json` directly changes the runtime settings
without another frontend build. Feed paths must be local relative `.json` files.
Never add a token, password, private calendar feed URL, or email credential here.

### Google Calendar: our design, his events

The website renders its own branded agenda. It does not embed Google's calendar.
The operator edits a dedicated public gym calendar from a phone; the private
worker reads it and exports the public event fields for our UI.

1. Create a dedicated gym classes calendar in the operator's account using a browser.
2. Set America/New_York timezone and public event details. Keep personal appointments,
   guest lists, and private/member notes out of this calendar.
3. Put its ID and Google API key in the private worker environment described below.
4. Optionally put that same public calendar ID in `site-config.json` to enable an
   external “Open Google Calendar” link. The ID alone does not connect the feed.
5. Add recurring classes and exceptions using the phone app. Verify a real edit
   reaching the website after the worker refresh.

If data is missing, invalid, stale, or unavailable, display the existing weekly
schedule from `src/weekly-schedule.json`. A valid empty calendar stays empty so a
week deliberately cleared for a closure is not replaced with old classes.

### Custom agenda and Instagram worker

The optional worker requires Node 22.12+ on a machine with outbound HTTPS and a
scheduler. It has no npm runtime dependencies. It can run on GoDaddy if the account
supports the required Node/cron setup. Otherwise choose a supported worker host
or adapt the same public JSON contract to PHP. Merely uploading the frontend
will not schedule the worker.

1. Obtain an authorized professional Instagram account ID and long-lived access
   token using the official Instagram Login setup. Confirm the app's current
   permissions and production access for @Knock_Out_Fitness. The handle is not
   the numeric account ID. Select a supported API version in the Meta dashboard.
2. For the custom Calendar agenda, enable Calendar API in a Google project and
   obtain a suitably restricted API key for the public gym calendar. The worker
   does not support private-calendar OAuth in this version; use only the
   dedicated public calendar.
3. Store `.env.example` values in a private file **outside** the domain document
   root and repository, readable only by the operator account (for example mode
   600). Use actual account paths, not the illustrative paths below.
4. Put `scripts/sync-feeds.mjs` and its `providers/` folder in a private directory.
5. Set `FEED_OUTPUT_DIR` to the absolute path of the deployed public `feeds/`
   directory. That directory receives sanitized JSON only.
6. Run the worker with the private environment file:

```sh
node --env-file=/home/ACCOUNT/private/gym-calendar.env /home/ACCOUNT/private/gym-sync/sync-feeds.mjs
```

Use separate environment files/jobs for five-minute Calendar updates and
30-minute Instagram updates. Each file should contain only its provider's values
plus `FEED_OUTPUT_DIR`. Use the actual Node binary path shown by your hosting
account in cron. Schedule once setup succeeds; avoid overlapping worker runs.
Do not paste credentials into cron command arguments or public logs.

The worker fetches the latest 24 Instagram media records and displays up to 12
still-image posts/carousel covers. It deliberately skips videos and does not
crawl old history. Calendar reads the next 28 days, expands recurring events,
follows pagination, omits cancellations, and exports title/start/end/all-day only.
A successful refresh replaces the entire feed; failure keeps the previous file.

The worker expects valid tokens; it does **not** implement OAuth onboarding or
automatic Instagram token renewal. Record token expiry during setup, renew it
using Meta's current documented process before expiration, and update the private
environment file. If access is revoked, reauthorize the owner. This operational
step must be assigned before calling the feed unattended/production-ready.

Source: [Instagram Login](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login),
[Calendar API](https://developers.google.com/workspace/calendar/api/v3/reference/events/list),
[calendar embed](https://support.google.com/calendar/answer/41207?hl=en).

### Fallback behavior

- No usable Instagram feed: original gym gallery plus a direct Instagram link.
- Broken Instagram image: local image with a local gallery label and destination.
- Instagram data older than 24 hours: local gallery.
- Calendar data older than 15 minutes: delayed-update notice on the custom agenda.
- Calendar data older than one hour or unavailable: the current weekly timetable,
  with a fallback notice when a calendar ID is configured and contact actions.
- A valid empty calendar is displayed as empty, not replaced with old class times.
- All-day notices and recurring event exceptions are supported. Creating a
  "Closed" notice does not itself cancel recurring classes; remove those instances.

## Upload to GoDaddy

1. Confirm the domain spelling and document root. The user-supplied domain and old
   README differed, and the live deployment could not be compared here.
2. Confirm current contact details, coach bios, programs, and timetable. The
   historical Saturday 10:30 AM sparring end time is explicitly unconfirmed.
3. Back up the current public files and server configuration to a private location.
4. Run the production build and inspect it in a staging location if supported.
5. Upload the **contents** of `dist/` into the domain root. Preserve any required
   existing `.htaccess` rules. No SPA fallback rewrite is needed for these pages.
6. On later deployments, preserve the configured `site-config.json` and existing
   `feeds/` files instead of replacing them with the empty development defaults.
7. Do not upload the repository, node_modules, .env files, or private worker.
8. Verify HTTPS, each direct `.html` URL, image loading, contact links, phone layout,
   and one real provider update on the actual domain.

The build includes only public configuration and media. No forms submit data,
no payment integration is activated, and no membership is automatically created.

To roll back, restore the backed-up public files and server rules. Stop any newly
configured feed job if abandoning the integration; preserve its private configuration
securely for later use. Do not leave publicly browsable backup archives in the web root.
