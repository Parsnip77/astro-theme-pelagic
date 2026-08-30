# Deployment

Pelagic produces a fully static site in `dist/`. Any host that can run Node.js during the build and serve static files can deploy it.

## Deployment variables

| Variable | Example | Meaning |
| --- | --- | --- |
| `SITE_URL` | `https://blog.example.com` | Public origin only; do not include a path. |
| `BASE_PATH` | `/notes` | Public subdirectory, or `/` for a root site. |

These values affect canonical URLs, feeds, sitemap entries, fonts, icons, internal links, and Giscus themes. They are public build configuration, not secrets.

## GitHub Pages

The included `.github/workflows/deploy.yml` follows the official Astro Pages workflow and deploys every push to `main`.

1. Create a GitHub repository and push Pelagic to its `main` branch.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push a commit or run **Deploy to GitHub Pages** manually from the Actions tab.

### Standard GitHub URLs

No repository variables are required:

| Repository | Result | Automatic base |
| --- | --- | --- |
| `alice/alice.github.io` | `https://alice.github.io/` | `/` |
| `alice/my-blog` | `https://alice.github.io/my-blog/` | `/my-blog` |

During GitHub Actions builds, Pelagic infers both cases from `GITHUB_REPOSITORY`.

### Custom domain

For `https://blog.example.com/`:

1. Open **Settings → Secrets and variables → Actions → Variables**.
2. Add `SITE_URL` with the value `https://blog.example.com`.
3. Add `BASE_PATH` with the value `/` (optional because `/` is the default when `SITE_URL` is explicit).
4. Add `public/CNAME` containing only `blog.example.com`.
5. Configure the domain and DNS under **Settings → Pages**.

For a root domain, the CNAME file similarly contains `example.com`. Follow GitHub's current DNS and HTTPS instructions rather than copying IP addresses from an old guide.

### Custom origin with a subpath

Set both variables when a host exposes the site below a path:

```text
SITE_URL=https://example.com
BASE_PATH=/notes
```

Do not set `SITE_URL=https://example.com/notes`; paths belong only in `BASE_PATH` and Pelagic rejects this ambiguous form.

## Other static hosts

Use these general settings:

```text
Install command: pnpm install --frozen-lockfile
Build command:   pnpm build
Output directory: dist
Node.js:          22 or newer
```

Set `SITE_URL` to the final production origin and `BASE_PATH` to `/` unless the site is mounted below a subdirectory. Typical platforms such as Cloudflare Pages, Netlify, and Vercel expose these fields in their project build settings.

## Local production test

Root deployment:

```bash
SITE_URL=https://blog.example.com BASE_PATH=/ pnpm build
pnpm preview
```

Repository subpath:

```bash
SITE_URL=https://example.com BASE_PATH=/my-blog pnpm build
pnpm preview
```

`pnpm build` validates generated links and assets. `pnpm verify` additionally runs linting and responsive browser checks; the browser suite assumes a root local preview, so use the ordinary configuration for that command.

## Before going live

- Replace `Your Name`, the example descriptions, and footer links.
- Confirm the canonical URL in the built HTML.
- Open RSS, Atom, sitemap, `robots.txt`, an Open Graph image, and both languages.
- Test a direct refresh on a nested article URL.
- If Giscus is enabled, confirm its repository IDs and custom theme URLs on the production origin.
- Enable HTTPS at the host after DNS has settled.
