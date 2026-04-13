# wyvernsystems.com

Marketing site for **Wyvern Systems, LLC** — a **React** app built with [Vite](https://vitejs.dev/), deployed to [GitHub Pages](https://pages.github.com/) via [GitHub Actions](https://github.com/features/actions).

## Contents

- **`src/`** — `App.jsx`, entrypoint, and global styles (`index.css`).
- **`public/`** — Static assets copied to the build root: **`CNAME`**, **`images/`** (hero photo + `ATTRIBUTION.txt`, Unsplash).

## Develop

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build (production)

```bash
npm run build
```

Output is **`dist/`**, which is what the deploy workflow uploads.

## Deploy

Pushes to **`main`** run `.github/workflows/deploy-pages.yml`: `npm ci`, `npm run build`, then publish **`dist/`** to GitHub Pages. Set the custom domain under the repository **Settings → Pages** if needed.

## License

MIT — see [LICENSE](LICENSE).
