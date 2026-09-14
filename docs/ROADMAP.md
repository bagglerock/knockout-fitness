# Delivery roadmap

Status: planning complete; implementation has not started in this change.

## 1. Establish the baseline

- [x] Inspect the primary repository, original palette, logo, and desktop fighter graphic.
- [x] Record brand preservation, Instagram, Google Calendar, and future feature requirements.
- [ ] Confirm the canonical domain: user URL has two trailing `i` characters; existing README has one.
- [ ] Compare repository files and graphics against the actual live GoDaddy site.
- [ ] Confirm current coaches, program offerings, contact details, and schedule, including the Saturday end time.

These inputs need not block a local layout prototype using the original assets.

## 2. Build the modern frontend

- [ ] Scaffold React + TypeScript + Vite in this repository on a review branch.
- [ ] Preserve original graphics and select a compatible marketing-page prerender approach.
- [ ] Implement the responsive shared shell and Home, Coaches, Schedule, Photos, and Location/Contact pages.
- [ ] Preserve legacy `.html` URLs and useful anchors; check direct visits and refreshes.
- [ ] Add provider-independent schedule/gallery components with clearly labeled development fixtures and production fallback states.
- [ ] Verify the visual design at phone, tablet, and desktop widths, keyboard operation, and reduced motion.

Exit: reviewable local preview/build preserving the existing identity. No fake
live feed, invented timetable, or inert membership/shop buttons in production.

## 3. Connect phone-managed content

- [x] Record the user-supplied Instagram handle: [@Knock_Out_Fitness](https://www.instagram.com/knock_out_fitness/).
- [ ] Verify the Instagram account type and authorized operator.
- [ ] Select the backend after checking GoDaddy Node/PHP, scheduled job, outbound HTTPS, and private configuration capabilities.
- [ ] Complete official Instagram authorization, cache handling, refresh/reconnection, and gallery fallback.
- [ ] Have the operator create/choose the dedicated Google Calendar and approve its publication settings.
- [ ] Connect the branded agenda; use an embed as an interim option if needed.
- [ ] Demonstrate a phone calendar edit and an Instagram post reaching the website without rebuilding it.
- [ ] Verify provider outages, stale content, cancellation/recurrence behavior, and credential isolation.

Exit: real connected content and documented operator recovery steps. A schedule
display is not a reservation system.

## 4. Release on GoDaddy

- [ ] Confirm document root, asset base path, canonical domain, HTTPS, and runtime configuration.
- [ ] Back up the currently deployed files and required server configuration.
- [ ] Validate a production build locally and on a preview location supported by the account.
- [ ] Check links, metadata, image loading, deep links, real contact actions, and provider fallbacks.
- [ ] Keep credentials and source files outside the public upload; deploy only the intended build and backend assets.
- [ ] Publish the reviewed release when authorized, then verify the real domain.
- [ ] Document rollback to the saved deployment and any cache/configuration steps.

## 5. Add selected future features

- [ ] Decide whether membership inquiries are the first extension.
- [ ] Confirm the operator's preferred inbox/form workflow and implement truthful submission feedback.
- [ ] Inventory current merchandise and choose showcase, pickup inquiry, or hosted checkout.
- [ ] Consider enrollment, payments, and private-training booking only after the operator's process is defined.

## Inputs needed for activation

| Input | Why it matters |
| --- | --- |
| Correct production domain and live-site baseline | Prevents deploying to the wrong destination or losing newer content |
| Instagram account type and authorized operator | Handle supplied: `@Knock_Out_Fitness`; account access still needs verification |
| Owner authorization to the Instagram app | Required for real account media access |
| Dedicated calendar ID and sharing choice | Connects public class information without exposing a personal calendar |
| GoDaddy runtime/scheduler information | Determines backend and refresh implementation |
| Current schedule/contact/program details | Prevents publishing historical or incorrect business information |
| Inquiry recipient and merchandise process | Needed only when those later features are selected |

Never ask for passwords or tokens in chat or commit them to these documents.
