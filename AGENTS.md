# Project working conventions

Read README.md, docs/ARCHITECTURE.md, and docs/DEPLOYMENT.md before changing the site.

- Preserve the original theme, palette, logo, fighter art, and real gym photography.
- Follow atoms, molecules, organisms, layout, and page composition under src/components.
- Keep functions focused and readable; extract fetching, formatting, validation,
  and conditional subviews instead of growing page components.
- Put business content in src/content.ts, not duplicated across JSX files.
- Run the formatter; do not minify handwritten source to shorten files/functions.
- HTML entry files are generated. Edit React source and run npm run build.
- Show complete images with proportional sizing or contained frames. Keep the hero artwork
  in normal flow; avoid negative offsets, cover cropping, and hover zoom that clips subjects.
- Keep existing .html routes and source assets available.
- Never commit provider credentials or publish them in browser configuration.
- Fallback content must not pretend that Instagram or Calendar is connected.
- Run npm run check and npm run build for functional changes. Run browser tests
  when available and clearly report any unavailable validation.
- Membership, merchandise, and payment ideas are backlog items, not active services.
