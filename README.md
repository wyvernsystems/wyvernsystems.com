# wyvernsystems.com

Marketing site for **Wyvern Systems, LLC** — a **React** app built with [Vite](https://vitejs.dev/), deployed to [GitHub Pages](https://pages.github.com/) via [GitHub Actions](https://github.com/features/actions).

## Quickstart

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

Production build:

```bash
npm run build
npm run preview
```

Output is **`dist/`**, which matches what the deploy workflow publishes.

## Contents

- **`src/`** — `App.jsx`, entrypoint, global styles (`index.css`), and **`components/`** (matrix rain and wyvern backdrop).
- **`public/`** — Static assets copied to the build root (for example **`CNAME`** for the custom domain and **`.well-known/security.txt`**).
- **`vite.config.js`** — Vite config and production security meta injection (CSP).
- **`src/security/`** — CSP helpers (unit tested).
- **`src/**/*.test.{js,jsx}`** — Vitest unit tests.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server (no production CSP). |
| `npm run build` | Sync OG image, then production build to **`dist/`**. |
| `npm run preview` | Serve **`dist/`** locally. |
| `npm test` | Run unit tests once (Vitest). |
| `npm run test:watch` | Run unit tests in watch mode. |
| `npm run build-og-image` | Regenerate Open Graph PNG assets. |
| `npm run build-dragon-assets` | Regenerate wyvern / dragon image assets. |

Other `build-dragon-*` and `fill-dragon-holes` scripts are one-off asset maintenance; see **`scripts/`**.

## Configuration

- **`vite.config.js`** — `base: "/"` for GitHub Pages at the site root. Production builds set `build.sourcemap: false` and inject CSP via the `<!-- vite:csp -->` placeholder in **`index.html`**.
- **`public/CNAME`** — Custom domain (`wyvernsystems.com`) for GitHub Pages.
- **Node** — CI uses Node 20 (see [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)).

## Deploy

Pushes to **`main`** run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. `npm ci`
2. `npm test`
3. `npm audit --audit-level=high`
4. `npm run build`
4. Publish **`dist/`** to GitHub Pages

Set the custom domain under the repository **Settings → Pages** if needed.

## Security

Production builds inject a strict **Content-Security-Policy** (same-origin scripts, styles, and fonts), **referrer** and **permissions** policies, and **`X-Frame-Options: DENY`**. Fonts are bundled via `@fontsource` (no Google Fonts at runtime).

Details: [SECURITY.md](SECURITY.md). Disclosure: [security.txt](public/.well-known/security.txt) (live at [wyvernsystems.com/.well-known/security.txt](https://wyvernsystems.com/.well-known/security.txt)).

Dependabot and CI audit help keep dependencies current.

## Contributing

- User-visible or release-worthy changes belong in [CHANGELOG.md](CHANGELOG.md) under **`[Unreleased]`** (see [Keep a Changelog](https://keepachangelog.com/)).
- Report security issues per [SECURITY.md](SECURITY.md); do not open public issues for undisclosed vulnerabilities.
- Open a pull request against **`main`**; the deploy workflow runs on merge.

## License

MIT — see [LICENSE](LICENSE).
