# Design and implementation scope

## Goal

Make the site feel like a current version of Knockout Fitness: recognizable,
fast, readable on a phone, and easy for the gym operator to keep fresh.

## Preserve the identity

The current CSS uses black, yellow `#f5e60b`, red `#b52332`, white, and charcoal
`#222`. Retain this palette and the existing graphics. These are source colors;
check contrast for each new text/background pairing.

| Existing asset | Intended use |
| --- | --- |
| `assets/images/9596014.png` | Original logo, displayed at its natural proportions on a suitable light background |
| `assets/images/silouette-wide.png` | Original yellow-and-black fighter artwork for the desktop hero |
| `assets/images/silouette.png` | Existing alternate fighter artwork; inspect cropping for mobile |
| `assets/images/prajioud.jpg` | Preserve as a supporting brand image where appropriate |
| `assets/images/group-2.jpg` and other real gym photos | Community and training sections |
| `assets/images/children_home.png`, `grappling_home.png`, `sparring_home.png` | Existing program graphics retained in the asset inventory |
| `assets/images/jim_profile_0525.jpg`, `linda.jpg` | Existing coach photography, subject to current-content confirmation |
| `assets/class-photos/` | Curated gallery and integration fallback |
| `resources/photos/merchandise/` | Potential future product photography; verify it represents current stock |

Keep original source files. Derived optimized images may be generated without
changing the artwork. Do not substitute generated logos, stock fighters, or a
generic gym brand. The current display font is Black Ops One, with Nanum Gothic
for body text; preserve the strong display character while improving hierarchy.

## Modernize the presentation

- Build a compact header with the original logo, clear navigation, and a useful contact action.
- Retain the yellow fighter hero and existing message, with responsive composition and clear schedule/contact links.
- Replace fixed 600px content sections with content-sized layouts, consistent spacing, and readable line lengths.
- Keep the alternating brand-color sections, refined with stronger alignment and fewer heavy borders.
- Use subtle reveal and hover effects. Respect reduced-motion settings, keep content visible without animation, and avoid scroll hijacking.
- Make keyboard navigation, focus states, touch targets, and image descriptions part of the design.
- Keep the existing gym's language and factual content unless updated information is supplied. Do not invent prices, free trials, credentials, or testimonials.

## Pages and visitor tasks

| Page | Main job |
| --- | --- |
| Home | Explain the gym, introduce programs, show upcoming classes and recent photos, lead to contact |
| Coaches | Present current biographies and real portraits |
| Schedule | Show a readable agenda sourced from Google Calendar, with an option to open the calendar |
| Photos | Show Instagram photos with original-post links and a curated local gallery fallback |
| Location / Contact | Make calling, emailing, and getting directions easy |

Preserve existing `index.html`, `coaches.html`, `schedule.html`, `photos.html`, and
`location.html` URLs, either as build entry points or tested redirects. Retain
useful existing home-section anchors. Membership and shop navigation appear only
when usable destinations exist.

## Proposed technical approach

Use React + TypeScript + Vite with shared header/footer, program, coach, schedule,
and gallery components. Separate content data from layout. Prefer prerendered
marketing pages so core content and metadata are present in the generated HTML.
Select and verify a compatible prerender approach during the scaffold step.

Keep deployment compatible with GoDaddy: build locally, then upload the generated
output to the actual domain document root. Do not upload source `.env` files,
development dependencies, or the entire repository. Confirm whether deployment
is at the domain root or a subfolder when setting asset paths.

Integrations use narrow backend endpoints. Use Node if the account supports the
needed application lifecycle and scheduling, or PHP if that is the supported
runtime. A separately hosted backend remains an option if account limits require
it. The frontend design does not depend on that decision.

Public frontend settings may include the backend URL and confirmed social links.
Provider access tokens, refresh tokens, app secrets, and email credentials stay
server-side, outside the public document root and Git. A static React bundle
cannot keep a credential secret.

## Design acceptance

- Original logo, fighter artwork, palette, and real gym photography remain recognizable.
- Pages work at 375px, 768px, and desktop widths without horizontal overflow.
- Essential text and navigation do not depend on motion or hover.
- Existing page URLs load directly and survive a browser refresh.
- Local imagery and useful contact links remain available during provider outages.
- Titles, descriptions, canonical URLs, and business details use verified information.
- Compare the new pages with the actual live site before release; repository contents may differ.
