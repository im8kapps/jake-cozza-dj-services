# Repository Guidelines

## Project Structure & Module Organization
- `index.html`, `styles.css`, and `script.js` deliver the static site; update copy or UI here first.
- `netlify/functions/admin.js` drives the admin dashboard by reading Netlify form submissions and updating their state (pending vs. accepted).
- `assets/` contains marketing imagery; adjust or optimize files here when updating visuals.
- Configuration roots (`netlify.toml`, `manifest.json`, `sw.js`) live alongside the site—keep changes deliberate because deployments read them directly.

## Build, Test, and Development Commands
- `npm run dev` runs `netlify dev --port 8888` so static assets and functions share the same origin.
- `npm start` serves the built assets via `python3 -m http.server 8000`—useful for sanity checks without the Netlify layer.
- `npm run build` is a no-op reminder that the site is static; do not add heavyweight build steps without discussion.
- `npm run deploy` runs `netlify deploy --prod`; ensure environment variables are configured in Netlify before executing.

## Coding Style & Naming Conventions
- Match existing 4-space indentation in HTML/JS and 2-space indentation in CSS.
- Prefer semantic class names (`hero__badge`, `feature-item`) and camelCase for JS variables/functions.
- Keep serverless handlers pure functions exporting `async function handler(event)` and respond with JSON consistently.
- Environment variables stay in upper snake case (e.g., `NETLIFY_FORM_ID`); document new ones in `DEPLOYMENT.md`.

## Testing Guidelines
- No automated test suite yet; exercise flows manually with `npm run dev` and submit quotes through the modal.
- After a submission, verify the entry appears in the Netlify dashboard and that the dashboard page reflects the new request.
- Smoke test static pages in modern browsers and run a Lighthouse pass before shipping significant UX changes.
- If you add automated tests (recommended for the admin API), co-locate them alongside the Netlify function (`netlify/functions/*.test.js`) and note the command in this section.

## Commit & Pull Request Guidelines
- Follow the Conventional Commit prefixes used in history and `GIT_WORKFLOW.md` (`feat`, `fix`, `style`, `content`, `perf`, `docs`).
- Group related changes; avoid mixing content edits with backend logic in the same commit.
- Pull requests should summarize scope, list environment variable impacts, and include before/after screenshots or API snippets when applicable.
- Link Netlify preview URLs and any related issue numbers to streamline review.

## Security & Configuration Tips
- Required env vars: `ADMIN_PASSWORD`, `NETLIFY_FORM_ID`, `NETLIFY_ACCESS_TOKEN`.
- Never hard-code credentials; use `.env.local` for local dev and keep it git-ignored.
- When touching `admin.js`, retain the bearer check, rate-limit expensive Netlify API calls, and validate status transitions.
