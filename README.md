# wyvernsystems.com

Static marketing site for **Wyvern Systems, LLC**, published with [GitHub Pages](https://pages.github.com/) and [GitHub Actions](https://github.com/features/actions).

## Contents

- **`public/`** — Site root served by Pages (`index.html`, `styles.css`, `CNAME`, `images/`).
- **`public/images/`** — Hero and section photos (Unsplash; see `public/images/ATTRIBUTION.txt`).

## Local preview

From the repo root, serve `public/` with any static file server, for example:

```bash
cd public && python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

Pushes to **`main`** run `.github/workflows/deploy-pages.yml`, which uploads `public/` and deploys to GitHub Pages. Configure the custom domain under the repository **Settings → Pages** if needed.

## License

MIT — see [LICENSE](LICENSE).
