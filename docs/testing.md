# Testing and release verification

Pelagic treats generated output and responsive geometry as part of the public API. The repository therefore includes checks for source files, content, documentation, builds, and browser layout.

[简体中文](zh-CN/testing.md)

## Commands

| Command | What it checks |
| --- | --- |
| `pnpm check` | Astro components, content collections, and TypeScript. |
| `pnpm lint` | TypeScript, Astro, scripts, tests, and Markdown code fences. |
| `pnpm validate:config` | Deployment inference for local, GitHub user, GitHub project, custom-domain, and subpath scenarios. |
| `pnpm validate:content` | Required front matter, unique routes, translation groups, and the committed route manifest. |
| `pnpm validate:docs` | Relative links and images in root and `docs/` Markdown files. |
| `pnpm build` | Content checks, Astro diagnostics, static build, image placeholders, and generated-site validation. |
| `pnpm test:layout` | Playwright layout tests at 390, 1280, 1440, and 1920 pixels. |
| `pnpm test:deployment` | A complete GitHub project Pages build under `/pelagic-project/`. |
| `pnpm verify` | The normal local and pull-request suite. |
| `pnpm verify:release` | The full suite, including the project-subpath build. |

## Generated-site validation

After Astro writes `dist/`, `validate-build.ts` checks:

- every generated HTML `href` and `src` that points to the site;
- canonical origins and fragment targets;
- image alternative text;
- draft page and draft Open Graph image isolation;
- the sitemap address in `robots.txt`;
- root and configured base-path resolution.

The validator does not make network requests. External links should still be reviewed before a release.

## Route manifest

`content-route-manifest.json` records the expected public post routes. When a deliberate content change adds, removes, or renames a route, run:

```bash
pnpm content:manifest
```

Review and commit the manifest with the post change. A filename rename does not affect a route when `abbrlink` remains stable.

## Browser coverage

Playwright starts the production preview and verifies representative home, article, translation, TOC, table, Mermaid, and overflow behavior. It uses a light color scheme and the Chromium engine. Failure screenshots and traces are stored under `artifacts/` and uploaded by GitHub Actions.

For a visual release review, also inspect both color schemes on a real phone and one desktop browser. Automated geometry tests cannot judge type rendering differences between operating systems.

## CI

`.github/workflows/verify.yml` runs `pnpm verify:release` on pushes to `main`, pull requests, and manual dispatches. The deployment workflow independently builds the exact Pages artifact before publication.

Before tagging or announcing a release, start from a clean working tree and run:

```bash
pnpm install --frozen-lockfile
pnpm verify:release
git status --short
```
