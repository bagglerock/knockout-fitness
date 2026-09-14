# Architecture conventions

The UI follows atoms → molecules → organisms → layout/pages. Keep files focused
on one responsibility and named for the thing they render or do.

- **Atoms** have no provider awareness: buttons/links, labels, branding.
- **Molecules** compose atoms or a small visual unit: coach/program cards, navigation,
  class rows, and day selection. Receive content through typed props.
- **Organisms** assemble a full section. `ClassSchedule` chooses between the live
  agenda and regular weekly timetable fallback; each implementation lives in its own component.
- **Layout** owns the shared header, main landmark, and footer.
- **Pages** compose organisms. They should remain short and readable.
- **Hooks** own lifecycle and polling. **Services** own I/O and date operations.
  `feeds.ts` validates untrusted public data before UI components consume it.
- **Provider adapters** run outside the browser. They export only display fields,
  never credentials, personal event guests, or raw provider errors.

Prefer small functions, early returns, typed props, descriptive names, and extracted
helpers over nested conditionals. A component should express one visible concept.
Do not compress code onto one line to make a function appear short. Use Prettier
for consistent formatting. Avoid a state library, router, or generic component
framework until a concrete requirement needs it.

The site is a prerendered multi-page React app. The build renders React into each
legacy HTML entry point, then Vite bundles the hydration code. Normal anchor links
keep direct page navigation and `.html` bookmarks working without Apache SPA rewrites.
Each page has its own title and description; canonical tags await a confirmed domain.

Source content lives in `src/content.ts` and the current weekly schedule
file. Shared CSS tokens and base rules are separate from header, footer, home,
page, and responsive styles. Preserve source artwork in `assets/`; the public
copies are generated and ignored by Git.

The optional worker writes sanitized feeds atomically. Browsers poll the local
JSON files once a minute; this does not mean the upstream providers are queried
once a minute. Suggested worker schedules are five minutes for Calendar and
30 minutes for Instagram, using separate private environment files. Timeouts
and canceled effects cannot overwrite a newer successful request. Failed/old
feeds produce useful fallback content.

Credentials must remain outside the web root and Git. Browser configuration is
public and can be edited without rebuilding. This implementation is ready to
configure, not evidence of successful provider authorization.
