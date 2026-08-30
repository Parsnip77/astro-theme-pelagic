# Pelagic

Pelagic is a typography-first, multilingual static blog theme built with Astro and UnoCSS. It is derived from [Retypeset](https://github.com/radishzzz/astro-theme-retypeset) and redesigns the article experience around a wider reading column, a floating margin table of contents, restrained navigation, and configurable Latin/CJK typography.

> Pelagic is being prepared for its first public release. The complete guide, screenshots, deployment workflow, and polished example content will be added before `v0.1.0`.

## Current features

- Astro static generation with multilingual routes.
- Minimal text-first home page.
- Wide article layout with a responsive margin TOC.
- EB Garamond for Latin titles and optional article prose.
- Independent sizing for Latin prose, CJK fallback glyphs, math, and code.
- Markdown and MDX, KaTeX, Mermaid, code highlighting, directives, RSS/Atom, Sitemap, and Open Graph images.
- Optional Giscus comments, disabled by default.
- Content validation and Playwright layout regression tests.

## Quick start

```bash
pnpm install
pnpm dev
```

Before publishing, edit `src/config.ts` and replace the placeholder site URL and author. Example content is available in English and Simplified Chinese.

## Verification

```bash
pnpm verify
```

This runs linting, content validation, Astro type checks, a production build, generated-site validation, and responsive layout tests.

## Live customization

Pelagic originated from the layout used at [leanderc.com](https://leanderc.com). The live site is a personal customization and may differ from the defaults in this repository.

## License

Pelagic is released under the MIT License. It retains the original Retypeset copyright notice and adds the copyright notice for the Pelagic modifications. Bundled fonts remain under their respective SIL Open Font License terms. See `LICENSE`, `NOTICE.md`, and `THIRD_PARTY_LICENSES.md`.
