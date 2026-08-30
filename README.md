# Pelagic

Pelagic is a typography-first, multilingual static blog theme built with [Astro](https://astro.build/) and UnoCSS. It pairs a quiet, text-only home page with a wide article column, compact navigation, and a responsive margin table of contents.

Pelagic is derived from [Retypeset](https://github.com/radishzzz/astro-theme-retypeset). The live design that preceded this reusable theme can be viewed at [leanderc.com](https://leanderc.com); the public defaults in this repository contain no personal configuration from that site.

## Highlights

- Static output with no database, server, analytics, or CMS requirement.
- English and Simplified Chinese starter content, with UI translations for 11 locales.
- EB Garamond Latin titles and optional prose, with independently sized CJK, math, and code.
- Wide reading column and animated desktop margin TOC; compact mobile layout.
- Markdown and MDX, KaTeX, Mermaid, syntax highlighting, callouts, folds, embeds, RSS/Atom, sitemap, and generated Open Graph images.
- Optional Giscus comments, disabled by default.
- Content validation, generated-site link checks, and responsive Playwright tests.
- Automatic GitHub Pages deployment for user sites, project sites, and custom domains.

## Requirements

- Node.js 22 or newer
- pnpm 11 (the exact package-manager version is declared in `package.json`)

## Quick start

```bash
git clone https://github.com/Parsnip77/astro-theme-pelagic.git my-blog
cd my-blog
pnpm install
pnpm dev
```

Open `http://localhost:4321`, then make these changes first:

1. Edit identity, languages, typography, layout, and links in `src/config.ts`.
2. When `site.i18nTitle` is enabled, edit localized site text in `src/i18n/ui.ts`.
3. Replace `src/content/about/about-en.md` and `about-zh.md`.
4. Remove or rewrite the posts in `src/content/posts/`.
5. Replace the favicon and social images in `public/` if desired.

## Write a post

```bash
pnpm new-post my-first-post
```

The command creates a draft under `src/content/posts/` using the current default language and typography. A published post needs a non-empty `description`, explicit `lang`, and stable `abbrlink`.

```yaml
---
title: My First Post
published: 2026-01-20
description: A concise summary for lists, feeds, and search metadata.
tags:
  - Notes
draft: false
pin: 0
toc: true
bodyFont: garamond
bodyFontSize: 18
bodyAuxFontSize: 16
lang: en
abbrlink: my-first-post
---
```

Translated posts should use the same `abbrlink`; Pelagic then links only the translations that actually exist.

## Verify and build

```bash
pnpm check          # Astro and TypeScript checks
pnpm build          # validated production build in dist/
pnpm verify         # lint + build + responsive browser tests
pnpm preview        # preview the latest production build
```

When published URLs are intentionally added, removed, or renamed, review them and accept the new route set:

```bash
pnpm content:manifest
```

Commit `content-route-manifest.json` with the content change. This makes accidental URL deletion visible in CI.

## Deploy

The included `.github/workflows/deploy.yml` uses the official Astro and GitHub Pages actions. Push the repository to GitHub, open **Settings → Pages**, select **GitHub Actions** as the source, and push to `main`.

- A repository named `<owner>.github.io` deploys at the root automatically.
- Any other repository automatically uses `/<repository-name>` as its base path.
- For a custom domain, set the repository variable `SITE_URL` and optionally `BASE_PATH`, then add `public/CNAME`.

See [docs/deployment.md](docs/deployment.md) for exact scenarios and other static hosts.

## Documentation

- [Configuration reference](docs/configuration.md)
- [Content authoring guide](docs/content.md)
- [Deployment guide](docs/deployment.md)
- [Third-party assets and licenses](THIRD_PARTY_LICENSES.md)
- [Derivative-work notices](NOTICE.md)

## Project structure

```text
src/config.ts             Main site, typography, layout, and feature settings
src/i18n/                 Interface translations and locale routing
src/content/about/        Localized About pages
src/content/posts/        Markdown and MDX posts
src/components/           Astro UI components and widgets
src/styles/               Theme and typography styles
public/                   Fonts, icons, feeds, and optional CNAME
scripts/                  Authoring and validation utilities
tests/                    Responsive layout regression tests
.github/workflows/        Verification and GitHub Pages deployment
```

## License

Pelagic source code is available under the MIT License. The original Retypeset copyright is retained, and Pelagic modifications are copyright © 2026 Parsnip77. Bundled fonts and the Giscus theme base remain under their respective licenses. See [LICENSE](LICENSE), [NOTICE.md](NOTICE.md), and [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
