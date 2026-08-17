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
- Playwright end-to-end tests for homepage content, section navigation, and production security meta.
- `npm run test:coverage` with `@vitest/coverage-v8` and HTML/text reports under **`coverage/`**.

### Changed

- Upgraded dependencies to latest stable: Vite 8, `@vitejs/plugin-react` 6, Vitest 4.1, React 19.2, `@testing-library/jest-dom` 7, jsdom 30, `@fontsource` 5.3, and related tooling.
- README documents unit vs end-to-end testing, coverage, current stack versions, security posture, npm scripts, and configuration.
- Homepage order: consulting, then What I cover / CTAs, then free products; removed product card image placeholders and marketplace lead line.
- UI pass: section headings, consulting blurbs, Marketplace icons, stronger content panel scrim, CTA hierarchy (primary LinkedIn / ghost portfolio), product accent borders, footer at bottom after free products.
- Responsive scaling: fluid type/spacing, viewport-based gutters and content max-width, scroll-friendly layout on small and tall screens.
- Visual polish: consulting tile icons and accents, sticky section nav, terminal-style footer panel, typewriter hero lead, pill hovers, wyvern scroll parallax (respects reduced motion).
- Vitest unit tests for CSP helpers, `App`, `MatrixRain`, `WyvernBackdrop`, `HeroLead`, `FreeProductCard`, `OfferIcon`, `FREE_PRODUCTS`, and `useReveal`.
- `npm test`, `npm run test:watch`, `npm run test:e2e`, and `npm run test:all` scripts; CI and deploy run unit and Playwright tests.
