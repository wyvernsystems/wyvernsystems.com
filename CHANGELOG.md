# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- Tightened production Content-Security-Policy: same-origin scripts, styles, and fonts; `script-src-attr 'none'`; `worker-src` and `media-src` restricted; `upgrade-insecure-requests`.
- Added production `X-Frame-Options: DENY` (with existing `frame-ancestors 'none'` in CSP).
- Expanded Permissions-Policy to disable additional browser capabilities.
- Self-hosted fonts via `@fontsource` (Latin subsets) so the site no longer loads Google Fonts at runtime.
- Disabled production source maps in the Vite build.
- Added [SECURITY.md](SECURITY.md), [security.txt](public/.well-known/security.txt), Dependabot, and `npm audit --audit-level=high` in the deploy workflow.

### Added

- [CHANGELOG.md](CHANGELOG.md) for release notes.
- **Free products** section for [Auto Color](https://marketplace.visualstudio.com/items?itemName=WyvernSystemsLLC.auto-color) and [AI Rulebook](https://marketplace.visualstudio.com/items?itemName=WyvernSystemsLLC.ai-rulebook) VS Code extensions.

### Changed

- Homepage order: consulting, then What I cover / CTAs, then free products; removed product card image placeholders and marketplace lead line.
- Vitest unit tests for CSP helpers, `App`, `MatrixRain`, `WyvernBackdrop`, and `useReveal`.
- `npm test` and `npm run test:watch` scripts; CI runs tests before deploy.

### Changed

- README documents security posture, npm scripts, and configuration.
