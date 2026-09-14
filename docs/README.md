# Website modernization

Planning baseline: September 14, 2026. Status: proposed implementation plan.

The owner's direction is to modernize the current Knockout Fitness website while
keeping the same theme and graphics. Instagram should supply fresh photos, and
the gym operator should manage class times from a phone using Google Calendar.
Membership forms, merchandise, and additional contact options are future work.

| Document | Purpose |
| --- | --- |
| [Design and scope](MODERNIZATION.md) | Brand assets, page structure, deployment approach, and acceptance criteria |
| [Integrations](INTEGRATIONS.md) | Instagram and Google Calendar setup, behavior, and failure handling |
| [Future features](FUTURE_FEATURES.md) | Membership inquiries, contact forms, and merchandise possibilities |
| [Roadmap](ROADMAP.md) | Delivery order, open inputs, and release checks |

## Evidence and limits

- Primary repository: `bagglerock/knockout-fitness`, inspected at commit `4a3651f`.
- `bagglerock/KF-rw` is a historical HTML redesign reference, not the selected implementation repository.
- The user supplied `https://www.knockoutfitnessmuaythaii.com`; the existing root
  README names `www.knockoutfitnessmuaythai.com` (one trailing `i`). Confirm the
  production domain and redirects before setting canonical URLs or deploying.
- The supplied live URL could not be retrieved from this environment. This does
  not establish that it is offline. Findings below come from repository files,
  not a verified comparison with GoDaddy's currently uploaded files.
- No React implementation, provider account connection, form submission, payment
  flow, calendar creation, or production deployment is included in this planning change.

## Decision boundaries

Brand preservation, Instagram photos, and phone-managed scheduling are requested
requirements. React + TypeScript + Vite is the proposed frontend. The backend
runtime remains open until the GoDaddy account capabilities are checked. Future
features are options, not commitments to a vendor, paid plan, or launch date.
