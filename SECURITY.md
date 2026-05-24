# Security

Wyvern Systems ([wyvernsystems.com](https://wyvernsystems.com)) is a static marketing site hosted on GitHub Pages.

## Reporting

Report vulnerabilities using [security.txt](https://wyvernsystems.com/.well-known/security.txt) (LinkedIn contact listed there). Do not open public issues for undisclosed security problems.

Source copy in the repo: [public/.well-known/security.txt](public/.well-known/security.txt).

## What we enforce in production builds

- **Content-Security-Policy** (meta, injected at build time in [vite.config.js](vite.config.js)): default same-origin; no frames (`frame-ancestors 'none'`); no plugins (`object-src 'none'`); scripts and styles from this origin only; self-hosted fonts; `upgrade-insecure-requests`.
- **Referrer-Policy**: `strict-origin-when-cross-origin` (in [index.html](index.html)).
- **Permissions-Policy**: disables sensors, camera, microphone, payment, USB, and related APIs (in [index.html](index.html)).
- **X-Frame-Options**: `DENY` (injected at build time).
- External links use `rel="noopener noreferrer"` (in [src/App.jsx](src/App.jsx)).

Local **`npm run dev`** does not inject the production CSP so development stays unrestricted.

## HTTP headers (hosting)

GitHub Pages does not let this repo set response headers (for example HSTS or `X-Content-Type-Options`). If you terminate TLS at a CDN (Cloudflare, etc.), configure those headers at the edge. The build CSP still applies in the browser.

## CI and dependencies

- Pushes to **`main`** run `npm test` and `npm audit --audit-level=high` before deploy (see [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)).
- [Dependabot](.github/dependabot.yml) opens weekly update pull requests for npm and GitHub Actions.

## Changelog

Security-related releases are noted under **Security** in [CHANGELOG.md](CHANGELOG.md).
